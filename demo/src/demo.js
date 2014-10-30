/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var TimeSlider = require('../../src/index');
var GistEmbed = require('../../src/react-gist-embed');
var MarkdownFile = require('../../src/react-markdown-file');
var ArticleMetadata = require('../../src/react-article-metadata');

var Demo = React.createClass({
  render: function() {
    return (
      <div className="Container--narrow">
        <article class="hentry">
          <header>
            <Jumbotron />
          </header>
          <div class="entry-content">
            <MarkdownFile fileName='README.md'/>
          </div>
        </article>
      </div>
    );
  }
});

var Jumbotron = React.createClass({
  timeSliderContext: {
    from: 201404,
    minFrom: 201402,
    to: 201408,
    maxTo: 201411,
    format: 'MMM YY'
  },

  render: function() {
    return (
      <div className="Grid Grid--withGutter">
        <div className="Grid-cell u-size1of1">
          <h1 className="entry-title">React Time Slider</h1>
          <div className="entry-summary">
            A React time slider component using JQuery-UI and Moment
          </div>
          <ArticleMetadata author='Adam Neary' dateTimeString='2014-02-03'/>
        </div>
        <div className="Grid-cell u-size1of3">
          <TimeSlider data={this.timeSliderContext} />
        </div>
        <div className="Grid-cell u-size2of3">
          <GistEmbed gistID='a759fd68208808020598'/>
        </div>
      </div>
    );
  }
});

React.renderComponent(
  <Demo />,
  document.querySelector('body')
);
