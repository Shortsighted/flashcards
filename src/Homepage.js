import React from 'react';
import styles from './Homepage.module.css'

export default class Homepage extends React.Component{
    render(){
        return(
            <div className={styles.container}>
                <div className={styles.thirdPulse}></div>
                <div className={styles.secondPulse}></div>
                <div className={styles.firstPulse}></div>
                <div className={styles.core}></div>
                <div className={styles.contentBox}>
                    <h1>Now is the time to learn new languages!</h1>
                    <button>Start Now</button>
                </div>
            </div>
        )
    }
}