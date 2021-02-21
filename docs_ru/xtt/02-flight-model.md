---
parent: "XTT - отчеты"
title: "022 Объединение ячеек ';merge=X'"
nav_order: 22
permalink: /ru/xtt/merging-cells/
_cus_head: "_popup_head.html"
_cus_index: "022"
---

{% include _xtt_demo.html %}

### Статическое объединение

Если объединение известно заранее его можно указать напрямую в шаблоне

Ячейки **B3:H3** & **B5:F5**

![image](https://user-images.githubusercontent.com/36256417/108017229-911fdd80-703e-11eb-9e30-100aba96ea38.png)

Результат

![image](https://user-images.githubusercontent.com/36256417/108017041-266ea200-703e-11eb-837f-1aaa1a11a35a.png)

***

Объединение может быть не только горизонтальным но и вертикальным

Ячейки **B2** & **E2**

![image](https://user-images.githubusercontent.com/36256417/108017410-0095cd00-703f-11eb-8a67-ddde41e4edf9.png)

Результат

![image](https://user-images.githubusercontent.com/36256417/108017525-50749400-703f-11eb-880d-6f92c0310585.png)


### Дополнение ';merge=X'

Если же нужно объединить ячейки **"параллельно"** выводу отчета и их количество не известно заранее можно воспользоваться дополнением ';merge=X'

![image](https://user-images.githubusercontent.com/36256417/108017878-3be4cb80-7040-11eb-980a-68c427820b02.png)

те для вывода по строкам (обычное поведение) дополнение работает для строк, и для [вывода по столбцам](../output-direction/) работает наоборот для столбцов


***

Объедение работает для одинаковых значений!

Обратите внимание на ячейку **D10** в отчете (**D3** в шаблоне)
Значение скопировалось из уровня **level=2** в **level=1** с помощью **'func=FIRST'**, но не объединилось так как нет ';merge=X' в отличии от соседнего столбца **'C'**

![image](https://user-images.githubusercontent.com/36256417/108044375-62206080-706c-11eb-890f-278a49a737f7.png)

Чтобы понять как работает объединение просто просмотрите значения в отчете

![image](https://user-images.githubusercontent.com/36256417/108045505-bd068780-706d-11eb-9c8d-f9012bd1d2f1.png)

***

подробнее о деревьях можно почитать [тут](../tree-group-by-fields/)
