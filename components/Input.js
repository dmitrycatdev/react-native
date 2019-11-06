import * as React from 'react';
import {
  TextInput,
} from 'react-native';

import { styles, btn } from '../styles'

export default class Input extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isFocused: false,
    }
    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  handleFocus() {
    this.setState({ isFocused: true })
  }

  handleBlur() {
    this.setState({ isFocused: false })
  }

  render() {
    const {
      value = '',
      onChange = () => { },
      placeholder = '',
    } = this.props

    const {
      isFocused,
    } = this.state

    const {
      handleFocus,
      handleBlur,
    } = this

    const textInputStyles = {
      ...(styles.textInput),
      ...(isFocused ? styles.textInputFocused : {})
    }

    return <TextInput
      onFocus={handleFocus} 
      onBlur={handleBlur} 
      style={textInputStyles}
      onChangeText={onChange}
      value={value}
      placeholder={placeholder}
    />
  }
}

/*
export default () => <TextInput
  style={styles.textInput}
  onChangeText={onChange}
  value={value}
  placeholder={placeholder}
/>

*/