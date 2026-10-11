// Shared GLSL snippets for the WebGL image effects.

export const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

// object-fit: cover in UV space
export const cover = /* glsl */ `
  vec2 coverUv(vec2 uv, vec2 plane, vec2 image) {
    float rp = plane.x / plane.y;
    float ri = image.x / image.y;
    vec2 scale = rp > ri ? vec2(1.0, ri / rp) : vec2(rp / ri, 1.0);
    return (uv - 0.5) * scale + 0.5;
  }
`

export const noise = /* glsl */ `
  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float vnoise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 4; i++) { v += a * vnoise(p); p *= 2.0; a *= 0.5; }
    return v;
  }
`

// Slow ambient sequence: each slide drifts in scale, and slides hand over
// through a soft noise-shaped dissolve with a little displacement.
export const heroFragment = /* glsl */ `
  uniform sampler2D uFrom;
  uniform sampler2D uTo;
  uniform vec2 uFromSize;
  uniform vec2 uToSize;
  uniform vec2 uPlane;
  uniform float uProgress;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uScroll;
  varying vec2 vUv;
  ${cover}
  ${noise}

  void main() {
    vec2 uv = vUv;
    // gentle pointer parallax and scroll zoom
    uv += uMouse * 0.012;
    uv = (uv - 0.5) * (1.0 - uScroll * 0.08) + 0.5;

    float n = fbm(uv * 3.0 + uTime * 0.05);
    float edge = smoothstep(uProgress - 0.18, uProgress + 0.18, n * 0.7 + uv.y * 0.3);

    float zoomFrom = 1.0 - 0.05 * uProgress;
    float zoomTo = 0.94 + 0.06 * uProgress;
    vec2 uvFrom = (coverUv(uv, uPlane, uFromSize) - 0.5) * zoomFrom + 0.5;
    vec2 uvTo = (coverUv(uv, uPlane, uToSize) - 0.5) * zoomTo + 0.5;

    float wobble = (1.0 - abs(edge - 0.5) * 2.0) * 0.03;
    vec4 a = texture2D(uFrom, uvFrom + vec2(wobble, 0.0));
    vec4 b = texture2D(uTo, uvTo - vec2(wobble, 0.0));
    gl_FragColor = mix(b, a, edge);
  }
`

// Hover distortion for thumbnails: a soft lens that follows the pointer,
// with a whisper of chromatic offset.
export const hoverFragment = /* glsl */ `
  uniform sampler2D uTex;
  uniform vec2 uTexSize;
  uniform vec2 uPlane;
  uniform vec2 uMouse;
  uniform float uHover;
  uniform float uTime;
  varying vec2 vUv;
  ${cover}
  ${noise}

  void main() {
    vec2 uv = vUv;
    vec2 aspect = vec2(uPlane.x / uPlane.y, 1.0);
    vec2 d = (uv - uMouse) * aspect;
    float dist = length(d);
    float lens = smoothstep(0.45, 0.0, dist) * uHover;
    uv -= d / aspect * lens * 0.18;
    uv += (vnoise(uv * 6.0 + uTime * 0.4) - 0.5) * 0.012 * uHover;
    // slight zoom while hovered
    uv = (uv - 0.5) * (1.0 - 0.04 * uHover) + 0.5;

    vec2 c = coverUv(uv, uPlane, uTexSize);
    float shift = 0.004 * lens;
    float r = texture2D(uTex, c + vec2(shift, 0.0)).r;
    float g = texture2D(uTex, c).g;
    float b = texture2D(uTex, c - vec2(shift, 0.0)).b;
    gl_FragColor = vec4(r, g, b, 1.0);
  }
`
