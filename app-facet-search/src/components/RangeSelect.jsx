import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import React from "react";
import Select from "react-select";

function RangeSelect({ values, name, labels }) {

  //If there is a space in the id attribute, it cannot be searched by ID, so escape it.
  let facet_item_id = "id_" + name + "_select";

  function handleChange(params) {
    search.delete(name);
    
    params.map(function (subitem, k) {
      search.append(name, subitem.value);
    });

    if(search.get('q') === '0') search.set('q', '');
    search.set('is_facet_search', 'true');
    if(window.invenioSearchFunctions) {
      window.invenioSearchFunctions.reSearchInvenio(search);
    }else{
      window.location.href = "/search?" + search;
    }
  }

  let search = new URLSearchParams(window.location.search);

  let defaultOptions = [];
  let options = [];
  if (values) {
    values.map(function (subitem, k) {
      let option = {
        label: (labels[subitem.key] || subitem.key) + "(" + subitem.doc_count + ")",
        value: subitem.key
      };
      options.push(option);
      if (search.get(name) &&  search.getAll(name).includes(subitem.key)) {
        defaultOptions.push(option);
      }
    });
  }

  return (
    <div id={facet_item_id}>
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
          options={options}
          className="basic-multi-select"
          classNamePrefix="select"
        />
      </div>
    </div>
  );
}

export default RangeSelect;
