import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

const test = {
  init(): void {
    gsap.registerPlugin(ScrollTrigger)

    // gsap.set(".h1-mask", { yPercent: -100 });
    gsap.set('.h1-text', { opacity: 0 })
    gsap.to('.h1-text', { opacity: 1, delay: 0.5, duration: 1 })
    gsap.to('.h1-mask', {
      yPercent: 100,
      delay: 0.6,
      duration: 2,
      ease: 'power3.inOut',
    })

    gsap.to('.noi .rays svg', {
      rotate: 360,
      repeat: -1,
      duration: 55,
      ease: 'none',
    })
  },
}

export default test
