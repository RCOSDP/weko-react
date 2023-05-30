import React from "react";
import { fireEvent, render, screen, act } from '@testing-library/react';
import { rest } from "msw";
import { setupServer } from "msw/node";
import "./setup_en";
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

test('app.js English test.', async () => {
    require ('css.escape');
    Object.defineProperty(window, 'location', {
        value: {
          href: 'http://localhost/',
          search: '?search_type=1&Data Language=eng'
        },
        writable: true,
      });
    const {container, rerender} =  render(<App />);

    // Since the State cannot be changed within the Fetch process, the State is changed and redrawn.
    window.facetSearchFunctions.setStateForTest(json_data1);
    const clearSliderValue = () => {}
    window.facetSearchFunctions['Time Period(s)_clearSliderValue'] = clearSliderValue;
    rerender(<App />);
    window.facetSearchFunctions.resetFacetData(json_data2.aggregations.aggregations[0]);   
    window.facetSearchFunctions.useFacetSearch();

    window.facetSearchFunctions.getFacetSearchCondition();
});



let json_data1 = {
    "data": {
        "displayNumbers": {
            "Access": null,
            "Data Language": 3,
            "Data Type": 15,
            "Distributor": 5,
            "Geographic Coverage": 5,
            "Time Period(s)": null,
            "Topic": null
        },
        "isOpens": {
            "Access": false,
            "Data Language": false,
            "Data Type": false,
            "Distributor": false,
            "Geographic Coverage": false,
            "Time Period(s)": true,
            "Topic": false
        },
        "order": {
            "1": "Topic",
            "2": "Distributor",
            "3": "Data Language",
            "5": "Access",
            "6": "Geographic Coverage",
            "74": "Time Period(s)",
            "75": "Data Type"
        },
        "searchConditions": {
            "Access": "OR",
            "Data Language": "OR",
            "Data Type": "OR",
            "Distributor": "OR",
            "Geographic Coverage": "OR",
            "Time Period(s)": "AND",
            "Topic": "AND"
        },
        "titles": {
            "Access": "Access",
            "Data Language": "Data Language",
            "Data Type": "Data Type",
            "Distributor": "Distributor",
            "Geographic Coverage": "Geographic Coverage",
            "Time Period(s)": "Time Period(s)",
            "Topic": "Topic"
        },
        "uiTypes": {
            "Access": "SelectBox",
            "Data Language": "CheckboxList",
            "Data Type": "CheckboxList",
            "Distributor": "CheckboxList",
            "Geographic Coverage": "CheckboxList",
            "Time Period(s)": "RangeSlider",
            "Topic": "SelectBox"
        }
    },
    "status": true
}

let json_data2 = {
    "aggregations": {
        "aggregations": 
            [{
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
                    "doc_count_error_upper_bound": 0,
                    "sum_other_doc_count": 0
                },
                "Data Language": {
                    "buckets": [
                        {
                            "doc_count": 328,
                            "key": "jpn"
                        },
                        {
                            "doc_count": 19,
                            "key": "eng"
                        }
                    ],
                    "doc_count_error_upper_bound": 0,
                    "sum_other_doc_count": 0
                },
                "Data Type": {
                    "buckets": [
                        {
                            "doc_count": 328,
                            "key": "quantitative research"
                        },
                        {
                            "doc_count": 328,
                            "key": "quantitative research: micro data"
                        },
                        {
                            "doc_count": 328,
                            "key": "量的調査"
                        },
                        {
                            "doc_count": 328,
                            "key": "量的調査: ミクロデータ"
                        }
                    ],
                    "doc_count_error_upper_bound": 0,
                    "sum_other_doc_count": 0
                },
                "Distributor": {
                    "buckets": [
                        {
                            "doc_count": 328,
                            "key": "SSJ データアーカイブ"
                        },
                        {
                            "doc_count": 328,
                            "key": "SSJDA"
                        }
                    ],
                    "doc_count_error_upper_bound": 0,
                    "sum_other_doc_count": 0
                },
                "Geographic Coverage": {
                    "buckets": [
                        {
                            "doc_count": 217,
                            "key": "Japan"
                        },
                        {
                            "doc_count": 217,
                            "key": "日本"
                        },
                        {
                            "doc_count": 47,
                            "key": "tokyo"
                        },
                        {
                            "doc_count": 47,
                            "key": "東京都"
                        },
                        {
                            "doc_count": 36,
                            "key": "kanagawa"
                        },
                        {
                            "doc_count": 36,
                            "key": "神奈川県"
                        }
                    ],
                    "doc_count_error_upper_bound": 0,
                    "sum_other_doc_count": 0
                },
                "Time Period(s)": {
                    "buckets": [
                        {
                            "doc_count": 25,
                            "key": "2007"
                        },
                        {
                            "doc_count": 20,
                            "key": "2014"
                        },
                        {
                            "doc_count": 18,
                            "key": "2015"
                        }
                    ],
                    "doc_count_error_upper_bound": 0,
                    "sum_other_doc_count": 0
                },
                "Topic": {
                    "buckets": [
                        {
                            "doc_count": 131,
                            "key": "Working conditions"
                        },
                        {
                            "doc_count": 131,
                            "key": "労働条件"
                        },
                        {
                            "doc_count": 87,
                            "key": "Employment"
                        },
                        {
                            "doc_count": 87,
                            "key": "雇用"
                        },
                        {
                            "doc_count": 64,
                            "key": "Consumption and consumer behaviour"
                        },
                        {
                            "doc_count": 64,
                            "key": "消費と消費者行動"
                        }
                    ],
                    "doc_count_error_upper_bound": 0,
                    "sum_other_doc_count": 0
                },
                "date_range": {
                    "available": {
                        "buckets": [
                            {
                                "doc_count": 328,
                                "key": "*-2023-05-24",
                                "to": 1684886400000,
                                "to_as_string": "2023-05-24"
                            },
                            {
                                "doc_count": 0,
                                "from": 1684886400000,
                                "from_as_string": "2023-05-24",
                                "key": "2023-05-24-*"
                            }
                        ]
                    },
                    "doc_count": 328
                },
                "doc_count": 328,
                "key": "1613031614318",
                "no_available": {
                    "doc_count": 0
                }
            }]
        }
    }

    let json_data3 = {
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
                        "doc_count_error_upper_bound": 0,
                        "sum_other_doc_count": 0
                    },
                    "Data Language": {
                        "buckets": [
                            {
                                "doc_count": 328,
                                "key": "jpn"
                            },
                            {
                                "doc_count": 19,
                                "key": "eng"
                            }
                        ],
                        "doc_count_error_upper_bound": 0,
                        "sum_other_doc_count": 0
                    },
                    "Data Type": {
                        "buckets": [
                            {
                                "doc_count": 328,
                                "key": "quantitative research"
                            },
                            {
                                "doc_count": 328,
                                "key": "quantitative research: micro data"
                            },
                            {
                                "doc_count": 328,
                                "key": "量的調査"
                            },
                            {
                                "doc_count": 328,
                                "key": "量的調査: ミクロデータ"
                            }
                        ],
                        "doc_count_error_upper_bound": 0,
                        "sum_other_doc_count": 0
                    },
                    "Distributor": {
                        "buckets": [
                            {
                                "doc_count": 328,
                                "key": "SSJ データアーカイブ"
                            },
                            {
                                "doc_count": 328,
                                "key": "SSJDA"
                            }
                        ],
                        "doc_count_error_upper_bound": 0,
                        "sum_other_doc_count": 0
                    },
                    "Geographic Coverage": {
                        "buckets": [
                            {
                                "doc_count": 217,
                                "key": "Japan"
                            },
                            {
                                "doc_count": 217,
                                "key": "日本"
                            },
                            {
                                "doc_count": 47,
                                "key": "tokyo"
                            },
                            {
                                "doc_count": 47,
                                "key": "東京都"
                            },
                            {
                                "doc_count": 36,
                                "key": "kanagawa"
                            },
                            {
                                "doc_count": 36,
                                "key": "神奈川県"
                            }
                        ],
                        "doc_count_error_upper_bound": 0,
                        "sum_other_doc_count": 0
                    },
                    "Time Period(s)": {
                        "buckets": [
                            {
                                "doc_count": 25,
                                "key": "2007"
                            },
                            {
                                "doc_count": 20,
                                "key": "2014"
                            },
                            {
                                "doc_count": 18,
                                "key": "2015"
                            }
                        ],
                        "doc_count_error_upper_bound": 0,
                        "sum_other_doc_count": 0
                    },
                    "Topic": {
                        "buckets": [
                            {
                                "doc_count": 131,
                                "key": "Working conditions"
                            },
                            {
                                "doc_count": 131,
                                "key": "労働条件"
                            },
                            {
                                "doc_count": 87,
                                "key": "Employment"
                            },
                            {
                                "doc_count": 87,
                                "key": "雇用"
                            },
                            {
                                "doc_count": 64,
                                "key": "Consumption and consumer behaviour"
                            },
                            {
                                "doc_count": 64,
                                "key": "消費と消費者行動"
                            }
                        ],
                        "doc_count_error_upper_bound": 0,
                        "sum_other_doc_count": 0
                    },
                    "date_range": {
                        "available": {
                            "buckets": [
                                {
                                    "doc_count": 328,
                                    "key": "*-2023-05-24",
                                    "to": 1684886400000,
                                    "to_as_string": "2023-05-24"
                                },
                                {
                                    "doc_count": 0,
                                    "from": 1684886400000,
                                    "from_as_string": "2023-05-24",
                                    "key": "2023-05-24-*"
                                }
                            ]
                        },
                        "doc_count": 328
                    },
                    "doc_count": 328,
                    "key": "1613031614318",
                    "no_available": {
                        "doc_count": 0
                    }
                }
            
        }
