/* eslint-disable react/prop-types */
import { Skeleton } from "@mui/material";
import { Fragment } from "react";
import { Col } from "react-bootstrap";

const ProductLoadingSkull = ({skullCount}) => {
  return (
    <Fragment>
      {Array.from({ length: skullCount }).map((_, index) => (
        <Col key={index} sx={2} md={2} lg={3} className="mb-5">
          <Skeleton variant="rectangular" width="100%" height={200} />
          <Skeleton />
          <Skeleton width="60%" />
        </Col>
      ))}
    </Fragment>
  );
};

export default ProductLoadingSkull;
