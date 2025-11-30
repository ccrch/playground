import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import brandingPage from './branding-page'

const brandingPageSectionSign = {
  scrollTriggers(): void {
    // Pinning the details text

    // ScrollTrigger.create({
    //   end: () => `100% ${document.querySelector<HTMLElement>('.section--sign .details__text').offsetHeight + 40}px`,
    //   pin: '.section--sign .details__text',
    //   start: '0% 40rem',
    //   trigger: '.section--sign .details__boxes',
    // })

    // Moving the details text along with boxes on the right

    const el = {
      boxes: document.querySelector<HTMLElement>('.section--sign .details__boxes'),
      text: document.querySelector<HTMLElement>('.section--sign .details__text'),
    }

    gsap.matchMedia().add(brandingPage.breakpoints, (context) => {
      const { isDesktop } = context.conditions

      if (isDesktop) {
        ScrollTrigger.create({
          animation: gsap.fromTo(
            el.text,
            { yPercent: -7 },
            {
              ease: 'none',
              yPercent: () => {
                const px = el.boxes.offsetHeight - el.text.offsetHeight
                const percent = (px / el.text.offsetHeight) * 100
                return percent
              },
            }
          ),
          end: '100% 0%',
          scrub: true,
          start: '0% 100%',
          trigger: el.boxes,
        })
      }
    })

    // Showing/hiding logos

    // gsap.set('.section--sign .box__container', { overwrite: true, scale: 0.8 })
    gsap.set('.section--sign .logo', { overwrite: true, scale: 0 })

    // document.querySelectorAll('.section--sign .box__container').forEach((box) => {
    //   ScrollTrigger.create({
    //     onEnter: () => {
    //       gsap.to(box, {
    //         duration: 1.234,
    //         ease: 'power3.out',
    //         scale: 1,
    //       })
    //     },
    //     start: '0% 90%',
    //     trigger: box.parentElement,
    //   })

    //   ScrollTrigger.create({
    //     onLeaveBack: () => {
    //       gsap.set(box, {
    //         overwrite: true,
    //         scale: 0.8,
    //       })
    //     },
    //     start: '0% 100%',
    //     trigger: box.parentElement,
    //   })
    // })

    document.querySelectorAll('.section--sign .logo').forEach((logo, index) => {
      ScrollTrigger.create({
        onEnter: () => {
          gsap.to(logo, {
            delay: index === 1 ? 0.234 : 0,
            duration: 0.876,
            ease: 'power3.out',
            scale: 1,
          })
        },
        start: '0% 80%',
        trigger: logo.parentElement,
      })

      ScrollTrigger.create({
        onLeaveBack: () => {
          gsap.set(logo, { overwrite: true, scale: 0 })
        },
        start: '0% 100%',
        trigger: logo.parentElement,
      })
    })
  },
}

export default brandingPageSectionSign
