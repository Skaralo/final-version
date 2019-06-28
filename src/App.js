import React, { Component } from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input }
from 'reactstrap';



class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      firstName : '',
      result : null,
      error: null
    }
  }

  inputChanged = e => {
    this.setState({ [e.target.name] : e.target.value })
  }

  inputSubmited = e => {
    e.preventDefault();
    this.setState({error : ''})
    if(this.state.firstName === ''){
      this.setState({error : 'enter a tag to start searching'})
    } else  {
      let tag = this.state.firstName;
      axios.get(`https://api.stackexchange.com/2.2/search?order=desc&sort=activity&tagged=${tag}&site=stackoverflow`)
      .then( response => {
        this.setState({result : response.data.items})
      
      })
      .catch( error => {
        console.log(error);
      });
  }
  }

  render() {
    let { result, error } = this.state
    return (
      <div>
      <br></br>
      <h2>Search Stackoverflow by language name</h2>
      <br></br>
      <h5>Tag the languages you are using and search articles.</h5>
        <Form
        onSubmit={this.inputSubmited} className='form-inline'>
          <div class='form-group mb-2'>
          <Input type='text' placeholder='enter tag name' name='firstName' onChange={this.inputChanged}></Input>
          </div>
          <Button class='btn btn-secondary active'>search</Button>
        </Form>
        <br></br>
        <div>
          <h3>
            {error && error}
          </h3>
        </div>
        <div>
          {result && result.map(value => {
            return(
              
                <ul key={value.question_id}>
                  <li>
                    <p>Title : {value.title} <a href={value.link}>see more ..</a></p>
                    by : {value.owner.display_name}
                  </li>
                  <hr />
                </ul>
               
            )
          })}
        </div>
        <br></br>
        <div class='madeBy'>@Mathilde</div>
      </div>
    )
  }
}

export default App;
