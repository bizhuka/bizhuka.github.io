---
parent: "XTT - отчеты"
title: "150 Без шаблона GRID"
nav_order: 150
permalink: /ru/xtt/without-grid-template/
_cus_head: "_popup_head.html"
_cus_index: "150"
---

{% include _xtt_demo.html %}

### Классы для хранения шаблонов

Ранее для выгрузки отчета нужно было выбрать один из имеющихся классов

![image](https://user-images.githubusercontent.com/36256417/108595246-0249f280-73a9-11eb-88fd-c0570e8e3590.png)

А именно:
* **ZCL_XTT_FILE_SMW0** Для шаблонов tr. SMW0 (самый распространённый вариант)
* **ZCL_XTT_FILE_OAOR** tr. OAOR удобен тем что есть встроенная версионность BDS для шаблонов
* **ZCL_XTT_FILE_RAW** В основном используется для шаблонов на основе String (реже xString) и класса **ZCL_XTT_HTML**. Который в свою очередь используется чаще всего для отправки писем


### Табличные отчёты
Если вы часто создаете отчеты на основе **CL_SALV_TABLE** или **CL_GUI_ALV_GRID** используя подытоги и группировку данных, и при этом не хотите создавать Excel шаблон который в точности просто повторяет ALV вывод данный класс вам поможет вам в этом.

Данный класс **ZCL_XTT_FILE_GRID** создает пустой шаблон для **ZCL_XTT_EXCEL_XLSX** и обладает рядом преимуществ по сравнению  со стандартной выгрузкой в Excel

![image](https://user-images.githubusercontent.com/36256417/108615623-40d6c000-7430-11eb-939f-2677f7d38196.png)

Разные цвета для подытогов (строка 20) и современный шрифт Calibri

![image](https://user-images.githubusercontent.com/36256417/108615664-91e6b400-7430-11eb-8d61-1144241cb05e.png)


***
Если подытоги сгруппированы

![image](https://user-images.githubusercontent.com/36256417/108615839-2f8eb300-7432-11eb-9846-adbe389fe47e.png)

В итоговом отчете данные также будут сгруппированы

![image](https://user-images.githubusercontent.com/36256417/108615822-040bc880-7432-11eb-9027-25eddb6f302d.png)

***

PS:\
Если у вас отчет построен на основе класса **CL_SALV_TABLE** и вам нужен класс **CL_GUI_ALV_GRID** для передачи в конструктор **ZCL_XTT_FILE_GRID**.

Вы можете воспользоваться методом **ZCL_EUI_CONV=>GET_GRID_FROM_SALV( )** для преобразования

