---
parent: "XTT - reports"
title: "131 Expression shorthand in forms"
nav_order: 131
permalink: /xtt/cond/shorthand/
_cus_head: "_popup_head.html"
_cus_index: "131"
---

{% include _xtt_demo.html %}

## Overview

A form with one little box for each letter can turn a simple name into a surprisingly long list of helper fields. First character, second character, third character. You get the idea.

Demo 131 keeps the name intact in ABAP and extracts the characters in the template. `ZCL_XTT_DEMO_131` supplies the personnel data; the XLSX and DOCX templates show different uses of the [`;cond=` shorthand](../../cond/).

### A colon instead of ;cond=

These markers ask for the same value:

```text
{R;cond=value-NACHN+0(1)}
{R:v-NACHN+0(1)}
```

The short form replaces `;cond=` with `:` and uses `v` for the current value. It doesn't change the expression's meaning or make newer ABAP syntax available on an older system.

The demo passes a table of personnel records as root `R`. Within each repeated form, `v` refers to the current record.

### The report data

The class declares the following root row:

```abap
TYPES:
  BEGIN OF ts_root,
    pernr   TYPE pernr_d,
    nachn   TYPE c LENGTH 40,
    vorna   TYPE c LENGTH 40,
    midnm   TYPE c LENGTH 40,
    gesch   TYPE c LENGTH 1,
    gbdat   TYPE d,
    perid   TYPE c LENGTH 20,
    photo   TYPE xstring,
    s_photo TYPE string,
  END OF ts_root,
  tt_root TYPE STANDARD TABLE OF ts_root WITH DEFAULT KEY.
```

`_GET_ROOT` reads currently valid, unlocked records from `PA0002`, ordered by personnel number and limited by the screen context. It uppercases the name fields before passing them to the report.

The demo registers the whole table:

```abap
DATA lt_root TYPE tt_root.
lt_root = _get_root( ls_screen_context ).
mo_report->merge_add_one( lt_root ).
```

The repeating form follows the [root-table behavior](../../nested-blocks/) for its document format.

### One character per box

The Excel template places successive substrings into adjacent cells:

```text
{R:v-NACHN+0(1)}
{R:v-NACHN+1(1)}
{R:v-NACHN+2(1)}
```

ABAP offsets start at zero. The template follows the same pattern for `VORNA` and `MIDNM`, with boxes for the first 19 characters of each name.

The source fields are fixed-length character fields, so unused positions are spaces. If you adapt this to a variable-length string, account for its actual length before reading a substring.

Birth-date boxes use offsets into the internal date representation, `YYYYMMDD`:

```text
{R:v-GBDAT+6(1);type=integer}
{R:v-GBDAT+7(1);type=integer}
```

Those two cells contain the day digits. The template then takes the month from offsets 4 and 5, and the year from offsets 0 through 3.

The explicit integer type makes each Excel result numeric. Whether that's appropriate for a different identifier is a separate choice; don't discard meaningful leading zeros just because the example uses digit boxes.

### Small expressions, different layouts

The supplied templates map the demo's sex codes with `SWITCH`:

```text
{R:SWITCH #( v-GESCH WHEN '1' THEN 'M' WHEN '2' THEN 'F' ELSE 'U' )}
```

That is the mapping in this example. Adjust the labels and code handling to the requirements of your own form.

The Excel template also demonstrates case conversion:

```text
{R:to_upper( |{ v-NACHN } { v-VORNA } { v-MIDNM }| )}
{R:to_lower( |{ v-NACHN } { v-VORNA } { v-MIDNM }| )}
{R:to_mixed( |{ v-NACHN }_{ v-VORNA }_{ v-MIDNM }| )}
```

The Word template uses a user-formatted birth date and a calculation of days since birth:

```text
{R:|{ v-GBDAT DATE = USER }|}
{R:sy-datum - v-GBDAT}
```

No separate display fields for those values. That's where the shorthand earns its keep.

### Photographs and test data

The Excel template declares `{R-PHOTO;type=image}`. See [binary image fields](../../images-no-code/) for that part of the layout.

In normal operation, `_GET_PHOTO` searches BDS connections for class `PREL`, looks for document types `HRICOLFOTO` or `HRIEMPFOTO`, reads the content through `SCMS_DOC_READ` and converts it to an `XSTRING`.

In test mode, the class instead decodes the base64 value in `S_PHOTO`. Test mode also takes the maximum record count from the demo's row-count setting; it still calls `_GET_ROOT` to obtain the records.

### Adapting the class to an HR system

There is one unfinished piece in the supplied class: `_GET_SCREEN_CONTEXT` has an empty implementation. Outside test mode it therefore returns an initial context, and `SET_MERGE_INFO` exits before registering any data.

Implement that selection step when adapting the demo. Its context has a personnel-number range, `S_PERNR`, and a maximum record count, `P_MAX_COUNT`.

The dynamic table name `('PA0002')` avoids a static dependency in the source, but it doesn't supply HR data on a system without that table. The date, substring and formatting expressions are reusable; the data retrieval needs your application's context.
