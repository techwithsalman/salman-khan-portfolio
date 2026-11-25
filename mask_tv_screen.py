import os
import shutil
from PIL import Image, ImageDraw, ImageFilter

off_dir = r'c:\Users\HP\Desktop\Office Work\Portfolios\Portfolio 05\2mcrafters.com\images\mohamedandaloussi\offline'
tv_day_path = os.path.join(off_dir, 'tv-day-1920.webp')
tv_night_path = os.path.join(off_dir, 'tv-night-1920.webp')

def mask_tv(img_path):
    im = Image.open(img_path).convert('RGB')
    w, h = im.size
    
    # TV screen bezel inner glass area
    # In 1672 x 941:
    x0, y0 = int(w * 0.395), int(h * 0.418)
    x1, y1 = int(w * 0.589), int(h * 0.672)
    radius = int(h * 0.038)
    
    # Create dark CRT glass fill
    draw = ImageDraw.Draw(im)
    # Fill rounded rectangle with dark CRT black
    draw.rounded_rectangle([x0, y0, x1, y1], radius=radius, fill=(11, 13, 16))
    
    # Draw subtle inner CRT bezel shadow
    draw.rounded_rectangle([x0, y0, x1, y1], radius=radius, outline=(24, 26, 30), width=3)
    draw.rounded_rectangle([x0+3, y0+3, x1-3, y1-3], radius=radius-2, outline=(6, 7, 9), width=2)
    
    # Subtle curved glass corner highlight
    highlight_poly = [(x0 + 10, y0 + 10), (x0 + 60, y0 + 10), (x0 + 10, y0 + 60)]
    draw.polygon(highlight_poly, fill=(28, 32, 40))
    
    im.save(img_path, 'WEBP', quality=95)
    print(f'Masked screen on {img_path}')

mask_tv(tv_day_path)
mask_tv(tv_night_path)

# Also update 1280 versions
im_day = Image.open(tv_day_path)
im_night = Image.open(tv_night_path)
im_day.resize((1280, 720), Image.Resampling.LANCZOS).save(os.path.join(off_dir, 'tv-day-1280.webp'), 'WEBP', quality=92)
im_night.resize((1280, 720), Image.Resampling.LANCZOS).save(os.path.join(off_dir, 'tv-night-1280.webp'), 'WEBP', quality=92)
print('Updated all tv-*.webp files.')

# 2. Replace TV videos with Salman Khan's portfolio project videos
src_video1 = r'C:\Users\HP\Desktop\Office Work\Portfolios\Salman-Portfolio-New\web-developer\project-2.mp4'
src_video2 = r'C:\Users\HP\Desktop\Office Work\Portfolios\Salman-Portfolio-New\web-developer\project-4.mp4'
profile_dir = r'c:\Users\HP\Desktop\Office Work\Portfolios\Portfolio 05\2mcrafters.com\images\mohamedandaloussi\profile'

targets = ['IT.mp4', 'Graphic_designer.mp4', 'editing.mp4', 'meta.mp4', 'photog.mp4']
for idx, t in enumerate(targets):
    dest = os.path.join(profile_dir, t)
    src = src_video1 if idx % 2 == 0 else src_video2
    if os.path.exists(src):
        shutil.copyfile(src, dest)
        print(f'Replaced {t} with {src}')
