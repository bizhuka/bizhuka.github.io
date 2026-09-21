---
parent: "XTT - отчеты"
title: "Инструкция по установке"
nav_order: 7
permalink: /ru/xtt/installation-guide/
---

## Рекомендуемая установка через abapGit

Установите [abapGit](https://docs.abapgit.org/guide-install.html), затем импортируйте зависимости в следующем порядке:

1. [EUI](https://github.com/bizhuka/eui)
2. XTT

Для актуальных версий XTT библиотека EUI обязательна.

---

![](https://raw.githubusercontent.com/wiki/bizhuka/xtt/img/guide_explore.png)

![](https://raw.githubusercontent.com/wiki/bizhuka/xtt/img/guide_clone.png)

***

## Автономная установка

Используйте автономный проект abapGit, если SAP-система не имеет доступа к GitHub, прокси недоступен либо вы не можете настроить сертификаты в `STRUST` и параметры SSL-профиля.

ssl/client_ciphersuites = 150:PFS:HIGH::EC_P256:EC_HIGH

ssl/ciphersuites = 135:PFS:HIGH::EC_P256:EC_HIGH

***

Скачайте ZIP репозитория:

![](https://raw.githubusercontent.com/wiki/bizhuka/xtt/img/guide_zip.png)

***
Создайте автономный проект и импортируйте ZIP:

![](https://raw.githubusercontent.com/wiki/bizhuka/xtt/img/guide_offline.png)

***

## Видеоинструкция

Сертификаты требуются только для онлайн-подключения SAP-системы.

<iframe width="560" height="315" src="https://www.youtube.com/embed/QtqWRF0UuLw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
