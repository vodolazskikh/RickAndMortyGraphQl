import { useQuery } from '@apollo/client';
import { StyleSheet, css } from 'aphrodite';
import React, { ChangeEvent, useCallback, useState } from 'react';
import useDebounce from './hooks/useDebounce';
import {
  getRickAndMortyPersonsQuery,
  RickAndMortyPersonsQueryResponse,
  RickAndMortyPersonsQueryVars
} from './queries/getRickAndMortyPersonsQuery';
import { Spinner } from './ui/Spinner';

const DEFAULT_NAME = 'Rick';

function App() {
  const [name, setName] = useState(DEFAULT_NAME);
  const debouncedName = useDebounce(name, 500);

  const { loading, error, data, refetch } = useQuery<
    RickAndMortyPersonsQueryResponse,
    RickAndMortyPersonsQueryVars
  >(getRickAndMortyPersonsQuery, {
    variables: {
      name: debouncedName
    }
  });

  const onChangeName = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value || DEFAULT_NAME);
  }, []);

  return (
    <main className={css(styles.root)}>
      <h2>Rick And Morty Characters on Apollo GraphQL 🚀</h2>
      <input
        type="text"
        defaultValue={DEFAULT_NAME}
        className={css(styles.input)}
        onChange={onChangeName}
      />
      {loading && (
        <div className={css(styles.noContent)}>
          <Spinner />
        </div>
      )}
      {error && (
        <div className={css(styles.noContent)}>
          Sorry. Server Error. Please, try again later.
          <button onClick={() => refetch()}>Try again</button>
        </div>
      )}
      <div className={css(styles.grid)}>
        {data?.characters.results.map((character) => (
          <div key={character.id} className={css(styles.card)}>
            <img alt={character.name} src={character.image} width="200" height="200" />
            <div className={css(styles.person)}>{character.name}</div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;

const styles = StyleSheet.create({
  root: {
    textAlign: 'center'
  },

  noContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },

  grid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },

  card: {
    position: 'relative',
    margin: '0 2px',
    ':hover': {
      transform: 'scale(1.05)',
      transition: 'all 500ms'
    }
  },

  person: {
    position: 'absolute',
    bottom: 12,
    left: 4,
    background: 'white',
    padding: '2px 4px',
    borderRadius: 4
  },

  input: {
    margin: '8px 0 32px',
    minWidth: '20%',
    padding: '8px 12px',
    outline: 'none',
    border: 'none',
    boxShadow: '-2px -1px 9px 0px rgba(34, 60, 80, 0.2)'
  }
});
