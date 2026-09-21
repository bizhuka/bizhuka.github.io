---
layout: page
title: "XTT - reports"
nav_order: 3
has_children: true
permalink: /xtt/
_cus_head: "_popup_head.html"
---

## XTT - XML Template Toolkit
{: .no_toc }

<div class="tab-header">
<ul class="nav nav-tabs">
  <li class="active">
    <a data-toggle="tab" href="#info">Info</a>
  </li>
  <li>
    <a data-toggle="tab" href="#demo">Live demo</a>
  </li>
  <li>
    <a data-toggle="tab" href="#basic">Basic Template</a>
  </li>
  <li>
    <a data-toggle="tab" href="#key">Key features</a>
  </li>
</ul>
</div>


<div class="tab-content">

<!-- TODO INFO -->
  <div class="tab-pane active" id="info">
<br/>
<div class="container-fluid" markdown="1">
XTT generates business documents from native Microsoft Office or Adobe templates without OLE automation on the SAP application server.

1. Start with a representative document supplied by the business.
2. Open it in Excel, Word, or Adobe LiveCycle Designer and replace variable content with [markers in curly braces](../xtt/compare/).
3. Build formulas, charts, pivot tables, styles, and print settings around those markers in the original editor.
4. Call `MERGE( )` from ABAP with a structure, object, table, nested table, or tree.
5. Deliver the result with `DOWNLOAD( )`, `SHOW( )`, or `SEND( )`.

The template owns presentation. ABAP owns data and business rules. Keeping that boundary clear is the main design principle behind XTT.

</div> <!-- This close tag must be left aligned. -->
  </div>

<!-- TODO LIVE DEMO -->
<div class="tab-pane" id="demo">
<br/>
<div class="container-fluid" markdown="1">

### Transaction `Z_XTT_DEMO`
{: .no_toc }
</div> <!-- This close tag must be left aligned. -->
{% include _xtt_demo.html %}

</div>

<!-- TODO BASIC -->
<div class="tab-pane" id="basic">
<br/>
<div class="container-fluid" markdown="1">

### Excel template
{: .no_toc }

![image](https://user-images.githubusercontent.com/36256417/80579411-6b7c0600-8a23-11ea-8166-d48e63b7d085.png)

### Code
{: .no_toc }

```abap
" Template storage class
" tr OAOR -> zcl_xtt_file_oaor, external sources -> ZCL_XTT_FILE_RAW
DATA(lo_file) = NEW zcl_xtt_file_smw0( 'Z_TEMPLATE_ID.XLSX' ).

" Excel output; use ZCL_XTT_WORD_DOCX or ZCL_XTT_PDF for Word or PDF
DATA(lo_xtt) = NEW zcl_xtt_excel_xlsx( io_file = lo_file ).

" R is the root marker in the template
lo_xtt->merge( iv_block_name = 'R'
               is_block = VALUE ts_root(
                begda = pn-begda
                endda = pn-endda
                
                " Transmission of a table (or tree)
                t     = lt_alv    
               ) ).

" Download to sap_tmp, pass a path, or display Save As
" Use SHOW( ) for in-place preview
lo_xtt->download( ).
``` 
</div> <!-- This close tag must be left aligned. -->
  </div>

<!-- TODO KEY -->
<div class="tab-pane" id="key">
<br/>
<div class="container-fluid" markdown="1">

* **Output adapters**<br/>
 `ZCL_XTT_EXCEL_XLSX` - Excel Workbook (*.xlsx), Excel Macro-Enabled Workbook (*.xlsm)<br/>
 `ZCL_XTT_EXCEL_XML` - Xml Spreadsheet 2003 (*.xml)<br/>
 `ZCL_XTT_WORD_DOCX` - Word Document (*.docx), Word Macro-Enabled Document (*.docm)<br/>
 `ZCL_XTT_WORD_XML` - Word XML 2003 Document (*.xml), Word XML Document (*.xml)<br/>
 `ZCL_XTT_PDF` - Adobe XML Form (*.xdp)

* **Server-side generation without OLE**<br/>
The SAP application server produces the final file. Reports can run in the background and do not require desktop Office automation or VBA macros.

* **Native document templates**<br/>
Presentation remains separate from ABAP code. Template authors use familiar editors, preserve the original formatting, and prepare formulas, charts, and pivot tables without generating XML manually.

</div> <!-- This close tag must be left aligned. -->
</div>
</div>
