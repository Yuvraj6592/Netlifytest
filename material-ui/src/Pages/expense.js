import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import CssBaseline from "@mui/material/CssBaseline";

import {
  Box,
  Toolbar,
  Container,
  Grid,
  Paper,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import ExpenseForm from "../components/Expense/expenseForm";
import DataTable from "../components/Expense/listView";

const Expense = () => {
  const [view, setView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [headingText, setHeadingText] = useState("Expense List");

  const handleViewForm = () => {
    setLoading(true); 
    setTimeout(() => {
      setView(!view);
      setLoading(false);
      setHeadingText(view ? "Expense List" : "Expense Form");
    }, 300); 
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Sidebar navItem="Expense" />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="100" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12}>
              <Paper
                sx={{
                  p: 4,
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
              >
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                  marginBottom={2}
                  marginTop="-2%"
                >
                  <Grid item>
                    <h3>
                      <u>{headingText}</u>
                    </h3>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      onClick={handleViewForm}
                    >
                      {!view ? "Add Expense" : "View Expense"}
                    </Button>
                  </Grid>
                </Grid>
                {loading ? (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <CircularProgress />
                  </Box>
                ) : view ? (
                  <ExpenseForm />
                ) : (
                  <DataTable />
                )}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Expense;
