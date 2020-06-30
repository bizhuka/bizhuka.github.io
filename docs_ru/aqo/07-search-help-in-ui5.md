---
parent: "AQO - настройки"
title: "07 Средство поиска в ui5"
nav_order: 70
permalink: /ru/aqo/search-help-in-ui5/
---

### Объявление СП
Для правильной работы средства поиска нужно указать поле вида TABLE-FIELD.
 
![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/07_table_field.png)
 
Важно: В UI5 используется **1-й EXPORTING** параметр средства поиска!

***

### Спец символы для RANGE

В ui5 СП используются RANGE поля. Помимо обычного равенство можно использовать следующие символы: >, <, >=, <=, !, …

![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/07_range_in_sh.png)

***

### Combobox

Если СП основан на значениях в домене используется ListBox вместо вложенного СП

![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/07_combo_in_sh.png)