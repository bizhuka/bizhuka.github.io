---
parent: "XTT - reports"
title: "Installation via SAPLINK"
nav_order: 08
permalink: /xtt/saplink-abap-700/
---

***

### AbapGit

Installation via [ABAPGIT](../installation-guide/) is preferable.\
The github project is updated automatically.


### SAPLINK
Code is checked periodically in SAP NetWeaver 7.0 ABAP Trial Version.\
And I will try to update this version of the installation upon request.\
With rare exceptions, examples in **Z_XTT_DEMO** work in version 7.00

* Download the entire archive [SAPLINK with plugins](https://bizhuka.github.io/saplink/saplink.zip).

* Create SE38 program -> **ZSAPLINK_INSTALLER** based on zsaplink_installer.txt and pass the SAPlink_Daily.nugg file to it

* **Import each nugg file twice**, since very often SAPLINK cannot override methods in child classes\
Set the **Overwrite Originals** radio button a second time

![image](https://user-images.githubusercontent.com/36256417/109108371-a17e3980-775d-11eb-8b71-8ec13286a7fb.png)

* Activate all

* Further in SE38 -> **ZSAPLINK** pass all plugins **NUGG_ALL_PLUGINS.nugg**. If you already have SAPLINK installed, you can install only one plugin __plugins\NUGG_W3MI.nugg__ (Templates for demo examples in SMW0)

* Then install [EUI](https://bizhuka.github.io/saplink/eui.zip) (2 times)

1) First activate EUI dictionary objects

![image](https://user-images.githubusercontent.com/36256417/109107342-bce84500-775b-11eb-8556-5911da44c599.png)

2) And only then the whole EUI code

* Install [XTT](https://bizhuka.github.io/saplink/xtt.zip) (2 times)

1) First activate the XTT dictionary objects

![image](https://user-images.githubusercontent.com/36256417/109107692-64657780-775c-11eb-9e7c-ac28519f4d9d.png)

2) And only then all the XTT code

### Z_XTT_DEMO

You can run tr. Z_XTT_DEMO

![image](https://user-images.githubusercontent.com/36256417/109107844-ab536d00-775c-11eb-9a6b-16f173cb5cc3.png)

