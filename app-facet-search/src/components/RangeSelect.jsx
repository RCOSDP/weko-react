import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import React, { useState } from "react";
import Select from "react-select";
import FacetSearch from "../App.js"

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

  // Checking if each element in the 'params' array matches a specific regular expression pattern (name).
  let usedFacetParams = [];
  const regex = new RegExp(name);
  params.forEach(value => {
      if (regex.test(value)) {
          usedFacetParams.push(value);
      }
  });

  let defaultOptions = [];
  let options = []; 
  if (values){
    values.map(function (subitem) {
      let option = {
        label: (labels[subitem.name] || subitem.name) + "(" + subitem.count + ")",
        value: subitem.name
      };
      options.push(option);
      let pattern = name + "=" + subitem.name;
      if (params.indexOf(pattern) != -1) {
        defaultOptions.push(option);
      }
      // Find for the index of a specific element ('pattern') within the 'usedFacetParams' array.
      let index = usedFacetParams.findIndex(item => item === pattern);
      if (index !== -1) {
        usedFacetParams.splice(index, 1);
      }
    });
  }
  // Processing when there are no search results and facet search parameters exist
  if(usedFacetParams.length > 0){
    usedFacetParams.forEach(value => {
      let defaultOption = {
        label: value.split('=')[1] + '(0)',
        value: value.split('=')[1]
      };
      defaultOptions.push(defaultOption);
  });
  }

  let [stateOptions, setOptions] = useState(options);
  const [isFirstClick, setIsFirstClick] = useState(true);
  const FacetSearchInstance = new FacetSearch();
  const isEnabledFacetSearch = params.some(item => item.includes(name));

  // Get options on click
  const loadOptions = () => {
      if (isFirstClick) {
        setIsFirstClick(false);
        if (!isEnabledFacetSearch){
          FacetSearchInstance.get_facet_search_list(name)
          .then((result) => {
            let list_facet = result
            const values = list_facet[name];
            let options = [];
            if (values) {
              values.map(function (subitem) {
                let option = {
                  label: (labels[subitem.name] || subitem.name) + "(" + subitem.count + ")",
                  value: subitem.name
                };
                options.push(option);
              });
            }
            setOptions(options);
          })
          .catch((error) => {
            console.error('loadOptions error occurred:', error);
          });
          }
      }
  };
  
  return (
    <div>
      <div className="select-container">
        <Select
          defaultValue={defaultOptions}
          isMulti
          name="Facet_Search"
          ontrolShouldRenderValue={false} 
          onChange={(_selectedOption) => {
            handleChange(_selectedOption);
          }}
          backspaceRemovesValue={false}
          isClearable={false}
          options={stateOptions}
          onMenuOpen={loadOptions}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>
    </div>
  );
}

export default RangeSelect;
