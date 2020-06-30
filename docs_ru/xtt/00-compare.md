---
parent: "XTT - отчеты"
title: "Сравните с другими библиотеками"
nav_order: 01
permalink: /ru/xtt/compare/
---

### Усатый шаблонизатор
{: .no_toc }

&nbsp;&nbsp;&nbsp;Большинство современных шаблонизаторов в web (и также в ABAP) работают по одному простому принципу<br/>  
**Данные + Шаблон = Готовый документ**<br/>
Так чем отличается **XTT** от своих аналогов?

![image](https://user-images.githubusercontent.com/36256417/81717603-31374d80-9494-11ea-9b6f-7e20d85f7752.png)

<br/>
<br/>
<br/>

***

&nbsp;&nbsp;&nbsp;Нисколько не умаляя достоинства более популярных библиотек для генерации отчетов, давайте сравним XTT c основными из них:<br/>
* [XLSX Workbench](https://sites.google.com/site/sapxlwb/home/rus) использует специальный **редактор** для настройки шаблона

![image](https://user-images.githubusercontent.com/36256417/81719472-8e340300-9496-11ea-816e-90e04bb0c7a0.png)

<br/>
<br/>
<br/>

* [abap2xlsx](https://github.com/sapmentors/abap2xlsx) использует класс **ZCL_EXCEL_READER_2007** для считывания шаблона

![image](https://user-images.githubusercontent.com/36256417/81720186-7dd05800-9497-11ea-9911-899d3e6ab904.png)

<br/>
<br/>
<br/>


* [ZWWW](https://sapboard.ru/forum/viewtopic.php?f=13&t=4880&sid=12bc45858aa39ac048f08509efa5d5eb) использует привычный **WYSIWYG** MS Excel или Word редактор.<br/>
В ворде также нужны закладки (2 предыдущих специализируются на формате Excel) 

![image](https://user-images.githubusercontent.com/36256417/81720960-8aa17b80-9498-11ea-80dc-4a4df507d4d7.png)

<br/>
<br/>
<br/>

***

### **XTT** - Xml template toolkit

&nbsp;&nbsp;&nbsp;Данный опус в большей степени походит на последнюю разработку и максимально использует возможности самого WYSIWYG редактора.<br/>
Для передачи данных также как и в XLSX Workbench используется понятие контекста

&nbsp;&nbsp;&nbsp;Все что нужно сделать чтобы объединить данные с шаблоном это вызвать метод **MERGE**<br/>
Контекст **IS_BLOCK** (обычно ABAP структура) соответствует структуре документа.<br/>
Корневая метка (обычно '**R**') является опциональным параметром и скорее нужна если данные объединяются с шаблоном несколько раз. 

![image](https://user-images.githubusercontent.com/36256417/81728962-af9beb80-94a4-11ea-88b8-5aa6966c4e82.png)

<br/>
<br/>
<br/>

***

&nbsp;&nbsp;&nbsp;Так как сигнатура MERGE максимальна проста, основная сложность может возникнуть с самим шаблоном  

![image](https://user-images.githubusercontent.com/36256417/81731141-fb03c900-94a7-11ea-9528-01423c219b3e.png)

<br/>
<br/>
<br/>

Надеюсь, по причине своей очевидности, в большинстве случаев изучение **{усатого синтаксиса}** не потребуется.<br/>
Структура документа везде будет выглядеть приблизительно одинаково

```abap
    " Document structure
    BEGIN OF ts_root,
      header   TYPE string,
      t        TYPE tt_rand_data, " internal flat table ( In template {R-T} )
      date     TYPE d,            " 8
      datetime TYPE char14,       " date(8) + time(6)
    END OF ts_root.
```

### MS Excel

![image](https://user-images.githubusercontent.com/36256417/81732894-985ffc80-94aa-11ea-8a8d-7206a7562d44.png)

### MS Word

![image](https://user-images.githubusercontent.com/36256417/81733163-fdb3ed80-94aa-11ea-93a9-c8cc8a629736.png)

### Adobe LiveCycle

![image](https://user-images.githubusercontent.com/36256417/81733595-b4b06900-94ab-11ea-9c92-688414b59c56.png)

<br/>
<br/>
<br/>

***

### Директивы

&nbsp;&nbsp;&nbsp;Все специальные возможности (директивы) всегда указываются **{внутри фигурных скобок}**<br/>
Их, весьма условно, можно разделить на 3 основных группы:
* Относящиеся к 1-му значению
* Уточнение для всей таблицы или дерева 
* И директивы вывода дерева

Давайте рассмотрим каждое из них по отдельности:

***

<br>

### 1) Директивы для 1-го значения

&nbsp;&nbsp;&nbsp;Первая часть из них относится к уточнению [типа данных {;type=}](../data-types)<br/>
В общем случае, желательно оставлять тип как есть, не преобразуя в другие.<br/>
* Если в отчете есть числа, то их не надо преобразовывать в строки. Если надо вывести пусто вместо 0, проще воспользоваться изменением самого формата.<br/>
**Ctrl+1** - > Специальный формат -> **0;-0;;@**

* Для дат преобразование в строки также не желательно. Если в отчете вышло число вроде **43964** вместо даты, просто измените формат самой ячейки на дату

Но есть и исключения:
* **{;type=boolean}** и **{;type=datetime}** тк их по сути нет в самом языке ABAP

* **{;type=mask}** если нужен аналог `WRITE TO` (к примеру СПП элемент)

* **{;type=integer}** чтобы преобразовать из типа **CHAR** <br/>
Если вы уверены на все 100% что в символах будут только числа (но и в этом случае желательно объявить тип как **NUMC** для отчета)  

С уточнением типа (BTRTL) и без него (WERKS)

![image](https://user-images.githubusercontent.com/36256417/81779925-1229d180-950f-11ea-80e9-ea63550de2ec.png)

Результат

![image](https://user-images.githubusercontent.com/36256417/81778016-72b70f80-950b-11ea-912b-56e26769d6ba.png)

<br/>
<br/>
<br/>

&nbsp;&nbsp;&nbsp;Вторая часть связана с функциями агрегации [;func= SUM | AVG | COUNT | FIRST](../tree-aggregation-functions/3/)
которые работают совместно с **3) директивами вывода дерева**. <br/>
Для более сложных случаев есть специальное событие в ABAP

Для простых итогов в Excel можно воспользоваться стандартными средствами 

![image](https://user-images.githubusercontent.com/36256417/81732894-985ffc80-94aa-11ea-8a8d-7206a7562d44.png)

Но если нужен универсальный способ который работает в Word и Pdf можно воспользоваться данными функциями

![image](https://user-images.githubusercontent.com/36256417/81783258-8450e500-9514-11ea-86ab-1e12cc05cc36.png)

 
***

<br/>

### 2) Уточнения для всей таблицы или дерева

&nbsp;&nbsp;&nbsp; В отличии от предыдущих директив которые находились непосредственно в самой ячейке,
данный вид директив можно располагать в любом месте шаблона

### {;direction=column}
[{;direction=column}](../output-direction/) работает только в классе `ZCL_XTT_EXCEL_XLSX` и уточняет как нужно вывести таблицу.
По умолчанию таблицы и деревья выводятся по строкам.

![](https://raw.githubusercontent.com/wiki/bizhuka/xtt/img/dir_column_01.png)

&nbsp;&nbsp;&nbsp;Если вам нужна динамическая таблица которая расширяется как по строкам,
так и по столбцам посмотрите пожалуйста на [данный пример](../dynamic-table/)
 
### {;group=}
&nbsp;Позволяет сгруппировать табличные данные в иерархическую структуру на подобие **дерева**. <br/>
&nbsp;Для преобразования таблицы в дерево можно воспользоваться и двумя программными методами
zcl_xtt_replace_block=>[tree_create](../tree-group-by-fields/1/) и zcl_xtt_replace_block=>[tree_create_relat](../tree-group-by-field-relations/4/). <br/>
&nbsp;Но сделав подобное объявление группы в самом шаблоне, позволяет дать ясную картину того что таблица была трансформирована в дерево.<br/>

* Вместо tree_create => {;group=_Поля таблицы через запятую_}.<br/>
Для подитогов с БЕ **{R-T;group=BUKRS}**
 
* Вместо tree_create_relat => {;group=_Поля РОДИТЕЛЬ-ДОЧЕРНИЙ через тире_}<br/>
Для дерева орг единиц по ИТ 1001 **{R-T;group=OBJID-SOBID}** 

&nbsp;В самом простом случае нужно создать простые подитоги,<br/>
**level=0** (итого по всем) в котором есть **level=1** c данными самой таблицы 

![image](https://user-images.githubusercontent.com/36256417/81783258-8450e500-9514-11ea-86ab-1e12cc05cc36.png)

<br/>

&nbsp;Если нам нужны подитоги по БЕ **{;group=BUKRS}** у нас получится 3 уровня (0,1,2)<br/>
**level=0** Итого по всем БЕ<br/>
**level=1** Итого по 1-й БЕ<br/>
**level=2** Данные таблицы

В классе `ZCL_XTT_EXCEL_XLSX` объявление дерева на уровне страницы дает возможность вывода одной и той же таблицы на разных листах с разными группировками 

[В данном](../tree-group-by-fields/1/) примере таблица {R-T} выводится по разному в зависимости от объявления на конкретном листе

![image](https://user-images.githubusercontent.com/36256417/81787378-60909d80-951a-11ea-9e94-36ae3666bd75.png)

<br/>

***

<br/>

### 3) Директивы вывода дерева
&nbsp;После того как таблица была преобразована в дерево, можно задать границы и условия вывода каждого уровня.<br/>
* **;level=** Уточняет для какого уровня предназначена данная строка (столбец)
* **;top=X** Говорит о том что вывод будет осуществлен **до** нижестоящего уровня (пусто или ;top= что **после**)
* **;show_if=** и **;hide_if=** позволяют указать условие вывода того или иного уровня <br/>
Условие пишется на языке ABAP и имеет специальное зарезервированное имя **row** для ссылки на текущую строку в дереве

Данный пример с группировкой по 1 полю

![image](https://user-images.githubusercontent.com/36256417/81786911-b87ad480-9519-11ea-8e2f-2c30964b3631.png)

Результат

![image](https://user-images.githubusercontent.com/36256417/81808568-529e4500-9539-11ea-9523-e273681d3974.png)

&nbsp;Более подробно про директивы [level, top, show_if, hide_if](../tree-output-level-by-condition/2/)