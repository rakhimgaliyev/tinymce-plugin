import './App.css';
import { Editor } from '@tinymce/tinymce-react';
import colorMap from './colorMap';
import { useEffect, useRef } from 'react';
import msWordPastePlugin from './plugin';


// const colorMap = [
//   '000000', 'Black',
//   '808080', 'Gray',
//   'FFFFFF', 'White',
//   'FF0000', 'Red',
//   'FFFF00', 'Yellow',
//   '008000', 'Green',
//   '0000FF', 'Blue'
// ]

const setFocus = true

function App() {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      msWordPastePlugin(editorRef.current.editor);
    }
  }, []);


  const getConfig = () => {

    const toolbar =
      'undo redo | fontfamily | fontsize | bold italic underline strikethrough forecolor backcolor | link blockquote emoticons | alignleft aligncenter alignright alignjustify | bullist numlist | toggle removeformat | ';

    return {
      valid_elements: '*[*]',
      auto_focus: setFocus ? 'editor' : undefined,

      menubar: false,
      statusbar: false,
      language: 'ru',
      toolbar,
      selector: 'textarea',
      // skin_url: SKIN_URL,
      forced_root_block: 'div',
      plugins: 'link image       lists autolink emoticons autoresize',

      autoresize_overflow_padding: 0,
      autoresize_bottom_margin: 0,
      min_height: 352,

      /**
       * spellchecker
       */
      browser_spellcheck: true,

      /**
       * colors
       */
      color_cols: 100,
      color_map: colorMap,


      /**
       * fonts
       */
      font_family_formats:
        'Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Impact=impact,chicago;Lucida Grande=Lucida Sans Unicode,Lucida Grande,sans-serif;Palatino Linotype=book antiqua,palatino;Tahoma=tahoma,arial,helvetica,sans-serif;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva',
      font_size_formats: '6=6px 8=8px 10=10px 12=12px 14=14px 15=15px 16=16px 18=18px 20=20px 22=22px 24=24px 26=26px',

      /**
       * link plugin config
       */
      target_list: false,
      link_title: false,
      anchor_top: false,
      anchor_bottom: false,

      paste_webkit_styles: 'color font-family font-size font-weight background-color',
      paste_data_images: false,
      setup: (editor) => {
        editorRef.current = editor
        msWordPastePlugin(editor);
      },
    }
  }

  return (
    <div className="App">
      <Editor
        init={{
          ...getConfig(),

          skin: 'oxide',
        }}
        tinymceScriptSrc={'/tinymce/js/tinymce/tinymce.min.js'}
      />
    </div>
  );
}

export default App;
