import { createContext } from 'react';

export const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    photo: '',
};

export const UserReducer = (state, action) => {
    return {...state, ...action};
};

const UserContext = createContext(initialState);
export default UserContext;