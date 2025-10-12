import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {UserProvider} from "./Helper/Helper-to-UseraccuntId";

createRoot(document.getElementById("root")).render(
  <StrictMode>
     <UserProvider>
    <App />

     </UserProvider>
  </StrictMode>
);
