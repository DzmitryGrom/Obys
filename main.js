(function () {

  /*varibles*/
  var changePosition,
    isTouchDevice,
    autoCloseVideo,
    addAnimateText,
    addAnimateButton,
    removeAnimateText,
    video = $('#video'),
    animateText = $('#animate'),
    headerElem = $('.slide__header'),
    footerElem = $('.slide__footer'),
    text = $('.slide__text-center'),
    slideBtnStart = $('.slide__start'),
    container = $('.container'),
    poster = $('#poster'),
    skipBtn = $('.slide__skip'),
    slideBtnPlay = $('.slide__play'),
    slideOne = $('.slide_one'),
    slideTwo = $('.slide_two'),
    playBtn = $('.slide__play'),
    cursor = $('.cursor');

  /*анимация переходов слайдов*/

  autoCloseVideo = function () {
    video.on('ended', function () {
      container.addClass('container_change-size');
      skipBtn.removeClass('slide__skip_show');
      video.trigger('stop');
      addAnimateText();
      addAnimateButton();
    });
  };

  addAnimateButton = function () {
    setTimeout(function () {
      playBtn.addClass('slide__play_show');
    }, 250);

  };

  addAnimateText = function () {
    setTimeout(function () {
      headerElem.addClass('slide__show');
      footerElem.addClass('slide__show');
      animateText.addClass('slide__animate-text_show');
      playBtn.addClass('slide__play_show');
    }, 700);
  };

  removeAnimateText = function () {
    animateText.removeClass('slide__animate-text_show');
    headerElem.removeClass('slide__show');
    footerElem.removeClass('slide__show');
    playBtn.removeClass('slide__play_show');
  };

  changePosition = function () {
    slideOne.removeClass('slide_active');
    slideTwo.addClass('slide_active');
  };

  isTouchDevice = function () {
    return 'ontouchstart' in document.documentElement;
  }

  skipBtn.on("click", function () {
    video.get(0).volume = 0;
    video.get(0).currentTime = 0;
    video.trigger('pause');
    container.removeClass('container_hide');
    container.addClass('container_change-size');
    addAnimateText();
    addAnimateButton();
    $(this).removeClass('slide__skip_show');
    if (!slideTwo.hasClass("slide_active")) {
      changePosition();
    }
  });

  playBtn.on("click", function () {
    setTimeout(function () {
      video.trigger('play');
      video.get(0).volume = 1;
      video.get(0).currentTime = 0;
      container.removeClass('container_change-size');
      skipBtn.addClass('slide__skip_show');
    }, 100);
    removeAnimateText();
    autoCloseVideo();
  });

  slideBtnStart.on("click", function () {
    video.trigger('currentTime');
    video.trigger('play');
    autoCloseVideo();
    container.removeClass('container_hide');
    changePosition();
  });

  if (!slideTwo.hasClass("slide_active")) {
    setTimeout(function () {
      text.addClass('slide__text-center_hide');
      slideBtnStart.addClass('slide__start_show');
    }, 3000);
  }

  if (!isTouchDevice()) {
    /*Hover*/
    slideBtnPlay.hover(function () {
      poster.toggleClass('poster_hover');
    });
    /*cursur*/

    $(document)
      .mousemove(function (e) {
        cursor
          .eq(0)
          .css({
            left: e.pageX,
            top: e.pageY
          });
        setTimeout(function () {
          cursor
            .eq(1)
            .css({
              left: e.pageX,
              top: e.pageY
            });
        }, 100);
      });
  } else {
    cursor.css({display: 'none'});

    $(document)
      .mousemove(function (e) {
        cursor
          .eq(0)
          .css({
            display: 'none'
          });
        setTimeout(function () {
          cursor
            .eq(1)
            .css({
              display: 'none'
            });
        }, 100);
      });
  }

})();