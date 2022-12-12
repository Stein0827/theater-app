import React, {useState} from 'react';
import { MovieList } from "./Movies/MovieList";
import { PaymentCreate } from "./Payment/PaymentCreate";
import { Route, Routes, Navigate } from "react-router-dom";
import { MovieRequest } from "./types.js"

const tempMovieEx = {
  "movie_id": 1,
  "name": "Avatar: The Way of Water",
  "desc": "Jake Sully lives with his newfound family formed on the planet of Pandora. Once a familiar threat returns to finish what was previously started, Jake must work with Neytiri and the army of the Navi race to protect their planet.",
  "length": "3h 12m",
  "rating": "PG-13",
  "thumbnail": "https://wallpapercave.com/wp/wp8213746.jpg",
  "trailer": "https://www.youtube.com/watch?v=d9MyW72ELq0"
}

export const App = () => {
  const [theaterId, setTheaterId] = useState("6396a22ad756e00453645f8d");
  const [movie, setMovie] = useState(tempMovieEx);
  const [showing, setShowing] = useState("1:30PM");

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/paymentCreate" />} />
      <Route path="/moviesList" element={<MovieList theaterId={theaterId} />} />
      <Route path="/paymentCreate" element={<PaymentCreate movie={movie} theaterId={theaterId} showingTime={showing}/>} />
    </Routes>
  );
};

export default App;
