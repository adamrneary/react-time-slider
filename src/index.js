/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var $ = window.$;

var TimeSlider = React.createClass({
  componentDidMount: function() {
    $('.Slider').slider();
  },
  render: function() {
    return (
      <div className='react-time-slider'>
        <TimeSliderTitle />
        <div className="Slider"></div>
      </div>
    );
  }
});

var TimeSliderTitle = React.createClass({
  render: function() {
    return (
      <div className="time-slider-title">
        <em>from </em>
        <strong>
          <div className="from">Jan 2014</div>
        </strong>
        <em> to </em>
        <strong>
          <div className="to">Dec 2014</div>
        </strong>
      </div>
    );
  }
});

module.exports = TimeSlider;
