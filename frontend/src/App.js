import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { Login } from "./routes/Login";
import { Register } from "./routes/Register";
import { Home } from "./routes/Home";
import { Navbar } from "./components/Navbar";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const Auth = useAuthContext();
  const Layout = ()=>{
    return (
      <div>
        <Navbar/>
        <Outlet/>
      </div>
    );
  }
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      children: [
        {
          path: "/",
          element: <Home/>
        },
        {
          path: "auth", // login and signup arec children (key) of auth
          element: !Auth.user ? <div className="w-screen mt-20 flex flex-col gap-8 items-center justify-center bg-#135D66">
            <Outlet/>
          </div> : <Navigate to={"/"}/>,
          children: [{path: "login", element: <Login/>}, {path: "register", element: <Register/>}]
        }
      ]
    }
  ]);
  return (
    <RouterProvider router={router} />
    // <div className="w-screen min-h-screen flex flex-col gap-8 items-center justify-center bg-#135D66">
    //   <Login/>
    //   <Register/>
    // </div>
  );
}

export default App;