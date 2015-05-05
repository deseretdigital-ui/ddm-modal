# Modal

Creates a modal. See the [demo](http://creatives.deseretdigital.com/ksl-assets/build/static/components/modal/index.html).


## Setup

Attach files:

```html
<script src="ksl-assets/static/components/common.js"></script>
<link href="ksl-assets/static/components/modal/modal.css" rel="stylesheet" type="text/css" />
<script src="ksl-assets/static/components/modal/modal.js"></script>
```

The modal also relies on jQuery, which you probably already have somewhere.

```html
<div class="ksl-assets-modal">
  <div class="inner">
    <div class="head">
      <!-- anything you want here -->
    </div>
    <div class="body">
      <!-- anything you want here -->
    </div>
    <div class="foot">
      <!-- anything you want here -->
    </div>
  </div>
</div>
```

Then initialize with javascript.
In this example, the first element (`$('.modal-toggle-1')`) binds the button that opens the modal.
The second element (`$('.modal-1 .modal-toggle')`) binds all the close buttons within the modal.

```javascript
$(function () {

  ksl.assets.modal($('.modal-1')).addToggles(
    $('.modal-toggle-1'),
    $('.modal-1 .modal-toggle')
  );

});
```

If you don't like wiring up each modal one by one, you can do something like this:
In this example, the first element (`$toggle`) binds the button that opens the modal.
The second element (`$modal.find('.modal-toggle')`) binds all the close buttons within the modal.

```javascript
$(function () {

  $('.modal-toggle[data-modal]').each(function (index, toggle) {
    var $toggle = $(toggle);
    var $modal = $($toggle.data('modal'));
    ksl.assets.modal($modal).addToggles(
      $toggle,
      $modal.find('.modal-toggle')
    );
  });

});
```

This will find all `.modal-toggle` elements with a `data-modal` attribute and use the `data-modal`
attribute as the selector for the modal element, initialize the modal and add the selected toggle
and any other toggles that may be nested in the modal.

In the past we tried to wire up toggles for you for free but decided explicitly registering toggles
with your modals is cleaner and easier to manage.


## jQuery Plugin

Alternatively, a jQuery plugin is registered if there is no conflict with other jQuery plugins.
The code from the demo page would look like this instead:

In this example, the first element (`$('.modal-toggle-1')`) binds the button that opens the modal.
The second element (`$('.modal-1 .modal-toggle')`) binds all the close buttons within the modal.

```javascript
$(function () {

  $('.modal-1').modal().addToggles(
    $('.modal-toggle-1'),
    $('.modal-1 .modal-toggle')
  );

});
```


## API


### `ksl.assets.modal($element)`

Constructs a new modal object.

| Parameter  | Type   | Description                            |
|------------|--------|----------------------------------------|
| `$element` | jQuery | jQuery object that represents element. |

Returns a `Modal` object.


### `$element.modal()`

jQuery plugin and alias for `ksl.assets.modal($element)`. Only defined if it hasn't been
defined.


### `Modal`

Javascript object that represents a single modal.

| Method                                | Description                                                              |
|---------------------------------------|--------------------------------------------------------------------------|
| `isOpen()`                            | Tells you if the modal is open or not.                                   |
| `open()`                              | Triggers the open event.                                                 |
| `close()`                             | Triggers the close event.                                                |
| `toggle()`                            | If modal is open, triggers close. If modal is closed, triggers open.     |
| `addToggles($toggle1, $toggle2, ...)` | Attaches one or more toggles to the modal component.                     |
| `title(title)`                        | Sets the title of the modal element. Useful for reusing a modal element. |
| `body(body)`                          | Sets the body of the modal element. Useful for reusing a modal element.  |
| `preventClose(bool)`                  | Sets whether or not clicking outside the modal will close or not.        |

| Event    | Description                                                        |
|----------|--------------------------------------------------------------------|
| `open`   | Triggered when the modal begins opening.                           |
| `close`  | Triggered when the modal begins closing.                           |
| `toggle` | Triggered when a toggle is clicked. Triggers open or close events. |
