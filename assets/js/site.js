(function () {
  "use strict";

  document.querySelectorAll(".page-toc").forEach(function (toc, tocIndex) {
    var desktop = window.matchMedia("(min-width: 66.5rem)");
    var disclosure = toc.querySelector("details");
    var links = Array.from(toc.querySelectorAll("a[href^='#']"));
    var entries = links.map(function (link) {
      var heading = document.getElementById(decodeURIComponent(link.hash.slice(1)));
      var label = document.createElement("span");
      label.className = "page-toc-label";
      label.textContent = link.textContent.trim();
      link.replaceChildren(label);
      var excerpt = "";
      var sibling = heading && heading.nextElementSibling;
      while (sibling && !/^H[1-6]$/.test(sibling.tagName)) {
        if (sibling.matches("p, ul, ol") && sibling.textContent.trim()) {
          excerpt = sibling.textContent.replace(/\s+/g, " ").trim().slice(0, 300);
          break;
        }
        sibling = sibling.nextElementSibling;
      }
      return { link: link, heading: heading, title: label.textContent, excerpt: excerpt };
    }).filter(function (entry) { return entry.heading; });
    if (!entries.length) return;

    var preview = document.createElement("div");
    preview.className = "page-toc-preview";
    preview.id = "page-toc-preview-" + tocIndex;
    preview.setAttribute("role", "tooltip");
    preview.hidden = true;
    var title = document.createElement("strong");
    var excerpt = document.createElement("p");
    preview.append(title, excerpt);
    document.body.appendChild(preview);
    var closeTimer;
    var previewLink;

    function hidePreview() {
      window.clearTimeout(closeTimer);
      preview.hidden = true;
      if (previewLink) previewLink.removeAttribute("aria-describedby");
      previewLink = null;
    }

    function showPreview(entry) {
      hidePreview();
      if (!desktop.matches) return;
      title.textContent = entry.title;
      excerpt.textContent = entry.excerpt;
      excerpt.hidden = !entry.excerpt;
      preview.hidden = false;
      var rect = entry.link.getBoundingClientRect();
      preview.style.right = (window.innerWidth - rect.left + 12) + "px";
      preview.style.top = Math.max(12, Math.min(rect.top - 12, window.innerHeight - preview.offsetHeight - 12)) + "px";
      previewLink = entry.link;
      previewLink.setAttribute("aria-describedby", preview.id);
    }

    function scheduleHide() {
      closeTimer = window.setTimeout(hidePreview, 160);
    }

    entries.forEach(function (entry, index) {
      entry.link.addEventListener("pointerenter", function () { showPreview(entry); });
      entry.link.addEventListener("pointerleave", scheduleHide);
      entry.link.addEventListener("focus", function () { showPreview(entry); });
      entry.link.addEventListener("blur", scheduleHide);
      entry.link.addEventListener("click", function () {
        hidePreview();
        if (!desktop.matches) disclosure.open = false;
        entry.heading.setAttribute("tabindex", "-1");
        entry.heading.focus({ preventScroll: true });
      });
      entry.link.addEventListener("keydown", function (event) {
        var next = null;
        if (event.key === "ArrowDown") next = (index + 1) % entries.length;
        if (event.key === "ArrowUp") next = (index - 1 + entries.length) % entries.length;
        if (event.key === "Home") next = 0;
        if (event.key === "End") next = entries.length - 1;
        if (next !== null) {
          event.preventDefault();
          entries[next].link.focus();
        }
      });
    });
    preview.addEventListener("pointerenter", function () { window.clearTimeout(closeTimer); });
    preview.addEventListener("pointerleave", scheduleHide);
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") hidePreview();
    });

    var waveFrame;
    var pointerY;
    function renderWave() {
      waveFrame = null;
      entries.forEach(function (entry) {
        var rect = entry.link.getBoundingClientRect();
        var distance = Math.abs(pointerY - (rect.top + rect.height / 2));
        var proximity = Math.max(0, 1 - distance / 72);
        var eased = (1 - Math.cos(proximity * Math.PI)) / 2;
        entry.link.style.setProperty("--toc-mark-width", (12 + 20 * eased).toFixed(2) + "px");
      });
    }
    function updateWave(event) {
      if (!desktop.matches || event.pointerType === "touch") return;
      pointerY = event.clientY;
      if (!waveFrame) waveFrame = window.requestAnimationFrame(renderWave);
    }
    function resetWave() {
      if (waveFrame) window.cancelAnimationFrame(waveFrame);
      waveFrame = null;
      entries.forEach(function (entry) {
        entry.link.style.removeProperty("--toc-mark-width");
      });
    }
    toc.addEventListener("pointermove", updateWave);
    toc.addEventListener("pointerleave", resetWave);

    var scheduled = false;
    function updateCurrent() {
      scheduled = false;
      var visible = entries.filter(function (entry) { return entry.heading.getClientRects().length; });
      var current = visible[0];
      visible.forEach(function (entry) {
        if (entry.heading.getBoundingClientRect().top <= 120) current = entry;
      });
      entries.forEach(function (entry) {
        if (entry === current) entry.link.setAttribute("aria-current", "location");
        else entry.link.removeAttribute("aria-current");
      });
    }
    function onScroll() {
      hidePreview();
      if (!scheduled) { scheduled = true; window.requestAnimationFrame(updateCurrent); }
    }
    function updateLayout() {
      disclosure.open = desktop.matches;
      resetWave();
      hidePreview();
      updateCurrent();
    }
    toc.classList.add("page-toc-enhanced");
    desktop.addEventListener("change", updateLayout);
    window.addEventListener("resize", hidePreview);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("load", updateCurrent);
    updateLayout();
  });

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
        button.textContent = button.dataset.copySuccess || "Copied";
        window.setTimeout(function () {
          button.textContent = original;
        }, 1500);
      }).catch(function () {
        button.textContent = button.dataset.copyFailed || "Copy failed";
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
          status.textContent = firstInvalid ? firstInvalid.validationMessage : (form.dataset.templateMessage || "Choose a template.");
          status.className = "generator-status error";
        }
        return;
      }
      updateGeneratorUrl(form);
      if (status) {
        status.textContent = form.dataset.downloadMessage || "Download requested. Check your browser downloads.";
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
    var pointerStartedOnBackdrop = false;

    dialog.addEventListener("pointerdown", function (event) {
      pointerStartedOnBackdrop = event.target === dialog;
    });

    dialog.addEventListener("pointerup", function (event) {
      var shouldClose = pointerStartedOnBackdrop && event.target === dialog;
      pointerStartedOnBackdrop = false;
      if (shouldClose) dialog.close();
    });

    dialog.addEventListener("pointercancel", function () {
      pointerStartedOnBackdrop = false;
    });
  });
})();
