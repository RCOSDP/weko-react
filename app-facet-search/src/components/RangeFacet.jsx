import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import React, { useState } from "react";
import { Collapse } from "reactstrap";
import RangeSelect from "./RangeSelect";
import RangeSlider from "./RangeSlider";
import RangeCheckboxList from "./RangeCheckboxList";

function RangeFacet({ item, nameshow, name, key, labels, isInitOpen, uiType, displayNumber }) {
  const toggle = () => setIsOpen(!isOpen);
  const search = window.location.search.replace(",", "%2C");
  const is_check = search.indexOf(encodeURIComponent(name)) >= 0 ? true : isInitOpen;
  const [isOpen, setIsOpen] = useState(is_check);
  const isRecordsPath = window.location.pathname.split('/')[1].includes('records');
  return (
    <div className="panel panel-default" key={key}>
      <div className="panel-heading clearfix">
        <h3 className="panel-title pull-left">{nameshow}</h3>
          <a className="pull-right" onClick={toggle}>
          {!isOpen && (
            <span>
              <i className="glyphicon glyphicon-chevron-right"></i>
            </span>
          )}
          {isOpen && (
            <span>
              <i className="glyphicon glyphicon-chevron-down"></i>
            </span>
          )}
        </a>
      </div>
      <Collapse isOpen={isOpen}>
        <div className="panel-body index-body">
          {!isRecordsPath && uiType === "SelectBox" && (
            <RangeSelect values={item} name={name} labels={labels} />
          )}
          {item != null && !isRecordsPath && uiType === "CheckboxList" &&  (
            <RangeCheckboxList values={item} name={name} labels={labels} displayNumber={displayNumber} />
          )}
          {item != null && !isRecordsPath && uiType === "RangeSlider" && (
            <RangeSlider value={item} name={name} labels={labels} />
          )}
        </div>
      </Collapse>
    </div>
  );
}

export default RangeFacet;
