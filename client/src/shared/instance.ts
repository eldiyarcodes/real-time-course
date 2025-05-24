import axios from 'axios'
import { CONFIG } from './config'

export const requester = axios.create({ baseURL: CONFIG.BASE_URL })
