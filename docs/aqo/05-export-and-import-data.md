---
parent: "AQO - options"
title: "05 Export and import data"
nav_order: 50
permalink: /aqo/export-and-import-data/
---

### Export|import entire option

If the option needs to be re-transferred across the entire landscape system, it can be uploaded from the production system to a .json file (UTF-8 encoding) and loaded into DEV again.\
This may be relevant when part of the options was quickly changed in the prod

 ![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/05_export_import_old.png)
 
 ![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/05_export_import_json.png)
  
 This feature is implemented both in the new sapui5 interface and in the "old" editor **(but the file format is different!)** 
 
***

### Tabular data in ui5

Editing a large amount of data in the tabular part in ui5 is complicated by the fact that it is not possible to work through the clipboard in it.\
And the **'+'** button inserts only one record. (**'-'** can delete multiple lines at a time)\
For more comfortable work 2 buttons were created for exporting and importing data via .csv (UTF-16-LE encoding)

 ![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/05_csv_buttons.png)

You can also edit EMAILS - table, BUKRS - range in json format
 ![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/05_csv.png)
