from PIL import Image

p2 = r'C:/Users/HP/.gemini/antigravity/brain/e91bc56b-5aeb-4edf-baff-15b0d0b5cf69/.user_uploaded/media_1795608947736_e84844eb.jpg'
im = Image.open(p2).convert('RGBA')
width, height = im.size

# Check the background pixels around borders
# The background is solid black (0,0,0)
# We can do a flood fill or connected component from outer borders
from collections import deque

visited = [[False]*height for _ in range(width)]
queue = deque()

# Add all border pixels that are black (r+g+b <= 15)
for x in range(width):
    for y in [0, 1, 2, height-1, height-2]:
        r, g, b, _ = im.getpixel((x, y))
        if r + g + b <= 18:
            visited[x][y] = True
            queue.append((x, y))

for y in range(height):
    for x in [0, 1, 2, width-1, width-2]:
        if not visited[x][y]:
            r, g, b, _ = im.getpixel((x, y))
            if r + g + b <= 18:
                visited[x][y] = True
                queue.append((x, y))

# BFS to find all connected background pixels
while queue:
    cx, cy = queue.popleft()
    for dx, dy in [(-1,0), (1,0), (0,-1), (0,1)]:
        nx, ny = cx + dx, cy + dy
        if 0 <= nx < width and 0 <= ny < height and not visited[nx][ny]:
            r, g, b, _ = im.getpixel((nx, ny))
            # If dark black background
            if r + g + b <= 18:
                visited[nx][ny] = True
                queue.append((nx, ny))

print("Total background pixels found:", sum(visited[x][y] for x in range(width) for y in range(height)))
print("Total pixels:", width * height)

# Create transparent image
out = Image.new('RGBA', (width, height), (0,0,0,0))
out_data = out.load()
im_data = im.load()

for x in range(width):
    for y in range(height):
        if not visited[x][y]:
            out_data[x, y] = im_data[x, y]

# Check edges for anti-aliasing
out.save('salman_character_clean_transparent.png')
print("Saved salman_character_clean_transparent.png")
