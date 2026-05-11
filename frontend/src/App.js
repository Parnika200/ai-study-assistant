import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import QuizPage from "./pages/QuizPage";
import FlashcardsPage from "./pages/FlashcardsPage";
import StudyPlanner from "./pages/StudyPlanner";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />

<Route path="/login" element={<Login />} />

<Route path="/signup" element={<Signup />} />

<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/quiz/:id"
  element={
    <ProtectedRoute>
      <QuizPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/flashcards/:id"
  element={
    <ProtectedRoute>
      <FlashcardsPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/study-plan/:id"
  element={
    <ProtectedRoute>
      <StudyPlanner />
    </ProtectedRoute>
  }
/>      </Routes>
    </BrowserRouter>
  );
}


export default App;