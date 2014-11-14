/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var TimeSlider = require('../../src/index');
var GistEmbed = require('react-gist-embed');
var MarkdownFile = require('react-markdown-file');
var ArticleMetadata = require('react-article-metadata');

// https://github.com/facebook/react-devtools
window.React = React;

var Demo = React.createClass({
  render: function() {
    return (
      <div className='Demo'>
        <div className="container">
          <article class="hentry">
            <header>
              <Masthead />
            </header>
            <div className="row">
              <div className="col-xs-12 col-md-9 col-md-offset-1">
                <div class="entry-content">
                  <MarkdownFile fileName='README.md'/>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }
});

var GithubButton = React.createClass({
  render: function() {
    var iframe = React.DOM.iframe({
      src: "http://ghbtns.com/github-btn.html?user=adamrneary&repo=react-time-slider&type=fork",
      allowtransparency: "true",
      frameborder: "0",
      scrolling: "0",
      width: "53",
      height: "20"
    });
    return iframe;
  }
});

var Masthead = React.createClass({
  render: function() {
    return (
      <div className="Masthead">
        <div className="row">
          <div className="col-xs-12 col-md-9 col-md-offset-1">
            <h1 className="entry-title">React Time Slider</h1>
            <div className="entry-summary">
              A React time slider component using JQuery-UI and Moment
            </div>
            <GithubButton user='adamrneary' repo='react-time-slider' />
            <div className="hidden">
              <ArticleMetadata author='Adam Neary' dateTimeString='2014-02-03'/>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-3 col-md-offset-1">
            <h4>Here is what it looks like:</h4>
            <Example />
          </div>
          <div className="col-xs-12 col-md-7">
            <h4>Here is how you use it:</h4>
            <GistEmbed gistId='a759fd68208808020598'/>
          </div>
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
      onChange: function(values) {
        console.log(values)
      }
    });
    return timeSlider;
  }
});

React.renderComponent(
  <Demo />,
  document.querySelector('body')
);
