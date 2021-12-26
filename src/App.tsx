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
import Citizen from "./views/Citizen/Citizen";
import SignIn from "./views/SignIn";

import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import A1AddAdmin from "views/A1/A1AddAdmin";
import A1AddUser from "views/A1/A1AddUser";
import A2AddAdmin from "views/A2/A2AddAdmin";
import A2AddUser from "views/A2/A2AddUser";
import A3AddAdmin from "views/A3/A3AddAdmin";
import A3AddUser from "views/A3/A3AddUser";
import B1AddAdmin from "views/B1/B1AddAdmin";
import B1AddUser from "views/B1/B1AddUser";
import A1Statistic from "views/A1/A1Statistic";
import B1Statistic from "views/B1/B1Statistic";
import A3Statistic from "views/A3/A3Statistic";
import A2Statistic from "views/A2/A2Statistic";
import B2NhapLieu from "views/B2/B2NhapLieu";
import B2PhatPhieu from "views/B2/B2PhatPhieu";
import Statistic from "views/Statistic/Statistic";

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
          <Route path="/citizen" element={<Citizen />} />
          <Route path="/statistic" element={<Statistic />} />
          {role === 1 && (
            <>
              <Route path="/add-admin" element={<A1AddAdmin />} />
              <Route path="/add-user" element={<A1AddUser />} />
              <Route path="/statistic" element={<A1Statistic />} />
            </>
          )}

          {role === 2 && (
            <>
              <Route path="/add-admin" element={<A2AddAdmin />} />
              <Route path="/add-user" element={<A2AddUser />} />
              <Route path="/statistic" element={<A2Statistic />} />
            </>
          )}
          {role === 3 && (
            <>
              <Route path="/add-admin" element={<A3AddAdmin />} />
              <Route path="/add-user" element={<A3AddUser />} />
              <Route path="/statistic" element={<A3Statistic />} />
            </>
          )}
          {role === 4 && (
            <>
              <Route path="/add-admin" element={<B1AddAdmin />} />
              <Route path="/add-user" element={<B1AddUser />} />
              <Route path="/statistic" element={<B1Statistic />} />
            </>
          )}

          {role === 5 && (
            <>
              <Route path="/add-admin" element={<B2NhapLieu />} />
              <Route path="/add-user" element={<B2PhatPhieu />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
