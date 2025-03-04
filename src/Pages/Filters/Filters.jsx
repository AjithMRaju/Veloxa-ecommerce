/* eslint-disable react/prop-types */
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Checkbox, FormControlLabel } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { IoIosArrowDown } from "react-icons/io";
// ---
import { useSelector } from "react-redux";
import { selectProductListingLoading } from "../../Utils/Redux/productSlice";
import { filterItems } from "../../Utils/Data/Data";
import { useState } from "react";

const Filters = ({ fectProductsByCategory }) => {
  const loading = useSelector(selectProductListingLoading);

  //---
  const [selectedFilters, setSelectedFilters] = useState({});
  const [expanded, setExpanded] = useState([0, 1]);

  //   ACCORDION 2 CHILDS OPENING BY DEFAULT
  const handleAccordionChange = (index) => {
    setExpanded(
      (prevExpanded) =>
        prevExpanded.includes(index)
          ? prevExpanded.filter((item) => item !== index) // Collapse if already expanded
          : [...prevExpanded, index] // Expand if not already expanded
    );
  };

  //   STORING SELECTED FILTERS
  const handleCheckboxChange = (category, value) => {
    setSelectedFilters((prevFilters) => {
      const categoryFilters = prevFilters[category] || [];
      if (categoryFilters.includes(value)) {
        // Remove the value if already selected
        return {
          ...prevFilters,
          [category]: categoryFilters.filter((item) => item !== value),
        };
      } else {
        // Add the value if not already selected
        return {
          ...prevFilters,
          [category]: [...categoryFilters, value],
        };
      }
    });
  };

  //   APPLYING FILTERS
  const handleFilter = () => {
    fectProductsByCategory("products/category/electronics");
  };

  return (
    <div className="mb-5 border-end pe-lg-3">
      {filterItems.map((filter, index) => (
        <Accordion
          key={index}
          sx={{ boxShadow: "none", borderBottom: "none" }}
          defaultExpanded={["0", "1"]}
          expanded={expanded.includes(index)}
          onChange={() => handleAccordionChange(index)}
        >
          <AccordionSummary
            expandIcon={<IoIosArrowDown />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            {loading ? (
              <Skeleton animation="wave" width={80} />
            ) : (
              <Typography>{filter.headline}</Typography>
            )}
          </AccordionSummary>
          <AccordionDetails>
            {loading ? (
              <div>
                <CheckboxLoading count="4" />
              </div>
            ) : (
              <>
                {filter.options.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    control={
                      <Checkbox
                        checked={
                          selectedFilters[filter.headline]?.includes(
                            option.value
                          ) || false
                        }
                        onChange={() =>
                          handleCheckboxChange(filter.headline, option.value)
                        }
                        sx={{
                          color: "#6441c7", // Default color
                          "&.Mui-checked": {
                            color: "#6441c7", // Color when checked
                          },
                        }}
                      />
                    }
                    label={option.label}
                  />
                ))}
              </>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
      <div className="mt-4 w-100 d-flex justify-content-between filter-sticky px-2 px-lg-0">
        <button className=" filterClear-btn">Clear All</button>
        <button className="filterApply-btn" onClick={handleFilter}>
          Apply
        </button>
      </div>
      <div className="space d-lg-block"></div>
    </div>
  );
};

export default Filters;

export const CheckboxLoading = ({ count }) => {
  return (
    <>
      {Array.from({ length: count }).map((_i) => {
        return (
          <div className="d-flex mb-2" key={_i}>
            <Skeleton variant="rectangular" width={24} height={24} />
            <Skeleton
              variant="text"
              width={100}
              height={24}
              style={{ marginLeft: 8 }}
            />
          </div>
        );
      })}
    </>
  );
};
