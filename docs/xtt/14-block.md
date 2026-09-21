---
parent: "XTT - reports"
title: "140 Conditional blocks"
nav_order: 140
permalink: /xtt/block/
_cus_head: "_popup_head.html"
_cus_index: "140"
---

{% include _xtt_demo.html %}

## Purpose

Demo `ZCL_XTT_DEMO_140` shows or removes an entire template region according to an ABAP condition. Use `;type=block` when the condition affects a range of rows or a PDF subform, rather than a single value.

![image](https://user-images.githubusercontent.com/36256417/103118647-153a9200-469a-11eb-9a26-35cce364830d.png)


## Choose the appropriate conditional feature

- Use [`;cond=`](../cond/) to calculate one displayed value.
- Use [`show_if` or `hide_if`](../tree-output-level-by-condition/) to select row layouts in a repeated tree.
- Use `;type=block` for an arbitrary, one-time template region.

## `;type=block`

***

This example displays the block only in 2019: `;cond=sy-datum(4) EQ '2019'`.
![image](https://user-images.githubusercontent.com/36256417/103118035-6432f800-4697-11eb-9e68-ce6b97282058.png)

***

The next block is displayed when `TITLE` in root `R` is not initial.

![image](https://user-images.githubusercontent.com/36256417/103118421-fa1b5280-4698-11eb-8070-cd42e825d340.png)

You could also write *;cond=value-title IS NOT INITIAL*

***

For PDF, a **subform** defines the block boundary. In Excel and Word, table rows define it.

Table borders may not be visible in Word

![image](https://user-images.githubusercontent.com/36256417/103119075-f937f000-469b-11eb-9bd6-8a525f040690.png)

To display the borders in the template\
Table Tools -> Layout -> View Gridlines

![image](https://user-images.githubusercontent.com/36256417/103119044-cee63280-469b-11eb-8852-68a6a02b88fe.png)

***

The directive replaces the older workaround of passing a one-row table to show a region and an empty table to hide it.

## Shorthand

`{R-BL2;type=block;cond=strlen( value-TITLE ) GT 0}` can be shortened to `{R-BL2;=strlen( v-TITLE ) GT 0}`.

  *See templates 140
