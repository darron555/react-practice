import React, {Component} from 'react';
import classes from './QuizList.css'
import NavLink from "react-router-dom/es/NavLink";
import axios from '../../axios/axios-quiz'
import Loader from '../../components/UI/Loader/Loader'

class QuizList extends Component {

    state = {
        quizes: [],
        loading: true
    }

    async componentDidMount() {
        try {
            const res = await axios.get('quizes.json')

            const quizes = []
            Object.keys(res.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Test #${index + 1}`
                })
            })

            this.setState({
                quizes,
                loading: false
            })
        } catch (err) {

        }


    }


    renderQuizes() {
        return this.state.quizes.map((quiz) => {
            return <li key={quiz.id}>
                <NavLink to={'/quiz/' + quiz.id}>{quiz.name}</NavLink>
            </li>
        })
    }

    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>Quiz list</h1>

                    {
                        this.state.loading
                            ? <Loader />
                            :  <ul>
                                {this.renderQuizes()}
                               </ul>
                    }


                </div>

            </div>
        );
    }
}

export default QuizList;