import React from 'react'
import { Button, Card, Paragraph } from 'react-native-paper'

export default ({ title, description, img, museum }) => {
    return <Card style={ {width: '100%', marginBottom: 16} }>
        <Card.Title title={title} subtitle={museum}/>
        <Card.Content>
            <Paragraph>{ description }</Paragraph>
        </Card.Content>
        <Card.Cover source={ {uri: img} }/>
        <Card.Actions>
            <Button mode="contained">Подать заявку</Button>
            <Button>Скрыть</Button>
        </Card.Actions>
    </Card>
}