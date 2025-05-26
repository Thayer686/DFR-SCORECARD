const CACHE_NAME = 'field-report-v8.8'; // 🔁 bump this for every update

let listData = {};

async function loadListData() {
  const response = await fetch("../data/listData.json");
  listData = await response.json();
  console.log("✅ List data loaded", listData);
}
 
let unitIdMap = {};

async function loadUnitIdMap() {
  const response = await fetch("../data/unitIdMap.json");
  unitIdMap = await response.json();
  console.log("✅ Unit ID map loaded", unitIdMap);
}


 let projectNumberMap = {};

async function loadProjectNumberMap() {
  const response = await fetch("../data/projectNumberMap.json");
  projectNumberMap = await response.json();
  console.log("✅ Project number map loaded", projectNumberMap);
}


    // Fetch the activity map from JSON
let activityMap = {};

async function loadActivityMap() {
  const response = await fetch("../data/activityMap.json");
  activityMap = await response.json();
  console.log("✅ Activity map loaded", activityMap);
}

  
  async function loadLists() {
  await loadListData(); // 🧠 load from JSON
  await loadActivityMap(); // 🧠 load activity map from JSON
  await loadProjectNumberMap();
  await loadUnitIdMap();


  // Directly use listData
  populateSelect("projectNameSelect", listData.projectNames);
  populateSelect("clientSelect", listData.clients);
  populateSelect("locationSelect", listData.locations);
  populateSelect("weatherSelect", listData.weather);
  populateSelect("clientProjectNumberSelect", listData.clientProjectNumbers);

  // 🔥 Unified listener for CWP filter logic
  document.getElementById("clientProjectNumberSelect").addEventListener("change", () => {
    const selectedCWP = document.getElementById("clientProjectNumberSelect").value;

    let costCodeList = {};
    if (selectedCWP === "CWP-406 & 407") {
      costCodeList = {
        ...activityMap["CWP-406"],
        ...activityMap["CWP-407"]
      };
    } else {
      costCodeList = activityMap[selectedCWP] || {};
    }

    const selects = document.querySelectorAll(".costCodeSelect");
    selects.forEach(select => {
      const tom = select.tomselect;
      if (tom) {
        // Rebuild the native select DOM
select.innerHTML = '<option value="">Select...</option>';
Object.keys(costCodeList).forEach(code => {
  const opt = document.createElement("option");
  opt.value = code;
  opt.textContent = code;
  select.appendChild(opt);
});

// Tell TomSelect to resync its DOM to reflect options
tom.sync();
tom.setValue("");

      }
    });

    const mapped = projectNumberMap[selectedCWP] || [];
    const projectNumberSelect = document.getElementById("projectNumberSelect");
    if (projectNumberSelect && projectNumberSelect.tomselect) {
      const ts = projectNumberSelect.tomselect;
      ts.clearOptions();
      ts.addOption({ value: "", text: "Select..." });
      mapped.forEach(pn => ts.addOption({ value: pn, text: pn }));
      ts.refreshOptions(false);
      ts.setValue("");
    }

    for (let i = 1; i <= 6; i++) {
      const manpowerSelect = document.getElementById(`costCode${i}`);
      const equipmentSelect = document.getElementById(`costCode${i + 6}`);
      if (!manpowerSelect || !equipmentSelect) continue;

      manpowerSelect.onchange = () => {
        equipmentSelect.value = manpowerSelect.value;
        if (equipmentSelect.tomselect) {
          equipmentSelect.tomselect.setValue(manpowerSelect.value);
        }
      };
    }
  });

  // Populate dependent dropdowns
  document.querySelectorAll(".manpowerSelect").forEach(select => {
    populateSelectElement(select, listData.manpower);
  });
  document.querySelectorAll(".classificationSelect").forEach(select => {
    populateSelectElement(select, listData.classification);
  });
  document.querySelectorAll(".equipmentSelect").forEach(select => {
    populateSelectElement(select, listData.equipment);
  });
  document.querySelectorAll(".UofMSelect").forEach(select => {
    populateSelectElement(select, listData.UofM);
  });
  document.querySelectorAll(".unitUsedSelect").forEach(select => {
    populateSelectElement(select, Object.keys(unitIdMap.UnitsUsedList));

  });

   // 🔧 ✅ Add this block LAST
  setTimeout(() => {
    document.querySelectorAll("select").forEach(select => {
      if (!select.tomselect) {
        new TomSelect(select, {
          maxOptions: false,
          create: false,
          sortField: {
            field: "text",
            direction: "asc"
          },
          placeholder: "Select..."
        });
      }
    });
  }, 0);

  setTimeout(() => {
  document.querySelectorAll("select").forEach(select => {
    const wrapper = select.closest(".ts-wrapper");
    const control = wrapper?.querySelector(".ts-control");
    const hasValue = select.value?.trim();

    // If empty, visually show "Select..." text for PDF and screen clarity
    if (control && !hasValue) {
      const placeholder = document.createElement("div");
      placeholder.className = "visible-placeholder";
      placeholder.textContent = select.getAttribute("placeholder") || "Select...";
      placeholder.style.cssText = `
        position: absolute;
        top: 8px;
        left: 10px;
        font-size: 13px;
        color: #999;
        pointer-events: none;
      `;
      control.style.position = "relative";
      control.appendChild(placeholder);
    }
  });
}, 50); // Delay slightly to let TomSelect finish rendering




  attachCostCodeListeners();
  linkTopToBottomCostCodesWithOverride();
  attachEquipmentRowListeners();
  attachSubcontractorRowListeners();
  attachUnitIdListeners();
}


listData.costCodes = Object.keys(activityMap).sort();

function populateCostCodes(list) {
  const sortedList = [...list].sort((a, b) => a.localeCompare(b));

  // Populate top & equipment cost codes (1–12)
  for (let i = 1; i <= 12; i++) {
    const select = document.getElementById(`costCode${i}`);
    if (!select) continue;

    select.innerHTML = '<option value="">Select...</option>';
    sortedList.forEach(code => {
      const option = document.createElement("option");
      option.value = code;
      option.textContent = code;
      select.appendChild(option);
    });
  }

  // ✅ Populate subcontractor cost codes (1–6)
  for (let i = 1; i <= 6; i++) {
    const select = document.getElementById(`subcostCode${i}`);
    if (!select) continue;

    select.innerHTML = '<option value="">Select...</option>';
    sortedList.forEach(code => {
      const option = document.createElement("option");
      option.value = code;
      option.textContent = code;
      select.appendChild(option);
    });
  }
}

function attachCostCodeListeners() {
  for (let i = 1; i <= 6; i++) {
    const costCodeSelect = document.getElementById(`costCode${i}`);
    const activityField = document.getElementById(`activity${i}`);
    const equipmentSelect = document.getElementById(`equipmentcostCode${i}`);

    if (costCodeSelect && activityField) {
      costCodeSelect.addEventListener("change", () => {
        const selectedCode = costCodeSelect.value;

        // 🧠 Find activity text from activityMap
        activityField.value = findActivityText(selectedCode);

        // 🔁 Sync same column equipment dropdown
        if (equipmentSelect && equipmentSelect.tomselect) {
          equipmentSelect.tomselect.setValue(selectedCode);
        }
      });
    }
  }
}

function attachUnitIdListeners() {
  document.querySelectorAll(".unitUsedSelect").forEach(select => {
    select.addEventListener("change", () => {
      const selectedValue = select.value;
      const unitId = unitIdMap.UnitsUsedList[selected] || "";


      // Get corresponding unitId field in same row
      const unitIdSelect = select.closest("tr")?.querySelector(".unitIdSelect");

      if (unitIdSelect) {
        if (unitIdSelect.tomselect) {
          unitIdSelect.tomselect.setValue(unitId);
        } else {
          unitIdSelect.value = unitId;
        }
      }
    });
  });
}


function findActivityText(code) {
  for (const cwp in activityMap) {
    if (activityMap[cwp]?.[code]) {
      return activityMap[cwp][code];
    }
  }
  return "";
}



function populateSelectElement(select, list) {
  if (!select || !list) return;
  select.innerHTML = '<option value="">Select...</option>';
  list.forEach(item => {
    const option = document.createElement("option");
    option.textContent = item;
    option.value = item;
    select.appendChild(option);
  });
}


function populateSelect(id, values) {
  const select = document.getElementById(id);
  if (!select || !Array.isArray(values)) return;

  // Sort values alphabetically
  const sortedValues = [...values].sort((a, b) => a.localeCompare(b));

  // Clear and repopulate dropdown
  select.innerHTML = '<option value="">Select...</option>';
  sortedValues.forEach(val => {
    const option = document.createElement("option");
    option.value = val;
    option.textContent = val;
    select.appendChild(option);
  });
}

  
    document.addEventListener("mouseout", function (e) {
      if (e.target.classList.contains("option")) {
        e.target.style.backgroundColor = "#ffffff";
        e.target.style.color = "#000000";
      }
    });

    // add manpower totals and then update grand total
    document.querySelectorAll('tr').forEach(row => {
      const hourInputs = row.querySelectorAll('.hour-cell input');
      const totalField = row.querySelector('.total-field');
    
      if (hourInputs.length && totalField) {
        hourInputs.forEach(input => {
          input.addEventListener('input', () => {
            let sum = 0;
            hourInputs.forEach(i => {
              const val = parseFloat(i.value);
              if (!isNaN(val)) sum += val;
            });
            totalField.value = sum.toFixed(2);
    
            updateGrandTotalHours(); // ✅ Add this here
          });
    
          input.addEventListener('blur', () => {
            const val = parseFloat(input.value);
            if (!isNaN(val)) {
              input.value = val.toFixed(2);
            }
          });
        });
      }
    });
    

    //Grand total of manpower
    function updateGrandTotalHours() {
      let sum = 0;
      document.querySelectorAll(".manpower-row .total-field").forEach(input => {
        const val = parseFloat(input.value);
        if (!isNaN(val)) sum += val;
      });
      const output = document.getElementById("grandTotalHours");
      if (output) output.value = sum.toFixed(2);
    }
    

    function attachEquipmentRowListeners() {
      document.querySelectorAll(".equipment-row").forEach(row => {
        const hourInputs = row.querySelectorAll(".equip-hour-cell input");
        const totalField = row.querySelector(".total-field");
    
        if (hourInputs.length && totalField) {
          hourInputs.forEach(input => {
            input.addEventListener("input", () => {
              let sum = 0;
              hourInputs.forEach(i => {
                const val = parseFloat(i.value);
                if (!isNaN(val)) sum += val;
              });
              totalField.value = sum.toFixed(2);
              updateEquipmentGrandTotal(); // ✅ Add this here
            });
    
            input.addEventListener("blur", () => {
              const val = parseFloat(input.value);
              if (!isNaN(val)) {
                input.value = val.toFixed(2);
              }
            });
          });
        }
      });
    }
    
    //Grand total of equipment
    function updateEquipmentGrandTotal() {
      let sum = 0;
      document.querySelectorAll(".equipment-total").forEach(input => {
        const val = parseFloat(input.value);
        if (!isNaN(val)) sum += val;
      });
      const output = document.getElementById("equipmentGrandTotal");
      if (output) output.value = sum.toFixed(2);
    }

    function updateSubcontractorGrandTotal() {
    let sum = 0;
    document.querySelectorAll(".sub-total-field").forEach(input => {
      const val = parseFloat(input.value);
      if (!isNaN(val)) sum += val;
    });
    const output = document.getElementById("subcontractorGrandTotal");
    if (output) output.value = sum.toFixed(2);
  }


    //Subcontractor totals

    function attachSubcontractorRowListeners() {
      document.querySelectorAll(".subcontractor-row").forEach(row => {
        const hourInputs = row.querySelectorAll(".sub-hour-cell input");
        const totalField = row.querySelector(".sub-total-field");
    
        if (hourInputs.length && totalField) {
          hourInputs.forEach(input => {
            input.addEventListener("input", () => {
              let sum = 0;
              hourInputs.forEach(i => {
                const val = parseFloat(i.value);
                if (!isNaN(val)) sum += val;
              });
              totalField.value = sum.toFixed(2);
              updateSubcontractorGrandTotal(); // ✅ optional step
            });
    
            input.addEventListener("blur", () => {
              const val = parseFloat(input.value);
              if (!isNaN(val)) {
                input.value = val.toFixed(2);
              }
            });
          });
        }
      });
    }
    

function linkTopToBottomCostCodesWithOverride() {
  for (let i = 1; i <= 6; i++) {
    const top = document.getElementById(`costCode${i}`);
    const bottom = document.getElementById(`costCode${i + 6}`);

    if (top && bottom) {
      (function(top, bottom) {
        let isSynced = true;

        top.addEventListener("change", () => {
  if (isSynced) {
    if (bottom.tomselect) {
      bottom.tomselect.setValue(top.value);
    } else {
      bottom.value = top.value;
    }
  }
});

        bottom.addEventListener("input", () => {
          if (bottom.value !== top.value) {
            isSynced = false;
          }
        });
      })(top, bottom);
    }
  }
}

listData.UnitsUsedList = Object.keys(unitIdMap); // Or .sort() if you want it alphabetical


function attachUnitIdListeners() {
  document.querySelectorAll(".unitUsedSelect").forEach(select => {
    select.addEventListener("change", () => {
      const selectedValue = select.value;
      const unitId = unitIdMap.UnitsUsedList[selectedValue] || "";

      // Get corresponding unitIdInput field in the same row
      const unitIdInput = select.closest("tr")?.querySelector(".unitIdInput");

      if (unitIdInput) {
        unitIdInput.value = unitId;
      }
    });
  });
}


    // to take photo or select from device
    document.querySelectorAll(".photo-cell").forEach(cell => {
      cell.addEventListener("click", () => {
        // Don't trigger if photo already exists
        if (cell.classList.contains("has-image")) return;
    
        const useUpload = confirm("Click OK to upload from device.\nClick Cancel to use camera.");
    
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
    
        if (!useUpload) {
          input.capture = "environment"; // hint for mobile cameras
        }
    
        input.onchange = () => {
          const file = input.files[0];
          if (file) {
            const reader = new FileReader();
           reader.onload = e => {
  const img = new Image();
  img.onload = function() {
    const maxDim = 800;
    let width = img.width;
    let height = img.height;
    if (width > maxDim || height > maxDim) {
      if (width > height) {
        height = Math.round(height * (maxDim / width));
        width = maxDim;
      } else {
        width = Math.round(width * (maxDim / height));
        height = maxDim;
      }
    }
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, width, height);

    const resizedDataUrl = canvas.toDataURL("image/jpeg", 0.8);

    const previewImg = document.createElement("img");
    previewImg.src = resizedDataUrl;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "✖";
    removeBtn.className = "remove-btn";
    removeBtn.addEventListener("click", event => {
      event.stopPropagation();
      cell.classList.remove("has-image");
      cell.innerHTML = "";
      autoSaveFormToCache();
    });

    cell.innerHTML = "";
    cell.classList.add("has-image");
    cell.appendChild(previewImg);
    cell.appendChild(removeBtn);

    autoSaveFormToCache();
  };
  img.src = e.target.result;
};
reader.readAsDataURL(file);
          }
        };
    
        input.click();
      });
    });

    const signatureBox = document.querySelectorAll(".signature-area")[0]; // assuming only one real canvas now

    if (signatureBox) {
      const toggleBtn = signatureBox.querySelector(".toggle-signature");
      const doneBtn = signatureBox.querySelector(".done-signature");
      const cancelBtn = signatureBox.querySelector(".cancel-signature");
      const canvas = signatureBox.querySelector(".signature-canvas");
      const textarea = signatureBox.querySelector(".text-entry");
      const controls = signatureBox.querySelector(".signature-controls");
    
      let ctx, drawing = false;
    
      toggleBtn?.addEventListener("click", () => {
        if (screen.orientation?.lock) {
          screen.orientation.lock("portrait").catch(() => {});
        }
    
        canvas.style.display = "block";
        controls.style.display = "block";
        textarea.style.display = "none";
        document.body.classList.add("noscroll");
    
        ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    
        canvas.onmousedown = e => {
          drawing = true;
          ctx.beginPath();
          ctx.moveTo(e.offsetX, e.offsetY);
        };
        canvas.onmousemove = e => {
          if (drawing) {
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
          }
        };
        canvas.onmouseup = canvas.onmouseleave = () => drawing = false;
    
        canvas.ontouchstart = e => {
          e.preventDefault();
          const touch = e.touches[0];
          const rect = canvas.getBoundingClientRect();
          ctx.beginPath();
          ctx.moveTo(touch.clientX - rect.left, touch.clientY - rect.top);
          drawing = true;
        };
        canvas.ontouchmove = e => {
          e.preventDefault();
          if (!drawing) return;
          const touch = e.touches[0];
          const rect = canvas.getBoundingClientRect();
          ctx.lineTo(touch.clientX - rect.left, touch.clientY - rect.top);
          ctx.stroke();
        };
        canvas.ontouchend = () => drawing = false;
      });
    
      doneBtn?.addEventListener("click", () => {
        if (screen.orientation?.unlock) {
          screen.orientation.unlock();
        }
    
        controls.style.display = "none";
        document.body.classList.remove("noscroll");
    
        const isEmptyCanvas = ctx.getImageData(0, 0, canvas.width, canvas.height).data.every(v => v === 0);
        if (!isEmptyCanvas) {
          textarea.style.display = "none";
          canvas.style.cursor = "default";
    
          // Disable drawing
          canvas.onmousedown = null;
          canvas.onmousemove = null;
          canvas.onmouseup = null;
          canvas.onmouseleave = null;
          canvas.ontouchstart = null;
          canvas.ontouchmove = null;
          canvas.ontouchend = null;

           // 🔥 AUTOSAVE after signature is completed
    autoSaveFormToCache();

        } else {
          canvas.style.display = "none";
        }
      });
    
      cancelBtn?.addEventListener("click", () => {
        if (screen.orientation?.unlock) {
          screen.orientation.unlock();
        }
    
        controls.style.display = "none";
        canvas.style.display = "none";
        textarea.style.display = "block";
        document.body.classList.remove("noscroll");
        ctx?.clearRect(0, 0, canvas.width, canvas.height);
      });
    }
    

// --- Manual Save Function ---
function saveForm() {
  const formData = {};

  document.querySelectorAll("input, textarea, select").forEach(el => {
    if (el.id) {
      formData[el.id] = el.type === "checkbox" ? el.checked : el.value;
    }
  });

// 🔥 NEW: Save all signature canvases as base64
document.querySelectorAll(".signature-canvas").forEach((canvas, index) => {
  if (!canvas) return;
  const key = `signatureCanvas${index}`;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
const isBlank = imageData.data.every(v => v === 0);
if (!isBlank) {
  formData[key] = canvas.toDataURL("image/png");
}

});

  formData.manpowerHours = Array.from(document.querySelectorAll(".hour-cell input")).map(i => i.value);
  formData.equipmentHours = Array.from(document.querySelectorAll(".equip-hour-cell input")).map(i => i.value);
  formData.subcontractorHours = Array.from(document.querySelectorAll(".sub-hour-cell input")).map(i => i.value);

  formData.photos = {};
  document.querySelectorAll(".photo-cell").forEach((cell, index) => {
    const img = cell.querySelector("img");
    if (img) {
      formData.photos[`photo${index}`] = img.src;
    }
  });

  // 🔥 Save photo descriptions
formData.photoCaptions = {};
document.querySelectorAll(".photo-description").forEach((input, index) => {
  formData.photoCaptions[`caption${index}`] = input.value;
});


// 🔥 Save Manual Manpower Rows
formData.manualManpowerRows = [];
document.querySelectorAll(".manpower-row.manual-row").forEach(row => {
  const manpower = row.querySelector("input[id^='manpowerselect']")?.value || "";
  const classification = row.querySelector("input[id^='classificationselect']")?.value || "";
  const loa = row.querySelector("input[type='checkbox']")?.checked || false;
  const notes = row.querySelector("input[id^='manualnotes']")?.value || "";
  const hours = Array.from(row.querySelectorAll(".hour-input")).map(i => i.value || "");
  formData.manualManpowerRows.push({ manpower, classification, loa, notes, hours });
});

// 🔥 Save Manual Equipment Rows
formData.manualEquipmentRows = [];
document.querySelectorAll(".equipment-row.manual-row").forEach(row => {
  const equipment = row.querySelector("input[id^='equipmentselect']")?.value || "";
  const total = row.querySelector(".equipment-total")?.value || "";
  const uofm = row.querySelector("select.UofMSelect")?.value || "";
  const po = row.querySelector("input[id^='po']")?.value || "";
  const notes = row.querySelector("input[id^='notesEquip']")?.value || "";
  const hours = Array.from(row.querySelectorAll(".hour-input")).map(i => i.value || "");
  formData.manualEquipmentRows.push({ equipment, total, uofm, po, notes, hours });
});

// 🔥 Save Manual Subcontractor Rows
formData.manualSubRows = [];
document.querySelectorAll(".subcontractor-row.manual-row").forEach(row => {
  const name = row.querySelector("input.subcontractorName-input")?.value || "";
  const total = row.querySelector(".sub-total-field")?.value || "";
  const uofm = row.querySelector("select.UofMSelect")?.value || "";
  const hours = Array.from(row.querySelectorAll(".sub-hour-input")).map(i => i.value || "");
  const services = row.querySelector("input[id^='services']")?.value || "";
  const siterep = row.querySelector("input[id^='siterep']")?.value || "";
  const po = row.querySelector("input[id^='PO#']")?.value || "";
  const notes = row.querySelector("input[id^='notes3']")?.value || "";
  formData.manualSubRows.push({ name, total, uofm, hours, services, siterep, po, notes });
});


  // 👇 NEW: Debug preview
  // console.log("🔍 Form data to be saved:", formData);
  // alert("✅ Form data logged to console for debug.\nOpen DevTools (F12 > Console) to view it.");


const today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0');
const yyyy = today.getFullYear();
const dateStr = `${mm}_${dd}_${yyyy}`;

const projectNumber = document.getElementById("projectNumberSelect")?.value?.trim().replace(/\s+/g, "_") || "####";
const supervisorFullName = document.getElementById("omhsupervisor")?.value?.trim() || "XX";
const nameParts = supervisorFullName.split(" ");
const initials = nameParts.map(part => part[0]?.toUpperCase()).join("").slice(0, 2) || "XX";

const defaultFilename = `${dateStr}_DFR_${initials}_DIG_${projectNumber}`;
const filename = prompt("Enter a filename to save:", defaultFilename);
if (!filename) return;

  const blob = new Blob([JSON.stringify(formData, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename + ".json";
  a.click();
}

function addManualManpowerRowsForRestore(data) {
  if (!Array.isArray(data.manualManpowerRows)) return;

  for (let i = 0; i < data.manualManpowerRows.length; i++) {
    document.getElementById("addManpowerRowBtn")?.click();
  }
}



function addManualEquipmentRowsForRestore(data) {
  const count = Object.keys(data)
    .filter(key => /^equipmentselect\d+$/.test(key) && parseInt(key.replace('equipmentselect','')) >= 16)
    .filter(key => data[key]?.trim() !== "").length;

  for (let i = 0; i < count; i++) {
    document.getElementById("addEquipmentRowBtn").click();
  }
}


function addManualSubcontractorRowsForRestore(data) {
  const ids = Object.keys(data)
    .filter(id => /^subcontractor\d+$/.test(id) && parseInt(id.replace('subcontractor','')) >= 16);
  for (let i = 0; i < ids.length; i++) {
    document.getElementById("addSubcontractorRowBtn").click();
  }
}


// --- Restore Function ---
function restoreForm(data) {
  // 🔥 Ensure rows are added before restoring values
  addManualManpowerRowsForRestore(data);
  addManualEquipmentRowsForRestore(data);
  addManualSubcontractorRowsForRestore(data);
  // 🔥 Ensure rows exist before restoring values
  if (data.manualManpowerRows && data.manualManpowerRows.length) {
   // const currentRows = document.querySelectorAll(".manpower-row.manual-row").length;
   // const neededRows = data.manualManpowerRows.length - currentRows;

   // for (let i = 0; i < neededRows; i++) {
     // document.getElementById("addManpowerRowBtn")?.click();
  //  }

    // 🧪 Log how many rows we're restoring into
    const manualRows = document.querySelectorAll(".manpower-row.manual-row");
    console.log("🔁 Restoring manual rows:", manualRows.length);

    data.manualManpowerRows.forEach((rowData, idx) => {
      const row = manualRows[idx];
      if (!row) {
        console.warn(`⚠️ No row found for index ${idx}`);
        return;
      }

     const mp = row.querySelector(`input[id^='manpowerselect']`);
const cl = row.querySelector(`input[id^='classificationselect']`);
const loa = row.querySelector(`input[type='checkbox']`);
const notesInput = row.querySelector(`input[id^='manualnotes']`);

const hourInputs = row.querySelectorAll(".hour-input");

console.log(`🧪 Row ${idx + 1} restore:`, { mp, cl, loa, notes: rowData.notes, hours: rowData.hours });

if (mp) mp.value = rowData.manpower || "";
if (cl) cl.value = rowData.classification || "";
if (loa) loa.checked = !!rowData.loa;
if (notesInput) {
  notesInput.value = rowData.notes || "";
  console.log(`✅ Restored note value: "${notesInput.value}" for row ${idx + 1}`);
} else {
  console.warn(`❌ Could not find notes input for row ${idx + 1}`);
}


      rowData.hours?.forEach((val, i) => {
        if (hourInputs[i]) {
          hourInputs[i].value = val || "";
        }
      });
    });
  }




  //addManualEquipmentRowsForRestore(data);
  

  // 🔁 Continue with rest of your restoreForm logic...
  document.querySelectorAll("input, select, textarea").forEach(el => {
    if (el.id && data.hasOwnProperty(el.id)) {
      if (el.type === "checkbox") {
        el.checked = data[el.id];
      } else {
        el.value = data[el.id];
      }
    }
  });

  

  // (Any custom restore logic here, e.g., for Tom Select dro

// 🔥 RESTORE: Manual Equipment Rows
if (data.manualEquipmentRows && data.manualEquipmentRows.length) {
 // data.manualEquipmentRows.forEach(() => {
   // document.getElementById("addEquipmentRowBtn").click();
 // });

  // 🕒 Delay to ensure TomSelect is applied
setTimeout(() => {
  const manualEquipRows = document.querySelectorAll(".equipment-row.manual-row");
  data.manualEquipmentRows.forEach((rowData, idx) => {
    const row = manualEquipRows[idx];
    if (!row) return;

    const uofm = row.querySelector('select[id^="uofm"]');
    if (uofm?.tomselect) {
      uofm.tomselect.setValue(rowData.uofm || "");
    }
  });
}, 100); // Adjust timing if needed


  const manualEquipRows = document.querySelectorAll(".equipment-row.manual-row");

  data.manualEquipmentRows.forEach((rowData, idx) => {
    const row = manualEquipRows[idx];
    if (!row) return;

    const equipment = row.querySelector("input[id^='equipmentselect']");
    const total = row.querySelector(".equipment-total");
    const uofm = row.querySelector('select[id^="uofm"]');
if (uofm) {
  if (uofm.tomselect) {
    uofm.tomselect.setValue(rowData.uofm || "");
  } else {
    uofm.value = rowData.uofm || "";
  }
}

    const po = row.querySelector("input[id^='po']");
    const notes = row.querySelector("input[id^='notesEquip']");
    const hourInputs = row.querySelectorAll(".hour-input");

    if (equipment) equipment.value = rowData.equipment || "";
    if (total) total.value = rowData.total || "";
    if (uofm) uofm.value = rowData.uofm || "";
    if (po) po.value = rowData.po || "";
    if (notes) notes.value = rowData.notes || "";

    rowData.hours?.forEach((val, i) => {
      if (hourInputs[i]) hourInputs[i].value = val || "";
    });
  });
}


// 🔥 RESTORE: Manual Subcontractor Rows
if (data.manualSubRows && data.manualSubRows.length) {
  data.manualSubRows.forEach(() => {
    document.getElementById("addSubcontractorRowBtn").click();
 });
  const manualSubRows = document.querySelectorAll(".subcontractor-row.manual-row");
  data.manualSubRows.forEach((rowData, idx) => {
    const row = manualSubRows[idx];
    if (row) {
      row.querySelector("input.subcontractorName-input").value = rowData.name;
      row.querySelector(".sub-total-field").value = rowData.total;
      row.querySelector("select.UofMSelect").value = rowData.uofm;
      row.querySelectorAll(".sub-hour-input").forEach((input, i) => {
        input.value = rowData.hours[i] || "";
      });
      row.querySelector("input[id^='services']").value = rowData.services || "";
      row.querySelector("input[id^='siterep']").value = rowData.siterep || "";
      row.querySelector("input[id^='PO#']").value = rowData.po || "";
      const notes = row.querySelector("input[id^='manualsubnotes']");
if (notes) notes.value = rowData.notes || "";

    }
  });
}

const skipIds = new Set();
data.manualManpowerRows?.forEach((rowData, i) => {
  skipIds.add(`notes${16 + i}`);
  skipIds.add(`manpowerselect${16 + i}`);
  skipIds.add(`classificationselect${16 + i}`);
  skipIds.add(`checkbox${16 + i}`);
});

Object.keys(data).forEach(id => {
  if (["photos", "manpowerHours", "equipmentHours", "subcontractorHours"].includes(id)) return;
  if (skipIds.has(id)) return; // 🔥 skip already handled manual rows

  const el = document.getElementById(id);
  if (el) {
    if (el.type === "checkbox") {
      el.checked = data[id];
    } else {
      if (el.tomselect) {
        el.tomselect.setValue(data[id]);
      } else {
        el.value = data[id];
      }
    }

    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  }
});


Object.keys(data).forEach(id => {
  if (["photos", "manpowerHours", "equipmentHours", "subcontractorHours"].includes(id)) return;

  const el = document.getElementById(id);
  if (el) {
    if (el.type === "checkbox") {
      el.checked = data[id];
    } else {
      if (el.tomselect) {
        el.tomselect.setValue(data[id]);  // ✅ Tom Select dropdowns
      } else {
        el.value = data[id];              // ✅ Regular inputs/selects
      }
    }

    // ✅ Fire change/input events for any linked logic (totals, activity text, etc.)
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  }
});


  data.manpowerHours?.forEach((val, i) => {
  const input = document.querySelectorAll(".hour-cell input")[i];
  if (input) {
    input.value = val;
    input.dispatchEvent(new Event("input", { bubbles: true })); // 🔥 force total-field to recalculate
  }
});

data.equipmentHours?.forEach((val, i) => {
  const input = document.querySelectorAll(".equip-hour-cell input")[i];
  if (input) {
    input.value = val;
    input.dispatchEvent(new Event("input", { bubbles: true })); // 🔥 force recalculation
  }
});

data.subcontractorHours?.forEach((val, i) => {
  const input = document.querySelectorAll(".sub-hour-cell input")[i];
  if (input) {
    input.value = val;
    input.dispatchEvent(new Event("input", { bubbles: true })); // 🔥 force recalculation
  }
});


  if (data.photos) {
    document.querySelectorAll(".photo-cell").forEach((cell, index) => {
      const src = data.photos[`photo${index}`];
      if (src) {
        const img = document.createElement("img");
        img.src = src;

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "✖";
        removeBtn.className = "remove-btn";
        removeBtn.addEventListener("click", event => {
          event.stopPropagation();
          cell.classList.remove("has-image");
          cell.innerHTML = "";

          // 🔥 AUTOSAVE after photo is removed
  autoSaveFormToCache();
        });

        cell.innerHTML = "";
        cell.classList.add("has-image");
        cell.appendChild(img);
        cell.appendChild(removeBtn);
      }
    });
  }

  // 🔥 Restore photo descriptions
if (data.photoCaptions) {
  document.querySelectorAll(".photo-description").forEach((input, index) => {
    input.value = data.photoCaptions[`caption${index}`] || "";
  });
}


 // 🔥 Restore signature canvases
document.querySelectorAll(".signature-canvas").forEach((canvas, index) => {
  const key = `signatureCanvas${index}`;
  const base64 = data[key];
  if (base64) {

    // 🔥 Ensure correct canvas size before restoring
    canvas.width = canvas.offsetWidth || 400;
    canvas.height = canvas.offsetHeight || 120;

    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.style.display = "block";
      canvas.parentElement.querySelector(".text-entry").style.display = "none";
      const controls = canvas.parentElement.querySelector(".signature-controls");
      if (controls) controls.style.display = "none";
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src = base64;
  }
});


  console.log("✅ Form restored.");
}

// --- Autosave Logic ---
function autoSaveFormToCache() {
  const data = {};
  document.querySelectorAll("input, select, textarea").forEach(el => {
    if (el.id) {
      if (el.type === "checkbox") data[el.id] = el.checked;
      else data[el.id] = el.value;
    }
  });
  localStorage.setItem("autosavedDFR", JSON.stringify(data));
  sessionStorage.setItem("autosavedDFR", JSON.stringify(data));


// 🔥 Save signature canvases for autosave
document.querySelectorAll(".signature-canvas").forEach((canvas, index) => {
  if (!canvas) return;
  const key = `signatureCanvas${index}`;
  const ctx = canvas.getContext("2d");
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const isBlank = imageData.data.every(v => v === 0);
  if (!isBlank) {
    data[key] = canvas.toDataURL("image/png");  // ✅ Correct variable
  }
});


// 🔥 Save photos for autosave
data.photos = {};
document.querySelectorAll(".photo-cell").forEach((cell, index) => {
  const img = cell.querySelector("img");
  if (img) {
    data.photos[`photo${index}`] = img.src;
  }
});

// 🔥 Save photo descriptions
data.photoCaptions = {};
document.querySelectorAll(".photo-description").forEach((input, index) => {
  data.photoCaptions[`caption${index}`] = input.value;
});


  data.manpowerHours = Array.from(document.querySelectorAll(".hour-cell input")).map(i => i.value);
  data.equipmentHours = Array.from(document.querySelectorAll(".equip-hour-cell input")).map(i => i.value);
  data.subcontractorHours = Array.from(document.querySelectorAll(".sub-hour-cell input")).map(i => i.value);

 // 🔥 NEW: Save Manual Manpower Rows
data.manualManpowerRows = [];
document.querySelectorAll(".manpower-row.manual-row").forEach((row, idx) => {
  const manpower = row.querySelector("input[id^='manpowerselect']")?.value || "";
  const classification = row.querySelector("input[id^='classificationselect']")?.value || "";
  const loa = row.querySelector("input[type='checkbox']")?.checked || false;
  const notes = row.querySelector("input[id^='manualnotes']")?.value || "";


  const hours = Array.from(row.querySelectorAll(".hour-input")).map(input => input.value || "");

  data.manualManpowerRows.push({ manpower, classification, loa, hours, notes });
});



// 🔥 NEW: Save Manual Equipment Rows
data.manualEquipmentRows = [];
document.querySelectorAll(".equipment-row.manual-row").forEach(row => {
  data.manualEquipmentRows.push({
    equipment: row.querySelector("input[id^='equipmentselect']")?.value || "",
    total: row.querySelector(".equipment-total")?.value || "",
      uofm: row.querySelector("select[id^='uofm']")?.value || "",


    hours: Array.from(row.querySelectorAll(".hour-input")).map(input => input.value || ""),
    po: row.querySelector("input[id^='po']")?.value || "",
    notes: row.querySelector("input[id^='notesEquip']")?.value || ""
  });
});

// 🔥 NEW: Save Manual Subcontractor Rows
data.manualSubRows = [];
document.querySelectorAll(".subcontractor-row.manual-row").forEach(row => {
  data.manualSubRows.push({
    name: row.querySelector("input.subcontractorName-input")?.value || "",
    total: row.querySelector(".sub-total-field")?.value || "",
    uofm: row.querySelector("select.UofMSelect")?.value || "",
    hours: Array.from(row.querySelectorAll(".sub-hour-input")).map(input => input.value || ""),
    services: row.querySelector("input[id^='services']")?.value || "",
    siterep: row.querySelector("input[id^='siterep']")?.value || "",
    po: row.querySelector("input[id^='PO#']")?.value || "",
    notes: row.querySelector("input[id^='manualsubnotes']")?.value || ""

  });
});


const jsonData = JSON.stringify(data);
localStorage.setItem("autosavedDFR", jsonData);
sessionStorage.setItem("autosavedDFR", jsonData);

}

function attachAutosaveListeners() {
  document.querySelectorAll("input, textarea, select").forEach(el => {
    el.addEventListener("input", autoSaveFormToCache);
    el.addEventListener("change", autoSaveFormToCache);
  });
}

function handleLoadFromFile() {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = e => {
    try {
      const data = JSON.parse(e.target.result);
      restoreForm(data);
    } catch (err) {
      alert("❌ Could not load form. Make sure it's a valid .json file.");
    }
  };
  reader.readAsText(file);
}

document.addEventListener("DOMContentLoaded", () => {
  loadLists().then(() => {
    attachAutosaveListeners();

  const clientProjectDropdown = document.getElementById("clientProjectNumberSelect");
if (clientProjectDropdown) {
  clientProjectDropdown.addEventListener("change", () => {
    // your logic here...
  });
}


  const selectedCWP = document.getElementById("clientProjectNumberSelect").value;
  const projects = projectNumberMap[selectedCWP] || [];

const ts = projectNumberSelect.tomselect;
ts.clearOptions();
ts.addOption({ value: "", text: "Select..." });
projects.forEach(pn => {
  ts.addOption({ value: pn, text: pn });
});
ts.refreshOptions(false);
ts.setValue("");

});




    // ✅ Save
    document.getElementById("saveFormBtn")?.addEventListener("click", saveForm);

    // ✅ Reset existing input and attach change handler ONCE
    const loadInput = document.getElementById("loadInput");
    const newInput = loadInput.cloneNode(true);
    loadInput.replaceWith(newInput);

    newInput.addEventListener("change", handleLoadFromFile);

    // ✅ Load button click triggers ONLY ONE file input
    document.getElementById("loadFormBtn").addEventListener("click", () => {
      newInput.value = ""; // reset to allow same file to be reselected
      newInput.click();
    });

    // ✅ Restore autosaved form
    const cached = sessionStorage.getItem("autosavedDFR") || localStorage.getItem("autosavedDFR");
if (cached) {
  try {
    const data = JSON.parse(cached);
    setTimeout(() => {
  restoreForm(data);
  // Wait another tick to ensure TomSelect is ready
  setTimeout(() => autoSaveFormToCache(), 50);
}, 250);


  } catch (err) {
    console.warn("⚠️ Failed to restore autosaved form:", err);
  }
}


  });


document.getElementById("resetFormBtn")?.addEventListener("click", () => {
  const confirmReset = confirm("Are you sure you want to clear the form and reset everything?");
  if (!confirmReset) return;

  // 🔥 Remove cache first for speed
  localStorage.removeItem("autosavedDFR");
  sessionStorage.removeItem("autosavedDFR");

  // Clear all input, textarea, select fields (no extra events)
  document.querySelectorAll("input, textarea, select").forEach(el => {
    if (el.type === "checkbox") {
      el.checked = false;
    } else {
      el.value = "";
    }
  });

  // Clear Tom Select visible values
  document.querySelectorAll("select").forEach(select => {
    if (select.tomselect) {
      select.tomselect.clear();
    }
  });

  // Clear dynamic totals
  document.querySelectorAll(".total-field, .equipment-total, .sub-total-field").forEach(input => {
    input.value = "";
  });

  // Clear all photo cells and file inputs
  document.querySelectorAll(".photo-cell").forEach(cell => {
    cell.classList.remove("has-image");
    cell.innerHTML = "";
    const fileInput = cell.querySelector("input[type='file']");
    if (fileInput) fileInput.value = "";
  });
  // Also clear any photo captions/desc fields if you use them:
  document.querySelectorAll(".photo-caption-input").forEach(input => input.value = "");

  // Remove all manual/dynamic rows (if you use .manual-row class)
  document.querySelectorAll(".manual-row").forEach(row => row.remove());

  // Clear signature canvases
  document.querySelectorAll(".signature-canvas").forEach(canvas => {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.style.display = "none";
  });

  // Reset signature areas back to text entry
  document.querySelectorAll(".signature-area").forEach(area => {
    const textarea = area.querySelector(".text-entry");
    const controls = area.querySelector(".signature-controls");
    if (textarea) textarea.style.display = "block";
    if (controls) controls.style.display = "none";
  });

  alert("🧼 Form reset and autosave cache cleared.");
});


// --- PDF Export ---
document.getElementById("exportPdfBtn")?.addEventListener("click", async () => {
  const element = document.querySelector(".canvas");

  // Scroll to top to avoid offset capture
  window.scrollTo(0, 0);

// ✅ Before rendering the canvas for PDF, copy TomSelect values into static spans
document.querySelectorAll('.ts-control').forEach(el => {
  const selectedText = el.textContent?.trim();
  el.setAttribute("data-print-text", selectedText || "—");
  el.style.background = "none";
  el.style.border = "none";
  el.style.boxShadow = "none";
});


// 🔧 Optional: Style with ::after content via print CSS

const replacements = [];

document.querySelectorAll("select").forEach(select => {
  if (!select.tomselect) return;

  const wrapper = select.closest(".ts-wrapper");
  const selectedText = select.tomselect.getItem(select.value)?.textContent?.trim();
  const displayText = selectedText || "Select...";

  if (wrapper) {
    wrapper.style.position = "relative";
    const span = document.createElement("span");
    span.className = "print-only";
    span.textContent = displayText;
  span.style.cssText = `
  position: absolute;
  top: 0;
  left: 0;
  font-size: 12px;
  font-family: inherit;
  color: black;
  background: white;
  padding: 0 6px;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  border: none;
  z-index: 999;
  pointer-events: none;
`;


    wrapper.appendChild(span);
    replacements.push(span);
  }
});

document.querySelectorAll("select").forEach(select => {
  if (!select.tomselect) return;

  const tsControl = select.closest(".ts-wrapper")?.querySelector(".ts-control");
  const selectedText = select.tomselect.getItem(select.value)?.textContent?.trim();

  // If nothing selected, manually inject visible placeholder
  if (!selectedText && tsControl && !tsControl.querySelector(".pdf-placeholder")) {
    const placeholder = document.createElement("div");
    placeholder.textContent = "Select...";
    placeholder.className = "pdf-placeholder";
    placeholder.style.cssText = `
      color: #999;
      font-size: 13px;
      padding-left: 6px;
    `;
    tsControl.appendChild(placeholder);
  }
});



  // Render the canvas from the visible form
  const canvas = await html2canvas(element, {
  scale: 3,
  useCORS: true,
  backgroundColor: "#ffffff", // force white background
  allowTaint: false,
  logging: false,
  removeContainer: true
});

  const imgData = canvas.toDataURL('image/jpeg', 1.0);

  // Convert canvas size to inches for jsPDF
  const pxPerInch = 96;
  const widthInInches = canvas.width / pxPerInch;
  const heightInInches = canvas.height / pxPerInch;

  // ✅ HERE is where your block goes
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'in',
    format: [widthInInches, heightInInches]
  });
  
  // Add the image to the PDF
  pdf.addImage(imgData, 'JPEG', 0, 0, widthInInches, heightInInches);

  // Generate dynamic filename
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const dateStr = `${yyyy}${mm}${dd}`;

  // 🔍 Extract project number
  const projectNumber = document.getElementById("projectNumberSelect")?.value?.trim().replace(/\s+/g, "_") || "####";

  // 🔍 Extract initials from OMH Supervisor input
  const supervisorFullName = document.getElementById("omhsupervisor")?.value?.trim() || "XX";
  const nameParts = supervisorFullName.split(" ");
  const initials = nameParts.map(part => part[0]?.toUpperCase()).join("").slice(0, 2) || "XX";

  // ✅ Final filename
  const filename = `DFR_${initials}_DIG_${projectNumber}_${dateStr}.pdf`;


  pdf.save(filename);
  document.querySelectorAll(".pdf-placeholder").forEach(el => el.remove());

  replacements.forEach(span => span.remove());

  document.querySelectorAll(".print-only").forEach(el => el.remove());

});

// --- Email PDF ---
// Note: This will not attach the PDF directly due to browser security limitations
// It will open the email client with a pre-filled subject and body
// and the PDF will be saved in memory
  document.getElementById("emailPdfBtn")?.addEventListener("click", () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const dateStr = `${yyyy}${mm}${dd}`;

  const projectNumber = document.getElementById("projectNumberSelect")?.value?.trim().replace(/\s+/g, "_") || "####";
  const supervisorFullName = document.getElementById("omhsupervisor")?.value?.trim() || "XX";
  const nameParts = supervisorFullName.split(" ");
  const initials = nameParts.map(part => part[0]?.toUpperCase()).join("").slice(0, 2) || "XX";

  const filename = `DFR_${initials}_DIG_${projectNumber}_${dateStr}`;

  const recipients = [
    "tyler.anderson@ogilviemtn.ca",
    "del.james@ogilviemtn.ca",
    "jeremy.fossum@ogilviemtn.ca",
    "alexandra.klimchuk@ogilviemtn.ca"
  ].join(",");

  const mailtoLink = `mailto:${recipients}?subject=${encodeURIComponent(filename)}&body=${encodeURIComponent(`Please find the Daily Field Report attached.\n\nFiles:\n- ${filename}.pdf\n- ${filename}.json`)}`;

  alert(`📧 You're about to open your email app.

Before proceeding, make sure you've already:
✅ Clicked **Export to PDF**
✅ Clicked **Save Form** (JSON)

📂 You can find the files in the **Files** app > **Downloads**.

Then attach:
📎 ${filename}.pdf
📎 ${filename}.json`);

  // Open email client
  window.location.href = mailtoLink;
});

// --- Add Manual Manpower Row ---
let extraManpowerCount = 15;

document.getElementById("addManpowerRowBtn")?.addEventListener("click", () => {
  extraManpowerCount++;

  function addManualManpowerRowsForRestore(data) {
  const manualKeys = Object.keys(data)
    .filter(key => /^notes\d+$/.test(key) && +key.replace("notes","") > 15);
  manualKeys.forEach(() => {
    document.getElementById("addManpowerRowBtn")?.click();
  });
}

  const row = document.createElement("tr");
  row.classList.add("manpower-row", "manual-row");

  row.innerHTML = `
    <td><input type="text" id="manpowerselect${extraManpowerCount}" class="manual-input" /></td>
    <td><input type="text" id="classificationselect${extraManpowerCount}" class="manual-input" /></td>
    <td class="total-cell"><input type="number" value="0.00" readonly class="total-field" /></td>
    <td class="center-checkbox"><input type="checkbox" id="checkbox${extraManpowerCount}" /></td>
    ${[...Array(6)].map(() => `<td class="hour-cell"><input type="number" class="hour-input" step="0.5" min="0" /></td>`).join("")}
    <td style="position: relative;">
    <input type="text" id="manualnotes${extraManpowerCount - 15}" class="manual-notes-input" style="padding-right: 30px;" />

    <button class="remove-btn" title="Remove Row" style="position: absolute; top: 4px; right: 4px;">🗑</button>
    </td>
  `;

  const addRowTr = document.getElementById("addManpowerRowBtn")?.closest("tr");
  if (addRowTr && addRowTr.parentNode) {
    addRowTr.parentNode.insertBefore(row, addRowTr);
  }

  // ✅ Remove button logic
  row.querySelector(".remove-btn")?.addEventListener("click", () => {
    row.remove();
    updateGrandTotalHours();
    autoSaveFormToCache();
  });

 // 🧮 Hour total calculation logic
const hourInputs = row.querySelectorAll(".hour-input");
const totalField = row.querySelector(".total-field");

hourInputs.forEach(input => {
  input.addEventListener("input", () => {
    let sum = 0;
    hourInputs.forEach(i => {
      const val = parseFloat(i.value);
      if (!isNaN(val)) sum += val;
    });
    totalField.value = sum.toFixed(2);
    updateGrandTotalHours();
  });

  input.addEventListener("blur", () => {
    const val = parseFloat(input.value);
    if (!isNaN(val)) input.value = val.toFixed(2);
  });
});

// 💾 Autosave for all new fields
row.querySelectorAll("input, textarea, select").forEach(el => {
  el.addEventListener("input", autoSaveFormToCache);
  el.addEventListener("change", autoSaveFormToCache);
});

autoSaveFormToCache();
});


// --- Add Manual Equipment Row ---
let extraEquipCount = 15;

document.getElementById("addEquipmentRowBtn")?.addEventListener("click", () => {
  extraEquipCount++;

  const row = document.createElement("tr");
  row.classList.add("equipment-row", "manual-row");

  row.innerHTML = `
    <td><input type="text" id="equipmentselect${extraEquipCount}" /></td>
    <td class="equipment-total-cell"><input type="number" value="0.00" readonly class="total-field equipment-total" /></td>
    <td>
  <select class="UofMSelect" id="uofm${extraEquipCount}">
    <option>Select...</option>
    ${listData.UofM?.map(unit => `<option value="${unit}">${unit}</option>`).join("")}
  </select>
</td>

    ${[...Array(6)].map(() => `<td class="equip-hour-cell"><input type="number" class="hour-input" step="0.5" min="0" /></td>`).join("")}
    <td><input type="text" id="po${extraEquipCount}" /></td>
    <td style="position: relative;">
      <input type="text" id="notesEquip${extraEquipCount}" style="padding-right: 30px;" />
      <button class="remove-btn" title="Remove Row" style="position: absolute; top: 4px; right: 4px;">🗑</button>
    </td>
  `;

  const addRowTr = document.getElementById("addEquipmentRowBtn")?.closest("tr");
  if (addRowTr && addRowTr.parentNode) {
    addRowTr.parentNode.insertBefore(row, addRowTr);
  }

  const newUofM = row.querySelector("select.UofMSelect");
if (newUofM) {
  new TomSelect(newUofM, {
    create: false,
    sortField: { field: "text", direction: "asc" }
  });
}


  // ✅ Attach remove logic to the embedded button
  row.querySelector(".remove-btn")?.addEventListener("click", () => {
    row.remove();
    updateEquipmentGrandTotal();
  });

  // ✅ Attach hour input logic for new row
  const hourInputs = row.querySelectorAll(".equip-hour-cell input");
  const totalField = row.querySelector(".total-field");

  hourInputs.forEach(input => {
    input.addEventListener("input", () => {
      let sum = 0;
      hourInputs.forEach(i => {
        const val = parseFloat(i.value);
        if (!isNaN(val)) sum += val;
      });
      totalField.value = sum.toFixed(2);
      updateEquipmentGrandTotal();
    });

    input.addEventListener("blur", () => {
      const val = parseFloat(input.value);
      if (!isNaN(val)) input.value = val.toFixed(2);
    });
  });

    // 🔥 Attach autosave to all new fields in this row:
row.querySelectorAll("input, textarea, select").forEach(el => {
  el.addEventListener("input", autoSaveFormToCache);
  el.addEventListener("change", autoSaveFormToCache);
});

autoSaveFormToCache();
});



// --- Add Manual Subcontractor Row ---
let extraSubCount = 5;

document.getElementById("addSubcontractorRowBtn")?.addEventListener("click", () => {
  extraSubCount++;
  const row = document.createElement("tr");
  row.classList.add("subcontractor-row", "manual-row");

  row.innerHTML = `
  <td><input type="text" class="subcontractorName-input" id="subcontractor${extraSubCount}" /></td>
  <td><input type="number" class="subs-total sub-total-field" value="0.00" readonly /></td>
  <td>
    <select class="UofMSelect uofm-select" id="uofm${15 + extraSubCount}">
      <option>Select...</option>
      ${listData.UofM?.map(unit => `<option value="${unit}">${unit}</option>`).join("")}
    </select>
  </td>
  ${[...Array(6)].map(() =>
    `<td class="sub-hour-cell"><input type="number" class="sub-hour-input" step="0.5" min="0" /></td>`
  ).join("")}
  <td><input type="text" id="services${extraSubCount}" /></td>
  <td><input type="text" id="siterep${extraSubCount}" /></td>
  <td><input type="text" id="PO#${extraSubCount}" /></td>
  <td style="position: relative;">
 <input type="text" id="manualsubnotes${extraSubCount}" style="padding-right: 30px;" />

  <button class="remove-btn" title="Remove Row" style="position: absolute; top: 4px; right: 4px;">🗑</button>
</td>
`;


  const addRowTr = document.getElementById("addSubcontractorRowBtn")?.closest("tr");
  if (addRowTr && addRowTr.parentNode) {
    addRowTr.parentNode.insertBefore(row, addRowTr);
  }

     // 🔧 Wire up remove button
row.querySelector(".remove-btn")?.addEventListener("click", () => {
  row.remove();
  updateSubcontractorGrandTotal();
});

  // Re-apply Tom Select to UofM dropdown
  const newUofM = row.querySelector("select.UofMSelect");
  if (newUofM) {
    new TomSelect(newUofM, {
      create: false,
      sortField: {
        field: "text",
        direction: "asc"
      }
    });
  }

  // Attach input events to recalculate totals
  const hourInputs = row.querySelectorAll(".sub-hour-input");
  const totalField = row.querySelector(".sub-total-field");

  hourInputs.forEach(input => {
    input.addEventListener("input", () => {
      let sum = 0;
      hourInputs.forEach(i => {
        const val = parseFloat(i.value);
        if (!isNaN(val)) sum += val;
      });
      totalField.value = sum.toFixed(2);
      updateSubcontractorGrandTotal();
    });

    input.addEventListener("blur", () => {
      const val = parseFloat(input.value);
      if (!isNaN(val)) input.value = val.toFixed(2);
    });
  });

    // 🔥 Attach autosave to all new fields in this row:
row.querySelectorAll("input, textarea, select").forEach(el => {
  el.addEventListener("input", autoSaveFormToCache);
  el.addEventListener("change", autoSaveFormToCache);
});

  autoSaveFormToCache();
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../service-worker.js').then(registration => {
    registration.onupdatefound = () => {
      const newWorker = registration.installing;
      newWorker.onstatechange = () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          const shouldReload = confirm("🚨 A new version of the DFR app is available. Click OK to update now.");
          if (shouldReload) {
            newWorker.postMessage('SKIP_WAITING');
          }
        }
      };
    };
  });

  // Ensure page reloads after new worker takes over
  let refreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing) return;
    window.location.reload();
    refreshing = true;
  });
}

 




