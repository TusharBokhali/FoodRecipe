import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
export default function Loading(props:any) {
  return (
    <View style={styles.container}>
        <LottieView source={require('../assets/images/Animation.json')} autoPlay loop style={{width:70,height:70,marginTop:20}}/> 
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})