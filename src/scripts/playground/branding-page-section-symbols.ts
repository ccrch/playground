import gsap from 'gsap'
// import ScrollTrigger from 'gsap/ScrollTrigger'
import brandingPage from './branding-page'

const brandingPageSectionSymbols = {
  q: gsap.utils.selector('.section--symbols'),

  init(): void {
    this.animateSmallShapes()
  },

  animateSmallShapes(): void {
    gsap.matchMedia().add(brandingPage.breakpoints, (context) => {
      const { isDesktop } = context.conditions

      // Testing symbols

      let count = 1
      const shapeTypes = ['hexagon', 'triangle-down', 'diamond', 'circle', 'pentagon', 'square', 'triangle-up']

      gsap
        .timeline({ delay: 1, repeat: -1 })
        .timeScale(1.5)
        .to(this.q('.shape--small:first-child'), { y: '-100rem', duration: 0.7, ease: 'power4.out' })
        .to(this.q('.shape--small:first-child'), { y: '0rem', duration: 0.7, ease: 'power4.in' })
        .to(this.q('.shape--small:first-child'), { x: '700rem', duration: 1.4, rotation: 360, ease: 'none' }, 0)
        // TODO: Check later - different type of rotation
        // .to(this.q('.shape--small:first-child'), { x: '700rem', duration: 1.4, ease: 'none' }, 0)
        // .to(this.q('.shape--small:first-child'), { rotation: 33, duration: 0.4, ease: 'power3.out' }, 0)
        // .to(this.q('.shape--small:first-child'), { rotation: 0, duration: 1, ease: 'power3.in' }, '>')
        .to(this.q('.shape--small:first-child'), { duration: 0.7, ease: 'power3.out', scale: 1.21 }, 0)
        .to(this.q('.shape--small:first-child'), { duration: 0.7, ease: 'power3.in', scale: 1 }, '>')
        .to(this.q('.section__content-small-shapes'), { x: '-100rem', duration: 2, ease: 'power3.inOut' }, 0)
        .call(
          () => {
            this.q('.section__content-small-shapes .shape').forEach((shape, index) => {
              shape.classList.remove(...shapeTypes.map((type) => `shape--${type}-fill`))
              shape.classList.add(`shape--${shapeTypes[(count + index) % shapeTypes.length]}-fill`)
              // shape.textContent = ((count + index) % shapeTypes.length).toString()
            })
            count++
          },
          null,
          '>'
        )
    })
  },
}

export default brandingPageSectionSymbols
