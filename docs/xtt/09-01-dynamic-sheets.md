---
parent: "XTT - reports"
title: "091 Dynamic sheets, columns and rows"
nav_order: 91
permalink: /xtt/dynamic-sheets/
_cus_head: "_popup_head.html"
_cus_index: "091"
---

{% include _xtt_demo.html %}

## Overview

One sheet per reporting unit, a variable set of month columns, and however many detail rows each unit needs. That's three directions of repetition in one workbook.

Demo 091 combines the [dynamic table](../dynamic-table/) with an outer [repeating block](../nested-blocks/). The class is `ZCL_XTT_DEMO_091`, and its template is `ZXXT_DEMO_091-XLSX`.

### Each outer row describes a sheet

The demo reuses these types from `ZCL_XTT_DEMO_090`:

```abap
TYPES:
  BEGIN OF lts_merge,
    title TYPE string,
    c     TYPE tt_column,
    t     TYPE REF TO data,
  END OF lts_merge,
  ltt_merge TYPE STANDARD TABLE OF lts_merge WITH DEFAULT KEY.
```

`C` contains the column descriptions. `T` points to the dynamically created row table, with fields such as `SUM1` and `SUM2`. Wrap those two components and a title in an outer table, and each outer row carries a complete sheet's data.

The order is useful to keep in sight: title, columns, then rows. The column pass inserts markers that the row pass will fill.

### Reuse the dynamic-table builder

Inside `SET_MERGE_INFO`, the class calls `GET_ONE_MERGE` once per requested block:

```abap
DATA lt_merge TYPE zcl_xtt_demo_090=>ltt_merge.

DO mo_report->mv_b_cnt TIMES.
  DATA lv_index TYPE string.
  lv_index = sy-index.
  CONDENSE lv_index.

  DATA ls_merge TYPE zcl_xtt_demo_090=>lts_merge.
  ls_merge = zcl_xtt_demo_090=>get_one_merge( mo_report ).

  CONCATENATE 'Sheet' lv_index INTO ls_merge-title SEPARATED BY space.
  APPEND ls_merge TO lt_merge.
ENDDO.

mo_report->merge_add_one( lt_merge[] ).
```

This is demo-framework code: `mo_report` provides the requested counts and random data. In an application, build the same outer data shape from the reporting units you actually need.

Notice that the entire table is registered as the root. Demo 090 uses separate `C` and `R` roots for two explicit passes; here, the columns and rows belong to each entry of root `R`.

### Follow the markers through the workbook

The template includes an **Info** sheet and a repeating sheet named `{R-TITLE}`. Within that repeating sheet, the main markers are:

| Marker | What it controls |
| --- | --- |
| `{R-TITLE}` | The generated sheet's title |
| `{R-C;direction=column}` | Horizontal repetition of the column descriptions |
| `{R-C-MON}` and `{R-C-MON_NAME}` | Month number and heading |
| `{R-C-COL_NAME}` | Marker text to be resolved when the row data is merged |
| `{R-T;group=GROUP}` | Grouping of the detail data |
| `{R-T;level=0}` | Overall totals |
| `{R-T;level=1;top=X}` | Group headings before their detail rows |
| `{R-T;level=2}` | Detail rows |

For example, a column description can supply `{R-T-SUM1;func=SUM}`. It becomes part of the sheet template before XTT processes `R-T`.

That's the trick, really. The outer repetition doesn't need a separate copy of the template prepared for every sheet.

### Try a small workbook first

The demo enables block, column and row counts. Start with two blocks, two columns and a few rows; it's much easier to trace the boundaries than in a workbook with twenty near-identical sheets.

The original template's **Info** sheet also records an older print-preview workaround: keep an initial static sheet, or reopen and save the workbook through Excel. Treat that as a troubleshooting note for the illustrated case. A [macro](../macro/) isn't required for normal generation.

If the sheet boundaries are wrong, revisit [nested blocks](../nested-blocks/). If a cell still contains an unresolved marker, check the column-before-row ordering from [demo 090](../dynamic-table/).
