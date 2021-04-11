---
parent: "XTT - reports"
title: "021 Formulas in Excel"
nav_order: 21
permalink: /xtt/excel-formula/
_cus_head: "_popup_head.html"
_cus_index: "021"
---

{% include _xtt_demo.html %}

### Formulas in XTT
Direct editing of formulas from the code is prohibited, as this approach is prone to errors and is not very informative.\
In addition, the internal representation of formulas in Excel xlsx (*absolute*) and Excel xml (*relative*) does not allow using a uniform approach if formulas were filled from the ABAP side.
Instead, there are a few (hopefully simple) rules for editing formulas in **MS Excel** itself.

### Copying data
New lines (and cells) are added by copying the original line in the template. Formulas are copied along with cell data, borders, and other formatting.

To prevent the formulas from "shifting" during copying cells, you can use several methods:

### Relative links in XLSX

The most native and reliable way for Excel is to calculate distance from the current cell where we write the formula, you could use *=OFFSET()* in conjunction with =INDIRECT() for creating *relative* formulas.

those, to get the sum of the previous three cells (1,2,3), you need to shift by -3 cells by columns and expand the range by 3 cells

![image](https://user-images.githubusercontent.com/36256417/91626264-4eeedb00-e9cf-11ea-878f-ffca4d5ed260.png)

The offset can also be specified directly in INDIRECT("RC[**-3**]", 0), in such formulas it can also be useful:
  * *=ROW()* &
  * *=COLUMN()*  functions

which, without passing arguments, return the current row and column

### $ sign for rows
It is not very convenient to specify offsets from the current cell, therefore, for simplicity, a special rule was introduced:

If you specify the **current** row number with **$** sign, it will be replaced at runtime with actual row number 

![image](https://user-images.githubusercontent.com/36256417/91650284-5b426900-ea9f-11ea-92ea-4563a952efc1.png)

The final report will be like this

![image](https://user-images.githubusercontent.com/36256417/91650345-339fd080-eaa0-11ea-9d36-214d2627da32.png)

PS: For [;direction=column](../output-direction/) (table output by columns) this rule will accordingly work for formulas in this form **$E**

### Shared formulas

Previously, **AOK & XTT** had "mysterious" formulas disappearing\
This bug occurred when a relative link was encountered several times in a row

In the current version (I hope), the conversion from absolute reference to relative and vice versa happens without problems

![image](https://user-images.githubusercontent.com/36256417/91650747-2df8b980-eaa5-11ea-8da9-313a1eb31f78.png)

***

### Named cell ranges

By referring to a named range that will be modified at runtime

* The entire range will be stretched once

![image](https://user-images.githubusercontent.com/36256417/91657698-cb271280-eae4-11ea-9216-bb44215fddb0.png)

* If the name of the range ends with '_' this range will be multiplied and the final list (with all ranges) will be replaced in the formula itself 

![image](https://user-images.githubusercontent.com/36256417/91702501-a7260880-eb9a-11ea-9e20-5d468d640e51.png)


### Sum of children
For the sum of children it is not at all necessary to use the previous method with named cells or to create [hierarchies](../tree-group-by-fields/)

If you need to summarize a table field, you can use standard Excel tools

![image](https://user-images.githubusercontent.com/36256417/91716839-2e32ab00-ebb2-11ea-961e-c12ae27ce2c6.png)

### Array formulas
[Array formulas](https://exceljet.net/glossary/array-formula) are also supported

![image](https://user-images.githubusercontent.com/36256417/114306635-323a8a00-9afe-11eb-85b4-619749102b9c.png)

### Word & PDF
But what if you need to sum the field values not only in Excel, but also in Word or Pdf?
In this case, you can use the aggregation functions [;func= SUM | AVG | COUNT | FIRST](../tree-aggregation-functions/)

### Conditional formatting formulas
For formulas in conditional formatting, it is advisable to specify the scope as whole columns

![image](https://user-images.githubusercontent.com/36256417/91657657-8307f000-eae4-11ea-941b-a4dc1dd409ef.png)
