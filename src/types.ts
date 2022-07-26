export type Maybe<T> = T | null;

export type UserType = {
  uid: string;
  email: string;
  name: string;
  family_name: string;
  authProvider?: string;
  isAnonymous?: boolean;
  userFilmsIDs?: Array<number>;
  userGenresIDs?: Array<number>;
  library?: UserLibrary;
};

export type UserLibrary = Maybe<Array<Movie>>;

type Genre = {
  id: number;
  name: string;
};

type ProductionCompany = {
  id: number;
  logo_path: Maybe<string>;
  name: Maybe<string>;
  origin_country: Maybe<string>;
};

type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};

type SpokenLanguage = {
  iso_639_1: string;
  name: string;
};

type MovieStatus =
  | 'Rumored'
  | 'Planned'
  | 'In Production'
  | 'Post'
  | 'Production'
  | 'Released'
  | 'Canceled';

export type Movie = {
  poster_path: Maybe<string>;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: Array<number>;
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: Maybe<string>;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
  belongs_to_collection: null;
  budget: number;
  genres: Array<Genre>;
  homepage: Maybe<string>;
  imdb_id: Maybe<string>;
  production_companies: Array<ProductionCompany>;
  production_countries: Array<ProductionCountry>;
  revenue: number;
  runtime: Maybe<number>;
  spoken_languages: Array<SpokenLanguage>;
  status: MovieStatus;
  tagline: Maybe<string>;
};
