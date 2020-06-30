---
parent: "AQO - options"
title: "Installation guide"
nav_order: 07
permalink: /aqo/installation-guide/
---

***
Install [abapgit](http://docs.abapgit.org/guide-install.html)
and follow the links

---

### From 2020
{: .no_toc }
You have to install [EUI](https://github.com/bizhuka/eui) library first

### Due to installation problems
{: .no_toc }
the [aqo_ui5](https://github.com/bizhuka/aqo_ui5) version should installed separately as an add-in

---

![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/guide_explore.png)

![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/guide_clone.png)
***
If you do not know the proxy parameters for ZABAPGIT_TEST_SSL\
\
or you don't have permission to add certificates in STRUST\
\
or you cannot add parameters to  /usr/sap/ED1/SYS/profile/DEFAULT.PFL\
ssl/client_ciphersuites = 150:PFS:HIGH::EC_P256:EC_HIGH\
ssl/ciphersuites = 135:PFS:HIGH::EC_P256:EC_HIGH
***
then download zip file

![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/guide_zip.png)
***
create offline project and import the zip file
![](https://raw.githubusercontent.com/wiki/bizhuka/aqo/src/guide_offline.png)
***