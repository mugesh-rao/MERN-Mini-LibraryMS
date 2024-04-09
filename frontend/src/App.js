import React from "react";
import { ToastContainer } from "react-toastify";
import Login from "../src/components/Login/Login";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import RequireUser from "../src/components/Auth/RequireUser";
import SideWallpaper from "../src/components/SideWallpaper/SideWallpaper";
import Topnav from "../src/components/Topnav/Topnav";
import { ChakraProvider } from "@chakra-ui/react";
import Profile from "../src/components/Profile/Profile";
import Dashboard from "../src/components/Dashboard/Dashboard";
import Books from "./components/Books/Books";
import LibraryBooks from "./components/LibraryBooks/LibraryBooks";
import Students from "./components/Student/Students";
import RoleBased from "./components/Auth/RoleBased";
import IssuedBooks from "./components/Books/IssuedBooks/IssuedBooks";

const App = () => {
  return (
    <ChakraProvider>
      <BrowserRouter>
      <Topnav/>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-books" element={<Books />} />
          <Route
            path="/books"
            element={
            
                <LibraryBooks />
           
            }
          />
          <Route
            path="/students"
            element={
              <RequireUser>
                <RoleBased role="admin">
                  <Students />
                </RoleBased>
              </RequireUser>
            }
          />
          <Route
            path="/issuedBooks"
            element={
              <RequireUser>
                <RoleBased role="admin">
                  <IssuedBooks />
                </RoleBased>
              </RequireUser>
            }
          />
          <Route
            index
            element={
              <RequireUser>
                <Profile />
              </RequireUser>
            }
          />
          <Route path="/app" element={<Topnav />} />
        </Routes>
      </BrowserRouter>
      <div id="modal-root"></div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </ChakraProvider>
  );
};

export default App;
