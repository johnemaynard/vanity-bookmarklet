javascript: (() => {
  const containerId = "make-me-pretty";
  if (document.getElementById(containerId)) {
    return;
  }

  const lightbulb = "&#128161;";
  const pointUp = "&#128070;";
  const pointDown = "&#128071;";

  const colors = [
    { name: "Candle", kelvin: 1900, color: "rgba(255,147,41,1)" },
    { name: "40W Tungsten", kelvin: 2600, color: "rgba(255,197,143,1)" },
    { name: "100W Tungsten", kelvin: 2850, color: "rgba(255,214,170,1)" },
    { name: "Halogen", kelvin: 3200, color: "rgba(255,241,224,1)" },
    { name: "Carbon Arc", kelvin: 5200, color: "rgba(255,250,244,1)" },
    { name: "High Noon Sun", kelvin: 5400, color: "rgba(255,250,251,1)" },
    { name: "Direct Sunlight", kelvin: 6000, color: "rgba(255,255,255,1)" },
    { name: "Overcast Sky", kelvin: 7000, color: "rgba(201,226,255,1)" },
    { name: "Clear Blue Sky", kelvin: 20000, color: "rgba(64,156,255,1)" },
  ];

  const uninstall = () => {
    container.remove();
  };

  const container = document.createElement("div");
  container.id = containerId;
  container.style.position = "fixed";
  container.style.backgroundColor = "rgba(255,255,255,0.7)";
  container.style.top = "0px";
  container.style.zIndex = "99999";
  container.style.top = "0";
  container.style.bottom = "0";
  container.style.left = "0";
  container.style.right = "0";
  container.style.fontFamily =
    "-apple-system, system-ui, BlinkMacSystemFont,  Roboto,  Arial, sans-serif";
  container.style.transition = "background 300ms";
  container.style.transform = "translate3d(0,0,0)";
  container.onclick = () => {
    uninstall();
  };

  const toolbarWrapper = document.createElement("div");
  toolbarWrapper.style.background = "white";
  toolbarWrapper.onclick = (e) => e.stopPropagation();

  const toolbar = document.createElement("div");
  const s = toolbar.style;
  s.fontSize = "13px";
  s.boxShadow = "0 0 8px 0px rgba(0,0,0,0.18)";
  s.padding = "4px";
  s.display = "flex";
  s.alignItems = "center";
  s.backgroundColor = "rgba(255,255,255,0.41)";

  let selectedOption = null;

  colors.forEach((color, i) => {
    const item = document.createElement("div");
    const s = item.style;
    s.flex = "1 1 auto";
    s.color = "rgba(0,0,0,0.8)";
    s.fontWeight = "500";
    s.padding = "6px";
    s.marginRight = "6px";
    s.minHeight = "16px";
    s.display = "flex";
    s.alignItems = "flex-end";
    s.backgroundColor = color.color;
    s.transition = "font-size 0.1s";
    item.innerText = color.kelvin + "K";

    if (i === Math.floor(colors.length / 2)) {
      selectedOption = item;
    }

    item.onmouseenter = (e) => {
      e.target.style.cursor = "pointer";
      e.target.style.fontSize = "17px";
      e.target.style.fontWeight = "bold";
    };
    item.onmouseleave = (e) => {
      if (e.target !== selectedOption) {
        e.target.style.cursor = "none";
        e.target.style.fontSize = "13px";
        e.target.style.fontWeight = "normal";
      }
    };
    item.onclick = (e) => {
      e.stopPropagation();
      toolbar.childNodes.forEach((c) => {
        c.style.fontWeight = "normal";
        c.style.fontSize = "13px";
        const parts = c.innerText.split(" ");
        if (parts.length > 1) {
          c.innerText = parts[1];
        }
      });
      e.target.style.fontWeight = "bold";
      e.target.style.fontSize = "17px";
      e.target.innerText = lightbulb + " " + e.target.innerText;

      container.style.backgroundColor = color.color;
      toolbarWrapper.style.backgroundColor = color.color;
      selectedOption = e.target;
    };
    toolbar.appendChild(item);
  });

  const msg = document.createElement("div");
  msg.innerText =
    pointUp + " Change your color / " + pointDown + " Click to close";
  const mss = msg.style;
  mss.fontWeight = "500";
  mss.fontSize = "13px";
  mss.color = "rgba(0,0,0,0.62)";
  mss.marginTop = "24px";
  mss.textAlign = "center";
  mss.position = "relative";
  mss.opacity = "0";
  mss.top = "-50px";
  mss.transition = "top 0.25s ease-out, opacity 0.25s ease-out";

  toolbarWrapper.append(toolbar);
  container.appendChild(toolbarWrapper);
  container.appendChild(msg);
  document.body.appendChild(container);

  setTimeout(() => {
    mss.opacity = "1";
    mss.top = "0";
  }, 200);

  selectedOption && selectedOption.click();
})();
