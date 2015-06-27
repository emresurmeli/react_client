'use strict';

var React    = require('react');
var NoteList = require('./components/notes_list.jsx');
var request  = require('superagent');
var Options   = require('./components/button_component.jsx');

var App = React.createClass({
  // set default state
  getInitialState: function() {
    return {notes: [], title: "Notes: "};
  },

  // check if server connected
  componentDidMount: function() {
    request
      .get('/api/notes')
      .end(function(err, res) {
        if(err) return console.log(err);

        this.setState({notes: res.body});
      }.bind(this));
  },

  // set state
  render: function() {
    return (
      <main>
        <h1>{this.state.title}</h1>
        <NoteList data={this.state.notes} />
        <Options />
      </main>
    )
  }
});

React.render(<App />, document.body);
