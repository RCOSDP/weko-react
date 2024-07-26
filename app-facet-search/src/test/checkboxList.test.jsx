import React from "react";
import { fireEvent, render, screen } from '@testing-library/react';
import RangeFacet from "../components/RangeFacet";
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import '../../src/index.css';

test('list test for search function.', () => {
  require ('css.escape');
  const item = {buckets: [{doc_count: 20821, key: 'jpn'},{doc_count: 219, key: 'eng'}]};
  const nameshow = 'デ一タの言語';
  const name = 'Data Language';
  const key = 0;
  const LABELS = {
    Goto: "検索",
    cancel: "cancel",
    facetSliderCorrelationValidation: "範囲fromは範囲to以下にしてください。",
    facetSliderRequiredValidation: "値を設定してください。",
    facetSliderValueValidation: "正しい値を設定してください。",
    search: "検索"};
  const isOpen = true;
  const uiType = 'CheckboxList';
  const displayNumber = 5;

  const {container} = render(<RangeFacet item={item} nameshow={nameshow} name={name} labels={LABELS} isInitOpen={isOpen} uiType={uiType} displayNumber={displayNumber} />);
  const itemElement = container.querySelector('#' + CSS.escape('id_Data Language_chkbox_0'))

  const reSearchInvenio = (search) => {
  }
  window.invenioSearchFunctions = {};
  window.invenioSearchFunctions.reSearchInvenio = reSearchInvenio;
  fireEvent.click(itemElement);
});

test('list test for detail function.', () => {
  require ('css.escape');
  const item = {buckets: [{doc_count: 20821, key: 'jpn'},{doc_count: 219, key: 'eng'}]};
  const nameshow = 'デ一タの言語';
  const name = 'Data Language';
  const key = 0;
  const LABELS = {
    Goto: "検索",
    cancel: "cancel",
    facetSliderCorrelationValidation: "範囲fromは範囲to以下にしてください。",
    facetSliderRequiredValidation: "値を設定してください。",
    facetSliderValueValidation: "正しい値を設定してください。",
    search: "検索"};
  const isOpen = true;
  const uiType = 'CheckboxList';
  const displayNumber = 5;

  const {container} = render(<RangeFacet item={item} nameshow={nameshow} name={name} labels={LABELS} isInitOpen={isOpen} uiType={uiType} displayNumber={displayNumber} />);
  const itemElement = container.querySelector('#' + CSS.escape('id_Data Language_chkbox_0'))

  Object.defineProperty(window, 'location', {
    value: {
      href: ''
    },
    writable: true,
  });
  fireEvent.click(itemElement);
});

test('modal test for search function.', () => {
  require ('css.escape');

  const item = {buckets: [{doc_count: 20821, key: 'jpn'},{doc_count: 219, key: 'eng'}]};
  const nameshow = 'デ一タの言語';
  const name = 'Data Language';
  const key = 0;
  const LABELS = {
    Goto: "検索",
    cancel: "cancel",
    facetSliderCorrelationValidation: "範囲fromは範囲to以下にしてください。",
    facetSliderRequiredValidation: "値を設定してください。",
    facetSliderValueValidation: "正しい値を設定してください。",
    search: "検索"};
  const isOpen = false;
  const uiType = 'CheckboxList';
  const displayNumber = 1;

  const reSearchInvenio = (search) => {
  }
  window.invenioSearchFunctions = {};
  window.invenioSearchFunctions.reSearchInvenio = reSearchInvenio;
  Object.defineProperty(window, 'location', {
    value: {
      search: ''
    },
    writable: true,
  });


  const {container} = render(<RangeFacet item={item} nameshow={nameshow} name={name} labels={LABELS} isInitOpen={isOpen} uiType={uiType} displayNumber={displayNumber} />);
  // open modal
  const linkElement = screen.getByText('. . . See More')
  fireEvent.click(linkElement);

  // check item
  const itemElement = container.querySelector('#' + CSS.escape('id_Data Language_chkbox_mdl_0'))
  itemElement.checked = false;

  // search
  const searchButton = screen.getByRole('button');
  fireEvent.click(searchButton);

  // close modal
  const cancelElement = screen.getByText('cancel')
  fireEvent.click(cancelElement);
});

test('modal test for detail function.', () => {
  require ('css.escape');

  const item = {buckets: [{doc_count: 20821, key: 'jpn'},{doc_count: 219, key: 'eng'}]};
  const nameshow = 'デ一タの言語';
  const name = 'Data Language';
  const key = 0;
  const LABELS = {
    Goto: "検索",
    cancel: "cancel",
    facetSliderCorrelationValidation: "範囲fromは範囲to以下にしてください。",
    facetSliderRequiredValidation: "値を設定してください。",
    facetSliderValueValidation: "正しい値を設定してください。",
    search: "検索"};
  const isOpen = false;
  const uiType = 'CheckboxList';
  const displayNumber = 1;

  window.invenioSearchFunctions = null;
  Object.defineProperty(window, 'location', {
    value: {
      search: '',
      href: ''
    },
    writable: true,
  });

  const {container} = render(<RangeFacet item={item} nameshow={nameshow} name={name} labels={LABELS} isInitOpen={isOpen} uiType={uiType} displayNumber={displayNumber} />);
  // open modal
  const linkElement = screen.getByText('. . . See More')
  fireEvent.click(linkElement);

  // check item
  const itemElement = container.querySelector('#' + CSS.escape('id_Data Language_chkbox_mdl_0'))
  itemElement.checked = true;

  // search
  const searchButton = screen.getByRole('button');
  fireEvent.click(searchButton);

  // close modal
  const cancelElement = screen.getByText('cancel')
  fireEvent.click(cancelElement);
});
