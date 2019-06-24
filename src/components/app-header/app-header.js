import React from 'react';
import './app-header.scss';

const AppHeader = ({toDo, done}) => {
  return (
    <div className="app-header">
      <h1 className="app-header__title">Todo Application</h1>
      <span className="app-header__count">{toDo} more to do, {done} done</span>
    </div>
  );
};

export default AppHeader;
