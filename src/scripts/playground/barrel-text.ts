import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { lenisScroll } from '../core/helpers'

const barrelText = {
  init(): void {
    lenisScroll.init()
    gsap.registerPlugin(ScrollTrigger)

    ScrollTrigger.config({
      ignoreMobileResize: true,
    })

    document.querySelectorAll('.barrel--1 > div').forEach((el: HTMLElement) => {
      // Opacity

      gsap.set(el.firstElementChild.firstElementChild.firstElementChild, {
        opacity: 0.01,
        overwrite: true,
      })

      ScrollTrigger.create({
        animation: gsap.fromTo(
          el.firstElementChild.firstElementChild.firstElementChild,
          { opacity: 0.01 },
          {
            opacity: 1,
            ease: 'none',
          }
        ),
        scrub: true,
        start: '0% 95%',
        end: '0% 85%',
        trigger: el,
        // invalidateOnRefresh: true,
      })

      ScrollTrigger.create({
        animation: gsap.fromTo(
          el.firstElementChild.firstElementChild.firstElementChild,
          { opacity: 1 },
          {
            opacity: 0.01,
            ease: 'none',
          }
        ),
        scrub: true,
        start: '0% 5%',
        end: '0% -5%',
        trigger: el,
        // invalidateOnRefresh: true,
      })

      // Rotation

      ScrollTrigger.create({
        animation: gsap.fromTo(
          el.firstElementChild,
          { rotateX: -100 },
          {
            rotateX: 0,
            ease: 'none',
          }
        ),
        scrub: true,
        start: '0% 100%',
        end: '0% 75%',
        trigger: el,
        invalidateOnRefresh: true,
      })

      ScrollTrigger.create({
        animation: gsap.fromTo(
          el.firstElementChild,
          { rotateX: 0 },
          {
            rotateX: 100,
            ease: 'none',
          }
        ),
        scrub: true,
        start: '0% 15%',
        end: '0% -10%',
        trigger: el,
        invalidateOnRefresh: true,
      })

      // Offset

      // const barrelOffset = 1.56;

      ScrollTrigger.create({
        animation: gsap.fromTo(
          el.firstElementChild.firstElementChild,
          { y: 123, z: -123 },
          // {
          //   y: () => el.offsetHeight * barrelOffset,
          //   z: () => -el.offsetHeight * barrelOffset,
          // },
          {
            y: 0,
            z: 0,
            ease: 'none',
          }
        ),
        scrub: true,
        start: '0% 100%',
        end: '0% 75%',
        trigger: el,
        invalidateOnRefresh: true,
      })

      ScrollTrigger.create({
        animation: gsap.fromTo(
          el.firstElementChild.firstElementChild,
          {
            y: 0,
            z: 0,
          },
          // {
          //   y: () => el.offsetHeight * barrelOffset,
          //   z: () => -el.offsetHeight * barrelOffset,
          //   ease: "power1.inOut",
          // },
          { y: -123, z: -123, ease: 'none' }
        ),
        scrub: true,
        start: '0% 15%',
        end: '0% -10%',
        trigger: el,
        invalidateOnRefresh: true,
      })
    })

    document.querySelectorAll('.barrel--2 > div').forEach((el: HTMLElement) => {
      gsap.set(el, { opacity: 0.01, overwrite: true })

      ScrollTrigger.create({
        animation: gsap.fromTo(
          el,
          { opacity: 0.01 },
          {
            opacity: 1,
            ease: 'none',
          }
        ),
        scrub: true,
        start: '0% 100%',
        end: '0% 90%',
        trigger: el,
        // invalidateOnRefresh: true,
      })

      ScrollTrigger.create({
        animation: gsap.fromTo(
          el,
          { opacity: 1 },
          {
            opacity: 0.01,
            ease: 'none',
          }
        ),
        scrub: true,
        start: '0% 13%',
        end: '0% -3%',
        trigger: el,
        // invalidateOnRefresh: true,
      })

      // Rotate the text

      ScrollTrigger.create({
        animation: gsap.fromTo(
          el.firstElementChild,
          { rotateX: -100 },
          {
            rotateX: 0,
            ease: 'none',
          }
        ),
        scrub: true,
        // start: "0% 100%",
        start: () => `0% ${window.innerHeight + el.offsetHeight}`,
        end: '50% 70%',
        // end: () => `50% ${window.innerHeight * 0.7 + el.offsetHeight}`,
        trigger: el,
        invalidateOnRefresh: true,
      })

      ScrollTrigger.create({
        animation: gsap.fromTo(
          el.firstElementChild,
          { rotateX: 0 },
          {
            rotateX: 80,
            ease: 'none',
          }
        ),
        scrub: true,
        start: '50% 30%',
        end: '0% 0%',
        trigger: el,
        invalidateOnRefresh: true,
      })

      // Offset anims for barrel effect - different start y & z based on element height

      const barrelOffset = 2.34 // This needs to be higher for smaller text size

      ScrollTrigger.create({
        animation: gsap.fromTo(
          el.firstElementChild.firstElementChild,
          // { y: 234, z: -234 },
          {
            y: () => el.offsetHeight * barrelOffset,
            z: () => -el.offsetHeight * barrelOffset,
          },
          {
            y: 0,
            z: 0,
            ease: 'none',
          }
        ),
        scrub: true,
        // start: "0% 120%",
        start: () => `0% ${window.innerHeight + el.offsetHeight * barrelOffset}`,
        end: '50% 70%',
        trigger: el,
        invalidateOnRefresh: true,
      })

      ScrollTrigger.create({
        animation: gsap.fromTo(
          el.firstElementChild.firstElementChild,
          {
            y: 0,
            z: 0,
          },
          {
            y: () => -el.offsetHeight,
            z: () => -el.offsetHeight,
            ease: 'none',
          }
        ),
        scrub: true,
        start: '50% 20%',
        end: '0% -10%',
        trigger: el,
        invalidateOnRefresh: true,
      })
    })

    gsap.set('.barrel--3 h1', {
      rotateX: (i) => -22 * i,
      y: (i) => -8 * i * i,
    })

    // gsap.set(".barrel--3 h1", {
    //   rotateX: (i) => 22 * (headings.length - 1 - i),
    //   y: (i) => 8 * (headings.length - 1 - i) * (headings.length - 1 - i),
    // });

    // ScrollTrigger.create({
    //   onUpdate: (self) => {
    //     gsap.set(".barrel--3 h1", {
    //       rotateX: (i) => -22 * i,
    //       y: (i) => -8 * i * i,
    //     });
    //     console.log(self.progress);
    //   },
    //   scrub: true,
    //   start: "0% 100%",
    //   end: "0% 50%",
    //   trigger: ".barrel--3 > div:first-child",
    //   invalidateOnRefresh: true,
    // });

    document.querySelectorAll('.barrel--3 > div').forEach((el: HTMLElement, i) => {
      ScrollTrigger.create({
        animation: gsap.fromTo(
          el.firstElementChild,
          {
            rotateX: -80, //() => -21 * (i + 1),
            y: () => -5 * (i + 1) * (i + 1),
            z: -100,
          },
          {
            rotateX: 0,
            y: 0,
            z: 0,
            ease: 'none',
          }
        ),
        scrub: true,
        start: '0% 100%',
        end: '0% 75%',
        trigger: el,
        invalidateOnRefresh: true,
      })
    })
  },
}

export default barrelText
