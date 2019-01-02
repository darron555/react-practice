import axios from '../../axios/axios-quiz'
import {CREATE_QUIZ_QUESTION, RESET_QUIZ_CREATION} from "./actionTypes";

export function createQuizQuestion(item) {
    return {
        item,
        type: CREATE_QUIZ_QUESTION
    }
}


export function finishCreateQuize() {
    return  async (dispatch, getState) => {

        await axios.post('quizes.json', getState().create.quiz)
        resetQuizeCreation()
    }
}

export function resetQuizeCreation() {
    return   {
       type: RESET_QUIZ_CREATION
    }
}