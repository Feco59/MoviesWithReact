import { useContext } from "react";
import { MoviesContext } from "./Components/common/MoviesContext";
import MoviesTable from "./Components/pages/MoviesTable";
import LoadingScreen from "./Components/common/LoadingScreen";
import { NavBar } from "./Components/navbar/NavBar";

function App() {
  const {movies, setMovies, Loading} = useContext(MoviesContext);

  return (
    <div className="container">
      <NavBar setMovies={setMovies} movies/>
      {Loading ? <LoadingScreen /> : <MoviesTable moviesList={movies} />}
    </div>
  );
}

export default App;