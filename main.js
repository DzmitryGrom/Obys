(function () {

  /*varibles*/
  var changePosition,
    getRandom,
    isTouchDevice,
    autoCloseVideo,
    addAnimateText,
    removeAnimateText,
    video = $('#video'),
    animateText = $('#animate'),
    text = $('.slide__text-center'),
    slideBtnStart = $('.slide__start'),
    container = $('.container'),
    skipBtn = $('.slide__skip'),
    slideBtnPlay = $('.slide__play'),
    slideOne = $('.slide_one'),
    slideTwo = $('.slide_two'),
    playBtn = $('.slide__play'),
    cursor = $('.cursor'),
    noise = document.querySelector('.noise'),
    noiseStyle = noise.style;


  /*анимация переходов слайдов*/


  autoCloseVideo = function () {
    video.on('ended', function () {
      container.addClass('container_change-size');
      skipBtn.removeClass('slide__skip_show');
      video.attr('loop', 'loop');
      video.get(0).volume = 0;
      video.get(0).currentTime = 0;
      video.trigger('play');
      addAnimateText();
    });
  };

  addAnimateText = function () {
    setTimeout(function () {
      animateText.addClass('slide__animate-text_show');
      setTimeout(function () {
        animateText.removeClass('slide__animate-text_start');
      }, 500);
    }, 1000);
  };

  removeAnimateText = function () {
    animateText.removeClass('slide__animate-text_show');
    animateText.addClass('slide__animate-text_hide');
    setTimeout(function () {
      animateText.removeClass('slide__animate-text_hide');
      animateText.addClass('slide__animate-text_start');
    }, 500);
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
    video.trigger('play');
    video.attr('loop', 'loop');
    container.removeClass('container_hide');
    container.addClass('container_change-size');
    addAnimateText();
    $(this).removeClass('slide__skip_show');
    if (!slideTwo.hasClass("slide_active")) {
      changePosition();
    }
  });

  playBtn.on("click", function () {
    setTimeout(function () {
      video.removeAttr('loop');
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

  slideBtnPlay.hover(function () {
    container.toggleClass('container_hover');
  });

  if (!isTouchDevice()) {
    /*шум*/
    getRandom = function (max) {
      return Math.floor(Math.random() * ++max);
    };
    setInterval(function () {
      noiseStyle.backgroundPosition = getRandom(200) + 'px ' + getRandom(200) + 'px';
    }, 50);

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