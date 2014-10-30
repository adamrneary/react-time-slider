/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var PropTypes = require('react/lib/ReactPropTypes');
var markdown = require('markdown').markdown;
var _ = require('lodash');

// https://gist.github.com/jeremiahlee/1748966
var ReactMarkdownFile = React.createClass({
  displayName: 'ReactMarkdownFile',
  propTypes: {
    fileName: PropTypes.string.isRequired
  },

  getInitialState: function() {
    return {
      md: ''
    }
  },
  componentDidMount: function() {
    $.get(this.props.fileName, _.bind(function(data) {
      this.setState({md: data});
    }, this));
  },
  render: function() {
    var rawMarkup = markdown.toHTML(this.state.md);
    return (
      <div class="entry-content">
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    );
  }
});

module.exports = ReactMarkdownFile;
