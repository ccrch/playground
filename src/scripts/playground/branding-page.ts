import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitText from 'gsap/SplitText'
import { lenis, lenisScroll } from '../core/helpers'

const brandingPage = {
  q: gsap.utils.selector('.branding-page-body'),

  init(): void {
    lenisScroll.init()
    gsap.registerPlugin(ScrollTrigger, SplitText)

    SplitText.create('.section__headline h1, .section__headline p', {
      linesClass: 'split-line',
      mask: 'lines',
      type: 'lines, words',
      wordsClass: 'split-word',
    })
    
    this.handleNavigationThemeChange()
    this.handleNavigation()
    this.handleNavigationLinksStatus()
    this.handleHero()
    this.handleSectionHeadline()
    
    gsap.to('.branding-page', { delay: 0.234, duration: 1.234, opacity: 1 })

    // lenis.stop()

    // setTimeout(() => {
    //   lenis.start()
    // }, 1234)

    SplitText.create('.symbol__boxes-container p', {
      linesClass: 'split-line',
      mask: 'lines',
      type: 'lines',
    })

    gsap.set('.symbol__boxes-container .split-line', { opacity: 0, overwrite: true, y: '100%' })

    ScrollTrigger.create({
      onEnter: () => {
        gsap.to('.symbol__boxes-container .split-line', {
          duration: 1.234,
          ease: 'power4.out',
          opacity: 1,
          stagger: 0.0876,
          y: '0%',
        })
      },
      start: '0% 80%',
      trigger: '.symbol__boxes-container',
    })

    ScrollTrigger.create({
      onLeaveBack: () => {
        gsap.set('.symbol__boxes-container .split-line', { opacity: 0, overwrite: true, y: '100%' })
      },
      start: '0% 100%',
      trigger: '.symbol__boxes-container',
    })
  },

  handleHero(): void {
    // Set random circle rotations

    this.q('.hero__circle-wrapper').forEach((circle) => {
      gsap.set(circle, {
        rotate: gsap.utils.random(0, 180, 33),
      })
    })

    // Reset headline on page load

    gsap.set('.hero .section__headline .split-word', { opacity: 0, overwrite: true, y: '100%' })

    // Reveal intro text on page load

    gsap.fromTo('.hero .section__headline .split-word', {
      opacity: 0,
      overwrite: true,
      y: '100%',
    }, {
      duration: 1.234,
      ease: 'power3.inOut',
      opacity: 1,
      stagger: 0.0876,
      y: '0%',
    })

    // Hide circles on scroll down

    ScrollTrigger.create({
      animation: gsap.to('.hero__circle', { ease: 'none', opacity: 0, stagger: 0.21 }),
      end: '100% 0%',
      scrub: true,
      start: '0% -10%',
      trigger: '.hero',
    })

    // Hide headline on scroll down

    ScrollTrigger.create({
      onEnter: () => {
        gsap.set('.hero .section__headline .split-word', {
          opacity: 0,
          overwrite: true,
          y: '100%',
        })
      },
      start: '100% 30%',
      trigger: '.hero',
    })

    // Show headline on scroll back up

    ScrollTrigger.create({
      onLeaveBack: () => {
        gsap.to('.hero .section__headline .split-word', {
          duration: 1.234,
          ease: 'power3.inOut',
          opacity: 1,
          stagger: 0.0876,
          y: '0%',
        })
      },
      start: '100% 70%',
      trigger: '.hero',
    })

    // Move headline a bit on scroll

    ScrollTrigger.create({
      animation: gsap.fromTo('.hero .section__headline, .hero__circles', { y: '25rem' }, { ease: 'none', y: '-25rem' }),
      end: '+=150%',
      scrub: true,
      start: '0% 0%',
      trigger: '.hero',
    })
  },

  handleNavigation(): void {
    this.q('.navigation__logo, .navigation__link').forEach((link) => {
      link.addEventListener('pointerdown', () => {
        const href = link.getAttribute('href')

        if (!lenis) return

        lenis.scrollTo(href, {
          duration: 0.543, //2.1, //1.234,
          // easing: (t) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2), // power3.inOut
          easing: (t) => (t < 0.5 ? 8 * t ** 4 : 1 - (-2 * t + 2) ** 4 / 2), // power4.inOut
          // offset: -window.innerHeight / 2 + titleHeight / 2,
        })
      })
    })
  },

  handleNavigationLinksStatus(): void {
    this.q('.section').forEach((section, index) => {
      if (index === 0) return

      // Move the line along with section's scroll progress

      ScrollTrigger.create({
        animation: gsap.to(this.q('.navigation__link-status > div')[index - 1], { scaleX: 1 }),
        end: '100% 50%',
        scrub: true,
        start: '0% 50%',
        trigger: section,
      })

      // Display only currently active line

      const lineReveal = (opacity) => gsap.to(document.querySelectorAll('.navigation__link-status')[index - 1], { opacity })
8
      ScrollTrigger.create({ 
        onEnter: () => {
          lineReveal(1)
        },
        onEnterBack: () => {
          lineReveal(1)
        },
        onLeave: () => {
          lineReveal(0)
        },
        onLeaveBack: () => {
          lineReveal(0)
        },
        end: '100% 50%',
        start: '0% 50%',
        trigger: section,
      })
    })
  },

  handleNavigationThemeChange(): void {
    this.q('.section').forEach((section) => {
      ScrollTrigger.create({
        onEnter: () => {
          if (section.classList.contains('section--light')) {
            this.q('.navigation')[0].classList.add('navigation--dark')
          } else {
            this.q('.navigation')[0].classList.remove('navigation--dark')
          }
        },
        onLeaveBack: () => {
          if (section.classList.contains('section--light')) {
            this.q('.navigation')[0].classList.remove('navigation--dark')
          } else {
            this.q('.navigation')[0].classList.add('navigation--dark')
          }
        },
        start: '0% 90%',
        trigger: section,
      })
    })
  },

  handleSectionHeadline(): void {
    this.q('.section').forEach((section, index) => {
      if (index === 0) return

      const el = {
        content: section.querySelector('.section__content'),
        headline: section.querySelector('.section__headline'),
        headlineEyebrow: section.querySelector('.section__headline-eyebrow'),
        headlineLines: section.querySelectorAll('.section__headline h1 .split-line'),
        headlineWords: section.querySelectorAll('.section__headline h1 .split-word'),
      }

      const a = {
        resetHeadline: () => {
          gsap.set([el.headlineEyebrow, el.headlineWords], { opacity: 0, overwrite: true, y: '100%' })
        },
      }

      // Reset headlines - on scroll down & scroll back up

      a.resetHeadline()

      ScrollTrigger.create({
        onEnter: a.resetHeadline,
        start: '0% 100%',
        trigger: section,
      })

      ScrollTrigger.create({
        onLeaveBack: a.resetHeadline,
        start: '100% 0%',
        trigger: section,
      })

      // Show headline on scroll down

      ScrollTrigger.create({
        onEnter: () => {
          gsap.to([el.headlineEyebrow, el.headlineWords], {
            duration: 1.234,
            ease: 'power3.inOut',
            opacity: 1,
            stagger: 0.0876,
            y: '0%',
          })
        },
        start: '0% 50%',
        trigger: section,
      })

      // Hide headline on scroll down when content comes in

      ScrollTrigger.create({
        onEnter: () => {
          gsap.to([el.headlineEyebrow, el.headlineWords], {
            duration: 0.876,
            ease: 'power3.inOut',
            opacity: 0,
            stagger: 0.0543,
            y: '-100%',
          })
        },
        onLeaveBack: () => {
          gsap.fromTo([el.headlineEyebrow, el.headlineWords], {
            opacity: 0,
            y: '100%',
          }, {
            duration: 1.234,
            ease: 'power3.inOut',
            opacity: 1,
            stagger: 0.0876,
            y: '0%',
          })
        },
        start: '0% 100%',
        trigger: el.content,
      })

      // Move headline a bit while it reveals

      ScrollTrigger.create({
        animation: gsap.fromTo(el.headline, {
          y: '25rem',
        }, {
          ease: 'none',
          y: '-25rem',
        }),
        end: '+=150%',
        scrub: true,
        start: '0% 100%',
        trigger: section,
      })
    })
  },
}

export default brandingPage
