const removeClassesFromHtml = html => html.replace(/ class="[^"]*"/g, '')


const msWordPastePlugin = editor => {
  editor.on('PastePreProcess', (event) => {
    event.content = removeClassesFromHtml(event.content);
  })
};

export default msWordPastePlugin;
