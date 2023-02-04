import { Component } from "react"
import styles from "./Collection.module.css"

export default class Collection extends Component{
    returnWords = () => {
        const temporaryCollection = []

        for(const [key, value] of Object.entries(this.props.collection)){
            console.log(key, value)
            if(typeof value === 'string'){
                temporaryCollection.push(
                    <tr>
                        <td>{key}</td>
                        <td>{value}</td>
                    </tr>
                )
            }else{
                temporaryCollection.push(
                    <tr>
                        <td>{key}</td>
                        <td></td>
                    </tr>
                )
            }
        }

        return temporaryCollection
    }

    render(){
        return(
            <>
                {this.props.newFolderStatus && 
                <div className={styles.popup}>{this.props.newFolderStatus}</div>}

                <div className={styles.mainBox}>
                    <h2>Your Collection</h2>
                    <div className={styles.buttonsWrapper}>
                        {this.props.takeNewFolderName && 
                        (<form className={styles.newFolderForm}
                                onSubmit={this.props.createNewFolder}>
                            <input type='text' 
                                    name='folderName' 
                                    placeholder='Folder Name...'
                                    required />
                            <button>Create</button>
                        </form>)}
                        <button onClick={this.props.newFolderClick}> + New Folder</button>
                        <button onClick={this.props.newFlashcardClick}> + New Flashcard</button>
                    </div>
                    {this.props.collectionStatus === 'empty' ?
                        (
                        <div className={styles.emptyCollection}>Your collection is empty</div>
                        )
                        :
                        (
                        <table className={styles.wordsBox}>
                            <tbody>
                                {this.returnWords().map(word => word)}
                            </tbody>
                        </table>
                        )
                    }
                </div>
            </>
        )
    }
}