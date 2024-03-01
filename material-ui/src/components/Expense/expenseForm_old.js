import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Grid,
  Box,
  FormHelperText,
} from "@mui/material";
import moment from "moment-timezone";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  client_data,
  project_data,
  expense_category,
  currency,
} from "../../Data/data";
import { styled } from "@mui/system";
moment().tz("Asia/Kolkata").format();

const ExpenseForm = () => {
  const validationSchema = Yup.object({
    clientName: Yup.string().required("Client Name is required"),
    projectId: Yup.string().required("Project ID is required"),
    billable: Yup.string().required("Billable is required"),
    date: Yup.date().required("Date is required"),
    expenseCategory: Yup.string().required("Expense Category is required"),
    expenseCurrency: Yup.string().required("Expense Currency is required"),
    expenseAmount: Yup.number().required("Expense Amount is required"),
    settlementCurrency: Yup.string().required(
      "Settlement Currency is required"
    ),
    settlementAmount: Yup.number()
      .required("Settlement Amount is required")
      .positive("Settlement Amount must be a positive number"),
    remarks: Yup.string(),
  });

  const [date, setDate] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");

  const formik = useFormik({
    initialValues: {
      month: "",
      date: "",
      clientName: "",
      projectId: "",
      billable: "",
      expenseCategory: "",
      settlementCurrency: "",
      settlementAmount: "12",
      expenseCurrency: "",
      expenseAmount: "",
      remarks: "",
      supportingDocument: null,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      // Handle form submission
      console.log("Expense Data:", values);
    },
  });

  const handleNumberChange = (event) => {
    const { value } = event.target;

    // Regex to allow only numbers with up to 2 decimal places
    const regex = /^\d*\.?\d{0,2}$/;

    if (regex.test(value)) {
      setExpenseAmount(value);
      formik.setFieldValue("expenseAmount", value);
    }
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const handleDateChange = (date) => {
    // Update the 'date' field in formik values
    const new_date = date.toLocaleString();
    const local_date = moment.utc(new_date).local().format("DD-MM-YYYY");
    formik.setFieldValue("date", local_date);
    setDate(date.toLocaleString());
    // Trigger formik's handleBlur to update touched state
    formik.handleBlur("date");
  };

  return (
    <Box
      sx={
        {
          // margin: "auto",
          // border: "1px solid black",
        }
      }
    >
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          {/* Client Name */}
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Client Name</InputLabel>
              <Select
                label="Project ID"
                name="clientName"
                value={formik.values.clientName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                {client_data?.map((item, key) => (
                  <MenuItem value={item.client_name} key={key}>
                    {item.client_name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText error>
                {formik.touched.clientName && formik.errors.clientName
                  ? formik.errors.clientName
                  : ""}
              </FormHelperText>
            </FormControl>
          </Grid>
          {/* Project Name */}
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Project ID</InputLabel>
              <Select
                label="Project ID"
                name="projectId"
                value={formik.values.projectId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                {formik.isSubmitting ? (
                  <MenuItem disabled>Loading projects...</MenuItem>
                ) : (
                  project_data.map((project, key) => (
                    <MenuItem key={key} value={project.Description}>
                      {project.Description}({project.project_code})
                    </MenuItem>
                  ))
                )}
              </Select>
              <FormHelperText error>
                {formik.touched.projectId && formik.errors.projectId
                  ? formik.errors.projectId
                  : ""}
              </FormHelperText>
            </FormControl>
          </Grid>
          {/* Billable */}
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Billable</InputLabel>
              <Select
                label="Billable"
                name="billable"
                value={formik.values.billable}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <MenuItem value="No">No</MenuItem>
                <MenuItem value="Yes">Yes</MenuItem>
              </Select>
              <FormHelperText error>
                {formik.touched.billable && formik.errors.billable
                  ? formik.errors.billable
                  : ""}
              </FormHelperText>
            </FormControl>
          </Grid>
          {/* Expense Date */}
          <Grid item xs={12} md={3}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["DatePicker"]}
                sx={{ marginTop: "-5px", paddingTop: "5px" }}
              >
                <DatePicker
                  name="date"
                  label="Date of Expense"
                  format="DD/MM/YYYY"
                  disableFuture
                  // value={date}
                  onChange={handleDateChange} // Use custom onChange handler
                  slotProps={{
                    textField: { variant: "outlined", size: "small" },
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <FormHelperText error>
              {formik.touched.date && formik.errors.date
                ? formik.errors.date
                : ""}
            </FormHelperText>
          </Grid>
          {/* Expense Category */}
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Expense Category</InputLabel>
              <Select
                label="Expense Category"
                name="expenseCategory"
                value={formik.values.expenseCategory}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                <MenuItem selected={true} disabled>
                  select
                </MenuItem>
                {expense_category?.map((expense, key) => (
                  <MenuItem key={key} value={expense}>
                    {expense}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText error>
                {formik.touched.expenseCategory && formik.errors.expenseCategory
                  ? formik.errors.expenseCategory
                  : ""}
              </FormHelperText>
            </FormControl>
          </Grid>
          {/* Expense Currency */}
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Expense Currency</InputLabel>
              <Select
                label="Expense Currency"
                name="expenseCurrency"
                value={formik.values.expenseCurrency}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                {currency.map((item, key) => (
                  <MenuItem value={item.code} key={key}>
                    {item.code}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText error>
                {formik.touched.expenseCurrency && formik.errors.expenseCurrency
                  ? formik.errors.expenseCurrency
                  : ""}
              </FormHelperText>
            </FormControl>
          </Grid>
          {/* Expense Amount */}
          <Grid item xs={12} md={3}>
            <TextField
              size="small"
              type="number"
              label="Expense Amount"
              name="expenseAmount"
              value={expenseAmount}
              onChange={handleNumberChange}
              onBlur={formik.handleBlur}
              fullWidth
              inputProps={{ step: "0.01" }}
            />
            <FormHelperText error>
              {formik.touched.expenseAmount && formik.errors.expenseAmount
                ? formik.errors.expenseAmount
                : ""}
            </FormHelperText>
          </Grid>
          {/* Settlement Currency */}
          <Grid item xs={12} md={3}>
            <FormControl fullWidth size="small">
              <InputLabel>Settlement Currency</InputLabel>
              <Select
                label="Settlement Currency"
                name="settlementCurrency"
                value={formik.values.settlementCurrency}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              >
                {currency.map((item, key) => (
                  <MenuItem value={item.code} key={key}>
                    {item.code}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText error>
                {formik.touched.settlementCurrency &&
                formik.errors.settlementCurrency
                  ? formik.errors.settlementCurrency
                  : ""}
              </FormHelperText>
            </FormControl>
          </Grid>
          {/* Settlement Amount */}
          <Grid item xs={12} md={3}>
            <TextField
              size="small"
              disabled
              type="number"
              label="Settlement Amount"
              name="settlementAmount"
              value={formik.values.settlementAmount}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              fullWidth
            />
            <FormHelperText error>
              {formik.touched.settlementAmount && formik.errors.settlementAmount
                ? formik.errors.settlementAmount
                : ""}
            </FormHelperText>
          </Grid>
          {/* Remarks */}
          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField
                size="small"
                label="Remarks"
                aria-label="minimum height"
                name="remarks"
                value={formik.values.remarks}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                minRows={3}
              />
            </FormControl>
          </Grid>
          {/* Upload File */}
          <Grid item xs={12} md={3}>
            <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              sx={{ width: "100%" }}
            >
              Upload file
              <VisuallyHiddenInput
                type="file"
                accept="application/pdf, image/*"
                onChange={(e) => {
                  formik.setFieldValue(
                    "supportingDocument",
                    e.currentTarget.files[0]
                  );
                }}
              />
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
            <Button
              sx={{ marginLeft: 1 }}
              variant="outlined"
              color="secondary"
              onClick={formik.handleReset}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default ExpenseForm;
