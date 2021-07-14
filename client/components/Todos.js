import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';



class Todos extends Component{
  constructor(){
    super();
  }
  render(){
    const { todos } = this.props;

    return (
      <div>
        <ul>
          {todos.map((todo) => {
            return (
              <li key={todo.id}>
                <h2 className={ todo.complete ? 'complete': ''}>
                  <Link to={`/todos/${todo.id}`}>Task: {todo.taskName}</Link>
                </h2>
                <h3>{ todo.difficulty }</h3>
                <p>assigned by {todo.assignee}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };
}

const mapStateToProps = ({ todos }) => ({
  todos
});

export default connect(mapStateToProps)(Todos);
