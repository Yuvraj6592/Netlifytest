import React, { useState } from "react";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  ShoppingCart as ShoppingCartIcon,
  People as PeopleIcon,
  BarChart as BarChartIcon,
  Layers as LayersIcon,
  StarBorder,
} from "@mui/icons-material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AgricultureIcon from "@mui/icons-material/Agriculture";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import { Link } from "react-router-dom";

const NavItems = () => {
  const [openItems, setOpenItems] = useState({});

  const handleClick = (index) => {
    // Toggle the state of the clicked item
    setOpenItems((prevOpenItems) => ({
      ...prevOpenItems,
      [index]: !prevOpenItems[index],
    }));
  };

  // Data for list items
  const listItems = [
    { icon: <DashboardIcon />, text: "Dashboard", to: "/dashboard" },
    { icon: <AttachMoneyIcon />, text: "Expense", to: "/expense" },
    {
      icon: <PeopleIcon />,
      text: "Customers",
      sub: [
        { icon: <ShoppingCartIcon />, text: "Expense1", to: "/expense1" },
        { icon: <ShoppingCartIcon />, text: "Expense2", to: "/expense2" },
      ],
    },
    { icon: <BarChartIcon />, text: "Reports" },
    { icon: <AgricultureIcon />, text: "Integrations" },
    { icon: <AddShoppingCartIcon />, text: "Integrations" },
    { icon: <LayersIcon />, text: "Integrations" },
    // { icon: <AppIcon />, text: "Integrations" },

    { icon: <LayersIcon />, text: "Integrations" },
    { icon: <AssuredWorkloadIcon />, text: "Integrations" },
  ];

  return (
    <List>
      {listItems.map((item, index) => (
        <div key={index}>
          <Link style={{ color: "grey", textDecoration: "none" }} to={item.to}>
            <ListItemButton onClick={() => handleClick(index)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </Link>
          {item.sub && (
            <Collapse in={openItems[index]} timeout="auto" unmountOnExit>
              {item.sub.map((subItem, key) => (
                <List key={key} component="div" disablePadding>
                  <Link
                    style={{ color: "grey", textDecoration: "none" }}
                    to={subItem.to}
                  >
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon>
                        <StarBorder />
                      </ListItemIcon>
                      <ListItemText primary={subItem.text} />
                    </ListItemButton>
                  </Link>
                </List>
              ))}
            </Collapse>
          )}
        </div>
      ))}
    </List>
  );
};

export default NavItems;
