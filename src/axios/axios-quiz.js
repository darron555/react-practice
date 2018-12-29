import axios from 'axios'

export default axios.create({
    baseURL: 'https://react-quiz-312b3.firebaseio.com/'
})