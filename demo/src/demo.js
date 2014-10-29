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
        <div className="Grid-cell u-size1of2 u-before1of2">
          <h1 className="entry-title">React Time Slider</h1>
        </div>
        <div className="Grid-cell u-size1of2">
          <GistEmbed />
        </div>
        <div className="Grid-cell u-size1of2">
          <div className="entry-summary">
            A React time slider component using JQuery-UI and Moment
          </div>
          <ArticleMetadata />
          <TimeSlider data={this.timeSliderContext} />
        </div>
      </div>
    );
  }
});

// https://gist.github.com/jeremiahlee/1748966
var GistEmbed = React.createClass({
  getInitialState: function() {
    return {
      markup: ''
    }
  },
  componentDidMount: function() {

  	// Create an iframe, append it to this document where specified
		var gistFrame = document.createElement("iframe");
		gistFrame.setAttribute("width", "100%");
		gistFrame.id = "gistFrame";

		var zone = document.getElementById("gistZone");
		zone.innerHTML = "";
		zone.appendChild(gistFrame);

		// Create the iframe's document
    var gistId = 'adamrneary/a759fd68208808020598';
		var gistFrameHTML = '<html><body onload="parent.adjustIframeSize(document.body.scrollHeight)"><scr' + 'ipt type="text/javascript" src="https://gist.github.com/' + gistId + '.js"></sc'+'ript></body></html>';

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

		console.log("iframe added");

    function adjustIframeSize(newHeight) {
  		var i = document.getElementById("gistFrame");
  		i.style.height = parseInt(newHeight) + "px";
  		console.log("size adjusted", newHeight);
  	}















    // var url = 'https://gist.github.com/' + gistId + '.json';


  },
  render: function() {
    return (
      <div id='gistZone' />
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
