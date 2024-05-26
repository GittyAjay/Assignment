import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomePage from './page/Home/Home.page';
import {View, Text, StatusBar} from 'react-native';
import {color, t} from 'react-native-tailwindcss';
const Stack = createNativeStackNavigator();
const CustomHeader = () => {
  return (
    <View
      style={[t.flex, t.alignCenter, t.justifyCenter, t.h16, t.pL5, t.bgBlack]}>
      <Text style={[t.textRed600, t.fontBold, t.text3xl]}>Movie Flix</Text>
    </View>
  );
};
function AppRoute() {
  return (
    <>
      <StatusBar backgroundColor={color.black} barStyle="light-content" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{header: () => <CustomHeader />}}>
          <Stack.Screen name="Home" component={HomePage} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default AppRoute;
