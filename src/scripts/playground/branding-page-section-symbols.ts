import gsap from 'gsap'
// import ScrollTrigger from 'gsap/ScrollTrigger'
import brandingPage from './branding-page'

const brandingPageSectionSymbols = {
  q: gsap.utils.selector('.section--symbols'),

  init(): void {
    this.animateSymbols()
  },

  animateSymbols(): void {
    gsap.matchMedia().add(brandingPage.breakpoints, (context) => {
      const { isDesktop } = context.conditions

      // Testing symbols

      let count = 1
      const symbolTypes = ['hexagon', 'triangle-down', 'diamond', 'circle', 'pentagon', 'square', 'triangle-up']

      gsap
        .timeline({ delay: 1, repeat: -1 })
        .timeScale(1.5)
        .to(this.q('.symbols .symbol:first-child'), { y: '-100rem', duration: 0.7, ease: 'power4.out' })
        .to(this.q('.symbols .symbol:first-child'), { y: '0rem', duration: 0.7, ease: 'power4.in' })
        .to(this.q('.symbols .symbol:first-child'), { x: '700rem', duration: 1.4, rotation: 360, ease: 'none' }, 0)
        .to(this.q('.symbols'), { x: '-100rem', duration: 2, ease: 'power3.inOut' }, 0)
        .call(
          () => {
            this.q('.symbols .symbol').forEach((symbol, index, symbols) => {
              symbol.classList.remove(...symbolTypes.map((type) => `shape--${type}-fill`))
              symbol.classList.add(`shape--${symbolTypes[(count + index) % symbolTypes.length]}-fill`)
              // symbol.textContent = ((count + index) % symbols.length).toString()
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
