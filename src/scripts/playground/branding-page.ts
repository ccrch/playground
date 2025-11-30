import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitText from 'gsap/SplitText'
import ScrambleTextPlugin from 'gsap/ScrambleTextPlugin'
import { lenisScroll } from '../core/helpers'
import brandingPageNavigation from './branding-page-navigation'
import brandingPageSectionHome from './branding-page-section-home'
import brandingPageSectionSign from './branding-page-section-sign'
import brandingPageTypography from './branding-page-typography'

const brandingPage = {
  breakpoints: {
    isDesktop: '(min-width: 768px)',
    isMobile: '(max-width: 767px)',
  },

  delay(ms): Promise<void> {
    return new Promise((r) => setTimeout(r, ms))
  },

  scrollVelocity: 0,

  init(): void {
    gsap.registerPlugin(ScrambleTextPlugin, ScrollTrigger, SplitText)

    // Loading the page
    ;(async () => {
      // Loading fonts

      await document.fonts.ready
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
      await this.delay(12)

      // Smooth scrolling init

      lenisScroll.init()

      //  Loading & reseting page stuff

      await brandingPageTypography.contentTextSplitText()
      await brandingPageTypography.headlineSplitText()
      await brandingPageSectionHome.reset()
      await brandingPageSectionHome.splitText()

      // Revealing the page

      await brandingPageSectionHome.reveal()

      // Handling scroll triggers

      brandingPageTypography.contentTextScrollTriggers()
      brandingPageTypography.headlineScrollTriggers()
      brandingPageSectionHome.scrollTriggers()
      brandingPageSectionSign.scrollTriggers()

      // Handling navigation

      brandingPageNavigation.linksScroll()
      brandingPageNavigation.linksStatus()
      brandingPageNavigation.themeChange()

      // ScrollTrigger refresh

      await this.delay(12)
      ScrollTrigger.refresh()
    })()

    // window.addEventListener('resize', () => {
    //   console.log(ScrollTrigger.getAll().length)
    // })

    // TODO: Test later
    // ScrollTrigger.normalizeScroll(true)

    // TODO: Testing parallax shapes

    // gsap.set('.section__shapes', { display: 'none' })

    // document.querySelectorAll('.section:not(.section--home)').forEach((section) => {
    //   section.querySelectorAll('.section__shapes > div').forEach((shape, index) => {
    //     gsap.set(shape, { width: gsap.utils.random(180, 440, 44) + 'rem', aspectRatio: 1 })

    //     if ((index - 1) % 2 === 0) {
    //       gsap.set(shape, { left: gsap.utils.random(-10, -1, 1) + '%' })
    //     } else {
    //       gsap.set(shape, { right: gsap.utils.random(-10, -1, 1) + '%' })
    //     }
    //   })

    //   ScrollTrigger.create({
    //     animation: gsap.to(section.querySelector('.section__shapes'), { y: '50%'}),
    //     end: '100% 0%',
    //     scrub: true,
    //     start: '0% 100%',
    //     trigger: section,
    //   })
    // })

    // Testing scramble text
    ;(async () => {
      // Loading fonts

      await document.fonts.ready
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
      await this.delay(12)

      gsap.matchMedia().add(brandingPage.breakpoints, () => {
        SplitText.create('.scramble-test', {
          aria: 'none',
          linesClass: 'split-line',
          mask: 'lines',
          type: 'lines, chars',
          charsClass: 'split-char',
        })

        const chars = gsap.utils.toArray(document.querySelectorAll('.scramble-test .split-char'))

        gsap.utils.shuffle(chars)

        const scrambleTimeline = gsap.timeline({ paused: true })

        chars.forEach((char: HTMLElement, index) => {
          const letter = char.textContent
          gsap.set(char, { fontWeight: 100, opacity: 1 })

          const tween = gsap
            .timeline()
            .to(char, {
              duration: 2 + index * 0.3,
              ease: 'none',
              scrambleText: {
                // chars: '0123456789$฿€£¥@#?¿!¡www+−×÷=➀%➊←↑↕↓→&©¶Ω',
                chars: '0123456789$฿€£¥@#?¿!¡www+−×÷=➀%←↑↕↓→&©Ω',
                // chars: '@!#$&*)%£¥¢§¶•ªº{}[]<>',
                // chars: '!@#$%^&*(),.:;/|<>?+-=~',
                // chars: '.,;:/|<>&+-=~',
                revealDelay: 2 + index * 0.3,
                // speed: index > 10 ? 0.3 : 1.6,
                speed: 0.3,
                text: letter,
              },
              onComplete: () => {
                char.textContent = letter
              },
            })
            .to(char, { fontWeight: 700, opacity: 1, duration: 0.543 })

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

export default brandingPage
