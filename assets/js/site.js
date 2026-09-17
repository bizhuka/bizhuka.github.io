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

  function closeDropdown(dropdown) {
    dropdown.classList.remove("open");
    var toggle = dropdown.querySelector('[data-toggle="dropdown"]');
    if (toggle) toggle.setAttribute("aria-expanded", "false");
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
          closeDropdown(item);
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
        closeDropdown(item);
      });
      dropdown.classList.toggle("open", shouldOpen);
      toggle.setAttribute("aria-expanded", String(shouldOpen));
    });
  });

  document.addEventListener("click", function (event) {
    if (!event.target.closest(".dropdown")) {
      document.querySelectorAll(".dropdown.open").forEach(function (item) {
        closeDropdown(item);
      });
    }
  });

  function renderPrettyJson(code) {
    try {
      var formatted = JSON.stringify(JSON.parse(code.textContent), null, 2);
      var tokenPattern = /"(?:\\.|[^"\\])*"|\b(?:true|false|null)\b|-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g;
      var fragment = document.createDocumentFragment();
      var lastIndex = 0;
      var match;

      while ((match = tokenPattern.exec(formatted)) !== null) {
        fragment.appendChild(document.createTextNode(formatted.slice(lastIndex, match.index)));
        var token = match[0];
        var span = document.createElement("span");
        var remainder = formatted.slice(match.index + token.length);
        if (token.charAt(0) === '"') {
          span.className = /^\s*:/.test(remainder) ? "json-key" : "json-string";
        } else if (/^(true|false|null)$/.test(token)) {
          span.className = "json-literal";
        } else {
          span.className = "json-number";
        }
        span.textContent = token;
        fragment.appendChild(span);
        lastIndex = match.index + token.length;
      }

      fragment.appendChild(document.createTextNode(formatted.slice(lastIndex)));
      code.replaceChildren(fragment);
    } catch (error) {
      code.closest(".demo-json-panel").classList.add("demo-json-invalid");
    }
  }

  document.querySelectorAll(".demo-json code").forEach(renderPrettyJson);

  document.querySelectorAll("[data-copy-json]").forEach(function (button) {
    button.addEventListener("click", function () {
      var code = button.closest(".demo-json-panel").querySelector("code");
      if (!navigator.clipboard || !code) return;
      navigator.clipboard.writeText(code.textContent).then(function () {
        var original = button.textContent;
        button.textContent = "Copied";
        window.setTimeout(function () {
          button.textContent = original;
        }, 1500);
      }).catch(function () {
        button.textContent = "Copy failed";
      });
    });
  });

  function updateGeneratorUrl(form) {
    var output = form.querySelector("[data-generator-url]");
    if (!output) return;
    output.textContent = form.action + "?" + new URLSearchParams(new FormData(form)).toString();
  }

  function validateGeneratorCounts(form) {
    var firstInvalid = null;
    form.querySelectorAll("input[type='number'][data-range-message]").forEach(function (input) {
      var value = Number(input.value);
      var min = Number(input.min);
      var max = Number(input.max);
      var valid = Number.isInteger(value) && value >= min && value <= max;
      input.setCustomValidity(valid ? "" : input.getAttribute("data-range-message"));
      if (!valid && !firstInvalid) firstInvalid = input;
    });
    return firstInvalid;
  }

  document.querySelectorAll("[data-generator-form]").forEach(function (form) {
    var status = form.querySelector("[data-generator-status]");
    form.querySelectorAll("[required]").forEach(function (input) {
      input.addEventListener("invalid", function () {
        if (status) {
          status.textContent = input.validationMessage;
          status.className = "generator-status error";
        }
      });
    });
    var refresh = function () {
      validateGeneratorCounts(form);
      updateGeneratorUrl(form);
      if (status) {
        status.textContent = "";
        status.className = "generator-status";
      }
    };

    form.addEventListener("input", refresh);
    form.addEventListener("change", refresh);
    form.addEventListener("submit", function (event) {
      var firstInvalid = validateGeneratorCounts(form);
      var template = form.querySelector("select[name='template']");
      if (firstInvalid || !template || !template.value) {
        event.preventDefault();
        if (status) {
          status.textContent = firstInvalid ? firstInvalid.validationMessage : "Choose a template.";
          status.className = "generator-status error";
        }
        return;
      }
      updateGeneratorUrl(form);
      if (status) {
        status.textContent = "Download requested. Check your browser downloads.";
        status.className = "generator-status ok";
      }
    });

    refresh();
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
