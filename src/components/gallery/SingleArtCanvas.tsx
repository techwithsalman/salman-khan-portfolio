'use client'

import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { ArtGalleryItem } from '@/types/portfolio'

export default function SingleArtCanvas({ item }: { item: ArtGalleryItem }) {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return
    const container = mountRef.current
    const width = container.clientWidth || 300
    const height = container.clientHeight || 300

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100)
    camera.position.z = 4.5

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambientLight)

    const pointLight1 = new THREE.PointLight(item.color, 2.5, 50)
    pointLight1.position.set(5, 5, 5)
    scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(item.accentColor, 2.0, 50)
    pointLight2.position.set(-5, -5, 5)
    scene.add(pointLight2)

    // Geometry Generation based on item.geometryType
    let mesh: THREE.Mesh | THREE.Group

    switch (item.geometryType) {
      case 'torusKnot': {
        const geom = new THREE.TorusKnotGeometry(1, 0.32, 128, 32)
        const mat = new THREE.MeshStandardMaterial({
          color: item.color,
          roughness: 0.15,
          metalness: 0.85,
          wireframe: false,
        })
        const wireMat = new THREE.MeshBasicMaterial({
          color: item.accentColor,
          wireframe: true,
          transparent: true,
          opacity: 0.25,
        })
        mesh = new THREE.Group()
        mesh.add(new THREE.Mesh(geom, mat))
        mesh.add(new THREE.Mesh(geom, wireMat))
        break
      }
      case 'icosahedron': {
        const group = new THREE.Group()
        const outerGeom = new THREE.IcosahedronGeometry(1.4, 0)
        const outerMat = new THREE.MeshStandardMaterial({
          color: item.color,
          wireframe: true,
          roughness: 0.2,
          metalness: 0.9,
        })
        const innerGeom = new THREE.OctahedronGeometry(0.7, 0)
        const innerMat = new THREE.MeshStandardMaterial({
          color: item.accentColor,
          emissive: item.accentColor,
          emissiveIntensity: 0.6,
          roughness: 0.3,
          metalness: 0.7,
        })
        group.add(new THREE.Mesh(outerGeom, outerMat))
        group.add(new THREE.Mesh(innerGeom, innerMat))
        mesh = group
        break
      }
      case 'cyberCube': {
        const group = new THREE.Group()
        const outerGeom = new THREE.BoxGeometry(1.8, 1.8, 1.8)
        const outerMat = new THREE.MeshStandardMaterial({
          color: item.color,
          wireframe: true,
        })
        const innerGeom = new THREE.BoxGeometry(0.9, 0.9, 0.9)
        const innerMat = new THREE.MeshStandardMaterial({
          color: item.accentColor,
          roughness: 0.2,
          metalness: 0.9,
        })
        group.add(new THREE.Mesh(outerGeom, outerMat))
        group.add(new THREE.Mesh(innerGeom, innerMat))
        mesh = group
        break
      }
      case 'quantumSphere': {
        const geom = new THREE.SphereGeometry(1.2, 64, 64)
        const mat = new THREE.MeshStandardMaterial({
          color: item.color,
          roughness: 0.1,
          metalness: 0.9,
          wireframe: true,
        })
        mesh = new THREE.Mesh(geom, mat)
        break
      }
      case 'hyperPrism': {
        const geom = new THREE.ConeGeometry(1.2, 2.2, 5)
        const mat = new THREE.MeshPhysicalMaterial({
          color: item.color,
          transmission: 0.6,
          opacity: 1,
          transparent: true,
          roughness: 0.1,
          metalness: 0.1,
          ior: 1.5,
        })
        mesh = new THREE.Mesh(geom, mat)
        break
      }
      case 'mobiusStrip':
      default: {
        const geom = new THREE.TorusGeometry(1.2, 0.35, 30, 200)
        const mat = new THREE.MeshStandardMaterial({
          color: item.color,
          metalness: 0.8,
          roughness: 0.2,
        })
        mesh = new THREE.Mesh(geom, mat)
        break
      }
    }

    scene.add(mesh)

    // Interactive Drag / Orbit state
    let isDragging = false
    let prevMouseX = 0
    let prevMouseY = 0

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true
      prevMouseX = e.clientX
      prevMouseY = e.clientY
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return
      const deltaX = e.clientX - prevMouseX
      const deltaY = e.clientY - prevMouseY
      mesh.rotation.y += deltaX * 0.015
      mesh.rotation.x += deltaY * 0.015
      prevMouseX = e.clientX
      prevMouseY = e.clientY
    }

    const onMouseUp = () => {
      isDragging = false
    }

    container.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)

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

    // Animation loop
    let animId: number
    const clock = new THREE.Clock()

    const animate = () => {
      animId = requestAnimationFrame(animate)
      const elapsed = clock.getElapsedTime()

      if (!isDragging) {
        mesh.rotation.y = elapsed * 0.4
        mesh.rotation.x = Math.sin(elapsed * 0.3) * 0.25
      }

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      container.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('resize', onResize)
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [item])

  return (
    <div
      ref={mountRef}
      className="w-full h-full cursor-grab active:cursor-grabbing flex items-center justify-center select-none"
      title="Click and drag to rotate in 3D"
    />
  )
}
