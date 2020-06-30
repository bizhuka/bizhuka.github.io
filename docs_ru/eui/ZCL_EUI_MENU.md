---
parent: "EUI - интерфейс пользователя"
nav_order: 50
title: "MENU Gos меню"
tags: [zcl_eui_menu]
permalink: /ru/eui/zcl_eui_menu/1
date: 2020-04-28
---

Когда ```PF-STATUS``` полон кнопками и нельзя использовать ```SELECTION-SCREEN - FUNCTION KEY``` по причине того, что ЛБД заняла все 4 кнопки, можно добавить свою кнопку также как делает это GOS.

 ![image](https://user-images.githubusercontent.com/36256417/80451042-50829680-893c-11ea-98cf-04eda51a6b9f.png)

***

### Примеры
SE38 -> **ZEUI_TEST_MENU**

<div class="tab-header">
<ul class="nav nav-tabs">
  <li class="active">
    <a data-toggle="tab" href="#basic">Базовое использование</a>
  </li>
  <li>
    <a data-toggle="tab" href="#nested">Вложенное меню</a>
  </li>
</ul>
</div>


<div class="tab-content">
  <div class="tab-pane active" id="basic">
<div class="container-fluid" markdown="1">   

``` abap
...

  METHODS:
    " Событие CL_GUI_TOOLBAR
    on_gos_menu_clicked FOR EVENT function_selected OF cl_gui_toolbar
      IMPORTING
        fcode.

...

" Кнопка а-ля GOS
DATA(lo_menu) = NEW zcl_eui_menu(
  io_handler = me ). " <- handler is ON_GOS_MENU_CLICKED

" Создание 1 кнопки
lo_menu->create_toolbar(
 iv_width = 90

 it_menu  = VALUE #(
  ( function = mc_cmd-email
    text     = `E-mail`
    icon     = icon_mail ) ) ).
 
...
 
METHOD on_gos_menu_clicked.
  " Только 1 код функции
  CHECK fcdoe = mc_cmd-email.
  ...
```

![image](https://user-images.githubusercontent.com/36256417/85937303-1a559900-b924-11ea-9a42-4eb1d43ad446.png)

</div> <!-- This close tag must be left aligned. -->
  </div>
  <div class="tab-pane" id="nested">
<div class="container-fluid" markdown="1">

``` abap
" Подменю
lo_menu->create_toolbar(
 it_menu  = VALUE #(
  ( function     = '_OAOR_ROOT' ... )

  ( par_function = '_OAOR_ROOT' " После базового элемента
    function     = '_OAOR_IMPORT'
...
```

![image](https://user-images.githubusercontent.com/36256417/85918160-0bb6a580-b882-11ea-86c0-54964d6fd62a.png)

![image](https://user-images.githubusercontent.com/36256417/80451042-50829680-893c-11ea-98cf-04eda51a6b9f.png)

</div> <!-- This close tag must be left aligned. -->
  </div>
</div>

---

### Описание ZCL_EUI_MENU

Класс **ZCL_EUI_MENU** создает меню на основе CL_GUI_TOOLBAR и использует CL_GUI_GOS_CONTAINER если ему не передали другого контейнера.

Меню можно создать (или пересоздать) вызвав метод **CREATE_TOOLBAR**.

Он принимает 2 параметра:
* IV_WIDTH – optional параметр. Если toolbar имеет тексты, а не только иконки
* IT_MENU – иерархическое меню с описанием кнопок

Основные параметры для CL_GUI_TOOLBAR указаны в структуре **STB_BUTTON** (id функции, иконка, текст).

Разделитель создается указанием ```butn_type = cntb_btype_sep```
 
Для создания иерархии нужно заполнить параметр **PAR_FUNCTION**

![image](https://user-images.githubusercontent.com/36256417/80451272-d9013700-893c-11ea-9f6e-43b588689d68.png) 

---

Сам обработчик события указывается в конструкторе (параметр **IO_HANDLER**) или в методе CHANGE_HANDLER

Этот параметр представляет собой объект в котором должен быть объявлен публичный метод

```abap
ON_FUNCTION_SELECTED
    for event FUNCTION_SELECTED of CL_GUI_TOOLBAR
```
Название метода значения не имеет так как метод ищется по его сигнатуре
 
![image](https://user-images.githubusercontent.com/36256417/80451340-0948d580-893d-11ea-8023-05defe15d6df.png)

---

Чтобы изменять меню в RunTime (к примеру скрыть меню после запуска программы) можно получить доступ до контейнера или самого CL_GUI_TOOLBAR
 
![image](https://user-images.githubusercontent.com/36256417/80451378-2382b380-893d-11ea-810e-661d0fef4f3d.png)



