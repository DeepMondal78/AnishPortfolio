
function scrollTrig() {
	gsap.registerPlugin(ScrollTrigger);

	// ✦ gsap__anim elements – reduce yPercent from 100 to 30
	let gsapAnim = gsap.utils.toArray('.gsap__anim');
	gsapAnim.forEach(section => {
		gsap.to(section, {
			scrollTrigger: {
				trigger: section,
				start: 'bottom bottom',
				end: 'bottom top',
				scrub: 1
			},
			yPercent: 30,
			ease: 'none'
		});
	});

	// ✦ parallax__wrapp – yPercent from -20 to -10 (subtle)
	let parallaxWrapp = gsap.utils.toArray('.parallax__wrapp');
	parallaxWrapp.forEach(parallax => {
		gsap.to(parallax, {
			scrollTrigger: {
				trigger: parallax,
				start: 'top bottom',
				end: 'bottom top',
				scrub: 1
			},
			yPercent: -10,
			ease: 'none'
		});
	});

	// ✦ title-p – reduce yPercent from 100 to 30
	gsap.to('.title-p', {
		scrollTrigger: {
			trigger: 'article.header',
			start: 'top top',
			end: 'bottom top',
			scrub: 1
		},
		yPercent: 30
	});

	// ✦ title__img – keep rotation subtle (360 to 90)
	gsap.to('.title__img img', {
		scrollTrigger: {
			trigger: '.serv',
			start: 'top bottom',
			end: 'bottom top',
			scrub: 1
		},
		rotate: 90,
		ease: 'none'
	});

	// ✦ Horizontal text movement – reduced to xPercent 5-8
	gsap.to('.title__t', {
		scrollTrigger: {
			trigger: '.serv',
			start: 'top top',
			end: 'bottom top',
			scrub: 1
		},
		xPercent: -5,
		ease: 'none'
	});

	gsap.to('.serv .stroke', {
		scrollTrigger: {
			trigger: '.serv',
			start: 'top top',
			end: 'bottom top',
			scrub: 1
		},
		xPercent: 5,
		ease: 'none'
	});

	gsap.to('.serv__item:nth-child(1)', {
		scrollTrigger: {
			trigger: '.serv',
			start: 'top top',
			end: 'bottom top',
			scrub: 1
		},
		xPercent: -5,
		ease: 'none'
	});

	gsap.to('.serv__item:nth-child(3)', {
		scrollTrigger: {
			trigger: '.serv',
			start: 'top top',
			end: 'bottom top',
			scrub: 1
		},
		xPercent: 5,
		ease: 'none'
	});

	// ✦ portfolio image scale – reduce from 1.3 to 1.1
	gsap.to('.portfolio__item-img img', {
		scrollTrigger: {
			trigger: '.portfolio',
			start: 'top top',
			end: 'bottom top',
			scrub: true
		},
		scale: 1.1,
		ease: 'none'
	});

	// ✦ star rotation – keep this one a bit bold (360 → 180)
	gsap.to('.approve__star', {
		scrollTrigger: {
			trigger: '.approve',
			start: 'top bottom',
			end: 'bottom top',
			scrub: true
		},
		rotate: 180,
		ease: 'none'
	});

	
}
scrollTrig();

gsap.registerPlugin(ScrollTrigger);

// Utility function to handle scroll-triggered audio control
function handleScrollAudio({ videoId, triggerClass }) {
  const video = document.getElementById(videoId);
  if (!video) return;

  // Make sure the video plays muted at first
  video.play().catch(() => {});

  ScrollTrigger.create({
    trigger: triggerClass,
    start: "top 80%",
    end: "bottom 20%",
    onEnter: () => {
      video.muted = false;
      video.play().catch(err => console.warn(`Play error on ${videoId}:`, err));
    },
    onEnterBack: () => {
      video.muted = false;
      video.play().catch(err => console.warn(`Play error on ${videoId}:`, err));
    },
    onLeave: () => {
      video.muted = true;
    },
    onLeaveBack: () => {
      video.muted = true;
    }
  });
}

// Apply for both videos
handleScrollAudio({
  videoId: "video1",
  triggerClass: ".header" // First video section
});

handleScrollAudio({
  videoId: "video2",
  triggerClass: ".header:last-of-type" // Second video section
});
