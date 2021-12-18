import React, { useState, useEffect } from 'react';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { Root } from 'native-base';
import AppLoading from 'expo-app-loading';
import { Ionicons } from '@expo/vector-icons';
import Login from './containers/login/Login';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import HomeScreen from './containers/home/HomeScreen';
import Cart from './containers/sale/Cart';
import DetailsItem from './containers/sale/DetailsItem';
const Stack = createStackNavigator();

export default function App() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    loadResourcesAndDataAsync();
  }, []);

  async function loadResourcesAndDataAsync() {
    try {
      SplashScreen.preventAutoHideAsync();
      await Font.loadAsync({
        Roboto: require('native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
        ...Ionicons.font,
      });

      SplashScreen.hideAsync();

      setLoadingComplete(true);

    } catch (e) {
      // We might want to provide this error information to an error reporting service         
    }
  }

  if (!isLoadingComplete) {  
    return (
      <AppLoading />
    )
  }
  
  return (
    <Root>
      <NavigationContainer>
        <Stack.Navigator

          initialRouteName='Login'
          unmountInactiveRoutes
          unmountInactiveScreens
          screenOptions={{
            gestureEnabled: true,
            headerShown: false,
            gestureDirection: "horizontal",
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
          }}
        >
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="DetailsItem" component={DetailsItem} />
        </Stack.Navigator>
      </NavigationContainer>
    </Root>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
