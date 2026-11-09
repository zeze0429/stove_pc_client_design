/**
 * 라이브러리 설정 — 센터 레이어 팝업 (Vue 3 CDN 컴포넌트)
 * -------------------------------------------------------------
 * Figma 클라이언트_v3.1 68061:330433 "라이브러리 설정" (기준 Dialog 38783:264947 — 폭 560(사용자 11-09, Figma 664) · 기본 높이 620 고정 + 스크롤).
 * 라이브러리 타이틀 옆 설정 버튼(.client-page-title__setting)으로 연다.
 * 공통으로 정해 둔 것은 공통 부품 그대로: 셸 LayerDialog, 버튼 .stds-button, 체크박스 <stds-checkbox>,
 * 그룹 만들기 입력칸은 그룹에 추가 팝업과 같은 모양(.add-group-dialog__field), 드래그 원래 자리 · 프리뷰는 우측패널 규칙.
 *
 *   ① 숨겨진 게임 보기 — 팝업을 닫고 숨긴 게임 화면으로 (화면은 가이드 받으면)
 *   ② 빠른 실행 영역 노출 — 보기 옵션 libraryQuick과 같은 값 (js/proto-settings.js)
 *   ③ 게임 그룹 관리 — LIBRARY_STORE.groups를 우측패널과 같이 쓴다 (만들기 · 이름 변경 · 삭제 확인 · 순서 변경)
 */
var LIBRARY_SETTINGS_DRAG_PX = 3; // 손잡이를 이만큼 움직여야 순서 변경 시작 (그냥 누르는 건 무시)

function librarySettingsDate(t) {
  var d = new Date(t || Date.now());
  var p = function (n) { return (n < 10 ? '0' : '') + n; };
  return d.getFullYear() + '.' + p(d.getMonth() + 1) + '.' + p(d.getDate());
}

// 삭제 확인 — 312, 문구(그룹명 brand-primary) + 취소 · 삭제 (Figma 48960:384518). 셸 모양(배경 · 둥글기 · 그림자)은 공통
var LibrarySettingsConfirm = {
  props: { name: { type: String, required: true } },
  emits: ['confirm', 'cancel'],
  mounted: function () {
    this._onKey = function (e) { if (e.key === 'Escape') { e.stopPropagation(); this.$emit('cancel'); } }.bind(this);
    document.addEventListener('keydown', this._onKey, true);
  },
  beforeUnmount: function () { document.removeEventListener('keydown', this._onKey, true); },
  template:
    '<div class="layer-dialog-dim library-settings-confirm-dim">' +
      '<div class="layer-dialog library-settings-confirm" role="alertdialog" aria-modal="true" data-name="Dialog">' +
        '<p class="library-settings-confirm__text"><span>{{ name }}</span>을(를) 삭제하시겠습니까?</p>' +
        '<div class="library-settings-confirm__btns" data-name="Dialog/Button">' +
          '<button class="stds-button stds-button-outline stds-button-md" type="button" @click="$emit(\'cancel\')">취소</button>' +
          '<button class="stds-button stds-button-primary stds-button-md" type="button" @click="$emit(\'confirm\')">삭제</button>' +
        '</div>' +
      '</div>' +
    '</div>',
};

var LibrarySettingsDialog = {
  components: { 'layer-dialog': LayerDialog, 'stds-checkbox': StdsCheckbox, 'settings-confirm': LibrarySettingsConfirm },
  props: {
    ungroupedCount: { type: Number, default: 0 }, // 그룹 없는 게임 수 — 0이면 그 행은 없다
  },
  emits: ['close', 'hidden-games'],
  data: function () {
    return {
      store: LIBRARY_STORE,
      quickOn: protoSettingsRead().libraryQuick,
      // 그룹 만들기
      text: '', error: '', focused: false, overflow: false,
      // 이름 변경 — 한 번에 한 행만 { id, text, error }
      editing: null,
      // 삭제 확인 { id, name }
      confirm: null,
      // 순서 변경 { id, from, to, x, y, offsetY, width, started }
      drag: null,
      today: librarySettingsDate(),
    };
  },
  computed: {
    groups: function () { return this.store.groups; },
    canCreate: function () { return this.groups.length < LIBRARY_ADD_GROUP_MAX; },
    canSubmitName: function () { return this.canCreate && !this.error && this.text.trim().length > 0; },
    // 순서 변경 중이면 끄는 그룹을 놓일 자리(원래 자리 표시)로 옮겨서 보여 준다
    rows: function () {
      var list = this.groups.slice();
      var d = this.drag;
      if (!d || !d.started) return list.map(function (g) { return { g: g, ghost: false }; });
      var dragged = list.splice(d.from, 1)[0];
      list.splice(d.to, 0, dragged);
      return list.map(function (g) { return { g: g, ghost: g.id === d.id }; });
    },
    dragGroup: function () {
      var d = this.drag;
      return d && d.started ? this.groups.find(function (g) { return g.id === d.id; }) : null;
    },
  },
  mounted: function () {
    var vm = this;
    protoSettingsSubscribe(function (s) { vm.quickOn = s.libraryQuick; });
  },
  beforeUnmount: function () { this.endDrag(); },
  methods: {
    groupCount: libraryGroupCount,
    date: function (g) { return librarySettingsDate(g.createdAt); },
    setQuick: function (on) { protoSettingsWrite({ libraryQuick: on }); },
    openHidden: function () { this.$emit('hidden-games'); },

    // ── 그룹 만들기 (입력칸 · 상태는 그룹에 추가 팝업과 같다) ──
    onInput: function (e) { this.text = e.target.value; this.error = ''; this.checkOverflow(); },
    checkOverflow: function () { var el = this.$refs.input; this.overflow = !!el && el.scrollLeft > 0; },
    clear: function () { this.text = ''; this.error = ''; this.overflow = false; this.$refs.input.focus(); },
    nameTaken: function (name, exceptId) {
      return this.groups.some(function (g) { return g.title === name && g.id !== exceptId; });
    },
    create: function () {
      if (!this.canSubmitName) return;
      var name = this.text.trim();
      if (this.nameTaken(name)) { this.error = LIBRARY_ADD_GROUP_DUP_MSG; return; }
      var id = 'g' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
      this.groups.unshift({ id: id, title: name, gameIds: [], createdAt: Date.now() }); // 새 그룹은 맨 위 (우측패널과 같음)
      this.text = '';
      this.overflow = false;
    },
    onCreateKey: function (e) {
      if (e.isComposing) return;
      if (e.key === 'Enter') { e.preventDefault(); this.create(); }
    },

    // ── 이름 변경 (Figma 그룹명 수정 플로우) — ✎ → 행이 입력칸으로, 글자를 바꾸면 X · 변경이 생긴다.
    // 변경 = 저장, 취소 · Esc = 원래대로, 같은 이름이 있으면 행 아래 에러 ──
    startEdit: function (g) {
      this.editing = { id: g.id, text: g.title, origin: g.title, error: '' };
      this.$nextTick(function () {
        var el = this.editEl();
        if (el) { el.focus(); el.setSelectionRange(el.value.length, el.value.length); }
      });
    },
    // v-for 안의 ref는 배열로 온다
    editEl: function () { var el = this.$refs.editInput; return Array.isArray(el) ? el[0] : el; },
    onEditInput: function (e) { this.editing.text = e.target.value; this.editing.error = ''; },
    editChanged: function () { return !!this.editing && this.editing.text.trim() !== this.editing.origin; },
    clearEdit: function () { this.editing.text = ''; this.editing.error = ''; var el = this.editEl(); if (el) el.focus(); },
    saveEdit: function () {
      var e = this.editing;
      var name = e.text.trim();
      if (!name || name === e.origin) return;
      if (this.nameTaken(name, e.id)) { e.error = LIBRARY_ADD_GROUP_DUP_MSG; return; }
      var g = this.groups.find(function (x) { return x.id === e.id; });
      if (g) g.title = name;
      this.editing = null;
    },
    cancelEdit: function () { this.editing = null; },
    onEditKey: function (e) {
      if (e.isComposing) return;
      if (e.key === 'Enter') { e.preventDefault(); this.saveEdit(); }
      else if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); this.cancelEdit(); }
    },

    // ── 삭제 — 확인 팝업을 거친다 (우측패널 메뉴의 삭제는 즉시, 설정 팝업은 가이드대로 확인) ──
    askDelete: function (g) { this.cancelEdit(); this.confirm = { id: g.id, name: g.title }; },
    doDelete: function () {
      var id = this.confirm.id;
      var s = this.store;
      if (s.addTargetId === id) { s.addTargetId = null; s.selectMode = false; }
      if (s.viewGroupId === id) { s.viewGroupId = null; s.viewOwned = false; }
      s.groups = s.groups.filter(function (g) { return g.id !== id; });
      this.confirm = null;
    },

    // ── 순서 변경 — 손잡이(≡)를 끌면 원래 자리는 40% + 점선, 커서를 따라 프리뷰(우측패널 규칙).
    // 그룹 없는 게임은 항상 맨 아래라 움직이지 않는다 ──
    startDrag: function (e, g, index) {
      if (e.button !== 0 || this.editing) return;
      e.preventDefault();
      var row = e.currentTarget.closest('.library-settings__row');
      var r = row.getBoundingClientRect();
      this.drag = { id: g.id, from: index, to: index, x: r.left, y: r.top, width: r.width, offsetY: e.clientY - r.top, startY: e.clientY, started: false };
      this._onMove = this.onDragMove.bind(this);
      this._onUp = this.onDragUp.bind(this);
      document.addEventListener('mousemove', this._onMove);
      document.addEventListener('mouseup', this._onUp);
    },
    onDragMove: function (e) {
      var d = this.drag;
      if (!d) return;
      if (!d.started) {
        if (Math.abs(e.clientY - d.startY) < LIBRARY_SETTINGS_DRAG_PX) return;
        d.started = true;
        document.body.classList.add('is-library-settings-dragging');
      }
      var list = this.$refs.list;
      var lr = list.getBoundingClientRect();
      var pitch = 52; // 행 44 + 간격 8
      var top = Math.max(lr.top, Math.min(e.clientY - d.offsetY, lr.top + (this.groups.length - 1) * pitch));
      d.y = top;
      d.to = Math.max(0, Math.min(this.groups.length - 1, Math.round((top - lr.top) / pitch)));
    },
    onDragUp: function () {
      var d = this.drag;
      if (d && d.started && d.to !== d.from) {
        var list = this.groups;
        var moved = list.splice(d.from, 1)[0];
        list.splice(d.to, 0, moved);
      }
      this.endDrag();
    },
    endDrag: function () {
      if (this._onMove) document.removeEventListener('mousemove', this._onMove);
      if (this._onUp) document.removeEventListener('mouseup', this._onUp);
      this._onMove = this._onUp = null;
      document.body.classList.remove('is-library-settings-dragging');
      this.drag = null;
    },
  },
  template:
    '<layer-dialog title="라이브러리 설정" width="56rem" min-height="62rem" max-height="62rem" @close="$emit(\'close\')">' +
      '<div class="library-settings" data-name="contents">' +
        // ① 숨겨진 게임 보기 — 공통 버튼 secondary md + 아이콘
        '<button class="stds-button stds-button-secondary stds-button-md library-settings__hidden" type="button" @click="openHidden" data-name="Button">' +
          '<i class="ic-v2-community-number-of-view-line" aria-hidden="true"></i>숨겨진 게임 보기' +
        '</button>' +
        '<div class="library-settings__div" aria-hidden="true"></div>' +

        // ② 빠른 실행
        '<section class="library-settings__section library-settings__section--quick" data-name="빠른 실행">' +
          '<div class="library-settings__head" data-name="title">' +
            '<h3 class="library-settings__title">빠른 실행</h3>' +
            '<p class="library-settings__desc">최근 플레이한 게임을 빠르게 이동할 수 있는 목록입니다.</p>' +
          '</div>' +
          '<stds-checkbox size="sm" :model-value="quickOn" @update:model-value="setQuick">빠른 실행 영역 노출</stds-checkbox>' +
        '</section>' +
        '<div class="library-settings__div" aria-hidden="true"></div>' +

        // ③ 게임 그룹 관리
        '<section class="library-settings__section library-settings__section--groups" data-name="게임 그룹화">' +
          '<div class="library-settings__head" data-name="title">' +
            '<h3 class="library-settings__title">게임 그룹 관리</h3>' +
            '<ul class="library-settings__hints">' +
              '<li>라이브러리에 있는 게임을 원하는 방식으로 정리할 수 있어요.</li>' +
              '<li>그룹은 최대 ' + LIBRARY_ADD_GROUP_MAX + '개까지 만들 수 있어요.</li>' +
            '</ul>' +
          '</div>' +
          // 그룹 만들기 — 라벨 + 입력칸 + 만들기(90)
          '<div class="library-settings__create" data-name="그룹 생성">' +
            '<p class="library-settings__label">그룹 만들기</p>' +
            '<div class="add-group-dialog__row" data-name="input">' +
              '<label class="add-group-dialog__field" :class="{ \'is-active\': focused || text, \'is-error\': error }" data-name="Input">' +
                '<span v-if="overflow" class="add-group-dialog__fade" aria-hidden="true"></span>' +
                '<input ref="input" class="add-group-dialog__input" type="text" :value="text" :maxlength="' + LIBRARY_ADD_GROUP_NAME_MAX + '" :disabled="!canCreate" ' +
                  'placeholder="그룹 이름을 입력해주세요 (최대 ' + LIBRARY_ADD_GROUP_NAME_MAX + '자)" @input="onInput" @scroll="checkOverflow" @keyup="checkOverflow" @keydown="onCreateKey" @focus="focused = true" @blur="focused = false" />' +
                '<button v-if="text" class="add-group-dialog__clear" type="button" aria-label="지우기" @mousedown.prevent @click="clear"><i class="ic-v2-control-close-circle-fill"></i></button>' +
              '</label>' +
              '<button class="stds-button stds-button-primary stds-button-md library-settings__make" type="button" :disabled="!canSubmitName" @mousedown.prevent @click="create" data-name="Button">만들기</button>' +
            '</div>' +
            '<p v-if="error" class="add-group-dialog__error" data-name="유효성문구"><i class="ic-v2-state-warning-circle-fill" aria-hidden="true"></i>{{ error }}</p>' +
          '</div>' +

          // 나의 그룹 목록
          '<div class="library-settings__groups" data-name="게임 그룹 목록">' +
            '<p class="library-settings__label">나의 그룹 목록</p>' +
            '<div v-if="groups.length" ref="list" class="library-settings__list" data-name="list">' +
              '<template v-for="(row, i) in rows" :key="row.g.id">' +
                // 이름 변경 중인 행 (gray860, 입력칸 + 변경 · 취소 xs)
                '<div v-if="editing && editing.id === row.g.id" class="library-settings__edit">' +
                  '<div class="library-settings__row is-editing" data-name="그룹 항목">' +
                    '<i class="ic-v2-navigation-menu-line library-settings__handle" aria-hidden="true"></i>' +
                    '<input ref="editInput" class="library-settings__edit-input" type="text" :value="editing.text" :maxlength="' + LIBRARY_ADD_GROUP_NAME_MAX + '" ' +
                      '@input="onEditInput" @keydown="onEditKey" aria-label="그룹 이름" />' +
                    '<button v-if="editChanged() && editing.text" class="library-settings__edit-clear" type="button" aria-label="지우기" @mousedown.prevent @click="clearEdit"><i class="ic-v2-control-close-circle-fill"></i></button>' +
                    '<span class="library-settings__edit-btns">' +
                      '<button v-if="editChanged() && editing.text.trim()" class="stds-button stds-button-secondary stds-button-xs" type="button" @mousedown.prevent @click="saveEdit">변경</button>' +
                      '<button class="stds-button stds-button-tertiary stds-button-xs" type="button" @mousedown.prevent @click="cancelEdit">취소</button>' +
                    '</span>' +
                  '</div>' +
                  '<p v-if="editing.error" class="add-group-dialog__error" data-name="Input/Tag"><i class="ic-v2-state-warning-circle-fill" aria-hidden="true"></i>{{ editing.error }}</p>' +
                '</div>' +
                '<div v-else class="library-settings__row" :class="{ \'is-ghost\': row.ghost }" data-name="그룹 항목">' +
                  '<svg v-if="row.ghost" class="library-group__ghost" aria-hidden="true"><rect x="0.5" y="0.5" rx="7.5" ry="7.5"></rect></svg>' +
                  '<button class="library-settings__handle-btn" type="button" aria-label="순서 변경" @mousedown="startDrag($event, row.g, i)">' +
                    '<i class="ic-v2-navigation-menu-line library-settings__handle" aria-hidden="true"></i>' +
                  '</button>' +
                  '<span class="library-settings__name-wrap" data-name="게임명">' +
                    '<span class="library-settings__name">{{ row.g.title }}</span>' +
                    '<span class="library-settings__badge" data-name="badge">{{ groupCount(row.g) }}</span>' +
                    '<button class="library-settings__icon-btn library-settings__edit-btn" type="button" aria-label="이름 변경" @click="startEdit(row.g)" data-name="btn"><i class="ic-v2-community-pencil-fill"></i></button>' +
                  '</span>' +
                  '<span class="library-settings__date">{{ date(row.g) }}</span>' +
                  '<button class="library-settings__icon-btn library-settings__delete" type="button" aria-label="삭제" @click="askDelete(row.g)" data-name="삭제"><i class="ic-v2-object-delete-fill"></i></button>' +
                '</div>' +
              '</template>' +
              // 그룹 없는 게임 — 항상 맨 아래, 이름 변경 · 삭제 · 순서 변경 없음
              '<div v-if="ungroupedCount" class="library-settings__row is-static" data-name="그룹 항목">' +
                '<span class="library-settings__handle-btn" aria-hidden="true"><i class="ic-v2-navigation-menu-line library-settings__handle"></i></span>' +
                '<span class="library-settings__name-wrap">' +
                  '<span class="library-settings__name">그룹 없는 게임</span>' +
                  '<span class="library-settings__badge">{{ ungroupedCount }}</span>' +
                '</span>' +
                '<span class="library-settings__date">{{ today }}</span>' +
                '<span class="library-settings__icon-btn library-settings__delete" aria-hidden="true"></span>' +
              '</div>' +
            '</div>' +
            '<div v-else class="add-group-dialog__empty library-settings__empty" data-name="항목 없음">' +
              // 임시 정지 이미지 — 그룹에 추가 팝업과 같은 APNG 자리 (리소스 받으면 같이 교체)
              '<img src="assets/library/group_empty_placeholder.png" width="120" height="120" alt="" />' +
              '<p class="stds-text4">그룹을 만들어 게임을 추가해 보세요.</p>' +
            '</div>' +
          '</div>' +
        '</section>' +
      '</div>' +

      // 끄는 동안 커서를 따라다니는 프리뷰
      '<div v-if="dragGroup" class="library-settings__row library-settings__drag" :style="{ left: drag.x + \'px\', top: drag.y + \'px\', width: drag.width + \'px\' }" aria-hidden="true">' +
        '<span class="library-settings__handle-btn"><i class="ic-v2-navigation-menu-line library-settings__handle"></i></span>' +
        '<span class="library-settings__name-wrap">' +
          '<span class="library-settings__name">{{ dragGroup.title }}</span>' +
          '<span class="library-settings__badge">{{ groupCount(dragGroup) }}</span>' +
          '<span class="library-settings__icon-btn"><i class="ic-v2-community-pencil-fill"></i></span>' +
        '</span>' +
        '<span class="library-settings__date">{{ date(dragGroup) }}</span>' +
        '<span class="library-settings__icon-btn library-settings__delete"><i class="ic-v2-object-delete-fill"></i></span>' +
      '</div>' +

      '<settings-confirm v-if="confirm" :name="confirm.name" @confirm="doDelete" @cancel="confirm = null"></settings-confirm>' +
    '</layer-dialog>',
};

// 라이브러리 콘텐츠(js/library-component.js)에 등록 — 이 파일은 그 뒤, 마운트 전에 로드한다
LibraryMain.components['library-settings-dialog'] = LibrarySettingsDialog;
