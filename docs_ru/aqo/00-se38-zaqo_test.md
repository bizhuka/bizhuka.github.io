---
parent: "AQO - настройки"
title: "Настройки на основе структуры"
nav_order: 03
permalink: /ru/aqo/se38-zaqo_test/
---

### Создание настройки
SE38 -> **ZAQO_TEST**

Чтобы создать настройку просто запустите программу в DEV.

![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/00_se38_01.png)

На основе описания этой структуры создастся 4 вида полей:

![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/00_se38_struc.png)

### Виды полей

**№1** PARAMETERS\
**№2** SELECT-OPTIONS\
**№3** TABLES\
**№4** STRINGS

Сам код создания настройки желательно вызвать однократно во время **INITIALIZATION** или **START-OF-SELECTION**

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

После этого **ms_opt** будет содержать данные которые может изменить разработчик или консультант в одной из [программ ведения](../which-transaction-to-choose)

---

### Кнопка просмотра настройки

И после перезапуска программы будет доступно меню наподобие GOS (только в **Z*** транзакциях)

![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/00_se38_menu_dev.png)


Которое можно скрыть посредством настроек
![image](https://user-images.githubusercontent.com/36256417/81139494-6537dd80-8f7f-11ea-86d8-4449487200e5.png)

Если настроек в одной программе будет несколько, меню будет слегка другим   

![image](https://user-images.githubusercontent.com/36256417/81139118-12115b00-8f7e-11ea-8160-e46d5be76b11.png)


---

В тестовой и продуктивной системе данное меню будет выглядеть следующим образом

![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/00_se38_menu_test.png)