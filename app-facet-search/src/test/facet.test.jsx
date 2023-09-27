import React from "react";
import { fireEvent, render, screen } from '@testing-library/react';
import RangeFacet from "../components/RangeFacet";
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import '../../src/index.css';

test('facet contents open.', () => {
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
});

test('facet contents close. Selected.', () => {
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
  const displayNumber = 5;
  Object.defineProperty(window, 'location', {
    value: {
      search: 'Data%20Language=test'
    },
    writable: true,
  });
  
  const {container} = render(<RangeFacet item={item} nameshow={nameshow} name={name} labels={LABELS} isInitOpen={isOpen} uiType={uiType} displayNumber={displayNumber} />);
});

test('facet contents close.', () => {
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

  const {container} = render(<RangeFacet item={item} nameshow={nameshow} name={name} labels={LABELS} isInitOpen={isOpen} uiType={uiType} displayNumber={displayNumber} />);
  const facetElement = container.querySelector('.pull-right')
  fireEvent.click(facetElement);

});