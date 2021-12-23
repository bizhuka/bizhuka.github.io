---
parent: "EUI - интерфейс пользователя"
nav_order: 70
title: "Вычисление хэша для вложенных данных"
tags: [zcl_eui_crc64]
permalink: /ru/eui/zcl_eui_crc64/1
date: 2021-12-22
---


### Класс ZCL_EUI_CRC64
[Исходный код в github](https://github.com/bizhuka/eui/blob/master/src/zcl_eui_crc64.clas.abap)

Зачем нужен еще один класс?
ABAP имеет множество методов для вычисления хэшей md5, sha1 или sha256. Но есть некоторые ограничения связанные с:
* Ссылками на данные
* Объектами
* Строками и xStrings
* Таблицами со сложными типами данных

***

### Основные методы

![image](https://user-images.githubusercontent.com/36256417/147049807-3c5f18b9-5452-438d-934c-949ed2924507.png)

Использование
``` abap
    DATA(lo_crc64) = NEW  zcl_eui_crc64( ).
    lo_crc64->add_to_hash( zsaqo3_general_info ).
    lo_crc64->add_to_hash( mt_fld_value ).

    rv_hash = lo_crc64->get_hash( ).
```
***

### Ссылки на данные

По умолчанию **mc_dref-data_value**, вы можете рассчитать и добавить ссылочные данные к итоговому хешу.
Также вы можете пропустить ссылочные данные **mc_dref-no_info** или просто сравните типы **mc_dref-type_info**.

![image](https://user-images.githubusercontent.com/36256417/147050466-102bf9f0-6a05-4d17-b8ba-a103fac14870.png)

### Объекты
По умолчанию к результирующему хешу добавляются значения public атрибутов.
Если вы также хотите вычислить хэши private атрибутов, просто добавьте ZCL_EUI_CRC64 в друзья.
![image](https://user-images.githubusercontent.com/36256417/147051825-368cdb55-14c2-4293-b54c-2698bd42eb02.png)

***

### Строки и xStrings

Обработка этих типов данных немного каверзна. Прежде всего, хеши SHA1 вычисляются с помощью CALL FUNCTION 'CALCULATE_HASH_FOR_CHAR' и CALL FUNCTION 'CALCULATE_HASH_FOR_RAW' соответственно. И затем эти хеши добавляются к окончательному результату

***

### Таблицы со сложными типами данных

Поскольку поля структур и строки таблицы могут содержать все вышеупомянутые типы данных, они обрабатываются отдельно, а полученные хэши добавляются к окончательному результату.

![image](https://user-images.githubusercontent.com/36256417/147054503-1134f175-3d39-46dc-8b77-aa4bdd3da55f.png)


***

### Демонстрирование журнала

Если вы хотите сравнить очень сложные структуры данных, вы можете передать **iv_log = abap_true** в конструктор ZCL_EUI_CRC64 класса,
и посмотреть, какие поля отличаются. 
![image](https://user-images.githubusercontent.com/36256417/147054800-d49336a1-8fb7-458d-aa1e-953421b52de8.png)


Пример
SE38 -> [ZEUI_TEST_CRC64](https://github.com/bizhuka/eui/blob/master/src/demo/zeui_test_crc64.prog.abap)