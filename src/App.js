import { Component } from 'react'
import WordCreator from './WordCreator.js'
import Dictionary from './Dictionary.js'
import './App.css'
import Homepage from './Homepage.js'

export default class App extends Component{
  state = {
    viewPermission: false,
    dictionary: {},
    wordAdded: ''
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
      viewPermission: true
    })
  }

  render(){
    return (
      <>
        <Homepage />
        {/* {
          !this.state.viewPermission ? 
          (
            <>
              {this.state.wordAdded && <div className='popup'>{this.state.wordAdded}</div>}
              <WordCreator onSubmit={event => this.hadnleFormSubmit(event)}
                            viewDictionaryClick={this.handleViewDictionaryClick}
              />
            </>
          ) 
          :
          (
            <Dictionary dictionary={this.state.dictionary}/>
          )
        } */}
      </>
      )
  }
}
