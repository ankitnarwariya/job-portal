import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LogInPage from "./pages/LogInPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/test" element={<h1>Homepage</h1>} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={`ERROR: 404`} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
