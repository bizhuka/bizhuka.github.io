---
parent: "AQO - options"
title: "08 Changing fields descriptions"
nav_order: 80
permalink: /aqo/changing-fields-descriptions/
---

### CREATE Method

The only static public method is responsible for the configuration process:
```abap
 zcl_aqo_option=>create( )
```

Which, if necessary:
* creates a new option **or**
* changes the existing option as described in the ABAP code

Then:
* reads the current options (entered by the user) **or**
* saves the new option in the database if the client is open for changes (DEV mandt)

![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/08_try_block.png)

***

### Checks at creation process

Also, this method is wrapped in **Try** block, as it performs some checks.\
For example, does the package exist during the creation of a new option or has the field description changed since the previous launch.

About the last point in more detail:
* If there are more fields in the ABAP ->It's Ok.\
In DEV, a save confirm dialog will popup (In the prod system there will be an error)

* If there are more fields in the visual editor\
For example, we created a new field in the editor.\
There will always be an error (You must delete this field in the editor or, most likely, change a description in the code)

* If you have a Unique sorted table as a configuration field and you change the primary key\
Or deleted (added) fields from the table. You can **"repair"** description of the option\
To do this, you can pass this parameter to the method

![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/08_try_repair.png)

This works a little slower, but:
* fixes the description of fields (including nested tables)
* as well as table values\
performs **move-corresponding** for structures + INSERT in the table one record at a time, and not one in a scope\
If there are duplicates in the primary key in the edited table, the first value will remain

***

### IV_REPAIR

Flag **IV_REPAIR** works as a database utility

![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/08_db_util.png))

Do not leave it in the code on an production system (This is a small reminder with 'W' message)\
This works more slowly and in future versions there will probably be something else instead of **IV_REPAIR = 'X'**