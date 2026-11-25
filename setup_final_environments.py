import os
import shutil
from PIL import Image, ImageDraw

base_dir = r"c:\Users\HP\Desktop\Office Work\Portfolios\Portfolio 05\2mcrafters.com"
uploaded = r"C:\Users\HP\.gemini\antigravity\brain\e91bc56b-5aeb-4edf-baff-15b0d0b5cf69\.user_uploaded"

cv_src = os.path.join(uploaded, "media_1795620808266_74e70395.jpg")
tv_src = os.path.join(uploaded, "media_1795620841350_f64c8801.jpg")
footer_src = os.path.join(uploaded, "media_1795620835364_2e40d384.jpg")

# 1. CV Background
print("--- 1. Setting up CV Background ---")
cv_dir = os.path.join(base_dir, "images", "mohamedandaloussi", "cv")
os.makedirs(cv_dir, exist_ok=True)
im_cv = Image.open(cv_src)
im_cv.save(os.path.join(cv_dir, "pubg-cv-bg.png"), "PNG")
im_cv.save(os.path.join(cv_dir, "pubg-cv-bg.jpg"), "JPEG", quality=95)
im_cv.resize((1920, 1080), Image.Resampling.LANCZOS).save(os.path.join(cv_dir, "room-1920.webp"), "WEBP", quality=95)
im_cv.resize((1280, 720), Image.Resampling.LANCZOS).save(os.path.join(cv_dir, "room-1280.webp"), "WEBP", quality=92)
print("CV Background saved in all resolutions.")

# 2. Footer Background
print("--- 2. Setting up Tactical Footer Background ---")
footer_dir = os.path.join(base_dir, "images", "mohamedandaloussi", "footer")
os.makedirs(footer_dir, exist_ok=True)
im_footer = Image.open(footer_src)
im_footer.save(os.path.join(footer_dir, "pubg-footer-bg.png"), "PNG")
im_footer.save(os.path.join(footer_dir, "pubg-footer-bg.webp"), "WEBP", quality=95)
print("Footer Background saved.")

# 3. TV Closing Scene
print("--- 3. Setting up TV Closing Scene ---")
off_dir = os.path.join(base_dir, "images", "mohamedandaloussi", "offline")
os.makedirs(off_dir, exist_ok=True)
im_tv = Image.open(tv_src).convert("RGB")
w, h = im_tv.size

# Screen bezel inner glass area in 1024x576
x0, y0 = int(w * 0.395), int(h * 0.418)
x1, y1 = int(w * 0.589), int(h * 0.672)
radius = int(h * 0.038)

draw = ImageDraw.Draw(im_tv)
draw.rounded_rectangle([x0, y0, x1, y1], radius=radius, fill=(11, 13, 16))
draw.rounded_rectangle([x0, y0, x1, y1], radius=radius, outline=(24, 26, 30), width=3)
draw.rounded_rectangle([x0+3, y0+3, x1-3, y1-3], radius=radius-2, outline=(6, 7, 9), width=2)
draw.polygon([(x0 + 10, y0 + 10), (x0 + 60, y0 + 10), (x0 + 10, y0 + 60)], fill=(28, 32, 40))

tv_day_path = os.path.join(off_dir, "tv-day-1920.webp")
tv_night_path = os.path.join(off_dir, "tv-night-1920.webp")
im_tv.resize((1920, 1080), Image.Resampling.LANCZOS).save(tv_day_path, "WEBP", quality=95)
im_tv.resize((1920, 1080), Image.Resampling.LANCZOS).save(tv_night_path, "WEBP", quality=95)
im_tv.resize((1280, 720), Image.Resampling.LANCZOS).save(os.path.join(off_dir, "tv-day-1280.webp"), "WEBP", quality=92)
im_tv.resize((1280, 720), Image.Resampling.LANCZOS).save(os.path.join(off_dir, "tv-night-1280.webp"), "WEBP", quality=92)
print("Masked TV scenes saved in all resolutions.")

# 4. Copy Salman's portfolio videos
print("--- 4. Replacing TV videos ---")
salman_new = r"C:\Users\HP\Desktop\Office Work\Portfolios\Salman-Portfolio-New\web-developer"
v1 = os.path.join(salman_new, "project-2.mp4")
v2 = os.path.join(salman_new, "project-4.mp4")
profile_dir = os.path.join(base_dir, "images", "mohamedandaloussi", "profile")
os.makedirs(profile_dir, exist_ok=True)

targets = ["IT.mp4", "Graphic_designer.mp4", "editing.mp4", "meta.mp4", "photog.mp4"]
for i, t in enumerate(targets):
    src = v1 if i % 2 == 0 else v2
    if os.path.exists(src):
        shutil.copyfile(src, os.path.join(profile_dir, t))
        print(f"Replaced {t} with {os.path.basename(src)}")

# 5. Patch TV Branding to SK//TV · CH 02
print("--- 5. Patching SK//TV · CH 02 in chunks ---")
chunks_dir = os.path.join(base_dir, "_next", "static", "chunks")
for root, _, files in os.walk(chunks_dir):
    for f in files:
        if f.endswith(".js"):
            fp = os.path.join(root, f)
            with open(fp, "r", encoding="utf-8", errors="ignore") as jf:
                content = jf.read()
            if "MA//TV" in content or "MA // TV" in content:
                content = content.replace("MA//TV", "SK//TV").replace("MA // TV", "SK // TV")
                with open(fp, "w", encoding="utf-8") as jf:
                    jf.write(content)
                print("Patched SK//TV in:", f)

print("All final environments successfully configured!")
