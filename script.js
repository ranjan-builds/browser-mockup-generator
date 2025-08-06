document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements
  const browserMockup = document.getElementById("browser-mockup");
  const browserHeader = document.getElementById("browser-header");
  const browserUrl = document.getElementById("browser-url");
  const browserContent = document.getElementById("browser-content");
  const urlInput = document.getElementById("url-input");
  const windowStyleBtns = document.querySelectorAll(".window-style-btn");
  const headerColorPicker = document.getElementById("header-color");
  const buttonsColorPicker = document.getElementById("buttons-color");
  const sizeSlider = document.getElementById("size-slider");
  const contentTypeSelect = document.getElementById("content-type");
  const showUrlCheckbox = document.getElementById("show-url");
  const showButtonsCheckbox = document.getElementById("show-buttons");
  const showShadowCheckbox = document.getElementById("show-shadow");
  const advancedToggle = document.getElementById("advanced-toggle");
  const advancedOptions = document.getElementById("advanced-options");
  const advancedIcon = document.getElementById("advanced-icon");
  const presetBtns = document.querySelectorAll(".preset-btn");
  const downloadBtn = document.getElementById("download-btn");
  const replaceBtn = document.getElementById("replace-btn");

  // Initialize with default values
  let currentWindowStyle = "mac";

  // Event Listeners
  urlInput.addEventListener("input", updateUrl);
  windowStyleBtns.forEach((btn) =>
    btn.addEventListener("click", changeWindowStyle)
  );
  headerColorPicker.addEventListener("input", updateColors);
  buttonsColorPicker.addEventListener("input", updateColors);
  sizeSlider.addEventListener("input", updateSize);
  // contentTypeSelect.addEventListener('change', updateContent);
  showUrlCheckbox.addEventListener("change", toggleUrl);
  showButtonsCheckbox.addEventListener("change", toggleButtons);
  showShadowCheckbox.addEventListener("change", toggleShadow);
  advancedToggle.addEventListener("click", toggleAdvancedOptions);
  presetBtns.forEach((btn) => btn.addEventListener("click", applyPreset));
  downloadBtn.addEventListener("click", downloadMockup);

  // Functions
  function updateUrl() {
    browserUrl.textContent = urlInput.value || "https://example.com";
  }

  function changeWindowStyle(e) {
    const style = e.currentTarget.dataset.style;
    currentWindowStyle = style;

    // Update active button
    windowStyleBtns.forEach((btn) =>
      btn.classList.remove("active", "border-blue-500")
    );
    e.currentTarget.classList.add("active", "border-blue-500");

    // Update browser buttons
    const buttons = browserHeader.querySelector(".browser-buttons");
    buttons.innerHTML = "";

    if (style === "mac") {
      buttons.innerHTML = `
                        <div class="browser-button bg-red-500"></div>
                        <div class="browser-button bg-yellow-500"></div>
                        <div class="browser-button bg-green-500"></div>
                    `;
    } else if (style === "windows") {
      buttons.innerHTML = `
                        <div class="flex items-center space-x-1">
                            <i class="fas fa-window-minimize text-gray-400 text-xs"></i>
                            <i class="fas fa-window-maximize text-gray-400 text-xs"></i>
                            <i class="fas fa-times text-gray-400 text-xs"></i>
                        </div>
                    `;
    } else if (style === "linux") {
      buttons.innerHTML = `
                        <div class="flex items-center space-x-1 text-gray-400">
                            <i class="fab fa-ubuntu text-sm"></i>
                        </div>
                    `;
    }
  }

  function updateColors() {
    browserHeader.style.backgroundColor = headerColorPicker.value;
    // Update buttons color if not using Mac style
    if (currentWindowStyle !== "mac") {
      const buttons = browserHeader.querySelector(".browser-buttons");
      if (buttons) {
        const icons = buttons.querySelectorAll("i");
        icons.forEach((icon) => {
          icon.style.color = buttonsColorPicker.value;
        });
      }
    }
  }

  function updateSize() {
    const value = sizeSlider.value;
    const percent = (value / 100) * 0.5 + 0.5; // Scale between 0.5 and 1
    browserMockup.style.transform = `scale(${percent})`;

    // Update slider background
    sizeSlider.style.setProperty("--value-percent", `${value}%`);
  }

  function updateContent() {
    const type = contentTypeSelect.value;

    if (type === "blank") {
      browserContent.innerHTML = `
                        <div class="w-full h-full flex flex-col items-center justify-center p-4">
                            <label for="image-upload" class="cursor-pointer">
                                <div class="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-blue-500 transition">
                                    <i class="fas fa-cloud-upload-alt text-4xl text-blue-500 mb-4"></i>
                                    <h3 class="text-xl font-bold text-white mb-2">Upload Screenshot</h3>
                                    <p class="text-gray-400 mb-4">Drag & drop or click to browse</p>
                                    <p class="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                                </div>
                                <input id="image-upload" type="file" accept="image/*" class="hidden">
                            </label>
                            <div id="uploaded-image" class="hidden w-full h-full"></div>
                        </div>
                    `;
    } else if (type === "custom") {
      browserContent.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center">
                            <div class="text-center">
                                <i class="fas fa-globe text-4xl text-gray-600 mb-3"></i>
                                <p class="text-gray-400">Custom URL content would be displayed here</p>
                            </div>
                        </div>
                    `;
    } else if (type === "screenshot") {
      browserContent.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center">
                            <div class="text-center">
                                <i class="fas fa-image text-4xl text-gray-600 mb-3"></i>
                                <p class="text-gray-400">Uploaded screenshot would be displayed here</p>
                            </div>
                        </div>
                    `;
    } else if (type === "template") {
      browserContent.innerHTML = `
                        <div class="w-full h-full bg-gradient-to-br from-purple-900 to-blue-800 flex items-center justify-center">
                            <div class="text-center">
                                <h3 class="text-2xl font-bold text-white mb-2">Template Preview</h3>
                                <p class="text-gray-300 mb-6">Select from our template library</p>
                                <button class="bg-white hover:bg-gray-100 text-purple-800 px-6 py-2 rounded-lg transition">
                                    Browse Templates
                                </button>
                            </div>
                        </div>
                    `;
    }
  }

  function toggleUrl() {
    browserUrl.style.display = showUrlCheckbox.checked ? "flex" : "none";
  }

  function toggleButtons() {
    const buttons = browserHeader.querySelector(".browser-buttons");
    buttons.style.display = showButtonsCheckbox.checked ? "flex" : "none";
  }

  function toggleShadow() {
    if (showShadowCheckbox.checked) {
      browserMockup.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.3)";
    } else {
      browserMockup.style.boxShadow = "none";
    }
  }

  function toggleAdvancedOptions() {
    advancedOptions.classList.toggle("hidden");
    advancedIcon.classList.toggle("rotate-180");
  }

  function applyPreset(e) {
    const preset = e.currentTarget.dataset.preset;

    if (preset === "dark") {
      headerColorPicker.value = "#1f2937";
  
      buttonsColorPicker.value = "#3b82f6";
      browserUrl.classList.remove("bg-white", "text-gray-800");
      browserUrl.classList.add("bg-gray-700", "text-gray-300");
    } else if (preset === "light") {
      headerColorPicker.value = "#f3f4f6";
  
      buttonsColorPicker.value = "#3b82f6";
      browserUrl.classList.remove("bg-gray-700", "text-gray-300");
      browserUrl.classList.add("bg-white", "text-gray-800");
    } else if (preset === "macos") {
      document.querySelector('[data-style="mac"]').click();
      headerColorPicker.value = "#2d2d2d";
  
    } else if (preset === "windows") {
      document.querySelector('[data-style="windows"]').click();
      headerColorPicker.value = "#0078d7";
    }

    updateColors();
  }

  function downloadMockup() {
    document.fonts.ready.then(() => {
      html2canvas(document.getElementById("browser-mockup"), {
        scale: 3, // Increase this for higher quality
        useCORS: true,
        backgroundColor: null,
        allowTaint: true,
      }).then((canvas) => {
        const link = document.createElement("a");
        link.download = "mockup.png";
        link.href = canvas.toDataURL();
        link.click();
      });
    });

    const originalText = downloadBtn.innerHTML;
    downloadBtn.innerHTML =
      '<i class="fas fa-check mr-2"></i> Mockup Downloaded!';
    downloadBtn.classList.add("bg-green-600", "from-green-600", "to-green-700");

    setTimeout(() => {
      downloadBtn.innerHTML = originalText;
      downloadBtn.classList.remove(
        "bg-green-600",
        "from-green-600",
        "to-green-700"
      );
      downloadBtn.classList.add(
        "bg-gradient-to-r",
        "from-blue-600",
        "to-purple-600"
      );
    }, 2000);

    // Animation effect
    downloadBtn.classList.add("pulse");
    setTimeout(() => {
      downloadBtn.classList.remove("pulse");
    }, 1000);
  }

  // Image upload handler
  document.addEventListener("change", function (e) {
    if (e.target.id === "image-upload") {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
          const uploadedImage = document.getElementById("uploaded-image");
          uploadedImage.innerHTML = `
                                <img src="${event.target.result}" class="w-full h-full object-contain" alt="Uploaded screenshot">
                            `;
          uploadedImage.classList.remove("hidden");
          document
            .querySelector("#browser-content > div > label")
            .classList.add("hidden");
        };
        reader.readAsDataURL(file);
      }
    }
  });

  replaceBtn.addEventListener("click", function () {
    // Trigger the hidden file input again
    document.getElementById("image-upload").click();
  });

  // Initialize
  document.querySelector('[data-style="mac"]').classList.add("border-blue-500");
  updateColors();
});
