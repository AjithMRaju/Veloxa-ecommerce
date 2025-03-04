const Notification = () => {
  const customSize = {
    width: "100px",
    height: "100px",
  };
  return (
    <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center">
      <div style={customSize} className="mt-">
        <img
          src="https://cdn-icons-gif.flaticon.com/11919/11919365.gif"
          alt=""
          style={customSize}
        />
        
      </div>
      <h6>No notifications</h6>
        <p style={{fontSize:"small"}} className="text-center">
          No notifications right now. We`&apos;`ll keep you posted when
          there`&apos;`s something new.
        </p>
    </div>
  );
};

export default Notification;
