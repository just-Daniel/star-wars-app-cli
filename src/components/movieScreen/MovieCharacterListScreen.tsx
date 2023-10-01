import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

interface MovieCharacterListScreenProps {
  characters: { id: string; name: string }[] | undefined;
  onCharacterPress: (characterId: string) => void;
}

const MovieCharacterListScreen: React.FC<MovieCharacterListScreenProps> = ({
  characters,
  onCharacterPress,
}) => {
  return (
    <>
      {(characters || []).map((character) => (
        <TouchableOpacity
          style={styles.characterItem}
          onPress={() => onCharacterPress(character.id)}
          key={character.id}
        >
          <Text style={styles.characterName}>{character.name}</Text>
        </TouchableOpacity>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  characterItem: {
    backgroundColor: '#e1e1e1',
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
  },
  characterName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MovieCharacterListScreen;
