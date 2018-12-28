import React, {Component} from 'react';
import classes from './QuizList.css'
import NavLink from "react-router-dom/es/NavLink";

class QuizList extends Component {

    renderQuizes() {
        return [1,2,3].map((quiz, index) => {
            return <li key={index}>
                <NavLink to={'/quiz/' + quiz}>Test {quiz}</NavLink>
                </li>
        })
    }

    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>Quiz list</h1>

                    <ul>
                        {this.renderQuizes()}
                    </ul>

                </div>

            </div>
        );
    }
}

export default QuizList;