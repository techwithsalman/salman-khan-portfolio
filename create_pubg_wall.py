import math
import random
import os
from PIL import Image, ImageDraw, ImageFilter

w, h = 2048, 1024
im = Image.new('RGB', (w, h), (18, 18, 20))
draw = ImageDraw.Draw(im)

# 1. Base dark tactical concrete texture with organic noise & surface variation
random.seed(42)
pixels = im.load()
for y in range(h):
    # subtle vertical lighting falloff (darker ceiling & floor, slightly lighter eye-level)
    vert_factor = math.sin((y / h) * math.pi)
    base_val = 14 + int(9 * vert_factor)
    for x in range(w):
        noise = random.randint(-4, 4)
        c = max(6, min(38, base_val + noise))
        # subtle warm charcoal tint (R slightly > G > B)
        pixels[x, y] = (c + 2, c + 1, c)

# 2. Add subtle horizontal concrete panels / seam lines
draw.line([(0, 140), (w, 140)], fill=(8, 8, 10), width=3)
draw.line([(0, 142), (w, 142)], fill=(28, 28, 32), width=1)
draw.line([(0, 880), (w, 880)], fill=(8, 8, 10), width=3)
draw.line([(0, 882), (w, 882)], fill=(26, 26, 30), width=1)

# 3. Yellow and Black Tactical Hazard Warning Stripes Bands
stripe_w = 42
for x in range(-100, w + 100, stripe_w * 2):
    # Yellow stripe: #F5B800 / (230, 170, 15)
    poly_top = [(x, 45), (x + stripe_w, 45), (x + stripe_w + 35, 125), (x + 35, 125)]
    draw.polygon(poly_top, fill=(215, 160, 20))
    # Bottom hazard stripes
    poly_bot = [(x, 895), (x + stripe_w, 895), (x + stripe_w + 35, 975), (x + 35, 975)]
    draw.polygon(poly_bot, fill=(215, 160, 20))

# 4. PUBG Helmet Silhouette Stencil Decal at x=400, y=400
stencil_color = (65, 60, 52)
draw.arc([320, 320, 500, 500], 180, 0, fill=stencil_color, width=6)
draw.line([(320, 410), (340, 490)], fill=stencil_color, width=6)
draw.line([(500, 410), (480, 490)], fill=stencil_color, width=6)
draw.rectangle([360, 400, 460, 450], outline=stencil_color, width=5)
draw.line([(360, 425), (460, 425)], fill=stencil_color, width=3)

# 5. Parachute & Supply Crate Decal at x=1400, y=340
draw.arc([1320, 260, 1520, 400], 180, 0, fill=stencil_color, width=5)
draw.line([(1320, 330), (1520, 330)], fill=stencil_color, width=4)
draw.line([(1330, 330), (1410, 440)], fill=stencil_color, width=2)
draw.line([(1380, 330), (1415, 440)], fill=stencil_color, width=2)
draw.line([(1460, 330), (1425, 440)], fill=stencil_color, width=2)
draw.line([(1510, 330), (1430, 440)], fill=stencil_color, width=2)
draw.rectangle([(1400, 440), (1440, 480)], outline=stencil_color, width=4)
draw.line([(1400, 460), (1440, 460)], fill=stencil_color, width=3)

# 6. Apply subtle blur & concrete grain
im = im.filter(ImageFilter.GaussianBlur(radius=0.6))

gallery_dir = r'c:\Users\HP\Desktop\Office Work\Portfolios\Portfolio 05\2mcrafters.com\images\mohamedandaloussi\gallery'
os.makedirs(gallery_dir, exist_ok=True)
out_webp = os.path.join(gallery_dir, 'pubg-wall-tactical.webp')
out_png = os.path.join(gallery_dir, 'pubg-wall-tactical.png')
im.save(out_webp, 'WEBP', quality=92)
im.save(out_png, 'PNG')
print('Generated pubg-wall-tactical.webp and .png successfully.')
