import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const steps = [
  {
    label: " Order Placed",
    description: `The customer has successfully placed the order and received an order confirmation. Payment has been processed if applicable.`,
  },
  {
    label: "Order Confirmed",
    description:
      "The store has confirmed the order and is preparing it for processing.",
  },
  {
    label: "Processing Order",
    description: `The order is being processed. Items are being picked, packed, or prepared for shipping.`,
  },
  {
    label: "Shipped",
    description: `The order has been dispatched from the warehouse and is in transit. A tracking number is usually provided.`,
  },
  {
    label: "In Transit",
    description: `The package is on its way to the delivery address. It may pass through multiple checkpoints.`,
  },
  {
    label: "Out for Delivery",
    description: `The package has reached the final delivery hub and is with the delivery agent for delivery.`,
  },
  {
    label: " Delivered",
    description: `The package has been successfully delivered to the customer.`,
  },
];

export default function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(1);

  // const handleNext = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep + 1);
  // };

  // const handleBack = () => {
  //   setActiveStep((prevActiveStep) => prevActiveStep - 1);
  // };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === steps.length - 1 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography variant="body1">{step.description}</Typography>
              {/* <Box sx={{ mb: 2 }}>
                <Button
                  //   variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 1, mr: 1, background: "green", color: "#fff" }}
                >
                  {index === steps.length - 1 ? "Finish" : "Continue"}
                </Button>
                <Button
                  disabled={index === 0}
                  onClick={handleBack}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Back
                </Button>
              </Box> */}
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}
