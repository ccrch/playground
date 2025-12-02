import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import brandingPage from './branding-page'
import brandingPageLogo from './branding-page-logo'

const brandingPageSectionSign = {
  q: gsap.utils.selector('.section--sign'),

  init(): void {
    this.animateCircleLogos()
    this.moveText()

    brandingPageLogo.animate3DLogo({
      scrollTriggerTrigger: this.q('.section--sign .section__content-box-2')[0],
      target: this.q('.section--sign .logo--3d')[0],
    })
  },

  animateCircleLogos(): void {
    gsap.matchMedia().add(brandingPage.breakpoints, (context) => {
      const { isDesktop } = context.conditions

      const reset = gsap
        .timeline({ defaults: { overwrite: true }, paused: true })
        .set(this.q('.logo--circle-1 svg'), { rotation: -63, x: '-550rem' })
        .set(this.q('.logo--circle-2 svg'), { rotation: 63, x: '550rem' })
        .set(this.q('.logo--circle-2 circle'), { scale: 1, transformOrigin: '50% 50%' })
        .set(this.q('.logo--circle-2 circle + path'), { scaleX: 1, transformOrigin: '50% 50%' })
        .set(this.q('.logo--circle-2 g'), { scale: 1, transformOrigin: '50% 50%', y: '0rem' })
        .set(this.q('.logo--circle-2 g path'), { fill: '#FFF' })

      reset.play()

      const animation = gsap
        .timeline({ defaults: { ease: 'power3.out' }, paused: true })
        // .timeScale(0.3)
        .to(this.q('.logo--circle-1 svg'), { duration: 1.234, ease: 'power3.in', rotation: 13, x: '11rem' })
        .to(this.q('.logo--circle-2 svg'), { duration: 1.234, ease: 'power3.in', rotation: -6, x: '-11rem' }, '<')
        .to(this.q('.logo--circle-1 svg'), { ease: 'power4.out', rotation: 0, x: '-70rem' })
        .to(this.q('.logo--circle-2 svg'), { ease: 'power4.out', rotation: 0, x: '70rem' }, '<')
        .to(this.q('.logo--circle-2 circle'), { duration: 0.5, scale: 0 }, '<')
        .to(this.q('.logo--circle-2 circle + path'), { duration: 0.5, scaleX: 0 }, '<')
        .to(this.q('.logo--circle-2 g'), { duration: 0.5, scale: 1.7, y: '14rem' }, '<')
        .to(this.q('.logo--circle-2 g path'), { duration: 0.1, fill: '#FF3D00' }, '<0.1')
        .call(
          () => {
            brandingPageLogo.renderFirework({
              amount: 45,
              container: this.q('.section--sign .section__content-box-1')[0],
              x: isDesktop ? '67%' : '10%',
              y: isDesktop ? '47%' : '10%',
            })
          },
          null,
          '<-=0.1'
        )

      // gsap.timeline().to(this.q('.logo--circle'), { scale: 1 }, 2)

      ScrollTrigger.create({
        onEnter: () => {
          animation.play()
        },
        trigger: this.q('.section__content-box-1'),
        start: '0% 80%',
      })

      ScrollTrigger.create({
        onLeaveBack: () => {
          reset.play()
          animation.seek(0).pause()
        },
        trigger: this.q('.section__content-box-1'),
        start: '0% 100%',
      })
    })
  },

  moveText(): void {
    const el = {
      boxes: document.querySelector<HTMLElement>('.section--sign .section__content-details-boxes'),
      text: document.querySelector<HTMLElement>('.section--sign .section__content-details-text'),
    }

    // Moving the details text along with boxes on the right

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
  },
}

export default brandingPageSectionSign
