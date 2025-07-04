
export const randomText = (min = 10, max = 30) => {
  const amount = Math.floor(Math.random() * (max - min + 1)) + min // gsap.utils.random(min, max)
  let text = ''
  const words = [
    'lorem',
    'ipsum',
    'dolor',
    'sit',
    'amet',
    'consectetur',
    'adipiscing',
    'elit',
    'sed',
    'do',
    'eiusmod',
    'tempor',
    'incididunt',
    'ut',
    'labore',
    'et',
    'dolore',
    'magna',
    'aliqua',
  ]

  Array.from({ length: amount }).forEach(() => {
    const randomIndex = Math.floor(Math.random() * words.length)
    text += `${words[randomIndex]} `
  })

  text = text.trim()
  text = `${text.charAt(0).toUpperCase()}${text.slice(1)}.`

  return text
}

export const url = (url) => {
  const isDev = process.env.NODE_ENV === 'development'
  const base = isDev ? '/astro-test' : 'https://ccrch.github.io/astro-test'

  return `${base}${url}?v=${Date.now()}`
}
