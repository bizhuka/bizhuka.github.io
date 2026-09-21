---
parent: "XTT - reports"
title: "060 Tree (group by field relations)"
nav_order: 60
permalink: /xtt/tree-group-by-field-relations/
_cus_head: "_popup_head.html"
_cus_index: "060"
---

{% include _xtt_demo.html %}

## Purpose

Demo `ZCL_XTT_DEMO_060` handles hierarchies whose depth is not known in advance, such as folders, WBS elements, or HR organizational units. Each row identifies a node and its parent; `TREE_CREATE_RELAT` turns those relations into an XTT tree.

## Define the node structure

**Folders hierarchy**
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

## Build the relation tree

After filling `LT_FOLDERS`, pass the node-key and parent-key component names to `TREE_CREATE_RELAT`:
```abap
    GET REFERENCE OF lt_folders INTO lr_table.
    ls_root-t = zcl_xtt_replace_block=>tree_create_relat(
      it_table      = lr_table        " from 7.5 REF #(lt_folders)
      iv_node_key   = 'DIR'
      iv_relat_key  = 'PAR_DIR' ).
```

## Enrich generated nodes

Use the `PREPARE_TREE` event to calculate parent values or add hierarchy metadata. The demo stores only the generated depth in `LEVEL`:
```abap
METHOD on_prepare_tree_06.
  FIELD-SYMBOLS:
    <ls_data>     TYPE ts_tree_06.

  " Cast to the application type
  ASSIGN ir_data->* TO <ls_data>.
  <ls_data>-level = ir_tree->level.
ENDMETHOD.
```

Excel outline settings are copied to the generated child rows.
![](https://raw.githubusercontent.com/wiki/bizhuka/xtt/img/tree_03.png)
