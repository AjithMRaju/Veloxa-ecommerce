const SniperLoading = () => {
  return (
    <div className="spinner center">
      {Array.from({ length: 12 }).map((_, index) => {
        return <div className="spinner-blade" key={index}></div>;
      })}
    </div>
  );
};

export default SniperLoading;
