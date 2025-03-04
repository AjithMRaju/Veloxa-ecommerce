import { Fragment, useState } from "react";
import { LinearProgress } from "@mui/material";
import { CgCloseO } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import {
  selectReferrAndEarnBox,
  setReferrAndEarnBOx,
} from "../../Utils/Redux/productSlice";
import Dialog from "@mui/material/Dialog";
import Rewards from "../../assets/Images/Rewards.png";
import RewardsCoin from "../../assets/Images/RewardsCoin.png";
const ReferrAndEarn = () => {
  const dispatch = useDispatch();
  const open = useSelector(selectReferrAndEarnBox);
  // eslint-disable-next-line no-unused-vars
  const [invitedCount, setInvitedCount] = useState(5);
  const totalGoal = 20;

  const progress = (invitedCount / totalGoal) * 100;

  const handleClose = () => {
    dispatch(setReferrAndEarnBOx(false));
  };

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: {
            background: "linear-gradient(90deg, #000000 0%, #3533cd 90%)",
            borderRadius: "7px", // Optional: Rounded corners
            maxWidth: "700px",
          },
        }}
      >
        <div className="p-3 d-flex flex-column align-items-center">
          <div className="mb-5">
            <div className="d-flex justify-content-center">
              <img
                style={{ width: "150px", height: "150px" }}
                src={Rewards}
                alt="reward imgae"
              />
            </div>

            <div className="text-white text-center">
              <h6 className="mb-0">Invite your friends & earn</h6>
              <h4>Amazing Super Coins</h4>
            </div>
          </div>
          {/* --- */}
          <div
            className="bg-white position-relative"
            style={{ borderRadius: "10px", height: "250px", width: "600px" }}
          >
            <div className="mt-5 d-flex flex-column align-items-center">
              <div
                style={{ background: "#f5f5f5", borderRadius: "50px" }}
                className="p-2 px-3"
              >
                <p style={{ fontSize: "small", fontWeight: "" }}>
                  Earn 100 super coins by inviting 20 friends
                </p>
              </div>
              <div className="my-3">
                <LinearProgress variant="determinate" value={progress} />
                <h6
                  className="mt-2"
                  style={{ fontSize: "small" }}
                >{`${invitedCount} out of ${totalGoal} people invited`}</h6>
                {/* <Typography variant="body2" sx={{ mt: 1 }}>
                {`${Math.round(progress)}% completed`}
              </Typography> */}
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <div
                  className="p-2 me-2"
                  style={{ border: "1px dotted black", height: "40px" }}
                >
                  A2GHD78
                </div>
                <button className="referBtn  py-2">Referr Now</button>
              </div>
            </div>
          </div>
          {/* --- */}
          <div
            className="d-flex p-2 bg-white position-absolute w-100  start-50 translate-middle"
            style={{
              maxWidth: "400px",
              border: "1px solid #0000001f",
              borderRadius: "10px",
              top: "50%",
            }}
          >
            <div className="text-white pe-2">
              <img
                style={{ widht: "40px", height: "40px" }}
                src={RewardsCoin}
                alt=""
              />
            </div>
            <div>
              <p className="text-dark " style={{ fontSize: "small" }}>
                Love using [Our Product/Service Name]? Share it with your
                friends and earn amazing rewards! 💰✨
              </p>
            </div>
          </div>
        </div>
        <div
          className="position-absolute "
          style={{ right: "10px", top: "10px", cursor: "pointer" }}
        >
          <CgCloseO
            size={30}
            color="white"
            onClick={() => dispatch(setReferrAndEarnBOx(false))}
          />
        </div>
      </Dialog>
    </Fragment>
  );
};

export default ReferrAndEarn;
