---
parent: "AQO - options"
title: "07 Search help in ui5"
nav_order: 70
permalink: /aqo/search-help-in-ui5/
---

### Declaration of SH
For the correct work of search helps, you need to specify a data type as **TABLE-FIELD**.
 
![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/07_table_field.png)
 
Important: UI5 uses **1st EXPORTING** parameter of search help!

***

### Special characters for RANGE

In ui5 search help special RANGE fields are used. In addition to the usual equality, you can use the following characters: >, <, >=, <=, !, …

![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/07_range_in_sh.png)

***

### Combobox
If the SH is based on the values in the domain, the ListBox is used (instead of the nested SH)

![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/07_combo_in_sh.png)