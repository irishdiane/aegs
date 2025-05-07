// route.js
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import MembersFetcher from "./App"; // 
import AboutUs from "./pages/AboutUs";
import Rubrics from "./pages/Rubrics";
import UserGuide from "./pages/UserGuide";
import GradingResults from "./pages/GradingResults";
import GradingForm from "./pages/GradingForm";

export default function AppRouter() {
  return (
    <BrowserRouter basename="/aegs">
      <Routes>
        <Route path="/home" element={<LandingPage />} />
        <Route path="/members" element={<MembersFetcher />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/user-guide" element={<UserGuide />} />
        <Route path="/rubrics" element={<Rubrics />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/grading-results" element={<GradingResults />} />
        <Route path="/grading-form" element={<GradingForm />} />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

