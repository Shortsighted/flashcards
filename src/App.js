import { Component } from 'react'
import WordCreator from './WordCreator.js'
import Dictionary from './Dictionary.js'
import './App.css'
import Homepage from './Homepage.js'

export default class App extends Component{
  state = {
    viewPermission: 'homepage',
    dictionary: {},
    wordAdded: ''
  }

  checkStatus = () => {
    if(this.state.viewPermission === 'homepage'){
      return <Homepage onClick={this.handleStartClick} />
    }else if(this.state.viewPermission === 'editor'){
      return(
        <>
          {this.state.wordAdded && <div className='popup'>{this.state.wordAdded}</div>}
          <WordCreator onSubmit={event => this.hadnleFormSubmit(event)}
                        viewDictionaryClick={this.handleViewDictionaryClick}
          />
        </>
      )
    }else if(this.state.viewPermission === 'dictionary'){
      return(
        <Dictionary dictionary={this.state.dictionary}/>
      )
    }
  }

  handleStartClick = () => {
    this.setState({
      viewPermission: 'editor'
    })
  }

  hadnleFormSubmit = (event) => {
    event.preventDefault()
    const temporaryDictionary = {}

    if(!this.state.dictionary[event.target.mainWord.value]){
      temporaryDictionary[event.target.mainWord.value] = event.target.translation.value

      this.setState({
        wordAdded: 'The word has been added!',
        dictionary: {
          ...this.state.dictionary,
          ...temporaryDictionary
        }
      })
    }else if(
      this.state.dictionary[event.target.mainWord.value].includes(event.target.translation.value)
    ){
      this.setState({
        wordAdded: 'The word already exists.',
        dictionary: {
          ...this.state.dictionary
        }
      })
    }else{
      temporaryDictionary[event.target.mainWord.value] = 
        `${this.state.dictionary[event.target.mainWord.value]}, ${event.target.translation.value}`
      this.setState({
        wordAdded: 'The word has been edited.',
        dictionary: {
          ...this.state.dictionary,
          ...temporaryDictionary
        }
      })
    }

    setTimeout(() => {
      this.setState({
        wordAdded: ''
      })
    }, 10000)

    console.log(this.state.dictionary)
  }

  handleViewDictionaryClick = () => {
    this.setState({
      viewPermission: 'dictionary'
    })
  }

  render(){
    return this.checkStatus()
  }
}
