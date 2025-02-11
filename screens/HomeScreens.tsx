import { View, Text, StatusBar, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import Categories from '@/Components/Categories';
import axios from 'axios'
import Racipies from '@/Components/Racipies';
import { SharedTransition, withSpring } from 'react-native-reanimated';
export default function HomeScreens() {
    const [ActiveCate, setActiveCate] = useState<any>('Beef')
    const [category, setCategory] = useState<any[]>([]);
    const [getRecipes, setGetRecipe] = useState<any[]>([])
    const CategorysGetData = async () => {
        const data = await axios.get('https://themealdb.com/api/json/v1/1/categories.php').then((res) => {
            if (res && res.data) {
                setCategory(res.data.categories)
            }
        })
    }

    const ChangeCate = (category: any) => {
        getRecipe(category)
        setActiveCate(category)
        setGetRecipe([]);
    }

    const getRecipe = async (category = 'Beef') => {
        const data = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`).then((res) => {
            if (res && res.data) {
                setGetRecipe(res.data.meals)
            }
        })
    }
    useEffect(() => {
        CategorysGetData();
        getRecipe();
    }, [])
    return (
        <View style={styles.container}>
            <StatusBar barStyle={'dark-content'} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 50 }}
                style={{ paddingTop: 14, marginVertical: 6 }}
            >
                <View style={styles.TopContent}>
                    <Image
                        source={require('../assets/images/User.png')}
                        style={{
                            width: hp(5.5),
                            height: hp(5)
                        }}
                    />
                    <TouchableOpacity>
                        <BellIcon size={hp(4)} color='gray' />
                    </TouchableOpacity>

                </View>
                <View style={{
                    marginBottom: 20,
                    marginHorizontal: 4,
                    marginTop: 2,
                    padding: 15
                }}>
                    <Text style={{ fontSize: hp(1.7,) }}>Hello! Noman!</Text>
                    <View >
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: hp(3.7),
                            color: '#525252'
                        }}>Make your own food,</Text>
                    </View>
                    <Text style={{
                        fontSize: hp(3.8),
                        fontWeight: 'bold',
                        color: '#525252'

                    }}>
                        stay at <Text style={{ color: '#FFCA28' }}>home</Text>
                    </Text>
                </View>

                <View style={styles.Search}>
                    <TextInput
                        placeholder='Search any recipe'
                        placeholderTextColor={'gray'}
                        style={{ fontSize: hp(1.7), flex: 1, marginBottom: 1, paddingLeft: 15 }}
                    />
                    <View style={{
                        padding: 10, backgroundColor: 'white',
                        borderRadius: 70
                    }}>
                        <MagnifyingGlassIcon size={hp(2.7)} strokeWidth={3} color={'gray'} />
                    </View>
                </View>
                <View style={{ marginLeft: 15 }}>
                    {
                        category.length > 0 && <Categories categories={category} getCategory={ActiveCate} ChangeCate={ChangeCate} />
                    }
                </View>
                <View>
                    <Racipies meals={getRecipes} Recipes={category} />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 15
    },

    TopContent: {
        marginHorizontal: 4,
        marginBottom: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15
    },
    Search: {
        marginHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 100,
        backgroundColor: 'lightgray',
        padding: 6,
    }
})