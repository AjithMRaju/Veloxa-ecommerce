import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import { useSelector } from "react-redux";
import { selectGlobalLoader } from "../../Utils/Redux/productSlice";

const GlobalLoader = () => {
  const open = useSelector(selectGlobalLoader);

  return (
    <div>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default GlobalLoader;
