import React from 'react'
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native'

import { Home } from './src/pages/Home'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

export default function App() {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <Home />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#0267C1',
    paddingTop: getStatusBarHeight()
  }
})
