"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb2, mod) => function __require() {
    return mod || (0, cb2[__getOwnPropNames(cb2)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/dom-to-image/src/dom-to-image.js
  var require_dom_to_image = __commonJS({
    "node_modules/dom-to-image/src/dom-to-image.js"(exports, module) {
      (function(global) {
        "use strict";
        var util = newUtil();
        var inliner = newInliner();
        var fontFaces = newFontFaces();
        var images = newImages();
        var defaultOptions = {
          // Default is to fail on error, no placeholder
          imagePlaceholder: void 0,
          // Default cache bust is false, it will use the cache
          cacheBust: false
        };
        var domtoimage2 = {
          toSvg,
          toPng,
          toJpeg,
          toBlob,
          toPixelData,
          impl: {
            fontFaces,
            images,
            util,
            inliner,
            options: {}
          }
        };
        if (typeof module !== "undefined")
          module.exports = domtoimage2;
        else
          global.domtoimage = domtoimage2;
        function toSvg(node, options) {
          options = options || {};
          copyOptions(options);
          return Promise.resolve(node).then(function(node2) {
            return cloneNode(node2, options.filter, true);
          }).then(embedFonts).then(inlineImages).then(applyOptions).then(function(clone) {
            return makeSvgDataUri(
              clone,
              options.width || util.width(node),
              options.height || util.height(node)
            );
          });
          function applyOptions(clone) {
            if (options.bgcolor)
              clone.style.backgroundColor = options.bgcolor;
            if (options.width)
              clone.style.width = options.width + "px";
            if (options.height)
              clone.style.height = options.height + "px";
            if (options.style)
              Object.keys(options.style).forEach(function(property) {
                clone.style[property] = options.style[property];
              });
            return clone;
          }
        }
        function toPixelData(node, options) {
          return draw(node, options || {}).then(function(canvas) {
            return canvas.getContext("2d").getImageData(
              0,
              0,
              util.width(node),
              util.height(node)
            ).data;
          });
        }
        function toPng(node, options) {
          return draw(node, options || {}).then(function(canvas) {
            return canvas.toDataURL();
          });
        }
        function toJpeg(node, options) {
          options = options || {};
          return draw(node, options).then(function(canvas) {
            return canvas.toDataURL("image/jpeg", options.quality || 1);
          });
        }
        function toBlob(node, options) {
          return draw(node, options || {}).then(util.canvasToBlob);
        }
        function copyOptions(options) {
          if (typeof options.imagePlaceholder === "undefined") {
            domtoimage2.impl.options.imagePlaceholder = defaultOptions.imagePlaceholder;
          } else {
            domtoimage2.impl.options.imagePlaceholder = options.imagePlaceholder;
          }
          if (typeof options.cacheBust === "undefined") {
            domtoimage2.impl.options.cacheBust = defaultOptions.cacheBust;
          } else {
            domtoimage2.impl.options.cacheBust = options.cacheBust;
          }
        }
        function draw(domNode, options) {
          return toSvg(domNode, options).then(util.makeImage).then(util.delay(100)).then(function(image) {
            var canvas = newCanvas(domNode);
            canvas.getContext("2d").drawImage(image, 0, 0);
            return canvas;
          });
          function newCanvas(domNode2) {
            var canvas = document.createElement("canvas");
            canvas.width = options.width || util.width(domNode2);
            canvas.height = options.height || util.height(domNode2);
            if (options.bgcolor) {
              var ctx = canvas.getContext("2d");
              ctx.fillStyle = options.bgcolor;
              ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
            return canvas;
          }
        }
        function cloneNode(node, filter, root) {
          if (!root && filter && !filter(node))
            return Promise.resolve();
          return Promise.resolve(node).then(makeNodeCopy).then(function(clone) {
            return cloneChildren(node, clone, filter);
          }).then(function(clone) {
            return processClone(node, clone);
          });
          function makeNodeCopy(node2) {
            if (node2 instanceof HTMLCanvasElement)
              return util.makeImage(node2.toDataURL());
            return node2.cloneNode(false);
          }
          function cloneChildren(original, clone, filter2) {
            var children = original.childNodes;
            if (children.length === 0)
              return Promise.resolve(clone);
            return cloneChildrenInOrder(clone, util.asArray(children), filter2).then(function() {
              return clone;
            });
            function cloneChildrenInOrder(parent, children2, filter3) {
              var done = Promise.resolve();
              children2.forEach(function(child) {
                done = done.then(function() {
                  return cloneNode(child, filter3);
                }).then(function(childClone) {
                  if (childClone)
                    parent.appendChild(childClone);
                });
              });
              return done;
            }
          }
          function processClone(original, clone) {
            if (!(clone instanceof Element))
              return clone;
            return Promise.resolve().then(cloneStyle).then(clonePseudoElements).then(copyUserInput).then(fixSvg).then(function() {
              return clone;
            });
            function cloneStyle() {
              copyStyle(window.getComputedStyle(original), clone.style);
              function copyStyle(source, target) {
                if (source.cssText)
                  target.cssText = source.cssText;
                else
                  copyProperties(source, target);
                function copyProperties(source2, target2) {
                  util.asArray(source2).forEach(function(name) {
                    target2.setProperty(
                      name,
                      source2.getPropertyValue(name),
                      source2.getPropertyPriority(name)
                    );
                  });
                }
              }
            }
            function clonePseudoElements() {
              [":before", ":after"].forEach(function(element) {
                clonePseudoElement(element);
              });
              function clonePseudoElement(element) {
                var style = window.getComputedStyle(original, element);
                var content = style.getPropertyValue("content");
                if (content === "" || content === "none")
                  return;
                var className = util.uid();
                clone.className = clone.className + " " + className;
                var styleElement = document.createElement("style");
                styleElement.appendChild(formatPseudoElementStyle(className, element, style));
                clone.appendChild(styleElement);
                function formatPseudoElementStyle(className2, element2, style2) {
                  var selector = "." + className2 + ":" + element2;
                  var cssText = style2.cssText ? formatCssText(style2) : formatCssProperties(style2);
                  return document.createTextNode(selector + "{" + cssText + "}");
                  function formatCssText(style3) {
                    var content2 = style3.getPropertyValue("content");
                    return style3.cssText + " content: " + content2 + ";";
                  }
                  function formatCssProperties(style3) {
                    return util.asArray(style3).map(formatProperty).join("; ") + ";";
                    function formatProperty(name) {
                      return name + ": " + style3.getPropertyValue(name) + (style3.getPropertyPriority(name) ? " !important" : "");
                    }
                  }
                }
              }
            }
            function copyUserInput() {
              if (original instanceof HTMLTextAreaElement)
                clone.innerHTML = original.value;
              if (original instanceof HTMLInputElement)
                clone.setAttribute("value", original.value);
            }
            function fixSvg() {
              if (!(clone instanceof SVGElement))
                return;
              clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
              if (!(clone instanceof SVGRectElement))
                return;
              ["width", "height"].forEach(function(attribute) {
                var value = clone.getAttribute(attribute);
                if (!value)
                  return;
                clone.style.setProperty(attribute, value);
              });
            }
          }
        }
        function embedFonts(node) {
          return fontFaces.resolveAll().then(function(cssText) {
            var styleNode = document.createElement("style");
            node.appendChild(styleNode);
            styleNode.appendChild(document.createTextNode(cssText));
            return node;
          });
        }
        function inlineImages(node) {
          return images.inlineAll(node).then(function() {
            return node;
          });
        }
        function makeSvgDataUri(node, width, height) {
          return Promise.resolve(node).then(function(node2) {
            node2.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
            return new XMLSerializer().serializeToString(node2);
          }).then(util.escapeXhtml).then(function(xhtml) {
            return '<foreignObject x="0" y="0" width="100%" height="100%">' + xhtml + "</foreignObject>";
          }).then(function(foreignObject) {
            return '<svg xmlns="http://www.w3.org/2000/svg" width="' + width + '" height="' + height + '">' + foreignObject + "</svg>";
          }).then(function(svg) {
            return "data:image/svg+xml;charset=utf-8," + svg;
          });
        }
        function newUtil() {
          return {
            escape,
            parseExtension,
            mimeType,
            dataAsUrl,
            isDataUrl,
            canvasToBlob,
            resolveUrl,
            getAndEncode,
            uid: uid(),
            delay,
            asArray,
            escapeXhtml,
            makeImage,
            width,
            height
          };
          function mimes() {
            var WOFF = "application/font-woff";
            var JPEG = "image/jpeg";
            return {
              "woff": WOFF,
              "woff2": WOFF,
              "ttf": "application/font-truetype",
              "eot": "application/vnd.ms-fontobject",
              "png": "image/png",
              "jpg": JPEG,
              "jpeg": JPEG,
              "gif": "image/gif",
              "tiff": "image/tiff",
              "svg": "image/svg+xml"
            };
          }
          function parseExtension(url) {
            var match = /\.([^\.\/]*?)$/g.exec(url);
            if (match)
              return match[1];
            else
              return "";
          }
          function mimeType(url) {
            var extension = parseExtension(url).toLowerCase();
            return mimes()[extension] || "";
          }
          function isDataUrl(url) {
            return url.search(/^(data:)/) !== -1;
          }
          function toBlob2(canvas) {
            return new Promise(function(resolve) {
              var binaryString = window.atob(canvas.toDataURL().split(",")[1]);
              var length2 = binaryString.length;
              var binaryArray = new Uint8Array(length2);
              for (var i = 0; i < length2; i++)
                binaryArray[i] = binaryString.charCodeAt(i);
              resolve(new Blob([binaryArray], {
                type: "image/png"
              }));
            });
          }
          function canvasToBlob(canvas) {
            if (canvas.toBlob)
              return new Promise(function(resolve) {
                canvas.toBlob(resolve);
              });
            return toBlob2(canvas);
          }
          function resolveUrl(url, baseUrl) {
            var doc = document.implementation.createHTMLDocument();
            var base = doc.createElement("base");
            doc.head.appendChild(base);
            var a = doc.createElement("a");
            doc.body.appendChild(a);
            base.href = baseUrl;
            a.href = url;
            return a.href;
          }
          function uid() {
            var index = 0;
            return function() {
              return "u" + fourRandomChars() + index++;
              function fourRandomChars() {
                return ("0000" + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
              }
            };
          }
          function makeImage(uri) {
            return new Promise(function(resolve, reject) {
              var image = new Image();
              image.onload = function() {
                resolve(image);
              };
              image.onerror = reject;
              image.src = uri;
            });
          }
          function getAndEncode(url) {
            var TIMEOUT = 3e4;
            if (domtoimage2.impl.options.cacheBust) {
              url += (/\?/.test(url) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime();
            }
            return new Promise(function(resolve) {
              var request = new XMLHttpRequest();
              request.onreadystatechange = done;
              request.ontimeout = timeout;
              request.responseType = "blob";
              request.timeout = TIMEOUT;
              request.open("GET", url, true);
              request.send();
              var placeholder;
              if (domtoimage2.impl.options.imagePlaceholder) {
                var split = domtoimage2.impl.options.imagePlaceholder.split(/,/);
                if (split && split[1]) {
                  placeholder = split[1];
                }
              }
              function done() {
                if (request.readyState !== 4)
                  return;
                if (request.status !== 200) {
                  if (placeholder) {
                    resolve(placeholder);
                  } else {
                    fail("cannot fetch resource: " + url + ", status: " + request.status);
                  }
                  return;
                }
                var encoder = new FileReader();
                encoder.onloadend = function() {
                  var content = encoder.result.split(/,/)[1];
                  resolve(content);
                };
                encoder.readAsDataURL(request.response);
              }
              function timeout() {
                if (placeholder) {
                  resolve(placeholder);
                } else {
                  fail("timeout of " + TIMEOUT + "ms occured while fetching resource: " + url);
                }
              }
              function fail(message) {
                console.error(message);
                resolve("");
              }
            });
          }
          function dataAsUrl(content, type) {
            return "data:" + type + ";base64," + content;
          }
          function escape(string) {
            return string.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
          }
          function delay(ms) {
            return function(arg) {
              return new Promise(function(resolve) {
                setTimeout(function() {
                  resolve(arg);
                }, ms);
              });
            };
          }
          function asArray(arrayLike) {
            var array = [];
            var length2 = arrayLike.length;
            for (var i = 0; i < length2; i++)
              array.push(arrayLike[i]);
            return array;
          }
          function escapeXhtml(string) {
            return string.replace(/#/g, "%23").replace(/\n/g, "%0A");
          }
          function width(node) {
            var leftBorder = px2(node, "border-left-width");
            var rightBorder = px2(node, "border-right-width");
            return node.scrollWidth + leftBorder + rightBorder;
          }
          function height(node) {
            var topBorder = px2(node, "border-top-width");
            var bottomBorder = px2(node, "border-bottom-width");
            return node.scrollHeight + topBorder + bottomBorder;
          }
          function px2(node, styleProperty) {
            var value = window.getComputedStyle(node).getPropertyValue(styleProperty);
            return parseFloat(value.replace("px", ""));
          }
        }
        function newInliner() {
          var URL_REGEX = /url\(['"]?([^'"]+?)['"]?\)/g;
          return {
            inlineAll,
            shouldProcess,
            impl: {
              readUrls,
              inline
            }
          };
          function shouldProcess(string) {
            return string.search(URL_REGEX) !== -1;
          }
          function readUrls(string) {
            var result = [];
            var match;
            while ((match = URL_REGEX.exec(string)) !== null) {
              result.push(match[1]);
            }
            return result.filter(function(url) {
              return !util.isDataUrl(url);
            });
          }
          function inline(string, url, baseUrl, get) {
            return Promise.resolve(url).then(function(url2) {
              return baseUrl ? util.resolveUrl(url2, baseUrl) : url2;
            }).then(get || util.getAndEncode).then(function(data) {
              return util.dataAsUrl(data, util.mimeType(url));
            }).then(function(dataUrl) {
              return string.replace(urlAsRegex(url), "$1" + dataUrl + "$3");
            });
            function urlAsRegex(url2) {
              return new RegExp(`(url\\(['"]?)(` + util.escape(url2) + `)(['"]?\\))`, "g");
            }
          }
          function inlineAll(string, baseUrl, get) {
            if (nothingToInline())
              return Promise.resolve(string);
            return Promise.resolve(string).then(readUrls).then(function(urls) {
              var done = Promise.resolve(string);
              urls.forEach(function(url) {
                done = done.then(function(string2) {
                  return inline(string2, url, baseUrl, get);
                });
              });
              return done;
            });
            function nothingToInline() {
              return !shouldProcess(string);
            }
          }
        }
        function newFontFaces() {
          return {
            resolveAll,
            impl: {
              readAll
            }
          };
          function resolveAll() {
            return readAll(document).then(function(webFonts) {
              return Promise.all(
                webFonts.map(function(webFont) {
                  return webFont.resolve();
                })
              );
            }).then(function(cssStrings) {
              return cssStrings.join("\n");
            });
          }
          function readAll() {
            return Promise.resolve(util.asArray(document.styleSheets)).then(getCssRules).then(selectWebFontRules).then(function(rules) {
              return rules.map(newWebFont);
            });
            function selectWebFontRules(cssRules) {
              return cssRules.filter(function(rule) {
                return rule.type === CSSRule.FONT_FACE_RULE;
              }).filter(function(rule) {
                return inliner.shouldProcess(rule.style.getPropertyValue("src"));
              });
            }
            function getCssRules(styleSheets) {
              var cssRules = [];
              styleSheets.forEach(function(sheet) {
                try {
                  util.asArray(sheet.cssRules || []).forEach(cssRules.push.bind(cssRules));
                } catch (e) {
                  console.log("Error while reading CSS rules from " + sheet.href, e.toString());
                }
              });
              return cssRules;
            }
            function newWebFont(webFontRule) {
              return {
                resolve: function resolve() {
                  var baseUrl = (webFontRule.parentStyleSheet || {}).href;
                  return inliner.inlineAll(webFontRule.cssText, baseUrl);
                },
                src: function() {
                  return webFontRule.style.getPropertyValue("src");
                }
              };
            }
          }
        }
        function newImages() {
          return {
            inlineAll,
            impl: {
              newImage
            }
          };
          function newImage(element) {
            return {
              inline
            };
            function inline(get) {
              if (util.isDataUrl(element.src))
                return Promise.resolve();
              return Promise.resolve(element.src).then(get || util.getAndEncode).then(function(data) {
                return util.dataAsUrl(data, util.mimeType(element.src));
              }).then(function(dataUrl) {
                return new Promise(function(resolve, reject) {
                  element.onload = resolve;
                  element.onerror = reject;
                  element.src = dataUrl;
                });
              });
            }
          }
          function inlineAll(node) {
            if (!(node instanceof Element))
              return Promise.resolve(node);
            return inlineBackground(node).then(function() {
              if (node instanceof HTMLImageElement)
                return newImage(node).inline();
              else
                return Promise.all(
                  util.asArray(node.childNodes).map(function(child) {
                    return inlineAll(child);
                  })
                );
            });
            function inlineBackground(node2) {
              var background = node2.style.getPropertyValue("background");
              if (!background)
                return Promise.resolve(node2);
              return inliner.inlineAll(background).then(function(inlined) {
                node2.style.setProperty(
                  "background",
                  inlined,
                  node2.style.getPropertyPriority("background")
                );
              }).then(function() {
                return node2;
              });
            }
          }
        }
      })(exports);
    }
  });

  // node_modules/@use-gesture/core/dist/maths-0ab39ae9.esm.js
  function clamp(v, min, max) {
    return Math.max(min, Math.min(v, max));
  }
  var V = {
    toVector(v, fallback) {
      if (v === void 0)
        v = fallback;
      return Array.isArray(v) ? v : [v, v];
    },
    add(v1, v2) {
      return [v1[0] + v2[0], v1[1] + v2[1]];
    },
    sub(v1, v2) {
      return [v1[0] - v2[0], v1[1] - v2[1]];
    },
    addTo(v1, v2) {
      v1[0] += v2[0];
      v1[1] += v2[1];
    },
    subTo(v1, v2) {
      v1[0] -= v2[0];
      v1[1] -= v2[1];
    }
  };
  function rubberband(distance, dimension, constant) {
    if (dimension === 0 || Math.abs(dimension) === Infinity)
      return Math.pow(distance, constant * 5);
    return distance * dimension * constant / (dimension + constant * distance);
  }
  function rubberbandIfOutOfBounds(position, min, max, constant = 0.15) {
    if (constant === 0)
      return clamp(position, min, max);
    if (position < min)
      return -rubberband(min - position, max - min, constant) + min;
    if (position > max)
      return +rubberband(position - max, max - min, constant) + max;
    return position;
  }
  function computeRubberband(bounds, [Vx, Vy], [Rx, Ry]) {
    const [[X0, X1], [Y0, Y1]] = bounds;
    return [rubberbandIfOutOfBounds(Vx, X0, X1, Rx), rubberbandIfOutOfBounds(Vy, Y0, Y1, Ry)];
  }

  // node_modules/@use-gesture/core/dist/actions-b1cc53c2.esm.js
  function _toPrimitive(input, hint) {
    if (typeof input !== "object" || input === null)
      return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== void 0) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object")
        return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }
  function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
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
  }
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  var EVENT_TYPE_MAP = {
    pointer: {
      start: "down",
      change: "move",
      end: "up"
    },
    mouse: {
      start: "down",
      change: "move",
      end: "up"
    },
    touch: {
      start: "start",
      change: "move",
      end: "end"
    },
    gesture: {
      start: "start",
      change: "change",
      end: "end"
    }
  };
  function capitalize(string) {
    if (!string)
      return "";
    return string[0].toUpperCase() + string.slice(1);
  }
  var actionsWithoutCaptureSupported = ["enter", "leave"];
  function hasCapture(capture = false, actionKey) {
    return capture && !actionsWithoutCaptureSupported.includes(actionKey);
  }
  function toHandlerProp(device, action = "", capture = false) {
    const deviceProps = EVENT_TYPE_MAP[device];
    const actionKey = deviceProps ? deviceProps[action] || action : action;
    return "on" + capitalize(device) + capitalize(actionKey) + (hasCapture(capture, actionKey) ? "Capture" : "");
  }
  var pointerCaptureEvents = ["gotpointercapture", "lostpointercapture"];
  function parseProp(prop) {
    let eventKey = prop.substring(2).toLowerCase();
    const passive = !!~eventKey.indexOf("passive");
    if (passive)
      eventKey = eventKey.replace("passive", "");
    const captureKey = pointerCaptureEvents.includes(eventKey) ? "capturecapture" : "capture";
    const capture = !!~eventKey.indexOf(captureKey);
    if (capture)
      eventKey = eventKey.replace("capture", "");
    return {
      device: eventKey,
      capture,
      passive
    };
  }
  function toDomEventType(device, action = "") {
    const deviceProps = EVENT_TYPE_MAP[device];
    const actionKey = deviceProps ? deviceProps[action] || action : action;
    return device + actionKey;
  }
  function isTouch(event) {
    return "touches" in event;
  }
  function getPointerType(event) {
    if (isTouch(event))
      return "touch";
    if ("pointerType" in event)
      return event.pointerType;
    return "mouse";
  }
  function getCurrentTargetTouchList(event) {
    return Array.from(event.touches).filter((e) => {
      var _event$currentTarget, _event$currentTarget$;
      return e.target === event.currentTarget || ((_event$currentTarget = event.currentTarget) === null || _event$currentTarget === void 0 ? void 0 : (_event$currentTarget$ = _event$currentTarget.contains) === null || _event$currentTarget$ === void 0 ? void 0 : _event$currentTarget$.call(_event$currentTarget, e.target));
    });
  }
  function getTouchList(event) {
    return event.type === "touchend" || event.type === "touchcancel" ? event.changedTouches : event.targetTouches;
  }
  function getValueEvent(event) {
    return isTouch(event) ? getTouchList(event)[0] : event;
  }
  function distanceAngle(P1, P2) {
    const dx = P2.clientX - P1.clientX;
    const dy = P2.clientY - P1.clientY;
    const cx = (P2.clientX + P1.clientX) / 2;
    const cy = (P2.clientY + P1.clientY) / 2;
    const distance = Math.hypot(dx, dy);
    const angle = -(Math.atan2(dx, dy) * 180) / Math.PI;
    const origin = [cx, cy];
    return {
      angle,
      distance,
      origin
    };
  }
  function touchIds(event) {
    return getCurrentTargetTouchList(event).map((touch) => touch.identifier);
  }
  function touchDistanceAngle(event, ids) {
    const [P1, P2] = Array.from(event.touches).filter((touch) => ids.includes(touch.identifier));
    return distanceAngle(P1, P2);
  }
  function pointerId(event) {
    const valueEvent = getValueEvent(event);
    return isTouch(event) ? valueEvent.identifier : valueEvent.pointerId;
  }
  function pointerValues(event) {
    const valueEvent = getValueEvent(event);
    return [valueEvent.clientX, valueEvent.clientY];
  }
  var LINE_HEIGHT = 40;
  var PAGE_HEIGHT = 800;
  function wheelValues(event) {
    let {
      deltaX,
      deltaY,
      deltaMode
    } = event;
    if (deltaMode === 1) {
      deltaX *= LINE_HEIGHT;
      deltaY *= LINE_HEIGHT;
    } else if (deltaMode === 2) {
      deltaX *= PAGE_HEIGHT;
      deltaY *= PAGE_HEIGHT;
    }
    return [deltaX, deltaY];
  }
  function scrollValues(event) {
    var _ref, _ref2;
    const {
      scrollX,
      scrollY,
      scrollLeft,
      scrollTop
    } = event.currentTarget;
    return [(_ref = scrollX !== null && scrollX !== void 0 ? scrollX : scrollLeft) !== null && _ref !== void 0 ? _ref : 0, (_ref2 = scrollY !== null && scrollY !== void 0 ? scrollY : scrollTop) !== null && _ref2 !== void 0 ? _ref2 : 0];
  }
  function getEventDetails(event) {
    const payload = {};
    if ("buttons" in event)
      payload.buttons = event.buttons;
    if ("shiftKey" in event) {
      const {
        shiftKey,
        altKey,
        metaKey,
        ctrlKey
      } = event;
      Object.assign(payload, {
        shiftKey,
        altKey,
        metaKey,
        ctrlKey
      });
    }
    return payload;
  }
  function call(v, ...args) {
    if (typeof v === "function") {
      return v(...args);
    } else {
      return v;
    }
  }
  function noop() {
  }
  function chain(...fns) {
    if (fns.length === 0)
      return noop;
    if (fns.length === 1)
      return fns[0];
    return function() {
      let result;
      for (const fn of fns) {
        result = fn.apply(this, arguments) || result;
      }
      return result;
    };
  }
  function assignDefault(value, fallback) {
    return Object.assign({}, fallback, value || {});
  }
  var BEFORE_LAST_KINEMATICS_DELAY = 32;
  var Engine = class {
    constructor(ctrl, args, key) {
      this.ctrl = ctrl;
      this.args = args;
      this.key = key;
      if (!this.state) {
        this.state = {};
        this.computeValues([0, 0]);
        this.computeInitial();
        if (this.init)
          this.init();
        this.reset();
      }
    }
    get state() {
      return this.ctrl.state[this.key];
    }
    set state(state) {
      this.ctrl.state[this.key] = state;
    }
    get shared() {
      return this.ctrl.state.shared;
    }
    get eventStore() {
      return this.ctrl.gestureEventStores[this.key];
    }
    get timeoutStore() {
      return this.ctrl.gestureTimeoutStores[this.key];
    }
    get config() {
      return this.ctrl.config[this.key];
    }
    get sharedConfig() {
      return this.ctrl.config.shared;
    }
    get handler() {
      return this.ctrl.handlers[this.key];
    }
    reset() {
      const {
        state,
        shared,
        ingKey,
        args
      } = this;
      shared[ingKey] = state._active = state.active = state._blocked = state._force = false;
      state._step = [false, false];
      state.intentional = false;
      state._movement = [0, 0];
      state._distance = [0, 0];
      state._direction = [0, 0];
      state._delta = [0, 0];
      state._bounds = [[-Infinity, Infinity], [-Infinity, Infinity]];
      state.args = args;
      state.axis = void 0;
      state.memo = void 0;
      state.elapsedTime = 0;
      state.direction = [0, 0];
      state.distance = [0, 0];
      state.overflow = [0, 0];
      state._movementBound = [false, false];
      state.velocity = [0, 0];
      state.movement = [0, 0];
      state.delta = [0, 0];
      state.timeStamp = 0;
    }
    start(event) {
      const state = this.state;
      const config = this.config;
      if (!state._active) {
        this.reset();
        this.computeInitial();
        state._active = true;
        state.target = event.target;
        state.currentTarget = event.currentTarget;
        state.lastOffset = config.from ? call(config.from, state) : state.offset;
        state.offset = state.lastOffset;
      }
      state.startTime = state.timeStamp = event.timeStamp;
    }
    computeValues(values) {
      const state = this.state;
      state._values = values;
      state.values = this.config.transform(values);
    }
    computeInitial() {
      const state = this.state;
      state._initial = state._values;
      state.initial = state.values;
    }
    compute(event) {
      const {
        state,
        config,
        shared
      } = this;
      state.args = this.args;
      let dt = 0;
      if (event) {
        state.event = event;
        if (config.preventDefault && event.cancelable)
          state.event.preventDefault();
        state.type = event.type;
        shared.touches = this.ctrl.pointerIds.size || this.ctrl.touchIds.size;
        shared.locked = !!document.pointerLockElement;
        Object.assign(shared, getEventDetails(event));
        shared.down = shared.pressed = shared.buttons % 2 === 1 || shared.touches > 0;
        dt = event.timeStamp - state.timeStamp;
        state.timeStamp = event.timeStamp;
        state.elapsedTime = state.timeStamp - state.startTime;
      }
      if (state._active) {
        const _absoluteDelta = state._delta.map(Math.abs);
        V.addTo(state._distance, _absoluteDelta);
      }
      if (this.axisIntent)
        this.axisIntent(event);
      const [_m0, _m1] = state._movement;
      const [t0, t1] = config.threshold;
      const {
        _step,
        values
      } = state;
      if (config.hasCustomTransform) {
        if (_step[0] === false)
          _step[0] = Math.abs(_m0) >= t0 && values[0];
        if (_step[1] === false)
          _step[1] = Math.abs(_m1) >= t1 && values[1];
      } else {
        if (_step[0] === false)
          _step[0] = Math.abs(_m0) >= t0 && Math.sign(_m0) * t0;
        if (_step[1] === false)
          _step[1] = Math.abs(_m1) >= t1 && Math.sign(_m1) * t1;
      }
      state.intentional = _step[0] !== false || _step[1] !== false;
      if (!state.intentional)
        return;
      const movement = [0, 0];
      if (config.hasCustomTransform) {
        const [v0, v1] = values;
        movement[0] = _step[0] !== false ? v0 - _step[0] : 0;
        movement[1] = _step[1] !== false ? v1 - _step[1] : 0;
      } else {
        movement[0] = _step[0] !== false ? _m0 - _step[0] : 0;
        movement[1] = _step[1] !== false ? _m1 - _step[1] : 0;
      }
      if (this.restrictToAxis && !state._blocked)
        this.restrictToAxis(movement);
      const previousOffset = state.offset;
      const gestureIsActive = state._active && !state._blocked || state.active;
      if (gestureIsActive) {
        state.first = state._active && !state.active;
        state.last = !state._active && state.active;
        state.active = shared[this.ingKey] = state._active;
        if (event) {
          if (state.first) {
            if ("bounds" in config)
              state._bounds = call(config.bounds, state);
            if (this.setup)
              this.setup();
          }
          state.movement = movement;
          this.computeOffset();
        }
      }
      const [ox, oy] = state.offset;
      const [[x0, x1], [y0, y1]] = state._bounds;
      state.overflow = [ox < x0 ? -1 : ox > x1 ? 1 : 0, oy < y0 ? -1 : oy > y1 ? 1 : 0];
      state._movementBound[0] = state.overflow[0] ? state._movementBound[0] === false ? state._movement[0] : state._movementBound[0] : false;
      state._movementBound[1] = state.overflow[1] ? state._movementBound[1] === false ? state._movement[1] : state._movementBound[1] : false;
      const rubberband2 = state._active ? config.rubberband || [0, 0] : [0, 0];
      state.offset = computeRubberband(state._bounds, state.offset, rubberband2);
      state.delta = V.sub(state.offset, previousOffset);
      this.computeMovement();
      if (gestureIsActive && (!state.last || dt > BEFORE_LAST_KINEMATICS_DELAY)) {
        state.delta = V.sub(state.offset, previousOffset);
        const absoluteDelta = state.delta.map(Math.abs);
        V.addTo(state.distance, absoluteDelta);
        state.direction = state.delta.map(Math.sign);
        state._direction = state._delta.map(Math.sign);
        if (!state.first && dt > 0) {
          state.velocity = [absoluteDelta[0] / dt, absoluteDelta[1] / dt];
        }
      }
    }
    emit() {
      const state = this.state;
      const shared = this.shared;
      const config = this.config;
      if (!state._active)
        this.clean();
      if ((state._blocked || !state.intentional) && !state._force && !config.triggerAllEvents)
        return;
      const memo = this.handler(_objectSpread2(_objectSpread2(_objectSpread2({}, shared), state), {}, {
        [this.aliasKey]: state.values
      }));
      if (memo !== void 0)
        state.memo = memo;
    }
    clean() {
      this.eventStore.clean();
      this.timeoutStore.clean();
    }
  };
  function selectAxis([dx, dy], threshold) {
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);
    if (absDx > absDy && absDx > threshold) {
      return "x";
    }
    if (absDy > absDx && absDy > threshold) {
      return "y";
    }
    return void 0;
  }
  var CoordinatesEngine = class extends Engine {
    constructor(...args) {
      super(...args);
      _defineProperty(this, "aliasKey", "xy");
    }
    reset() {
      super.reset();
      this.state.axis = void 0;
    }
    init() {
      this.state.offset = [0, 0];
      this.state.lastOffset = [0, 0];
    }
    computeOffset() {
      this.state.offset = V.add(this.state.lastOffset, this.state.movement);
    }
    computeMovement() {
      this.state.movement = V.sub(this.state.offset, this.state.lastOffset);
    }
    axisIntent(event) {
      const state = this.state;
      const config = this.config;
      if (!state.axis && event) {
        const threshold = typeof config.axisThreshold === "object" ? config.axisThreshold[getPointerType(event)] : config.axisThreshold;
        state.axis = selectAxis(state._movement, threshold);
      }
      state._blocked = (config.lockDirection || !!config.axis) && !state.axis || !!config.axis && config.axis !== state.axis;
    }
    restrictToAxis(v) {
      if (this.config.axis || this.config.lockDirection) {
        switch (this.state.axis) {
          case "x":
            v[1] = 0;
            break;
          case "y":
            v[0] = 0;
            break;
        }
      }
    }
  };
  var identity = (v) => v;
  var DEFAULT_RUBBERBAND = 0.15;
  var commonConfigResolver = {
    enabled(value = true) {
      return value;
    },
    eventOptions(value, _k, config) {
      return _objectSpread2(_objectSpread2({}, config.shared.eventOptions), value);
    },
    preventDefault(value = false) {
      return value;
    },
    triggerAllEvents(value = false) {
      return value;
    },
    rubberband(value = 0) {
      switch (value) {
        case true:
          return [DEFAULT_RUBBERBAND, DEFAULT_RUBBERBAND];
        case false:
          return [0, 0];
        default:
          return V.toVector(value);
      }
    },
    from(value) {
      if (typeof value === "function")
        return value;
      if (value != null)
        return V.toVector(value);
    },
    transform(value, _k, config) {
      const transform = value || config.shared.transform;
      this.hasCustomTransform = !!transform;
      if (true) {
        const originalTransform = transform || identity;
        return (v) => {
          const r = originalTransform(v);
          if (!isFinite(r[0]) || !isFinite(r[1])) {
            console.warn(`[@use-gesture]: config.transform() must produce a valid result, but it was: [${r[0]},${[1]}]`);
          }
          return r;
        };
      }
      return transform || identity;
    },
    threshold(value) {
      return V.toVector(value, 0);
    }
  };
  if (true) {
    Object.assign(commonConfigResolver, {
      domTarget(value) {
        if (value !== void 0) {
          throw Error(`[@use-gesture]: \`domTarget\` option has been renamed to \`target\`.`);
        }
        return NaN;
      },
      lockDirection(value) {
        if (value !== void 0) {
          throw Error(`[@use-gesture]: \`lockDirection\` option has been merged with \`axis\`. Use it as in \`{ axis: 'lock' }\``);
        }
        return NaN;
      },
      initial(value) {
        if (value !== void 0) {
          throw Error(`[@use-gesture]: \`initial\` option has been renamed to \`from\`.`);
        }
        return NaN;
      }
    });
  }
  var DEFAULT_AXIS_THRESHOLD = 0;
  var coordinatesConfigResolver = _objectSpread2(_objectSpread2({}, commonConfigResolver), {}, {
    axis(_v, _k, {
      axis
    }) {
      this.lockDirection = axis === "lock";
      if (!this.lockDirection)
        return axis;
    },
    axisThreshold(value = DEFAULT_AXIS_THRESHOLD) {
      return value;
    },
    bounds(value = {}) {
      if (typeof value === "function") {
        return (state) => coordinatesConfigResolver.bounds(value(state));
      }
      if ("current" in value) {
        return () => value.current;
      }
      if (typeof HTMLElement === "function" && value instanceof HTMLElement) {
        return value;
      }
      const {
        left = -Infinity,
        right = Infinity,
        top = -Infinity,
        bottom = Infinity
      } = value;
      return [[left, right], [top, bottom]];
    }
  });
  var KEYS_DELTA_MAP = {
    ArrowRight: (displacement, factor = 1) => [displacement * factor, 0],
    ArrowLeft: (displacement, factor = 1) => [-1 * displacement * factor, 0],
    ArrowUp: (displacement, factor = 1) => [0, -1 * displacement * factor],
    ArrowDown: (displacement, factor = 1) => [0, displacement * factor]
  };
  var DragEngine = class extends CoordinatesEngine {
    constructor(...args) {
      super(...args);
      _defineProperty(this, "ingKey", "dragging");
    }
    reset() {
      super.reset();
      const state = this.state;
      state._pointerId = void 0;
      state._pointerActive = false;
      state._keyboardActive = false;
      state._preventScroll = false;
      state._delayed = false;
      state.swipe = [0, 0];
      state.tap = false;
      state.canceled = false;
      state.cancel = this.cancel.bind(this);
    }
    setup() {
      const state = this.state;
      if (state._bounds instanceof HTMLElement) {
        const boundRect = state._bounds.getBoundingClientRect();
        const targetRect = state.currentTarget.getBoundingClientRect();
        const _bounds = {
          left: boundRect.left - targetRect.left + state.offset[0],
          right: boundRect.right - targetRect.right + state.offset[0],
          top: boundRect.top - targetRect.top + state.offset[1],
          bottom: boundRect.bottom - targetRect.bottom + state.offset[1]
        };
        state._bounds = coordinatesConfigResolver.bounds(_bounds);
      }
    }
    cancel() {
      const state = this.state;
      if (state.canceled)
        return;
      state.canceled = true;
      state._active = false;
      setTimeout(() => {
        this.compute();
        this.emit();
      }, 0);
    }
    setActive() {
      this.state._active = this.state._pointerActive || this.state._keyboardActive;
    }
    clean() {
      this.pointerClean();
      this.state._pointerActive = false;
      this.state._keyboardActive = false;
      super.clean();
    }
    pointerDown(event) {
      const config = this.config;
      const state = this.state;
      if (event.buttons != null && (Array.isArray(config.pointerButtons) ? !config.pointerButtons.includes(event.buttons) : config.pointerButtons !== -1 && config.pointerButtons !== event.buttons))
        return;
      const ctrlIds = this.ctrl.setEventIds(event);
      if (config.pointerCapture) {
        event.target.setPointerCapture(event.pointerId);
      }
      if (ctrlIds && ctrlIds.size > 1 && state._pointerActive)
        return;
      this.start(event);
      this.setupPointer(event);
      state._pointerId = pointerId(event);
      state._pointerActive = true;
      this.computeValues(pointerValues(event));
      this.computeInitial();
      if (config.preventScrollAxis && getPointerType(event) !== "mouse") {
        state._active = false;
        this.setupScrollPrevention(event);
      } else if (config.delay > 0) {
        this.setupDelayTrigger(event);
        if (config.triggerAllEvents) {
          this.compute(event);
          this.emit();
        }
      } else {
        this.startPointerDrag(event);
      }
    }
    startPointerDrag(event) {
      const state = this.state;
      state._active = true;
      state._preventScroll = true;
      state._delayed = false;
      this.compute(event);
      this.emit();
    }
    pointerMove(event) {
      const state = this.state;
      const config = this.config;
      if (!state._pointerActive)
        return;
      if (state.type === event.type && event.timeStamp === state.timeStamp)
        return;
      const id = pointerId(event);
      if (state._pointerId !== void 0 && id !== state._pointerId)
        return;
      const _values = pointerValues(event);
      if (document.pointerLockElement === event.target) {
        state._delta = [event.movementX, event.movementY];
      } else {
        state._delta = V.sub(_values, state._values);
        this.computeValues(_values);
      }
      V.addTo(state._movement, state._delta);
      this.compute(event);
      if (state._delayed && state.intentional) {
        this.timeoutStore.remove("dragDelay");
        state.active = false;
        this.startPointerDrag(event);
        return;
      }
      if (config.preventScrollAxis && !state._preventScroll) {
        if (state.axis) {
          if (state.axis === config.preventScrollAxis || config.preventScrollAxis === "xy") {
            state._active = false;
            this.clean();
            return;
          } else {
            this.timeoutStore.remove("startPointerDrag");
            this.startPointerDrag(event);
            return;
          }
        } else {
          return;
        }
      }
      this.emit();
    }
    pointerUp(event) {
      this.ctrl.setEventIds(event);
      try {
        if (this.config.pointerCapture && event.target.hasPointerCapture(event.pointerId)) {
          ;
          event.target.releasePointerCapture(event.pointerId);
        }
      } catch (_unused) {
        if (true) {
          console.warn(`[@use-gesture]: If you see this message, it's likely that you're using an outdated version of \`@react-three/fiber\`. 

Please upgrade to the latest version.`);
        }
      }
      const state = this.state;
      const config = this.config;
      if (!state._active || !state._pointerActive)
        return;
      const id = pointerId(event);
      if (state._pointerId !== void 0 && id !== state._pointerId)
        return;
      this.state._pointerActive = false;
      this.setActive();
      this.compute(event);
      const [dx, dy] = state._distance;
      state.tap = dx <= config.tapsThreshold && dy <= config.tapsThreshold;
      if (state.tap && config.filterTaps) {
        state._force = true;
      } else {
        const [dirx, diry] = state.direction;
        const [vx, vy] = state.velocity;
        const [mx, my] = state.movement;
        const [svx, svy] = config.swipe.velocity;
        const [sx, sy] = config.swipe.distance;
        const sdt = config.swipe.duration;
        if (state.elapsedTime < sdt) {
          if (Math.abs(vx) > svx && Math.abs(mx) > sx)
            state.swipe[0] = dirx;
          if (Math.abs(vy) > svy && Math.abs(my) > sy)
            state.swipe[1] = diry;
        }
      }
      this.emit();
    }
    pointerClick(event) {
      if (!this.state.tap && event.detail > 0) {
        event.preventDefault();
        event.stopPropagation();
      }
    }
    setupPointer(event) {
      const config = this.config;
      const device = config.device;
      if (true) {
        try {
          if (device === "pointer" && config.preventScrollDelay === void 0) {
            const currentTarget = "uv" in event ? event.sourceEvent.currentTarget : event.currentTarget;
            const style = window.getComputedStyle(currentTarget);
            if (style.touchAction === "auto") {
              console.warn(`[@use-gesture]: The drag target has its \`touch-action\` style property set to \`auto\`. It is recommended to add \`touch-action: 'none'\` so that the drag gesture behaves correctly on touch-enabled devices. For more information read this: https://use-gesture.netlify.app/docs/extras/#touch-action.

This message will only show in development mode. It won't appear in production. If this is intended, you can ignore it.`, currentTarget);
            }
          }
        } catch (_unused2) {
        }
      }
      if (config.pointerLock) {
        event.currentTarget.requestPointerLock();
      }
      if (!config.pointerCapture) {
        this.eventStore.add(this.sharedConfig.window, device, "change", this.pointerMove.bind(this));
        this.eventStore.add(this.sharedConfig.window, device, "end", this.pointerUp.bind(this));
        this.eventStore.add(this.sharedConfig.window, device, "cancel", this.pointerUp.bind(this));
      }
    }
    pointerClean() {
      if (this.config.pointerLock && document.pointerLockElement === this.state.currentTarget) {
        document.exitPointerLock();
      }
    }
    preventScroll(event) {
      if (this.state._preventScroll && event.cancelable) {
        event.preventDefault();
      }
    }
    setupScrollPrevention(event) {
      this.state._preventScroll = false;
      persistEvent(event);
      const remove = this.eventStore.add(this.sharedConfig.window, "touch", "change", this.preventScroll.bind(this), {
        passive: false
      });
      this.eventStore.add(this.sharedConfig.window, "touch", "end", remove);
      this.eventStore.add(this.sharedConfig.window, "touch", "cancel", remove);
      this.timeoutStore.add("startPointerDrag", this.startPointerDrag.bind(this), this.config.preventScrollDelay, event);
    }
    setupDelayTrigger(event) {
      this.state._delayed = true;
      this.timeoutStore.add("dragDelay", () => {
        this.state._step = [0, 0];
        this.startPointerDrag(event);
      }, this.config.delay);
    }
    keyDown(event) {
      const deltaFn = KEYS_DELTA_MAP[event.key];
      if (deltaFn) {
        const state = this.state;
        const factor = event.shiftKey ? 10 : event.altKey ? 0.1 : 1;
        this.start(event);
        state._delta = deltaFn(this.config.keyboardDisplacement, factor);
        state._keyboardActive = true;
        V.addTo(state._movement, state._delta);
        this.compute(event);
        this.emit();
      }
    }
    keyUp(event) {
      if (!(event.key in KEYS_DELTA_MAP))
        return;
      this.state._keyboardActive = false;
      this.setActive();
      this.compute(event);
      this.emit();
    }
    bind(bindFunction) {
      const device = this.config.device;
      bindFunction(device, "start", this.pointerDown.bind(this));
      if (this.config.pointerCapture) {
        bindFunction(device, "change", this.pointerMove.bind(this));
        bindFunction(device, "end", this.pointerUp.bind(this));
        bindFunction(device, "cancel", this.pointerUp.bind(this));
        bindFunction("lostPointerCapture", "", this.pointerUp.bind(this));
      }
      if (this.config.keys) {
        bindFunction("key", "down", this.keyDown.bind(this));
        bindFunction("key", "up", this.keyUp.bind(this));
      }
      if (this.config.filterTaps) {
        bindFunction("click", "", this.pointerClick.bind(this), {
          capture: true,
          passive: false
        });
      }
    }
  };
  function persistEvent(event) {
    "persist" in event && typeof event.persist === "function" && event.persist();
  }
  var isBrowser = typeof window !== "undefined" && window.document && window.document.createElement;
  function supportsTouchEvents() {
    return isBrowser && "ontouchstart" in window;
  }
  function isTouchScreen() {
    return supportsTouchEvents() || isBrowser && window.navigator.maxTouchPoints > 1;
  }
  function supportsPointerEvents() {
    return isBrowser && "onpointerdown" in window;
  }
  function supportsPointerLock() {
    return isBrowser && "exitPointerLock" in window.document;
  }
  function supportsGestureEvents() {
    try {
      return "constructor" in GestureEvent;
    } catch (e) {
      return false;
    }
  }
  var SUPPORT = {
    isBrowser,
    gesture: supportsGestureEvents(),
    touch: isTouchScreen(),
    touchscreen: isTouchScreen(),
    pointer: supportsPointerEvents(),
    pointerLock: supportsPointerLock()
  };
  var DEFAULT_PREVENT_SCROLL_DELAY = 250;
  var DEFAULT_DRAG_DELAY = 180;
  var DEFAULT_SWIPE_VELOCITY = 0.5;
  var DEFAULT_SWIPE_DISTANCE = 50;
  var DEFAULT_SWIPE_DURATION = 250;
  var DEFAULT_KEYBOARD_DISPLACEMENT = 10;
  var DEFAULT_DRAG_AXIS_THRESHOLD = {
    mouse: 0,
    touch: 0,
    pen: 8
  };
  var dragConfigResolver = _objectSpread2(_objectSpread2({}, coordinatesConfigResolver), {}, {
    device(_v, _k, {
      pointer: {
        touch = false,
        lock = false,
        mouse = false
      } = {}
    }) {
      this.pointerLock = lock && SUPPORT.pointerLock;
      if (SUPPORT.touch && touch)
        return "touch";
      if (this.pointerLock)
        return "mouse";
      if (SUPPORT.pointer && !mouse)
        return "pointer";
      if (SUPPORT.touch)
        return "touch";
      return "mouse";
    },
    preventScrollAxis(value, _k, {
      preventScroll
    }) {
      this.preventScrollDelay = typeof preventScroll === "number" ? preventScroll : preventScroll || preventScroll === void 0 && value ? DEFAULT_PREVENT_SCROLL_DELAY : void 0;
      if (!SUPPORT.touchscreen || preventScroll === false)
        return void 0;
      return value ? value : preventScroll !== void 0 ? "y" : void 0;
    },
    pointerCapture(_v, _k, {
      pointer: {
        capture = true,
        buttons = 1,
        keys = true
      } = {}
    }) {
      this.pointerButtons = buttons;
      this.keys = keys;
      return !this.pointerLock && this.device === "pointer" && capture;
    },
    threshold(value, _k, {
      filterTaps = false,
      tapsThreshold = 3,
      axis = void 0
    }) {
      const threshold = V.toVector(value, filterTaps ? tapsThreshold : axis ? 1 : 0);
      this.filterTaps = filterTaps;
      this.tapsThreshold = tapsThreshold;
      return threshold;
    },
    swipe({
      velocity = DEFAULT_SWIPE_VELOCITY,
      distance = DEFAULT_SWIPE_DISTANCE,
      duration = DEFAULT_SWIPE_DURATION
    } = {}) {
      return {
        velocity: this.transform(V.toVector(velocity)),
        distance: this.transform(V.toVector(distance)),
        duration
      };
    },
    delay(value = 0) {
      switch (value) {
        case true:
          return DEFAULT_DRAG_DELAY;
        case false:
          return 0;
        default:
          return value;
      }
    },
    axisThreshold(value) {
      if (!value)
        return DEFAULT_DRAG_AXIS_THRESHOLD;
      return _objectSpread2(_objectSpread2({}, DEFAULT_DRAG_AXIS_THRESHOLD), value);
    },
    keyboardDisplacement(value = DEFAULT_KEYBOARD_DISPLACEMENT) {
      return value;
    }
  });
  if (true) {
    Object.assign(dragConfigResolver, {
      useTouch(value) {
        if (value !== void 0) {
          throw Error(`[@use-gesture]: \`useTouch\` option has been renamed to \`pointer.touch\`. Use it as in \`{ pointer: { touch: true } }\`.`);
        }
        return NaN;
      },
      experimental_preventWindowScrollY(value) {
        if (value !== void 0) {
          throw Error(`[@use-gesture]: \`experimental_preventWindowScrollY\` option has been renamed to \`preventScroll\`.`);
        }
        return NaN;
      },
      swipeVelocity(value) {
        if (value !== void 0) {
          throw Error(`[@use-gesture]: \`swipeVelocity\` option has been renamed to \`swipe.velocity\`. Use it as in \`{ swipe: { velocity: 0.5 } }\`.`);
        }
        return NaN;
      },
      swipeDistance(value) {
        if (value !== void 0) {
          throw Error(`[@use-gesture]: \`swipeDistance\` option has been renamed to \`swipe.distance\`. Use it as in \`{ swipe: { distance: 50 } }\`.`);
        }
        return NaN;
      },
      swipeDuration(value) {
        if (value !== void 0) {
          throw Error(`[@use-gesture]: \`swipeDuration\` option has been renamed to \`swipe.duration\`. Use it as in \`{ swipe: { duration: 250 } }\`.`);
        }
        return NaN;
      }
    });
  }
  function clampStateInternalMovementToBounds(state) {
    const [ox, oy] = state.overflow;
    const [dx, dy] = state._delta;
    const [dirx, diry] = state._direction;
    if (ox < 0 && dx > 0 && dirx < 0 || ox > 0 && dx < 0 && dirx > 0) {
      state._movement[0] = state._movementBound[0];
    }
    if (oy < 0 && dy > 0 && diry < 0 || oy > 0 && dy < 0 && diry > 0) {
      state._movement[1] = state._movementBound[1];
    }
  }
  var SCALE_ANGLE_RATIO_INTENT_DEG = 30;
  var PINCH_WHEEL_RATIO = 100;
  var PinchEngine = class extends Engine {
    constructor(...args) {
      super(...args);
      _defineProperty(this, "ingKey", "pinching");
      _defineProperty(this, "aliasKey", "da");
    }
    init() {
      this.state.offset = [1, 0];
      this.state.lastOffset = [1, 0];
      this.state._pointerEvents = /* @__PURE__ */ new Map();
    }
    reset() {
      super.reset();
      const state = this.state;
      state._touchIds = [];
      state.canceled = false;
      state.cancel = this.cancel.bind(this);
      state.turns = 0;
    }
    computeOffset() {
      const {
        type,
        movement,
        lastOffset
      } = this.state;
      if (type === "wheel") {
        this.state.offset = V.add(movement, lastOffset);
      } else {
        this.state.offset = [(1 + movement[0]) * lastOffset[0], movement[1] + lastOffset[1]];
      }
    }
    computeMovement() {
      const {
        offset,
        lastOffset
      } = this.state;
      this.state.movement = [offset[0] / lastOffset[0], offset[1] - lastOffset[1]];
    }
    axisIntent() {
      const state = this.state;
      const [_m0, _m1] = state._movement;
      if (!state.axis) {
        const axisMovementDifference = Math.abs(_m0) * SCALE_ANGLE_RATIO_INTENT_DEG - Math.abs(_m1);
        if (axisMovementDifference < 0)
          state.axis = "angle";
        else if (axisMovementDifference > 0)
          state.axis = "scale";
      }
    }
    restrictToAxis(v) {
      if (this.config.lockDirection) {
        if (this.state.axis === "scale")
          v[1] = 0;
        else if (this.state.axis === "angle")
          v[0] = 0;
      }
    }
    cancel() {
      const state = this.state;
      if (state.canceled)
        return;
      setTimeout(() => {
        state.canceled = true;
        state._active = false;
        this.compute();
        this.emit();
      }, 0);
    }
    touchStart(event) {
      this.ctrl.setEventIds(event);
      const state = this.state;
      const ctrlTouchIds = this.ctrl.touchIds;
      if (state._active) {
        if (state._touchIds.every((id) => ctrlTouchIds.has(id)))
          return;
      }
      if (ctrlTouchIds.size < 2)
        return;
      this.start(event);
      state._touchIds = Array.from(ctrlTouchIds).slice(0, 2);
      const payload = touchDistanceAngle(event, state._touchIds);
      this.pinchStart(event, payload);
    }
    pointerStart(event) {
      if (event.buttons != null && event.buttons % 2 !== 1)
        return;
      this.ctrl.setEventIds(event);
      event.target.setPointerCapture(event.pointerId);
      const state = this.state;
      const _pointerEvents = state._pointerEvents;
      const ctrlPointerIds = this.ctrl.pointerIds;
      if (state._active) {
        if (Array.from(_pointerEvents.keys()).every((id) => ctrlPointerIds.has(id)))
          return;
      }
      if (_pointerEvents.size < 2) {
        _pointerEvents.set(event.pointerId, event);
      }
      if (state._pointerEvents.size < 2)
        return;
      this.start(event);
      const payload = distanceAngle(...Array.from(_pointerEvents.values()));
      this.pinchStart(event, payload);
    }
    pinchStart(event, payload) {
      const state = this.state;
      state.origin = payload.origin;
      this.computeValues([payload.distance, payload.angle]);
      this.computeInitial();
      this.compute(event);
      this.emit();
    }
    touchMove(event) {
      if (!this.state._active)
        return;
      const payload = touchDistanceAngle(event, this.state._touchIds);
      this.pinchMove(event, payload);
    }
    pointerMove(event) {
      const _pointerEvents = this.state._pointerEvents;
      if (_pointerEvents.has(event.pointerId)) {
        _pointerEvents.set(event.pointerId, event);
      }
      if (!this.state._active)
        return;
      const payload = distanceAngle(...Array.from(_pointerEvents.values()));
      this.pinchMove(event, payload);
    }
    pinchMove(event, payload) {
      const state = this.state;
      const prev_a = state._values[1];
      const delta_a = payload.angle - prev_a;
      let delta_turns = 0;
      if (Math.abs(delta_a) > 270)
        delta_turns += Math.sign(delta_a);
      this.computeValues([payload.distance, payload.angle - 360 * delta_turns]);
      state.origin = payload.origin;
      state.turns = delta_turns;
      state._movement = [state._values[0] / state._initial[0] - 1, state._values[1] - state._initial[1]];
      this.compute(event);
      this.emit();
    }
    touchEnd(event) {
      this.ctrl.setEventIds(event);
      if (!this.state._active)
        return;
      if (this.state._touchIds.some((id) => !this.ctrl.touchIds.has(id))) {
        this.state._active = false;
        this.compute(event);
        this.emit();
      }
    }
    pointerEnd(event) {
      const state = this.state;
      this.ctrl.setEventIds(event);
      try {
        event.target.releasePointerCapture(event.pointerId);
      } catch (_unused) {
      }
      if (state._pointerEvents.has(event.pointerId)) {
        state._pointerEvents.delete(event.pointerId);
      }
      if (!state._active)
        return;
      if (state._pointerEvents.size < 2) {
        state._active = false;
        this.compute(event);
        this.emit();
      }
    }
    gestureStart(event) {
      if (event.cancelable)
        event.preventDefault();
      const state = this.state;
      if (state._active)
        return;
      this.start(event);
      this.computeValues([event.scale, event.rotation]);
      state.origin = [event.clientX, event.clientY];
      this.compute(event);
      this.emit();
    }
    gestureMove(event) {
      if (event.cancelable)
        event.preventDefault();
      if (!this.state._active)
        return;
      const state = this.state;
      this.computeValues([event.scale, event.rotation]);
      state.origin = [event.clientX, event.clientY];
      const _previousMovement = state._movement;
      state._movement = [event.scale - 1, event.rotation];
      state._delta = V.sub(state._movement, _previousMovement);
      this.compute(event);
      this.emit();
    }
    gestureEnd(event) {
      if (!this.state._active)
        return;
      this.state._active = false;
      this.compute(event);
      this.emit();
    }
    wheel(event) {
      const modifierKey = this.config.modifierKey;
      if (modifierKey && !event[modifierKey])
        return;
      if (!this.state._active)
        this.wheelStart(event);
      else
        this.wheelChange(event);
      this.timeoutStore.add("wheelEnd", this.wheelEnd.bind(this));
    }
    wheelStart(event) {
      this.start(event);
      this.wheelChange(event);
    }
    wheelChange(event) {
      const isR3f = "uv" in event;
      if (!isR3f) {
        if (event.cancelable) {
          event.preventDefault();
        }
        if (!event.defaultPrevented) {
          console.warn(`[@use-gesture]: To properly support zoom on trackpads, try using the \`target\` option.

This message will only appear in development mode.`);
        }
      }
      const state = this.state;
      state._delta = [-wheelValues(event)[1] / PINCH_WHEEL_RATIO * state.offset[0], 0];
      V.addTo(state._movement, state._delta);
      clampStateInternalMovementToBounds(state);
      this.state.origin = [event.clientX, event.clientY];
      this.compute(event);
      this.emit();
    }
    wheelEnd() {
      if (!this.state._active)
        return;
      this.state._active = false;
      this.compute();
      this.emit();
    }
    bind(bindFunction) {
      const device = this.config.device;
      if (!!device) {
        bindFunction(device, "start", this[device + "Start"].bind(this));
        bindFunction(device, "change", this[device + "Move"].bind(this));
        bindFunction(device, "end", this[device + "End"].bind(this));
        bindFunction(device, "cancel", this[device + "End"].bind(this));
      }
      if (this.config.pinchOnWheel) {
        bindFunction("wheel", "", this.wheel.bind(this), {
          passive: false
        });
      }
    }
  };
  var pinchConfigResolver = _objectSpread2(_objectSpread2({}, commonConfigResolver), {}, {
    device(_v, _k, {
      shared,
      pointer: {
        touch = false
      } = {}
    }) {
      const sharedConfig = shared;
      if (sharedConfig.target && !SUPPORT.touch && SUPPORT.gesture)
        return "gesture";
      if (SUPPORT.touch && touch)
        return "touch";
      if (SUPPORT.touchscreen) {
        if (SUPPORT.pointer)
          return "pointer";
        if (SUPPORT.touch)
          return "touch";
      }
    },
    bounds(_v, _k, {
      scaleBounds = {},
      angleBounds = {}
    }) {
      const _scaleBounds = (state) => {
        const D = assignDefault(call(scaleBounds, state), {
          min: -Infinity,
          max: Infinity
        });
        return [D.min, D.max];
      };
      const _angleBounds = (state) => {
        const A = assignDefault(call(angleBounds, state), {
          min: -Infinity,
          max: Infinity
        });
        return [A.min, A.max];
      };
      if (typeof scaleBounds !== "function" && typeof angleBounds !== "function")
        return [_scaleBounds(), _angleBounds()];
      return (state) => [_scaleBounds(state), _angleBounds(state)];
    },
    threshold(value, _k, config) {
      this.lockDirection = config.axis === "lock";
      const threshold = V.toVector(value, this.lockDirection ? [0.1, 3] : 0);
      return threshold;
    },
    modifierKey(value) {
      if (value === void 0)
        return "ctrlKey";
      return value;
    },
    pinchOnWheel(value = true) {
      return value;
    }
  });
  var MoveEngine = class extends CoordinatesEngine {
    constructor(...args) {
      super(...args);
      _defineProperty(this, "ingKey", "moving");
    }
    move(event) {
      if (this.config.mouseOnly && event.pointerType !== "mouse")
        return;
      if (!this.state._active)
        this.moveStart(event);
      else
        this.moveChange(event);
      this.timeoutStore.add("moveEnd", this.moveEnd.bind(this));
    }
    moveStart(event) {
      this.start(event);
      this.computeValues(pointerValues(event));
      this.compute(event);
      this.computeInitial();
      this.emit();
    }
    moveChange(event) {
      if (!this.state._active)
        return;
      const values = pointerValues(event);
      const state = this.state;
      state._delta = V.sub(values, state._values);
      V.addTo(state._movement, state._delta);
      this.computeValues(values);
      this.compute(event);
      this.emit();
    }
    moveEnd(event) {
      if (!this.state._active)
        return;
      this.state._active = false;
      this.compute(event);
      this.emit();
    }
    bind(bindFunction) {
      bindFunction("pointer", "change", this.move.bind(this));
      bindFunction("pointer", "leave", this.moveEnd.bind(this));
    }
  };
  var moveConfigResolver = _objectSpread2(_objectSpread2({}, coordinatesConfigResolver), {}, {
    mouseOnly: (value = true) => value
  });
  var ScrollEngine = class extends CoordinatesEngine {
    constructor(...args) {
      super(...args);
      _defineProperty(this, "ingKey", "scrolling");
    }
    scroll(event) {
      if (!this.state._active)
        this.start(event);
      this.scrollChange(event);
      this.timeoutStore.add("scrollEnd", this.scrollEnd.bind(this));
    }
    scrollChange(event) {
      if (event.cancelable)
        event.preventDefault();
      const state = this.state;
      const values = scrollValues(event);
      state._delta = V.sub(values, state._values);
      V.addTo(state._movement, state._delta);
      this.computeValues(values);
      this.compute(event);
      this.emit();
    }
    scrollEnd() {
      if (!this.state._active)
        return;
      this.state._active = false;
      this.compute();
      this.emit();
    }
    bind(bindFunction) {
      bindFunction("scroll", "", this.scroll.bind(this));
    }
  };
  var scrollConfigResolver = coordinatesConfigResolver;
  var WheelEngine = class extends CoordinatesEngine {
    constructor(...args) {
      super(...args);
      _defineProperty(this, "ingKey", "wheeling");
    }
    wheel(event) {
      if (!this.state._active)
        this.start(event);
      this.wheelChange(event);
      this.timeoutStore.add("wheelEnd", this.wheelEnd.bind(this));
    }
    wheelChange(event) {
      const state = this.state;
      state._delta = wheelValues(event);
      V.addTo(state._movement, state._delta);
      clampStateInternalMovementToBounds(state);
      this.compute(event);
      this.emit();
    }
    wheelEnd() {
      if (!this.state._active)
        return;
      this.state._active = false;
      this.compute();
      this.emit();
    }
    bind(bindFunction) {
      bindFunction("wheel", "", this.wheel.bind(this));
    }
  };
  var wheelConfigResolver = coordinatesConfigResolver;
  var HoverEngine = class extends CoordinatesEngine {
    constructor(...args) {
      super(...args);
      _defineProperty(this, "ingKey", "hovering");
    }
    enter(event) {
      if (this.config.mouseOnly && event.pointerType !== "mouse")
        return;
      this.start(event);
      this.computeValues(pointerValues(event));
      this.compute(event);
      this.emit();
    }
    leave(event) {
      if (this.config.mouseOnly && event.pointerType !== "mouse")
        return;
      const state = this.state;
      if (!state._active)
        return;
      state._active = false;
      const values = pointerValues(event);
      state._movement = state._delta = V.sub(values, state._values);
      this.computeValues(values);
      this.compute(event);
      state.delta = state.movement;
      this.emit();
    }
    bind(bindFunction) {
      bindFunction("pointer", "enter", this.enter.bind(this));
      bindFunction("pointer", "leave", this.leave.bind(this));
    }
  };
  var hoverConfigResolver = _objectSpread2(_objectSpread2({}, coordinatesConfigResolver), {}, {
    mouseOnly: (value = true) => value
  });
  var EngineMap = /* @__PURE__ */ new Map();
  var ConfigResolverMap = /* @__PURE__ */ new Map();
  function registerAction(action) {
    EngineMap.set(action.key, action.engine);
    ConfigResolverMap.set(action.key, action.resolver);
  }
  var dragAction = {
    key: "drag",
    engine: DragEngine,
    resolver: dragConfigResolver
  };
  var hoverAction = {
    key: "hover",
    engine: HoverEngine,
    resolver: hoverConfigResolver
  };
  var moveAction = {
    key: "move",
    engine: MoveEngine,
    resolver: moveConfigResolver
  };
  var pinchAction = {
    key: "pinch",
    engine: PinchEngine,
    resolver: pinchConfigResolver
  };
  var scrollAction = {
    key: "scroll",
    engine: ScrollEngine,
    resolver: scrollConfigResolver
  };
  var wheelAction = {
    key: "wheel",
    engine: WheelEngine,
    resolver: wheelConfigResolver
  };

  // node_modules/@use-gesture/core/dist/use-gesture-core.esm.js
  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null)
      return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0)
        continue;
      target[key] = source[key];
    }
    return target;
  }
  function _objectWithoutProperties(source, excluded) {
    if (source == null)
      return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0)
          continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key))
          continue;
        target[key] = source[key];
      }
    }
    return target;
  }
  var sharedConfigResolver = {
    target(value) {
      if (value) {
        return () => "current" in value ? value.current : value;
      }
      return void 0;
    },
    enabled(value = true) {
      return value;
    },
    window(value = SUPPORT.isBrowser ? window : void 0) {
      return value;
    },
    eventOptions({
      passive = true,
      capture = false
    } = {}) {
      return {
        passive,
        capture
      };
    },
    transform(value) {
      return value;
    }
  };
  var _excluded = ["target", "eventOptions", "window", "enabled", "transform"];
  function resolveWith(config = {}, resolvers) {
    const result = {};
    for (const [key, resolver] of Object.entries(resolvers)) {
      switch (typeof resolver) {
        case "function":
          if (true) {
            const r = resolver.call(result, config[key], key, config);
            if (!Number.isNaN(r))
              result[key] = r;
          } else {
            result[key] = resolver.call(result, config[key], key, config);
          }
          break;
        case "object":
          result[key] = resolveWith(config[key], resolver);
          break;
        case "boolean":
          if (resolver)
            result[key] = config[key];
          break;
      }
    }
    return result;
  }
  function parse(newConfig, gestureKey, _config = {}) {
    const _ref = newConfig, {
      target,
      eventOptions,
      window: window2,
      enabled,
      transform
    } = _ref, rest = _objectWithoutProperties(_ref, _excluded);
    _config.shared = resolveWith({
      target,
      eventOptions,
      window: window2,
      enabled,
      transform
    }, sharedConfigResolver);
    if (gestureKey) {
      const resolver = ConfigResolverMap.get(gestureKey);
      _config[gestureKey] = resolveWith(_objectSpread2({
        shared: _config.shared
      }, rest), resolver);
    } else {
      for (const key in rest) {
        const resolver = ConfigResolverMap.get(key);
        if (resolver) {
          _config[key] = resolveWith(_objectSpread2({
            shared: _config.shared
          }, rest[key]), resolver);
        } else if (true) {
          if (!["drag", "pinch", "scroll", "wheel", "move", "hover"].includes(key)) {
            if (key === "domTarget") {
              throw Error(`[@use-gesture]: \`domTarget\` option has been renamed to \`target\`.`);
            }
            console.warn(`[@use-gesture]: Unknown config key \`${key}\` was used. Please read the documentation for further information.`);
          }
        }
      }
    }
    return _config;
  }
  var EventStore = class {
    constructor(ctrl, gestureKey) {
      _defineProperty(this, "_listeners", /* @__PURE__ */ new Set());
      this._ctrl = ctrl;
      this._gestureKey = gestureKey;
    }
    add(element, device, action, handler, options) {
      const listeners = this._listeners;
      const type = toDomEventType(device, action);
      const _options = this._gestureKey ? this._ctrl.config[this._gestureKey].eventOptions : {};
      const eventOptions = _objectSpread2(_objectSpread2({}, _options), options);
      element.addEventListener(type, handler, eventOptions);
      const remove = () => {
        element.removeEventListener(type, handler, eventOptions);
        listeners.delete(remove);
      };
      listeners.add(remove);
      return remove;
    }
    clean() {
      this._listeners.forEach((remove) => remove());
      this._listeners.clear();
    }
  };
  var TimeoutStore = class {
    constructor() {
      _defineProperty(this, "_timeouts", /* @__PURE__ */ new Map());
    }
    add(key, callback, ms = 140, ...args) {
      this.remove(key);
      this._timeouts.set(key, window.setTimeout(callback, ms, ...args));
    }
    remove(key) {
      const timeout = this._timeouts.get(key);
      if (timeout)
        window.clearTimeout(timeout);
    }
    clean() {
      this._timeouts.forEach((timeout) => void window.clearTimeout(timeout));
      this._timeouts.clear();
    }
  };
  var Controller = class {
    constructor(handlers) {
      _defineProperty(this, "gestures", /* @__PURE__ */ new Set());
      _defineProperty(this, "_targetEventStore", new EventStore(this));
      _defineProperty(this, "gestureEventStores", {});
      _defineProperty(this, "gestureTimeoutStores", {});
      _defineProperty(this, "handlers", {});
      _defineProperty(this, "config", {});
      _defineProperty(this, "pointerIds", /* @__PURE__ */ new Set());
      _defineProperty(this, "touchIds", /* @__PURE__ */ new Set());
      _defineProperty(this, "state", {
        shared: {
          shiftKey: false,
          metaKey: false,
          ctrlKey: false,
          altKey: false
        }
      });
      resolveGestures(this, handlers);
    }
    setEventIds(event) {
      if (isTouch(event)) {
        this.touchIds = new Set(touchIds(event));
        return this.touchIds;
      } else if ("pointerId" in event) {
        if (event.type === "pointerup" || event.type === "pointercancel")
          this.pointerIds.delete(event.pointerId);
        else if (event.type === "pointerdown")
          this.pointerIds.add(event.pointerId);
        return this.pointerIds;
      }
    }
    applyHandlers(handlers, nativeHandlers) {
      this.handlers = handlers;
      this.nativeHandlers = nativeHandlers;
    }
    applyConfig(config, gestureKey) {
      this.config = parse(config, gestureKey, this.config);
    }
    clean() {
      this._targetEventStore.clean();
      for (const key of this.gestures) {
        this.gestureEventStores[key].clean();
        this.gestureTimeoutStores[key].clean();
      }
    }
    effect() {
      if (this.config.shared.target)
        this.bind();
      return () => this._targetEventStore.clean();
    }
    bind(...args) {
      const sharedConfig = this.config.shared;
      const props = {};
      let target;
      if (sharedConfig.target) {
        target = sharedConfig.target();
        if (!target)
          return;
      }
      if (sharedConfig.enabled) {
        for (const gestureKey of this.gestures) {
          const gestureConfig = this.config[gestureKey];
          const bindFunction = bindToProps(props, gestureConfig.eventOptions, !!target);
          if (gestureConfig.enabled) {
            const Engine2 = EngineMap.get(gestureKey);
            new Engine2(this, args, gestureKey).bind(bindFunction);
          }
        }
        const nativeBindFunction = bindToProps(props, sharedConfig.eventOptions, !!target);
        for (const eventKey in this.nativeHandlers) {
          nativeBindFunction(eventKey, "", (event) => this.nativeHandlers[eventKey](_objectSpread2(_objectSpread2({}, this.state.shared), {}, {
            event,
            args
          })), void 0, true);
        }
      }
      for (const handlerProp in props) {
        props[handlerProp] = chain(...props[handlerProp]);
      }
      if (!target)
        return props;
      for (const handlerProp in props) {
        const {
          device,
          capture,
          passive
        } = parseProp(handlerProp);
        this._targetEventStore.add(target, device, "", props[handlerProp], {
          capture,
          passive
        });
      }
    }
  };
  function setupGesture(ctrl, gestureKey) {
    ctrl.gestures.add(gestureKey);
    ctrl.gestureEventStores[gestureKey] = new EventStore(ctrl, gestureKey);
    ctrl.gestureTimeoutStores[gestureKey] = new TimeoutStore();
  }
  function resolveGestures(ctrl, internalHandlers) {
    if (internalHandlers.drag)
      setupGesture(ctrl, "drag");
    if (internalHandlers.wheel)
      setupGesture(ctrl, "wheel");
    if (internalHandlers.scroll)
      setupGesture(ctrl, "scroll");
    if (internalHandlers.move)
      setupGesture(ctrl, "move");
    if (internalHandlers.pinch)
      setupGesture(ctrl, "pinch");
    if (internalHandlers.hover)
      setupGesture(ctrl, "hover");
  }
  var bindToProps = (props, eventOptions, withPassiveOption) => (device, action, handler, options = {}, isNative = false) => {
    var _options$capture, _options$passive;
    const capture = (_options$capture = options.capture) !== null && _options$capture !== void 0 ? _options$capture : eventOptions.capture;
    const passive = (_options$passive = options.passive) !== null && _options$passive !== void 0 ? _options$passive : eventOptions.passive;
    let handlerProp = isNative ? device : toHandlerProp(device, action, capture);
    if (withPassiveOption && passive)
      handlerProp += "Passive";
    props[handlerProp] = props[handlerProp] || [];
    props[handlerProp].push(handler);
  };
  var RE_NOT_NATIVE = /^on(Drag|Wheel|Scroll|Move|Pinch|Hover)/;
  function sortHandlers(_handlers) {
    const native = {};
    const handlers = {};
    const actions = /* @__PURE__ */ new Set();
    for (let key in _handlers) {
      if (RE_NOT_NATIVE.test(key)) {
        actions.add(RegExp.lastMatch);
        handlers[key] = _handlers[key];
      } else {
        native[key] = _handlers[key];
      }
    }
    return [handlers, native, actions];
  }
  function registerGesture(actions, handlers, handlerKey, key, internalHandlers, config) {
    if (!actions.has(handlerKey))
      return;
    if (!EngineMap.has(key)) {
      if (true) {
        console.warn(`[@use-gesture]: You've created a custom handler that that uses the \`${key}\` gesture but isn't properly configured.

Please add \`${key}Action\` when creating your handler.`);
      }
      return;
    }
    const startKey = handlerKey + "Start";
    const endKey = handlerKey + "End";
    const fn = (state) => {
      let memo = void 0;
      if (state.first && startKey in handlers)
        handlers[startKey](state);
      if (handlerKey in handlers)
        memo = handlers[handlerKey](state);
      if (state.last && endKey in handlers)
        handlers[endKey](state);
      return memo;
    };
    internalHandlers[key] = fn;
    config[key] = config[key] || {};
  }
  function parseMergedHandlers(mergedHandlers, mergedConfig) {
    const [handlers, nativeHandlers, actions] = sortHandlers(mergedHandlers);
    const internalHandlers = {};
    registerGesture(actions, handlers, "onDrag", "drag", internalHandlers, mergedConfig);
    registerGesture(actions, handlers, "onWheel", "wheel", internalHandlers, mergedConfig);
    registerGesture(actions, handlers, "onScroll", "scroll", internalHandlers, mergedConfig);
    registerGesture(actions, handlers, "onPinch", "pinch", internalHandlers, mergedConfig);
    registerGesture(actions, handlers, "onMove", "move", internalHandlers, mergedConfig);
    registerGesture(actions, handlers, "onHover", "hover", internalHandlers, mergedConfig);
    return {
      handlers: internalHandlers,
      config: mergedConfig,
      nativeHandlers
    };
  }

  // node_modules/@use-gesture/vanilla/dist/use-gesture-vanilla.esm.js
  function _toPrimitive2(input, hint) {
    if (typeof input !== "object" || input === null)
      return input;
    var prim = input[Symbol.toPrimitive];
    if (prim !== void 0) {
      var res = prim.call(input, hint || "default");
      if (typeof res !== "object")
        return res;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (hint === "string" ? String : Number)(input);
  }
  function _toPropertyKey2(arg) {
    var key = _toPrimitive2(arg, "string");
    return typeof key === "symbol" ? key : String(key);
  }
  function _defineProperty2(obj, key, value) {
    key = _toPropertyKey2(key);
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
  }
  function ownKeys2(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly && (symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      })), keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread22(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2 ? ownKeys2(Object(source), true).forEach(function(key) {
        _defineProperty2(target, key, source[key]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys2(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
    return target;
  }
  var Recognizer = class {
    constructor(target, handlers, config, gestureKey, nativeHandlers) {
      this._target = target;
      this._gestureKey = gestureKey;
      this._ctrl = new Controller(handlers);
      this._ctrl.applyHandlers(handlers, nativeHandlers);
      this._ctrl.applyConfig(_objectSpread22(_objectSpread22({}, config), {}, {
        target
      }), gestureKey);
      this._ctrl.effect();
    }
    destroy() {
      this._ctrl.clean();
    }
    setConfig(config) {
      this._ctrl.clean();
      this._ctrl.applyConfig(_objectSpread22(_objectSpread22({}, config), {}, {
        target: this._target
      }), this._gestureKey);
      this._ctrl.effect();
    }
  };
  function createGesture(actions) {
    actions.forEach(registerAction);
    return function(target, _handlers, _config) {
      const {
        handlers,
        nativeHandlers,
        config
      } = parseMergedHandlers(_handlers, _config || {});
      return new Recognizer(target, handlers, config, void 0, nativeHandlers);
    };
  }
  var Gesture = function Gesture2(target, handlers, config) {
    const gestureFunction = createGesture([dragAction, pinchAction, scrollAction, wheelAction, moveAction, hoverAction]);
    return gestureFunction(target, handlers, config || {});
  };

  // node_modules/tslib/tslib.es6.js
  function __rest(s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
          t[p[i]] = s[p[i]];
      }
    return t;
  }

  // node_modules/hey-listen/dist/hey-listen.es.js
  var warning = function() {
  };
  var invariant = function() {
  };
  if (true) {
    warning = function(check, message) {
      if (!check && typeof console !== "undefined") {
        console.warn(message);
      }
    };
    invariant = function(check, message) {
      if (!check) {
        throw new Error(message);
      }
    };
  }

  // node_modules/popmotion/dist/es/utils/clamp.mjs
  var clamp2 = (min, max, v) => Math.min(Math.max(v, min), max);

  // node_modules/popmotion/dist/es/animations/utils/find-spring.mjs
  var safeMin = 1e-3;
  var minDuration = 0.01;
  var maxDuration = 10;
  var minDamping = 0.05;
  var maxDamping = 1;
  function findSpring({ duration = 800, bounce = 0.25, velocity = 0, mass = 1 }) {
    let envelope;
    let derivative;
    warning(duration <= maxDuration * 1e3, "Spring duration must be 10 seconds or less");
    let dampingRatio = 1 - bounce;
    dampingRatio = clamp2(minDamping, maxDamping, dampingRatio);
    duration = clamp2(minDuration, maxDuration, duration / 1e3);
    if (dampingRatio < 1) {
      envelope = (undampedFreq2) => {
        const exponentialDecay = undampedFreq2 * dampingRatio;
        const delta = exponentialDecay * duration;
        const a = exponentialDecay - velocity;
        const b = calcAngularFreq(undampedFreq2, dampingRatio);
        const c = Math.exp(-delta);
        return safeMin - a / b * c;
      };
      derivative = (undampedFreq2) => {
        const exponentialDecay = undampedFreq2 * dampingRatio;
        const delta = exponentialDecay * duration;
        const d = delta * velocity + velocity;
        const e = Math.pow(dampingRatio, 2) * Math.pow(undampedFreq2, 2) * duration;
        const f = Math.exp(-delta);
        const g = calcAngularFreq(Math.pow(undampedFreq2, 2), dampingRatio);
        const factor = -envelope(undampedFreq2) + safeMin > 0 ? -1 : 1;
        return factor * ((d - e) * f) / g;
      };
    } else {
      envelope = (undampedFreq2) => {
        const a = Math.exp(-undampedFreq2 * duration);
        const b = (undampedFreq2 - velocity) * duration + 1;
        return -safeMin + a * b;
      };
      derivative = (undampedFreq2) => {
        const a = Math.exp(-undampedFreq2 * duration);
        const b = (velocity - undampedFreq2) * (duration * duration);
        return a * b;
      };
    }
    const initialGuess = 5 / duration;
    const undampedFreq = approximateRoot(envelope, derivative, initialGuess);
    duration = duration * 1e3;
    if (isNaN(undampedFreq)) {
      return {
        stiffness: 100,
        damping: 10,
        duration
      };
    } else {
      const stiffness = Math.pow(undampedFreq, 2) * mass;
      return {
        stiffness,
        damping: dampingRatio * 2 * Math.sqrt(mass * stiffness),
        duration
      };
    }
  }
  var rootIterations = 12;
  function approximateRoot(envelope, derivative, initialGuess) {
    let result = initialGuess;
    for (let i = 1; i < rootIterations; i++) {
      result = result - envelope(result) / derivative(result);
    }
    return result;
  }
  function calcAngularFreq(undampedFreq, dampingRatio) {
    return undampedFreq * Math.sqrt(1 - dampingRatio * dampingRatio);
  }

  // node_modules/popmotion/dist/es/animations/generators/spring.mjs
  var durationKeys = ["duration", "bounce"];
  var physicsKeys = ["stiffness", "damping", "mass"];
  function isSpringType(options, keys) {
    return keys.some((key) => options[key] !== void 0);
  }
  function getSpringOptions(options) {
    let springOptions = Object.assign({ velocity: 0, stiffness: 100, damping: 10, mass: 1, isResolvedFromDuration: false }, options);
    if (!isSpringType(options, physicsKeys) && isSpringType(options, durationKeys)) {
      const derived = findSpring(options);
      springOptions = Object.assign(Object.assign(Object.assign({}, springOptions), derived), { velocity: 0, mass: 1 });
      springOptions.isResolvedFromDuration = true;
    }
    return springOptions;
  }
  function spring(_a) {
    var { from = 0, to = 1, restSpeed = 2, restDelta } = _a, options = __rest(_a, ["from", "to", "restSpeed", "restDelta"]);
    const state = { done: false, value: from };
    let { stiffness, damping, mass, velocity, duration, isResolvedFromDuration } = getSpringOptions(options);
    let resolveSpring = zero;
    let resolveVelocity = zero;
    function createSpring() {
      const initialVelocity = velocity ? -(velocity / 1e3) : 0;
      const initialDelta = to - from;
      const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));
      const undampedAngularFreq = Math.sqrt(stiffness / mass) / 1e3;
      if (restDelta === void 0) {
        restDelta = Math.min(Math.abs(to - from) / 100, 0.4);
      }
      if (dampingRatio < 1) {
        const angularFreq = calcAngularFreq(undampedAngularFreq, dampingRatio);
        resolveSpring = (t) => {
          const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
          return to - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq * Math.sin(angularFreq * t) + initialDelta * Math.cos(angularFreq * t));
        };
        resolveVelocity = (t) => {
          const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
          return dampingRatio * undampedAngularFreq * envelope * (Math.sin(angularFreq * t) * (initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) / angularFreq + initialDelta * Math.cos(angularFreq * t)) - envelope * (Math.cos(angularFreq * t) * (initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) - angularFreq * initialDelta * Math.sin(angularFreq * t));
        };
      } else if (dampingRatio === 1) {
        resolveSpring = (t) => to - Math.exp(-undampedAngularFreq * t) * (initialDelta + (initialVelocity + undampedAngularFreq * initialDelta) * t);
      } else {
        const dampedAngularFreq = undampedAngularFreq * Math.sqrt(dampingRatio * dampingRatio - 1);
        resolveSpring = (t) => {
          const envelope = Math.exp(-dampingRatio * undampedAngularFreq * t);
          const freqForT = Math.min(dampedAngularFreq * t, 300);
          return to - envelope * ((initialVelocity + dampingRatio * undampedAngularFreq * initialDelta) * Math.sinh(freqForT) + dampedAngularFreq * initialDelta * Math.cosh(freqForT)) / dampedAngularFreq;
        };
      }
    }
    createSpring();
    return {
      next: (t) => {
        const current = resolveSpring(t);
        if (!isResolvedFromDuration) {
          const currentVelocity = resolveVelocity(t) * 1e3;
          const isBelowVelocityThreshold = Math.abs(currentVelocity) <= restSpeed;
          const isBelowDisplacementThreshold = Math.abs(to - current) <= restDelta;
          state.done = isBelowVelocityThreshold && isBelowDisplacementThreshold;
        } else {
          state.done = t >= duration;
        }
        state.value = state.done ? to : current;
        return state;
      },
      flipTarget: () => {
        velocity = -velocity;
        [from, to] = [to, from];
        createSpring();
      }
    };
  }
  spring.needsInterpolation = (a, b) => typeof a === "string" || typeof b === "string";
  var zero = (_t) => 0;

  // node_modules/popmotion/dist/es/utils/progress.mjs
  var progress = (from, to, value) => {
    const toFromDifference = to - from;
    return toFromDifference === 0 ? 1 : (value - from) / toFromDifference;
  };

  // node_modules/popmotion/dist/es/utils/mix.mjs
  var mix = (from, to, progress2) => -progress2 * from + progress2 * to + from;

  // node_modules/style-value-types/dist/es/utils.mjs
  var clamp3 = (min, max) => (v) => Math.max(Math.min(v, max), min);
  var sanitize = (v) => v % 1 ? Number(v.toFixed(5)) : v;
  var floatRegex = /(-)?([\d]*\.?[\d])+/g;
  var colorRegex = /(#[0-9a-f]{6}|#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))/gi;
  var singleColorRegex = /^(#[0-9a-f]{3}|#(?:[0-9a-f]{2}){2,4}|(rgb|hsl)a?\((-?[\d\.]+%?[,\s]+){2}(-?[\d\.]+%?)\s*[\,\/]?\s*[\d\.]*%?\))$/i;
  function isString(v) {
    return typeof v === "string";
  }

  // node_modules/style-value-types/dist/es/numbers/index.mjs
  var number = {
    test: (v) => typeof v === "number",
    parse: parseFloat,
    transform: (v) => v
  };
  var alpha = Object.assign(Object.assign({}, number), { transform: clamp3(0, 1) });
  var scale = Object.assign(Object.assign({}, number), { default: 1 });

  // node_modules/style-value-types/dist/es/numbers/units.mjs
  var createUnitType = (unit) => ({
    test: (v) => isString(v) && v.endsWith(unit) && v.split(" ").length === 1,
    parse: parseFloat,
    transform: (v) => `${v}${unit}`
  });
  var degrees = createUnitType("deg");
  var percent = createUnitType("%");
  var px = createUnitType("px");
  var vh = createUnitType("vh");
  var vw = createUnitType("vw");
  var progressPercentage = Object.assign(Object.assign({}, percent), { parse: (v) => percent.parse(v) / 100, transform: (v) => percent.transform(v * 100) });

  // node_modules/style-value-types/dist/es/color/utils.mjs
  var isColorString = (type, testProp) => (v) => {
    return Boolean(isString(v) && singleColorRegex.test(v) && v.startsWith(type) || testProp && Object.prototype.hasOwnProperty.call(v, testProp));
  };
  var splitColor = (aName, bName, cName) => (v) => {
    if (!isString(v))
      return v;
    const [a, b, c, alpha2] = v.match(floatRegex);
    return {
      [aName]: parseFloat(a),
      [bName]: parseFloat(b),
      [cName]: parseFloat(c),
      alpha: alpha2 !== void 0 ? parseFloat(alpha2) : 1
    };
  };

  // node_modules/style-value-types/dist/es/color/hsla.mjs
  var hsla = {
    test: isColorString("hsl", "hue"),
    parse: splitColor("hue", "saturation", "lightness"),
    transform: ({ hue, saturation, lightness, alpha: alpha$1 = 1 }) => {
      return "hsla(" + Math.round(hue) + ", " + percent.transform(sanitize(saturation)) + ", " + percent.transform(sanitize(lightness)) + ", " + sanitize(alpha.transform(alpha$1)) + ")";
    }
  };

  // node_modules/style-value-types/dist/es/color/rgba.mjs
  var clampRgbUnit = clamp3(0, 255);
  var rgbUnit = Object.assign(Object.assign({}, number), { transform: (v) => Math.round(clampRgbUnit(v)) });
  var rgba = {
    test: isColorString("rgb", "red"),
    parse: splitColor("red", "green", "blue"),
    transform: ({ red, green, blue, alpha: alpha$1 = 1 }) => "rgba(" + rgbUnit.transform(red) + ", " + rgbUnit.transform(green) + ", " + rgbUnit.transform(blue) + ", " + sanitize(alpha.transform(alpha$1)) + ")"
  };

  // node_modules/style-value-types/dist/es/color/hex.mjs
  function parseHex(v) {
    let r = "";
    let g = "";
    let b = "";
    let a = "";
    if (v.length > 5) {
      r = v.substr(1, 2);
      g = v.substr(3, 2);
      b = v.substr(5, 2);
      a = v.substr(7, 2);
    } else {
      r = v.substr(1, 1);
      g = v.substr(2, 1);
      b = v.substr(3, 1);
      a = v.substr(4, 1);
      r += r;
      g += g;
      b += b;
      a += a;
    }
    return {
      red: parseInt(r, 16),
      green: parseInt(g, 16),
      blue: parseInt(b, 16),
      alpha: a ? parseInt(a, 16) / 255 : 1
    };
  }
  var hex = {
    test: isColorString("#"),
    parse: parseHex,
    transform: rgba.transform
  };

  // node_modules/style-value-types/dist/es/color/index.mjs
  var color = {
    test: (v) => rgba.test(v) || hex.test(v) || hsla.test(v),
    parse: (v) => {
      if (rgba.test(v)) {
        return rgba.parse(v);
      } else if (hsla.test(v)) {
        return hsla.parse(v);
      } else {
        return hex.parse(v);
      }
    },
    transform: (v) => {
      return isString(v) ? v : v.hasOwnProperty("red") ? rgba.transform(v) : hsla.transform(v);
    }
  };

  // node_modules/style-value-types/dist/es/complex/index.mjs
  var colorToken = "${c}";
  var numberToken = "${n}";
  function test(v) {
    var _a, _b, _c, _d;
    return isNaN(v) && isString(v) && ((_b = (_a = v.match(floatRegex)) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0) + ((_d = (_c = v.match(colorRegex)) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0) > 0;
  }
  function analyse(v) {
    if (typeof v === "number")
      v = `${v}`;
    const values = [];
    let numColors = 0;
    const colors = v.match(colorRegex);
    if (colors) {
      numColors = colors.length;
      v = v.replace(colorRegex, colorToken);
      values.push(...colors.map(color.parse));
    }
    const numbers = v.match(floatRegex);
    if (numbers) {
      v = v.replace(floatRegex, numberToken);
      values.push(...numbers.map(number.parse));
    }
    return { values, numColors, tokenised: v };
  }
  function parse2(v) {
    return analyse(v).values;
  }
  function createTransformer(v) {
    const { values, numColors, tokenised } = analyse(v);
    const numValues = values.length;
    return (v2) => {
      let output = tokenised;
      for (let i = 0; i < numValues; i++) {
        output = output.replace(i < numColors ? colorToken : numberToken, i < numColors ? color.transform(v2[i]) : sanitize(v2[i]));
      }
      return output;
    };
  }
  var convertNumbersToZero = (v) => typeof v === "number" ? 0 : v;
  function getAnimatableNone(v) {
    const parsed = parse2(v);
    const transformer = createTransformer(v);
    return transformer(parsed.map(convertNumbersToZero));
  }
  var complex = { test, parse: parse2, createTransformer, getAnimatableNone };

  // node_modules/popmotion/dist/es/utils/hsla-to-rgba.mjs
  function hueToRgb(p, q, t) {
    if (t < 0)
      t += 1;
    if (t > 1)
      t -= 1;
    if (t < 1 / 6)
      return p + (q - p) * 6 * t;
    if (t < 1 / 2)
      return q;
    if (t < 2 / 3)
      return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  }
  function hslaToRgba({ hue, saturation, lightness, alpha: alpha2 }) {
    hue /= 360;
    saturation /= 100;
    lightness /= 100;
    let red = 0;
    let green = 0;
    let blue = 0;
    if (!saturation) {
      red = green = blue = lightness;
    } else {
      const q = lightness < 0.5 ? lightness * (1 + saturation) : lightness + saturation - lightness * saturation;
      const p = 2 * lightness - q;
      red = hueToRgb(p, q, hue + 1 / 3);
      green = hueToRgb(p, q, hue);
      blue = hueToRgb(p, q, hue - 1 / 3);
    }
    return {
      red: Math.round(red * 255),
      green: Math.round(green * 255),
      blue: Math.round(blue * 255),
      alpha: alpha2
    };
  }

  // node_modules/popmotion/dist/es/utils/mix-color.mjs
  var mixLinearColor = (from, to, v) => {
    const fromExpo = from * from;
    const toExpo = to * to;
    return Math.sqrt(Math.max(0, v * (toExpo - fromExpo) + fromExpo));
  };
  var colorTypes = [hex, rgba, hsla];
  var getColorType = (v) => colorTypes.find((type) => type.test(v));
  var notAnimatable = (color2) => `'${color2}' is not an animatable color. Use the equivalent color code instead.`;
  var mixColor = (from, to) => {
    let fromColorType = getColorType(from);
    let toColorType = getColorType(to);
    invariant(!!fromColorType, notAnimatable(from));
    invariant(!!toColorType, notAnimatable(to));
    let fromColor = fromColorType.parse(from);
    let toColor = toColorType.parse(to);
    if (fromColorType === hsla) {
      fromColor = hslaToRgba(fromColor);
      fromColorType = rgba;
    }
    if (toColorType === hsla) {
      toColor = hslaToRgba(toColor);
      toColorType = rgba;
    }
    const blended = Object.assign({}, fromColor);
    return (v) => {
      for (const key in blended) {
        if (key !== "alpha") {
          blended[key] = mixLinearColor(fromColor[key], toColor[key], v);
        }
      }
      blended.alpha = mix(fromColor.alpha, toColor.alpha, v);
      return fromColorType.transform(blended);
    };
  };

  // node_modules/popmotion/dist/es/utils/inc.mjs
  var isNum = (v) => typeof v === "number";

  // node_modules/popmotion/dist/es/utils/pipe.mjs
  var combineFunctions = (a, b) => (v) => b(a(v));
  var pipe = (...transformers) => transformers.reduce(combineFunctions);

  // node_modules/popmotion/dist/es/utils/mix-complex.mjs
  function getMixer(origin, target) {
    if (isNum(origin)) {
      return (v) => mix(origin, target, v);
    } else if (color.test(origin)) {
      return mixColor(origin, target);
    } else {
      return mixComplex(origin, target);
    }
  }
  var mixArray = (from, to) => {
    const output = [...from];
    const numValues = output.length;
    const blendValue = from.map((fromThis, i) => getMixer(fromThis, to[i]));
    return (v) => {
      for (let i = 0; i < numValues; i++) {
        output[i] = blendValue[i](v);
      }
      return output;
    };
  };
  var mixObject = (origin, target) => {
    const output = Object.assign(Object.assign({}, origin), target);
    const blendValue = {};
    for (const key in output) {
      if (origin[key] !== void 0 && target[key] !== void 0) {
        blendValue[key] = getMixer(origin[key], target[key]);
      }
    }
    return (v) => {
      for (const key in blendValue) {
        output[key] = blendValue[key](v);
      }
      return output;
    };
  };
  function analyse2(value) {
    const parsed = complex.parse(value);
    const numValues = parsed.length;
    let numNumbers = 0;
    let numRGB = 0;
    let numHSL = 0;
    for (let i = 0; i < numValues; i++) {
      if (numNumbers || typeof parsed[i] === "number") {
        numNumbers++;
      } else {
        if (parsed[i].hue !== void 0) {
          numHSL++;
        } else {
          numRGB++;
        }
      }
    }
    return { parsed, numNumbers, numRGB, numHSL };
  }
  var mixComplex = (origin, target) => {
    const template = complex.createTransformer(target);
    const originStats = analyse2(origin);
    const targetStats = analyse2(target);
    const canInterpolate = originStats.numHSL === targetStats.numHSL && originStats.numRGB === targetStats.numRGB && originStats.numNumbers >= targetStats.numNumbers;
    if (canInterpolate) {
      return pipe(mixArray(originStats.parsed, targetStats.parsed), template);
    } else {
      warning(true, `Complex values '${origin}' and '${target}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`);
      return (p) => `${p > 0 ? target : origin}`;
    }
  };

  // node_modules/popmotion/dist/es/utils/interpolate.mjs
  var mixNumber = (from, to) => (p) => mix(from, to, p);
  function detectMixerFactory(v) {
    if (typeof v === "number") {
      return mixNumber;
    } else if (typeof v === "string") {
      if (color.test(v)) {
        return mixColor;
      } else {
        return mixComplex;
      }
    } else if (Array.isArray(v)) {
      return mixArray;
    } else if (typeof v === "object") {
      return mixObject;
    }
  }
  function createMixers(output, ease, customMixer) {
    const mixers = [];
    const mixerFactory = customMixer || detectMixerFactory(output[0]);
    const numMixers = output.length - 1;
    for (let i = 0; i < numMixers; i++) {
      let mixer = mixerFactory(output[i], output[i + 1]);
      if (ease) {
        const easingFunction = Array.isArray(ease) ? ease[i] : ease;
        mixer = pipe(easingFunction, mixer);
      }
      mixers.push(mixer);
    }
    return mixers;
  }
  function fastInterpolate([from, to], [mixer]) {
    return (v) => mixer(progress(from, to, v));
  }
  function slowInterpolate(input, mixers) {
    const inputLength = input.length;
    const lastInputIndex = inputLength - 1;
    return (v) => {
      let mixerIndex = 0;
      let foundMixerIndex = false;
      if (v <= input[0]) {
        foundMixerIndex = true;
      } else if (v >= input[lastInputIndex]) {
        mixerIndex = lastInputIndex - 1;
        foundMixerIndex = true;
      }
      if (!foundMixerIndex) {
        let i = 1;
        for (; i < inputLength; i++) {
          if (input[i] > v || i === lastInputIndex) {
            break;
          }
        }
        mixerIndex = i - 1;
      }
      const progressInRange = progress(input[mixerIndex], input[mixerIndex + 1], v);
      return mixers[mixerIndex](progressInRange);
    };
  }
  function interpolate(input, output, { clamp: isClamp = true, ease, mixer } = {}) {
    const inputLength = input.length;
    invariant(inputLength === output.length, "Both input and output ranges must be the same length");
    invariant(!ease || !Array.isArray(ease) || ease.length === inputLength - 1, "Array of easing functions must be of length `input.length - 1`, as it applies to the transitions **between** the defined values.");
    if (input[0] > input[inputLength - 1]) {
      input = [].concat(input);
      output = [].concat(output);
      input.reverse();
      output.reverse();
    }
    const mixers = createMixers(output, ease, mixer);
    const interpolator = inputLength === 2 ? fastInterpolate(input, mixers) : slowInterpolate(input, mixers);
    return isClamp ? (v) => interpolator(clamp2(input[0], input[inputLength - 1], v)) : interpolator;
  }

  // node_modules/popmotion/dist/es/easing/utils.mjs
  var reverseEasing = (easing) => (p) => 1 - easing(1 - p);
  var mirrorEasing = (easing) => (p) => p <= 0.5 ? easing(2 * p) / 2 : (2 - easing(2 * (1 - p))) / 2;
  var createExpoIn = (power) => (p) => Math.pow(p, power);
  var createBackIn = (power) => (p) => p * p * ((power + 1) * p - power);
  var createAnticipate = (power) => {
    const backEasing = createBackIn(power);
    return (p) => (p *= 2) < 1 ? 0.5 * backEasing(p) : 0.5 * (2 - Math.pow(2, -10 * (p - 1)));
  };

  // node_modules/popmotion/dist/es/easing/index.mjs
  var DEFAULT_OVERSHOOT_STRENGTH = 1.525;
  var BOUNCE_FIRST_THRESHOLD = 4 / 11;
  var BOUNCE_SECOND_THRESHOLD = 8 / 11;
  var BOUNCE_THIRD_THRESHOLD = 9 / 10;
  var easeIn = createExpoIn(2);
  var easeOut = reverseEasing(easeIn);
  var easeInOut = mirrorEasing(easeIn);
  var circIn = (p) => 1 - Math.sin(Math.acos(p));
  var circOut = reverseEasing(circIn);
  var circInOut = mirrorEasing(circOut);
  var backIn = createBackIn(DEFAULT_OVERSHOOT_STRENGTH);
  var backOut = reverseEasing(backIn);
  var backInOut = mirrorEasing(backIn);
  var anticipate = createAnticipate(DEFAULT_OVERSHOOT_STRENGTH);
  var ca = 4356 / 361;
  var cb = 35442 / 1805;
  var cc = 16061 / 1805;
  var bounceOut = (p) => {
    if (p === 1 || p === 0)
      return p;
    const p2 = p * p;
    return p < BOUNCE_FIRST_THRESHOLD ? 7.5625 * p2 : p < BOUNCE_SECOND_THRESHOLD ? 9.075 * p2 - 9.9 * p + 3.4 : p < BOUNCE_THIRD_THRESHOLD ? ca * p2 - cb * p + cc : 10.8 * p * p - 20.52 * p + 10.72;
  };
  var bounceIn = reverseEasing(bounceOut);

  // node_modules/popmotion/dist/es/animations/generators/keyframes.mjs
  function defaultEasing(values, easing) {
    return values.map(() => easing || easeInOut).splice(0, values.length - 1);
  }
  function defaultOffset(values) {
    const numValues = values.length;
    return values.map((_value, i) => i !== 0 ? i / (numValues - 1) : 0);
  }
  function convertOffsetToTimes(offset, duration) {
    return offset.map((o) => o * duration);
  }
  function keyframes({ from = 0, to = 1, ease, offset, duration = 300 }) {
    const state = { done: false, value: from };
    const values = Array.isArray(to) ? to : [from, to];
    const times = convertOffsetToTimes(offset && offset.length === values.length ? offset : defaultOffset(values), duration);
    function createInterpolator() {
      return interpolate(times, values, {
        ease: Array.isArray(ease) ? ease : defaultEasing(values, ease)
      });
    }
    let interpolator = createInterpolator();
    return {
      next: (t) => {
        state.value = interpolator(t);
        state.done = t >= duration;
        return state;
      },
      flipTarget: () => {
        values.reverse();
        interpolator = createInterpolator();
      }
    };
  }

  // node_modules/popmotion/dist/es/animations/generators/decay.mjs
  function decay({ velocity = 0, from = 0, power = 0.8, timeConstant = 350, restDelta = 0.5, modifyTarget }) {
    const state = { done: false, value: from };
    let amplitude = power * velocity;
    const ideal = from + amplitude;
    const target = modifyTarget === void 0 ? ideal : modifyTarget(ideal);
    if (target !== ideal)
      amplitude = target - from;
    return {
      next: (t) => {
        const delta = -amplitude * Math.exp(-t / timeConstant);
        state.done = !(delta > restDelta || delta < -restDelta);
        state.value = state.done ? target : target + delta;
        return state;
      },
      flipTarget: () => {
      }
    };
  }

  // node_modules/popmotion/dist/es/animations/utils/detect-animation-from-options.mjs
  var types = { keyframes, spring, decay };
  function detectAnimationFromOptions(config) {
    if (Array.isArray(config.to)) {
      return keyframes;
    } else if (types[config.type]) {
      return types[config.type];
    }
    const keys = new Set(Object.keys(config));
    if (keys.has("ease") || keys.has("duration") && !keys.has("dampingRatio")) {
      return keyframes;
    } else if (keys.has("dampingRatio") || keys.has("stiffness") || keys.has("mass") || keys.has("damping") || keys.has("restSpeed") || keys.has("restDelta")) {
      return spring;
    }
    return keyframes;
  }

  // node_modules/framesync/dist/es/on-next-frame.mjs
  var defaultTimestep = 1 / 60 * 1e3;
  var getCurrentTime = typeof performance !== "undefined" ? () => performance.now() : () => Date.now();
  var onNextFrame = typeof window !== "undefined" ? (callback) => window.requestAnimationFrame(callback) : (callback) => setTimeout(() => callback(getCurrentTime()), defaultTimestep);

  // node_modules/framesync/dist/es/create-render-step.mjs
  function createRenderStep(runNextFrame2) {
    let toRun = [];
    let toRunNextFrame = [];
    let numToRun = 0;
    let isProcessing2 = false;
    let flushNextFrame = false;
    const toKeepAlive = /* @__PURE__ */ new WeakSet();
    const step = {
      schedule: (callback, keepAlive = false, immediate = false) => {
        const addToCurrentFrame = immediate && isProcessing2;
        const buffer = addToCurrentFrame ? toRun : toRunNextFrame;
        if (keepAlive)
          toKeepAlive.add(callback);
        if (buffer.indexOf(callback) === -1) {
          buffer.push(callback);
          if (addToCurrentFrame && isProcessing2)
            numToRun = toRun.length;
        }
        return callback;
      },
      cancel: (callback) => {
        const index = toRunNextFrame.indexOf(callback);
        if (index !== -1)
          toRunNextFrame.splice(index, 1);
        toKeepAlive.delete(callback);
      },
      process: (frameData) => {
        if (isProcessing2) {
          flushNextFrame = true;
          return;
        }
        isProcessing2 = true;
        [toRun, toRunNextFrame] = [toRunNextFrame, toRun];
        toRunNextFrame.length = 0;
        numToRun = toRun.length;
        if (numToRun) {
          for (let i = 0; i < numToRun; i++) {
            const callback = toRun[i];
            callback(frameData);
            if (toKeepAlive.has(callback)) {
              step.schedule(callback);
              runNextFrame2();
            }
          }
        }
        isProcessing2 = false;
        if (flushNextFrame) {
          flushNextFrame = false;
          step.process(frameData);
        }
      }
    };
    return step;
  }

  // node_modules/framesync/dist/es/index.mjs
  var maxElapsed = 40;
  var useDefaultElapsed = true;
  var runNextFrame = false;
  var isProcessing = false;
  var frame = {
    delta: 0,
    timestamp: 0
  };
  var stepsOrder = [
    "read",
    "update",
    "preRender",
    "render",
    "postRender"
  ];
  var steps = stepsOrder.reduce((acc, key) => {
    acc[key] = createRenderStep(() => runNextFrame = true);
    return acc;
  }, {});
  var sync = stepsOrder.reduce((acc, key) => {
    const step = steps[key];
    acc[key] = (process2, keepAlive = false, immediate = false) => {
      if (!runNextFrame)
        startLoop();
      return step.schedule(process2, keepAlive, immediate);
    };
    return acc;
  }, {});
  var cancelSync = stepsOrder.reduce((acc, key) => {
    acc[key] = steps[key].cancel;
    return acc;
  }, {});
  var flushSync = stepsOrder.reduce((acc, key) => {
    acc[key] = () => steps[key].process(frame);
    return acc;
  }, {});
  var processStep = (stepId) => steps[stepId].process(frame);
  var processFrame = (timestamp) => {
    runNextFrame = false;
    frame.delta = useDefaultElapsed ? defaultTimestep : Math.max(Math.min(timestamp - frame.timestamp, maxElapsed), 1);
    frame.timestamp = timestamp;
    isProcessing = true;
    stepsOrder.forEach(processStep);
    isProcessing = false;
    if (runNextFrame) {
      useDefaultElapsed = false;
      onNextFrame(processFrame);
    }
  };
  var startLoop = () => {
    runNextFrame = true;
    useDefaultElapsed = true;
    if (!isProcessing)
      onNextFrame(processFrame);
  };
  var getFrameData = () => frame;
  var es_default = sync;

  // node_modules/popmotion/dist/es/animations/utils/elapsed.mjs
  function loopElapsed(elapsed, duration, delay = 0) {
    return elapsed - duration - delay;
  }
  function reverseElapsed(elapsed, duration, delay = 0, isForwardPlayback = true) {
    return isForwardPlayback ? loopElapsed(duration + -elapsed, duration, delay) : duration - (elapsed - duration) + delay;
  }
  function hasRepeatDelayElapsed(elapsed, duration, delay, isForwardPlayback) {
    return isForwardPlayback ? elapsed >= duration + delay : elapsed <= -delay;
  }

  // node_modules/popmotion/dist/es/animations/index.mjs
  var framesync = (update) => {
    const passTimestamp = ({ delta }) => update(delta);
    return {
      start: () => es_default.update(passTimestamp, true),
      stop: () => cancelSync.update(passTimestamp)
    };
  };
  function animate(_a) {
    var _b, _c;
    var { from, autoplay = true, driver = framesync, elapsed = 0, repeat: repeatMax = 0, repeatType = "loop", repeatDelay = 0, onPlay, onStop, onComplete, onRepeat, onUpdate } = _a, options = __rest(_a, ["from", "autoplay", "driver", "elapsed", "repeat", "repeatType", "repeatDelay", "onPlay", "onStop", "onComplete", "onRepeat", "onUpdate"]);
    let { to } = options;
    let driverControls;
    let repeatCount = 0;
    let computedDuration = options.duration;
    let latest;
    let isComplete = false;
    let isForwardPlayback = true;
    let interpolateFromNumber;
    const animator = detectAnimationFromOptions(options);
    if ((_c = (_b = animator).needsInterpolation) === null || _c === void 0 ? void 0 : _c.call(_b, from, to)) {
      interpolateFromNumber = interpolate([0, 100], [from, to], {
        clamp: false
      });
      from = 0;
      to = 100;
    }
    const animation = animator(Object.assign(Object.assign({}, options), { from, to }));
    function repeat() {
      repeatCount++;
      if (repeatType === "reverse") {
        isForwardPlayback = repeatCount % 2 === 0;
        elapsed = reverseElapsed(elapsed, computedDuration, repeatDelay, isForwardPlayback);
      } else {
        elapsed = loopElapsed(elapsed, computedDuration, repeatDelay);
        if (repeatType === "mirror")
          animation.flipTarget();
      }
      isComplete = false;
      onRepeat && onRepeat();
    }
    function complete() {
      driverControls.stop();
      onComplete && onComplete();
    }
    function update(delta) {
      if (!isForwardPlayback)
        delta = -delta;
      elapsed += delta;
      if (!isComplete) {
        const state = animation.next(Math.max(0, elapsed));
        latest = state.value;
        if (interpolateFromNumber)
          latest = interpolateFromNumber(latest);
        isComplete = isForwardPlayback ? state.done : elapsed <= 0;
      }
      onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(latest);
      if (isComplete) {
        if (repeatCount === 0)
          computedDuration !== null && computedDuration !== void 0 ? computedDuration : computedDuration = elapsed;
        if (repeatCount < repeatMax) {
          hasRepeatDelayElapsed(elapsed, computedDuration, repeatDelay, isForwardPlayback) && repeat();
        } else {
          complete();
        }
      }
    }
    function play() {
      onPlay === null || onPlay === void 0 ? void 0 : onPlay();
      driverControls = driver(update);
      driverControls.start();
    }
    autoplay && play();
    return {
      stop: () => {
        onStop === null || onStop === void 0 ? void 0 : onStop();
        driverControls.stop();
      }
    };
  }

  // node_modules/popmotion/dist/es/utils/velocity-per-second.mjs
  function velocityPerSecond(velocity, frameDuration) {
    return frameDuration ? velocity * (1e3 / frameDuration) : 0;
  }

  // node_modules/popmotion/dist/es/animations/inertia.mjs
  function inertia({ from = 0, velocity = 0, min, max, power = 0.8, timeConstant = 750, bounceStiffness = 500, bounceDamping = 10, restDelta = 1, modifyTarget, driver, onUpdate, onComplete, onStop }) {
    let currentAnimation;
    function isOutOfBounds(v) {
      return min !== void 0 && v < min || max !== void 0 && v > max;
    }
    function boundaryNearest(v) {
      if (min === void 0)
        return max;
      if (max === void 0)
        return min;
      return Math.abs(min - v) < Math.abs(max - v) ? min : max;
    }
    function startAnimation(options) {
      currentAnimation === null || currentAnimation === void 0 ? void 0 : currentAnimation.stop();
      currentAnimation = animate(Object.assign(Object.assign({}, options), {
        driver,
        onUpdate: (v) => {
          var _a;
          onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate(v);
          (_a = options.onUpdate) === null || _a === void 0 ? void 0 : _a.call(options, v);
        },
        onComplete,
        onStop
      }));
    }
    function startSpring(options) {
      startAnimation(Object.assign({ type: "spring", stiffness: bounceStiffness, damping: bounceDamping, restDelta }, options));
    }
    if (isOutOfBounds(from)) {
      startSpring({ from, velocity, to: boundaryNearest(from) });
    } else {
      let target = power * velocity + from;
      if (typeof modifyTarget !== "undefined")
        target = modifyTarget(target);
      const boundary = boundaryNearest(target);
      const heading = boundary === min ? -1 : 1;
      let prev;
      let current;
      const checkBoundary = (v) => {
        prev = current;
        current = v;
        velocity = velocityPerSecond(v - prev, getFrameData().delta);
        if (heading === 1 && v > boundary || heading === -1 && v < boundary) {
          startSpring({ from: v, to: boundary, velocity });
        }
      };
      startAnimation({
        type: "decay",
        from,
        velocity,
        timeConstant,
        power,
        restDelta,
        modifyTarget,
        onUpdate: isOutOfBounds(target) ? checkBoundary : void 0
      });
    }
    return {
      stop: () => currentAnimation === null || currentAnimation === void 0 ? void 0 : currentAnimation.stop()
    };
  }

  // node_modules/@7c00/canvas-tilemap/src/gesture.ts
  var Average = class {
    constructor(length2 = 3) {
      this.count = 0;
      this.length = 0;
      this.data = [];
      this.length = length2;
    }
    add(value) {
      this.data[this.count % this.length] = value;
      this.count += 1;
    }
    clear() {
      this.data = Array(length);
    }
    get value() {
      const data = this.data.filter((i) => i != void 0);
      if (data.length == 0)
        return 0;
      return data.reduce((value, i) => value + i, 0) / data.length;
    }
  };
  var Gesture3 = class {
    constructor(map) {
      this.initialScale = 0;
      this.lastPinchTime = 0;
      this.lastWheelTime = 0;
      this.lastClickTime = 0;
      this.lastDragTime = 0;
      this.scaleAnimation = inertia({});
      this.offsetAnimation = [inertia({}), inertia({})];
      this.velocityX = new Average();
      this.velocityY = new Average();
      this.velocityScale = new Average();
      this.map = map;
      new Gesture(this.map.element, {
        onWheel: this.onWheel.bind(this),
        onPinchStart: () => this.initialScale = this.map.scale,
        onPinch: this.onPinch.bind(this),
        onPinchEnd: this.onPinchEnd.bind(this),
        onDragStart: this.onDragStart.bind(this),
        onDrag: this.onDrag.bind(this),
        onDragEnd: this.onDragEnd.bind(this)
      });
    }
    onWheel({ direction, event, delta, timeStamp }) {
      if (timeStamp == this.lastWheelTime)
        return;
      this.offsetAnimation[0]?.stop();
      this.offsetAnimation[1]?.stop();
      this.scaleAnimation?.stop();
      this.lastWheelTime = timeStamp;
      const lastScale = this.map.scale;
      this.scaleAnimation = inertia({
        velocity: Math.log2(1 + Math.abs(delta[1]) / 200) / 2,
        power: 2,
        timeConstant: 50,
        restDelta: 1e-3,
        onUpdate: (value) => {
          const zoom = Math.log2(lastScale) - direction[1] * value;
          this.scaleTo(2 ** zoom, [event.x, event.y]);
        }
      });
    }
    onPinch(state) {
      const { origin, da, initial, touches, timeStamp } = state;
      if (touches != 2)
        return;
      this.lastPinchTime = timeStamp;
      const newScale = da[0] / initial[0] * this.initialScale;
      this.velocityScale.add(newScale - this.map.scale);
      this.scaleTo(newScale, origin);
    }
    onPinchEnd({ origin }) {
      const value = this.velocityScale.value;
      const direction = value > 0 ? -1 : 1;
      this.initialScale = this.map.scale;
      const velocity = Math.log10(1 + Math.abs(this.velocityScale.value)) * 50;
      this.scaleAnimation?.stop();
      this.scaleAnimation = inertia({
        velocity,
        timeConstant: 50,
        restDelta: 1e-3,
        onUpdate: (value2) => {
          const zoom = Math.log2(this.initialScale) - direction * value2;
          this.scaleTo(2 ** zoom, origin);
        }
      });
    }
    onDragStart() {
      this.offsetAnimation[0]?.stop();
      this.offsetAnimation[1]?.stop();
      this.scaleAnimation?.stop();
      this.velocityX.clear();
      this.velocityY.clear();
    }
    onDrag(state) {
      const { pinching, wheeling, timeStamp, velocity, delta } = state;
      if (pinching || wheeling || timeStamp - this.lastPinchTime < 200) {
        return;
      }
      this.velocityX.add(velocity[0]);
      this.velocityY.add(velocity[1]);
      this.setOffset(0, this.map.offset[0] + delta[0]);
      this.setOffset(1, this.map.offset[1] + delta[1]);
      this.map.draw();
    }
    async onDragEnd(state) {
      const { direction, timeStamp, distance } = state;
      if (timeStamp - this.lastPinchTime < 200)
        return;
      const initialOffset = [...this.map.offset];
      const velocity = [this.velocityX.value, this.velocityY.value];
      const animateOffset = (index) => {
        this.offsetAnimation[index] = inertia({
          velocity: velocity[index],
          power: 200,
          timeConstant: 200,
          onUpdate: (value) => {
            this.setOffset(
              index,
              initialOffset[index] + direction[index] * value
            );
            this.map.draw();
          }
        });
      };
      animateOffset(0);
      animateOffset(1);
      if (distance[0] > 2 || distance[1] > 2) {
        this.lastDragTime = timeStamp;
      }
    }
    scaleTo(newScale, origin) {
      const { offset, scale: scale2, minZoom, options } = this.map;
      let zoom = Math.log2(newScale);
      zoom = Math.max(Math.min(zoom, options.maxZoom), minZoom);
      newScale = 2 ** zoom;
      const ratio = (newScale - scale2) / scale2;
      this.map.scale = newScale;
      this.setOffset(0, offset[0] - (origin[0] - offset[0]) * ratio);
      this.setOffset(1, offset[1] - (origin[1] - offset[1]) * ratio);
      this.map.draw();
    }
    setOffset(index, value) {
      const { size, options, offset, scale: scale2 } = this.map;
      const maxValue = size[index] - options.size[index] * scale2;
      offset[index] = Math.min(Math.max(value, maxValue), 0);
    }
  };

  // node_modules/@7c00/canvas-tilemap/src/tilemap.ts
  var Tilemap = class {
    constructor(options) {
      this.offset = [0, 0];
      this.scale = 0;
      this.minZoom = 0;
      this.size = [0, 0];
      this.tileLayers = [];
      this.markerLayers = [];
      this.lastDrawTime = 0;
      this.options = {
        ...options,
        tileSize: options.tileSize ?? 256,
        maxZoom: options.maxZoom ?? 0
      };
      if (typeof options.element == "string") {
        this.element = document.querySelector(options.element);
      } else {
        this.element = options.element;
      }
      this.canvas = this.element.getContext("2d");
      const style = getComputedStyle(this.element);
      this.element.width = parseFloat(style.width) * devicePixelRatio;
      this.element.height = parseFloat(style.height) * devicePixelRatio;
      this.size = [
        this.element.width / devicePixelRatio,
        this.element.height / devicePixelRatio
      ];
      const minScale = Math.max(
        this.size[0] / options.size[0],
        this.size[1] / options.size[1]
      );
      this.minZoom = Math.log2(minScale);
      this.scale = minScale;
      this.gesture = new Gesture3(this);
      this.draw();
    }
    draw() {
      const now = Date.now();
      if (now != this.lastDrawTime) {
        requestAnimationFrame(() => {
          const { canvas, element, offset } = this;
          canvas.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
          canvas.clearRect(0, 0, element.width, element.height);
          canvas.translate(offset[0], offset[1]);
          for (const tileLayer of this.tileLayers) {
            tileLayer.draw();
          }
          for (const markerLayer of this.markerLayers) {
            markerLayer.draw();
          }
        });
        this.lastDrawTime = now;
      }
    }
  };

  // node_modules/@7c00/canvas-tilemap/src/tile-layer.ts
  var TileLayer = class {
    constructor(map, options) {
      this.tiles = {};
      this.images = {};
      this.map = map;
      this.options = {
        ...options,
        offset: options.offset ?? [0, 0]
      };
      const { size: mapSize } = map.options;
      const { minZoom, maxZoom, offset: tileOffset } = this.options;
      for (let z = minZoom; z <= maxZoom; z += 1) {
        const imageSize = map.options.tileSize * 2 ** (maxZoom - z);
        const row = Math.ceil(mapSize[1] / imageSize);
        const col = Math.ceil(mapSize[0] / imageSize);
        const offset = [
          Math.floor(tileOffset[0] / imageSize),
          Math.floor(tileOffset[1] / imageSize)
        ];
        const tiles = [];
        for (let y = 0; y < row; y += 1) {
          tiles[y] = [];
          for (let x = 0; x < col; x += 1) {
            const url = options.getTileUrl(x + offset[0], y + offset[1], z);
            tiles[y][x] = url;
          }
        }
        this.tiles[z] = tiles;
      }
      for (const tiles of this.tiles[minZoom]) {
        for (const url of tiles) {
          const image = new Image();
          image.src = url;
          image.addEventListener("load", () => {
            this.images[url] = image;
            this.map.draw();
          });
        }
      }
    }
    draw() {
      const { minZoom, maxZoom, dx = 0 } = this.options;
      this.drawTiles(minZoom, dx * this.map.scale);
      let zoom = maxZoom + Math.log2(this.map.scale);
      zoom = Math.ceil(Math.min(Math.max(zoom, minZoom), maxZoom));
      if (zoom > minZoom) {
        this.drawTiles(zoom);
      }
    }
    drawTiles(z, dx = 0) {
      const baseTiles = this.tiles[z];
      const { scale: scale2, options, offset, size } = this.map;
      const imageSize = options.tileSize * 2 ** (this.options.maxZoom - z) * scale2;
      const startX = Math.floor(-offset[0] / imageSize);
      const endX = Math.ceil((size[0] - offset[0] + dx) / imageSize);
      const startY = Math.floor(-offset[1] / imageSize);
      const endY = Math.ceil((size[1] - offset[1]) / imageSize);
      for (let y = startY; y < endY; y += 1) {
        for (let x = startX; x < endX; x += 1) {
          const url = baseTiles[y][x];
          const image = this.images[baseTiles[y][x]];
          if (image) {
            this.map.canvas.drawImage(
              image,
              imageSize * x - dx,
              imageSize * y,
              imageSize,
              imageSize
            );
          } else {
            const image2 = new Image();
            image2.src = url;
            image2.addEventListener("load", () => {
              this.images[url] = image2;
            });
          }
        }
      }
    }
  };

  // node_modules/@7c00/canvas-tilemap/src/marker-layer.ts
  var MarkerLayer = class {
    constructor(map, options) {
      this.map = map;
      this.options = { ...options, offset: options.offset ?? [0, 0] };
    }
    draw() {
      const { offset, positions, image } = this.options;
      const { canvas, scale: scale2, options } = this.map;
      const size = [image.width, image.height];
      for (const i of positions) {
        const x = options.origin[0] - offset[0] + i[0];
        const y = options.origin[1] - offset[1] + i[1];
        canvas.drawImage(image, x * scale2 - size[0] / 2, y * scale2 - size[1]);
      }
    }
  };

  // index.ts
  var import_dom_to_image = __toESM(require_dom_to_image());
  var accessToken = "";
  async function api(path, params = {}) {
    const response = await fetch(`https://cloud.yuanshen.site/api/${path}`, {
      method: "post",
      body: JSON.stringify(params),
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${accessToken}`
      }
    });
    return (await response.json())["data"];
  }
  async function fetchAccessToken() {
    const headers = { authorization: "Basic Y2xpZW50OnNlY3JldA==" };
    const response = await fetch(
      "https://cloud.yuanshen.site/oauth/token?scope=all&grant_type=client_credentials",
      { method: "post", headers }
    );
    accessToken = (await response.json())["access_token"];
  }
  async function main() {
    const tilemap = new Tilemap({
      element: "#canvas",
      size: [17408, 16384],
      origin: [3568, 6286],
      maxZoom: 0.5
      // 渊下宫
      // size: [12288, 12288],
      // origin: [3568, 6286],
    });
    tilemap.tileLayers.push(
      // 提瓦特大陆
      new TileLayer(tilemap, {
        minZoom: 10,
        maxZoom: 13,
        offset: [-5120, 0],
        getTileUrl(x, y, z) {
          return `https://assets.yuanshen.site/tiles_twt34_2/${z}/${x}_${y}.png`;
        }
      })
      // 渊下宫
      // new TileLayer(tilemap, {
      //   minZoom: 10,
      //   maxZoom: 13,
      //   getTileUrl(x, y, z) {
      //     return `https://assets.yuanshen.site/tiles_yxg2/${z}/${x}_${y}.png`;
      //   },
      // })
    );
    await fetchAccessToken();
    const { record } = await api("icon/get/list", { size: 1e3 });
    const iconSize = 32;
    const icons = {};
    for (const i of record) {
      icons[i.name] = i.url;
    }
    await addMarker(126);
    await addMarker(1242);
    await addMarker(1561);
    await addMarker(97);
    async function addMarker(id) {
      const markers = await api("marker/get/list_byinfo", { itemIdList: [id] });
      tilemap.markerLayers.push(
        new MarkerLayer(tilemap, {
          positions: markers.map(
            (i) => i.position.split(",").map((i2) => parseInt(i2))
          ),
          image: createMarkerImage(icons[markers[0].itemList[0].iconTag]),
          offset: [-5120, 0]
        })
      );
    }
    var node = document.createElement("div");
    node.innerHTML = `<svg width="32" height="32" viewBox="0 0 64 64" fill="none"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink">
  <g id="Page_01_PC" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
      <g id="\u5C55\u5F00/\u5305\u542B\u5207\u56FE" transform="translate(-912.000000, -444.000000)">
          <g id="loc_02_off" transform="translate(902.000000, 434.000000)">
              <circle id="\u692D\u5706\u5F62" fill-opacity="0.298595935" fill="#000000" cx="42" cy="42" r="32"></circle>
              <path d="M42,13 C58.0162577,13 71,25.9837423 71,42 C71,58.0162577 58.0162577,71 42,71 C25.9837423,71 13,58.0162577 13,42 C13,25.9837423 25.9837423,13 42,13 Z M42,20 C29.8497355,20 20,29.8497355 20,42 C20,54.1502645 29.8497355,64 42,64 C54.1502645,64 64,54.1502645 64,42 C64,29.8497355 54.1502645,20 42,20 Z" id="\u5F62\u72B6\u7ED3\u5408" fill="#FFFFFF"></path>
          </g>
      </g>
  </g>
  </svg>`;
    function createMarkerImage(url) {
      const canvas = document.createElement("canvas");
      const canvas2d = canvas.getContext("2d");
      import_dom_to_image.default.toPng(node).then(function(dataUrl) {
        const image = new Image();
        image.src = dataUrl;
        document.body.appendChild(image);
        image.addEventListener("load", () => {
          canvas.width = iconSize;
          canvas.height = iconSize;
          const radius = iconSize / 2;
          canvas2d.arc(radius, radius, radius, 0, 2 * Math.PI);
          canvas2d.fillStyle = "rgba(255, 255, 255, 0.5)";
          canvas2d.fill();
          let size = [image.width, image.height];
          if (image.width > image.height) {
            size = [iconSize, size[1] * iconSize / size[0]];
          } else {
            size = [size[0] * iconSize / size[1], iconSize];
          }
          canvas2d.drawImage(
            image,
            (iconSize - size[0]) / 2,
            (iconSize - size[1]) / 2,
            size[0],
            size[1]
          );
          tilemap.draw();
        });
      });
      return canvas;
    }
  }
  main();
})();
