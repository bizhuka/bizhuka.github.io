---
parent: "EUI - интерфейс пользователя"
nav_order: 70
title: "Журнал приложений"
tags: [zcl_eui_logger]
permalink: /ru/eui/zcl_eui_logger/1
date: 2020-12-26
---

### Класс ZCL_EUI_LOGGER
{: .no_toc }

Небольшая обертка на BAL log

![image](https://user-images.githubusercontent.com/36256417/103149311-83628000-4792-11eb-9481-2f7cf7bc1fac.png)

Предназначение класса понятно из названия\
Возможности:

* *IS_HEADER* - Время жизни лога, объект - подобъект и прочие тех. настройки

![image](https://user-images.githubusercontent.com/36256417/103149454-c4a75f80-4793-11eb-9be4-afa785e95153.png)


* *IV_MSG_TYPES* - Какие сообщения добавлять в лог. Пу все виды сообщений

![image](https://user-images.githubusercontent.com/36256417/103149511-5fa03980-4794-11eb-89a0-1673ae1e4eac.png)

* Добавления сообщений

![image](https://user-images.githubusercontent.com/36256417/103149644-64192200-4795-11eb-98c3-6bc31039a971.png)

Соответственно обертки на стандартные ФМ
1) CALL FUNCTION 'BAL_LOG_MSG_ADD'
1) CALL FUNCTION 'BAL_LOG_MSG_ADD_FREE_TEXT'
1) CALL FUNCTION 'BAL_LOG_EXCEPTION_ADD'

с передачей стандартных параметров

![image](https://user-images.githubusercontent.com/36256417/103150027-ef94b200-4799-11eb-8762-b7cbbdadab7b.png)


* ADD_BATCH принимает любую таблицу с логами\
Тип таблицы определяется последовательным поиском следующих полей

![image](https://user-images.githubusercontent.com/36256417/103149692-f9b4b180-4795-11eb-9f24-8be4890cc5d5.png)

* Основные методы для работы с логами

![image](https://user-images.githubusercontent.com/36256417/103149741-88293300-4796-11eb-8937-195c66d7e71b.png)

* SHOW( ) использует ФМ 'BAL_DSP_PROFILE_SINGLE_LOG_GET' для получения профиля
![image](https://user-images.githubusercontent.com/36256417/103149829-8dd34880-4797-11eb-99d5-bb50c06984e1.png)

2-й параметр нужен для "уточнения" профиля

![image](https://user-images.githubusercontent.com/36256417/103149875-15b95280-4798-11eb-9ec9-3907d89ce585.png)


* SHOW_AS_BUTTON( ) показывает кнопку GOS, которая сама может показать окно лога в режиме POPUP

* Есть возможность показа уникальных записей лога и игнорирования определенных сообщений

