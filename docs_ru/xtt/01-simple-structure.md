---
parent: "XTT - отчеты"
title: "010 Вывод простой структуры"
nav_order: 010
permalink: /ru/xtt/simple-structure/
_cus_head: "_popup_head.html"
_cus_index: "010"
---

{% include _xtt_demo.html %}

Самый простой способ отправить простые данные в отчет - передать их в структуре (или в атрибутах объекта)
```abap
    " Document structure
    BEGIN OF ts_root,
      title  TYPE char15,
      text   TYPE string,
      int    TYPE i,
      bottom TYPE string, " Any field could be REF TO, STRUCTURE or TABLE
    END OF ts_root.
```

Данные могут выглядеть так:
```abap
    ls_root-title   = 'Document title'.
    ls_root-text    = 'Just string'.
    ls_root-int     = 3.
    ls_root-bottom  = 'bottom'.
```

Шаблон в Excel, Word или pdf может выглядеть так:

***
Basic example

Title: **_{R-TITLE}_**

Just put markers where you want

Just string    **{R-TEXT}**

Integer        _{R-INT}_

Bottom: ~~{R-BOTTOM}~~

***

Если объединить структуру с данными ls_root отчет может выглядеть так

***
Basic example

Title: **_Document title_**

Just put markers where you want

Just string    **Just string**

Integer        _3_

Bottom: ~~bottom~~
***

### Библиотека XTT
{: .no_toc}

Код для вывода данной структуры в шаблон может выглядеть так:

```abap
    NEW zcl_xtt_excel_xlsx( NEW zcl_xtt_file_smw0( ) )->merge( ls_root )->download( ).
```

\* Код библиотеки совместим с версией ABAP 7.02. Новый синтаксис используется в демонстративных целях

1) ZCL_XTT_EXCEL_XLSX  можно заменить на 1 из классов потомков ZCL_XTT

![image](https://user-images.githubusercontent.com/36256417/103254809-06612180-49b1-11eb-9d5f-6ed0125e18f9.png)

2) Вместо ZCL_XTT_FILE_SMW0 на любой из следующих

![image](https://user-images.githubusercontent.com/36256417/103254904-75d71100-49b1-11eb-825f-9c8ca2885253.png)

3) Метод MERGE( ) можно вызывать не сколько раз, для разных меток. По умолчанию 'R'

4) Метод DOWNLOAD( ) имеет опциональные параметры для выгрузки отчета. Для прочих действий можно воспользоваться одним из методов:

![image](https://user-images.githubusercontent.com/36256417/103255194-9c497c00-49b2-11eb-9200-70d9b74bd130.png)

***

Все форматирование текста внутри **{}** остается неизменным.

**В word зачастую, блок который выглядит одинаково может состоять из нескольких с одинаковым форматированием.**

~~Для исключение подобного случая нужно скопировать блок с {} в notepad, скопировать в нем и вставить обратно~~

Теперь если в Word будет подобное фоматирование (Классы **ZCL_XTT_WORD_DOCX** и **ZCL_XTT_WORD_XML**)

![](https://raw.githubusercontent.com/wiki/bizhuka/xtt/img/01_word_part_text.png)

форматирование будет аналогично 1-й части текста

![](https://raw.githubusercontent.com/wiki/bizhuka/xtt/img/01_word_part_text_f.png)