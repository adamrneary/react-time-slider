## Introduction

A common use case for the [jQuery UI Slider](http://api.jqueryui.com/slider) is
to allow the user to specify a date range which then impacts the other elements
on the page.

Often, the dates impact the state of the app, which in turn is reflected in the
URL via the router, though raw or formatted dates are not suitable for this
purpose.

One solution is to ask the router to serialize the date into an Integer and ask
the labels around the slider to format the date as desired, but the couples the
two and creates extra work.

Instead, this component receives and returns Integers, allowing the user to
specify a grain (annual, monthly, or daily) for the slider itself as well as
the format for its labels.

## Getting started

Install via npm:

    npm install --save react-time-slider

Then simply require and pass configuration.

    var TimeSlider = require('react-time-slider');

    var Example = React.createClass({
      render: function() {
        var timeSlider = TimeSlider({
          minFrom: 201402,
          maxTo: 201411,
          initialFrom: 201404,
          initialTo: 201408,
          onChange: function(values) {
            console.log(values)
          }
        });
        return timeSlider;
      }
    });

## API

The component receives and returns Integers, so the grain at which the slider
is set naturally impacts the other component properties.

**grain** (Optional Enum, default `monthly`)

The grain of the time slider can be set to `daily`, `monthly`, or `annual`.

* If the grain is set to `annual`, dates will be Integers of the format `YYYY`.
* If the grain is set to `monthly`, dates will be Integers of the format `YYYYMM`.
* If the grain is set to `daily`, dates will be Integers of the format `YYYYMMDD`.

**minFrom** and **maxTo** (Required Numbers)

These properties reflect the overall valid range of the slider, passed as
Integers of the specified grain. These values are immutable.

**initialFrom** and **initialTo** (Required Numbers)

These properties reflect the initial values of the range itself. They are only
used in initializing the slider. Once initialized, the slider uses internal
state to keep track of the current range values.

**format** (Optional String, default `MMM YYYY`)

The format property is used by Moment.js to format its labels associated with
the current state of the slider.

**onChange** (Optional Function, default $.noop)

The slider internally handles the jQuery UI Slider onSlide event to update its
labels, but the values are only returned to the caller on the Change event.

See [jQuery UI Slider's documentation](http://api.jqueryui.com/slider/#event-slide)
for more detailed event descriptions.

The function is **not** passed the event and values arguments, but rather just
an array of length two with the from and to values as Integers of the specified
grain.
