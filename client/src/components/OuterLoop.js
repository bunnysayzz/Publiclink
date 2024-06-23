import React, { Component } from 'react';

class OuterLoop extends Component {
  componentDidMount() {
    this.init();
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.animationFrameId);
  }

  init() {
    const { canvas } = this.refs;
    this.renderer = new Renderer(canvas);
    this.resize();
    this.loop();
    window.addEventListener('resize', this.resize.bind(this));
  }

  resize() {
    const { canvas } = this.refs;
    const dpr = Math.max(1, 0.5 * window.devicePixelRatio);
    const { innerWidth: width, innerHeight: height } = window;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    this.renderer.updateScale(dpr);
  }

  loop = () => {
    this.renderer.render(performance.now());
    this.animationFrameId = requestAnimationFrame(this.loop);
  };

  render() {
    return (
      <div style={{ margin: 0, touchAction: 'none', overflow: 'hidden' }}>
        <canvas
          ref="canvas"
          style={{ width: '100%', height: 'auto', userSelect: 'none' }}
          id="glCanvas"
        />
      </div>
    );
  }
}

class Renderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.gl = canvas.getContext('webgl2');
    if (!this.gl) {
      console.error('WebGL2 is not available');
      return;
    }
    this.setup();
    this.init();
  }

  #vertexSrc = `#version 300 es
    precision highp float;
    in vec4 position;
    void main() {
      gl_Position = position;
    }
  `;

  #fragmtSrc = `#version 300 es
    precision highp float;
    out vec4 O;
    uniform float time;
    uniform vec2 resolution;
    #define FC gl_FragCoord.xy
    #define R resolution
    #define T time
    #define hue(a) (.6+.6*cos(6.3*(a)+vec3(0,83,21)))
    float rnd(float a) {
      vec2 p=fract(a*vec2(12.9898,78.233));  p+=dot(p,p*345.);
      return fract(p.x*p.y);
    }
    vec3 pattern(vec2 uv) {
      vec3 col=vec3(0);
      for (float i=.0; i++<20.;) {
        float a=rnd(i);
        vec2 n=vec2(a,fract(a*34.56)), p=sin(n*(T+7.)+T*.5);
        float d=dot(uv-p,uv-p);
        col+=.00125/d*hue(dot(uv,uv)+i*.125+T);
      }
      return col;
    }
    void main() {
      vec2 uv=(FC-.5*R)/min(R.x,R.y);
      vec3 col=vec3(0);
      float s=2.4,
      a=atan(uv.x,uv.y),
      b=length(uv);
      uv=vec2(a*5./6.28318,.05/tan(b)+T);
      uv=fract(uv)-.5;
      col+=pattern(uv*s);
      O=vec4(col,1);
    }
  `;

  setup() {
    const { gl } = this;
    const vs = gl.createShader(gl.VERTEX_SHADER);
    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    
    gl.shaderSource(vs, this.#vertexSrc);
    gl.compileShader(vs);
    if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
      console.error('Vertex shader compilation error:', gl.getShaderInfoLog(vs));
      return;
    }

    gl.shaderSource(fs, this.#fragmtSrc);
    gl.compileShader(fs);
    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
      console.error('Fragment shader compilation error:', gl.getShaderInfoLog(fs));
      return;
    }

    this.program = gl.createProgram();
    gl.attachShader(this.program, vs);
    gl.attachShader(this.program, fs);
    gl.linkProgram(this.program);
    if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
      console.error('Shader program linking error:', gl.getProgramInfoLog(this.program));
      return;
    }

    gl.useProgram(this.program);
    this.positionAttr = gl.getAttribLocation(this.program, 'position');
    gl.enableVertexAttribArray(this.positionAttr);

    this.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1,  1,
      -1, -1,
       1,  1,
       1, -1
    ]), gl.STATIC_DRAW);

    gl.vertexAttribPointer(this.positionAttr, 2, gl.FLOAT, false, 0, 0);
  }

  init() {
    const { gl } = this;
    gl.clearColor(0, 0, 0, 1);
    gl.viewport(0, 0, this.canvas.width, this.canvas.height);

    this.resolutionUniform = gl.getUniformLocation(this.program, 'resolution');
    this.timeUniform = gl.getUniformLocation(this.program, 'time');
  }

  updateScale(scale) {
    const { gl } = this;
    gl.viewport(0, 0, this.canvas.width * scale, this.canvas.height * scale);
  }

  render(now) {
    const { gl } = this;
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.uniform1f(this.timeUniform, now * 0.001);
    gl.uniform2f(this.resolutionUniform, this.canvas.width, this.canvas.height);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
}

export default OuterLoop;
