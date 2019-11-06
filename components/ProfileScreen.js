import * as React from 'react'
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
} from 'react-native'
console.log()


import { Avatar, Card, Title, Paragraph, BottomNavigation, Button } from 'react-native-paper'
import BottomNavbar from './BottomNavbar'

import { styles, btn } from '../styles'
import Separator from './Separator'
import { replaceWithAstriks } from '../helpers'
import { API_URL, PAGES } from '../constants'
import { Surface } from 'react-native-paper'
import Loader from './Loader'

import { Provider as PaperProvider } from 'react-native-paper'
import { getProfile } from '../helpers/requests'
import BarcodeScannerExample from './BarCodeScannerExample'

const surfaceStyles = StyleSheet.create({
    surface: {
        padding: 16,
        height: 80,
        width: 300,
        marginBottom: 8,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        elevation: 4,
        backgroundColor: 'white',
    },
})


export default class ProfileScreen extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            profile: null,
            isError: false,
        }

    }

    componentDidMount() {
        getProfile()
            .then(profile => {
                console.log(profile)
                this.setState({ profile, isLoading: false })
            })

        // fetch(`${API_URL}/api/profile`)
        //     .then(r => {
        //         console.log(JSON.stringify(r))
        //         return r
        //     })
        //     .then(res => res.json())
        //     .then(profile => {
        //         setTimeout(() => {
        //             this.setState({ profile, isLoading: false })
        //         }, 1500)
        //     })
        //     .catch(error => {
        //         alert(JSON.stringify(error))
        //         this.setState({ isLoading: false, isError: true })
        //     })
    }

    onExitClick = () => {
        this.props.setToken(null)
        this.props.setPage(PAGES.LOGIN)
        console.log()
    }

    onProfileClick = () => {
        this.props.setPage(PAGES.PROFILE)
    }

    onFeedClick = () => {
        this.props.setPage(PAGES.HOME)
    }

    render() {
        const {} = this.state

        const {} = this
        const base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRF7c5J78kt+/Xm78lQ6stH5LI36bQh6rcf7sQp671G89ZZ8c9V8c5U9+u27MhJ/Pjv9txf8uCx57c937Ay5L1n58Nb67si8tVZ5sA68tJX/Pfr7dF58tBG9d5e8+Gc6chN6LM+7spN1pos6rYs6L8+47hE7cNG6bQc9uFj7sMn4rc17cMx3atG8duj+O7B686H7cAl7cEm7sRM26cq/vz5/v767NFY7tJM78Yq8s8y3agt9dte6sVD/vz15bY59Nlb8txY9+y86LpA5LxL67pE7L5H05Ai2Z4m58Vz89RI7dKr+/XY8Ms68dx/6sZE7sRCzIEN0YwZ67wi6rk27L4k9NZB4rAz7L0j5rM66bMb682a5sJG6LEm3asy3q0w3q026sqC8cxJ6bYd685U5a457cIn7MBJ8tZW7c1I7c5K7cQ18Msu/v3678tQ3aMq7tNe6chu6rgg79VN8tNH8c0w57Q83akq7dBb9Nld9d5g6cdC8dyb675F/v327NB6////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/LvB3QAAAMFJREFUeNpiqIcAbz0ogwFKm7GgCjgyZMihCLCkc0nkIAnIMVRw2UhDBGp5fcurGOyLfbhVtJwLdJkY8oscZCsFPBk5spiNaoTC4hnqk801Qi2zLQyD2NlcWWP5GepN5TOtSxg1QwrV01itpECG2kaLy3AYiCWxcRozQWyp9pNMDWePDI4QgVpbx5eo7a+mHFOqAxUQVeRhdrLjdFFQggqo5tqVeSS456UEQgWE4/RBboxyC4AKCEI9Wu9lUl8PEGAAV7NY4hyx8voAAAAASUVORK5CYII='
        return (
            <View style={styles.containerWhite}>
                <View style={{maxHeight: '90%', height: '100%'}}>
                    <ScrollView>
                        {
                            this.state.isLoading
                                ? <View style={styles.page}><Loader/></View>
                                : (
                                    this.state.isError
                                        ? <View style={styles.page}>
                                            <Text>Ошибка загрузки</Text>
                                        </View>
                                        : <View style={styles.page}>

                                            <Avatar.Image size={200} source={{ uri: this.state.profile.avatar }} />
                                            <Text style={ styles.h1 }>{this.state.profile.firstName}</Text>
                                            <Text style={ styles.h1 }>{this.state.profile.lastName}</Text>
                                            <Paragraph>{this.state.profile.status}</Paragraph>
                                            {
                                                !!this.state.profile.isBlocked && <Text>Заблокирован</Text>
                                            }
                                            <Card style={ {width: '100%', marginBottom: 16} }>
                                                <Card.Cover source={ {uri: this.state.profile.qrcode} }/>
                                            </Card>
                                            {
                                                (this.state.profile.events || []).map(event => (
                                                    <Surface style={ surfaceStyles.surface } key={`${event.title}${event.url}`}>
                                                        <Avatar.Image size={48} source={{ uri: event.url }} />
                                                        <Paragraph>{ event.title }</Paragraph>
                                                    </Surface>
                                                ))
                                            }
                                            <Text>Сканер QR кода</Text>
                                            <BarcodeScannerExample/>
                                        </View>
                                )
                        }
                    </ScrollView>
                </View>
                <BottomNavbar
                    onFeedClick={this.onFeedClick}
                    onProfileClick={this.onProfileClick}
                    onExitClick={this.onExitClick}
                />
            </View>
        )
    }
}
