---
parent: "XTT - отчеты"
title: "Установка через SAPLINK"
nav_order: 8
permalink: /ru/xtt/saplink-abap-700/
---

## Выбор способа установки

Установка через [abapGit](../installation-guide/) предпочтительна: она работает с поддерживаемым репозиторием и упрощает последующие обновления.


## SAPLink для ABAP 7.00

Используйте этот устаревший способ только при отсутствии abapGit. Пакет предназначен для SAP NetWeaver 7.0; большинство примеров `Z_XTT_DEMO` там работает, однако новые возможности репозитория могут требовать более свежую версию ABAP.

1. Скачайте [SAPLink с плагинами](https://bizhuka.github.io/saplink/saplink.zip).

2. Создайте в SE38 программу `ZSAPLINK_INSTALLER` из `zsaplink_installer.txt`, затем импортируйте `SAPlink_Daily.nugg`.

3. **Импортируйте каждый NUGG-файл дважды.** SAPLink часто не переопределяет унаследованные методы при первом проходе. Во втором проходе установите **Overwrite Originals**.

![image](https://user-images.githubusercontent.com/36256417/109108371-a17e3980-775d-11eb-8b71-8ec13286a7fb.png)

4. Активируйте все импортированные объекты.

5. Запустите `ZSAPLINK` и импортируйте `NUGG_ALL_PLUGINS.nugg`. Если SAPLink уже установлен, достаточно `plugins\NUGG_W3MI.nugg` с демонстрационными шаблонами SMW0.

6. Установите [EUI](https://bizhuka.github.io/saplink/eui.zip) в два прохода:

1) Сначала активируйте объекты словаря EUI

![image](https://user-images.githubusercontent.com/36256417/109107342-bce84500-775b-11eb-8556-5911da44c599.png)

2) И только потом весь код EUI

7. Установите [XTT](https://bizhuka.github.io/saplink/xtt.zip) в два прохода:

1) Сначала активируйте объекты словаря XTT

![image](https://user-images.githubusercontent.com/36256417/109107692-64657780-775c-11eb-9e7c-ac28519f4d9d.png)

2) И только потом весь код XTT

## Проверка установки

Запустите транзакцию `Z_XTT_DEMO` и сформируйте базовый отчёт.

![image](https://user-images.githubusercontent.com/36256417/109107844-ab536d00-775c-11eb-9a6b-16f173cb5cc3.png)

