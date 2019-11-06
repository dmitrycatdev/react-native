import { EVENTS_URL, LOGIN_URL, PROFILE_URL, REGISTER_URL } from './URLS'
import { getJson, postJson } from './network'


export const getEventsRequest = () =>
    new Promise(
        (resolve, reject) =>
            getJson(EVENTS_URL)
                .then(resolve)
                .catch(reject))


export const postEventRequest = event =>
    new Promise(
        (resolve,reject) =>
            postJson(EVENTS_URL, event)
                .then(resolve)
                .then(reject))


export const getProfile = () =>
    new Promise((resolve, reject) =>
        getJson(PROFILE_URL)
            .then(resolve)
            .catch(reject))


export const register = (model) =>
    new Promise((resolve, reject) =>
        postJson(REGISTER_URL, model)
            .then(response => {
            debugger
                if (response.status === 200) return response.json()

                throw new Error('Не удаётся зарегистрироваться((((((((((')
            })
            .then(resolve)
            .catch(reject))


export const login = (model) =>
    new Promise((resolve, reject) =>
        postJson(LOGIN_URL, model)
            .then(response => {
                if (response.status === 200) return response.json()
                throw new Error('Неправильный логин или пароль')
            })
            .then(resolve)
            .catch(reject))