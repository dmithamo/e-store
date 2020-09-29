/* eslint-disable no-confusing-arrow */
/* eslint-disable implicit-arrow-linebreak */
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

/**
 * @description Instantiate axios client
 */
function instantiateHTTPClient(): AxiosInstance {
  const baseURL = process.env.REACT_APP_BASE_API_URL;
  const config = { baseURL, headers: { 'Content-Type': 'application/json' } };
  const HTTPClient = axios.create(config);
  HTTPClient.interceptors.request.use(insertAuthTokenInRequestHeaders);

  return HTTPClient;
}

/**
 * @description Intercept the req to insert auth token
 * (For all requests requiring auth)
 * @param config AxiosRequestConfig
 */
function insertAuthTokenInRequestHeaders(
  config: AxiosRequestConfig,
): AxiosRequestConfig {
  switch (config.url) {
    // no auth header needed
    case '/checkout':
      return {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      };

    default:
      return config;
  }
}

export default {
  post: async (path: string, params: any) => {
    if (path === '/auth') {
      return tempCreateAccountFnBeforeApiIsLive(params);
    }
    if (path === '/auth/verify-account') {
      return tempVerifyAccountFnBeforeApiIsLive(params);
    }
    return instantiateHTTPClient().post(path, params);
  },

  get: async (path: string) => instantiateHTTPClient().get(path),
};

function tempCreateAccountFnBeforeApiIsLive(params: any) {
  if (params.email && params.email !== '') {
    return {
      status: 201,
      data: {
        email: params.email,
      },
    };
  }
  return {
    status: 400,
    data: { error: { message: 'Missing required values: ...' } },
  };
}

function tempVerifyAccountFnBeforeApiIsLive(params: any) {
  if (params.email && params.confirmationCode) {
    return {
      status: 201,
      data: {
        email: params.email,
        userID: 'new-user-uuid-01',
      },
    };
  }
  return {
    status: 400,
    data: { error: { message: 'Missing required values: ...' } },
  };
}
