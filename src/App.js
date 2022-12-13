import { Component } from 'react'
import CardCreator from './CardCreator.js'
import Dictionary from './Dictionary.js'
import './App.css'

export default class App extends Component{
  state = {
    viewPermission: false,
    dictionary: {}
  }

  hadnleFormSubmit = (event) => {
    event.preventDefault()
    const temporaryDictionary = {}

    if(!this.state.dictionary || !this.state.dictionary[event.target.mainWord.value]){
      temporaryDictionary[event.target.mainWord.value] = event.target.translation.value
    }else{
      console.log('This word already exists.')
    }


    this.setState({
      dictionary: {
        ...this.state.dictionary,
        ...temporaryDictionary
      }
    })

    console.log(this.state.dictionary)
  }

  handleViewDictionaryClick = () => {
    this.setState({
      viewPermission: true
    })
  }

  render(){
    return (
      <>
        {
          !this.state.viewPermission ? 
          (<CardCreator onSubmit={event => this.hadnleFormSubmit(event)}
                        viewDictionaryClick={this.handleViewDictionaryClick}
           />) 
          :
          (
            <Dictionary />
          )
        }
      </>
      )
  }
}
