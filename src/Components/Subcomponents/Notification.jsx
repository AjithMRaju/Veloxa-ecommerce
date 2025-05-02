import { useState, useEffect } from "react";
import { getUserNotifications } from "../../Functions/wishlistService";
import { selectUserAuth } from "../../Utils/Redux/productSlice";
import { useSelector } from "react-redux";

const Notification = () => {
  const user = useSelector(selectUserAuth);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user?.uid) {
      renderEmptyNotification();
      return;
    }

    const fetchNotifications = async () => {
      try {
        setLoading(true);
        const data = await getUserNotifications(user?.uid);
        setNotifications(data);
      } catch (err) {
        setError("Failed to load notifications");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [user?.uid]);
  // ///
  const customSize = {
    width: "100px",
    height: "100px",
  };

  const renderEmptyNotification = () => {
    return (
      <div className="d-flex justify-content-center align-items-center h-100">
        <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center">
          <div style={customSize} className="mt-">
            <img
              src="https://cdn-icons-gif.flaticon.com/11919/11919365.gif"
              alt=""
              style={customSize}
            />
          </div>
          <h6>No notifications</h6>
          <p style={{ fontSize: "small" }} className="text-center">
            No notifications right now. We`&apos;`ll keep you posted when
            there`&apos;`s something new.
          </p>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="w-100 h-100 d-flex justify-content-center align-items-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <section className="h-100">
      {notifications.length === 0 ? (
        <>{renderEmptyNotification()}</>
      ) : (
        <div
          className="w-100 h-100 px-lg-4 pt-lg-3"
          // style={{ overflowY: "scroll" }}
        >
          <h6>Notifications</h6>
          <ul className="p-0">
            {notifications.map((eachNotification) => (
              <li
                key={eachNotification.id}
                className="mb- border-bottom py-3 d-flex justify-content-between"
              >
                <div>
                  <strong style={{ color: "#e37d0f", fontSize: "small" }}>
                    {eachNotification.message}✅
                  </strong>
                  <p style={{ fontSize: "small" }} className="my-2">
                    {eachNotification?.description}
                  </p>
                  {/* <br /> */}
                  <small style={{ color: "#b3b3b3", fontSize: "small" }}>
                    {new Date(
                      eachNotification.timestamp.seconds * 1000
                    ).toLocaleString()}
                  </small>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default Notification;
