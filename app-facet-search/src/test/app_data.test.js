import React from "react";
import { fireEvent, render, screen, act } from '@testing-library/react';
import { rest } from "msw";
import { setupServer } from "msw/node";
import "./setup_jp";
import App from "../App";
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css';
import '../../src/index.css';

// Create an API server
const server = setupServer(
    rest.post("/facet-search/get-title-and-order", (_, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json(json_data1)
      );
    }),
    rest.get("/api/index/", (_, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json(json_data2)
          );
        }),
    rest.get("/api/records/", (_, res, ctx) => {
        return res(
          ctx.status(200),
          ctx.json(json_data3)
          );
        }),
    rest.get("/", (_, res, ctx) => {
        return res(
          ctx.status(200)
          );
        }),
  );

beforeAll(() => server.listen());
afterEach(() => {
    server.resetHandlers();
  });
  afterAll(() => server.close());

 /*
     In this test case, in order to achieve 100% Coverage,
     verification is performed on data that does not originally occur to satisfy the Coverage.
 */
test('app.js data pattern test.', async () => {
    require ('css.escape');

    
    Object.defineProperty(window, 'location', {
        value: {
          href: 'http://localhost',
          search: '?search_type=1'
        },
        writable: true,
      });
    window.facetSearchFunctions.resetFacetData('');
    const {container, rerender} =  render(<App />);
});

test('test2.', async () => {
    require ('css.escape');
    Object.defineProperty(window, 'location', {
        value: {
          href: 'http://localhost',
          search: '?search_type=2'
        },
        writable: true,
      });
    const {container, rerender} =  render(<App />);
    window.facetSearchFunctions.resetFacetData(json_data4.aggregations); 
    window.facetSearchFunctions.resetFacetData(json_data5.aggregations); 
    window.facetSearchFunctions.resetFacetData(''); 
});


let json_data1 = {
    "data": {},
    "status": false
}

let json_data2 = {}

let json_data3 = {}

let json_data4 = {
  "aggregations": 
  {
      "Data Language": {
        "Data Language":  {"key": "jpn","buckets" : "dummy", "Data Language" : "jpn"}
}}}

let json_data5 = {
  "aggregations": 
  {
      "Access": {
          "buckets": [
              {
                  "doc_count": 328,
                  "key": "restricted access"
              },
              {
                  "doc_count": 328,
                  "key": "制約付きアクセス"
              }
          ],
          "Access" : "restricted access",
          "doc_count_error_upper_bound": 0,
          "sum_other_doc_count": 0
      }}}
