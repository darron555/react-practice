import React from 'react';
import classes from './FinishedQuiz.css'
import Button from '../../components/UI/Button/Button'
import {Link} from "react-router-dom";

const FinishedQuiz = props => {

    const successCount = Object.keys(props.results).reduce((total, key) => {
        if (props.results[key] === 'success') {
            total++
        }

        return total
    }, 0)

    return (
        <div className={classes.FinishedQuiz}>
            <ul>

                {props.quiz.map((quiz, index) => {

                    const cls = [
                        'fa',
                        props.results[quiz.id] === 'error' ? 'fa-times' : 'fa-check',
                        classes[props.results[quiz.id]]
                    ]


                    return (<li key={index}>
                        <strong>{index + 1}.&nbsp;</strong>
                        {quiz.question}
                        <i className={cls.join(' ')} />
                    </li>)
                })}

            </ul>

            <p>Right {successCount} of {props.quiz.length}</p>

            <div>
                <Button onClick={props.onRetry} type="primary">Repeat</Button>
                <Link to={'/'}>
                    <Button type="success">To test list</Button>
                </Link>

            </div>
        </div>
    )
}

export default FinishedQuiz