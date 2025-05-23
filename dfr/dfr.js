const CACHE_NAME = 'field-report-v4'; // 🔁 bump this for every update

const listData = {


clients: [
    "Enbridge",
    "TC Energy",
    "Pembina",
    "FortisBC",
    "ATCO"
  ],

  clientProjectNumbers: [
    "CWP-406",
    "CWP-407"
  ],

  projectNames: [
    "CWP-406",
    "CWP-407"
  ],

  weather: [
    "Sunny",
    "Partly Cloudy",
    "Overcast",
    "Light Rain",
    "Heavy Rain",
    "Moderate Rain",
    "Fog",
    "Windy",
    "Hail",
    "Light Snow",
    "Moderate Snow",
    "Heavy Snow",
    "Thunderstorms"
  ],

  projectNumbers: [
    "10441",
    "11210",
    "11211",
    "11212",
    "11213",
    "11214",
    "11215",
    "11256",
    "11257",
    "11258",
    "11259",
    "5938",
    "5940",
    "6017",
    "6501",
    "6502",
    "6503",
    "7003",
    "7005",
    "7007",
    "7009",
    "7010",
    "Pending CR",
    "All Digs - Abrasives",
    "All Digs - Coating",
    "All Digs - Rock Guard",
    "All - Small Tools & Consumables",
    "All Digs - Pre Planning",
    "All Digs - Composite Repair"
  ],

  manpower: [
"Aaron Swan",
"Abdi Jama",
"Adam King",
"Adrienne Laporte",
"Aileena Keith",
"Aileena Marie",
"Alexandra Klimchuk ",
"Alicia Swan",
"Andre Godel",
"Annette Swan",
"Barry Thompson",
"Bernard Hughes",
"Blaine Squires",
"Blair Smith",
"Brady Loring",
"Brenagan Augier",
"Brent Kelly",
"Brian Miller",
"Brittany Rabbitt",
"Caitlyn Macaulay",
"Cam Fossum",
"Cameron Gilmore",
"Cayde McMullin",
"Carson Bischoff",
"Carson James",
"Chad Henderson",
"Chris Perron",
"Christy Hamilton",
"Cloud Diablo",
"Cody Shindle",
"Colton Amlin",
"Cory Pelkman (D&L)",
"Craig Erickson",
"Craig Welsman",
"Damon Keith",
"Dan Therrien",
"Daniel Pearo",
"Danielle Nelson",
"Darren Donley",
"Darryl Meade (GPS)",
"David Guild",
"Del James",
"Derek Seward",
"Derek Swan",
"Derick Bogar",
"Derwood Smith",
"Devan McLean",
"Devon McCoy",
"Dion Lahoda",
"Dwayne Walkden",
"Dylan Reid",
"Emerson Beaudet",
"Emily Gilbert",
"Erik Bergstrom",
"Ethan Long",
"Gabe Quigley",
"Gage Pierobon",
"Gary Gushue",
"Geoffrey McLeod",
"Grant Mercer",
"Greg Matthiessen",
"Gregory MacMillan",
"Haden Nordick",
"Iven Davidson",
"Izzy Heath",
"Jacob Zevola",
"James Leach",
"Jason Korotash",
"Jason Stephenson",
"Jason VanVeen",
"Jeffery Harriman",
"Jen Chubb",
"Jeremy Fossum",
"Jeremy Nellis",
"Jody Bauer",
"John Quigley",
"Jordan Robinson (Norwest)",
"Jordan Romano",
"Joseph Vilac",
"Josh Kennedy (Norwest)",
"Josh Lugossy",
"Josh Lyons",
"Josh Schuett",
"Justin Kato",
"Kam Anthony",
"Kari Smith",
"Kelly Debert",
"Kenver New",
"Kevin Boyce",
"Kevin Ross ",
"Kurtis Hagen",
"Kyle Larder",
"Lauren Smith",
"Liam Dan",
"Lincoln Wood",
"Linda Gelazus",
"Linda Hamel",
"Lorinda Downey",
"Lou Maslin",
"Lucas Hall",
"Luke Carriou",
"Marc Trudel",
"Marco Van Delden",
"Mark Wilson",
"Matthew Jones",
"Matthew Neilsen",
"Melissa Medwid",
"Michael Bruno",
"Michael Martin",
"Michael Mclelan",
"Mike Cobban",
"Miles Sushelnitski",
"Mitch Wilton",
"Mladen Jovic",
"Moin Padaniya",
"Nate Glenn",
"Nathan Stewart",
"Nicole Golos",
"Noah Stiles",
"Nolan Conroy",
"Patrick Hampson",
"Quinton Tutin",
"Reed Golos",
"Richard Dalrymple",
"Rick Flegel",
"River Block",
"Rod McLaren",
"Rutika Patel",
"Ryan Bernicky",
"Sam Kisser",
"Samantha Stevenson",
"Sandra Quigley",
"Sarah Booth",
"Sarah Simkin",
"Scott Medley ",
"Sean Menzel",
"Shane Ayers",
"Shane Jackson",
"Shea McNeil",
"Sheldon Traun",
"Simon Ramsey",
"Stacey Glanville",
"Stefanie Cox",
"Stephanie Henderson",
"Sterling Nimco",
"Steven Misumi",
"Taylor Hegberg",
"Theodore Uqhart",
"Theressa Bartee",
"Thomas Gregory",
"Tim Mason",
"Trent Morrison",
"Trent Zevola",
"Trevor Dewey",
"Tristan Vigliotti",
"Troy Connett",
"Tyler Anderson",
"Ty Stokes",
"Tyler Brown",
"Tyler Lothian",
"William (Bill) Erskine",
"Wilson Liang",
"Wyatt Williams"
  ],

  classification: [
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
  ],

   equipment: [
"01-10 - Chevrolet Silverado 3500 (Trucks - Crew) (Trucks - Crew)",
"01-23 - Dodge Ram3500 (Trucks - Crew) (Trucks - Crew)",
"01-27 - GMC Sierra 3500 (Trucks - Crew) (Trucks - Crew)",
"01-34 - GMC Sierra 3500 (Trucks - Crew) (Trucks - Crew)",
"01-35 - GMC Sierra 3500 (Trucks - Crew) (Trucks - Crew)",
"01-36 - GMC Sierra 3500 (Trucks - Crew) (Trucks - Crew)",
"01-37 - GMC Sierra 1500 (Trucks - Crew) (Trucks - Crew)",
"01-38 - GMC Sierra 3500 (Trucks - Crew) (Trucks - Crew)",
"01-39 - GMC Sierra 3500 (Trucks - Crew) (Trucks - Crew)",
"01-41 - GMC Sierra 3500 (Trucks - Crew) (Trucks - Crew)",
"01-42 - GMC Sierra 3500 (Trucks - Crew) (Trucks - Crew)",
"01-44 - GMC Sierra 3500 (Trucks - Crew) (Trucks - Crew)",
"01-45 - GMC Sierra 3500 (Trucks - Crew) (Trucks - Crew)",
"01-49 - GMC Sierra 3500 (Trucks - Crew) (Trucks - Crew)",
"01-50 - GMC Sierra 3500 (Trucks - Crew) (Trucks - Crew)",
"01-51 - Chevrolet Silverado 3500 (Trucks - Crew) (Trucks - Crew)",
"01-52 - GMC Sierra 3500 (Trucks - Crew) (Trucks - Crew)",
"01-54 - Chevrolet Silverado 3500 (Trucks - Crew) (Trucks - Crew)",
"01-55 - Chevrolet Silverado 3500 (Trucks - Crew) (Trucks - Crew)",
"CT-001 - Dion Lahoda Truck (Trucks - Crew) (Trucks - Crew)",
"01-58 - Chevrolet Silverado 3500 (Trucks - Crew) (Trucks - Crew)",
"01-69 - Chev 1500 (Trucks - Crew) (Trucks - Crew)",
"01-70 - GMC Sierra 3500 (Trucks - Crew) (Trucks - Crew)",
"CT-005 - Adam King Truck (Trucks - Crew) (Trucks - Crew)",
"01-71 - Chevrolet Silverado 1500 (Trucks - Crew) (Trucks - Crew)",
"CT-006 - Sean Menzel Truck (Trucks - Crew) (Trucks - Crew)",
"CT-007 - Dave Mallon Truck (Trucks - Crew) (Trucks - Crew)",
"01-72 - Chevrolet Silverado 3500 (Trucks - Crew) (Trucks - Crew)",
"CT-008 - Mike Martin Truck (Trucks - Crew) (Trucks - Crew)",
"CT-009 - Dwayne Walkden Truck (Trucks - Crew) (Trucks - Crew)",
"01-73 - Chevrolet Silverado 3500 (Trucks - Crew) (Trucks - Crew)",
"01-74 - Chevrolet Silverado 3500 (Trucks - Crew) (Trucks - Crew)",
"01-75 - Chevrolet Silverado 3500 (Trucks - Crew) (Trucks - Crew)",
"01-76 - Ford Transit Van (Trucks - Crew) (Trucks - Crew)",
"01-77 - Ford Transit Van (Trucks - Crew) (Trucks - Crew)",
"01-28 - GMC Sierra 3500-Flat Deck(Trucks - Crew) (Trucks - Crew)",
"01-30 - GMC Sierra 3500-Flat Deck (Trucks - Crew) (Trucks - Crew)",
"01-31 - Chevrolet Silverado 3500 (Trucks-Crew) (Trucks - Crew)",
"01-43 - GMC Sierra 3500 (Trucks - Crew) (Trucks - Crew)",
"CT-011 - Mladen Jovic (Trucks - Crew) (Trucks - Crew)",
"01-78 - Chevrolet Silverado 3500 (Trucks - Crew) (Trucks - Crew)",
"01-79 - Chevrolet Silverado 3500 (Trucks - Crew) (Trucks - Crew)",
"01-80 - Chevrolet Silverado 3500 (Trucks - Crew) (Trucks - Crew)",
"01-81 - Chevrolet Silverado 3500 (Trucks - Crew) (Trucks - Crew)",
"01-83 - Chevrolet Silverado 3500 (Trucks - Crew) (Trucks - Crew)",
"01-82 - Chevrolet Silverado 3500 (Trucks - Crew) (Trucks - Crew)",
"CT-002 - Del James (Crew - Truck) (Trucks - Crew)",
"CT-003 - Craig Welsman (Trucks - Crew) (Trucks - Crew)",
"CT-004 - Craig Erickson - QA/QC Coordinator (Trucks - Crew) (Trucks - Crew)",
"CT-010 - Justin Kato Truck (Trucks - Crew) (Trucks - Crew)",
"01-46 - Chevrolet Silverado 3500 (Trucks - Medic) (Trucks - Medic (Enbridge))",
"01-57 - Chevrolet Silverado 3500 (Trucks - Medic) (Trucks - Medic (Enbridge))",
"01-71 - Chevrolet 1500 (Trucks-Manager) (Trucks - Manager)",
"01-66 - Ford F150 (Trucks - Manager) (Trucks - Manager)",
"01-68 - Ford F150 (Trucks - Manager) (Trucks - Manager)",
"01-59 - Ford F150 (Trucks - Manager) (Trucks - Manager)",
"01-53 - Chevrolet 1500 (Trucks-Manager) (Trucks - Manager)",
"02-05 - Dodge 5500 (Sandblast Truck) (Trucks - Sandblast)",
"02-14 - Ford F550 (Sandblast Truck) (Trucks - Sandblast)",
"02-15 - Ford F550 (Sandblast Truck) (Trucks - Sandblast)",
"02-16R - Ford F550 (Sandblast Truck) (Trucks - Sandblast)",
"02-08 - Ford F550 (Flatdecks) (Trucks - Flatdecks)",
"02-09 - Ford F550 (Flatdecks) (Trucks - Flatdecks)",
"02-14 - Ford F550 (Flatdeck) (Trucks - Flatdecks)",
"02-15 - Ford F550 (Flatdeck) (Trucks - Flatdecks)",
"02-12(AWS) - Ford F450 (Flatdeck) (Trucks - Flatdecks)",
"02-07 - Dodge 5500 Service/Mechanic Truck (Trucks - Service/Mechanic)",
"02-13 - Ford F-550 Service/Mechanic Truck (Trucks - Service/Mechanic)",
"03-32 - Kenworth T-800 (Tractors (Trailers Included)) (Trucks 03 - Tractors (Trailers Included))",
"03-38 - Kenworth T-800 (Tractors (Trailers Included)) (Trucks 03 - Tractors (Trailers Included))",
"03-31 - Peterbuilt Flatdeck (Crane Truck) (Trucks 03 - Picker Trucks 6T)",
"03-35 - Ford F750 ( Water (Fire/Wash) (Trucks 03 - Water (Fire/Wash))",
"03-36 - Ford F750 (Fire/Wash) (Trucks 03 - Water (Fire/Wash))",
"04-01 - Snake River 12' Dump Trailer ( T/A Dump) (Trailers - T/A Dump)",
"04-10 - Snake River 12' Dump Trailer ( T/A Dump) (Trailers - T/A Dump)",
"04-08 - Snake River 12' Dump Trailer ( T/A Dump) (Trailers - T/A Dump)",
"04-47 - Snake River 12' Dump Trailer ( T/A Dump) (Trailers - T/A Dump)",
"04-48 - Snake River 12' Dump Trailer ( T/A Dump) (Trailers - T/A Dump)",
"04-04 - Snake River 10' Dump Trailer S/A Dump (Trailers - S/A Dump)",
"04-06 - Snake River 10' Dump Trailer S/A Dump (Trailers - S/A Dump)",
"04-12 - Snake River 8' Dump Trailer S/A Dump (Trailers - S/A Dump)",
"04-05 - Fire Trailer 1025Gal w/ Fire, Pump, Hose & Tools (Trailers - Fire Response)",
"04-11 - Fire Trailer 1025Gal w/ Fire, Pump, Hose & Tools (Trailers - Fire Response)",
"04-15 - Fire Trailer 1025Gal w/ Fire, Pump, Hose & Tools (Trailers - Fire Response)",
"04-50 - Fire Trailer 500Gal w/ Fire Pump, Hose and Tools (Trailers - Fire Response)",
"04-51 - Fire Trailer 500Gal w/ Fire Pump, Hose and Tools (Trailers - Fire Response)",
"04-52R - Fire Trailer 1000 Gal (Trailers - Fire Response)",
"04-53R - Fire Trailer 500Gal w/ Fire Pump, Hose and Tools (Trailers - Fire Response)",
"04-54R - Fire Trailer 500Gal w/ Fire Pump, Hose and Tools (Trailers - Fire Response)",
"04-55R - Fire Trailer 500Gal w/ Fire Pump, Hose and Tools (Trailers - Fire Response)",
"04-56R - Fire Trailer 500Gal w/ Fire Pump, Hose and Tools (Trailers - Fire Response)",
"04-57R - Fire Trailer 500Gal w/ Fire Pump, Hose and Tools (Trailers - Fire Response)",
"04-58R - Fire Trailer 500Gal w/ Fire Pump, Hose and Tools (Trailers - Fire Response)",
"04-59R - Fire Trailer 500Gal w/ Fire Pump, Hose and Tools (Trailers - Fire Response)",
"04-60R - Fire Trailer 500Gal w/ Fire Pump, Hose and Tools (Trailers - Fire Response)",
"04-62R - Fire Trailer 500Gal w/ Fire Pump, Hose and Tools (Trailers - Fire Response)",
"04-61R - Fire Trailer 500Gal w/ Fire Pump, Hose and Tools (Trailers - Fire Response)",
"04-64R - Fire Trailer 500Gal w/ Fire Pump, Hose and Tools (Trailers - Fire Response)",
"04-65R - Fire Trailer 1000 Gal (Trailers - Fire Response)",
"04-66R - Fire Trailer 1000 Gal (Trailers - Fire Response)",
"04-71R - Fire Trailer 500Gal w/ Fire Pump, Hose and Tools (Trailers - Fire Response)",
"04-72R - Fire Trailer 500Gal w/ Fire Pump, Hose and Tools (Trailers - Fire Response)",
"04-73R - Fire Trailer 500Gal w/ Fire Pump, Hose and Tools (Trailers - Fire Response)",
"04-74R - Fire Trailer 500Gal w/ Fire Pump, Hose and Tools (Trailers - Fire Response)",
"04-75R - Fire Trailer 1000 Gal (Trailers - Fire Response)",
"04-77R - Fire Trailer 1000 Gal (Trailers - Fire Response)",
"06-2001 - Honda EB2200 Generator (Generators (Gas 2000 Watt))",
"06-2002 - Honda EB2200 Generator (Generators (Gas 2000 Watt))",
"06-2003 - Honda EB2200 Generator (Generators (Gas 2000 Watt))",
"06-2004 - Honda EB2200 Generator (Generators (Gas 2000 Watt))",
"06-2005 - Honda EB2200 Generator (Generators (Gas 2000 Watt))",
"06-2006 - Honda EB2200 Generator (Generators (Gas 2000 Watt))",
"06-2007 - Honda EB2200 Generator (Generators (Gas 2000 Watt))",
"06-3001 - Honda EU3000 Generator (Generators (Gas 3000 Watt))",
"06-3002 - Honda EM3500 Generator (Generators (Gas 3000 Watt))",
"06-3003 - Honda EM3800 Generator (Generators (Gas 3000 Watt))",
"06-3004 - Honda EM3800 Generator (Generators (Gas 3000 Watt))",
"04-07 - PJ Flat Deck Trailer (Trailers - T/A Flatdeck)",
"04-49 - Double A 20' Flatdeck Trailer (Trailers - T/A Flatdeck)",
"04-42(AWS) - Double A 20' Flat Deck (Trailers - T/A Flatdeck)",
"04-65R - Canada Trailers Flat Deck (Trailers - T/A Flatdeck)",
"04-09 - T/A Gooseneck Flatdeck Trailer (Trailers - T/A Gooseneck)",
"04-34 - T/A Gooseneck Flatdeck Trailer (Trailers - T/A Gooseneck)",
"04-44(AWS) - 20' Big Tex Gooseneck (Trailers - T/A Gooseneck)",
"04-27 - 22ft Office Trailer (Trailers - Office 22')",
"04-13 - 22ft Office Trailer (Trailers - Office 22')",
"04-67R - 22' Office Trailer (Trailers - Office 22')",
"04-68R - 22' Office Trailer (Trailers - Office 22')",
"04-22 - Enclosed Trailer (Trailers - T/A Enclosed)",
"04-38 - T/A Enclosed 20' Trailer (Trailers - T/A Enclosed)",
"04-43(AWS) - T/A Enclosed Trailer (Trailers - T/A Enclosed)",
"04-45(AWS) - T/A Enclosed Trailer (Trailers - T/A Enclosed)",
"04-52 - T/A Enclosed Trailer (Trailers - T/A Enclosed)",
"04-53 - T/A Enclosed Trailer (Trailers - T/A Enclosed)",
"04-54 - T/A Enclosed Trailer (Trailers - T/A Enclosed)",
"04-76R - T/A Enclosed Trailer (Trailers - T/A Enclosed)",
"04-36 - 53ft Tool/Office Trailer (Trailers - Tool Crib)",
"04-37 - 53ft Tool/Office Trailer (Trailers - Tool Crib)",
"05-06 - IngersolRand XP375 (Compressors) (Compressors (375cfm) Towable)",
"05-09 - IngersolRand XP375 (Compressors) (Compressors (375cfm) Towable)",
"05-11 - Doosan 375 (Compressors) (Compressors (375cfm) Towable)",
"05-12 - Doosan 375 (Compressors) (Compressors (375cfm) Towable)",
"05-18 - Doosan 375 (Compressors) (Compressors (375cfm) Towable)",
"05-10 - Doosan P425 (Compressors (425cfm) Towable)",
"05-15 - Sullair 260 (Compressors) (Compressors (250/260/300cfm) SKID Mount)",
"05-16 - Sullair 260 (Compressors) (Compressors (250/260/300cfm) SKID Mount)",
"05-17 - Atlas Copco 300 (Compressors) (Compressors (250/260/300cfm) SKID Mount)",
"06-02 - Allmond ML20 (Lightplant) (Lightplant/Powerstations (20kw))",
"06-03 - Allmond ML20 (Lightplant) (Lightplant/Powerstations (20kw))",
"06-07 - Doosan L20 (Lightplant) (Lightplant/Powerstations (20kw))",
"06-08 - Doosan L20 (Lightplant) (Lightplant/Powerstations (20kw))",
"06-12 - Magnum MLT5200 (Lightplant) (Lightplant/Powerstations (20kw))",
"06-13 - Magnum MLT5200 (Lightplant) (Lightplant/Powerstations (20kw))",
"06-14 - Magnum MLT5200 (Lightplant) (Lightplant/Powerstations (20kw))",
"06-16 - Magnum MLT5200 (Lightplant) (Lightplant/Powerstations (20kw))",
"06-04 - Vermeer BC1000 Wood Chipper (Wood Chippers)",
"06-09 - Allmond 8kw (Lightplant/Powerstations (8kw))",
"06-10 - Allmond 8kw (Lightplant/Powerstations (8kw))",
"06-11 - Allmond 8kw (Lightplant/Powerstations (8kw))",
"06-06 - Doosan 6KW LSWKU (Lightplant/Powerstations (8kw))",
"06-24 - Generac 6kw (Lightplant/Powerstations (8kw))",
"06-25 - Generac 6kw (Lightplant/Powerstations (8kw))",
"06-26 - Generac 6kw (Lightplant/Powerstations (8kw))",
"06-27 - Generac 6kw (Lightplant/Powerstations (8kw))",
"06-15 - Hi Power Multi Phase HRJW 115 T6 - 115KW Generator (Generators (90-115kw))",
"06-17 - Wacker G25 20kw (Generators (20-25kw))",
"06-01 - Mangum 20kw (Generators (20-25kw))",
"06-22 - Multiquip Whisperwatt 25kw (Generators (20-25kw))",
"06-21 - Atlas Copco 25Kw (Generators (20-25kw))",
"06-05 - Mcelrath/Vermeer V500LE-HD HydroVac (HydroVac Units)",
"17-01 - Volvo PL3005D Pipe Layers (Pipelayers)",
"17-02 - Volvo PL3005E Pipe Layers (Pipelayers)",
"17-03 - Volvo PL3005E Pipe Layers (Pipelayers)",
"17-04 - Caterpillar 583K (Pipelayers)",
"17-05 - Caterpillar 583K (Pipelayers)",
"07-19 - John Deere 50D Excavator (Excavators - 50 Sized (2k-20k lbs))",
"07-38 - John Deere 60G Excavator (Excavators - 50 Sized (2k-20k lbs))",
"07-20 - Hitachi 250LC-5 Excavator (Excavators - 240/245/250 Sized (51k-59k lbs))",
"07-22 - John Deere 250G Excavator (Excavators - 240/245/250 Sized (51k-59k lbs))",
"07-26 - Hitachi 250LC-5N Excavator (Excavators - 240/245/250 Sized (51k-59k lbs))",
"07-27 - John Deere 250G-LC Excavator (Excavators - 240/245/250 Sized (51k-59k lbs))",
"07-28 - John Deere 250G-LC Excavator (Excavators - 240/245/250 Sized (51k-59k lbs))",
"07-24 - Hitachi 245 LC Excavator (Excavators - 240/245/250 Sized (51k-59k lbs))",
"07-17 - John Deere 240D Excavator (Excavators - 240/245/250 Sized (51k-59k lbs))",
"07-18 - Hitachi ZX240LC-3 Excavator (Excavators - 240/245/250 Sized (51k-59k lbs))",
"07-34 - John Deere 250G-LC Excavator (Excavators - 240/245/250 Sized (51k-59k lbs))",
"07-40 - John Deere 245P Excavator (Excavators - 240/245/250 Sized (51k-59k lbs))",
"07-42 - Hitachi ZX250-6 Excavator (Excavators - 240/245/250 Sized (51k-59k lbs))",
"08-04 - Caterpiller D6N LGP Bulldozer (Bulldozer (M) 130-190 FWHP)",
"08-10 - Caterpiller D6N LGP Bulldozer (Bulldozer (M) 130-190 FWHP)",
"08-06 - Doosan DL200TC Loaders (Loaders - Wheeled (2.5 cu yd))",
"08-09 - Bobcat T870 Loaders (Tracked Skid Steer)",
"08-13 - Bobcat T870 Loaders (Tracked Skid Steer)",
"08-01 - Bobcat T320 Loaders (Tracked Skid Steer)",
"08-15 - Bobcat S250 Loaders (Tracked Skid Steer)",
"08-16 - Bobcat T870 Loaders (Tracked Skid Steer)",
"08-17 - Bobcat T870 Loaders (Tracked Skid Steer)",
"08-18R - Bobcat T770 Loader (Tracked Skid Steer)",
"08-11 - Caterpiller D3KLGP Bulldozer (Bulldozer (Sm) 75-97 FWHP)",
"08-12 - Morooka MST800VD Tracked Carrier/Dumpers (Tracked Carrier/Dumpers)",
"09-01 - Sandblasting skid unit w/ Air cooler, dryer, breather (Blasting - Sand Units)",
"09-02 - Sandblasting skid unit w/ Air cooler, dryer, breather (Blasting - Sand Units)",
"09-03 - Sandblasting skid unit w/ Air cooler, dryer, breather (Blasting - Sand Units)",
"09-04 - Sandblasting skid unit w/ Air cooler, dryer, breather (Blasting - Sand Units)",
"09-05 - Sandblasting skid unit w/ Air cooler, dryer, breather (Blasting - Sand Units)",
"09-06 - Sandblasting skid unit w/ Air cooler, dryer, breather (Blasting - Sand Units)",
"09-07 - Sandblasting skid unit w/ Air cooler, dryer, breather (Blasting - Sand Units)",
"09-08 - Sandblasting skid unit w/ Air cooler, dryer, breather (Blasting - Sand Units)",
"09-18 - Karcher Dry Ice Blaster (Blasting - Ice Units)",
"10-01 - Volvo A25E 6x6 Off Highway Articulating Trucks (Off Highway Articulating Trucks (30T))",
"10-02 - Volvo A25E 6x6 Off Highway Articulating Trucks (Off Highway Articulating Trucks (30T))",
"10-03R - Volvo A30F (Off Highway Articulating Trucks (30T))",
"11-04 - BOMAG BT 65/4 Compactors - Jumping Jacks (Compactors - Jumping Jacks)",
"11-05 - BOMAG BT 65/4 Compactors - Jumping Jacks (Compactors - Jumping Jacks)",
"11-01 - Ammann AVH 5020 E Plate Tampers (Compactors - Plate Tampers 1000lb)",
"11-07 - Ammann Rammax 1575 Trench Rollers (Compactors - Trench/Drum Roller 3000lb)",
"97-3000 - Rock Drill (Pneumatic Tools - Drill/Benchers)",
"97-1000 - Jackhammer 90lb (Pneumatic Tools - Jack Hammers)",
"13-01 - Wacker Neuson HI110 HD D Heaters Diesel (Heaters Diesel (Sm))",
"13-02 - Wacker Neuson HI110 HD D Heaters Diesel (Heaters Diesel (Sm))",
"13-03 - Wacker Neuson HI110 HD D Heaters Diesel (Heaters Diesel (Sm))",
"13-04 - Wacker Neuson HI110 HD D Heaters Diesel (Heaters Diesel (Sm))",
"13-07 - Ground Heaters Arctic Cub 200 Heaters Diesel (Heaters Diesel (Sm))",
"13-06 - Frost Fighter IDF350-II Heaters Diesel (Heaters Diesel (Lg))",
"13-08 - Frost Fighter IDF350-II Heaters Diesel (Heaters Diesel (Lg))",
"13-09 - Frost Fighter IDF350-II Heaters Diesel (Heaters Diesel (Lg))",
"13-10 - Frost Fighter IDF350-II Heaters Diesel (Heaters Diesel (Lg))",
"13-11 - Frost Fighter IDF350-II Heaters Diesel (Heaters Diesel (Lg))",
"13-12 - Frost Fighter IDF350-II Heaters Diesel (Heaters Diesel (Lg))",
"13-13 - Frost Fighter IDF350-II Heaters Diesel (Heaters Diesel (Lg))",
"13-05 - Wacker Neuson Arctic Bear XHD Heater (Heater Diesel (XL) Towable)",
"24-01 - BE 2\" Water Pump (Pump - 2\" Trash (Gas))",
"24-02 - BE 2\" Water Pump (Pump - 2\" Trash (Gas))",
"24-03 - BE 2\" Water Pump (Pump - 2\" Trash (Gas))",
"24-04 - BE 2\" Water Pump (Pump - 2\" Trash (Gas))",
"24-05 - Honda 2\" Trash Pump (Pump - 2\" Trash (Gas))",
"24-12 - Honda 2\" High Pressure Pump (Pump - 2\" Trash (Gas))",
"24-13 - Honda 2\" High Pressure Pump (Pump - 2\" Trash (Gas))",
"24-14 - Seeyes 2\" High Pressure Pump (Pump - 2\" Trash (Gas))",
"24-15 - Seeyes 2\" High Pressure Pump (Pump - 2\" Trash (Gas))",
"24-16 - Honda 2\" High Pressure Pump (Pump - 2\" Trash (Gas))",
"24-17 - Honda 2\" High Pressure Pump (Pump - 2\" Trash (Gas))",
"24-18 - Honda 2\" High Pressure Pump (Pump - 2\" Trash (Gas))",
"24-19 - BE 2\" High Pressure Pump (Pump - 2\" Trash (Gas))",
"14-3000 - Honda 3\" Trash Pump (Pump - 3\" Trash (Gas))",
"14-4000 - Honda 4\" Trash Pump (Pump - 4\" Trash (Gas))",
"14-4500 - 4\" Submersible Electric (Pump - 4\" Submersible (Electric))",
"14-3500 - 3\" Pneumatic Trash Pump (Pump - 3\" Trash (Pneumatic))",
"14-4099 - 4\" Discharge Hose (50') (Discharge Hose 4\")",
"14-6099 - 6\" Discharge Hose (50') (Discharge Hose 6\")",
"15-06 - Honda SXS UTV's (UTV's - Gas)",
"15-07 - Honda SXS UTV's (UTV's - Gas)",
"15-08 - Argo 950 Bigfoot UTV's (UTV's - Gas)",
"15-10R - Polaris Ranger 1000 (UTV's - Gas)",
"15-11R - Polaris Ranger 1000 (UTV's - Gas)",
"15-13R - Polaris 1000 (UTV's - Gas)",
"15-14R - Can-Am Defender 1000 (UTV's - Gas)",
"15-15R - Can-Am Defender 1000 (UTV's - Gas)",
"09-17 - Black Max Dust Suppression System (Blasting - Dust Suppressors)",
"92-01 - Radiodetection RD7000+ Line Locators (Line Locators/Survey/Grade Equipment)",
"92-02 - Radiodetection RD7000+ Line Locators (Line Locators/Survey/Grade Equipment)",
"92-03 - Trimble LL300N Line Locator (Line Locators/Survey/Grade Equipment)",
"92-04 - Stabila LAR 350 Line Locator (Line Locators/Survey/Grade Equipment)",
"92-05 - Conventional Builders Level - Line Locator (Line Locators/Survey/Grade Equipment)",
"91-01 - Sala 8514459 Fall Arrest Equipment (Safety Equip - Fall Arrest)",
"69-07 - Tysea Excavator Mat Grapple (Attachments - Hydraulic)",
"69-08 - Tysea Excavator Mat Grapple (Attachments - Hydraulic)",
"66-02 - VanEd Hyd Breaker RB22G (Attachments - Hydraulic)",
"01-57 ETV - Code 3 ETV Unit (Medic Unit) (Trucks - Attachments)",
"01-46 ETV - Code 3 ETV Unit (Medic Unit) (Trucks - Attachments)",
"01-27 PLOW/SANDER - Front Mount Plow & Slide-In Sander Assy (Trucks - Attachments)",
"41-1000 - Wooden Access Mats (Site - Mats Access (8'x14'))",
"41-2000 - Wooden Swamp Mats (Site - Mats Swamp (4'x20'x12\"))",
"42-1000 - Road Plates (Site - Road Plate (8'x10'x1\"))",
"40-1000 - 6'x8' Site Fencing Panel (Site - Fencing Panels (M))",
"60-10 - Lifting Adapter (Excavator) (Attachments - Excavator)",
"60-01 - Lifting Adaptor (Excavator) (Attachments - Excavator)",
"60-02 - Lifting Adapter (Excavator) (Attachments - Excavator)",
"60-03 - Lifting Adaptor (Excavator) (Attachments - Excavator)",
"60-04 - Lifting Adaptor (Excavator) (Attachments - Excavator)",
"60-05 - Lifting Adaptor (Excavator) (Attachments - Excavator)",
"60-06 - Lifting Adaptor (Excavator) (Attachments - Excavator)",
"60-07 - Lifting Adaptor (Excavator) (Attachments - Excavator)",
"60-08 - Lifting Adaptor (Excavator) (Attachments - Excavator)",
"60-11 - Lifting Adapter (Excavator) (Attachments - Excavator)",
"60-12 - Lifting Adapter (Excavator) (Attachments - Excavator)",
"60-13 - Lifting Adapter (Excavator) (Attachments - Excavator)",
"60-14 - Lifting Adapter (Excavator) (Attachments - Excavator)",
"95-01 - Coating Inspection Kit #1 (Coating Inspection Kits)",
"95-02 - Coating Inspection Kit #2 (Coating Inspection Kits)",
"95-03 - Coating Inspection Kit #3 (Coating Inspection Kits)",
"95-04 - AWS QC Coating Kit (Coating Inspection Kits)",
"95-05 - AWS Welding QC Kit (Coating Inspection Kits)",
"94-04 - SPY 785 Holiday Detector (Monitor/Detection Equip - Holiday Detectors)",
"94-07 - SPY 785 Holiday Detector (Monitor/Detection Equip - Holiday Detectors)",
"94-08 - SPY 785 Holiday Detector (Monitor/Detection Equip - Holiday Detectors)",
"94-09 - DeFelsko Positest LPD Holiday Detector (Monitor/Detection Equip - Holiday Detectors)",
"43-03 - 20' Wood Bridge (Site - Bridge 20')",
"43-02 - 30' Wood Bridge (Site - Bridge 30')",
"43-01 - 60' Steel bridge (Site - Bridge 60')",
"46-1000 - Portable Stair Section 5’ c/w Handrails (Site - Access Stairs)",
"46-1001 - Portable Stair Section 5' c/w Handrails (Site - Access Stairs)",
"46-1002 - Portable Stair Section 5' c/w Handrails (Site - Access Stairs)",
"46-1003 - Portable Stair Section 5' c/w Handrails (Site - Access Stairs)",
"46-1004 - Portable Stair Section 5' c/w Handrails (Site - Access Stairs)",
"46-1005 - Portable Stair Section 5' c/w Handrails (Site - Access Stairs)",
"46-1006 - Portable Stair Section 5' c/w Handrails (Site - Access Stairs)",
"46-1007 - Portable Stair Section 5' c/w Handrails (Site - Access Stairs)",
"46-1008 - Portable Stair Section 5' c/w Handrails (Site - Access Stairs)",
"46-1009 - Portable Stair Section 5' c/w Handrails (Site - Access Stairs)",
"46-1010 - Portable Stair Section 5' c/w Handrails (Site - Access Stairs)",
"46-1011 - Portable Stair Section 15' c/w Handrails (Site - Access Stairs)",
"46-1012 - Portable Stair Section 15' c/w Handrails (Site - Access Stairs)",
"46-1013 - Portable Stair Section 15' c/w Handrails (Site - Access Stairs)",
"46-1014 - Portable Stair Section 15' c/w Handrails (Site - Access Stairs)",
"46-1015 - Portable Stair Section 15' c/w Handrails (Site - Access Stairs)",
"46-1016 - Portable Stair Section 15' c/w Handrails (Site - Access Stairs)",
"94-01 - Gas Monitor MX4 (Monitor/Detection Equip - Gas Detectors)",
"94-02 - MX4 Gas Detector (Monitor/Detection Equip - Gas Detectors)",
"94-03 - Gas Monitor (Monitor/Detection Equip - Gas Detectors)",
"04-39 - Triple Stall Washroom Trailer (Trailers - Washroom)",
"04-40 - Triple Stall Washroom Trailer (Trailers - Washroom)",
"04-69R - Washroom Trailer (Trailers - Washroom)",
"07-30 - John Deere 350G Excavator (Excavators - 330/345/350 Sized (68k-88k lbs))",
"07-33 - John Deere 350G Excavator (Excavators - 330/345/350 Sized (68k-88k lbs))",
"07-35 - John Deere 350G Excavator (Excavators - 330/345/350 Sized (68k-88k lbs))",
"07-36 - John Deere 350G Excavator (Excavators - 330/345/350 Sized (68k-88k lbs))",
"07-37 - John Deere 350G Excavator (Excavators - 330/345/350 Sized (68k-88k lbs))",
"04-41 - Gerrys Booster (Trailers - Boosters)",
"4-14 - Mobile Coating Trailer w. comp, gen (Trailers - Mobile Coating)",
"09-20 - Blast & Recovery Unit (Blasting & Recovery Units)",
"70-02 - Flange Alignment Pins – 600# Rating – up to 24” (Pipe - Welding Equipment)",
"70-03 - Pipe Line-Up Clamps – up to 24” (Pipe - Welding Equipment)",
"70-04 - Pipe Line-Up Clamps – up to 24” (Pipe - Welding Equipment)",
"71-01 - 2” – 24” Pipe Cutter (Pipe - Cutting & Beveling Equipment)",
"71-02 - Pipe Threader (Pipe - Cutting & Beveling Equipment)",
"71-03 - Cold Cutter – up to 4” (Pipe - Cutting & Beveling Equipment)",
"71-04 - Beveling Bands c/w Torches, Crawler - to 30” (Pipe - Cutting & Beveling Equipment)",
"71-05 - Beveling Bands c/w Torches, Crawler - 30\" (Pipe - Cutting & Beveling Equipment)",
"73-01 - De- Mag (Auto De Gauss) * (Pipe - Mag & Preheat Equipment)",
"73-02 - Auto Degauss Standard Unit – (Pipe - Mag & Preheat Equipment)",
"74-01 - Fabrication Roller (Pipe - Handling & Lifting Equipment)",
"74-02 - Pipe Turner (Pipe - Handling & Lifting Equipment)",
"96-15 - Stealth 2 278/1869 ft/lbs Hytorc Tools (Hydraulic Tools - Hytorc Tools / Ratchet Links)",
"96-16 - Stealth 2 278/1869 ft/lbs Hytorc Tools (Hydraulic Tools - Hytorc Tools / Ratchet Links)",
"96-17 - Stealth 4 604/4020 ft/lbs Hytorc Tools (Hydraulic Tools - Hytorc Tools / Ratchet Links)",
"96-18 - Stealth 4 604/4020 ft/lbs Hytorc Tools (Hydraulic Tools - Hytorc Tools / Ratchet Links)",
"98-01A - B Rad 1500 Rad Torque & Socket (Electric - Torqueing Tools)",
"07-39 - Doosan DX490 Excavator (Excavator- 470/490 Sized (105K-115K))",
"07-41 - Hitachi ZX490-6 (Excavator- 470/490 Sized (105K-115K))",
"08-14 - Rayco C100 Mulcher (Mulchers)",
"99-01 - Starlink (Starlink)",
"03-39 - Mack 12T Picker (Trucks 03 - Picker Truck 12T)",
"91-05 - Hand Held Radio (Safety Equip - Radio)",
"91-06 - Hand Held Radio (Safety Equip - Radio)",
"91-07 - Hand Held Radio (Safety Equip - Radio)",
"91-08 - Hand Held Radio (Safety Equip - Radio)",
"02-10 - Dodge 5500 Crane Truck (Trucks- Picker/Service)",
"02-11 - Ford F550 Crane Truck (Trucks- Picker/Service)",
"02-07 - Dodge 5500 Service/Mechanic Truck (Trucks- Picker/Service)",
"02-13 - Ford F-550 Service/Mechanic Truck (Trucks- Picker/Service)",
"04-01 - Snake River 12' Dump Trailer (Tandem Axle Utility/Dump Trailer) (Trailers - T/A Dump)",
"04-08 - Snake River 12' Dump Trailer (Tandem Axle Utility/Dump Trailer) (Trailers - T/A Dump)",
"04-10 - Snake River 12' Dump Trailer (Tandem Axle Utility/Dump Trailer) (Trailers - T/A Dump)",
"04-47 - Snake River 12' Dump Trailer (Tandem Axle Utility/Dump Trailer) (Trailers - T/A Dump)",
"04-48 - Snake River 12' Dump Trailer (Tandem Axle Utility/Dump Trailer) (Trailers - T/A Dump)",
"16-01 - Caterpillar DP45 10000lb (Forklift)",
"70-05 - De-Mag (Auto De Gausscon) (Welding Equipment - Demag)",
"CT-012 - Richard Dalrymple - crew truck"
 ],

  UofM: [
  "Daily",
  "Hourly",
  "Each"
 ]
}


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
  return new Promise(resolve => {
    // Directly use listData
    populateSelect("projectNameSelect", listData.projectNames);
    populateSelect("clientSelect", listData.clients);
    populateSelect("locationSelect", listData.locations); // <-- If this is missing, see note below!
    populateSelect("weatherSelect", listData.weather);
    populateSelect("clientProjectNumberSelect", listData.clientProjectNumbers);
    populateSelect("projectNumberSelect", listData.projectNumbers);

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
      populateSelectElement(select, listData.UnitsUsedList);
    });

    populateCostCodes(listData.costCodes);
    attachCostCodeListeners();
    linkTopToBottomCostCodesWithOverride();
    attachEquipmentRowListeners();
    attachSubcontractorRowListeners();
    attachUnitIdListeners();

    // Tom Select setup for all <select> elements
    document.querySelectorAll('select').forEach(select => {
      new TomSelect(select, {
        maxOptions: false,
        create: false,
        sortField: {
          field: "text",
          direction: "asc"
        },
        placeholder: "Select...",
        render: {
          item: function(data, escape) {
            return data.text ? `<div>${escape(data.text)}</div>` : "";
          }
        }
      });
    });

    resolve();
  });
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

listData.UnitsUsedList = Object.keys(unitIdMap); // Or .sort() if you want it alphabetical


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
  function restoreForm(data) {

  addManualManpowerRowsForRestore(data);

  // ✅ RESTORE VALUES for each manually added manpower row
  const manualRows = document.querySelectorAll(".manpower-row.manual-row");

if (data.manualManpowerRows && data.manualManpowerRows.length && manualRows.length) {
  data.manualManpowerRows.forEach((rowData, idx) => {
    const row = manualRows[idx];
    if (!row) return;

    const mp = row.querySelector('input[id^="manpowerselect"]');
    const cl = row.querySelector('input[id^="classificationselect"]');
    const loa = row.querySelector('input[type="checkbox"]');
    const notes = row.querySelector('.manual-notes-input');
    const hourInputs = row.querySelectorAll('.hour-input');

    if (mp) mp.value = rowData.manpower || "";
    if (cl) cl.value = rowData.classification || "";
    if (loa) loa.checked = !!rowData.loa;
    if (notes) notes.value = rowData.notes || "";

    rowData.hours?.forEach((val, i) => {
      if (hourInputs[i]) hourInputs[i].value = val || "";
    });
  });
}}



  //addManualEquipmentRowsForRestore(data);
  addManualSubcontractorRowsForRestore(data);
  

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
  data.manualEquipmentRows.forEach(() => {
    document.getElementById("addEquipmentRowBtn").click();
  });

  const manualEquipRows = document.querySelectorAll(".equipment-row.manual-row");

  data.manualEquipmentRows.forEach((rowData, idx) => {
    const row = manualEquipRows[idx];
    if (!row) return;

    const equipment = row.querySelector("input[id^='equipmentselect']");
    const total = row.querySelector(".equipment-total");
    const uofm = row.querySelector("input[id^='uofm']");
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
      row.querySelector("input[id^='notes3']").value = rowData.notes || "";
    }
  });
}

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
document.querySelectorAll(".manpower-row.manual-row").forEach(row => {
  data.manualManpowerRows.push({
    manpower: row.querySelector("input[id^='manpowerselect']")?.value || "",
    classification: row.querySelector("input[id^='classificationselect']")?.value || "",
    loa: row.querySelector("input[type='checkbox']")?.checked || false,
    hours: Array.from(row.querySelectorAll(".hour-input")).map(input => input.value || ""),
    notes: row.querySelector(".manual-notes-input")?.value || ""

  });
});

// 🔥 NEW: Save Manual Equipment Rows
data.manualEquipmentRows = [];
document.querySelectorAll(".equipment-row.manual-row").forEach(row => {
  data.manualEquipmentRows.push({
    equipment: row.querySelector("input[id^='equipmentselect']")?.value || "",
    total: row.querySelector(".equipment-total")?.value || "",
    uofm: row.querySelector("select.UofMSelect")?.value || "",

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
    notes: row.querySelector("input[id^='notes3']")?.value || ""
  });
});

console.log("🧠 AUTOSAVE Snapshot", {
  notesFromManual: data.manualManpowerRows?.map(r => r.notes),
  full: data.manualManpowerRows
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
    requestAnimationFrame(() => {
      restoreForm(data);

      // 🔥 Immediately re-cache the fully restored form to ensure images/signature persist on double reload
      autoSaveFormToCache();
    });
  } catch (err) {
    console.warn("⚠️ Failed to restore autosaved form:", err);
  }
}


  });
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
    <input type="text" id="notes${extraManpowerCount}" class="manual-notes-input" style="padding-right: 30px;" />
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

  // 🔥 Attach autosave to all new fields in this row:
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

 




