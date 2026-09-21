---
parent: "XTT - reports"
title: "100 Images"
nav_order: 100
permalink: /xtt/images/
_cus_head: "_popup_head.html"
_cus_index: "100"
---

{% include _xtt_demo.html %}

## Purpose

Demo `ZCL_XTT_DEMO_100` replaces image placeholders in XLSX, DOCX, Word XML, and PDF templates. Use a placeholder whenever the template controls the frame, size, position, border, or other presentation details.

For a fixed number of images, create empty placeholders and replace their binary content at runtime. XML formats commonly embed image data as [Base64](https://en.wikipedia.org/wiki/Base64); Office Open XML stores images as package parts.

## Create an image in ABAP

For a simple rectangular image, expose it like any other report field.

![image](https://user-images.githubusercontent.com/36256417/91287754-f42c6800-e7b1-11ea-99ce-bb9dc2b49113.png)

Use one `ZCL_XTT_IMAGE` instance per generated picture:

```abap
 img  TYPE REF TO zcl_xtt_image, " <--- IMAGE
```

At minimum, pass the binary content as `IV_IMAGE TYPE XSTRING`.

```abap
    " Create new instance
    <ls_icon>-img = zcl_xtt_image=>create_image( iv_image  = lv_image ).
```

Optionally provide the file extension and dimensions.

```abap
    " Create new instance
    <ls_icon>-img = zcl_xtt_image=>create_image( iv_image  = lv_image
                                                     iv_ext    = '.gif'
                                                     iv_width  = lv_width
                                                     iv_height = lv_height ).
```

## Use a styled placeholder

Keep visual properties in the document template rather than encoding format-specific styling directives in a marker. XTT replaces the image content and preserves the placeholder's presentation.

### Excel

You can identify an image through its alternative text, but this is difficult for a template maintainer to discover.
![image](https://user-images.githubusercontent.com/36256417/91291353-c0a00c80-e7b6-11ea-909c-3c8829c00e6e.png)

Naming the shape after the ABAP field makes the mapping easier to inspect.

![image](https://user-images.githubusercontent.com/36256417/91292441-52f4e000-e7b8-11ea-99a9-3b21e3130556.png)

The clearest option is to place the field marker in the same cell as the image placeholder.
![image](https://user-images.githubusercontent.com/36256417/91292377-39539880-e7b8-11ea-996b-15d659379b71.png)

***

Excel

![image](https://user-images.githubusercontent.com/36256417/91292908-06f66b00-e7b9-11ea-9b71-a20a0488c0e9.png)


***

### Word

Word also supports alternative text, bookmarks, and hyperlinks, though each can be easy to miss during maintenance.
![image](https://user-images.githubusercontent.com/36256417/91293186-74a29700-e7b9-11ea-961a-8476ab0d46cf.png)

Using a visible note makes the marker easier to find.
![image](https://user-images.githubusercontent.com/36256417/91293596-16c27f00-e7ba-11ea-8c0b-8f2a8d054be9.png)

***

Word

![image](https://user-images.githubusercontent.com/36256417/91293788-58ebc080-e7ba-11ea-9b63-86bd2a3ebb35.png)

***

### PDF

In Adobe LiveCycle Designer, convert the placeholder to an **Image** field.
![image](https://user-images.githubusercontent.com/36256417/91294517-7bcaa480-e7bb-11ea-8a15-78d55616863b.png)


The marker may be assigned in the **XML Source** view.
![image](https://user-images.githubusercontent.com/36256417/91294231-02cb4d00-e7bb-11ea-97e7-a32966defa83.png)

Alternatively, store it in the URL property, noting that this mapping is less visible to the template editor.

![image](https://user-images.githubusercontent.com/36256417/91294975-29d64e80-e7bc-11ea-8549-7109ba04160a.png)

***

Pdf

![image](https://user-images.githubusercontent.com/36256417/91295154-7457cb00-e7bc-11ea-9d4e-fc9e78728d5e.png)
