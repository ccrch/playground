import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const pinText = () => {
  gsap.registerPlugin(ScrollTrigger)
  
  const q = gsap.utils.selector('.scrolltriggers-test')
  
  q('.title__container').forEach((section) => {
    gsap.set(section, { opacity: 0 })
  
    ScrollTrigger.create({
      onEnter: () => {
        gsap.to(section, { opacity: 1 })
      },
      onLeaveBack: () => {
        gsap.to(section, { opacity: 0 })
      },
      start: () => '0% 90%',
      trigger: section.querySelector('div'),
    })
  
    ScrollTrigger.create({
      end: () => '+=100%',
      // pin: section.querySelector('div'),
      pin: true,
      pinSpacing: false,
      start: () => '0% 0%',
      // trigger: section,
      trigger: section,
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

