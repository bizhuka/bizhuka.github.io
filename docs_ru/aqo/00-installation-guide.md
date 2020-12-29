---
parent: "AQO - настройки"
title: "Инструкция по установке"
nav_order: 07
permalink: /ru/aqo/installation-guide/
---

***
Установите [abapgit](http://docs.abapgit.org/guide-install.html)
и далее следуйте по ссылкам

---

### С 2020 года
{: .no_toc }
Установите сначала [EUI](https://github.com/bizhuka/eui)

### В следствии проблем с установкой
{: .no_toc }
версия [aqo_ui5](https://github.com/bizhuka/aqo_ui5) должна быть установлена отдельно как надстройка

---

![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/guide_explore.png)

![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/guide_clone.png)
***
Если вы не знаете параметры прокси для **ZABAPGIT_TEST_SSL**\
\
или у вас нет прав на добавление сертификатов в **STRUST**\
\
или добавления в **/usr/sap/ED1/SYS/profile/DEFAULT.PFL** настроек
```
ssl/client_ciphersuites = 150:PFS:HIGH::EC_P256:EC_HIGH
ssl/ciphersuites = 135:PFS:HIGH::EC_P256:EC_HIGH
```
***
Вы можете скачать файл

![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/guide_zip.png)
***
и создать оффлайн проект импортировав zip-файл

![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/guide_offline.png)
***

### Видео инструкция
{: .no_toc }

Установка сертификатов необязательна

<iframe width="560" height="315" src="https://www.youtube.com/embed/QtqWRF0UuLw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
