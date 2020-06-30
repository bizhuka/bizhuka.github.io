---
parent: "AQO - настройки"
title: "10 OAOR"
nav_order: 100
permalink: /ru/aqo/oaor/
---

## Хранение шаблонов
{: .no_toc }

### SMW0
**SMW0** прост и удобен, транзакция OAOR слишком сложная. Зачем вообще нужна версионность шаблонов выгрузки?\
Да с этими утверждениями можно согласиться отчасти.

Когда шаблон довольно прост

![image](https://user-images.githubusercontent.com/36256417/81047847-b2ab4080-8ed4-11ea-83db-e34125128396.png)

Достаточно взглянуть на него чтобы понять:
* на стороне SAP имеем структуру **R** у которой есть поле-таблица **T**
* кроме этого в структуре есть поля **HEADER**, **DATE** и **TIME**  

Или прочитав код ABAP, сразу становиться понятно что получим на выходе.

```abap
    " Load a template
    DATA(lo_xtt) = NEW zcl_xtt_word_docx(
        NEW zcl_xtt_file_smw0( iv_template_name ) ).

    lo_xtt->merge( VALUE #(
        " For printing
        footer = 'Footer'
        header = 'Header'
    
        " Date and time in header and footer
        date   = sy-datum
        time   = sy-uzeit

        " Main table
        t   = mt_alv[]
    ) ).

    " download & open in sap_tmp folder (For inplace mode use ->show( ) method)
    lo_xtt->download( ).
```
Даже не имеет значение куда выводим данные word, excel или pdf (соответственно ZCL_XTT_WORD_DOCX, ZCL_XTT_EXCEL_XLSX или ZCL_XTT_PDF).\
Главное становится понятна сама структура выходного документа. Остальное можно будет понять запустив программу на выполнение.\
Подробнее тут [Пример №02 Вывод простой таблицы](https://github.com/bizhuka/xtt/wiki/%D0%9F%D1%80%D0%B8%D0%BC%D0%B5%D1%80-%E2%84%9602-%D0%92%D1%8B%D0%B2%D0%BE%D0%B4-%D0%BF%D1%80%D0%BE%D1%81%D1%82%D0%BE%D0%B9-%D1%82%D0%B0%D0%B1%D0%BB%D0%B8%D1%86%D1%8B)

***

### OAOR
Но такие случаи бывают не всегда\
Когда в шаблон передаются множество таблиц c группировками(**level=0,1,2**), с функциями агрегации(**func=SUM|AVG|COUNT|FIRST**) и с выводом по условию (**show_if** & **hide_if**)\
Просто взглянуть на шаблон, и понять отчет, уже наверное не получится  

![image](https://user-images.githubusercontent.com/36256417/81050156-f607ae00-8ed8-11ea-956b-691aea7ac194.png)
Подробнее начиная с  [Пример №05_co Вывод уровня по условию](https://github.com/bizhuka/xtt/wiki/%D0%9F%D1%80%D0%B8%D0%BC%D0%B5%D1%80-%E2%84%9605_co-%D0%92%D1%8B%D0%B2%D0%BE%D0%B4-%D1%83%D1%80%D0%BE%D0%B2%D0%BD%D1%8F-%D0%BF%D0%BE-%D1%83%D1%81%D0%BB%D0%BE%D0%B2%D0%B8%D1%8E)

***

### tr. ZAQO_EDITOR_OLD

Для этой цели в меню редактора появилась новая группа кнопок для просмотра и выгрузки шаблонов\
При загрузки новой версии шаблона можно добавить небольшое примечание (поле **Description**)\
Если имя файла не совпадает его можно выбрать в раскрывающемся списке (**Component name**)

![image](https://user-images.githubusercontent.com/36256417/81051566-5697ea80-8edb-11ea-891f-ca49e1eb6fa5.png)

Как и в случае с обычными настройками после достижения максимального количества версий (пу 5), предыдущие версии будут удаляться

![image](https://user-images.githubusercontent.com/36256417/81053926-4b46be00-8edf-11ea-8b51-1ce13f8b6b27.png)


***

Результат можно увидеть в самой транзакции OAOR

![image](https://user-images.githubusercontent.com/36256417/81051046-7ed31980-8eda-11ea-8f31-2510c24c504c.png)

---

OAOR проверяет полномочия на конкретный **Class name** (package в AQO),**TODO** игнорировать полномочия?