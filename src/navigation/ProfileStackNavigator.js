import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from '../screens/profile/ProfileScreen';
import ChangeAnswerScreen from '../screens/profile/ChangeAnswerScreen';

const Stack = createNativeStackNavigator();

export default function ProfileStackNavigator() {
  
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{headerShown: true}}
    >
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{title: '', headerShown: false}}
      />
      <Stack.Screen 
        name="ChangeAnswer" 
        component={ChangeAnswerScreen} 
        options={{title: '', headerShown: false}}
      />
    </Stack.Navigator>
  )
}
