<template>
  <div id="app">
    <div id="container"></div>
  </div>
</template>

<script>
import * as Three from 'three'
import { PCDLoader } from 'three/examples/jsm/loaders/PCDLoader.js'
import OrbitControls from 'three-orbitcontrols'
export default {
  data () {
    return {
    //   camera: null,
    //   scene: null,
    //   renderer: null
    //   mesh: null,
    //   controls: null
    }
  },
  methods: {
    init: function (pcdPath) {
      let container = document.getElementById('container')
      var camera = new Three.PerspectiveCamera(
        70,
        container.clientWidth / container.clientHeight,
        0.1,
        50000
      )
      var renderer = new Three.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setClearColor(new Three.Color(0x87ceeb))
      renderer.setSize(container.clientWidth, container.clientHeight)
      container.appendChild(renderer.domElement)

      // this.camera.position.z = 0.6
      var scene = new Three.Scene()
      scene.add(new Three.HemisphereLight(0xffffff, 1.5))
      // let geometry = new Three.BoxGeometry(0.2, 0.2, 0.2)
      // let material = new Three.MeshNormalMaterial()

      // this.mesh = new Three.Mesh(geometry, material)
      // this.scene.add(new Three.HemisphereLight(0xffffff, 1.5))

      // this.renderer = new Three.WebGLRenderer({antialias: true, alpha: true})
      // this.renderer.setClearColor(new Three.Color(0x87CEEB))
      // this.renderer.setSize(container.clientWidth, container.clientHeight)
      // container.appendChild(this.renderer.domElement)

      var loader = new PCDLoader()
      //   loader.load()
      loader.load(pcdPath, function (points) {
        // console.log('-----')
        // eslint-disable-next-line no-tabs
        points.material.size = 0.5
        scene.add(points)
        // console.log('---------')
        // eslint-disable-next-line no-tabs
        var middle = new Three.Vector3()
        // eslint-disable-next-line no-tabs
        points.geometry.computeBoundingBox()
        points.geometry.boundingBox.getCenter(middle)
        console.log(middle)
        points.applyMatrix4(
          new Three.Matrix4().makeTranslation(-middle.x, -middle.y, -middle.z)
        )

        var largestDimension = Math.max(
          points.geometry.boundingBox.max.x,
          // eslint-disable-next-line no-mixed-spaces-and-tabs
          points.geometry.boundingBox.max.y,
          points.geometry.boundingBox.max.z
        )
        camera.position.z = largestDimension * 1.2

        var animate = function () {
          // eslint-disable-next-line no-tabs
          renderer.render(scene, camera)
          requestAnimationFrame(animate)
          // eslint-disable-next-line no-tabs
        }

        animate()

        var controlss = function () {
             return new OrbitControls(camera, renderer.domElement)
        }

        controlss()
        // this.controls = new OrbitControls(camera, renderer.domElement)
        // eslint-disable-next-line no-tabs
      })
    }
    //   animate: function () {
    //     this.renderer.render(this.scene, this.camera)
    //     requestAnimationFrame(this.animate)
    //     // this.mesh.rotation.x += 0.01
    //     // this.mesh.rotation.y += 0.02
    //     // this.renderer.render(this.scene, this.camera)
    //   },
    //   control: function () {
    //       this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    //   }
  },
  mounted () {
    //   this.init()
    //   this.animate()
    //   this.control()
    this.init('static/map.pcd')
    // require('')
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
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
