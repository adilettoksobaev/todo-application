import React, { Component } from 'react';

import './search-panel.scss';

export default class SearchPanel extends Component {

  state = {
    term: ''
  };

  onTermChange = (e) => {
    const {onSearchChange = () => {}} = this.props;
    this.setState({
      term: e.target.value
    });

    onSearchChange(e.target.value);
  };

  render() {
    return (
      <input type="text"
             className="search-panel__input"
             placeholder="type to search"
             value={this.state.term}
             onChange={ this.onTermChange } />
    );
  };
}
