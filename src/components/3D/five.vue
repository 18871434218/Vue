<template>
  <div>
    <div id="container"></div>

  </div>
</template>

<script>
  import * as Three from 'three'
  import OrbitControls from 'three-orbitcontrols'
  export default {
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
        let width = document.getElementById('container').clientWidth
        let height = document.getElementById('container').clientHeight
        this.renderer = new Three.WebGLRenderer({antialias: true})
        this.renderer.setSize(width, height)
        let container = document.getElementById('container')
        container.appendChild(this.renderer.domElement)
        this.renderer.setClearColor(0xFFFFFF, 1.0)

        this.camera = new Three.PerspectiveCamera(45, width / height, 1, 10000)
        this.camera.position.x = 0
        this.camera.position.y = 1000
        this.camera.position.z = 0
        this.camera.up.x = 0
        this.camera.up.y = 0
        this.camera.up.z = 1
        this.camera.lookAt({
            x: 0,
            y: 0,
            z: 0
        })

        this.scene = new Three.Scene()
        let light = new Three.DirectionalLight(0xFF0000, 1.0, 0)
        light.position.set(100, 100, 200)
        this.scene.add(light)

        let geometry = new Three.Geometry()
        let material = new Three.LineBasicMaterial({
            vertexColors: Three.VertexColors
        })
        var color1 = new Three.Color(0x444444)
        var color2 = new Three.Color(0xff0000)
        var p1 = new Three.Vector3(-100, 0, 100)
        var p2 = new Three.Vector3(100, 0, -100)
        geometry.vertices.push(p1)
        geometry.vertices.push(p2)
        geometry.colors.push(color1, color2)
        var line = new Three.Line(geometry, material, Three.LineSegments)
        this.scene.add(line)
        // let geometry = new Three.CubeGeometry(1, 1, 1)
        // let material = new Three.MeshBasicMaterial({color: 0x00ff00})
        // this.mesh = new Three.Mesh(geometry, material)
        // this.scene.add(this.mesh)

        // this.renderer = new Three.WebGLRenderer({antialias: true})
        // this.renderer.setSize(container.clientWidth, container.clientHeight)
        // container.appendChild(this.renderer.domElement)
      },
      animate: function () {
        // requestAnimationFrame(this.animate)
        // this.mesh.rotation.x += 0.01
        // this.mesh.rotation.y += 0.02
        // this.renderer.render(this.scene, this.camera)

        this.renderer.clear()
        this.renderer.render(this.scene, this.camera)
        requestAnimationFrame(this.animate)
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
#container {
  border: none;
  cursor: pointer;
  width: 100%;
  height: 600px;
  background-color: #FFFFFF;
}
</style>
