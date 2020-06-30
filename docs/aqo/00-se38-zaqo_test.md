---
parent: "AQO - options"
title: "Structure based options"
nav_order: 03
permalink: /aqo/se38-zaqo_test/
---

### Create an option
SE38 -> **ZAQO_TEST**

To create an option, simply run the program in DEV system.

![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/00_se38_01.png)

Based on the structure description below, 4 types of fields will be created:

![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/00_se38_struc.png)

### Fields' types

**№1** PARAMETERS\
**№2** SELECT-OPTIONS\
**№3** TABLES\
**№4** STRINGS

It is advisable to create an option once during **INITIALIZATION** or **START-OF-SELECTION** events

```abap
    " Initials values in editor
    set_default_values(
     CHANGING
       cs_opt = ms_opt  ).

    " Or use class attributes
    GET REFERENCE OF ms_opt INTO lv_ref.           " ! Ref to data

    " Read new values
    TRY.
        zcl_aqo_option=>create(
          iv_package_id = '$TMP'               " Package  "#EC NOTEXT
          iv_option_id  = 'Main options'(op1)  " Any text < 30 symbols
          ir_data       = lv_ref               " REF #( ms_opt )
          " iv_repair     = abap_true
        ).
      CATCH zcx_aqo_exception INTO lo_error.
        MESSAGE lo_error TYPE 'S' DISPLAY LIKE 'E'.
        RETURN.
    ENDTRY.
```

After that **ms_opt** will contain the data that the developer or consultant could change in one of the [maintenance programs](../which-transaction-to-choose)

---

### Option view button

And after restarting the program, the GOS like menu will be available (only in **Z*** transactions)

![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/00_se38_menu_dev.png)


Which can be hidden through options
![image](https://user-images.githubusercontent.com/36256417/81139494-6537dd80-8f7f-11ea-86d8-4449487200e5.png)

If there are several options in 1 program, the menu will be slightly different   

![image](https://user-images.githubusercontent.com/36256417/81139118-12115b00-8f7e-11ea-8160-e46d5be76b11.png)

---

In a test and productive system, this menu will look like this

![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/00_se38_menu_test.png)