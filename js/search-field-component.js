/**
 * STDS Search Field — Vue 컴포넌트 (빌드 없이 CDN Vue로 동작)
 * -------------------------------------------------------------
 * props·이벤트는 사내 Storybook Components/Form/Search Field와 같게, 값은 Figma(982:7430) 기준.
 *
 *   <stds-search-field v-model="query" placeholder="게임 또는 검색어 입력" @search="..."></stds-search-field>
 *
 * - 글자가 있으면 지우기 버튼이 보이고(Figma filled 상태), 누르면 비우고 포커스는 유지한다.
 * - 엔터는 검색 버튼과 같다.
 * 스타일은 css/search-field.css.
 */
var STDS_SEARCH_FIELD_VARIANTS = ['outline', 'fill'];
var STDS_SEARCH_FIELD_SIZES = ['sm', 'md', 'lg'];

var StdsSearchField = {
  props: {
    modelValue: { type: String, default: '' },
    placeholder: { type: String, default: '검색어를 입력해 주세요.' },
    // Figma Type=line → Storybook 이름 outline
    variant: { type: String, default: 'outline', validator: function (v) { return STDS_SEARCH_FIELD_VARIANTS.indexOf(v) > -1; } },
    size: { type: String, default: 'sm', validator: function (v) { return STDS_SEARCH_FIELD_SIZES.indexOf(v) > -1; } },
    maxlength: { type: Number, default: 200 },
  },
  emits: ['update:modelValue', 'search', 'clear'],
  methods: {
    onInput: function (e) { this.$emit('update:modelValue', e.target.value); },
    clear: function () {
      this.$emit('update:modelValue', '');
      this.$emit('clear');
      this.$refs.input.focus();
    },
    search: function (e) { this.$emit('search', this.modelValue, e); },
  },
  template:
    '<label :class="[\'stds-search-field\', \'stds-search-field-\' + variant, \'stds-search-field-\' + size]">' +
      '<input ref="input" class="stds-search-field__input" type="search" :value="modelValue" :placeholder="placeholder" ' +
        ':maxlength="maxlength" spellcheck="false" autocomplete="off" @input="onInput" @keydown.enter="search" />' +
      '<button v-if="modelValue" class="stds-search-field__clear" type="button" aria-label="지우기" @mousedown.prevent @click="clear">' +
        '<i class="ic-v2-control-close-circle-fill" aria-hidden="true"></i>' +
      '</button>' +
      '<button class="stds-search-field__search" type="button" aria-label="검색" @click="search">' +
        '<i class="ic-v2-navigation-search-line" aria-hidden="true"></i>' +
      '</button>' +
    '</label>',
};
