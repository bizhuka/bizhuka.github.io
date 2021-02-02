---
parent: "XTT - reports"
title: "14 Blocks by condition"
nav_order: 140
permalink: /xtt/block/
_cus_head: "_popup_head.html"
_cus_index: "140"
---

{% include _xtt_demo.html %}

### Conditional block output
{: .no_toc}

From time to time in reports it is necessary to hide or show part of the data in the template.
How can this be done most informatively?

![image](https://user-images.githubusercontent.com/36256417/103118647-153a9200-469a-11eb-9a26-35cce364830d.png)


### Another ABAP in the template
The two previous cases were
* Conditional data output with formatting in [;cond=](../cond/)
* [show_if, hide_if](../tree-output-level-by-condition/) for conditional selection from "templates" of rows

### Addition ';type=block'
It resembles most of all **show_if**, but it is not intended for a specific tree or table, but for writing arbitrary conditions

***

For example, this block will be displayed in 2019 *;cond=sy-datum(4) eq '2019'*
![image](https://user-images.githubusercontent.com/36256417/103118035-6432f800-4697-11eb-9e68-ce6b97282058.png)

***

The 12th line will be displayed if the TITLE field in the R structure contains data

![image](https://user-images.githubusercontent.com/36256417/103118421-fa1b5280-4698-11eb-8070-cd42e825d340.png)

You could also write *;cond=value-title IS NOT INITIAL*

***

For PDF, **SUBFORM** is used for detecting scopes of the block. For Excel & Word, the scope is declared by tables rows

Table borders may not be visible in Word

![image](https://user-images.githubusercontent.com/36256417/103119075-f937f000-469b-11eb-9bd6-8a525f040690.png)

To display the borders in the template\
Table Tools -> Layout -> View Gridlines

![image](https://user-images.githubusercontent.com/36256417/103119044-cee63280-469b-11eb-8852-68a6a02b88fe.png)

***

Previously, to hide a block, you had to create a special ABAP table and fill it in:
* 1 - line (for display)
* 0 - if it was necessary to hide the block

This add-on simply performs the same function only by writing a condition in the template itself

