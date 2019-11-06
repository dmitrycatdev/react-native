import * as React from 'react';
import {
  ActivityIndicator,
} from 'react-native';

import { primaryColor } from '../styles'

export default class Loader extends React.Component {
  render() {
    return <ActivityIndicator style={this.props.style ? this.props.style : {}} size="small" color={primaryColor} />
  }
}
