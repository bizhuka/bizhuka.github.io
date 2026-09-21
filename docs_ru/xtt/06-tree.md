---
parent: "XTT - отчеты"
title: "060 Деревья (на основе связи родитель дочерний)"
nav_order: 60
permalink: /ru/xtt/tree-group-by-field-relations/
_cus_head: "_popup_head.html"
_cus_index: "060"
---

{% include _xtt_demo.html %}

## Назначение

Демо-класс `ZCL_XTT_DEMO_060` формирует иерархию неизвестной глубины по ключам узла и родителя. Такой подход подходит для каталогов, элементов СПП и организационных единиц HR.

Деревья с [промежуточными итогами](../tree-group-by-fields/) встречаются чаще. Для данных, заданных связью «родитель - потомок», используйте `TREE_CREATE_RELAT`.

### Метод TREE_CREATE_RELAT
{: .no_toc }

**Иерархия папок**
```abap
      BEGIN OF ts_tree_06,
        " Folders hierarchy
        dir     TYPE string,
        par_dir TYPE string,
        
        " Empty field. Filled in on_prepare_tree_06
        level   TYPE i,
      END OF ts_tree_06,
      tt_tree_06 TYPE STANDARD TABLE OF ts_tree_06 WITH DEFAULT KEY,

    " Document structure
    BEGIN OF ts_root,
      title TYPE string,
      t     TYPE REF TO data, " <-- Table of trees (better to use general REF TO)
    END OF ts_root.
```

После заполнения `LT_FOLDERS` передайте в `TREE_CREATE_RELAT` имена компонентов `DIR` и `PAR_DIR`.
```abap
    GET REFERENCE OF lt_folders INTO lr_table.
    ls_root-t = zcl_xtt_replace_block=>tree_create_relat(
      it_table      = lr_table        " from 7.5 REF #(lt_folders)
      iv_node_key   = 'DIR'
      iv_relat_key  = 'PAR_DIR' ).
```

Все промежуточные итоги также заполняются обработчиком `prepare_tree`. Для демонстрационной цели в примере заполняется только поле `LEVEL`.
```abap
METHOD on_prepare_tree_06.
  FIELD-SYMBOLS:
    <ls_data>     TYPE ts_tree_06.

  " Cast to the application type
  ASSIGN ir_data->* TO <ls_data>.
  <ls_data>-level = ir_tree->level.
ENDMETHOD.
```

Уровень группировки также будет скопирован в нижестоящие элементы
![](https://raw.githubusercontent.com/wiki/bizhuka/xtt/img/tree_03.png)
