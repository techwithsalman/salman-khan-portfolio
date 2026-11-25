p = r'c:\Users\HP\Desktop\Office Work\Portfolios\Portfolio 05\2mcrafters.com\_next\static\chunks\8734.c7e0a9326b6dad2c.js'

with open(p, 'r', encoding='utf-8') as f:
    c = f.read()

# 1. Patch buildRoom() walls with pubg-wall-tactical.webp
old_walls = 'buildRoom(){let t=M([[0,"#0b0b0c"],[.2,"#141416"],[.6,"#17171a"],[.86,"#121214"],[1,"#0b0b0c"]]),e=new i.eaF(new i.Ho_(18,18,6.2,160,1,!0),new i.V9B({map:t,side:i.hsX}));e.position.y=3.1;let s=M([[0,"#0d0d0f"],[.3,"#19191c"],[.8,"#151518"],[1,"#0c0c0e"]]),a=new i.eaF(new i.Ho_(12.2,12.2,6.2,120,1,!0),new i.V9B({map:s,side:i.hB5}));a.position.y=3.1;'

new_walls = 'buildRoom(){let t=this.texture("pubg-wall-tactical.webp",!0);t.repeat.set(16,1);let e=new i.eaF(new i.Ho_(18,18,6.2,160,1,!0),new i.V9B({map:t,side:i.hsX}));e.position.y=3.1;let s=this.texture("pubg-wall-tactical.webp",!0);s.repeat.set(12,1);let a=new i.eaF(new i.Ho_(12.2,12.2,6.2,120,1,!0),new i.V9B({map:s,side:i.hB5}));a.position.y=3.1;'

if old_walls in c:
    c = c.replace(old_walls, new_walls)
    print("1. Successfully patched tactical walls in chunk 8734.")
else:
    print("Warning: old_walls string not found in chunk 8734.")

# 2. Patch lighting colors in updateLights
old_lights = 'this.leds.setColorAt(t.index,s.setScalar(.02+.98*e)),this.glows.setColorAt(t.index,s.setScalar(.75*e)),this.washes.setColorAt(t.index,s.setScalar(.2*e)),this.bedPools.setColorAt(t.index,s.setScalar(.55*e)),this.roadPools.setColorAt(t.index,s.setScalar(.42*e))'

new_lights = 'this.leds.setColorAt(t.index,s.set("#F5B82E").multiplyScalar(.02+.98*e)),this.glows.setColorAt(t.index,s.set("#FFAA24").multiplyScalar(.85*e)),this.washes.setColorAt(t.index,s.set("#FF7800").multiplyScalar(.35*e)),this.bedPools.setColorAt(t.index,s.set("#FF9500").multiplyScalar(.65*e)),this.roadPools.setColorAt(t.index,s.set("#FFAA24").multiplyScalar(.55*e))'

if old_lights in c:
    c = c.replace(old_lights, new_lights)
    print("2. Successfully patched warm amber/orange lighting in chunk 8734.")
else:
    print("Warning: old_lights string not found in chunk 8734.")

# 3. Patch door halo color to warm golden amber
old_halo = 'color:"#3a9283"'
new_halo = 'color:"#FFAA24"'
if old_halo in c:
    c = c.replace(old_halo, new_halo)
    print("3. Successfully patched door halo color.")

old_halo2 = 'color:"#2a6f62"'
new_halo2 = 'color:"#FF7800"'
if old_halo2 in c:
    c = c.replace(old_halo2, new_halo2)
    print("4. Successfully patched exit glow color.")

with open(p, 'w', encoding='utf-8') as f:
    f.write(c)

print("Saved updated chunk 8734 on disk.")
