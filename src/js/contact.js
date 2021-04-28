import '/scss/main.scss';
import * as THREE from './three.js';
import * as menu from './header.js';

const renderer = new THREE.WebGLRenderer({
    antialias: true
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  // THREE colors look like 0xff00ff, same as #ff00ff
  renderer.setClearColor(0x333333, 1)
  
  // find the element to add the renderer to!
  const section = document.querySelector(".canvas")
  section.appendChild(renderer.domElement)
  
  // lets create a scene
  const scene = new THREE.Scene()
  
  // lets create a camera
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000)
  camera.position.z = -50
  camera.lookAt(scene.position)
  
  // lets add some lighting
  const light = new THREE.DirectionalLight(0xffffff, 1)
  light.position.set(0, 0, -1)
  scene.add(light)
  
  // hold some data about the shapes being added
  const shapes = []
  
  // lets add in an animation loop
  const animate = function () {
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
    camera.position.setZ(camera.position.z + 0.5)
    // lets rotate the shapes each frame
    shapes.forEach(shape => {
      shape.rotateX(0.01)
    })
  }
  
  // start the animation
  animate()
  
  // lets hold a state of hue
  let hue = 0
  
  // lets make a function that creates a shape
  const createShape = function (x, y) {
    const geometries = [
    //   new THREE.IcosahedronGeometry(18),
      new THREE.TorusGeometry(10, 6, 32, 200),
      new THREE.SphereGeometry(16, 64, 64)
    ]
    
    const randNumber = Math.floor(Math.random() * geometries.length)
    const geometry = geometries[randNumber]
    
    const emissiveColor = new THREE.Color("hsl(" + hue + ", 100%, 50%)")
    const material = new THREE.MeshNormalMaterial({
    //   color: 0xffffff,
    //   emissive: emissiveColor
    })
    
    const shape = new THREE.Mesh(geometry, material)
    
    shape.position.set(
      (window.innerWidth / 2) - x, 
      (window.innerHeight / 2) - y, 
      camera.position.z + 500
    )
    shape.rotateX(0.5)
    shape.rotateZ(0.5)
    
    // lets add it to the scene and the list of shapes
    shapes.push(shape) 
    scene.add(shape)
    
    // update the hue for next time
    hue = hue + 1
  }
  

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

document.addEventListener('click', (e) => {
    createShape(e.pageX, e.pageY)
})
window.addEventListener('DOMContentLoaded', () => {
    let number = 5;
    for(let i=0; i<number; i++) {
        let x = Math.random() * window.innerWidth
        let y = Math.random() * window.innerHeight
        createShape(x, y)
    }
})