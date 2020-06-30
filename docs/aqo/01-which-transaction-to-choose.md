---
parent: "AQO - options"
title: "01 Which transaction to choose"
nav_order: 10
permalink: /aqo/which-transaction-to-choose/
---

### Which transaction to choose?
{: .no_toc }

At the moment there are 6 transactions that can be divided into 2 groups:
* **EDITOR** - To edit options
* **VIEWER** -  To view the options (often only them are left in the productive system)

If the mandate is open for change **ZCL_AQO_HELPER=\>IS_DEV_MANDT( )** all fields in the options are opened for change in **EDITOR** transactions.
On other systems, only fields marked as **Editable in prod** can be edited.

![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/01_edit_in_prod_01.png)

![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/01_edit_in_prod_02.png)

### 1. - ZAQO_EDITOR_OLD
Or **ZAQO_VIEWER_OLD** for view

The main, most tested transaction

Pros:
* Familiar interface (you need to get used to SAPUI5)
* Can display a table of tables or range inside a table
* Display previous field values
* It is convenient to work with simple tables in ALV (In UI5, you can upload / download a table in CSV for editing in Excel)
* Working with range is more convenient

![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/01_edit_range.png)

* In the catalog fields and rows in tables can be moved with the cursor (though in SORTED TABLE the order will changed after saving)

![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/01_drag.png)

Cons:
* The "old" maintenance interface based on fm 'FREE_SELECTIONS_DIALOG'
* Checkbox, combobox and datetime fields are not available

### 2. - ZAQO_BSP_EDITOR
Or **ZAQO_BSP_VIEWER** for view

Transaction based on BSP application. (Available as an add-on https://github.com/bizhuka/aqo_ui5)\
Launches the default browser (preferably Chrome)

You can send the url options to the consultant
![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/01_url_01.png)

### 3. - ZAQO_EDITOR
Or **ZAQO_VIEWER** for view

Launches Internet Explorer inside the SAP GUI. (Available as an add-on https://github.com/bizhuka/aqo_ui5)\
For the transaction, you need the Internet (unlike BSP, it downloads the sapui5 library from https://sapui5.hana.ondemand.com)

It may also could drilldown in the code (the place where the option was created)
![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/01_drilldown_02.png)

and field descriptions (SE11)

![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/01_drilldown_01.png)