import React from 'react';
import { Image } from 'react-native';
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs';
import EpisodeTab from '../tabs/EpisodeTab';
import LikedCharactersTab from '../tabs/LikedCharactersTab';


const Tab = createBottomTabNavigator();

const tabConfig: BottomTabNavigationOptions = {
  tabBarLabelStyle: {
    fontSize: 14,
    color: '#000',
    fontWeight: '700',
    marginBottom: 4
  },
  tabBarActiveBackgroundColor: '#d7e4fa',
};

const tabScreens = [
  {
    name: 'Episodes',
    component: EpisodeTab,
    iconSource: require('../../assets/icon-movie.png'),
  },
  {
    name: 'Liked Characters',
    component: LikedCharactersTab,
    iconSource: require('../../assets/icon-like.png'),
  },
];

const HomeScreen: React.FC = () => {
  return (
    <Tab.Navigator>
      {tabScreens.map((tab, index) => (
        <Tab.Screen
          key={index}
          name={tab.name}
          component={tab.component}
          options={{
            tabBarIcon: () => (
              <Image
                source={tab.iconSource}
                style={{ width: 20, height: 20 }}
              />
            ),
            ...tabConfig,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default HomeScreen;
