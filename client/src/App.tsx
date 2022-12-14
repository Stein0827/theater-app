import React from 'react';
import { PaymentCreate } from "./Payment/PaymentCreate";
import { Route, Routes, Navigate } from "react-router-dom";
import { Signin }  from "./user/signin";
import { GetTheaterByZip } from './Theater/GetTheaterByZip';
import { TheaterDetail } from './Theater/TheaterDetail';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/findTheaters" />} />
      <Route path="/paymentCreate" element={<PaymentCreate />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/findTheaters" element={<GetTheaterByZip />} />
      <Route path="/theaterDetail" element={<TheaterDetail />}/>
    </Routes>
  );
};

export default App;
