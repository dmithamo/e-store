/* eslint-disable no-confusing-arrow */
/* eslint-disable implicit-arrow-linebreak */
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { addDays } from 'date-fns';

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
          Authorization: `Bearer ${sessionStorage.getItem('token') || ''}`,
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

  get: async (path: string) => {
    if (path.includes('/items?category')) {
      return tempFetchItemsBeforeApiIsLive(path);
    }
    return instantiateHTTPClient().get(path);
  },
};

function tempCreateAccountFnBeforeApiIsLive(params: any) {
  if (params.email && params.email !== '') {
    return {
      status: 201,
      data: {
        email: params.email,
        firstName: params.firstName,
        lastName: params.lastName,
        avatar: params.avatar,
        phoneNumber: params.phoneNumber,
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

function tempFetchItemsBeforeApiIsLive(path: string) {
  const category = path.split('?category=')[1];
  const data = [
    {
      id: '0000-111-222-333-440',
      name: 'Sony Mirrorless Camera',
      rate: 500,
      category: 'Electronics',
      quantityAvailable: 5,
      dateAvailable: new Date(),
      img:
        'https://static.bhphoto.com/images/multiple_images/images2500x2500/1580213746_IMG_1310300.jpg',
    },
    {
      id: '0000-111-222-333-441',
      name: 'Sony Alpha 50mm lens',
      rate: 200,
      category: 'Electronics',
      quantityAvailable: 5,
      dateAvailable: new Date(),
      img:
        'https://www.sony.com/image/465f8a49b9faee76afee2d2e0d84ed80?fmt=pjpeg&bgcolor=FFFFFF&bgc=FFFFFF&wid=2515&hei=1320',
    },
    {
      id: '0000-111-222-333-442',
      name: 'Gas powered meat grill',
      rate: 1000,
      category: 'Kitchenware',
      quantityAvailable: 2,
      dateAvailable: new Date(),
      img: 'https://d12prgon3aw7l1.cloudfront.net/6785337_iv2_673x711.jpg',
    },
    {
      id: '0000-111-222-333-443',
      name: 'Electric lawn mower',
      rate: 1000,
      category: 'Electronics',
      quantityAvailable: 2,
      dateAvailable: addDays(new Date(), 3),
      img: 'https://miro.medium.com/max/602/1*XXMZyObfljLWDk0QJLmtbA.png',
    },
    {
      id: '0000-111-222-333-445',
      name: 'Power Drill',
      rate: 1000,
      category: 'Electronics',
      quantityAvailable: 2,
      dateAvailable: addDays(new Date(), 14),
      img:
        'https://s3-eu-west-1.amazonaws.com/media.santu.com/92/drill1_12458962984411.jpg',
    },
    {
      id: '0000-111-222-333-446',
      name: 'Conference Chair',
      rate: 1000,
      category: '',
      quantityAvailable: 200,
      dateAvailable: addDays(new Date(), 14),
      img:
        'https://cdn.ambientedirect.com/chameleon/mediapool/thumbs/c/6e/Knoll-International_Saarinen-Conference-Stuhl-Gestell-Walnuss_863x863-ID1948494-401b8190e334205ea8e842bd1b4a3770.jpg',
    },
  ];
  return {
    status: 200,
    data:
      category === 'all'
        ? data
        : data.filter((item) => item.category.toLowerCase() === category),
  };
}
