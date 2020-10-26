import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import config from '../../config/app.config'

Vue.use(VueAxios, axios)
axios.defaults.baseURL = config.http.baseURL

export default axios
