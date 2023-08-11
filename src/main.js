const $ = (selector) => document.querySelector(selector)

const htlmEl = $('#html')
const cssEl = $('#css')
const jsEl = $('#js')

function init () {
  console.log('Here')
  const [html, css, js] = window.location.pathname.split('%7C')

  htlmEl.value = window.atob(html.slice(1))
  cssEl.value = window.atob(css)
  jsEl.value = window.atob(js)
  updatePreview()
}

const getEditorValues = () => {
  return {
    html: htlmEl.value,
    css: cssEl.value,
    js: jsEl.value
  }
}

const elemenstArray = [htlmEl, cssEl]

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

const updatePreview = () => {
  const { html, css, js } = getEditorValues()
  const htmlDoc = createDocHTML(html, css, js)
  const iframePreview = $('#preview')
  iframePreview.setAttribute('srcdoc', htmlDoc)
  updateUrl(htmlDoc)
}

const updateUrl = () => {
  const { html, css, js } = getEditorValues()
  const encodedPage = `${window.btoa(html)}|${window.btoa(css)}|${window.btoa(
    js
  )}`
  window.history.replaceState(null, null, encodedPage)
}

elemenstArray.forEach((element) => {
  element.addEventListener('input', updatePreview)
})

document.addEventListener('DOMContentLoaded', init)
