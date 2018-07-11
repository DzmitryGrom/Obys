(function () {

  /*varibles*/
  var changePosition,
      changeClass,
      videoShow,
      getRandom,
      video = $('#video'),
      container = $('.container'),
      skipBtn = $('.slide__skip'),
      skipBtnPlay = $('.slide__play'),
      slideOne = $('.slide_one'),
      slideTwo = $('.slide_two'),
      playBtn = $('.slide__play'),
      cursor = $('.cursor'),
      noise = document.querySelector('.noise'),
      noiseStyle = noise.style;

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

  videoShow = function () {
    setTimeout(function () {
      video.get(0).volume = 0;
      container.addClass('container_change-size');
      $(skipBtn).removeClass('slide__skip_show');
    }, 34000);
  };

  changePosition = function () {
    slideOne.removeClass('slide_active');
    slideTwo.addClass('slide_active');
  };

  changeClass = function () {

  };

  skipBtn.on("click", function () {
    video.get(0).volume = 0;
    container.removeClass('container_hide');
    container.addClass('container_change-size');
    $(this).removeClass('slide__skip_show');
    if (!slideTwo.hasClass("slide_active")){
      changePosition();
    }
  });

  playBtn.on("click", function () {
    video.get(0).volume = 1;
    video.get(0).currentTime = 0;
    container.removeClass('container_change-size');
    $(skipBtn).addClass('slide__skip_show');
    videoShow();
  });

  if (!slideTwo.hasClass("slide_active")) {
    setTimeout(function () {
      video.trigger('play');
      video.trigger('currentTime');
      container.removeClass('container_hide');
      changePosition();
      videoShow();
    }, 3000);
  }

  skipBtnPlay.hover(function() {
    container.toggleClass('container_hover');
  });

})();