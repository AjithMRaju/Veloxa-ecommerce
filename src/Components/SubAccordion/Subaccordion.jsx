/* eslint-disable react/prop-types */
import { Accordion } from "react-bootstrap";

const Subaccordion = ({ list2, index2, title }) => {
  console.log(`index of ${title} :,${index2 + 2}`);
  console.log(`actual index of ${title} :,${index2}`);

  return (
    <Accordion.Item key={index2} eventKey={`0${index2}`}>
      <Accordion.Header>{list2?.title}</Accordion.Header>
      <Accordion.Body>
        {list2?.subcategories?.length > 0 ? (
          list2?.subcategories?.map((list3, index3) => {
            return (
              <p key={index3} style={{ color: "#b3b3b3" }}>
                {list3?.title}
              </p>
            );
          })
        ) : (
          <p className="mb-0 ">No data avalilable</p>
        )}
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default Subaccordion;
