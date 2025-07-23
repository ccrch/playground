import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitText from 'gsap/SplitText'
import { lenis, lenisScroll } from '../core/helpers'

const brandingPage = {  
  hero: {
    reset(): void {
      // Set random circle rotations

      document.querySelectorAll('.hero__circle-wrapper').forEach((circle) => {
        gsap.set(circle, {
          rotate: gsap.utils.random(0, 180, 33),
        })
      })

      // lenis?.scrollTo(0, 0)
      lenis?.stop()
    },

    reveal(): void {
      // Reveal the page

      gsap.to('.branding-page', { delay: 0.234, duration: 1.234, opacity: 1 })

      // Show headline characters

      gsap.to('.hero h1 .split-char', {
        delay: 0.543,
        duration: 1.234,
        ease: 'power3.inOut',
        stagger: 0.021,
        y: '0%',
      })

      // Enable scrolling

      setTimeout(() => {
        lenis?.start()
      }, 1234)
    },

    scrollTriggers(): void {
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
          gsap.set('.hero .section__headline .split-char', {
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
          gsap.to('.hero .section__headline .split-char', {
            duration: 1.234,
            ease: 'power3.inOut',
            stagger: 0.021,
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

    splitText(): void {
      // Split the text & reset it

      SplitText.create('.hero h1', {
        charsClass: 'split-char',
        linesClass: 'split-line',
        mask: 'lines',
        type: 'chars, lines',
      })

      gsap.set('.hero h1 .split-char', { overwrite: true, y: '100%' })
    },
  },

  navigation: {
    links(): void {
      document.querySelectorAll('.navigation__logo, .navigation__link').forEach((link) => {
        link.addEventListener('pointerdown', () => {
          const href = link.getAttribute('href')
    
          lenis?.scrollTo(href, {
            duration: 1.234,
            easing: (t) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2), // power3.inOut
            // easing: (t) => (t < 0.5 ? 8 * t ** 4 : 1 - (-2 * t + 2) ** 4 / 2), // power4.inOut
            // offset: -window.innerHeight / 2 + titleHeight / 2,
          })
        })
      })
    },

    linksStatus(): void {
      document.querySelectorAll('.section:not(.hero)').forEach((section, index) => {
        // Move the line along with section's scroll progress

        ScrollTrigger.create({
          animation: gsap.to(document.querySelectorAll('.navigation__link-status > div')[index], { scaleX: 1 }),
          end: '100% 50%',
          scrub: true,
          start: '0% 50%',
          trigger: section,
        })
  
        // Display only currently active line

        const lineReveal = (direction = 1) => {
          gsap.fromTo(document.querySelectorAll('.navigation__link-status')[index], {
            clipPath: `inset(0% 0% 0% ${direction === 0 ? 0 : 100}%)`,
          }, {
            clipPath: `inset(0% 0% 0% ${direction === 0 ? 100 : 0}%)`,
            duration: 0.765,
            ease: 'power3.inOut',
          })
        }

        // Show or hide lines on scroll

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
          end: '100% 75%',
          start: '0% 100%',
          trigger: section,
        })
      })
    },

    themeChange(): void {
      document.querySelectorAll('.section').forEach((section) => {
        ScrollTrigger.create({
          onEnter: () => {
            if (section.classList.contains('section--light')) {
              document.querySelector('.navigation').classList.add('navigation--dark')
            } else {
              document.querySelector('.navigation').classList.remove('navigation--dark')
            }
          },
          onLeaveBack: () => {
            if (section.classList.contains('section--light')) {
              document.querySelector('.navigation').classList.remove('navigation--dark')
            } else {
              document.querySelector('.navigation').classList.add('navigation--dark')
            }
          },
          start: '0% 90%',
          trigger: section,
        })
      })
    },
  },

  section: {
    scrollTriggers(): void {
      document.querySelectorAll('.section:not(.hero)').forEach((section, index) => {  
        const el = {
          content: section.querySelector('.section__content'),
          headline: section.querySelector('.section__headline'),
          headlineEyebrow: section.querySelector('.section__headline-eyebrow .split-line'),
          headlineLines: section.querySelectorAll('.section__headline h1 .split-line'),
        }
  
        // Reset headlines - on scroll down & scroll back up
  
        ScrollTrigger.create({
          onEnter: () => {
            gsap.set([el.headlineEyebrow, el.headlineLines], { overwrite: true, y: '100%' })
          },
          start: '0% 100%',
          trigger: section,
        })
  
        ScrollTrigger.create({
          onEnter: () => {
            gsap.set([el.headlineEyebrow, el.headlineLines], { overwrite: true, y: '100%' })
          },
          start: '100% 0%',
          trigger: section,
        })
  
        // Show headline on scroll down
  
        ScrollTrigger.create({
          onEnter: () => {
            gsap.to([el.headlineEyebrow, el.headlineLines], {
              duration: 1.234,
              ease: 'power3.out',
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
            gsap.to([el.headlineEyebrow, el.headlineLines], {
              duration: 0.876,
              ease: 'power3.inOut',
              overwrite: true,
              stagger: 0.0543,
              y: '-100%',
            })
          },
          onLeaveBack: () => {
            gsap.fromTo([el.headlineEyebrow, el.headlineLines], {
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
            y: '33rem',
          }, {
            ease: 'none',
            y: '-33rem',
          }),
          end: '+=210%',
          scrub: true,
          start: '0% 100%',
          trigger: section,
        })
      })
    },

    splitText(): void {
      // Split the text & reset it

      SplitText.create('.section:not(.hero) .section__headline h1, .section:not(.hero) .section__headline p', {
        linesClass: 'split-line',
        mask: 'lines',
        type: 'lines',
      })

      gsap.set('.section:not(.hero) .section__headline .split-line', { overwrite: true, y: '100%' })
    },
  },

  init(): void {
    gsap.registerPlugin(ScrollTrigger, SplitText)

    // Loading the page

    new Promise((resolve) => {
      // Loading fonts

      document.fonts.ready.then(() => {
        setTimeout(() => resolve(1), 12)
      })
    }).then(() => {
      // Loading & reseting page stuff

      lenisScroll.init()
      this.hero.reset()
      this.hero.splitText()
      this.section.splitText()
    }).then(() => {
      // Revealing the page

      this.hero.reveal()

      // Handling scroll triggers

      this.hero.scrollTriggers()
      this.section.scrollTriggers()

      // Handling navigation

      this.navigation.links()
      this.navigation.linksStatus()
      this.navigation.themeChange()
    })

    // TODO: Test later
    // ScrollTrigger.normalizeScroll(true)
    
    SplitText.create('.symbol__boxes-container p', {
      linesClass: 'split-line',
      mask: 'lines',
      type: 'lines',
    })

    gsap.set('.symbol__boxes-container .split-line', { overwrite: true, y: '100%' })

    // ScrollTrigger.create({
    //   onEnter: () => {
    //     gsap.to('.symbol__boxes-container .split-line', {
    //       duration: 1.234,
    //       ease: 'power4.out',
    //       opacity: 1,
    //       stagger: 0.0876,
    //       y: '0%',
    //     })
    //   },
    //   start: '0% 80%',
    //   trigger: '.symbol__boxes-container',
    // })

    // ScrollTrigger.create({
    //   onLeaveBack: () => {
    //     gsap.set('.symbol__boxes-container .split-line', { opacity: 0, overwrite: true, y: '100%' })
    //   },
    //   start: '0% 100%',
    //   trigger: '.symbol__boxes-container',
    // })

    document.querySelectorAll('.symbol__boxes-container .split-line').forEach((line) => {
      ScrollTrigger.create({
        // animation: 
        //   gsap.to(line, {
        //     ease: 'none',
        //     opacity: 1,
        //     y: '0%',
        //   }),
        onEnter: () => {
          gsap.to(line, {
            duration: 1.234,
            ease: 'power4.out',
            opacity: 1,
            // stagger: 0.0876,
            y: '0%',
          })
        },
        // end: '+=5%',
        // scrub: true,
        start: '0% 90%',
        trigger: line,
      })

      ScrollTrigger.create({
        onLeaveBack: () => {
          gsap.set(line, { y: '100%' })
        },
        start: '0% 100%',
        trigger: line,
      })
    })
  },
}

export default brandingPage
