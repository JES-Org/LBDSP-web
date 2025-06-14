import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.scss";
import {
  Dashboard as DashboardIcon,
  Group as GroupIcon,
  Edit as EditIcon,
  Assessment as AssessmentIcon,

  SettingsRounded as SettingsRoundedIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Logout } from "../../api/auth";
// import { AuthContext } from '../../contexts/AuthContext';
interface SidebarProps {
  onLinkClick: () => void;
  isShrunk: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ onLinkClick, isShrunk }) => {
  const { pathname } = useLocation();
 
  const { user } = useAuth();
  const navigate = useNavigate();
    const handleLogout = async () => {
      await Logout();
      navigate("/admin/login");
    };
  return (
    <div className={`sidebar ${isShrunk ? "shrunk" : ""}`}>
      <div className="links">
        <ul>
          <p className="spann">Main</p>

          <Link
            to="admin/dashboard"
            style={{ textDecoration: "none" }}
            onClick={onLinkClick}
          >
            <li
              className={
                pathname === "/admin/dashboard" ||
                pathname === "/admin/pharmacies" ||
                pathname === "/admin/pharmacy/medications"
                  ? "active-link"
                  : ""
              }
            >
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          {user?.role === "admin" && (
            <>
              <p className="spann">Pharmacies</p>
              <Link
                to="/admin/manage-pharmacies"
                style={{ textDecoration: "none" }}
                onClick={onLinkClick}
              >
                <li
                  className={
                    pathname === "/admin/manage-pharmacies" ? "active-link" : ""
                  }
                >
                  <GroupIcon className="icon" />
                  <span>Manage Pharmacies</span>
                </li>
              </Link>
              <Link
                to="/admin/manage-pharmacists"
                style={{ textDecoration: "none" }}
                onClick={onLinkClick}
              >
                <li
                  className={
                    pathname === "/admin/manage-pharmacists"
                      ? "active-link"
                      : ""
                  }
                >
                  <GroupIcon className="icon" />
                  <span>Pharmicists</span>
                </li>
              </Link>
            </>
          )}
          <p className="spann">Drugs</p>
          <Link
            to="/admin/manage-categories"
            style={{ textDecoration: "none" }}
            onClick={onLinkClick}
          >
            <li
              className={
                pathname === "/admin/manage-categories" ? "active-link" : ""
              }
            >
              <EditIcon className="icon" />
              <span>Drug Category</span>
            </li>
          </Link>
          <Link
            to="/admin/manage-drugs"
            style={{ textDecoration: "none" }}
            onClick={onLinkClick}
          >
            <li
              className={
                pathname === "/admin/manage-drugs" ? "active-link" : ""
              }
            >
              <EditIcon className="icon" />
              <span>Manage Drugs</span>
            </li>
          </Link>
          {user?.role === "admin" && (
            <>
              <p className="spann">Users</p>
              <Link
                to="/admin/users"
                style={{ textDecoration: "none" }}
                onClick={onLinkClick}
              >
                <li
                  className={pathname === "/admin/users" ? "active-link" : ""}
                >
                  <GroupIcon className="icon" />
                  <span>View Users</span>
                </li>
              </Link>
            </>
          )}

          <p className="spann">Reports</p>
          {user?.role === "pharmacist" ? (
            <>
              <Link
                to="/admin/pharmacist/reports"
                style={{ textDecoration: "none" }}
                onClick={onLinkClick}
              >
                <li
                  className={
                    pathname === "/admin/pharmacist/reports"
                      ? "active-link"
                      : ""
                  }
                >
                  <AssessmentIcon className="icon" />
                  <span>Reports</span>
                </li>
              </Link>{" "}
            </>
          ) : (
            <>
              <Link
                to="/admin/reports"
                style={{ textDecoration: "none" }}
                onClick={onLinkClick}
              >
                <li
                  className={pathname === "/admin/reports" ? "active-link" : ""}
                >
                  <AssessmentIcon className="icon" />
                  <span>Reports</span>
                </li>
              </Link>
            </>
          )}

          <p className="spann">Settings</p>
          {user?.role === "pharmacist" && (
            <Link
              to="/admin/pharmacist/settings"
              style={{ textDecoration: "none" }}
              onClick={onLinkClick}
            >
              <li
                className={
                  pathname === "/admin/pharmacist/settings" ? "active-link" : ""
                }
              >
                <SettingsRoundedIcon className="icon" />
                <span>Settings</span>
              </li>
            </Link>
          )}


          <li onClick={handleLogout}>
            <LogoutIcon className="icon" />
            <span>Log Out</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
