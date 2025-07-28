import React from 'react'
import LoginScreen from './LoginScreen'
import { View } from 'react-native'
type Props = {}

const Authentication = (props: Props) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <LoginScreen />
    </View>
  )
}

export default Authentication