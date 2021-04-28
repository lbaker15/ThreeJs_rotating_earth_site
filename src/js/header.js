import {gsap} from 'gsap';

let cursor = document.querySelector('.cursor');
let right = document.querySelector('.rightHover');
let rightTwo = document.querySelector('.rightHoverTwo');
let overlayHover = document.querySelector('.overlayHover');
let circleHeader = document.querySelector('.headerCircle');
let overlay = document.querySelector('.overlay');
let open = false;
let disabled = false; 
let h1 = document.querySelectorAll('.right h1')

let cursorLocked = true;

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        cursorLocked = false;
    }, 500)
})

//CURSOR ANIM
window.addEventListener('mousemove', (e) => {
    if(!cursorLocked) {
    let doc = document.documentElement;
    cursor.style.left = e.clientX - 40;
    cursor.style.top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0) + e.clientY - 40;
    }
})

//OVERLAY ANIMS
let circleAnim = gsap.timeline({paused: true, repeat: 20})
circleAnim.to('.circleOverlay', {rotate: 360, duration: 6, ease: 'linear'})

//TL IS INITIAL TIMELINE
let tl = gsap.timeline({paused: true}); 
tl.to('.overlayHover', {display: 'block', zIndex: 202})
tl.to('.cursor', {zIndex: 1000})
tl.to(overlay, {display: 'block', background: 'rgb(29, 29, 29)', duration: 0.5})
tl.to('.right', {display: 'block', zIndex: 204, duration: 0.01})
tl.to('.left', {display: 'flex', zIndex: 204, duration: 0.01})
tl.fromTo('.right h1', {opacity: 0, rotate: -5}, {opacity: 1, rotate: 0, duration: 1})
Array.from(h1[0].getElementsByTagName('div')).map((x, i) => {
    let a;
    if (i===0) {a='<0.2'} else {a='<0.1'}
    tl.fromTo(x, {y: 20}, { y:0, duration: 0.3 }, a)
})
Array.from(h1[1].getElementsByTagName('div')).map((x, i) => {
    let a;
    if (i===0) {a='>-0.4'} else {a='<0.1'}
    tl.fromTo(x, {y: 20}, { y:0, duration: 0.3 }, a)
})
tl.fromTo('.right h2', {opacity: 0}, {opacity: 1, duration: 1}, '>-0.4');


//ANIMATIONS NESTED IN MENU
overlayHover.addEventListener('mousemove', (e) => {
    let left = ((window.innerWidth/2 - e.clientX) ) / 8
    let top = ((window.innerHeight/2 - e.clientY) ) / 4
    gsap.to('.circleOverlay', {x: left, y: top-10})
})
right.addEventListener('mouseover', () => {
    if (open) {
        gsap.to('.cursor', {opacity: 1, mixBlendMode: 'difference', scale: 1.5})
    }
})
rightTwo.addEventListener('mouseover', () => {
    if (open) {
        gsap.to('.cursor', {opacity: 1, mixBlendMode: 'difference', scale: 1.5})
    }
})
right.addEventListener('mouseout', () => {
    gsap.to('.cursor', { opacity: 0.5, scale: 1, mixBlendMode: 'normal' })
})
rightTwo.addEventListener('mouseout', () => {
    gsap.to('.cursor', { opacity: 0.5, scale: 1, mixBlendMode: 'normal' })
})



//HEADER ANIMS
circleHeader.addEventListener('click', () => {
    if (!disabled) {
        if (!open) { 
            disabled = true;
            tl.restart().then(() => {
                circleAnim.play()
                open = true;
                disabled = false;
            })
        } else {
            disabled = true;
            tl.reverse().then(() => {
                circleAnim.pause()
                open = false;
                disabled = false;
            })
        }
    } else {
        console.log('btn disabled')
    }
})
circleHeader.addEventListener('mouseover', (e) => {
    // gsap.to('.cursor', {background: 'aqua', scale: 1.5})
    // gsap.to(circleHeader, {background: 'black'})
    circleHeader.addEventListener('mousemove', (e) => {
        let offset = e.target.getBoundingClientRect();
        let {width, height, top, left} = offset;
        let center = left + (width/2);
        let mid = top + (height/2);
        let x = e.clientX;
        let y = e.clientY;
        let posX = (x - center) ;
        let posY = (y - mid) ;
        gsap.to(circleHeader, {x: posX, y: posY})
    })
})
circleHeader.addEventListener('mouseout', (e) => {
    // gsap.to('.cursor', {background: 'white', scale: 1})
    // gsap.to(circleHeader, {background: 'white'})
    gsap.to(circleHeader, {x: 0, y: 0})
}) 


//LINKS
let rootUrl = 'http://dgb-digital.infinityfreeapp.com/'
rightTwo.addEventListener('click', (e) => {
    setTimeout(() => {
        window.location.href = rootUrl + '/contact.html';
    }, 500)
})
right.addEventListener('click', (e) => {
    if (window.location.pathname = "/") {
        window.location.reload()
    } else {
        setTimeout(() => {
            window.location.href = rootUrl;
        }, 500)
    }
})