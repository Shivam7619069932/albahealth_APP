import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Profile, ProfileActive, Report, ReportActive, ReportDisable, Task, TaskActive } from '../../../assets';
import { useContext } from 'react';
import { LogContext } from '../../context';
import { AntDesign } from '@expo/vector-icons';

export default function CustomBottomTabBar({ state, descriptors, navigation }) {
  const { submitEnd } = useContext(LogContext);

  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;
        
        // const tabBarIcon = options.tabBarIcon;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <View style={styles.tabBarElement} key={index}>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabBarButton}
              disabled={label === 'Report' && !submitEnd}
            >
              {
                label === 'Report' && submitEnd && 
                <AntDesign name="exclamationcircle" size={13} color="#FF0000" style={styles.tabBubbleIcon} />
              }
              {
                label.toLowerCase() === 'report' &&
                <Image style={styles.tabIcon} 
                  source={!submitEnd ? ReportDisable : isFocused ? ReportActive : Report} 
                  resizeMode='contain' 
                />
              }
              {
                label.toLowerCase() === 'tasks' &&
                <Image 
                  style={styles.tabIcon} 
                  source={isFocused ? TaskActive : Task} 
                  resizeMode='contain' 
                />
              }
              {
                label.toLowerCase() === 'profile' &&
                <Image style={styles.tabIcon} 
                  source={isFocused ? ProfileActive : Profile} 
                  resizeMode='contain' 
                />
              }
              <Text style={[styles.tabLabelText, {color: (label === 'Report' && !submitEnd) ? '#ABABAB' : isFocused ? '#24231F' : '#484848' }]}>
                {label}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}

export const styles = StyleSheet.create({
  tabBarContainer: {
    backgroundColor: 'rgba(254,254,252,0.85)',
    height: 110,
    borderTopWidth: 1,
    borderColor: '#ECECEC',
    flexDirection: 'row',
  },
  tabBarElement: { 
    flex: 1,
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabBarButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    width: 24, 
    height: 24, 
  },
  tabActive: {
    width: 82,
    height: 50,
    position: 'absolute',
  },
  tabLabelText: {
    fontSize: 11,
    fontWeight: '500',
    color: '#484848',
    marginTop: 4,
  },
  tabBubbleIcon: {
    position: 'absolute',
    zIndex: 99,
    top: -1,
    right: 1,
  }
});