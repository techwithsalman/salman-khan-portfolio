import os
import shutil

html_files = [
    '2mcrafters.com/mohamedandaloussi/index.html',
    '2mcrafters.com/index.html',
    'index.html'
]

# Ensure files exist at root and in 2mcrafters.com
shutil.copyfile('pubg-portfolio.css', '2mcrafters.com/pubg-portfolio.css')
shutil.copyfile('portfolio-config.js', '2mcrafters.com/portfolio-config.js')
shutil.copyfile('portfolio-personalizer.js', '2mcrafters.com/portfolio-personalizer.js')

for hf in html_files:
    if os.path.exists(hf):
        with open(hf, 'r', encoding='utf-8') as f:
            content = f.read()
        
        changed = False
        # 1. Inject CSS if not present
        if 'pubg-portfolio.css' not in content:
            content = content.replace('</head>', '<link rel="stylesheet" href="/pubg-portfolio.css"></head>')
            changed = True
        
        # 2. Inject JS scripts if not present
        if 'portfolio-personalizer.js' not in content:
            scripts_tag = '<script src="/portfolio-config.js"></script><script src="/portfolio-personalizer.js"></script></body>'
            content = content.replace('</body>', scripts_tag)
            changed = True
            
        # 3. Clean Google Analytics / Facebook Pixel trackers if desired
        content = content.replace('connect.facebook.net', '127.0.0.1/mock-fb')
        content = content.replace('googletagmanager.com/gtag/js', '127.0.0.1/mock-gtm')
        
        with open(hf, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Injected scripts and CSS into {hf} (changed: {changed})")

print("Sync completed successfully.")
