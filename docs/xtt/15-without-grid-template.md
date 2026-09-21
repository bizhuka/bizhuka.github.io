---
parent: "XTT - reports"
title: "150 Generate XLSX from an ALV grid"
nav_order: 150
permalink: /xtt/without-grid-template/
_cus_head: "_popup_head.html"
_cus_index: "150"
---

{% include _xtt_demo.html %}

## Purpose

`ZCL_XTT_FILE_GRID` creates an XLSX template from an existing ALV grid. Use it when a separate workbook template would merely duplicate the ALV columns, grouping, totals, and colors.

## Template sources

For a designed report, choose the storage adapter that matches the template source:

![image](https://user-images.githubusercontent.com/36256417/108595246-0249f280-73a9-11eb-88fd-c0570e8e3590.png)

- `ZCL_XTT_FILE_SMW0` for templates stored in transaction SMW0.
- `ZCL_XTT_FILE_OAOR` for OAOR/BDS storage with versioning.
- `ZCL_XTT_FILE_RAW` for templates already available as `STRING` or `XSTRING`, often with `ZCL_XTT_HTML`.


## Generate from ALV

For reports based on `CL_SALV_TABLE` or `CL_GUI_ALV_GRID`, `ZCL_XTT_FILE_GRID` builds the initial template and retains ALV grouping and subtotals.

The generated workbook uses modern formatting and supports richer XTT post-processing than the standard spreadsheet export.

![image](https://user-images.githubusercontent.com/36256417/108615623-40d6c000-7430-11eb-939f-2677f7d38196.png)

Different colors for subtotals (line 20) and modern Calibri font

![image](https://user-images.githubusercontent.com/36256417/108615664-91e6b400-7430-11eb-8d61-1144241cb05e.png)


***

If subtotals are grouped

![image](https://user-images.githubusercontent.com/36256417/108615839-2f8eb300-7432-11eb-9846-adbe389fe47e.png)

In the final report, the data will also be grouped

![image](https://user-images.githubusercontent.com/36256417/108615822-040bc880-7432-11eb-9027-25eddb6f302d.png)

***

## ALV colors

The adapter maps `COL_POSITIVE` to green, `COL_NEGATIVE` to red, and `COL_TOTAL` to yellow through conditional formatting.
![image](https://user-images.githubusercontent.com/36256417/176082738-770110d6-d42a-4a3b-8515-5bececb14631.png)

Technically this feature is implemented by conditional formatting

***

If the report starts with `CL_SALV_TABLE`, use `ZCL_EUI_CONV=>GET_GRID_FROM_SALV( )` to obtain the `CL_GUI_ALV_GRID` reference required by the `ZCL_XTT_FILE_GRID` constructor.
