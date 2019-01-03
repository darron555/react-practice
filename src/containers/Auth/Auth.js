import React, {Component} from 'react';
import classes from './Auth.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import is from 'is_js'
import {connect} from "react-redux"
import {auth} from "../../store/actions/auth"

class Auth extends Component {

    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Enter valid email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Password',
                errorMessage: 'Enter valid password',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    loginHandler = (event) => {
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            true
        )
        event.preventDefault()
    }

    registerHandler = (event) => {
        event.preventDefault()
        this.props.auth(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            false
        )
    }

    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Authorization</h1>

                    <form onSubmit={this.submitHandler} className={classes.AuthForm}>
                        {this.renderInputs()}

                        <Button type='success' onClick={this.loginHandler}
                                disabled={!this.state.isFormValid}>Enter</Button>
                        <Button type='primary' onClick={this.registerHandler}
                                disabled={!this.state.isFormValid}>Register</Button>

                    </form>
                </div>
            </div>
        );
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return <Input
                key={controlName + index}
                type={control.type}
                label={control.label}
                errorMessage={control.errorMessage}
                valid={control.valid}
                touched={control.touched}
                value={control.value}
                shouldValidate={!!control.validation}
                onChange={(event) => this.onChangeHandler(event, controlName)}
            />
        })
    }

    onChangeHandler = (event, controlName) => {

        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}

        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)

        formControls[controlName] = control

        let isFormValid = true

        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({
            formControls, isFormValid
        })

    }

    validateControl(value, validation) {
        if (!validation) {
            return true
        }

        let isValid = true

        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (validation.email) {
            isValid = is.email(value) && isValid
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid
    }
}

function mapDispatchToProps(dispatch) {
    return {
        auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
    }
}

export default connect(null, mapDispatchToProps)(Auth);

