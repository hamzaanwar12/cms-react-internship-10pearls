import React from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useToast } from "@/hooks/use-toast"; // Assuming a toast hook exists
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // Import default styles for the phone input
import { RootState } from "@/store/store";
import "react-phone-input-2/lib/style.css";
import "./AddContact.css";

export default function AddContact() {
  const user = useSelector((state: RootState) => state.userState.user);
  const userId = user?.id;
  const { toast } = useToast();
  const navigate = useNavigate();

  // Form validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required."),
    phone: Yup.string()
      .required("Phone number is required.")
      .test(
        "is-valid-phone",
        "Phone number must be at least 10 digits.",
        (value) => value?.replace(/\D/g, "").length >= 10
      ),
    email: Yup.string().email("Invalid email format."),
    address: Yup.string(),
  });

  // Formik initialization
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
      address: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);

        // Make API request to create contact
        await axios.post(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/contacts/create?userId=${userId}`,
          {
            ...values,
          }
        );

        toast({
          description: "Contact created successfully!",
        });

        // Redirect to contacts page
        navigate("/contacts");
      } catch (error) {
        console.error("Error creating contact:", error);
        toast({
          description:
            error.response.data.message ||
            "Failed to create contact. Please try again.",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Contact</h1>

      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`w-full border-black border-[2px] px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formik.touched.name && formik.errors.name
                  ? "border-red-500"
                  : "border-gray-400"
              }`}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="phone">
              Phone <span className="text-red-500">*</span>
            </label>
            <PhoneInput
              country={"us"} // Set default country
              value={formik.values.phone}
              onChange={(value) => formik.setFieldValue("phone", value)} // Update Formik value
              inputClass={`w-full border-black border-[2px] px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formik.touched.phone && formik.errors.phone
                  ? "border-red-500"
                  : "border-gray-400"
              }`}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`w-full border-black border-[2px] px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : "border-gray-400"
              }`}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          {/* Address Field */}
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="address">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              rows={3}
              className={`w-full border-black border-[2px] px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formik.touched.address && formik.errors.address
                  ? "border-red-500"
                  : "border-gray-400"
              }`}
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.address && formik.errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.address}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate("/contacts")}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {formik.isSubmitting ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}
