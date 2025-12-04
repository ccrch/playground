import gsap from 'gsap'
import ScrambledText from './branding-page-scrambled-text'

const Section = {
  q: gsap.utils.selector('.section--typography'),

  init(): void {
    //
    ScrambledText.init({ target: this.q('.scrambled-text')[0] })
  },
}

export default Section
