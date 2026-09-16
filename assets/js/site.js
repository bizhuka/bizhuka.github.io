(function () {
  "use strict";

  function tabPanel(tab) {
    var href = tab.getAttribute("href") || "";
    return href.charAt(0) === "#" ? document.getElementById(href.slice(1)) : null;
  }

  function tabContainer(tabList) {
    var header = tabList.closest(".tab-header");
    var nested = header && header.querySelector(".tab-content");
    if (nested) return nested;
    var candidate = header ? header.nextElementSibling : tabList.nextElementSibling;
    return candidate && candidate.classList.contains("tab-content") ? candidate : null;
  }

  function activateTab(tab, moveFocus) {
    var tabList = tab.closest(".nav-tabs");
    var container = tabList && tabContainer(tabList);
    var panel = tabPanel(tab);
    if (!tabList || !container || !panel) return;

    tabList.querySelectorAll("li.active").forEach(function (item) {
      item.classList.remove("active");
    });
    tabList.querySelectorAll('[data-toggle="tab"]').forEach(function (item) {
      item.setAttribute("aria-selected", "false");
      item.setAttribute("tabindex", "-1");
    });
    container.querySelectorAll(".tab-pane").forEach(function (item) {
      item.classList.remove("active", "in");
      item.hidden = true;
    });

    tab.setAttribute("aria-selected", "true");
    tab.setAttribute("tabindex", "0");
    tab.closest("li").classList.add("active");
    var dropdown = tab.closest(".dropdown");
    if (dropdown) dropdown.classList.add("active");
    panel.classList.add("active", "in");
    panel.hidden = false;
    if (moveFocus) tab.focus();
  }

  document.querySelectorAll(".nav-tabs").forEach(function (tabList) {
    tabList.setAttribute("role", "tablist");
    var tabs = Array.from(tabList.querySelectorAll('[data-toggle="tab"]'));
    tabs.forEach(function (tab) {
      var panel = tabPanel(tab);
      tab.setAttribute("role", "tab");
      if (panel) {
        if (!tab.id) tab.id = "tab-" + panel.id;
        tab.setAttribute("aria-controls", panel.id);
        panel.setAttribute("role", "tabpanel");
        panel.setAttribute("aria-labelledby", tab.id);
      }
      tab.addEventListener("click", function (event) {
        event.preventDefault();
        activateTab(tab, false);
        document.querySelectorAll(".dropdown.open").forEach(function (item) {
          item.classList.remove("open");
        });
      });
      tab.addEventListener("keydown", function (event) {
        var index = tabs.indexOf(tab);
        var nextIndex = null;
        if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
        if (event.key === "ArrowLeft") nextIndex = (index - 1 + tabs.length) % tabs.length;
        if (event.key === "Home") nextIndex = 0;
        if (event.key === "End") nextIndex = tabs.length - 1;
        if (nextIndex !== null) {
          event.preventDefault();
          activateTab(tabs[nextIndex], true);
        }
      });
    });
    var initial = tabs.find(function (tab) {
      return tab.closest("li").classList.contains("active");
    }) || tabs[0];
    if (initial) activateTab(initial, false);
  });

  document.querySelectorAll('[data-toggle="dropdown"]').forEach(function (toggle) {
    toggle.setAttribute("aria-haspopup", "true");
    toggle.setAttribute("aria-expanded", "false");
    toggle.addEventListener("click", function (event) {
      event.preventDefault();
      var dropdown = toggle.closest(".dropdown");
      var shouldOpen = !dropdown.classList.contains("open");
      document.querySelectorAll(".dropdown.open").forEach(function (item) {
        item.classList.remove("open");
      });
      dropdown.classList.toggle("open", shouldOpen);
      toggle.setAttribute("aria-expanded", String(shouldOpen));
    });
  });

  document.addEventListener("click", function (event) {
    if (!event.target.closest(".dropdown")) {
      document.querySelectorAll(".dropdown.open").forEach(function (item) {
        item.classList.remove("open");
        var toggle = item.querySelector('[data-toggle="dropdown"]');
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      });
    }
  });

  document.querySelectorAll("[data-dialog-target]").forEach(function (button) {
    button.addEventListener("click", function () {
      var dialog = document.getElementById(button.getAttribute("data-dialog-target"));
      if (dialog && typeof dialog.showModal === "function") dialog.showModal();
    });
  });

  document.querySelectorAll("[data-dialog-close]").forEach(function (button) {
    button.addEventListener("click", function () {
      var dialog = button.closest("dialog");
      if (dialog) dialog.close();
    });
  });

  document.querySelectorAll("dialog").forEach(function (dialog) {
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) dialog.close();
    });
  });
})();
