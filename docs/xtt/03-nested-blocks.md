---
parent: "XTT - reports"
title: "030 Nested blocks"
nav_order: 30
permalink: /xtt/nested-blocks/
_cus_head: "_popup_head.html"
_cus_index: "030"
---

{% include _xtt_demo.html %}

## Purpose

Demo `ZCL_XTT_DEMO_030` explains nested repetition: a table of root records where every root record can itself contain a detail table. Correct block boundaries are essential because XTT must know exactly which part of the template to copy at each level.

## Define the nested data

```abap

    " Structure of document
    BEGIN OF ts_root,
      title  TYPE string,
      bottom TYPE string,
      t      TYPE tt_rand_data, " Table within another table (lt_root)
    END OF ts_root.
  DATA:
    lt_root TYPE STANDARD TABLE OF ts_root.

...
ro_xtt->merge( is_block = lt_root iv_block_name = 'R' ).
```

Pass the outer table to `MERGE( )` with root name `R`. For `ZCL_XTT_WORD_DOCX` and `ZCL_XTT_PDF`, the root block can span the document; in `ZCL_XTT_EXCEL_XML`, it spans a worksheet.

---

## Format-specific boundaries

In Word, `{R}` represents the document-level block, including its trailing page break. `{R-T}` represents one detail row without the header.

![](https://raw.githubusercontent.com/wiki/bizhuka/xtt/img/nested_bl_word_templ.png)

---

In Excel XML 2003, `{R}` can identify the worksheet that must be repeated:

![](https://raw.githubusercontent.com/wiki/bizhuka/xtt/img/nested_bl_2003_templ.png)

After expansion, every `TS_ROOT` row becomes a separate worksheet.

![](https://raw.githubusercontent.com/wiki/bizhuka/xtt/img/nested_bl_2003_res.png)

`TITLE` is an ordinary structure component, not a reserved XTT keyword.

---

For PDF output, pass the replicated page name through `IV_BLOCK_NAME`. To force page breaks inside the document, set the break attribute on the first child subform as shown below.

![](https://raw.githubusercontent.com/wiki/bizhuka/xtt/img/nested_bl_pdf_templ.png)
