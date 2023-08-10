const $ = (selector) => document.querySelector(selector)

const htlmEl = $('#html')
const cssEl = $('#css')
const jsEl = $('#js')

const elemenstArray = [htlmEl, cssEl]

const createHTML = () => {
  const htmlCode = htlmEl.value
  const cssCode = cssEl.value
  const jsCode = jsEl.value
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
      ${cssCode}
     </style>
    <body>
       ${htmlCode}
    </body>
    <script>
     ${jsCode}
    </script>
    </html>`
}

const updateHTML = () => {
  console.log('Aqui !!')
  const iframePreview = $('#preview')
  console.log(iframePreview)
  const htmlDoc = createHTML()
  console.log(htmlDoc)
  iframePreview.setAttribute('srcdoc', htmlDoc)
}

elemenstArray.forEach((element) => {
  element.addEventListener('input', updateHTML)
})
