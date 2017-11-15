const media = () => {

  const CLASS = {
    OVERLAY_IS_ACTIVE: 'is-active',
    PDF: 'qt-media-container__pdf',
    VIDEO: 'qt-media-container__video',
    OVERLAY: 'qt-overlay',
    MEDIA_CONTAINER: 'qt-media-container',
  };

  const ATTR = {
    CARD: 'data-qt-card',
    PDF: 'data-qt-pdf',
    VIDEO: 'data-qt-video',
    OVERLAY: 'data-qt-overlay',
    MEDIA_CONTAINER: 'data-qt-media-container'
  };

  const removeContent = function() {
    $(`[${ATTR.OVERLAY}]`).remove();

    $('body').off('transitionend', removeContent);
  };

  $(`[${ATTR.CARD}]`).click(function() {
    const $card = $(this);
    let $elem;

    if ($card.attr(ATTR.PDF)) {
      $elem = $('<object onLoad="console.log">')
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
    }

    const $mediaContainer = $(`<div>`)
      .addClass(CLASS.MEDIA_CONTAINER)
      .attr(ATTR.MEDIA_CONTAINER, '')
      .append($elem);

    const $overlay = $(`<div>`)
      .addClass(CLASS.OVERLAY)
      .attr(ATTR.OVERLAY, '')
      .append($mediaContainer);

    $('body').append($overlay);

    setTimeout(() => {
      $overlay.addClass(CLASS.OVERLAY_IS_ACTIVE);
      $elem.laod();
    }, 10);
  });

  $(document).on('click', `[${ATTR.OVERLAY}]`, function() {
    $(`[${ATTR.OVERLAY}]`).removeClass(CLASS.OVERLAY_IS_ACTIVE);
    $('body').on('transitionend', removeContent);
  });

};

export default media;