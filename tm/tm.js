// ✅ Cleaned and fixed script with working autosave and form restore

let scopeRowCount = 0;
let crewRowCount = 0;
let equipmentRowCount = 0;
let data = null;

let scopeBody, crewBody, equipmentBody;

function getCachedRowCount(prefix) {
  const saved = localStorage.getItem("tm_autosave");
  if (!saved) return 5;

  const data = JSON.parse(saved);
  let count = 0;
  for (const key in data) {
    if (key.startsWith(prefix)) {
      const match = key.match(/\d+$/);
      const val = data[key];
      if (match && val && val !== "") {
        const num = parseInt(match[0]);
        if (num > count) count = num;
      }
    }
  }
  return Math.max(count, 5);
}


function wrapCell(content, center = false) {
  const td = document.createElement("td");
  if (center) td.style.textAlign = "center";
  td.appendChild(content);
  return td;
}

function createDropdown(options) {
  const select = document.createElement("select");
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Select...";
  select.appendChild(defaultOption);
  options.forEach(opt => {
    const option = document.createElement("option");
    option.value = opt;
    option.textContent = opt;
    select.appendChild(option);
  });
  return select;
}

function addScopeRow() {
  scopeRowCount++;
  const row = document.createElement("tr");

  const idInput = document.createElement("input");
  idInput.type = "text";
  idInput.readOnly = true;
  idInput.id = `scopeId${scopeRowCount}`;

  const descSelect = document.createElement("select");
  descSelect.id = `scopeDesc${scopeRowCount}`;
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Select...";
  descSelect.appendChild(defaultOption);
  scopeItems.forEach(opt => {
    const option = document.createElement("option");
    option.value = opt.desc;
    option.textContent = opt.desc;
    descSelect.appendChild(option);
  });

  const unitCell = document.createElement("td");
  unitCell.id = `scopeUnit${scopeRowCount}`;
  unitCell.textContent = "";

  const qtyInput = document.createElement("input");
  qtyInput.type = "number";
  qtyInput.step = "0.01";
  qtyInput.min = "0";
  qtyInput.style.width = "70px";
  qtyInput.id = `scopeQty${scopeRowCount}`;

  const commentInput = document.createElement("input");
  commentInput.type = "text";
  commentInput.id = `scopeComment${scopeRowCount}`;

  descSelect.addEventListener("change", () => {
    const selected = scopeItems.find(s => s.desc === descSelect.value);
    if (selected) {
      idInput.value = selected.id;
      unitCell.textContent = selected.unit;
    } else {
      idInput.value = "";
      unitCell.textContent = "";
    }
  });

  row.appendChild(wrapCell(idInput));
  row.appendChild(wrapCell(descSelect));
  row.appendChild(unitCell);
  row.appendChild(wrapCell(qtyInput));
  row.appendChild(wrapCell(commentInput));

  scopeBody.appendChild(row);
}

function addEquipmentRow() {
  equipmentRowCount++;
  const row = document.createElement("tr");

  const unitSelect = document.createElement("select");
  unitSelect.id = `equipmentUnit${equipmentRowCount}`;
  unitSelect.innerHTML = `<option value="">Select...</option>`;
  equipmentList.forEach(item => {
    const opt = document.createElement("option");
    opt.value = item.unit;
    opt.textContent = item.unit;
    unitSelect.appendChild(opt);
  });

  const descInput = document.createElement("input");
  descInput.type = "text";
  descInput.readOnly = true;
  descInput.id = `equipmentDesc${equipmentRowCount}`;

  unitSelect.addEventListener("change", () => {
    const selected = equipmentList.find(e => e.unit === unitSelect.value);
    descInput.value = selected ? selected.desc : "";
  });

  const unitDropdown = document.createElement("select");
  unitDropdown.id = `equipmentUnitType${equipmentRowCount}`;
  ["Hourly", "Daily"].forEach(val => {
    const opt = document.createElement("option");
    opt.value = val;
    opt.textContent = val;
    unitDropdown.appendChild(opt);
  });

  const totalInput = document.createElement("input");
  totalInput.type = "number";
  totalInput.step = "0.5";
  totalInput.min = "0";
  totalInput.style.width = "70px";
  totalInput.id = `equipmentTotal${equipmentRowCount}`;

  const notesInput = document.createElement("input");
  notesInput.type = "text";
  notesInput.id = `equipmentNotes${equipmentRowCount}`;

  row.appendChild(wrapCell(unitSelect));
  row.appendChild(wrapCell(descInput));
  row.appendChild(wrapCell(unitDropdown));
  row.appendChild(wrapCell(totalInput));
  row.appendChild(wrapCell(notesInput));

  equipmentBody.appendChild(row);
}

// 🔄 DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  scopeBody = document.getElementById("scopeBody");
  crewBody = document.getElementById("crewBody");
  equipmentBody = document.getElementById("equipmentBody");

  setupSignatureCanvas("contractorSig", false);
setupSignatureCanvas("clientSig", false);


  const saved = localStorage.getItem("tm_autosave");
  data = saved ? JSON.parse(saved) : null;

  const maxScope = getCachedRowCount("scopeId");
  const maxCrew = getCachedRowCount("crewClass");
  const maxEquip = getCachedRowCount("equipmentUnit");

  for (let i = 0; i < maxScope; i++) addScopeRow();
  for (let i = 0; i < maxCrew; i++) addCrewRow();
  for (let i = 0; i < maxEquip; i++) addEquipmentRow();

  if (data) setFormData(data);

  // Bind buttons...
});


  document.getElementById("addScopeRow")?.addEventListener("click", addScopeRow);
  document.getElementById("removeScopeRow")?.addEventListener("click", () => {
    const rows = scopeBody.querySelectorAll("tr");
    if (rows.length > 5) {
      rows[rows.length - 1].remove();
      scopeRowCount--;
    } else {
      alert("At least 5 scope rows must remain.");
    }
  });

  document.getElementById("addCrewRow")?.addEventListener("click", addCrewRow);
  document.getElementById("removeCrewRow")?.addEventListener("click", () => {
    const rows = crewBody.querySelectorAll("tr");
    if (rows.length > 5) {
      rows[rows.length - 1].remove();
      crewRowCount--;
    } else {
      alert("At least 5 crew rows must remain.");
    }
  });

  document.getElementById("addEquipmentBtn")?.addEventListener("click", addEquipmentRow);
  document.getElementById("removeEquipmentBtn")?.addEventListener("click", () => {
    if (equipmentRowCount > 5) {
      equipmentBody.removeChild(equipmentBody.lastElementChild);
      equipmentRowCount--;
    } else {
      alert("At least 5 equipment rows must remain.");
    }
  });

  const scopeItems = [
    { id: "2.1", desc: "FP Base", unit: "<=1m" },
    { id: "2.1", desc: "VP Base", unit: ">1m" },
    { id: "2.2.1.5", desc: "Additional Trucking (Semi)", unit: "/truck km" },
    { id: "2.2.4.1", desc: "Hydrovac Removed – Temperate", unit: "/m³" },
    { id: "2.2.4.3", desc: "Hand Dug – Temperate", unit: "/m³" },
    { id: "2.2.5.1", desc: "Additional Water Management", unit: "/pump day" },
    { id: "2.2.5.4", desc: "Fire Suppression (GTM CAD)", unit: "/site" },
    { id: "2.2.6.1", desc: "Additional Soil Handling", unit: "/m³" },
    { id: "2.2.6.2", desc: "Rock Excavation", unit: "/m³" },
    { id: "2.2.6.3", desc: "Shoring - Box Assembly", unit: "/box" },
    { id: "2.2.6.4", desc: "Shoring - Install/Removal", unit: "/box" },
    { id: "2.2.6.5", desc: "Shoring - Box Usage", unit: "/box day" },
    { id: "2.2.6.6", desc: "Extra Depth of Cover", unit: "" },
    { id: "2.2.7.1", desc: "Coating Removal & Blasting", unit: "/m²" },
    { id: "2.2.7.3", desc: "Rock Coating Removal", unit: "/m²" },
    { id: "2.2.8.1.1", desc: "Site Support – Temperate", unit: "/half day" },
    { id: "2.2.10.1", desc: "Coating Epoxy – Hand", unit: "/m²" },
    { id: "2.2.10.3", desc: "Coating Rock Shield", unit: "/m²" }
  ];

  const digIds = [
    "10435", "10563", "10683", "10766", "10773", "10913", "11138", "11284",
    "6959", "6960", "6976", "6978", "6979", "6980", "6981", "6983",
    "6984", "6985", "6986", "6987", "6988", "6995", "7039", "7048",
    "7049", "7104", "7105", "7106", "7107", "7108", "7175", "7176", "7177",
    "10441", "11210", "11211", "11212", "11213", "11214", "11215",
    "11256", "11257", "11258", "11259", "5938", "5940", "6017",
    "6501", "6502", "6503", "7003", "7005", "7007", "7009", "7010",
    "Pending CR", "All Digs - Abrasives", "All Digs - Coating",
    "All Digs - Rock Guard", "All - Small Tools & Consumables",
    "All Digs - Pre Planning", "All Digs - Composite Repair"
  ]

const digIdSelect = document.getElementById("digIdSelect");

digIds.forEach(val => {
  const opt = document.createElement("option");
  opt.value = val;
  opt.textContent = val;
  digIdSelect.appendChild(opt);
});


 const classifications = [
  "Admin",
  "Coating Technician/Spotter",
  "Construction Manager",
  "Steep Slope Operator",
  "Equipment Operator 2",
  "Fitter",
  "Foreman",
  "Labourer",
  "Labourer 3",
  "Lead Hand",
  "Mechanic w/ Service Truck",
  "Medic",
  "Millwright",
  "NACE 2",
  "Project Control",
  "Project Coordinator",
  "Project Director",
  "Project Manager",
  "QA/QC",
  "Safety Coordinator",
  "Safety Lead",
  "Safety Manager",
  "Sandblaster",
  "Scheduler",
  "Senior Project Manager",
  "Skilled Labourer",
  "Superintendent",
  "Steep Slope Supervisor",
  "Welder 1",
  "Welder 2",
  "Welder Helper",
  "Welder Helper/Fire Watch",
  "Welder Helper/Fire Watch (Hot Pay)",
  "Truck Driver (Teamster)",
  "Equipment Operator 1",
  "Supervisor"
];

  const manpower = [
  "Aaron Swan", "Abdi Jama", "Adam King", "Adrienne Laporte", "Aileena Keith", "Aileena Marie",
  "Alexandra Klimchuk ", "Alicia Swan", "Andre Godel", "Annette Swan", "Barry Thompson", "Bernard Hughes",
  "Blaine Squires", "Blair Smith", "Brady Loring", "Brenagan Augier", "Brent Kelly", "Brian Miller",
  "Brittany Rabbitt", "Caitlyn Macaulay", "Cam Fossum", "Cameron Gilmore", "Carson Bischoff",
  "Carson James", "Carson James", "Cayde McMullin", "Chad Henderson", "Christy Hamilton", "Cloud Diablo", "Cody Graham", "Cody Shindle",
  "Colton Amlin", "Cory Pelkman (D&L)", "Craig Erickson", "Craig Welsman","Dalton Patrick", "Damon Keith", "Dan Therrien",
  "Daniel Pearo", "Danielle Nelson", "Darren Donley", "Darryl Meade (GPS)", "David Guild", "Del James","Derek Seward",
  "Derek Swan", "Derick Bogar", "Derwood Smith", "Devan McLean", "Devon McCoy", "Dion Lahoda",
  "Dwayne Walkden", "Dylan Reid", "Emerson Beaudet", "Emily Gilbert", "Erik Bergstrom", "Ethan Long",
  "Gabe Quigley", "Gage Pierobon", "Gary Gushue", "Geoffrey McLeod", "Grant Mercer", "Greg Matthiessen",
  "Gregory MacMillan", "Haden Nordick", "Iven Davidson", "Izzy Heath", "Jacob Zevola", "James Leach",
  "Jason Korotash", "Jason Stephenson","Jason VanVeen", "Jeffery Harriman", "Jen Chubb", "Jeremy Fossum", "Jeremy Nellis",
  "Jody Bauer", "John Quigley", "Jordan Robinson (Norwest)", "Jordan Romano", "Joseph Vilac",
  "Josh Kennedy (Norwest)", "Josh Lugossy", "Josh Lyons", "Josh Schuett", "Justin Kato", "Kam Anthony",
  "Kari Smith", "Kelly Debert", "Kenver New", "Kevin Boyce", "Kevin Ross ", "Kurtis Hagen", "Kyle Larder",
  "Lauren Smith", "Liam Dan", "Lincoln Wood", "Linda Gelazus", "Linda Hamel", "Lorinda Downey", "Lou Maslin",
  "Lucas Hall", "Luke Carriou", "Marc Trudel", "Marco Van Delden", "Mark Wilson", "Matthew Jones",
  "Matthew Neilsen", "Melissa Medwid", "Mitch Wilton", "Michael Bruno", "Michael Martin", "Michael Mclelan", "Mike Cobban",
  "Miles Sushelnitski", "Mladen Jovic", "Moin Padaniya", "Nate Glenn", "Nathan Stewart", "Nicole Golos",
  "Noah Stiles", "Nolan Conroy", "Patrick Hampson", "Quinton Tutin", "Reed Golos", "Richard Dalrymple",
  "Rick Flegel", "River Block", "Rod McLaren", "Rutika Patel", "Ryan Bernicky","Ryan Young", "Sam Kisser",
  "Samantha Stevenson", "Sandra Quigley", "Sarah Booth", "Sarah Simkin", "Scott Medley ", "Sean Menzel",
  "Shane Ayers", "Shane Jackson", "Shea McNeil", "Sheldon Traun", "Simon Ramsey", "Stacey Glanville",
  "Stefanie Cox", "Stephanie Henderson", "Sterling Nimco", "Steven Misumi", "Taylor Hegberg",
  "Theodore Uqhart", "Theressa Bartee", "Thomas Gregory","Tim Mason", "Trent Morrison", "Trent Zevola", "Trevor Dewey",
  "Tristan Vigliotti", "Troy Connett", "Tyler Anderson", "Ty Stokes", "Tyler Brown", "Tyler Lothian", "William (Bill) Erskine",
  "Wilson Liang", "Wyatt Williams"
];

  const equipmentList = 
 [
  { unit: "01-10", desc: "Chevrolet Silverado 3500 - crew truck" },
  { unit: "01-23", desc: "Dodge Ram3500 - crew truck" },
  { unit: "01-27", desc: "GMC Sierra 3500 - crew truck" },
  { unit: "01-34", desc: "GMC Sierra 3500 - crew truck" },
  { unit: "01-35", desc: "GMC Sierra 3500 - crew truck" },
  { unit: "01-36", desc: "GMC Sierra 3500 - crew truck" },
  { unit: "01-37", desc: "GMC Sierra 1500 - crew truck" },
  { unit: "01-38", desc: "GMC Sierra 3500 - crew truck" },
  { unit: "01-39", desc: "GMC Sierra 3500 - crew truck" },
  { unit: "01-41", desc: "GMC Sierra 3500 - crew truck" },
  { unit: "01-42", desc: "GMC Sierra 3500 - crew truck" },
  { unit: "01-44", desc: "GMC Sierra 3500 - crew truck" },
  { unit: "01-45", desc: "GMC Sierra 3500 - crew truck" },
  { unit: "01-49", desc: "GMC Sierra 3500 - crew truck" },
  { unit: "01-50", desc: "GMC Sierra 3500 - crew truck" },
  { unit: "01-51", desc: "Chevrolet Silverado 3500 - crew truck" },
  { unit: "01-52", desc: "GMC Sierra 3500 - crew truck" },
  { unit: "01-54", desc: "Chevrolet Silverado 3500 - crew truck" },
  { unit: "01-55", desc: "Chevrolet Silverado 3500 - crew truck" },
  { unit: "CT-001", desc: "Dion Lahoda Truck - crew truck" },
  { unit: "01-58", desc: "Chevrolet Silverado 3500 - crew truck" },
  { unit: "01-69", desc: "Chev 1500 - crew truck" },
  { unit: "01-70", desc: "GMC Sierra 3500 - crew truck" },
  { unit: "CT-005", desc: "Adam King Truck - crew truck" },
  { unit: "01-71", desc: "Chevrolet Silverado 1500 - crew truck" },
  { unit: "CT-006", desc: "Sean Menzel Truck - crew truck" },
  { unit: "CT-007", desc: "Dave Mallon Truck - crew truck" },
  { unit: "01-72", desc: "Chevrolet Silverado 3500 - crew truck" },
  { unit: "CT-008", desc: "Mike Martin Truck - crew truck" },
  { unit: "CT-009", desc: "Dwayne Walkden Truck - crew truck" },
  { unit: "01-73", desc: "Chevrolet Silverado 3500 - crew truck" },
  { unit: "01-74", desc: "Chevrolet Silverado 3500 - crew truck" },
  { unit: "01-75", desc: "Chevrolet Silverado 3500 - crew truck" },
  { unit: "01-76", desc: "Ford Transit Van - crew truck" },
  { unit: "01-77", desc: "Ford Transit Van - crew truck" },
  { unit: "01-28", desc: "GMC Sierra 3500-Flat Deck - crew truck" },
  { unit: "01-30", desc: "GMC Sierra 3500-Flat Deck - crew truck" },
  { unit: "01-31", desc: "Chevrolet Silverado 3500 - crew truck" },
  { unit: "01-43", desc: "GMC Sierra 3500 - crew truck" },
  { unit: "CT-011", desc: "Mladen Jovic - crew truck" },
  { unit: "01-78", desc: "Chevrolet Silverado 3500 - crew truck" },
  { unit: "01-79", desc: "Chevrolet Silverado 3500 - crew truck" },
  { unit: "01-80", desc: "Chevrolet Silverado 3500 - crew truck" },
  { unit: "01-81", desc: "Chevrolet Silverado 3500 - crew truck" },
  { unit: "01-83", desc: "Chevrolet Silverado 3500 - crew truck" },
  { unit: "01-82", desc: "Chevrolet Silverado 3500 - crew truck" },
  { unit: "CT-002", desc: "Del James - crew truck" },
  { unit: "CT-003", desc: "Craig Welsman - crew truck" },
  { unit: "CT-004", desc: "Craig Erickson - QA/QC Coordinator - crew truck" },
  { unit: "CT-010", desc: "Justin Kato Truck - crew truck" },
  { unit: "01-46", desc: "Chevrolet Silverado 3500 - medic truck" },
  { unit: "01-57", desc: "Chevrolet Silverado 3500 - medic truck" },
  { unit: "01-71", desc: "Chevrolet 1500" },
  { unit: "01-66", desc: "Ford F150" },
  { unit: "01-68", desc: "Ford F150" },
  { unit: "01-59", desc: "Ford F150" },
  { unit: "01-53", desc: "Chevrolet 1500" },
  { unit: "02-05", desc: "Dodge 5500" },
  { unit: "02-14", desc: "Ford F550" },
  { unit: "02-15", desc: "Ford F550" },
  { unit: "02-16R", desc: "Ford F550" },
  { unit: "02-08", desc: "Ford F550" },
  { unit: "02-09", desc: "Ford F550" },
  { unit: "02-14", desc: "Ford F550" },
  { unit: "02-15", desc: "Ford F550" },
  { unit: "02-12(AWS)", desc: "Ford F450" },
  { unit: "02-07", desc: "Dodge 5500 Service/Mechanic Truck" },
  { unit: "02-13", desc: "Ford F-550 Service/Mechanic Truck" },
  { unit: "03-32", desc: "Kenworth T-800" },
  { unit: "03-38", desc: "Kenworth T-800" },
  { unit: "03-31", desc: "Peterbuilt Flatdeck" },
  { unit: "03-35", desc: "Ford F750" },
  { unit: "03-36", desc: "Ford F750" },
  { unit: "04-01", desc: "Snake River 12' Dump Trailer" },
  { unit: "04-10", desc: "Snake River 12' Dump Trailer" },
  { unit: "04-08", desc: "Snake River 12' Dump Trailer" },
  { unit: "04-47", desc: "Snake River 12' Dump Trailer" },
  { unit: "04-48", desc: "Snake River 12' Dump Trailer" },
  { unit: "04-04", desc: "Snake River 10' Dump Trailer S/A Dump" },
  { unit: "04-06", desc: "Snake River 10' Dump Trailer S/A Dump" },
  { unit: "04-12", desc: "Snake River 8' Dump Trailer S/A Dump" },
  { unit: "04-05", desc: "Fire Trailer 1025Gal w/ Fire, Pump, Hose & Tools" },
  { unit: "04-11", desc: "Fire Trailer 1025Gal w/ Fire, Pump, Hose & Tools" },
  { unit: "04-15", desc: "Fire Trailer 1025Gal w/ Fire, Pump, Hose & Tools" },
  { unit: "04-50", desc: "Fire Trailer 500Gal w/ Fire Pump, Hose and Tools" },
  { unit: "04-51", desc: "Fire Trailer 500Gal w/ Fire Pump, Hose and Tools" },
  { unit: "04-52R", desc: "Fire Trailer 1000 Gal" },
  { unit: "04-53R", desc: "Fire Trailer 500Gal w/ Fire Pump, Hose and Tools" },
  { unit: "04-54R", desc: "Fire Trailer 500Gal w/ Fire Pump, Hose and Tools" },
  { unit: "04-55R", desc: "Fire Trailer 500Gal w/ Fire Pump, Hose and Tools" },
  { unit: "04-56R", desc: "Fire Trailer 500Gal w/ Fire Pump, Hose and Tools" },
  { unit: "04-57R", desc: "Fire Trailer 500Gal w/ Fire Pump, Hose and Tools" },
  { unit: "04-58R", desc: "Fire Trailer 500Gal w/ Fire Pump, Hose and Tools" },
  { unit: "04-59R", desc: "Fire Trailer 500Gal w/ Fire Pump, Hose and Tools" },
  { unit: "04-60R", desc: "Fire Trailer 500Gal w/ Fire Pump, Hose and Tools" },
  { unit: "04-62R", desc: "Fire Trailer 500Gal w/ Fire Pump, Hose and Tools" },
  { unit: "04-61R", desc: "Fire Trailer 500Gal w/ Fire Pump, Hose and Tools" },
  { unit: "04-64R", desc: "Fire Trailer 500Gal w/ Fire Pump, Hose and Tools" },
  { unit: "04-65R", desc: "Fire Trailer 1000 Gal" },
  { unit: "04-66R", desc: "Fire Trailer 1000 Gal" },
  { unit: "04-71R", desc: "Fire Trailer 500Gal w/ Fire Pump, Hose and Tools" },
  { unit: "04-72R", desc: "Fire Trailer 500Gal w/ Fire Pump, Hose and Tools" },
  { unit: "04-73R", desc: "Fire Trailer 500Gal w/ Fire Pump, Hose and Tools" },
  { unit: "04-74R", desc: "Fire Trailer 500Gal w/ Fire Pump, Hose and Tools" },
  { unit: "04-75R", desc: "Fire Trailer 1000 Gal" },
  { unit: "04-77R", desc: "Fire Trailer 1000 Gal" },
  { unit: "06-2001", desc: "Honda EB2200 Generator" },
  { unit: "06-2002", desc: "Honda EB2200 Generator" },
  { unit: "06-2003", desc: "Honda EB2200 Generator" },
  { unit: "06-2004", desc: "Honda EB2200 Generator" },
  { unit: "06-2005", desc: "Honda EB2200 Generator" },
  { unit: "06-2006", desc: "Honda EB2200 Generator" },
  { unit: "06-2007", desc: "Honda EB2200 Generator" },
  { unit: "06-3001", desc: "Honda EU3000 Generator" },
  { unit: "06-3002", desc: "Honda EM3500 Generator" },
  { unit: "06-3003", desc: "Honda EM3800 Generator" },
  { unit: "06-3004", desc: "Honda EM3800 Generator" },
  { unit: "04-07", desc: "PJ Flat Deck Trailer" },
  { unit: "04-49", desc: "Double A 20' Flatdeck Trailer" },
  { unit: "04-42(AWS)", desc: "Double A 20' Flat Deck" },
  { unit: "04-65R", desc: "Canada Trailers Flat Deck" },
  { unit: "04-09", desc: "T/A Gooseneck Flatdeck Trailer" },
  { unit: "04-34", desc: "T/A Gooseneck Flatdeck Trailer" },
  { unit: "04-44(AWS)", desc: "20' Big Tex Gooseneck" },
  { unit: "04-27", desc: "22ft Office Trailer" },
  { unit: "04-13", desc: "22ft Office Trailer" },
  { unit: "04-67R", desc: "22' Office Trailer" },
  { unit: "04-68R", desc: "22' Office Trailer" },
  { unit: "04-22", desc: "Enclosed Trailer" },
  { unit: "04-38", desc: "T/A Enclosed 20' Trailer" },
  { unit: "04-43(AWS)", desc: "T/A Enclosed Trailer" },
  { unit: "04-45(AWS)", desc: "T/A Enclosed Trailer" },
  { unit: "04-52", desc: "T/A Enclosed Trailer" },
  { unit: "04-53", desc: "T/A Enclosed Trailer" },
  { unit: "04-54", desc: "T/A Enclosed Trailer" },
  { unit: "04-76R", desc: "T/A Enclosed Trailer" },
  { unit: "04-36", desc: "53ft Tool/Office Trailer" },
  { unit: "04-37", desc: "53ft Tool/Office Trailer" },
  { unit: "05-06", desc: "IngersolRand XP375" },
  { unit: "05-09", desc: "IngersolRand XP375" },
  { unit: "05-11", desc: "Doosan 375" },
  { unit: "05-12", desc: "Doosan 375" },
  { unit: "05-18", desc: "Doosan 375" },
  { unit: "05-10", desc: "Doosan P425" },
  { unit: "05-15", desc: "Sullair 260" },
  { unit: "05-16", desc: "Sullair 260" },
  { unit: "05-17", desc: "Atlas Copco 300" },
  { unit: "06-02", desc: "Allmond ML20" },
  { unit: "06-03", desc: "Allmond ML20" },
  { unit: "06-07", desc: "Doosan L20" },
  { unit: "06-08", desc: "Doosan L20" },
  { unit: "06-12", desc: "Magnum MLT5200" },
  { unit: "06-13", desc: "Magnum MLT5200" },
  { unit: "06-14", desc: "Magnum MLT5200" },
  { unit: "06-16", desc: "Magnum MLT5200" },
  { unit: "06-04", desc: "Vermeer BC1000 Wood Chipper" },
  { unit: "06-09", desc: "Allmond 8kw" },
  { unit: "06-10", desc: "Allmond 8kw" },
  { unit: "06-11", desc: "Allmond 8kw" },
  { unit: "06-06", desc: "Doosan 6KW LSWKU" },
  { unit: "06-24", desc: "Generac 6kw" },
  { unit: "06-25", desc: "Generac 6kw" },
  { unit: "06-26", desc: "Generac 6kw" },
  { unit: "06-27", desc: "Generac 6kw" },
  { unit: "06-15", desc: "Hi Power Multi Phase HRJW 115 T6 - 115KW Generator" },
  { unit: "06-17", desc: "Wacker G25 20kw" },
  { unit: "06-01", desc: "Mangum 20kw" },
  { unit: "06-22", desc: "Multiquip Whisperwatt 25kw" },
  { unit: "06-21", desc: "Atlas Copco 25Kw" },
  { unit: "06-05", desc: "Mcelrath/Vermeer V500LE-HD HydroVac" },
  { unit: "17-01", desc: "Volvo PL3005D Pipe Layers" },
  { unit: "17-02", desc: "Volvo PL3005E Pipe Layers" },
  { unit: "17-03", desc: "Volvo PL3005E Pipe Layers" },
  { unit: "17-04", desc: "Caterpillar 583K" },
  { unit: "17-05", desc: "Caterpillar 583K" },
  { unit: "07-19", desc: "John Deere 50D Excavator" },
  { unit: "07-38", desc: "John Deere 60G Excavator" },
  { unit: "07-20", desc: "Hitachi 250LC-5 Excavator" },
  { unit: "07-22", desc: "John Deere 250G Excavator" },
  { unit: "07-26", desc: "Hitachi 250LC-5N Excavator" },
  { unit: "07-27", desc: "John Deere 250G-LC Excavator" },
  { unit: "07-28", desc: "John Deere 250G-LC Excavator" },
  { unit: "07-24", desc: "Hitachi 245 LC Excavator" },
  { unit: "07-17", desc: "John Deere 240D Excavator" },
  { unit: "07-18", desc: "Hitachi ZX240LC-3 Excavator" },
  { unit: "07-34", desc: "John Deere 250G-LC Excavator" },
  { unit: "07-40", desc: "John Deere 245P Excavator" },
  { unit: "07-42", desc: "Hitachi ZX250-6 Excavator" },
  { unit: "08-04", desc: "Caterpiller D6N LGP Bulldozer" },
  { unit: "08-10", desc: "Caterpiller D6N LGP Bulldozer" },
  { unit: "08-06", desc: "Doosan DL200TC Loaders" },
  { unit: "08-09", desc: "Bobcat T870 Loaders" },
  { unit: "08-13", desc: "Bobcat T870 Loaders" },
  { unit: "08-01", desc: "Bobcat T320 Loaders" },
  { unit: "08-15", desc: "Bobcat S250 Loaders" },
  { unit: "08-16", desc: "Bobcat T870 Loaders" },
  { unit: "08-17", desc: "Bobcat T870 Loaders" },
  { unit: "08-18R", desc: "Bobcat T770 Loader" },
  { unit: "08-11", desc: "Caterpiller D3KLGP Bulldozer" },
  { unit: "08-12", desc: "Morooka MST800VD Tracked Carrier/Dumpers" },
  { unit: "09-01", desc: "Sandblasting skid unit w/ Air cooler, dryer, breather" },
  { unit: "09-02", desc: "Sandblasting skid unit w/ Air cooler, dryer, breather" },
  { unit: "09-03", desc: "Sandblasting skid unit w/ Air cooler, dryer, breather" },
  { unit: "09-04", desc: "Sandblasting skid unit w/ Air cooler, dryer, breather" },
  { unit: "09-05", desc: "Sandblasting skid unit w/ Air cooler, dryer, breather" },
  { unit: "09-06", desc: "Sandblasting skid unit w/ Air cooler, dryer, breather" },
  { unit: "09-07", desc: "Sandblasting skid unit w/ Air cooler, dryer, breather" },
  { unit: "09-08", desc: "Sandblasting skid unit w/ Air cooler, dryer, breather" },
  { unit: "09-18", desc: "Karcher Dry Ice Blaster" },
  { unit: "10-01", desc: "Volvo A25E 6x6 Off Highway Articulating Trucks" },
  { unit: "10-02", desc: "Volvo A25E 6x6 Off Highway Articulating Trucks" },
  { unit: "10-03R", desc: "Volvo A30F" },
  { unit: "11-04", desc: "BOMAG BT 65/4 Compactors - Jumping Jacks" },
  { unit: "11-05", desc: "BOMAG BT 65/4 Compactors - Jumping Jacks" },
  { unit: "11-01", desc: "Ammann AVH 5020 E Plate Tampers" },
  { unit: "11-07", desc: "Ammann Rammax 1575 Trench Rollers" },
  { unit: "97-3000", desc: "Rock Drill" },
  { unit: "97-1000", desc: "Jackhammer 90lb" },
  { unit: "13-01", desc: "Wacker Neuson HI110 HD D Heaters Diesel" },
  { unit: "13-02", desc: "Wacker Neuson HI110 HD D Heaters Diesel" },
  { unit: "13-03", desc: "Wacker Neuson HI110 HD D Heaters Diesel" },
  { unit: "13-04", desc: "Wacker Neuson HI110 HD D Heaters Diesel" },
  { unit: "13-07", desc: "Ground Heaters Arctic Cub 200 Heaters Diesel" },
  { unit: "13-06", desc: "Frost Fighter IDF350-II Heaters Diesel" },
  { unit: "13-08", desc: "Frost Fighter IDF350-II Heaters Diesel" },
  { unit: "13-09", desc: "Frost Fighter IDF350-II Heaters Diesel" },
  { unit: "13-10", desc: "Frost Fighter IDF350-II Heaters Diesel" },
  { unit: "13-11", desc: "Frost Fighter IDF350-II Heaters Diesel" },
  { unit: "13-12", desc: "Frost Fighter IDF350-II Heaters Diesel" },
  { unit: "13-13", desc: "Frost Fighter IDF350-II Heaters Diesel" },
  { unit: "13-05", desc: "Wacker Neuson Arctic Bear XHD Heater" },
  { unit: "24-01", desc: "BE 2\" Water Pump" },
  { unit: "24-02", desc: "BE 2\" Water Pump" },
  { unit: "24-03", desc: "BE 2\" Water Pump" },
  { unit: "24-04", desc: "BE 2\" Water Pump" },
  { unit: "24-05", desc: "Honda 2\" Trash Pump" },
  { unit: "24-12", desc: "Honda 2\" High Pressure Pump" },
  { unit: "24-13", desc: "Honda 2\" High Pressure Pump" },
  { unit: "24-14", desc: "Seeyes 2\" High Pressure Pump" },
  { unit: "24-15", desc: "Seeyes 2\" High Pressure Pump" },
  { unit: "24-16", desc: "Honda 2\" High Pressure Pump" },
  { unit: "24-17", desc: "Honda 2\" High Pressure Pump" },
  { unit: "24-18", desc: "Honda 2\" High Pressure Pump" },
  { unit: "24-19", desc: "BE 2\" High Pressure Pump" },
  { unit: "14-3000", desc: "Honda 3\" Trash Pump" },
  { unit: "14-4000", desc: "Honda 4\" Trash Pump" },
  { unit: "14-4500", desc: "4\" Submersible Electric" },
  { unit: "14-3500", desc: "3\" Pneumatic Trash Pump" },
  { unit: "14-4099", desc: "4\" Discharge Hose (50')" },
  { unit: "14-6099", desc: "6\" Discharge Hose (50')" },
  { unit: "15-06", desc: "Honda SXS UTV's" },
  { unit: "15-07", desc: "Honda SXS UTV's" },
  { unit: "15-08", desc: "Argo 950 Bigfoot UTV's" },
  { unit: "15-10R", desc: "Polaris Ranger 1000" },
  { unit: "15-11R", desc: "Polaris Ranger 1000" },
  { unit: "15-13R", desc: "Polaris 1000" },
  { unit: "15-14R", desc: "Can-Am Defender 1000" },
  { unit: "15-15R", desc: "Can-Am Defender 1000" },
  { unit: "09-17", desc: "Black Max Dust Suppression System" },
  { unit: "92-01", desc: "Radiodetection RD7000+ Line Locators" },
  { unit: "92-02", desc: "Radiodetection RD7000+ Line Locators" },
  { unit: "92-03", desc: "Trimble LL300N Line Locator" },
  { unit: "92-04", desc: "Stabila LAR 350 Line Locator" },
  { unit: "92-05", desc: "Conventional Builders Level - Line Locator" },
  { unit: "91-01", desc: "Sala 8514459 Fall Arrest Equipment" },
  { unit: "69-07", desc: "Tysea Excavator Mat Grapple" },
  { unit: "69-08", desc: "Tysea Excavator Mat Grapple" },
  { unit: "66-02", desc: "VanEd Hyd Breaker RB22G" },
  { unit: "01-57 ETV", desc: "Code 3 ETV Unit" },
  { unit: "01-46 ETV", desc: "Code 3 ETV Unit" },
  { unit: "01-27 PLOW/SANDER", desc: "Front Mount Plow & Slide-In Sander Assy" },
  { unit: "41-1000", desc: "Wooden Access Mats" },
  { unit: "41-2000", desc: "Wooden Swamp Mats" },
  { unit: "42-1000", desc: "Road Plates" },
  { unit: "40-1000", desc: "6'x8' Site Fencing Panel" },
  { unit: "60-10", desc: "Lifting Adapter (Excavator)" },
  { unit: "60-01", desc: "Lifting Adaptor (Excavator)" },
  { unit: "60-02", desc: "Lifting Adapter (Excavator)" },
  { unit: "60-03", desc: "Lifting Adaptor (Excavator)" },
  { unit: "60-04", desc: "Lifting Adaptor (Excavator)" },
  { unit: "60-05", desc: "Lifting Adaptor (Excavator)" },
  { unit: "60-06", desc: "Lifting Adaptor (Excavator)" },
  { unit: "60-07", desc: "Lifting Adaptor (Excavator)" },
  { unit: "60-08", desc: "Lifting Adaptor (Excavator)" },
  { unit: "60-11", desc: "Lifting Adapter (Excavator)" },
  { unit: "60-12", desc: "Lifting Adapter (Excavator)" },
  { unit: "60-13", desc: "Lifting Adapter (Excavator)" },
  { unit: "60-14", desc: "Lifting Adapter (Excavator)" },
  { unit: "95-01", desc: "Coating Inspection Kit #1" },
  { unit: "95-02", desc: "Coating Inspection Kit #2" },
  { unit: "95-03", desc: "Coating Inspection Kit #3" },
  { unit: "95-04", desc: "AWS QC Coating Kit" },
  { unit: "95-05", desc: "AWS Welding QC Kit" },
  { unit: "94-04", desc: "SPY 785 Holiday Detector" },
  { unit: "94-07", desc: "SPY 785 Holiday Detector" },
  { unit: "94-08", desc: "SPY 785 Holiday Detector" },
  { unit: "94-09", desc: "DeFelsko Positest LPD Holiday Detector" },
  { unit: "43-03", desc: "20' Wood Bridge" },
  { unit: "43-02", desc: "30' Wood Bridge" },
  { unit: "43-01", desc: "60' Steel bridge" },
  { unit: "46-1000", desc: "Portable Stair Section 5’ c/w Handrails" },
  { unit: "46-1001", desc: "Portable Stair Section 5' c/w Handrails" },
  { unit: "46-1002", desc: "Portable Stair Section 5' c/w Handrails" },
  { unit: "46-1003", desc: "Portable Stair Section 5' c/w Handrails" },
  { unit: "46-1004", desc: "Portable Stair Section 5' c/w Handrails" },
  { unit: "46-1005", desc: "Portable Stair Section 5' c/w Handrails" },
  { unit: "46-1006", desc: "Portable Stair Section 5' c/w Handrails" },
  { unit: "46-1007", desc: "Portable Stair Section 5' c/w Handrails" },
  { unit: "46-1008", desc: "Portable Stair Section 5' c/w Handrails" },
  { unit: "46-1009", desc: "Portable Stair Section 5' c/w Handrails" },
  { unit: "46-1010", desc: "Portable Stair Section 5' c/w Handrails" },
  { unit: "46-1011", desc: "Portable Stair Section 15' c/w Handrails" },
  { unit: "46-1012", desc: "Portable Stair Section 15' c/w Handrails" },
  { unit: "46-1013", desc: "Portable Stair Section 15' c/w Handrails" },
  { unit: "46-1014", desc: "Portable Stair Section 15' c/w Handrails" },
  { unit: "46-1015", desc: "Portable Stair Section 15' c/w Handrails" },
  { unit: "46-1016", desc: "Portable Stair Section 15' c/w Handrails" },
  { unit: "94-01", desc: "Gas Monitor MX4" },
  { unit: "94-02", desc: "MX4 Gas Detector" },
  { unit: "94-03", desc: "Gas Monitor" },
  { unit: "04-39", desc: "Triple Stall Washroom Trailer" },
  { unit: "04-40", desc: "Triple Stall Washroom Trailer" },
  { unit: "04-69R", desc: "Washroom Trailer" },
  { unit: "07-30", desc: "John Deere 350G Excavator" },
  { unit: "07-33", desc: "John Deere 350G Excavator" },
  { unit: "07-35", desc: "John Deere 350G Excavator" },
  { unit: "07-36", desc: "John Deere 350G Excavator" },
  { unit: "07-37", desc: "John Deere 350G Excavator" },
  { unit: "04-41", desc: "Gerrys Booster" },
  { unit: "4-14", desc: "Mobile Coating Trailer w. comp, gen" },
  { unit: "09-20", desc: "Blast & Recovery Unit" },
  { unit: "70-02", desc: "Flange Alignment Pins – 600# Rating – up to 24”" },
  { unit: "70-03", desc: "Pipe Line-Up Clamps – up to 24”" },
  { unit: "70-04", desc: "Pipe Line-Up Clamps – up to 24”" },
  { unit: "71-01", desc: "2” – 24” Pipe Cutter" },
  { unit: "71-02", desc: "Pipe Threader" },
  { unit: "71-03", desc: "Cold Cutter – up to 4”" },
  { unit: "71-04", desc: "Beveling Bands c/w Torches, Crawler - to 30”" },
  { unit: "71-05", desc: "Beveling Bands c/w Torches, Crawler - 30\"" },
  { unit: "73-01", desc: "De- Mag (Auto De Gauss) *" },
  { unit: "73-02", desc: "Auto Degauss Standard Unit –" },
  { unit: "74-01", desc: "Fabrication Roller" },
  { unit: "74-02", desc: "Pipe Turner" },
  { unit: "96-15", desc: "Stealth 2 278/1869 ft/lbs Hytorc Tools" },
  { unit: "96-16", desc: "Stealth 2 278/1869 ft/lbs Hytorc Tools" },
  { unit: "96-17", desc: "Stealth 4 604/4020 ft/lbs Hytorc Tools" },
  { unit: "96-18", desc: "Stealth 4 604/4020 ft/lbs Hytorc Tools" },
  { unit: "98-01A", desc: "B Rad 1500 Rad Torque & Socket" },
  { unit: "07-39", desc: "Doosan DX490 Excavator" },
  { unit: "07-41", desc: "Hitachi ZX490-6" },
  { unit: "08-14", desc: "Rayco C100 Mulcher" },
  { unit: "99-01", desc: "Starlink" },
  { unit: "03-39", desc: "Mack 12T Picker" },
  { unit: "91-05", desc: "Hand Held Radio" },
  { unit: "91-06", desc: "Hand Held Radio" },
  { unit: "91-07", desc: "Hand Held Radio" },
  { unit: "91-08", desc: "Hand Held Radio" },
  { unit: "02-10", desc: "Dodge 5500 Crane Truck" },
  { unit: "02-11", desc: "Ford F550 Crane Truck" },
  { unit: "02-07", desc: "Dodge 5500 Service/Mechanic Truck" },
  { unit: "02-13", desc: "Ford F-550 Service/Mechanic Truck" },
  { unit: "04-01", desc: "Snake River 12' Dump Trailer" },
  { unit: "04-08", desc: "Snake River 12' Dump Trailer" },
  { unit: "04-10", desc: "Snake River 12' Dump Trailer" },
  { unit: "04-47", desc: "Snake River 12' Dump Trailer" },
  { unit: "04-48", desc: "Snake River 12' Dump Trailer" },
  { unit: "16-01", desc: "Caterpillar DP45 10000lb" },
  { unit: "70-05", desc: "De-Mag (Auto De Gausscon)" },
  { unit: "CT-012", desc: "Richard Dalrymple - crew truck" }
];

// 🔥 NEW CODE START
function setupAutosaveListener() {
  window.removeEventListener("input", handleAutosave);
  window.addEventListener("input", handleAutosave);
}

function handleAutosave() {
  const data = getFormData();
  localStorage.setItem("tm_autosave", JSON.stringify(data));
}
// 🔥 NEW CODE END

  window.addEventListener("load", () => {
  // 🔹 1. Setup Signature Canvases
  setupSignatureCanvas("contractorSig");
  setupSignatureCanvas("clientSig");

  // 🔹 2. Restore cached form data (if any)
  const saved = localStorage.getItem("tm_autosave");
  const data = saved ? JSON.parse(saved) : null;

  // 🔹 3. Create rows BEFORE setting values
  const maxScope = Math.max(getCachedRowCount("scopeId"), 5);
  const maxCrew = Math.max(getCachedRowCount("crewClass"), 5);
  const maxEquip = Math.max(getCachedRowCount("equipmentUnit"), 5);

  // ✅ Now apply the cached data
  if (data) {
    setFormData(data);
  }

  // test fix
  // 🔥 Force update of scopeId and scopeUnit fields by triggering dropdown logic
for (let i = 1; i <= scopeRowCount; i++) {
  const scopeDesc = document.getElementById(`scopeDesc${i}`);
  if (scopeDesc) {
    scopeDesc.dispatchEvent(new Event("change"));
  }
}

  // --- Crew Section ---
  const crewBody = document.getElementById("crewBody");
  
  // --- Equipment Section ---
  const equipmentBody = document.getElementById("equipmentBody");


function wrapCell(element) {
  const td = document.createElement("td");
  td.appendChild(element);
  return td;
}

function getCachedRowCount(prefix) {
  const saved = localStorage.getItem("tm_autosave");
  if (!saved) return 5;

  const data = JSON.parse(saved);
  let maxIndex = 0;
  for (const key in data) {
    if (key.startsWith(prefix) && data[key] !== "") {
      const match = key.match(/\d+$/);
      if (match) {
        const index = parseInt(match[0]);
        if (index > maxIndex) maxIndex = index;
      }
    }
  }
  return Math.max(maxIndex, 5);
}


  // 🔹 4. Attach all button handlers
  document.getElementById("addScopeRow")?.addEventListener("click", addScopeRow);
  document.getElementById("removeScopeRow")?.addEventListener("click", removeScopeRow);

  document.getElementById("addCrewRow")?.addEventListener("click", addCrewRow);
  document.getElementById("removeCrewRow")?.addEventListener("click", removeCrewRow);

  document.getElementById("addEquipmentBtn")?.addEventListener("click", addEquipmentRow);
  //document.getElementById("removeEquipmentBtn")?.addEventListener("click", removeEquipmentRow);
});

  // --- Helpers ---
  function wrapCell(content, center = false) {
    const td = document.createElement("td");
    if (center) td.style.textAlign = "center";
    td.appendChild(content);
    return td;
  }

  function createDropdown(options) {
    const select = document.createElement("select");
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Select...";
    select.appendChild(defaultOption);
    options.forEach(opt => {
      const option = document.createElement("option");
      option.value = opt;
      option.textContent = opt;
      select.appendChild(option);
    });
    return select;
  }

  function addCrewRow() {
  crewRowCount++;
  const row = document.createElement("tr");

  const classSelect = createDropdown(classifications);
  classSelect.id = `crewClass${crewRowCount}`;

  const nameSelect = createDropdown(manpower);
  nameSelect.id = `crewName${crewRowCount}`;

  const unitCell = document.createElement("td");
  unitCell.textContent = "Hours";

  const totalInput = document.createElement("input");
  totalInput.type = "number";
  totalInput.step = "0.5";
  totalInput.min = "0";
  totalInput.style.width = "70px";
  totalInput.id = `crewTotal${crewRowCount}`;

  const loaCheckbox = document.createElement("input");
  loaCheckbox.type = "checkbox";
  loaCheckbox.id = `crewLoa${crewRowCount}`;

  const truckCheckbox = document.createElement("input");
  truckCheckbox.type = "checkbox";
  truckCheckbox.id = `crewTruck${crewRowCount}`;

  const notesInput = document.createElement("input");
  notesInput.type = "text";
  notesInput.id = `crewNotes${crewRowCount}`;

  row.appendChild(wrapCell(classSelect));
  row.appendChild(wrapCell(nameSelect));
  row.appendChild(unitCell);
  row.appendChild(wrapCell(totalInput));
  row.appendChild(wrapCell(loaCheckbox, true));
  row.appendChild(wrapCell(truckCheckbox, true));
  row.appendChild(wrapCell(notesInput));

  crewBody.appendChild(row);
}

function addEquipmentRow() {
  equipmentRowCount++;
  const row = document.createElement("tr");

  // Unit # dropdown
  const unitSelect = document.createElement("select");
  unitSelect.id = `equipmentUnit${equipmentRowCount}`;
  unitSelect.innerHTML = `<option value="">Select...</option>`;
  equipmentList.forEach(item => {
    const opt = document.createElement("option");
    opt.value = item.unit;
    opt.textContent = item.unit;
    unitSelect.appendChild(opt);
  });

  // Description (readonly)
  const descInput = document.createElement("input");
  descInput.type = "text";
  descInput.readOnly = true;
  descInput.id = `equipmentDesc${equipmentRowCount}`;

  unitSelect.addEventListener("change", () => {
    const selected = equipmentList.find(e => e.unit === unitSelect.value);
    descInput.value = selected ? selected.desc : "";
  });

  // Unit (Hourly/Daily)
  const unitDropdown = document.createElement("select");
  unitDropdown.id = `equipmentUnitType${equipmentRowCount}`;
  ["Hourly", "Daily"].forEach(val => {
    const opt = document.createElement("option");
    opt.value = val;
    opt.textContent = val;
    unitDropdown.appendChild(opt);
  });

  // Total
  const totalInput = document.createElement("input");
  totalInput.type = "number";
  totalInput.step = "0.5";
  totalInput.min = "0";
  totalInput.style.width = "70px";
  totalInput.id = `equipmentTotal${equipmentRowCount}`;

  // Notes
  const notesInput = document.createElement("input");
  notesInput.type = "text";
  notesInput.id = `equipmentNotes${equipmentRowCount}`;

  // Assemble row
  row.appendChild(wrapCell(unitSelect));
  row.appendChild(wrapCell(descInput));
  row.appendChild(wrapCell(unitDropdown));
  row.appendChild(wrapCell(totalInput));
  row.appendChild(wrapCell(notesInput));

  equipmentBody.appendChild(row);
}

function setupSignatureCanvas(canvasId, doResize = false) {
  const canvas = document.getElementById(canvasId);
  const ctx = canvas.getContext("2d");

  if (doResize) {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
  }

  let drawing = false;

  function getPos(evt) {
    const rect = canvas.getBoundingClientRect();
    const x = (evt.touches ? evt.touches[0].clientX : evt.clientX) - rect.left;
    const y = (evt.touches ? evt.touches[0].clientY : evt.clientY) - rect.top;
    return { x, y };
  }

  function start(evt) {
    drawing = true;
    const pos = getPos(evt);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    evt.preventDefault();
  }

  function draw(evt) {
    if (!drawing) return;
    const pos = getPos(evt);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    evt.preventDefault();

    // 🔥 trigger autosave for signature
    const data = getFormData();
    localStorage.setItem("tm_autosave", JSON.stringify(data));
  }

  function end(evt) {
    drawing = false;
    evt.preventDefault();
  }

  canvas.addEventListener("mousedown", start);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", end);
  canvas.addEventListener("mouseout", end);
  canvas.addEventListener("touchstart", start);
  canvas.addEventListener("touchmove", draw);
  canvas.addEventListener("touchend", end);
}


// 🔥 Save signature canvases for autosave
document.querySelectorAll("canvas.signature-canvas").forEach(canvas => {
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const blank = document.createElement("canvas");
  blank.width = canvas.width;
  blank.height = canvas.height;

  // Only save if not blank
  if (canvas.toDataURL() !== blank.toDataURL()) {
    data[canvas.id] = canvas.toDataURL("image/png");
  }
});



function clearSignature(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  // Re-size to force clearing and match current size
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;

  const ctx = canvas.getContext("2d");
  ctx.lineWidth = 2;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";
}


function getFormData() {
  const data = {};

  // 🔥 Manually walk and evaluate each row (not based on rowCount vars)
  document.querySelectorAll("input, select, textarea").forEach(el => {
    const id = el.id;
    if (!id) return;

    // 🔥 Skip blank Scope rows
    if (/^scope(Id|Desc|Qty|Comment)\d+$/.test(id)) {
      const i = id.match(/\d+$/)[0];
      const desc = document.getElementById(`scopeDesc${i}`)?.value || "";
      const qty = document.getElementById(`scopeQty${i}`)?.value || "";
      const comment = document.getElementById(`scopeComment${i}`)?.value || "";
      if (!desc && !qty && !comment) return;
    }

    // 🔥 Skip blank Crew rows
    if (/^crew(Class|Name|Total|Notes|Loa|Truck)\d+$/.test(id)) {
      const i = id.match(/\d+$/)[0];
      const name = document.getElementById(`crewName${i}`)?.value || "";
      const total = document.getElementById(`crewTotal${i}`)?.value || "";
      const notes = document.getElementById(`crewNotes${i}`)?.value || "";
      if (!name && !total && !notes) return;
    }

    // 🔥 Skip blank Equipment rows
    if (/^equipment(Unit|Desc|UnitType|Total|Notes)\d+$/.test(id)) {
      const i = id.match(/\d+$/)[0];
      const unit = document.getElementById(`equipmentUnit${i}`)?.value || "";
      const total = document.getElementById(`equipmentTotal${i}`)?.value || "";
      const notes = document.getElementById(`equipmentNotes${i}`)?.value || "";
      if (!unit && !total && !notes) return;
    }

    // Save value
    if (el.type === "checkbox") {
      data[id] = el.checked;
    } else if (el.type === "radio") {
      if (el.checked) data[el.name] = el.value;
    } else {
      data[id] = el.value;
    }
  });

  // ✅ Save scope unit label text
  document.querySelectorAll("[id^='scopeUnit']").forEach(cell => {
    const id = cell.id;
    const text = cell.textContent.trim();
    if (text !== "") {
      data[id] = text;
    }
  });

  // ✅ Save signatures
  ["contractorSig", "clientSig"].forEach(id => {
    const canvas = document.getElementById(id);
    if (!canvas) return;

    const blank = document.createElement("canvas");
    blank.width = canvas.width;
    blank.height = canvas.height;

    if (canvas.toDataURL() !== blank.toDataURL()) {
      data[id] = canvas.toDataURL("image/png");
    }
  });

  return data;
}



function setFormData(data) {
  // 🔥 1. Clear all current rows
  scopeBody.innerHTML = "";
  crewBody.innerHTML = "";
  equipmentBody.innerHTML = "";
  scopeRowCount = 0;
  crewRowCount = 0;
  equipmentRowCount = 0;

  // 🔥 2. Determine how many rows are needed from the data
  const maxScope = Math.max(
    ...Object.keys(data).filter(k => /^scope(Id|Desc|Qty|Comment)\d+$/.test(k)).map(k => parseInt(k.match(/\d+$/)[0]) || 0),
    5
  );

  const maxCrew = Math.max(
    ...Object.keys(data).filter(k => /^crew(Class|Name|Total|Notes|Loa|Truck)\d+$/.test(k)).map(k => parseInt(k.match(/\d+$/)[0]) || 0),
    5
  );

  const maxEquip = Math.max(
    ...Object.keys(data).filter(k => /^equipment(Unit|Desc|UnitType|Total|Notes)\d+$/.test(k)).map(k => parseInt(k.match(/\d+$/)[0]) || 0),
    5
  );

  // 🔥 3. Add rows before applying values
  while (scopeRowCount < maxScope) addScopeRow();
  while (crewRowCount < maxCrew) addCrewRow();
  while (equipmentRowCount < maxEquip) addEquipmentRow();

  // ✅ 4. Now populate fields
  const elements = document.querySelectorAll("input, select, textarea");

  elements.forEach(el => {
    if (el.id && data.hasOwnProperty(el.id)) {
      if (el.type === "checkbox") {
        el.checked = data[el.id];
      } else {
        el.value = data[el.id];
      }
    }
  });

  // ✅ 5. Restore unit label cells
  for (let i = 1; i <= maxScope; i++) {
    const unitCell = document.getElementById(`scopeUnit${i}`);
    if (unitCell && data[`scopeUnit${i}`]) {
      unitCell.textContent = data[`scopeUnit${i}`];
    }
  }

  // ✅ 6. Restore signatures
  ["contractorSig", "clientSig"].forEach(id => {
    if (data[id]) {
      const canvas = document.getElementById(id);
      const ctx = canvas.getContext("2d");
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
      img.src = data[id];
    }
  });
}


// Save Form to JSON file
document.getElementById("saveFormBtn")?.addEventListener("click", () => {
  const data = getFormData();

   // ✅ Add version info!
  data.version = 'v1.0.1';

  // 🔍 Get date from form input
  const formDate = document.getElementById("tmDate")?.value || "unknown-date";

  // 🔍 Ask user for initials
  const initials = prompt("Enter your initials for the file name:", "").trim();

  // 🔒 If they cancel or leave it blank, abort save
  if (!initials) {
    alert("Save cancelled: initials are required.");
    return;
  }

  // 📄 Compose file name
  const digId = document.getElementById("digIdSelect")?.value?.trim().replace(/\s+/g, "_") || "####";
const dateParts = formDate.split("-");
const formattedDate = dateParts.length === 3 ? `${dateParts[1]}-${dateParts[2]}-${dateParts[0]}` : formDate;
const filename = `${formattedDate}_Scorecard_${initials}_${digId}.json`;


  // 💾 Save the JSON blob
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
});


// Load Form from JSON file
document.getElementById("loadFormBtn").addEventListener("click", () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json";
  input.onchange = e => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = event => {
      const data = JSON.parse(event.target.result);
      setFormData(data);
      localStorage.setItem("tm_autosave", JSON.stringify(data)); // also cache it
    };
    reader.readAsText(file);
  };
  input.click();
});

// 🔥 FULL RESET
document.getElementById("resetBtn")?.addEventListener("click", () => {
  if (confirm("Clear all data from the form?")) {
    // 🔥 1. Remove local cache
    localStorage.removeItem("tm_autosave");

    // 🔥 2. Reset all inputs, dropdowns, checkboxes, and textareas
    document.querySelectorAll("input, select, textarea").forEach(el => {
      if (el.type === "checkbox" || el.type === "radio") {
        el.checked = false;
      } else {
        el.value = "";
      }
    });

    // 🔥 3. Clear the signature canvases exactly like the clear button
    clearSignature("contractorSig");
    clearSignature("clientSig");

    // 🔥 4. Reset unit labels (like scopeUnit1, scopeUnit2, etc.)
    document.querySelectorAll("[id^='scopeUnit']").forEach(cell => {
      cell.textContent = "";
    });

    // 🔥 Trim Scope rows to 5
const scopeBody = document.getElementById("scopeBody");
while (scopeBody.rows.length > 5) {
  scopeBody.deleteRow(scopeBody.rows.length - 1);
}

// 🔥 Trim Crew rows to 5
const crewBody = document.getElementById("crewBody");
while (crewBody.rows.length > 5) {
  crewBody.deleteRow(crewBody.rows.length - 1);
}

// 🔥 Trim Equipment rows to 5
const equipmentBody = document.getElementById("equipmentBody");
while (equipmentBody.rows.length > 5) {
  equipmentBody.deleteRow(equipmentBody.rows.length - 1);
}

  }
});


// Placeholder for PDF + Email (custom functions to be added)
document.getElementById("exportPdfBtn")?.addEventListener("click", async () => {
  const { jsPDF } = window.jspdf;

  const element = document.querySelector(".canvas");
  if (!element) {
    alert("Export failed: .canvas not found.");
    return;
  }

  

  // 🔍 Get date from form
  const formDate = document.getElementById("tmDate")?.value || "unknown-date";

  // 🔍 Prompt user for initials
  const initials = prompt("Enter your initials for the PDF file name:", "").trim();
  if (!initials) {
    alert("Export cancelled: initials are required.");
    return;
  }

  // 🧾 Compose file name
  const digId = document.getElementById("digIdSelect")?.value?.trim().replace(/\s+/g, "_") || "####";
const dateParts = formDate.split("-");
const formattedDate = dateParts.length === 3 ? `${dateParts[1]}-${dateParts[2]}-${dateParts[0]}` : formDate;
const filename = `${formattedDate}_Scorecard_${initials}_${digId}.pdf`;


  // 🖼️ Render to canvas
  await new Promise(resolve => setTimeout(resolve, 100)); // slight pause for layout
  const canvas = await html2canvas(element, { scale: 2 });
  const imgData = canvas.toDataURL("image/jpeg", 1.0);

  // 📄 Create dynamic height PDF
  const pageWidth = 800;
  const ratio = pageWidth / canvas.width;
  const imgHeight = canvas.height * ratio;

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: [pageWidth, imgHeight]
  });

  pdf.addImage(imgData, "JPEG", 0, 0, pageWidth, imgHeight);
  pdf.save(filename);
});

// Email button
document.getElementById("emailBtn")?.addEventListener("click", () => {
  const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, '0');
const dd = String(today.getDate()).padStart(2, '0');

// 🟡 Grab form date (yyyy-mm-dd), reformat to mm-dd-yyyy
const formDate = document.getElementById("tmDate")?.value?.trim() || "unknown-date";
let formattedDate = formDate;
const dateParts = formDate.split("-");
if (dateParts.length === 3) {
  formattedDate = `${dateParts[1]}-${dateParts[2]}-${dateParts[0]}`;
}

// 🟡 Get supervisor initials
const supervisorFullName = document.getElementById("omhsupervisor")?.value?.trim() || "XX";
const nameParts = supervisorFullName.split(" ");
const initials = nameParts.map(part => part[0]?.toUpperCase()).join("").slice(0, 2) || "XX";

// 🟡 Get Dig ID
const digId = document.getElementById("digIdSelect")?.value?.trim().replace(/\s+/g, "_") || "####";

// 🟡 Final filename format: date_Scorecard_Initials_DigNumber
const filename = `${formattedDate}_Scorecard_${initials}_${digId}`;

// 📧 Compose mailto link
  const recipients = [
    "tyler.anderson@ogilviemtn.ca",
    "del.james@ogilviemtn.ca",
    "jeremy.fossum@ogilviemtn.ca",
    "alexandra.klimchuk@ogilviemtn.ca"
  ].join(",");

  const mailtoLink = `mailto:${recipients}?subject=${encodeURIComponent(filename)}&body=${encodeURIComponent(`Please find the Daily Scorecard attached.\n\nFiles:\n- ${filename}.pdf\n- ${filename}.json`)}`;

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

 // 🔥 Autosave
window.addEventListener("input", () => {
  const data = getFormData();
  localStorage.setItem("tm_autosave", JSON.stringify(data));
});

console.log("Restoring data:", data);

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

// --- Equipment Lookup Functionality ---
document.getElementById("lookupEquipmentBtn")?.addEventListener("click", () => {
  // Create overlay
  const overlay = document.createElement("div");
  overlay.style.cssText = `
    position: fixed; top: 0; left: 0; width: 100%; height: 100%;
    background: rgba(0,0,0,0.6); display: flex; justify-content: center; align-items: center;
    z-index: 9999; padding: 20px;
  `;

  // Create modal
  const modal = document.createElement("div");
  modal.style.cssText = `
    background: white; padding: 20px; border-radius: 8px;
    max-width: 500px; width: 100%; max-height: 80vh; overflow: auto;
  `;

  const title = document.createElement("h3");
  title.textContent = "Search Equipment";
  modal.appendChild(title);

  // Search input
  const searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.placeholder = "Search by unit or description...";
  searchInput.style.cssText = `
    width: 100%; padding: 8px; margin-bottom: 10px;
  `;
  modal.appendChild(searchInput);

  // Results container
  const resultContainer = document.createElement("div");
  resultContainer.style.maxHeight = "60vh";
  resultContainer.style.overflowY = "auto";
  modal.appendChild(resultContainer);

  const renderResults = (filter = "") => {
  resultContainer.innerHTML = "";

  let listToRender;

  if (filter.trim() === "") {
    // 🔥 Sort numerically based on padded numbers (01-001, 01-099 etc.)
    listToRender = [...equipmentList].sort((a, b) => {
      const pad = (str) => str.padStart(4, "0"); // pad each part to 4 digits
      const aParts = a.unit.split("-").map(pad).join("");
      const bParts = b.unit.split("-").map(pad).join("");
      return aParts.localeCompare(bParts);
    });
  } else {
    // 🔥 Regular filter
    listToRender = equipmentList.filter(eq =>
      `${eq.unit} ${eq.desc}`.toLowerCase().includes(filter.toLowerCase())
    );
  }

  listToRender.forEach(eq => {
    const p = document.createElement("p");
    p.textContent = `${eq.unit} - ${eq.desc}`;
    p.style.cssText = `
      padding: 5px 0; border-bottom: 1px solid #eee;
    `;
    resultContainer.appendChild(p);
  });
};

// 🏁 Initial rendering
renderResults();

// 🧠 Filter on input
searchInput.addEventListener("input", () => {
  renderResults(searchInput.value);
});



  // Close button
  const closeBtn = document.createElement("button");
  closeBtn.textContent = "Close";
  closeBtn.style.cssText = `
    margin-top: 10px; padding: 6px 12px; background: #d9534f; color: #fff;
    border: none; border-radius: 4px; cursor: pointer;
  `;
  closeBtn.addEventListener("click", () => {
    document.body.removeChild(overlay);
  });
  modal.appendChild(closeBtn);

  overlay.appendChild(modal);
  document.body.appendChild(overlay);
});