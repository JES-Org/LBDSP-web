import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Auth/LoginPage";
import SignUp from "./pages/Auth/RegisterPage";
import HomePage from "./pages/HomePage/HomePage";
import PharmacyDetailPage from "./pages/PharmacyDetails/PharmacyDetails";
import NotFound from "./pages/NotFound";
import SearchResultsPage from "./pages/SearchResults/SearchResults";
import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import AdminHome from "./admin/AdminDashboard/AdminDashboard";
import { PharmacyContextProvider } from "./contexts/PharmacyContext";
import { calculateDistance } from "./utils/calculations";
import ManagePharmacies from "./admin/managePharmacy/ManagePharmacies";
import PharmacyForm from "./pages/AddPharmacyForm/PharmcyPhorm";
import PharmacyConfrimation from "./pages/Confrimation/PharmacyConfrimation";
import PharmacyHelp from "./pages/PharmacyHelp/PharmacyHelp";
import PrivateRoute from "./components/PrivateRoute";
import ManageMedications from "./admin/manageDrug/ManageMedications";
import ManageCategories from "./admin/ManageCategories/ManageCategories";
import ManagePharmacists from "./admin/ManagePharmacists/ManagePharmacists";
import AdminLogin from "./admin/AdminAuth/AdminLogin";
import UserList from "./admin/userList/UserList";
import { ErrorProvider } from "./contexts/ErrorContext";
import "./App.scss";
import MedicationDetail from "./pages/MedicationDetail/MedicationDetail";
import NearbyPharmacies from "./pages/NearBy/NearbyPharmacies";
import ChangePassword from "./pages/Auth/ChangePassword";
import ProtectedRoute from "./admin/ProtectedRoute/ProtectedRoute";
import Reports from "./admin/reports/Report";
function App() {
  return (
    <Router>
      <Routes>
        {/* Main Layout Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          element={
            <ErrorProvider>
                <MainLayout />
            </ErrorProvider>
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route
            path="/pharmacy/:pharmacyName"
            element={
              <PharmacyDetailPage calculateDistance={calculateDistance} />
            }
          />
          <Route
            path="/pharmacy/:pharmacyName/:medicationName"
            element={<MedicationDetail />}
          />
          <Route path="/user/change-password" element={<ChangePassword />} />

          <Route path="/user/login" element={<Login />} />
          <Route path="/user/signup" element={<SignUp />} />
          <Route path="/nearby-pharmacies" element={<NearbyPharmacies />} />
          <Route path="/search-results" element={<SearchResultsPage />} />
          <Route
            path="/pharmacy-registration/form"
            element={
              <PrivateRoute requiredRole="user">
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
        </Route>
        <Route path="*" element={<NotFound />} />

        {/* Admin Layout Routes */}
        <Route
          element={
            <PharmacyContextProvider>
              <PrivateRoute requiredRole="admin">
                <AdminLayout />
              </PrivateRoute>
            </PharmacyContextProvider>
          }
        >
          <Route path="/admin/pharmacies" element={<AdminHome />} />
          <Route path="admin/dashboard" element={<AdminHome />} />
          <Route path="admin/pharmacy/medications" element={<AdminHome />} />

          <Route path="/admin/manage-drugs" element={<ManageMedications />} />
          <Route
            path="/admin/reports"
            element={<Reports />}
          />
          <Route
            path="/admin/manage-categories"
            element={<ManageCategories />}
          />
          <Route
            element={<ProtectedRoute allowedRoles={["admin", "superuser"]} />}
          >
            {" "}
            <Route
              path="/admin/manage-pharmacies"
              element={<ManagePharmacies />}
            />
            <Route
              path="/admin/manage-pharmacists"
              element={<ManagePharmacists />}
            />
            <Route path="/admin/users" element={<UserList />} />
          </Route>

          <Route path="/admin/change-password" element={<ChangePassword />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
