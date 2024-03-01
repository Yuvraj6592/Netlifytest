import React, { useState } from "react";
import { Card, CardContent, IconButton, Typography, Box, Grid, Chip, Button, Divider, Pagination, MenuItem, Select, Tab, Tabs } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { expenseData as initialExpenseData } from "../../Data/data";

export default function DataTable() {
  const [itemsPerPage, setItemsPerPage] = useState(1); 
  const [page, setPage] = useState(1);
  const [expenseData, setExpenseData] = useState(initialExpenseData);
  const [selectedTab, setSelectedTab] = useState(0); // New state for selected tab

  const handleDeleteClick = (id) => {
    const isConfirmed = window.confirm("Do you want to delete this request?");
    if (isConfirmed) {
      const updatedExpenseData = expenseData.filter(expense => expense.id !== id);
      const updatedData = updatedExpenseData.map((expense, index) => ({
        ...expense,
        id: index + 1
      }));
      setExpenseData(updatedData);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeItemsPerPage = (event) => {
    setItemsPerPage(event.target.value);
    setPage(1);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
    setPage(1); 
  };

  const filteredData = selectedTab === 0 ? expenseData.filter(expense => expense.status === "Pending") : 
  selectedTab === 1 ? expenseData.filter(expense => expense.submitted_by === "Yuvraj Sharma"):
  expenseData.filter(expense => expense.status === "Approved") ;
  

  const slicedData = filteredData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={0}>
       <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', paddingRight: '30px' }}>
    <Tabs value={selectedTab} onChange={handleTabChange} variant="fullWidth">
      <Tab label="Backlog" />
      <Tab label="My Requests" />
      <Tab label="Approved" />
    </Tabs>
    <IconButton aria-label="filter">
      <FilterAltIcon />
    </IconButton>
  </Box>
      <Grid container spacing={2}>
        {slicedData.map((expense, expenseIndex) => (
          <Grid item key={expense.id} xs={12} md={6}>
            <Card style={{ marginTop: "1%", marginBottom: "5px", width: "100%", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", border: "1px solid rgba(0, 0, 0, 0.2)" }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center" marginTop={"-0.8%"}>
                  <Typography variant="h6" gutterBottom>
                    <Chip label={`Requested By ${expense.submitted_by}`} color="primary" sx={{ ml: 1 }} />
                    <Chip label={expense.submitted_date} color="primary" sx={{ ml: 1 }} />
                    <Chip label={expense.client_name} color="primary" sx={{ ml: 1 }} />
                    <Chip label={expense.project_name} color="primary" sx={{ ml: 1 }} />
                    <Chip label={expense.expenses[0].Billable} color="primary" sx={{ ml: 1 }} />
                  </Typography>
                  <Box display="flex" alignItems="center" marginTop={"-0.4%"}>
                    <Chip label={expense.status} color={expense.status === "Pending" ? "warning" : "success"} sx={{ ml: 1 }} />
                  </Box>
                </Box>
                <div style={{ maxHeight: "300px", minHeight: "300px", overflowY: "auto", border: "1px solid rgba(0, 0, 0, 0.2)", borderRadius: "2px", scrollbarWidth:"Thin" }}> 
                  {expense.expenses.map((expenseDetail, idx) => (
                    <React.Fragment key={idx}>
                      {idx !== 0 && <Divider />}
                      <Grid container spacing={2}>
                        {/* Left side with 60% width */}
                        <Grid item xs={6}>
                          <Typography variant="body1" gutterBottom style={{ marginLeft: "5px", fontSize: "1rem" }}> 
                            {`${idx + 1}: Category: ${expenseDetail.Category}`}
                          </Typography>
                          <Typography variant="body1" gutterBottom style={{ fontSize: "1rem", marginLeft: "5%" }}>
                            Expense Amount: {expenseDetail.Expense_Currency}{expenseDetail.ExpenseAmount} | SettlementCurrency: {expenseDetail.SettlementCurrency} 
                          </Typography>
                          {expenseDetail.filesUploaded && (
                            <Box mt={1}>
                              <Typography variant="body1" gutterBottom marginLeft={"5%"}><b><u>Uploaded Files:</u></b></Typography>
                              {expenseDetail.filesUploaded.map((file, index) => (
                                <Box key={index} display="flex" alignItems="center" justifyContent="space-between" marginLeft={"5%"}>
                                  <Typography variant="body1" gutterBottom>{`${index + 1}. ${file}`}</Typography>
                                  <IconButton size="small" disabled>
                                    <VisibilityIcon marginRight={"2%"} />
                                    <DownloadIcon marginRight={"2%"} />
                                  </IconButton>
                                </Box>
                              ))}
                            </Box>
                          )}
                        </Grid>
                        {/* Right side with 40% width */}
                        <Grid item xs={6} style={{borderLeft: "1px solid rgba(0, 0, 0, 0.2)"}}> 
                          <Box mt={1} textAlign="center">
                            <Typography variant="h6"><u>Notes</u></Typography>
                          </Box>
                          <Box mt={1} textAlign="left">
                            {expenseDetail.Notes.length === 0 ? (
                              <Typography variant="body1" fontWeight="bold" textAlign={"center"} color="red">No Data</Typography>
                            ) : (
                              expenseDetail.Notes.map((note, index) => (
                                <Typography key={index} variant="body1" fontSize={"large"} marginLeft={"5%"} gutterBottom>
                                  &#8226; {note}
                                </Typography>
                              ))
                            )}
                          </Box>
                        </Grid>
                      </Grid>
                    </React.Fragment>
                  ))}
                </div>
                {(expense.status === "Pending") ? (
                  <Box display="flex" justifyContent="flex-start" alignItems="center" mt={2}>
                    <Button variant="contained" >
                      Approve
                    </Button>
                    <Box sx={{ marginLeft: 1 }}> 
                      <Button variant="contained">
                        Decline
                      </Button>
                    </Box>
                    <Box flexGrow={1} /> 
                    <IconButton onClick={() => handleDeleteClick(expense.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                ) : (
                  <Box display="flex" justifyContent="flex-start" alignItems="center" mt={2}>
                    <Box flexGrow={1} />
                    <Box>
                      <IconButton disabled>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box mt={2} display="flex" justifyContent="center" alignItems="center" width="100%" margin={"0%"}>
        <Box mt={2} display="flex" justifyContent="center" alignItems="center" marginTop="5px">
          <Typography variant="body1" style={{ marginRight: '8px' }}>
            Page {page}
          </Typography>
          <Pagination
            count={Math.ceil(filteredData.length / itemsPerPage)}
            page={page}
            onChange={handleChangePage}
          />
        </Box>
        <Box display="flex" alignItems="center" ml="auto">
          <Typography variant="body1" align="center" style={{ marginRight: '8px' }}>
            Items per Page:
          </Typography>
          <Select
            value={itemsPerPage}
            onChange={handleChangeItemsPerPage}
            variant="outlined"
            style={{ width: '65px', height: "30px" }}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
          </Select>
        </Box>
      </Box>
    </Box>
  );
}
