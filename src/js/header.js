
import {gsap} from 'gsap';
import {ScrollToPlugin} from 'gsap/ScrollToPlugin';
gsap.registerPlugin(ScrollToPlugin);

let cursorLocked = true;
window.addEventListener('DOMContentLoaded', () => {
    if( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
    ) {
        document.querySelector('.overlay').style.height = '120vh'
        document.querySelector('.overlay').style.marginTop = '-10vh'
        Array.from(document.querySelectorAll('.right h1 div')).forEach(item => {
            item.style.fontSize = '75px'
        })
        console.log('loaded')
        document.querySelector('.overlayHover').style.marginTop = '5vh'
        document.querySelector('.cursor').style.mixBlendMode = 'difference'
        document.querySelector('.cursor').style.transform = 'scale(1)'
        document.querySelector('.cursor').style.opacity = 1
        document.querySelector('.left').style.display = 'none'
        document.querySelector('.right').style.width = '70vw'
        document.querySelector('.right').style.marginLeft = '20vw'
        document.querySelector('.right').style.marginTop = '10vh'
        document.querySelector('.rightHover').style.width = '80vw'
        document.querySelector('.rightHoverTwo').style.width = '80vw'
        if (document.querySelector('.grid')) {
            document.querySelector('.grid').style.display = 'none'
            document.querySelector('.mobilegrid').style.display = 'grid'
        }
                //CURSOR ANIM
        let cursor = document.querySelector('.cursor');
        window.addEventListener('touchstart', (e) => {
            if (!locked && !cursorLocked) {
                let doc = document.documentElement;
                cursor.style.left = e.changedTouches[0].clientX - 40;
                cursor.style.top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0) + e.changedTouches[0].clientY - 40;
            }
        })

        //OVERLAY ANIMS
        let circleHeader = document.querySelector('.headerCircle');
        let overlay = document.querySelector('.overlay');
        let open = false;
        let disabled = false;
        //A IS TRUE WHILST TL IN PROGRESS
        let locked = false;

        let circleAnim = gsap.timeline({paused: true, repeat: 20})
        circleAnim.to('.circleOverlay', {rotate: 360, duration: 6, ease: 'linear'})
        //TL IS INITIAL TIMELINE
        let tl = gsap.timeline({paused: true}); 
        tl.to('.overlayHover', {display: 'block', zIndex: 202})
        tl.fromTo(overlay, {opacity: 0}, {zIndex: 201, opacity: 1, display: 'block', background: 'rgb(29, 29, 29)', duration: 0.5})
        tl.to('.headerCircle span', {display: 'none'})
        tl.to('.headerCircle .close', {display: 'block'})
        tl.to('.right', {display: 'block', zIndex: 204, duration: 0.01})
        tl.to('.left', {zIndex: 204, duration: 0.01})
        tl.to('.cursor', {zIndex: 204, duration: 0.01})
        tl.fromTo('.right h1', {opacity: 0, rotate: -5}, {opacity: 1, rotate: 0, duration: 1})
        let h1 = document.querySelectorAll('.right h1')
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

        let right = document.querySelector('.rightHover');
        let rightTwo = document.querySelector('.rightHoverTwo');
        let overlayHover = document.querySelector('.overlayHover');

        rightTwo.addEventListener('click', (e) => {
            setTimeout(() => {
                window.location.href = 'http://dgb-digital.infinityfreeapp.com/contact.html';
            }, 500)
        })
        right.addEventListener('click', (e) => {
                setTimeout(() => {
                    window.location.href = 'http://dgb-digital.infinityfreeapp.com/';
                }, 500)
        })






        //HEADER ANIMS
        circleHeader.addEventListener('click', () => {
            if (!disabled) {
            if (!open) { 
                locked = true;
                disabled = true;
                //MOVE
                gsap.to(window, {scrollTo: 200})
                tl.restart().then(() => {
                    circleAnim.play()
                    open = true;
                    disabled = false;
                    locked = false;
                })
            } else {
                locked = true;
                disabled = true;
                tl.reverse().then(() => {
                    circleAnim.pause()
                    open = false;
                    disabled = false;
                    locked = false;
                    gsap.to(window, {scrollTo: 20})
                })
            }
            } else {
                console.log('btn disabled')
            }
        })
        circleHeader.addEventListener('touchstart', (e) => {
            // console.log('mouseover', locked)
            if (!locked) {
            gsap.to('.cursor', {background: 'aqua', scale: 1.5})
            circleHeader.addEventListener('touchmove', (e) => {
                if (!locked) {
                let offset = e.target.getBoundingClientRect();
                let {width, height, top, left} = offset;
                let center = left + (width/2);
                let mid = top + (height/2);
                let x = e.changedTouches[0].clientX;
                let y = e.changedTouches[0].clientY;
                let posX = (x - center) ;
                let posY = (y - mid) ;
                if (posY < 80 && posX < 80) {
                    gsap.to(circleHeader, {x: posX, y: posY})
                    let doc = document.documentElement;
                    cursor.style.left = e.changedTouches[0].clientX - 40;
                    cursor.style.top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0) + e.changedTouches[0].clientY - 40;
                }
                }
            })
            }
        })
        circleHeader.addEventListener('touchend', (e) => {
            if (!locked) {
            gsap.to('.cursor', {background: 'white', scale: 1})
            gsap.to(circleHeader, {background: 'white'})
            gsap.to(circleHeader, {x: 0, y: 0})
            if (!open) {
                gsap.to('.headerCircle span', {background: 'black'})
            } else {
                gsap.to('.headerCircle .close', {color: 'black'})
            }
            }
        }) 
        setTimeout(() => {
            cursorLocked = false;
        }, 1500)
    } else {
        if (document.querySelector('.grid') ) {
        document.querySelector('.grid').style.display = 'grid'
        document.querySelector('.mobilegrid').style.display = 'none'
        }
        //CURSOR ANIM
        let cursor = document.querySelector('.cursor');
        window.addEventListener('mousemove', (e) => {
            console.log('hello')
            if (!locked && !cursorLocked) {
                let doc = document.documentElement;
                cursor.style.left = e.clientX - 40;
                cursor.style.top = (window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0) + e.clientY - 40;
            }
        })

        //OVERLAY ANIMS
        let circleHeader = document.querySelector('.headerCircle');
        let overlay = document.querySelector('.overlay');
        let open = false;
        let disabled = false;
        //A IS TRUE WHILST TL IN PROGRESS
        let locked = false;
        const completeFunc = () => {
            let set = false;
            //UNLOCKS CURSOR
            setTimeout(() => {locked = false; console.log('timeout')}, 100)
            //FIRES ONCE SO WHEN UHOVER HEADER CURSOR RESETS
            window.addEventListener('mousemove', () => {
                if (!set) {
                    set = true;
                    gsap.to('.cursor', {background: 'transparent', scale: 1})
                    gsap.to(circleHeader, {background: 'white'})
                    gsap.to(circleHeader, {x: 0, y: 0})
                }
            })
        }
        let circleAnim = gsap.timeline({paused: true, repeat: 20})
        circleAnim.to('.circleOverlay', {rotate: 360, duration: 6, ease: 'linear'})
        //TL IS INITIAL TIMELINE
        let tl = gsap.timeline({paused: true, onComplete: () => {
            completeFunc();
        }, onReverseComplete: () => {
            completeFunc();
        }}); 
        tl.to('.overlayHover', {display: 'block', zIndex: 202})
        tl.fromTo(overlay, {opacity: 0}, {zIndex: 201, opacity: 1, display: 'block', background: 'rgb(29, 29, 29)', duration: 0.5})
        tl.to('.cursor', {background: 'white', scale: 1.5, zIndex: 202, duration: 0.5}, '>-0.5')
        tl.to('.headerCircle span', {display: 'none'})
        tl.to('.headerCircle .close', {display: 'block'})
        tl.to('.right', {display: 'block', zIndex: 204, duration: 0.01})
        tl.to('.left', {zIndex: 204, duration: 0.01})
        tl.fromTo('.right h1', {opacity: 0, rotate: -5}, {opacity: 1, rotate: 0, duration: 1})
        let h1 = document.querySelectorAll('.right h1')
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

        let right = document.querySelector('.rightHover');
        let rightTwo = document.querySelector('.rightHoverTwo');
        let overlayHover = document.querySelector('.overlayHover');

        rightTwo.addEventListener('click', (e) => {
            setTimeout(() => {
                window.location.href = 'http://bwsite.epizy.com/contact.html';
            }, 500)
        })
        right.addEventListener('click', (e) => {
                setTimeout(() => {
                    window.location.href = 'http://bwsite.epizy.com/';
                }, 500)
        })

        overlayHover.addEventListener('mousemove', (e) => {
            let left = ((window.innerWidth/2 - e.clientX) ) / 8
            let top = ((window.innerHeight/2 - e.clientY) ) / 4
            gsap.to('.circleOverlay', {x: left, y: top-10})
        })
        right.addEventListener('mouseover', () => {
            if (open) {
                gsap.to('.cursor', {mixBlendMode: 'difference', opacity:1, scale: 1.5, background: 'white'})
            }
        })
        rightTwo.addEventListener('mouseover', () => {
            if (open) {
                gsap.to('.cursor', {mixBlendMode: 'difference',  opacity:1, scale: 1.5, background: 'white'})
            }
        })
        right.addEventListener('mouseout', () => {
            gsap.to('.cursor', { scale: 1,  opacity:0.65, background: 'white'})
        })
        rightTwo.addEventListener('mouseout', () => {
            gsap.to('.cursor', { scale: 1, opacity: 0.65, background: 'white'})
        })



        //HEADER ANIMS
        circleHeader.addEventListener('click', () => {
            if (!disabled) {
            if (!open) { 
                locked = true;
                disabled = true;
                //MOVE
                tl.restart().then(() => {
                    circleAnim.play()
                    open = true;
                    disabled = false;
                })
            } else {
                locked = true;
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
            // console.log('mouseover', locked)
            if (!locked) {
            gsap.to('.cursor', {background: 'white', scale: 1.5})
            gsap.to(circleHeader, {background: 'black'})
            if (!open) {
                gsap.to('.headerCircle span', {background: 'white'})
            } else {
                gsap.to('.headerCircle .close', {color: 'white'})
            }
            circleHeader.addEventListener('mousemove', (e) => {
                if (!locked) {
                let offset = e.target.getBoundingClientRect();
                let {width, height, top, left} = offset;
                let center = left + (width/2);
                let mid = top + (height/2);
                let x = e.clientX;
                let y = e.clientY;
                let posX = (x - center) ;
                let posY = (y - mid) ;
                gsap.to(circleHeader, {x: posX, y: posY})
                }
            })
            }
        })
        circleHeader.addEventListener('mouseout', (e) => {
            // console.log('mouseout', locked)
            if (!locked) {
            gsap.to('.cursor', {background: 'white', scale: 1})
            gsap.to(circleHeader, {background: 'white'})
            gsap.to(circleHeader, {x: 0, y: 0})
            if (!open) {
                gsap.to('.headerCircle span', {background: 'black'})
            } else {
                gsap.to('.headerCircle .close', {color: 'black'})
            }
            }
        }) 
        setTimeout(() => {
            cursorLocked = false;
        }, 1500)
    }

})
