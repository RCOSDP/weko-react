import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import React from "react";
import Select from "react-select";

function RangeSelect({ values, name, labels }) {
  function handleChange(params) {
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
    params.map(function (subitem, k) {
      const pattern =
          encodeURIComponent(name) + "=" + encodeURIComponent(subitem.value);
      search += "&" + pattern;
    });
    search = search.replace("q=0", "q=");
    search += search.indexOf('is_facet_search=') == -1 ? '&is_facet_search=true' : '';
    window.location.href = "/search" + search;
  }

  let search = window.location.search.replace(",", "%2C") || "?";
  let params = window.location.search.substring(1).split('&');
  for (let i = 0; i < params.length; i++) {
    params[i] = decodeURIComponent(params[i]);
  }
  let defaultOptions = [];
  let options = [];
  if (values) {
    values.map(function (subitem, k) {
      let option = {
        label: (labels[subitem.key] || subitem.key) + "(" + subitem.doc_count + ")",
        value: subitem.key
      };
      options.push(option);
      let pattern = name + "=" + subitem.key;
      if (params.indexOf(pattern) != -1) {
        defaultOptions.push(option);
      }
    });
  }
  return (
    <div>
      <div className="select-container">
        <Select
          defaultValue={defaultOptions}
          isMulti
          name="Facet_Search"
          onChange={(_selectedOption) => {
            handleChange(_selectedOption);
          }}
          options={options}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>
    </div>
  );
}

export default RangeSelect;
