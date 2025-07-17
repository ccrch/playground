import gsap from 'gsap'

const animatedSvgTextOnPath = {
  q: gsap.utils.selector('.svg-text-on-path-animation__body'),

  init(): void {
    gsap.set(this.q('.svg-text-on-path-animation'), { opacity: 1 })

    this.createAnimation({
      duration: 21,
      target: this.q('.svg-text-on-path-animation .ellipse svg')[0],
      // text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua lorem.',
      // textProperties: { fontSize: '6.52px', letterSpacing: '0.47px' },
      text: 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do',
      textProperties: { fontSize: '17.5px', letterSpacing: '-0.47px' },
    })

    this.createAnimation({
      duration: 21,
      reversed: true,
      target: this.q('.svg-text-on-path-animation .shape svg')[0],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do ei.',
      textProperties: { fontSize: '33px' },
    })
  },

  createAnimation({ duration = 21, reversed = false, target, text, textProperties = undefined }): void {
    const pathId = `path-${gsap.utils.random(100000, 999999, 1)}`
    const props = { duration, ease: 'none', repeat: -1 }

    gsap.set(target.querySelector('path'), { attr: { fill: 'none', id: pathId, stroke: 'none' } })
    target.insertAdjacentHTML(
      'beforeend',
      `
        <text>
          <textPath href='#${pathId}' startOffset="0%">${text}</textPath>
          <textPath href='#${pathId}' startOffset="0%">${text}</textPath>
        </text>
      `
    )

    if (textProperties) {
      gsap.set(target.querySelectorAll('textPath'), textProperties)
    }

    gsap.fromTo(
      target.querySelectorAll('textPath')[0],
      { attr: { startOffset: '0%' } },
      { attr: { startOffset: reversed ? '-100%' : '100%' }, ...props }
    )
    gsap.fromTo(
      target.querySelectorAll('textPath')[1],
      { attr: { startOffset: reversed ? '100%' : '-100%' } },
      { attr: { startOffset: '0%' }, ...props }
    )
  },
}

export default animatedSvgTextOnPath
