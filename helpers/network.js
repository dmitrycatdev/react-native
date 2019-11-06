import { AsyncStorage } from 'react-native'

export const authFetch = (url, params = {}) => new Promise(async (resolve, reject) => {
    const token = await AsyncStorage.getItem('token')
    if (token) {
        return fetch(url, {
            ...params,
            headers: {
                ...(params.headers ? params.headers : {}),
                Authorization: `Bearer ${token}`,
            }
        }).then(resolve).catch(reject)
    } else {
        return fetch(url, params).then(resolve).catch(reject)
    }
})


export const getJson = (url) => new Promise((resolve, reject) => {
    authFetch(url)
        .then(response => {
            if (response.status === 200) return response
            throw new Error('Неудачный запрос')
        })
        .then(response => response.json())
        .then(resolve)
        .catch(reject)
})

export const postJson = (url, data) => new Promise((resolve, reject) => {
    authFetch(
        url,
        {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(data)
        }
    )
        .then(resolve)
        .catch(reject)
})