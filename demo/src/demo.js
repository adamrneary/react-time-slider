/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var TimeSlider = require('../../src/index');
var GistEmbed = require('../../src/react-gist-embed');
var MarkdownFile = require('../../src/react-markdown-file');
var ArticleMetadata = require('../../src/react-article-metadata');

// https://github.com/facebook/react-devtools
window.React = React;

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
          <Example />
        </div>
        <div className="Grid-cell u-size2of3">
          <GistEmbed gistID='a759fd68208808020598'/>
        </div>
      </div>
    );
  }
});

var Example = React.createClass({
  render: function() {
    var timeSlider = TimeSlider({
      minFrom: 201402,
      maxTo: 201411,
      initialFrom: 201404,
      initialTo: 201408,
      onChange: function(values){console.log(values)}
    });
    return timeSlider;
  }
});

React.renderComponent(
  <Demo />,
  document.querySelector('body')
);
