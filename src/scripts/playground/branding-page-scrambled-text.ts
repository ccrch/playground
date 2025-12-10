import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitText from 'gsap/SplitText'
import brandingPage from './branding-page'

const ScrambledText = {
  init({ target }: { target: HTMLElement }): void {
    ;(async () => {
      // Loading fonts

      await document.fonts.ready
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))
      await brandingPage.delay(12)

      this.splitText(target)
      this.scrambleText(target)
      this.handleScrollTriggers(target)
    })()
  },

  handleScrollTriggers(target): void {
    const scrambledTextTimeline = gsap.getById('scrambled-text-timeline')
    const highlightsTimeline = gsap.getById('highlights-timeline')

    ScrollTrigger.create({
      onEnter: () => {
        gsap.to(scrambledTextTimeline, { duration: 4.321, ease: 'power4.out', progress: 1 })
        highlightsTimeline.seek(0).play()
      },
      start: '0% 90%',
      trigger: target,
    })

    ScrollTrigger.create({
      onLeaveBack: () => {
        gsap.set(scrambledTextTimeline, { overwrite: 'auto', progress: 0.01 })
        highlightsTimeline.pause(0)
      },
      start: '0% 100%',
      trigger: target,
    })

    // gsap.to(scrambledTextTimeline, { progress: 1 })
    // gsap.to(highlightsTimeline, { progress: 1 })

    // ScrollTrigger.create({
    //   animation: gsap.fromTo(scrambledTextTimeline, { progress: 1 }, { ease: 'none', overwrite: 'auto', progress: 0.5 }),
    //   end: '100% 0%',
    //   scrub: true,
    //   start: '0% 0%',
    //   trigger: target,
    // })
  },

  scrambleText(target): void {
    const letters = gsap.utils.toArray(target.querySelectorAll('.split-char'))
    const textContent = target.textContent.replace(/\s+/g, '').trim()

    gsap.utils.shuffle(letters)

    const scrambledTextTimeline = gsap.timeline({ id: 'scrambled-text-timeline', defaults: { ease: 'none' }, paused: true })

    letters.forEach((char: HTMLElement) => {
      const letter = char.textContent
      const duration = 1 + gsap.utils.random(0, 10, 0.5)

      const scrambledLetterTween = gsap
        .timeline()
        // .set(char, { opacity: 0.5 })
        .to(char, {
          duration,
          ease: 'power3.out',
          scrambleText: {
            chars: textContent,
            revealDelay: duration,
            speed: 0.05 * (gsap.utils.random(1, 10, 0.5) / 10),
            text: letter,
          },
          onComplete: () => {
            char.textContent = letter
          },
        })
        // This prolongs the animation a bit for better effect
        .to(char, { opacity: 1, duration: 2.1, ease: 'power3.out' })

      scrambledTextTimeline.add(scrambledLetterTween, 0)
    })

    scrambledTextTimeline.pause(0.01)

    // Additional animation for red highlights

    const spans = target.querySelectorAll('span')
    const span = (nr) => target.querySelectorAll(`span:nth-child(${nr})`)
    const spanInRow = (nr1, nr2) => target.querySelectorAll(`p:nth-child(${nr1}) span:nth-child(${nr2})`)

    let highlightIndex = 1

    gsap
      .timeline({
        defaults: { ease: 'none' },
        id: 'highlights-timeline',
        onRepeat: () => {
          highlightIndex = highlightIndex > 9 ? 1 : highlightIndex + 1
        },
        onStart: () => {
          highlightIndex = 1
          spans.forEach((el) => el.removeAttribute('data-highlight'))
          gsap
            .timeline()
            .set(spans, { clearProps: 'color' })
            .to([spanInRow(1, 2), spanInRow(2, 6), spanInRow(3, 4), spanInRow(3, 11), spanInRow(4, 2)], { color: '#ff3d00', stagger: 0.2 }, 0.3)
        },
        paused: true,
        repeat: 9,
      })
      .call(
        () => {
          gsap.set(span(highlightIndex), { attr: { 'data-highlight': '' } })
        },
        null,
        0
      )
      .call(
        () => {
          spans.forEach((el) => el.removeAttribute('data-highlight'))
        },
        null,
        '>0.1'
      )
  },

  splitText(target): void {
    SplitText.create(target.querySelectorAll('p'), {
      aria: 'none',
      tag: 'span',
      type: 'chars',
      charsClass: 'split-char',
    })
  },
}

export default ScrambledText
