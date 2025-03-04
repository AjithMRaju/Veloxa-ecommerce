// eslint-disable-next-line react/prop-types
const Payments = ({ setPayment }) => {
  const handleConfirmPayment = () => {
    // Logic to confirm payment method
    // For example, you could gather selected payment methods and call setPayment
    const selectedPaymentMethod = "Your selected payment method"; // Replace with actual logic
    setPayment(selectedPaymentMethod);
  };

  return (
    <div className="payment-container py-lg-5 px-3 mt-3 d-none d-lg-block">
      <div className="border-bottom py-3 w">
        <h5>Payment details</h5>
      </div>
      <form action="" className="mt-4 pb-lg-4 paymentForm border-bottom">
        <div className="d-flex justify-content-between">
          <div className="d-flex flex-column">
            <label htmlFor="">Name on card</label>
            <input
              type="text"
              name=""
              id=""
              placeholder="Olivia Rhye"
              className="ci"
            />
          </div>
          <div className="d-flex flex-column">
            <label htmlFor="">Expiry</label>
            <input type="date" name="" id="expiry" placeholder="Olivia Rhye" />
          </div>
        </div>
        <div className="d-flex justify-content-between my-3">
          <div>
            <label htmlFor="">Card Number</label>
            <div className="InputContainer ci">
              <input
                placeholder="0000 0000 0000 0000"
                id="input"
                className="input "
                name="text"
                type="text"
              />
              <div className="visaCard">
                <svg
                  viewBox="0 0 48 48"
                  height="23"
                  width="23"
                  y="0px"
                  x="0px"
                  xmlns="http://www.w3.org/2000/svg"
                  className="logo"
                >
                  <path
                    d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"
                    fill="#ff9800"
                  ></path>
                  <path
                    d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"
                    fill="#d50000"
                  ></path>
                  <path
                    d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"
                    fill="#ff3d00"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          <div className="d-flex flex-column justify-content-center">
            <label htmlFor="">CVV</label>
            <input type="text" name="" id="cvv" placeholder="***" />
          </div>
        </div>
        <button className="add-address-btn" onClick={handleConfirmPayment}>
          Confirm
        </button>
      </form>
    </div>
  );
};

export default Payments;
