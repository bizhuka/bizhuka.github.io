---
parent: "XTT - отчеты"
title: "020 Вывод простой таблицы"
nav_order: 20
permalink: /ru/xtt/basic-tables/
_cus_head: "_popup_head.html"
_cus_index: "020"
---

{% include _xtt_demo.html %}

Чтобы представить таблицу в шаблоне, вы должны объявить ее как внутреннюю таблицу в коде
```abap
    " Document structure
    BEGIN OF ts_root,
      footer   TYPE string,
      header   TYPE string,
      t        TYPE tt_rand_data, " internal flat table ( In template {R-T} )
      date     TYPE d,            " 8
      time     TYPE t,            " 6
      datetime TYPE char14,       " date(8) + time(6)
    END OF ts_root.
```
Где **tt_rand_data** стандартная таблица
```abap
      " Random table data
      BEGIN OF ts_rand_data,
        group   TYPE string,
        caption TYPE string,
        date    TYPE d,
        sum1    TYPE p LENGTH 13 DECIMALS 2,
        sum2    TYPE p LENGTH 13 DECIMALS 2,
      END OF ts_rand_data,
      tt_rand_data TYPE STANDARD TABLE OF ts_rand_data WITH DEFAULT KEY,
```
В шаблоне

![](https://raw.githubusercontent.com/wiki/bizhuka/xtt/img/basic_table_templ.png)

Шаблон для строк может занимать несколько строк (от первой строки с **{R-T}** до последней)

Заполнение данными

```abap
    " {R-T} in a temaplte. @see get_random_table description
    ls_root-t      = cl_main=>get_random_table( ).

    " For printing
    ls_root-footer = 'Footer'.
    ls_root-header = 'Header'.
```

Конечный результат для таблицы в Word

![](https://raw.githubusercontent.com/wiki/bizhuka/xtt/img/basic_table_word.png)


Все таблицы и диапазоны в Excel с соответствующими формулами будут правильно масштабированы.

![](https://raw.githubusercontent.com/wiki/bizhuka/xtt/img/basic_table_01.png)


Ctl + F3

![image](https://user-images.githubusercontent.com/36256417/108593671-4fc16200-739f-11eb-96d3-bd7b96169446.png)


***

Также расширяются [проверки данных](https://support.microsoft.com/en-us/office/apply-data-validation-to-cells-29fecbcc-d1b9-42c1-9d76-eff3ce5f7249)

![image](https://user-images.githubusercontent.com/36256417/108593426-d07f5e80-739d-11eb-8b31-bf5e014451a8.png)

***

Поддерживаются формулы с областью видимости (scope). Лист или Рабочая книга\
Включая "Print titles"

![image](https://user-images.githubusercontent.com/36256417/108593559-9cf10400-739e-11eb-83db-d5a7079f65ee.png)

