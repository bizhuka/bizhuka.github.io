---
parent: "XTT - reports"
title: "010 Simple structure"
nav_order: 10
permalink: /xtt/simple-structure/
_cus_head: "_popup_head.html"
_cus_index: "010"
---

{% include _xtt_demo.html %}

## Purpose

Demo `ZCL_XTT_DEMO_010` is the smallest complete XTT report. It passes one ABAP structure to a template and produces XLSX, HTML, DOCX, or PDF output. Start here if you are new to the library.

## Define the report context

For a simple report, define a structure whose components mirror the markers in the template. Object attributes can be used in the same way.
```abap
    " Document structure
    BEGIN OF ts_root,
      title  TYPE char15,
      text   TYPE string,
      int    TYPE i,
      bottom TYPE string, " Any field could be REF TO, STRUCTURE or TABLE
    END OF ts_root.
```

Populate the structure before merging it:
```abap
    ls_root-title   = 'Document title'.
    ls_root-text    = 'Just string'.
    ls_root-int     = 3.
    ls_root-bottom  = 'bottom'.
```

## Create the template

The corresponding Excel, Word, or PDF template can contain these markers:

***
Basic example

Title: **_{R-TITLE}_**

Just put markers where you want

Just string    **{R-TEXT}**

Integer        _{R-INT}_

Bottom: ~~{R-BOTTOM}~~

***

After the merge, the markers are replaced while their surrounding formatting is retained:

***
Basic example

Title: **_Document title_**

Just put markers where you want

Just string    **Just string**

Integer        _3_

Bottom: ~~bottom~~
***

## Generate the report

The complete generation chain can be as short as one statement:
```abap
    NEW zcl_xtt_excel_xlsx( NEW zcl_xtt_file_smw0( ) )->merge( ls_root )->download( ).
```

The library supports ABAP 7.02; the documentation uses newer syntax where it makes the example easier to read.

1. Replace `ZCL_XTT_EXCEL_XLSX` with the required `ZCL_XTT` descendant for another output format.

![image](https://user-images.githubusercontent.com/36256417/103254809-06612180-49b1-11eb-9d5f-6ed0125e18f9.png)

2. Replace `ZCL_XTT_FILE_SMW0` with another template source when the template is not stored in SMW0.

![image](https://user-images.githubusercontent.com/36256417/103254904-75d71100-49b1-11eb-825f-9c8ca2885253.png)

3. Call `MERGE( )` more than once when a template has several roots. The default root marker is `R`.

4. Use the optional parameters of `DOWNLOAD( )`, or choose another output method such as `SHOW( )` or `SEND( )`.

![image](https://user-images.githubusercontent.com/36256417/103255194-9c497c00-49b2-11eb-9200-70d9b74bd130.png)

***

## Word template caution

Formatting applied to a marker is retained in the generated document. In Word, however, one marker can be split into several XML text runs even when it looks continuous on screen.

Run Word's spelling check with **F7** before saving a template. Characters such as `{`, `}`, `;`, and `=` may trigger proofing and cause Word to split the marker.
![image](https://user-images.githubusercontent.com/36256417/126486571-be58c903-df2d-433b-8559-b3bf151a24e4.png)

Current versions of `ZCL_XTT_WORD_DOCX` and `ZCL_XTT_WORD_XML` handle split runs by applying the style of the first run:

![](https://raw.githubusercontent.com/wiki/bizhuka/xtt/img/01_word_part_text.png)

The resulting replacement therefore uses the style of the marker's first part:

![](https://raw.githubusercontent.com/wiki/bizhuka/xtt/img/01_word_part_text_f.png)
