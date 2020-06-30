---
parent: "AQO - options"
title: "Class based options"
nav_order: 05
permalink: /aqo/se24-zcl_aqo_tester/
---

### Create an option
SE24 -> **ZCL_AQO_TESTER**

To create an option based on class attributes, just press F8.

![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/00_se24_01.png)

[The description of the fields](../se38-zaqo_test/) is similar to the description of the structure

![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/00_se24_attr.png)

except that attributes must be **PUBLIC** and **READ-ONLY**\
They can be either:
* Instance Attribute
* Static Attribute\
but not both at the same time (otherwise an exception will occur)

![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/00_se24_friends.png)

Since **READ-ONLY** attributes cannot be changed outside the class you need to add **ZCL_AQO_OPTION** to the class friends.\
_If you forget to do this, a special reminder will be issued at runtime_ 

***

### When make initialization

It is advisable to call the setup creation code once in **CONSTRUCTOR** or in **CLASS-CONSTRUCTOR**

```abap
  " Default values! For simple types use initilazation in declaration itself

  " Optional initialization
  APPEND INITIAL LINE TO me->bukrs_range ASSIGNING <ls_bukrs>.
  <ls_bukrs>-sign   = 'I'.
  <ls_bukrs>-option = 'BT'.
  <ls_bukrs>-low    = '1000'.
  <ls_bukrs>-high   = '3000'.

  SELECT * INTO TABLE me->t002_tab
  FROM t002.

  " Read new values
  TRY.
      zcl_aqo_option=>create(
        iv_package_id = '$TMP'                " Package    "#EC NOTEXT
        iv_option_id  = 'Class options'(op1)  " Any text < 30 symbols
        " Public read-only attributes is options!
        " CLASS-DATA or DATA (but not both)
        io_data       = me
        " iv_repair     = abap_true
      ).
    CATCH zcx_aqo_exception INTO lo_error.
      MESSAGE lo_error TYPE 'S' DISPLAY LIKE 'E'.
      RETURN.
  ENDTRY.
```

After that, the attributes of **ME->*** will contain the data that the developer or consultant could change in one of the [maintenance programs](../which-transaction-to-choose)