const CACHE_NAME = 'field-report-v4'; // 🔁 bump this for every update

let listData = {};

const unitIdMap = {
  "Labor, Equipment & Supplies Mobilization (After Base Mileage) ": "2.2.1.1",
  "Labor, Equipment & Supplies Mobilization Credit": "2.2.1.2",
  "Bridge Installation (up to 12')": "2.2.2.1",
  "Mat Installation and Removal": "2.2.2.2",
  "Mat Usage": "2.2.2.3",
  "Additional Trucking Distance (Pickup)": "2.2.2.4",
  "Additional Trucking Distance (Semi-truck and trailer)": "2.2.2.5",
  "Third Party Sweep": "2.2.3.1",
  "Hydrovac Material Removed – Temperate": "2.2.4.1",
  "Hydrovac Material Removed – Cold": "2.2.4.2",
  "Hand Dug Material Removed – Temperate": "2.2.4.3",
  "Hand Dug Material Removed – Cold": "2.2.4.4",
  "Additional Water Management": "2.2.5.1",
  "Equipment Fine Cleaning - Temperate": "2.2.5.2",
  "Equipment Fine Cleaning – Cold": "2.2.5.3",
  "Fire Suppression (GTM CAD) ": "2.2.5.4",
  "Additional Soil Handling": "2.2.6.1",
  "Rock Excavation": "2.2.6.2",
  "Shoring - Trench Box Assembly": "2.2.6.3",
  "Shoring - Trench Box Installation and Removal": "2.2.6.4",
  "Shoring - Trench Box Usage": "2.2.6.5",
  "Extra Depth of Cover": "2.2.6.6",
  "Typical Coating Removal and Blasting": "2.2.7.1",
  "FBE Coating Removal and Blasting": "2.2.7.2",
  "Rock Protective Coating Removal and Blasting": "2.2.7.3",
  "Asbestos Containing Coating Removal": "2.2.7.4",
  "Post Asbestos Abatement Blasting": "2.2.7.5",
  "Site Support – Temperate": "2.2.8.1.1",
  "Site Support - Winter": "2.2.8.1.2",
  "Sleeve Repair (first 1,000 weld – centimeters)": "2.2.9.1",
  "Sleeve Repair (< 1,000 weld – centimeters)": "2.2.9.2",
  "Clockspring": "2.2.9.3",
  "Atlas Wrap": "2.2.9.4",
  "Petrosleeve ": "2.2.9.5",
  "Coating Application (Epoxy) – Hand Applied": "2.2.10.1",
  "Coating Application (Epoxy) – Spray Applied": "2.2.10.2",
  "Coating Application (Rock Shield) ": "2.2.10.3",
  "Restoration Credit": "2.2.11.1",
  "Topsoil & Restoration Credit": "2.2.11.2",
  "Asphalt Resurfacing": "2.2.11.3",
  "Access Route Reclamation": "2.2.11.4",
  "Labor, Equipment & Supplies Demobilization (After Base Mileage) ": "2.2.12.1",
  "VP Base": "",
  "FP Base": ""
    };

    // Example mapping from cost codes to activities
const activityMap = {
  "Dig 10441 - T&M - Clean-Up": "Specialty Seed",
  "Dig 10441 - T&M - Fire Suppression": "Fire Watch",
  "Dig 10441 - T&M - Matting": "All matting costs",
  "Dig 10441 - T&M - Other Indirect Cost": "Medical Support",
  "Dig 10441 - T&M - Site Prep": "Bridge install",
  "Dig 10441 - UPI - 2.1 FP Base": "FP Base",
  "Dig 10441 - UPI - 2.1 VP Base": "VP Base",
  "Dig 10441 - UPI - 2.2.10.1 Coating Hand Applied": "Coating Application (Epoxy) - Hand Applied",
  "Dig 10441 - UPI - 2.2.10.3 Coating Rock Shield": "Coating Application (Rock Shield)",
  "Dig 10441 - UPI - 2.2.4.3 Hand Dug Temperate": "Hand Dug Material Removed - Temperate",
  "Dig 10441 - UPI - 2.2.5.4 Fire Suppression": "Fire Suppression",
  "Dig 10441 - UPI - 2.2.6.2 Rock Excavation": "Rock Excavation",
  "Dig 10441 - UPI - 2.2.7.1 Blasting": "Typical Coating Removal & Blasting",
  "Dig 10441 - UPI - 2.2.8.1.1": "Site Support - Temperate",
  "Dig 11210 - T&M - Clean-Up": "Specialty Seed",
  "Dig 11210 - T&M - Fire Suppression": "Fire Watch",
  "Dig 11210 - T&M - Matting": "All matting costs",
  "Dig 11210 - T&M - Other Indirect Cost - Medical": "Medical Support",
  "Dig 11210 - T&M - Sweep Locates - Execution": "Sweeping, exclusively",
  "Dig 11210 - T&M - Traffic Mitigation": "Traffic Control",
  "Dig 11210 - UPI - 2.1 FP Base": "FP Base",
  "Dig 11210 - UPI - 2.1 VP Base": "VP Base",
  "Dig 11210 - UPI - 2.2.10.1 Coating Hand Applied": "Coating Application (Epoxy) - Hand Applied",
  "Dig 11210 - UPI - 2.2.10.3 Coating Rock Shield": "Coating Application (Rock Shield)",
  "Dig 11210 - UPI - 2.2.4.3 Hand Dug Temperate": "Hand Dug Material Removed - Temperate",
  "Dig 11210 - UPI - 2.2.5.4 Fire Suppression": "Fire Suppression",
  "Dig 11210 - UPI - 2.2.7.1 Blasting": "Typical Coating Removal & Blasting",
  "Dig 11210 - UPI - 2.2.8.1.1 Site Support": "Site Support - Temperate",
  "Dig 11211 - T&M - Clean-Up": "Specialty Seed",
  "Dig 11211 - T&M - Fire Suppression": "Fire Watch",
  "Dig 11211 - T&M - Other Indirect Cost - Medical": "Medical Support",
  "Dig 11211 - T&M - Site Prep": "Bridge Install",
  "Dig 11211 - T&M - Sweep Locates - Execution": "Sweeping, exclusively",
  "Dig 11211 - UPI - 2.1 VP Base": "VP Base",
  "Dig 11211 - UPI - 2.1 FP Base": "FP Base",
  "Dig 11211 - UPI - 2.2.10.1 Coating Hand Applied": "Coating Application (Epoxy) - Hand Applied",
  "Dig 11211 - UPI - 2.2.10.3 Coating Rock Shield": "Coating Application (Rock Shield)",
  "Dig 11211 - UPI - 2.2.4.3 Hand Dug Temperate": "Hand Dug Material Removed - Temperate",
  "Dig 11211 - UPI - 2.2.5.4 Fire Suppression": "Fire Suppression",
  "Dig 11211 - UPI - 2.2.7.1 Blasting": "Typical Coating Removal & Blasting",
  "Dig 11211 - UPI - 2.2.8.1.1 Site Suppport ": "Site Support - Temperate",
  "Dig 11212 - T&M - Clean-Up": "Specialty Seed",
  "Dig 11212 - T&M - Fire Suppression": "Fire Watch",
  "Dig 11212 - T&M - Matting": "All matting costs",
  "Dig 11212 - T&M - Other Indirect Cost - Medical": "Medical Support",
  "Dig 11212 - T&M - Sweep Locates - Execution": "Sweeping, exclusively",
  "Dig 11212 - T&M - Traffic Mitigation": "Traffic Control",
  "Dig 11212 - UPI - 2.1 FP Base": "FP Base",
  "Dig 11212 - UPI - 2.1 VP Base": "VP Base",
  "Dig 11212 - UPI - 2.2.10.1 Coating - Hand Applied": "Coating Application (Epoxy) - Hand Applied",
  "Dig 11212 - UPI - 2.2.10.3 Coating Rock Shield": "Coating Application (Rock Shield)",
  "Dig 11212 - UPI - 2.2.4.3 Hand Dug Temperate": "Hand Dug Material Removed - Temperate",
  "Dig 11212 - UPI - 2.2.5.4 Fire Suppression": "Fire Suppression",
  "Dig 11212 - UPI - 2.2.7.1 Blasting": "Typical Coating Removal & Blasting",
  "Dig 11212 - UPI - 2.2.8.1.1 Site Support": "Site Support - Temperate",
  "Dig 11213 - T&M - Clean-Up": "Specialty Seed",
  "Dig 11213 - T&M - Fire Suppression": "Fire Watch",
  "Dig 11213 - T&M - Indigenous Engagement": "Indigenous Monitor",
  "Dig 11213 - T&M - Matting": "All matting costs",
  "Dig 11213 - T&M - Other Indirect Cost - Brush": "DTA/Falling/Brush Removal",
  "Dig 11213 - T&M - Other Indirect Cost - Medical ": "Medical Support",
  "Dig 11213 - T&M - Sweep Locates - Exclusive": "Sweeping, exclusively",
  "Dig 11213 - T&M - Traffic Mitigation": "Traffic Control",
  "Dig 11213 - T&M - Wellpoint/Sandpoint Dewatering": "Nightshift Pumpwatch",
  "Dig 11213 - UPI - 2.1 FP Base": "FP Base",
  "Dig 11213 - UPI - 2.1 VP Base": "VP Base",
  "Dig 11213 - UPI - 2.2.10.1 Coating - Hand Applied": "Coating Application (Epoxy) - Hand Applied",
  "Dig 11213 - UPI - 2.2.10.3 Coating Rock Shield": "Coating Application (Rock Shield)",
  "Dig 11213 - UPI - 2.2.4.3 Hand Dug Temperate": "Hand Dug Material Removed - Temperate",
  "Dig 11213 - UPI - 2.2.5.1 Additional Water Management": "Additional Water Management",
  "Dig 11213 - UPI - 2.2.5.4 Fire Suppression": "Fire Suppression",
  "Dig 11213 - UPI - 2.2.7.1 Blasting": "Typical Coating Removal & Blasting",
  "Dig 11213 - UPI - 2.2.8.1.1 - Site Support": "Site Support - Temperate",
  "Dig 11214 - T&M - Clean-Up": "Specialty Seed",
  "Dig 11214 - T&M - Fire Suppression": "Fire Watch",
  "Dig 11214 - T&M - Matting": "All matting costs",
  "Dig 11214 - T&M - Other Indirect Cost - Brush": "DTA/Falling/Brush Removal",
  "Dig 11214 - T&M - Other Indirect Cost - Medical": "Medical Support",
  "Dig 11214 - T&M - Sweep Locates - Execution": "Sweeping, exclusively",
  "Dig 11214 - T&M - Traffic Mitigation": "Traffic Control",
  "Dig 11214 - UPI - 2.1 FP Base": "FP Base",
  "Dig 11214 - UPI - 2.1 VP Base": "VP Base",
  "Dig 11214 - UPI - 2.2.10.1 Coating - Hand Applied": "Coating Application (Epoxy) - Hand Applied",
  "Dig 11214 - UPI - 2.2.10.3 Coating Rock Shield": "Coating Application (Rock Shield)",
  "Dig 11214 - UPI - 2.2.4.3 Hand Dug Temperate": "Hand Dug Material Removed - Temperate",
  "Dig 11214 - UPI - 2.2.5.4 Fire Suppression": "Fire Suppression",
  "Dig 11214 - UPI - 2.2.6.1 Additional Soil Handling": "Additional Soil Handling",
  "Dig 11214 - UPI - 2.2.6.2 Rock Excavation": "Rock Excavation",
  "Dig 11214 - UPI - 2.2.6.3 Shoring box assembly": "Shoring Box - Assembly",
  "Dig 11214 - UPI - 2.2.6.4 Shoring box install / removal": "Shoring - Trench Box Installation and Removal",
  "Dig 11214 - UPI - 2.2.6.5 Shoring box usage": "Shoring - Trench Box Usage",
  "Dig 11214 - UPI - 2.2.6.7 Rock (After 10m cubed)": "Rock Excavation (After 10m cubed)",
  "Dig 11214 - UPI - 2.2.7.1 Blasting": "Typical Coating Removal & Blasting",
  "Dig 11214 - UPI - 2.2.8.1.1 Site Support": "Site Support - Temperate",
  "Dig 11215 - T&M - Clean-Up": "Specialty Seed",
  "Dig 11215 - T&M - Fire Suppression": "Fire Watch",
  "Dig 11215 - T&M - Matting": "All matting costs",
  "Dig 11215 - T&M - Other Indirect Cost - Medical": "Medical Support",
  "Dig 11215 - T&M - Sweep Locates - Execution": "Sweeping, exclusively",
  "Dig 11215 - UPI - 2.1 FP Base": "FP Base",
  "Dig 11215 - UPI - 2.1 VP Base": "VP Base",
  "Dig 11215 - UPI - 2.2.10.1 Coating - Hand Applied": "Coating Application (Epoxy) - Hand Applied",
  "Dig 11215 - UPI - 2.2.10.3 Coating Rock Shield": "Coating Application (Rock Shield)",
  "Dig 11215 - UPI - 2.2.4.3 Hand Dug Temperate": "Hand Dug Material Removed - Temperate",
  "Dig 11215 - UPI - 2.2.5.4 Fire Suppression": "Fire Suppression",
  "Dig 11215 - UPI - 2.2.6.2 Rock Excavation": "Rock Excavation",
  "Dig 11215 - UPI - 2.2.7.1 Blasting": "Typical Coating Removal & Blasting",
  "Dig 11215 - UPI - 2.2.8.1.1 Site Support": "Site Support - Temperate",
  "Dig 11256 - T&M - Clean-Up": "Specialty Seed",
  "Dig 11256 - T&M - Fire Suppression": "Fire Watch",
  "Dig 11256 - T&M - Matting": "All matting costs",
  "Dig 11256 - T&M - Other Indirect Cost": "Medical Support",
  "Dig 11256 - T&M - Traffic Mitigation": "Traffic Control",
  "Dig 11256 - UPI - 2.1 FP": "FP Base",
  "Dig 11256 - UPI - 2.1 VP": "VP Base",
  "Dig 11256 - UPI - 2.2.10.1": "Coating Application (Epoxy) - Hand Applied",
  "Dig 11256 - UPI - 2.2.10.3": "Coating Application (Rock Shield)",
  "Dig 11256 - UPI - 2.2.3.1": "Third Party Sweeps",
  "Dig 11256 - UPI - 2.2.4.3": "Hand Dug Material Removed - Temperate",
  "Dig 11256 - UPI - 2.2.5.4": "Fire Suppression",
  "Dig 11256 - UPI - 2.2.6.2": "Rock Excavation",
  "Dig 11256 - UPI - 2.2.7.1": "Typical Coating Removal & Blasting",
  "Dig 11256 - UPI - 2.2.8.1.1": "Site Support - Temperate",
  "Dig 11257 - T&M - Clean-Up": "Specialty Seed",
  "Dig 11257 - T&M - Fire Suppression": "Fire Watch",
  "Dig 11257 - T&M - Matting": "All matting costs",
  "Dig 11257 - T&M - Other Indirect Cost": "Medical Support",
  "Dig 11257 - T&M - Road & Access Construction": "Road & Access Construction",
  "Dig 11257 - T&M - Sweep Locates - Execution": "Sweeping, exclusively",
  "Dig 11257 - T&M - Traffic Mitigation": "Traffic Control",
  "Dig 11257 - UPI - 2.1 FP": "FP Base",
  "Dig 11257 - UPI - 2.1 VP": "VP Base",
  "Dig 11257 - UPI - 2.2.10.1": "Coating Application (Epoxy) - Hand Applied",
  "Dig 11257 - UPI - 2.2.10.3": "Coating Application (Rock Shield)",
  "Dig 11257 - UPI - 2.2.4.3": "Hand Dug Material Removed - Temperate",
  "Dig 11257 - UPI - 2.2.5.4": "Fire Suppression",
  "Dig 11257 - UPI - 2.2.6.3": "Shoring Box - Assembly",
  "Dig 11257 - UPI - 2.2.6.4": "Shoring - Trench Box Installation and Removal",
  "Dig 11257 - UPI - 2.2.6.5": "Shoring - Trench Box Usage",
  "Dig 11257 - UPI - 2.2.7.1": "Typical Coating Removal & Blasting",
  "Dig 11257 - UPI - 2.2.8.1.1": "Site Support - Temperate",
  "Dig 11258 - T&M - Clean-Up": "Specialty Seed",
  "Dig 11258 - T&M - Fire Suppression": "Fire Watch",
  "Dig 11258 - T&M - Matting": "All matting costs",
  "Dig 11258 - T&M - Other Indirect Cost": "Medical Support",
  "Dig 11258 - T&M - Other Indirect Cost": "DTA/Falling/Brush Removal",
  "Dig 11258 - UPI - 2.1 FP": "FP Base",
  "Dig 11258 - UPI - 2.1 VP": "VP Base",
  "Dig 11258 - UPI - 2.2.10.1": "Coating Application (Epoxy) - Hand Applied",
  "Dig 11258 - UPI - 2.2.10.3": "Coating Application (Rock Shield)",
  "Dig 11258 - UPI - 2.2.3.1": "Third Party Sweeps",
  "Dig 11258 - UPI - 2.2.5.4": "Fire Suppression",
  "Dig 11258 - UPI - 2.2.6.1": "Additional Soil Handling",
  "Dig 11258 - UPI - 2.2.7.1": "Typical Coating Removal & Blasting",
  "Dig 11258 - UPI - 2.2.8.1.1": "Site Support - Temperate",
  "Dig 11258 - UPI - 22.4.3": "Hand Dug Material Removed - Temperate",
  "Dig 11259 - T&M - Clean-Up": "Specialty Seed",
  "Dig 11259 - T&M - Fire Suppression": "Fire Watch",
  "Dig 11259 - T&M - Matting": "All matting costs",
  "Dig 11259 - T&M - Other Indirect Cost": "Medical Support",
  "Dig 11259 - UPI - 2.1 FP": "FP Base",
  "Dig 11259 - UPI - 2.1 VP": "VP Base",
  "Dig 11259 - UPI - 2.2.10.1": "Coating Application (Epoxy) - Hand Applied",
  "Dig 11259 - UPI - 2.2.10.3": "Coating Application (Rock Shield)",
  "Dig 11259 - UPI - 2.2.3.1": "Third Party Sweeps",
  "Dig 11259 - UPI - 2.2.4.3": "Hand Dug Material Removed - Temperate",
  "Dig 11259 - UPI - 2.2.5.4": "Fire Suppression",
  "Dig 11259 - UPI - 2.2.6.2": "Rock Excavation",
  "Dig 11259 - UPI - 2.2.7.1": "Typical Coating Removal & Blasting",
  "Dig 11259 - UPI - 2.2.8.1.1": "Site Support - Temperate",
  "Dig 5938 - T&M - Clean-Up": "Specialty Seed",
  "Dig 5938 - T&M - Fire Suppression": "Fire Watch",
  "Dig 5938 - T&M - Indigenous Engagement": "Indigenous Monitor",
  "Dig 5938 - T&M - Matting": "All matting costs",
  "Dig 5938 - T&M - Other Indirect Cost": "Medical Support",
  "Dig 5938 - T&M - Site Prep": "Bridge Install",
  "Dig 5938 - T&M - Sweep Locates - Execution": "Sweeping, exclusively",
  "Dig 5938 - T&M - Traffic Mitigation": "Traffic Control",
  "Dig 5938 - UPI - 2.1 FP": "FP Base",
  "Dig 5938 - UPI - 2.1 VP": "VP Base",
  "Dig 5938 - UPI - 2.2.10.1": "Coating Application (Epoxy) - Hand Applied",
  "Dig 5938 - UPI - 2.2.10.3": "Coating Application (Rock Shield)",
  "Dig 5938 - UPI - 2.2.4.3": "Hand Dug Material Removed - Temperate",
  "Dig 5938 - UPI - 2.2.5.4": "Fire Suppression",
  "Dig 5938 - UPI - 2.2.6.2": "Rock Excavation",
  "Dig 5938 - UPI - 2.2.6.3": "Shoring - Trench Box Assembly",
  "Dig 5938 - UPI - 2.2.6.4": "Shoring - Trench Box Installation and Removal",
  "Dig 5938 - UPI - 2.2.6.5": "Shoring - Trench Box Usage",
  "Dig 5938 - UPI - 2.2.7.1": "Typical Coating Removal & Blasting",
  "Dig 5938 - UPI - 2.2.8.1.1": "Site Support - Temperate",
  "Dig 5940 - UPI - 2.1 FP Base": "FP Base",
  "Dig 5940 - UPI - 2.1 VP Base": "VP Base",
  "Dig 5940 - UPI - 2.2.10.1 Coating - Hand Applied": "Coating Application (Epoxy) - Hand Applied",
  "Dig 5940 - UPI - 2.2.10.3 Coating Rock Shield": "Coating Application (Rock Shield)",
  "Dig 5940 - UPI - 2.2.4.3 Hand Dug Temperate": "Hand Dug Material Removed - Temperate",
  "Dig 5940 - UPI - 2.2.5.4 Fire Suppression": "Fire Suppression",
  "Dig 5940 - UPI - 2.2.6.3 Shoring box assembly": "Shoring - Trench Box Assembly",
  "Dig 5940 - UPI - 2.2.6.4 Shoring box install / removal": "Shoring - Trench Box Installation and Removal",
  "Dig 5940 - UPI - 2.2.6.5 Shoring box usage ": "Shoring - Trench Box Usage",
  "Dig 5940 - UPI - 2.2.7.1 Blasting": "Typical Coating Removal & Blasting",
  "Dig 5940 - UPI - 22.8.1.1 Site Support": "Site Support - Temperate",
  "Dig 5940 - T&M - Clean-Up": "Specialty Seed",
  "Dig 5940 - T&M- Fire Suppression": "Fire Watch",
  "Dig 5940 - T&M - Indigenous Engagement": "Indigenous Monitor",
  "Dig 5940 - T&M - Other Indirect Cost - Brush": "DTA/Falling/Brush Removal",
  "Dig 5940 - T&M - Other Indirect Cost - Medic": "Medical Support",
  "Dig 5940 - T&M - Sweep Locates - Execution": "Sweeping, exclusively",
  "Dig 6017 - T&M - Clean-Up": "Specialty Seed",
  "Dig 6017 - T&M - Fire Suppression": "Fire Watch",
  "Dig 6017 - T&M - Matting": "All matting costs",
  "Dig 6017 - T&M - Other Indirect Cost": "Medical Support",
  "Dig 6017 - T&M - Other Indirect Cost": "DTA/Falling/Brush Removal",
  "Dig 6017 - T&M - Sweep Locates - Execution": "Sweeping, exclusively",
  "Dig 6017 - T&M - Wellpoint/Sandpoint Dewatering": "Nightshift Pumpwatch",
  "Dig 6017 - UPI - 2.1 FP": "FP Base",
  "Dig 6017 - UPI - 2.1 VP": "VP Base",
  "Dig 6017 - UPI - 2.2.10.1": "Coating Application (Epoxy) - Hand Applied",
  "Dig 6017 - UPI - 2.2.10.3": "Coating Application (Rock Shield)",
  "Dig 6017 - UPI - 2.2.4.3": "Hand Dug Material Removed - Temperate",
  "Dig 6017 - UPI - 2.2.5.1": "Additional Water Management",
  "Dig 6017 - UPI - 2.2.5.4": "Fire Suppression",
  "Dig 6017 - UPI - 2.2.6.3": "Shoring - Trench Box Assembly",
  "Dig 6017 - UPI - 2.2.6.4": "Shoring - Trench Box Installation and Removal",
  "Dig 6017 - UPI - 2.2.6.5": "Shoring - Trench Box Usage",
  "Dig 6017 - UPI - 2.2.7.1": "Typical Coating Removal & Blasting",
  "Dig 6017 - UPI - 2.2.8.1.1": "Site Support - Temperate",
  "Dig 6501 - T&M - Clean-Up": "Specialty Seed",
  "Dig 6501 - T&M - Fire Suppression": "Fire Watch",
  "Dig 6501 - T&M - Matting": "All matting costs",
  "Dig 6501 - T&M - Other Indirect Cost": "Medical Support",
  "Dig 6501 - T&M - Sweep Locates - Execution": "Sweeping, exclusively",
  "Dig 6501 - T&M - Wellpoint/Sandpoint Dewatering": "Nightshift Pumpwatch",
  "Dig 6501 - UPI - 2.1 FP": "FP Base",
  "Dig 6501 - UPI - 2.1 VP": "VP Base",
  "Dig 6501 - UPI - 2.2.10.1": "Coating Application (Epoxy) - Hand Applied",
  "Dig 6501 - UPI - 2.2.10.3": "Coating Application (Rock Shield)",
  "Dig 6501 - UPI - 2.2.4.3": "Hand Dug Material Removed - Temperate",
  "Dig 6501 - UPI - 2.2.5.1": "Additional Water Management",
  "Dig 6501 - UPI - 2.2.5.4": "Fire Suppression",
  "Dig 6501 - UPI - 2.2.6.3": "Shoring - Trench Box Assembly",
  "Dig 6501 - UPI - 2.2.6.4": "Shoring - Trench Box Installation and Removal",
  "Dig 6501 - UPI - 2.2.6.5": "Shoring - Trench Box Usage",
  "Dig 6501 - UPI - 2.2.7.1": "Typical Coating Removal & Blasting",
  "Dig 6501 - UPI - 2.2.8.1.1": "Site Support - Temperate",
  "Dig 6502 - T&M - Clean-Up": "Specialty Seed",
  "Dig 6502 - T&M - Fire Suppression": "Fire Watch",
  "Dig 6502 - T&M - Indigenous Engagement": "Indigenous Monitor",
  "Dig 6502 - T&M - Matting": "All matting costs",
  "Dig 6502 - T&M - Other Indirect Cost": "Medical Support",
  "Dig 6502 - T&M - Site Prep": "Bridge Install",
  "Dig 6502 - T&M - Sweep Locates - Execution": "Sweeping, exclusively",
  "Dig 6502 - T&M - Wellpoint/Sandpoint Dewatering": "Nightshift Pumpwatch",
  "Dig 6502 - UPI - 2.1 FP": "FP Base",
  "Dig 6502 - UPI - 2.1 VP": "VP Base",
  "Dig 6502 - UPI - 2.2.10.1": "Coating Application (Epoxy) - Hand Applied",
  "Dig 6502 - UPI - 2.2.10.3": "Coating Application (Rock Shield)",
  "Dig 6502 - UPI - 2.2.4.3": "Hand Dug Material Removed - Temperate",
  "Dig 6502 - UPI - 2.2.5.1": "Additional Water Management",
  "Dig 6502 - UPI - 2.2.5.4": "Fire Suppression",
  "Dig 6502 - UPI - 2.2.6.2": "Rock Excavation",
  "Dig 6502 - UPI - 2.2.6.3": "Shoring - Trench Box Assembly",
  "Dig 6502 - UPI - 2.2.6.4": "Shoring - Trench Box Installation and Removal",
  "Dig 6502 - UPI - 2.2.6.5": "Shoring - Trench Box Usage",
  "Dig 6502 - UPI - 2.2.7.1": "Typical Coating Removal & Blasting",
  "Dig 6502 - UPI - 2.2.8.1.1": "Site Support - Temperate",
  "Dig 6503 - T&M - Clean-Up": "Specialty Seed",
  "Dig 6503 - T&M - Excavation": "Engineered Excavation Plan",
  "Dig 6503 - T&M - Fire Suppression": "Fire Watch",
  "Dig 6503 - T&M - Other Indirect Cost": "Medical Support",
  "Dig 6503 - T&M - Other Indirect Cost": "DTA/Falling/Brush Removal",
  "Dig 6503 - T&M - Sweep Locates - Execution": "Sweeping, exclusively",
  "Dig 6503 - UPI - 2.1 FP": "FP Base",
  "Dig 6503 - UPI - 2.1 VP": "VP Base",
  "Dig 6503 - UPI - 2.2.10.1": "Coating Application (Epoxy) - Hand Applied",
  "Dig 6503 - UPI - 2.2.10.3": "Coating Application (Rock Shield)",
  "Dig 6503 - UPI - 2.2.4.3": "Hand Dug Material Removed - Temperate",
  "Dig 6503 - UPI - 2.2.5.4": "Fire Suppression",
  "Dig 6503 - UPI - 2.2.6.2": "Rock Excavation",
  "Dig 6503 - UPI - 2.2.6.3": "Shoring - Trench Box Assembly",
  "Dig 6503 - UPI - 2.2.6.4": "Shoring - Trench Box Installation and Removal",
  "Dig 6503 - UPI - 2.2.6.5": "Shoring Box - Usage",
  "Dig 6503 - UPI - 2.2.6.7": "Rock Excavation (After 10m cubed)",
  "Dig 6503 - UPI - 2.2.7.1": "Typical Coating Removal & Blasting",
  "Dig 6503 - UPI - 2.2.8.1.1": "Site Support - Temperate",
  "Dig 7003 - T&M - Clean-Up": "Specialty Seed",
  "Dig 7003 - T&M - Dozer Support": "Dozer Support",
  "Dig 7003 - T&M - Fire Suppression": "Fire Watch",
  "Dig 7003 - T&M - Indigenous Engagement": "Indigenous Monitor",
  "Dig 7003 - T&M - Matting": "All matting costs",
  "Dig 7003 - T&M - Other Indirect Cost": "DTA/Falling/Brush Removal",
  "Dig 7003 - T&M - Other Indirect Cost": "Medical Support",
  "Dig 7003 - T&M - Site Prep": "Bridge Install",
  "Dig 7003 - UPI - 2.1 FP": "FP Base",
  "Dig 7003 - UPI - 2.1 VP": "VP Base",
  "Dig 7003 - UPI - 2.2.10.1": "Coating Application (Epoxy) - Hand Applied",
  "Dig 7003 - UPI - 2.2.10.3": "Coating Application (Rock Shield)",
  "Dig 7003 - UPI - 2.2.3.1": "Third Party Sweeps",
  "Dig 7003 - UPI - 2.2.4.3": "Hand Dug Material Removed - Temperate",
  "Dig 7003 - UPI - 2.2.5.1": "Additional Water Management",
  "Dig 7003 - UPI - 2.2.5.4": "Fire Suppression",
  "Dig 7003 - UPI - 2.2.6.2": "Rock Excavation",
  "Dig 7003 - UPI - 2.2.7.1": "Typical Coating Removal & Blasting",
  "Dig 7003 - UPI - 2.2.8.1.1": "Site Support - Temperate",
  "Dig 7005 - T&M - Clean-Up": "Specialty Seed",
  "Dig 7005 - T&M - Fire Suppression": "Fire Watch",
  "Dig 7005 - T&M - Matting": "All matting costs",
  "Dig 7005 - T&M - Other Indirect Cost": "Medical Support",
  "Dig 7005 - T&M - Other Indirect Cost": "DTA/Falling/Brush Removal",
  "Dig 7005 - T&M - Traffic Mitigation": "Traffic Control",
  "Dig 7005 - UPI - 2.1 FP": "FP Base",
  "Dig 7005 - UPI - 2.1 VP": "VP Base",
  "Dig 7005 - UPI - 2.2.10.1": "Coating Application (Epoxy) - Hand Applied",
  "Dig 7005 - UPI - 2.2.10.3": "Coating Application (Rock Shield)",
  "Dig 7005 - UPI - 2.2.3.1": "Third Party Sweeps",
  "Dig 7005 - UPI - 2.2.4.3": "Hand Dug Material Removed - Temperate",
  "Dig 7005 - UPI - 2.2.5.4": "Fire Suppression",
  "Dig 7005 - UPI - 2.2.6.2": "Rock Excavation",
  "Dig 7005 - UPI - 2.2.7.1": "Typical Coating Removal & Blasting",
  "Dig 7005 - UPI - 2.2.8.1.1": "Site Support - Temperate",
  "Dig 7007 - UPI - 2.1 FP": "FP Base",
  "Dig 7007 - UPI - 2.1 VP": "VP Base",
  "Dig 7007 - UPI - 2.2.10.1": "Coating Application (Epoxy) - Hand Applied",
  "Dig 7007 - UPI - 2.2.10.3": "Coating Application (Rock Shield)",
  "Dig 7007 - UPI - 2.2.3.1": "Third Party Sweeps",
  "Dig 7007 - UPI - 2.2.4.3": "Hand Dug Material Removed - Temperate",
  "Dig 7007 - UPI - 2.2.5.4": "Fire Suppression",
  "Dig 7007 - UPI - 2.2.6.2": "Rock Excavation",
  "Dig 7007 - UPI - 2.2.7.1": "Typical Coating Removal & Blasting",
  "Dig 7007 - UPI - 2.2.8.1.1": "Site Support - Temperate",
  "Dig 7007 -T&M - Clean-Up": "Specialty Seed",
  "Dig 7007 -T&M - Fire Suppression": "Fire Watch",
  "Dig 7007 -T&M - Matting": "All matting costs",
  "Dig 7007 -T&M - Other Indirect Cost": "Medical Support",
  "Dig 7009 - T&M - Clean-Up": "Specialty Seed",
  "Dig 7009 - T&M - Fire Suppression": "Fire Watch",
  "Dig 7009 - T&M - Other Indirect Cost": "Medical Support",
  "Dig 7009 - UPI - 2.1 FP": "FP Base",
  "Dig 7009 - UPI - 2.1 VP": "VP Base",
  "Dig 7009 - UPI - 2.2.10.1": "Coating Application (Epoxy) - Hand Applied",
  "Dig 7009 - UPI - 2.2.10.3": "Coating Application (Rock Shield)",
  "Dig 7009 - UPI - 2.2.3.1": "Third Party Sweeps",
  "Dig 7009 - UPI - 2.2.4.3": "Hand Dug Material Removed - Temperate",
  "Dig 7009 - UPI - 2.2.5.4": "Fire Suppression",
  "Dig 7009 - UPI - 2.2.6.1": "Additional Soil Handling",
  "Dig 7009 - UPI - 2.2.6.2": "Rock Excavation",
  "Dig 7009 - UPI - 2.2.7.1": "Typical Coating Removal & Blasting",
  "Dig 7009 - UPI - 2.2.8.1.1": "Site Support - Temperate",
  "Dig 7010 - T&M - Clean-Up": "Specialty Seed",
  "Dig 7010 - T&M - Fire Suppression": "Fire Watch",
  "Dig 7010 - T&M - Other Indirect Cost": "Medical Support",
  "Dig 7010 - UPI - 2.1 FP": "FP Base",
  "Dig 7010 - UPI - 2.1 VP": "VP Base",
  "Dig 7010 - UPI - 2.2.10.1": "Coating Application (Epoxy) - Hand Applied",
  "Dig 7010 - UPI - 2.2.10.3": "Coating Application (Rock Shield)",
  "Dig 7010 - UPI - 2.2.3.1": "Third Party Sweeps",
  "Dig 7010 - UPI - 2.2.4.3": "Hand Dug Material Removed - Temperate",
  "Dig 7010 - UPI - 2.2.5.4": "Fire Suppression",
  "Dig 7010 - UPI - 2.2.6.2": "Rock Excavation",
  "Dig 7010 - UPI - 2.2.7.1": "Typical Coating Removal & Blasting",
  "Dig 7010 - UPI - 2.2.8.1.1": "Site Support - Temperate",
  "Pending CR": "Pending CR",
  "All Digs - Abrasives": "Sandblast Media",
  "All Digs - Coating": "Coating Materials",
  "All Digs - Rock Guard": "Rock Guard",
  "All - Small Tools & Consumables": "Small Tools & Consumables",
  "All Digs - Pre Planning": "Pre Planning",
  "All Digs - Composite Repair": "Composite Repair",
  
    // Add as many as you want
  };
  
  function loadLists() {
  return fetch("/data/dropdownlists.json")
    .then(res => res.json())
    .then(data => {
      console.log("✅ Dropdown list data:", data);

      listData = data;
      populateSelect("projectNameSelect", data.projectNames);
      populateSelect("clientSelect", data.clients);
      populateSelect("locationSelect", data.locations);
      populateSelect("weatherSelect", data.weather);
      populateSelect("clientProjectNumberSelect", data.clientProjectNumbers);
      populateSelect("projectNumberSelect", data.projectNumbers);

      document.querySelectorAll(".manpowerSelect").forEach(select => {
        populateSelectElement(select, data.manpower);
      });

      document.querySelectorAll(".classificationSelect").forEach(select => {
        populateSelectElement(select, data.classification);
      });

      document.querySelectorAll(".equipmentSelect").forEach(select => {
        populateSelectElement(select, data.equipment);
      });

      document.querySelectorAll(".UofMSelect").forEach(select => {
        populateSelectElement(select, data.UofM);
      });

      document.querySelectorAll(".unitUsedSelect").forEach(select => {
        populateSelectElement(select, data.UnitsUsedList);
      });

      populateCostCodes(data.costCodes);
      attachCostCodeListeners();
      linkTopToBottomCostCodesWithOverride();
      attachEquipmentRowListeners();
      attachSubcontractorRowListeners();
      attachUnitIdListeners();

      // ✅ Make all <select> elements searchable using Tom Select
document.querySelectorAll('select').forEach(select => {
  new TomSelect(select, {
    create: false,
    sortField: {
      field: "text",
      direction: "asc"
    },
    placeholder: "Select...",
    render: {
      item: function(data, escape) {
        // ✅✅✅ NEW: render placeholder properly for PDF + UI
        return data.text ? `<div>${escape(data.text)}</div>` : "";
      }
    }
  });
});


    });
}

      // Optional: debug client selection
      //document.getElementById("clientSelect").addEventListener("change", function () {
      //  console.log("Selected client:", this.value);
      // });
      // })
     // .catch(err => console.error("Failed to load dropdown lists", err));
    //  }
  

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

    if (costCodeSelect && activityField) {
      costCodeSelect.addEventListener("change", () => {
        const code = costCodeSelect.value;
        activityField.value = activityMap[code] || "";
      });
    }
  }
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

function attachUnitIdListeners() {
    document.querySelectorAll(".unitUsedSelect").forEach((unitSelect, index) => {
      const unitIdInputs = document.querySelectorAll(".unitIdInput");
    
      unitSelect.addEventListener("change", () => {
        const selected = unitSelect.value;
        const unitIdField = unitIdInputs[index];
    
        if (unitIdField) {
          unitIdField.value = unitIdMap[selected] || "";
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
              const img = document.createElement("img");
              img.src = e.target.result;
            
              const removeBtn = document.createElement("button");
              removeBtn.textContent = "✖";
              removeBtn.className = "remove-btn";
            
              removeBtn.addEventListener("click", event => {
                event.stopPropagation();
                cell.classList.remove("has-image");
                cell.innerHTML = "";
              });
            
              cell.innerHTML = "";
              cell.classList.add("has-image");
              cell.appendChild(img);
              cell.appendChild(removeBtn);
            
              // ✅ Add download link (to download image to ipad)
             // const backupLink = document.createElement("a");
             // backupLink.href = e.target.result;
             // backupLink.download = `photo_${Date.now()}.jpg`;
             // backupLink.textContent = "📥 Tap to save to device";
             // backupLink.className = "photo-download-link";
             // cell.appendChild(backupLink);
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


  // 👇 NEW: Debug preview
  // console.log("🔍 Form data to be saved:", formData);
  // alert("✅ Form data logged to console for debug.\nOpen DevTools (F12 > Console) to view it.");


  const today = new Date();
const dd = String(today.getDate()).padStart(2, '0');
const mm = String(today.getMonth() + 1).padStart(2, '0');
const yyyy = today.getFullYear();
const dateStr = `${dd}_${mm}_${yyyy}`;

const projectNumber = document.getElementById("projectNumberSelect")?.value?.trim().replace(/\s+/g, "_") || "####";
const supervisorFullName = document.getElementById("omhsupervisor")?.value?.trim() || "XX";
const nameParts = supervisorFullName.split(" ");
const initials = nameParts.map(part => part[0]?.toUpperCase()).join("").slice(0, 2) || "XX";

const defaultFilename = `DFR_${initials}_DIG_${projectNumber}_${dateStr}`;
const filename = prompt("Enter a filename to save:", defaultFilename);
if (!filename) return;

  const blob = new Blob([JSON.stringify(formData, null, 2)], { type: "application/json" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = filename + ".json";
  a.click();
}

// --- Restore Function ---
function restoreForm(data) {
  Object.keys(data).forEach(id => {
    if (["photos", "manpowerHours", "equipmentHours", "subcontractorHours"].includes(id)) return;
    const el = document.getElementById(id);
    if (el) {
  if (el.type === "checkbox") {
    el.checked = data[id];
  } else {
    el.value = data[id];

    // ✅ Trigger Tom Select update if it exists
    if (el.tomselect) {
      el.tomselect.setValue(data[id]);
    }
  }

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

  document.querySelectorAll("input, textarea, select").forEach(el => {
    if (el.id) {
      data[el.id] = el.type === "checkbox" ? el.checked : el.value;
    }
  });

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
    requestAnimationFrame(() => restoreForm(data));
  } catch (err) {
    console.warn("⚠️ Failed to restore autosaved form:", err);
  }
}

  });
});

document.getElementById("resetFormBtn")?.addEventListener("click", () => {
  const confirmReset = confirm("Are you sure you want to clear the form and reset everything?");
  if (!confirmReset) return;

  // Clear all input, textarea, select fields
  document.querySelectorAll("input, textarea, select").forEach(el => {
    if (el.type === "checkbox") {
      el.checked = false;
    } else {
      el.value = "";
    }
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));

    // ✅ Clear Tom Select values
document.querySelectorAll("select").forEach(select => {
  if (select.tomselect) {
    select.tomselect.clear();  // Clears the visible value
  }
});


  });

  // Clear dynamic totals
  document.querySelectorAll(".total-field, .equipment-total, .sub-total-field").forEach(input => {
    input.value = "";
  });

  // Clear photo cells
  document.querySelectorAll(".photo-cell").forEach(cell => {
    cell.classList.remove("has-image");
    cell.innerHTML = "";
  });

  // Clear local storage autosave
  localStorage.removeItem("autosavedDFR");

  // 🔥 Clear signature canvases
    document.querySelectorAll(".signature-canvas").forEach(canvas => {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      canvas.style.display = "none";
    });
  
  // 🔥 Reset signature areas back to text entry
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

  // Remove Tom Select before export
document.querySelectorAll('select').forEach(select => {
  if (select.tomselect) {
    select.tomselect.destroy();  // remove Tom Select styling
  }
});


  // Render the canvas from the visible form
  const canvas = await html2canvas(element, {
  scale: 3,          // 🔥 bump from 2 → 3 for higher pixel density
  useCORS: true,
  backgroundColor: null // optional: transparent background if needed
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

  const row = document.createElement("tr");
  row.classList.add("manpower-row", "manual-row");

  row.innerHTML = `
    <td><input type="text" id="manpowerselect${extraManpowerCount}" class="manual-input" /></td>
    <td><input type="text" id="classificationselect${extraManpowerCount}" class="manual-input" /></td>
    <td class="total-cell"><input type="number" value="0.00" readonly class="total-field" /></td>
    <td class="center-checkbox"><input type="checkbox" id="checkbox${extraManpowerCount}" /></td>
    ${[...Array(6)].map(() => `<td class="hour-cell"><input type="number" class="hour-input" step="0.5" min="0" /></td>`).join("")}
    <td style="position: relative;">
      <input type="text" id="notes${extraManpowerCount}" style="padding-right: 30px;" />
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
  });

  // ✅ Recalculate totals for new row
  const hourInputs = row.querySelectorAll(".hour-cell input");
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
    <td><input type="text" id="uofm${extraEquipCount}" /></td>
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
  <input type="text" id="notes3${extraSubCount}" style="padding-right: 30px;" />
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
});

 




