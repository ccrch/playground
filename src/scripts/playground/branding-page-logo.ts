import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { throttle } from 'throttle-debounce'

const Logo = {
  animate3DLogo({ scrollTriggerTrigger, target }: { scrollTriggerTrigger: HTMLElement; target: HTMLElement }): void {
    const onMouseMove = (event) => {
      const x = event.touches ? event.touches[0].clientX : event.clientX
      const y = event.touches ? event.touches[0].clientY : event.clientY

      const xPercent = (x / window.innerWidth - 0.5) * 100
      const yPercent = (y / window.innerHeight - 0.5) * 100

      const modifier = 0.7 // 1.3

      gsap.to(target, {
        duration: 1,
        ease: 'power4.out',
        overwrite: true,
        rotateY: `${xPercent * modifier}%`,
        rotateX: `${(-yPercent * modifier) / 2}%`,
      })
    }

    window.addEventListener('mousemove', throttle(33, onMouseMove))

    ScrollTrigger.create({
      animation: gsap.fromTo(target.firstElementChild, { rotateX: 15, rotateY: 31 }, { ease: 'none', rotateX: -24, rotateY: -34 }),
      end: '100% 0%',
      scrub: true,
      start: '0% 100%',
      trigger: scrollTriggerTrigger,
    })

    // TODO: Add GSAP Draggable
  },

  renderFireworkBubble(target: HTMLElement): void {
    const bubble = document.createElement('div')
    const container = document.createElement('div')

    bubble.classList.add('logo-firework__bubble')
    container.classList.add('logo-firework__bubble-container')
    target.appendChild(container)
    container.appendChild(bubble)

    gsap.set(container, {
      rotation: gsap.utils.random(0, 360),
    })

    const tween = gsap.fromTo(
      bubble,
      {
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
  },

  renderFirework({ amount, container, x, y }: { amount: number; container: HTMLElement; x: string; y: string }): void {
    const firework = document.createElement('div')

    firework.classList.add('logo-firework')
    container.appendChild(firework)
    gsap.set(firework, { top: y, left: x })

    for (let i = 0; i < amount; i++) {
      this.renderFireworkBubble(firework)
    }
  },
}

export default Logo
