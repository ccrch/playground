import gsap from 'gsap'
import Logo from './branding-page-logo'
import ScrambledText from './branding-page-scrambled-text'

const Section = {
  q: gsap.utils.selector('.section--typography'),

  init(): void {
    this.handleFontWeightsChange()
    this.handleLettersChange()

    Logo.animate3DLogo({
      scrollTriggerTrigger: this.q('.section__content-box-3d-letters')[0],
      target: this.q('.logo--3d')[0],
    })

    ScrambledText.init({ target: this.q('.scrambled-text')[0] })
  },

  handleFontWeightsChange(): void {
    // Changing font weights in 1st & 4th box

    const box1Buttons = this.q('.alphabet__row--1 button')
    const box1Weights = [400, 500, 700]
    const box4Buttons = this.q('.section__content-box-font-weights button')
    const box4Weights = [300, 400, 500, 600, 700]

    box1Buttons.forEach((button, index) => {
      ;['click'].forEach((event) => {
        button.addEventListener(event, () => {
          gsap.to(this.q('.alphabet__row--3 p'), { duration: 0.543, ease: 'power3.out', fontWeight: box1Weights[index] })
        })
      })
    })

    box4Buttons.forEach((button, index) => {
      ;['click'].forEach((event) => {
        button.addEventListener(event, () => {
          gsap.to(this.q('.logo--3d p, .scrambled-text p'), { duration: 0.543, ease: 'power3.out', fontWeight: box4Weights[index] })
        })
      })
    })
  },

  handleLettersChange(): void {
    const letters = ['Aa', 'Áá', 'Bb', 'Dd', 'Ðð', 'Ee', 'Éé', 'Ff', 'Gg', 'Hh', 'Ii', 'Íí', 'Jj', 'Kk', 'Ll', 'Mm', 'Nn', 'Oo', 'Óó', 'Pp', 'Rr', 'Ss', 'Tt', 'Uu', 'Úú', 'Vv', 'Xx', 'Yy', 'Ýý', 'Þþ', 'Ææ', 'Öö']
    let lettersIndex = 0

    gsap
      .timeline({
        defaults: { ease: 'none' },
        onRepeat: () => {
          lettersIndex = lettersIndex >= letters.length - 1 ? 0 : lettersIndex + 1
        },
        repeat: -1,
      })
      .call(
        () => {
          this.q('.section__content-box-3d-letters .logo--3d p').forEach((el) => {
            el.textContent = letters[lettersIndex]
          })
        },
        null,
        '>0.2'
      )
  },
}

export default Section
