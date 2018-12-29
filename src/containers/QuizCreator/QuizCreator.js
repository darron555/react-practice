import React, {Component} from 'react';
import axios from '../../axios/axios-quiz'
import classes from './QuizCreator.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import {createControl, ValidateControl, validateForm} from "../../form/formFramework";
import Select from '../../components/UI/Select/Select'

function createOptionControl(number) {
    return createControl({
        label: `Variant ${number} `,
        errorMessage: 'Answer could not be empty',
        id: number
    }, {required: true})
}

function createFormControls() {
    return {
        question: createControl({
            label: 'Enter your question',
            errorMessage: 'Question could not be empty'
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    }
}

class QuizCreator extends Component {

    state = {
        quiz: [],
        rightAnswerId: 1,
        isFormValid: false,
        formControls: createFormControls()
    }

    submitHandler = (event) => {
        event.preventDefault()
    }

    addQuestionHandler = (event) => {
        event.preventDefault()

        const quiz = [...this.state.quiz]
        const index = quiz.length + 1
        const {question, option1,option2,option3,option4} = this.state.formControls
        const questionItem = {
            question: question.value,
            id: index,
            rightAnswerId: this.state.rightAnswerId,
            answer: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id},
            ]
        }

        quiz.push(questionItem)

        this.setState({
            quiz,
            rightAnswerId: 1,
            isFormValid: false,
            formControls: createFormControls()
        })
    }

    addQuizHandler = async event => {

        try {
            await axios.post('quizes.json', this.state.quiz)
            this.setState({
                quiz: [],
                rightAnswerId: 1,
                isFormValid: false,
                formControls: createFormControls()
            })
        } catch(err) {

        }


    }

    selectChangeHandler = event => {
        this.setState({rightAnswerId: +event.target.value})
    }

    render() {

        const select = <Select
            label='Choose right answer'
            value={this.state.rightAnswerId}
            onChange={this.selectChangeHandler}
            options={[
                {text: 1, value: 1},
                {text: 2, value: 2},
                {text: 3, value: 3},
                {text: 4, value: 4},
            ]}
        />
        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Quiz Creator</h1>

                    <form onSubmit={this.submitHandler}>

                        {this.renderControls()}

                        {select}

                        <Button type='primary' disabled={!this.state.isFormValid} onClick={this.addQuestionHandler}>Add question</Button>
                        <Button type='success' disabled={this.state.quiz.length === 0}  onClick={this.addQuizHandler}>Create test</Button>
                    </form>
                </div>
            </div>
        );
    }

    onChangeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}

        control.touched = true
        control.value = value
        control.valid = ValidateControl(control.value, control.validation)

        formControls[controlName] = control

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })

    }

    renderControls() {
        return Object.keys(this.state.formControls).map((controlName, index) => {

            const control = this.state.formControls[controlName]

            return (
                <React.Fragment key={controlName + index}>
                    <Input
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={event => this.onChangeHandler(event.target.value, controlName)}
                    />
                    {index === 0 ? <hr/> : null}
                </React.Fragment>
            )
        })
    }
}

export default QuizCreator;