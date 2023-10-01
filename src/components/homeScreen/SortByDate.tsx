import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

type SortByDateType = {
  sortByDate: boolean;
  onClick: () => void;
};

const SortByDate: React.FC<SortByDateType> = ({ sortByDate, onClick }) => {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginRight: 20,
      }}
      activeOpacity={0.8}
    >
      <View
        style={{
          marginRight: 5,
          marginTop: 3,
        }}
      >
        <Icon
          name={sortByDate ? 'arrow-up' : 'arrow-down'}
          size={20}
          color="black"
        />
      </View>
      <Text
        style={{
          fontWeight: '700',
          fontSize: 20,
        }}
      >
        Sort by Date
      </Text>
    </TouchableOpacity>
  );
};

export default SortByDate;
