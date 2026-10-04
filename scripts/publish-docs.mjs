import { copyFileSync, cpSync, existsSync, rmSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

// Nitro はビルドのたびに出力先を削除・再作成するため（nuxt dev / nuxt prepare でも実行される）、
// GitHub Pages の配信元である docs/ を出力先にはせず、generate の生成物をここで docs/ にコピーする
const outputDir = fileURLToPath(new URL('../.output/public', import.meta.url))
const docsDir = fileURLToPath(new URL('../docs', import.meta.url))

if (!existsSync(`${outputDir}/index.html`)) {
  throw new Error(`${outputDir}/index.html が見つかりません。先に nuxt generate を実行してください。`)
}

rmSync(docsDir, { recursive: true, force: true })
cpSync(outputDir, docsDir, { recursive: true, dereference: true })
copyFileSync(`${docsDir}/index.html`, `${docsDir}/404.html`)
