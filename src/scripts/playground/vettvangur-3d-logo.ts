import gsap from 'gsap'
import { throttle } from 'throttle-debounce'

const vettvangur3DLogo = {
  init(): void {
    document.querySelectorAll('.logo__layers > div').forEach((el, index) => {
      gsap.set(el, {
        // opacity: 1 - index * 0.1,
        // rotateY: (index - 5) * 3,
        // rotateX: (index - 5) * 1.5,
        z: `${-index * 0.07}vw`,
      })
    })

    // let isRotating = false

    document.querySelector('body').addEventListener('click', (event) => {
      // if (isRotating) return
      // isRotating = true

      gsap.to('.logo__layers', {
        clearProps: 'transform',
        duration: 2,
        ease: 'power4.inOut',
        rotateY: 360 * (event.clientX > window.innerWidth / 2 ? 1 : -1),
        overwrite: true,
        // onComplete: () => {
        //   isRotating = false
        // },
      })
    })

    const onMouseMove = (event) => {
      const x = event.touches ? event.touches[0].clientX : event.clientX
      const y = event.touches ? event.touches[0].clientY : event.clientY

      const xPercent = (x / window.innerWidth - 0.5) * 100
      const yPercent = (y / window.innerHeight - 0.5) * 100

      const modifier = 1.3

      gsap.to('.logo', {
        duration: 1,
        ease: 'power4.out',
        overwrite: true,
        rotateY: `${xPercent * modifier}%`,
        rotateX: `${-yPercent * modifier}%`,
      })
    }

    window.addEventListener('mousemove', throttle(33, onMouseMove))
  },
}

export default vettvangur3DLogo
