import React from 'react';
import TodoListItem from '../todo-list-item'

import './todo-list.scss';

const TodoList = ({ items, onDelete, onToggleDone, onEdit}) => {
    const elements = items.map((item) => {
        // console.log(item);
        return (
            <li key={Math.random()} className="todo__item">
                <TodoListItem
                    { ...item }
                    onDelete={ () => onDelete(item.id) }
                    onToggleDone={() => onToggleDone(item.id)}
                    onEdit={onEdit}
                />
            </li>
        );
    });
    return (<ul className="todo">{ elements }</ul>)
}

export default TodoList;