---
parent: "XTT - reports"
title: "022 Merging cells (Flight Model)"
nav_order: 22
permalink: /xtt/merging-cells/
_cus_head: "_popup_head.html"
_cus_index: "022"
---

{% include _xtt_demo.html %}

## Purpose

Demo `ZCL_XTT_DEMO_022` covers both fixed merged ranges and data-driven merging. It uses flight-model data to show how repeated values can be merged without calculating the final range in ABAP.

## Static merged ranges

When the range is known in advance, merge it directly in the template.

Cells **B3:H3** & **B5:F5**

![image](https://user-images.githubusercontent.com/36256417/108017229-911fdd80-703e-11eb-9e30-100aba96ea38.png)

Generated result:

![image](https://user-images.githubusercontent.com/36256417/108017041-266ea200-703e-11eb-837f-1aaa1a11a35a.png)

***

Merged ranges may be horizontal or vertical.

Cells **B2** & **E2**

![image](https://user-images.githubusercontent.com/36256417/108017410-0095cd00-703f-11eb-8a67-ddde41e4edf9.png)

Result

![image](https://user-images.githubusercontent.com/36256417/108017525-50749400-703f-11eb-880d-6f92c0310585.png)


## Dynamic merging with `;merge=X`

Use `;merge=X` when the range grows with the generated data and its final size is not known at design time.

![image](https://user-images.githubusercontent.com/36256417/108017878-3be4cb80-7040-11eb-980a-68c427820b02.png)

With normal row-oriented output, XTT merges vertically across generated rows. With [`;direction=column`](../output-direction/), it merges horizontally across generated columns.

***

## Merge rule

Only adjacent cells with equal values are merged.

In cell **D10** of the report (**D3** in the template), `func=FIRST` copies a value from `level=2` to `level=1`. The value is not merged because that marker lacks `;merge=X`; the adjacent column **C** includes it.

![image](https://user-images.githubusercontent.com/36256417/108044375-62206080-706c-11eb-890f-278a49a737f7.png)

Inspect the generated values first when a merge is unexpected. Equal values and the directive must both be present.

![image](https://user-images.githubusercontent.com/36256417/108045505-bd068780-706d-11eb-9c8d-f9012bd1d2f1.png)

***

For the hierarchy used by this example, see [grouped trees](../tree-group-by-fields/).

