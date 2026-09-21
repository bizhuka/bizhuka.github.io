---
parent: "XTT - reports"
title: "Installation via SAPLINK"
nav_order: 8
permalink: /xtt/saplink-abap-700/
---

## Choose an installation method

Installation through [abapGit](../installation-guide/) is recommended because it tracks the maintained repository and handles updates more reliably.


## SAPLink for ABAP 7.00

Use this legacy route only when abapGit is not available. The package is intended for SAP NetWeaver 7.0; most examples in `Z_XTT_DEMO` work there, but current repository features may require a newer release.

1. Download [SAPLink with plugins](https://bizhuka.github.io/saplink/saplink.zip).

2. Create program `ZSAPLINK_INSTALLER` in SE38 from `zsaplink_installer.txt`, then import `SAPlink_Daily.nugg`.

3. **Import each NUGG file twice.** SAPLink often cannot overwrite inherited methods during the first pass.\
Set the **Overwrite Originals** radio button a second time

![image](https://user-images.githubusercontent.com/36256417/109108371-a17e3980-775d-11eb-8b71-8ec13286a7fb.png)

4. Activate all imported objects.

5. Run `ZSAPLINK` and import `NUGG_ALL_PLUGINS.nugg`. If SAPLink is already installed, import only `plugins\NUGG_W3MI.nugg` for the SMW0 demo templates.

6. Install [EUI](https://bizhuka.github.io/saplink/eui.zip) in two passes:

1) First activate EUI dictionary objects

![image](https://user-images.githubusercontent.com/36256417/109107342-bce84500-775b-11eb-8556-5911da44c599.png)

2) And only then the whole EUI code

7. Install [XTT](https://bizhuka.github.io/saplink/xtt.zip) in two passes:

1) First activate the XTT dictionary objects

![image](https://user-images.githubusercontent.com/36256417/109107692-64657780-775c-11eb-9e7c-ac28519f4d9d.png)

2) And only then all the XTT code

## Verify the installation

Run transaction `Z_XTT_DEMO` and generate a basic report.

![image](https://user-images.githubusercontent.com/36256417/109107844-ab536d00-775c-11eb-9a6b-16f173cb5cc3.png)

