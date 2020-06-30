---
parent: "EUI - user interface"
nav_order: 40
title: "FILE_IO Import/Export to Excel/CSV"
tags: [zcl_eui_file_io]
permalink: /eui/zcl_eui_file_io/1
data: 2020-05-01
---

Import data into an internal table from Excel or CSV file with mapping and error handling

![image](https://user-images.githubusercontent.com/36256417/80778543-34703680-8b82-11ea-9f7a-21a4b7cd6acd.png)

***

### ZCL_EUI_FILE_IO examples
SE38 -> **ZEUI_TEST_EXCEL**

<div class="tab-header">
<ul class="nav nav-tabs">
  <li class="active">
    <a data-toggle="tab" href="#excel">Excel</a>
  </li>
  <li>
    <a data-toggle="tab" href="#csv">CSV</a>
  </li>
  <li>
    <a data-toggle="tab" href="#checks">Cheking data</a>
  </li>
</ul>
</div>


<div class="tab-content">
  <div class="tab-pane active" id="excel">
<div class="container-fluid" markdown="1">   

``` abap
" Load from Excel
DATA(lo_file_io) = NEW zcl_eui_file_io(
  iv_file_name    = zcl_eui_file=>mc_extension-xlsx
  " Screen title ( for SHOW method)
  iv_status_title = `Uploaded data` ).

" Showing Open Dialog (method of ZCL_EUI_FILE)
lo_file_io->import_from_file(
  iv_window_title = `Please specify file to import.` ).
 
" Flight data
DATA(lt_import) = VALUE spfli_tab( ). 
 
" Load all fields of SPFLI, without error checking
lo_file_io->export_to_itab(
  ir_table        = REF #( lt_import )
  iv_row_from     = 2       " From the second line
).

" If the user confirmed the data in a new screen
CHECK lo_file_io->popup( )->show( ) = 'OK'.
```

</div> <!-- This close tag must be left aligned. -->
  </div>
  <div class="tab-pane" id="csv">
<div class="container-fluid" markdown="1">

``` abap
" Flight data
DATA(lt_import) = VALUE spfli_tab( ).

" From CSV
DATA(lo_file_io) = NEW zcl_eui_file_io(
  iv_file_name    = zcl_eui_file=>mc_extension-csv ).

" File as a string
lo_file_io->import_from_string(
  iv_string   = lv_csv_data
  " By default UTF-8
  iv_encoding = zcl_eui_conv=>mc_encoding-utf_16le ).

" Specify the mapping of the required fields. Others will be ignored
DATA(lt_mapping) = VALUE zcl_eui_file_io=>tt_excel_map(
   " For Excel is more convenient column_name = 'B', 'C', 'D'
   ( field = 'CARRID'    column_index = 2 )
   ( field = 'CONNID'    column_index = 3 )
   ( field = 'COUNTRYFR' column_index = 4 )
).

" Use defaults for IV_ENCODING, IV_ROW_DELIMITER, IV_FIELD_DELIMITER
" You can specify by calling them in EXPORT_TO_ITAB_CSV( )
lo_file_io->export_to_itab(
  ir_table        = REF #( lt_import )
  it_excel_map    = REF #( lt_mapping )
*  iv_row_from     = 1 " From the first line
).

" If the file contains data
CHECK lt_import[] IS NOT INITIAL.
```

</div> <!-- This close tag must be left aligned. -->
  </div>
  <div class="tab-pane" id="checks">
<div class="container-fluid" markdown="1">

``` abap
...

METHODS:
  " Data Import Error Handler (-> EXPORT_TO_ITAB)
  on_mapping_error FOR EVENT mapping_error OF zcl_eui_file_io
    IMPORTING
        iv_source    " Original text
        iv_row       " Line number
        is_excel_map " Mapping field
        io_error     " CX_* exception
        cv_value     " Value to change cv_value->*
        cs_row.      " Import table row
...

" Load from Excel
DATA(lo_file_io) = NEW zcl_eui_file_io( ).

" File from a network folder
lo_file_io->import_from_file( iv_full_path = `I:\$secret\2020-06-27.xlsx` ).

" Specify the mapping of the required fields. Others will be ignored
DATA(lt_mapping) = VALUE zcl_eui_file_io=>tt_excel_map(
   ( field = 'CARRID'    column_name = 'B' )
   ( field = 'CONNID'    column_name = 'C' )

...

" Importing data
lo_file_io->export_to_itab(
  ir_table        = REF #( lt_import )
  " If there is no mapping, load all the fields
  it_excel_map    = REF #( lt_mapping )
  " If there is no exception handler
  io_handler      = me
).

...

METHOD on_mapping_error.
  " Default value in case of error
  IF is_excel_map-field = 'DISTANCE'.
    ASSIGN cv_value->* TO <lv_distance>.
    " Original value as a string IV_SOURCE
    <lv_distance> = 77777.
  ENDIF.
  
...
```

![image](https://user-images.githubusercontent.com/36256417/85916406-57f9e980-b872-11ea-8a77-252dedc443ea.png)

</div> <!-- This close tag must be left aligned. -->
  </div>
</div>

---

### Standard methods

Probably many SAP developers know about `CALL FUNCTION 'ALSM_EXCEL_TO_INTERNAL_TABLE'` for import from Excel<br/>
and `cl_gui_frontend_services=>gui_upload( filetype = 'DAT' )` for import from CSV.

But these methods have several limitations:
* `ALSM_EXCEL_TO_INTERNAL_TABLE` works by OLE (there are problems when copying a large amount of data)
* Both work only with Presentation Server
* There is no error handling in the file and data mapping (Which column should go where) 

---

### Implementation features

* Class **ZCL_EUI_FILE_IO** inherits from ZCL_EUI_FILE. And everything that a parent can do.

* For Excel, the **CL_FDT_XL_SPREADSHEET** class is used (available from 7.02). Which is devoid of problems with OLE.
https://codezentrale.de/abap-excel-datei-xlsx-in-interne-tabele-laden-cl_fdt_xl_spreadsheet-2/

* CSV in turn supports different characters for data separation and different encodings

![image](https://user-images.githubusercontent.com/36256417/80709060-195fe100-8b06-11ea-8405-aa0a83c93a94.png)

* Error handling in the file (date or number has the wrong format) occurs using the **MAPPING_ERROR** event<br/>
In the callback, you can handle the error and change the value itself

![image](https://user-images.githubusercontent.com/36256417/80709353-9723ec80-8b06-11ea-9b20-ff9fce0fe3a7.png)

* In the mapping table, you can specify **column_name** or **column_index**<br/>
Mapping itself is optional. If it is not specified, it will match the internal table that passed, the first column of the ITAB is column A, second B, etc. 

```abap
     " Field of internal table
     field        TYPE fieldname,

     " Convenient for Excel
     column_name  TYPE char3,

     " More convenient for CSV. Could be filled automatically
     column_index TYPE i,
```

---

Since this class inherits from **ZCL_EUI_FILE**, its methods are available to it.<br/>
This makes it possible to write **chains** as in the parent

For loading from a file, the chain may look as follows
```abap
 " If you specify the file extension 'xlsx' or 'csv', the save(open) dialogs
 " and the EXPORT_TO_ITAB method will be immediately configured
 " You can also pass XSTRING to the constructor
 new ZCL_EUI_FILE( IV_FILE_NAME = 'xlsx' )->
    " This step can be replaced by data loading from any source
    IMPORT_FROM_FILE( )->
    " Import itself with an error handler
    EXPORT_TO_ITAB( io_handler = me)
```

---

### IMPORT_FROM_ITAB
Import from the internal table (**or export to a file**) works like a simple report<br/>
For more complex reports, it is better to use https://github.com/bizhuka/xtt

TODO Export multiple internal tables to 1 file without specifying a template (For debug)