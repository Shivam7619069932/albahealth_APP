import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ProfileContext } from '../../context';

const CustomTopTabBar = ({ state, descriptors, navigation }) => {
  const { 
    parentProfile, partnerProfile, childProfile
  } = useContext(ProfileContext);
  
  return (
    <View style={styles.tabBarContainer}>
      <View style={styles.tabBarWrapper}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              style={[
                styles.tabButton, 
                isFocused 
                || (label === 'ParentProfile' && parentProfile.completed) 
                || (label === 'PartnerProfile' && partnerProfile.completed) 
                || (label === 'ChildProfile' && childProfile.completed) ? styles.tabActive :  {}
              ]}
              disabled={(label === 'ParentProfile' && !parentProfile.completed) || (label === 'PartnerProfile' && !partnerProfile.completed) || (label === 'ChildProfile' && !childProfile.completed)}
            >
              {
                label === 'ParentProfile' 
                ? <>
                    <Text style={[styles.tabButtonText, (isFocused || (label === 'ParentProfile' && parentProfile.completed)) ? styles.activeText : {}]}>Mother</Text>
                    <MaterialCommunityIcons 
                      name={parentProfile.completed ? "check-circle" : "pencil-circle"} 
                      size={16} 
                      color={(isFocused || (label === 'ParentProfile' && parentProfile.completed)) ? "#24231F" : "#0c0c0c40"} 
                    />
                  </>
                : label === 'PartnerProfile' 
                  ? <>
                      <Text style={[styles.tabButtonText, (isFocused || (label === 'PartnerProfile' && partnerProfile.completed)) ? styles.activeText : {}]}>Partner</Text>
                      <MaterialCommunityIcons 
                        name={partnerProfile.completed ? "check-circle" : parentProfile.completed ? "pencil-circle" : "lock"} 
                        size={16} 
                        color={(isFocused || (label === 'PartnerProfile' && partnerProfile.completed)) ? "#24231F" : "#0c0c0c40"} 
                      />
                    </>
                  : <>
                      <Text style={[styles.tabButtonText, (isFocused || (label === 'ChildProfile' && childProfile.completed)) ? styles.activeText : {}]}>Child</Text>
                      <MaterialCommunityIcons 
                        name={childProfile.completed ? "check-circle" : partnerProfile.completed ? "pencil-circle" : "lock"} 
                        size={16} 
                        color={(isFocused || (label === 'ChildProfile' && childProfile.completed)) ? "#24231F" : "#0c0c0c40"} 
                      />
                    </>
              }
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default CustomTopTabBar;

const styles = StyleSheet.create({
  tabBarContainer: {
    padding: 25,
  },
  tabBarWrapper: {
    flexDirection: 'row', 
    backgroundColor: '#ECECEC',
    borderRadius: 10,
  },
  tabButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
  },
  tabActive: {
    height: 29,
    borderRadius: 8,
    backgroundColor: '#FEFEFC',
  },
  tabButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#0c0c0c40',
    marginRight: 4,
  },
  activeText: {
    color: '#24231F',
  },
});
