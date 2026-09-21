---
parent: "XTT - reports"
title: "092 Dynamic table with table expressions"
nav_order: 92
permalink: /xtt/dynamic-table-new-syntax/
_cus_head: "_popup_head.html"
_cus_index: "092"
---

{% include _xtt_demo.html %}

## Overview

Do the amounts really need separate fields called `SUM1`, `SUM2` and `SUM3`? If they already form a list, you can keep them in a nested table.

Demo 092 uses that arrangement. `ZCL_XTT_DEMO_092` creates dynamic Excel columns whose cells read entries from each row's `T_SUMS` table. The template is `ZXXT_DEMO_092-XLSX`.

### Keep the row type fixed

In [demo 090](../dynamic-table/), RTTS creates new amount fields for the requested columns. Here, the row type keeps its ordinary fields and adds a table of amounts:

```abap
TYPES:
  BEGIN OF ts_row.
    INCLUDE TYPE ts_no_sum AS _static.
TYPES:
    t_sums TYPE tt_sums_alv,
  END OF ts_row,
  tt_row TYPE STANDARD TABLE OF ts_row WITH DEFAULT KEY.
```

`ts_no_sum` and `tt_sums_alv` come from the demo framework. The important shape is an ordinary row with a nested table, each entry of which supplies a `SUM` value.

Column metadata has a separate, small structure:

```abap
TYPES:
  BEGIN OF ts_column,
    mon       TYPE numc2,
    mon_name  TYPE string,
    row_field TYPE string,
  END OF ts_column,
  tt_column TYPE STANDARD TABLE OF ts_column WITH DEFAULT KEY.
```

`ROW_FIELD` holds an expression for the later row pass. It doesn't hold an amount yet.

### Generate the cell expression

`GET_COLUMNS` reads month names through `MONTH_NAMES_GET`, then creates one description for each requested column. It builds the expression with the column's one-based index:

```abap
CONCATENATE `{R-T:v-T_SUMS[ ` lv_index ` ]-SUM;type=double}`
  INTO ls_column-row_field.
APPEND ls_column TO rt_column.
```

For the first column, that produces:

```text
{R-T:v-T_SUMS[ 1 ]-SUM;type=double}
```

Read it in three pieces:

- `R-T` is the current detail-row context.
- `v-T_SUMS[ 1 ]-SUM` reads `SUM` from the first entry of that row's amount table.
- `;type=double` requests numeric output. A [`;cond=` expression](../cond/) otherwise defaults to text, and `:` is its shorthand.

The month number cycles from 1 to 12, while the table index continues increasing. For more than twelve columns, the source repeats the month headings; it doesn't add a year field automatically.

### Columns before rows, still

The root structure declares `C` before `T`:

```abap
TYPES:
  BEGIN OF ts_merge,
    c TYPE tt_column,
    t TYPE tt_row,
  END OF ts_merge.

DATA ls_merge TYPE ts_merge.
ls_merge-c = get_columns( ).

mo_report->get_random_table(
  EXPORTING iv_column_cnt = mo_report->mv_c_cnt
  IMPORTING et_table      = ls_merge-t ).

mo_report->merge_add_one( ls_merge ).
```

The template expands `{R-C;direction=column}` and places `{R-C-ROW_FIELD}` in each generated column. Those inserted expressions can then be evaluated as the detail rows repeat.

One root structure this time, but the ordering hasn't gone away. Move the data pass ahead of the column pass and the expressions won't be in place when they're needed.

### Keep the two counts in agreement

Each detail row needs an amount entry for every generated column. Column three reads `T_SUMS[ 3 ]`, so don't rely on it to find an amount stored under a business key or a different index.

A missing entry can raise an expression exception and leave an initial result through XTT's [expression handling](../cond/#what-happens-when-an-expression-raises-an-exception). Check the data shape first; a blank cell is not sufficient diagnostic evidence.

This example requires an ABAP runtime that supports the table-expression syntax in the marker. Use [demo 090's dynamically created fields](../dynamic-table/) if that syntax doesn't fit your target system. For repeating the whole arrangement across sheets, see [demo 091](../dynamic-sheets/).
