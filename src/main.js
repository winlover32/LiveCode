import * as monaco from 'monaco-editor/'
import HTMLWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import CSSWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
window.MonacoEnvironment = {
  getWorker (_, label) {
    if (label === 'html') {
      return new HTMLWorker()
    }
    if (label === 'css') {
      return new CSSWorker()
    }
  }
}
const $ = (selector) => document.querySelector(selector)

const htlmEl = $('#html')
const cssEl = $('#css')
const jsEl = $('#js')

const htmlEditor = monaco.editor.create(htlmEl, {
  value: '',
  language: 'html'
})

const cssEditor = monaco.editor.create(cssEl, {
  value: '',
  language: 'css'

})

const getEditorValues = () => {
  return {
    html: htmlEditor.getValue(),
    css: cssEditor.getValue(),
    js: ''
  }
}
function init () {
  const [html, css, js = null] = window.location.pathname.split('%7C')
  console.log(css)
  htmlEditor.setValue(window.atob(html.slice(1)))
  cssEditor.setValue(window.atob(css))

  // jsEl.value = window.atob(js)
  updatePreview()
}

const createDocHTML = (html = '', css = '', js = '') => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
     <style>
      ${css}
     </style>
    <body>
       ${html}
       <script>
     ${js}
    </script>
    </body>
    
    </html>`
}

// eslint-disable-next-line no-unused-vars
const updatePreview = () => {
  const { html, css, js } = getEditorValues()
  const htmlDoc = createDocHTML(html, css, js)
  const iframePreview = $('#preview')
  iframePreview.setAttribute('srcdoc', htmlDoc)
  updateUrl()
}

const updateUrl = () => {
  const { html, css, js } = getEditorValues()
  const encodedPage = `${window.btoa(html)}|${window.btoa(css)}|${window.btoa(
    js
  )}`
  window.history.replaceState(null, null, encodedPage)
}

htmlEditor.onDidChangeModelContent(updatePreview)
cssEditor.onDidChangeModelContent(updatePreview)
document.addEventListener('DOMContentLoaded', init)
