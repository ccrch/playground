import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitText from 'gsap/SplitText'
import brandingPage from '../playground/branding-page'

const Typography = {
  q: gsap.utils.selector('.branding-page'),

  contentTextScrollTriggers(): void {
    // Handle scroll trigger for all content split text

    gsap.matchMedia().add(brandingPage.breakpoints, () => {
      this.q('.split-content-text .split-line').forEach((line) => {
        ScrollTrigger.create({
          onEnter: () => {
            gsap.to(line.querySelectorAll('.split-word'), { duration: 1.234, ease: 'power4.out', opacity: 1, stagger: 0.0543, y: '0%' })
          },
          start: '0% 90%',
          trigger: line.parentElement,
        })
        ScrollTrigger.create({
          onLeaveBack: () => {
            gsap.to(line.querySelectorAll('.split-word'), { duration: 0.543, overwrite: true, stagger: 0.0543, y: '100%' })
          },
          start: '0% 100%',
          trigger: line.parentElement,
        })
      })
    })
  },

  contentTextSplitText(): void {
    // Split content text & reset it

    gsap.matchMedia().add(brandingPage.breakpoints, () => {
      SplitText.create('.split-content-text', {
        aria: 'none',
        linesClass: 'split-line',
        mask: 'lines',
        tag: 'span',
        type: 'lines, words',
        wordsClass: 'split-word',
      })

      gsap.set('.split-content-text .split-word', { overwrite: true, y: '100%' })
    })
  },

  headlineScrollTriggers(): void {
    gsap.matchMedia().add(brandingPage.breakpoints, () => {
      this.q('.section:not(.section--home)').forEach((section) => {
        const el = {
          content: section.querySelector('.section__content'),
          headline: section.querySelector('.section__headline'),
          headlineChars: section.querySelectorAll('.section__headline h1 .split-char'),
          headlineEyebrow: section.querySelectorAll('.section__headline p .split-line'),
          headlineLines: section.querySelectorAll('.section__headline h1 .split-line'),
        }

        const isHeadlineSmall = el.headline.classList.contains('section__headline--small')

        // Reset headlines - on scroll down & scroll back up

        ScrollTrigger.create({
          onEnter: () => {
            gsap.set([el.headlineEyebrow, el.headlineChars], { overwrite: true, y: '100%' })
            gsap.set(el.headlineLines, { overwrite: true, y: '0%' })
          },
          start: '0% 100%',
          trigger: section,
        })

        ScrollTrigger.create({
          onEnter: () => {
            gsap.set([el.headlineEyebrow, el.headlineChars], { overwrite: true, y: '100%' })
            gsap.set(el.headlineLines, { overwrite: true, y: '0%' })
          },
          start: '100% 0%',
          trigger: section,
        })

        // Show headline on scroll down

        ScrollTrigger.create({
          onEnter: () => {
            gsap.set(el.headlineLines, { overwrite: true, y: '0%' })
            gsap.to([el.headlineEyebrow, el.headlineChars], { duration: 1.234, ease: 'power3.out', opacity: 1, stagger: !isHeadlineSmall ? 0.021 : 0.012, y: '0%' })
          },
          fastScrollEnd: true, // TODO: Check later
          start: '0% 50%',
          trigger: section,
        })

        // Hide headline on scroll down when content comes in & show it again on scroll back up

        ScrollTrigger.create({
          fastScrollEnd: true,
          onEnter: () => {
            gsap.to([el.headlineEyebrow, el.headlineLines], { duration: 0.876, ease: 'power3.inOut', overwrite: true, stagger: 0.0543, y: '-100%' })
          },
          onLeaveBack: () => {
            gsap.set(el.headlineChars, { overwrite: true, y: '100%' })
            gsap.set(el.headlineLines, { overwrite: true, y: '0%' })
            gsap.fromTo([el.headlineEyebrow, el.headlineChars], { y: '100%' }, { duration: 1.234, ease: 'power3.out', stagger: !isHeadlineSmall ? 0.021 : 0.012, y: '0%' })
          },
          start: '0% 100%',
          trigger: el.content,
        })

        // Move headline a bit while it reveals

        ScrollTrigger.create({
          animation: gsap.fromTo(el.headline, { y: '66rem' }, { ease: 'none', y: '-66rem' }),
          end: '+=210%',
          scrub: true,
          start: '0% 100%',
          trigger: section,
        })
      })
    })
  },

  headlineSplitText(): void {
    // Split the text & reset it
    // Setting text-align to left to avoid issues with SplitText not splitting text correctly when aligned to center

    gsap.matchMedia().add(brandingPage.breakpoints, () => {
      SplitText.create('.section:not(.section--home) .section__headline p', {
        linesClass: 'split-line',
        mask: 'lines',
        tag: 'span',
        type: 'lines',
      })

      gsap.set('.section:not(.section--home) .section__headline h1', { textAlign: 'left' })

      SplitText.create('.section:not(.section--home) .section__headline h1', {
        charsClass: 'split-char',
        linesClass: 'split-line',
        mask: 'lines',
        tag: 'span',
        type: 'chars, lines, words',
        wordsClass: 'split-word',
      })

      gsap.set('.section:not(.section--home) .section__headline h1', { clearProps: 'textAlign' })
      gsap.set('.section:not(.section--home) .section__headline:not(.section__headline--small) h1 .split-line', { textAlign: 'center' })

      gsap.set('.section:not(.section--home) .section__headline p .split-line', { overwrite: true, y: '100%' })
      gsap.set('.section:not(.section--home) .section__headline h1 .split-char', { overwrite: true, y: '100%' })
    })
  },
}

export default Typography
