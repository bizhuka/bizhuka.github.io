---
parent: "XTT - отчеты"
title: "10 Изображения"
nav_order: 100
permalink: /ru/xtt/images/
_cus_head: "_popup_head.html"
_cus_index: "10"
---

{% include _xtt_demo.html %}

### Изображения в шаблоне
{: .no_toc }

Как удобнее показать в шаблоне что в данном месте будет отображено несколько картинок?

Если в шаблоне заранее известное количество рисунков, можно создать пустые изображения и менять из содержимое в runtime.
Проблем с подменой содержимого не возникает, тк в форматах на основе XML изображения обычно хранятся [в base64](https://ru.wikipedia.org/wiki/Base64),
в офисных пакетах это картинки в определенных директориях в самом zip архиве шаблона.
Тут все довольно просто

### Простые картинки

Если вывод ни чем не осложнен и картинка в шаблоне это обычный прямоугольник, можно описать картинку как и прочие поля

![image](https://user-images.githubusercontent.com/36256417/91287754-f42c6800-e7b1-11ea-99ce-bb9dc2b49113.png)

На стороне ABAP нам понадобиться лишь 1 дополнительный класс **ZCL_XTT_COMP_CELL**.
Его инстанция и будет готовое изображение

```abap
 img  TYPE REF TO zcl_xtt_comp_cell, " <--- IMAGE
```

При создании объекта нужно будет передать лишь двоичные данные (iv_image TYPE xString)

```abap
    " Create new instance
    <ls_icon>-img = zcl_xtt_comp_cell=>create_image( iv_image  = lv_image ).
```

Дополнительно можно передать размер изображения и его формат (расширение)

```abap
    " Create new instance
    <ls_icon>-img = zcl_xtt_comp_cell=>create_image( iv_image  = lv_image
                                                     iv_ext    = '.gif'
                                                     iv_width  = lv_width
                                                     iv_height = lv_height ).
```

Но что если нам нужна еще рамка для изображения и скругленные края?

### Шаблоны картинок
Если добавлять параметры в виде текста {R-T-IMG;**borderColor**=black;**border-style**=dotted} таких параметров будет очень много и сама реализация будет сильно отличаться в pdf от Excel.

### 1) Excel
Самый простой вариант добавить в альтернативный текст ID для данного поля
![image](https://user-images.githubusercontent.com/36256417/91291353-c0a00c80-e7b6-11ea-909c-3c8829c00e6e.png)

Но данный способ совсем не информативен (его просто **не видно**), и чтобы облегчить жизнь абаперу, который будет искать откуда растут ноги у данной картинки,
можно назвать само изображение в соответствии с передаваемым в шаблон полем ABAP

![image](https://user-images.githubusercontent.com/36256417/91292441-52f4e000-e7b8-11ea-99a9-3b21e3130556.png)

Вот так будет понятнее, но чтобы минимизировать количество проклятий, можно сделать еще проще

Просто указать поле вместе с шаблоном для картинки в одной ячейке Excel
![image](https://user-images.githubusercontent.com/36256417/91292377-39539880-e7b8-11ea-996b-15d659379b71.png)

***

Результат Excel

![image](https://user-images.githubusercontent.com/36256417/91292908-06f66b00-e7b9-11ea-9b71-a20a0488c0e9.png)


***

### 2) Word
Кузен Excel также имеет поле альтернативный текст.\
Но легко ли его заметить? В Word есть закладки и гиперссылки, но они также имеют тот же не достаток
![image](https://user-images.githubusercontent.com/36256417/91293186-74a29700-e7b9-11ea-961a-8476ab0d46cf.png)

В примечаниях его заметить будет намного проще
![image](https://user-images.githubusercontent.com/36256417/91293596-16c27f00-e7ba-11ea-8c0b-8f2a8d054be9.png)

***

Результат Word

![image](https://user-images.githubusercontent.com/36256417/91293788-58ebc080-e7ba-11ea-9b63-86bd2a3ebb35.png)

***

### 3) Pdf

И на конец, горячо любимый формат печати Pdf & LiveCycle Designer

Может не только использовать тексты, и менять тип на **Image**
![image](https://user-images.githubusercontent.com/36256417/91294517-7bcaa480-e7bb-11ea-8a15-78d55616863b.png)


Но и позволяет, при определенном желании, давать имена в фигурных скобках на вкладке **XML Source**
![image](https://user-images.githubusercontent.com/36256417/91294231-02cb4d00-e7bb-11ea-97e7-a32966defa83.png)

Но можно также указать его в URL (правда это не так заметно)

![image](https://user-images.githubusercontent.com/36256417/91294975-29d64e80-e7bc-11ea-8549-7109ba04160a.png)

***

Результат Pdf

![image](https://user-images.githubusercontent.com/36256417/91295154-7457cb00-e7bc-11ea-9d4e-fc9e78728d5e.png)

