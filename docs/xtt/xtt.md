---
layout: default
title: "XTT - reports"
nav_order: 3
has_children: true
permalink: /xtt/
_cus_head: "_popup_head.html"
---

### **XTT** - Xml template toolkit
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
XTT helps you to automate your reporting routine in SAP

- Get existing report from your customers
- Use preferable editor (MS Excel, Word or Adobe LiveCycle Designer) and replace some parts of it with markers inclosed in [curly brackets](../xtt/compare/)
- Link all formulas, charts and pivot tables to this markers
- In abap call **`merge()`** method to pass all data including nested structures, tables and trees
- Use **`download( ) | send( ) | show( )`** method for appropriate action
- That's all!

</div> <!-- This close tag must be left aligned. -->
  </div>

<!-- TODO LIVE DEMO -->
<div class="tab-pane" id="demo">
<br/>
<div class="container-fluid" markdown="1">

### tr. Z_XTT_INDEX
{: .no_toc }
</div> <!-- This close tag must be left aligned. -->
{% include _xtt_demo.html %}

</div>

<!-- TODO BASIC -->
<div class="tab-pane" id="basic">
<br/>
<div class="container-fluid" markdown="1">

### Excel Template
{: .no_toc }

![image](https://user-images.githubusercontent.com/36256417/80579411-6b7c0600-8a23-11ea-8166-d48e63b7d085.png)

### Code
{: .no_toc }

```abap
" Template storage class
" tr OAOR -> zcl_xtt_file_oaor, external sources -> ZCL_XTT_FILE_RAW
DATA(lo_file) = NEW zcl_xtt_file_smw0( 'Z_TEMPLATE_ID.XLSX' ).

" Excel (Use ZCL_XTT_WORD_DOCX, ZCL_XTT_PDF for word and pdf respectively)
DATA(lo_xtt) = NEW zcl_xtt_excel_xlsx( io_file = lo_file ).

" R is a marker in the IV_TEMPLATE
lo_xtt->merge( iv_block_name = 'R'
               is_block = VALUE ts_root(
                begda = pn-begda
                endda = pn-endda
                
                " Transmission of a table (or tree)
                t     = lt_alv    
               ) ).

" Download to sap_tmp. You could specify path or show SaveAs dialogue
" Call SHOW( ) for inplace mode
lo_xtt->download( ).
``` 
</div> <!-- This close tag must be left aligned. -->
  </div>

<!-- TODO KEY -->
<div class="tab-pane" id="key">
<br/>
<div class="container-fluid" markdown="1">

* **Various classes for different purposes:**<br/>
 `ZCL_XTT_EXCEL_XLSX` - Excel Workbook (*.xlsx), Excel Macro-Enabled Workbook (*.xlsm)<br/>
 `ZCL_XTT_EXCEL_XML` - Xml Spreadsheet 2003 (*.xml)<br/>
 `ZCL_XTT_WORD_DOCX` - Word Document (*.docx), Word Macro-Enabled Document (*.docm)<br/>
 `ZCL_XTT_WORD_XML` - Word XML 2003 Document (*.xml), Word XML Document (*.xml)<br/>
 `ZCL_XTT_PDF` - Adobe XML Form (*.xdp)

* **Report generating without OLE:**<br/>
The SAP applicaion server delivers a ready file<br/>
No dangerous macro and security issues<br/>
Availability of background execution

* **Using templates that gives several benefits:**<br/>
Seperation of data representation from ABAP code (no methods as cell->set_bold(true) )<br/>
Using familiar redactor as MS Word, MS Excel & Adobe LiveCycle Designer<br/>
No need to be XML guru and generate XML by yourself<br/>
Complete preservation of the original document formatting<br/>
Precreation of complex reporting objects such as pivot tables and charts

</div> <!-- This close tag must be left aligned. -->
</div>
</div>