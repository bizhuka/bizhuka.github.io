---
parent: "EUI - интерфейс пользователя"
nav_order: 40
title: "FILE_IO Импорт/Экспорт в Excel/CSV"
tags: [zcl_eui_file_io]
permalink: /ru/eui/zcl_eui_file_io/1
data: 2020-05-01
---

Импорт данных во внутреннюю таблицу из Excel или CSV файла с указанием мэппинга и обработкой ошибок

![image](https://user-images.githubusercontent.com/36256417/80778543-34703680-8b82-11ea-9f7a-21a4b7cd6acd.png)


***

### Примеры ZCL_EUI_FILE_IO
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
    <a data-toggle="tab" href="#checks">Проверка данных</a>
  </li>
</ul>
</div>


<div class="tab-content">
  <div class="tab-pane active" id="excel">
<div class="container-fluid" markdown="1">   

``` abap
" Тип загрузки из Excel
DATA(lo_file_io) = NEW zcl_eui_file_io(
  iv_file_name    = zcl_eui_file=>mc_extension-xlsx
  " Заголовок экрана ( для метода SHOW )
  iv_status_title = `Загруженные данные` ).

" Показ Open диалога (метод ZCL_EUI_FILE)
lo_file_io->import_from_file(
  iv_window_title = `Пожалуйста укажите файл для загрузки` ).
 
" Данные о полете
DATA(lt_import) = VALUE spfli_tab( ). 
 
" Загружаем все поля SPFLI, без проверки ошибок
lo_file_io->export_to_itab(
  ir_table        = REF #( lt_import )
  iv_row_from     = 2       " Со второй строки
).

" Если пользователь подтвердил данные в новом экране
CHECK lo_file_io->popup( )->show( ) = 'OK'.
```

</div> <!-- This close tag must be left aligned. -->
  </div>
  <div class="tab-pane" id="csv">
<div class="container-fluid" markdown="1">

``` abap
" Данные о полете
DATA(lt_import) = VALUE spfli_tab( ).

" Тип загрузки из CSV
DATA(lo_file_io) = NEW zcl_eui_file_io(
  iv_file_name    = zcl_eui_file=>mc_extension-csv ).

" Файл в виде строки
lo_file_io->import_from_string(
  iv_string   = lv_csv_data
  " ПУ UTF-8
  iv_encoding = zcl_eui_conv=>mc_encoding-utf_16le ).

" Укажем мэппинг нужных полей. Прочие будут проигнорированы
DATA(lt_mapping) = VALUE zcl_eui_file_io=>tt_excel_map(
   " Для Excel удобнее column_name = 'B', 'C', 'D'
   ( field = 'CARRID'    column_index = 2 )
   ( field = 'CONNID'    column_index = 3 )
   ( field = 'COUNTRYFR' column_index = 4 )
).

" Используем значения IV_ENCODING, IV_ROW_DELIMITER, IV_FIELD_DELIMITER пу
" Указать можно вызвав EXPORT_TO_ITAB_CSV( )
lo_file_io->export_to_itab(
  ir_table        = REF #( lt_import )
  it_excel_map    = REF #( lt_mapping )
*  iv_row_from     = 1 " С первой строки
).

" Если файл содержит данные
CHECK lt_import[] IS NOT INITIAL.
```

</div> <!-- This close tag must be left aligned. -->
  </div>
  <div class="tab-pane" id="checks">
<div class="container-fluid" markdown="1">

``` abap
...

METHODS:
  " Обработчик ошибок импорта данных (-> EXPORT_TO_ITAB)
  on_mapping_error FOR EVENT mapping_error OF zcl_eui_file_io
    IMPORTING
        iv_source    " Исходный текст
        iv_row       " Номер строки
        is_excel_map " Мэппинг поля
        io_error     " CX_* исключение
        cv_value     " Значение для изменения cv_value->*
        cs_row.      " Строка импортируемой таблицы
...

" Тип загрузки из Excel
DATA(lo_file_io) = NEW zcl_eui_file_io( ).

" Файл из сетевой папки
lo_file_io->import_from_file( iv_full_path = `I:\$secret\2020-06-27.xlsx` ).

" Укажем мэппинг нужных полей. Прочие будут проигнорированы
DATA(lt_mapping) = VALUE zcl_eui_file_io=>tt_excel_map(
   ( field = 'CARRID'    column_name = 'B' )
   ( field = 'CONNID'    column_name = 'C' )

...

" Загрузка данных
lo_file_io->export_to_itab(
  ir_table        = REF #( lt_import )
  " Если нет мэппинга загружаем все поля
  it_excel_map    = REF #( lt_mapping )
  " Если нет обработчика исключение
  io_handler      = me
).

...

METHOD on_mapping_error.
  " Значение пу в случае ошибки
  IF is_excel_map-field = 'DISTANCE'.
    ASSIGN cv_value->* TO <lv_distance>.
    " Исходное значение в виде строки IV_SOURCE
    <lv_distance> = 77777.
  ENDIF.
  
...
```

![image](https://user-images.githubusercontent.com/36256417/85916406-57f9e980-b872-11ea-8a77-252dedc443ea.png)

</div> <!-- This close tag must be left aligned. -->
  </div>
</div>

---

### Стандартные способы

Наверное многие знают про `CALL FUNCTION 'ALSM_EXCEL_TO_INTERNAL_TABLE'` для импорта из Excel<br/>
и `cl_gui_frontend_services=>gui_upload( filetype = 'DAT' )` для импорта из CSV.

Но данные методы имеют ряд ограничений:
* `ALSM_EXCEL_TO_INTERNAL_TABLE` работает через OLE (есть проблемы при копировании большого объема данных)
* Оба работают только с Presentation Server
* Нет обработки ошибок в файле и мэппинга данных (Какой столбец куда должен попасть) 

---

### Особенности реализации 

* Класс **ZCL_EUI_FILE_IO** наследует от ZCL_EUI_FILE. И умеет все что умеет делать родитель.

* Для Excel используется класс **CL_FDT_XL_SPREADSHEET** (доступный с 7.02) который лишен проблем с OLE.
https://codezentrale.de/abap-excel-datei-xlsx-in-interne-tabele-laden-cl_fdt_xl_spreadsheet-2/

* CSV в свою очередь поддерживает разные символы для разделения данных и разные кодировки

![image](https://user-images.githubusercontent.com/36256417/80709060-195fe100-8b06-11ea-8405-aa0a83c93a94.png)

* Обработка ошибок в файле (дата или число не правильного формата) происходит с помощю события **MAPPING_ERROR**<br/>
В обработчике можно обработать ошибку и изменить само значение

![image](https://user-images.githubusercontent.com/36256417/80709353-9723ec80-8b06-11ea-9b20-ff9fce0fe3a7.png)

* В таблице мэппинга вы можете указать **column_name** или **column_index**<br/>
Сам мэппинг не обязателен. Если он не указан он будет совпадать с внутренней таблицей, те первый столбец таблицы столбец A, второй B итд 

```abap
     " Field of internal table
     field        TYPE fieldname,

     " Convenient for Excel
     column_name  TYPE char3,

     " More convenient for CSV. Could be filled automatically
     column_index TYPE i,
```

---

Тк данный класс наследует от **ZCL_EUI_FILE**, то ему доступны его методы.<br/>
Это дает возможность писать **цепочки** как и в родителе  

Для загрузки из файла цепочка может выглядеть следующим образом 
```abap
 " Если указать расширение файла 'xlsx' или 'csv', диалоги сохранения(открытия)
 " и метод EXPORT_TO_ITAB будут сразу же настроены
 " Также в конструктор можно передать XSTRING
 new ZCL_EUI_FILE( IV_FILE_NAME = 'xlsx' )->
    " Данный шаг может быть заменен на загрузку из любого источника
    IMPORT_FROM_FILE( )->
    " Сам импорт с указанием обработчика ошибок
    EXPORT_TO_ITAB( io_handler = me)
```

---

### IMPORT_FROM_ITAB
Импорт из внутренней таблицы(**те выгрузку в файл**) работает наподобие простого отчета<br/>
Для более сложных отчетов лучше использовать https://github.com/bizhuka/xtt

TODO Экспорт нескольких внутренних таблиц в 1 файл без указания шаблона(Для debug)