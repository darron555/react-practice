import React, {Component} from 'react';
import classes from './Quiz.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

class Quiz extends Component {

    state = {
        activeQuestion: 0,
        answerState: null, // { [id]: 'success'  'error' }
        isFinished: false,
        results: {}, // {[id]: 'success'  'error'}
        quiz: [
            {
                question: 'Some question 1 ?',
                rightAnswerId: 2,
                id: 1,
                answers: [
                    {text: 'Answer 1-1', id: 1},
                    {text: 'Answer 1-2', id: 2},
                    {text: 'Answer 1-3', id: 3},
                    {text: 'Answer 1-4', id: 4},
                ],
            },
            {
                question: 'Some question 2 More words to see difference?',
                rightAnswerId: 3,
                id: 2,
                answers: [
                    {text: 'Answer 2-1', id: 1},
                    {text: 'Answer 2-2', id: 2},
                    {text: 'Answer 2-3', id: 3},
                    {text: 'Answer 2-4', id: 4},
                ],
            }
        ]
    }

    onAnswerClick = (answerId) => {


        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') {
                return
            }
        }

        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results

        if (question.rightAnswerId === answerId) {

            if (!results[question.id]) {
                results[question.id] = 'success'
            }


            this.setState({answerState: {[answerId]: 'success'}, results})

            const timeout = window.setTimeout(() => {

                if (this.isQuizFinished()) {

                    this.setState({isFinished: true})

                } else {
                    // results[question.id] = 'error'
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null,
                        // results
                    })
                }

                window.clearTimeout(timeout)
            }, 1000)

        } else {
            results[question.id] = 'error'
            this.setState({answerState: {[answerId]: 'error'}, results})
        }

    }

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    onRetryHandler = () => {
        this.setState({activeQuestion: 0, answerState: null, isFinished: false, results: {}})
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Answer the questions</h1>
                    {
                        this.state.isFinished ? <FinishedQuiz results={this.state.results} quiz={this.state.quiz}
                                                              onRetry={this.onRetryHandler}/> :
                            <ActiveQuiz
                                answers={this.state.quiz[this.state.activeQuestion].answers}
                                question={this.state.quiz[this.state.activeQuestion].question}
                                onAnswerClick={this.onAnswerClick}
                                quizLength={this.state.quiz.length}
                                answerNumber={this.state.activeQuestion + 1}
                                state={this.state.answerState}
                            />
                    }

                </div>
            </div>
        )
    }
}


export default Quiz