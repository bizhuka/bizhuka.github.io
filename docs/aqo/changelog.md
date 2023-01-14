---
parent: "AQO - options"
title: "Change log"
nav_order: 02
permalink: /aqo/change-log/
---

### fix alv dropdown empty value
 [2023-01-13](https://github.com/bizhuka/aqo/commit/be20d99dc1cefbf2e472dcba299d0e8058303dc7)
The error was caused by a leading space
![image](https://user-images.githubusercontent.com/36256417/212450055-7e174538-c095-4675-a6da-81b00dad738b.png)

### Class types
 [2023-01-11](https://github.com/bizhuka/aqo/commit/7789d93b4a3f6366c9f1898f104b85762a293d76)
Previously only ddic types were showed for tables  ![image](https://user-images.githubusercontent.com/36256417/212450185-3ce2f778-27d0-4cf3-b33b-23f54234d902.png)


### fix early BDS_LOCL creation
 [2022-10-29](https://github.com/bizhuka/aqo/commit/049d673c10af635232a8489a2b7998e190fb206b)
Navigation to "Attachments" made entry in BDS_LOCL table
![image](https://user-images.githubusercontent.com/36256417/212450331-a1110968-384d-417d-adfe-12280cbe5e0c.png)

### preferred parameter IO_DATA
 [2022-10-19](https://github.com/bizhuka/aqo/commit/542ced554fb1b05e2d0f559dbac544ac3dacbad8)
Just one code line for creating an option
``` abap
zcl_aqo_option=>create( me ).
```

### fix package detection for local classes
 [2022-07-14](https://github.com/bizhuka/aqo/commit/0e499499ab935a2782141ff1d265b0ab0d9e6182)
Auto detecting of **iv_package_id** parameter was broken for local classes

### new tr. ZAQO
 [2022-03-29](https://github.com/bizhuka/aqo/commit/9ed789a14f4ee2e9eec1b978ad654367db21a11e)
Short transaction code
![image](https://user-images.githubusercontent.com/36256417/212450801-089b12e2-9c54-4414-81a1-445fb981e108.png)


### ALV - skip message 'Enter a valid value'
 [2022-03-23](https://github.com/bizhuka/aqo/commit/f4dea060f73d756616f1b8e5687e2dc3ab7df71a)
New lines with domain values caused an error
![image](https://user-images.githubusercontent.com/36256417/212451077-4d8d9614-6e82-4f06-8146-73b68842bb06.png)


### create popup window
 [2022-03-22](https://github.com/bizhuka/aqo/commit/a7415ca56ad3667462306fb1207ab0fea792808d)
Fix transportation problem
Maintenance dialog for BDS - tr. OAOR
![image](https://user-images.githubusercontent.com/36256417/212453113-940d7f04-9406-4217-9445-2004786a9121.png)


### activate SAVE button when checkbox (or listbox) is clicked
 [2021-12-14](https://github.com/bizhuka/aqo/commit/157b26e25189d73002050ca15b8ddd48042595f3)
Now checkbox click sends USER-COMMAND
![image](https://user-images.githubusercontent.com/36256417/212456161-e7321f8b-0958-4e78-9da2-3d95216ca91c.png)


### pass rollname for screen
 [2021-12-06](https://github.com/bizhuka/aqo/commit/534ac63708f219626a4d071cf348dacba88956f7)
Screens more accurate since search helps will be detected by TABLE-FIELD rollname


### fix bug activate SAVE button
 [2021-12-05](https://github.com/bizhuka/aqo/commit/87e256a8461de9ca8bd31b8478e874dd1383cd4f)   [2021-11-23](https://github.com/bizhuka/aqo/commit/8a95f58293ae80d5a468f17edfd31b28dcde2895)

### call transaction mode
 [2021-11-23](https://github.com/bizhuka/aqo/commit/1d974960baab32e384edecc9b5c1d80e37ebae43)
Start transaction by custom code
``` abap
      SET PARAMETER ID: 'ZAQO_PACKAGE_ID' FIELD <ls_opt>-package_id,
                        'ZAQO_OPTION_ID'  FIELD <ls_opt>-option_id,
                        'ZAQO_COMMAND'    FIELD 'OPEN_OPTION'.
      DATA(lv_tcode) = COND sytcode( WHEN p_view = abap_true THEN 'ZAQO_VIEWER_OLD' ELSE 'ZAQO_EDITOR_OLD' ).
      CALL TRANSACTION lv_tcode AND SKIP FIRST SCREEN.   "#EC CI_CALLTA
```

### Sync data tab with the field settings
 [2021-11-20](https://github.com/bizhuka/aqo/commit/a3f2ce5e6702e07eb5c3f0427d689ba102953d76)
Synchronization of two tabs
![image](https://user-images.githubusercontent.com/36256417/212459742-f47de18c-89ad-4ac8-82c4-b8dbd43ba1a5.png)


### Edit mode & locale 'RU'
 [2021-11-04](https://github.com/bizhuka/aqo/commit/e8584ab0337f95be2861380379dc2f280daf386f)

### V3 beta
 [2021-10-27](https://github.com/bizhuka/aqo/commit/131825d2c89c78de2852a0d7dc768d24cc724bd2)
New interface based on dynamic screens. Previously it was based on FM *FREE_SELECTIONS_DIALOG*


### Transport info in new table
 [2021-10-08](https://github.com/bizhuka/aqo/commit/08af38bde14b2cb2512072a7ad5ed1d9259a8221)

Information about transport is very slow in Oracle (*sy-dbsys*). That's why separate tab was created
![image](https://user-images.githubusercontent.com/36256417/212459990-eefa2b40-90d9-4b54-8d26-06e4756709db.png)
