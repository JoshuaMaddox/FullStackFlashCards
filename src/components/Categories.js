import React, { Component } from 'react'
import ToAPIActions from '../actions/ToAPIActions'
import ServerActions from '../actions/ServerActions'
import CategoriesStore  from '../stores/CategoriesStore'
import {browserHistory} from "react-router";
import { Link } from "react-router"

export default class Categories extends Component {

  constructor() {
    super();
    this.state = {
      categories: CategoriesStore.getCategories()
    }
    this._onChange = this._onChange.bind(this)
    this.addCategory = this.addCategory.bind(this)
  }

  componentDidMount(){
    ToAPIActions.getCats()
  }

  componentWillMount() {
    CategoriesStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    CategoriesStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({ 
      categories: CategoriesStore.getCategories() 
    })
  }

  addCategory(e){
    e.preventDefault()
    console.log('e: ', e)
    let category = e.target.value
    document.getElementById(category).setAttribute('disabled', 'disabled');
    console.log('I am target.id: ', typeof e.target.id)
    ToAPIActions.selectCategory(category)
  }

  render() {
    const { categories } = this.state
    let revealCats;

    if(categories) {
       revealCats = categories.map((cat, index) => {
        return (
          <div className="col-md-3" key={index}>
            <button onClick={this.addCategory} className='btn btn-success categories' value={cat} id={cat}>{cat}</button>
          </div>
        )
      })
    } else {
      revealCats = <h3>No Categories Available to Show</h3>
    }
    return (
      <div>
        <div>
          <h3>Click the categories below to add them to your test then click on the start test button</h3>
          <Link to='/test' className="btn btn-danger">Take Test</Link>
        </div>
        {revealCats}
      </div>
    )
  }
}
