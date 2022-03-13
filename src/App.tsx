import { useCallback, useEffect, useState } from 'react';

import { api } from './services/api';

import { Genre, Movie } from './models';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';
import { Header } from './components/Header';

import './styles/global.scss';

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [genres, setGenres] = useState<Genre[]>([]);

  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<Genre>({} as Genre);

  useEffect(() => {
    api.get<Genre[]>('genres').then((response) => {
      setGenres(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<Movie[]>(`movies/?Genre_id=${selectedGenreId}`).then((response) => {
      setMovies(response.data);
    });

    api.get<Genre>(`genres/${selectedGenreId}`).then((response) => {
      setSelectedGenre(response.data);
    });
  }, [selectedGenreId]);

  const handleSelectGenre = useCallback(
    (genreId: number) => {
      setSelectedGenreId(genreId);
      setSelectedGenre(genres.find((genre) => genre.id === genreId) as Genre);
    },
    [genres]
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar
        genres={genres}
        handleSelectGenre={handleSelectGenre}
        selectedGenreId={selectedGenreId}
      />
      <div className="container">
        <Header selectedGenre={selectedGenre} />
        <Content movies={movies} />
      </div>
    </div>
  );
}
