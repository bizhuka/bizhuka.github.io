---
parent: "AQO - настройки"
title: "03 Расширение"
nav_order: 30
permalink: /ru/aqo/extensions/
---

### 1. Проверка атрибутов класса
Расширение для настроек на основе атрибутов класса

На данный момент содержит 1 метод для проверки целостности настройки перед ее сохранением

![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/03_aqo_ext.png)
 
 В нем в случае ошибки нужно вернуть текст с описанием ошибки.\
 Для получение отдельного значения нужно вызвать:\
 **io_option->get_field_value**
 ![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/03_aqo_ext_before_save.png)
 
 Для пользователя который будет сохранять настройку выйдет сообщение такого вида
 ![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/03_aqo_ext_before_save_error.png)
 
 
### 2. Проверка полей структуры
Расширение для настроек на основе структуры в программе

Если настройка была создана из программы, а не из класса, в ней можно создать такую процедуру.\
В отличии от класса нужен **TRY** блок.

![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/03_aqo_prog_before_save.png)

 Для пользователя который будет сохранять настройку выйдет сообщение такого вида
 ![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/03_aqo_prog_before_save_error.png)
