/**
 * Learn more about createBottomTabNavigator:
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */

import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';
import { TouchableOpacity, Alert } from 'react-native';
import { clearAll } from '../constants/User';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator({ navigation }) {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Todo list"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="create-outline" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Logout"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="exit-outline" color={color} />,
          tabBarButton: (props) => {
            return (
              <TouchableOpacity  {...props}
                onPress={() => {
                  return Alert.alert(
                    'Confirmation required',
                    'Do you really want to logout?',
                    [
                      { text: 'Cancel' },
                      {
                        text: 'Accept', onPress: async () => {
                          await clearAll()
                          navigation.navigate("Login")
                        }
                      },
                    ]
                  )
                }} />
            )
          },
        }}
      />
    </BottomTab.Navigator>
  );
}


// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: React.ComponentProps<typeof Ionicons>['name']; color: string }) {
  return <Ionicons size={25} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TodoLististScreen"
        component={TabOneScreen}
        options={{ headerTitle: 'To do list', headerLeft: () => null }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: 'Tab Two Title' }}
      />
    </TabTwoStack.Navigator>
  );
}
