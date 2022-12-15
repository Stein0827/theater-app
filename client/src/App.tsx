import React, {useState} from 'react';
import { MovieList } from "./Movies/MovieList";
import { PaymentCreate } from "./Payment/PaymentCreate";
import { Route, Routes, Navigate } from "react-router-dom";
import { MovieResponse } from "./types.js"
import { Signin }  from "./User/SignIn";
import { GetTheaterByZip } from './Theater/GetTheaterByZip';
import { TheaterDetail } from './Theater/TheaterDetail';
import { Signup } from './User/SignUp';

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
  const [theaterId, setTheaterId] = useState("");
  const updateTheaterId = (theaterId: string) => {setTheaterId(theaterId)}
  //const [theaterId, setTheaterId] = useState("00000001639189e929544c75");
  const [movie, setMovie] = useState(tempMovieEx);
  const [showing, setShowing] = useState("1:30PM");
  const [zipcode, setZipcode] = useState({"zip": "01090"});

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/findTheaters" />} />
      <Route path="/paymentCreate" element={<PaymentCreate movie={movie} theaterId={theaterId} showingTime={showing}/>} />
      <Route path="/signin" element={<Signin updateTheaterId={updateTheaterId}/>} />
      <Route path='/signup' element={<Signup />} />
      <Route path="/findTheaters" element={<GetTheaterByZip />} />
      <Route path="/theaterDetail" element={<TheaterDetail />}/>
    </Routes>
  );
};

export default App;
