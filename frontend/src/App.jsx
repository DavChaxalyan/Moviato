import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}


// import React from 'react'
// import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import Home from './pages/Home'

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path='/' element={<Home/>}/>
//       </Routes>
//     </BrowserRouter> 
//   )
// }
