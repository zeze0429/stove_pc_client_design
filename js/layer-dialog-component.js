/**
 * 레이어 팝업 공용 셸 — Vue 컴포넌트 (빌드 없이 CDN Vue로 동작)
 * -------------------------------------------------------------
 * 센터에 뜨는 레이어 팝업은 전부 이걸 쓴다. 팝업별로는 title과 width,
 * 그리고 본문(기본 슬롯)만 넘기면 된다. 딤·헤더·닫기·스크롤은 공통.
 *
 *   <layer-dialog title="PC방 혜택" @close="...">...본문...</layer-dialog>
 *
 * 여는/닫는 상태는 띄우는 쪽이 들고 있고, 여기서는 close만 올려보낸다.
 * 스타일은 css/layer-dialog.css.
 */
var LayerDialog = {
  props: {
    title: { type: String, required: true },
    // 너비만 팝업마다 다르다 (Figma 기준 PC방 혜택 = 700)
    width: { type: String, default: '70rem' },
  },
  emits: ['close'],
  mounted: function () {
    this.onKeydown = function (e) { if (e.key === 'Escape') this.$emit('close'); }.bind(this);
    document.addEventListener('keydown', this.onKeydown);
  },
  beforeUnmount: function () {
    document.removeEventListener('keydown', this.onKeydown);
  },
  template:
    // 딤을 직접 누른 경우(.self)에만 닫는다 — 다이얼로그 안쪽 클릭은 통과
    '<div class="layer-dialog-dim" @click.self="$emit(\'close\')">' +
      '<div class="layer-dialog" role="dialog" aria-modal="true" :aria-label="title" ' +
        ':style="{ width: width }" data-name="Dialog">' +
        '<div class="layer-dialog__header" data-name="Dialog/Header">' +
          '<p class="layer-dialog__title stds-title7 fw-bold">{{ title }}</p>' +
          '<button class="layer-dialog__close" type="button" aria-label="닫기" @click="$emit(\'close\')">' +
            '<i class="ic-v2-control-close-line"></i>' +
          '</button>' +
        '</div>' +
        '<div class="layer-dialog__body"><slot></slot></div>' +
      '</div>' +
    '</div>',
};
