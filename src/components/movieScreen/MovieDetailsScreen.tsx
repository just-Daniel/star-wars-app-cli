import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MovieType } from '../../apollo/queries/getMovie';

const MovieDetailsScreen: React.FC<{ movie: MovieType | undefined }> = ({
  movie,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Title: {movie?.title}</Text>
      <Text style={styles.releaseDate}>Release Date: {movie?.releaseDate}</Text>
      <Text style={styles.heading}>Opening Crawl:</Text>
      <Text style={styles.openingCrawl}>{movie?.openingCrawl}</Text>
      <Text style={styles.heading}>
        Total Species: {movie?.speciesConnection?.totalCount}
      </Text>
      <Text style={styles.heading}>
        Total Planets: {movie?.planetConnection?.totalCount}
      </Text>
      <Text style={styles.heading}>
        Total Vehicles: {movie?.vehicleConnection?.totalCount}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  releaseDate: {
    fontSize: 16,
    marginVertical: 8,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  openingCrawl: {
    fontSize: 16,
    marginTop: 8,
  },
});

export default MovieDetailsScreen;
