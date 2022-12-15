import React, { useState } from 'react';
import { PaymentCreate } from "./Payment/PaymentCreate";
import { Route, Routes, Navigate } from "react-router-dom";
import { Signin }  from "./User/Signin";
import { GetTheaterByZip } from './Theater/GetTheaterByZip';
import { TheaterDetail } from './Theater/TheaterDetail';
import { Signup } from './User/SignUp';
import { Admin } from "./Admin/Admin"

export const App = () => {
  const [theaterId, setTheaterId] = useState("");
  const updateTheaterId = (theaterId: string) => {setTheaterId(theaterId)}

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/findTheaters" />} />
      <Route path="/admin" element={<Admin theaterId={"00000001639189e929544c75"}/>} />
      <Route path="/paymentCreate" element={<PaymentCreate />} />
      {/* <Route path="/signin" element={<Signin updateTheaterId={updateTheaterId}/>} />
      <Route path='/signup' element={<Signup />} /> */}
      <Route path="/findTheaters" element={<GetTheaterByZip />} />
      <Route path="/theaterDetail" element={<TheaterDetail />}/>
    </Routes>
  );
};

export default App;
