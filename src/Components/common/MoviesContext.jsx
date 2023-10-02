import { createContext, useEffect, useState } from 'react';
import apiService from '../../services/apiService';

const MoviesContext = createContext();

const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const MoviesList = await apiService.GET("/");
      setMovies(MoviesList);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <MoviesContext.Provider value={{ movies, setMovies, Loading }}>
      {children}
    </MoviesContext.Provider>
  );
};

export { MoviesContext, MoviesProvider };