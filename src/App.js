import { Component } from 'react'
import WordCreator from './WordCreator.js'
import Collection from './Collection.js'
import './App.css'
import Homepage from './Homepage.js'

export default class App extends Component{
  state = {
    viewPermission: 'homepage',
    collectionStatus: 'empty',
    newWordCollection: {},
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
                    handleCheckboxChange={this.handleCheckboxChange}
                    deleteMarkedItems={this.deleteMarkedItems}
        />
      )
    }else if(this.state.viewPermission === 'editor'){
      return(
        <>
          <WordCreator onSubmit={event => this.hadnleFormSubmit(event)}
                        viewCollectionClick={this.handleViewCollectionClick}
                        newWordStatus={this.state.newWordStatus}
                        newWordCollection={this.state.newWordCollection}
                        delete={this.handleNewWordDelete}
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
      takeNewFolderName: !this.state.takeNewFolderName
    })
  }

  handleCreateNewFolderClick = (event) => {
    event.preventDefault()
    const temporaryCollection = {}

    if(!this.state.collection[event.target.folderName.value]){
      temporaryCollection[event.target.folderName.value] = {
        type: 'Folder',
        collection: {},
        marked: false
      }

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
      viewPermission: 'collection',
      collection: {...this.state.collection,
      ...this.state.newWordCollection},
      newWordCollection: {}
    })
  }

  hadnleFormSubmit = (event) => {
    event.preventDefault()
    const temporaryCollection = {}

    if(!this.state.collection[event.target.mainWord.value] 
      &&
      !this.state.newWordCollection[event.target.mainWord.value]){
      temporaryCollection[event.target.mainWord.value] = {
        type: 'word',
        meaning: event.target.meaning.value,
        reading: event.target.reading.value,
        language: event.target.language.value,
        marked: false
      }
      
      this.setState({
        newWordStatus: 'The word has been added!',
        collectionStatus: 'not empty',
        newWordCollection: {
          ...this.state.newWordCollection,
          ...temporaryCollection
        }
      })
    }else{
      this.setState({
        newWordStatus: 'The word already exists.',
      })
    }

    setTimeout(() => {
      this.setState({
        newWordStatus: ''
      })
    }, 5000)
  }

  handleNewWordDelete = (word) =>{
    const temporaryCollection = {...this.state.newWordCollection}
    delete temporaryCollection[word]
    this.setState({
      newWordCollection: {...temporaryCollection}
    })
  }

  deleteMarkedItems = () => {
    const temporaryCollection = {...this.state.collection}
    for(const item in temporaryCollection){
      temporaryCollection[item].marked && delete temporaryCollection[item]
    }
    console.log(temporaryCollection)
    this.setState({
      ...this.state,
      collection: {...temporaryCollection}
    })
  }

  handleCheckboxChange = (item) => {
    const temporaryCollection = {}
    temporaryCollection[item] = this.state.collection[item]
    temporaryCollection[item].marked = !this.state.collection[item].marked
    
    this.setState({
      collection: {
        ...this.state.collection,
        ...temporaryCollection}
    })
  }

  render(){
    return this.checkStatus()
  }
}
