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

  render() {
    const { categories } = this.state
    let revealCats;

    if(categories) {
       revealCats = categories.map((card, index) => {
        let { id, category } = card
        return (
          <div className="col-md-3" key={id}>
            <button className='btn btn-success' ref={category} id={id}>{category}</button>
          </div>
        )
      })
    } else {
      revealCats = <h3>No Categories Available to Show</h3>
    }
    return (
      <div>
        <h3>Add categories to your test deck by clicking on the available categories below</h3>
        {revealCats}
      </div>
    )
  }
}
