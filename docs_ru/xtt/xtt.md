---
layout: default
title: "XTT - отчеты"
nav_order: 3
has_children: true
permalink: /ru/xtt/
_cus_head: "_popup_head.html"
---

### **XTT** - Xml template toolkit
{: .no_toc }

<div class="tab-header">
<ul class="nav nav-tabs">
  <li class="active">
    <a data-toggle="tab" href="#info">Информация</a>
  </li>
  <li>
    <a data-toggle="tab" href="#demo">Live demo</a>
  </li>
  <li>
    <a data-toggle="tab" href="#basic">Базовый шаблон</a>
  </li>
  <li>
    <a data-toggle="tab" href="#key">Ключевые особенности</a>
  </li>
</ul>
</div>


<div class="tab-content">

<!-- TODO INFO -->
  <div class="tab-pane active" id="info">
<br/>
<div class="container-fluid" markdown="1">
XTT поможет вам автоматизировать вашу процедуру отчетности в SAP

- Возьмите существующий отчет у ваших клиентов
- Используйте привычный редактор (MS Excel, Word или Adobe LiveCycle Designer) и замените некоторые его части маркерами, включенными в [фигурные скобки](../xtt/compare/)
- Свяжите все формулы, диаграммы и сводные таблицы с этими маркерами
- В abap вызовете метод **`merge()`** чтобы передать все данные, включая вложенные структуры, таблицы и деревья
- Используйте методы **`download( ) | send( ) | show( )`** для соответствующих действий
- Вот и все!

</div> <!-- This close tag must be left aligned. -->
  </div>

<!-- TODO LIVE DEMO -->
<div class="tab-pane" id="demo">
<br/>
<div class="container-fluid" markdown="1">

### tr. Z_XTT_DEMO
</div> <!-- This close tag must be left aligned. -->
{% include _xtt_demo.html %}

</div>

<!-- TODO BASIC -->
<div class="tab-pane" id="basic">
<br/>
<div class="container-fluid" markdown="1">

###  Excel шаблон
{: .no_toc }

![image](https://user-images.githubusercontent.com/36256417/80579411-6b7c0600-8a23-11ea-8166-d48e63b7d085.png)

### Код
{: .no_toc }

```abap
" Класс хранения шаблонов
" tr OAOR -> zcl_xtt_file_oaor, внешние источники -> ZCL_XTT_FILE_RAW
DATA(lo_file) = NEW zcl_xtt_file_smw0( 'Z_TEMPLATE_ID.XLSX' ).

" Excel (ZCL_XTT_WORD_DOCX, ZCL_XTT_PDF для word или pdf соответственно)
DATA(lo_xtt) = NEW zcl_xtt_excel_xlsx( io_file = lo_file ).

" R является маркером в IV_TEMPLATE
lo_xtt->merge( iv_block_name = 'R'
               is_block = VALUE ts_root(
                begda = pn-begda
                endda = pn-endda
                
                " Передача таблицы (или дерева)
                t     = lt_alv    
               ) ).

" Выгрузка в sap_tmp. Можно указать путь или показать диалог SaveAs
" Вызовете метод SHOW( ) для показа внутри Sap gui
lo_xtt->download( ).
```
</div> <!-- This close tag must be left aligned. -->
  </div>

<!-- TODO KEY -->
<div class="tab-pane" id="key">
<br/>
<div class="container-fluid" markdown="1">

**Различные классы для разных целей:**
* `ZCL_XTT_EXCEL_XLSX` – Книга Excel (.xlsx), Книга Excel с поддержкой макросов (.xlsm)
* `ZCL_XTT_EXCEL_XML` - XML-таблица 2003 (.xml)
* `ZCL_XTT_WORD_DOCX` - Документ Word (.docx), Документ Word с поддержкой макросов (.docm)
* `ZCL_XTT_WORD_XML` - Документ Word 2003 XML (.xml), Документ Word XML (.xml)
* `ZCL_XTT_PDF` - Adobe XML Form (.xdp)

**Генерация отчетов без OLE:**
* Сервер приложений SAP предоставляет готовый файл
* Никаких макросов и проблем безопасности
* Доступность фонового выполнения

**Использование шаблонов:**
* Отделение данных от ABAP кода (нет методов как cell-> set_bold (true) итд)
* Использование знакомого редактора как MS Word, MS Excel и Adobe LiveCycle Designer
* Не нужно быть гуру XML и генерировать XML самостоятельно
* Полное сохранение исходного форматирования документа
* Формирование сложных объектов отчетности, таких как сводные таблицы и диаграммы

</div> <!-- This close tag must be left aligned. -->
</div>
</div>