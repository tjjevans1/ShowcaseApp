const media = () => {

  const CLASS = {
    OVERLAY_IS_ACTIVE: 'is-active',
    PDF: 'qt-media-container__pdf',
    VIDEO: 'qt-media-container__video',
    OVERLAY: 'qt-overlay',
    MEDIA_CONTAINER: 'qt-media-container',
    CLOSE_BUTTON: 'qt-close-button'
  };

  const ATTR = {
    CARD: 'data-qt-card',
    PDF: 'data-qt-pdf',
    VIDEO: 'data-qt-video',
    SUBS: 'data-qt-subs',
    OVERLAY: 'data-qt-overlay',
    MEDIA_CONTAINER: 'data-qt-media-container',
    CLOSE_BUTTON: 'data-qt-close-button'
  };

  const startVideo = function(element) {
    element[0].play();

    $('body').off('transitionend', startVideo);
  }

  const removeContent = function() {
    $(`[${ATTR.OVERLAY}]`).remove();

    $('body').off('transitionend', removeContent);
  };

  $(`[${ATTR.CARD}]`).click(function() {
    const $card = $(this);
    let $elem;

    if ($card.attr(ATTR.PDF)) {
      $elem = $('<object>')
        .addClass(CLASS.PDF)
        .attr('data', $card.attr(ATTR.PDF))
        .attr('type', 'application/pdf');
    }

    if ($card.attr(ATTR.VIDEO)) {
      $elem = $('<video>')
        .addClass(CLASS.VIDEO)
        .attr('controls', '');

      let $source = $('<source>')
        .attr('src', $card.attr(ATTR.VIDEO))
        .attr('type', 'video/mp4');

      $elem.append($source);

      if ($card.attr(ATTR.SUBS)) {
        let $subs = $('<track>')
          .attr('src', $card.attr(ATTR.SUBS))
          .attr('label', 'English')
          .attr('kind', 'subtitles')
          .attr('srclang', 'en')
          .attr('default', '');

        $elem.append($subs);
      }
    }

    const $mediaContainer = $(`<div>`)
      .addClass(CLASS.MEDIA_CONTAINER)
      .attr(ATTR.MEDIA_CONTAINER, '')
      .append($elem);

    const $closeButton = $('<button>')
      .addClass(CLASS.CLOSE_BUTTON)
      .attr(ATTR.CLOSE_BUTTON, '')

    const $overlay = $(`<div>`)
      .addClass(CLASS.OVERLAY)
      .attr(ATTR.OVERLAY, '')
      .append($mediaContainer)
      .append($closeButton);


    $('body').append($overlay);

    $elem.ready(() => {
      $overlay.addClass(CLASS.OVERLAY_IS_ACTIVE);

      if ($card.attr(ATTR.VIDEO)) {
        $('body').on('transitionend', startVideo($elem));
      }
    });
  });

  $(document).on('click', `[${ATTR.OVERLAY}]`,  `[${ATTR.CLOSE_BUTTON}]`, function() {

    $(`[${ATTR.OVERLAY}]`).removeClass(CLASS.OVERLAY_IS_ACTIVE);
    $('body').on('transitionend', removeContent);
  });

};

export default media;