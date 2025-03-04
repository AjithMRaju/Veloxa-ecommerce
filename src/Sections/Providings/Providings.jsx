import { customerPlans } from "../../Utils/Data/Data";

const Providings = () => {
  return (
    <section className="my-5">
      <div className="container">
        <div className="row justify-content-center">
          {customerPlans.map((plan, index) => {
            return (
              <div
                className="col-lg-4 d-flex justify-content-center "
                key={index}
              >
                <div className=" d-flex bg-white p-3 rounded border">
                  <div
                    className=""
                    style={{ width: "40px", height: "40px" }}
                  ></div>
                  <div>
                    <h5 style={{ fontWeight: "500" }}>{plan.title}</h5>
                    <p className="fs-sm" style={{fontSize:"small"}}>{plan.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Providings;
