import * as React from 'react'
import { View, Vibration } from 'react-native'

// You can import from local files
import LoginScreen from './components/LoginScreen'
import HomeScreen from './components/HomeScreen'
import ProfileScreen from './components/ProfileScreen'
console.log()

import Loader from './components/Loader'

// or any pure javascript modules available in npm
// import { Card } from 'react-native-paper'
// import AsyncStorage from '@react-native-community/async-storage'

import { PAGES } from './constants'

import { styles } from './styles'

import { AsyncStorage } from 'react-native'
import { getProfile } from './helpers/requests'
import { Notifications } from 'expo'


export default class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            page: PAGES.PROFILE,
            token: '123',
        }

        this.setPage = this.setPage.bind(this)
        this.verifyToken = this.verifyToken.bind(this)
        this.setToken = this.setToken.bind(this)
    }

    componentDidMount() {
        // this._notificationSubscription = Notifications.addListener(this._handleNotification)

        (async () => {
            console.log({
                token: await AsyncStorage.getItem('token')
            })
        })()

        this.verifyToken()
            .then(isTokenValid => {
                if (isTokenValid) {
                    this.setState({
                        isLoading: false,
                        page: PAGES.PROFILE,
                    })
                } else {
                    this.setState({
                        isLoading: false,
                        page: PAGES.LOGIN,
                    })
                }
            })
    }

    _handleNotification = async (notification) => {
        console.log({notification})
        if (notification.data.type === 'BAN') {

        }
    }

    async setToken(token) {
        if (!token) {
            console.log('removing tooken')
            await AsyncStorage.removeItem('token')
            console.log('token remooved')
            console.log('trying to get token back ....')
            console.log('token:')
            console.log(await AsyncStorage.getItem('token'))
        } else {
            console.log('setting token')
            console.log({ token })
            await AsyncStorage.setItem('token', token)
            console.log('trying to get token')
            console.log('token:')
            console.log(await AsyncStorage.getItem('token'))
        }
    }

    verifyToken() {
        return new Promise(async (resolve, reject) => {
            const token = await AsyncStorage.getItem('token')
            if (!token) return resolve(false)
            getProfile()
                .then(() => {
                    resolve(true)
                })
                .catch(async () => {
                    await AsyncStorage.removeItem('token')
                    resolve(false)
                })
        })
    }

    setPage(page) {
        this.setState({
            page,
        })
    }

    render() {
        return (
            this.state.isLoading
                ? <View style={ styles.container }>
                    <View style={ styles.innerContainer }>
                        <Loader/>
                    </View>
                </View>
                : (() => {
                    switch (this.state.page) {
                        case PAGES.LOGIN: {
                            return <LoginScreen
                                setPage={ this.setPage }
                                setToken={ this.setToken }
                            />
                        }
                        case PAGES.HOME: {
                            return <HomeScreen
                                setPage={ this.setPage }
                                setToken={ this.setToken }
                            />
                        }
                        case PAGES.PROFILE: {
                            return <ProfileScreen
                                setPage={ this.setPage }
                                setToken={ this.setToken }
                            />
                        }
                    }
                })()
        )
    }
}

