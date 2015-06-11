'use strict';

var React = require('react');

module.exports = React.createClass({
  render: function() {
    return <li>{this.props.data.noteBody}</li>;
  }
});
