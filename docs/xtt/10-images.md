---
parent: "XTT - reports"
title: "10 Images"
nav_order: 100
permalink: /xtt/images/
_cus_head: "_popup_head.html"
_cus_index: "10"
---

{% include _xtt_demo.html %}

### Images in a template
{: .no_toc }

What is the most convenient way to show in a template that several images will be displayed in a given place?

If the template has a predetermined number of images, you can create empty images and change the content at runtime.
There are no problems with changing content, because in XML-based formats images are usually stored [in base64](https://en.wikipedia.org/wiki/Base64),
in MS office pictures are files in certain directories in the zip archive itself.
It's pretty simple

### Simple pictures

If the output is not complicated by anything and the picture in the template is a regular rectangle, you can describe the picture like other fields

![image](https://user-images.githubusercontent.com/36256417/91287754-f42c6800-e7b1-11ea-99ce-bb9dc2b49113.png)

On the ABAP side, we only need 1 additional class **zcl_xtt_image**.
One instance of it will be the finished image

```abap
 img  TYPE REF TO zcl_xtt_image, " <--- IMAGE
```

When creating an object, you will need to transfer only binary data (iv_image TYPE xString)

```abap
    " Create new instance
    <ls_icon>-img = zcl_xtt_image=>create_image( iv_image  = lv_image ).
```

Additionally, you can transfer the size of the image and its format (extension)

```abap
    " Create new instance
    <ls_icon>-img = zcl_xtt_image=>create_image( iv_image  = lv_image
                                                     iv_ext    = '.gif'
                                                     iv_width  = lv_width
                                                     iv_height = lv_height ).
```

But what if we also need a picture frame and rounded edges?

### Picture templates
If you add parameters in the text like that {R-T-IMG;**borderColor**=black;**border-style**=dotted} there will be a lot of such parameters and the implementation itself will be very different in pdf from Excel.

### 1) Excel
The easiest option is to add the ID for this field to the alternative text
![image](https://user-images.githubusercontent.com/36256417/91291353-c0a00c80-e7b6-11ea-909c-3c8829c00e6e.png)

But this method is uninformative (it is simply **invisible** for user), and in order to make life easier for another ABAP developer, who will look for the origins of this picture,
you can name the image itself in accordance with the ABAP field passed to the template

![image](https://user-images.githubusercontent.com/36256417/91292441-52f4e000-e7b8-11ea-99a9-3b21e3130556.png)

This will make it clearer, but to minimize the number of curses, you can make it even easier

Just specify the field along with the template for the picture in one Excel cell
![image](https://user-images.githubusercontent.com/36256417/91292377-39539880-e7b8-11ea-996b-15d659379b71.png)

***

Excel

![image](https://user-images.githubusercontent.com/36256417/91292908-06f66b00-e7b9-11ea-9b71-a20a0488c0e9.png)


***

### 2) Word
Excel's cousin also has an Alt Text field.\
But is it easy to spot? Word has bookmarks and hyperlinks, but they also have the same lack
![image](https://user-images.githubusercontent.com/36256417/91293186-74a29700-e7b9-11ea-961a-8476ab0d46cf.png)

It will be much easier to notice it in the notes.
![image](https://user-images.githubusercontent.com/36256417/91293596-16c27f00-e7ba-11ea-8c0b-8f2a8d054be9.png)

***

Word

![image](https://user-images.githubusercontent.com/36256417/91293788-58ebc080-e7ba-11ea-9b63-86bd2a3ebb35.png)

***

### 3) Pdf

Finally, the beloved Pdf & LiveCycle Designer by many developers

Could convert texts to **Image** fields
![image](https://user-images.githubusercontent.com/36256417/91294517-7bcaa480-e7bb-11ea-8a15-78d55616863b.png)


And it also allows, if desired, to give names in curly braces on the **XML Source** tab
![image](https://user-images.githubusercontent.com/36256417/91294231-02cb4d00-e7bb-11ea-97e7-a32966defa83.png)

But you can also specify it in the URL (although it is not so noticeable)

![image](https://user-images.githubusercontent.com/36256417/91294975-29d64e80-e7bc-11ea-8549-7109ba04160a.png)

***

Pdf

![image](https://user-images.githubusercontent.com/36256417/91295154-7457cb00-e7bc-11ea-9d4e-fc9e78728d5e.png)