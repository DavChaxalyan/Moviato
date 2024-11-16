// import { Navigate, useLocation } from "react-router-dom";
// import TokenService from "../services/token.service";
// import { LOGIN } from "./route-path";

// const PrivateRouter = ({ children }) => {
//   const location = useLocation();
//   const user = TokenService.getUser() || false;
//   if (!user) {
//     return <Navigate to={LOGIN} state={{ from: location }} replace />;
//   }
//   return children;
// };
// //
// export default PrivateRouter;
