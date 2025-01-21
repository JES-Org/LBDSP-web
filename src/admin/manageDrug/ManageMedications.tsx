import React, { useState } from "react";
import "./ManageMedications.scss";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Avatar,
  Button,
  TextField,
  Box,
  TablePagination,
  InputAdornment,
} from "@mui/material";
import { medications as medicationData } from "../../data/medications";
import DeleteIcon from "@mui/icons-material/Delete";
import { Edit } from "@mui/icons-material";
import AddMedicationModal from "../modals/AddMedicationModal";
import DeleteMedicationModal from "../modals/DeleteMedicationModal";
import SearchIcon from "@mui/icons-material/Search";

const ManageMedications: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [medications, setMedications] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [isDelModalOpen, setIsDelModalOpen] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number>(0);
  const [medicationName, setMedicationName] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock_status: true,
    description: "",
    category: "",
    dosage_form: "",
    dosage_strength: "",
    manufacturer: "",
    expiry_date: "",
    prescription_required: false,
    side_effects: "",
    usage_instructions: "",
    quantity_available: 0,
  });

  // Handle form open/close
  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => {
    setOpenForm(false);
    setFormData({
      name: "",
      price: "",
      stock_status: true,
      description: "",
      category: "",
      dosage_form: "",
      dosage_strength: "",
      manufacturer: "",
      expiry_date: "",
      prescription_required: false,
      side_effects: "",
      usage_instructions: "",
      quantity_available: 0,
    });
  };

  // Handle form input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    if (formData.name && formData.price && formData.expiry_date) {
      setMedications([
        ...medications,
        { ...formData, medication_id: Date.now() },
      ]);
      handleCloseForm();
    } else {
      alert("Please fill in all required fields.");
    }
  };

  // Filter medications based on search query
  const filteredMedications = medications.filter(
    (medication) =>
      medication.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (medication.category || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  // Paginate the filtered medications
  const paginatedMedications = filteredMedications.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Handle page change
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteClick = (id: number, name: string) => {
    setDeleteId(id);
    setMedicationName(name);
    setIsDelModalOpen(true);
  };

  const handleDelModalClose = () => {
    setIsDelModalOpen(false);
  };

  const handleDelete = () => {
    setMedications(medications.filter((med) => med.medication_id !== deleteId));
    setIsDelModalOpen(false);
  };

  return (
    <>
      <div className="manage-medications">
        <Box className="top-section">
          <Typography className="title" variant="h4" gutterBottom>
            Manage Medications
          </Typography>
          <Button
            className="add-button"
            variant="contained"
            color="primary"
            size="large"
            onClick={handleOpenForm}
          >
            Add Medication
          </Button>
        </Box>
        <TextField
          className="search-bar"
          label="Search Medications"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <TableContainer className="table-container" component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Medication Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Stock Status</TableCell>
                <TableCell>Dosage Form</TableCell>
                <TableCell>Dosage Strength</TableCell>
                <TableCell>Manufacturer</TableCell>
                <TableCell>Expiry Date</TableCell>
                <TableCell>Prescription Required</TableCell>
                <TableCell>Side Effects</TableCell>
                <TableCell>Usage Instructions</TableCell>
                <TableCell>Available Quantity</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedMedications.map((medication) => (
                <TableRow key={medication.id}>
                  <TableCell>
                    <Avatar
                      src={medication.image}
                      alt={medication.name}
                      sx={{ width: 56, height: 56 }}
                    />
                  </TableCell>
                  <TableCell>{medication.name}</TableCell>
                  <TableCell>{medication.category}</TableCell>
                  <TableCell>{medication.price} Birr</TableCell>
                  <TableCell>
                    {medication.stock_status ? "In Stock" : "Out of Stock"}
                  </TableCell>
                  <TableCell>{medication.dosage_form}</TableCell>
                  <TableCell>{medication.dosage_strength}</TableCell>
                  <TableCell>{medication.manufacturer}</TableCell>
                  <TableCell>{medication.expiry_date}</TableCell>
                  <TableCell>
                    {medication.prescription_required ? "Yes" : "NO"}
                  </TableCell>
                  <TableCell>{medication.side_effects}</TableCell>
                  <TableCell>{medication.usage_instructions}</TableCell>
                  <TableCell>{medication.quantity_available}</TableCell>
                  <TableCell className="action-buttons">
                    <Button
                      className="edit"
                      style={{ marginRight: "5px" }}
                      title={`Edit ${medication.name}`}
                    >
                      <Edit />
                    </Button>
                    <Button
                      className="delete"
                      onClick={() =>
                        handleDeleteClick(
                          medication.medication_id,
                          medication.name
                        )
                      }
                      title={`Delete ${medication.name}`}
                    >
                      <DeleteIcon style={{ color: "red" }} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={filteredMedications.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

        {/* Form Modal */}
      </div>
      <AddMedicationModal
        open={openForm}
        handleClose={handleCloseForm}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        formData={formData}
      />
      <DeleteMedicationModal
        isOpen={isDelModalOpen}
        onClose={handleDelModalClose}
        handleDelete={handleDelete}
        medicationName={medicationName}
      />
    </>
  );
};

export default ManageMedications;
