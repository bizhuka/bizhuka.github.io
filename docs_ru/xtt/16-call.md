---
parent: "XTT - отчеты"
title: "160 Вызов метода из шаблона"
nav_order: 160
permalink: /ru/xtt/call/
_cus_head: "_popup_head.html"
_cus_index: "160"
---

{% include _xtt_demo.html %}

### Предыстория
Ранее абсолютно все передаваемые данные должны были быть сформированы заранее и переданы в метод **xtt->merge( )**. И таких данных подчас довольно много.
Дабы сократить объем передаваемых данных в примере No130 введено  дополнение [;cond=](../cond/) которое позволяет писать простые ABAP выражения COND #( ).
К примеру если надо вывести максимальное из полей  `A`  и  `B`  в структуре **`R`** можно написать в шаблоне  `{R;cond=WHEN value-A gt value-B THEN value-A ELSE value-B}`  без создания 3-го поля в **`R`**. Для краткости выражение можно написать вот так  `{R:WHEN v-A gt value-B THEN v-A ELSE v-B}`.

Но что если выражение содержит очень много пар WHEN-THEN или же его проблематично записать в одну строку? Чтобы улучшить чтения шаблона введена возможность вызова метода с передачей в него, в случае необходимости, параметров.

### Неявная передача параметра

Для вызова метода в шаблоне можно использовать дополнение **;call=**, сам объект чьи методы будем вызывать передается в методе **merge**

![image](https://user-images.githubusercontent.com/36256417/124561712-02cabd80-de60-11eb-8891-3c37ebce9fd5.png)

В шаблоне нет необходимости указывать передачу структуры **`R`**

![image](https://user-images.githubusercontent.com/36256417/124562741-322dfa00-de61-11eb-85c0-bcc7fc2a58a9.png)

Она передается неявно, по имени **`IS_ROOT`**
```abap
      get_fullname
        IMPORTING
                  is_root        TYPE ts_root " <--- is passed implicitly
        RETURNING VALUE(rv_text) TYPE string,

...

  METHOD get_fullname.
    rv_text = to_upper( |{ is_root-first_name } { is_root-last_name } { is_root-middle_name }| ).
  ENDMETHOD.
```

### Краткая форма
Чтобы как и в случае с заменой `;cond=`  на **`:`**,  `;call=`  можно заменить на один символ **`@`**
![image](https://user-images.githubusercontent.com/36256417/124564236-ab7a1c80-de62-11eb-959e-2d4190943faf.png)

### Явная передача параметров
Если передавать всю структуру не нужно, можно передать параметр явно через  `value-FIELD`  (для ;call=) или же  `v-FIELD`  (для @)

![image](https://user-images.githubusercontent.com/36256417/124570027-52ad8280-de68-11eb-8acd-d561c9bcfe74.png)

Метод имеет следующую сигнатуру
```abap
      date_text
       IMPORTING
         " is_root TYPE ts_flight_info <-- no need. Pass v-FLDATE explicitly
         iv_date TYPE d
         iv_lang TYPE sylangu DEFAULT sy-langu
       RETURNING VALUE(rv_text) TYPE string.
```


Обратите внимание что тип (пу STRING) в отличии от  ;cond=  ячейка  `{R-T:sy-tabix;type=integer}`  указывать не надо. Так как тип для `rv_text` определяется динамически

Результат на двух языках:
![image](https://user-images.githubusercontent.com/36256417/124571071-4aa21280-de69-11eb-94d9-bd9b1e020708.png)

---

### PS
Вывод дат через функцию носит демонстративный характер. При использовании Excel лучше использовать тип ABAP `D` date, и задавать формат в самой ячейке (Сtrl+1)

![image](https://user-images.githubusercontent.com/36256417/124572354-6823ac00-de6a-11eb-8e6c-2b4f44dea44a.png)

![image](https://user-images.githubusercontent.com/36256417/124573287-36f7ab80-de6b-11eb-9429-5bbb01b1bec4.png)

---

Для универсального вывода дат в Pdf & Word зачастую можно обойтись `;cond=` с дополнением `COUNTRY`

![image](https://user-images.githubusercontent.com/36256417/124571453-9bb20680-de69-11eb-8eb0-edaee2496098.png)

![image](https://user-images.githubusercontent.com/36256417/124573433-5b538800-de6b-11eb-90cc-62484bbd1a77.png)