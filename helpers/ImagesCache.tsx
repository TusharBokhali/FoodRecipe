import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated from 'react-native-reanimated';
export default function ImagesCache(props:any) {
    const [cacheSource,setCacheSource] = useState<any>(null);
    const {uri} = props;

    useEffect(()=>{
        const geCachedImage = async()=>{
            try {
                const cachedImageDAta:any= await AsyncStorage.getItem(uri);
                if(cacheSource){
                    setCacheSource({uri:cachedImageDAta})
                }else{
                    const res = await fetch(uri);
                    const imageBlob = await res.blob();
                    const base64DAta:any = await new Promise((resolve)=>{
                        const reader = new FileReader();
                        reader.readAsDataURL(imageBlob);
                        reader.onloadend = () =>{
                            resolve(reader.result);
                        };
                    });
                    await AsyncStorage.setItem(uri, base64DAta);
                    setCacheSource({uri:base64DAta})
                };
            } catch (error) {
                // console.log(error);
                setCacheSource({uri});
                
            }
        }
        geCachedImage();
    },[])
  return (
    <View>
        <Animated.Image source={cacheSource} {...props}/>
    </View>
  )
};