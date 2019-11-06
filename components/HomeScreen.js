import * as React from 'react'

import {
    Text,
    View,
    ScrollView,
} from 'react-native'

import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper'
import BottomNavbar from './BottomNavbar'

import { styles, btn } from '../styles'
import Separator from './Separator'
import { replaceWithAstriks } from '../helpers'
import { PAGES } from '../constants'

import { BottomNavigation } from 'react-native-paper'
import { Provider as PaperProvider } from 'react-native-paper'
import EventCard from './EventCard'
import { getEventsRequest } from '../helpers/requests'
import Loader from './Loader'
import { Notifications } from 'expo'



export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            events: null,
            isLoading: true,
        }

    }

    componentDidMount() {
        this._notificationSubscription = Notifications.addListener(this._handleNotification)

        // getEventsRequest()
        //     .then(events => {
        //         this.setState({
        //             events,
        //             isLoading: false,
        //         })
        //     })
    }

    _handleNotification = (notification) => {
        console.log({notification})
        if (notification.data.type === 'EVENT_POSTED') {
            this.setState(state => ({
                events: [ {...notification.data.payload}, ...(state.events || [])]
            }), () => {
                console.log(this.state.events)
            })
        }
    }

    onExitClick = () => {
      this.props.setToken(null)
      this.props.setPage(PAGES.LOGIN)
    }

    onProfileClick = () => {
      this.props.setPage(PAGES.PROFILE)
    }

    render() {
        const {} = this.state

        const {} = this

        return (
            <View style={styles.container}>
              <View style={{maxHeight: '90%'}}>
                <ScrollView>
                    <View style={ styles.page }>
                        <Text style={ styles.h1 }>Лента</Text>
                        {
                            this.state.isLoading && <Loader />
                        }
                        {
                            !!this.state.events && this.state.events.map((event, i) => {
                                return <EventCard key={event._id || i} {...event} />
                            })
                        }
                    </View>
                </ScrollView>
              </View>
              <BottomNavbar
                  onProfileClick={this.onProfileClick}
                  onExitClick={this.onExitClick}
              />
            </View>
        )
    }
}
