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

    const difficultyMap = todos.reduce((acc, todo)=> {
      acc.all++;
      acc[todo.difficulty] = acc[todo.difficulty] || 0;
      acc[todo.difficulty]++;
      return acc;
    }, { all: 0});

    const completeMap = todos.reduce((acc, todo)=> {
      acc.all++;
      acc[todo.complete] = acc[todo.complete] || 0;
      acc[todo.complete]++;
      return acc;
    }, { all: 0});

    console.log(difficultyMap, completeMap);

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
                All ( { difficultyMap.all } )
                <input type='checkbox' value='' checked={ difficulty === ''} onChange={ navigate } name='difficulty'/> 
              </label>
              <label>
                Easy ( { difficultyMap.E } )
                <input type='checkbox' value='E' checked={ difficulty === 'E'} onChange={ navigate } name='difficulty' /> 
              </label>
              <label>
                Medium ( { difficultyMap.M } )
                <input type='checkbox' value='M' checked={ difficulty === 'M'} onChange={ navigate } name='difficulty' /> 
              </label>
              <label>
                Difficult ( { difficultyMap.D } )
                <input type='checkbox' value='D' checked={ difficulty === 'D'} onChange={ navigate } name='difficulty' /> 
              </label>
            </div>
          </li>
          <li>
            <h3>Complete</h3>
            <div className='choices'>
              <label>
                All ({ completeMap.all})

                <input type='checkbox' checked={ complete === '' } value='' name='complete' onChange={ navigate } />
              </label>
              <label>
                Complete ({ completeMap['true']})
                <input type='checkbox' checked={ complete === true } value={ true } name='complete' onChange={ navigate } />
              </label>
              <label>
                Incomplete ({ completeMap['false']})
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
