import gsap from 'gsap'
import Logo from './branding-page-logo'
import ScrambledText from './branding-page-scrambled-text'

const Section = {
  q: gsap.utils.selector('.section--typography'),

  init(): void {
    //

    Logo.animate3DLogo({
      scrollTriggerTrigger: this.q('.section__content-box-3d-letters')[0],
      target: this.q('.logo--3d')[0],
    })

    ScrambledText.init({ target: this.q('.scrambled-text')[0] })

    //
    //
    // TODO
    // Letter test

    const letters = document.querySelectorAll('.letters-test span')
    let lettersIndex = 0
    const lettersCount = letters.length

    // gsap.set(letters, { display: 'none' })
    // gsap.to(letters[0], { display: 'block' })

    const showLetter = (index: number) => {
      gsap
        .timeline()
        .set(letters, { visibility: 'hidden' })
        .set(letters[index], { visibility: 'visible' })
        .set(
          letters[lettersIndex],
          {
            visibility: 'hidden',
            onComplete: () => {
              lettersIndex = (lettersIndex + 1) % lettersCount
              showLetter(lettersIndex)
            },
          },
          1
        )
    }

    showLetter(lettersIndex)

    // const lettersTimeline = gsap
    //   .timeline()
    //   .set(letters, { display: 'none' })
    //   .to(letters[lettersIndex], { display: 'block' })
    //   .to(letters[lettersIndex], { display: 'none' }, 1)
    //   .call(() => {
    //     lettersIndex = (lettersIndex + 1) % lettersCount
    //     console.log(lettersIndex)
    //     lettersTimeline.play()
    // })

    letters.forEach((el, index) => {
      // gsap.set(el, { display: 'none' })
      // gsap.set(letters[index], { display: 'block' })
      // gsap
      // .timeline()
      // .set(letters, { display: 'none' })
      // .set(letters[index], { delay: 1 + 1 * index, display: 'block' }, 0.1)
      // .set(letters, { display: 'none' }, 1)
      // gsap.to(el, {
      // delay: index,
      // duration: 1,
      // onComplete: () => {
      //   gsap.set(el, { display: 'none' })
      //   if (index === letters.length - 1) {
      //   gsap.set(letters[0], { display: 'block' }) // Loop back to the first letter
      //   }
      // },
      // })
    })
  },
}

export default Section
