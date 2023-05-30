import React from "react";
import { fireEvent, render, screen } from '@testing-library/react';
import RangeFacet from "../components/RangeFacet";
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import '../../src/index.css';

test('select test for search function.', () => {
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
  const uiType = 'SelectBox';
  const displayNumber = null;

  const {container} = render(<RangeFacet item={item} nameshow={nameshow} name={name} labels={LABELS} isInitOpen={isOpen} uiType={uiType} displayNumber={displayNumber} />);
  const selectElement = container.querySelector('.select__input');
  const DOWN_ARROW = { keyCode: 40 };
  fireEvent.keyDown(selectElement, DOWN_ARROW);

  Object.defineProperty(window, 'location', {
    value: {
      search: ''
    },
    writable: true,
  });
  
  const reSearchInvenio = (search) => {
  }
  window.invenioSearchFunctions = {};
  window.invenioSearchFunctions.reSearchInvenio = reSearchInvenio;

  const itemElement = screen.getByText('jpn(20821)');
  fireEvent.click(itemElement);

});

test('select test for detail function.', () => {
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
  const uiType = 'SelectBox';
  const displayNumber = null;

  window.invenioSearchFunctions = null;
  Object.defineProperty(window, 'location', {
    value: {
      search: '?q=0&Data Language=eng',
      href: ''
    },
    writable: true,
  });

  const {container} = render(<RangeFacet item={item} nameshow={nameshow} name={name} labels={LABELS} isInitOpen={isOpen} uiType={uiType} displayNumber={displayNumber} />);
  const selectElement = container.querySelector('.select__input');
  const DOWN_ARROW = { keyCode: 40 };
  fireEvent.keyDown(selectElement, DOWN_ARROW);

  const itemElement = screen.getByText('jpn(20821)');
  fireEvent.click(itemElement);

});

test('select test for empty.', () => {
  require ('css.escape');
  const item = {buckets: null};
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
  const uiType = 'SelectBox';
  const displayNumber = null;

  const {container} = render(<RangeFacet item={item} nameshow={nameshow} name={name} labels={LABELS} isInitOpen={isOpen} uiType={uiType} displayNumber={displayNumber} />);
 
});