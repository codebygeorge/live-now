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
export const BASE_API = 'http://104.237.9.39:8090/api';

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