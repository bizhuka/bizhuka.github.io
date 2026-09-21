---
parent: "XTT - reports"
title: "120 Class attributes"
nav_order: 120
permalink: /xtt/class-attributes/
_cus_head: "_popup_head.html"
_cus_index: "120"
---

{% include _xtt_demo.html %}

## Purpose

Demo `ZCL_XTT_DEMO_120` passes an object directly to `MERGE( )`. Use this approach when a class already exposes the fields and tables required by the report and a duplicate root structure would add no value.

## Merge an object

![image](https://user-images.githubusercontent.com/36256417/103114165-cf74ce00-4687-11eb-967d-6da7257c6257.png)

Pass the object reference to `MERGE( )`; public attributes are resolved like structure components.

## Example: personnel actions

The pattern is especially useful for an existing domain object, for example a class that already contains IT 0000 and IT 0001 data for a personnel action.

![image](https://user-images.githubusercontent.com/36256417/103114357-65a8f400-4688-11eb-84d9-725a941be7dc.png)

The template can:

- read scalar and nested attributes such as `{R-MV_MASSN}` and `{R-MS_P0000-STAT2}`;
- repeat an internal table such as `{R-MT_P0000}`;
- read an entry with an expression such as `{R;cond=value-MT_P0001[ 1 ]-ENAME}`;
- derive conditional text through [`;cond=`](../cond/).

No additional root structure is required.

## Attribute visibility

Public attributes are always available.

To expose protected or private attributes, declare `ZCL_XTT_REPLACE_BLOCK` as a friend of the report object. Do this deliberately: it gives the rendering layer access to the object's internal state.

![image](https://user-images.githubusercontent.com/36256417/103114499-013a6480-4689-11eb-9f7e-b782feb61603.png)


