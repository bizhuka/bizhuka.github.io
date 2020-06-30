---
parent: "AQO - options"
title: "06 Create option via interface"
nav_order: 60
permalink: /aqo/create-option-via-interface/
---
##Create a new option:

### In "old" editor

 To create a new option, you need a new **ID** option and specify the existing **Z*** package on the selection screen
 ![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/06_create_old.png)

 You can also delete or add new fields to the option. 
 
 ![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/06_add_param_old.png)

For range and table, you need to specify the type from the dictionary

![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/06_add_range.png)

***

### In "new" ui5 editor

 ![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/06_create_ui5.png)
 
Editing an existing one. Description fields and the number of previous values are available.
 ![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/06_edit_ui5.png)
 
The last field is responsible for showing the "cloud" with the previous values.\
You can store up to 7 previous field values\
 ![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/06_prev_values.png) 
 
Small tables and range can also be seen (but not in a very convenient way).\
A large table can be uploaded with its history in json format and viewed in an external text editor\
![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/06_prev_range.png) 

For example, in notepad ++

![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/06_notepad_2plus.png)

You can add or remove fields in a option.\
But then they still need to be declared in ABAP code. Therefore it is preferable to immediately create a new option in the ABAP code.

![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/06_add_param.png)