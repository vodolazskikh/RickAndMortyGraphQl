import { gql } from '@apollo/client';

export interface RickAndMortyPersonsQueryResponse {
  characters: {
    info: {
      count: number;
    };
    results: {
      id: string;
      name: string;
      image: string;
    }[];
  };
}

export interface RickAndMortyPersonsQueryVars {
  name: string;
}

export const getRickAndMortyPersonsQuery = gql`
  query Query($name: String!) {
    characters(page: 1, filter: { name: $name }) {
      info {
        count
      }
      results {
        id
        name
        image
      }
    }
  }
`;
