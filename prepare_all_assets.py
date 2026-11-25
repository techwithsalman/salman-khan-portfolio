import os
import shutil
from PIL import Image

laptop_dir = '2mcrafters.com/images/mohamedandaloussi/laptop'
os.makedirs(laptop_dir, exist_ok=True)
salman_new_dir = r'C:\Users\HP\Desktop\Office Work\Portfolios\Salman-Portfolio-New'

# 1. Prepare Character
char_path = r'C:\Users\HP\Downloads\salman-pubg-character.png'
im_char = Image.open(char_path)
print("Character image loaded:", im_char.size, im_char.mode)

# Save multi-resolution webp and png
im_char.save(os.path.join(laptop_dir, 'salman-pubg-character.png'), 'PNG')
im_char.save(os.path.join(laptop_dir, 'portrait-jacket-1448.webp'), 'WEBP', quality=95)
im_char.resize((int(im_char.width * 1080 / 1448), int(im_char.height * 1080 / 1448)), Image.LANCZOS).save(os.path.join(laptop_dir, 'portrait-jacket-1080.webp'), 'WEBP', quality=95)
im_char.resize((int(im_char.width * 720 / 1448), int(im_char.height * 720 / 1448)), Image.LANCZOS).save(os.path.join(laptop_dir, 'portrait-jacket-720.webp'), 'WEBP', quality=95)
print("Saved character multi-resolution webp assets.")

# 2. Copy Card PNG
card_src = r'C:/Users/HP/.gemini/antigravity/brain/e91bc56b-5aeb-4edf-baff-15b0d0b5cf69/.user_uploaded/media_1795608947664_b1c7cdd6.png'
card_dest = os.path.join(laptop_dir, 'pubg-card-lanyard.png')
shutil.copyfile(card_src, card_dest)
print("Copied PUBG Card PNG to:", card_dest)

# 3. Prepare Salman's real photo from Salman-Portfolio-New
salman_real_src = os.path.join(salman_new_dir, 'salman.png')
im_salman = Image.open(salman_real_src)
print("Loaded Salman real photo:", im_salman.size, im_salman.mode)
# Crop nicely around head and shoulders for badge
# Salman real photo is (664, 913), head is around top
crop_box = (60, 20, 604, 620) # tight head and shoulders crop
im_badge = im_salman.crop(crop_box)
im_badge.save(os.path.join(laptop_dir, 'salman-real-photo.png'), 'PNG')
im_badge.save(os.path.join(laptop_dir, 'badge-photo.webp'), 'WEBP', quality=95)
print("Saved Salman real badge photo.")

# 4. Copy and convert project screenshots for laptop cases
projects_map = {
    'case-tangierport': os.path.join(salman_new_dir, 'assets', 'social_media_os_dashboard.png'),
    'case-crafters': os.path.join(salman_new_dir, 'web-developer', 'postnexa.webp'),
    'case-taxivoyagemogador': os.path.join(salman_new_dir, 'assets', 'instagram_automation_dashboard.png'),
    'case-boukirdiamond': os.path.join(salman_new_dir, 'assets', 'custom_business_software_ui.png'),
    'case-portazur': os.path.join(salman_new_dir, 'ui-ux-designer', 'haymaker-hunting.webp'),
    'case-atlasnest': os.path.join(salman_new_dir, 'ui-ux-designer', 'travels-company.webp'),
    'case-rovelisatlas': os.path.join(salman_new_dir, 'ui-ux-designer', 'food-website.webp')
}

for case_name, src_path in projects_map.items():
    if os.path.exists(src_path):
        im_proj = Image.open(src_path)
        dest_webp = os.path.join(laptop_dir, f"{case_name}.webp")
        # Ensure aspect ratio fits laptop screen (around 16:10 or 16:9)
        im_proj.convert('RGB').save(dest_webp, 'WEBP', quality=92)
        print(f"Updated {case_name}.webp from {os.path.basename(src_path)}")
    else:
        print(f"Warning: {src_path} not found!")

print("All assets prepared successfully!")
