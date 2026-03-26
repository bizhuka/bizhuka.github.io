---
parent: "EUI - user interface"
nav_order: 14
title: "ALV styles"
tags: [zcl_eui_alv_style]
permalink: /eui/zcl_eui_alv_style/1
date: 2026-03-26
---


***

## **`ZCL_EUI_ALV_STYLE`** 

Styling standard ALV grids in ABAP can be a tedious chore. Manually looping through a style table, managing bitwise style operations, and editing them cell-by-cell is an error-prone task.

This utility class in the EUI library wraps the heavy lifting of ALV cell styling and merging into a clean, chainable, and rules-based API. Let's break down what it does, how it works under the hood, and how you can use it.

---

### What It Actually Does

In practical terms, `ZCL_EUI_ALV_STYLE` acts as a styling engine for an existing `CL_GUI_ALV_GRID`. Instead of hardcoding cell styles into your style table, you feed the class a set of rules:
*   **Targeting:** "Apply this style to Column A", or "Apply this style to Row 4."
*   **Conditional Formatting:** "Color the cell red if its value is `X`", or "Make specific cells with the value `---` non-editable."
*   **Dynamic Merging:** "Merge all vertically adjacent cells in Column B that have the exact same value."

### The Conceptual Magic
Under the hood, `ZCL_EUI_ALV_STYLE` grabs the style and data table references directly from the ALV grid instance. 
When you call its main method, it evaluates intersections. If you pass a column and a row, it finds the exact cell where they meet. It natively handles bitwise operations (`BIT-OR`), so if a row is set to "Bold" and a column is set to "Red", the intersecting cell becomes "Bold AND Red" without overwriting either style.

If you want to explicitly *overwrite* a style instead of adding to it, simply pass `iv_add = abap_false` to the `set_style` method.

You can also pass vertical and horizontal merge values for static merging without any conditions. Furthermore, the class houses a robust **merging engine** that iterates through the data matrix. It dynamically detects and matches strings (by exact value, pattern, or even RegEx) to handle complex horizontal and vertical cell merges seamlessly.

---

### Methods

The API is intentionally minimal:

### `CONSTRUCTOR( io_grid )`
You instantiate the style object by passing it a reference to your active standard `cl_gui_alv_grid` (it works with standard ALVs, not just the `ZCL_EUI_ALV`).

### `SET_PROPERTY( ... )`
A handy wrapper to set frontend grid properties directly—for example, freezing rows in an ALV.

### `SET_STYLE( ... )`
The bread and butter of the class. It accepts optional tables for `it_columns`, `it_rows`, and `it_values` (for dynamic merging). Because it returns its own instance, you can easily chain method calls together. 

---

### ABAP Examples

Let’s look at how to use this with modern ABAP syntax.

### Basic Column & Row Styling

```abap
DATA(lo_style) = NEW zcl_eui_alv_style( io_grid = lo_grid ).

lo_style->set_style(
  " Make the whole FIELD09 column a 'Total' color and center it
  it_columns = VALUE #( ( column = 'FIELD09' 
                          style  = alv_style_color_total BIT-OR alv_style_align_center_center ) )
)->set_style(
  " Make Row 4 positive (green) and italicized
  it_rows    = VALUE #( ( row_id = 4 
                          style  = alv_style_color_positive BIT-OR alv_style_font_italic ) )
).
```

### Conditional Styling (The Intersection)
Let's say you have a status column (`FIELD08`), and you want to disable the cell only if its value is a yellow LED icon. 

```abap
lo_style->set_style(
  it_columns = VALUE #( ( column = 'FIELD08' 
                          style  = alv_style_disabled ) )
  it_values  = VALUE #( ( value  = icon_led_yellow ) ) " Rule only applies to this value!
).
```

### Dynamic Cell Merging
Merging cells causes absolute misery. Here, you just define the merge behavior using the class constants.

```abap
lo_style->set_style(
  " Target columns 1 and 2
  it_columns = VALUE #( style = alv_style_align_center_center BIT-OR alv_style_font_bold
                        ( column = 'FIELD01' ) 
                        ( column = 'FIELD02' ) )
                        
  " Merge identical values both horizontally AND vertically
  it_values  = VALUE #( ( merge_mode = zcl_eui_alv_style=>c_merge_mode-equal
                                     + zcl_eui_alv_style=>c_merge_mode-merge_horizontal
                                     + zcl_eui_alv_style=>c_merge_mode-merge_vertical ) )
).
```

**Understanding `merge_mode`:**
Merging can be applied horizontally (`merge_horizontal`), vertically (`merge_vertical`), or even both at the same time. You can combine these directions with specific matching rules:
*   `equal`: Merges strictly identical values (probably the most common rule).
*   `value_and_empty`: Merges identical values AND subsequent empty cells.
*   `contains_pattern`: Uses the standard ABAP `CP` operator (requires passing a string to the `value` parameter).
*   `regex`: Uses regular expressions for complex matching (requires passing a regex to the `value` parameter).

### Freezing Rows
Using the helper method to freeze the top 2 rows:

```abap
lo_style->set_property( 
  iv_property = 'FixedRows' 
  iv_value    = 2 
).
```

---

### The Demo App: `ZEUI_TEST_ALV_STYLES`

If you want to see all of this in action, run the demo report `ZEUI_TEST_ALV_STYLES`. 

**What it showcases:**
* It builds a dummy table of tools/materials featuring varying string patterns, numbers, and standard SAP LED icons.
* It hooks into a `change_styles` event (triggered via the `ZCL_EUI_ALV` wrapper) to apply styles exactly when the grid is ready.
* You'll see several various examples of cross-merging.
* By keeping all styling logic in one fluent chain (using modern ABAP syntax), the demo proves how much cleaner your ALV styling can look in good old SAP GUI.

### Wrapping Up
`ZCL_EUI_ALV_STYLE` is a good example of isolating UI boilerplate. By abstracting style manipulation behind a rules-based API, your reports become much fancier for end users. Yes, it's just visual tricks in an ALV, but it emphasizes key data and makes reading tables a whole lot easier.