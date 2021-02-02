---
parent: "XTT - reports"
title: "080 ;direction=column addition"
nav_order: 080
permalink: /xtt/output-direction/
_cus_head: "_popup_head.html"
_cus_index: "080"
---

{% include _xtt_demo.html %}

All tables and trees in you template could be populated with rows and columns as well.<br/>
But the feature works only for the `ZCL_XTT_EXCEL_XLSX` class and 2 file types (xlsx & xlsm).<br/>
To do this just add special marker {;direction=column} for your table or tree wherever you want.

ABAP code is similar to the [Example №05](../tree-group-by-fields/)
```abap
    SET HANDLER on_prepare_tree_05 ACTIVATION abap_true.

    GET REFERENCE OF lt_rows INTO lr_table.
    ls_root-a = zcl_xtt_replace_block=>tree_create(
     it_table      = lr_table       " from 7.5 REF #(lt_rows)
     iv_fields     = 'GROUP'   ).   " Name of the fields delimited by ;

    SET HANDLER on_prepare_tree_05 ACTIVATION abap_false.
```
The main difference in the template itself.

* Table

![](https://raw.githubusercontent.com/wiki/bizhuka/xtt/img/dir_column_02.png)
* Tree

![](https://raw.githubusercontent.com/wiki/bizhuka/xtt/img/dir_column_01.png)

The result will appear like that
* Table

![](https://raw.githubusercontent.com/wiki/bizhuka/xtt/img/dir_column_03.png)
* Tree

![](https://raw.githubusercontent.com/wiki/bizhuka/xtt/img/dir_column_04.png)

### Data offset
If the result in the report has moved down, add non-empty cells to the left of the column with the template.\
Pay attention to `I stay here`