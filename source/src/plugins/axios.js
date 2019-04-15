import axios from 'axios'
import qs from 'qs';

export default ({ app, router, Vue }) => {
  let isDev = process.env.NODE_ENV == 'development'
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  axios.defaults.baseURL =  isDev ? '/rest-api/' : 'https://donsen.site/rest-api/'
  axios.interceptors.request.use(function (config) {
    if(config.method == 'post'){
      if(config.headers['Content-Type'] == 'multipart/form-data'){
        return config;
      }
      config.url += '/'
      config.data = qs.stringify(config.data, {arrayFormat: 'repeat'})
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
Vue.prototype.$axios = axios
}
