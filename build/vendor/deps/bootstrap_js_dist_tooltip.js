import { require_jquery } from './chunk-MY2454W6.js';
import { __export, __esm, __commonJS, __toCommonJS } from './chunk-OROXOI2D.js';

// node_modules/popper.js/dist/esm/popper.js
var popper_exports = {};
__export(popper_exports, {
  default: () => popper_default
});
function microtaskDebounce(fn) {
  var called = false;
  return function() {
    if (called) {
      return;
    }
    called = true;
    window.Promise.resolve().then(function() {
      called = false;
      fn();
    });
  };
}
function taskDebounce(fn) {
  var scheduled = false;
  return function() {
    if (!scheduled) {
      scheduled = true;
      setTimeout(function() {
        scheduled = false;
        fn();
      }, timeoutDuration);
    }
  };
}
function isFunction(functionToCheck) {
  var getType = {};
  return functionToCheck && getType.toString.call(functionToCheck) === "[object Function]";
}
function getStyleComputedProperty(element, property) {
  if (element.nodeType !== 1) {
    return [];
  }
  var window2 = element.ownerDocument.defaultView;
  var css = window2.getComputedStyle(element, null);
  return property ? css[property] : css;
}
function getParentNode(element) {
  if (element.nodeName === "HTML") {
    return element;
  }
  return element.parentNode || element.host;
}
function getScrollParent(element) {
  if (!element) {
    return document.body;
  }
  switch (element.nodeName) {
    case "HTML":
    case "BODY":
      return element.ownerDocument.body;
    case "#document":
      return element.body;
  }
  var _getStyleComputedProp = getStyleComputedProperty(element), overflow = _getStyleComputedProp.overflow, overflowX = _getStyleComputedProp.overflowX, overflowY = _getStyleComputedProp.overflowY;
  if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
    return element;
  }
  return getScrollParent(getParentNode(element));
}
function getReferenceNode(reference) {
  return reference && reference.referenceNode ? reference.referenceNode : reference;
}
function isIE(version) {
  if (version === 11) {
    return isIE11;
  }
  if (version === 10) {
    return isIE10;
  }
  return isIE11 || isIE10;
}
function getOffsetParent(element) {
  if (!element) {
    return document.documentElement;
  }
  var noOffsetParent = isIE(10) ? document.body : null;
  var offsetParent = element.offsetParent || null;
  while (offsetParent === noOffsetParent && element.nextElementSibling) {
    offsetParent = (element = element.nextElementSibling).offsetParent;
  }
  var nodeName = offsetParent && offsetParent.nodeName;
  if (!nodeName || nodeName === "BODY" || nodeName === "HTML") {
    return element ? element.ownerDocument.documentElement : document.documentElement;
  }
  if (["TH", "TD", "TABLE"].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, "position") === "static") {
    return getOffsetParent(offsetParent);
  }
  return offsetParent;
}
function isOffsetContainer(element) {
  var nodeName = element.nodeName;
  if (nodeName === "BODY") {
    return false;
  }
  return nodeName === "HTML" || getOffsetParent(element.firstElementChild) === element;
}
function getRoot(node) {
  if (node.parentNode !== null) {
    return getRoot(node.parentNode);
  }
  return node;
}
function findCommonOffsetParent(element1, element2) {
  if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
    return document.documentElement;
  }
  var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
  var start = order ? element1 : element2;
  var end = order ? element2 : element1;
  var range = document.createRange();
  range.setStart(start, 0);
  range.setEnd(end, 0);
  var commonAncestorContainer = range.commonAncestorContainer;
  if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
    if (isOffsetContainer(commonAncestorContainer)) {
      return commonAncestorContainer;
    }
    return getOffsetParent(commonAncestorContainer);
  }
  var element1root = getRoot(element1);
  if (element1root.host) {
    return findCommonOffsetParent(element1root.host, element2);
  } else {
    return findCommonOffsetParent(element1, getRoot(element2).host);
  }
}
function getScroll(element) {
  var side = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "top";
  var upperSide = side === "top" ? "scrollTop" : "scrollLeft";
  var nodeName = element.nodeName;
  if (nodeName === "BODY" || nodeName === "HTML") {
    var html = element.ownerDocument.documentElement;
    var scrollingElement = element.ownerDocument.scrollingElement || html;
    return scrollingElement[upperSide];
  }
  return element[upperSide];
}
function includeScroll(rect, element) {
  var subtract = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
  var scrollTop = getScroll(element, "top");
  var scrollLeft = getScroll(element, "left");
  var modifier = subtract ? -1 : 1;
  rect.top += scrollTop * modifier;
  rect.bottom += scrollTop * modifier;
  rect.left += scrollLeft * modifier;
  rect.right += scrollLeft * modifier;
  return rect;
}
function getBordersSize(styles, axis) {
  var sideA = axis === "x" ? "Left" : "Top";
  var sideB = sideA === "Left" ? "Right" : "Bottom";
  return parseFloat(styles["border" + sideA + "Width"]) + parseFloat(styles["border" + sideB + "Width"]);
}
function getSize(axis, body, html, computedStyle) {
  return Math.max(body["offset" + axis], body["scroll" + axis], html["client" + axis], html["offset" + axis], html["scroll" + axis], isIE(10) ? parseInt(html["offset" + axis]) + parseInt(computedStyle["margin" + (axis === "Height" ? "Top" : "Left")]) + parseInt(computedStyle["margin" + (axis === "Height" ? "Bottom" : "Right")]) : 0);
}
function getWindowSizes(document2) {
  var body = document2.body;
  var html = document2.documentElement;
  var computedStyle = isIE(10) && getComputedStyle(html);
  return {
    height: getSize("Height", body, html, computedStyle),
    width: getSize("Width", body, html, computedStyle)
  };
}
function getClientRect(offsets) {
  return _extends({}, offsets, {
    right: offsets.left + offsets.width,
    bottom: offsets.top + offsets.height
  });
}
function getBoundingClientRect(element) {
  var rect = {};
  try {
    if (isIE(10)) {
      rect = element.getBoundingClientRect();
      var scrollTop = getScroll(element, "top");
      var scrollLeft = getScroll(element, "left");
      rect.top += scrollTop;
      rect.left += scrollLeft;
      rect.bottom += scrollTop;
      rect.right += scrollLeft;
    } else {
      rect = element.getBoundingClientRect();
    }
  } catch (e) {
  }
  var result = {
    left: rect.left,
    top: rect.top,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top
  };
  var sizes = element.nodeName === "HTML" ? getWindowSizes(element.ownerDocument) : {};
  var width = sizes.width || element.clientWidth || result.width;
  var height = sizes.height || element.clientHeight || result.height;
  var horizScrollbar = element.offsetWidth - width;
  var vertScrollbar = element.offsetHeight - height;
  if (horizScrollbar || vertScrollbar) {
    var styles = getStyleComputedProperty(element);
    horizScrollbar -= getBordersSize(styles, "x");
    vertScrollbar -= getBordersSize(styles, "y");
    result.width -= horizScrollbar;
    result.height -= vertScrollbar;
  }
  return getClientRect(result);
}
function getOffsetRectRelativeToArbitraryNode(children, parent) {
  var fixedPosition = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
  var isIE102 = isIE(10);
  var isHTML = parent.nodeName === "HTML";
  var childrenRect = getBoundingClientRect(children);
  var parentRect = getBoundingClientRect(parent);
  var scrollParent = getScrollParent(children);
  var styles = getStyleComputedProperty(parent);
  var borderTopWidth = parseFloat(styles.borderTopWidth);
  var borderLeftWidth = parseFloat(styles.borderLeftWidth);
  if (fixedPosition && isHTML) {
    parentRect.top = Math.max(parentRect.top, 0);
    parentRect.left = Math.max(parentRect.left, 0);
  }
  var offsets = getClientRect({
    top: childrenRect.top - parentRect.top - borderTopWidth,
    left: childrenRect.left - parentRect.left - borderLeftWidth,
    width: childrenRect.width,
    height: childrenRect.height
  });
  offsets.marginTop = 0;
  offsets.marginLeft = 0;
  if (!isIE102 && isHTML) {
    var marginTop = parseFloat(styles.marginTop);
    var marginLeft = parseFloat(styles.marginLeft);
    offsets.top -= borderTopWidth - marginTop;
    offsets.bottom -= borderTopWidth - marginTop;
    offsets.left -= borderLeftWidth - marginLeft;
    offsets.right -= borderLeftWidth - marginLeft;
    offsets.marginTop = marginTop;
    offsets.marginLeft = marginLeft;
  }
  if (isIE102 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== "BODY") {
    offsets = includeScroll(offsets, parent);
  }
  return offsets;
}
function getViewportOffsetRectRelativeToArtbitraryNode(element) {
  var excludeScroll = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  var html = element.ownerDocument.documentElement;
  var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
  var width = Math.max(html.clientWidth, window.innerWidth || 0);
  var height = Math.max(html.clientHeight, window.innerHeight || 0);
  var scrollTop = !excludeScroll ? getScroll(html) : 0;
  var scrollLeft = !excludeScroll ? getScroll(html, "left") : 0;
  var offset2 = {
    top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
    left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
    width,
    height
  };
  return getClientRect(offset2);
}
function isFixed(element) {
  var nodeName = element.nodeName;
  if (nodeName === "BODY" || nodeName === "HTML") {
    return false;
  }
  if (getStyleComputedProperty(element, "position") === "fixed") {
    return true;
  }
  var parentNode = getParentNode(element);
  if (!parentNode) {
    return false;
  }
  return isFixed(parentNode);
}
function getFixedPositionOffsetParent(element) {
  if (!element || !element.parentElement || isIE()) {
    return document.documentElement;
  }
  var el = element.parentElement;
  while (el && getStyleComputedProperty(el, "transform") === "none") {
    el = el.parentElement;
  }
  return el || document.documentElement;
}
function getBoundaries(popper, reference, padding, boundariesElement) {
  var fixedPosition = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : false;
  var boundaries = { top: 0, left: 0 };
  var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));
  if (boundariesElement === "viewport") {
    boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
  } else {
    var boundariesNode = void 0;
    if (boundariesElement === "scrollParent") {
      boundariesNode = getScrollParent(getParentNode(reference));
      if (boundariesNode.nodeName === "BODY") {
        boundariesNode = popper.ownerDocument.documentElement;
      }
    } else if (boundariesElement === "window") {
      boundariesNode = popper.ownerDocument.documentElement;
    } else {
      boundariesNode = boundariesElement;
    }
    var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);
    if (boundariesNode.nodeName === "HTML" && !isFixed(offsetParent)) {
      var _getWindowSizes = getWindowSizes(popper.ownerDocument), height = _getWindowSizes.height, width = _getWindowSizes.width;
      boundaries.top += offsets.top - offsets.marginTop;
      boundaries.bottom = height + offsets.top;
      boundaries.left += offsets.left - offsets.marginLeft;
      boundaries.right = width + offsets.left;
    } else {
      boundaries = offsets;
    }
  }
  padding = padding || 0;
  var isPaddingNumber = typeof padding === "number";
  boundaries.left += isPaddingNumber ? padding : padding.left || 0;
  boundaries.top += isPaddingNumber ? padding : padding.top || 0;
  boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
  boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;
  return boundaries;
}
function getArea(_ref) {
  var width = _ref.width, height = _ref.height;
  return width * height;
}
function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
  var padding = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : 0;
  if (placement.indexOf("auto") === -1) {
    return placement;
  }
  var boundaries = getBoundaries(popper, reference, padding, boundariesElement);
  var rects = {
    top: {
      width: boundaries.width,
      height: refRect.top - boundaries.top
    },
    right: {
      width: boundaries.right - refRect.right,
      height: boundaries.height
    },
    bottom: {
      width: boundaries.width,
      height: boundaries.bottom - refRect.bottom
    },
    left: {
      width: refRect.left - boundaries.left,
      height: boundaries.height
    }
  };
  var sortedAreas = Object.keys(rects).map(function(key) {
    return _extends({
      key
    }, rects[key], {
      area: getArea(rects[key])
    });
  }).sort(function(a, b) {
    return b.area - a.area;
  });
  var filteredAreas = sortedAreas.filter(function(_ref2) {
    var width = _ref2.width, height = _ref2.height;
    return width >= popper.clientWidth && height >= popper.clientHeight;
  });
  var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;
  var variation = placement.split("-")[1];
  return computedPlacement + (variation ? "-" + variation : "");
}
function getReferenceOffsets(state, popper, reference) {
  var fixedPosition = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
  var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, getReferenceNode(reference));
  return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
}
function getOuterSizes(element) {
  var window2 = element.ownerDocument.defaultView;
  var styles = window2.getComputedStyle(element);
  var x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
  var y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
  var result = {
    width: element.offsetWidth + y,
    height: element.offsetHeight + x
  };
  return result;
}
function getOppositePlacement(placement) {
  var hash = { left: "right", right: "left", bottom: "top", top: "bottom" };
  return placement.replace(/left|right|bottom|top/g, function(matched) {
    return hash[matched];
  });
}
function getPopperOffsets(popper, referenceOffsets, placement) {
  placement = placement.split("-")[0];
  var popperRect = getOuterSizes(popper);
  var popperOffsets = {
    width: popperRect.width,
    height: popperRect.height
  };
  var isHoriz = ["right", "left"].indexOf(placement) !== -1;
  var mainSide = isHoriz ? "top" : "left";
  var secondarySide = isHoriz ? "left" : "top";
  var measurement = isHoriz ? "height" : "width";
  var secondaryMeasurement = !isHoriz ? "height" : "width";
  popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
  if (placement === secondarySide) {
    popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
  } else {
    popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
  }
  return popperOffsets;
}
function find(arr, check) {
  if (Array.prototype.find) {
    return arr.find(check);
  }
  return arr.filter(check)[0];
}
function findIndex(arr, prop, value) {
  if (Array.prototype.findIndex) {
    return arr.findIndex(function(cur) {
      return cur[prop] === value;
    });
  }
  var match = find(arr, function(obj) {
    return obj[prop] === value;
  });
  return arr.indexOf(match);
}
function runModifiers(modifiers2, data, ends) {
  var modifiersToRun = ends === void 0 ? modifiers2 : modifiers2.slice(0, findIndex(modifiers2, "name", ends));
  modifiersToRun.forEach(function(modifier) {
    if (modifier["function"]) {
      console.warn("`modifier.function` is deprecated, use `modifier.fn`!");
    }
    var fn = modifier["function"] || modifier.fn;
    if (modifier.enabled && isFunction(fn)) {
      data.offsets.popper = getClientRect(data.offsets.popper);
      data.offsets.reference = getClientRect(data.offsets.reference);
      data = fn(data, modifier);
    }
  });
  return data;
}
function update() {
  if (this.state.isDestroyed) {
    return;
  }
  var data = {
    instance: this,
    styles: {},
    arrowStyles: {},
    attributes: {},
    flipped: false,
    offsets: {}
  };
  data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed);
  data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);
  data.originalPlacement = data.placement;
  data.positionFixed = this.options.positionFixed;
  data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);
  data.offsets.popper.position = this.options.positionFixed ? "fixed" : "absolute";
  data = runModifiers(this.modifiers, data);
  if (!this.state.isCreated) {
    this.state.isCreated = true;
    this.options.onCreate(data);
  } else {
    this.options.onUpdate(data);
  }
}
function isModifierEnabled(modifiers2, modifierName) {
  return modifiers2.some(function(_ref) {
    var name = _ref.name, enabled = _ref.enabled;
    return enabled && name === modifierName;
  });
}
function getSupportedPropertyName(property) {
  var prefixes = [false, "ms", "Webkit", "Moz", "O"];
  var upperProp = property.charAt(0).toUpperCase() + property.slice(1);
  for (var i = 0; i < prefixes.length; i++) {
    var prefix = prefixes[i];
    var toCheck = prefix ? "" + prefix + upperProp : property;
    if (typeof document.body.style[toCheck] !== "undefined") {
      return toCheck;
    }
  }
  return null;
}
function destroy() {
  this.state.isDestroyed = true;
  if (isModifierEnabled(this.modifiers, "applyStyle")) {
    this.popper.removeAttribute("x-placement");
    this.popper.style.position = "";
    this.popper.style.top = "";
    this.popper.style.left = "";
    this.popper.style.right = "";
    this.popper.style.bottom = "";
    this.popper.style.willChange = "";
    this.popper.style[getSupportedPropertyName("transform")] = "";
  }
  this.disableEventListeners();
  if (this.options.removeOnDestroy) {
    this.popper.parentNode.removeChild(this.popper);
  }
  return this;
}
function getWindow(element) {
  var ownerDocument = element.ownerDocument;
  return ownerDocument ? ownerDocument.defaultView : window;
}
function attachToScrollParents(scrollParent, event, callback, scrollParents) {
  var isBody = scrollParent.nodeName === "BODY";
  var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
  target.addEventListener(event, callback, { passive: true });
  if (!isBody) {
    attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
  }
  scrollParents.push(target);
}
function setupEventListeners(reference, options, state, updateBound) {
  state.updateBound = updateBound;
  getWindow(reference).addEventListener("resize", state.updateBound, { passive: true });
  var scrollElement = getScrollParent(reference);
  attachToScrollParents(scrollElement, "scroll", state.updateBound, state.scrollParents);
  state.scrollElement = scrollElement;
  state.eventsEnabled = true;
  return state;
}
function enableEventListeners() {
  if (!this.state.eventsEnabled) {
    this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
  }
}
function removeEventListeners(reference, state) {
  getWindow(reference).removeEventListener("resize", state.updateBound);
  state.scrollParents.forEach(function(target) {
    target.removeEventListener("scroll", state.updateBound);
  });
  state.updateBound = null;
  state.scrollParents = [];
  state.scrollElement = null;
  state.eventsEnabled = false;
  return state;
}
function disableEventListeners() {
  if (this.state.eventsEnabled) {
    cancelAnimationFrame(this.scheduleUpdate);
    this.state = removeEventListeners(this.reference, this.state);
  }
}
function isNumeric(n) {
  return n !== "" && !isNaN(parseFloat(n)) && isFinite(n);
}
function setStyles(element, styles) {
  Object.keys(styles).forEach(function(prop) {
    var unit = "";
    if (["width", "height", "top", "right", "bottom", "left"].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
      unit = "px";
    }
    element.style[prop] = styles[prop] + unit;
  });
}
function setAttributes(element, attributes) {
  Object.keys(attributes).forEach(function(prop) {
    var value = attributes[prop];
    if (value !== false) {
      element.setAttribute(prop, attributes[prop]);
    } else {
      element.removeAttribute(prop);
    }
  });
}
function applyStyle(data) {
  setStyles(data.instance.popper, data.styles);
  setAttributes(data.instance.popper, data.attributes);
  if (data.arrowElement && Object.keys(data.arrowStyles).length) {
    setStyles(data.arrowElement, data.arrowStyles);
  }
  return data;
}
function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
  var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed);
  var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);
  popper.setAttribute("x-placement", placement);
  setStyles(popper, { position: options.positionFixed ? "fixed" : "absolute" });
  return options;
}
function getRoundedOffsets(data, shouldRound) {
  var _data$offsets = data.offsets, popper = _data$offsets.popper, reference = _data$offsets.reference;
  var round = Math.round, floor = Math.floor;
  var noRound = function noRound2(v) {
    return v;
  };
  var referenceWidth = round(reference.width);
  var popperWidth = round(popper.width);
  var isVertical = ["left", "right"].indexOf(data.placement) !== -1;
  var isVariation = data.placement.indexOf("-") !== -1;
  var sameWidthParity = referenceWidth % 2 === popperWidth % 2;
  var bothOddWidth = referenceWidth % 2 === 1 && popperWidth % 2 === 1;
  var horizontalToInteger = !shouldRound ? noRound : isVertical || isVariation || sameWidthParity ? round : floor;
  var verticalToInteger = !shouldRound ? noRound : round;
  return {
    left: horizontalToInteger(bothOddWidth && !isVariation && shouldRound ? popper.left - 1 : popper.left),
    top: verticalToInteger(popper.top),
    bottom: verticalToInteger(popper.bottom),
    right: horizontalToInteger(popper.right)
  };
}
function computeStyle(data, options) {
  var x = options.x, y = options.y;
  var popper = data.offsets.popper;
  var legacyGpuAccelerationOption = find(data.instance.modifiers, function(modifier) {
    return modifier.name === "applyStyle";
  }).gpuAcceleration;
  if (legacyGpuAccelerationOption !== void 0) {
    console.warn("WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!");
  }
  var gpuAcceleration = legacyGpuAccelerationOption !== void 0 ? legacyGpuAccelerationOption : options.gpuAcceleration;
  var offsetParent = getOffsetParent(data.instance.popper);
  var offsetParentRect = getBoundingClientRect(offsetParent);
  var styles = {
    position: popper.position
  };
  var offsets = getRoundedOffsets(data, window.devicePixelRatio < 2 || !isFirefox);
  var sideA = x === "bottom" ? "top" : "bottom";
  var sideB = y === "right" ? "left" : "right";
  var prefixedProperty = getSupportedPropertyName("transform");
  var left = void 0, top = void 0;
  if (sideA === "bottom") {
    if (offsetParent.nodeName === "HTML") {
      top = -offsetParent.clientHeight + offsets.bottom;
    } else {
      top = -offsetParentRect.height + offsets.bottom;
    }
  } else {
    top = offsets.top;
  }
  if (sideB === "right") {
    if (offsetParent.nodeName === "HTML") {
      left = -offsetParent.clientWidth + offsets.right;
    } else {
      left = -offsetParentRect.width + offsets.right;
    }
  } else {
    left = offsets.left;
  }
  if (gpuAcceleration && prefixedProperty) {
    styles[prefixedProperty] = "translate3d(" + left + "px, " + top + "px, 0)";
    styles[sideA] = 0;
    styles[sideB] = 0;
    styles.willChange = "transform";
  } else {
    var invertTop = sideA === "bottom" ? -1 : 1;
    var invertLeft = sideB === "right" ? -1 : 1;
    styles[sideA] = top * invertTop;
    styles[sideB] = left * invertLeft;
    styles.willChange = sideA + ", " + sideB;
  }
  var attributes = {
    "x-placement": data.placement
  };
  data.attributes = _extends({}, attributes, data.attributes);
  data.styles = _extends({}, styles, data.styles);
  data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);
  return data;
}
function isModifierRequired(modifiers2, requestingName, requestedName) {
  var requesting = find(modifiers2, function(_ref) {
    var name = _ref.name;
    return name === requestingName;
  });
  var isRequired = !!requesting && modifiers2.some(function(modifier) {
    return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
  });
  if (!isRequired) {
    var _requesting = "`" + requestingName + "`";
    var requested = "`" + requestedName + "`";
    console.warn(requested + " modifier is required by " + _requesting + " modifier in order to work, be sure to include it before " + _requesting + "!");
  }
  return isRequired;
}
function arrow(data, options) {
  var _data$offsets$arrow;
  if (!isModifierRequired(data.instance.modifiers, "arrow", "keepTogether")) {
    return data;
  }
  var arrowElement = options.element;
  if (typeof arrowElement === "string") {
    arrowElement = data.instance.popper.querySelector(arrowElement);
    if (!arrowElement) {
      return data;
    }
  } else {
    if (!data.instance.popper.contains(arrowElement)) {
      console.warn("WARNING: `arrow.element` must be child of its popper element!");
      return data;
    }
  }
  var placement = data.placement.split("-")[0];
  var _data$offsets = data.offsets, popper = _data$offsets.popper, reference = _data$offsets.reference;
  var isVertical = ["left", "right"].indexOf(placement) !== -1;
  var len = isVertical ? "height" : "width";
  var sideCapitalized = isVertical ? "Top" : "Left";
  var side = sideCapitalized.toLowerCase();
  var altSide = isVertical ? "left" : "top";
  var opSide = isVertical ? "bottom" : "right";
  var arrowElementSize = getOuterSizes(arrowElement)[len];
  if (reference[opSide] - arrowElementSize < popper[side]) {
    data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
  }
  if (reference[side] + arrowElementSize > popper[opSide]) {
    data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
  }
  data.offsets.popper = getClientRect(data.offsets.popper);
  var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;
  var css = getStyleComputedProperty(data.instance.popper);
  var popperMarginSide = parseFloat(css["margin" + sideCapitalized]);
  var popperBorderSide = parseFloat(css["border" + sideCapitalized + "Width"]);
  var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;
  sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);
  data.arrowElement = arrowElement;
  data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ""), _data$offsets$arrow);
  return data;
}
function getOppositeVariation(variation) {
  if (variation === "end") {
    return "start";
  } else if (variation === "start") {
    return "end";
  }
  return variation;
}
function clockwise(placement) {
  var counter = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
  var index = validPlacements.indexOf(placement);
  var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
  return counter ? arr.reverse() : arr;
}
function flip(data, options) {
  if (isModifierEnabled(data.instance.modifiers, "inner")) {
    return data;
  }
  if (data.flipped && data.placement === data.originalPlacement) {
    return data;
  }
  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);
  var placement = data.placement.split("-")[0];
  var placementOpposite = getOppositePlacement(placement);
  var variation = data.placement.split("-")[1] || "";
  var flipOrder = [];
  switch (options.behavior) {
    case BEHAVIORS.FLIP:
      flipOrder = [placement, placementOpposite];
      break;
    case BEHAVIORS.CLOCKWISE:
      flipOrder = clockwise(placement);
      break;
    case BEHAVIORS.COUNTERCLOCKWISE:
      flipOrder = clockwise(placement, true);
      break;
    default:
      flipOrder = options.behavior;
  }
  flipOrder.forEach(function(step, index) {
    if (placement !== step || flipOrder.length === index + 1) {
      return data;
    }
    placement = data.placement.split("-")[0];
    placementOpposite = getOppositePlacement(placement);
    var popperOffsets = data.offsets.popper;
    var refOffsets = data.offsets.reference;
    var floor = Math.floor;
    var overlapsRef = placement === "left" && floor(popperOffsets.right) > floor(refOffsets.left) || placement === "right" && floor(popperOffsets.left) < floor(refOffsets.right) || placement === "top" && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === "bottom" && floor(popperOffsets.top) < floor(refOffsets.bottom);
    var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
    var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
    var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
    var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);
    var overflowsBoundaries = placement === "left" && overflowsLeft || placement === "right" && overflowsRight || placement === "top" && overflowsTop || placement === "bottom" && overflowsBottom;
    var isVertical = ["top", "bottom"].indexOf(placement) !== -1;
    var flippedVariationByRef = !!options.flipVariations && (isVertical && variation === "start" && overflowsLeft || isVertical && variation === "end" && overflowsRight || !isVertical && variation === "start" && overflowsTop || !isVertical && variation === "end" && overflowsBottom);
    var flippedVariationByContent = !!options.flipVariationsByContent && (isVertical && variation === "start" && overflowsRight || isVertical && variation === "end" && overflowsLeft || !isVertical && variation === "start" && overflowsBottom || !isVertical && variation === "end" && overflowsTop);
    var flippedVariation = flippedVariationByRef || flippedVariationByContent;
    if (overlapsRef || overflowsBoundaries || flippedVariation) {
      data.flipped = true;
      if (overlapsRef || overflowsBoundaries) {
        placement = flipOrder[index + 1];
      }
      if (flippedVariation) {
        variation = getOppositeVariation(variation);
      }
      data.placement = placement + (variation ? "-" + variation : "");
      data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));
      data = runModifiers(data.instance.modifiers, data, "flip");
    }
  });
  return data;
}
function keepTogether(data) {
  var _data$offsets = data.offsets, popper = _data$offsets.popper, reference = _data$offsets.reference;
  var placement = data.placement.split("-")[0];
  var floor = Math.floor;
  var isVertical = ["top", "bottom"].indexOf(placement) !== -1;
  var side = isVertical ? "right" : "bottom";
  var opSide = isVertical ? "left" : "top";
  var measurement = isVertical ? "width" : "height";
  if (popper[side] < floor(reference[opSide])) {
    data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
  }
  if (popper[opSide] > floor(reference[side])) {
    data.offsets.popper[opSide] = floor(reference[side]);
  }
  return data;
}
function toValue(str, measurement, popperOffsets, referenceOffsets) {
  var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
  var value = +split[1];
  var unit = split[2];
  if (!value) {
    return str;
  }
  if (unit.indexOf("%") === 0) {
    var element = void 0;
    switch (unit) {
      case "%p":
        element = popperOffsets;
        break;
      case "%":
      case "%r":
      default:
        element = referenceOffsets;
    }
    var rect = getClientRect(element);
    return rect[measurement] / 100 * value;
  } else if (unit === "vh" || unit === "vw") {
    var size = void 0;
    if (unit === "vh") {
      size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    } else {
      size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    }
    return size / 100 * value;
  } else {
    return value;
  }
}
function parseOffset(offset2, popperOffsets, referenceOffsets, basePlacement) {
  var offsets = [0, 0];
  var useHeight = ["right", "left"].indexOf(basePlacement) !== -1;
  var fragments = offset2.split(/(\+|\-)/).map(function(frag) {
    return frag.trim();
  });
  var divider = fragments.indexOf(find(fragments, function(frag) {
    return frag.search(/,|\s/) !== -1;
  }));
  if (fragments[divider] && fragments[divider].indexOf(",") === -1) {
    console.warn("Offsets separated by white space(s) are deprecated, use a comma (,) instead.");
  }
  var splitRegex = /\s*,\s*|\s+/;
  var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];
  ops = ops.map(function(op, index) {
    var measurement = (index === 1 ? !useHeight : useHeight) ? "height" : "width";
    var mergeWithPrevious = false;
    return op.reduce(function(a, b) {
      if (a[a.length - 1] === "" && ["+", "-"].indexOf(b) !== -1) {
        a[a.length - 1] = b;
        mergeWithPrevious = true;
        return a;
      } else if (mergeWithPrevious) {
        a[a.length - 1] += b;
        mergeWithPrevious = false;
        return a;
      } else {
        return a.concat(b);
      }
    }, []).map(function(str) {
      return toValue(str, measurement, popperOffsets, referenceOffsets);
    });
  });
  ops.forEach(function(op, index) {
    op.forEach(function(frag, index2) {
      if (isNumeric(frag)) {
        offsets[index] += frag * (op[index2 - 1] === "-" ? -1 : 1);
      }
    });
  });
  return offsets;
}
function offset(data, _ref) {
  var offset2 = _ref.offset;
  var placement = data.placement, _data$offsets = data.offsets, popper = _data$offsets.popper, reference = _data$offsets.reference;
  var basePlacement = placement.split("-")[0];
  var offsets = void 0;
  if (isNumeric(+offset2)) {
    offsets = [+offset2, 0];
  } else {
    offsets = parseOffset(offset2, popper, reference, basePlacement);
  }
  if (basePlacement === "left") {
    popper.top += offsets[0];
    popper.left -= offsets[1];
  } else if (basePlacement === "right") {
    popper.top += offsets[0];
    popper.left += offsets[1];
  } else if (basePlacement === "top") {
    popper.left += offsets[0];
    popper.top -= offsets[1];
  } else if (basePlacement === "bottom") {
    popper.left += offsets[0];
    popper.top += offsets[1];
  }
  data.popper = popper;
  return data;
}
function preventOverflow(data, options) {
  var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);
  if (data.instance.reference === boundariesElement) {
    boundariesElement = getOffsetParent(boundariesElement);
  }
  var transformProp = getSupportedPropertyName("transform");
  var popperStyles = data.instance.popper.style;
  var top = popperStyles.top, left = popperStyles.left, transform = popperStyles[transformProp];
  popperStyles.top = "";
  popperStyles.left = "";
  popperStyles[transformProp] = "";
  var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed);
  popperStyles.top = top;
  popperStyles.left = left;
  popperStyles[transformProp] = transform;
  options.boundaries = boundaries;
  var order = options.priority;
  var popper = data.offsets.popper;
  var check = {
    primary: function primary(placement) {
      var value = popper[placement];
      if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
        value = Math.max(popper[placement], boundaries[placement]);
      }
      return defineProperty({}, placement, value);
    },
    secondary: function secondary(placement) {
      var mainSide = placement === "right" ? "left" : "top";
      var value = popper[mainSide];
      if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
        value = Math.min(popper[mainSide], boundaries[placement] - (placement === "right" ? popper.width : popper.height));
      }
      return defineProperty({}, mainSide, value);
    }
  };
  order.forEach(function(placement) {
    var side = ["left", "top"].indexOf(placement) !== -1 ? "primary" : "secondary";
    popper = _extends({}, popper, check[side](placement));
  });
  data.offsets.popper = popper;
  return data;
}
function shift(data) {
  var placement = data.placement;
  var basePlacement = placement.split("-")[0];
  var shiftvariation = placement.split("-")[1];
  if (shiftvariation) {
    var _data$offsets = data.offsets, reference = _data$offsets.reference, popper = _data$offsets.popper;
    var isVertical = ["bottom", "top"].indexOf(basePlacement) !== -1;
    var side = isVertical ? "left" : "top";
    var measurement = isVertical ? "width" : "height";
    var shiftOffsets = {
      start: defineProperty({}, side, reference[side]),
      end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
    };
    data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
  }
  return data;
}
function hide(data) {
  if (!isModifierRequired(data.instance.modifiers, "hide", "preventOverflow")) {
    return data;
  }
  var refRect = data.offsets.reference;
  var bound = find(data.instance.modifiers, function(modifier) {
    return modifier.name === "preventOverflow";
  }).boundaries;
  if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
    if (data.hide === true) {
      return data;
    }
    data.hide = true;
    data.attributes["x-out-of-boundaries"] = "";
  } else {
    if (data.hide === false) {
      return data;
    }
    data.hide = false;
    data.attributes["x-out-of-boundaries"] = false;
  }
  return data;
}
function inner(data) {
  var placement = data.placement;
  var basePlacement = placement.split("-")[0];
  var _data$offsets = data.offsets, popper = _data$offsets.popper, reference = _data$offsets.reference;
  var isHoriz = ["left", "right"].indexOf(basePlacement) !== -1;
  var subtractLength = ["top", "left"].indexOf(basePlacement) === -1;
  popper[isHoriz ? "left" : "top"] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? "width" : "height"] : 0);
  data.placement = getOppositePlacement(placement);
  data.offsets.popper = getClientRect(popper);
  return data;
}
var isBrowser, timeoutDuration, supportsMicroTasks, debounce, isIE11, isIE10, classCallCheck, createClass, defineProperty, _extends, isFirefox, placements, validPlacements, BEHAVIORS, modifiers, Defaults, Popper, popper_default;
var init_popper = __esm({
  "node_modules/popper.js/dist/esm/popper.js"() {
    isBrowser = typeof window !== "undefined" && typeof document !== "undefined" && typeof navigator !== "undefined";
    timeoutDuration = function() {
      var longerTimeoutBrowsers = ["Edge", "Trident", "Firefox"];
      for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
        if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
          return 1;
        }
      }
      return 0;
    }();
    supportsMicroTasks = isBrowser && window.Promise;
    debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;
    isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
    isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);
    classCallCheck = function(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    };
    createClass = function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps)
          defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    defineProperty = function(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }
      return obj;
    };
    _extends = Object.assign || function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    isFirefox = isBrowser && /Firefox/i.test(navigator.userAgent);
    placements = ["auto-start", "auto", "auto-end", "top-start", "top", "top-end", "right-start", "right", "right-end", "bottom-end", "bottom", "bottom-start", "left-end", "left", "left-start"];
    validPlacements = placements.slice(3);
    BEHAVIORS = {
      FLIP: "flip",
      CLOCKWISE: "clockwise",
      COUNTERCLOCKWISE: "counterclockwise"
    };
    modifiers = {
      shift: {
        order: 100,
        enabled: true,
        fn: shift
      },
      offset: {
        order: 200,
        enabled: true,
        fn: offset,
        offset: 0
      },
      preventOverflow: {
        order: 300,
        enabled: true,
        fn: preventOverflow,
        priority: ["left", "right", "top", "bottom"],
        padding: 5,
        boundariesElement: "scrollParent"
      },
      keepTogether: {
        order: 400,
        enabled: true,
        fn: keepTogether
      },
      arrow: {
        order: 500,
        enabled: true,
        fn: arrow,
        element: "[x-arrow]"
      },
      flip: {
        order: 600,
        enabled: true,
        fn: flip,
        behavior: "flip",
        padding: 5,
        boundariesElement: "viewport",
        flipVariations: false,
        flipVariationsByContent: false
      },
      inner: {
        order: 700,
        enabled: false,
        fn: inner
      },
      hide: {
        order: 800,
        enabled: true,
        fn: hide
      },
      computeStyle: {
        order: 850,
        enabled: true,
        fn: computeStyle,
        gpuAcceleration: true,
        x: "bottom",
        y: "right"
      },
      applyStyle: {
        order: 900,
        enabled: true,
        fn: applyStyle,
        onLoad: applyStyleOnLoad,
        gpuAcceleration: void 0
      }
    };
    Defaults = {
      placement: "bottom",
      positionFixed: false,
      eventsEnabled: true,
      removeOnDestroy: false,
      onCreate: function onCreate() {
      },
      onUpdate: function onUpdate() {
      },
      modifiers
    };
    Popper = function() {
      function Popper2(reference, popper) {
        var _this = this;
        var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
        classCallCheck(this, Popper2);
        this.scheduleUpdate = function() {
          return requestAnimationFrame(_this.update);
        };
        this.update = debounce(this.update.bind(this));
        this.options = _extends({}, Popper2.Defaults, options);
        this.state = {
          isDestroyed: false,
          isCreated: false,
          scrollParents: []
        };
        this.reference = reference && reference.jquery ? reference[0] : reference;
        this.popper = popper && popper.jquery ? popper[0] : popper;
        this.options.modifiers = {};
        Object.keys(_extends({}, Popper2.Defaults.modifiers, options.modifiers)).forEach(function(name) {
          _this.options.modifiers[name] = _extends({}, Popper2.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
        });
        this.modifiers = Object.keys(this.options.modifiers).map(function(name) {
          return _extends({
            name
          }, _this.options.modifiers[name]);
        }).sort(function(a, b) {
          return a.order - b.order;
        });
        this.modifiers.forEach(function(modifierOptions) {
          if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
            modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
          }
        });
        this.update();
        var eventsEnabled = this.options.eventsEnabled;
        if (eventsEnabled) {
          this.enableEventListeners();
        }
        this.state.eventsEnabled = eventsEnabled;
      }
      createClass(Popper2, [{
        key: "update",
        value: function update$$1() {
          return update.call(this);
        }
      }, {
        key: "destroy",
        value: function destroy$$1() {
          return destroy.call(this);
        }
      }, {
        key: "enableEventListeners",
        value: function enableEventListeners$$1() {
          return enableEventListeners.call(this);
        }
      }, {
        key: "disableEventListeners",
        value: function disableEventListeners$$1() {
          return disableEventListeners.call(this);
        }
      }]);
      return Popper2;
    }();
    Popper.Utils = (typeof window !== "undefined" ? window : global).PopperUtils;
    Popper.placements = placements;
    Popper.Defaults = Defaults;
    popper_default = Popper;
  }
});

// node_modules/bootstrap/js/dist/util.js
var require_util = __commonJS({
  "node_modules/bootstrap/js/dist/util.js"(exports, module) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require_jquery()) : typeof define === "function" && define.amd ? define(["jquery"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, global2.Util = factory(global2.jQuery));
    })(exports, function($) {
      "use strict";
      function _interopDefaultLegacy(e) {
        return e && typeof e === "object" && "default" in e ? e : { "default": e };
      }
      var $__default = _interopDefaultLegacy($);
      var TRANSITION_END = "transitionend";
      var MAX_UID = 1e6;
      var MILLISECONDS_MULTIPLIER = 1e3;
      function toType(obj) {
        if (obj === null || typeof obj === "undefined") {
          return "" + obj;
        }
        return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
      }
      function getSpecialTransitionEndEvent() {
        return {
          bindType: TRANSITION_END,
          delegateType: TRANSITION_END,
          handle: function handle(event) {
            if ($__default["default"](event.target).is(this)) {
              return event.handleObj.handler.apply(this, arguments);
            }
            return void 0;
          }
        };
      }
      function transitionEndEmulator(duration) {
        var _this = this;
        var called = false;
        $__default["default"](this).one(Util.TRANSITION_END, function() {
          called = true;
        });
        setTimeout(function() {
          if (!called) {
            Util.triggerTransitionEnd(_this);
          }
        }, duration);
        return this;
      }
      function setTransitionEndSupport() {
        $__default["default"].fn.emulateTransitionEnd = transitionEndEmulator;
        $__default["default"].event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
      }
      var Util = {
        TRANSITION_END: "bsTransitionEnd",
        getUID: function getUID(prefix) {
          do {
            prefix += ~~(Math.random() * MAX_UID);
          } while (document.getElementById(prefix));
          return prefix;
        },
        getSelectorFromElement: function getSelectorFromElement(element) {
          var selector = element.getAttribute("data-target");
          if (!selector || selector === "#") {
            var hrefAttr = element.getAttribute("href");
            selector = hrefAttr && hrefAttr !== "#" ? hrefAttr.trim() : "";
          }
          try {
            return document.querySelector(selector) ? selector : null;
          } catch (_) {
            return null;
          }
        },
        getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
          if (!element) {
            return 0;
          }
          var transitionDuration = $__default["default"](element).css("transition-duration");
          var transitionDelay = $__default["default"](element).css("transition-delay");
          var floatTransitionDuration = parseFloat(transitionDuration);
          var floatTransitionDelay = parseFloat(transitionDelay);
          if (!floatTransitionDuration && !floatTransitionDelay) {
            return 0;
          }
          transitionDuration = transitionDuration.split(",")[0];
          transitionDelay = transitionDelay.split(",")[0];
          return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
        },
        reflow: function reflow(element) {
          return element.offsetHeight;
        },
        triggerTransitionEnd: function triggerTransitionEnd(element) {
          $__default["default"](element).trigger(TRANSITION_END);
        },
        supportsTransitionEnd: function supportsTransitionEnd() {
          return Boolean(TRANSITION_END);
        },
        isElement: function isElement(obj) {
          return (obj[0] || obj).nodeType;
        },
        typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
          for (var property in configTypes) {
            if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
              var expectedTypes = configTypes[property];
              var value = config[property];
              var valueType = value && Util.isElement(value) ? "element" : toType(value);
              if (!new RegExp(expectedTypes).test(valueType)) {
                throw new Error(componentName.toUpperCase() + ": " + ('Option "' + property + '" provided type "' + valueType + '" ') + ('but expected type "' + expectedTypes + '".'));
              }
            }
          }
        },
        findShadowRoot: function findShadowRoot(element) {
          if (!document.documentElement.attachShadow) {
            return null;
          }
          if (typeof element.getRootNode === "function") {
            var root = element.getRootNode();
            return root instanceof ShadowRoot ? root : null;
          }
          if (element instanceof ShadowRoot) {
            return element;
          }
          if (!element.parentNode) {
            return null;
          }
          return Util.findShadowRoot(element.parentNode);
        },
        jQueryDetection: function jQueryDetection() {
          if (typeof $__default["default"] === "undefined") {
            throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
          }
          var version = $__default["default"].fn.jquery.split(" ")[0].split(".");
          var minMajor = 1;
          var ltMajor = 2;
          var minMinor = 9;
          var minPatch = 1;
          var maxMajor = 4;
          if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {
            throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0");
          }
        }
      };
      Util.jQueryDetection();
      setTransitionEndSupport();
      return Util;
    });
  }
});

// node_modules/bootstrap/js/dist/tooltip.js
var require_tooltip = __commonJS({
  "node_modules/bootstrap/js/dist/tooltip.js"(exports, module) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory(require_jquery(), (init_popper(), __toCommonJS(popper_exports)), require_util()) : typeof define === "function" && define.amd ? define(["jquery", "popper.js", "./util"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, global2.Tooltip = factory(global2.jQuery, global2.Popper, global2.Util));
    })(exports, function($, Popper2, Util) {
      "use strict";
      function _interopDefaultLegacy(e) {
        return e && typeof e === "object" && "default" in e ? e : { "default": e };
      }
      var $__default = _interopDefaultLegacy($);
      var Popper__default = _interopDefaultLegacy(Popper2);
      var Util__default = _interopDefaultLegacy(Util);
      function _defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor)
            descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      function _createClass(Constructor, protoProps, staticProps) {
        if (protoProps)
          _defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
          _defineProperties(Constructor, staticProps);
        Object.defineProperty(Constructor, "prototype", {
          writable: false
        });
        return Constructor;
      }
      function _extends2() {
        _extends2 = Object.assign ? Object.assign.bind() : function(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }
          return target;
        };
        return _extends2.apply(this, arguments);
      }
      var uriAttrs = ["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"];
      var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
      var DefaultWhitelist = {
        "*": ["class", "dir", "id", "lang", "role", ARIA_ATTRIBUTE_PATTERN],
        a: ["target", "href", "title", "rel"],
        area: [],
        b: [],
        br: [],
        col: [],
        code: [],
        div: [],
        em: [],
        hr: [],
        h1: [],
        h2: [],
        h3: [],
        h4: [],
        h5: [],
        h6: [],
        i: [],
        img: ["src", "srcset", "alt", "title", "width", "height"],
        li: [],
        ol: [],
        p: [],
        pre: [],
        s: [],
        small: [],
        span: [],
        sub: [],
        sup: [],
        strong: [],
        u: [],
        ul: []
      };
      var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file|sms):|[^#&/:?]*(?:[#/?]|$))/i;
      var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;
      function allowedAttribute(attr, allowedAttributeList) {
        var attrName = attr.nodeName.toLowerCase();
        if (allowedAttributeList.indexOf(attrName) !== -1) {
          if (uriAttrs.indexOf(attrName) !== -1) {
            return Boolean(SAFE_URL_PATTERN.test(attr.nodeValue) || DATA_URL_PATTERN.test(attr.nodeValue));
          }
          return true;
        }
        var regExp = allowedAttributeList.filter(function(attrRegex) {
          return attrRegex instanceof RegExp;
        });
        for (var i = 0, len = regExp.length; i < len; i++) {
          if (regExp[i].test(attrName)) {
            return true;
          }
        }
        return false;
      }
      function sanitizeHtml(unsafeHtml, whiteList, sanitizeFn) {
        if (unsafeHtml.length === 0) {
          return unsafeHtml;
        }
        if (sanitizeFn && typeof sanitizeFn === "function") {
          return sanitizeFn(unsafeHtml);
        }
        var domParser = new window.DOMParser();
        var createdDocument = domParser.parseFromString(unsafeHtml, "text/html");
        var whitelistKeys = Object.keys(whiteList);
        var elements = [].slice.call(createdDocument.body.querySelectorAll("*"));
        var _loop = function _loop2(i2, len2) {
          var el = elements[i2];
          var elName = el.nodeName.toLowerCase();
          if (whitelistKeys.indexOf(el.nodeName.toLowerCase()) === -1) {
            el.parentNode.removeChild(el);
            return "continue";
          }
          var attributeList = [].slice.call(el.attributes);
          var whitelistedAttributes = [].concat(whiteList["*"] || [], whiteList[elName] || []);
          attributeList.forEach(function(attr) {
            if (!allowedAttribute(attr, whitelistedAttributes)) {
              el.removeAttribute(attr.nodeName);
            }
          });
        };
        for (var i = 0, len = elements.length; i < len; i++) {
          var _ret = _loop(i);
          if (_ret === "continue")
            continue;
        }
        return createdDocument.body.innerHTML;
      }
      var NAME = "tooltip";
      var VERSION = "4.6.2";
      var DATA_KEY = "bs.tooltip";
      var EVENT_KEY = "." + DATA_KEY;
      var JQUERY_NO_CONFLICT = $__default["default"].fn[NAME];
      var CLASS_PREFIX = "bs-tooltip";
      var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", "g");
      var DISALLOWED_ATTRIBUTES = ["sanitize", "whiteList", "sanitizeFn"];
      var CLASS_NAME_FADE = "fade";
      var CLASS_NAME_SHOW = "show";
      var HOVER_STATE_SHOW = "show";
      var HOVER_STATE_OUT = "out";
      var SELECTOR_TOOLTIP_INNER = ".tooltip-inner";
      var SELECTOR_ARROW = ".arrow";
      var TRIGGER_HOVER = "hover";
      var TRIGGER_FOCUS = "focus";
      var TRIGGER_CLICK = "click";
      var TRIGGER_MANUAL = "manual";
      var AttachmentMap = {
        AUTO: "auto",
        TOP: "top",
        RIGHT: "right",
        BOTTOM: "bottom",
        LEFT: "left"
      };
      var Default = {
        animation: true,
        template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: false,
        selector: false,
        placement: "top",
        offset: 0,
        container: false,
        fallbackPlacement: "flip",
        boundary: "scrollParent",
        customClass: "",
        sanitize: true,
        sanitizeFn: null,
        whiteList: DefaultWhitelist,
        popperConfig: null
      };
      var DefaultType = {
        animation: "boolean",
        template: "string",
        title: "(string|element|function)",
        trigger: "string",
        delay: "(number|object)",
        html: "boolean",
        selector: "(string|boolean)",
        placement: "(string|function)",
        offset: "(number|string|function)",
        container: "(string|element|boolean)",
        fallbackPlacement: "(string|array)",
        boundary: "(string|element)",
        customClass: "(string|function)",
        sanitize: "boolean",
        sanitizeFn: "(null|function)",
        whiteList: "object",
        popperConfig: "(null|object)"
      };
      var Event = {
        HIDE: "hide" + EVENT_KEY,
        HIDDEN: "hidden" + EVENT_KEY,
        SHOW: "show" + EVENT_KEY,
        SHOWN: "shown" + EVENT_KEY,
        INSERTED: "inserted" + EVENT_KEY,
        CLICK: "click" + EVENT_KEY,
        FOCUSIN: "focusin" + EVENT_KEY,
        FOCUSOUT: "focusout" + EVENT_KEY,
        MOUSEENTER: "mouseenter" + EVENT_KEY,
        MOUSELEAVE: "mouseleave" + EVENT_KEY
      };
      var Tooltip = function() {
        function Tooltip2(element, config) {
          if (typeof Popper__default["default"] === "undefined") {
            throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
          }
          this._isEnabled = true;
          this._timeout = 0;
          this._hoverState = "";
          this._activeTrigger = {};
          this._popper = null;
          this.element = element;
          this.config = this._getConfig(config);
          this.tip = null;
          this._setListeners();
        }
        var _proto = Tooltip2.prototype;
        _proto.enable = function enable() {
          this._isEnabled = true;
        };
        _proto.disable = function disable() {
          this._isEnabled = false;
        };
        _proto.toggleEnabled = function toggleEnabled() {
          this._isEnabled = !this._isEnabled;
        };
        _proto.toggle = function toggle(event) {
          if (!this._isEnabled) {
            return;
          }
          if (event) {
            var dataKey = this.constructor.DATA_KEY;
            var context = $__default["default"](event.currentTarget).data(dataKey);
            if (!context) {
              context = new this.constructor(event.currentTarget, this._getDelegateConfig());
              $__default["default"](event.currentTarget).data(dataKey, context);
            }
            context._activeTrigger.click = !context._activeTrigger.click;
            if (context._isWithActiveTrigger()) {
              context._enter(null, context);
            } else {
              context._leave(null, context);
            }
          } else {
            if ($__default["default"](this.getTipElement()).hasClass(CLASS_NAME_SHOW)) {
              this._leave(null, this);
              return;
            }
            this._enter(null, this);
          }
        };
        _proto.dispose = function dispose() {
          clearTimeout(this._timeout);
          $__default["default"].removeData(this.element, this.constructor.DATA_KEY);
          $__default["default"](this.element).off(this.constructor.EVENT_KEY);
          $__default["default"](this.element).closest(".modal").off("hide.bs.modal", this._hideModalHandler);
          if (this.tip) {
            $__default["default"](this.tip).remove();
          }
          this._isEnabled = null;
          this._timeout = null;
          this._hoverState = null;
          this._activeTrigger = null;
          if (this._popper) {
            this._popper.destroy();
          }
          this._popper = null;
          this.element = null;
          this.config = null;
          this.tip = null;
        };
        _proto.show = function show() {
          var _this = this;
          if ($__default["default"](this.element).css("display") === "none") {
            throw new Error("Please use show on visible elements");
          }
          var showEvent = $__default["default"].Event(this.constructor.Event.SHOW);
          if (this.isWithContent() && this._isEnabled) {
            $__default["default"](this.element).trigger(showEvent);
            var shadowRoot = Util__default["default"].findShadowRoot(this.element);
            var isInTheDom = $__default["default"].contains(shadowRoot !== null ? shadowRoot : this.element.ownerDocument.documentElement, this.element);
            if (showEvent.isDefaultPrevented() || !isInTheDom) {
              return;
            }
            var tip = this.getTipElement();
            var tipId = Util__default["default"].getUID(this.constructor.NAME);
            tip.setAttribute("id", tipId);
            this.element.setAttribute("aria-describedby", tipId);
            this.setContent();
            if (this.config.animation) {
              $__default["default"](tip).addClass(CLASS_NAME_FADE);
            }
            var placement = typeof this.config.placement === "function" ? this.config.placement.call(this, tip, this.element) : this.config.placement;
            var attachment = this._getAttachment(placement);
            this.addAttachmentClass(attachment);
            var container = this._getContainer();
            $__default["default"](tip).data(this.constructor.DATA_KEY, this);
            if (!$__default["default"].contains(this.element.ownerDocument.documentElement, this.tip)) {
              $__default["default"](tip).appendTo(container);
            }
            $__default["default"](this.element).trigger(this.constructor.Event.INSERTED);
            this._popper = new Popper__default["default"](this.element, tip, this._getPopperConfig(attachment));
            $__default["default"](tip).addClass(CLASS_NAME_SHOW);
            $__default["default"](tip).addClass(this.config.customClass);
            if ("ontouchstart" in document.documentElement) {
              $__default["default"](document.body).children().on("mouseover", null, $__default["default"].noop);
            }
            var complete = function complete2() {
              if (_this.config.animation) {
                _this._fixTransition();
              }
              var prevHoverState = _this._hoverState;
              _this._hoverState = null;
              $__default["default"](_this.element).trigger(_this.constructor.Event.SHOWN);
              if (prevHoverState === HOVER_STATE_OUT) {
                _this._leave(null, _this);
              }
            };
            if ($__default["default"](this.tip).hasClass(CLASS_NAME_FADE)) {
              var transitionDuration = Util__default["default"].getTransitionDurationFromElement(this.tip);
              $__default["default"](this.tip).one(Util__default["default"].TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
            } else {
              complete();
            }
          }
        };
        _proto.hide = function hide2(callback) {
          var _this2 = this;
          var tip = this.getTipElement();
          var hideEvent = $__default["default"].Event(this.constructor.Event.HIDE);
          var complete = function complete2() {
            if (_this2._hoverState !== HOVER_STATE_SHOW && tip.parentNode) {
              tip.parentNode.removeChild(tip);
            }
            _this2._cleanTipClass();
            _this2.element.removeAttribute("aria-describedby");
            $__default["default"](_this2.element).trigger(_this2.constructor.Event.HIDDEN);
            if (_this2._popper !== null) {
              _this2._popper.destroy();
            }
            if (callback) {
              callback();
            }
          };
          $__default["default"](this.element).trigger(hideEvent);
          if (hideEvent.isDefaultPrevented()) {
            return;
          }
          $__default["default"](tip).removeClass(CLASS_NAME_SHOW);
          if ("ontouchstart" in document.documentElement) {
            $__default["default"](document.body).children().off("mouseover", null, $__default["default"].noop);
          }
          this._activeTrigger[TRIGGER_CLICK] = false;
          this._activeTrigger[TRIGGER_FOCUS] = false;
          this._activeTrigger[TRIGGER_HOVER] = false;
          if ($__default["default"](this.tip).hasClass(CLASS_NAME_FADE)) {
            var transitionDuration = Util__default["default"].getTransitionDurationFromElement(tip);
            $__default["default"](tip).one(Util__default["default"].TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
          } else {
            complete();
          }
          this._hoverState = "";
        };
        _proto.update = function update2() {
          if (this._popper !== null) {
            this._popper.scheduleUpdate();
          }
        };
        _proto.isWithContent = function isWithContent() {
          return Boolean(this.getTitle());
        };
        _proto.addAttachmentClass = function addAttachmentClass(attachment) {
          $__default["default"](this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
        };
        _proto.getTipElement = function getTipElement() {
          this.tip = this.tip || $__default["default"](this.config.template)[0];
          return this.tip;
        };
        _proto.setContent = function setContent() {
          var tip = this.getTipElement();
          this.setElementContent($__default["default"](tip.querySelectorAll(SELECTOR_TOOLTIP_INNER)), this.getTitle());
          $__default["default"](tip).removeClass(CLASS_NAME_FADE + " " + CLASS_NAME_SHOW);
        };
        _proto.setElementContent = function setElementContent($element, content) {
          if (typeof content === "object" && (content.nodeType || content.jquery)) {
            if (this.config.html) {
              if (!$__default["default"](content).parent().is($element)) {
                $element.empty().append(content);
              }
            } else {
              $element.text($__default["default"](content).text());
            }
            return;
          }
          if (this.config.html) {
            if (this.config.sanitize) {
              content = sanitizeHtml(content, this.config.whiteList, this.config.sanitizeFn);
            }
            $element.html(content);
          } else {
            $element.text(content);
          }
        };
        _proto.getTitle = function getTitle() {
          var title = this.element.getAttribute("data-original-title");
          if (!title) {
            title = typeof this.config.title === "function" ? this.config.title.call(this.element) : this.config.title;
          }
          return title;
        };
        _proto._getPopperConfig = function _getPopperConfig(attachment) {
          var _this3 = this;
          var defaultBsConfig = {
            placement: attachment,
            modifiers: {
              offset: this._getOffset(),
              flip: {
                behavior: this.config.fallbackPlacement
              },
              arrow: {
                element: SELECTOR_ARROW
              },
              preventOverflow: {
                boundariesElement: this.config.boundary
              }
            },
            onCreate: function onCreate2(data) {
              if (data.originalPlacement !== data.placement) {
                _this3._handlePopperPlacementChange(data);
              }
            },
            onUpdate: function onUpdate2(data) {
              return _this3._handlePopperPlacementChange(data);
            }
          };
          return _extends2({}, defaultBsConfig, this.config.popperConfig);
        };
        _proto._getOffset = function _getOffset() {
          var _this4 = this;
          var offset2 = {};
          if (typeof this.config.offset === "function") {
            offset2.fn = function(data) {
              data.offsets = _extends2({}, data.offsets, _this4.config.offset(data.offsets, _this4.element));
              return data;
            };
          } else {
            offset2.offset = this.config.offset;
          }
          return offset2;
        };
        _proto._getContainer = function _getContainer() {
          if (this.config.container === false) {
            return document.body;
          }
          if (Util__default["default"].isElement(this.config.container)) {
            return $__default["default"](this.config.container);
          }
          return $__default["default"](document).find(this.config.container);
        };
        _proto._getAttachment = function _getAttachment(placement) {
          return AttachmentMap[placement.toUpperCase()];
        };
        _proto._setListeners = function _setListeners() {
          var _this5 = this;
          var triggers = this.config.trigger.split(" ");
          triggers.forEach(function(trigger) {
            if (trigger === "click") {
              $__default["default"](_this5.element).on(_this5.constructor.Event.CLICK, _this5.config.selector, function(event) {
                return _this5.toggle(event);
              });
            } else if (trigger !== TRIGGER_MANUAL) {
              var eventIn = trigger === TRIGGER_HOVER ? _this5.constructor.Event.MOUSEENTER : _this5.constructor.Event.FOCUSIN;
              var eventOut = trigger === TRIGGER_HOVER ? _this5.constructor.Event.MOUSELEAVE : _this5.constructor.Event.FOCUSOUT;
              $__default["default"](_this5.element).on(eventIn, _this5.config.selector, function(event) {
                return _this5._enter(event);
              }).on(eventOut, _this5.config.selector, function(event) {
                return _this5._leave(event);
              });
            }
          });
          this._hideModalHandler = function() {
            if (_this5.element) {
              _this5.hide();
            }
          };
          $__default["default"](this.element).closest(".modal").on("hide.bs.modal", this._hideModalHandler);
          if (this.config.selector) {
            this.config = _extends2({}, this.config, {
              trigger: "manual",
              selector: ""
            });
          } else {
            this._fixTitle();
          }
        };
        _proto._fixTitle = function _fixTitle() {
          var titleType = typeof this.element.getAttribute("data-original-title");
          if (this.element.getAttribute("title") || titleType !== "string") {
            this.element.setAttribute("data-original-title", this.element.getAttribute("title") || "");
            this.element.setAttribute("title", "");
          }
        };
        _proto._enter = function _enter(event, context) {
          var dataKey = this.constructor.DATA_KEY;
          context = context || $__default["default"](event.currentTarget).data(dataKey);
          if (!context) {
            context = new this.constructor(event.currentTarget, this._getDelegateConfig());
            $__default["default"](event.currentTarget).data(dataKey, context);
          }
          if (event) {
            context._activeTrigger[event.type === "focusin" ? TRIGGER_FOCUS : TRIGGER_HOVER] = true;
          }
          if ($__default["default"](context.getTipElement()).hasClass(CLASS_NAME_SHOW) || context._hoverState === HOVER_STATE_SHOW) {
            context._hoverState = HOVER_STATE_SHOW;
            return;
          }
          clearTimeout(context._timeout);
          context._hoverState = HOVER_STATE_SHOW;
          if (!context.config.delay || !context.config.delay.show) {
            context.show();
            return;
          }
          context._timeout = setTimeout(function() {
            if (context._hoverState === HOVER_STATE_SHOW) {
              context.show();
            }
          }, context.config.delay.show);
        };
        _proto._leave = function _leave(event, context) {
          var dataKey = this.constructor.DATA_KEY;
          context = context || $__default["default"](event.currentTarget).data(dataKey);
          if (!context) {
            context = new this.constructor(event.currentTarget, this._getDelegateConfig());
            $__default["default"](event.currentTarget).data(dataKey, context);
          }
          if (event) {
            context._activeTrigger[event.type === "focusout" ? TRIGGER_FOCUS : TRIGGER_HOVER] = false;
          }
          if (context._isWithActiveTrigger()) {
            return;
          }
          clearTimeout(context._timeout);
          context._hoverState = HOVER_STATE_OUT;
          if (!context.config.delay || !context.config.delay.hide) {
            context.hide();
            return;
          }
          context._timeout = setTimeout(function() {
            if (context._hoverState === HOVER_STATE_OUT) {
              context.hide();
            }
          }, context.config.delay.hide);
        };
        _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
          for (var trigger in this._activeTrigger) {
            if (this._activeTrigger[trigger]) {
              return true;
            }
          }
          return false;
        };
        _proto._getConfig = function _getConfig(config) {
          var dataAttributes = $__default["default"](this.element).data();
          Object.keys(dataAttributes).forEach(function(dataAttr) {
            if (DISALLOWED_ATTRIBUTES.indexOf(dataAttr) !== -1) {
              delete dataAttributes[dataAttr];
            }
          });
          config = _extends2({}, this.constructor.Default, dataAttributes, typeof config === "object" && config ? config : {});
          if (typeof config.delay === "number") {
            config.delay = {
              show: config.delay,
              hide: config.delay
            };
          }
          if (typeof config.title === "number") {
            config.title = config.title.toString();
          }
          if (typeof config.content === "number") {
            config.content = config.content.toString();
          }
          Util__default["default"].typeCheckConfig(NAME, config, this.constructor.DefaultType);
          if (config.sanitize) {
            config.template = sanitizeHtml(config.template, config.whiteList, config.sanitizeFn);
          }
          return config;
        };
        _proto._getDelegateConfig = function _getDelegateConfig() {
          var config = {};
          if (this.config) {
            for (var key in this.config) {
              if (this.constructor.Default[key] !== this.config[key]) {
                config[key] = this.config[key];
              }
            }
          }
          return config;
        };
        _proto._cleanTipClass = function _cleanTipClass() {
          var $tip = $__default["default"](this.getTipElement());
          var tabClass = $tip.attr("class").match(BSCLS_PREFIX_REGEX);
          if (tabClass !== null && tabClass.length) {
            $tip.removeClass(tabClass.join(""));
          }
        };
        _proto._handlePopperPlacementChange = function _handlePopperPlacementChange(popperData) {
          this.tip = popperData.instance.popper;
          this._cleanTipClass();
          this.addAttachmentClass(this._getAttachment(popperData.placement));
        };
        _proto._fixTransition = function _fixTransition() {
          var tip = this.getTipElement();
          var initConfigAnimation = this.config.animation;
          if (tip.getAttribute("x-placement") !== null) {
            return;
          }
          $__default["default"](tip).removeClass(CLASS_NAME_FADE);
          this.config.animation = false;
          this.hide();
          this.show();
          this.config.animation = initConfigAnimation;
        };
        Tooltip2._jQueryInterface = function _jQueryInterface(config) {
          return this.each(function() {
            var $element = $__default["default"](this);
            var data = $element.data(DATA_KEY);
            var _config = typeof config === "object" && config;
            if (!data && /dispose|hide/.test(config)) {
              return;
            }
            if (!data) {
              data = new Tooltip2(this, _config);
              $element.data(DATA_KEY, data);
            }
            if (typeof config === "string") {
              if (typeof data[config] === "undefined") {
                throw new TypeError('No method named "' + config + '"');
              }
              data[config]();
            }
          });
        };
        _createClass(Tooltip2, null, [{
          key: "VERSION",
          get: function get() {
            return VERSION;
          }
        }, {
          key: "Default",
          get: function get() {
            return Default;
          }
        }, {
          key: "NAME",
          get: function get() {
            return NAME;
          }
        }, {
          key: "DATA_KEY",
          get: function get() {
            return DATA_KEY;
          }
        }, {
          key: "Event",
          get: function get() {
            return Event;
          }
        }, {
          key: "EVENT_KEY",
          get: function get() {
            return EVENT_KEY;
          }
        }, {
          key: "DefaultType",
          get: function get() {
            return DefaultType;
          }
        }]);
        return Tooltip2;
      }();
      $__default["default"].fn[NAME] = Tooltip._jQueryInterface;
      $__default["default"].fn[NAME].Constructor = Tooltip;
      $__default["default"].fn[NAME].noConflict = function() {
        $__default["default"].fn[NAME] = JQUERY_NO_CONFLICT;
        return Tooltip._jQueryInterface;
      };
      return Tooltip;
    });
  }
});

// dep:bootstrap_js_dist_tooltip
var bootstrap_js_dist_tooltip_default = require_tooltip();
/*!
  * Bootstrap tooltip.js v4.6.2 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
/*!
  * Bootstrap util.js v4.6.2 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.16.1
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

export { bootstrap_js_dist_tooltip_default as default };
