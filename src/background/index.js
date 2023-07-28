import papago from "../translator/papago.js";

console.info("chrome-ext template-react-js background script");

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type == "translate") {
    translate(request.word, sendResponse);
  }
  return true;
});

async function translate(word, sendResponse) {
  const result = await papago.requestTranslate(word, "en", "ko");
  sendResponse(result.translatedText);
}

export {};
