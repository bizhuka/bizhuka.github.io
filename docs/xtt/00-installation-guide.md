---
parent: "XTT - reports"
title: "Installation guide"
nav_order: 7
permalink: /xtt/installation-guide/
---

## Recommended installation with abapGit

Install [abapGit](https://docs.abapgit.org/guide-install.html), then import the dependencies in this order:

1. [EUI](https://github.com/bizhuka/eui)
2. XTT

EUI is a required dependency for current XTT versions.

---

![](https://raw.githubusercontent.com/wiki/bizhuka/xtt/img/guide_explore.png)

![](https://raw.githubusercontent.com/wiki/bizhuka/xtt/img/guide_clone.png)

***

## Offline installation

Use an offline abapGit project when the SAP system cannot reach GitHub, the proxy is unavailable, or you cannot maintain the required certificates in `STRUST` and SSL profile settings.

ssl/client_ciphersuites = 150:PFS:HIGH::EC_P256:EC_HIGH

ssl/ciphersuites = 135:PFS:HIGH::EC_P256:EC_HIGH

***

Download the repository ZIP:

![](https://raw.githubusercontent.com/wiki/bizhuka/xtt/img/guide_zip.png)

***

Create an offline project and import the ZIP:
![](https://raw.githubusercontent.com/wiki/bizhuka/xtt/img/guide_offline.png)

***

## Video walkthrough

Certificate installation is required only for an online connection from the SAP system.

<iframe width="560" height="315" src="https://www.youtube.com/embed/QtqWRF0UuLw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
