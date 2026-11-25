from PIL import Image, ImageFilter

im = Image.open('salman_character_clean_transparent.png')
# Extract alpha channel
r, g, b, a = im.split()

# Smooth alpha slightly for clean edge anti-aliasing
a_blur = a.filter(ImageFilter.GaussianBlur(radius=0.7))

# Combine back
clean_im = Image.merge('RGBA', (r, g, b, a_blur))
clean_im.save('salman_character_clean_feathered.png')
print("Saved salman_character_clean_feathered.png")
