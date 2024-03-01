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
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import moment from "moment-timezone";
import Modal from "@mui/material/Modal";
import List from "../../components/List";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  client_data,
  project_data,
  expense_category,
  currency,
} from "../../Data/data";
import { styled } from "@mui/system";
import Filedropzone from "../filedropzone";
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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [data, setData] = useState({
    client_name: "",
    project_name: "",
    billable: "No",
    expenses: [
      {
        id: "",
        date: "",
        expenseCategory: "",
        expenseCurrency: "",
        expenseAmount: "",
        settlementCurrency: "",
        settlementAmount: "",
        remarks: "",
        supportingDocument: "",
      },
    ],
  });

  const [expenseTabledata, setExpenseTabledata] = useState([]);

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
    setDate(date.toLocaleString());
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    bgcolor: "background.paper",
    borderRadius: "1rem",
    minHeight: "3rem",
    boxShadow: 24,
    p: 4,
    "@media (max-width: 600px)": {
      // Change width to 90% on small screens
      width: "90%",
      margin: "auto",
    },
  };

  const columns = [
    {
      field: "date",
      headerName: "Date",
      width: 100,
      valueGetter: (params) => {
        const expense = params.row.date;
        const date = new Date(expense);
        const options = { day: "2-digit", month: "2-digit", year: "numeric" };
        const formattedDate = date.toLocaleString("en-US", options);
        console.log("params", params);
        return formattedDate;
      },
    },
    { field: "expenseCategory", headerName: "Expense Category", width: 150 },
    { field: "expenseCurrency", headerName: "Expense Currency", width: 150 },
    { field: "expenseAmount", headerName: "Expense Amount", width: 150 },
    {
      field: "settlementCurrency",
      headerName: "Settlement Currency",
      width: 100,
    },
    { field: "settlementAmount", headerName: "Settlement Amount", width: 150 },
    { field: "remarks", headerName: "Remarks", width: 100 },
    {
      field: "supportingDocument",
      headerName: "Docs",
      width: 100,
    },
    {
      headerName: "Actions",
      renderCell: (params) => (
        <Box>
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => handleEditClick(params)}
          >
            <VisibilityIcon color="primary" />
          </IconButton>
          <IconButton color="primary" onClick={() => handleDeleteClick(params)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ),
    },
  ];
  const generateUniqueId = () => {
    return new Date().getTime(); // Using the current timestamp as a unique identifier
  };

  const handleAddExpense = () => {
    console.log(expenseTabledata);

    // Assuming that expenseTabledata has a similar structure to the initial state of the expenses array
    const newExpense = {
      id: generateUniqueId(),
      ...expenseTabledata,
    };
    setData((prevData) => ({
      ...prevData,
      expenses: [...prevData.expenses, newExpense],
    }));

    // Reset form fields
    // setExpenseAmount("");
    setExpenseTabledata("");
    // setDate("");
    setOpen(false);
  };
  const handleDataChange = (event) => {
    const { name, value } = event.target;

    setData((prevValue) => ({
      ...prevValue,

      [name]: value,
    }));
  };
  const handleExpenseChange = (event) => {
    const { name, value } = event.target;

    setExpenseTabledata((prevValue) => ({
      ...prevValue,

      [name]: value,
      date: date,
    }));
  };
  // Assuming you have a function to check if all fields are empty in a given row
  const isExpenseRowEmpty = (expense) => {
    return Object.values(expense).every((value) => value === "");
  };

  const handleEditClick = (e) => {
    console.log(e);
  };
  const handleDeleteClick = (event) => {
    const filteredValue = data.expenses.filter((val) => val.id !== event.id);
    setData((prevData) => ({
      ...prevData,
      expenses: filteredValue,
    }));
  };

  console.log(data);
  return (
    <Box>
      <Grid container spacing={2}>
        {/* Client Name */}
        <Grid item xs={12} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Client Name</InputLabel>
            <Select
              label="Project ID"
              name="client_name"
              value={data.client_name}
              onChange={handleDataChange}
              // onBlur={formik.handleBlur}
            >
              {client_data?.map((item, key) => (
                <MenuItem value={item.client_name} key={key}>
                  {item.client_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {/* Project Name */}
        <Grid item xs={12} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Project ID</InputLabel>
            <Select
              label="Project ID"
              name="project_name"
              value={data.project_name}
              onChange={handleDataChange} // onBlur={formik.handleBlur}
            >
              {/* {formik.isSubmitting ? (
                  <MenuItem disabled>Loading projects...</MenuItem>
                ) : (
                  project_data.map((project, key) => (
                    <MenuItem key={key} value={project.Description}>
                      {project.Description}({project.project_code})
                    </MenuItem>
                  ))
                )} */}
            </Select>
          </FormControl>
        </Grid>
        {/* Billable */}
        <Grid item xs={12} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Billable</InputLabel>
            <Select
              label="Billable"
              name="billable"
              value={data.billable}
              onChange={handleDataChange}
            >
              <MenuItem value="No">No</MenuItem>
              <MenuItem value="Yes">Yes</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
          <Button
            sx={{
              marginBottom: "3px",
              boxShadow: " 6px 7px 12px -6px rgba(0,0,0,0.75)",
            }}
            variant="text"
            onClick={handleOpen}
          >
            <AddIcon />
          </Button>
        </Grid>
      </Grid>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        // sx={{ overflow: "scroll" }}
      >
        <Grid sx={style} container spacing={2}>
          {/* Expense Date */}
          <Grid item xs={12} md={4}>
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
          </Grid>
          {/* Expense Category */}
          <Grid item xs={12} md={4}>
            <Select
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              name="expenseCategory"
              onChange={handleExpenseChange}
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
          </Grid>
          {/* Expense Currency */}
          <Grid item xs={12} md={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Expense Currency</InputLabel>
              <Select
                label="Expense Currency"
                name="expenseCurrency"
                onChange={handleExpenseChange}
              >
                {currency.map((item, key) => (
                  <MenuItem value={item.code} key={key}>
                    {item.code}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/* Expense Amount */}
          <Grid item xs={12} md={4}>
            <TextField
              size="small"
              type="number"
              label="Expense Amount"
              name="expenseAmount"
              onChange={handleExpenseChange}
              fullWidth
              inputProps={{ step: "0.01" }}
            />
          </Grid>
          {/* Settlement Currency */}
          <Grid item xs={12} md={4}>
            <FormControl fullWidth size="small">
              <InputLabel>Settlement Currency</InputLabel>
              <Select
                label="Settlement Currency"
                name="settlementCurrency"
                onChange={handleExpenseChange}
              >
                {currency.map((item, key) => (
                  <MenuItem value={item.code} key={key}>
                    {item.code}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/* Settlement Amount */}
          <Grid item xs={12} md={4}>
            <TextField
              size="small"
              disabled
              onChange={handleExpenseChange}
              type="number"
              label="Settlement Amount"
              name="settlementAmount"
              fullWidth
            />
          </Grid>
          {/* Remarks */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                onChange={handleExpenseChange}
                size="small"
                label="Remarks"
                aria-label="minimum height"
                name="remarks"
                minRows={3}
              />
            </FormControl>
          </Grid>
          {/* Upload File */}
          <Grid item xs={12} md={12}>
            {/* <Button
              component="label"
              variant="outlined"
              startIcon={<CloudUploadIcon />}
              // sx={{ width: "100%" }}
            >
              Upload file
              <VisuallyHiddenInput
                type="file"
                accept="application/pdf, image/*"
              />
            </Button> */}
            <Filedropzone />
          </Grid>
          <Grid
            container
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Grid item sx={{ display: "flex", gap: "5px" }}>
              <Button variant="outlined" size="small" onClick={handleClose}>
                Close
              </Button>
              <Button
                variant="contained"
                size="small"
                onClick={handleAddExpense}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Modal>

      <Box sx={{ marginTop: 1 }}>
        <List
          expenseData={data.expenses.filter(
            (expense) => !isExpenseRowEmpty(expense)
          )}
          columns={columns}
        />
      </Box>

      <Grid container spacing={2} sx={{ marginTop: 1 }}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            onClick={() => console.log("output", data)}
          >
            Submit
          </Button>
          <Button
            sx={{ marginLeft: 1 }}
            variant="outlined"
            color="secondary"
            // onClick={formik.handleReset}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ExpenseForm;
