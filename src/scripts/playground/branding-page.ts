import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitText from 'gsap/SplitText'
import ScrambleTextPlugin from 'gsap/ScrambleTextPlugin'
import { lenisScroll } from '../core/helpers'

import Navigation from './branding-page-navigation'
import SectionAppearance from './branding-page-section-appearance'
import SectionColors from './branding-page-section-colors'
import SectionFont from './branding-page-section-font'
import SectionHome from './branding-page-section-home'
import SectionSign from './branding-page-section-sign'
import SectionSymbols from './branding-page-section-symbols'
import SectionTone from './branding-page-section-tone'
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
      SectionFont.init()
      SectionColors.init()
      SectionSymbols.init()
      SectionTone.init()
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

    // TODO: Test later
    // ScrollTrigger.normalizeScroll(true)

    // Testing velocity // TODO: Check later

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
