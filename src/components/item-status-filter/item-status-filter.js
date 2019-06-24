import React from 'react';

import './item-status-filter.scss';

const filterButtons = [
  { name: 'all', label: 'All' },
  { name: 'active', label: 'Active' },
  { name: 'done', label: 'Done' }
];

const ItemStatusFilter = ({filter, onFilterChange = () => {}}) => {

  const buttons = filterButtons.map(({name, label}) => {
    const isActive = name === filter;
    const classNames = 'filter-group__btn ' + (isActive ? 'filter-group__btn-orange': '');

    return (
      <button key={name}
              type="button"
              onClick={() => onFilterChange(name)}
              className={classNames}>{label}</button>
    );
  });

  return (
    <div className="filter-group">
      { buttons }
    </div>
  );
};

export default ItemStatusFilter;
