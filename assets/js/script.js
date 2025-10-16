const lenis = new Lenis({
  wrapper: document.body,
  content: document.querySelector('main'),
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  duration: 1.5,
  smooth: true,
  direction: "vertical",
  gestureDirection: "vertical",
  smoothTouch: false,
  touchMultiplier: 1.4,
  lerp: 0.08,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

lenis.on('scroll', ScrollTrigger.update);


ScrollTrigger.scrollerProxy("main", {
  scrollTop(value) {
    return arguments.length
      ? lenis.scrollTo(value, { immediate: true })
      : lenis.targetScroll;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  },
  pinType: document.querySelector("main").style.transform ? "transform" : "fixed",
});
ScrollTrigger.defaults({ scroller: "main" });


/*===================== Page Overlay Loding Animation ====================*/
function startLoader() {
  let counterElement = document.querySelector('.counter');
  let currentValue = 0;

  function updateCounter() {
    if (currentValue === 100) return;

    currentValue += Math.floor(Math.random() * 1) + 1;
    if (currentValue > 100) currentValue = 100;

    counterElement.textContent = currentValue;
    let delay = Math.floor(Math.random() * 60) + 1;
    setTimeout(updateCounter, delay);
  }

  updateCounter();
}
startLoader();

// Loader out animation
gsap.to('.counter', {
  delay: 3.5,
  opacity: 0,
  duration: 1,
  onComplete: () => document.querySelector('.counter').style.display = 'none'
});

gsap.to('.bar', {
  delay: 3.5,
  height: 0,
  stagger: { amount: 0.5 },
  ease: 'power4.inOut',
  duration: 1.5,
  onComplete: () => {
    document.querySelector('.overlay').style.display = 'none';
    startWebsiteAnimation();
    ScrollTrigger.refresh();
  }
});


/*===================== Cursor Follow ====================*/
const cursor = document.querySelector("#cursor");
let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
let pos = { x: mouse.x, y: mouse.y };

if (cursor) {
  gsap.to({}, {
    duration: 0.016,
    repeat: -1,
    onRepeat: () => {
      pos.x += (mouse.x - pos.x) * 0.15;
      pos.y += (mouse.y - pos.y) * 0.15;
      gsap.set(cursor, {
        x: pos.x - cursor.offsetWidth / 2,
        y: pos.y - cursor.offsetHeight / 2
      });
    }
  });

  window.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
}

/*===================== Navmenu Toggle ====================*/
const menu = document.getElementById('menu');
const cross = document.getElementById('cross');
const navMenu = document.querySelector('.navmenu');
const menuLinks = document.querySelectorAll('.navmenu ul li');

function navmenuOpenClose() {
  if (menu && cross && navMenu) {
    menu.addEventListener('click', () => {
      menu.style.display = 'none';
      cross.style.display = 'block';

      navMenu.classList.add('active');
      gsap.fromTo(navMenu, { yPercent: -100 }, { yPercent: 0, duration: 1, ease: 'power4.out' });

      gsap.from(menuLinks, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.1,
        delay: 0.5
      });
    });

    cross.addEventListener('click', () => {
      cross.style.display = 'none';
      menu.style.display = 'block';

      gsap.to(navMenu, {
        yPercent: -100,
        duration: 1,
        ease: 'power4.in',
        onComplete: () => navMenu.classList.remove('active')
      });
    });
  }
}
navmenuOpenClose();




/*===================== Hero Animation ====================*/
function startWebsiteAnimation() {
  const tl = gsap.timeline();
  // Paragraph animation: slide from bottom
  tl.fromTo(".heroSection .heading p",
    { opacity: 0, y: 60 },
    { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=0.8"
  )

  // Hero Image: clip reveal (like modern mask animation)
  tl.fromTo(".heroSection .heroImg",
    { opacity: 0, clipPath: "inset(0 0 100% 0)" },
    { opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 1.2, ease: "power3.inOut" }, "-=0.6"
  )

  // Button: slight bounce and fade in
  tl.fromTo(".heroSection .button",
    { opacity: 0, y: 40, scale: 0.95 },
    { opacity: 1, y: 0, scale: 1, duration: 1, ease: "back.out(1.7)" }, "-=0.8"
  );
}




/*===================== About Section ====================*/
gsap.registerPlugin(ScrollTrigger);

function splitTextToChars() {
  const splitText = document.querySelectorAll('.scroll-text');
  splitText.forEach((text) => new SplitType(text, { types: 'chars' }));
}

function unhideText() {
  const hideText = document.querySelector('.text-hidden');
  if (hideText) hideText.classList.remove('text-hidden');
}

function scrollAnimation() {
  const chars = document.querySelectorAll('.char');

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".scroll-section",
      start: "top 70%",
      toggleActions: "play none reverse none", // ✅ play on enter, reverse on leave back
      scroller: "main", // keep this if using Lenis, otherwise remove it
      markers: false // set to true to debug
    }
  });

  tl.fromTo(chars, {
    rotateY: () => Math.random() * 180 + 180,
    yPercent: () => Math.random() * 100 - 50,
    scale: 0,
  }, {
    rotateY: 0,
    yPercent: 0,
    xPercent: 0,
    scale: 1,
    stagger: {
      amount: 1,
      from: 'random',
    },
    duration: 1.5,
    ease: "power3.out",
  });
}

document.addEventListener('DOMContentLoaded', () => {
  splitTextToChars();
  unhideText();
  scrollAnimation();
});

window.addEventListener("load", () => {
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 1000); // ✅ Delay refresh after mobile layout settles
});




/*===================== Resent Work Section ====================*/
function scrollRecentAnimation() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".resentSection",
      start: "top 70%",
      scroller: "main", // Lenis use korle
      toggleActions: "play none none reverse",
      once: true, // ekbar e hobe
      markers: false
    }
  });

  tl.from(".rsentHeading h1:nth-child(1)", {
    xPercent: -100,
    opacity: 0,
    duration: 1.5,
    ease: "power3.out"
  })
    .from(".rsentHeading h1:nth-child(2)", {
      xPercent: 40,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out"
    }, "-=0.8")
    .from(".resentText > h1", {
      xPercent: 50,
      rotation: -180,
      opacity: 0,
      duration: 1,
      ease: "power3.out"
    }, "-=0.6");
}
document.addEventListener("DOMContentLoaded", () => {
  scrollRecentAnimation();
});


/*===================== Resent Work-follow Section ====================*/


gsap.registerPlugin(ScrollTrigger);

const container = document.querySelector(".rainbow-circle");
const cards = gsap.utils.toArray(".arc-card");

function positionCards() {
  const radius = container.offsetWidth / 2;
  const center = radius;
  const total = cards.length;
  const slice = Math.PI / (total - 1); // half circle

  cards.forEach((card, i) => {
    const angle = Math.PI + i * slice; // rainbow arc
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    gsap.set(card, {
      x: x,
      y: y,
      rotation: (angle * 180) / Math.PI + 90,
    });
  });
}

positionCards();
window.addEventListener("resize", positionCards);

// Animate arc container anti-clockwise (left to right)
gsap.to(".rainbow-circle", {
  rotation: -180,
  ease: "power2.inOut",
  scrollTrigger: {
    trigger: ".rainbow-circle-section",
    start: "top bottom",
    end: "bottom top",
    scrub: 1,
  }
});


document.querySelectorAll(".workCard").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "scale(1.05)";
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "scale(1)";
  });
});

// YouTube IFrame API handling
function onYouTubeIframeAPIReady() {
  document.querySelectorAll(".videoBox iframe").forEach((iframe) => {
    const player = new YT.Player(iframe, {
      events: {
        onReady: (event) => {
          const videoBox = iframe.closest(".videoBox");

          videoBox.addEventListener("mouseenter", () => {
            event.target.mute();
            event.target.playVideo();
          });

          videoBox.addEventListener("mouseleave", () => {
            event.target.pauseVideo();
          });

          videoBox.addEventListener("click", () => {
            event.target.unMute();
          });
        },
      },
    });
  });
}
