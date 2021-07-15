import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';




class Todos extends Component{
  constructor(){
    super();
    this.state = {
      filter: {
        difficulty: '',
        complete: ''
      }
    };
    this.navigate = this.navigate.bind(this);
  }
  componentDidMount(){
    const filter = this.props.match.params.filter; 
    if(filter){
      this.setState({ filter: JSON.parse( filter ) });
    }
  }
  componentDidUpdate(prevProps){
    if(prevProps.match.params.filter !== this.props.match.params.filter){
      const filter = this.props.match.params.filter; 
      if(filter){
        this.setState({ filter: JSON.parse( filter ) });
      }
      else {
        this.setState({ filter: { complete: '', difficulty: ''} });
      }
    }
  }
  navigate(ev){
    const filter = {...this.state.filter };
    let value = ev.target.value;
    if(value === 'true'){
      value = true;
    }
    if(value === 'false'){
      value = false;
    }
    const name = ev.target.name;
    filter[name] = value === filter[name] ? '' : value;
    this.props.history.push(`/${JSON.stringify(filter)}`);
  }
  render(){
    const { navigate } = this;
    const { todos } = this.props;
    const { filter } = this.state;
    const { difficulty, complete } = filter;

    const filtered = todos
      .filter( todo => difficulty === '' || difficulty === todo.difficulty)
      .filter( todo => complete === '' || complete === todo.complete)

    return (
      <div>
        <pre>
          { JSON.stringify( filter )}
        </pre>
        <ul>
          <li>
            <Link to='/'>Clear</Link>
          </li>
          <li>
            <h3>Difficulty</h3>
            <div className='choices'>
              <label>
                All
                <input type='checkbox' value='' checked={ difficulty === ''} onChange={ navigate } name='difficulty'/> 
              </label>
              <label>
                Easy
                <input type='checkbox' value='E' checked={ difficulty === 'E'} onChange={ navigate } name='difficulty' /> 
              </label>
              <label>
                Medium
                <input type='checkbox' value='M' checked={ difficulty === 'M'} onChange={ navigate } name='difficulty' /> 
              </label>
              <label>
                Difficult
                <input type='checkbox' value='D' checked={ difficulty === 'D'} onChange={ navigate } name='difficulty' /> 
              </label>
            </div>
          </li>
          <li>
            <h3>Complete</h3>
            <div className='choices'>
              <label>
                All
                <input type='checkbox' checked={ complete === '' } value='' name='complete' onChange={ navigate } />
              </label>
              <label>
                Complete
                <input type='checkbox' checked={ complete === true } value={ true } name='complete' onChange={ navigate } />
              </label>
              <label>
                Incomplete
                <input type='checkbox' checked={ complete === false } value={ false } name='complete' onChange={ navigate } />
              </label>
            </div>
          </li>
        </ul>
        <ul>
          {filtered.map((todo) => {
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
