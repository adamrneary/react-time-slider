/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var PropTypes = require('react/lib/ReactPropTypes');
var moment = require('moment');

// https://gist.github.com/jeremiahlee/1748966
var ReactArticleMetadata = React.createClass({
  displayName: 'ReactArticleMetadata',
  propTypes: {
    dateTimeString: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired
  },
  render: function() {
    return (
      <div className="metadata">
        <time className="published" datetime={moment(this.props.dateTimeString).format()}>
          {moment(this.props.dateTimeString).format('MMMM Do, YYYY')}
        </time>
        <div className="byline author vcard">
          <span className="fn">{this.props.author}</span>
        </div>
      </div>
    );
  }
});

module.exports = ReactArticleMetadata;
