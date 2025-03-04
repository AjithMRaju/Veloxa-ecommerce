import { useState } from "react";
import { BiSolidCategory } from "react-icons/bi";
import { headerNavigation } from "../../../Utils/Data/Data";

import Accordion from "react-bootstrap/Accordion";
import Subaccordion from "../../SubAccordion/Subaccordion";
import Offcanvas from "react-bootstrap/Offcanvas";

const CartOffcanvas = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div
        onClick={handleShow}
        className="d-flex flex-column align-items-center position-relative"
      >
        <BiSolidCategory size={25} />        
      </div>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Category</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Accordion defaultActiveKey="0">
            {headerNavigation?.map((list, index1) => {
              return (
                <Accordion.Item eventKey={index1} key={index1} className="mb-4">
                  <Accordion.Header>{list?.title}</Accordion.Header>
                  <Accordion.Body>
                    {list?.subcategories?.map((list2, index2) => {
                      return (
                        <Subaccordion
                          list2={list2}
                          key={index2}
                          index2={index2}
                          title={list2?.title}
                        />
                      );
                    })}
                  </Accordion.Body>
                </Accordion.Item>
              );
            })}
          </Accordion>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default CartOffcanvas;
