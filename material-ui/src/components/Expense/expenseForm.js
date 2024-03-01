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
  FormHelperText,
} from "@mui/material";
import moment from "moment-timezone";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { createBrowserHistory } from 'history';
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

  const redBorderClass = {
    border: "1px solid red",
    borderRadius: "5px"
  };
  
  const [expenseAmount, setExpenseAmount] = useState("");
  const [cards, setCards] = useState([{ id: 1 }]);

  const [clients, setClients] = useState({
    clientName: "",
    projectId: "",
    billable: "",
    expenses: [
      {
        id: "",
        date: "",
        expenseCategory: "",
        expenseCurrency: null,
        expenseAmount: "",
        settlementCurrency: "",
        settlementAmount: null,
        remarks: "",
        supportingDocument: null,
      },
    ],
  });
  
  const history = createBrowserHistory();

  const generateInitialValues = (cardId) => {
    return {
      id: cardId,
      clientName: clients.clientName,
      projectId: clients.projectId,
      billable: clients.billable,
      expenses: [
        {
          id: cardId,
          date: "",
          expenseCategory: "",
          expenseCurrency: null,
          expenseAmount: "",
          settlementCurrency: "",
          settlementAmount: null,
          remarks: "",
          supportingDocument: null,
        },
      ],
    };
  };

  const [initialFormValues, setInitialFormValues] = useState(
    generateInitialValues(1)
  );

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log("Expense Data:", values);
    },
  });

  const handleNumberChange = (event) => {
    const { value } = event.target;

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

  const handleCancel = () => {
    if (window.confirm('Do you want to cancel the request?')) {
      history.push('/expense');
      window.location.reload();
    }
  };
  
  

  const handleDateChange = (date) => {
    const new_date = date.toLocaleString();
    const local_date = moment.utc(new_date).local().format("DD-MM-YYYY");
    formik.setFieldValue("date", local_date);
    formik.handleBlur("date");
  };
  const handleAddCard = () => {
    const newCardId = cards.length + 1;
    setCards([...cards, { id: newCardId }]);

    setInitialFormValues((prevValues) => ({
      ...prevValues,
      expenses: [
        ...prevValues.expenses,
        {
          id: newCardId,
          date: "",
          expenseCategory: "",
          expenseCurrency: null,
          expenseAmount: "",
          settlementCurrency: "",
          settlementAmount: null,
          remarks: "",
          supportingDocument: null,
        },
      ],
    }));
  };
  const handleDeleteCard = (cardId) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));

    setInitialFormValues((prevValues) => {
      const newExpenses = prevValues.expenses.filter(
        (expense) => expense.id !== cardId
      );
      return { ...prevValues, expenses: newExpenses };
    });
  };

  return (
    <div style={{ width: "100%" }}>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Card
            sx={{
              width: "100%",
              padding:"-8px",
              paddingBottom: "-24px",
              margin: "0px"
            }}
          >
            <CardContent>
              <Grid container spacing={1}>
                {/* Client Name */}
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Client Name   </InputLabel>
                    <Select
                      label="Project ID"
                      name="clientName"
                      value={formik.values.clientName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      style={(formik.touched.clientName && !formik.values.clientName) ? redBorderClass : {}}
                    >
                      {client_data?.map((item, key) => (
                        <MenuItem value={item.client_name} key={key}>
                          {item.client_name}
                        </MenuItem>
                      ))}
                    </Select>
                    {/* <FormHelperText error>
                      {formik.touched.clientName && formik.errors.clientName
                        ? formik.errors.clientName
                        : ""}
                    </FormHelperText> */}
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
                      style={(formik.touched.projectId && !formik.values.projectId) ? redBorderClass : {}}

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
                    {/* <FormHelperText error>
                      {formik.touched.projectId && formik.errors.projectId
                        ? formik.errors.projectId
                        : ""}
                    </FormHelperText> */}
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
                      style={(formik.touched.billable && !formik.values.billable) ? redBorderClass : {}}

                    >
                      <MenuItem value="No">No</MenuItem>
                      <MenuItem value="Yes">Yes</MenuItem>
                    </Select>
                    {/* <FormHelperText error>
                      {formik.touched.billable && formik.errors.billable
                        ? formik.errors.billable
                        : ""}
                    </FormHelperText> */}
                  </FormControl>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          {cards.map((card,index) => (
  <Card
    key={card.id}
    sx={{
      width: "100%",
      height: "50%",
      padding: "-8px",
      paddingBottom: "-24px",
      margin: "0px",
      position: "relative",
      borderBottom: index < cards.length - 1 ? "1px solid #ccc" : "none" ,
      marginBottom: "10px",
      boxShadow: "none",
      border: "1px solid #ccc", // Add border style here
    borderRadius: "5px",
      
      
    }}
  >
    <CardContent>
      <Grid container spacing={2}>
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
        onChange={handleDateChange}
        onBlur={() => formik.handleBlur("date")} 
        slotProps={{
          textField: {
            variant: "outlined",
            size: "small",
            style: {
              ...(formik.touched.date && !formik.values.date ? redBorderClass : {}),
              width: '100%', 
            },
          },
        }}
      />
    </DemoContainer>
  </LocalizationProvider>
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
              style={(formik.touched.expenseCategory && !formik.values.expenseCategory) ? redBorderClass : {}}
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
            {/* <FormHelperText error>
              {formik.touched.expenseCategory &&
              formik.errors.expenseCategory
                ? formik.errors.expenseCategory
                : ""}
            </FormHelperText> */}
          </FormControl>
        </Grid>

        {/* Expense Currency */}
        <Grid item xs={12} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Expense Currency</InputLabel>
            <Select
              label="Expense Currency"
              name="expenseCurrency"
              value={formik.values.expenseCurrency || ""} // Ensure value is set to an empty string when null or undefined
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={(formik.touched.expenseCurrency && !formik.values.expenseCurrency) ? redBorderClass : {}}
            >
              {currency.map((item, key) => (
                <MenuItem value={item.code} key={key}>
                  {item.code}
                </MenuItem>
              ))}
            </Select>
            {/* No need for FormHelperText for currency */}
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
            style={(formik.touched.expenseAmount && !formik.values.expenseAmount) ? redBorderClass : {}}
          />
          {/* <FormHelperText error>
            {formik.touched.expenseAmount &&
            formik.errors.expenseAmount
              ? formik.errors.expenseAmount
              : ""}
          </FormHelperText> */}
        </Grid>
        {/* Settlement Currency */}
        <Grid item xs={12} md={3}>
          <FormControl fullWidth size="small">
            <InputLabel>Settlement Currency</InputLabel>
            <Select
              label="Settlement Currency"
              name="settlementCurrency"
              value={
                formik.values.settlementCurrency === undefined ||
                formik.values.settlementCurrency === null
                  ? ""
                  : formik.values.settlementCurrency
              }
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              style={(formik.touched.settlementCurrency && !formik.values.settlementCurrency) ? redBorderClass : {}}
            >
              {currency.map((item, key) => (
                <MenuItem value={item.code} key={key}>
                  {item.code}
                </MenuItem>
              ))}
            </Select>
            {/* <FormHelperText error>
              {formik.touched.settlementCurrency &&
              formik.errors.settlementCurrency
                ? formik.errors.settlementCurrency
                : ""}
            </FormHelperText> */}
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
            style={(formik.touched.settlementAmount && !formik.values.settlementAmount) ? redBorderClass : {}}
          />
          {/* <FormHelperText error>
            {formik.touched.settlementAmount &&
            formik.errors.settlementAmount
              ? formik.errors.settlementAmount
              : ""}
          </FormHelperText> */}
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

        <IconButton
          aria-label="delete"
          size="medium"
          onClick={() => handleDeleteCard(card.id)}
          sx={{ marginLeft: "auto", alignItems :"end", height:"fit-content", marginTop: "auto" }}
        >
          <DeleteIcon fontSize="tiny" />
        </IconButton>
      </Grid>
    </CardContent>
  </Card>
))}

        </Grid>
      </form>
      <div
  style={{
    position: 'fixed',
    bottom: 0,
    right: 0,
    left: 0,
    background: 'white',
    padding: '10px',
    borderTop: '1px solid #ccc',
    display: 'flex',
    justifyContent: 'flex-end', 
    alignItems: 'center',
    zIndex: 999,
  }}
>
  <div style={{ marginLeft: "7.5%" }}> 
    <Button
      variant="contained"
      color="primary"
      type="submit"
      style={{ margin: '0 4px 0 -2px' }}
    >
      Submit
    </Button>
    <Button
      variant="contained"
      color="primary"
      onClick={handleCancel}
      style={{ margin: '0px' }}
    >
      Cancel
    </Button>
  </div>
  <IconButton aria-label="add" size="medium" onClick={handleAddCard} style={{ marginLeft:"auto", marginRight: "4.5%" }}>
    <AddIcon style={{ fontSize: '100%' }} />
  </IconButton>
</div>


    </div>
  );
};

export default ExpenseForm;
