import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import HomeScreen from './src/components/HomeScreen';
import ChooseQuizScreen from './src/components/ChooseQuizScreen';
import GameQuizScreen from './src/components/GameQuizScreen';

//SplashScreen.preventAutoHideAsync();

export default function App() {

  const [fontsLoaded] = useFonts({
    'Knewave-Regular': require('./assets/fonts/Knewave-Regular.ttf'),
  });
  
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  
  if (!fontsLoaded) {
    return null;
  }

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ChooseQuizScreen" component={ChooseQuizScreen} />
        <Stack.Screen name="GameQuizScreen" component={GameQuizScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}