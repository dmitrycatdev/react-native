import { StyleSheet } from 'react-native'

export const primaryColor = '#f50057'

export const styles = StyleSheet.create({
  container: {
    height: '100%',
    alignItems: 'center',
    backgroundColor:'#eeeeee',
  },
  containerWhite: {
    height: '100%',
    alignItems: 'center',
    backgroundColor:'white',
  },
  innerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    height: '100%',
    width: '100%',
    maxWidth: 400,
  },
  page: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 24,
    paddingTop: 48,
    // backgroundColor: '#eeeeee',
    width: '100%',
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  h1: {
    margin: 24,
    marginTop: 0,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    height: 128,
    width: 128,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  textInput: {
    height: 40,
    width: 250,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 30,
  },
  textInputFocused: {
    borderBottomColor: primaryColor,
  },
  btn: {
    width: 150
  },
  bottomNavbar: {height: 80, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', width: '100%'},
});

export const btn = {
  backgroundColor: primaryColor
}