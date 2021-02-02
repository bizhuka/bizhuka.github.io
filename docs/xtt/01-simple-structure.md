---
parent: "XTT - reports"
title: "01 Simple structure"
nav_order: 10
permalink: /xtt/simple-structure/
_cus_head: "_popup_head.html"
_cus_index: "01"
---

{% include _xtt_demo.html %}

The easiest way to send elementary data to a report is to pass them by a structure (or in an object attributes)
```abap
    " Document structure
    BEGIN OF ts_root,
      title  TYPE char15,
      text   TYPE string,
      int    TYPE i,
      bottom TYPE string, " Any field could be REF TO, STRUCTURE or TABLE
    END OF ts_root.
```

The data could look like
```abap
    ls_root-title   = 'Document title'.
    ls_root-text    = 'Just string'.
    ls_root-int     = 3.
    ls_root-bottom  = 'bottom'.
```

The template in Excel, Word or pdf could be like:

***
Basic example

Title: **_{R-TITLE}_**

Just put markers where you want

Just string    **{R-TEXT}**

Integer        _{R-INT}_

Bottom: ~~{R-BOTTOM}~~

***

If you combine the structure with the ls_root data, the report may look like this

***
Basic example

Title: **_Document title_**

Just put markers where you want

Just string    **Just string**

Integer        _3_

Bottom: ~~bottom~~
***

### XTT Library
{: .no_toc}

The code for outputting this structure to the template may look like this:
```abap
    NEW zcl_xtt_excel_xlsx( NEW zcl_xtt_file_smw0( ) )->merge( ls_root )->download( ).
```

\* The library code is compatible with ABAP 7.02. New syntax is used for demonstration purposes

1) ZCL_XTT_EXCEL_XLSX can be replaced with 1 of the ZCL_XTT descendant classes

![image](https://user-images.githubusercontent.com/36256417/103254809-06612180-49b1-11eb-9d5f-6ed0125e18f9.png)

2) Instead of ZCL_XTT_FILE_SMW0 to any of the following

![image](https://user-images.githubusercontent.com/36256417/103254904-75d71100-49b1-11eb-825f-9c8ca2885253.png)

3) The MERGE () method can be called several times, for different labels. Default 'R'

4) The DOWNLOAD () method has optional parameters for downloading the report. For other actions, you can use one of the methods:

![image](https://user-images.githubusercontent.com/36256417/103255194-9c497c00-49b2-11eb-9200-70d9b74bd130.png)

***

All text formatting within **{}** remains the same.

**In a word, a block that looks the same can consist of several with the same formatting.**

~~To exclude such a case, you need to copy the block from {} to notepad, copy it and paste it back~~

From new version **ZCL_XTT_WORD_DOCX** & **ZCL_XTT_WORD_XML** classes in such cases

![](https://raw.githubusercontent.com/wiki/bizhuka/xtt/img/01_word_part_text.png)

would use a style of the first part 

![](https://raw.githubusercontent.com/wiki/bizhuka/xtt/img/01_word_part_text_f.png)