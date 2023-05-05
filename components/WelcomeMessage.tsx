import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const WelcomeMessage = () => {
  return (
    <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: '10%'}}>
      <Text style={{fontSize: 26, fontWeight: 'bold'}}>Welcome Back 💜</Text>
      <Text style={{fontSize: 16, marginTop: 10}}>What's your mood today?</Text>
    </View>
  )
}

export default WelcomeMessage

const styles = StyleSheet.create({})