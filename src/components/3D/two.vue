<template>
  <div id="app">
    <div id="container"></div>

  </div>
</template>

<script>
  import * as Three from 'three'
  // eslint-disable-next-line no-unused-vars
//   import { OrbitControls } from 'three'
  import OrbitControls from 'three-orbitcontrols'
  export default {
  name: 'App',
  data () {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      controls: null
    }
  },
    methods: {
      init: function () {
        let container = document.getElementById('container')
        this.camera = new Three.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.01, 10)
        this.camera.position.z = 0.6
        this.scene = new Three.Scene()
        
        let geometry = new Three.BoxGeometry(0.2, 0.2, 0.2)
        let material = new Three.MeshNormalMaterial()
        
        this.mesh = new Three.Mesh(geometry, material)
        this.scene.add(this.mesh)

        this.renderer = new Three.WebGLRenderer({antialias: true})
        this.renderer.setSize(container.clientWidth, container.clientHeight)
        container.appendChild(this.renderer.domElement)
      },
      animate: function () {
        this.renderer.render(this.scene, this.camera)
        requestAnimationFrame(this.animate)
        // this.mesh.rotation.x += 0.01
        // this.mesh.rotation.y += 0.02
        // this.renderer.render(this.scene, this.camera)
      },
      control: function () {
          this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      }
    },
    mounted () {
      this.init()
      this.animate()
      this.control()
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#container {
  height: 400px;
}
</style>
