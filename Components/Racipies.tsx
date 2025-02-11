import { View, Text, StyleSheet, Pressable, Image } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import Animated, { FadeInDown, SharedTransition, withSpring } from 'react-native-reanimated';
import Loading from './Loading';
import { useNavigation } from '@react-navigation/native';
export default function Racipies({ Recipes, meals }: any) {
    const { navigate } = useNavigation<any>();
    const customTransition = SharedTransition.custom((values) => {
        'worklet';
        return {
            height: withSpring(values.targetHeight),
            width: withSpring(values.targetWidth),
            originX: withSpring(values.targetOriginX),
            originY: withSpring(values.targetOriginY),
        };
    });
    return (
        <View style={styles.container}>
            <Text style={{
                fontSize: hp(3),
                fontWeight: '500',
                color: '#7e7e7e'
            }}>Recipes</Text>
            <View>
                {
                    Recipes.length === 0 || meals.length == 0 ? (
                        <Loading size={'large'} />
                    ) : (
                        <MasonryList
                            data={meals}
                            keyExtractor={(item): string => item.idMeal}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, i }) => <CardItem item={item} index={i} navigate={navigate} />}
                            // refreshing={isLoadingNext}
                            // onRefresh={() => refetch({ first: ITEM_CNT })}
                            onEndReachedThreshold={0.1}
                        // onEndReached={() => loadNext(ITEM_CNT)}
                        />
                    )
                }

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        marginVertical: 10
    }
})

const CardItem = ({ item, index, navigate }: any) => {
    let isEven = index % 2 === 0;
    return (
        <Animated.View entering={FadeInDown.delay(index * 100).duration(600).springify().damping(12)}>
            <Pressable style={{
                width: '100%',
                marginBottom: 5,
                justifyContent: 'center',
                marginVertical: 10,
                paddingLeft: isEven ? 0 : 8,
                paddingRight: isEven ? 8 : 0
            }} onPress={() => navigate('RecipesDetails', { ...item })}>
                {/* <Image
                    source={{ uri: item.strMealThumb }}
                    style={{
                        width: '100%',
                        height: index % 3 == 0 ? hp(25) : hp(35),
                        backgroundColor: 'gray',
                        borderRadius: 35,
                    }}
                /> */}
                <Animated.Image
                    source={{ uri: item.strMealThumb }}
                    sharedTransitionTag={'Images' + item.idMeal}
                    style={{
                        width: '100%',
                        height: index % 3 == 0 ? hp(25) : hp(35),
                        backgroundColor: 'gray',
                        borderRadius: 35,
                    }}
                />
                <Text style={{
                    fontWeight: 'bold',
                    marginLeft: 10,
                    marginTop: 5,
                    color: 'gray',
                    fontSize: hp(1.5)
                }}>
                    {
                        item.strMeal.length > 20 ? item.strMeal.slice(0, 20) + '...' : item.strMeal
                    }
                </Text>
            </Pressable>
        </Animated.View>
    )
}