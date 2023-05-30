import React from "react";
import { fireEvent, render, screen, createEvent } from '@testing-library/react';
import RangeFacet from "../components/RangeFacet";
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import '../../src/index.css';

test('slider test for search function.', () => {
  require ('css.escape');
  window.facetSearchFunctions = {};
  const item = {buckets: [{doc_count: 1454, key: '1926'},{doc_count: 1445, key: '1927'},{doc_count: 1374, key: '1928'},{doc_count: 27, key: '2003'}]};
  const nameshow = '対象時期';
  const name = 'Time Period(s)';
  const key = 0;
  const LABELS = {
    Goto: "検索",
    cancel: "cancel",
    facetSliderCorrelationValidation: "範囲fromは範囲to以下にしてください。",
    facetSliderRequiredValidation: "値を設定してください。",
    facetSliderValueValidation: "正しい値を設定してください。",
    search: "検索"};
  const isOpen = true;
  const uiType = 'RangeSlider';
  const displayNumber = null;

  const reSearchInvenio = (search) => {
  }
  window.invenioSearchFunctions = {};
  window.invenioSearchFunctions.reSearchInvenio = reSearchInvenio;

  const {container} = render(<RangeFacet item={item} nameshow={nameshow} name={name} labels={LABELS} isInitOpen={isOpen} uiType={uiType} displayNumber={displayNumber} />);
  // search
  const searchButton = screen.getByRole('button');
  fireEvent.click(searchButton);

  Object.defineProperty(window, 'location', {
    value: {
      search: '?q=0&Time Period(s)=1940--2015',
      href: ''
    },
    writable: true,
  });
  fireEvent.click(searchButton);

  window.facetSearchFunctions['Time Period(s)_clearSliderValue']()
});

test('slider test for detail function.', () => {
  require ('css.escape');
  window.facetSearchFunctions = {};
  const item = {buckets: [{doc_count: 1454, key: '1926'},{doc_count: 1445, key: '1927'},{doc_count: 1374, key: '1928'},{doc_count: 27, key: '2003'}]};
  const nameshow = '対象時期';
  const name = 'Time Period(s)';
  const key = 0;
  const LABELS = {
    Goto: "検索",
    cancel: "cancel",
    facetSliderCorrelationValidation: "範囲fromは範囲to以下にしてください。",
    facetSliderRequiredValidation: "値を設定してください。",
    facetSliderValueValidation: "正しい値を設定してください。",
    search: "検索"};
  const isOpen = true;
  const uiType = 'RangeSlider';
  const displayNumber = null;

  window.invenioSearchFunctions = null;
  Object.defineProperty(window, 'location', {
    value: {
      search: '?q=0&Time Period(s)=1940--2015',
      href: ''
    },
    writable: true,
  });

  const {container} = render(<RangeFacet item={item} nameshow={nameshow} name={name} labels={LABELS} isInitOpen={isOpen} uiType={uiType} displayNumber={displayNumber} />);
  // search
  const searchButton = screen.getByRole('button');
  fireEvent.click(searchButton);

  window.facetSearchFunctions['Time Period(s)_clearSliderValue']()
});

test('validation test', () => {
  require ('css.escape');
  window.facetSearchFunctions = {};
  const item = {buckets: [{doc_count: 1454, key: '1926'},{doc_count: 1445, key: '1927'},{doc_count: 1374, key: '1928'},{doc_count: 27, key: '2003'}]};
  const nameshow = '対象時期';
  const name = 'Time Period(s)';
  const key = 0;
  const LABELS = {
    Goto: "検索",
    cancel: "cancel",
    facetSliderCorrelationValidation: "範囲fromは範囲to以下にしてください。",
    facetSliderRequiredValidation: "値を設定してください。",
    facetSliderValueValidation: "正しい値を設定してください。",
    search: "検索"};
  const isOpen = true;
  const uiType = 'RangeSlider';
  const displayNumber = null;

  const {container} = render(<RangeFacet item={item} nameshow={nameshow} name={name} labels={LABELS} isInitOpen={isOpen} uiType={uiType} displayNumber={displayNumber} />);

  const searchButton = screen.getByRole('button');
  const headElement = container.querySelector('#' + CSS.escape('id_Time Period(s)_slider_input_head'));
  const tailElement = container.querySelector('#' + CSS.escape('id_Time Period(s)_slider_input_tail'));

  // must validation
  headElement.value = '';
  tailElement.value = '';
  fireEvent.click(searchButton);

  // number vlidation
  fireEvent.change(headElement, {target: {value: '-1926'}})
  fireEvent.change(tailElement, {target: {value: '20e5'}})
  fireEvent.click(searchButton);

  // correlation
  fireEvent.change(headElement, {target: {value: '2015'}})
  fireEvent.change(tailElement, {target: {value: '1985'}})
  fireEvent.click(searchButton);
});