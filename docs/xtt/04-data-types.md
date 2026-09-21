---
parent: "XTT - reports"
title: "040 Data types & Excel post processing"
nav_order: 40
permalink: /xtt/data-types/
_cus_head: "_popup_head.html"
_cus_index: "040"
---

{% include _xtt_demo.html %}

## Why types matter

Demo `ZCL_XTT_DEMO_040` covers scalar types and XLSX post-processing. Excel formulas, sorting, and formatting depend on the actual cell type, so preserve ABAP types whenever possible and override them only when the template contract requires it.

## Supported value types

|Type      | Description      |
|-------------|-------------|
|`integer`|Numeric template value for `INT4`, `INT8`, `B`, and `S`|
|`double`|Numeric template value for `P`, `F`, `DECFLOAT16`, and `DECFLOAT34`|
|`date`|Date value for ABAP type `D`|
|`time`|Time value for ABAP type `T`|
|`string`|Text value|
|`datetime`| Virtual type (DATE + TIME) |
|`boolean`|For Excel logical functions (TRUE or FALSE)|
|`mask`|Use WRITE TO|
|`as_is`|Do not escape XML symbols (can contain special chars <>&'..)|
|`image`|More about pictures [here](../images/)|
|`block`|More about conditional blocks [here](../block/)|

The first four types are detected automatically. Specify `boolean` and `datetime` explicitly because ABAP has no direct template type for them.
![](https://raw.githubusercontent.com/wiki/bizhuka/xtt/img/data_types_01.png)

Use `;type=mask` when a value must follow ABAP `WRITE TO` formatting, for example to remove leading zeros from a material number or format a WBS element.

***

## Line and page breaks

Use `CL_ABAP_CHAR_UTILITIES=>CR_LF` for a line break. XTT converts it to the representation required by the target format.

| Class | Page Separator | Line Separator |
|--|--|--|
| ZCL_XTT_EXCEL_XLSX | - | cl_abap_char_utilities=>cr_lf |
| ZCL_XTT_EXCEL_XML | - | &#10<b>;</b> |
| ZCL_XTT_WORD_DOCX & ZCL_XTT_WORD_XML | <w:br w:type="page"<b>/</b>> | <w:br<b>/</b>> |
| ZCL_XTT_PDF | <breakAfter targetType="pageArea"<b>/</b>> | cl_abap_char_utilities=>cr_lf |
| ZCL_XTT_HTML | - | <br<b>/</b>> |

***

## Merge context kinds

XTT distinguishes four context kinds passed to `MERGE( )`:
* 'struct'
* 'object'
* 'table'
* 'tree'

Objects are exposed like structures; trees provide [hierarchical output](../tree-group-by-fields/).

***
## XLSX post-processing

`ZCL_XTT_EXCEL_XLSX` adjusts the following workbook objects after inserting data:
* [List object](../basic-tables/) & pivot tables based on them
* Merged cells
* Defined names
* [Formulas](../excel-formula/) with preceded $ sign

These objects are expanded to match the generated range.

`ZCL_XTT_EXCEL_XML` adjusts formulas and merged cells only. Excel XML stores relative references internally, so the special `$` marker used by XLSX formulas is unnecessary.
