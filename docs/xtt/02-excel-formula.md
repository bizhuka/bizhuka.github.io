---
parent: "XTT - reports"
title: "021 Formulas in Excel"
nav_order: 21
permalink: /xtt/excel-formula/
_cus_head: "_popup_head.html"
_cus_index: "021"
---

{% include _xtt_demo.html %}

## Purpose

Demo `ZCL_XTT_DEMO_021` shows how formulas survive row and column expansion. Define formulas in Excel, where they remain visible and testable; generating formula strings in ABAP is fragile and differs between XLSX absolute references and Excel XML relative references.

## Formula-copying model

XTT creates new rows and cells by copying the template range. Formulas travel with values, borders, styles, and other cell properties.

To prevent the formulas from "shifting" during copying cells, you can use several methods:

## Relative references in XLSX

For references relative to the current formula cell, use `OFFSET()` with `INDIRECT()`, or use R1C1 notation through `INDIRECT()`.

To sum the preceding three cells, move three columns left and return a three-column range.

![image](https://user-images.githubusercontent.com/36256417/91626264-4eeedb00-e9cf-11ea-878f-ffca4d5ed260.png)

The offset can also be specified directly in INDIRECT("RC[**-3**]", 0), in such formulas it can also be useful:
  * *=ROW()* &
  * *=COLUMN()*  functions

which, without passing arguments, return the current row and column

## Runtime row substitution

As a simpler alternative, XTT supports a template-specific `$` rule:

When the current template row number is prefixed with `$`, XTT replaces it with the generated row number at runtime.

![image](https://user-images.githubusercontent.com/36256417/91650284-5b426900-ea9f-11ea-92ea-4563a952efc1.png)

The final report will be like this

![image](https://user-images.githubusercontent.com/36256417/91650345-339fd080-eaa0-11ea-9d36-214d2627da32.png)

For [`;direction=column`](../output-direction/), the equivalent substitution applies to column references such as `$E`.

## Shared formulas

Current XTT versions preserve repeated shared formulas while converting between absolute and relative references. This avoids the disappearing-formula problem seen in older releases.

![image](https://user-images.githubusercontent.com/36256417/91650747-2df8b980-eaa5-11ea-8da9-313a1eb31f78.png)

***

## Named ranges

Named ranges are updated during generation:

- A normal named range is expanded once to cover the generated data.

![image](https://user-images.githubusercontent.com/36256417/91657698-cb271280-eae4-11ea-9216-bb44215fddb0.png)

- If the name ends in `_`, XTT repeats the range and substitutes the resulting range list into the formula.

![image](https://user-images.githubusercontent.com/36256417/91702501-a7260880-eb9a-11ea-9e20-5d468d640e51.png)


## Totals, arrays, and conditional formatting

You do not need named ranges or an XTT [tree](../tree-group-by-fields/) merely to total a flat Excel table. Standard Excel table formulas are often sufficient.

Use Excel's native table features when the calculation is specific to XLSX output.

![image](https://user-images.githubusercontent.com/36256417/91716839-2e32ab00-ebb2-11ea-961e-c12ae27ce2c6.png)

[Array formulas](https://exceljet.net/glossary/array-formula) are also supported

![image](https://user-images.githubusercontent.com/36256417/114306635-323a8a00-9afe-11eb-85b4-619749102b9c.png)

For calculations that must also work in Word or PDF, use XTT aggregation functions: [`;func=SUM`, `AVG`, `COUNT`, or `FIRST`](../tree-aggregation-functions/).

For conditional-formatting formulas, define the applicable range as whole columns when possible. This gives XTT room to expand the data without leaving generated cells outside the rule.

![image](https://user-images.githubusercontent.com/36256417/91657657-8307f000-eae4-11ea-941b-a4dc1dd409ef.png)
