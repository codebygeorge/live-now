import React from 'react';
import axios from "axios";
import {library} from '@fortawesome/fontawesome-svg-core';
import {
    faCircle,
    faHeart as farHeart,
    faDotCircle
} from '@fortawesome/free-regular-svg-icons'; //FAR
import {
    faBuffer
} from '@fortawesome/free-brands-svg-icons'; //FAB
import {
    faBars,
    faCubes,
    faUsers,
    faAngleRight,
    faAngleLeft,
    faUserCircle,
    faCaretDown,
    faCaretUp,
    faEllipsisH,
    faHeart as fasHeart,
    faGamepad,
    faPlus,
    faTrash,
    faFile,
    faPen,
    faSearch,
    faUndoAlt,
    faLink,
    faSync
} from '@fortawesome/free-solid-svg-icons';  //FAS

//Add fontawesome icons
library.add(
    faUserCircle,
    faBars,
    faUsers,
    faCubes,
    faAngleRight,
    faAngleLeft,
    faCaretDown,
    faCaretUp,
    faEllipsisH,
    farHeart,
    fasHeart,
    faGamepad,
    faBuffer,
    faDotCircle
);

// window.location.hostname
export const BASE_API_URL = '/';
// export const BASE_API = 'localhost:8089/api';
export const BASE_API = 'https://livenowapi.co.uk/api';
export const MY_SECRET = 'MY_SECRET';

export const BASE_MEDIA_API = `${BASE_API}/file/`;

export const myAxios = axios.create({
    baseURL: BASE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.user_token ? localStorage.user_token : ''
    }
});

// tokenAxiosUser.interceptors.response.use(response => {
//     if (response.headers['authorization']) {
//         updateToken(response.headers['authorization']);
//     }
//     return response;
// }, error => {
//     return Promise.reject(error);
// });

export function normalizeString(variable) {
    return variable.replace(/_/g, " ")
}

export function nFormatter(num, digits) {
    let si = [
        {value: 1, symbol: ""},
        {value: 1E3, symbol: "k"},
        {value: 1E6, symbol: "M"},
        {value: 1E9, symbol: "G"},
        {value: 1E12, symbol: "T"},
        {value: 1E15, symbol: "P"},
        {value: 1E18, symbol: "E"}
    ];
    let rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    let i;
    for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) {
            break;
        }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

export const isDesktop = window.matchMedia("(min-width: 812px)").matches;


//ADMIN

export function removeFilesFromServer(filesForDelete) {

    filesForDelete.forEach(file => {
        fileDelete(file).then(response => {
            console.log(response);
        })
            .catch(error => {
                console.log(error);
            });
    });
}

export function fileUpload(file) {

    const formData = new FormData();
    formData.append('file', file);

    return myAxios.post('/file', formData);
}

export function fileDelete(fileUrl) {

    return myAxios.delete('/file',
        {
            data: {
                "file": fileUrl
            }
        }
    );
}
export const IMAGE_ACCEPTED_EXT = 'image/x-png, image/png, image/jpg, image/jpeg';
export const FULL_NAME_PATTERN = /^[\p{L}\s]*$/iu;
export const EMAIL_PATTERN = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,6}$/i;
export const ORG_NUMBER_PATTERN = /^[0-9]{6}-[0-9]{4}$/;
export const PHONE_PATTERN = /^\+?\d{10}$/;
export const DIDIT_PATTERN = /\d+/i;
export const UPPERCASE_LOWERCASE_PATTERN = /(?=.*[\p{Lu}])(?=.*[\p{Ll}])[\p{L}\s]+/u;
export const PASSWORD_PATTERN = /^(?=.*\d)(?=.*[\p{Lu}])(?=.*[\p{Ll}])[0-9\p{L}\s]{8,}$/u;
export const FLOATING_NUMBER = /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/;
export const STRING_VALIDATOR = /^[!@#$%^&*(),.?":{}|<>]/g;
export const NUMBER_ONLY = /^[0-9]+$/;
export const IMAGE_MAX_SIZE = 5621440;
export const EXCEL_FILE_EXT = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

export const UPLOAD_IMAGES_PATH = '/images';
export const STATIC_AVATAR_PATH = '/static/img/default-user-avatar.png';
export const STATIC_BE_PICTURE_PATH = '/static/img/house-sketch.png';
export const STATIC_BE_MANUAL_PICTURE_PATH = '/static/img/image-project.png';
export const DEFAULT_PER_PAGE = 20;
export const MIN_SIX_DIGIT_NUMBER = 100000;
export const MAX_SIX_DIGIT_NUMBER = 999999;