import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import ImagesCache from '@/helpers/ImagesCache';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ChevronLeftIcon, ClockIcon, FireIcon, Square3Stack3DIcon } from 'react-native-heroicons/outline';
import { HeartIcon, UsersIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Loading from '@/Components/Loading';
import YoutubeIframe from 'react-native-youtube-iframe';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';

export default function RecipesDetails(props: any) {
  let item = props.route.params;
  const [Fave, setFave] = useState(false);
  const { goBack } = useNavigation();
  const [meal, setMeal] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getMealData(item.idMeal);
  }, [])
  const getMealData = async (id: any) => {
    const data = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then((res) => {
      if (res && res.data) {
        setMeal(res.data.meals[0]);
        setLoading(false);
      }
    })
  }

  const Ingredients = (meal: any) => {
    if (!meal) return [];
    let indexes = [];
    for (let i = 0; i <= 20; i++) {
      if (meal['strIngredient' + i]) {
        indexes.push(i)
      }
    }
    return indexes;
  }
  const getYouTubeVideoId = (url: any) => {
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  }
  return (
    <ScrollView
      style={{ backgroundColor: 'white', flex: 1 }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <StatusBar style={'dark'} />
      <Animated.View style={{ justifyContent: 'center', flexDirection: 'row', }}>
        <Animated.Image
          source={{ uri: item.strMealThumb }}
          sharedTransitionTag={'Images'+item.idMeal}
          style={{
            width: wp(95),
            height: hp(50),
            borderRadius: 30,
            borderBottomLeftRadius: 40,
            borderBottomRightRadius: 40,
            marginTop: 5,
          }}

        />
      </Animated.View>
      <Animated.View entering={FadeIn.delay(200).duration(1000)} style={{ width: '100%', flexDirection: 'row', position: 'absolute', justifyContent: 'space-between', alignItems: 'center', paddingTop: 35, paddingHorizontal: 10 }}>
        <TouchableOpacity onPress={() => goBack()} style={{
          padding: 8,
          backgroundColor: 'white',
          borderRadius: 100,
        }}>
          <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color={'#fbbf24'} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setFave(!Fave)} style={{
          padding: 8,
          backgroundColor: 'white',
          borderRadius: 100,
        }}>
          <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={Fave ? 'red' : 'gray'} />
        </TouchableOpacity>
      </Animated.View>
      {
        loading ? (
          <Loading />
        ) : (
          <View style={{
            paddingHorizontal: 4,
            marginVertical: 8,
            paddingTop: 8
          }}>
            <Animated.View entering={FadeInDown.duration(700).springify().damping(12)}>
              <Text style={{
                fontSize: hp(3),
                fontWeight: 'bold',
                flex: 1,
                color: "gray",
                marginLeft: 5
              }}>
                {meal?.strMeal}
              </Text>

              <Text style={{
                fontSize: hp(2),
                fontWeight: 'medium',
                flex: 1,
                color: "darkgray",
                marginTop: 8,
                marginLeft: 5,
              }}>
                {meal?.strArea}
              </Text>
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(100).duration(700).springify().damping(12)} style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 20
            }}>
              <View style={{
                borderRadius: 100,
                backgroundColor: '#FFD54F',
                padding: 5
              }}>
                <View style={{ height: hp(6.5), width: hp(6.5), backgroundColor: 'white', borderRadius: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <ClockIcon size={hp(4)} strokeWidth={2.5} color={'#525252'} />
                </View>
                <View style={{ alignItems: 'center', paddingVertical: 5, marginVertical: 4 }}>
                  <Text style={{
                    fontSize: hp(1.5),
                    fontWeight: 'bold',
                    color: "black",
                  }}>35</Text>
                  <Text style={{
                    fontSize: hp(1.5),
                    fontWeight: 'bold',
                    color: "black",
                  }}>Mins</Text>
                </View>
              </View>

              <View style={{
                borderRadius: 100,
                backgroundColor: '#FFD54F',
                padding: 5
              }}>
                <View style={{ height: hp(6.5), width: hp(6.5), backgroundColor: 'white', borderRadius: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <UsersIcon size={hp(4)} strokeWidth={2.5} color={'#525252'} />
                </View>
                <View style={{ alignItems: 'center', paddingVertical: 5, marginVertical: 4 }}>
                  <Text style={{
                    fontSize: hp(1.5),
                    fontWeight: 'bold',
                    color: "black",
                  }}>03</Text>
                  <Text style={{
                    fontSize: hp(1.5),
                    fontWeight: 'bold',
                    color: "black",
                  }}>Servings</Text>
                </View>
              </View>

              <View style={{
                borderRadius: 100,
                backgroundColor: '#FFD54F',
                padding: 5
              }}>
                <View style={{ height: hp(6.5), width: hp(6.5), backgroundColor: 'white', borderRadius: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <FireIcon size={hp(4)} strokeWidth={2.5} color={'#525252'} />
                </View>
                <View style={{ alignItems: 'center', paddingVertical: 5, marginVertical: 4 }}>
                  <Text style={{
                    fontSize: hp(1.5),
                    fontWeight: 'bold',
                    color: "black",
                  }}>103</Text>
                  <Text style={{
                    fontSize: hp(1.5),
                    fontWeight: 'bold',
                    color: "black",
                  }}>Cal</Text>
                </View>
              </View>

              <View style={{
                borderRadius: 100,
                backgroundColor: '#FFD54F',
                padding: 5
              }}>
                <View style={{ height: hp(6.5), width: hp(6.5), backgroundColor: 'white', borderRadius: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                  <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color={'#525252'} />
                </View>
                <View style={{ alignItems: 'center', paddingVertical: 5, marginVertical: 4 }}>
                  <Text style={{
                    fontSize: hp(1.5),
                    fontWeight: 'bold',
                    color: "black",
                  }}></Text>
                  <Text style={{
                    fontSize: hp(1.5),
                    fontWeight: 'bold',
                    color: "black",
                  }}>Easy</Text>
                </View>
              </View>
            </Animated.View>
            {/* Description  */}
            <Animated.View entering={FadeInDown.delay(200).duration(700).springify().damping(12)} style={{
              marginVertical: 10
            }}>
              <Text style={{ fontSize: hp(2.5), fontWeight: 'bold', flex: 1, color: 'black', marginLeft: 8, marginVertical: 10 }}>Ingredients</Text>
              <View style={{
                marginVertical: 5,
                marginLeft: 5,
                gap: 5
              }}>
                {
                  Ingredients(meal).map((el, inx) => {
                    return (
                      <View style={{ flexDirection: 'row', marginHorizontal: 10, alignItems: 'center', gap: 5 }} key={inx}>
                        <View style={{ height: hp(1.5), width: hp(1.5), borderRadius: 50, backgroundColor: "#FFD54F" }} />
                        <View style={{ flexDirection: 'row', paddingHorizontal: 5, gap: 5 }}>
                          <Text style={{ fontWeight: '600', fontSize: hp(1.7) }}>{meal['strMeasure' + inx]}</Text>
                          <Text style={{ fontWeight: '400', fontSize: hp(1.7) }}>{meal['strIngredient' + inx]}</Text>
                        </View>
                      </View>
                    )
                  })
                }
              </View>
            </Animated.View>
            {/* Instractions  */}

            <Animated.View entering={FadeInDown.delay(300).duration(700).springify().damping(12)} style={{
              marginVertical: 10,
            }}>
              <Text style={{ fontSize: hp(2.5), fontWeight: 'bold', flex: 1, color: 'black', marginLeft: 8, marginVertical: 10 }}>Instractions</Text>
              <Text style={{
                fontSize: hp(1.6),
                color: 'black',
                textAlign: 'justify',
                padding: 15
              }}>{
                  meal?.strInstructions
                }</Text>
            </Animated.View>

            {/* Video  */}
            {
              meal.strYoutube && (
                <Animated.View entering={FadeInDown.delay(400).duration(700).springify().damping(12)} style={{
                  paddingVertical: 6,

                }}>
                  <Text style={{ fontSize: hp(2.5), fontWeight: 'bold', flex: 1, color: 'black', marginLeft: 8, marginVertical: 10 }}>Recipe Video</Text>
                  <View>
                    <YoutubeIframe
                      videoId={getYouTubeVideoId(meal.strYoutube)}
                      height={hp(30)}
                    />
                  </View>
                </Animated.View>
              )
            }
          </View>
        )
      }
    </ScrollView>
  )
}