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
          <ArticleMetadata />
        </div>
        <div className="Grid-cell u-size1of3">
          <TimeSlider data={this.timeSliderContext} />
        </div>
        <div className="Grid-cell u-size2of3">
          <GistEmbed />
        </div>
      </div>
    );
  }
});

// https://gist.github.com/jeremiahlee/1748966
var GistEmbed = React.createClass({
  getInitialState: function() {
    return {
      markup: '',
      gistId: 'a759fd68208808020598'
    }
  },
  componentDidMount: function() {

    // Create an iframe, append it to this document where specified
		var gistFrame = document.createElement("iframe");
		gistFrame.setAttribute("width", "100%");
		gistFrame.id = "gistFrame" + this.state.gistId;

		var zone = document.getElementById("gistZone" + this.state.gistId);
		zone.innerHTML = "";
		zone.appendChild(gistFrame);

		// Create the iframe's document

    var url = "https://gist.github.com/" + this.state.gistId + ".js";
		var gistFrameHTML = '<html><body><script type="text/javascript" src=' + url + '></script></body></html>';

		// Set iframe's document with a trigger for this document to adjust the height
		var gistFrameDoc = gistFrame.document;

		if (gistFrame.contentDocument) {
			gistFrameDoc = gistFrame.contentDocument;
		} else if (gistFrame.contentWindow) {
			gistFrameDoc = gistFrame.contentWindow.document;
		}

		gistFrameDoc.open();
		gistFrameDoc.writeln(gistFrameHTML);
		gistFrameDoc.close();

    setTimeout(function(){
      var content_height = gistFrame.contentWindow.document.documentElement.scrollHeight;
      gistFrame.style.height = content_height + 'px';
    }, 500);


  },
  render: function() {
    return (
      <div id={'gistZone' + this.state.gistId} />
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
