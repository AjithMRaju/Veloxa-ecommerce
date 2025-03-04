import { useEffect } from "react";
import { FiX } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import {
  selectNotificationStatus,
  selectNotificationMessage,
  setNotificationStatus,
} from "../../Utils/Redux/productSlice";
const NotificationToast = () => {
  const dispatch = useDispatch();
  const notification = useSelector(selectNotificationStatus);
  const messageContent = useSelector(selectNotificationMessage);
  const removeNotif = () => {
    dispatch(setNotificationStatus(false));
  };

  return (
    <div className="bg-white min-h-[200px] flex items-center justify-center">
      {notification && (
        <div className="notification-container">
          <AnimatePresence>
            <Notification removeNotif={removeNotif} text={messageContent} />
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

const NOTIFICATION_TTL = 2000;

// eslint-disable-next-line react/prop-types
const Notification = ({ text, removeNotif }) => {
  useEffect(() => {
    const timeoutRef = setTimeout(() => {
      removeNotif();
    }, NOTIFICATION_TTL);

    return () => clearTimeout(timeoutRef);
  }, []);

  return (
    <motion.div
      layout
      initial={{ y: -15, scale: 0.95 }}
      animate={{ y: 0, scale: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="notification"
    >
      <span>{text}</span>
      <button
        onClick={() => removeNotif(false)}
        className="ml-auto mt-0.5"
        style={{
          border: "none",
          outline: "none",
          background: "none",
          color: "#fff",
        }}
      >
        <FiX />
      </button>
    </motion.div>
  );
};

export default NotificationToast;
