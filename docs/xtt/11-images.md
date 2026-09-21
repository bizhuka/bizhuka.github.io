---
parent: "XTT - reports"
title: "110 Images ';type=image'"
nav_order: 110
permalink: /xtt/images-no-code/
_cus_head: "_popup_head.html"
_cus_index: "110"
---

{% include _xtt_demo.html %}

## Purpose

Demo `ZCL_XTT_DEMO_110` accepts raw `XSTRING` image data and uses `;type=image` to create the `ZCL_XTT_IMAGE` wrapper internally. This keeps simple image fields independent of the helper class.

![image](https://user-images.githubusercontent.com/36256417/103112878-31cad000-4682-11eb-87c8-3db8a095bd9e.png)

## Why use the directive?

- The report context contains only the binary value required by the template.
- The marker documents that the field is an image.
- Application code does not depend directly on the image factory method.
- Dimensions and file type can remain template concerns.

## `;type=image`

The directive converts an `XSTRING` field into an image without an explicit factory call in application code.

![image](https://user-images.githubusercontent.com/36256417/103113188-d1d52900-4683-11eb-8b37-6d5ee8461afc.png)

Demo 110 uses the same source data as demo 100, but exposes `RAW TYPE XSTRING` instead of `IMG TYPE REF TO ZCL_XTT_IMAGE`.

![image](https://user-images.githubusercontent.com/36256417/103113102-54111d80-4683-11eb-99aa-c075a6e9de78.png)


`ZCL_XTT_IMAGE` is still used internally. Pass the common factory parameters through the marker:
* ;width=
* ;height=
* ;ext=

For more complex styling, use a prepared image placeholder as shown in column F and in the [image-template example](../images/).

