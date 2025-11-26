import fs from 'fs'
import path from 'path'
import { parse } from 'acorn'

export const getAstroPages = () => {
  const pagesDir = path.resolve('./src/astro/pages')
  const files = fs.readdirSync(pagesDir)

  return files
    .filter(file => file.endsWith('.astro'))
    .map(file => {
      const fullPath = path.join(pagesDir, file)
      const content = fs.readFileSync(fullPath, 'utf-8')

      const match = content.match(/export const frontmatter\s*=\s*({[\s\S]*?})/)
      let title: string | undefined

      if (match) {
        try {
          const ast = parse(`(${match[1]})`, { ecmaVersion: 'latest' })
          const node = ast.body?.[0]
          if (node?.type === 'ExpressionStatement') {
            const expression = node.expression
            if (expression?.type === 'ObjectExpression' && expression.properties) {
              const titleProp = expression.properties.find((p: any) => p.key.name === 'title')
              if (titleProp && titleProp.type === 'Property' && titleProp.value.type === 'Literal') {
                title = String(titleProp.value.value);
              }
            }
          }
          // Removed redundant block as 'properties' does not exist on 'node'.
        } catch (err) {
          console.warn(`Failed to parse frontmatter for ${file}`, err)
        }
      }

      const rawUrl = file === 'index.astro' ? '/' : `/${file.replace(/\.astro$/, '')}`

      return {
        index: files.indexOf(file),
        file,
        title: title ?? file.replace(/\.astro$/, ''),
        url: url(rawUrl),
      }
    })
}

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
  text = `${text.charAt(0).toUpperCase()}${text.slice(1)}` //.`

  return text
}

export const url = (url) => {
  const isDev = process.env.NODE_ENV === 'development'
  const base = isDev ? '/playground' : 'https://ccrch.github.io/playground'

  return `${base}${url}?v=${Date.now()}`
}
