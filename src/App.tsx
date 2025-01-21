import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/LoginPage";
import SignUp from "./pages/Auth/RegisterPage";
import HomePage from "./pages/HomePage/HomePage";
import PharmacyDetailPage from "./pages/PharmacyDetails/PharmacyDetails";
import NotFound from "./pages/NotFound";
import SearchResultsPage from "./pages/SearchResults/SearchResults";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import AdminHome from "./pages/AdminDashboard/AdminDashboard";
import { PharmacyContextProvider } from "./contexts/PharmacyContext";
import { pharmacies } from "./data/pharmacies";
import { calculateDistance } from "./utils/calculations";
import ManagePharmacies from "./admin/managePharmacy/ManagePharmacies";
import PharmacyForm from "./pages/AddPharmacyForm/PharmcyPhorm";
import PharmacyConfrimation from "./pages/Confrimation/PharmacyConfrimation";
import PharmacyHelp from "./pages/PharmacyHelp/PharmacyHelp";
import PrivateRoute from "./components/PrivateRoute";
import ManageMedications from "./admin/manageDrug/ManageMedications";
function App() {
  return (
    <Router>
      <Routes>
        {/* Main Layout Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/pharmacy/:pharmacyId"
            element={
              <PharmacyDetailPage
                pharmacies={pharmacies}
                calculateDistance={calculateDistance}
              />
            }
          />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/signup" element={<SignUp />} />
          <Route path="/search-results" element={<SearchResultsPage />} />
          <Route
            path="/pharmacy-registration/form"
            element={
              <PrivateRoute>
                <PharmacyForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/pharmacy-registration/help"
            element={<PharmacyHelp />}
          />
          <Route
            path="/pharmacy-registration/success"
            element={<PharmacyConfrimation />}
          />

          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin Layout Routes */}
        <Route
          element={
            <PharmacyContextProvider>
              <AdminLayout />
            </PharmacyContextProvider>
          }
        >
          <Route path="/admin" element={<AdminHome />} />
          <Route
            path="/admin/manage-pharmacies"
            element={<ManagePharmacies />}
          />
          <Route
            path="/admin/manage-drugs"
            element={<ManageMedications />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
