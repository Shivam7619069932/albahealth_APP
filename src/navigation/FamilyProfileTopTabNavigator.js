import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CustomTopTabBar } from '../components';
import ParentProfileScreen from '../screens/familyprofile/ParentProfileScreen';
import PartnerProfileScreen from '../screens/familyprofile/PartnerProfileScreen';
import ChildProfileScreen from '../screens/familyprofile/ChildProfileScreen';
import { useContext } from 'react';
import { ProfileContext } from '../context';

const Tab = createMaterialTopTabNavigator();

export default function FamilyProfileTopTabNavigator({}) {
  const { 
    parentProfile, partnerProfile, childProfile
  } = useContext(ProfileContext);

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTopTabBar {...props} />}
      swipeEnabled={false}
    >
      <Tab.Screen name="ParentProfile" 
        component={ParentProfileScreen} 
        listeners={{
          tabPress: e => {
            if (!parentProfile.completed) {
              e.preventDefault();
            }
          }
        }}
      />
      <Tab.Screen name="PartnerProfile" 
        component={PartnerProfileScreen} 
        listeners={{
          tabPress: e => {
            if (!partnerProfile.completed) {
              e.preventDefault();
            }
          }
        }}
      />
      <Tab.Screen name="ChildProfile" 
        component={ChildProfileScreen} 
        listeners={{
          tabPress: e => {
            if (!childProfile.completed) {
              e.preventDefault();
            }
          }
        }}
      />
    </Tab.Navigator>
  )
}
