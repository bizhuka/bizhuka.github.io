---
parent: "AQO - настройки"
title: "01 Какую транзакцию выбрать"
nav_order: 10
permalink: /ru/aqo/which-transaction-to-choose/
---

### Какую транзакцию выбрать?
{: .no_toc }

На данный момент есть 6 транзакций, которые можно разделить на 2 группы:
* **EDITOR** - Для редактирования настроек 
* **VIEWER** -  Для просмотра настроек (В продуктиве часто оставляют лишь эту возможность)

Если мандант открыт на изменение **ZCL_AQO_HELPER=\>IS_DEV_MANDT( )** все поля в настройки открыты на изменение в **EDITOR** .
В других системах лишь поля помеченные как **Editable in prod** могут редактироваться.

![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/01_edit_in_prod_01.png)

![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/01_edit_in_prod_02.png)

### 1. - ZAQO_EDITOR_OLD
Или **ZAQO_VIEWER_OLD** для просмотра

Основная наиболее протестированная транзакция

Плюсы:
* Привычный интерфейс (к SAPUI5 нужно привыкнуть)
* Умеет отображать таблицу таблиц или range внутри таблицы
* Отображать предыдущие значения поля
* Удобно работать с простыми таблицами в ALV (В UI5 можно выгрузить/загрузить таблицу в CSV для редактирования в  Excel)
* Работа с range более удобная

![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/01_edit_range.png)

* В field catalog поля и в таблицах строки можно перемещать курсором (правда в SORTED TABLE порядок после сохранения изменится)

![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/01_drag.png)

К минусам можно отнести:
* "Старый" интерфейс ведения на основе фм 'FREE_SELECTIONS_DIALOG'
* Checkbox, combobox и datetime поля не доступны

### 2. - ZAQO_BSP_EDITOR
Или **ZAQO_BSP_VIEWER** для просмотра

Транзакция на основе BSP приложения. (Доступна в виде надстройки https://github.com/bizhuka/aqo_ui5)\
Запускает браузер по умолчанию (желательно Chrome)

Можно выслать url настройки консультанту 
![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/01_url_01.png)

### 3. - ZAQO_EDITOR
Или **ZAQO_VIEWER** для просмотра

Запускает Internet Explorer внутри SAP GUI. (Доступна в виде надстройки https://github.com/bizhuka/aqo_ui5)\
Для работы танзакции нужен интернет (в отличии от BSP загружает sapui5 библиотеку с https://sapui5.hana.ondemand.com)

Также может проваливаться в код (место создания настройки)
![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/01_drilldown_02.png)

и описания полей (SE11)

![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/01_drilldown_01.png)
