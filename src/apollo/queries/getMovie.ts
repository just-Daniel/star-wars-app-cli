import { gql } from '@apollo/client';

export const GET_MOVIE = gql`
  query GetMovie($filmId: ID!) {
    film(id: $filmId) {
      id
      title
      releaseDate
      openingCrawl
      speciesConnection {
        totalCount
      }
      planetConnection {
        totalCount
      }
      vehicleConnection {
        totalCount
      }
      characterConnection {
        characters {
          id
          name
        }
      }
    }
  }
`;

export type MovieType = {
  id: string;
  title: string;
  releaseDate: string;
  openingCrawl: string;
  speciesConnection: { totalCount: number };
  planetConnection: { totalCount: number };
  vehicleConnection: { totalCount: number };
  characterConnection: {
    characters: { id: string; name: string }[];
  };
};
