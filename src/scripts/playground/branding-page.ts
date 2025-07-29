import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitText from 'gsap/SplitText'
import { lenis, lenisScroll } from '../core/helpers'

const brandingPage = {
  breakpoints: {
    isDesktop: '(min-width: 768px)',
    isMobile: '(max-width: 767px)',
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
            // immediate: true,
          })
        })
      })
    },

    linksStatus(): void {
      document.querySelectorAll('.section:not(.section--home)').forEach((section, index) => {
        if (!document.querySelectorAll('.navigation__link-status > div')[index]) return

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
      const el = {
        navigation: document.querySelector<HTMLElement>('.navigation'),
        sections: document.querySelectorAll<HTMLElement>('.section'),
      }

      el.sections.forEach((section) => {
        ScrollTrigger.create({
          onEnter: () => {
            if (section.classList.contains('section--white')) {
              el.navigation.classList.add('navigation--white')
            } else {
              el.navigation.classList.remove('navigation--white')
            }
          },
          onLeaveBack: () => {
            if (section.classList.contains('section--white')) {
              el.navigation.classList.remove('navigation--white')
            } else {
              el.navigation.classList.add('navigation--white')
            }
          },
          start: () => `0% ${window.innerHeight - el.navigation.offsetHeight}px`,
          trigger: section,
        })
      })
    },
  },

  section: {
    scrollTriggers(): void {
      gsap.matchMedia().add(brandingPage.breakpoints, () => {
        document.querySelectorAll('.section:not(.section--home)').forEach((section) => {  
          const el = {
            content: section.querySelector('.section__content'),
            headline: section.querySelector('.section__headline'),
            headlineChars: section.querySelectorAll('.section__headline h1 .split-char'),
            headlineEyebrow: section.querySelectorAll('.section__headline p .split-line'),
            headlineLines: section.querySelectorAll('.section__headline h1 .split-line'),
          }
  
          const isHeadlineSmall = el.headline.classList.contains('section__headline--small')
    
          // Reset headlines - on scroll down & scroll back up
    
          ScrollTrigger.create({
            onEnter: () => {
              gsap.set([el.headlineEyebrow, el.headlineChars], { overwrite: true, y: '100%' })
              gsap.set(el.headlineLines, { overwrite: true, y: '0%' })
            },
            start: '0% 100%',
            trigger: section,
          })
    
          ScrollTrigger.create({
            onEnter: () => {
              gsap.set([el.headlineEyebrow, el.headlineChars], { overwrite: true, y: '100%' })
              gsap.set(el.headlineLines, { overwrite: true, y: '0%' })
            },
            start: '100% 0%',
            trigger: section,
          })
    
          // Show headline on scroll down
    
          ScrollTrigger.create({
            onEnter: () => {
              gsap.set(el.headlineLines, { overwrite: true, y: '0%' })
              gsap.to([el.headlineEyebrow, el.headlineChars], {
                duration: 1.234,
                ease: 'power3.out',
                opacity: 1,
                stagger: !isHeadlineSmall ? 0.021 : 0.012,
                y: '0%',
              })
            },
            start: '0% 50%',
            trigger: section,
          })
    
          // Hide headline on scroll down when content comes in & show it again on scroll back up
    
          ScrollTrigger.create({
            onEnter: () => {
              // gsap.set(el.headlineChars, { overwrite: true, y: '0%' })
              gsap.to([el.headlineEyebrow, el.headlineLines], {
                duration: 0.876,
                ease: 'power3.inOut',
                overwrite: true,
                stagger: 0.0543,
                y: '-100%',
              })
            },
            onLeaveBack: () => {
              gsap.set(el.headlineChars, { overwrite: true, y: '100%' })
              gsap.set(el.headlineLines, { overwrite: true, y: '0%' })
              gsap.fromTo([el.headlineEyebrow, el.headlineChars], {
                y: '100%',
              }, {
                duration: 1.234,
                ease: 'power3.out',
                stagger: !isHeadlineSmall ? 0.021 : 0.012,
                y: '0%',
              })
            },
            start: '0% 80%',
            trigger: el.content,
          })
    
          // Move headline a bit while it reveals
    
          ScrollTrigger.create({
            animation: gsap.fromTo(el.headline, {
              y: '66rem',
            }, {
              ease: 'none',
              y: '-66rem',
            }),
            end: '+=210%',
            scrub: true,
            start: '0% 100%',
            trigger: section,
          })
        })
      })
    },

    splitText(): void {
      // Split the text & reset it
      // Setting text-align to left to avoid issues with SplitText not splitting text correctly when aligned to center

      gsap.matchMedia().add(brandingPage.breakpoints, () => {
        SplitText.create('.section:not(.section--home) .section__headline p', {
          linesClass: 'split-line',
          mask: 'lines',
          type: 'lines',
        })
  
        gsap.set('.section:not(.section--home) .section__headline h1', { textAlign: 'left' })
  
        SplitText.create('.section:not(.section--home) .section__headline h1', {
          charsClass: 'split-char',
          linesClass: 'split-line',
          mask: 'lines',
          type: 'chars, lines, words',
          wordsClass: 'split-word',
        })
  
        gsap.set('.section:not(.section--home) .section__headline h1', { clearProps: 'textAlign' })
        gsap.set('.section:not(.section--home) .section__headline:not(.section__headline--small) h1 .split-line', { textAlign: 'center' })
  
        gsap.set('.section:not(.section--home) .section__headline p .split-line', { overwrite: true, y: '100%' })
        gsap.set('.section:not(.section--home) .section__headline h1 .split-char', { overwrite: true, y: '100%' })
      })
    },
  },

  sectionHome: {
    reset(): void {
      // Set random circle rotations

      document.querySelectorAll('.section--home .circle__container').forEach((circle) => {
        gsap.set(circle, {
          rotate: gsap.utils.random(0, 180, 33),
        })
      })

      // lenis.scrollTo(0, { immediate: true })
      lenis?.stop()
    },

    reveal(): void {
      gsap.matchMedia().add(brandingPage.breakpoints, () => {
        // Reveal the page
  
        gsap.to('.branding-page', { delay: 0.234, duration: 1.234, opacity: 1 })
  
        // Show headline characters
  
        gsap.to('.section--home h1 .split-char', {
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
      })
    },

    scrollTriggers(): void {
      // Hide circles on scroll down

      ScrollTrigger.create({
        animation: gsap.to('.section--home .circle', { ease: 'none', opacity: 0, stagger: 0.21 }),
        end: '100% 0%',
        scrub: true,
        start: '0% -10%',
        trigger: '.section--home',
      })

      gsap.matchMedia().add(brandingPage.breakpoints, () => {
        // Hide headline on scroll down
  
        ScrollTrigger.create({
          onEnter: () => {
            gsap.set('.section--home .section__headline .split-char', {
              overwrite: true,
              y: '100%',
            })
          },
          start: '100% 30%',
          trigger: '.section--home',
        })
  
        // Show headline on scroll back up
  
        ScrollTrigger.create({
          onLeaveBack: () => {
            gsap.to('.section--home .section__headline .split-char', {
              duration: 1.234,
              ease: 'power3.out',
              stagger: 0.021,
              y: '0%',
            })
          },
          start: '100% 70%',
          trigger: '.section--home',
        })
      })

      // Move headline a bit on scroll

      ScrollTrigger.create({
        animation: gsap.fromTo('.section--home .section__headline, .section--home .circles', { y: '44rem' }, { ease: 'none', y: '-44rem' }),
        end: '+=150%',
        scrub: true,
        start: '0% 0%',
        trigger: '.section--home',
      })
    },

    splitText(): void {
      // Split the text & reset it
      // Setting text-align to left to avoid issues with SplitText not splitting text correctly when aligned to center

      gsap.matchMedia().add(brandingPage.breakpoints, () => {
        gsap.set('.section--home h1', { textAlign: 'left' })
  
        SplitText.create('.section--home h1', {
          charsClass: 'split-char',
          linesClass: 'split-line',
          mask: 'words',
          type: 'chars, lines, words',
          wordsClass: 'split-word',
        })
  
        gsap.set('.section--home h1', { clearProps: 'textAlign' })
        gsap.set('.section--home h1 .split-line', { textAlign: 'center' })
  
        gsap.set('.section--home h1 .split-char', { overwrite: true, y: '100%' })
      })
    },
  },

  sectionSign: {
    scrollTriggers(): void {
      // Pinning the details text

      // ScrollTrigger.create({
      //   end: () => `100% ${document.querySelector<HTMLElement>('.section--sign .details__text').offsetHeight + 40}px`,
      //   pin: '.section--sign .details__text',
      //   start: '0% 40rem',
      //   trigger: '.section--sign .details__boxes',
      // })

      // Moving the details text along with boxes on the right

      const el = {
        boxes: document.querySelector<HTMLElement>('.section--sign .details__boxes'),
        text: document.querySelector<HTMLElement>('.section--sign .details__text'),
      }

      gsap.matchMedia().add(brandingPage.breakpoints, (context) => {
        const { isDesktop } = context.conditions

        if (isDesktop) {          
          ScrollTrigger.create({
            animation: gsap.fromTo(el.text, { yPercent: -7 }, { ease: 'none', yPercent: () => {
              const px = el.boxes.offsetHeight - el.text.offsetHeight
              const percent = (px / el.text.offsetHeight) * 100
              return percent
            } }),
            end: '100% 0%',
            scrub: true,
            start: '0% 100%',
            trigger: el.boxes,
          })
        }
      })

      // Showing/hiding logos

      // gsap.set('.section--sign .box__container', { overwrite: true, scale: 0.8 })
      gsap.set('.section--sign .logo', { overwrite: true, scale: 0 })

      // document.querySelectorAll('.section--sign .box__container').forEach((box) => {
      //   ScrollTrigger.create({
      //     onEnter: () => {
      //       gsap.to(box, {
      //         duration: 1.234,
      //         ease: 'power3.out',
      //         scale: 1,
      //       })
      //     },
      //     start: '0% 90%',
      //     trigger: box.parentElement,
      //   })

      //   ScrollTrigger.create({
      //     onLeaveBack: () => {
      //       gsap.set(box, {
      //         overwrite: true,
      //         scale: 0.8,
      //       })
      //     },
      //     start: '0% 100%',
      //     trigger: box.parentElement,
      //   })
      // })

      document.querySelectorAll('.section--sign .logo').forEach((logo, index) => {
        ScrollTrigger.create({
          onEnter: () => {
            gsap.to(logo, {
              delay: index === 1 ? 0.234 : 0,
              duration: 0.876,
              ease: 'power3.out',
              scale: 1,
            })
          },
          start: '0% 80%',
          trigger: logo.parentElement,
        })

        ScrollTrigger.create({
          onLeaveBack: () => {
            gsap.set(logo, { overwrite: true, scale: 0 })
          },
          start: '0% 100%',
          trigger: logo.parentElement,
        })
      })
    },
  },

  typography: {
    scrollTriggers(): void {
      // Handle scroll trigger for all content split text

      gsap.matchMedia().add(brandingPage.breakpoints, () => {
        document.querySelectorAll('.split-text .split-line').forEach((line) => {
          ScrollTrigger.create({
            onEnter: () => {
              gsap.to(line.querySelectorAll('.split-word'), {
                duration: 1.234,
                ease: 'power4.out',
                opacity: 1,
                stagger: 0.0543,
                y: '0%',
              })
            },
            start: '0% 90%',
            trigger: line.parentElement,
          })
    
          ScrollTrigger.create({
            onLeaveBack: () => {
              gsap.set(line.querySelectorAll('.split-word'), { overwrite: true, y: '100%' })
            },
            start: '0% 100%',
            trigger: line.parentElement,
          })
        })
      })
    },

    splitText(): void {
      // Split the text & reset it

      gsap.matchMedia().add(brandingPage.breakpoints, () => {
        SplitText.create('.split-text', {
          // TODO: Test later
          // autoSplit: true,
          // onSplit: (self) => {
          //   console.log(self)
          //   // brandingPage.typography.scrollTriggers()
          // },
          aria: 'none',
          linesClass: 'split-line',
          mask: 'words',
          type: 'lines, words',
          wordsClass: 'split-word',
        })
    
        gsap.set('.split-text .split-word', { overwrite: true, y: '100%' })
      })
    },
  },

  init(): void {
    gsap.registerPlugin(ScrollTrigger, SplitText)

    // Loading the page

    ;(async () => {
      // Loading fonts

      await document.fonts.ready
      await new Promise(r => setTimeout(r, 12))

      // Smooth scrolling init

      lenisScroll.init()
    
      //  Loading & reseting page stuff

      await this.section.splitText()
      await this.sectionHome.reset()
      await this.sectionHome.splitText()
      await this.typography.splitText()
    
      // Revealing the page

      await this.sectionHome.reveal()

      // Handling scroll triggers

      this.typography.scrollTriggers()
      this.section.scrollTriggers()
      this.sectionHome.scrollTriggers()
      this.sectionSign.scrollTriggers()
    
      // Handling navigation

      this.navigation.links()
      this.navigation.linksStatus()
      this.navigation.themeChange()
    
      // ScrollTrigger refresh

      await new Promise(r => setTimeout(r, 12))
      ScrollTrigger.refresh()
    })()

    // window.addEventListener('resize', () => {
    //   console.log(ScrollTrigger.getAll().length)
    // })

    // TODO: Test later
    // ScrollTrigger.normalizeScroll(true)
    
    // TODO: Testing parallax shapes

    gsap.set('.section__shapes', { display: 'none' })

    document.querySelectorAll('.section:not(.section--home)').forEach((section) => {
      section.querySelectorAll('.section__shapes > div').forEach((shape, index) => {
        gsap.set(shape, { width: gsap.utils.random(180, 440, 44) + 'rem', aspectRatio: 1 })

        if ((index - 1) % 2 === 0) {
          gsap.set(shape, { left: gsap.utils.random(-10, -1, 1) + '%' })
        } else {
          gsap.set(shape, { right: gsap.utils.random(-10, -1, 1) + '%' })
        }
      })

      ScrollTrigger.create({
        animation: gsap.to(section.querySelector('.section__shapes'), { y: '50%'}),
        end: '100% 0%',
        scrub: true,
        start: '0% 100%',
        trigger: section,
      })
    })
  },
}

export default brandingPage
