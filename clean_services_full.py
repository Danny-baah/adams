import cv2
import numpy as np

path = r'C:\Users\DELL\.gemini\antigravity\brain\48d7fab2-044a-4c6d-a3ff-7073bfc7dff6\.user_uploaded\media_1794033601581_97725e29.jpg'
orig = cv2.imdecode(np.fromfile(path, dtype=np.uint8), cv2.IMREAD_COLOR)
h, w, _ = orig.shape

clean = orig.copy()
gray = cv2.cvtColor(clean, cv2.COLOR_BGR2GRAY)
mask = np.zeros((h, w), dtype=np.uint8)

# Mask the white text:
# 1) Top navbar text: y=15..80, x=30..650
mask[15:80, 40:650] = (gray[15:80, 40:650] > 140) * 255
# 2) Eyebrow & headline: y=95..320, x=30..610
mask[95:320, 30:610] = (gray[95:320, 30:610] > 110) * 255
# 3) Paragraph: y=325..415, x=40..510
mask[325:415, 40:510] = (gray[325:415, 40:510] > 130) * 255
# 4) Red button: y=415..495, x=40..255
r = clean[:, :, 2].astype(int)
g = clean[:, :, 1].astype(int)
b = clean[:, :, 0].astype(int)
red_mask = (r > 150) & (g < 70) & (b < 70)
mask[red_mask] = 255
# 5) Outline button 'Projekt besprechen': y=415..495, x=240..425
mask[415:495, 240:425] = (gray[415:495, 240:425] > 100) * 255

# Dilate mask
kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7))
mask_dil = cv2.dilate(mask, kernel, iterations=2)

inpainted = cv2.inpaint(clean, mask_dil, 9, cv2.INPAINT_TELEA)

# Let's smooth out the text region on the left x < 550
left_roi = inpainted[:, 0:560]
left_smooth = cv2.bilateralFilter(left_roi, 9, 85, 85)

final_full = inpainted.copy()
final_full[:, 0:500] = left_smooth[:, 0:500]

for x in range(500, 560):
    alpha = (x - 500) / 60.0
    final_full[:, x] = np.clip(inpainted[:, x].astype(np.float32) * alpha + left_smooth[:, x].astype(np.float32) * (1.0 - alpha), 0, 255).astype(np.uint8)

cv2.imwrite('public/services/services_hero_photo_full.jpg', final_full, [int(cv2.IMWRITE_JPEG_QUALITY), 95])
print('Generated services_hero_photo_full.jpg!')

