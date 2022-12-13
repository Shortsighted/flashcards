import { Component } from "react"
import styles from "./CardCreator.module.css"

export default class CardCreator extends Component{
    render(){
        return(
            <div className={styles.mainBox}>
                <h2>Please, input the details below.</h2>
                <form className={styles.inputForm}
                      onSubmit={this.props.onSubmit}
                >
                    <div className={styles.inputFields}>
                        <div className={styles.labels}>
                            <label htmlFor="mainWord">Main word:</label>
                            <label htmlFor="translation">The meaning:</label>
                        </div>
                        <div className={styles.words}>
                            <input name="mainWord" required />
                            <input name="translation" required />
                        </div>
                    </div>
                    <button>
                        <div>Add to List</div>
                    </button>
                </form>
                <p onClick={this.props.viewDictionaryClick}>View current dictionary</p>
            </div>
        )
    }
}