import { gql } from '@apollo/client';

export const GET_ALL_MOVIES = gql`
  query GetALlMovies {
    allFilms {
      films {
        id
        title
        releaseDate
        openingCrawl
      }
    }
  }
`;

export type GetAllMoviesType = {
  // films: {
    id: string;
    title: string;
    releaseDate: string;
    openingCrawl: string;
  // }[];
};
