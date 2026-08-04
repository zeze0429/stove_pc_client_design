# UPDATE 배지 — 깜빡임 인터랙션 가이드

GNB 헤더의 UPDATE 알림 버튼. 업데이트가 있음을 알리기 위해 평상시 계속 깜빡이고, hover하면 멈추고 hover 이미지에 고정된다.

## 1. 에셋 (이미지 2장)

| 이미지 | 용도 | 실제 사이즈 | 표시 사이즈 |
|---|---|---|---|
| `luncher_update_enabled.png` | 기본 상태 (연한 배경) | 160×48px (2x) | 80×24px |
| `luncher_update_hover_pressed.png` | hover / pressed 상태 (채워진 배경) | 160×48px (2x) | 80×24px |

두 이미지 다 표시 크기의 정확히 2배 해상도 (레티나 대응).

## 2. 마크업 구조

이미지 2장을 같은 자리에 절대좌표로 겹쳐놓고, opacity로 어느 쪽을 보여줄지 제어한다.

```html
<button class="update-badge" type="button" aria-label="업데이트">
  <img class="update-badge__img update-badge__img--default" src="{기본이미지 경로}" alt="" />
  <img class="update-badge__img update-badge__img--active" src="{hover이미지 경로}" alt="" />
</button>
```

React/JSX라면:
```tsx
<button className="update-badge" type="button" aria-label="업데이트">
  <img className="update-badge__img update-badge__img--default" src={updateEnabled} alt="" />
  <img className="update-badge__img update-badge__img--active" src={updateHoverPressed} alt="" />
</button>
```

## 3. CSS — 기본 레이아웃

```css
.update-badge {
  position: relative;
  width: 80px;
  height: 24px;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
  flex: 0 0 auto;
}
.update-badge__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
}
```

## 4. CSS — 깜빡임 인터랙션 (핵심)

**동작 방식**: 두 이미지가 opacity로 서로 교차하며 깜빡인다 (기본 이미지가 흐려질 때 hover 이미지가 진해지고, 반대도 마찬가지). hover/pressed 시에는 깜빡임을 멈추고 hover 이미지에 고정한다.

```css
@keyframes update-badge-blink {
  0%, 100% { opacity: 1; }
  50%      { opacity: 0; }
}

.update-badge__img--default {
  animation: update-badge-blink 1.6s ease-in-out infinite;
}
.update-badge__img--active {
  animation: update-badge-blink 1.6s ease-in-out infinite;
  animation-delay: -0.8s; /* 절반 주기 오프셋 → 기본 이미지와 정확히 반대로 깜빡여 서로 교차 */
}

/* 접근성: 모션 최소화 설정 시 애니메이션 없이 기본 이미지로 정지 */
@media (prefers-reduced-motion: reduce) {
  .update-badge__img--default,
  .update-badge__img--active {
    animation: none;
  }
  .update-badge__img--default { opacity: 1; }
  .update-badge__img--active { opacity: 0; }
}

/* hover / pressed: 깜빡임 정지 + hover 이미지로 고정 */
.update-badge:hover .update-badge__img--default,
.update-badge:active .update-badge__img--default {
  animation: none;
  opacity: 0;
}
.update-badge:hover .update-badge__img--active,
.update-badge:active .update-badge__img--active {
  animation: none;
  opacity: 1;
}
```

### ⚠️ 구현 시 반드시 주의할 점

`animation-delay: -0.8s` 같은 **음수 딜레이**로 두 애니메이션의 위상을 절반 주기만큼 어긋나게 만드는 게 핵심이다. 그냥 `animation-delay: 0.8s`(양수)를 주면 시작이 늦춰질 뿐 위상이 안 맞아 두 이미지가 동시에 사라지는 순간이 생길 수 있다. 음수 딜레이는 "이미 그만큼 재생된 상태"에서 시작하는 것이므로 정확히 반대 위상이 보장된다.

hover 시 **`opacity`만 덮어쓰면 안 된다.** 이미 무한 반복 중인 `animation`이 매 프레임 `opacity` 값을 계속 지배하기 때문에, 일반 규칙으로 `opacity:0`을 줘도 무시되고 계속 깜빡인다. 반드시 `animation: none`으로 애니메이션 자체를 꺼야 정지 상태가 확정된다.

## 5. 상태값 요약

| 상태 | 트리거 | 동작 |
|---|---|---|
| **Default** | 평상시 | 두 이미지가 1.6초 주기로 서로 교차하며 깜빡임 |
| **Hover** | 마우스 오버 | 깜빡임 즉시 정지, hover 이미지(채워진 배경)로 고정 |
| **Pressed** | 클릭(active) | hover와 동일 |
| **Reduced motion** | OS 접근성 설정 | 애니메이션 없이 기본 이미지로 정지 |

## 6. 헤더 내 정렬

로고와 UPDATE 배지 모두 헤더 안에서 세로 중앙 정렬한다.

```css
.gnb-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
```
