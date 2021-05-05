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
    if( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
    ) {
        document.querySelector('.overlay').style.height = '110vh'
        document.querySelector('.overlay').style.marginTop = '-10vh'
        Array.from(document.querySelectorAll('.right h1 div')).forEach(item => {
            item.style.fontSize = '75px'
        })
        console.log('loaded')
        document.querySelector('.overlayHover').style.marginTop = '5vh'
        document.querySelector('.cursor').style.mixBlendMode = 'difference'
        document.querySelector('.cursor').style.transform = 'scale(1)'
        document.querySelector('.cursor').style.opacity = 1
        document.querySelector('.left').style.marginTop = '18vh'
        document.querySelector('.left').style.position = 'absolute'
        document.querySelector('.left').style.width = '100%'
        document.querySelector('.right').style.width = '70vw'
        document.querySelector('.right').style.marginLeft = '20vw'
        document.querySelector('.right').style.marginTop = '10vh'
        document.querySelector('.rightHover').style.width = '80vw'
        document.querySelector('.rightHoverTwo').style.width = '80vw'
        if (document.querySelector('.grid')) {
            document.querySelector('.grid').style.display = 'none'
            document.querySelector('.mobilegrid').style.display = 'grid'
        }
    } else {
        document.querySelector('.grid').style.display = 'grid'
        document.querySelector('.mobilegrid').style.display = 'none'
    }
    setTimeout(() => {
        cursorLocked = false;
    }, 1500)
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
tl.to('.right', {zIndex: 204, duration: 0.01})
tl.to('.left', {zIndex: 204, duration: 0.01})
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
if( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
) {
    window.addEventListener('touchstart', () => {
        console.log('window start')
    window.addEventListener('touchmove', (e) => {
        if(!cursorLocked) {
        let doc = document.documentElement;
        cursor.style.left = e.changedTouches[0].clientX - 40;
        cursor.style.top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0) + e.changedTouches[0].clientY - 40;
        }
    })
    })
    circleHeader.addEventListener('touchend', () => {
        if (!disabled) {
            if (!open) { 
                disabled = true;
                gsap.to('canvas', {display: 'none'})
                tl.restart().then(() => {
                    circleAnim.play()
                    gsap.to(document, {overflowY: 'hidden'})
                    open = true;
                    disabled = false;
                })
            } else {
                disabled = true;
                gsap.to('canvas', {display: 'block'})
                tl.reverse().then(() => {
                    circleAnim.pause()
                    gsap.to(document, {overflowY: 'scroll'})
                    open = false;
                    disabled = false;
                })
            }
        } else {
            console.log('btn disabled')
        }
    })
    circleHeader.addEventListener('touchstart', (e) => {
        console.log('start')
        circleHeader.addEventListener('touchmove', (e) => {
            let offset = e.target.getBoundingClientRect();
            let {width, height, top, left} = offset;
            let center = left + (width/2);
            let mid = top + (height/2);
            let x = e.changedTouches[0].clientX;
            let y = e.changedTouches[0].clientY;
            let posX = (x - center) ;
            let posY = (y - mid) ;
            gsap.to(circleHeader, {x: posX, y: posY})
        })
    })
    circleHeader.addEventListener('touchend', (e) => {
        gsap.to(circleHeader, {x: 0, y: 0})
    }) 
    } else {
circleHeader.addEventListener('click', () => {
    if (!disabled) {
        if (!open) { 
            disabled = true;
            gsap.to('body', {height: '100%', overflow: 'hidden'})
            tl.restart().then(() => {
                circleAnim.play()
                open = true;
                disabled = false;
            })
        } else {
            disabled = true;
            gsap.to('body', {height: 'auto', overflow: 'scroll'})
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
    gsap.to(circleHeader, {x: 0, y: 0})
}) 
}

//LINKS
let rootUrl = 'http://dgb-digital.infinityfreeapp.com/'
rightTwo.addEventListener('click', (e) => {
    setTimeout(() => {
        window.location.href = rootUrl + '/contact.html';
    }, 500)
})
right.addEventListener('click', (e) => {
    // if (window.location.pathname = "/") {
    //     window.location.reload()
    // } else {
        setTimeout(() => {
            window.location.href = rootUrl;
        }, 500)
    // }
})