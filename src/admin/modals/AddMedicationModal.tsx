/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState ,useEffect} from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  IconButton,
  Switch,
  FormControlLabel,
  Autocomplete,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { medicationSchema } from "../../utils/validateForm";
import { medicationType } from "../../utils/interfaces";
import { CategoryType } from "../../utils/interfaces";
import { fetchCategoriesData } from "../../api/pharmacyService";
interface AddMedicationModalProps {
  open: boolean;
  handleClose: () => void;
  handleSubmit: (validatedData: any) => void;
  medication: medicationType | null;
  isEdit: boolean;
}
type FormData = {
  name: string;
  price: number;
  description: string;
  category: string | number;
  dosage_form: string;
  dosage_strength: string;
  manufacturer: string;
  expiry_date: string;
  prescription_required: boolean;
  side_effects: string;
  usage_instructions: string;
  quantity_available: number;
  image: File | null;
}
const AddMedicationModal: React.FC<AddMedicationModalProps> = ({
  open,
  handleClose,
  handleSubmit,
  medication,
  isEdit,
}) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    price: 1,
    description: "",
    category: "",
    dosage_form: "",
    dosage_strength: "",
    manufacturer: "",
    expiry_date: "",
    prescription_required: false,
    side_effects: "",
    usage_instructions: "",
    quantity_available: 1,
    image: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [categories, setCategories] = useState<CategoryType[]>([])
  useEffect(() => {
  const fetchCategories = async () => {
      try {
        const data = await fetchCategoriesData();
        setCategories(data);
      } catch (error) {
        alert("Failed to fetch categories.", "error");
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (isEdit && medication) {
      console.log("editing medication", medication);
      setFormData({
        name: medication.name,
        price: Number(medication.price),
        description: medication.description,
        category: medication.category,
        dosage_form: medication.dosage_form,
        dosage_strength: medication.dosage_strength,
        manufacturer: medication.manufacturer,
        expiry_date: medication.expiry_date,
        prescription_required: medication.prescription_required,
        side_effects: medication.side_effects,
        usage_instructions: medication.usage_instructions,
        quantity_available: Number(medication.quantity_available),
        image: null,
      });
    }
    else {
      setFormData({
        name: "",
        price: 1,
        description: "",
        category: "",
        dosage_form: "",
        dosage_strength: "",
        manufacturer: "",
        expiry_date: "",
        prescription_required: false,
        side_effects: "",
        usage_instructions: "",
        quantity_available: 1,
        image: null,
      });
    }
  }, [isEdit, medication]); // Run only when `isEdit` or `medication` changes
  

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setFormData({ ...formData, [name]: checked });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFormData({ ...formData, image: event.target.files[0] });
    }
  };

  const validateAndSubmit = () => {
    const parsed = medicationSchema.safeParse({
      ...formData,
      price: Number(formData.price),
      quantity_available: Number(formData.quantity_available),
    });

    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
    } else {
      setErrors({});
      handleSubmit(parsed.data);
      setFormData({
        name: "",
        price: 1,
        description: "",
        category: "",
        dosage_form: "",
        dosage_strength: "",
        manufacturer: "",
        expiry_date: "",
        prescription_required: false,
        side_effects: "",
        usage_instructions: "",
        quantity_available: 1,
        image: null,
      })
    }
  };

  const style = {
    position: "absolute" as const,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    borderRadius: 3,
    boxShadow: 24,
    p: 4,
    overflowY: "auto",
    maxHeight: "90vh",
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2" marginBottom={2}>
          {isEdit?"Edit Medication" :"Add Medication"} 
        </Typography>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: (theme) => theme.palette.error.main,
          }}
        >
          <CloseIcon />
        </IconButton>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
  <Autocomplete
    options={categories}
    getOptionLabel={(option) => option.name || ""}
    isOptionEqualToValue={(option, value) => option.id === value.id}
    value={categories.find((cat) => cat.id === formData.category) || null}
    onChange={(event, newValue) => {
      setFormData({
        ...formData,
        category: newValue ? newValue.id : "", 
      });
    }}
    renderInput={(params) => (
      <TextField
        {...params}
        label="Category"
        error={!!errors.category}
        helperText={errors.category}
      />
    )}
  />
</Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!errors.price}
              helperText={errors.price}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Quantity Available"
              name="quantity_available"
              type="number"
              value={formData.quantity_available}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!errors.quantity_available}
              helperText={errors.quantity_available}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Dosage Form"
              name="dosage_form"
              select
              value={formData.dosage_form}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!errors.dosage_form}
              helperText={errors.dosage_form}
            >
              <MenuItem value="tablet">Tablet</MenuItem>
              <MenuItem value="capsule">Capsule</MenuItem>
              <MenuItem value="syrup">Syrup</MenuItem>
              <MenuItem value="injection">Injection</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Dosage Strength"
              name="dosage_strength"
              value={formData.dosage_strength}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!errors.dosage_strength}
              helperText={errors.dosage_strength}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Manufacturer"
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!errors.manufacturer}
              helperText={errors.manufacturer}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Expiry Date"
              name="expiry_date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.expiry_date}
              onChange={handleInputChange}
              fullWidth
              required
              error={!!errors.expiry_date}
              helperText={errors.expiry_date}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={formData.prescription_required}
                  onChange={handleSwitchChange}
                  name="prescription_required"
                />
              }
              label="Prescription Required"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            Upload Image
            <input type="file" name="image" onChange={handleImageChange} />
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              multiline
              rows={3}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Side Effects"
              name="side_effects"
              value={formData.side_effects}
              onChange={handleInputChange}
              multiline
              rows={3}
              fullWidth
              error={!!errors.side_effects}
              helperText={errors.side_effects}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Usage Instructions"
              name="usage_instructions"
              value={formData.usage_instructions}
              onChange={handleInputChange}
              multiline
              rows={3}
              fullWidth
              error={!!errors.usage_instructions}
              helperText={errors.usage_instructions}
            />
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button onClick={handleClose} sx={{ mr: 2, color:"red" }}
>
            Cancel
          </Button>
          <Button
            onClick={validateAndSubmit}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddMedicationModal;
