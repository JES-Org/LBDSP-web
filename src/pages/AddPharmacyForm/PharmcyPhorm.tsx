/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { pharmacyFormSchema } from "../../utils/validateForm";
import "./PharmacyForm.scss";
import { registerPharmacy } from "../../api/pharmacyService";
import { useNavigate } from "react-router-dom";
import { containerVariants, itemVariants } from "../../utils/animateVariant";
import { motion } from "framer-motion";

interface PharmacyFormValues {
  name: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  operating_hours: string;
  image?: FileList;
  delivery_available: string;
  license_number: string;
  license_image?: FileList;
}

const PharmacyForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<PharmacyFormValues>({
    resolver: zodResolver(pharmacyFormSchema),
  });
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: PharmacyFormValues) => {
    clearErrors();
    setErrorMessage(null);

    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === "image" || key === "license_image") {
        if (value instanceof FileList && value.length > 0) {
          formData.append(key, value[0]); // FileList handling
        } else if (value instanceof File) {
          formData.append(key, value); // Single File handling
        }
      } else if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });
    try {
      await registerPharmacy(formData);
      
    
      
        navigate("/pharmacy-registration/success");
      
    } catch (error: any) {
      setErrorMessage(error);
    }
  };

  return (
    <div className="container-wrapper">
      <motion.div
        className="pharmacy-form-container"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={containerVariants}
      >
        <motion.h2 variants={itemVariants}>Register Pharmacy</motion.h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          variants={itemVariants}
          className="pharmacy-form"
        >
          <div className="form-group">
            <div>
              <label htmlFor="name">Name:</label>
              <input
                id="name"
                type="text"
                placeholder="name of pharmcacy"
                {...register("name")}
              />
            </div>
            {errors.name && <p className="error">{errors.name.message}</p>}
          </div>
          <div className="form-group">
            <div>
              <label htmlFor="address">Address:</label>
              <input
                id="address"
                placeholder="address of pharmacy"
                type="text"
                {...register("address")}
              />
            </div>
            {errors.address && (
              <p className="error">{errors.address.message}</p>
            )}
          </div>
          <div className="form-group">
            <div>
              <label htmlFor="phone">Phone:</label>
              <input
                id="phone"
                placeholder="contact number"
                type="text"
                {...register("phone")}
              />
            </div>
            {errors.phone && <p className="error">{errors.phone.message}</p>}
          </div>
          <div className="form-group">
            <div>
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                placeholder="contact email"
                {...register("email")}
              />
            </div>
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>
          <div className="form-group">
            <div>
              <label htmlFor="website">Website (Optional):</label>
              <input
                id="website"
                placeholder="enter url if any"
                type="url"
                {...register("website")}
              />
            </div>
            {errors.website && (
              <p className="error">{errors.website.message}</p>
            )}
          </div>
          <div className="form-group">
            <div>
              <label htmlFor="operating_hours">Operating Hours:</label>
              <input
                id="operating_hours"
                type="text"
                placeholder="e.g., Mon-Fri: 9 AM - 8 PM, Sat-Sun: 10 AM - 6 PM,24/7"
                {...register("operating_hours")}
              />
            </div>
            {errors.operating_hours && (
              <p className="error">{errors.operating_hours.message}</p>
            )}
          </div>
          <div className="form-group">
            <div>
              <label htmlFor="image">Image (Optional):</label>
              <input id="image" type="file" {...register("image")} />
            </div>
          </div>
          <div className="form-group">
            <div className="yes-no-group">
              <label>Delivery Available:</label>

              <input
                type="checkbox"
                id="delivery_available"
                {...register("delivery_available")}
              />
            </div>
            {errors.delivery_available && (
              <p className="error">{errors.delivery_available.message}</p>
            )}
          </div>

          <div className="form-group">
            <div>
              <label htmlFor="license_number">License Number:</label>
              <input
                id="license_number"
                type="text"
                placeholder="Enter license number"
                {...register("license_number")}
              />
            </div>
            {errors.license_number && (
              <p className="error">{errors.license_number.message}</p>
            )}
          </div>
          <div className="form-group">
            <div>
              <label htmlFor="license_image">License Image:</label>
              <input
                id="license_image"
                type="file"
                accept="image/*"
                {...register("license_image")}
              />
            </div>
            {errors.license_image && (
              <p className="error">{errors.license_image.message}</p>
            )}
          </div>

          <button type="submit">Submit</button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default PharmacyForm;
