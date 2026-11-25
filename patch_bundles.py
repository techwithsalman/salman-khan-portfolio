with open('2mcrafters.com/_next/static/chunks/8447-c2247280dfd2b6a2.js', 'r', encoding='utf-8') as f:
    code = f.read()

target = 'name:"Mohamed Andaloussi L\'Khaoua",displayName:"Mohamed Andaloussi",company:"2M Crafters",email:"andalossi90@gmail.com",phone:"+212688284783",whatsapp:"+212688284783",website:"https://2mcrafters.com/mohamedandaloussi",linkedin:"https://www.linkedin.com/in/mohamedandaloussi",instagram:"https://www.instagram.com/andaluussi/",github:"https://github.com/mohamedandaloussi",facebook:"https://www.facebook.com/mohamed.andalossi.5070/",behance:"https://www.behance.net/mhmedaloui"'

replacement = 'name:"Salman Khan",displayName:"Salman Khan",company:"Tech With Salman",email:"hello@salman.design",phone:"+923152181308",whatsapp:"+923152181308",website:"https://salman-portfolio-new.netlify.app/",linkedin:"https://linkedin.com/in/salmankhan",instagram:"https://instagram.com/techwithsalman",github:"https://github.com/salmankhan",facebook:"https://facebook.com/salmankhan",behance:"https://behance.net/salmankhan"'

if target in code:
    code = code.replace(target, replacement)
    # Also replace 2M CRAFTERS with TECH WITH SALMAN in ticket rows
    code = code.replace('"2M CRAFTERS"', '"TECH WITH SALMAN"')
    with open('2mcrafters.com/_next/static/chunks/8447-c2247280dfd2b6a2.js', 'w', encoding='utf-8') as f:
        f.write(code)
    print("Successfully patched 76358 in 8447!")
else:
    print("Target not found in 8447! Checking andalossi index:")
    idx = code.find('andalossi90@gmail.com')
    print("Index:", idx)
    if idx != -1:
        print(code[max(0, idx-50):idx+150])

# Also patch layout chunk module 44615
with open('2mcrafters.com/_next/static/chunks/app/(standalone)/mohamedandaloussi/layout-695d0bbab915b5e1.js', 'r', encoding='utf-8') as f:
    layout_code = f.read()

layout_target = 'https://wa.me/?text=Hello%20Mohamed%2C%20I%20saw%20your%20portfolio%20and%20I%27d%20like%20to%20discuss%20a%20project.'
layout_repl = 'https://wa.me/923152181308?text=Hello%20Salman%2C%20I%20saw%20your%20portfolio%20and%20I%27d%20like%20to%20discuss%20a%20project.'
if layout_target in layout_code:
    layout_code = layout_code.replace(layout_target, layout_repl)
    layout_code = layout_code.replace('Hello Mohamed', 'Hello Salman')
    with open('2mcrafters.com/_next/static/chunks/app/(standalone)/mohamedandaloussi/layout-695d0bbab915b5e1.js', 'w', encoding='utf-8') as f:
        f.write(layout_code)
    print("Successfully patched layout 44615!")
else:
    print("layout_target not found in layout chunk.")
