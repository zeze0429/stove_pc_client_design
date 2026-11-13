# DLC 설치 중 점 3개 APNG — css/download.css @keyframes download-dots와 같은 값
from PIL import Image, ImageDraw
import sys

def bezier_ease(x, p1=(0.42, 0), p2=(0.58, 1)):
    # cubic-bezier(0.42,0,0.58,1): x로 t를 이분 탐색해서 y 반환
    def bx(t): return 3*(1-t)**2*t*p1[0] + 3*(1-t)*t**2*p2[0] + t**3
    def by(t): return 3*(1-t)**2*t*p1[1] + 3*(1-t)*t**2*p2[1] + t**3
    lo, hi = 0.0, 1.0
    for _ in range(40):
        mid = (lo + hi) / 2
        if bx(mid) < x: lo = mid
        else: hi = mid
    return by((lo + hi) / 2)

def opacity(t_ms, i):
    t = ((t_ms - i * 200) % 1200) / 1200
    if t < 0.3: return 0.3 + 0.7 * bezier_ease(t / 0.3)
    if t < 0.6: return 1.0 - 0.7 * bezier_ease((t - 0.3) / 0.3)
    return 0.3

COLOR = (0x3C, 0x75, 0xFF)  # brand-blue = glob blue500
FRAME_MS = 20               # 50fps, 1200ms = 60프레임
SS = 16                     # 안티앨리어싱용 확대 배율

def frame(scale, t_ms):
    size = 16 * scale
    big = size * SS
    alpha = Image.new('L', (big, big), 0)
    for i, cx in enumerate((2, 8, 14)):
        a = round(255 * opacity(t_ms, i))
        r = 2 * scale * SS
        x, y = cx * scale * SS, 8 * scale * SS
        ImageDraw.Draw(alpha).ellipse((x - r, y - r, x + r, y + r), fill=a)  # 점끼리 안 겹침
    alpha = alpha.resize((size, size), Image.LANCZOS)
    img = Image.new('RGBA', (size, size), COLOR + (0,))
    img.putalpha(alpha)
    return img

out_dir = sys.argv[1]
for scale, suffix in ((1, ''), (2, '@2x'), (3, '@3x')):
    frames = [frame(scale, k * FRAME_MS) for k in range(1200 // FRAME_MS)]
    path = f'{out_dir}/dlc_installing_dots{suffix}.png'
    frames[0].save(path, save_all=True, append_images=frames[1:], duration=FRAME_MS, loop=0, disposal=1, blend=0, optimize=False)
    print(path)
