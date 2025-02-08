
import { useEffect, useRef } from "react"
import * as THREE from "three"

export function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!containerRef.current) return
    
    const container = containerRef.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    
    renderer.setSize(window.innerWidth, window.innerHeight)
    container.appendChild(renderer.domElement)
    
    const geometry = new THREE.IcosahedronGeometry(20, 1)
    const material = new THREE.MeshPhongMaterial({
      color: 0x4a90e2,
      wireframe: true,
      transparent: true,
      opacity: 0.2
    })
    
    const sphere = new THREE.Mesh(geometry, material)
    scene.add(sphere)
    
    const light = new THREE.DirectionalLight(0xffffff, 1)
    light.position.set(0, 0, 1)
    scene.add(light)
    
    camera.position.z = 30
    
    const animate = () => {
      requestAnimationFrame(animate)
      sphere.rotation.x += 0.001
      sphere.rotation.y += 0.001
      renderer.render(scene, camera)
    }
    
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    
    window.addEventListener("resize", handleResize)
    animate()
    
    return () => {
      window.removeEventListener("resize", handleResize)
      if (container) {
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
      className="fixed inset-0 -z-10 bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900"
    />
  )
}
