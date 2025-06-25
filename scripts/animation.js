// This function converts elements with the class "reveal" into a structure
// of nested spans, where the outer span has the class "parent" and the inner
function revealToSpan() {
  document.querySelectorAll(".reveal").forEach(function (elem) {
    // creaing two span

    var parent = document.createElement("span");
    var child = document.createElement("span");
    // it creted two span tags

    // parent and child both sets theri respective classes
    parent.classList.add("parent");
    child.classList.add("child");
    // it create this structure
    //  <span class="parent">
    //        <span class="child"></span>
    // </span>

    // span parent gets spanchild and
    // spanchild gets elem content
    child.innerHTML = elem.innerHTML;
    parent.appendChild(child);

    elem.innerHTML = "";
    elem.appendChild(parent);
  });
}
revealToSpan();




var tl = gsap.timeline();

tl
.from(".child span",{
    x:"100%",
    duration:1,
    delay:1,
    ease:"circ.inOut"
});


gsap.to(".parent .child",{
    y:"-110%",
    duration:1,
    delay:2.7,
    ease:"circ.inOut"
});

gsap.to("#loader", {
    y: "-100%",
    duration: 1,
    delay: 3,
    ease: "circ.inOut"
});

gsap.to("#green",{
  top: "0%",
  duration: 1,
  delay: 3,
})
gsap.to("#hero",{
  top: "0%",
  duration: 1,
  delay: 3.3,
  ease: "ease.inOut"
})

// // Add this to your existing timeline
// .from("#loader h2", {
//     y: 30,
//     opacity: 0,
//     duration: 1,
//     delay: 0.3,
//     ease: "power2.out"
// }, "-=0.5");  // The "-=0.5" makes this start 0.5 seconds before the previous animation completes