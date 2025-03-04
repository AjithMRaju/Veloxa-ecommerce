import Notification from "../../components/Subcomponents/Notification";
const NotificationPage = () => {
  const customSize = {
    width: "100vw",
    height: "100vh",
  };
  return (
    <section
      style={customSize}
      className="d-flex align-items-center justify-content-center flex-column bg-white"
    >
      <div className="container">
        <Notification />
      </div>
    </section>
  );
};

export default NotificationPage;
