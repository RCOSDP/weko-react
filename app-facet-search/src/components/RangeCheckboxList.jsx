import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";
import React, { useState } from "react";
//import reSearchFacet from '../App.js';

/**
 * A UI component that displays faceted items as a list of checkboxes.
 * This part consists of a list portion and a modal portion.
 * 
 * <List part>
 * The List portion displays a list of checkboxes with the number of displayNumber
 * set in the admin panel. If the number of faceted items is greater than the
 * number of displayNumber, a link to display the Modal is displayed.
 * 
 * The checkboxes displayed in the List section are narrowed down by facet item
 * at the same time as Click is performed.
 * 
 * 
 * <Modal part>
 * In the modal section, all faceted items are displayed in a modal. 
 * Since scrolling is used, there is no limit to the number of items.
 * The number of display columns is also changed according to the screen size to be displayed.
 * 
 * In the modal portion, no narrowing is performed until the search button is pressed.
 * Multiple items can be selected and narrowed down in a batch.
 * 
 * The modal portion can be closed by pressing the Cancel button or clicking 
 * on the portion outside the modal. The facet items that were selected before 
 * the refinement are cleared when the modal is closed.
 * 
 * @param {array} values An array consisting of faceted item names (key) and the number of items in the target (doc_count).
 * @param {string} name English name of facet item.
 * @param {array} labels Array of labels used in translation.
 * @param {integer} displayNumber Number of items displayed in the list.
 * 
 * @author knowledge labo yamada
 */
function RangeCheckboxList({ values, name, labels, displayNumber }) {
  const [listCheckedItems, setListCheckedItems] = useState({});

  //If there is a space in the id attribute, it cannot be searched by ID, so escape it.
  let facet_item_id = "id_" + name + "_chkbox";
  let facet_item_id_for_search = CSS.escape(facet_item_id);

  /**
   * Returns the DOM representing the checkbox.
   * 
   * @param {string} id ID of the checkbox.
   * @param {string} value Value of the checkbox.
   * @param {boolean} checked The selected state of the checkbox.
   * @param {function} onChange Process when the check box is clicked, which is set only when List is displayed.
   * @returns DOM representing a checkbox.
   */
  const CheckBox = ({ id, value, checked, onChange}) => {
    if(onChange !=null) {
      //for lists
      listCheckedItems[id] = checked;
      return (
        <input
          id={id}
          className="facet-chbox"
          type="checkbox"
          checked={listCheckedItems[id]}
          onChange={onChange}
          value={value}
        />
      )
    } else {
      //for Modal
      return (
        <input
          id={id}
          className="facet-chbox"
          type="checkbox"
          defaultChecked={checked}
          value={value}
        />
      )
    }

  }

  /**
   * Returns the DOM of a list of checkboxes.
   * This function is used for both List and Modal. The parameter isModal controls which use is made of this function.
   * 
   * @param {array} values An array consisting of faceted item names (key) and the number of items in the target (doc_count).
   * @param {string} name English name of facet item.
   * @param {bool} isModal True for modal use. false for list use.
   * @param {integer} displayNumber Number of items displayed in the list.
   * @param {function} onChange Process when the check box is clicked, which is set only when List is displayed.
   * @returns DOM representing a checkbox list.
   */
  const CheckBoxList = ({ values, name, isModal, displayNumber, onChange}) => {
    return (
      values.map((subitem,index) => {
        if (isModal || index < displayNumber) {
          let id = "id_" + name + (isModal ? "_chkbox_mdl_" : "_chkbox_") + index;
          let label = subitem.key + "(" + subitem.doc_count + ")";
          let checked = search.get(name) &&  search.getAll(name).includes(subitem.key);
          return (
            <div key={id}>
              <label htmlFor={id} >
                <CheckBox id={id} value={subitem.key} checked={checked} key={id} onChange={onChange} />
                {label}
              </label>
            </div>
          )
        }
      })
    )
  }

  /**
   * Returns the modal DOM.
   * 
   * @param {array} values An array consisting of faceted item names (key) and the number of items in the target (doc_count).
   * @param {string} name English name of facet item.
   * @param {bool} modalId ID set for the modal.
   * @returns Modal DOM
   */
  const ModalCheckboxList = ({ values, name, modalId }) => {
    return (
      <div key={modalId} className="chbox-mdl" id={modalId}>
        <a className="overlay" onClick={closeModal} modalId={modalId}></a>
        <div className="window">
          <div className="content">
            <div className="list">
              <CheckBoxList values={values} name={name} isModal={true} />
            </div>
            <div className="footer">
              <a onClick={closeModal} modalId={modalId}>{labels['cancel']}</a>
              <button type="button" className="btn btn-primary" onClick={handleModalListChange} modalId={modalId}>{labels['search']}</button>
            </div>
          </div>
        </div>
      </div>
    )
  };

  /**
   * Called to close the modal.
   */
  function closeModal(e){
    if(e == null){
      return;
    }
    document.getElementById(e.target.getAttribute('modalId')).classList.remove("is-active");
  }

  /**
   * Called to open a modal.
   * Reconfigure it to select only the checkboxes that have been narrowed down 
   * from the parameters of the URL at the time before displaying.
   */
  function openModal(e){

    if(e == null){
        console.log("event == null" );
        return;
    }
    document.getElementById(e.target.getAttribute('modalId')).classList.add("is-active");
    document.querySelector('#' + facet_item_id_for_search).querySelectorAll('.chbox-mdl input').forEach(el => {
      //el.checked = params.indexOf(name + "=" + el.value)!= -1;
      el.checked = search.get(name) &&  search.getAll(name).includes(el.value);
    });
  }

  /**
   * Processing when a check box is selected when the List is displayed. The search items of 
   * the newly selected check box are added to the parameter to narrow down the search.
   */
  function handleListChange(e) {
    const targets = [];
    document.querySelector('#' + facet_item_id_for_search).querySelectorAll('.chbox-mdl input').forEach(el => {
      if((el.checked && e.target.value !== el.value) || (e.target.checked && e.target.value === el.value)){
        targets.push({label: name, value: el.value});
      }
    });
    setListCheckedItems({...listCheckedItems, [e.target.id]: e.target.checked});
    executeSearch(targets);
  }
  
  /**
   * When the search button is pressed during modal display, a callout difference srere. 
   * The search item for the newly selected check box is added to the parameters and a narrowed search is performed.
   */
  function handleModalListChange(e) {
    const targets = [];
    document.querySelector('#' + facet_item_id_for_search).querySelectorAll('.chbox-mdl input').forEach(el => {
      if(el.checked){
        targets.push({label: name, value: el.value});
      }else if(listCheckedItems[el.id]){
        setListCheckedItems({...listCheckedItems, [el.id]: el.checked});
      }
    });
    executeSearch(targets);
    document.getElementById(e.target.getAttribute('modalId')).classList.remove("is-active");
  }
  
  /**
   * Narrowing is performed based on the narrowing target specified in this facet item.
   * Parameters other than this facet item are used as is.
   * 
   * @param {array} targets Parameters to be refined by this facet item.
   */
  function executeSearch(targets) {
    search.delete(name);

    targets.map(function (subitem, k) {
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
  let modalId = "id_" + name + "_checkbox_modal";

  let dp = displayNumber == null ? 5 : displayNumber;
  return (
    <div id={facet_item_id}>
      <div className="chbox-container">
        <CheckBoxList values={values} name={name} isModal={false} displayNumber={dp} onChange={handleListChange}/>
        {values.length > dp &&
          <a onClick={openModal} modalId={modalId} >. . . See More</a>
        }
        <ModalCheckboxList values={values} name={name} modalId={modalId} displayNumber={displayNumber}/>
      </div>
    </div>
  );
}

export default RangeCheckboxList;
