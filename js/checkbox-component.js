/**
 * STDS Checkbox — Vue 컴포넌트 (빌드 없이 CDN Vue로 동작)
 * -------------------------------------------------------------
 * props·이벤트는 사내 Storybook Components/Control/Checkbox와 같게, 값은 Figma(1040:9786) 기준.
 *
 *   <stds-checkbox v-model="on">PC방 게임만 보기</stds-checkbox>
 *   <stds-checkbox v-model="all" :is-indeterminate="some" size="sm"></stds-checkbox>   ← 텍스트 없으면 상자만
 *
 * 상자와 라벨을 한 번에 누를 수 있다(label). 스타일은 css/checkbox.css.
 */
var STDS_CHECKBOX_SIZES = ['sm', 'md', 'lg'];

var StdsCheckbox = {
  props: {
    modelValue: { type: Boolean, default: false },
    id: { type: String, default: undefined },
    name: { type: String, default: undefined },
    value: { type: [String, Boolean, Number], default: undefined },
    size: { type: String, default: 'md', validator: function (v) { return STDS_CHECKBOX_SIZES.indexOf(v) > -1; } },
    // 라벨이 여러 줄일 때 상자를 첫 줄에 맞춘다 (Storybook align top · middle)
    align: { type: String, default: 'middle', validator: function (v) { return v === 'top' || v === 'middle'; } },
    // 선택 안 된 상태에서만 동작 (Storybook과 같음)
    isIndeterminate: { type: Boolean, default: false },
    isDisabled: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  computed: {
    indeterminate: function () { return this.isIndeterminate && !this.modelValue; },
  },
  watch: {
    indeterminate: function (v) { this.$refs.input.indeterminate = v; },
  },
  mounted: function () { this.$refs.input.indeterminate = this.indeterminate; },
  methods: {
    onChange: function (e) {
      // 일부 선택에서 누르면 선택으로 (브라우저가 indeterminate를 먼저 풀어 준다)
      this.$emit('update:modelValue', e.target.checked, e);
    },
  },
  template:
    '<label :class="[\'stds-checkbox\', \'stds-checkbox-\' + size, { \'is-align-top\': align === \'top\' }]">' +
      '<input ref="input" class="stds-checkbox__input" type="checkbox" :id="id" :name="name" :value="value" ' +
        ':checked="modelValue" :disabled="isDisabled" @change="onChange" />' +
      '<span class="stds-checkbox__box" aria-hidden="true">' +
        '<i class="ic-v2-control-check-bold-line"></i><i class="ic-v2-control-indeterminate-line"></i>' +
      '</span>' +
      '<span v-if="$slots.default" class="stds-checkbox__label"><slot></slot></span>' +
    '</label>',
};
