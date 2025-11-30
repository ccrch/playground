import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitText from 'gsap/SplitText'
import { lenis } from '../core/helpers'
import brandingPage from './branding-page'

const brandingPageSectionHome = {
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
    // Get scroll velocity

    ScrollTrigger.create({
      end: '100% 100%',
      start: '0% 0%',
      onUpdate: (self) => {
        brandingPage.scrollVelocity = self.getVelocity() * self.direction
      },
      trigger: '.branding-page',
    })

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
        mask: 'lines',
        tag: 'span',
        type: 'chars, lines, words',
        wordsClass: 'split-word',
      })

      gsap.set('.section--home h1', { clearProps: 'textAlign' })
      gsap.set('.section--home h1 .split-line', { textAlign: 'center' })

      gsap.set('.section--home h1 .split-char', { overwrite: true, y: '100%' })
    })
  },
}

export default brandingPageSectionHome
