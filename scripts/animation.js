// First define all functions
function revealToSpan() {
  document.querySelectorAll(".reveal").forEach(function (elem) {
    var parent = document.createElement("span");
    var child = document.createElement("span");
    
    parent.classList.add("parent");
    child.classList.add("child");
    
    child.innerHTML = elem.innerHTML;
    parent.appendChild(child);
    
    elem.innerHTML = "";
    elem.appendChild(parent);
  });
}

function loaderAnimation() {
  var tl = gsap.timeline();

  tl.from(".child span", {
      x: "100%",
      duration: 1,
      delay: 0.5, // Reduced delay
      ease: "circ.inOut",
    })
    .to(".parent .child", {
      y: "-110%",
      duration: 1,
      delay: 1,
      ease: "circ.inOut",
    })
    .to("#loader", {
      height: "0%",
      duration: 1,
      ease: "circ.inOut",
      onComplete: function () {
        document.querySelector("#loader").style.display = "none";
      },
    })
    .to("#green", {
      height: "100%",
      top: 0,
      duration: 1,
      delay: -0.8,
      ease: "circ.inOut",
    })
    .to("#green", {
      height: 0,
      duration: 1,
      delay: -0.5,
      ease: "circ.inOut",
    });
}
function animateHomeElements() {
  var homeTimeline = gsap.timeline({
    delay: 3 // 1 second delay before starting
  });
  
  homeTimeline
    .to("#home #nav a", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1, // Stagger each nav item
      ease: "power2.out"
    })
    .to("#home .row h1", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.4") // Start slightly before nav animation completes
    .to("#home .row h1",{
      x:"10%",
      yoyo:true,
      repeat:1,
    })
    .to("#home .text", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15, // Stagger each text block
      ease: "power2.out"
    }, "-=0.4") // Start slightly before h1 animation completes
    .to("svg", {
      height: "8vw",
      duration: 1,
      delay: 0.5, // Start after loader animations
      ease: "power2.inOut",
    })
    .to("#imagery  h1",{
      opacity:1,
      // stagger:0.1,
      duration:1.5,
      ease:"power2.out",
      delay:0
    })
    .to("#imagery  .imgrig ",{
      opacity:1,
      stagger:0.1,
      duration:1.5,
      ease:"ease.in",
      delay:0
    })
    

    

    return homeTimeline;
}
// function animateImagery() {
//   // Create a new timeline for imagery section
//   var imageryTimeline = gsap.timeline({
//     scrollTrigger: {
//       trigger: "#imagery",
//       start: "top 80%", // Start animation when imagery section is 80% in view
//       // markers: true // For debugging
//     }
//   });
  
//   imageryTimeline
//     // First animate the heading with a stagger effect for each line
//     .from(".imglef h1", {
//       opacity: 0,
//       y: 50,
//       duration: 1.2,
//       stagger: 0.1,
//       ease: "power2.out"
//     })
//     // Then animate each image container in sequence
//     .from(".imgcntnr", {
//       opacity: 0,
//       scale: 0.8,
//       rotation: 0,
//       y: 100,
//       duration: 1.5,
//       stagger: 0.2, // Stagger the animation for each container
//       ease: "back.out(1.7)"
//     }, "-=0.8"); // Start slightly before text animation completes
// }


// Only execute functions ONCE when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
  // First create the span structure
  revealToSpan();
  
  // Short timeout to ensure spans are created properly
  setTimeout(function() {
    // Then animate
    loaderAnimation();
    
    // animateImagery();
  
    setTimeout(animateHomeElements, 3000); // 3 seconds after loader starts
  }, 100);
});

