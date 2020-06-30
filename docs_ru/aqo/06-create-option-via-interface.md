---
parent: "AQO - настройки"
title: "06 Создание настройки через интерфейс"
nav_order: 60
permalink: /ru/aqo/create-option-via-interface/
---

##Создание новой настройки:

### B "старом" редакторе

 Для создания новой настройки нужно новый **ID** настройки и указать существующий **Z*** пакет на селективном экране
 ![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/06_create_old.png)

 Также можно удалить или добавить новые поля в настройку 
 
 ![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/06_add_param_old.png)

Для range и table нужно указать тип из словаря

![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/06_add_range.png)

***

### B "новом" ui5 редакторе
 ![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/06_create_ui5.png)
 
Редактирование существующей. Доступны поля описания и количество предыдущих значений
 ![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/06_edit_ui5.png)
 
Последнее поле отвечает за показ "облака" с предыдущими значениями.\
Можно хранить до 7 предыдущих значений поля\
 ![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/06_prev_values.png) 
 
Небольшие таблицы и range можно также увидеть (Правда в не совсем удобной форме).\
Большую таблицу можно выгрузить с ее историей в json и посмотреть во внешней редакторе\
![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/06_prev_range.png) 

К примеру в notepad++

![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/06_notepad_2plus.png)

Можно добавить или удалить поля в отдельной настройке.\
Но их потом все равно нужно объявить в ABAP коде. Поэтому, имхо, предпочтительно сразу создавать новую настройку и добавлять поля в коде.

![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/06_add_param.png)