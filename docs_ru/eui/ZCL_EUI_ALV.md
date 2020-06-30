---
parent: "EUI - интерфейс пользователя"
nav_order: 10
title: "ALV менеджер"
tags: [zcl_eui_alv]
permalink: /ru/eui/zcl_eui_alv/1
date: 2020-05-02
---

### **ALV внутри другого ALV**
{: .no_toc }
Как показать консультанту что сумма рассчитана правильно?

Часто само написание отчета занимает немного времени, но ~~дальнейшая "Разборка в Бронксе"~~ совместный поиск ошибки занимает намного больше физических и ментальных усилий, как разработчика так и постановщика задачи.

Один из самых простых способов - это показать в popup ALV из чего сложилась данная сумма.<br/>
Те предположим что отчет с collect-ил сумму в основной таблице, при drilldown показываем все позиции из чего данную сумму собрали   

![](https://raw.githubusercontent.com/wiki/bizhuka/py_demo/src/alv_0.png)

***

### Примеры ZCL_EUI_ALV

<div class="tab-header">
<ul class="nav nav-tabs">
  <li class="active">
    <a data-toggle="tab" href="#basic">Простой показ</a>
  </li>
  <li>
    <a data-toggle="tab" href="#sums">Суммы & проваливание</a>
  </li>
  <li>
    <a data-toggle="tab" href="#popup">В виде диалога</a>
  </li>
  <li>
    <a data-toggle="tab" href="#handler">События</a>
  </li>
</ul>
</div>

<div class="tab-content">
  <div class="tab-pane active" id="basic">
<div class="container-fluid" markdown="1">    
``` abap
" Тестовые данные
SELECT * INTO TABLE @DATA(lt_flight)
FROM sflight.

" Создаем ALV & передаем таблицу
DATA(lo_alv) = NEW zcl_eui_alv(
  ir_table = REF #( lt_flight ) ).

" Показ в полном экране
lo_alv->show( ).
```

![image](https://user-images.githubusercontent.com/36256417/85850294-5a0a6c80-b7ce-11ea-9a98-c47cea184103.png)


</div> <!-- This close tag must be left aligned. -->
  </div>
  <div class="tab-pane" id="sums">
<div class="container-fluid" markdown="1">
``` abap
" Тестовые данные
SELECT * INTO TABLE @DATA(lt_flight) FROM sflight.

" Создаем ALV & передаем таблицу
DATA(lo_alv) = NEW zcl_eui_alv(
  ir_table = REF #( lt_flight )
  " Set title
  is_layout = VALUE lvc_s_layo( grid_title = `Demo title`
                                smalltitle = 'X' )
  " Hotspot & суммы по маске
  it_mod_catalog = VALUE lvc_t_fcat( ( fieldname = 'CONNID' hotspot = 'X' )
                                     ( fieldname = 'SEATS*' do_sum  = 'X' ) ) ).

" Показ в полном экране
lo_alv->show( ).
```

![image](https://user-images.githubusercontent.com/36256417/85851272-2c262780-b7d0-11ea-8e62-e170d58dc18b.png)


</div> <!-- This close tag must be left aligned. -->
  </div>
  <div class="tab-pane" id="popup">
<div class="container-fluid" markdown="1">

``` abap
" Тестовые данные
SELECT * INTO TABLE @DATA(lt_flight) FROM sflight.

" Создаем ALV & передаем таблицу
NEW zcl_eui_alv(
  ir_table = REF #( lt_flight )

  " Поля статуса
  iv_status_title = `Status of popup`

  " Если не передаем
  " -> Ok + Cancel (режим редактирования)
  " -> Cancel (режим просмотра)
*  iv_status_prog  = sy-cprog
*  iv_status_name  = 'STATUS_MANY_BUTTONS'

" <<< Просто вызвать до SHOW( ) >>>
)->popup(
 iv_col_end = 108 " Set 'Width' optional
 iv_row_end = 15  " Set 'Height' optional

" Показ в диалоге
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
  " Стандартные события CL_GUI_ALV_GRID
  on_hotspot_click FOR EVENT hotspot_click OF cl_gui_alv_grid
    IMPORTING
        sender     " <-- сам объект CL_GUI_ALV_GRID
        e_row_id
        e_column_id,

  on_user_command FOR EVENT user_command OF cl_gui_alv_grid
    IMPORTING
        e_ucomm,

  " Используем split container
  on_top_of_page FOR EVENT top_of_page OF cl_gui_alv_grid
    IMPORTING
        e_dyndoc_id. " <-- REF TO CL_DD_DOCUMENT

...

" Создаем ALV & тулбар
DATA(lo_alv) = NEW zcl_eui_alv(
  ir_table   = REF #( lt_flight )
  it_toolbar = VALUE ttb_button( ( function = 'TEST_BUTTON'
                                   icon     = icon_complete
                                   text     = 'Press me!' ) ) ).

" <<<Установка обработчиков событий за раз>>>
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

### Описание класса обертки

Азы и Буки большинства ABAP-ра наверное классы **CL_GUI_ALV_GRID** и **CL_SALV_TABLE**

Хоть и последний является более новым, он:
* по умолчанию не поддерживает  редактирование (есть конечно же несколько видов трюков как это можно обойти)
* настройка field catalog, toolbar, layout и variant происходит через вызовы методов<br/>
те имхо CL_SALV_TABLE более многословный чем CL_GUI_ALV_GRID (начиная с 7.40) где вся настройка ALV происходит, по старинке, через таблицы и структуры 

CL_GUI_ALV_GRID в свою очередь имеет 1 но очень существенный недостаток - рисовать скрины для основной и popup таблицы ~~любят делать мазохисты~~ весьма утомительное занятие для и без того загруженного работой программиста ~~между сном и просмотрами сериальчика во время обеда~~

***

Для простых случаев весь показ ALV можно написать почти 1 строкой

```abap
 NEW zcl_eui_alv( ir_table = REF #( mt_alv ) )->
    popup( )->
    show( ).
```
Написано в 3 строки для ясности<br/>
Да и то что *можно* так писать, не означает что так *нужно* делать

***

### Более подробно
{: .no_toc }
Сразу перейдем к синтаксису 7.40

### 1) CREATE
```abap
      " Create new ALV
      DATA(lo_alv) = NEW zcl_eui_alv(
       " Данные для проваливания
       ir_table       = REF #( lt_rt )

       " Что за виды оплат используем
       it_filter      = VALUE LVC_T_FILT( ( fieldname = 'LGART'
                                            sign      = 'I'
                                            option    = 'EQ'
                                            low       = '0101' ) )

       " Поставим поле сумма ближе к началу
       it_mod_catalog = VALUE LVC_T_FCAT( ( fieldname = 'BETRG'
                                            col_pos   = 5
                                            do_sum    = 'X' ) )

       " В шапке табельный номер + тех информация
       is_layout      = VALUE LVC_S_LAYO(
          grid_title = |{ <ls_alv>-pernr } - ({ <ls_lgart>-label })|
          smalltitle = abap_true )

       " Если данных много лучше дополнительно сгруппировать данные
       it_sort        = VALUE LVC_T_SORT(
         ( fieldname = 'SRTZA' subtot = abap_true expa = abap_true )
         ( fieldname = 'LGART' subtot = abap_true expa = abap_true ) ) ).
```

Для тех кто помнит не только REUSE, но и вывод отчетов с помощью `WRITE` + COLOR + HOTSPOT события ~~тот старый пердун~~ все думаю понятно.<br/>
А так однократное проваливание в LVC_S_LAYO и DISVARIANT (вариант) и двукратное проваливание LVC_T_FILT, LVC_T_FCAT, TTB_BUTTON (toolbar) и LVC_T_SORT снимет большинство вопросов про то как это работает.

Параметр **IT_MOD_CATALOG** не собранный с нуля field catalog! Он просто дополняет его не пустыми значениями. Также для удобства можно указывать маску для полей<br/>
`fieldname = 'SUM*' do_sum = 'X' hotspot = 'X'`

---

### 2) POPUP
Как и в SALV если popup не нужен ничего не делаем, иначе вызываем

```abap
      " As popup
      lo_alv->popup( ).
```
В него можно передать размеры окна
* IV_COL_BEG
* IV_COL_END
* IV_ROW_BEG
* IV_ROW_END 

Собственно ради этого метода и создавался данный класс (вложенность popup ограничена 7 экранами) 

---

### 3) SHOW 
Вызываем сам показ ALV

```abap
      " show ALV
      lo_alv->show( ).
```

Данный метод возвращает код функции закрытия. К примеру если `check lo_alv->show( ) = 'OK'.`<br/>
PF-STATUS и TITLE BAR можно указать статический в конструкторе или динамический по событию
 
```abap
      on_pbo_event FOR EVENT pbo_event OF zif_eui_manager
        IMPORTING
            sender    "<-- CAST to ZCL_EUI_ALV
            iv_dynnr.
```
В данном событии можно получить сам контрол **CL_GUI_ALV_GRID** вызвав `ZCL_EUI_ALV->GET_GRID( )`

Но в большинстве случаев в **SHOW** можно передать объект **io_handler** который может иметь обработчики события CL_GUI_ALV_GRID:
* on_user_command
* on_hotspot_click
* on_double_click
* on_toolbar
* on_top_of_page
* on_data_changed

В них **sender** это и есть CL_GUI_ALV_GRID.

---

### Редактирование

Последний handler **on_data_changed** нужен только для случая когда редактируется GRID LVC_S_LAYO-EDIT = 'X' или отдельное поле LVC_S_FCAT-EDIT

Проверку введенных данных можно осуществить в методе
```abap
      on_pai_event FOR EVENT pai_event OF zif_eui_manager
        IMPORTING
            iv_command
            cv_close. " Установите cv_close->* = abap_false для отмены закрытия
```

Если двух кнопок 'OK' и 'CANCEL' не достаточно (только CANCEL для режима READ_ONLY)

*небольшая ремарка*
* можно поменять статус по событию **on_pbo_event** (для динамики)
* Или 1 раз в конструкторе (при статике)
  * IV_STATUS_NAME
  * IV_STATUS_PROG
  * IT_STATUS_EXCLUDE
  * IV_STATUS_TITLE