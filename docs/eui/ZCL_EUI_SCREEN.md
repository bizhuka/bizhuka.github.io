---
parent: "EUI - user interface"
nav_order: 60
title: "SCREEN manager"
tags: [zcl_eui_screen]
permalink: /eui/zcl_eui_screen/1
date: 2020-05-06
---

### Screen manager
{: .no_toc }

If you have a global class, how to use screens in it correctly?<br/>
According to the SAP recommendation, you can use function groups.<br/>
But how convenient is this? 

![image](https://user-images.githubusercontent.com/36256417/81061683-3887b580-8eee-11ea-8343-b55a1da73fc8.png)

***

### ZCL_EUI_SCREEN examples
SE38 -> **ZEUI_TEST_SCREEN***

<div class="tab-header">
<ul class="nav nav-tabs">

  <li class="active">
    <a data-toggle="tab" href="#pbo">PBO only</a>
  </li>

  <li>
    <a data-toggle="tab" href="#context">Pass context</a>
  </li>

<li role="presentation" class="dropdown">
    <a href="#" class="dropdown-toggle" data-toggle="dropdown">Dynamic screens<span class="caret"/>
    </a>
    <ul class="dropdown-menu">
        <li>
            <a href="#free" data-toggle="tab">FREE_SELECTIONS_DIALOG based</a>
        </li>
        <li>
            <a href="#popup" data-toggle="tab">CL_CI_QUERY_ATTRIBUTES based</a>
        </li>
    </ul>
</li>
</ul>

<div class="tab-content">
<div class="tab-pane fade active in" id="pbo">
<div class="container-fluid" markdown="1"> 

``` abap
REPORT ztest_screen.

" dynnr = 1000
PARAMETERS:
  p_obl  TYPE i,
  p_gry1 TYPE i,
  p_gry2 TYPE i MODIF ID hid.

AT SELECTION-SCREEN OUTPUT.
  " Rules for SELECTION-SCREEN
  DATA(lo_screen) = NEW zcl_eui_screen( iv_dynnr = '1000' ).

  " Make it OBLIGATORY
  lo_screen->customize( name     = 'P_OBL'
                        required = '1' ).
  " Gray by mask
  lo_screen->customize( name   = 'P_GRY*'
                        input  = '0' ).
  " Hide by SCREEN-GROUP1
  lo_screen->customize( group1    = 'HID'
                        input     = '0'
                        active    = '0'
                        invisible = '1' ).
  " Apply all rules
  lo_screen->pbo( ).
```

![image](https://user-images.githubusercontent.com/36256417/85921360-9bb61880-b89d-11ea-90ff-c57ee1c41eac.png)

</div> <!-- This close tag must be left aligned. -->
</div>

<div class="tab-pane fade" id="context">
<div class="container-fluid" markdown="1">
``` abap
REPORT ztest_screen2.

" Screen 1010
SELECTION-SCREEN BEGIN OF SCREEN 1010 AS SUBSCREEN.
SELECTION-SCREEN BEGIN OF BLOCK bl_1010 WITH FRAME TITLE TEXT-tit.
PARAMETERS : p_fld_01 TYPE sytabix,
             p_path   TYPE text255.
SELECTION-SCREEN END OF BLOCK bl_1010.
SELECTION-SCREEN END OF SCREEN 1010.

" If SCREEN in another program pass values
TYPES:
  BEGIN OF ts_context,
    p_fld_01 TYPE sytabix,
    p_path   TYPE text255,
  END OF ts_context.

START-OF-SELECTION.
  " Fill context
  DATA(lr_context) = NEW ts_context( p_fld_01 = 777
                                     p_path   = 'C:\ok.txt' ).
  " Initialize with context
  DATA(lo_screen) = NEW zcl_eui_screen( iv_dynnr   = '1010'
                                        ir_context = lr_context ).
  " Screen options
  lo_screen->customize( it_ = VALUE #(
   ( name = 'P_FLD_01' required = '1' )
   ( name = 'P_PATH'   input    = '0' ) ) ).

  " If pressed OK. For PAI & PBO methods pass IO_HANDLER = ME
  CHECK lo_screen->popup( iv_col_end = 118 )->show( ) = 'OK'.
  MESSAGE 'Ok' TYPE 'S'.

AT SELECTION-SCREEN OUTPUT.
  lo_screen->pbo( ).
```

![image](https://user-images.githubusercontent.com/36256417/85922077-7e377d80-b8a2-11ea-995d-2d71c9dce4e6.png)

</div> <!-- This close tag must be left aligned. -->
</div>

<div class="tab-pane fade" id="free">
<div class="container-fluid" markdown="1">
``` abap
REPORT zeui_test_screen_02.

" No screen declaration
NEW zcl_eui_screen(
 " Virtual screen number
 iv_dynnr       = zcl_eui_screen=>mc_dynnr-free_sel
 " Pass only context
 ir_context     = NEW ts_context( )

 " Set PAI & PBO handlers (optional)
)->show( io_handler = me ).


" Before ->show( ) method, you can call ->popup( ) or ->set_status( ) methods in a chain form
 
...

*  ME-> should contain
  METHODS:
  " Process commands of STATUS_MANY_BUTTONS
  on_pai_event FOR EVENT pai_event OF zif_eui_manager
    IMPORTING
        sender
        iv_command.
...
  
  METHOD on_pai_event.
    " Who send event ?
    DATA(lo_screen) = CAST zcl_eui_screen( sender ).
    " Get content
    DATA(ls_context) = CAST ts_context( lo_screen->get_context( ) ).
```

![image](https://user-images.githubusercontent.com/36256417/85922679-15063900-b8a7-11ea-9ed3-2f1142781772.png)


</div> <!-- This close tag must be left aligned. -->
</div>

<div class="tab-pane fade" id="popup">
<div class="container-fluid" markdown="1">
``` abap
REPORT zeui_test_screen_02.

" No screen declaration
" For simple cases (No PAI, PBO. 2 buttons only)
NEW zcl_eui_screen(
 " Virtual screen number
 iv_dynnr   = zcl_eui_screen=>mc_dynnr-dynamic
 " Pass only context
 ir_context = NEW ts_context( ) )->show( ).
```

![image](https://user-images.githubusercontent.com/36256417/85922613-927d7980-b8a6-11ea-9f8b-6b01a9ed428d.png)

</div> <!-- This close tag must be left aligned. -->
</div>
</div>
</div>

Usually, to customize the screen, the developer:
1. Initializes the screen with data by passing context
    * Filling `TABLES: ZSS_SCREEN_0200.` for regular screens
    * Filling parameters of `SELECTION-SCREEN BEGIN OF SCREEN` for selection screens    
1. Performs PBO logic
    * `SET PF-STATUS`, `SET TITLEBAR`
    * `AT SELECTION-SCREEN OUTPUT. -> pbo( ) -> LOOP AT SCREEN`    
1. Next is checking user input
    * `AT SELECTION-SCREEN. -> pai( ) -> MESSAGE TYPE 'E'`    
1. After the screen show, further processing of the user entered data
    * `DATA(lv_value) = ZSS_SCREEN_0200-FIELD_01.`

If you use global classes, you probably know the feeling of the archaic nature of this method<br/>
We will consider each step separately.
    
---

### 1) Context transfer

Whether it’s web-dynpro, selection or regular screens, it’s most convenient to use a structure to describe the screen.<br/>
In it, you can specify the correct data element and text, search helps etc.

That is, you can say the structure is your screen. **structure = screen**

For the class **ZCL_EUI_SCREEN** is often sufficient to pass such a structure<br/>
It will contain the name of the fields and the initial values.
```abap
    " Checked SCREEN context
    BEGIN OF ts_context,
      p_bukrs  TYPE bukrs,
      p_bdc_m  TYPE ettcd_mode, " <-- listbox by domain
      p_mandt  TYPE t001-mandt, " <-- listbox in runtime
      p_check  TYPE xsdboolean,
      s_user   TYPE offline_log_user_itab, " Range <-- cl_ci_query_attributes no SH
      p_land1  TYPE t005t-land1,
      p_fld_i  TYPE syindex,       " do not use i! use from dictionary
      p_fld_i2 TYPE sytabix,       " do not use i! use from dictionary
      " p_memo     TYPE stringval, " String & tables also Ok
    END OF ts_context,
```

If you just need to pass the initial values to the screen fill **ir_context** parameter
```abap
    DATA(lo_scr_1020) = NEW zcl_eui_screen(
        ir_context = new ts_context( p_bukrs = '1000' )
    ).
```   
         
For item **4)** after closing the screen, through the context you can get the values entered by a user<br/>
So actually ir_context works like **CHANGING** parameter

```abap
    DATA(lr_context) = new ts_context( p_bukrs = '1000' ).

    " Context transfer
    DATA(lo_scr_1020) = NEW zcl_eui_screen(
        ir_context = lr_context ).

    " If the user clicked OK
    check lo_scr_1020->show( ) = 'OK'.

    " Get result
    DATA(lv_new_bukrs) = lr_context->p_bukrs.
```


### 1.1) Screen number IV_DYNNR

`new zcl_eui_screen( iv_dynnr = )` could contain virtual values

If you are familiar with two common SAP techniques,<br/>
You do not need to declare the screen through `SELECTION-SCREEN BEGIN OF SCREEN` in the program, just use:

* CALL FUNCTION **'FREE_SELECTIONS_DIALOG'**
    * `new zcl_eui_screen( iv_dynnr = zcl_eui_screen=>mc_dynnr-free_sel )`    
* **CL_CI_QUERY_ATTRIBUTES**=>GENERIC( )
    * `new zcl_eui_screen( iv_dynnr = zcl_eui_screen=>mc_dynnr-dynamic )`
* If you want to use your own screen, already declared in another program. Specify it in the constructor
    * `new zcl_eui_screen( iv_dynnr = '1020'  iv_cprog = 'ZEUI_TEST_SCREEN_02' )`
    
***

### 2) PBO
**2.1** To use custom PF-STATUS and TITLEBAR, pass them after the calling the constructor in SET_STATUS method

```abap
    " PF-STATUS & SET TITELEBAR 
    DATA(lo_scr_1020) = NEW zcl_eui_screen( iv_dynnr = '1020'
      )->set_status( VALUE #( title = 'Screen title'
                              prog  = sy-cprog
                              name  = 'STATUS_MANY_BUTTONS' ) ).
```

**2.2** LOOP AT SCREEN

Often in PBO this block is quite confusing<br/>
On the idea of setting SCREEN through the parameters I saw here https://entropii.net/?p=2927

I hope the meaning of this syntax is clear without explanation, since the parameters correspond to the **SCREEN** fields

SE38 -> **ZEUI_TEST_SCREEN_00**
```abap
  " Gray
  lo_screen->customize( name = 'P_FLD_01' input = '0' ).

  " Obligatory & change text
  lo_screen->customize(
    name     = 'P_FLD_02'
    required = '1'
    iv_label = 'Make required'  ).

  " Hide by mask
  lo_screen->customize(
    name      = '*P_0*'
    input     = '0'
    active    = '0'
    invisible = '1' ).

  " Hide or show by group
  lo_screen->customize(
    group1    = COND #( WHEN p_radio1 = abap_true THEN 'GR1' ELSE 'GR2' )
    input     = '1'
    active    = '1'
    invisible = '0' ).

    " Set listbox
  lo_screen->customize(
    name       = 'P_MANDT'
    required   = '1'
    iv_label   = 'Client number'
    it_listbox = lt_listbox ).
```

Also you can pass multiple rules in a one table
![image](https://user-images.githubusercontent.com/36256417/81519414-98e97d80-935a-11ea-8129-3cc01da448bc.png)

It's more convenient from ABAP 7.40 syntax
![image](https://user-images.githubusercontent.com/36256417/81519260-0943cf00-935a-11ea-99dc-1972b9e90ab9.png)

***

### 3) User input validation
Like all child classes of **ZCL_EUI_MANAGER** handlers for **PAI** or PBO (if screen->customize( ) is not enough) can be passed to the SHOW method

![image](https://user-images.githubusercontent.com/36256417/81134948-cb1c6900-8f6f-11ea-8182-0d62843492ef.png)

```abap
    " Next screen interation
    lv_cmd = lo_screen_main->show(
     io_handler      = lo_handler
     " by default call all handlers (For clarity purpose)
     iv_handlers_map = 'ON_START_PAI' ).

    " Pressed cancel
    IF lv_cmd NP 'CMD_*'.
      RETURN. " Cancel pressed
    ENDIF.
```

Handler ON_START_PAI accepts the function code **IV_COMMAND** and can close the current screen __CV_CLOSE->* = 'X'__ 

![image](https://user-images.githubusercontent.com/36256417/81135290-f3589780-8f70-11ea-8767-f66fd56b1c55.png)


Since all 4 methods have the same signature, the actions they perform are similar<br/>
So after closing the screen, the SHOW method always returns the last function code. Often enough to check it for 'OK'

```abap
    " If pressed OK
    CHECK lo_screen->show( ) = 'OK'.
``` 

### 4) Post Processing
About item 4), it has already been written above that the context can be passed (and then received) through the **ir_context** parameter.<br/>
After closing the screen, it will contain the entered data.

```abap
    DATA(lo_scr_1020) = NEW zcl_eui_screen(
        ir_context = new ts_context( p_bukrs = '1000' )
    ).
```

Usually a reference to the **local** structure is suitable for this.<br/>
To get it and read the current context in PAI you need to use the **get_context** method<br/>
But firstly the **sender** must be converted to **ZCL_EUI_SCREEN**

```abap
METHOD on_start_pai.  
  " Main Screen Structure
  DATA lr_context TYPE REF TO TS_CONTEXT_MAIN.

  " Get access to screen data
  data(lo_screen) = cast ZCL_EUI_SCREEN( sender ).
  lr_context ?= lo_screen->get_context( ).

  " For demo only
  IF lr_context->FIELD_01 IS INITIAL.
    MESSAGE 'Field is initial' TYPE 'S' DISPLAY LIKE 'E'.
    RETURN.
  ENDIF.

  cv_close->* = abap_true.
ENDMETHOD.
```