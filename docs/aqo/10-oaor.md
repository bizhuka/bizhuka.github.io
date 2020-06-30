---
parent: "AQO - options"
title: "10 OAOR"
nav_order: 100
permalink: /aqo/oaor/
---

## Template storage
{: .no_toc }

### SMW0
tr. **SMW0** is simple and convenient, the OAOR transaction is too complicated. Why is versioning of templates necessary?\
Yes, we can partly agree with these statements.

When the template is pretty simple

![image](https://user-images.githubusercontent.com/36256417/81047847-b2ab4080-8ed4-11ea-83db-e34125128396.png)

Just look at him to understand:
* on the SAP side we have a structure **R** which has a table field **T**
* in addition, the structure has **HEADER**, **DATE** and **TIME** fields

Or after reading the ABAP code, it immediately becomes clear what we get on the output.

```abap
    " Load a template
    DATA(lo_xtt) = NEW zcl_xtt_word_docx(
        NEW zcl_xtt_file_smw0( iv_template_name ) ).

    lo_xtt->merge( VALUE #(
        " For printing
        footer = 'Footer'
        header = 'Header'
    
        " Date and time in header and footer
        date   = sy-datum
        time   = sy-uzeit

        " Main table
        t   = mt_alv[]
    ) ).

    " download & open in sap_tmp folder (For inplace mode use ->show( ) method)
    lo_xtt->download( ).
```
It doesn’t even matter what is the output format: word, excel or pdf (ZCL_XTT_WORD_DOCX, ZCL_XTT_EXCEL_XLSX or ZCL_XTT_PDF, respectively).\
The main thing becomes clear the very structure of the output document. The rest can be understood by running the program.\
More details here [Example №02 Basic tables](https://github.com/bizhuka/xtt/wiki/Example-%E2%84%9602-Basic-tables)

***

### OAOR
But such cases are not always\
For example when a template has many tables with groupings (**level=0,1,2**), with aggregation functions (**func=SUM|AVG|COUNT|FIRST**) and with conditional output (**show_if** & **hide_if**)\
Just look at the template, and understand the report, probably already will not work  

![image](https://user-images.githubusercontent.com/36256417/81050156-f607ae00-8ed8-11ea-956b-691aea7ac194.png)
More from  [Example №05 Tree (group by fields)](https://github.com/bizhuka/xtt/wiki/Example-%E2%84%9605-Tree-(group-by-fields))

***

### tr. ZAQO_EDITOR_OLD

For this purpose, a new group of buttons has appeared in the editor menu for viewing and uploading templates\
When downloading a new version of the template, you can add a small note (field **Description**)\
If the file name does not match, you can select it in the drop-down list (**Component name**)

![image](https://user-images.githubusercontent.com/36256417/81051566-5697ea80-8edb-11ea-891f-ca49e1eb6fa5.png)

As in the case with the usual settings after reaching the maximum number of versions (default 5), previous versions will be deleted

![image](https://user-images.githubusercontent.com/36256417/81053926-4b46be00-8edf-11ea-8b51-1ce13f8b6b27.png)


***

The result can be seen in the OAOR transaction itself.

![image](https://user-images.githubusercontent.com/36256417/81051046-7ed31980-8eda-11ea-8f31-2510c24c504c.png)

---

OAOR checks authority for a specific **Class name** (package in AQO), **TODO** ignore authorities?