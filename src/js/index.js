import '/scss/main.scss';
import * as THREE from './three.js';
import * as menu from './header.js';
import image1 from '/images/earthspec1k.jpg';
import image2 from '/images/particle.png';
import image3 from '/images/hi.png';
// console.log('I have loaded', t)
// set up a renderer


const renderer = new THREE.WebGLRenderer({
  antialias: true
})
let sw;
let sectionTag;
let camera;
  if( navigator.userAgent.match(/Android/i)
  || navigator.userAgent.match(/webOS/i)
  || navigator.userAgent.match(/iPhone/i)
  || navigator.userAgent.match(/iPad/i)
  || navigator.userAgent.match(/iPod/i)
  || navigator.userAgent.match(/BlackBerry/i)
  || navigator.userAgent.match(/Windows Phone/i)
  ) {
    sectionTag = document.querySelector("#mobilecanvas")
    sw = sectionTag.getBoundingClientRect()
    sectionTag.appendChild(renderer.domElement)
    renderer.setSize(sw.width, window.innerHeight/100*50)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x000000, 1)
    camera = new THREE.PerspectiveCamera(50, sw.width / ((window.innerHeight/100)*50) , 0.1, 10000)
  } else {
    sectionTag = document.querySelector("#canvas")
    sw = sectionTag.getBoundingClientRect()
    sectionTag.appendChild(renderer.domElement)
    renderer.setSize(sw.width, 750)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x000000, 1)
    camera = new THREE.PerspectiveCamera(50, sw.width / 750, 0.1, 10000)
  }



const scene = new THREE.Scene()
scene.fog = new THREE.FogExp2(0x000000, 0.00025)

// add some lighting
const ambientLight = new THREE.AmbientLight(0x777777)
scene.add(ambientLight)

// add a spotlight
const pointLight = new THREE.PointLight(0xffffff, 1, 0)
pointLight.position.set(500, 500, -2000)
scene.add(pointLight)

camera.position.z = -3000

// make a THREE.js loader
const loader = new THREE.TextureLoader()


// make planet wilson
const makePlanet = function () {
  const texture = loader.load("../images/earthspec1k.jpg")
  const geometry = new THREE.SphereGeometry(800, 128, 128)
  const material = new THREE.MeshPhongMaterial({
      map: texture,
      color: 0xa3f3ff,
      emissive: 0x00ddff,
      wireframe: true
  });
  const mesh = new THREE.Mesh(geometry, material)
//   material.specularMap    = THREE.TextureLoader('images/earthspec1k.jpg')
//   material.specular  = new THREE.Color('grey')
//   const material = new THREE.MeshLambertMaterial({
//     //  color: 0x50bbff,
//     map: texture,
//     wireframe: true
//   })
//   const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)
  return mesh
}

// make a single ring
const makeRing = function (width, color) {
  const geometry = new THREE.TorusGeometry(width, 5, 16, 100)
  const material = new THREE.MeshBasicMaterial({
    color: color
  })
  const mesh = new THREE.Mesh(geometry, material)
  
  mesh.geometry.rotateX(Math.PI / 2)
  mesh.geometry.rotateZ(Math.PI / 10)

  scene.add(mesh)
  return mesh
}

const makeStars = function (url, maxNum) {
  const texture = loader.load(url)
  const geometry = new THREE.Geometry()
  
  for (let i = 0; i < maxNum; i = i + 1) {
    const point = new THREE.Vector3()
    const sphericalPoint = new THREE.Spherical(
    	900 + Math.random() * 900,
      2 * Math.PI * Math.random(),
      Math.PI * Math.random()
    )
    
    point.setFromSpherical(sphericalPoint)
    
    geometry.vertices.push(point)
  }
  
  const material = new THREE.PointsMaterial({
    size: 50,
    map: texture,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthTest: true,
    depthWrite: false
  })
  
  const points = new THREE.Points(geometry, material)
  
  scene.add(points)
  
  return points
}

// // make a curved line
// const makeLine = function () {
//   const path = new THREE.QuadraticBezierCurve3(
//     new THREE.Vector3(800, 0, 0),
//     new THREE.Vector3(1200, 0, -1200),
//     new THREE.Vector3(0, 0, -800)
//   )
  
//   const geometry = new THREE.TubeGeometry(path, 50, 8, 20, false)
//   const material = new THREE.MeshBasicMaterial({
//     color: 0xff0000
//   })
  
//   const mesh = new THREE.Mesh(geometry, material)
  
//   scene.add(mesh)
  
//   return mesh
// }


// make a moon
// const makeMoon = function () {
//   const texture = loader.load("wilson-skin.png")
//   const geometry = new THREE.SphereGeometry(100, 64, 64)
//   const material = new THREE.MeshLambertMaterial({
//     map: texture
//   })
//   const mesh = new THREE.Mesh(geometry, material)
  
//   scene.add(mesh)
//   return mesh
// }

const earth = makePlanet()
// const ring1 = makeRing(1100, 0xffffff)
// const ring2 = makeRing(1200, 0xffffff)
// const ring3 = makeRing(1300, 0xffdb00)
const stars = makeStars("../images/hi.png", 1000)
const stars2 = makeStars("../images/particle.png", 4000)
// const line = makeLine()

// const moon = makeMoon()
// const moonGroup = new THREE.Group()
// moonGroup.add(moon)
// scene.add(moonGroup)
// moon.translateX(-1500)

// hold the camera positions
let currentX = 0
let currentY = 0
let aimX = 0
let aimY = 0

const animate = function () {
  const diffX = aimX - currentX
  const diffY = aimY - currentY
  
  currentX = currentX + diffX * 0.01
  currentY = currentY + diffY * 0.01
  
  const sphere = new THREE.Spherical(
  	3000,
    (currentY * 0.001) - Math.PI / 2,
    (currentX * 0.001)
  )
  
  camera.position.setFromSpherical(sphere)
  
  // camera.position.x = currentX
  // camera.position.y = currentY  
  
  camera.lookAt(scene.position)
  
  earth.rotateY(0.01)
//   line.rotateY(0.01)
  
  // moon.rotateY(0.02)
  // moonGroup.rotateY(0.02)
  
//   ring1.geometry.rotateY(0.004)
//   ring2.geometry.rotateY(-0.002)
//   ring3.geometry.rotateY(-0.003)
  
  renderer.render(scene, camera)
  
  requestAnimationFrame(animate)
}
animate()


window.addEventListener("resize", function () {
  sw = sectionTag.getBoundingClientRect()
  if ((navigator.userAgent.match(/Android/i)
  || navigator.userAgent.match(/webOS/i)
  || navigator.userAgent.match(/iPhone/i)
  || navigator.userAgent.match(/iPad/i)
  || navigator.userAgent.match(/iPod/i)
  || navigator.userAgent.match(/BlackBerry/i)
  || navigator.userAgent.match(/Windows Phone/i))) {
    camera.aspect = sw.width / ((window.innerHeight/100)*50);
    camera.updateProjectionMatrix()
    renderer.setSize(sw.width, ((window.innerHeight/100)*50))
  } else {
    camera.aspect = sw.width / 750 
    camera.updateProjectionMatrix()
    renderer.setSize(sw.width, 750)
  }
})

// variation: scroll down page
// document.addEventListener("scroll", function () {
//   const scrollPosition = window.pageYOffset
  
//   earth.rotation.set(0, scrollPosition / 100, 0)
// })

let isMouseDown = false
let startX = 0
let startY = 0

document.addEventListener("mousedown", function (event) {
  isMouseDown = true
  startX = event.pageX
  startY = event.pageY
})

document.addEventListener("mouseup", function () {
  isMouseDown = false
})

document.addEventListener("mousemove", function (event) {
  // console.log(event.pageY)
  if (isMouseDown) {
    aimX = (aimX + ((event.pageX - startX) * 8))
    aimY = (aimY + ((event.pageY - startY) * 8))
    startX = event.pageX
    startY = event.pageY
  } else {
    aimX = (aimX + ((event.pageX - startX) * 8)/4)
    aimY = (aimY + ((event.pageY - startY) * 8)/4)
    startX = event.pageX
    startY = event.pageY
  }
})
document.addEventListener('scroll', (e) => {
  console.log(window.scrollY)
  // aimX = aimX + ((event.pageX - startX) * 8)
  // aimY = aimY + ((event.pageY - startY) * 8)
  // startX = event.pageX
  // startY = event.pageY
})

document.addEventListener("touchmove", function (event) {
//   aimX = ((window.innerWidth / 2) - event.pageX) * 4
//   aimY = ((window.innerHeight / 2) - event.pageY) * 4
})

