'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function HeroAmbientCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const width = container.clientWidth || window.innerWidth
    const height = container.clientHeight || window.innerHeight

    // Scene, Camera, Renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000)
    camera.position.z = 25

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Particle Dust System
    const particleCount = 180
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const scales = new Float32Array(particleCount)
    const alphas = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20
      scales[i] = Math.random() * 2.5 + 1.0
      alphas[i] = Math.random() * 0.6 + 0.2
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1))

    // Subtle cyan/amber dual tone dust shader
    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color('#38bdf8') }, // cyan
        uColor2: { value: new THREE.Color('#f59e0b') }, // amber
      },
      vertexShader: `
        attribute float scale;
        uniform float uTime;
        varying float vAlpha;
        varying vec3 vPos;

        void main() {
          vPos = position;
          vec3 p = position;
          p.y += sin(uTime * 0.4 + position.x * 0.5) * 0.4;
          p.x += cos(uTime * 0.3 + position.y * 0.5) * 0.3;

          vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = scale * (200.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;

          vAlpha = 0.5 + 0.5 * sin(uTime * 0.8 + position.z);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        varying float vAlpha;
        varying vec3 vPos;

        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          float strength = pow(1.0 - (dist * 2.0), 2.0);

          vec3 col = mix(uColor1, uColor2, sin(vPos.x * 0.1) * 0.5 + 0.5);
          gl_FragColor = vec4(col, strength * vAlpha * 0.5);
        }
      `,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    // Subtle mouse tracking
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 4
      mouseY = (e.clientY / window.innerHeight - 0.5) * 4
    }
    window.addEventListener('mousemove', onMouseMove)

    // Resize handler
    const onResize = () => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    // Animation Loop
    let animId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const elapsed = clock.getElapsedTime()
      material.uniforms.uTime.value = elapsed

      // Damped camera tilt
      targetX += (mouseX - targetX) * 0.05
      targetY += (mouseY - targetY) * 0.05
      particles.rotation.y = targetX * 0.05 + elapsed * 0.02
      particles.rotation.x = -targetY * 0.05

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-10 overflow-hidden opacity-70"
      aria-hidden="true"
    />
  )
}
