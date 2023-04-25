// adapated from Jörg Bayreuther, https://codepen.io/mediadivisiongmbh, code at https://codepen.io/mediadivisiongmbh/pen/ERxywZ
// Vue and jQuery required

const allowedTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
  'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'br', 'div',
  /*'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td',*/ 'pre'];
// No tables!

const deleteEmptyTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
  'nl', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'hr', 'div',
  'table', 'thead', 'caption', 'tbody', 'pre'];

const blockSelectTags = ['h1', 'h2', 'h3', 'h4', 'h5', 'p', 'li'];

export const Sanitize = (content) => {
  let sanitized = sanitizeHtml(content, {
    allowedTags: allowedTags
  });
  sanitized = sanitized
    // <br /><br /> -> </p><p>
    .replace(/<br \/>(\s)*(<br \/>)+/g, '</p><p>')
    // </p><br /> -> </p>
    .replace(/<p \/>(\s)*(<br \/>)+/g, '</p>')
    // <p><br /> -> </p>
    .replace(/<p>(\s)*(<br \/>)+/g, '<p>')
    // use html5 <br> instead of xhtml <br />
    .replace(/<br\s*\/?>/ig, '<br>')
    // <b> -> <strong>
    .replace(/<b>(.*?)<\/b>/g, '<strong>$1</strong>');

  // delete empty tags
  deleteEmptyTags.forEach(tag => {
    let regex = new RegExp(`<${tag}>(\\s)*</${tag}>`, 'g');
    sanitized = sanitized
      .replace(regex, '');
  })

  return sanitized;
}
