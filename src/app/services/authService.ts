import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BASE_URL, USER_URLS } from '@constants/urls';

const token = localStorage.getItem('token');
const userId = localStorage.getItem('userId') || -1;

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }: { getState: any; }) => {
        const token = getState().auth.token;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
            return headers;
        }
    },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions
) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');

        window.location.href = '/login';
    }
    return result;
};

export const authApi: any = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQueryWithReauth,
    endpoints: (build) => ({
        getDetails: build.query({
            query: () => ({
                url: `${USER_URLS.PROFILE}?id=${userId}`,
                method: 'GET',
            }),
        }),
    }),
});

// export const authApi: any = createApi({
//     reducerPath: 'authApi',
//     baseQuery: fetchBaseQuery({
//         baseUrl: BASE_URL,
//         prepareHeaders: (headers, { getState }: { getState: any; }) => {
//             const token = getState().auth.token;
//             if (token) {
//                 headers.set('authorization', `Bearer ${token}`);
//                 return headers;
//             }
//         },
//         responseHandler: (response) => {
//             console.log(response);
//             return response.json().then((json) => {
//                 if (response.status === 401) {
//                     localStorage.removeItem('token');
//                     localStorage.removeItem('userId');
//                     window.location.href = '/login';

//                     return true;
//                 }
//                 if (response.ok) {
//                     return json;
//                 }
//                 return Promise.reject(json);
//             });
//         },
//         // responseHandler: (response) => {
//         //     return response.json().then((json) => {
//         //         if (response.status === 401) {
//         //             localStorage.removeItem('token');
//         //             localStorage.removeItem('userId');
//         //             window.location.href = '/login';

//         //             return Promise.reject(json);
//         //         }
//         //         if (response.ok) {
//         //             return json;
//         //         }
//         //         return Promise.reject(json);
//         //     });
//         // },
//     }),
//     endpoints: (build) => ({
//         getDetails: build.query({
//             query: () => ({
//                 url: `api/users/profile?id=${userId}`,
//                 method: 'GET',
//             }),
//         }),
//     }),
// });

// export react hook
export const { useGetDetailsQuery } = authApi;
