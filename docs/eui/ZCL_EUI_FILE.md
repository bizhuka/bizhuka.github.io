---
parent: "EUI - user interface"
nav_order: 30
title: "FILE Basic file operations"
tags: [zcl_eui_file]
permalink: /eui/zcl_eui_file/1
date: 2020-04-29
---

Example decomposition of the **DOWNLOAD** method or thinking in OOP within 1 day

***

### ZCL_EUI_FILE examples
SE38 -> **ZEUI_TEST_EXCEL**

<div class="tab-header">
<ul class="nav nav-tabs">
  <li class="active">
    <a data-toggle="tab" href="#basic">Basic</a>
  </li>
  <li>
    <a data-toggle="tab" href="#chain1">Chain 1</a>
  </li>
  <li>
    <a data-toggle="tab" href="#chain2">Chain 2</a>
  </li>
  <li>
    <a data-toggle="tab" href="#chain3">Chain 3</a>
  </li>
</ul>
</div>


<div class="tab-content">
  <div class="tab-pane active" id="basic">
<div class="container-fluid" markdown="1">   

``` abap
" Instance of FILE
DATA(lo_file) = NEW zcl_eui_file( ).

" load from xString
" for internal table -> import_from_binary( )
lo_file->import_from_xstring( iv_xstring = lv_xstring ).

" By default download to `SAP GUI\tmp\`
lo_file->download( ).
```

</div> <!-- This close tag must be left aligned. -->
  </div>
  <div class="tab-pane" id="chain1">
<div class="container-fluid" markdown="1">

``` abap
" Instance of FILE
NEW zcl_eui_file(

" Default encoding UTF-8
" to change -> iv_encoding = zcl_eui_conv=>mc_encoding-utf_16le
)->import_from_string( iv_string = `Text`

" Show SaveAs dialog
)->download( iv_save_dialog  = 'X'
             iv_window_title = `Export text ...`
             
" If saved then open, otherwise exception
)->open( ).
```

</div> <!-- This close tag must be left aligned. -->
  </div>
  <div class="tab-pane" id="chain2">
<div class="container-fluid" markdown="1">

``` abap
" Instance of FILE
NEW zcl_eui_file(
 " Load from xString in constructor
 iv_xstring     = lv_xstring

 " If not passed
 " -> Ok + Cancel (edit mode)
 " -> Cancel (Read only mode)
* iv_status_prog  = sy-cprog
* iv_status_name  = 'STATUS_MANY_BUTTONS'

" Add to show SCREEN as popup
" Can call any method which returns ME
)->popup( iv_col_end = 200


" Show in new SCREEN
)->show( ).
```
</div> <!-- This close tag must be left aligned. -->
  </div>

  <div class="tab-pane" id="chain3">
<div class="container-fluid" markdown="1">

``` abap
" Could be existing instance or new one
DATA lv_ole_app	TYPE ole2_object.

" Any method call could raise an exception
TRY .
    NEW zcl_eui_file(
    
    " load Excel data
    )->import_from_binary(
     it_table  = lt_bin_xlsx
     iv_length = lv_len

    " Specify full path in shared path
    )->download(
     iv_full_path = `I:\$secret\2020-06-27.xlsx`

     " Use ole for macro
    )->open_by_ole(
     CHANGING
       cv_ole_app = lv_ole_app ).
  CATCH zcx_eui_exception INTO DATA(lo_error).
    " Show error message
    MESSAGE lo_error TYPE 'S' DISPLAY LIKE 'E'.
    RETURN.
ENDTRY.

" If all ok call your macro
CALL METHOD OF lv_ole_app 'Run'
  EXPORTING
    #1 = 'MACRO_NAME'
    #2 = 'MACRO_PARAM'.

```

</div> <!-- This close tag must be left aligned. -->
  </div>
</div>

---

### Prerequisites for decomposition

If you have a method with a dozen optional parameters you worth ~~start smoking more often~~ divide it into several smaller and more understandable methods

Once upon a time there was a simple **DOWNLOAD** method for uploading files.<br/>
It took 2 parameters __IT_TABLE__ and its length __IV_LENGTH__.<br/>
He was not at all complicated, until unloading from IV_**X**STRING was needed.<br/>
And then from the usual line __IV_STRING__ + encoding __IV_ENCODING__ (utf-8 by default)

I decided that it would be nice to open the file after downloading __IV_OPEN__<br/>
Yes, and sometimes it was necessary to open it through __OLE__ (+ 1 parameter) to call the macro.<br/>
Then the optimization was made for downloading files via FTP for files over 10 megabytes<br/>
Everything was fine, but then sometimes the files needed to be downloaded to a folder specified by the user<br/>
or have a permanent name<br/>
or generate random one to upload to **sap_tmp**

---

As a result **DOWNLOAD** inside it looked like a roll of cheap shuttle paper from the supermarket and I wanted to use it less and less   

Gathering the will into a fist ~~and firstly the monitor has been wiped with alcohol fume after a recent corporate party~~ it was decided to finally divide it into smaller parts

---

### Implementation

Firstly holding a file is easiest in one XSTRING attribute (and pass it in the constructor)

![image](https://user-images.githubusercontent.com/36256417/80464453-40c27c80-8953-11ea-99ae-545095f7c6aa.png)

But you can change MV_XSTRING from different sources

![image](https://user-images.githubusercontent.com/36256417/80464724-a44caa00-8953-11ea-88e7-85dd847929af.png)

each method returns itself as a result

![image](https://user-images.githubusercontent.com/36256417/80464964-f7bef800-8953-11ea-868b-1b9ce63cc315.png)

This makes it possible to call the following **DOWNLOAD** (or SHOW) method as a chain

![image](https://user-images.githubusercontent.com/36256417/80465232-5be1bc00-8954-11ea-9d4b-af93f9ba04e8.png)

If you do not need to do anything after downloading, the call chain breaks, otherwise you can call one of the following to open the file

![image](https://user-images.githubusercontent.com/36256417/80465722-f3dfa580-8954-11ea-981a-ed28670df1a2.png) 

---

As a result, if you need to download a file from the internal table, call the Save file dialogue and then open it<br/>
a **chain** will look like

```abap
 new ZCL_EUI_FILE( )->
    IMPORT_FROM_BINARY( )->
    DOWNLOAD( IV_SAVE_DIALOG = 'X' )->
    OPEN( )
```

If you need to download data from STRING in UTF-16LE encoding, download the file to a specific folder and open it through Excel

```abap
 new ZCL_EUI_FILE( )->
    IMPORT_FROM_STRING(  IV_ENCODING = utf_16be )->
    DOWNLOAD( IV_FULL_PATH = ... )->
    OPEN_BY_OLE( )
```

If at the end you need to show it inside the SAP GUI inplace, change DOWNLOAD( ) to **SHOW( )**

```abap
 new ZCL_EUI_FILE( )->
    IMPORT_FROM_STRING(  IV_ENCODING = utf_16be )->
    SHOW( )
```

Each of the steps can ~~throw~~ ~~raise~~ cause an exception, therefore it is better to wrap it in **TRY**<br/>
That is 1 exception handler for the entire call chain
```abap
    TRY.
        new ZCL_EUI_FILE( )->IMPORT_FROM_STRING(  IV_ENCODING = utf_16be
            )->DOWNLOAD( IV_FULL_PATH = ... )->OPEN_BY_OLE( ).
    CATCH zcx_eui_exception INTO DATA(lo_error).
        MESSAGE lo_error TYPE 'S' DISPLAY LIKE 'E'.
        RETURN.
    ENDTRY. 
```
