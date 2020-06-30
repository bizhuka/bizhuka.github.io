---
parent: "AQO - настройки"
title: "05 Экспорт и импорт данных"
nav_order: 50
permalink: /ru/aqo/export-and-import-data/
---

### Экспорт|импорт всей настройки

Если настройку нужно заново перенести через всю ландшафтную систему, ее можно выгрузить из продуктива в .json файл (кодировка UTF-8) и загрузить в DEV.\
Это может быть актуально когда часть настроек была оперативно изменена в проде

 ![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/05_export_import_old.png)
 
 ![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/05_export_import_json.png)
 
 Данная возможность реализована как в новом sapui5 интерфейсе, так и в "старом" редакторе **(но формат файлов различный!)** 
 
***

### Табличные данные в ui5

Редактирование большого объема данных в табличной части в ui5 осложнена тем фактом что в ней не возможно работать через буфер обмена.\
И кнопка **'+'** вставляет лишь одну запись. (**'-'** может удалять несколько строк за раз)\
Для более комфортной работы созданы 2 кнопки для экспорта и импорта данных через .csv (кодировка UTF-16-LE)

 ![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/05_csv_buttons.png)

Также можно редактировать EMAILS - table, BUKRS - range в формате json
 ![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/05_csv.png)
