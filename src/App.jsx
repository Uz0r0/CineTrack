import { Navbar, Footer } from "./components"
import {
  HomePage,
  Movies,
  TvShows,
  FavouritesPage,
  DetailsPage,
  NotFoundPage,
} from "./pages";

import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie" element={<Movies />} />
        <Route path="/tv" element={<TvShows />} />
        <Route path="/favourites" element={<FavouritesPage />} />
        <Route path="/movie/:id" element={<DetailsPage isMovie={true}/>} />
        <Route path="/tv/:id" element={<DetailsPage isMovie={false}/>} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App