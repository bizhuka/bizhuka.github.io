---
parent: "EUI - user interface"
nav_order: 80
title: "Nested data hash calculating"
tags: [zcl_eui_crc64]
permalink: /eui/zcl_eui_crc64/1
date: 2021-12-22
---

### ZCL_EUI_CRC64 Class
[Source code in github](https://github.com/bizhuka/eui/blob/master/src/zcl_eui_crc64.clas.abap)

Why do we need another class?
ABAP has a lot of methods to calutae md5, sha1 or sha256 hashes. But there are some limitation with:
* Data references
* Objects
* Strings & xStrings 
*  Tables with complex data types

***

### Main methods

![image](https://user-images.githubusercontent.com/36256417/147049807-3c5f18b9-5452-438d-934c-949ed2924507.png)

Usage
``` abap
    DATA(lo_crc64) = NEW  zcl_eui_crc64( ).
    lo_crc64->add_to_hash( zsaqo3_general_info ).
    lo_crc64->add_to_hash( mt_fld_value ).

    rv_hash = lo_crc64->get_hash( ).
```
***

### Data references

By default **mc_dref-data_value**, you can calculate and add referenced data to the resulting hash.
Also you can skip them **mc_dref-no_info** or just compare types **mc_dref-type_info**.

![image](https://user-images.githubusercontent.com/36256417/147050466-102bf9f0-6a05-4d17-b8ba-a103fac14870.png)

### Objects
By default public attributes values are added to the resulting hash. 
If you also want to calculate private attributes hashes just add ZCL_EUI_CRC64  to friends.
![image](https://user-images.githubusercontent.com/36256417/147051825-368cdb55-14c2-4293-b54c-2698bd42eb02.png)

***

### Strings & xStrings 

Processing these data types a little bit tricky. First of all SHA1 hashes are calculating via CALL FUNCTION 'CALCULATE_HASH_FOR_CHAR' and CALL FUNCTION 'CALCULATE_HASH_FOR_RAW'. And then these hashes are added to the final result.  


***

### Tables with complex data types

Since structures fields and table rows can contain all above mentioned data types, they are processed separately and the resulting hashes are added to the final result.

![image](https://user-images.githubusercontent.com/36256417/147054503-1134f175-3d39-46dc-8b77-aa4bdd3da55f.png)


***

### Show logs

If you want to compare very complex data structures you can pass **iv_log = abap_true** parameter to the ZCL_EUI_CRC64 constructor,
and see which fielde are differ. 
![image](https://user-images.githubusercontent.com/36256417/147054800-d49336a1-8fb7-458d-aa1e-953421b52de8.png)


Example
SE38 -> [ZEUI_TEST_CRC64](https://github.com/bizhuka/eui/blob/master/src/demo/zeui_test_crc64.prog.abap)