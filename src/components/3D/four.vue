<template>
  <div>
    <div id="container"></div>

  </div>
</template>

<script>
  import * as Three from 'three'
  export default {
  data () {
    return {
      width: null,
      height: null,
      camera: null,
      scene: null,
      renderer: null,
      light: null
    }
  },
    methods: {
      initThree: function () {
        this.width = document.getElementById('container').clientWidth
        this.height = document.getElementById('container').clientHeight
        this.renderer = new Three.WebGLRenderer({antialias: true})
        this.renderer.setSize(this.width, this.height)
        document.getElementById('container').appendChild(this.renderer.domElement)
        this.renderer.setClearColor(0xFFFFFF, 1.0)
      },

      initCamera: function () {
          this.camera = new Three.PerspectiveCamera(45, this.width / this.height, 1, 10000)
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
      },

      initScene: function () {
          this.scene = new Three.Scene()
      },

      initLight: function () {
          this.light = new Three.DirectionalLight(0xff0000, 1.0, 0)
          this.light.position.set(100, 100, 200)
          this.scene.add(this.light)
      },

      initObject: function () {
         var geometry = new Three.Geometry()
         var material = new Three.LineBasicMaterial({vertexColors: Three.VertexColors})
         var color1 = new Three.Color(0x444444)
         var color2 = new Three.Color(0xFF0000)

         var p1 = new Three.Vector3(-100, 0, 100)
         var p2 = new Three.Vector3(100, 0, -100)
         geometry.vertices.push(p1)
         geometry.vertices.push(p2)
         geometry.colors.push(color1, color2)

         var line = new Three.Line(geometry, material, Three.LineSegments)
         this.scene.add(line)
      },

      render: function () {
          this.renderer.clear()
          this.renderer.render(this.scene, this.camera)
          requestAnimationFrame(this.render)
      }
    },
    mounted () {
    //   this.init()
    //   this.animate()
    this.initThree()
    this.initCamera()
    this.initScene()
    this.initLight()
    this.initObject()
    this.render()
    }
}
</script>

<style>
#container {
 border: none;
 cursor: pointer;
 width: 100%;
 height: 600px;
 background-color: #EEEEEE;
}
</style>
