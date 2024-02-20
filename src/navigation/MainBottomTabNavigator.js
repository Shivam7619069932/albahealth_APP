import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CustomBottomTabBar } from '../components';
import ReportScreen from '../screens/report/ReportScreen';
import TaskScreen from '../screens/tasks/TaskScreen';
import ProfileStackNavigator from './ProfileStackNavigator';
import { useContext } from 'react';
import { LogContext } from '../context';

const Tab = createBottomTabNavigator();

export default function MainBottomTabNavigator() {
  const { submitEnd } = useContext(LogContext);

  return (
    <Tab.Navigator
      tabBar={props => <CustomBottomTabBar {...props} />}
      initialRouteName='TasksTab'
    >
      <Tab.Screen name="ReportTab" 
        component={ReportScreen} 
        options={{
          headerShown: false,
          tabBarLabel: 'Report',
        }}
        listeners={{
          tabPress: e => {
            if (!submitEnd) {
              e.preventDefault();
            }
          }
        }}
      />
      <Tab.Screen name="TasksTab" 
        component={TaskScreen} 
        options={{
          headerShown: false,
          tabBarLabel: 'Tasks',
        }}
      />
      <Tab.Screen name="ProfileTab" 
        component={ProfileStackNavigator} 
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
        }}
      />
    </Tab.Navigator>
  )
}
