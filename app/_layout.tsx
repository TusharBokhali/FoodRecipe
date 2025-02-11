import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreens from '@/screens/HomeScreens';
import WelcomeScreens from '@/screens/WelcomeScreens';
import RecipesDetails from '@/screens/RecipesDetails';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const Stack = createNativeStackNavigator();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <StatusBar backgroundColor="transparent" style='light' translucent={true} />
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade_from_bottom' }} initialRouteName='WelcomeScreens'>
        <Stack.Screen name='Home' component={HomeScreens} />
        <Stack.Screen name='WelcomeScreens' component={WelcomeScreens} />
        <Stack.Screen name='RecipesDetails' component={RecipesDetails} />
      </Stack.Navigator>
    </>
  );
}
