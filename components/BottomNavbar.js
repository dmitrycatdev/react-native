import React from 'react'
import { BottomNavigation, Button } from 'react-native-paper'
import { styles } from '../styles'
import { View } from 'react-native'

export default ({
                    onProfileClick = () => { },
                    onExitClick = () => { },
                    onFeedClick = () => { },
                }) =>

    <View style={styles.bottomNavbar}>
        <Button onPress={onFeedClick}>Лента</Button>
        <Button onPress={onProfileClick}>Профиль</Button>
        <Button onPress={onExitClick }>Выход</Button>
    </View>
