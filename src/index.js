/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var PropTypes = require('react/lib/ReactPropTypes');
var $ = window.$;
var moment = require('moment');

var TimeSlider = React.createClass({
  displayName: 'TimeSlider',
  propTypes: {
    minFrom: PropTypes.number.isRequired,
    maxTo: PropTypes.number.isRequired,
    initialFrom: PropTypes.number.isRequired,
    initialTo: PropTypes.number.isRequired,
    grain: PropTypes.oneOf(['daily', 'monthly', 'annual']),
    format: PropTypes.string,
    onChange: PropTypes.func
  },

  getDefaultProps: function() {
    return {
      grain: 'monthly',
      format: 'MMM YYYY',
      onChange: $.noop
    };
  },

  getInitialState: function() {
    return {
      from: this.props.initialFrom,
      to: this.props.initialTo,
    };
  },

  componentDidMount: function() {
    $('.Slider').slider({
      range: true,
      min: this.props.minFrom,
      max: this.props.maxTo,
      values: [this.props.initialFrom, this.props.initialTo],
      change: this.props.onChange
    });
  },

  render: function() {
    var title = new TimeSliderTitle({
      format: this.props.format,
      grain: this.props.grain,
      from: this.state.from,
      to: this.state.to
    })
    return (
      <div className='TimeSlider'>
        {title}
        <div className="Slider"></div>
      </div>
    );
  }
});

var TimeSliderTitle = React.createClass({
  propTypes: {
    format: PropTypes.string,
    grain:  PropTypes.string
  },
  getInitialState: function() {
    return {
      from: this.props.initialFrom,
      to: this.props.initialTo
    }
  },
  formatDate: function(dateInt) {
    var sourceFormats = {
      annual:   'YYYY',
      monthly:  'YYYYMM',
      daily:    'YYYYMMDD'
    };
    return moment(dateInt, sourceFormats[this.props.grain])
      .format(this.props.format);
  },
  render: function() {
    return (
      <div className="TimeSlider--label">
        <em>from </em>
        <strong>
          <div className="TimeSlider--from">
            {this.formatDate(this.props.from)}
          </div>
        </strong>
        <em> to </em>
        <strong>
          <div className="TimeSlider--to">
            {this.formatDate(this.props.to)}
          </div>
        </strong>
      </div>
    );
  }
});

module.exports = TimeSlider;
