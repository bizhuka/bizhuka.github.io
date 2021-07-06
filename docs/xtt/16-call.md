---
parent: "XTT - reports"
title: "160 Calling a method from a template"
nav_order: 160
permalink: /xtt/call/
_cus_head: "_popup_head.html"
_cus_index: "160"
---

{% include _xtt_demo.html %}

### Background
Previously, absolutely all transmitted data had to be formed in advance and passed to the **xtt-> merge( )** method. And sometimes there is quite a lot of such data.
In order to reduce the amount of data transferred in example №130, the addition [;cond=](../cond/) is introduced, which allows you to write simple ABAP COND #( ) expressions.
For example, if you need to display the maximum of the fields `A` and `B` in the **`R`** structure, you can write in the template`{R;cond=WHEN value-A gt value-B THEN value-A ELSE value-B }` without creating a 3rd field in **`R`**. For brevity, the expression can be written like this `{R:WHEN v-A gt value-B THEN v-A ELSE v-B}`.

But what if the expression contains a lot of WHEN-THEN pairs, or is it problematic to write it on one line? To improve the reading of the template, the ability to call a method with passing parameters to it has been introduced.

### Implicit parameter passing

To call a method in a template, you can use the addition **;call =**, the object itself whose methods will be called is passed in the **merge** method

![image](https://user-images.githubusercontent.com/36256417/124561712-02cabd80-de60-11eb-8891-3c37ebce9fd5.png)

There is no need to specify the transfer of the structure **`R`** in the template

![image](https://user-images.githubusercontent.com/36256417/124562741-322dfa00-de61-11eb-85c0-bcc7fc2a58a9.png)

It is passed implicitly, by the name **`IS_ROOT`**
```abap
      get_fullname
        IMPORTING
                  is_root TYPE ts_root "<--- is passed implicitly
        RETURNING VALUE (rv_text) TYPE string,

...

  METHOD get_fullname.
    rv_text = to_upper (| {is_root-first_name} {is_root-last_name} {is_root-middle_name} |).
  ENDMETHOD.
```

### Short form
So that, as in the case of replacing `;cond =` with **`:`**,  you can replace`;call=`  with one symbol **`@`**

![image](https://user-images.githubusercontent.com/36256417/124564236-ab7a1c80-de62-11eb-959e-2d4190943faf.png)

### Passing parameters explicitly
If you don't need to pass the entire structure, you can pass the parameter explicitly via `value-FIELD` (for ;call=) or `v-FIELD` (for @)

![image](https://user-images.githubusercontent.com/36256417/124570027-52ad8280-de68-11eb-8acd-d561c9bcfe74.png)

The method has the following signature
```abap
      date_text
       IMPORTING
         "is_root TYPE ts_flight_info <- no need. Pass v-FLDATE explicitly
         iv_date TYPE d
         iv_lang TYPE sylangu DEFAULT sy-langu
       RETURNING VALUE (rv_text) TYPE string.
```


Note that the type (by default STRING) as opposed to`;cond=` in the cell `{R-T:sy-tabix;type=integer}` is not required. Since the type for `rv_text` is determined dynamically

Result in two languages:
![image](https://user-images.githubusercontent.com/36256417/124571071-4aa21280-de69-11eb-94d9-bd9b1e020708.png)

---

### PS
Displaying dates through a function is demonstrative in nature. When using Excel, it is better to use the ABAP `D` date type, and set the format in the cell itself (Ctrl + 1)

![image](https://user-images.githubusercontent.com/36256417/124572354-6823ac00-de6a-11eb-8e6c-2b4f44dea44a.png)

![image](https://user-images.githubusercontent.com/36256417/124573287-36f7ab80-de6b-11eb-9429-5bbb01b1bec4.png)

---

For universal display of dates in Pdf & Word, often you can use `;cond=` with `COUNTRY` addition

![image](https://user-images.githubusercontent.com/36256417/124571453-9bb20680-de69-11eb-8eb0-edaee2496098.png)

![image](https://user-images.githubusercontent.com/36256417/124573433-5b538800-de6b-11eb-90cc-62484bbd1a77.png)