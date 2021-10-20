import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import React, { useState } from "react";
import { Collapse } from "reactstrap";
import RangeSelect from "./RangeSelect";
import RangeSlider from "./RangeSlider";

function check_temp(name) {
  return name === "Temporal";
}

function RangeFacet({ item, nameshow, name, key, labels }) {
  const toggle = () => setIsOpen(!isOpen);
  const search = window.location.search.replace(",", "%2C");
  const is_check = search.indexOf(encodeURIComponent(name)) >= 0 ? true : false;
  const [isOpen, setIsOpen] = useState(is_check);
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
          {!check_temp(name) && (
            <RangeSelect values={item.buckets} name={name} labels={labels} />
          )}
          {check_temp(name) && false && (
            <RangeSlider values={item.buckets} name={name} labels={labels} />
          )}
        </div>
      </Collapse>
    </div>
  );
}

export default RangeFacet;
