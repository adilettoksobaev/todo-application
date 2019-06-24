import React, { Component } from 'react';

import './item-add-form.scss';

export default class ItemAddForm extends Component {

  state = {
    title: ''
  };

  onLabelChange = (e) => {
    this.setState({
      title: e.target.value
    })
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { title } = this.state;
    this.setState({ title: '' });
    const cb = this.props.onItemAdded || (() => {});
    cb(title);
  };

  render() {
    return (
      <form className="add-form" onSubmit={this.onSubmit}>
        <input type="text" className="add-form__input" 
          value={this.state.title}
          onChange={this.onLabelChange}
          placeholder="Add new ticket" />
        <button type="submit" className="add-form__button">Add</button>
      </form>
    );
  }
}
