---
parent: "XTT - отчеты"
title: "130 Дополнение ';cond='"
nav_order: 130
permalink: /ru/xtt/cond/
_cus_head: "_popup_head.html"
_cus_index: "130"
---

{% include _xtt_demo.html %}

### Доработка отчетов с помощью скриптов

JavaScript, FormCalc и VBA. Какой язык большего всего удобен при формировании отчетов?

![image](https://user-images.githubusercontent.com/36256417/102161291-43a5b980-3eb1-11eb-8868-8640302f7794.png)


"Писать ли условие в круглых скобках?", "this, me или self?", "THEN или фигурные скобки?", ".Value или же все таки .rawValue для получения значения?". "super или пупер?"

Сотни строк без какой-либо подсветки в особенно древнем и "мега навороченном" отчете LiveCycle помогут разобраться во всех премудростях скриптовых языков.(Даже если вы этого совсем не хотите)\
Конечно в VBA дело обстоит по лучше, да и знать несколько языков не помешает.\
Но согласитесь было бы удобно использовать тот язык который понимаешь без перевода и словаря. Не вспоминая и гугля каждую строчку написанного.

К примеру, что может быть понятней для человека знающим хотя бы на бытовом (разговорном) уровне великий и могучий, правдивый и свободный ?
![image](https://user-images.githubusercontent.com/36256417/102170436-8b7f0d80-3ebe-11eb-999e-93d2c4b4e2bf.png)

Ну а пока немцы не внедрили поддержку синтаксис 1С в свои продукты, и JavaScript приказал долго жить на версии 1.5 в SAP, можно попытаться внедрить [YoptaScript](https://yopta.space/) в творение Adobe.
(Он будет наиболее уместен чтобы выразить всю гамму чувств, которую я испытываю каждый раз заходя в редактор FormCalc LiveCycle Designer.)

Но речь не о нем. А, как вы наверное уже догадались o ABAP. Который для многих читающих данные строки, хоть и не впитывался с молоком матери, но уже давно знаком с версии 6.40 и страше.\
Правда в то время шершавым языком ABAP-а выражения *в одну строку* (в виду почтенного возраста) довались ему с большим трудом.\
Много воды утекло с тех пор и сейчас *писать в строчку* можно довольно сложные вещи, которые со временем восприниматься также просто как и IF-ENDIF.
И такие выражения могут быть весьма кстати в отчетах, где данную роль зачастую выполняют скриптовые языки программирования.\
Благо в массе своей большинство задач сводится к **условному выводу** из нескольких полей некой информации, уже сформированной ABAP-ом ранее.

```abap
 if root-flag = abap_true.
  result = root-A.
 else.
  result = root-B.
 endif.
```


Или же **скрытию части шаблона** по условию.
```VBA
 block.Visible = False
```
Но об этом в следующий раз

***

### Дополнение ';cond='
А сейчас предположим, что у нас есть структура следующего вида


![image](https://user-images.githubusercontent.com/36256417/102319802-9f516f00-3fa5-11eb-9958-29b2c7a67b1c.png)

Ранее в отчете для поля TIME, нужно было заводить **дополнительную переменную** чтобы вывести (для примера) тексты **am** или **pm**.
Сейчас же можно выразиться более лаконичным способом, просто создав данную переменную на лету, как делаем это в ABAP.

``` abap
DATA(result) = COND #( WHEN value-time GE '120000'
                       THEN 'post meridiem'
                       ELSE 'ante meridiem' ).
```

где **value** это структура описанная ранее.

Только на этот раз, такую переменную можно создать самом отчете
![image](https://user-images.githubusercontent.com/36256417/102321569-10922180-3fa8-11eb-9253-14d4b069b2f7.png)
(*здесь и далее подсветка в шаблоне введена сугубо в демонстрационных целях, трушные саперы могут легко обойтись без нее)
---
да и вообще зачем передавать дату (R-DATE) и время(R-TIME) если нам нужны системные поля **sy** ?\
Можно просто опустить условие WHEN и написать что-то вроде.

![image](https://user-images.githubusercontent.com/36256417/102322504-61564a00-3fa9-11eb-8ca5-8902dbec81cf.png)

*Но тогда в случае в ABAP 6.40 ~~бегите с проекта~~ ваша система не поймет отчет и спросит на это *Герр программист, Was ist das? Ja, ja, ja, was ist los?*\
*Об обратной совместимости см. FAQ

---

Дополнительная переменная для нумерации строк таблицы? Тоже можно бросить ее за борт
![image](https://user-images.githubusercontent.com/36256417/102324758-78e30200-3fac-11eb-8f27-3da2ecf7fc9f.png)

**;type=integer** нужен для того чтобы у Excel не было лишних вопросов о типе данных sy-tabix.\
пу все выражения в ;cond= приводятся к стрингам (;type=string)\
Подсветку в последнем примере убрал, хочется верить что основная идея уже более или менее понятна.

### Краткая форма написания
Для удобства **{R;cond=WHEN value-**time GE '120000' THEN 'pm' ELSE 'am'} можно сократить на **{R:WHEN v-**time GE '120000' THEN 'pm' ELSE 'am'}  

 *Смотрите шаблоны 131

---

Дабы сократить количество возможных технических вопросов привожу краткий FAQ в моем представлении (за неимением реальных вопросов)\
\(*Список будет дополнен в случае необходимости)

---

### FAQ

* Все примеры в Excel. Работает только в нем?\
Word, Pdf и Html конечно тоже поддерживаются

![image](https://user-images.githubusercontent.com/36256417/102329559-bfd3f600-3fb2-11eb-9ed2-c05ef3405bf8.png)

---

* Что с совместимостью со старыми версиями ABAP ? COND( ) нет в моей весии системы.\
в 7.01 надеюсь будет работать. Хотя для ZABAPGIT минимальная версия 7.02 (а без него не установить любой opensource пакет).
1) Сам **COND #( )** до **GENERATE SUBROUTINE POOL** транслируется в IF-ELSEIF-ENDIF
1) если выражение не имеет лидирующего WHEN и при этом содержит **&&** выражение преобразуется в **CONCATENATE**.\
Поэтому во избежание ошибок, в новых версиях предпочтительно использовать String Templates вместо двойного амперсанда

---

* Что будет если выражение вызовет исключение ?\
К примеру надо ли проверять **line_exists( )** перед **таблица[ ключ ]**?
![image](https://user-images.githubusercontent.com/36256417/102344267-d768aa00-3fc5-11eb-8479-cb42d84d42f3.png)

Исключения перехватываются. И будет возвращено пустое значение определенного типа.\
В DEV & QAS будет всплывать окно с предупреждениями\
В PROD отчет будет вести себя "тихо" (если конечно нет критический важных ошибок)

![image](https://user-images.githubusercontent.com/36256417/102344970-dbe19280-3fc6-11eb-814e-059a6425595a.png)


---
* Только COND #( ) ? SWITCH или VALUE?\
Да в дополнении ;cond= допустимо использовать любое выражение ABAP которое стоит слева от знака ровно.\
Те выражение которое можно присвоить переменной, включая операторы CONV, REDUCE и COND.\
Просто имхо, самым полезным будет являться именно *условие* для вывода значения, поэтому именно *;cond=WHEN*\
Если выражение не начинается c *WHEN* будет простое присвоение *result =*, без обертки его в **= COND string( )**, точнее IF-ELSE-ENDIF.

---

* Можно ли тогда написать **REDUCE** для расчета итогов?\
Можно (даже есть пример 13-03), но считаю что не нужно.\
Всего есть 5 (с учетом REDUCE уже 6) более **читабельных** способов расчета итогов (3 из которых доступны только в Excel, тк используют формулы).\
Самый простой (и от того предпочтительный) из них, который к тому же работает во всех форматах, и не требует написания дополнительного кода со стороны ABAP является:\
написание **{R-T;group=}** в любом месте шаблона (;group=BUKRS если нужны подытоги для БЕ), что приведёт к преобразованию таблицы {R-T} в дерево.\
Узел 'Итого по всем' (level=0) будет являться его вершиной, level=1 непосредственно данные таблицы. На группирующем уровне level=0 можно будет написать **{R-T-DMBTR;func=SUM** | AVERAGE | COUNT | FIRST **}**

для Excel вообще можно обойтись малой кровью используя **ListObject** в купе с '=SUBTOTAL(109,[SUM 1])'\
Подробнее тут 02-02, 02-03\
Данное отступление (как и в целом статья) наверное и так уже утомили читателя :)

![image](https://user-images.githubusercontent.com/36256417/102334413-d715e200-3fb8-11eb-9393-56362f18eab7.png)

---

* Производительность сильно упадет от использования ;cond=?

Результаты замера в tr. SAT отчета на 150,000 строк (на примере 02-01 и 13-01)\
30 и 45 секунд соответственно

![image](https://user-images.githubusercontent.com/36256417/102336470-66bc9000-3fbb-11eb-862e-7967ed2d1659.png)

*;cond=* будет немного работать быстрее если структуру объявить в словаре данных(SE11).\
В примере **13-01** структура объявлена в программе и будет использоваться **MOVE-CORRESPONDING** внутри динамически созданной подпрограммы.

![image](https://user-images.githubusercontent.com/36256417/102336164-04fc2600-3fbb-11eb-998a-afdb515cff1d.png)

Результат около *= 1.5 медленнее на одинаковом количестве строк. Правда файл 13-01 сам по себе больше и от того выгружается дольше. Решать вам.\
Для больших отчетов Excel возможно стоит делать по старинке и производить расчеты статически ABAP-ом.\
Для отчетов Word или Pdf дополнительные вызовы Perform в SUBROUTINE POOL будут не очень существенны, в виду сравнительно небольшого объема обрабатываемых данных

---

* Можно ли вызвать метод в выражении?\
Да можно вызвать любой *статический* методы с RETURNING параметром. (Но это не совсем по Фэн-шую).\
Шаблон это представление (View) и оно должно максимально абстрагироваться от данных. Те *SELECT* в данном методе будет ни к селу, ни к городу.\
К тому же в Z* методе может быть специальный оператор введенный в 7.70 *STEAL MONEY*\
Даже думал написать запрет на последовательность символов '=>', но передумал.\
Оставляю на ваше усмотрение.
