import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
// import SplitText from 'gsap/SplitText'
import brandingPage from './branding-page'

const Colors = {
  q: undefined,

  init({ target }: { target: HTMLElement }): void {
    this.q = gsap.utils.selector(target)
    ;(async () => {
      // Loading fonts

      await document.fonts.ready
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
      await brandingPage.delay(12)

      // this.splitText(target)
      // this.scrambleText(target)
      // this.handleScrollTriggers(target)
    })()

    gsap
      .timeline({ default: { duration: 1, ease: 'none' }, id: 'colors-animation', paused: true })
      // Reset
      .set(this.q('.colors__box'), { scaleX: 0, transformOrigin: '0% 0%', x: 0 })
      .set(this.q('.colors__boxes-container'), { margin: '0 -150rem', skewX: 21 })
      // Go!
      .to(this.q('.colors__box--red'), { scaleX: 1 })
      .to(this.q('.colors__box--gray'), { scaleX: 1 }, '<0.3')
      .to(this.q('.colors__box--navy'), { scaleX: 1 }, '<0.3')
      .set(this.q('.colors__box'), { transformOrigin: '100% 0%' })
      .to(this.q('.colors__box--navy'), { scaleX: 0 })
      .to(this.q('.colors__box--gray'), { scaleX: 0 }, '<0.3')
      .set(this.q('.colors__box'), { transformOrigin: '0% 0%' })
      .to(this.q('.colors__box--gray'), { duration: 3, ease: 'power3.out', scaleX: 0.85 })
      .to(this.q('.colors__box--navy'), { duration: 3, ease: 'power3.out', scaleX: 0.57 }, '<1')
      // Tweaking gray and red box sizes to avoid border glitch in Appearance section
      // .set(this.q('.colors__box'), { transformOrigin: '100% 0%' }, '<')
      // .set(this.q('.colors__box--gray, .colors__box--red'), { scaleX: 0.5 }, '<')
      // Skewing color boxes
      .to(this.q('.colors__boxes-container'), { duration: 3, margin: '0 -35rem', skewX: -7 }, 0)

    const a = gsap.getById('colors-animation')

    a.pause(0.001)

    ScrollTrigger.create({
      onEnter: () => {
        gsap.set(a, { overwrite: true, progress: 0.001 })
        gsap
          //
          .timeline()
          .timeScale(0.7)
          .to(a, { duration: 1.56, ease: 'power3.in', progress: 0.5 })
          .to(a, { duration: 3.21, ease: 'power4.out', progress: 1 })
      },
      start: '0% 80%',
      trigger: target,
    })

    ScrollTrigger.create({
      onLeaveBack: () => {
        gsap.set(a, { overwrite: true, progress: 0.001 })
      },
      start: '0% 100%',
      trigger: target,
    })
  },

  handleScrollTriggers(target): void {
    const scrambledTextTimeline = gsap.getById('scrambled-text-timeline')
    const highlightsTimeline = gsap.getById('highlights-timeline')

    ScrollTrigger.create({
      onEnter: () => {
        gsap.to(scrambledTextTimeline, { duration: 4.321, ease: 'power4.out', progress: 1 })
        highlightsTimeline.seek(0).play()
      },
      start: '0% 90%',
      trigger: target,
    })

    ScrollTrigger.create({
      onLeaveBack: () => {
        gsap.set(scrambledTextTimeline, { overwrite: 'auto', progress: 0.01 })
        highlightsTimeline.pause(0)
      },
      start: '0% 100%',
      trigger: target,
    })
  },

  // splitText(target): void {
  //   SplitText.create(target.querySelectorAll('p'), {
  //     aria: 'none',
  //     tag: 'span',
  //     type: 'chars',
  //     charsClass: 'split-char',
  //   })
  // },
}

export default Colors
