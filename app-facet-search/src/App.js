import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import './index.css';
import React from "react";
import fetch from "unfetch";
import RangeFacet from "./components/RangeFacet";

//Get all labels.
const LABELS = {};
let labels = document.getElementsByClassName("body-facet-search-label");
for (let i = 0; i < labels.length; i++) {
  LABELS[labels[i].id] = labels[i].value;
}

class FacetSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_enable: false,
      list_title: {},
      list_facet: {},
      list_order: {},
      list_uiType: {},
      list_isOpen: {},
      list_displayNumber: {}
    };
    this.getTitleAndOrder = this.getTitleAndOrder.bind(this);
    this.get_facet_search_list = this.get_facet_search_list.bind(this);
    this.convertData = this.convertData.bind(this);
  }

  getTitleAndOrder() {
    let titleLst = {};
    let orderLst = {};
    let uiTypeLst = {};
    let isOpenLst = {};
    let displayNumberLst = {};
    return fetch("/facet-search/get-title-and-order", {method: "POST"})
      .then((r) => r.json())
      .then((response) => {
        if (response.status) {
          titleLst = response.data.titles;
          orderLst = response.data.order;
          uiTypeLst = response.data.uiTypes;
          isOpenLst = response.data.isOpens;
          displayNumberLst = response.data.displayNumbers;
        }
        this.setState({ list_title: titleLst });
        this.setState({ list_order: orderLst });
        this.setState({ list_uiType: uiTypeLst });
        this.setState({ list_isOpen: isOpenLst });
        this.setState({ list_displayNumber: displayNumberLst });
      });
  }

  get_facet_search_list(key) {
        let search = new URLSearchParams(window.location.search);
        let convert_data;
        if(Array.isArray(key) > 1 && key.length ){
          key = key.join(",")
        }
        return fetch(`/api/facet-search/condition${'?' + 'key=' + key + '&' + search.toString()}`, {method: "GET"})
          .then((r) => r.json())
          .then((res) => {
            convert_data = this.convertData(res);
            return convert_data;
          });
  }

  convertData(data) {
    let list_facet = {};
    if (data) {
      Object.keys(data).map(function (name, k) {
        let hasName = data.hasOwnProperty(name);
        if (hasName) {
          list_facet[name] = data[name];
          // Commented out as it is being corrected in JDCat.
          // //START:temporary fix for JDCat
          // if (name != "Time Period(s)" && name != "Data Language" && name != "Access") {
      	  //   let e = document.getElementById('lang-code');
      	  //   let l = e.options[e.selectedIndex].value;
      	  //   let tmp = list_facet[name];
      
      	  //   for (let i = 0; i < tmp.buckets.length; i++) {
      	  //     let a = tmp.buckets[i];
      
      	  //     if ((l == "en") && ((a.key).charCodeAt(0) > 256 || (a.key).charCodeAt(a.key.length - 1) > 256)) {
      	  //   	//delete list_facet[name].buckets[i];
          //     list_facet[name].buckets.splice(i,1);
          //     i--;
      	  //     } else if ((l != "en") && ((a.key).charCodeAt(0) < 256 && (a.key).charCodeAt(a.key.length - 1) < 256)) {
      	  //   	//delete list_facet[name].buckets[i];
          //     list_facet[name].buckets.splice(i,1);
          //     i--;
      	  //     }
      	  //   }
          // }
          // if (name == "Access"){
      	  //   let tmp = list_facet[name];
      
      	  //   for (let i = 0; i < tmp.buckets.length; i++) {
      	  //     let a = tmp.buckets[i];
      
      	  //     if (((a.key).charCodeAt(0) > 256 || (a.key).charCodeAt(a.key.length - 1) > 256)) {
      	  //   	  //delete list_facet[name].buckets[i];
          //       list_facet[name].buckets.splice(i,1);
          //       i--;
      	  //     } 
      	  //   }
          // }
          // //END:temporary fix for JDCat
        }
      });
    }
    this.setState({list_facet: list_facet});
    return list_facet;
  }

  componentDidMount() {
    const self = this;
    let params = window.location.search.substring(1).split('&');
    for (let i = 0; i < params.length; i++) {
      params[i] = decodeURIComponent(params[i]);
    }
    this.getTitleAndOrder()
      .then(data => {
        const { list_order, list_uiType} = this.state;
        let use_facet_name = []
        {Object.keys(list_order).map(function (order) {
          const name = list_order[order];
          // Check if any element in the 'params' array includes the string 'name'
          const isEnabledFacetSearch = params.some(item => item.includes(name));
          if(isEnabledFacetSearch || list_uiType[name] === "CheckboxList" || list_uiType[name] === "RangeSlider"){
            use_facet_name.push(name)
          }
        })}
        const isRecordsPath = window.location.pathname.split('/')[1].includes('records');
        // Determine API firing
        if(use_facet_name.length > 0 && !isRecordsPath){
          self.get_facet_search_list(use_facet_name)
            .then(data => {
              self.setState({ is_enable: true });
            })
        }
        else{
          self.setState({ is_enable: true });
        }
      })
      .catch(error => {
        console.error('getTitleAndOrder error occurred:', error);
      });
  }

  render() {
    const { is_enable, list_title, list_facet, list_order, list_uiType, list_isOpen, list_displayNumber } = this.state;
    return (
      <div>
        {is_enable && (
          <div className="facet-search break-word">
            {Object.keys(list_order).map(function (order, key) {
              const name = list_order[order];
              const item = list_facet[name];
              const nameshow = list_title[name];
              const isOpen = list_isOpen[name];
              const uiType = list_uiType[name];
              const displayNumber = list_displayNumber[name];
              return (
                <RangeFacet item={item} nameshow={nameshow} name={name} key={key} labels={LABELS} isInitOpen={isOpen} uiType={uiType} displayNumber={displayNumber} />
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default FacetSearch;
