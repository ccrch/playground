import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import brandingPage from './branding-page'
import { throttle } from 'throttle-debounce'

const brandingPageSectionSign = {
  q: gsap.utils.selector('.section--sign'),

  init(): void {
    this.animateCircleLogos()
    this.moveText()
    this.animate3DLogo()
  },

  animate3DLogo(): void {
    const onMouseMove = (event) => {
      const x = event.touches ? event.touches[0].clientX : event.clientX
      const y = event.touches ? event.touches[0].clientY : event.clientY

      const xPercent = (x / window.innerWidth - 0.5) * 100
      const yPercent = (y / window.innerHeight - 0.5) * 100

      const modifier = 0.7 // 1.3

      gsap.to('.section--sign .logo--3d', {
        duration: 1,
        ease: 'power4.out',
        overwrite: true,
        rotateY: `${xPercent * modifier}%`,
        rotateX: `${(-yPercent * modifier) / 2}%`,
      })
    }

    window.addEventListener('mousemove', throttle(33, onMouseMove))

    ScrollTrigger.create({
      animation: gsap.fromTo('.section--sign .logo--3d .logo__container', { rotateX: 15, rotateY: 31 }, { ease: 'none', rotateX: -24, rotateY: -34 }),
      end: '100% 0%',
      scrub: true,
      start: '0% 100%',
      trigger: '.section--sign .section__content-box-2',
    })
  },

  animateCircleLogos(): void {
    gsap.matchMedia().add(brandingPage.breakpoints, (context) => {
      const { isDesktop } = context.conditions

      const reset = gsap
        .timeline({ defaults: { overwrite: true }, paused: true })
        .set(this.q('.logo--circle-1 svg'), { rotation: -103, x: '-550rem' })
        .set(this.q('.logo--circle-2 svg'), { rotation: 103, x: '550rem' })

      reset.play()

      const animation = gsap
        .timeline({ defaults: { ease: 'power3.out' }, paused: true })
        // .set(this.q('.logo--circle'), { scale: 0 })
        // .set(this.q('.logo--circle-1'), { x: '120rem' })
        // .set(this.q('.logo--circle-2'), { x: '-120rem' })
        .to(this.q('.logo--circle'), { scale: 1, stagger: 0.1 })
        .to(this.q('.logo--circle-1 svg'), { ease: 'power3.in', rotation: 13, x: '0rem' })
        .to(this.q('.logo--circle-2 svg'), { ease: 'power3.in', rotation: -13, x: '0rem' }, '<')
        .to(this.q('.logo--circle-1 svg'), { ease: 'power4.out', rotation: 0, x: '-70rem' })
        .to(this.q('.logo--circle-2 svg'), { ease: 'power4.out', rotation: 0, x: '70rem' }, '<')
        .to(this.q('.logo--circle-2 circle'), { scale: 0, transformOrigin: '50% 50%' }, '<')
        .to(this.q('.logo--circle-2 circle + path'), { scaleX: 0, transformOrigin: '50% 50%' }, '<')
        .to(this.q('.logo--circle-2 g'), { scale: 1.7, transformOrigin: '50% 50%', y: '14rem' }, '<')
        .to(this.q('.logo--circle-2 g path'), { fill: '#FF3D00' }, '<0.1')
        .call(
          () => {
            renderFirework()
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

      // const color = ['#f7ae1a', '#f37021', '#db2f32', '#809d3c', '#6ebbdf', '#003278']
      const fireworksAmount = 45

      const renderFireworkBubble = (target: HTMLElement) => {
        const bubble = document.createElement('div')
        const container = document.createElement('div')

        bubble.classList.add('firework-bubble')
        container.classList.add('firework-bubble-container')
        target.appendChild(container)
        container.appendChild(bubble)

        gsap.set(container, {
          rotation: gsap.utils.random(0, 360),
        })

        const tween = gsap.fromTo(
          bubble,
          {
            // background: gsap.utils.random(color),
            scale: gsap.utils.random(5, 30) * 0.1,
            x: gsap.utils.random(3, 21) + 'rem',
            y: 0,
          },
          {
            scale: 0,
            x: gsap.utils.random(77, 211) + 'rem',
            y: gsap.utils.random(-21, 21) + 'rem',
            duration: gsap.utils.random(0.93, 1.37),
            ease: 'power4.out',
            onComplete: () => {
              bubble.remove()
              container.remove()
              tween.kill()
              if (target.children.length === 0) {
                target.remove()
              }
            },
          }
        )
      }

      const renderFirework = () => {
        const x = '740rem' //event.touches ? event.touches[0].clientX : event.clientX
        const y = '50%' //event.touches ? event.touches[0].clientY : event.clientY

        // if (x < 1) {
        //   return
        // }

        const firework = document.createElement('div')
        firework.classList.add('firework')
        document.querySelector('.section--sign .section__content-box-1').appendChild(firework)
        gsap.set(firework, { top: y, left: x })

        for (let i = 0; i < fireworksAmount; i++) {
          renderFireworkBubble(firework)
        }
      }
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

    // Showing/hiding logos

    // document.querySelectorAll('.section--sign .logo').forEach((logo, index) => {
    //   ScrollTrigger.create({
    //     onEnter: () => {
    //       gsap.to(logo, {
    //         delay: index === 1 ? 0.234 : 0,
    //         duration: 0.876,
    //         ease: 'power3.out',
    //         scale: 1,
    //       })
    //     },
    //     start: '0% 80%',
    //     trigger: logo.parentElement,
    //   })

    //   ScrollTrigger.create({
    //     onLeaveBack: () => {
    //       gsap.set(logo, { overwrite: true, scale: 0 })
    //     },
    //     start: '0% 100%',
    //     trigger: logo.parentElement,
    //   })
    // })
  },
}

export default brandingPageSectionSign
