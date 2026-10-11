import {
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  TextureLoader,
  Vector2,
  WebGLRenderer,
} from "three"

import { hoverFragment, vertex } from "./shaders"

export type DistortGL = {
  renderer: WebGLRenderer
  render: () => void
  dispose: () => void
  uniforms: { uMouse: { value: Vector2 }; uHover: { value: number }; uTime: { value: number } }
}

// Loaded on first hover, so three.js stays out of the initial bundle.
export function createDistortGL(el: HTMLElement, src: string): DistortGL | null {
  let renderer: WebGLRenderer
  try {
    renderer = new WebGLRenderer({ antialias: false, alpha: true })
  } catch {
    return null
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
  const canvas = renderer.domElement
  canvas.className = "pointer-events-none absolute inset-0 h-full w-full opacity-0"
  el.appendChild(canvas)

  const scene = new Scene()
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1)
  const uniforms = {
    uTex: { value: null as unknown },
    uTexSize: { value: new Vector2(1, 1) },
    uPlane: { value: new Vector2(1, 1) },
    uMouse: { value: new Vector2(0.5, 0.5) },
    uHover: { value: 0 },
    uTime: { value: 0 },
  }
  const material = new ShaderMaterial({ uniforms, vertexShader: vertex, fragmentShader: hoverFragment })
  const geometry = new PlaneGeometry(2, 2)
  scene.add(new Mesh(geometry, material))

  const resize = () => {
    renderer.setSize(el.clientWidth, el.clientHeight, false)
    uniforms.uPlane.value.set(el.clientWidth, el.clientHeight)
  }
  resize()
  const ro = new ResizeObserver(resize)
  ro.observe(el)

  let ready = false
  new TextureLoader().load(src, (t) => {
    const img = t.image as HTMLImageElement
    uniforms.uTex.value = t
    uniforms.uTexSize.value.set(img.width, img.height)
    ready = true
    canvas.style.opacity = "1"
    render()
  })

  const render = () => {
    if (ready) renderer.render(scene, camera)
  }
  return {
    renderer,
    render,
    uniforms,
    dispose: () => {
      ro.disconnect()
      ;(uniforms.uTex.value as { dispose?: () => void } | null)?.dispose?.()
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      canvas.remove()
    },
  }
}
