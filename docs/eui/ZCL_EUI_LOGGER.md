---
parent: "EUI - user interface"
nav_order: 70
title: "Logger"
tags: [zcl_eui_logger]
permalink: /eui/zcl_eui_logger/1
date: 2020-12-26
---

### ZCL_EUI_LOGGER Class
{: .no_toc }

Small wrapper on BAL log

![image](https://user-images.githubusercontent.com/36256417/103149311-83628000-4792-11eb-9481-2f7cf7bc1fac.png)

The purpose of the class is clear from the name\

### Capabilities:

* *IS_HEADER* - Log lifetime, object - subobject and other tech. customization

![image](https://user-images.githubusercontent.com/36256417/103149454-c4a75f80-4793-11eb-9be4-afa785e95153.png)


* *IV_MSG_TYPES* - What messages to add to the log. By default all kinds of messages

![image](https://user-images.githubusercontent.com/36256417/103149511-5fa03980-4794-11eb-89a0-1673ae1e4eac.png)

* Adding messages

![image](https://user-images.githubusercontent.com/36256417/103149644-64192200-4795-11eb-98c3-6bc31039a971.png)

Accordingly, wrappers for standard FMs
1) CALL FUNCTION 'BAL_LOG_MSG_ADD'
1) CALL FUNCTION 'BAL_LOG_MSG_ADD_FREE_TEXT'
1) CALL FUNCTION 'BAL_LOG_EXCEPTION_ADD'

with passing standard parameters

![image](https://user-images.githubusercontent.com/36256417/103150027-ef94b200-4799-11eb-8762-b7cbbdadab7b.png)


* ADD_BATCH accepts any table with logs\
The table type is determined by sequential searches for the following fields

![image](https://user-images.githubusercontent.com/36256417/103149692-f9b4b180-4795-11eb-9f24-8be4890cc5d5.png)

* Basic methods for working with logs

![image](https://user-images.githubusercontent.com/36256417/103149741-88293300-4796-11eb-8937-195c66d7e71b.png)

* SHOW( ) uses 'BAL_DSP_PROFILE_SINGLE_LOG_GET' FM to get a profile
![image](https://user-images.githubusercontent.com/36256417/103149829-8dd34880-4797-11eb-99d5-bb50c06984e1.png)

2nd parameter is needed to "refine" the profile

![image](https://user-images.githubusercontent.com/36256417/103149875-15b95280-4798-11eb-9ec9-3907d89ce585.png)


* SHOW_AS_BUTTON( ) shows the GOS button, which itself can show the log window in POPUP mode

* It is possible to show unique log entries and ignore certain messages

