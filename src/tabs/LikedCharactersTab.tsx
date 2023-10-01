import { ScreenNavigationProp } from '../navigations/navigation';
import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useLikedCharactersContext } from '../context/LikedCharactersContext'; // Import the context

const LikedCharactersTab: React.FC<{ navigation: ScreenNavigationProp }> = ({
  navigation,
}) => {
  const { likedCharacters } = useLikedCharactersContext();

  const navigateToCharacterScreen = (personId: string) => {
    navigation.navigate('Character', { personId });
  };

  return (
    <View style={styles.container}>
      {likedCharacters.length !== 0 ? (
        <FlatList
          data={likedCharacters}
          keyExtractor={(character) => character.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.characterItem}
              activeOpacity={0.8}
              onPress={() => navigateToCharacterScreen(item.id)}
            >
              <Text style={styles.characterName}>{item.name}</Text>
              <Text style={styles.characterTitleMovies}>Movies:</Text>
              {item.filmConnection.films.map((i) => (
                <Text key={i.id}> - {i.title}</Text>
              ))}
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={styles.noCharacters}>No liked characters yet.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  characterItem: {
    backgroundColor: '#cbf7dc',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  characterName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
  },
  characterTitleMovies: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  noCharacters: {
    fontSize: 16,
    color: '#666666',
  },
});

export default LikedCharactersTab;
