import Axios from 'axios';
import { message } from 'antd';

const baseURL =
  process.env.NODE_ENV === 'production' ? window.location.origin : window.location.origin;

const instance = Axios.create({
  baseURL,
});

instance.interceptors.request.use(
  (config) => {
    message.destroy();
    config.headers = {
      // ...config.headers,
      'Content-Type': 'application/json',
    };

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      let responseData = response.data;
      if (responseData.hasOwnProperty('success')) {
        if (responseData.success) {
          return responseData;
        } else {
          return Promise.reject({
            message: `error in data: ${responseData.message}`,
          });
        }
      }
      return responseData;
    } else {
      console.error(`response failed. Url = ${response.config.url}`);
      return Promise.reject({
        error: { message: `response failed. ${response.status}` },
      });
    }
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);

class Http {
  /**
   * axios get 请求封装
   * @param {*} path 接口地址
   * @param {*} params 接口参数？可选 { type:object }
   * @param {*} showMessage 接口请求前是否展示loading
   * @param msg
   */
  static get(path, params, { showMessage = true, msg = {} } = {}) {
    return instance
      .get(path, { params })
      .then((responseData) => {
        if (showMessage) {
          if ('successMsg' in msg) {
            message.success(`${msg.successMsg}`);
          }
        }
        return responseData.data;
      })
      .catch((error) => {
        if (showMessage) {
          if (msg.hasOwnProperty('errorMsg')) {
            message.error(`${msg.errorMsg}`);
          } else {
            message.error('加载错误');
          }
        }
        return Promise.reject(error);
      });
  }

  /**
   * axios post 请求封装
   * @param {*} path 接口地址
   * @param data
   * @param {*} showMessage 接口请求前是否展示loading
   * @param msg
   */
  static post(path, data, { showMessage = true, msg = {} } = {}) {
    return (
      instance
        // .post(path, Qs.stringify(data), {})
        .post(path, data)
        .then((responseData) => {
          if (showMessage) {
            if ('successMsg' in msg) {
              message.success(`${msg.successMsg}`);
            }
          }
          return responseData.data;
        })
        .catch((error) => {
          if (showMessage) {
            if ('errorMsg' in msg) {
              message.error(`${msg.errorMsg}`);
            } else {
              message.error('加载错误');
            }
          }
          return Promise.reject(error);
        })
    );
  }
}

export default Http;
