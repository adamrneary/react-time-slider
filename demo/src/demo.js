/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var _ = require('lodash');
var markdown = require('markdown').markdown;
var TimeSlider = require('../../src/index');

var Demo = React.createClass({
  render: function() {
    return (
      <div className="Container--narrow">
        <article class="hentry">
          <header>
            <Jumbotron />
          </header>
          <Readme />
        </article>
      </div>
    );
  }
});

var Jumbotron = React.createClass({
  render: function() {
    return (
      <div className="Grid Grid--withGutter">
        <div className="Grid-cell u-size1of2 u-before1of2">
          <h1 className="entry-title">React Time Slider</h1>
        </div>
        <div className="Grid-cell u-size1of2">
          <CodeExample />
        </div>
        <div className="Grid-cell u-size1of2">
          <div className="entry-summary">
            A React time slider component using JQuery-UI and Moment
          </div>
          <ArticleMetadata />
          <TimeSlider />
        </div>
      </div>
    );
  }
});

var CodeExample = React.createClass({
  render: function() {
    return (
      <pre>code here</pre>
    );
  }
});

var ArticleMetadata = React.createClass({
  render: function() {
    return (
      <div className="metadata">
        <time className="published" datetime="2012-01-07 11:11:03-0400">
          January 7, 2007
        </time>
        <div className="byline author vcard">
          <span className="fn">Adam Neary</span>
        </div>
      </div>
    );
  }
});

var Readme = React.createClass({
  getInitialState: function() {
    return {
      md: ''
    }
  },
  componentDidMount: function() {
    $.get('README.md', _.bind(function(data) {
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

React.renderComponent(
  <Demo />,
  document.querySelector('body')
);
