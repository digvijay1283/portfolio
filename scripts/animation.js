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
// function initLocomotiveScroll() {
//   const scroll = new LocomotiveScroll({
//     el: document.querySelector('[data-scroll-container]'),
//     smooth: true,
//     smoothMobile: false,
//     multiplier: 1.0, // Adjust scrolling speed (lower = slower)
//     lerp: 0.1, // Linear interpolation (0.1 = smooth, 0.01 = super smooth)
//     smartphone: {
//       smooth: true
//     },
//     tablet: {
//       smooth: true
//     }
//   });

//   // Refresh locomotive scroll on window resize
//   window.addEventListener('resize', () => {
//     scroll.update();
//   });

//   // Make scroll instance available globally if needed
//   window.locoScroll = scroll;
  
//   // Return the scroll instance in case you need to use it elsewhere
//   return scroll;
// }
function animateHomeElements() {
  var homeTimeline = gsap.timeline({
    delay: 3 // 3 second delay before starting
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
      duration: 0.6
    })
    .to("#home .text", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15, // Stagger each text block
      ease: "power2.out"
    }, "-=0.4") // Start slightly before h1 animation completes
    .to("svg", {
      height: "10vw",
      duration: 1,
      delay: 0.5, // Start after loader animations
      ease: "easeInOut",
    })
    .to("#imagery  h1",{
      opacity:1,
      duration:1.5,
      ease:"power2.out",
      delay:0
    })
    .to("#imagery  .imgrig ",{
      opacity:1,
      stagger:0.1,
      duration:1,
      ease:"power2.out",
      delay:-4,
      onComplete: function() {
        // Ensure all elements are fully visible before initializing Locomotive Scroll
        gsap.set("#home #nav a, #home .row h1, #home .text, #imagery h1, #imagery .imgrig", {
          opacity: 1,
          y: 0,
          clearProps: "transform"
        });
        
        // Initialize Locomotive Scroll after ensuring elements are visible
        setTimeout(initLocomotiveScroll, 1000);
      }
    })
    return homeTimeline;
}

// Initialize Locomotive Scroll variable
let scroll;

// function initLocomotiveScroll() {
//   // Create the scroll instance
//   scroll = new LocomotiveScroll({
//     el: document.querySelector('[data-scroll-container]'),
//     smooth: true,
//     smoothMobile: false,
//     multiplier: 1.0,
//     lerp: 0.1
//   });

//   // Proper ScrollTrigger integration with Locomotive Scroll
//   // This is the key part that fixes the scrolling issues
//   if (typeof ScrollTrigger !== 'undefined') {
//     // Each time Locomotive Scroll updates, tell ScrollTrigger to update too
//     scroll.on("scroll", ScrollTrigger.update);

//     // Tell ScrollTrigger to use these proxy methods for the "#main" element
//     ScrollTrigger.scrollerProxy('[data-scroll-container]', {
//       scrollTop(value) {
//         return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
//       },
//       getBoundingClientRect() {
//         return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
//       },
//       // LocomotiveScroll handles things differently on mobile devices
//       pinType: document.querySelector('[data-scroll-container]').style.transform ? "transform" : "fixed"
//     });
    
//     // Each time the window updates, refresh ScrollTrigger and then update LocomotiveScroll
//     ScrollTrigger.addEventListener("refresh", () => scroll.update());
    
//     // After everything is set up, refresh ScrollTrigger
//     ScrollTrigger.refresh();
//   }

//   // Refresh locomotive scroll on window resize
//   window.addEventListener('resize', () => {
//     scroll.update();
//   });

//   // Make scroll instance available globally if needed
//   window.locoScroll = scroll;
  
//   // Initialize rotation effect after Locomotive Scroll is ready
//   setTimeout(() => {
//     initScrollRotationEffect();
//   }, 500);
  
//   return scroll;
// }

// // Fix for About section scrolling issues
// function fixAboutSectionScrolling() {
//   // Make sure About section has proper data attributes for Locomotive
//   const aboutSection = document.querySelector('#About');
//   if (aboutSection) {
//     aboutSection.setAttribute('data-scroll', '');
//     aboutSection.setAttribute('data-scroll-id', 'about');
    
//     // Create a scroll trigger that ensures the section is properly handled
//     ScrollTrigger.create({
//       trigger: '#About',
//       scroller: '[data-scroll-container]',
//       start: 'top bottom',
//       end: 'bottom top',
//       onEnter: () => {
//         // Force an update of locomotive scroll when entering this section
//         if (scroll) scroll.update();
//       },
//       onLeaveBack: () => {
//         // Also update when scrolling back up
//         if (scroll) scroll.update();
//       }
//     });
//   }
// }

// Modify the DOMContentLoaded event handler to include our new fix
document.addEventListener("DOMContentLoaded", function() {
  // First create the span structure
  revealToSpan();
  
  // Register ScrollTrigger plugin early
  gsap.registerPlugin(ScrollTrigger);
  
  // Short timeout to ensure spans are created properly
  setTimeout(function() {
    // Then animate
    loaderAnimation();
    
    // Start home animations after loader
    setTimeout(() => {
      animateHomeElements();
      
      // Apply our fix for the About section scrolling
      setTimeout(fixAboutSectionScrolling, 3500);
      
      // Initialize card animations when locomotive scroll is ready
      setTimeout(setupCardAnimations, 3500);
    }, 3000); // 3 seconds after loader starts
  }, 100);
});
// Only execute functions ONCE when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
  // First create the span structure
  revealToSpan();
  
  // Short timeout to ensure spans are created properly
  setTimeout(function() {
    // Then animate
    loaderAnimation();
    
    // Start home animations after loader
    setTimeout(animateHomeElements, 3000); // 3 seconds after loader starts
  }, 100);
});



// Store original rotations for each image container
const originalRotations = {
  '.imgcntnr.a': -20,
  '.imgcntnr.b': -15,
  '.imgcntnr.c': -5
};

let currentScrollY = 0;
let targetRotations = { a: 0, b: 0, c: 0 };
let currentRotations = { a: 0, b: 0, c: 0 };

function initScrollRotationEffect() {
  // Get all image containers
  const imgContainers = {
    a: document.querySelector('.imgcntnr:nth-child(1)'),
    b: document.querySelector('.imgcntnr:nth-child(2)'),
    c: document.querySelector('.imgcntnr:nth-child(3)')
  };

  // Check if elements exist
  if (!imgContainers.a || !imgContainers.b || !imgContainers.c) {
    console.warn('Image containers not found');
    return;
  }

  // Set up scroll listener with Locomotive Scroll
  if (scroll) {
    scroll.on('scroll', (instance) => {
      const scrollY = instance.scroll.y;
      const scrollDirection = scrollY > currentScrollY ? 'down' : 'up';
      currentScrollY = scrollY;

      // Calculate rotation based on scroll position
      // Adjust these values to control rotation intensity
      const rotationMultiplier = 0.01; // How much rotation per pixel scrolled
      const maxRotation = 45; // Maximum rotation in degrees

      // Calculate target rotations based on scroll
      if (scrollDirection === 'down') {
        targetRotations.a = Math.min(originalRotations['.imgcntnr.a'] + (scrollY * rotationMultiplier), originalRotations['.imgcntnr.a'] + maxRotation);
        targetRotations.b = Math.min(originalRotations['.imgcntnr.b'] + (scrollY * rotationMultiplier), originalRotations['.imgcntnr.b'] + maxRotation);
        targetRotations.c = Math.min(originalRotations['.imgcntnr.c'] + (scrollY * rotationMultiplier), originalRotations['.imgcntnr.c'] + maxRotation);
      } else {
        // When scrolling up, gradually return to original position
        const returnSpeed = 0.02;
        targetRotations.a = Math.max(originalRotations['.imgcntnr.a'], currentRotations.a - (scrollY * returnSpeed));
        targetRotations.b = Math.max(originalRotations['.imgcntnr.b'], currentRotations.b - (scrollY * returnSpeed));
        targetRotations.c = Math.max(originalRotations['.imgcntnr.c'], currentRotations.c - (scrollY * returnSpeed));
      }

      // Animate to target rotations with delay using GSAP
      gsap.to(currentRotations, {
        duration: 0.5,
        ease: "ease.out",
        delay:0.5,
        a: targetRotations.a,
        b: targetRotations.b,
        c: targetRotations.c,
        onUpdate: function() {
          // Apply the rotations while preserving original transforms
          gsap.set(imgContainers.a, {
            transform: `translate(-40%,-15%) rotate(${currentRotations.a}deg)`
          });
          gsap.set(imgContainers.b, {
            transform: `translate(-10%,-3%) rotate(${currentRotations.b}deg)`
          });
          gsap.set(imgContainers.c, {
            transform: `translate(25%,10%) rotate(${currentRotations.c}deg)`
          });
        }
      });
    });
  }
}

// After all animations are set up, refresh ScrollTrigger
setTimeout(() => {
  ScrollTrigger.refresh();
}, 1000);

// Setup animations for card carousel
function setupCardAnimations() {
  // Animate the skills title
  gsap.from(".skills-title h1", {
    y: 50,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: ".wrapper",
      scroller: '[data-scroll-container]',
      start: "top 80%",
      end: "top 40%",
      scrub: 1
    }
  });
  
  // Make the card rotation speed change on scroll
  ScrollTrigger.create({
    trigger: ".wrapper",
    scroller: '[data-scroll-container]',
    start: "top bottom",
    end: "bottom top",
    onUpdate: (self) => {
      // Speed up or slow down the animation based on scroll position
      const progress = self.progress;
      const rotationSpeed = 20 - (progress * 15); // Decreases from 20s to 5s
      
      document.querySelector('.inner').style.animationDuration = `${rotationSpeed}s`;
    }
  });
}


// Add card animations to init
document.addEventListener("DOMContentLoaded", function() {
  // Your existing initialization code
  
  // After ScrollTrigger is loaded, register it with GSAP
  gsap.registerPlugin(ScrollTrigger);
  
  // Initialize card animations when locomotive scroll is ready
  setTimeout(() => {
    setupCardAnimations();
  }, 3500);
});

