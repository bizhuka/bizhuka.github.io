---
parent: "XTT - reports"
title: "150 Without GRID template"
nav_order: 150
permalink: /xtt/without-grid-template/
_cus_head: "_popup_head.html"
_cus_index: "150"
---

{% include _xtt_demo.html %}

### Classes for storing templates

Previously, to create a report, you had to select one of the available classes for template storing

![image](https://user-images.githubusercontent.com/36256417/108595246-0249f280-73a9-11eb-88fd-c0570e8e3590.png)

Namely:
* **ZCL_XTT_FILE_SMW0** For templates tr. SMW0 (most common)
* **ZCL_XTT_FILE_OAOR** tr. OAOR is convenient because there is a built-in BDS versioning for templates
* **ZCL_XTT_FILE_RAW** Mainly used for templates based on String (less commonly xString) and **ZCL_XTT_HTML** class. Which in turn is used most often for sending letters


### Tabular reports
If you often create reports based on **CL_SALV_TABLE** or **CL_GUI_ALV_GRID** using subtotals and data grouping, and at the same time you do not want to create an Excel template that just repeats ALV output, this class will help you with this.

This class **ZCL_XTT_FILE_GRID** creates an empty template for **ZCL_XTT_EXCEL_XLSX** and has a number of advantages over standard export to Excel

![image](https://user-images.githubusercontent.com/36256417/108615623-40d6c000-7430-11eb-939f-2677f7d38196.png)

Different colors for subtotals (line 20) and modern Calibri font

![image](https://user-images.githubusercontent.com/36256417/108615664-91e6b400-7430-11eb-8d61-1144241cb05e.png)


***

If subtotals are grouped

![image](https://user-images.githubusercontent.com/36256417/108615839-2f8eb300-7432-11eb-9846-adbe389fe47e.png)

In the final report, the data will also be grouped

![image](https://user-images.githubusercontent.com/36256417/108615822-040bc880-7432-11eb-9027-25eddb6f302d.png)

***

### ALV coloring

Also in ALV you can use 3 colors col_positive (green), col_negative(red) and col_total (yellow)
![image](https://user-images.githubusercontent.com/36256417/176082738-770110d6-d42a-4a3b-8515-5bececb14631.png)

Technically this feature is implemented by conditional formatting

***

PS:\
If your report is based on the **CL_SALV_TABLE** class and you need the **CL_GUI_ALV_GRID** class to pass to the **ZCL_XTT_FILE_GRID** constructor.

You can use **ZCL_EUI_CONV=>GET_GRID_FROM_SALV()** method to convert object references