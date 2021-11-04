---
layout: default
title: "AQO - настройки"
nav_order: 4
has_children: true
permalink: /ru/aqo/
video_link: media.githubusercontent.com/media/bizhuka/lfs/main/aqo1.mp4
---

### **AQO** - Abap quick options
{: .no_toc }

Удобные для пользователя и программиста настройки\
Создавайте гибкие настройки в программах с помощью вложенных таблиц без каких-либо усилий\
Без головной боли с Z* генераторами ведения SM30, редактированием кластерных таблиц SE54, SM34 или ведения SELECT-OPTIONS STVARV

---

### Тест
### tr. SE38-> ZAQO_TESTER, tr. SE24 -> ZCL_AQO_TESTER
{: .no_toc }
и далее
### tr. ZAQO_EDITOR_OLD
{: .no_toc }

---
Разделение на *Пакет* и *Option ID*

![image](https://user-images.githubusercontent.com/36256417/80679757-f0742780-8ad6-11ea-9e86-b4b84151f13b.png)

Просмотр истории изменений\
Интеграция с транспортной системой\
Редактирование вложенных каталогов полей (Описаний и средств поиска)

![image](https://user-images.githubusercontent.com/36256417/80679960-58c30900-8ad7-11ea-8484-59db16b563a6.png)

Tables can contain checkboxes, lists, ranges, memo fields and even another tables
![image](https://user-images.githubusercontent.com/36256417/80680457-3f6e8c80-8ad8-11ea-95cf-8be964484559.png)

---

Все, что вам нужно, это описать структуру (или класс) в программе **ms_opt** и нажать **F8**
```abap
    TRY.
        zcl_aqo_option=>create(
          iv_package_id = '$TMP'               " Пакет  "#EC NOTEXT
          iv_option_id  = 'Main options'(op1)  " Любой ID текст < 30 symbols
          ir_data       = REF #( ms_opt )
          " iv_repair     = abap_true
        ).
      CATCH zcx_aqo_exception INTO lo_error.
        MESSAGE lo_error TYPE 'S' DISPLAY LIKE 'E'.
        RETURN.
    ENDTRY.
```

---
Основная цель библиотеки - сократить количество [магических чисел](https://ru.wikipedia.org/wiki/%D0%9C%D0%B0%D0%B3%D0%B8%D1%87%D0%B5%D1%81%D0%BA%D0%BE%D0%B5_%D1%87%D0%B8%D1%81%D0%BB%D0%BE_(%D0%BF%D1%80%D0%BE%D0%B3%D1%80%D0%B0%D0%BC%D0%BC%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5)) и других "постоянных данных" в коде. И дать возможность пользователю изменять «константы» в дружественном интерфейсе.

Счета по определенной маске или тексты в сгенерированных документах FI или диапазоне BLART в выборках - все это хорошие примеры для настроек.

Лучший способ описать библиотеку, это что-то вроде tr. STVARV, но все параметры и опции выбора сгруппированы как в tr. SLG1 с интерфейсом похожим на SAP Fiori и отображаемым непосредственно в SAP GUI через CL_GUI_HTML_VIEWER.

Редактируемые данные обычно хранятся в структуре программы (или в атрибутах класса) и могут содержать такие данные, как
* Диапазоны (SELECT-OPTION)
* параметры (любое простое значение, вроде: даты, времени или BUKRS)
* строки (памятные тексты)
* любые таблицы (STANDARD, SORTED, HASHED таблицы на основе структуры)

Первые 2 полностью аналогичны STVARV, например, в строках вы можете хранить шаблоны сообщений, а таблицы подходят, когда вам нужно написать большой CASE, который зависит от условия, которое может измениться, но создание таблицы базы данных обременительно.

### Подробнее