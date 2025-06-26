gsap.registerPlugin(ScrollTrigger);

// Enhanced Scroll Controller
class ScrollController {
  constructor() {
    this.locoScroll = null;
    this.isMobile = window.innerWidth < 768;
    this.scrollContainer = document.querySelector('[data-scroll-container]');
    this.init();
  }

  async init() {
    // Set initial styles
    this.setInitialStyles();
    
    // Wait for assets and initialize
    await this.waitForAssets();
    this.animateHomeElements(); // Keep home animations
    
    // Initialize scroll system
    if (!this.isMobile) {
      this.initSmoothScroll();
    } else {
      this.initMobileScroll();
    }
    
    // Add scroll-based animations
    this.animateAboutSection();
    this.animateTechStack();
    this.animateProjectsSection(); // Add Projects animation
    this.animateContactSection(); // Add Contact animation
    this.setupPinnedSections();
    this.animateContactSection(); // Add Contact section animation
  }

  setInitialStyles() {
    // Ensure proper container sizing
    document.documentElement.style.height = '100%';
    document.body.style.height = '100%';
    this.scrollContainer.style.minHeight = '100vh';
    this.scrollContainer.style.width = '100%';
  }

  async waitForAssets() {
    this.revealToSpan();
    await this.loaderAnimation();
    await new Promise(resolve => {
      if (document.readyState === 'complete') resolve();
      else window.addEventListener('load', resolve);
    });
  }

  revealToSpan() {
    document.querySelectorAll(".reveal").forEach(elem => {
      const parent = document.createElement("span");
      const child = document.createElement("span");
      parent.classList.add("parent");
      child.classList.add("child");
      child.innerHTML = elem.innerHTML;
      parent.appendChild(child);
      elem.innerHTML = "";
      elem.appendChild(parent);
    });
  }

  loaderAnimation() {
    return new Promise(resolve => {
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to("#loader", {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
              document.querySelector("#loader").remove();
              this.refreshScrollSystem();
              resolve();
            }
          });
        }
      });

      tl.from(".child span", {
        x: "100%",
        duration: 2,
        delay: 0.5,
        ease: "circ.inOut",
      })
      .to(".parent .child", {
        y: "-110%",
        duration: 2,
        ease: "circ.inOut",
      })
      .to("#loader", {
        height: "0%",
        duration: 1,
        ease: "circ.inOut"
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
    });
  }

  animateHomeElements() {
    const tl = gsap.timeline();
    
    tl.to("#home #nav a", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out"
    })
    .to("#home .row h1", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.4")
    .to("#home .text", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out"
    }, "-=0.4")
    .to("svg", {
      height: "10vw",
      duration: 1,
      ease: "easeInOut"
    })
    .to("#imagery h1", {
      opacity: 1,
      duration: 1.5,
      ease: "power2.out"
    })
    .to("#imagery .imgrig", {
      opacity: 1,
      stagger: 0.1,
      duration: 1,
      ease: "power2.out",
      onComplete: () => this.refreshScrollSystem()
    })
    .to('.bottom-text h5',{
      ScrollTrigger:'h5',
      opacity:1,
      duration: 1,
      ease: "power2.out",
      delay: 0.5
    })
    .to('.bottom-text h2',{
      ScrollTrigger:'h5',
      opacity:1,
      stagger:1,
      duration: 1,
      ease: "power2.out",
      delay: 0.5
    })
  }

  // Add this new method for about section animations
  animateAboutSection() {
    // Set initial state - elements hidden/transformed
    gsap.set('#about-section', { opacity: 0 });
    gsap.set('.about-heading h1', { opacity: 0, y: 30 });
    gsap.set('.about-image', { opacity: 0, x: -50 });
    gsap.set('.about-text', { opacity: 0, y: 30, stagger: 0.1 });
    gsap.set('.about-button', { opacity: 0, scale: 0.8 });
    
    // Create a timeline for the about section animations
    const aboutTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#about-section",
        start: "top 70%",
        end: "top 20%",
        toggleActions: "play none none none",
        // markers: true, // Uncomment for debugging
        scroller: this.isMobile ? undefined : this.scrollContainer
      }
    });
    
    // Add staggered animations to the timeline
    aboutTl
      .to('#about-section', { opacity: 1, duration: 0.6 })
      .to('.about-heading h1', { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "power3.out" 
      })
      .to('.about-image', { 
        opacity: 1, 
        x: 0, 
        duration: 1, 
        ease: "back.out(1.2)" 
      }, "-=0.4")
      .to('.about-text', { 
        opacity: 1, 
        y: 0, 
        stagger: 0.15, 
        duration: 0.7, 
        ease: "power2.out" 
      }, "-=0.6")
      .to('.about-button', { 
        opacity: 1, 
        scale: 1, 
        stagger: 0.15, 
        duration: 0.5, 
        ease: "back.out(1.7)" 
      }, "-=0.3");
      
    return aboutTl;
  }

  // Add tech stack animations
  animateTechStack() {
    // Set initial states
    gsap.set('.tech-heading', { opacity: 0, y: 30 });
    gsap.set('.tech-item', { opacity: 0, y: 40, scale: 0.8 });
    
    // Create timeline for tech stack section
    const techTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#tech-stack",
        start: "top 70%",
        end: "top 20%",
        toggleActions: "play none none none",
        scroller: this.isMobile ? undefined : this.scrollContainer
      }
    });
    
    // Add animations to timeline
    techTl
      .to('.tech-heading', { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "power2.out" 
      }) 
      .to('.tech-heading h1 span', {
        color: '#14cf93',
        duration: 0.3,
        ease: "power2.inOut"
      }, "-=0.4")
      .to('.tech-item', { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        stagger: 0.07, 
        duration: 0.6, 
        ease: "back.out(1.5)",
        onComplete: () => this.refreshScrollSystem()
      }, "-=0.3");
      
    // Add hover effects for tech items
    gsap.utils.toArray('.tech-item').forEach(item => {
      item.addEventListener('mouseenter', () => {
        gsap.to(item, { 
          y: -10, 
          scale: 1.05, 
          duration: 0.3, 
          ease: "power2.out" 
        });
        gsap.to(item.querySelector('.tech-glow'), { 
          opacity: 0.8, 
          duration: 0.3 
        });
        gsap.to(item.querySelector('.tech-name'), {
          color: '#14cf93',
          duration: 0.3
        });
      });
      
      item.addEventListener('mouseleave', () => {
        gsap.to(item, { 
          y: 0, 
          scale: 1, 
          duration: 0.5, 
          ease: "power2.out" 
        });
        gsap.to(item.querySelector('.tech-glow'), { 
          opacity: 0, 
          duration: 0.3 
        });
        gsap.to(item.querySelector('.tech-name'), {
          color: 'white',
          duration: 0.3
        });
      });
    });
    
    return techTl;
  }

  // Method for pinned sections
  setupPinnedSections() {
    // Pin only the about section
    ScrollTrigger.create({
      trigger: "#about-section",
      start: "top top",
      endTrigger: "#tech-stack",
      end: "top top",
      pin: true,
      pinSpacing: false,
      scroller: this.isMobile ? undefined : this.scrollContainer
    });
  }

  // Add the Projects section animation method
  animateProjectsSection() {
    // Set initial states - hide all elements
    gsap.set('.projects-heading h1', { opacity: 0, y: 30 });
    gsap.set('.projects-heading .heading-line', { width: 0, opacity: 0 });
    gsap.set('.project-item', { opacity: 0 });
    
    // Apply special text effects
    this.applyTextEffectsToProjects();
    
    // Project heading animation
    const headingTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#projects-section",
        start: "top 70%",
        end: "top 20%",
        toggleActions: "play none none none",
        scroller: this.isMobile ? undefined : this.scrollContainer
      }
    });
    
    headingTl
      .to('.projects-heading h1', { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "power3.out" 
      })
      .to('.projects-heading .heading-line', { 
        width: 100, 
        opacity: 1, 
        duration: 0.6, 
        ease: "power2.out" 
      }, "-=0.4");
    
    // Create animations for each project
    document.querySelectorAll('.project-item').forEach((project, index) => {
      // Set initial states for project elements
      gsap.set(project.querySelector('.project-image'), { 
        opacity: 0, 
        x: project.classList.contains('reverse') ? 50 : -50 
      });
      
      gsap.set(project.querySelector('.project-title'), { opacity: 0, y: 30 });
      gsap.set(project.querySelector('.project-description'), { opacity: 0, y: 30 });
      gsap.set(project.querySelectorAll('.tech-tag'), { opacity: 0, y: 20, scale: 0.8 });
      gsap.set(project.querySelectorAll('.project-button'), { opacity: 0, y: 20 });
      
      // Create timeline for this project
      const projectTl = gsap.timeline({
        scrollTrigger: {
          trigger: project,
          start: "top 75%",
          end: "center center",
          toggleActions: "play none none none",
          scroller: this.isMobile ? undefined : this.scrollContainer
        }
      });
      
      projectTl
        // First reveal the whole project container
        .to(project, { 
          opacity: 1, 
          duration: 0.4 
        })
        // Animate the image with a slight bounce
        .to(project.querySelector('.project-image'), { 
          opacity: 1, 
          x: 0, 
          duration: 1.2, 
          ease: "back.out(1.2)" 
        }, "-=0.2")
        // Animate the title with a text reveal effect
        .to(project.querySelector('.project-title'), { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: "power3.out" 
        }, "-=0.8")
        // Animate the description text
        .to(project.querySelector('.project-description'), { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: "power2.out" 
        }, "-=0.6")
        // Stagger the tech tags with a pop effect
        .to(project.querySelectorAll('.tech-tag'), { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          stagger: 0.1, 
          duration: 0.6, 
          ease: "back.out(2)" 
        }, "-=0.4")
        // Animate the buttons with a slight delay
        .to(project.querySelectorAll('.project-button'), { 
          opacity: 1, 
          y: 0, 
          stagger: 0.15, 
          duration: 0.5, 
          ease: "power2.out" 
        }, "-=0.2");
      
      // Add hover animations for project images
      const projectImage = project.querySelector('.project-image');
      
      // Optional: Add a floating animation to images when they're in view
      if (index % 2 === 0) {
        gsap.to(projectImage, {
          y: -10,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          scrollTrigger: {
            trigger: projectImage,
            start: "top bottom",
            end: "bottom top",
            toggleActions: "play pause resume pause",
            scroller: this.isMobile ? undefined : this.scrollContainer
          }
        });
      } else {
        gsap.to(projectImage, {
          y: 10,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          scrollTrigger: {
            trigger: projectImage,
            start: "top bottom",
            end: "bottom top",
            toggleActions: "play pause resume pause",
            scroller: this.isMobile ? undefined : this.scrollContainer
          }
        });
      }
    });
    
    // Add a special animation for the last project to encourage scrolling further
    const lastProject = document.querySelector('.project-item:last-child');
    if (lastProject) {
      const lastProjectButtons = lastProject.querySelectorAll('.project-button');
      
      gsap.timeline({
        scrollTrigger: {
          trigger: lastProject,
          start: "center center",
          end: "bottom top",
          toggleActions: "play none none reverse",
          scroller: this.isMobile ? undefined : this.scrollContainer
        }
      })
      .to(lastProjectButtons, {
        boxShadow: "0 0 15px rgba(20, 207, 147, 0.5)",
        background: function(i) {
          return i === 0 ? "#14cf93" : "rgba(20, 207, 147, 0.1)";
        },
        borderColor: "#14cf93",
        color: function(i) {
          return i === 0 ? "white" : "#14cf93";
        },
        duration: 1,
        stagger: 0.2,
        ease: "power2.inOut"
      });
    }
    
    // Refresh ScrollTrigger to ensure everything works properly
    this.refreshScrollSystem();
    
    // Set up interactive hover effects
    this.setupProjectInteractions();
  }

  // Special text effect for project titles
  applyTextEffectsToProjects() {
    // Split project titles into characters for more advanced animations
    document.querySelectorAll('.project-title').forEach(title => {
      // Store the original text
      const originalText = title.innerHTML;
      let splitHTML = '';
      
      // Split the text into characters, preserving the span
      let inSpan = false;
      let spanContent = '';
      
      // Process each character
      for (let i = 0; i < originalText.length; i++) {
        const char = originalText[i];
        
        if (char === '<') {
          inSpan = true;
          spanContent += char;
        } 
        else if (char === '>') {
          inSpan = false;
          spanContent += char;
          splitHTML += spanContent;
          spanContent = '';
        }
        else if (inSpan) {
          spanContent += char;
        }
        else if (char === ' ') {
          splitHTML += ' ';
        } 
        else {
          splitHTML += `<span class="char">${char}</span>`;
        }
      }
      
      // Replace the title's HTML
      title.innerHTML = splitHTML;
      
      // Create a hover effect
      const chars = title.querySelectorAll('.char');
      title.addEventListener('mouseenter', () => {
        gsap.to(chars, {
          y: -5,
          color: '#14cf93',
          duration: 0.4,
          ease: 'power2.out',
          stagger: {
            each: 0.02,
            from: 'start'
          }
        });
      });
      
      title.addEventListener('mouseleave', () => {
        gsap.to(chars, {
          y: 0,
          color: 'white',
          duration: 0.4,
          ease: 'power2.out',
          stagger: {
            each: 0.01,
            from: 'end'
          }
        });
      });
    });
  }

  initSmoothScroll() {
    // Cleanup existing instance
    if (this.locoScroll) {
      this.locoScroll.destroy();
      this.locoScroll = null;
    }

    // Initialize Locomotive Scroll
    this.locoScroll = new LocomotiveScroll({
      el: this.scrollContainer,
      smooth: true,
      lerp: 0.08,
      multiplier: 0.8,
      smartphone: { smooth: false },
      tablet: { smooth: false },
      getDirection: true,
      resetNativeScroll: true
    });

    // Setup ScrollTrigger connection
    gsap.registerPlugin(ScrollTrigger);

    // Connect ScrollTrigger with LocomotiveScroll
    ScrollTrigger.scrollerProxy(this.scrollContainer, {
      scrollTop: (value) => {
        if (arguments.length) {
          this.locoScroll.scrollTo(value, 0, 0);
        } else {
          return this.locoScroll.scroll.instance.scroll.y;
        }
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight
        };
      },
      pinType: this.scrollContainer.style.transform ? "transform" : "fixed"
    });

    // Event listeners for synchronization
    this.locoScroll.on("scroll", ScrollTrigger.update);
    ScrollTrigger.addEventListener("refresh", () => this.locoScroll.update());
    ScrollTrigger.defaults({ scroller: this.scrollContainer });

    // Initial refresh
    setTimeout(() => {
      this.refreshScrollSystem();
    }, 1000);
  }

  initMobileScroll() {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.defaults({ scroller: window });
    ScrollTrigger.refresh();
  }

  refreshScrollSystem() {
    // Calculate and set proper heights
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      section.style.minHeight = window.innerHeight + 'px';
    });

    // Refresh scroll systems
    if (this.locoScroll) {
      this.locoScroll.update();
      setTimeout(() => this.locoScroll.update(), 100);
    }
    if (ScrollTrigger) {
      ScrollTrigger.refresh(true);
    }
  }

  handleResize() {
    const newIsMobile = window.innerWidth < 768;
    
    if (newIsMobile !== this.isMobile) {
      this.isMobile = newIsMobile;
      
      if (this.isMobile && this.locoScroll) {
        this.locoScroll.destroy();
        this.locoScroll = null;
        this.initMobileScroll();
      } else if (!this.isMobile && !this.locoScroll) {
        this.initSmoothScroll();
      }
    }
    
    this.refreshScrollSystem();
  }

  // Add hover animations for project cards
  setupProjectInteractions() {
    document.querySelectorAll('.project-item').forEach(project => {
      // Add subtle tilt effect on hover
      project.addEventListener('mouseenter', () => {
        const isReverse = project.classList.contains('reverse');
        const image = project.querySelector('.project-image');
        const content = project.querySelector('.project-content');
        
        // Tilt in opposite directions based on layout
        gsap.to(image, {
          rotationY: isReverse ? -5 : 5,
          rotationX: 2,
          scale: 1.02,
          duration: 0.8,
          ease: "power2.out"
        });
        
        gsap.to(content, {
          y: -10,
          duration: 0.6,
          ease: "power2.out"
        });
      });
      
      // Reset on mouse leave
      project.addEventListener('mouseleave', () => {
        const image = project.querySelector('.project-image');
        const content = project.querySelector('.project-content');
        
        gsap.to(image, {
          rotationY: 0,
          rotationX: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out"
        });
        
        gsap.to(content, {
          y: 0,
          duration: 0.6,
          ease: "power2.out"
        });
      });
    });
  }

  // Add Contact section animations
  animateContactSection() {
    // Set initial states - hide all elements
    gsap.set('.contact-heading h1', { opacity: 0, y: 30 });
    gsap.set('.contact-heading .heading-line', { width: 0, opacity: 0 });
    gsap.set('.contact-card', { opacity: 0, x: -30 });
    gsap.set('.socials', { opacity: 0, y: 30 });
    gsap.set('.social-icon', { opacity: 0, scale: 0.8 });
    gsap.set('.contact-form-container', { opacity: 0, x: 30 });
    gsap.set('.form-group', { opacity: 0, y: 20 });
    gsap.set('.submit-button', { opacity: 0, y: 20 });
    
    // Create a timeline for contact section animations
    const contactTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#contact-section",
        start: "top 70%",
        end: "top 20%",
        toggleActions: "play none none none",
        scroller: this.isMobile ? undefined : this.scrollContainer
      }
    });
    
    // Add animations to the timeline
    contactTl
      // Heading animation
      .to('.contact-heading h1', { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "power3.out" 
      })
      .to('.contact-heading .heading-line', { 
        width: 100, 
        opacity: 1, 
        duration: 0.6, 
        ease: "power2.out" 
      }, "-=0.4")
      
      // Contact cards animation
      .to('.contact-card', { 
        opacity: 1, 
        x: 0, 
        stagger: 0.15, 
        duration: 0.8, 
        ease: "back.out(1.4)" 
      }, "-=0.3")
      
      // Socials animation
      .to('.socials', { 
        opacity: 1, 
        y: 0, 
        duration: 0.7, 
        ease: "power2.out" 
      }, "-=0.4")
      .to('.social-icon', { 
        opacity: 1, 
        scale: 1, 
        stagger: 0.1, 
        duration: 0.5, 
        ease: "back.out(2)" 
      }, "-=0.5")
      
      // Form animation
      .to('.contact-form-container', { 
        opacity: 1, 
        x: 0, 
        duration: 0.8, 
        ease: "power3.out" 
      }, "-=0.7")
      .to('.form-group', { 
        opacity: 1, 
        y: 0, 
        stagger: 0.1, 
        duration: 0.6, 
        ease: "power2.out" 
      }, "-=0.5")
      .to('.submit-button', { 
        opacity: 1, 
        y: 0, 
        duration: 0.7, 
        ease: "back.out(1.5)" 
      }, "-=0.3");
    
    // Add hover animations for contact cards
    this.setupContactInteractions();
    
    return contactTl;
  }

  // Set up interactions for contact elements
  setupContactInteractions() {
    // Add floating animation to contact form
    gsap.to('.contact-form', {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      scrollTrigger: {
        trigger: '.contact-form',
        start: "top bottom",
        end: "bottom top",
        toggleActions: "play pause resume pause",
        scroller: this.isMobile ? undefined : this.scrollContainer
      }
    });
    
    // Add typing effect to input fields
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
      input.addEventListener('focus', () => {
        gsap.to(input.parentNode.querySelector('label'), {
          color: '#14cf93',
          x: 5,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      
      input.addEventListener('blur', () => {
        if (!input.value) {
          gsap.to(input.parentNode.querySelector('label'), {
            color: '#666',
            x: 0,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      });
    });
    
    // Add button animation
    const submitButton = document.querySelector('.submit-button');
    if (submitButton) {
      submitButton.addEventListener('mouseenter', () => {
        gsap.to(submitButton.querySelector('svg'), {
          x: 5,
          rotation: 15,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      
      submitButton.addEventListener('mouseleave', () => {
        gsap.to(submitButton.querySelector('svg'), {
          x: 0,
          rotation: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      
      // Add form submit animation
      const contactForm = document.querySelector('.contact-form');
      if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
          e.preventDefault();
          
          // Animate button
          gsap.to(submitButton, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1
          });
          
          // Show success animation (could be enhanced with a proper submission handler)
          gsap.to(contactForm, {
            y: -10,
            opacity: 0.8,
            duration: 0.3,
            onComplete: () => {
              // Reset form
              contactForm.reset();
              
              // Show success state
              gsap.to(contactForm, {
                y: 0,
                opacity: 1,
                duration: 0.5,
                delay: 0.2
              });
              
              // You could add a success message here
            }
          });
        });
      }
    }
  }
}

// Initialize with proper sequencing
document.addEventListener("DOMContentLoaded", () => {
  // Set initial body styles
  document.body.style.overflow = 'hidden';
  
  // Initialize controller
  window.scrollController = new ScrollController();
  
  // Handle resize events with debounce
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      window.scrollController && window.scrollController.handleResize();
    }, 100);
  });

  // Re-enable scrolling after everything is loaded
  setTimeout(() => {
    document.body.style.overflow = '';
    if (window.scrollController) {
      window.scrollController.refreshScrollSystem();
    }
  }, 2000);
});