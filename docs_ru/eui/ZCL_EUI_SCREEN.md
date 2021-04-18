---
parent: "EUI - интерфейс пользователя"
nav_order: 60
title: "SCREEN Менеджер экранов"
tags: [zcl_eui_screen]
permalink: /ru/eui/zcl_eui_screen/1
date: 2020-05-06
---

### Менеджер экранов
{: .no_toc }

Если у вас есть глобальный класс, как правильно использовать в нем экраны?<br/>
Согласно рекомендации SAP можно использовать группы функций.<br/>
Но насколько удобен подобный способ? 

![image](https://user-images.githubusercontent.com/36256417/81061683-3887b580-8eee-11ea-8343-b55a1da73fc8.png)

***

### Примеры ZCL_EUI_SCREEN
SE38 -> **ZEUI_TEST_SCREEN***


<div class="tab-header">
<ul class="nav nav-tabs">

  <li class="active">
    <a data-toggle="tab" href="#pbo">Только PBO</a>
  </li>

  <li>
    <a data-toggle="tab" href="#context">Передача контекста</a>
  </li>

<li role="presentation" class="dropdown">
    <a href="#" class="dropdown-toggle" data-toggle="dropdown">Динамические экраны<span class="caret"/>
    </a>
    <ul class="dropdown-menu">
        <li>
            <a href="#free" data-toggle="tab">На основе FREE_SELECTIONS_DIALOG</a>
        </li>
        <li>
            <a href="#popup" data-toggle="tab">На основе CL_CI_QUERY_ATTRIBUTES</a>
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
  " Правила для SELECTION-SCREEN
  DATA(lo_screen) = NEW zcl_eui_screen( iv_dynnr = '1000' ).

  " Сделать это ОБЯЗАТЕЛЬНЫМ
  lo_screen->customize( name     = 'P_OBL'
                        required = '1' ).
  " Серые поля по маске
  lo_screen->customize( name   = 'P_GRY*'
                        input  = '0' ).
  " Скроем по SCREEN-GROUP1
  lo_screen->customize( group1    = 'HID'
                        input     = '0'
                        active    = '0'
                        invisible = '1' ).
  " Применим все правила
  lo_screen->pbo( ).
```

![image](https://user-images.githubusercontent.com/36256417/85921360-9bb61880-b89d-11ea-90ff-c57ee1c41eac.png)

</div> <!-- This close tag must be left aligned. -->
</div>

<div class="tab-pane fade" id="context">
<div class="container-fluid" markdown="1">
``` abap
REPORT ztest_screen2.

" Экран 1010
SELECTION-SCREEN BEGIN OF SCREEN 1010 AS SUBSCREEN.
SELECTION-SCREEN BEGIN OF BLOCK bl_1010 WITH FRAME TITLE TEXT-tit.
PARAMETERS : p_fld_01 TYPE sytabix,
             p_path   TYPE text255.
SELECTION-SCREEN END OF BLOCK bl_1010.
SELECTION-SCREEN END OF SCREEN 1010.

" Если ЭКРАН в другой программе передадим значения
TYPES:
  BEGIN OF ts_context,
    p_fld_01 TYPE sytabix,
    p_path   TYPE text255,
  END OF ts_context.

START-OF-SELECTION.
  " Заполнение контекста
  DATA(lr_context) = NEW ts_context( p_fld_01 = 777
                                     p_path   = 'C:\ok.txt' ).
  " Передача контескта
  DATA(lo_screen) = NEW zcl_eui_screen( iv_dynnr   = '1010'
                                        ir_context = lr_context ).
  " Параметры экрана
  lo_screen->customize( it_ = VALUE #(
   ( name = 'P_FLD_01' required = '1' )
   ( name = 'P_PATH'   input    = '0' ) ) ).

  " Если нажали OK. Для PAI & PBO нужно передать IO_HANDLER = ME
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

" Нет объявления экрана 
NEW zcl_eui_screen(
 " Номер виртуального экрана
 iv_dynnr       = zcl_eui_screen=>mc_dynnr-free_sel
 " Передаем только контекст
 ir_context     = NEW ts_context( )

 " SET PF-STATUS & SET TITLEBAR
* iv_status_prog  = sy-cprog
* iv_status_name  = 'STATUS_MANY_BUTTONS'
* iv_status_title = 'Screen title'
 
 " Для PAI & PBO нужен io_handler (optional)
)->show( io_handler = me ).

...

*  ME-> should contain
  METHODS:
  " Обработка команд из STATUS_MANY_BUTTONS
  on_pai_event FOR EVENT pai_event OF zif_eui_manager
    IMPORTING
        sender
        iv_command.
...
  
  METHOD on_pai_event.
    " Кто посылает событие?
    DATA(lo_screen) = CAST zcl_eui_screen( sender ).
    " Получим контекст
    DATA(ls_context) = CAST ts_context( lo_screen->get_context( ) ).
```

![image](https://user-images.githubusercontent.com/36256417/85922679-15063900-b8a7-11ea-9ed3-2f1142781772.png)


</div> <!-- This close tag must be left aligned. -->
</div>

<div class="tab-pane fade" id="popup">
<div class="container-fluid" markdown="1">
``` abap
REPORT zeui_test_screen_02.

" Нет объявления экрана
" Для простых случаев (Нет PAI, PBO. Только 2 кнопки)
NEW zcl_eui_screen(
 " Номер виртуального экрана
 iv_dynnr   = zcl_eui_screen=>mc_dynnr-dynamic
 " Передаем только контекст
 ir_context = NEW ts_context( ) )->show( ).
```

![image](https://user-images.githubusercontent.com/36256417/85922613-927d7980-b8a6-11ea-9f8b-6b01a9ed428d.png)

</div> <!-- This close tag must be left aligned. -->
</div>
</div>
</div>

Обычно чтобы настроить экран разработчик:
1. Инициализирует экран данными посредством передачи контекста
    * Заполнение `TABLES: ZSS_SCREEN_0200.` для обычных экранов
    * Заполнение полей `SELECTION-SCREEN BEGIN OF SCREEN` для селективных    
1. Выполняет логику PBO 
    * `SET PF-STATUS`, `SET TITLEBAR`
    * `AT SELECTION-SCREEN OUTPUT. -> pbo( ) -> LOOP AT SCREEN`    
1. Далее идет проверка ввода пользователя
    * `AT SELECTION-SCREEN. -> pai( ) -> MESSAGE TYPE 'E'`    
1. После показа идет дальнейшая обработка введенных данных
    * `DATA(lv_value) = ZSS_SCREEN_0200-FIELD_01.`

Если вы используете глобальные классы, вам наверное знакомо ощущение всей архаичности такого способа<br/>
Рассмотрим каждый шаг по отдельности
    
---

### 1) Передача контекста

Будь то web-dynpro, селективные или обычные экраны, удобнее всего использовать структуру для описания экрана.<br/>
В нем можно указать правильный элемент данных и текстом, средство поиска итп.

То есть можно сказать структура и есть ваш экран. **структура=экран**

Для этого классу **ZCL_EUI_SCREEN** зачастую достаточно передать такую структуру<br/>
Она будет содержать наименование полей и начальные значения
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

Если вам нужно просто передать начальные значения в экран заполните **ir_context**
```abap
    DATA(lo_scr_1020) = NEW zcl_eui_screen(
        ir_context = new ts_context( p_bukrs = '1000' )
    ).
```   
         
Для пункта **4)** после закрытия экрана, через контекст можно получить введенные пользователям значения<br/>
Те по своей сути ir_context работает как **CHANGING** параметр

```abap
    DATA(lr_context) = new ts_context( p_bukrs = '1000' ).

    " Передача контекста
    DATA(lo_scr_1020) = NEW zcl_eui_screen(
        ir_context = lr_context ).

    " Если пользователь нажал OK
    check lo_scr_1020->show( ) = 'OK'.

    " Получаем результат
    DATA(lv_new_bukrs) = lr_context->p_bukrs.
```


### 1.1) Номер экрана IV_DYNNR

`new zcl_eui_screen( iv_dynnr = )` может содержать виртуальные значения

Если вы знакомы с двумя распространенными техниками SAP,<br/>
Вам не надо объявлять экран через `SELECTION-SCREEN BEGIN OF SCREEN` в программе, просто используйте:

* CALL FUNCTION **'FREE_SELECTIONS_DIALOG'**
    * `new zcl_eui_screen( iv_dynnr = zcl_eui_screen=>mc_dynnr-free_sel )`    
* **CL_CI_QUERY_ATTRIBUTES**=>GENERIC( )
    * `new zcl_eui_screen( iv_dynnr = zcl_eui_screen=>mc_dynnr-dynamic )`
* Если вы хотите использовать свой, уже объявленный в другой программе, экран. Укажите его в конструкторе
    * `new zcl_eui_screen( iv_dynnr = '1020'  iv_cprog = 'ZEUI_TEST_SCREEN_02' )`
    
***

### 2) PBO
**2.1** Для использования кастомного PF-STATUS и TITLEBAR передайте их в конструктор

```abap
    " PF-STATUS & SET TITELEBAR 
    DATA(lo_scr_1020) = NEW zcl_eui_screen(
        iv_status_prog  = c_cprog
        iv_status_name  = 'START_STATUS'
        iv_status_title = 'Start screen' )
```

**2.2** LOOP AT SCREEN

Часто в PBO данный блок является довольно запутанным<br/>
На идею настройки SCREEN через параметры увидел тут https://entropii.net/?p=2927

Смысл такого синтаксиса надеюсь понятен и без объяснения, так как параметры соответствуют полям **SCREEN**

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

Также вы можете передать несколько правил в одной таблице
![image](https://user-images.githubusercontent.com/36256417/81519414-98e97d80-935a-11ea-8129-3cc01da448bc.png)

Это немного удобнее с ABAP 7.40
![image](https://user-images.githubusercontent.com/36256417/81519260-0943cf00-935a-11ea-99dc-1972b9e90ab9.png)

***

### 3) Проверка ввода пользователя
Как и все дочерние классы **ZCL_EUI_MANAGER** обработчик для **PAI** или PBO (если screen->customize( ) не хватает) можно передать в метод SHOW

![image](https://user-images.githubusercontent.com/36256417/81134948-cb1c6900-8f6f-11ea-8182-0d62843492ef.png)

```abap
    " Next screen interation
    lv_cmd = lo_screen_main->show(
     io_handler      = lo_handler
     " ПУ вызывает все хэндлеры (имя для ясности)
     iv_handlers_map = 'ON_START_PAI' ).

    " Pressed cancel
    IF lv_cmd NP 'CMD_*'.
      RETURN. " Cancel pressed
    ENDIF.
```

Handler ON_START_PAI принимает код функции **IV_COMMAND** и может закрыть текущий экран __CV_CLOSE->* = 'X'__ 

![image](https://user-images.githubusercontent.com/36256417/81135290-f3589780-8f70-11ea-8767-f66fd56b1c55.png)


Так как все 4 метода имеют одинаковую сигнатуру, то и выполняемые ими действия имеют сходный характер<br/>
Так после закрытия экрана, метод SHOW всегда возвращает последний код функции. Зачастую достаточно проверить его на 'OK'

```abap
    " If pressed OK
    CHECK lo_screen->show( ) = 'OK'.
``` 

### 4) Обработка введенных данных
Про пункт 4) уже было написано выше что контекст можно передать (и потом получить) через параметр **ir_context**.<br/>
После закрытия экрана он будет содержать введенные данные.

```abap
    DATA(lo_scr_1020) = NEW zcl_eui_screen(
        ir_context = new ts_context( p_bukrs = '1000' )
    ).
```

Обычно для этого подходит ссылка на **локальную** структуру.<br/>
Чтобы получить ее и прочитать текущий контекст в PAI нужно воспользоваться методом **get_context**<br/>
Предварительно ссылку **sender** надо преобразовать на **ZCL_EUI_SCREEN**

```abap
METHOD on_start_pai.  
  " Структура основного экрана
  DATA lr_context TYPE REF TO TS_CONTEXT_MAIN.

  " Доступ к данным (чтение) экрана
  data(lo_screen) = cast ZCL_EUI_SCREEN( sender ).
  lr_context ?= lo_screen->get_context( ).

  " Для примера
  IF lr_context->FIELD_01 IS INITIAL.
    MESSAGE 'Field is initial' TYPE 'S' DISPLAY LIKE 'E'.
    RETURN.
  ENDIF.

  cv_close->* = abap_true.
ENDMETHOD.
```