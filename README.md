## Introduction

Ezel makes it easy to write and maintain Backbone apps that run in the browser and on the server using [Node.js](http://nodejs.org/). Built on popular libraries like [Express](http://expressjs.com/), [Backbone](http://backbonejs.org/), and [Browserify](http://browserify.org/), Ezel isn&apos;t a framework or library of its own, but rather a boilerplate of libraries and patterns that can be leveraged or abandoned as needed.

Ezel has three main philosophies...

### Modularity

Instead of managing growing complexity in projects by imposing rigid monolithic structure, Ezel encourages breaking your project up into smaller pieces that are easy to maintain and refactor independently.

### Flexiblity

Don&apos;t get locked into choosing between single page app or fully server-side rendered pages. Ezel&apos;s modular structure and shared server/client code makes it easy to decide what patterns and tools are best on a case by case basis.

### Run on Both Sides

Ezel [shares javascript modules that run in the browser and on the server](http://nerds.airbnb.com/isomorphic-javascript-future-web-apps/). This means you can [optimize initial page load](https://blog.twitter.com/2012/improving-performance-twittercom) and SEO by sharing templates that can render on the server or client. This also makes it easy to test all of your code in Node.js using [benv](http://github.com/artsy/benv) and [zombie](http://zombie.labnotes.org/) for robust, fast, and easy to set up tests.

## Getting Started

### Installation

1.  Install [Node.js](http://nodejs.org/)
2.  Install the Ezel project generator globally `npm install -g ezel`
3.  Generate your project `ezel myapp` (Use `ezel --coffeescript myapp` for coffeescript) and `cd` to the directory.
4.  Install node modules `npm install`
5.  Run the server `make s`
6.  Visit [localhost:4000](http://localhost:4000) and see an example that uses the GitHub API.
