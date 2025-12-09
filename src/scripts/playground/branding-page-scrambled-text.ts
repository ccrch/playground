import gsap from 'gsap'
import SplitText from 'gsap/SplitText'
import brandingPage from './branding-page'

const ScrambledText = {
  init({ target }: { target: HTMLElement }): void {
    this.test1(target)
  },

  test1(target): void {
    // Testing scramble text
    ;(async () => {
      // Loading fonts

      await document.fonts.ready
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
      await brandingPage.delay(12)

      gsap.matchMedia().add(brandingPage.breakpoints, () => {
        SplitText.create(target, {
          aria: 'none',
          linesClass: 'split-line',
          mask: 'lines',
          tag: 'span',
          type: 'lines, chars',
          charsClass: 'split-char',
        })

        const chars = gsap.utils.toArray(target.querySelectorAll('.split-char'))

        gsap.utils.shuffle(chars)

        const scrambleTimeline = gsap.timeline({ paused: true })

        chars.forEach((char: HTMLElement, index) => {
          const letter = char.textContent
          // gsap.set(char, { fontWeight: 100, opacity: 1 })

          const tween = gsap.timeline().to(char, {
            duration: 1.5 + index * 0.3,
            ease: 'none',
            scrambleText: {
              // chars: '0123456789$฿€£¥@#?¿!¡www+−×÷=➀%➊←↑↕↓→&©¶Ω',
              chars: '0123456789$฿€£¥@#?¿!¡www+−×÷=➀%←↑↕↓→&©Ω',
              // chars: '@!#$&*)%£¥¢§¶•ªº{}[]<>',
              // chars: '!@#$%^&*(),.:;/|<>?+-=~',
              // chars: '.,;:/|<>&+-=~',
              revealDelay: 1.5 + index * 0.3,
              // speed: index > 10 ? 0.3 : 1.6,
              speed: 0.3,
              text: letter,
            },
            onComplete: () => {
              char.textContent = letter
            },
          })
          // .to(char, { fontWeight: 700, opacity: 1, duration: 0.543 })

          scrambleTimeline.add(tween, 0)
        })

        // gsap.fromTo(scrambleTimeline, { progress: 0 }, {
        //   delay: 1,
        //   duration: 5,
        //   ease: 'power2.out',
        //   progress: 1,
        // })

        scrambleTimeline.timeScale(1).play()
      })
    })()
  },
}

export default ScrambledText
