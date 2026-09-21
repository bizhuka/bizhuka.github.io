---
parent: "XTT - reports"
title: "020 Basic tables"
nav_order: 20
permalink: /xtt/basic-tables/
_cus_head: "_popup_head.html"
_cus_index: "020"
---

{% include _xtt_demo.html %}

## Purpose

Demo `ZCL_XTT_DEMO_020` shows the standard table workflow. A flat internal table is exposed as component `T`, repeated by the template, and rendered in XLSX, DOCX, Excel XML, Word XML, or PDF.

## Define the report context

Declare the repeated data as an internal-table component of the root structure:
```abap
    " Document structure
    BEGIN OF ts_root,
      footer   TYPE string,
      header   TYPE string,
      t        TYPE tt_rand_data, " internal flat table ( In template {R-T} )
      date     TYPE d,            " 8
      time     TYPE t,            " 6
      datetime TYPE char14,       " date(8) + time(6)
    END OF ts_root.
```
`TT_RAND_DATA` is a standard table with the following row type:
```abap
      " Random table data
      BEGIN OF ts_rand_data,
        group   TYPE string,
        caption TYPE string,
        date    TYPE d,
        sum1    TYPE p LENGTH 13 DECIMALS 2,
        sum2    TYPE p LENGTH 13 DECIMALS 2,
      END OF ts_rand_data,
      tt_rand_data TYPE STANDARD TABLE OF ts_rand_data WITH DEFAULT KEY,
```
## Define the repeated range

The template contains the root marker `{R-T}` and field markers for the row components:

![](https://raw.githubusercontent.com/wiki/bizhuka/xtt/img/basic_table_templ.png)

The repeated pattern may span several physical rows. XTT treats the range from the first `{R-T}` marker to the last marker for that block as one logical record.

## Populate and merge the data
```abap
    " {R-T} in the template. See GET_RANDOM_TABLE.
    ls_root-t      = cl_main=>get_random_table( ).

    " Header and footer values
    ls_root-footer = 'Footer'.
    ls_root-header = 'Header'.
```
## Result and Excel behavior

The resulting Word document contains one copy of the repeated range per table row:

![](https://raw.githubusercontent.com/wiki/bizhuka/xtt/img/basic_table_word.png)

In XLSX output, Excel tables and their formulas are expanded to cover the generated rows.
![](https://raw.githubusercontent.com/wiki/bizhuka/xtt/img/basic_table_01.png)

Use **Ctrl+F3** in Excel to inspect workbook names.

![image](https://user-images.githubusercontent.com/36256417/108593671-4fc16200-739f-11eb-96d3-bd7b96169446.png)


***

[Data-validation](https://support.microsoft.com/en-us/office/apply-data-validation-to-cells-29fecbcc-d1b9-42c1-9d76-eff3ce5f7249) ranges are expanded automatically as well.
![image](https://user-images.githubusercontent.com/36256417/108593426-d07f5e80-739d-11eb-8b31-bf5e014451a8.png)

***

XTT preserves worksheet-scoped and workbook-scoped formulas, including names used for print titles.

![image](https://user-images.githubusercontent.com/36256417/108593559-9cf10400-739e-11eb-83db-d5a7079f65ee.png)
