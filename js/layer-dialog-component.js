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
    // 내용이 짧아도 이 높이 밑으로는 안 줄어든다 (공지 = 32rem)
    minHeight: { type: String, default: null },
    // false면 셸 본문이 스크롤하지 않고, 본문 안쪽이 스크롤을 직접 맡는다 (공지: 상자 안 글만 스크롤)
    bodyScroll: { type: Boolean, default: true },
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
    // 딤(팝업 바깥)을 눌러도 닫히지 않는다 — 닫기 버튼(또는 Esc)으로만 닫는다
    '<div class="layer-dialog-dim">' +
      '<div class="layer-dialog" role="dialog" aria-modal="true" :aria-label="title" ' +
        ':style="{ width: width, minHeight: minHeight }" data-name="Dialog">' +
        '<div class="layer-dialog__header" data-name="Dialog/Header">' +
          '<p class="layer-dialog__title stds-title7 fw-bold">{{ title }}</p>' +
          '<button class="layer-dialog__close" type="button" aria-label="닫기" @click="$emit(\'close\')">' +
            '<i class="ic-v2-control-close-line"></i>' +
          '</button>' +
        '</div>' +
        '<div class="layer-dialog__body" :class="{ \'layer-dialog__body--static\': !bodyScroll }"><slot></slot></div>' +
        // 버튼이 있는 팝업만 — 없으면 아예 그려지지 않는다
        '<div v-if="$slots.footer" class="layer-dialog__footer"><slot name="footer"></slot></div>' +
      '</div>' +
    '</div>',
};
