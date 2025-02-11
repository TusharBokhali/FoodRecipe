import { View, Text, StyleSheet, useColorScheme, Image } from 'react-native'
import React, { useEffect } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
export default function WelcomeScreens() {
    const isDark = useColorScheme() === 'dark';
    const Animate1 = useSharedValue(0);
    const Animate2 = useSharedValue(0);

    const {replace} = useNavigation<any>();
    useEffect(()=>{
        Animate1.value = 0;
        Animate2.value = 0;
        setTimeout(()=> Animate1.value = withSpring(Animate1.value + hp(5.5)),100);
        setTimeout(()=> Animate2.value = withSpring(Animate2.value + hp(4)),300);

        setTimeout(()=> replace('Home'),2500)
    },[])
  return (
    <View style={[styles.container]}>
        <Animated.View style={{backgroundColor:'#F4A732',borderRadius:'100%',padding:Animate1}}>
            <Animated.View style={{backgroundColor:'#F4B856',borderRadius:'100%',padding:Animate2}}>
                <Image 
                source={require('../assets/images/Logo.png')}
                style={{
                    width:hp(20),
                    height:hp(20),
                }}
                />
            </Animated.View>
        </Animated.View>
        <View style={{
            alignItems:'center',
            marginTop:20
        }}>
            <Text style={{
                color:"white",
                fontWeight:'bold',
                marginVertical:10,
                fontSize:hp(7)

            }}>Foody</Text>
            <Text
            style={{
                color:"white",
                fontWeight:'medium',
                fontSize:hp(2)
            }}
            >Food is Always Right</Text>

        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#F3920B'
    }
})