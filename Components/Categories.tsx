import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { CategoriesData } from '@/constants/CateGoryData'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import ImagesCache from '@/helpers/ImagesCache';

export default function Categories({categories,getCategory,ChangeCate}:any) {
  return (
    <Animated.View entering={FadeInDown.duration(300).springify()}>
        <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        >
            {
                categories.map((el:any,inx:any)=>{
                    let isActive = el.strCategory === getCategory;
                    let ActiveButton = isActive ? '#FFCA28' : 'lightgray';
                    return (
                        <TouchableOpacity 
                        onPress={()=>ChangeCate(el.strCategory)}
                        key={inx}
                        style={{flex:1,alignItems:'center',marginTop:20,marginHorizontal:6}}
                        >
                            <View style={{
                                borderRadius:100,
                                padding:6,
                                backgroundColor:ActiveButton
                            }}>
                                {/* <Image 
                                source={{uri:el.strCategoryThumb}}
                                style={{
                                    width:hp(6),
                                    height:hp(6),
                                    borderRadius:100
                                }}
                                />  */}
                                <ImagesCache 
                                 uri={el.strCategoryThumb}
                                 style={{
                                     width:hp(6),
                                     height:hp(6),
                                     borderRadius:100
                                 }}
                                />
                            </View>
                                <Text style={{
                                    color:'#525252',
                                    fontSize:hp(1.6)
                                }}>{el.strCategory}</Text>
                        </TouchableOpacity>
                    )
                })
            }
        </ScrollView>
    </Animated.View>
  )
}