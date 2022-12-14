import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./dashboard";
import Signin from "./signin";
import Table from "./table";
import Form from "./form";
import Chart from "./chart";
import Componnents from "./componnents";
import NotFound from "./notfound";
import Aspirasi from "./dashboard/aspirasi";
import { Provider } from "react-redux";
import store from "./store";
import Question from "./table/Question";

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Provider store={store}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/aspirasi" element={<Aspirasi />} />
          <Route path="/forms" element={<Form />} />
          <Route path="/insight" element={<Table />} />
          <Route path="/question" element={<Question />}/>
          <Route path="/charts" element={<Chart />} />
          <Route path="/componnents" element={<Componnents />} />
        </Route>
        <Route path="/signin" element={<Signin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Provider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);
