import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import Layout from "../layout/Layout";
// Page
import { Home, Movie, Login, Actor } from "../pages";
// Path
import { HOME, MOVIE, LOGIN, ACTORS, FORGOT_PASSWORD, REGISTER, LISTS, FILMS } from "./route-path";
import ForgotPassword from "../pages/Auth/ForgotPasswordForm/ForgotPasswordForm";
import Register from "../pages/Auth/Register/Register";
import Lists from "../pages/Lists";
import Films from "../pages/Films";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={HOME} element={<Layout />}>
        <Route index element={<Home />} />
        <Route path={MOVIE} element={<Movie />} />
        <Route path={ACTORS} element={<Actor />} />
        <Route path={LISTS} element={<Lists />} />
        <Route path={FILMS} element={<Films />} />
      </Route>
      <Route path={LOGIN} element={<Login />} />
      <Route path={FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path={REGISTER} element={<Register />} />
    </>
  )
);

// import Layout from "../layout/Layout";
// // import PrivateRouter from "./PrivateRouter";
// // Page
// import { Login, Register, Home, Films, Community,ForgotPassword, Movie, ActorPage } from "../pages";
// // Path
// import { HOME, LOGIN, FILMS, COMMUNITY, MOVIE, REGISTER, FORGOTPASSWORD, ACTORS } from "./route-path";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <>
//     <Route path={HOME} element={<Layout />}>
//       <Route
//         index
//         element={
//           // <PrivateRouter>
//           <Home />
//           // </PrivateRouter>
//         }
//       />
//       <Route path={FILMS} element={<Films />} />
//       <Route path={COMMUNITY} element={<Community />} />
//       <Route path={MOVIE} element={<Movie />} />
//       <Route path={ACTORS} element={<ActorPage />} />
//     </Route>
//       <Route path={LOGIN} element={<Login />} />
//       <Route path={REGISTER} element={<Register />} />
//       <Route path={FORGOTPASSWORD} element={<ForgotPassword />} />
//      </>
//   )
// );

export default router;
