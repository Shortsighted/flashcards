import { Component } from "react"
import styles from "./WordCreator.module.css"

export default class WordCreator extends Component{
    render(){
        return(
            <div className={styles.elementsWrapper}>
                <div className={styles.newWordCollectionBar}>
                    <button onClick={this.props.viewCollectionClick}>View your collection</button>
                </div>
                <div className={styles.cardCreationSection}>
                    {this.props.newWordStatus && 
                    <div className={styles.popup}>{this.props.newWordStatus}</div>}
                    <form className={styles.inputForm}
                        onSubmit={this.props.onSubmit}
                    >
                        <div className={styles.language}>
                            <label htmlFor='language'>Language:</label>
                            <input name='language' type='text' required />
                        </div>
                        <div className={styles.mainWord}>
                            <label htmlFor='mainWord'>Word:</label>
                            <textarea name='mainWord' type='text' required />
                        </div>
                        <div className={styles.reading}>
                            <label htmlFor='reading'>Reading:</label>
                            <input name='reading' type='text' required />
                        </div>
                        <div className={styles.meaning}>
                            <label htmlFor='meaning'>Meaning:</label>
                            <textarea name='meaning' type='text' required /> 
                        </div>
                        <button>
                            <div>Add to List</div>
                        </button>
                    </form>
                </div>
            </div>
        )
    }
}