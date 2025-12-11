import gsap from 'gsap'
import Logo from './branding-page-logo'
import ScrambledText from './branding-page-scrambled-text'

const Section = {
  q: gsap.utils.selector('.section--appearance'),

  init(): void {
    Logo.animate3DLogo({
      scrollTriggerTrigger: this.q('.section__content-box-3d-logo')[0],
      target: this.q('.logo--3d')[0],
    })

    // ScrambledText.init({ target: this.q('.scrambled-text')[0] })
  },
}

export default Section
