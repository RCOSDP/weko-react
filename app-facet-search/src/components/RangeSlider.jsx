import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import React, { useState } from "react";

function RangeSlider({ value, name, labels }) {

  function clearUrlSlide() {
    let searchUrl = "";
    if (search.indexOf("&") >= 0) {
      let arrSearch = search.split("&");
      for (let i = 0; i < arrSearch.length; i++) {
        if (arrSearch[i].indexOf(encodeURIComponent(name) + "=") < 0) {
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
    clearUrlSlide();
    let arrShowSlide = Object.keys(marks);
    for (let i = 0; i < arrShowSlide.length; i++) {
      if ((arrShowSlide[i] >= valuelog[0]) && (arrShowSlide[i] <= valuelog[1])) {
        const pattern = encodeURIComponent(name) + "=" + encodeURIComponent(marks[arrShowSlide[i]]);
        search += "&" + pattern;
      }
    }
    window.location.href = "/search" + search;
  }

  function handleGo() {
    clearUrlSlide();
    let valuelog = [parseInt(inputHead), parseInt(inputTail)]
    let arrShowSlide = Object.values(marks);
    for (let i = 0; i < arrShowSlide.length; i++) {
      if ((parseInt(arrShowSlide[i]) >= valuelog[0]) && (parseInt(arrShowSlide[i]) <= valuelog[1])) {
        const pattern = encodeURIComponent(name) + "=" + encodeURIComponent(arrShowSlide[i]);
        search += "&" + pattern;
      }
    }
    window.location.href = "/search" + search;
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
      if (subitem.key.length > 0) {
        parse_Int = parseInt(subitem.key);
        marks_arr.push(parse_Int);
      }
    });
  }
  if (marks_arr.length > 1) {
    // Sort.
    marks_arr.sort();
    distance = 100 / (marks_arr.length - 1);
    for (point_mark in marks_arr) {
      marks[point_mark * distance] = marks_arr[point_mark].toString();
    }
  }

  const [inputHead, setInputHead] = useState(marks_arr[0]);
  const [inputTail, setInputTail] = useState(marks_arr[point_mark]);

  return (
    <div>
      <div className="col-sm-11" style={{ paddingBottom: "20px" }}>
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