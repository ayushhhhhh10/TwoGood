function locomotiveAnimations(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});




// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
}
locomotiveAnimations();

function logoAnimation(){
    gsap.to('#nav-part1 svg',{
        transform:'translateY(-100%)',
        scrollTrigger:{
            scroller:"#main",
            trigger:"#page1",
            start:'top 0',
            end:'top -10%',
            scrub:true
        }
    })
}
logoAnimation();

function videoconAnimation(){
var videocon = document.querySelector('#video-container')
var play = document.querySelector('#play')
videocon.addEventListener('mouseenter',function(){
    gsap.to(play,{
        scale:1,
        opacity:1,
        duration:0.5
    })
})
videocon.addEventListener('mouseleave',function(){
    gsap.to(play,{
        scale:0,
        opacity:0,
        duration:0.5
    })
})
videocon.addEventListener('mousemove',function(dets){
    gsap.to(play,{
        top:dets.y-50,
        left:dets.x-45
    })
})
}
videoconAnimation();

function loadingAnimation(){
    gsap.from('#page1 h1',{
        y:100,
        opacity:0,
        delay:0.5,
        duration:0.6,
        stagger:0.3
    })
    gsap.from('#video-container',
    {
    y:80,
    opacity:0,
    duration:0.5,
    delay:1.2
})
}
loadingAnimation();

function cursoronchild(){
    document.addEventListener('mousemove',function(dets){
        gsap.to('#cursor',{
            top:dets.y,
            left:dets.x
        })
    })
    document.querySelectorAll('.child').forEach(function(elem){
            elem.addEventListener('mouseenter',function(){
                gsap.to('#cursor',{
                    transform: 'translate(-50%,-50%) scale(1)'
                })
            })
            elem.addEventListener('mouseleave',function(dets){
                gsap.to('#cursor',{
                    scale: 'translate(-50%,-50%) scale(0)'
                })
            })
    })
}
cursoronchild();