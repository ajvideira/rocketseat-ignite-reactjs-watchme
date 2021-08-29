import { Genre } from '../models';

import { Button } from './Button';

import '../styles/sidebar.scss';

type SideBarProps = {
  genres: Genre[];
  handleSelectGenre: (genreId: number) => void;
  selectedGenreId: number;
};

export function SideBar({
  genres,
  handleSelectGenre,
  selectedGenreId,
}: SideBarProps) {
  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleSelectGenre(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}
