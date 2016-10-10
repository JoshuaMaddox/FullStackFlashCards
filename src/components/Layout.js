import React, { Component } from 'react'
import CardStore from '../stores/CardStore'
import ToAPIActions from '../actions/ToAPIActions'
import { Link } from 'react-router'
import EasyTransition from 'react-easy-transition'


export default class Layout extends Component {
  constructor() {
    super();
  }


  render() {
    return (
      <div className="mainContaienr">
        <div className="row mainRow">
          <div className="mainBanner">
          </div>
          <div className="col-md-4 bannerCont">
            <img className='headerImg' src="flashcards-01.png"/>
            <Link to='/card/new' className="addCards">Add Cards</Link>
          </div>
          <div className="col-md-4 bannerCont">
            <img className='headerImg' src="flashcards-02.png"/>
            <Link to='/card' className="seeAllCards">See All Cards</Link> 
          </div>
          <div className="col-md-4 bannerCont">
            <img className='headerImg' src="flashcards-03.png"/>
            <Link to='/card/categories' className="createTest">Create A Test</Link>
          </div>
        </div>
        <EasyTransition
          path={location.pathname}
          initialStyle={{opacity: 0}}
          transition="opacity 0.5s ease-in"
          finalStyle={{opacity: 1}}
        >
        {this.props.children}
        </EasyTransition>

      </div>

    )
  }
}
  