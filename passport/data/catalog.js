const locationRows = [
  ["charminar", "Charminar", "Hyderabad", "Heritage", 17.3616, 78.4747, "The four-minaret icon of Hyderabad and the heart of the old city.", "CM"],
  ["golconda-fort", "Golconda Fort", "Hyderabad", "Fort", 17.3833, 78.4011, "A granite fortress known for acoustics, gateways, and Deccan history.", "GF"],
  ["ramappa-temple", "Ramappa Temple", "Mulugu", "UNESCO", 18.2593, 79.9437, "A UNESCO World Heritage Kakatiya temple with floating-brick engineering.", "RP"],
  ["yadadri", "Yadadri Lakshmi Narasimha Temple", "Yadadri Bhuvanagiri", "Spiritual", 17.5875, 78.9437, "A major hill shrine dedicated to Sri Lakshmi Narasimha Swamy.", "YD"],
  ["warangal-fort", "Warangal Fort", "Warangal", "Fort", 17.9567, 79.615, "Kakatiya-era gateways and stone ruins that anchor Warangal's heritage.", "WF"],
  ["thousand-pillars", "Thousand Pillar Temple", "Hanamkonda", "Heritage", 18.0037, 79.5747, "A sculptural Kakatiya temple famed for polished pillars and Nandi.", "TP"],
  ["bhadrachalam", "Bhadrachalam Temple", "Bhadradri Kothagudem", "Spiritual", 17.6688, 80.888, "A revered Sri Rama temple town on the banks of the Godavari.", "BD"],
  ["nagarjuna-sagar", "Nagarjuna Sagar", "Nalgonda", "Nature", 16.5753, 79.3125, "A vast dam landscape with reservoir views and Buddhist heritage nearby.", "NS"],
  ["kuntala-waterfall", "Kuntala Waterfall", "Adilabad", "Nature", 19.2814, 78.5121, "One of Telangana's tallest waterfalls, set in forested Adilabad terrain.", "KW"],
  ["bogatha-waterfall", "Bogatha Waterfall", "Mulugu", "Nature", 18.7053, 80.4139, "A wide seasonal cascade popularly called the Niagara of Telangana.", "BW"],
  ["pocharam", "Pocharam Wildlife Sanctuary", "Medak", "Wildlife", 18.0498, 78.2095, "A reservoir and sanctuary landscape for birds, deer, and quiet trails.", "PW"],
  ["ananthagiri", "Ananthagiri Hills", "Vikarabad", "Nature", 17.312, 77.8632, "Forest roads, viewpoints, and weekend trails near Hyderabad.", "AH"],
  ["ranganayaka-sagar", "Ranganayaka Sagar", "Siddipet", "Nature", 18.0709, 78.8529, "A scenic reservoir that has become a popular Siddipet leisure stop.", "RS"],
  ["medak-cathedral", "Medak Cathedral", "Medak", "Heritage", 18.0459, 78.2631, "A landmark Gothic Revival cathedral known for stained glass and scale.", "MC"],
  ["qutb-shahi-tombs", "Qutb Shahi Tombs", "Hyderabad", "Heritage", 17.395, 78.3968, "Domed royal tombs that preserve the Qutb Shahi architectural landscape.", "QT"],
  ["hussain-sagar", "Hussain Sagar", "Hyderabad", "City", 17.4239, 78.4738, "Hyderabad's central lake, known for the Buddha statue and Tank Bund.", "HS"],
  ["salar-jung", "Salar Jung Museum", "Hyderabad", "Museum", 17.3713, 78.4804, "A major museum collection spanning art, artifacts, clocks, and manuscripts.", "SJ"],
  ["birla-mandir", "Birla Mandir", "Hyderabad", "Spiritual", 17.4062, 78.4691, "A white marble hilltop temple with wide views over the city and lake.", "BM"],
  ["chilkur", "Chilkur Balaji Temple", "Ranga Reddy", "Spiritual", 17.3587, 78.2988, "A popular temple near Osman Sagar known for its distinctive visitor ritual.", "CB"],
  ["basar", "Basar Saraswati Temple", "Nirmal", "Spiritual", 18.8806, 77.9546, "A celebrated Saraswati temple where many children begin learning rituals.", "BS"],
  ["laknavaram", "Laknavaram Lake", "Mulugu", "Nature", 18.1442, 80.0642, "A forest-fringed lake known for islands, hanging bridges, and monsoon views.", "LL"],
  ["komaram-bheem", "Jodeghat", "Kumram Bheem Asifabad", "Culture", 19.4099, 79.2257, "A memorial landscape associated with tribal leader Komaram Bheem.", "JG"],
  ["nizamabad-fort", "Nizamabad Fort", "Nizamabad", "Fort", 18.6725, 78.0941, "A hill fort site with temple structures and views over Nizamabad.", "NF"],
  ["pillalamarri", "Pillalamarri Banyan Tree", "Mahabubnagar", "Nature", 16.7434, 77.9811, "A centuries-old banyan tree complex and one of the state's beloved natural landmarks.", "PM"],
  ["alampur", "Alampur Jogulamba Temple", "Jogulamba Gadwal", "Spiritual", 15.8797, 78.1336, "A Shakti Peetha and Navabrahma temple cluster near the Tungabhadra.", "AL"],
  ["hyderabad-biryani", "Hyderabadi Biryani Trail", "Hyderabad", "Food", 17.385, 78.4867, "A food-culture stamp for the city's signature biryani neighborhoods.", "HB"],
  ["bathukamma", "Bathukamma Festival Spot", "Statewide", "Culture", 17.4399, 78.4983, "A seasonal cultural stamp celebrating Telangana's floral festival gatherings.", "BT"],
  ["pochampally", "Pochampally Ikat Village", "Yadadri Bhuvanagiri", "Craft", 17.3478, 78.8242, "A weaving town associated with Telangana's globally known Ikat craft.", "PI"]
];

const regionRows = [
  ["andhra-pradesh", "Andhra Pradesh", "State", "Amaravati"], ["arunachal-pradesh", "Arunachal Pradesh", "State", "Itanagar"],
  ["assam", "Assam", "State", "Dispur"], ["bihar", "Bihar", "State", "Patna"], ["chhattisgarh", "Chhattisgarh", "State", "Raipur"],
  ["goa", "Goa", "State", "Panaji"], ["gujarat", "Gujarat", "State", "Gandhinagar"], ["haryana", "Haryana", "State", "Chandigarh"],
  ["himachal-pradesh", "Himachal Pradesh", "State", "Shimla"], ["jharkhand", "Jharkhand", "State", "Ranchi"],
  ["karnataka", "Karnataka", "State", "Bengaluru"], ["kerala", "Kerala", "State", "Thiruvananthapuram"],
  ["madhya-pradesh", "Madhya Pradesh", "State", "Bhopal"], ["maharashtra", "Maharashtra", "State", "Mumbai"],
  ["manipur", "Manipur", "State", "Imphal"], ["meghalaya", "Meghalaya", "State", "Shillong"], ["mizoram", "Mizoram", "State", "Aizawl"],
  ["nagaland", "Nagaland", "State", "Kohima"], ["odisha", "Odisha", "State", "Bhubaneswar"], ["punjab", "Punjab", "State", "Chandigarh"],
  ["rajasthan", "Rajasthan", "State", "Jaipur"], ["sikkim", "Sikkim", "State", "Gangtok"], ["tamil-nadu", "Tamil Nadu", "State", "Chennai"],
  ["telangana", "Telangana", "State", "Hyderabad", "live"], ["tripura", "Tripura", "State", "Agartala"],
  ["uttar-pradesh", "Uttar Pradesh", "State", "Lucknow"], ["uttarakhand", "Uttarakhand", "State", "Dehradun"],
  ["west-bengal", "West Bengal", "State", "Kolkata"], ["andaman-nicobar", "Andaman & Nicobar Islands", "Union Territory", "Sri Vijaya Puram"],
  ["chandigarh", "Chandigarh", "Union Territory", "Chandigarh"],
  ["dadra-nagar-haveli-daman-diu", "Dadra & Nagar Haveli and Daman & Diu", "Union Territory", "Daman"],
  ["delhi", "Delhi", "Union Territory", "New Delhi"], ["jammu-kashmir", "Jammu & Kashmir", "Union Territory", "Srinagar / Jammu"],
  ["ladakh", "Ladakh", "Union Territory", "Leh"], ["lakshadweep", "Lakshadweep", "Union Territory", "Kavaratti"],
  ["puducherry", "Puducherry", "Union Territory", "Puducherry"]
];

export const locations = locationRows.map(([id, name, region, category, lat, lng, summary, stamp]) => ({
  id, name, region, category, lat, lng, summary, stamp
}));

export const indiaRegions = regionRows.map(([slug, name, type, capital, status]) => ({
  slug, name, type, capital, ...(status ? { status } : {})
}));
