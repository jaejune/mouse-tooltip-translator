export function getMouseOverWord(clientX, clientY) {
  var range = document.caretRangeFromPoint(clientX, clientY);
  if (range == null || range.startContainer.nodeType !== Node.TEXT_NODE) {
    return "";
  }
  range.expand("word");
  var rect = range.getBoundingClientRect(); //mouse in word rect
  if (
    rect.left > clientX ||
    rect.right < clientX ||
    rect.top > clientY ||
    rect.bottom < clientY
  ) {
    return "";
  }
  return range.toString();
}
