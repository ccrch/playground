import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const pinText = () => {
  gsap.registerPlugin(ScrollTrigger)
  
  const q = gsap.utils.selector('.scrolltriggers-test')
  
  q('.title').forEach((section) => {
    // gsap.set(section, { opacity: 0 })
  
    // ScrollTrigger.create({
    //   onEnter: () => {
    //     gsap.to(section, { opacity: 1 })
    //   },
    //   onLeaveBack: () => {
    //     gsap.to(section, { opacity: 0 })
    //   },
    //   start: () => '0% 90%',
    //   trigger: section.querySelector('.title__container > div'),
    // })
  
    ScrollTrigger.create({
      anticipatePin: 1,
      end: '+=100%',
      // pin: section.querySelector('div'),
      pin: true,
      pinSpacing: false,
      start: '50% 50%',
      // start: `50% ${window.visualViewport?.height / 2}px`,
      // trigger: section,
      trigger: section.querySelector('.title__container'),
    })
  })
  
  q('.text').forEach((section) => {
    ScrollTrigger.create({
      onEnter: () => {
        gsap.to(section.previousElementSibling, { opacity: 0 })
      },
      onLeaveBack: () => {
        gsap.to(section.previousElementSibling, { opacity: 1 })
      },
      start: '0% 50%',
      trigger: section,
    })
  })
}

export default pinText

