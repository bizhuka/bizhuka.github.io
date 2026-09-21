---
parent: "XTT - reports"
title: "080 ;direction=column addition"
nav_order: 80
permalink: /xtt/output-direction/
_cus_head: "_popup_head.html"
_cus_index: "080"
---

{% include _xtt_demo.html %}

## Purpose

Demo `ZCL_XTT_DEMO_080` expands a table or tree horizontally instead of vertically. The `;direction=column` directive is supported by `ZCL_XTT_EXCEL_XLSX` for XLSX and XLSM output.

## Build the data

The ABAP data is prepared exactly as in the [grouped-tree example](../tree-group-by-fields/):
```abap
    SET HANDLER on_prepare_tree_05 ACTIVATION abap_true.

    GET REFERENCE OF lt_rows INTO lr_table.
    ls_root-a = zcl_xtt_replace_block=>tree_create(
     it_table      = lr_table       " from 7.5 REF #(lt_rows)
     iv_fields     = 'GROUP'   ).   " Name of the fields delimited by ;

    SET HANDLER on_prepare_tree_05 ACTIVATION abap_false.
```
## Mark the template

The difference is in the template. Add `{R-T;direction=column}` (or the equivalent marker for your block) to the table or tree that must grow across columns.

* Table

![](https://raw.githubusercontent.com/wiki/bizhuka/xtt/img/dir_column_02.png)
* Tree

![](https://raw.githubusercontent.com/wiki/bizhuka/xtt/img/dir_column_01.png)

The generated output expands horizontally:
* Table

![](https://raw.githubusercontent.com/wiki/bizhuka/xtt/img/dir_column_03.png)
* Tree

![](https://raw.githubusercontent.com/wiki/bizhuka/xtt/img/dir_column_04.png)

## Prevent an unwanted offset

If generated data shifts downward, place non-empty anchor cells to the left of the template column. The cell labelled `I stay here` in the demo illustrates the required anchor.
