---
parent: "XTT - отчеты"
title: "09 Динамическая таблица (дерево)"
nav_order: 90
permalink: /ru/xtt/dynamic-table/
---

Все, что вам нужно сделать, это с **merge-ить** ваши столбцы в первую очередь<br/>
А затем просто вставить основную таблицу вторым **merge**

шаблон
![](https://raw.githubusercontent.com/wiki/bizhuka/xtt/img/09_templ.png)


Объявление
```abap
    " Document structure
    BEGIN OF ts_merge0,
      a TYPE REF TO data, " Tree 1 In template {C-A}
    END OF ts_merge0,

    BEGIN OF ts_merge1,
      t TYPE REF TO data, " Tree 2 In template {R-T}
    END OF ts_merge1.
```

Вставьте столбцы как __table__ или __tree__, а затем вставьте основные данные
```abap
    " Columns
    ro_xtt->merge( is_block = ls_merge0 iv_block_name = 'C' ).

    " Rows
    ro_xtt->merge( ls_merge1 ).
```