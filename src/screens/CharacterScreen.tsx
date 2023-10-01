import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import { GET_CHARACTER, CharacterType } from '../apollo/queries/getCharacter';
import { useLikedCharactersContext } from '../context/LikedCharactersContext';
import { ScreenNavigationProp } from '../navigations/navigation';
import Loader from '../components/common/Loader';
import MovieShortInfo from '../components/common/MovieShortInfo';
import ErrorMessage from '../components/common/ErrorMessage';
import Icon from 'react-native-vector-icons/FontAwesome5';

type RootStackParamList = {
  Character: { personId: string };
};
type CharacterMovieScreenRouteProp = RouteProp<RootStackParamList, 'Character'>;

const CharacterScreen: React.FC<{
  route: CharacterMovieScreenRouteProp;
}> = ({ route }) => {
  const navigation: ScreenNavigationProp = useNavigation();
  const { personId } = route.params;
  const { data, loading, error, refetch } = useQuery(GET_CHARACTER, {
    variables: { personId },
  });
  const [character, setCharacter] = useState<CharacterType | undefined>();
  const { likedCharacters, likeCharacter, unlikeCharacter } =
    useLikedCharactersContext();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (data?.person) {
        setCharacter(data.person);
        setLiked(likedCharacters.includes(data.person));
      }
    }
  }, [data, likedCharacters]);

  if (error) {
    return <ErrorMessage error={error.message} onRetry={refetch} />;
  }

  const toggleLike = () => {
    if (character) {
      if (liked) {
        unlikeCharacter(character);
      } else {
        likeCharacter(character);
      }
      setLiked(!liked);
    }
  };

  const navigateToMovieScreen = (filmId: string) => {
    navigation.navigate('Movie', { filmId });
  };

  return (
    <ScrollView style={styles.container}>
      {loading && <Loader />}

      <Text style={styles.name}>{character?.name}</Text>

      <TouchableOpacity
        style={styles.likeButton}
        onPress={() => toggleLike()}
        activeOpacity={0.8}
      >
        <Text style={styles.likeButtonText}>{liked ? 'Unlike' : 'Like'}</Text>
      </TouchableOpacity>

      <View>
        <Text style={styles.subheader}>Character Details</Text>
        <Text style={styles.text}>
          Birth year: {character?.birthYear && character.birthYear.toString()}
        </Text>
        <Text style={styles.text}>Height: {character?.height} cm</Text>
        <Text style={styles.text}>Mass: {character?.mass} kg</Text>
        <Text style={styles.text}>Homeworld: {character?.homeworld.name}</Text>
        <Text style={styles.subheader}>Movies:</Text>
      </View>

      <View style={styles.listMovies}>
        {character?.filmConnection.films.map((film) => (
          <MovieShortInfo
            key={film.id}
            onItemClick={() => navigateToMovieScreen(film.id)}
            title={film.title}
            releaseDate={film.releaseDate}
            openingCrawl={film.openingCrawl}
            id={film.id}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  name: {
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  listMovies: {
    marginBottom: 40,
  },
  movieItem: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginTop: 8,
    alignItems: 'center',
    height: 80,
  },
  likeButton: {
    backgroundColor: 'green',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
    width: '40%',
  },
  likeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
  },
  subheader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
  },
});

export default CharacterScreen;
