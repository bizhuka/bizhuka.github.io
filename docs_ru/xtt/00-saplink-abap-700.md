---
parent: "XTT - отчеты"
title: "Установка через SAPLINK"
nav_order: 08
permalink: /ru/xtt/saplink-abap-700/
---

***

### AbapGit

Установка через [ABAPGIT](../installation-guide/) является предпочтительней.\
Проект на гитхабе обновляется автоматически.


### SAPLINK
Код периодически проверяется в SAP NetWeaver 7.0 ABAP Trial Version.\
И эту версию установки по возможности постараюсь обновлять по запросам.\
За редким исключением примеры в **Z_XTT_DEMO** работать и в версии 7.00

* Скачайте весь архив [SAPLINK с плагинами](https://bizhuka.github.io/saplink/saplink.zip).

* Создайте программу SE38 -> **ZSAPLINK_INSTALLER** на основе zsaplink_installer.txt и передайте ей файл SAPlink_Daily.nugg

* **Импортируйте каждый nugg файл дважды**, тк очень часто SAPLINK не может переопределить методы в дочерних классах\
Установите переключатель **Overwrite Originals** во второй раз

![image](https://user-images.githubusercontent.com/36256417/109108371-a17e3980-775d-11eb-8b71-8ec13286a7fb.png)

* Активируйте все

* Далее в SE38 -> **ZSAPLINK** передайте все плагины **NUGG_ALL_PLUGINS.nugg**. Если у вас уже есть SAPLINK можно установить только 1 плагин __plugins\NUGG_W3MI.nugg__ (Шаблоны для демо примеров в SMW0)

* После установите [EUI](https://bizhuka.github.io/saplink/eui.zip)  (2 раза)

1) Сначала активируйте объекты словаря EUI

![image](https://user-images.githubusercontent.com/36256417/109107342-bce84500-775b-11eb-8556-5911da44c599.png)

2) И только потом весь код EUI

* Установите [XTT](https://bizhuka.github.io/saplink/xtt.zip) (2 раза)

1) Сначала активируйте объекты словаря XTT

![image](https://user-images.githubusercontent.com/36256417/109107692-64657780-775c-11eb-9e7c-ac28519f4d9d.png)

2) И только потом весь код XTT

### Z_XTT_DEMO

Можно запускать tr. Z_XTT_DEMO 

![image](https://user-images.githubusercontent.com/36256417/109107844-ab536d00-775c-11eb-9a6b-16f173cb5cc3.png)

