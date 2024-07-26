import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import React, { useState } from "react";

function RangeSlider({ value, name, labels}) {
  //If there is a space in the id attribute, it cannot be searched by ID, so escape it.
  let facet_item_id = "id_" + name + "_slider";

  function validateInputIsOk() {
    let headComp = document.getElementById(facet_item_id + "_input_head");
    let tailComp = document.getElementById(facet_item_id + "_input_tail");

    // Clear error information
    setHeadStyle('form-control');
    setTailStyle('form-control');
    setErrMsg('');

    // Required Check
    if(!headComp.value || !tailComp.value){
      if(!headComp.value) {
        setHeadStyle('form-control range-slider-error');
      }
      if(!tailComp.value) {
        setTailStyle('form-control range-slider-error');
      }
      setErrMsg(labels['facetSliderRequiredValidation']);
      return false;
    }
    // Numerical input check
    let pattern = new RegExp(/^([1-9]\d*|0)$/);
    let headResult = pattern.exec(inputHead);
    let tailResult = pattern.exec(inputTail);

    if(headResult == null || headResult[0] != inputHead ||
        tailResult == null || tailResult[0] != inputTail) {
      if(headResult == null || headResult[0] != inputHead) {
        setHeadStyle('form-control range-slider-error');
      }
      if(tailResult == null || tailResult[0] != inputTail) {
        setTailStyle('form-control range-slider-error');
      }
      setErrMsg(labels['facetSliderValueValidation']);
      return false;
    }

    // Correlation Check
    if(parseFloat(inputHead) > parseFloat(inputTail)) {
      setHeadStyle('form-control range-slider-error');
      setTailStyle('form-control range-slider-error');
      setErrMsg(labels['facetSliderCorrelationValidation']);
      return false;
    }
    // Clear error information
    setHeadStyle('form-control');
    setTailStyle('form-control');
    setErrMsg('');
    return true;
  }

  function handleSlide(valuelog) {
    setSliderValues([valuelog[0],valuelog[1]]);
    if(inputHead != valuelog[0]) {
      setInputHead(Math.round(valuelog[0]));
    }
    if(inputTail != valuelog[1]) {
      setInputTail(Math.round(valuelog[1]));
    }
  }

  function handleGo() {
    if(!validateInputIsOk()) {
      return;
    }
    search.set(name, inputHead + '--' + inputTail);

    if(search.get('q') === '0') search.set('q', '');
    search.set('is_facet_search', 'true');
    if(window.invenioSearchFunctions) {
      window.invenioSearchFunctions.reSearchInvenio(search);
    }else{
      window.location.href = "/search?" + search;
    }
  }

  let search = new URLSearchParams(window.location.search);

  let minValue = null;
  let maxValue = null;
  if(search.get(name) != null) {
    const paramValues = search.get(name).split('--');
    minValue = parseInt(paramValues[0]);
    maxValue = parseInt(paramValues[1]);
  } else if(value) {
    value.map(function (subitem, k) {
      let parse_Int;
      if (subitem.key.includes('/')) {
        let value1 = subitem.key.split('/')[0];
        parse_Int = parseInt(value1);
        if(minValue == null || minValue > parse_Int) {
          minValue = parse_Int;
        }
        if(maxValue == null || maxValue < parse_Int) {
          maxValue = parse_Int;
        }
        let value2 = subitem.key.split('/')[1];
        parse_Int = parseInt(value2);
        if(minValue == null || minValue > parse_Int) {
          minValue = parse_Int;
        }
        if(maxValue == null || maxValue < parse_Int) {
          maxValue = parse_Int;
        }
      }
      if (subitem.key.length > 0) {
        parse_Int = parseInt(subitem.key);
        if(minValue == null || minValue > parse_Int) {
          minValue = parse_Int;
        }
        if(maxValue == null || maxValue < parse_Int) {
          maxValue = parse_Int;
        }
      }
    });
  }
  let step = (maxValue - minValue)/100;

  const [sliderValues, setSliderValues] = useState([minValue,maxValue]);
  const [inputHead, setInputHead] = useState(minValue);
  const [inputTail, setInputTail] = useState(maxValue);
  const [headStyle, setHeadStyle] = useState('form-control');
  const [tailStyle, setTailStyle] = useState('form-control');
  const [errMsg, setErrMsg] = useState('');

  const clearSliderValue = () => {
    // Information reconfiguration when recalled
    setSliderValues([minValue, maxValue]);
    setInputHead(minValue);
    setInputTail(maxValue);
    setHeadStyle('form-control');
    setTailStyle('form-control');
    setErrMsg('');
  }
  window.facetSearchFunctions[name + '_clearSliderValue'] = clearSliderValue;

  return (
    <div id={facet_item_id}>
      <div className="col-sm-11" style={{ paddingBottom: "20px", "white-space": "nowrap" }}>
        <Slider range min={minValue} max={maxValue} step={step} onChange={handleSlide} defaultValue={sliderValues} value={sliderValues} />
      </div>
      <div className="form-group row">
        <div className="col-sm-5">
          <input type="number" id={facet_item_id + "_input_head"} className={headStyle}
            value={inputHead}
            onChange={e => setInputHead(e.target.value.slice(0, 4))}
          />
        </div>
        <div className="col-sm-5">
          <input type="number" id={facet_item_id + "_input_tail"} className={tailStyle}
            value={inputTail}
            onChange={e => setInputTail(e.target.value.slice(0, 4))}
          />
        </div>
        <div className="col-sm-2">
          <button type="button" style={{ marginLeft: "3px" }}
            className="btn btn-primary pull-right"
            onClick={handleGo}> {labels['Goto']}
          </button>
        </div>
      </div>
      <div className="range-slider-error-msg" id={facet_item_id + "_msg"}>{errMsg}</div>
    </div>
  )
}

export default RangeSlider;
