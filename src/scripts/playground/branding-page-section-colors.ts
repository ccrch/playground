import gsap from 'gsap'

const Section = {
  q: gsap.utils.selector('.section--colors'),

  init(): void {
    // this.q('.box')[0].addEventListener('mouseover', () => {
    //   gsap.to(this.q('.box__container'), { width: '100rem', height: '100rem' })
    // })
    // this.q('.box')[0].addEventListener('mouseout', () => {
    //   gsap.to(this.q('.box__container'), { width: '100%', height: '100%' })
    // })
  },
}

export default Section
