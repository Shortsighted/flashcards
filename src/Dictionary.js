import { Component } from "react"
import styles from "./Dictionary.module.css"

export default class Dictionary extends Component{
    returnWords = () => {
        const temporaryDictionary = []

        for(const [key, value] of Object.entries(this.props.dictionary)){
            console.log(key, value)
            temporaryDictionary.push(
                <tr>
                    <td>{key}</td>
                    <td>{value}</td>
                </tr>
            )
        }

        return temporaryDictionary
    }

    render(){
        return(
            <div className={styles.mainBox}>
                <h2>Your Dictionary</h2>
                <table className={styles.wordsBox}>
                    <thead>
                        <tr>
                            <th>Words</th>
                            <th>Translations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.dictionary && this.returnWords().map(word => word)}
                    </tbody>
                </table>
            </div>
        )
    }
}