import os

html_content = """<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Curriculum Vitae — Salman Khan</title>
  <meta http-equiv="refresh" content="0; url=/2mcrafters.com/mohamedandaloussi/index.html#cv">
  <style>
    body {
      margin: 0;
      background: #080808 url('/images/mohamedandaloussi/profile/pubg-cv-bg.jpg') no-repeat center center fixed;
      background-size: cover;
      color: #F5F5F5;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      text-align: center;
    }
    .card {
      background: rgba(18, 18, 18, 0.88);
      border: 1px solid rgba(245, 184, 0, 0.5);
      border-radius: 16px;
      padding: 36px 48px;
      backdrop-filter: blur(12px);
      box-shadow: 0 20px 50px rgba(0,0,0,0.8);
      max-width: 500px;
    }
    h1 { color: #F5B800; margin: 0 0 10px 0; font-size: 28px; }
    p { color: #CBD5E1; margin: 0 0 24px 0; font-size: 15px; }
    .btn {
      display: inline-block;
      padding: 12px 28px;
      background: linear-gradient(135deg, #F5B800, #D97706);
      color: #080808;
      font-weight: 800;
      text-decoration: none;
      border-radius: 9999px;
      transition: transform 0.2s;
    }
  </style>
</head>
<body>
  <div class="card">
    <h1>SALMAN KHAN</h1>
    <p>Curriculum Vitae · Creative Designer & Developer</p>
    <a class="btn" href="/2mcrafters.com/mohamedandaloussi/index.html#cv">Open Interactive CV</a>
  </div>
  <script>
    window.location.replace('/2mcrafters.com/mohamedandaloussi/index.html#cv');
  </script>
</body>
</html>
"""

dirs = [
    r'c:\Users\HP\Desktop\Office Work\Portfolios\Portfolio 05\mohamedandaloussi\cv',
    r'c:\Users\HP\Desktop\Office Work\Portfolios\Portfolio 05\2mcrafters.com\mohamedandaloussi\cv'
]

for d in dirs:
    os.makedirs(d, exist_ok=True)
    with open(os.path.join(d, 'index.html'), 'w', encoding='utf-8') as f:
        f.write(html_content)
    print(f'Created {d}\\index.html')
