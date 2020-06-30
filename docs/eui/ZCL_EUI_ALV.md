---
parent: "EUI - user interface"
nav_order: 10
title: "ALV manager"
tags: [zcl_eui_alv]
permalink: /eui/zcl_eui_alv/1
date: 2020-05-02
---

### **ALV inside another ALV**
{: .no_toc }
How to show the consultant that the amount is calculated correctly?

Often writing the report itself takes a little time, but ~~further "Rumble in the Bronx"~~ joint search for errors takes much more physical and mental efforts, both of the developer and the task manager.

One of the easiest ways is to show in popup ALV what this amount is made of.<br/>
Those suppose that a report is **collect**ing amount in the main table, during drilldown we show all the positions from which this amount was collected   

![](https://raw.githubusercontent.com/wiki/bizhuka/py_demo/src/alv_0.png)

***

### ZCL_EUI_ALV examples

<div class="tab-header">
<ul class="nav nav-tabs">
  <li class="active">
    <a data-toggle="tab" href="#basic">Basic</a>
  </li>
  <li>
    <a data-toggle="tab" href="#sums">Sum & hotspot</a>
  </li>
  <li>
    <a data-toggle="tab" href="#popup">Popup</a>
  </li>
  <li>
    <a data-toggle="tab" href="#handler">Events</a>
  </li>
</ul>
</div>

<div class="tab-content">
  <div class="tab-pane active" id="basic">
<div class="container-fluid" markdown="1">    
``` abap
" Sample data
SELECT * INTO TABLE @DATA(lt_flight)
FROM sflight.

" Create ALV & pass table
DATA(lo_alv) = NEW zcl_eui_alv(
  ir_table = REF #( lt_flight ) ).

" Show in full screen
lo_alv->show( ).
```

![image](https://user-images.githubusercontent.com/36256417/85850294-5a0a6c80-b7ce-11ea-9a98-c47cea184103.png)


</div> <!-- This close tag must be left aligned. -->
  </div>
  <div class="tab-pane" id="sums">
<div class="container-fluid" markdown="1">
``` abap
" Sample data
SELECT * INTO TABLE @DATA(lt_flight) FROM sflight.

" Create ALV & pass table
DATA(lo_alv) = NEW zcl_eui_alv(
  ir_table = REF #( lt_flight )
  " Set title
  is_layout = VALUE lvc_s_layo( grid_title = `Demo title`
                                smalltitle = 'X' )
  " Hot spot & totals by mask
  it_mod_catalog = VALUE lvc_t_fcat( ( fieldname = 'CONNID' hotspot = 'X' )
                                     ( fieldname = 'SEATS*' do_sum  = 'X' ) ) ).

" Show in full screen
lo_alv->show( ).
```

![image](https://user-images.githubusercontent.com/36256417/85851272-2c262780-b7d0-11ea-8e62-e170d58dc18b.png)


</div> <!-- This close tag must be left aligned. -->
  </div>
  <div class="tab-pane" id="popup">
<div class="container-fluid" markdown="1">

``` abap
" Sample data
SELECT * INTO TABLE @DATA(lt_flight) FROM sflight.

" Create ALV & pass table
NEW zcl_eui_alv(
  ir_table = REF #( lt_flight )

  " Change STATUS fields
  iv_status_title = `Status of popup`

  " If not passed
  " -> Ok + Cancel (edit mode)
  " -> Cancel (Read only mode)
*  iv_status_prog  = sy-cprog
*  iv_status_name  = 'STATUS_MANY_BUTTONS'

" <<< Just call before SHOW( ) >>>
)->popup(
 iv_col_end = 108 " Set 'Width' optional
 iv_row_end = 15  " Set 'Height' optional

" Show in new popup
)->show( ).
```

![image](https://user-images.githubusercontent.com/36256417/85854040-76f66e00-b7d5-11ea-9ef2-41c6763a9053.png)


</div> <!-- This close tag must be left aligned. -->
  </div>

  <div class="tab-pane" id="handler">
<div class="container-fluid" markdown="1">

``` abap
REPORT zeui_test_alv.

...

METHODS:
  " Standard CL_GUI_ALV_GRID events
  on_hotspot_click FOR EVENT hotspot_click OF cl_gui_alv_grid
    IMPORTING
        sender     " <-- CL_GUI_ALV_GRID itself
        e_row_id
        e_column_id,

  on_user_command FOR EVENT user_command OF cl_gui_alv_grid
    IMPORTING
        e_ucomm,

  " Use split container
  on_top_of_page FOR EVENT top_of_page OF cl_gui_alv_grid
    IMPORTING
        e_dyndoc_id. " <-- REF TO CL_DD_DOCUMENT

...

" Create ALV & add a toolbar
DATA(lo_alv) = NEW zcl_eui_alv(
  ir_table   = REF #( lt_flight )
  it_toolbar = VALUE ttb_button( ( function = 'TEST_BUTTON'
                                   icon     = icon_complete
                                   text     = 'Press me!' ) ) ).

" <<<Set all handlers at once>>>
lo_alv->show( io_handler = me ).

...

METHOD on_top_of_page.
  e_dyndoc_id->add_text( text      = 'Test of ZCL_EUI_ALV'
                         sap_style = cl_dd_area=>large ).

  e_dyndoc_id->new_line( repeat = 1 ).

  e_dyndoc_id->add_link( text =  'EUI library'
                         url  =  'https://bizhuka.github.io/eui/' ).
ENDMETHOD.

METHOD on_user_command.
  CHECK e_ucomm = 'TEST_BUTTON'.
ENDMETHOD.
```

![image](https://user-images.githubusercontent.com/36256417/85857307-69dc7d80-b7db-11ea-8fea-b245eee035c4.png)


</div> <!-- This close tag must be left aligned. -->
  </div>
</div>

---

### Wrapper description

The basic skills of most ABAP developers are probably classes **CL_GUI_ALV_GRID** and **CL_SALV_TABLE**

Although the latter is newer, it:
* does not support editing by default (There are of course several types of tricks to get around this)
* customization of field catalog, toolbar, layout and variant occurs through method calls<br/>
those imho CL_SALV_TABLE more verbose than CL_GUI_ALV_GRID (начиная с 7.40) where all ALV tuning happens, as usual, through tables and structures 

CL_GUI_ALV_GRID, in turn, has 1 but a very significant drawback - to create screens for the main and popup tables ~~love to do masochists~~ a very tedious task for an already busy programmer ~~between sleeping and watching the show during lunch~~

***

For simple cases, the entire ALV display can be almost written 1 line

```abap
 NEW zcl_eui_alv( ir_table = REF #( mt_alv ) )->
    popup( )->
    show( ).
```

It is written in 3 lines for clarity<br/>
And the fact that you *can* write so does not mean that you *need* to do

***

### In details
{: .no_toc }
SE38 -> **ZEUI_TEST_ALV**

Let's move on to the syntax 7.40

### 1) CREATE
```abap
      " Create new ALV
      DATA(lo_alv) = NEW zcl_eui_alv(
       " Data for drilldown
       ir_table       = REF #( lt_rt )

       " What kind of payments do we use
       it_filter      = VALUE LVC_T_FILT( ( fieldname = 'LGART'
                                            sign      = 'I'
                                            option    = 'EQ'
                                            low       = '0101' ) )

       " Put the amount field closer to the beginning
       it_mod_catalog = VALUE LVC_T_FCAT( ( fieldname = 'BETRG'
                                            col_pos   = 5
                                            do_sum    = 'X' ) )

       " In the header, the personnel number + tech. info
       is_layout      = VALUE LVC_S_LAYO(
          grid_title = |{ <ls_alv>-pernr } - ({ <ls_lgart>-label })|
          smalltitle = abap_true )

       " If there is a lot of data, it is better to group it
       it_sort        = VALUE LVC_T_SORT(
         ( fieldname = 'SRTZA' subtot = abap_true expa = abap_true )
         ( fieldname = 'LGART' subtot = abap_true expa = abap_true ) ) ).
```

For those who remember not only REUSE, but also reporting using `WRITE` + COLOR + HOTSPOT events ~~that old fart~~ I think everything is clear.<br/>
And so a single drilldown in LVC_S_LAYO и DISVARIANT (alv variant) and double drilldown in LVC_T_FILT, LVC_T_FCAT, TTB_BUTTON (toolbar) и LVC_T_SORT will remove most of the questions about how it works.

Parameter **IT_MOD_CATALOG** not assembled from scratch field catalog! It simply complements it with non-empty values. Also, for convenience, you can specify a mask for the fields<br/>
`fieldname = 'SUM*' do_sum = 'X' hotspot = 'X'`

---

### 2) POPUP
As in SALV, if popup is not needed, we do nothing, otherwise we call

```abap
      " As popup
      lo_alv->popup( ).
```
You can transfer window sizes to it
* IV_COL_BEG
* IV_COL_END
* IV_ROW_BEG
* IV_ROW_END 

Actually, for the sake of this method, this class was created (popup nesting is limited to 7 screens)

---

### 3) SHOW 
Call the ALV show itself

```abap
      " show ALV
      lo_alv->show( ).
```

This method returns the code of the closing function. For example, if `check lo_alv->show( ) = 'OK'.`<br/>
PF-STATUS и TITLE BAR can be specified statically in the constructor or dynamically by event
 
```abap
      on_pbo_event FOR EVENT pbo_event OF zif_eui_manager
        IMPORTING
            sender    "<-- CAST to ZCL_EUI_ALV
            iv_dynnr.
```

In this event, you can get the control itself **CL_GUI_ALV_GRID** by calling `ZCL_EUI_ALV-> GET_GRID ()`

But in most cases **io_handler** can be passed to **SHOW** method, which can have CL_GUI_ALV_GRID event handlers:
* on_user_command
* on_hotspot_click
* on_double_click
* on_toolbar
* on_top_of_page
* on_data_changed

In them **sender** this is CL_GUI_ALV_GRID.

---

### Editing

Last handler **on_data_changed** only needed when editing GRID LVC_S_LAYO-EDIT = 'X' or single field LVC_S_FCAT-EDIT

Validation of the entered data can be done in the method
```abap
      on_pai_event FOR EVENT pai_event OF zif_eui_manager
        IMPORTING
            iv_command
            cv_close. " Set cv_close->* = abap_false to cancel closing
```

If the 'OK' and 'CANCEL' buttons are not enough (CANCEL only for READ_ONLY mode)

*small remark*
* You can change the status of the event **on_pbo_event** (dynamically)
* Or 1 time in the constructor (statically)
  * IV_STATUS_NAME
  * IV_STATUS_PROG
  * IT_STATUS_EXCLUDE
  * IV_STATUS_TITLE