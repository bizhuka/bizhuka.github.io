---
parent: "AQO - настройки"
title: "Журнал изменений"
nav_order: 02
permalink: /ru/aqo/change-log/
---

### Пустое значение для выпадающего списка в alv
[2023-01-13](https://github.com/bizhuka/aqo/commit/be20d99dc1cefbf2e472dcba299d0e8058303dc7)
Ошибка была вызвана начальным пробелом
![image](https://user-images.githubusercontent.com/36256417/212450055-7e174538-c095-4675-a6da-81b00dad738b.png)

### Типы классов
[2023-01-11](https://github.com/bizhuka/aqo/commit/7789d93b4a3f6366c9f1898f104b85762a293d76)
Ранее для таблиц отображались только типы объявленные в ddic ![image](https://user-images.githubusercontent.com/36256417/212450185-3ce2f778-27d0-4cf3-b33b-23f54234d902.png)

### Раннее создание BDS_LOCL
[2022-10-29](https://github.com/bizhuka/aqo/commit/049d673c10af635232a8489a2b7998e190fb206b)
Переход к вкладке «Attachments» создавал запись в таблице BDS_LOCL
![image](https://user-images.githubusercontent.com/36256417/212450331-a1110968-384d-417d-adfe-12280cbe5e0c.png)

### Предпочитаемый параметр IO_DATA
[2022-10-19](https://github.com/bizhuka/aqo/commit/542ced554fb1b05e2d0f559dbac544ac3dacbad8)
Всего одна строка кода для создания настройки
``` abap
zcl_aqo_option=>create( me ).
```

### Определение пакета для локальных классов
[2022-07-14](https://github.com/bizhuka/aqo/commit/0e499499ab935a2782141ff1d265b0ab0d9e6182)
Автоматическое определение параметра **iv_package_id** было ошибочным для локальных классов.

### Новая транзакция ZAQO
[2022-03-29](https://github.com/bizhuka/aqo/commit/9ed789a14f4ee2e9eec1b978ad654367db21a11e)
Короткий код транзакции
![image](https://user-images.githubusercontent.com/36256417/212450801-089b12e2-9c54-4414-81a1-445fb981e108.png)

### ALV - пропуск сообщения
[2022-03-23](https://github.com/bizhuka/aqo/commit/f4dea060f73d756616f1b8e5687e2dc3ab7df71a)
Новые строки со значениями домена вызвали ошибку
![image](https://user-images.githubusercontent.com/36256417/212451077-4d8d9614-6e82-4f06-8146-73b68842bb06.png)

### Всплывающее окно для вложений
[2022-03-22](https://github.com/bizhuka/aqo/commit/a7415ca56ad3667462306fb1207ab0fea792808d)
Проблему с транспортом BDS
Диалог ведения для таблицы BDS_LOCL. tr. OAOR
![image](https://user-images.githubusercontent.com/36256417/212453113-940d7f04-9406-4217-9445-2004786a9121.png)

### Активация кнопки SAVE при нажатии checkbox
[2021-12-14](https://github.com/bizhuka/aqo/commit/157b26e25189d73002050ca15b8ddd48042595f3)
Теперь щелчок по checkbox (или выбор из списка) посылает USER-COMMAND
![image](https://user-images.githubusercontent.com/36256417/212456161-e7321f8b-0958-4e78-9da2-3d95216ca91c.png)

### Rollname для screen
[06.12.2021](https://github.com/bizhuka/aqo/commit/534ac63708f219626a4d071cf348dacba88956f7)
Экраны теперь более точные, так как SH определяется по полюTABLE-FIELD.

### Активация конпки SAVE
[2021-12-05](https://github.com/bizhuka/aqo/commit/87e256a8461de9ca8bd31b8478e874dd1383cd4f) [2021-11-05](https://github.com/bizhuka/aqo/commit/8a95f58293ae80d5a463f128edfdfc)

### Вызов транзакции
[2021-11-23](https://github.com/bizhuka/aqo/commit/1d974960baab32e384edecc9b5c1d80e37ebae43)
Вызов транзакции в пользовательском коде
``` abap
      SET PARAMETER ID: 'ZAQO_PACKAGE_ID' FIELD <ls_opt>-package_id,
                        'ZAQO_OPTION_ID'  FIELD <ls_opt>-option_id,
                        'ZAQO_COMMAND'    FIELD 'OPEN_OPTION'.
      DATA(lv_tcode) = COND sytcode( WHEN p_view = abap_true THEN 'ZAQO_VIEWER_OLD' ELSE 'ZAQO_EDITOR_OLD' ).
      CALL TRANSACTION lv_tcode AND SKIP FIRST SCREEN.   "#EC CI_CALLTA
```

### Синхронизация вкладок
[20.11.2021](https://github.com/bizhuka/aqo/commit/a3f2ce5e6702e07eb5c3f0427d689ba102953d76)
Синхронизация двух вкладок
![image](https://user-images.githubusercontent.com/36256417/212459742-f47de18c-89ad-4ac8-82c4-b8dbd43ba1a5.png)

### Режим редактирования и русская локлизация
[2021-11-04](https://github.com/bizhuka/aqo/commit/e8584ab0337f95be2861380379dc2f280daf386f)

### Бета версия 3
[2021-10-27](https://github.com/bizhuka/aqo/commit/131825d2c89c78de2852a0d7dc768d24cc724bd2)
Новый интерфейс на основе динамических экранов. Ранее он был основан на FM *FREE_SELECTIONS_DIALOG*

### Информация о транспорте в новой таблице
[2021-10-08](https://github.com/bizhuka/aqo/commit/08af38bde14b2cb2512072a7ad5ed1d9259a8221)

Информация о транспорте в Oracle (*sy-dbsys*), в отличии от HANA, работала очень медленно. Поэтому была создана отдельная вкладка
![image](https://user-images.githubusercontent.com/36256417/212459990-eefa2b40-90d9-4b54-8d26-06e4756709db.png)
