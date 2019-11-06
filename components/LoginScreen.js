import * as React from 'react'
import {
    Text,
    View,
    StyleSheet,
    Image,
    Button,
    SafeAreaView,
    TextInput,
    ActivityIndicator,
} from 'react-native'

import { styles, btn, primaryColor } from '../styles'
import Separator from './Separator'
import Input from './Input'
import Loader from './Loader'
import { replaceWithAstriks } from '../helpers'
import { PAGES } from '../constants'
import { AsyncStorage } from 'react-native'
import { login } from '../helpers/requests'

import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'


export default class LoginScreen extends React.Component {

    onLoginPressed = false

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            isLoading: false,
            errorMessage: '',
        }

        this.onLoginPress = this.onLoginPress.bind(this)
        this.onEmailChange = this.onEmailChange.bind(this)
        this.onPasswordChange = this.onPasswordChange.bind(this)
        this.isValid = this.isValid.bind(this)
        this.getLoginButtonTitle = this.getLoginButtonTitle.bind(this)
    }

    onEmailChange(email) {
        this.clearErrorMessage()
        this.setState({
            email,
        })
    }

    onPasswordChange(password) {
        this.clearErrorMessage()
        this.setState({
            password,
        })
    }

    async onLoginPress() {
        if (this.onLoginPressed) return
        this.onLoginPressed = true

        const {
            setPage,
        } = this.props

        const {
            email,
            password,
        } = this.state

        this.setState({
            isLoading: true,
        })

        const token = await (async () => {
            console.log('tryin to get a token')
            const { status: existingStatus } = await Permissions.getAsync(
                Permissions.NOTIFICATIONS
            )

            console.log({existingStatus})
            let finalStatus = existingStatus
            if (existingStatus !== 'granted') {
                const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
                finalStatus = status
            }
            console.log({finalStatus})
            if (finalStatus !== 'granted') {
                return null
            }
            let token = await Notifications.getExpoPushTokenAsync()
            console.log({token})
            return token
        })()

        login({ email, password, token })
            .then(async token => {
                this.onLoginPressed = false
                this.setState({
                    isLoading: false,
                })
                await AsyncStorage.setItem('token', token)
                setPage(PAGES.PROFILE)
            })
            .catch(err => {
                this.onLoginPressed = false
                this.setState({
                    isLoading: false,
                })
                if (err && (typeof err.message === 'string')) this.setState({errorMessage: err.message})
            })
    }

    clearErrorMessage = () => this.state.errorMessage && this.setState({ errorMessage: '' })

    isValid() {
        const {
            email,
            password,
        } = this.state

        return email && password
    }

    getLoginButtonTitle() {
        const {
            isLoading,
        } = this.state
        if (isLoading) {
            return 'ЗАГРУЗКА...'
        } else {
            return 'ВХОД'
        }
    }

    render() {

        const {
            isLoading,
            email,
            password,
        } = this.state

        const {
            getLoginButtonTitle,
            onEmailChange,
            onPasswordChange,
            isValid,
            onLoginPress,
        } = this

        // <Image style={{width: 200, height: 100, marginBottom: 50}} source={require('../assets/vans.png')} />

        return (
            <View style={ styles.containerWhite }>
                <View style={ styles.innerContainer }>

                    {
                        !!this.state.errorMessage && <Text style={{ color: 'red' }}>{ this.state.errorMessage }</Text>
                    }

                    <Text style={ styles.h1 }>Вход</Text>

                    <Input
                        style={ styles.textInput }
                        onChange={ onEmailChange }
                        value={ email }
                        placeholder='Введите Email'/>

                    <Input
                        onChange={ onPasswordChange }
                        value={ replaceWithAstriks(password) }
                        placeholder='Введите пароль'/>

                    <View style={ [{
                        width: '90%',
                        margin: 10,
                        backgroundColor: 'red'
                    }] }>
                        <Button
                            onPress={ onLoginPress }
                            title={ getLoginButtonTitle() }
                            color={ btn.backgroundColor }
                            disabled={ !isValid() || isLoading }/>
                    </View>

                    <Text style={ styles.paragraph }>ЯВолонтёр.рф</Text>

                    { isLoading && <Loader style={ {marginBottom: -20} }/> }
                </View>
            </View>
        )
    }
}
