import cookie from 'js-cookie';

export const getAuthToken = () => {
    return cookie.get('token');
};

export const setAuthToken = (value) => {
  return cookie.set('token', value);
};