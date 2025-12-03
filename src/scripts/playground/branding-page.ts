import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitText from 'gsap/SplitText'
import ScrambleTextPlugin from 'gsap/ScrambleTextPlugin'
import { lenisScroll } from '../core/helpers'
import Navigation from './branding-page-navigation'
import SectionAppearance from './branding-page-section-appearance'
import SectionHome from './branding-page-section-home'
import SectionSign from './branding-page-section-sign'
import SectionSymbols from './branding-page-section-symbols'
import Typography from './branding-page-typography'

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

      await SectionHome.reset()
      await SectionHome.splitText()
      await Typography.contentTextSplitText()
      await Typography.headlineSplitText()

      // Revealing the page

      await SectionHome.reveal()

      // Handling scroll triggers

      SectionHome.scrollTriggers()
      SectionSign.init()
      // SectionColors.init()
      // SectionTypography.init()
      SectionSymbols.init()
      // SectionTone.init()
      SectionAppearance.init()
      Typography.contentTextScrollTriggers()
      Typography.headlineScrollTriggers()

      // Handling navigation

      Navigation.linksScroll()
      Navigation.linksStatus()
      Navigation.themeChange()

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

    // Testing velocity

    // Testing scroll velocity & lag

    // ScrollTrigger.create({
    //   end: '100% 100%',
    //   start: '0% 0%',
    //   onUpdate: (self) => {
    //     brandingPage.scrollVelocity = self.getVelocity() * self.direction
    //     console.log('scroll velocity' + brandingPage.scrollVelocity)
    //     gsap.to('.section--symbols .symbol', {
    //       duration: 1,
    //       ease: 'power4.out',
    //       // overwrite: true,
    //       y: (index) => `${Math.round(brandingPage.scrollVelocity * self.direction * -1 * (0.02 + index * 0.01))}rem`,
    //     })
    //   },
    //   trigger: '.branding-page',
    // })

    // this.smootherLag('.section--symbols .symbol:nth-child(6)', 0.15)
    // this.addLag(document.querySelector('.section--symbols .symbol:nth-child(5)'), 0.12)
    // this.addLagEffect(document.querySelector('.section--symbols .symbol:nth-child(4)'))
  },

  // Testing stuff
  //
  //
  //
  //
  //

  lerp(start, end, amount): number {
    return start + (end - start) * amount
  },

  addLag(el, lagAmount = 0.1): void {
    let y = 0
    let yTarget = 0

    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const scroll = self.scroll()

        // target position (based on scroll)
        yTarget = -scroll * lagAmount * 10 // tweak multiplier for stronger lag
      },
    })

    gsap.ticker.add(() => {
      // smooth interpolation, same as ScrollSmoother's lag
      y = this.lerp(y, yTarget, 0.12) // adjust (0.08–0.18) to control smoothness
      el.style.transform = `translate3d(0, ${y}px, 0)`
    })
  },

  smootherLag(selector, lag = 0.15): void {
    const el = typeof selector === 'string' ? document.querySelector(selector) : selector

    let y = 0
    let target = 0

    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate(self) {
        target = -self.scroll() * lag
      },
    })

    gsap.ticker.add(() => {
      y = this.lerp(y, target, 1 - Math.pow(1 - 0.2, gsap.ticker.deltaRatio()))
      el.style.transform = `translate3d(0, ${y}rem, 0)`
    })
  },

  addLagEffect(element, opts = {}): void {
    const {
      strength = 0.15, // how strong the lag/parallax is
      smooth = 0.12, // how smooth the interpolation is (0.05–0.2)
      maxOffset = 200, // clamp so it never moves more than this
      scroller = window, // or your custom scroller element
    } = opts as any

    let y = 0
    let yTarget = 0

    const clamp = gsap.utils.clamp(-maxOffset, maxOffset)

    const update = () => {
      y = this.lerp(y, yTarget, smooth)
      gsap.set(element, { y })
    }

    gsap.ticker.add(update)

    ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scroller,
      onUpdate(self) {
        const scroll = self.scroll()
        // smaller factor so you don't get -1800
        yTarget = clamp(-scroll * strength)
      },
      onKill() {
        gsap.ticker.remove(update)
      },
    })
  },
}

export default brandingPage
