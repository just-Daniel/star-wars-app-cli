import React, { useEffect, useState } from 'react';
import { Text, ScrollView, StyleSheet } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { useQuery } from '@apollo/client';
import { GET_MOVIE, MovieType } from '../apollo/queries/getMovie';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import { ScreenNavigationProp } from '../navigations/navigation';
import MovieDetailsScreen from '../components/movieScreen/MovieDetailsScreen';
import MovieCharacterListScreen from '../components/movieScreen/MovieCharacterListScreen';

type RootStackParamList = {
  Movie: { filmId: string };
};
type MovieScreenRouteProp = RouteProp<RootStackParamList, 'Movie'>;

const MovieScreen: React.FC<{ route: MovieScreenRouteProp }> = ({ route }) => {
  const { filmId } = route.params;
  const navigation: ScreenNavigationProp = useNavigation();
  const [movie, setMovie] = useState<MovieType | undefined>();
  const { data, loading, error, refetch } = useQuery(GET_MOVIE, {
    variables: { filmId },
  });

  useEffect(() => {
    if (!loading) {
      setMovie(data?.film);
    }
  }, [data]);

  if (error) {
    return <ErrorMessage error={error.message} onRetry={refetch} />;
  }

  const navigateToCharacterScreen = (personId: string) => {
    navigation.navigate('Character', { personId });
  };

  return (
    <ScrollView style={styles.container}>
      {loading && <Loader />}

      <MovieDetailsScreen movie={movie} />
      <Text style={styles.heading}>Characters:</Text>
      <MovieCharacterListScreen
        characters={movie?.characterConnection.characters}
        onCharacterPress={navigateToCharacterScreen}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
});

export default MovieScreen;
