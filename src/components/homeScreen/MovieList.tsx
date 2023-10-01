import React from 'react';
import {
  FlatList,
  StyleSheet,
} from 'react-native';
import { GetAllMoviesType } from '../../apollo/queries/getAllMovies';
import MovieShortInfo from '../common/MovieShortInfo';

interface MovieListProps {
  data: GetAllMoviesType[];
  onItemClick: (movieId: string) => void;
}

const MovieList: React.FC<MovieListProps> = ({ data, onItemClick }) => {
  const renderItem = ({ item }: { item: GetAllMoviesType }) => (
    <MovieShortInfo
      onItemClick={() => onItemClick(item.id)}
      title={item.title}
      releaseDate={item.releaseDate}
      openingCrawl={item.openingCrawl}
      id={item.id + item.title.length}
      key={item.id}
    />
  );

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
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

export default MovieList;
