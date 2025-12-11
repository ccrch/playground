import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Logo from './branding-page-logo'
import ScrambledText from './branding-page-scrambled-text'
import brandingPage from './branding-page'

const Section = {
  q: gsap.utils.selector('.section--typography'),

  init(): void {
    this.animate3DLetters()
    this.animateTypoCircles()
    this.handleFontWeightsChange()

    Logo.animate3DLogo({
      scrollTriggerTrigger: this.q('.section__content-box-3d-letters')[0],
      target: this.q('.logo--3d')[0],
    })

    ScrambledText.init({ target: this.q('.scrambled-text')[0] })
  },

  animate3DLetters(): void {
    const letters = ['Aa', 'Áá', 'Bb', 'Dd', 'Ðð', 'Ee', 'Éé', 'Ff', 'Gg', 'Hh', 'Ii', 'Íí', 'Jj', 'Kk', 'Ll', 'Mm', 'Nn', 'Oo', 'Óó', 'Pp', 'Rr', 'Ss', 'Tt', 'Uu', 'Úú', 'Vv', 'Xx', 'Yy', 'Ýý', 'Þþ', 'Ææ', 'Öö']
    let lettersIndex = 1

    const updateLetters = () => {
      this.q('.section__content-box-3d-letters .logo--3d p').forEach((el) => {
        el.textContent = letters[lettersIndex]
      })
    }

    gsap
      .timeline({
        id: 'letters-timeline',
        onRepeat: () => {
          lettersIndex = lettersIndex >= letters.length - 1 ? 0 : lettersIndex + 1
        },
        paused: true,
        repeat: -1,
        repeatDelay: 2.1,
      })
      .to(this.q('.section__content-box-3d-letters-container'), { duration: 0.543, ease: 'power4.in', onComplete: updateLetters, opacity: 0, y: '-21rem' })
      .set(this.q('.section__content-box-3d-letters-container'), { opacity: 0, y: '31rem' })
      .to(this.q('.section__content-box-3d-letters-container'), { duration: 1.234, ease: 'power4.out', opacity: 1, y: '0rem' })

    ScrollTrigger.create({
      once: true,
      onEnter: () => {
        gsap.getById('letters-timeline').play()

        ScrollTrigger.create({
          end: '100% 0%',
          onEnter: () => gsap.getById('letters-timeline').play(),
          onEnterBack: () => gsap.getById('letters-timeline').play(),
          onLeave: () => gsap.getById('letters-timeline').pause(),
          onLeaveBack: () => gsap.getById('letters-timeline').pause(),
          start: '0% 100%',
          trigger: this.q('.section__content-box-3d-letters'),
        })
      },
      start: '0% 50%',
      trigger: this.q('.section__content-box-3d-letters'),
    })
  },

  animateTypoCircles(): void {
    gsap.matchMedia().add(brandingPage.breakpoints, (context) => {
      const { isDesktop } = context.conditions

      const circlesReveal = (opacity) => {
        gsap.to(this.q('.typo-circles .container'), { autoAlpha: opacity })
      }

      gsap.set(this.q('.typo-circles .container'), { autoAlpha: 0, overwrite: true })

      ScrollTrigger.create({
        onEnter: () => circlesReveal(1),
        onEnterBack: () => circlesReveal(1),
        onLeave: () => circlesReveal(0),
        end: '100% 80%',
        start: '0% 50%',
        trigger: this.q('.typo-circles'),
      })

      ScrollTrigger.create({
        onLeaveBack: () => circlesReveal(0),
        start: '0% 80%',
        trigger: this.q('.typo-circles'),
      })

      const spacing = 2

      ScrollTrigger.create({
        animation: gsap
          .timeline({ defaults: { ease: 'none' } })
          .set(this.q('.typo-circles ul'), { x: `${-75 - spacing * 5}rem` })
          .set(this.q('.typo-circles li'), { margin: `0 ${spacing}rem` })
          .to(this.q('.typo-circles ul'), { x: '0rem' })
          .to(this.q('.typo-circles li'), { margin: '0 -15rem' }, '<'),
        end: '100% 50%',
        scrub: true,
        start: '0% 100%',
        trigger: this.q('.typo-circles'),
      })
    })

    // gsap.matchMedia().add(brandingPage.breakpoints, (context) => {
    //   const { isDesktop } = context.conditions

    //   const spacingBottom = 17
    //   const spacingTop = -30

    //   ScrollTrigger.create({
    //     animation: gsap
    //       .timeline({ defaults: { ease: 'power2.out' } })
    //       .set(this.q('.typo-circles'), { x: `${-75 - spacingBottom * 5}rem` })
    //       .set(this.q('.typo-circles li'), { margin: `0 ${spacingBottom}rem` })
    //       .to(this.q('.typo-circles'), { x: '0rem' })
    //       .to(this.q('.typo-circles li'), { margin: '0 -15rem' }, '<'),
    //     end: '50% 50%',
    //     scrub: true,
    //     start: '0% 100%',
    //     trigger: this.q('.typo-circles'),
    //   })

    //   ScrollTrigger.create({
    //     animation: gsap
    //       .timeline({ defaults: { ease: 'power2.in' } })
    //       .fromTo(this.q('.typo-circles'), { x: '0rem' }, { x: `${-75 - spacingTop * 5}rem` })
    //       .fromTo(this.q('.typo-circles li'), { margin: '0 -15rem' }, { margin: `0 ${spacingTop}rem` }, '<'),
    //     end: '100% 0%',
    //     scrub: true,
    //     start: '50% 50%',
    //     trigger: this.q('.typo-circles'),
    //   })
    // })
  },

  handleFontWeightsChange(): void {
    // Changing font weights in 1st & 4th box

    const box1Buttons = this.q('.alphabet__row--1 button')
    const box1Weights = [400, 500, 700]
    const box4Buttons = this.q('.section__content-box-font-weights button')
    const box4Weights = [300, 400, 500, 600, 700]

    box1Buttons.forEach((button, index) => {
      button.addEventListener('click', () => {
        gsap.to(this.q('.alphabet__row--3 p'), { duration: 0.543, ease: 'power3.out', fontWeight: box1Weights[index] })
      })
    })

    box4Buttons.forEach((button, index) => {
      button.addEventListener('click', () => {
        gsap.to(this.q('.logo--3d p, .scrambled-text p'), { duration: 0.543, ease: 'power3.out', fontWeight: box4Weights[index] })
      })
    })
  },
}

export default Section
