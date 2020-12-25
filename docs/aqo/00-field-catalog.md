---
parent: "AQO - options"
title: "Field catalog and other table settings"
nav_order: 07
permalink: /aqo/field-catalog/
---

### Field catalog and other table settings
{: .no_toc }

Since tables can include all other data types (strings, range, and other tables) and a field catalog, the way they are set up is not always as obvious as you'd like.

![image](https://user-images.githubusercontent.com/36256417/102843466-74e33400-4433-11eb-964c-3fb05094f945.png)

---

### Field catalog

For a field, you most often need to fix **Label**, the order (Drag & Drop of the row) and also the search help

![image](https://user-images.githubusercontent.com/36256417/103067366-ed3d2700-45e4-11eb-9697-29b37934d840.png)

For a search help facility, it is sufficient to specify a reference type in **TABLE-FIELD**. The SH of this field will be used during entering data

If there are values in the domain, Dropdown will be displayed

![image](https://user-images.githubusercontent.com/36256417/102844690-27b49180-4436-11eb-81e3-e4479a0a491e.png)


### Relationships between tables
In most cases, specifying a field from the data dictionary (*SE11*) in the form **TABLE-FIELD** will be sufficient.\
If you need a connection with another table in the same option, you can specify it here.

![image](https://user-images.githubusercontent.com/36256417/103114070-7e64da00-4687-11eb-8dc1-87fce8f564bd.png)


As a result, the main table will have 2 SH-s or dropdowns

![image](https://user-images.githubusercontent.com/36256417/103066946-1d37fa80-45e4-11eb-8603-389fd90b7355.png)


In this case, several conditions must be met
* Tables must be at 1st level (nested tables are not supported)
* The tables we are referring must be declared as *SORTED | HASHED WITH UNIQUE KEY* with 1 field (links on several fields are not available)

To show dropdown instead of SH, 2 conditions must also be met
* The number of records must be less than 16
* This table can have no more than 2 simple fields (those with the exception of string, range, table)

![image](https://user-images.githubusercontent.com/36256417/103064202-b31c5700-45dd-11eb-93ee-728e2f65c1cb.png)


### Primary key changes
Quite often it is necessary to change the primary key of the table.\
This can be done by running the creation of an option with the parameter *IV_REPAIR = 'X'*

or by correcting the description in the code and in the option (simultaneously)

![image](https://user-images.githubusercontent.com/36256417/103113994-2fb74000-4687-11eb-8927-fd1e9e10e99b.png)


### Adding a new field
Also, the *IV_REPAIR = 'X'* parameter can be used for changing the field catalog\
or to add/remove a field, you can use the buttons

![image](https://user-images.githubusercontent.com/36256417/103113794-78bac480-4686-11eb-9411-76bff04a25d1.png)

although changing the description with the IV_REPAIR = 'X' parameter from the code itself will be faster and more reliable
