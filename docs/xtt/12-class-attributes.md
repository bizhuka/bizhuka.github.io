---
parent: "XTT - reports"
title: "12 Class attributes"
nav_order: 120
permalink: /xtt/class-attributes/
_cus_head: "_popup_head.html"
_cus_index: "12"
---

{% include _xtt_demo.html %}

### Using classes
Usually a special structure is created for reports, which contains simple fields and tables for output.\
But if the data is already contained in the class attributes, there is no need for an additional structure.

![image](https://user-images.githubusercontent.com/36256417/103114165-cf74ce00-4687-11eb-967d-6da7257c6257.png)

An object of this class can be passed to the MERGE () method

### Example in orders (IT 0298)

This feature is useful if you have already existing class and you just want to use it in reports.

![image](https://user-images.githubusercontent.com/36256417/103114357-65a8f400-4688-11eb-84d9-725a941be7dc.png)

The template can use:
* simple fields *{R-MV_MASSN}* & *{R-MS_P0000-STAT2}*.
* display the table *{R-MT_P0000}*.
* and even read a single value from the table *{R;cond=value-MT_P0001[ 1 ]-ENAME}* by using the [;cond=](../cond/) addition
* ';cond=' will also help you to conditionally output something *{R;cond=WHEN value-mv_massn eq '01' THEN |Hiring at { value-ms_p0000-begda DATE = ENVIRONMENT }| WHEN value-mv_massn eq '02' ...*

without creating an additional *root* structure and manipulating class attributes

### Private and protected data

**Public** data is always available for output

if you add **ZCL_XTT_REPLACE_BLOCK** class to friends you can use all the attributes of this class

![image](https://user-images.githubusercontent.com/36256417/103114499-013a6480-4689-11eb-9f7e-b782feb61603.png)


