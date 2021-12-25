/*!
=========================================================
* Muse Ant Design Dashboard - v1.0.0
=========================================================
* Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
* Coded by Creative Tim
=========================================================
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "views/SignIn";
import A1AddAdmin from "views/A1/A1AddAdmin";
import A1AddUser from "views/A1/A1AddUser";
import A2AddAdmin from "views/A2/A2AddAdmin";
import A2AddUser from "views/A2/A2AddUser";
import A3AddAdmin from "views/A3/A3AddAdmin";
import A3AddUser from "views/A3/A3AddUser";
import B1AddAdmin from "views/B1/B1AddAdmin";
import B1AddUser from "views/B1/B1AddUser";
import B2AddAdmin from "views/B2/B2AddAdmin";
import B2AddUser from "views/B2/B2AddUser";

let role_temp = localStorage.getItem("role");
let role: number;
if (role_temp === "1") role = 1;
if (role_temp === "2") role = 2;
if (role_temp === "3") role = 3;
if (role_temp === "4") role = 4;
if (role_temp === "5") role = 5;

function App() {
  return (
    <div className="App">
      <meta name="csrf-token" content="{{ csrf_token() }}" />
      <Router>
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          {role === 1 && (
            <>
              <Route path="/add-admin" element={<A1AddAdmin />} />
              <Route path="/add-user" element={<A1AddUser />} />
            </>
          )}
          {role === 2 && (
            <>
              <Route path="/add-admin" element={<A2AddAdmin />} />
              <Route path="/add-user" element={<A2AddUser />} />
            </>
          )}
          {role === 3 && (
            <>
              <Route path="/add-admin" element={<A3AddAdmin />} />
              <Route path="/add-user" element={<A3AddUser />} />
            </>
          )}
          {role === 4 && (
            <>
              <Route path="/add-admin" element={<B1AddAdmin />} />
              <Route path="/add-user" element={<B1AddUser />} />
            </>
          )}

          {role === 5 && (
            <>
              <Route path="/add-admin" element={<B2AddAdmin />} />
              <Route path="/add-user" element={<B2AddUser />} />
            </>
          )}

          {/* <Route path="/statistic" element={<Statistic />} />
          <Route path="/citizen-info" element={<CitizenInfo />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
