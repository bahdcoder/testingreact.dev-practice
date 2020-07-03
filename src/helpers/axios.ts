import Axios from 'axios'
import { BASE_URL } from './constants'

export default Axios.create({
  baseURL: BASE_URL,
})
