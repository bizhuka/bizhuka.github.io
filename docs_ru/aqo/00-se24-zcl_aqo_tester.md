---
parent: "AQO - настройки"
title: "Настройки на основе класса"
nav_order: 05
permalink: /ru/aqo/se24-zcl_aqo_tester/
---

### Создание настройки
SE24 -> **ZCL_AQO_TESTER**

Чтобы создать настройку на основе атрибутов класса просто нажмите F8.

![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/00_se24_01.png)

[Описание полей](../se38-zaqo_test/) аналогично описанию структуры

![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/00_se24_attr.png)

за исключением того что атрибуты должны быть **PUBLIC** и **READ-ONLY**\
Они могут быть или:
* Instance Attribute
* Static Attribute\
но не оба вида в одной настройке (в противном случае возникнет исключение)

![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/00_se24_friends.png)

Так как **READ-ONLY** атрибуты не могут быть изменены вне класса нужно добавить **ZCL_AQO_OPTION** в друзья.\
_Если вы забыли это сделать выйдет специальное напоминание во время выполнения_ 

***

### Когда делать инициализацию

Сам код создания настройки желательно вызвать однократно в **CONSTRUCTOR** или **CLASS-CONSTRUCTOR**

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

После этого атрибуты **ME->*** содержать данные которые может изменить разработчик или консультант в одной из [программ ведения](../which-transaction-to-choose)