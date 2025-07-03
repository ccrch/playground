import { useEffect } from 'react'
import { initScripts } from './scripts'

export default function RunScript() {
  useEffect(() => {
    console.log('✅ DOM loaded — RunScript.tsx is running!')
    initScripts()
  }, [])

  return null
}
