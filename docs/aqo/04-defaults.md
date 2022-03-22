---
parent: "AQO - options"
title: "Defaults"
nav_order: 04
permalink: /aqo/defaults/
---

### Defaults

If there is only one option in the package, you can create it in the following more concise way

```abap
zcl_aqo_option=>create( io_data = me )
```

### Default package

The package name `IV_PACKAGE_ID` now is optional in the `zcl_aqo_option=>create` method, in this case it will be equal to the package of the called place.
When moving a class to another package, the `IV_PACKAGE_ID` parameter can be specified explicitly

### OPTION_ID
Often, the `OPTION_ID` parameter does not carry any additional semantical meaning. For small developments, it is not important and can be omitted. In this case, the `'OPTION_ID`' parameter will be equal to the value of `'DEFAULT'`.

![image](https://user-images.githubusercontent.com/36256417/159257521-dc2d2cde-4521-471b-88e7-78609f3d64e3.png)

### IV_REPAIR
Option's consistency check mode `IV_REPAIR = abap_true` is now permanently enabled.
And the need for this flag also disappeared

### TRY-CATCH
Also the class `ZCX_AQO_EXCEPTION` inherits from `CX_NO_CHECK` so handling the exception is optional. The editor does not issue warnings, and the `ZCX_AQO_EXCEPTION` class itself cannot be used in method signatures.

![image](https://user-images.githubusercontent.com/36256417/159420760-04999a6a-7b1b-419b-b932-396dc42515e8.png)

In a sense, the `TRY - CATCH` block is not desirable, since simply printing the message `DISPLAY LIKE 'E'` is often simply ignored. An unhandled `ZCX_AQO_EXCEPTION` exception in the absence of a option in the database in production or its definition differs from the ABAP code will result in a dump that is easier to detect.
If the option definition differ in the DEV system, a new save window will appear

### Change window
![image](https://user-images.githubusercontent.com/36256417/159464121-75509487-d831-4e46-8ef6-7ac1abd046fa.png)

It displays the changes made to the option. `- Deleted` will only appear for nested fields, those for fields in the `TAB_OPT` table. Trying to remove the definition of the entire `TAB_OPT` table or any other top-level **non-nested** field from the code will throw a `ZCX_AQO_EXCEPTION` exception

![image](https://user-images.githubusercontent.com/36256417/159476233-5234ceee-800c-4561-8f17-8e2ade14ee52.png)
This means you have to delete top-level fields by yourself.

### Automatic class check

For class-based options, you can now simply activate the class and not instantiate it with **F8** in the code editor. Once the class is activated, the existing option can be opened in the `ZAQO_EDITOR_OLD` editor. In this case, the mapping of the option with the class definition will be checked automatically and a window with changes will be displayed when the option is opened.

You can disable this behavior by this switch.

![image](https://user-images.githubusercontent.com/36256417/159476712-f2ad4399-eaac-407b-afca-6308c343852b.png)