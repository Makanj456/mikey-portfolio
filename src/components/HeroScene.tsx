import { useEffect, useRef } from "react"
import * as THREE from "three"

// A slowly rotating wireframe icosahedron wrapped in a cloud of points.
// Kept light: low-poly geometry, capped pixel ratio, and rendering pauses
// while the hero is off screen or the tab is hidden.
export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.z = 6

    const group = new THREE.Group()
    scene.add(group)

    const shape = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.6, 1),
      new THREE.MeshBasicMaterial({ color: 0xa78bfa, wireframe: true, transparent: true, opacity: 0.55 })
    )
    group.add(shape)

    const inner = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.9, 0),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.4 })
    )
    group.add(inner)

    const count = 600
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      // Random points on a shell around the shape
      const r = 2.2 + Math.random() * 1.4
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
    }
    const pointsGeometry = new THREE.BufferGeometry()
    pointsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    const points = new THREE.Points(
      pointsGeometry,
      new THREE.PointsMaterial({ color: 0xc4b5fd, size: 0.025, transparent: true, opacity: 0.7 })
    )
    group.add(points)

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = mount
      if (!w || !h) return
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    resize()
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(mount)

    // Ease the shape toward the pointer for a subtle parallax
    const target = { x: 0, y: 0 }
    const onPointerMove = (e: PointerEvent) => {
      target.x = (e.clientY / window.innerHeight - 0.5) * 0.4
      target.y = (e.clientX / window.innerWidth - 0.5) * 0.6
    }
    window.addEventListener("pointermove", onPointerMove)

    let visible = true
    const intersection = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting))
    intersection.observe(mount)

    const clock = new THREE.Clock()
    let frame = 0
    const tick = () => {
      frame = requestAnimationFrame(tick)
      if (!visible || document.hidden) return
      const t = clock.getElapsedTime()
      if (!reduceMotion) {
        shape.rotation.y = t * 0.15
        shape.rotation.x = t * 0.08
        inner.rotation.y = -t * 0.25
        points.rotation.y = t * 0.03
      }
      group.rotation.x += (target.x - group.rotation.x) * 0.05
      group.rotation.y += (target.y - group.rotation.y) * 0.05
      renderer.render(scene, camera)
    }
    tick()

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      intersection.disconnect()
      window.removeEventListener("pointermove", onPointerMove)
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Points) {
          obj.geometry.dispose()
          ;(obj.material as THREE.Material).dispose()
        }
      })
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} className="h-full w-full" aria-hidden="true" />
}
