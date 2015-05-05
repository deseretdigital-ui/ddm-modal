var ksl = ksl || {};
ksl.assets = ksl.assets || {};
ksl.assets.modal = (function ($) {

  var scroll = {
    atTop: function (el, delta) {
      delta = delta || 0;
      return el.scrollTop + delta <= 0;
    },
    atBottom: function (el, delta) {
      delta = delta || 0;
      var currentScroll = el.scrollTop + el.offsetHeight;
      return currentScroll + delta >= el.scrollHeight;
    },
    cap: function (el) {
      if (this.atTop(el)) {
        el.scrollTop = 1;
      } else if (this.atBottom(el)) {
        el.scrollTop = el.scrollTop - 1;
      }
    },
    hasStuff: function (el) {
      // is there stuff to scroll?
      return el.offsetHeight < el.scrollHeight;
    },
    isolate: function (el, eventNamespace) {
      var scroll = this;
      var $element = $(el);

      // for mouse devices
      $element.on('wheel.scroll-isolate' + eventNamespace, function (event) {
        var el = this;

        // nothing to scroll
        if (!scroll.hasStuff(el)) {
          event.preventDefault();
          return;
        }

        // cap scroll if would leak to parent
        var delta = parseInt(event.originalEvent.deltaY, 10);
        var outOfBounds = scroll.atTop(el, delta) || scroll.atBottom(el, delta);
        if (outOfBounds) {
          scroll.cap(el);
          return;
        }

        // everything else
        event.stopImmediatePropagation();
      });

      // for touch devices
      $element.on('touchmove.scroll-isolate' + eventNamespace, function(event) {
        var el = this;

        // nothing to scroll
        if (!scroll.hasStuff(el)) {
          event.preventDefault();
          return;
        }

        // cap scroll prevents bounce on parents
        scroll.cap(el);
      });
    }
  };

  /*= helpers =*/

  var helpers = {};

  helpers.styleSupported = (function () {
    var supported = [];

    var check = function (property) {
      var body = document.body || document.documentElement;
      var style = body.style;

      // check for standard
      if (typeof style[property] == 'string') { return true; }

      // check for vendor specific
      var vendors = ['Moz', 'webkit', 'Webkit', 'Khtml', 'O', 'ms'];
      property = property.charAt(0).toUpperCase() + property.substr(1);

      for (var i = 0; i < vendors.length; i++) {
        var vendorProperty = vendors[i];
        if (typeof style[vendorProperty] == 'string') { return true; }
      }

      return false;
    };

    return function (property) {
      if (supported[property] === undefined) {
        supported[property] = check(property);
      }
      return supported[property];
    };
  })();



  /*= Modal constructor =*/

  var Modal = function ($element) {

    /* private */
    var modal = this;
    var preventCloseModal = false;
    scroll.isolate($element.get(0), '.ddm-modal');



    /* public */

    this.title = function (title) {
      $element.find('> .inner > .head > .title').html(title);
      return this;
    };

    this.body = function (body) {
      $element.find('> .inner > .body').html(body);
      return this;
    };

    this.isOpen = function () {
      return $element.hasClass('modal-open');
    };

    this.preventClose = function(prevent) {
      preventCloseModal = prevent || false;
    };

    this.open = function () {
      $element.trigger('open');
      return this;
    };

    this.close = function () {
      $element.trigger('close');
    };

    this.toggle = function () {
      $element.trigger('toggle');
    };

    this.addToggles = function ($toggle1, $toggle2, $toggle3) {
      var toggles = Array.prototype.slice.apply(arguments);
      $.each(toggles, function (index, $toggle) {
        $toggle.on('click', function (event) {
          event.preventDefault();
          $element.trigger('toggle');
        });
      });
      return this;
    };



    /* events */

    $element.on('open', function () {
      $element.scrollTop(0);
      $element.addClass('modal-open');
    });

    $element.on('close', function () {
      $element.removeClass('modal-open');
    });

    $element.on('toggle', function () {
      if (modal.isOpen()) {
        $element.trigger('close');
      } else {
        $element.trigger('open');
      }
    });

    $element.on('click', function (event) {
      if (event.target === this && !preventCloseModal) {
        $element.trigger('close');
      }
    });

    $element.on('wheel', function () {
      event.preventDefault();
    });

  };



  /*= modal function =*/
  var modal = function ($element) {
    $element = $element.eq(0); // only handles one modal at a time
    var api = $element.data('modal-api');
    if (!api) {
      api = new Modal($element);
      $element.data('modal-api', api);
    }
    return api;
  };



  /* jquery plugin */
  if (!$.fn.modal) {
    $.fn.modal = function () { return modal(this); };
  }



  return modal;


})(jQuery);
