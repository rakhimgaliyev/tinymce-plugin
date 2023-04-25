import { faFileWord } from '@fortawesome/free-solid-svg-icons';
import { convert } from 'html-to-text';


function removeClassesFromHtml(html) {
  const regex = / class="[^"]*"/g; // regex to match class attributes
  return html.replace(regex, ''); // remove class attributes
}

const msWordPastePlugin = editor => {
  // editor.on('PastePreProcess', (e) => {
  //   console.log('PastePreProcess')
  //   console.log(e)
  //   // e.content = `"<meta charset='utf-8'><span class="NormalTextRun SCXW155760781 BCX0">ьные услуги: </span><span class="NormalTextRun SCXW155760781 BCX0">14600 (четырнадцать тысяч </span>"`
  //   // e.preventDefault()
  // })
  editor.on('BeforeSetContent', (e) => {
    console.log('BeforeSetContent')
    console.log(e)
  })
  editor.on('PastePreProcess', (e) => {
    console.log('PastePreProcess')
    console.log(e)
  })
  editor.on('init', () => {
    editor.getBody().addEventListener('paste', event => {
      event.stopPropagation();
      event.stopImmediatePropagation();
      event.preventDefault();
      const clipboardData = event.clipboardData || window.clipboardData;

      if (clipboardData && clipboardData.getData) {
        const msWordContent = clipboardData.getData('text/html');

        if (msWordContent) {
          const plainText = convert(msWordContent, {
            wordwrap: false,
            ignoreHref: false,
            ignoreImage: true
          });
          console.log('onPaste', plainText)
          editor.execCommand('mceInsertContent', true, removeClassesFromHtml(msWordContent));
        }
      }
    });
  });

  editor.ui.registry.addIcon('msword', faFileWord);

  editor.ui.registry.addButton('msword', {
    icon: 'msword',
    tooltip: 'Paste from MS Word',
    onAction: () => {
      editor.execCommand('mceToggleFormat', false, 'strikethrough');
    }
  });
};

export default msWordPastePlugin;
