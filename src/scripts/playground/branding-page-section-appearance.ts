import gsap from 'gsap'
import brandingPageLogo from './branding-page-logo'

const brandingPageSectionAppearance = {
  q: gsap.utils.selector('.section--appearance'),

  init(): void {
    brandingPageLogo.animate3DLogo({
      scrollTriggerTrigger: this.q('.section__content-box-3d-logo')[0],
      target: this.q('.logo--3d')[0],
    })
  },
}

export default brandingPageSectionAppearance
