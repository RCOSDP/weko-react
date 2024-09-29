import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import React, { useState } from "react";

function RangeSlider({ value, name, labels }) {

  function checkFormat(date) {
    let pattern = new RegExp(/^(\d{8})|(\d{6})|(\d{4})$/);
    let match = pattern.exec(date);
    let result = false;
    if (match.length > 0) {
      if (date == match[0]) {
        result = true;
      }
    }
    return result;
  }

  function clearUrlSlide() {
    let searchUrl = "";
    if (search.indexOf("&") >= 0) {
      let arrSearch = search.split("&");
      console.log(arrSearch)
      for (let i = 0; i < arrSearch.length; i++) {
        if (arrSearch[i].indexOf(encodeURIComponent("date_range1_from") + "=") < 0 &&
            arrSearch[i].indexOf(encodeURIComponent("date_range1_to") + "=") < 0) {
          searchUrl += "&" + arrSearch[i];
        }
      }
      //Delete "&" in First element
      searchUrl = searchUrl.substring(1);
    }
    if (searchUrl != "") {
      search = searchUrl;
    }
  }

  function handleSlide(valuelog) {
    setInputHead(marks[valuelog[0]]);
    setInputTail(marks[valuelog[1]]);
  }

  function handleGo() {
    clearUrlSlide();
    let inputHeadVal = parseInt(inputHead);
    let inputTailVal = parseInt(inputTail);
    let pattern = "";
    if (inputHeadVal && checkFormat(inputHeadVal)) {
      pattern += "&" + encodeURIComponent("date_range1_from") + "=" + encodeURIComponent(inputHeadVal);
    }
    if (inputTailVal && checkFormat(inputTailVal)) {
      pattern += "&" + encodeURIComponent("date_range1_to") + "=" + encodeURIComponent(inputTailVal);
    }
    if (pattern) {
      search += pattern;
      window.location.href = "/search" + search;
    }
  }
  let marks = {};
  let distance;
  // Put to Matks
  let point_mark;
  let marks_arr = [];
  let search = window.location.search.replace(",", "%2C") || "?";
  if (value) {
    value.map(function (subitem, k) {
      let parse_Int;
      if (subitem.name.length > 0) {
        parse_Int = parseInt(subitem.name);
        marks_arr.push(parse_Int);
      }
    });
  }
  if (marks_arr.length > 1) {
    // Sort.
    marks_arr.sort();
	marks_arr =  Array.from(new Set(marks_arr))
    distance = 100 / (marks_arr.length - 1);
    for (point_mark in marks_arr) {
		marks[point_mark * distance] = marks_arr[point_mark].toString();
    }
  }

  const [inputHead, setInputHead] = useState(marks_arr[0]);
  const [inputTail, setInputTail] = useState(marks_arr[point_mark]);

  return (
    <div>
      <div className="col-sm-11" style={{ paddingBottom: "20px", "white-space": "nowrap" }}>
        <Slider.Range min={0} marks={marks} step={distance} onChange={handleSlide} defaultValue={[0, 100]} />
      </div>
      <div className="form-group row">
        <div className="col-sm-5">
          <input type="number" id="input_head" className="form-control"
            value={inputHead}
            onChange={e => setInputHead(e.target.value)}
          />
        </div>
        <div className="col-sm-5">
          <input type="number" id="input_tail" className="form-control"
            value={inputTail}
            onChange={e => setInputTail(e.target.value)}
          />
        </div>
        <div className="col-sm-2">
          <button type="button" style={{ marginLeft: "3px" }}
            className="btn btn-primary pull-right"
            onClick={handleGo}> {labels['Goto']}
          </button>
        </div>
      </div>
    </div>
  )
}

export default RangeSlider;
