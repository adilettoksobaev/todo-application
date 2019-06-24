import React, { Component } from "react";
import Axios from "axios";

import AppHeader from "../app-header";
import ItemStatusFilter from "../item-status-filter";
import SearchPanel from "../search-panel";
import TodoList from "../todo-list";
import ItemAddForm from "../item-add-form";

import "./app.scss";

export default class App extends Component {
  state = {
    items: [],
    title: "",
    search: "",
    filter: "all"
  };

  componentDidMount() {
    Axios.get("https://jsonplaceholder.typicode.com/todos").then(res => {
      this.setState({ items: res.data });
    });
  }

  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex(item => item.id === id);
    const oldItem = arr[idx];
    const value = !oldItem[propName];

    const item = { ...arr[idx], [propName]: value };
    return [...arr.slice(0, idx), item, ...arr.slice(idx + 1)];
  };

  onToggleDone = id => {
    this.setState(state => {
      const items = this.toggleProperty(state.items, id, "completed");
      return { items };
    });
  };

  onItemAdded = title => {
    Axios.post(`https://jsonplaceholder.typicode.com/todos`, {
      title,
      completed: false
    }).then(res => {
      this.setState({ items: [...this.state.items, res.data] });
    });
  };

  onEdit = (id, title) => {
    this.setState(state => {
      const items = state.items.map(item => {
        if (id === item.id) {
          item.title = title;
        }
        return item;
      });
      return { items: items };
    });
  };

  searchItems(items, search) {
    if (search.length === 0) {
      return items;
    }

    return items.filter(item => {
      return item.title.toLowerCase().indexOf(search.toLowerCase()) > -1;
    });
  }

  filterItems(items, filter) {
    if (filter === "all") {
      return items;
    } else if (filter === "active") {
      return items.filter(item => !item.completed);
    } else if (filter === "done") {
      return items.filter(item => item.completed);
    }
  }

  onSearchChange = search => {
    this.setState({ search });
  };

  onFilterChange = filter => {
    this.setState({ filter });
  };

  onDelete = id => {
    Axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).then(
      () => {
        this.setState(state => {
          const idx = state.items.findIndex(item => item.id === id);
          const items = [
            ...state.items.slice(0, idx),
            ...state.items.slice(idx + 1)
          ];
          return { items: items };
        });
      }
    );
  };

  render() {
    const { items, search, filter } = this.state;
    const doneCount = items.filter(item => item.completed).length;
    const toDoCount = items.length - doneCount;
    const visibleItems = this.searchItems(
      this.filterItems(items, filter),
      search
    );
    return (
      <div className="container">
        <AppHeader toDo={toDoCount} done={doneCount} />
        <div className="search-panel">
          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
          <SearchPanel onSearchChange={this.onSearchChange} />
        </div>
        <TodoList
          items={visibleItems}
          onDelete={this.onDelete.bind(this)}
          onToggleDone={this.onToggleDone.bind(this)}
          onEdit={this.onEdit.bind(this)}
        />
        <ItemAddForm onItemAdded={this.onItemAdded} />
      </div>
    );
  }
}
