---
parent: "XTT - reports"
title: "022 Merging cells (Flight Model)"
nav_order: 22
permalink: /xtt/merging-cells/
_cus_head: "_popup_head.html"
_cus_index: "022"
---

{% include _xtt_demo.html %}

### Static merging

If the merging area is known in advance, it can be specified directly in the template

Cells **B3:H3** & **B5:F5**

![image](https://user-images.githubusercontent.com/36256417/108017229-911fdd80-703e-11eb-9e30-100aba96ea38.png)

Result

![image](https://user-images.githubusercontent.com/36256417/108017041-266ea200-703e-11eb-837f-1aaa1a11a35a.png)

***

The merging area can be not only horizontal but also vertical

Cells **B2** & **E2**

![image](https://user-images.githubusercontent.com/36256417/108017410-0095cd00-703f-11eb-8a67-ddde41e4edf9.png)

Result

![image](https://user-images.githubusercontent.com/36256417/108017525-50749400-703f-11eb-880d-6f92c0310585.png)


### Addition ';merge=X'

If you need to merge cells **"parallel"** to the output of the report and their number is not known in advance, you can use the addition ';merge=X'

![image](https://user-images.githubusercontent.com/36256417/108017878-3be4cb80-7040-11eb-980a-68c427820b02.png)

for row output (normal behavior) merging works for rows, and for [;direction=column](../output-direction/) it works the columns

***

Merging cells works for the same values!

Notice cell **D10** in the report (**D3** in the template)
The value was copied from level **level=2** to **level=1** using **'func=FIRST'**, but did not merge since there is no ';merge=X' as opposed to the adjacent column **'C'**

![image](https://user-images.githubusercontent.com/36256417/108044375-62206080-706c-11eb-890f-278a49a737f7.png)

To understand how joining works, just look at the values ​​in the report.

![image](https://user-images.githubusercontent.com/36256417/108045505-bd068780-706d-11eb-9c8d-f9012bd1d2f1.png)

***

you can read more about trees [here](../tree-group-by-fields/)

