---
parent: "AQO - options"
title: "09 Interface description"
nav_order: 90
permalink: /aqo/interface-description/
---
### "Old" interface

On the selection screen you need to choose the **package - option id** pair using the search help.\
To create a new option, you need to specify a non-existing **option id**

![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/09_ui_desc_02.png)
 

If the mandt is closed for change, you immediately navigate to the options maintenance screen


![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/09_ui_desc_04_tech.png)

**№1** Save and navigation buttons

**№2** Maintenance of **parameters** and **select-options**

**№3** **Tables** and **memo texts** are displayed only with buttons for opening a screen

---

If the mandt is open for change (DEV), the technical options will be displayed first

![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/09_ui_desc_05_dev.png)

**№1**  From left to right:
* go to the value maintenance screen
* put the option in the request
* copy the option to another client (without SCC1)
* delete the option\
options in packages starting with **$** can be deleted without asking
* Where-Used list from which the option was created

**№2** Description of the option

**№3** Buttons for deleting and creating a field in the option

**№4** Technical fields:
* field description
* is it possible to edit the field in the production system
* field type or TABLE-FIELD combination (for search help) **!Not necessary, could be omitted**

**№5** Quick navigation to the maintenance screen for **tables** and **memo texts**

***

### "New" sapui5 interface

![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/09_ui_desc_01.png)

**№1** The left part of the screen is intended for:
* search
* sorting
* filtering
* groupings
* and create a new option

**№2** The right side of the screen appears after selecting a specific option.\
In the upper right corner there are buttons like:
* navigate to full screen mode
* closing the right side of the screen
* send error email

Also under the name of the options you can notice:
* size options in Kb
* description of the option\
 **---** can be edited by clicking on the link

**№3** At the bottom are:
* switching to technical mode
* upload and download buttons to file
* number of options fields
* 2 fields: Description and meaning

---
 
If you switch to technical mode

![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/09_ui_desc_03_tech.png)

**№1** Buttons for deleting and adding new field

**№2** Technical fields:
* field description
* is it possible to edit the field in the production system
* field type or TABLE-FIELD combination (for search help) **!Not necessary, could be omitted**

**№3** At the very bottom:
* copy the option to another client (without SCC1)
* put the option in the request
* delete the option\
options in packages starting with **$** can be deleted without asking
* save option (will be active after changes)