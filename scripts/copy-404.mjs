import { copyFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const docsDir = fileURLToPath(new URL('../docs', import.meta.url))

copyFileSync(`${docsDir}/index.html`, `${docsDir}/404.html`)
