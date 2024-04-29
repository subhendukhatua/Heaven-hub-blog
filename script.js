function locomotiveAnimation(){
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

locomotiveAnimation();

function navbarAnimation(){
    gsap.to("#nav-part1 svg",{
        transform:"translateY(-100%)",
        scrollTrigger:{
            trigger:"#page1",
            scroller:"#main",
            start: "top 0",
            end:"top -5%",
            scrub: true,
        }
    })
    
    gsap.to("#nav-part2 #links",{
        transform:"translateY(-100%)",
        opacity:0,
        scrollTrigger:{
            trigger:"#page1",
            scroller:"#main",
            start: "top 0",
            end:"top -5%",
            scrub: true,
        }
    })
}
navbarAnimation();

function videoconAnimation(){
    var videocon = document.querySelector("#video-container");
var play = document.querySelector("#play");

videocon.addEventListener("mouseenter", function(){
    gsap.to(play,{
        scale:1,
        opacity:1
    })
})
videocon.addEventListener("mouseleave", function(){
    gsap.to(play,{
        scale:0,
        opacity:0
    })
})
videocon.addEventListener("mousemove", function(dets){
    gsap.to(play,{
        left:dets.x-85,
        top:dets.y-60
    })
})
}
videoconAnimation()

function loadingAnimation(){
    gsap.from("#page1 h1",{
        y:70,
        opacity:0,
        delay:0.5,
        duration:0.9,
        stagger:0.3
    
    })
    gsap.from("#video-container",{
        scale:0.9,
        opacity:0,
        delay:1.2,
        duration:0.8,
        
    
    })
}

loadingAnimation()

document.addEventListener("mousemove", function(dets){
    gsap.to("#cursor",{
        left:dets.x,
        top:dets.y
    })
})


// document.querySelectorAll(".child").addEventListener("mouseenter", function(){
//     gsap.to("#cursor",{
//         transform: 'translate(-50%, -50%) scale(1)'
//     })
// })

// document.querySelectorAll(".child").addEventListener("mouseleave", function(){
//     gsap.to("#cursor",{
//         transform: 'translate(-50%, -50%) scale(0)'
//     })
// })

document.querySelectorAll(".child").forEach(function(elem){
    elem.addEventListener("mouseenter", function(){
        gsap.to("#cursor",{
                    transform: 'translate(-50%, -50%) scale(1)'
                })
    })
})

document.querySelectorAll(".child").forEach(function(elem){
    elem.addEventListener("mouseleave", function(){
        gsap.to("#cursor",{
                    transform: 'translate(-50%, -50%) scale(0)'
                })
    })
})


function startCountdown() {
    let seconds = 10;
    const countdownButton = document.getElementById('countdownButton');
    countdownButton.disabled = true; // Disable button
    countdownButton.innerText = `Please wait ${seconds} seconds`;

    const countdownInterval = setInterval(() => {
      seconds--;
      if (seconds <= 0) {
        clearInterval(countdownInterval);
        countdownButton.innerText = 'Click here to continue';
        countdownButton.disabled = false; // Disable button
        countdownButton.onclick = handleButtonClick;
      } else {
        countdownButton.innerText = `Please wait ${seconds} seconds`;
      }
    }, 1000);
  }

// //   function scrollToBottom() {
// //     window.scrollTo(0,document.body.scrollHeight);
// //     document.getElementById('scroll').innerHTML = '<button id="secondCountdownButton" onclick="startSecondCountdown()">Please wait 10 seconds</button>';
// //   }

//   function startSecondCountdown() {
//     let seconds = 10;
//     const secondCountdownButton = document.getElementById('secondCountdownButton');
//     secondCountdownButton.innerText = `Please wait ${seconds} seconds`;

//     const countdownInterval = setInterval(() => {
//       seconds--;
//       if (seconds <= 0) {
//         clearInterval(countdownInterval);
//         secondCountdownButton.innerText = 'Generate Link';
//         secondCountdownButton.onclick = generateLink;
//       } else {
//         secondCountdownButton.innerText = `Please wait ${seconds} seconds`;
//       }
//     }, 1000);
//   }

//   function generateLink() {
//     window.location.href = 'https://subhendu-portfolio.netlify.app/';
//   }




//   function startCountdown() {
//     let seconds = 10;
   
//     const countdownButton = document.getElementById('countdownButton');
//     const countdownValue = document.getElementById('countdownValue');
//     countdownButton.innerText = `Please wait ${seconds} seconds`;

//     const countdownInterval = setInterval(() => {
//       seconds--;
//       countdownValue.innerText = seconds;
//       if (seconds <= 0) {
//         clearInterval(countdownInterval);
//         countdownButton.innerText = 'Click here to continue';
//         countdownButton.onclick = handleButtonClick;
//       }
//     }, 1000);
//   }

  function handleButtonClick() {
    const countdownButton = document.getElementById('countdownButton');
    countdownButton.innerText = "Please wait 10 seconds";
    countdownButton.onclick = true; // Disable button while countdown is running
    countdownButton.disabled = true; // Disable button
    startCountdown();
    setTimeout(() => {
      countdownButton.innerText = 'Generate Link';
      countdownButton.disabled = false; // Disable button
      countdownButton.onclick = generateLink;
    }, 10000); // 10 seconds
  }

  function generateLink() {
    window.location.href = 'https://subhendu-portfolio.netlify.app/';
  }

//   // Start countdown when page loads
  window.onload = startCountdown;