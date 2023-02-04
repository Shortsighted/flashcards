import { Component } from 'react'
import WordCreator from './WordCreator.js'
import Collection from './Collection.js'
import './App.css'
import Homepage from './Homepage.js'

export default class App extends Component{
  state = {
    viewPermission: 'homepage',
    collectionStatus: 'empty',
    collection: {},
    newWordStatus: '',
    newFolderStatus: ''
  }

  checkStatus = () => {
    if(this.state.viewPermission === 'homepage'){
      return <Homepage onClick={this.handleStartClick} />
    }else if(this.state.viewPermission === 'collection'){
      return(
        <Collection collectionStatus={this.state.collectionStatus} 
                    collection={this.state.collection}
                    newFlashcardClick={this.handleNewFlashcardClick}
                    newFolderClick={this.handleNewFolderClick}
                    takeNewFolderName={this.state.takeNewFolderName}
                    createNewFolder={event => this.handleCreateNewFolderClick(event)}
                    newFolderStatus={this.state.newFolderStatus}
        />
      )
    }else if(this.state.viewPermission === 'editor'){
      return(
        <>
          <WordCreator onSubmit={event => this.hadnleFormSubmit(event)}
                        viewCollectionClick={this.handleViewCollectionClick}
                        newWordStatus={this.state.newWordStatus}
          />
        </>
      )
    }
  }

  handleStartClick = () => {
    this.setState({
      viewPermission: 'collection'
    })
  }

  handleNewFlashcardClick = () => {
    this.setState({
      viewPermission: 'editor'
    })
  }

  handleNewFolderClick = () => {
    this.setState({
      takeNewFolderName: true
    })
  }

  handleCreateNewFolderClick = (event) => {
    event.preventDefault()
    const temporaryCollection = {}

    if(!this.state.collection[event.target.folderName.value]){
      temporaryCollection[event.target.folderName.value] = {}

      this.setState({
        newFolderStatus: 'The folder has been added!',
        collectionStatus: 'not empty',
        collection: {
          ...this.state.collection,
          ...temporaryCollection
        },
        takeNewFolderName: false
      })

    }else if(
      this.state.collection[event.target.folderName.value]
    ){
      this.setState({
        newFolderStatus: 'The folder already exists.'
      })
    }

    setTimeout(() => {
      this.setState({
        newFolderStatus: ''
      })
    }, 5000)
  }

  handleViewCollectionClick = () => {
    this.setState({
      viewPermission: 'collection'
    })
  }

  hadnleFormSubmit = (event) => {
    event.preventDefault()
    const temporaryCollection = {}

    if(!this.state.collection[event.target.mainWord.value]){
      temporaryCollection[event.target.mainWord.value] = event.target.meaning.value

      this.setState({
        newWordStatus: 'The word has been added!',
        collectionStatus: 'not empty',
        collection: {
          ...this.state.collection,
          ...temporaryCollection
        }
      })
    }else if(
      this.state.collection[event.target.mainWord.value].includes(event.target.meaning.value)
    ){
      this.setState({
        newWordStatus: 'The word already exists.',
        collection: {
          ...this.state.collection
        }
      })
    }else{
      temporaryCollection[event.target.mainWord.value] = 
        `${this.state.collection[event.target.mainWord.value]}, ${event.target.meaning.value}`
      this.setState({
        newWordStatus: 'The word has been edited.',
        collection: {
          ...this.state.collection,
          ...temporaryCollection
        }
      })
    }

    setTimeout(() => {
      this.setState({
        newWordStatus: ''
      })
    }, 5000)

    console.log(this.state.collection)
  }

  render(){
    return this.checkStatus()
  }
}
