(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var media = function media() {

  var CLASS = {
    OVERLAY_IS_ACTIVE: 'is-active',
    PDF: 'qt-media-container__pdf',
    VIDEO: 'qt-media-container__video',
    OVERLAY: 'qt-overlay',
    MEDIA_CONTAINER: 'qt-media-container'
  };

  var ATTR = {
    CARD: 'data-qt-card',
    PDF: 'data-qt-pdf',
    VIDEO: 'data-qt-video',
    OVERLAY: 'data-qt-overlay',
    MEDIA_CONTAINER: 'data-qt-media-container'
  };

  var removeContent = function removeContent() {
    $('[' + ATTR.OVERLAY + ']').remove();

    $('body').off('transitionend', removeContent);
  };

  $('[' + ATTR.CARD + ']').click(function () {
    var $card = $(this);
    var $elem = void 0;

    if ($card.attr(ATTR.PDF)) {
      $elem = $('<object onLoad="console.log">').addClass(CLASS.PDF).attr('data', $card.attr(ATTR.PDF)).attr('type', 'application/pdf');
    }

    if ($card.attr(ATTR.VIDEO)) {
      $elem = $('<video>').addClass(CLASS.VIDEO).attr('controls', '');

      var $source = $('<source>').attr('src', $card.attr(ATTR.VIDEO)).attr('type', 'video/mp4');

      $elem.append($source);
    }

    var $mediaContainer = $('<div>').addClass(CLASS.MEDIA_CONTAINER).attr(ATTR.MEDIA_CONTAINER, '').append($elem);

    var $overlay = $('<div>').addClass(CLASS.OVERLAY).attr(ATTR.OVERLAY, '').append($mediaContainer);

    $('body').append($overlay);

    setTimeout(function () {
      $overlay.addClass(CLASS.OVERLAY_IS_ACTIVE);
      $elem.laod();
    }, 10);
  });

  $(document).on('click', '[' + ATTR.OVERLAY + ']', function () {
    $('[' + ATTR.OVERLAY + ']').removeClass(CLASS.OVERLAY_IS_ACTIVE);
    $('body').on('transitionend', removeContent);
  });
};

exports.default = media;

},{}],2:[function(require,module,exports){
'use strict';

var _media = require('./components/media');

var _media2 = _interopRequireDefault(_media);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _media2.default)();

},{"./components/media":1}]},{},[2]);
