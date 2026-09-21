---
parent: "XTT - reports"
title: "160 Call a method from a template"
nav_order: 160
permalink: /xtt/call/
_cus_head: "_popup_head.html"
_cus_index: "160"
---

{% include _xtt_demo.html %}

## Purpose

Demo `ZCL_XTT_DEMO_160` calls an object method from a marker. Use `;call=` when a display value is too involved for a short [`;cond=` expression](../cond/) but does not justify another field in the report context.
For example, if you need to display the maximum of the fields `A` and `B` in the **`R`** structure, you can write in the template`{R;cond=WHEN value-A gt value-B THEN value-A ELSE value-B }` without creating a 3rd field in **`R`**. For brevity, the expression can be written like this `{R:WHEN v-A gt value-B THEN v-A ELSE v-B}`.

Move long or reusable presentation logic into a method so the template remains readable.

## Implicit parameter passing

Pass the target object to `MERGE( )`, then use `;call=` in the marker.

![image](https://user-images.githubusercontent.com/36256417/124561712-02cabd80-de60-11eb-8891-3c37ebce9fd5.png)

The complete root context is passed implicitly to an importing parameter named `IS_ROOT`.

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

## Short form

As `:` abbreviates `;cond=`, `@` abbreviates `;call=`.

![image](https://user-images.githubusercontent.com/36256417/124564236-ab7a1c80-de62-11eb-959e-2d4190943faf.png)

## Explicit parameters

When the method needs only selected values, pass them explicitly with `value-FIELD` in the long form or `v-FIELD` in the `@` shorthand.

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


Unlike `;cond=`, the output type is derived from the returning parameter. An explicit `;type=` is normally unnecessary.

Result in two languages:
![image](https://user-images.githubusercontent.com/36256417/124571071-4aa21280-de69-11eb-94d9-bd9b1e020708.png)

---

## Date-formatting note

The date method is illustrative. For Excel, prefer ABAP type `D` and set the number format in the cell with **Ctrl+1**.

![image](https://user-images.githubusercontent.com/36256417/124572354-6823ac00-de6a-11eb-8e6c-2b4f44dea44a.png)

![image](https://user-images.githubusercontent.com/36256417/124573287-36f7ab80-de6b-11eb-9429-5bbb01b1bec4.png)

---

For locale-aware dates in PDF and Word, a string template in `;cond=` with the `COUNTRY` formatting option is often sufficient.

![image](https://user-images.githubusercontent.com/36256417/124571453-9bb20680-de69-11eb-8eb0-edaee2496098.png)

![image](https://user-images.githubusercontent.com/36256417/124573433-5b538800-de6b-11eb-90cc-62484bbd1a77.png)
