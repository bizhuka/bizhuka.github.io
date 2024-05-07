---
parent: "AQO - options"
title: "AQO based BADIs"
nav_order: 04
permalink: /aqo/badi-04/
---

### AQO based BADIs
{: .no_toc }


It often happens that the standard BADI does not support the creation of multiple instances.

Or you need to create several implementations independent of each other, which are called according to a certain condition (for example, by business unit) or in a row.

Of course, you can create your own BADI, but this may not be very convenient. And it's not as fast as the solution suggested below.

### Interface description

Let's say we have an interface with a method **SOME_METHOD** with no arguments. And two implementations ZCL_AQO_BADI_TEST_01 and ZCL_AQO_BADI_TEST_02 which simply display an arbitrary message.

![image](https://github.com/bizhuka/bizhuka.github.io/assets/36256417/20408dd8-12cc-49e7-b46c-018b63fef6ca)

---

### New method

Now, in addition to the **CREATE** method, which created the usual setting based on READ-ONLY class attributes, the **FIND_BADI** method has been added, which works similar to **GET BADI** with a filter.

![image](https://github.com/bizhuka/bizhuka.github.io/assets/36256417/b9632a9f-5409-4251-8293-337133b97dd1)

Let's take a look at an example of calling the new method SE38->**ZAQO_BADI**

![image](https://github.com/bizhuka/bizhuka.github.io/assets/36256417/e1fd86ac-3c2a-4be2-8cd3-042e2dc9b7b9)

That is, we pass the filter (Company Code= 0001) and the name of the interface and receive a table with all suitable implementations. There may be several, one, or none at all.

### Interface

After creating the setup, let's run transaction **ZAQO** and see what we got

![image](https://github.com/bizhuka/bizhuka.github.io/assets/36256417/53043c70-f671-4f5f-9362-57f8dbe6e3e4)


A different icon is visually displayed to highlight that this is not a normal setting.

**OPTION_ID** is equal to the interface name.

**PACKAGE** is equal to the package in which the interface is stored.

Let's enter the following values

![image](https://github.com/bizhuka/bizhuka.github.io/assets/36256417/889682cd-1563-4aee-bc13-f22aa8670c69)


Note that:

* The search tool shows all implementations of a given interface

* If different people are working on each specific implementation, you can deactivate the call without deleting the line for the duration of the test

* The same class ZCL_AQO_BADI_TEST_01 can appear in the setting several times, but in **et_badi[]** there will be only 1 instance of this class

### Call Result

In our example, in the table **lt_badi[]** there will be one instance of the class ZCL_AQO_BADI_TEST_01 and the message **Class 01** will be shown once.

![image](https://github.com/bizhuka/bizhuka.github.io/assets/36256417/7bbaec51-6a01-4d42-977c-16b9aa6fc893)

### Usage log


The usage log, as well as other tabs Transport, General Information and Attachments (for documentation) remained in place

The code scanner will show all places where this interface is called. When calling the **FIND_BADI** method again, only 1 instance of the ZCL_AQO_BADI_TEST_01 class will be created.

![image](https://github.com/bizhuka/bizhuka.github.io/assets/36256417/ef9f068b-6d1c-4ec6-bd62-fecdba1a0b6e)