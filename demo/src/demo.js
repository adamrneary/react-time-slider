/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var TimeSlider = require('../../src/index');

var Demo = React.createClass({
  render: function() {
    return (
      <div className="container">
        <h1>React Time Slider</h1>
        <p className="lead">
          A React time slider component using JQuery-UI and Moment
        </p>
        <TimeSlider />
      </div>
    );
  }
});

React.renderComponent(
  <Demo />,
  document.querySelector('body')
);
