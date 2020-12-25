---
parent: "AQO - настройки"
title: "Каталог полей и прочие настройки таблиц"
nav_order: 07
permalink: /ru/aqo/field-catalog/
---

### Каталог полей и прочие настройки таблиц
{: .no_toc }

Так как таблицы могут включать в себя все остальные типы данных (строки, range и другие таблицы) и каталог полей, способ их настройки не всегда столь очевиден, как того хотелось бы.

![image](https://user-images.githubusercontent.com/36256417/102843466-74e33400-4433-11eb-964c-3fb05094f945.png)

---

### Каталог полей

Для поля чаще всего нужно исправить **Label**, порядок (Drag & Drop строки) а также средство поиска

![image](https://user-images.githubusercontent.com/36256417/103067366-ed3d2700-45e4-11eb-9697-29b37934d840.png)

Для средства поиска достаточно указать ссылочной тип в виде **ТАБЛИЦА-ПОЛЕ**. СП данного поля будет использовать при вводе данных

Если есть значения в домене будет отображен Dropdown

![image](https://user-images.githubusercontent.com/36256417/102844690-27b49180-4436-11eb-81e3-e4479a0a491e.png)


### Связи между таблицами
В большинстве случаев указание поля из словаря данных (*SE11*) в виде **ТАБЛИЦА-ПОЛЕ** будет вполне достаточно.\
Если же нужен СП на основе другой таблицы (в той же настройке) ее можно указать тут.

![image](https://user-images.githubusercontent.com/36256417/103114070-7e64da00-4687-11eb-8dc1-87fce8f564bd.png)


В результате в основной таблице будет 2 СП или dropdown-ы

![image](https://user-images.githubusercontent.com/36256417/103066946-1d37fa80-45e4-11eb-8603-389fd90b7355.png)


При этом должно быть выполнено несколько условий
* Таблицы должны находится на 1-м уровне (вложенные таблицы не поддерживаются)
* Таблица на которую ссылаемся должна быть объявлена как *SORTED|HASHED WITH UNIQUE KEY* из 1-го поля (связи по нескольким полям недоступны)

Для показа dropdown вместо СП также должно выполняться 2 условия
* Количество записей должно быть меньше 16
* В данной таблице может быть не более 2-х простых полей (те за исключением string, range, table)

![image](https://user-images.githubusercontent.com/36256417/103064202-b31c5700-45dd-11eb-93ee-728e2f65c1cb.png)


### Изменения первичного ключа
Довольно часто приходится изменять 1-й ключ таблицы.\
Это можно сделать запустив создание настройки с параметром *IV_REPAIR = 'X'*

или исправив описание в коде и в настройке

![image](https://user-images.githubusercontent.com/36256417/103113994-2fb74000-4687-11eb-8927-fd1e9e10e99b.png)


### Добавление нового поля
Также параметр *IV_REPAIR = 'X'* можно использовать при изменении каталога полей\
или же для удаления/добавления поля можно воспользоваться кнопками

![image](https://user-images.githubusercontent.com/36256417/103113794-78bac480-4686-11eb-9411-76bff04a25d1.png)

хотя, исправить описание с параметром IV_REPAIR = 'X' из кода будет быстрее и надежнее