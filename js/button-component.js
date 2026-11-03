/**
 * STDS Button — Vue 컴포넌트 (빌드 없이 CDN Vue로 동작)
 * -------------------------------------------------------------
 * props·이름은 사내 Storybook Components/Button과 같게, 값은 Figma(966:4473) 기준.
 *
 *   <stds-button variant="outline" size="sm" icon="ic-v2-object-download-line">다운로드</stds-button>
 *   <stds-button has-arrow>더보기</stds-button>
 *   <stds-button variant="white" size="sm" radius="full">설정</stds-button>   ← 알약형
 *   <stds-button icon="ic-v2-control-close-line" aria-label="닫기"></stds-button>   ← 텍스트 없으면 아이콘만
 *
 * 스타일은 css/button.css. 컴포넌트 없이 클래스만 붙여 써도 같은 모양이 나온다.
 */
var STDS_BUTTON_VARIANTS = ['primary', 'secondary', 'tertiary', 'outline', 'white', 'ghost', 'blue', 'grayscale'];
var STDS_BUTTON_SIZES = ['xs', 'sm', 'md', 'lg'];

var StdsButton = {
  props: {
    variant: { type: String, default: 'primary', validator: function (v) { return STDS_BUTTON_VARIANTS.indexOf(v) > -1; } },
    size: { type: String, default: 'md', validator: function (v) { return STDS_BUTTON_SIZES.indexOf(v) > -1; } },
    // 왼쪽 아이콘 — 아이콘 폰트 클래스 (예: 'ic-v2-object-download-line')
    icon: { type: String, default: '' },
    isDisabled: { type: Boolean, default: false },
    // 오른쪽 화살표 — Figma Icon=trailing은 화살표 전용
    hasArrow: { type: Boolean, default: false },
    // 모서리 — Figma Radius=Default(라운드사각형) / Full(알약형)
    radius: { type: String, default: 'default', validator: function (v) { return v === 'default' || v === 'full'; } },
  },
  emits: ['click'],
  computed: {
    iconOnly: function () { return !!this.icon && !this.$slots.default; },
    classes: function () {
      return [
        'stds-button',
        'stds-button-' + this.variant,
        'stds-button-' + this.size,
        { 'stds-button-full': this.radius === 'full', 'is-icon-only': this.iconOnly, 'has-arrow': this.hasArrow && !this.iconOnly },
      ];
    },
  },
  template:
    '<button type="button" :class="classes" :disabled="isDisabled" @click="$emit(\'click\', $event)">' +
      '<i v-if="icon" :class="icon" aria-hidden="true"></i>' +
      '<span v-if="$slots.default"><slot></slot></span>' +
      '<i v-if="hasArrow && !iconOnly" class="ic-v2-control-arrow-right-line" aria-hidden="true"></i>' +
    '</button>',
};
