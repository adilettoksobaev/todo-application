import React, { Component } from 'react';

import './todo-list-item.scss';

export default class TodoListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {isToggleEdit: true};
    
    this.onEditClick = this.onEditClick.bind(this);
    this.inputRef = React.createRef();
  }
  onEditClick() {
    this.setState(state => {
      if(!state.isToggleEdit){
        const { id,onEdit } = this.props;
        onEdit(id,this.inputRef.current.value);
        this.inputRef.current.value = "";
      }
      return {
        isToggleEdit: !state.isToggleEdit
      }
    });   
  }

  render() {
    const { title, id, onDelete, onToggleDone, completed } = this.props;
    let classNames = 'todo__item-title';
  
    if (completed) {
      classNames += ' todo__item_done';
    }


    return (
      <div className="todo__item-content">
        <div className="todo__checkbox-group">
            <input name={title} checked={completed}  onChange={onToggleDone} className="styled-checkbox" id={`styled-checkbox-${id}`} type="checkbox" value={title} />
            <label htmlFor={`styled-checkbox-${id}`}></label>
            <div className="todo__item-edit">
              <span className={`${classNames} ${this.state.isToggleEdit ? 'show' : 'hidden'}`}>{title}</span>
              <input className={`todo__item-edit__input ${this.state.isToggleEdit ? 'hidden' : 'show'}`} 
                type="text" 
                defaultValue={title}
                ref={this.inputRef} 
                />
            </div>
        </div>
        <div className="todo__button-group">
          <button type="button" className="todo__item-edit" onClick={this.onEditClick}><i className="material-icons">edit</i></button>
          <button type="button" className="todo__item-delete" onClick={onDelete}><i className="material-icons">delete</i></button>
        </div>
      </div>
    );
  }
};
