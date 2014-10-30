/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');
var PropTypes = require('react/lib/ReactPropTypes');

// https://developer.zendesk.com/blog/rendering-to-iframes-in-react
function adjustHeightWhenComplete(myFrame, myDoc) {
  if(myDoc.readyState === 'complete') {
    var content_height = myFrame.contentWindow.document.documentElement.scrollHeight;
    myFrame.style.height = content_height + 'px';
  } else {
    // This will be continiously called until the iFrame is ready
    setTimeout(function(){adjustHeightWhenComplete(myFrame, myDoc)});
  }
};

// https://gist.github.com/jeremiahlee/1748966
var GistEmbed = React.createClass({
  displayName: 'GistEmbed',
  propTypes: {
    gistID: PropTypes.number.isRequired
  },
  componentDidMount: function() {

    // Create an iframe, append it to this document where specified
    var gistFrame = document.createElement("iframe");
    gistFrame.setAttribute("width", "100%");
    gistFrame.id = "gistFrame" + this.props.gistID;

    var zone = document.getElementById("gistZone" + this.props.gistID);
    zone.innerHTML = "";
    zone.appendChild(gistFrame);

    // Create the iframe's document

    var url = "https://gist.github.com/" + this.props.gistID + ".js";
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

    adjustHeightWhenComplete(gistFrame, gistFrameDoc);
  },
  render: function() {
    return (
      <div id={'gistZone' + this.props.gistID} />
    );
  }
});

module.exports = GistEmbed;
