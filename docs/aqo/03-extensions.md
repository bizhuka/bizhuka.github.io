---
parent: "AQO - options"
title: "03 Extensions"
nav_order: 30
permalink: /aqo/extensions/
---
### 1. Checking class attributes
Extension for options based on class attributes

Currently contains 1 method for checking the integrity of the option before saving it

![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/03_aqo_ext.png)
 
In the method, in case of an error, you need to return a text with a description of the error.\
 To get a single value, you need to call:\
 **io_option->get_field_value**
 ![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/03_aqo_ext_before_save.png)
 
 For the user who will save the option, this message will appear like that
 ![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/03_aqo_ext_before_save_error.png)
 
 
### 2. Checking structure fields
Extension for options based on the structure in the program

If the option was created from a program, not from a class, you can create such a procedure in it.\
Unlike a class, you need a **TRY** block.

![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/03_aqo_prog_before_save.png)

 For the user who will save the option, this message will appear like that
 ![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/03_aqo_prog_before_save_error.png)
