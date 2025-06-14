import React, { useState, useEffect } from "react";
import { fetchPharmacyData } from "../../api/pharmacyService";
import SnackbarComponent from "../modals/SnackbarComponent";
import "./tables.scss";
import { PharmacyDataType } from "../../utils/interfaces";

interface PharmacyTableProps {
  status: string;
}

const PharmacyTable: React.FC<PharmacyTableProps> = ({ status = "all" }) => {
  const [pharmacies, setPharmacies] = useState<PharmacyDataType[]>([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success" as "success" | "error",
  });

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const showSnackbar = (message: string, type: "success" | "error") => {
    setSnackbar({ open: true, message, type });
  };

  const closeSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  useEffect(() => {
    const fetchPharmacy = async () => {
      try {
        const data = await fetchPharmacyData();
        setPharmacies(data);
      } catch {
        showSnackbar("Failed to fetch pharmacies.", "error");
      }
    };
    fetchPharmacy();
  }, []);

  // Filtered pharmacies based on status
  const filteredPharmacies = pharmacies.filter((pharmacy) =>
    status === "all"
      ? true
      : pharmacy.status.toLowerCase() === status.toLowerCase()
  );

  // Pagination logic
  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentPharmacies = filteredPharmacies.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredPharmacies.length / rowsPerPage);

  return (
    <>
      <div className="pharmacy-table">
        <h2>
          {status === "all"
            ? "All Pharmacies"
            : `${status.charAt(0).toUpperCase() + status.slice(1)} Pharmacies`}
        </h2>

        {filteredPharmacies.length === 0 ? (
          <p className="no-data">No {status} pharmacies found.</p>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Phone Number</th>
                  <th>Email</th>
                  <th>Operating Hours</th>
                  <th>Delivery Available</th>
                  <th>Website</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {currentPharmacies.map((pharmacy) => (
                  <tr key={pharmacy.id}>
                    <td>{pharmacy.name}</td>
                    <td>{pharmacy.address}</td>
                    <td>{pharmacy.phone}</td>
                    <td>{pharmacy.email}</td>
                    <td>{pharmacy.operating_hours}</td>
                    <td>{pharmacy.delivery_available ? "Yes" : "No"}</td>
                    <td>{pharmacy.website}</td>
                    <td className={`status ${pharmacy.status}`}>
                      {pharmacy.status.toUpperCase()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="pagination">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </button>

              {/* Rows Per Page Selection */}
              <select
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(Number(e.target.value))}
              >
                <option value={5}>5 rows</option>
                <option value={10}>10 rows</option>
                <option value={15}>15 rows</option>
              </select>
            </div>
          </>
        )}
      </div>

      <SnackbarComponent
        open={snackbar.open}
        message={snackbar.message}
        type={snackbar.type}
        onClose={closeSnackbar}
      />
    </>
  );
};

export default PharmacyTable;
