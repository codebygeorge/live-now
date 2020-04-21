import cookie from 'js-cookie';

export const getAuthToken = () => {
    return cookie.get('token');
};

export const setAuthToken = (value, expireDate) => {
  return cookie.set('token', value, expireDate);
};

export const redirectTo = (location) => {
    return window.location.href = location ? location : '/';
};