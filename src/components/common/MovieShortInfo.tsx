import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';

type ItemInfo = {
  onItemClick: (id: string) => void;
  title: string;
  releaseDate: string;
  openingCrawl: string;
  id: string
};

const MovieShortInfo: React.FC<ItemInfo> = (
  item
): React.JSX.Element => {
  return (
    <TouchableOpacity
      onPress={() => item.onItemClick(item.id)}
      style={styles.itemContainer}
      activeOpacity={0.8}
      key={item.id}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.releaseDate}>{item.releaseDate}</Text>
      <Text style={styles.openingCrawl}>
        {item.openingCrawl.slice(0, 50)}
        {item.openingCrawl.length > 50 ? '...' : ''}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 16,
    padding: 16,
    marginHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  releaseDate: {
    fontSize: 16,
    marginTop: 8,
  },
  openingCrawl: {
    fontSize: 14,
    marginTop: 8,
    color: 'gray',
  },
});

export default MovieShortInfo;
