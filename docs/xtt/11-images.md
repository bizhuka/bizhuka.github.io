---
parent: "XTT - reports"
title: "11 Images ';type=image'"
nav_order: 110
permalink: /xtt/images-no-code/
_cus_head: "_popup_head.html"
_cus_index: "110"
---

{% include _xtt_demo.html %}

### ZCL_XTT_IMAGE class

[In the previous example №10](../images/) pictures were created using the ZCL_XTT_IMAGE class.\
Is it possible to somehow simplify this process?

![image](https://user-images.githubusercontent.com/36256417/103112878-31cad000-4682-11eb-87c8-3db8a095bd9e.png)

### Why is this necessary?
* To create a picture on the ABAP side you need a *special* factory method. If the internal implementation would be changed in the future, the "hard" reference to the class and method will not allow you to do this painlessly
* To *understand* the template, you need to view the ABAP code, since the type {R-T-IMG} is unknown
* If a template is used, the image actually needs only binary data
* Without a template, you must also specify the height, width and extension of the file (.jpg by default)

### Addition ';type=image'
This addition allows you to "convert" binary data (xString) into a picture without calling an additional ABAP method

![image](https://user-images.githubusercontent.com/36256417/103113188-d1d52900-4683-11eb-8b37-6d5ee8461afc.png)

The example 11 uses the data in the 10th. But by using **RAW TYPE XSTRING** field for output instead of *IMG TYPE REF TO ZCL_XTT_IMAGE*

![image](https://user-images.githubusercontent.com/36256417/103113102-54111d80-4683-11eb-99aa-c075a6e9de78.png)


The [ZCL_XTT_IMAGE](../images/) class is used only indirectly. All additional parameters to the ZCL_XTT_IMAGE=>CREATE_IMAGE( ) method can be passed through:
* ;width=
* ;height=
* ;ext=

from the template itself, in more complex cases you need to use a special "template" for pictures (see column F)

