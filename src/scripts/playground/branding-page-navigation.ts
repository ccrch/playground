import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { lenis } from '../core/helpers'

const brandingPageNavigation = {
  linksScroll(): void {
    document.querySelectorAll('.navigation__logo, .navigation__link').forEach((link) => {
      link.addEventListener('click', () => {
        const href = link.getAttribute('href')

        lenis?.scrollTo(href, {
          duration: 1.234,
          easing: (t) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2), // power3.inOut
          // easing: (t) => (t < 0.5 ? 8 * t ** 4 : 1 - (-2 * t + 2) ** 4 / 2), // power4.inOut
          // offset: -window.innerHeight / 2,
          // offset: -window.innerHeight / 2 + titleHeight / 2,
          // immediate: true,
          // onComplete: () => {
          //   lenis?.scrollTo(href, {
          //     duration: 1.234,
          //     easing: (t) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2), // power3.inOut
          //   })
          // },
        })
      })
    })
  },

  linksStatus(): void {
    document.querySelectorAll('.section:not(.section--home)').forEach((section, index) => {
      if (!document.querySelectorAll('.navigation__link-status > div')[index]) return

      // Move the line along with section's scroll progress

      ScrollTrigger.create({
        animation: gsap.to(document.querySelectorAll('.navigation__link-status > div')[index], { scaleX: 1 }),
        end: '100% 50%',
        endTrigger: section,
        // fastScrollEnd: true,
        scrub: true,
        start: '0% 100%',
        trigger: section.querySelector('.section__headline-bottom-marker'),
      })

      // Display only currently active line

      const lineReveal = (direction = 1) => {
        gsap.fromTo(
          document.querySelectorAll('.navigation__link-status')[index],
          {
            clipPath: `inset(0% 0% 0% ${direction === 0 ? 0 : 100}%)`,
          },
          {
            clipPath: `inset(0% 0% 0% ${direction === 0 ? 100 : 0}%)`,
            duration: 0.765,
            ease: 'power3.inOut',
          }
        )

        gsap.set(document.querySelectorAll('.navigation__link-highlight')[index], { opacity: direction === 1 ? 1 : 0 })
      }

      // Show or hide lines on scroll

      ScrollTrigger.create({
        onEnter: () => {
          lineReveal(1)
        },
        onEnterBack: () => {
          lineReveal(1)
        },
        onLeave: () => {
          lineReveal(0)
        },
        onLeaveBack: () => {
          lineReveal(0)
        },
        // fastScrollEnd: true,
        end: '100% 75%',
        start: '0% 75%',
        trigger: section,
      })
    })
  },

  themeChange(): void {
    const el = {
      navigation: document.querySelector<HTMLElement>('.navigation'),
      sections: document.querySelectorAll<HTMLElement>('.section'),
    }

    const navyToWhite = () => {
      el.navigation.classList.add('navigation--navy')
      el.navigation.classList.remove('navigation--white')
    }

    const whiteToNavy = () => {
      el.navigation.classList.add('navigation--white')
      el.navigation.classList.remove('navigation--navy')
    }

    el.sections.forEach((section) => {
      ScrollTrigger.create({
        onEnter: () => {
          section.classList.contains('section--white') ? whiteToNavy() : navyToWhite()
        },
        onLeaveBack: () => {
          section.classList.contains('section--white') ? navyToWhite() : whiteToNavy()
        },
        start: () => `0% ${window.innerHeight - el.navigation.offsetHeight}px`,
        trigger: section,
      })
    })

    // Extra theme changes for some elements in specific sections

    const extraThemeChange = ({ changeTo, trigger }: { changeTo: string; trigger: string }) => {
      ScrollTrigger.create({
        end: () => `100% ${window.innerHeight - el.navigation.offsetHeight}px`,
        onEnter: changeTo === 'white' ? navyToWhite : whiteToNavy,
        onEnterBack: changeTo === 'white' ? navyToWhite : whiteToNavy,
        onLeave: changeTo === 'white' ? whiteToNavy : navyToWhite,
        onLeaveBack: changeTo === 'white' ? whiteToNavy : navyToWhite,
        start: () => `0% ${window.innerHeight - el.navigation.offsetHeight}px`,
        trigger,
      })
    }

    extraThemeChange({ changeTo: 'white', trigger: '.section--sign .section__content-box-2' })
    extraThemeChange({ changeTo: 'navy', trigger: '.section--colors .box' })
    extraThemeChange({ changeTo: 'white', trigger: '.section--tone .box' })
    extraThemeChange({ changeTo: 'navy', trigger: '.section--appearance .grid' })
    extraThemeChange({ changeTo: 'white', trigger: '.footer__bottom' })
  },
}

export default brandingPageNavigation
