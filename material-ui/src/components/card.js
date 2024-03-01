import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
export default function OutlinedCard({ title, to }) {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card
        variant="outlined"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        <CardContent>
          <Typography variant="h3">
            <Link
              className="link"
              to={to}
              style={{
                fontSize: 14,
                cursor: "pointer",
                color: "black",
                marginBottom: 0,
                overflow: "hidden",
              }}
            >
              <Typography>{title}</Typography>
            </Link>
          </Typography>
          {/* <Typography variant="body2">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography> */}
        </CardContent>
        {/* <CardActions>
          <Button size="small">Visit</Button>
        </CardActions> */}
      </Card>
    </Box>
  );
}
