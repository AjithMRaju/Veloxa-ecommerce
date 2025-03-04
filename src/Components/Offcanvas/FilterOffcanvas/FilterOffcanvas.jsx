import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { MdOutlineTune } from "react-icons/md";
import Filter from "../../../Pages/Filters/Filters";

const FilterOffcanvas = () => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const DrawerList = (
    <Box sx={{ width: 300,background:"#f3f3f3" }} role="presentation" >
      <Filter />
    </Box>
  );
  return (
    <div>
      <div className="m-filter d-lg-none" onClick={toggleDrawer(true)}>
        <MdOutlineTune fontSize="large" />
      </div>
      <Drawer open={open} onClose={toggleDrawer(false)} >
        {DrawerList}
      </Drawer>
    </div>
  );
};

export default FilterOffcanvas;
