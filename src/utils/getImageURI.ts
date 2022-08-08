export const getImageURI = (width: number, path: string) => {
  return `https://image.tmdb.org/t/p/w${width}/${path}`;
};
