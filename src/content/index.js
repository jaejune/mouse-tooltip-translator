console.info("chrome-ext template-react-js content script");

import { getMouseOverWord } from "./get_word.js";
import { enableSelectionEndEvent } from "./selection.js";
import $ from "jquery";
import "bootstrap/js/dist/tooltip";

var tooltipContainer;
var clientX = null;
var clientY = null;
var style;
var mouseTarget = null;
var selectedText = "";
var selection = false;
var mouseoverInterval;
var mouseMoved = false;
var mouseMovedCount = 0;
var destructionEvent = "destructmyextension_MouseTooltipTranslator"; // + chrome.runtime.id;
const controller = new AbortController();
const { signal } = controller;

$(async function () {
  loadDestructor();
  addElementEnv();
  applyStyleSetting();
  startMouseoverDetector();
  loadEventListener();
  startTextSelectDetector();
});

function startMouseoverDetector() {
  mouseoverInterval = setInterval(async function () {
    if (clientX != null && clientY != null) {
      var word = getMouseOverWord(clientX, clientY);
      if (word == "" && !selection) {
        hideTooltip();
        selectedText = word;
      } else {
        translate(word, "mouseover");
        selectedText = word;
      }
    }
  }, 700);
}

function startTextSelectDetector() {
  enableSelectionEndEvent();
  document.addEventListener(
    "selectionEnd",
    async function (event) {
      // if translate on selection is enabled
      if (document.visibilityState === "visible") {
        selectedText = event.selectedText;
        if (selectedText == "") {
          selection = false;
          hideTooltip();
        } else {
          await translate(selectedText, "selection");
        }
      }
    },
    false
  );
}

function applyStyleSetting() {
  style.html(
    `
      #mttContainer {
        left: 0 !important;
        top: 0 !important;
        position: fixed !important;
        z-index: 100000200 !important;
        width: 1000px !important;
        margin-left: -500px !important;
        background-color: #00000000  !important;
        pointer-events: none !important;
        display: inline-block !important;
      }
      .bootstrapiso .tooltip {
        width:auto  !important;
        height:auto  !important;
        background:transparent  !important;
        border:none !important;
        border-radius: 0px !important;
        visibility: visible  !important;
        pointer-events: none !important;
      }
      .bootstrapiso .tooltip-inner {
        font-size: 14px !important;
        max-width: 400px !important;
        text-align: center !important;
        border-radius: 8px;
        padding: 6px 12px;
        background-color: #334155 !important;
        pointer-events: none !important;
      }
    
      .bootstrapiso .arrow::before {
        border-bottom-color: #334155 !important;
      }
      .bootstrapiso .arrow::after {
        display:none !important;
      }
  
      `
  );
}

function addElementEnv() {
  tooltipContainer = $("<div/>", {
    id: "mttContainer",
    class: "bootstrapiso notranslate", //use bootstrapiso class to apply bootstrap isolation css, prevent google web translate
  }).appendTo(document.body);

  tooltipContainer.tooltip({
    placement: "bottom",
    container: "#mttContainer",
    trigger: "manual",
  });

  style = $("<style/>", {
    id: "mttstyle",
  }).appendTo("head");
}

function loadEventListener() {
  //use mouse position for tooltip position
  addEventHandler("mousemove", (e) => {
    //if mouse moved far distance two times, check as mouse moved
    if (
      mouseMoved == false &&
      Math.abs(e.clientX - clientX) + Math.abs(e.clientY - clientY) > 3
    ) {
      if (mouseMovedCount < 2) {
        mouseMovedCount += 1;
      } else {
        mouseMoved = true;
      }
    }
    clientX = e.clientX;
    clientY = e.clientY;
    mouseTarget = e.target;
    setTooltipPosition();
  });
}

function setTooltipPosition() {
  if (tooltipContainer) {
    tooltipContainer.css(
      "transform",
      "translate(" + clientX + "px," + (clientY + 10) + "px)"
    );
  }
}

function showTooltip(text) {
  hideTooltip(); //reset tooltip arrow
  checkContainer();
  tooltipContainer.attr("data-original-title", text); //place text on tooltip
  tooltipContainer.tooltip("show");
}

function hideTooltip() {
  tooltipContainer.tooltip("hide");
}

function checkContainer() {
  //restart container if not exist
  if (!tooltipContainer.parent().is("body")) {
    tooltipContainer.appendTo(document.body);
    style.appendTo("head");
  }
}

// * 파파고 번역
async function translate(word, activeType) {
  if (word != selectedText && activeType == "mouseover" && !selection) {
    chrome.runtime.sendMessage(
      {
        type: "translate",
        word: word,
      },
      (response) => {
        if (response != "") {
          console.log(response);
          showTooltip(response);
        }
      }
    );
  } else if (activeType == "selection") {
    selection = true;

    chrome.runtime.sendMessage(
      {
        type: "translate",
        word: word,
      },
      (response) => {
        if (response != "") {
          showTooltip(response);
        }
      }
    );
  }
}

//destruction ===================================

function loadDestructor() {
  // https://stackoverflow.com/questions/25840674/chrome-runtime-sendmessage-throws-exception-from-content-script-after-reloading/25844023#25844023
  // Unload previous content script if needed
  window.dispatchEvent(new CustomEvent(destructionEvent)); //call destructor to remove script
  addEventHandler(destructionEvent, destructor); //add destructor listener for later remove
}

function destructor() {
  clearInterval(mouseoverInterval); //clear mouseover interval
  removePrevElement(); //remove element
  controller.abort(); //clear all event Listener by controller signal
}

function addEventHandler(eventName, callbackFunc) {
  //record event for later event signal kill
  return window.addEventListener(eventName, callbackFunc, { signal });
}

function removePrevElement() {
  $("#mttstyle").remove();
  $("#mttContainer").tooltip("dispose");
  $("#mttContainer").remove();
  for (let key in iFrames) {
    iFrames[key].remove();
  }
  removeOcrBlock();
}

export {};
