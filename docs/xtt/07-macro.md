---
parent: "XTT - reports"
title: "070 Macro call & prepare_raw event"
nav_order: 70
permalink: /xtt/macro/
_cus_head: "_popup_head.html"
_cus_index: "070"
---

{% include _xtt_demo.html %}

## Recommendation

Demo `ZCL_XTT_DEMO_070` documents two extension points: invoking a VBA macro and modifying the generated XML through `PREPARE_RAW`. Prefer `PREPARE_RAW`. VBA depends on desktop Excel, SAP GUI, OLE, security policy, and an interactive session; it is unsuitable for background or web scenarios.

## VBA macro

Macro calls work only in SAP GUI. They do not run in Web Dynpro or background processing.

* DOWNLOAD
```abap
      ro_xtt->download(        " All parameters are optional
       EXPORTING
        iv_open     = zcl_xtt=>mc_by_ole " Open with ole
       CHANGING
        cv_ole_app  = lv_ole_app ).      " Get ole2_object back
```

After `DOWNLOAD( )` returns the OLE application object, call the macro by name:
```abap
  CALL METHOD OF lv_ole_app 'Run'
    EXPORTING
      #1 = 'MAIN.start'
      #2 = 'From SAP'.
```
This call path is controlled through OLE and may behave differently from opening the workbook manually.

* SHOW<br/>
For in-place `SHOW( )`, register the `PBO` event handler:

```abap
      on_pbo_07 FOR EVENT pbo OF zcl_xtt
        IMPORTING
            sender
            io_app_obj.
```
The handler receives the Office application object:
```abap
METHOD on_pbo_07.
  CALL METHOD OF io_app_obj 'Run'
    EXPORTING
      #1 = 'MAIN.start'
      #2 = 'From SAP'.

  " OR Call OLE like that
  SET PROPERTY OF io_app_obj 'StatusBar' = 'OLE Call'.

  GET PROPERTY OF io_app_obj 'Charts' = lv_charts.
  CALL METHOD OF lv_charts 'Add'.
ENDMETHOD.
```
This route depends on the client VBA security configuration. Use raw XML processing when the required change can be expressed directly in the document package.

## `PREPARE_RAW` event

For single-file XML formats - Excel XML 2003, Word XML, and Adobe XDP - the event exposes the document content directly.

```abap
      on_prepare_raw_07 FOR EVENT prepare_raw OF zcl_xtt
        IMPORTING
            sender
            ir_content. " Type Ref To XSTRING
```
`IR_CONTENT` references the generated document. Modify it with XML APIs or carefully scoped string operations.

For Office Open XML formats:
1. Document (*.docx), Macro-Enabled Document (*.docm)
1. Workbook (*.xlsx), Macro-Enabled Workbook (*.xlsm)
these files are ZIP packages. Extract the required XML part, update it, and write it back.
```abap
  CASE lv_class_name.
    WHEN 'ZCL_XTT_EXCEL_XLSX'. " OR 'ZCL_XTT_EXCEL_XML'.
      lv_path_in_arc = 'xl/worksheets/sheet1.xml'.

    WHEN 'ZCL_XTT_WORD_DOCX'. " OR 'ZCL_XTT_WORD_XML'.
      lv_path_in_arc = 'word/document.xml'.
  ENDCASE.

  " Get content as a string from file
  zcl_xtt_util=>xml_from_zip(
   EXPORTING
    io_zip    = lo_zip
    iv_name   = lv_path_in_arc
   IMPORTING
    eo_xmldoc = lo_xml    " As REF TO if_ixml_document
    ev_sdoc   = lv_xml ). " As STRING
```

After modifying the string or `IF_IXML_DOCUMENT`, write the part back to the package:
```abap
  " Write data back
  zcl_xtt_util=>xml_to_zip(
   io_zip  = lo_zip
   iv_name = lv_path_in_arc
   iv_sdoc = lv_xml ). " Or use --> io_xmldoc = lo_xml

  " ZIP archive as xstring
  <lv_content> = lo_zip->save( ).
```

## Processing individual archive parts

XTT can raise `PREPARE_RAW` for an individual file inside an XLSX or DOCX package, avoiding manual extraction in the handler.

![image](https://user-images.githubusercontent.com/36256417/103264798-f4de4080-49d5-11eb-9a44-ef4fb2b36ebb.png)

Check `IV_PATH` in the handler. When it is initial, the event refers to the entire archive and `IR_CONTENT` contains the ZIP payload.

![image](https://user-images.githubusercontent.com/36256417/103264863-37078200-49d6-11eb-84a1-a1a79f9ffb5d.png)
