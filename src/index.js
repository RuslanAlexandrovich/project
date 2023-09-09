import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import Header from "./pageElements/Header";
import Footer from "./pageElements/Footer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <header>
        <Header />
      </header>
      <main>
        <App />
      </main>
      <footer>
        <Footer />
      </footer>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
