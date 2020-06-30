---
parent: "EUI - интерфейс пользователя"
nav_order: 30
title: "FILE Основные файловые операции"
tags: [zcl_eui_file]
permalink: /ru/eui/zcl_eui_file/1
date: 2020-04-29
---

Пример декомпозиции обычного метода **DOWNLOAD** или как думать ООП-исто за 1 день

***

### Примеры ZCL_EUI_FILE
SE38 -> **ZEUI_TEST_EXCEL**

<div class="tab-header">
<ul class="nav nav-tabs">
  <li class="active">
    <a data-toggle="tab" href="#basic">Простой пример</a>
  </li>
  <li>
    <a data-toggle="tab" href="#chain1">Цепочка 1</a>
  </li>
  <li>
    <a data-toggle="tab" href="#chain2">Цепочка 2</a>
  </li>
  <li>
    <a data-toggle="tab" href="#chain3">Цепочка 3</a>
  </li>
</ul>
</div>


<div class="tab-content">
  <div class="tab-pane active" id="basic">
<div class="container-fluid" markdown="1">   

``` abap
" Экземпляр класса
DATA(lo_file) = NEW zcl_eui_file( ).

" Используем xString
" для внутренней таблицы -> import_from_binary( )
lo_file->import_from_xstring( iv_xstring = lv_xstring ).

" По умолчанию выгрузка в `SAP GUI\tmp\`
lo_file->download( ).
```

</div> <!-- This close tag must be left aligned. -->
  </div>
  <div class="tab-pane" id="chain1">
<div class="container-fluid" markdown="1">

``` abap
" Экземпляр класса
NEW zcl_eui_file(

" Кодировка по умолчанию UTF-8
" Чтобы изменить -> iv_encoding = zcl_eui_conv=>mc_encoding-utf_16le
)->import_from_string( iv_string = `Text`

" Показать диалог СохранитьКак
)->download( iv_save_dialog  = 'X'
             iv_window_title = `Export text ...`
             
" Если сохранили ранее откроем файл
" в противном случае исключение
)->open( ).
```

</div> <!-- This close tag must be left aligned. -->
  </div>
  <div class="tab-pane" id="chain2">
<div class="container-fluid" markdown="1">

``` abap
" Экземпляр класса
NEW zcl_eui_file(
 " Загрузка из xString в конструкторе
 iv_xstring     = lv_xstring

  " Если не передаем
  " -> Ok + Cancel (режим редактирования)
  " -> Cancel (режим просмотра)
* iv_status_prog  = sy-cprog
* iv_status_name  = 'STATUS_MANY_BUTTONS'

" Добавим вызов если нужно показать в диалоге
" Может вызвать любой метод возвращающий ME
)->popup( iv_col_end = 200


" Показ в новом экране
)->show( ).
```
</div> <!-- This close tag must be left aligned. -->
  </div>

  <div class="tab-pane" id="chain3">
<div class="container-fluid" markdown="1">

``` abap
" Может быть существующий объект или новый
DATA lv_ole_app	TYPE ole2_object.

" Любой вызов метода может вызвать исключение
TRY .
    NEW zcl_eui_file(
    
    " загрузить данные Excel
    )->import_from_binary(
     it_table  = lt_bin_xlsx
     iv_length = lv_len

    " Полный путь в сетевой папке
    )->download(
     iv_full_path = `I:\$secret\2020-06-27.xlsx`

     " Используем OLE для открытия файла
    )->open_by_ole(
     CHANGING
       cv_ole_app = lv_ole_app ).
  CATCH zcx_eui_exception INTO DATA(lo_error).
    " Сообщение об ошибке
    MESSAGE lo_error TYPE 'S' DISPLAY LIKE 'E'.
    RETURN.
ENDTRY.

" Если все ok, вызываем свой макрос
CALL METHOD OF lv_ole_app 'Run'
  EXPORTING
    #1 = 'MACRO_NAME'
    #2 = 'MACRO_PARAM'.

```

</div> <!-- This close tag must be left aligned. -->
  </div>
</div>

---

### Предпосылки для декомпозиции

Если у вас есть метод с десятком optional параметров стоит ~~начать чаще курить~~ разделить его на несколько более мелких и понятных методов

Жил-был простой метод **DOWNLOAD** по выгрузке файлов.<br/>
Он принимал 2 параметра __IT_TABLE__ и его длину __IV_LENGTH__.<br/>
Был он совсем не сложный, пока не понадобилась выгрузка из IV_**X**STRING.<br/>
А потом и из обычной строки __IV_STRING__  + кодировка __IV_ENCODING__ (пу UTF-8 но не всегда)

Решил что не плохо бы открывать файл после выгрузки __IV_OPEN__<br/>
Да и иногда надо было открыть его через __OLE__(+1 параметр) для вызова макроса.<br/>
Потом пошла оптимизация выгрузки файлов через FTP для файлов более 10 мегабайт<br/>
Все было хорошо, но потом иногда файлы нужно было загружать в папку указанную пользователем<br/>
или иметь постоянное имя<br/>
или генерировать случайное для выгрузки в sap_tmp

---

По итогу **DOWNLOAD** внутри стал похож на рулон дешевой туатлной бумаги из супермаркета и пользоваться им хотелось все меньше   

Собрав волю в кулак ~~и для начала протерев монитор спиртовым перегаром после недавнего корпоратива~~ было решено разделить его наконец на более мелкие

---

### Реализация

Для начала хранить сам файл проще всего в одном XSTRING атрибуте (и передавать его в конструкторе)

![image](https://user-images.githubusercontent.com/36256417/80464453-40c27c80-8953-11ea-99ae-545095f7c6aa.png)

А вот менять MV_XSTRING можно из разных источников

![image](https://user-images.githubusercontent.com/36256417/80464724-a44caa00-8953-11ea-88e7-85dd847929af.png)

каждый метод возвращает себя в качестве результата

![image](https://user-images.githubusercontent.com/36256417/80464964-f7bef800-8953-11ea-868b-1b9ce63cc315.png)

Это дает возможность вызова следующего метода **DOWNLOAD** (или SHOW) в виде цепочки

![image](https://user-images.githubusercontent.com/36256417/80465232-5be1bc00-8954-11ea-9d4b-af93f9ba04e8.png)

Если после выгрузки ничего делать не надо цепочка вызовов обрывается, иначе можно вызвать 1 из следующих для открытия файла

![image](https://user-images.githubusercontent.com/36256417/80465722-f3dfa580-8954-11ea-981a-ed28670df1a2.png) 

---

По итогу если надо загрузить файл из внутренней таблицы, вызвать окно сохранения файла и потом открыть его<br/>
**цепочка** будет иметь вид  

```abap
 new ZCL_EUI_FILE( )->
    IMPORT_FROM_BINARY( )->
    DOWNLOAD( IV_SAVE_DIALOG = 'X' )->
    OPEN( )
```

Если надо загрузить данные из STRING в кодировке UTF-16LE, выгрузить файл в определенную папку и открыть его через Excel

```abap
 new ZCL_EUI_FILE( )->
    IMPORT_FROM_STRING(  IV_ENCODING = utf_16be )->
    DOWNLOAD( IV_FULL_PATH = ... )->
    OPEN_BY_OLE( )
```

Если в конце его нужно показать внутри SAP GUI inplace меняем DOWNLOAD( ) на **SHOW( )**

```abap
 new ZCL_EUI_FILE( )->
    IMPORT_FROM_STRING(  IV_ENCODING = utf_16be )->
    SHOW( )
```

Каждый из шагов может ~~выбросить~~ ~~выкинуть~~ вызвать исключение или исключения, поэтому лучше его завернуть в **TRY**<br/>
То есть 1 обработчик исключений для всей цепочки вызовов
```abap
    TRY.
        new ZCL_EUI_FILE( )->IMPORT_FROM_STRING(  IV_ENCODING = utf_16be
            )->DOWNLOAD( IV_FULL_PATH = ... )->OPEN_BY_OLE( ).
    CATCH zcx_eui_exception INTO DATA(lo_error).
        MESSAGE lo_error TYPE 'S' DISPLAY LIKE 'E'.
        RETURN.
    ENDTRY. 
```
