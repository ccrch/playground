import gsap from 'gsap'
// import ScrollTrigger from 'gsap/ScrollTrigger'
import brandingPage from './branding-page'

const Section = {
  q: gsap.utils.selector('.section--symbols'),

  init(): void {
    this.animateSmallShapes()
  },

  animateSmallShapes(): void {
    gsap.matchMedia().add(brandingPage.breakpoints, (context) => {
      const { isDesktop } = context.conditions

      const firstShape = this.q('.shape--small:first-child')
      const shapeTypes = ['hexagon', 'triangle-down', 'diamond', 'circle', 'pentagon', 'square', 'triangle-up', 'octagon']
      const shapeWidth = 40
      const shapeGap = 50

      let count = 1

      const skewTheCircle = () => {
        if ((count - 4) % shapeTypes.length === 0) {
          gsap
            .timeline({ defaults: { duration: 0.6 } })
            .timeScale(1.5)
            .to(firstShape, { ease: 'power3.out', skewY: 12 })
            .to(firstShape, { ease: 'power2.in', skewY: 0 }, '>')
        }
      }

      gsap
        .timeline({ delay: 1, repeat: -1 })
        .timeScale(1.5)
        .to(firstShape, { y: '-100rem', duration: 0.7, ease: 'power4.out' })
        .to(firstShape, { y: '0rem', duration: 0.7, ease: 'power4.in' })
        .to(firstShape, { x: `${(shapeWidth + shapeGap) * shapeTypes.length}rem`, duration: 1.4, rotation: 360, ease: 'none' }, 0)
        .to(firstShape, { duration: 0.7, ease: 'power3.out', onStart: skewTheCircle, scale: 1.1 }, 0) // scale: 1.4
        .to(firstShape, { duration: 0.7, ease: 'power2.in', scale: 1 }, '>')
        .to(this.q('.section__content-small-shapes'), { x: `${-shapeWidth - shapeGap}rem`, duration: 2.1, ease: 'power3.inOut' }, 0)
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

export default Section
