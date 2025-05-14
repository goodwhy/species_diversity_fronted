import myAxios from './request.js'

export const register = async (params) => {
    return myAxios.request({
        url: 'users/register/',
        method: 'POST',
        data: params,
        headers: {
            "Content-Type": "application/json",
        },
    })
}

export const login = async (params) => {
    return myAxios.request({
        url: 'users/login/',
        method: 'POST',
        data: params,
        headers: {
            "Content-Type": "application/json",
        },
    })
}
