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
      return config;

    default:
      return {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      };
  }
}

export default {
  post: async (path: string, params: any) =>
    path === '/users'
      ? tempAuthFnBeforeApiIsLive(params)
      : instantiateHTTPClient().post(path, params),

  get: async (path: string) => instantiateHTTPClient().get(path),
};

function tempAuthFnBeforeApiIsLive(params: any) {
  if (params.email && params.email !== '') {
    return {
      status: 201,
      data: {
        userID: 'uuid-like-value-here',
        email: params.email,
      },
    };
  }
  return {
    status: 400,
    data: { error: { message: 'Missing required values: ...' } },
  };
}
