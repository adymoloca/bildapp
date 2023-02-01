import axios, { AxiosInstance } from 'axios';
import { store } from '../../redux/store';
import { actions, selectRole } from '../../redux/slices/applicationSlice';
import { endpointListClient, endpointListCommon } from '../../utils/constants';
import { selectSession } from '../../redux/slices/applicationSlice';

const getServerURL = () => {
  let API_HOST = process.env.REACT_APP_API_HOST;
  if (!API_HOST) {
    API_HOST = process.env.NODE_ENV === 'production' ? 'https://api.bild.ro' : 'https://api.bild.ro';//'https://api.bild.ro'//
  }
  return `${API_HOST}`;
};

export const serverURL = getServerURL();

export const sessionTimeout = 60000;

const instance: AxiosInstance = axios.create({
  timeout: sessionTimeout,
  baseURL: serverURL,
});

const unauthenticatedPaths = [endpointListClient.login, endpointListClient.registerSupplier, endpointListClient.registerClient, endpointListClient.forgotPassword, endpointListClient.getDeviceId, endpointListClient.forgotPassword];
function isUnauthenticatedEndpoint(url: any) {
  return unauthenticatedPaths.find(path => url.includes(path));
}

const getRefreshPath = () => {
  const role = selectRole(store.getState());
  return endpointListCommon(role).refresh;
}

instance.interceptors.request.use(requestInterceptor, undefined);

instance.interceptors.response.use(undefined, responseErrorInterceptor);

function requestInterceptor(config: any) {
  const refreshPath = getRefreshPath();
  const session = selectSession(store.getState());
  if (!isUnauthenticatedEndpoint(config.url) && !config.url.includes(refreshPath)) {
    const accessToken = session.accessToken;
    if (accessToken) {
      config.headers.authorization = 'Bearer ' + accessToken;
    }
  } else if (refreshPath && config.url.includes(refreshPath)) {
    const refreshToken = session.refreshToken;
    if (refreshToken) {
      config.headers['refresh-token'] = refreshToken;
    }
  }
  return config;
}

// handle multiple calls with token expired
let isRefreshing = false;
let refreshSubscribers: any[] = [];

function onAccessTokenFetched(accessToken: string) { // proceed the call for all the subscribers after the new token is fetched
  refreshSubscribers = refreshSubscribers.filter(callback => callback(accessToken));
}

function subscribeTokenRefresh(cb: any) { // add subscribers for the new token after refresh
  refreshSubscribers.push(cb);
}

const generateNewToken = () => {
  const role = selectRole(store.getState());
  return instance.get(endpointListCommon(role).refresh);
};

function responseErrorInterceptor(error: any) {
  if (error?.response?.status === 401 && error?.config && !error.config.__isRetryRequest) {
    const { config } = error;
    const originalRequest = config;
    if (!isRefreshing) {
      isRefreshing = true;
      generateNewToken()
        .then((response: any) => {
          isRefreshing = false;
          const accessToken = response.data.data.accessToken || '';
          const refreshToken = response.data.data.refreshToken;
          if (accessToken) {
            store.dispatch(actions.setAccessToken(accessToken));
          }
          if (refreshToken) {
            store.dispatch(actions.setRefreshToken(refreshToken));
          }
          onAccessTokenFetched(accessToken || '');
        }).catch((e: any) => {
          isRefreshing = false;
          console.error('refresh error', error?.config);
          store.dispatch(actions.logout());
        });
    }
    const retryOriginalRequest = new Promise((resolve) => {
      subscribeTokenRefresh((accessToken: string) => {
        originalRequest.headers.authorization = 'Bearer ' + accessToken;
        resolve(doRetry(originalRequest));
      });
    });
    return retryOriginalRequest;
  } else if (error?.response?.status === 400) {
    return Promise.reject(error.response);
  } else if (error?.response?.status === 403) {
    return Promise.reject(error.response);
  } else if (error?.response?.status === 440) {
    store.dispatch(actions.logout());
    return Promise.reject(error.response);
  } else {
    // store.dispatch(toggleServerErrorNotification(true));
    return Promise.reject(error);
  }
}

function doRetry(config: any) {
  return instance
    .request(config)
    .then(response => Promise.resolve(response))
    .catch(error => {
      if (error.response && error.response.status === 401) {
        store.dispatch(actions.logout());
        return Promise.reject(new Error('not_authenticated_req'));
      }
      return Promise.reject(error);
    });
}

export default instance;
