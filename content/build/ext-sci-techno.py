# Sciences & Nature (science-nature) - Technologie et numérique grand public
PROMPTS = [
    {'id': 'sci-techno-01', 'text': "Nomme un réseau social ou une plateforme de partage en ligne (hors messageries)"},
    {'id': 'sci-techno-02', 'text': "Nomme une entreprise ou une marque de technologie (informatique, électronique, téléphonie, internet)"},
    {'id': 'sci-techno-03', 'text': "Nomme un composant ou un périphérique d'ordinateur"},
    {'id': 'sci-techno-04', 'text': "Nomme une extension de fichier informatique (ce qui suit le point dans un nom de fichier)"},
    {'id': 'sci-techno-05', 'text': "Nomme un outil de bricolage ou de menuiserie (à main ou électroportatif)"},
    {'id': 'sci-techno-06', 'text': "Nomme un matériau de construction ou de revêtement utilisé dans le bâtiment"},
    {'id': 'sci-techno-07', 'text': "Nomme un modèle d'avion (civil ou militaire)"},
    {'id': 'sci-techno-08', 'text': "Nomme un véhicule terrestre (à moteur, à pédales, sur rails ou tracté)"},
    {'id': 'sci-techno-09', 'text': "Nomme un robot ou une intelligence artificielle célèbre (réelle ou de fiction)"},
    {'id': 'sci-techno-10', 'text': "Nomme un fondateur ou un grand dirigeant d'une entreprise technologique"},
    {'id': 'sci-techno-11', 'text': "Nomme un modèle de voiture (nom du modèle, sans la marque)"},
    {'id': 'sci-techno-12', 'text': "Nomme un logiciel, une application ou un système d'exploitation grand public"},
    {'id': 'sci-techno-13', 'text': "Nomme un appareil électronique grand public"},
    {'id': 'sci-techno-14', 'text': "Nomme un engin de chantier, de travaux publics ou une machine agricole"},
    {'id': 'sci-techno-15', 'text': "Nomme un type de bateau ou de navire"},
]
T = {}

T['sci-techno-01'] = {
    't1': ["Instagram", "Twitter=X/Tweeter", "TikTok", "Snapchat", "YouTube", "LinkedIn", "Pinterest"],
    't2': ["Facebook"],
    't3': ["Twitch", "Reddit", "Discord", "Tinder", "Tumblr", "Vine", "Myspace", "Meetic", "Dailymotion", "Vimeo", "Flickr", "Quora", "Google+=Google Plus", "Skyrock", "Copains d'avant", "Threads", "BeReal", "Mastodon", "Bluesky", "Deezer", "Spotify", "SoundCloud", "GitHub", "Stack Overflow", "Tripadvisor", "Yelp"],
    't4': ["Badoo", "Bumble", "Hinge", "Happn", "Viadeo", "Xing", "Foursquare", "Strava", "Goodreads", "Wattpad", "Medium", "Substack", "Patreon", "Behance", "Dribbble", "Periscope", "Clubhouse", "Musical.ly", "Weibo", "Douyin", "Kuaishou", "VKontakte=VK", "Odnoklassniki", "Nextdoor", "Yubo", "Truth Social", "Parler", "Gab", "Last.fm", "Second Life", "Fotolog", "Bebo", "Hi5", "Orkut", "Ello", "Lemon8", "Friendster", "Netlog"],
    't5': [],
    't6': ["Habbo=Habbo Hotel"],
}

T['sci-techno-02'] = {
    't1': ["Google", "Microsoft", "Samsung", "Amazon", "Sony", "Intel", "Facebook=Meta"],
    't2': ["Apple"],
    't3': ["IBM", "HP=Hewlett-Packard", "Dell", "Nvidia", "AMD", "Huawei", "Xiaomi", "Asus", "Acer", "Lenovo", "Toshiba", "LG", "Panasonic", "Philips", "Netflix", "Tesla", "Oracle", "Cisco", "Adobe", "Canon", "Nikon", "Logitech", "Motorola", "Qualcomm", "Alibaba", "OpenAI", "Twitter"],
    't4': ["Siemens", "Sharp", "Fujitsu", "NEC", "Hitachi", "Casio", "Epson", "Brother", "Xerox", "Kodak", "Garmin", "GoPro", "Fitbit", "Sonos", "Bose", "JBL", "Sennheiser", "Razer", "Corsair", "MSI", "Gigabyte", "Western Digital", "Seagate", "SanDisk", "Kingston", "TP-Link", "Netgear", "Salesforce", "SAP", "Atos", "Capgemini", "Thales", "Dassault Systèmes", "OVH", "Qwant", "Uber", "Airbnb", "Spotify", "Zoom", "Dropbox", "Snap", "PayPal", "eBay", "Tencent", "Baidu", "ByteDance", "Foxconn", "TSMC", "ARM", "Broadcom", "Texas Instruments", "Micron", "Wiko", "Archos", "Alcatel", "BlackBerry", "HTC", "Sagem", "Bull", "Thomson", "Oppo", "OnePlus", "Vivo", "ZTE", "Mistral AI", "Anthropic"],
    't5': ["Fairphone", "Realme", "Palm", "Atari", "Commodore", "Amstrad", "Sinclair", "Packard Bell", "Olivetti", "Compaq", "Sun Microsystems", "Netscape", "Yahoo", "AOL", "Altavista", "Lycos"],
    't6': ["Nokia"],
}

T['sci-techno-03'] = {
    't1': ["Processeur=CPU/microprocesseur", "Souris", "Écran=moniteur", "Disque dur=HDD", "Carte mère=motherboard", "Mémoire vive=RAM", "Imprimante", "Carte graphique=GPU/carte vidéo"],
    't2': ["Clavier"],
    't3': ["Webcam", "Haut-parleurs=enceintes", "Casque", "Microphone=micro", "Alimentation=bloc d'alimentation/PSU", "Ventilateur", "Clé USB", "SSD", "Scanner=scanneur", "Carte son", "Lecteur DVD=lecteur optique/graveur", "Boîtier=tour/unité centrale", "Tablette graphique", "Manette=gamepad", "Joystick", "Pavé tactile=trackpad", "Batterie", "Carte réseau", "Disque dur externe", "Carte SD", "Modem"],
    't4': ["Dissipateur thermique=radiateur/heatsink", "Pâte thermique", "Watercooling=refroidissement liquide", "Chipset", "Carte d'extension", "Port USB", "Lecteur de cartes", "Hub USB", "Station d'accueil=dock", "Onduleur", "Casque VR=casque de réalité virtuelle", "Volant", "Pédalier", "Trackball=boule de commande", "Stylet", "Lecteur de disquettes", "Disquette", "Douchette=lecteur de codes-barres", "Imprimante 3D", "Table traçante=traceur", "Vidéoprojecteur=projecteur", "Carte d'acquisition", "Tuner TV", "Carte Wi-Fi", "Adaptateur Bluetooth", "M.2", "Mémoire cache", "Socket", "Slot PCI", "Lecteur d'empreintes", "Pavé numérique", "Tapis de souris", "Câble HDMI", "Carte contrôleur RAID", "Clé Wi-Fi", "BIOS", "Pile CMOS", "Câble SATA", "Nappe IDE", "Lecteur Blu-ray"],
    't5': ["Lecteur ZIP", "Graveur CD", "Carte PCI Express=PCIe", "Carte SCSI", "Disque dur SCSI", "Carte Ethernet", "Port série", "Port parallèle", "Port PS/2", "Lecteur de bandes", "Joystick à retour de force", "Wacom", "Lecteur de carte à puce", "Carte TV", "Mémoire ROM", "Carte vidéo AGP=AGP", "Pad Bluetooth"],
    't6': ["Pâte thermique à métal liquide"],
}

T['sci-techno-04'] = {
    't1': ["JPEG=JPG", "PNG", "MP3", "GIF", "DOCX=DOC", "TXT", "ZIP", "EXE", "MP4"],
    't2': ["PDF"],
    't3': ["XLSX=XLS", "PPTX=PPT", "HTML=HTM", "CSV", "WAV", "AVI", "MOV", "MKV", "RAR", "ISO", "BMP", "TIFF=TIF", "SVG", "XML", "JSON", "CSS", "SQL", "DLL", "BAT", "APK", "DMG", "MSI", "RTF", "ODT", "EPUB", "FLAC", "OGG", "AAC", "WMA", "MIDI=MID", "WEBP", "PSD", "7Z", "TAR", "GZ", "PHP", "JS", "PY", "JAVA"],
    't4': ["AI", "HEIC", "RAW", "BIN", "LOG", "INI", "DAT", "TMP", "JAR", "FLV", "WMV", "MPEG=MPG", "WEBM", "M4A", "TTF", "OTF", "PPS", "ODS", "ODP", "ICO", "INDD", "DWG", "STL", "OBJ", "CAB", "VCF", "ICS", "EML", "MD", "YAML=YML", "SH", "PL", "RB", "CPP", "M4V", "3GP", "OGV", "AIFF", "APE", "DOCM", "XLSM", "PPSX", "PKG", "DEB", "RPM", "VMDK", "VHD", "SYS", "LNK", "URL", "BAK", "PUB", "ACCDB", "MDB", "SQLITE"],
    't5': [],
    't6': ["SWF"],
}

T['sci-techno-05'] = {
    't1': ["Marteau", "Scie", "Perceuse", "Pince", "Tenaille", "Clé à molette", "Mètre=mètre ruban"],
    't2': ["Tournevis"],
    't3': ["Rabot", "Ciseau à bois", "Lime", "Équerre", "Niveau à bulle=niveau", "Cutter", "Pied-de-biche", "Clé Allen=clé hexagonale/clé en L", "Clé plate", "Clé à pipe", "Maillet", "Masse=massette", "Truelle", "Pistolet à colle", "Agrafeuse", "Visseuse=perceuse-visseuse", "Ponceuse", "Scie sauteuse", "Scie circulaire", "Scie à métaux=scie à métal", "Égoïne", "Meuleuse=disqueuse", "Fer à souder", "Décapeur thermique", "Étau", "Serre-joint", "Pince multiprise", "Pince coupante", "Pince à dénuder", "Pince à bec", "Foret", "Mèche", "Burin", "Râpe", "Pinceau", "Rouleau à peinture", "Spatule", "Compas", "Cordeau", "Fil à plomb"],
    't4': ["Marteau-piqueur", "Taloche", "Pistolet à silicone=pistolet à mastic", "Scie cloche", "Clé dynamométrique", "Pince à sertir", "Chalumeau", "Réglet", "Pointeau", "Tarière", "Vilebrequin", "Tire-clou=arrache-clou", "Trusquin", "Gouge", "Bédane", "Riflard", "Varlope", "Herminette", "Hache", "Clé à cliquet=cliquet", "Douille", "Clé à bougie", "Couteau à enduire", "Défonceuse", "Toupie", "Raboteuse", "Scie à ruban", "Perforateur", "Burineur", "Cloueur", "Cisaille", "Pince à riveter=riveteuse", "Pince à circlips", "Pince-étau", "Tournevis cruciforme", "Tournevis plat", "Brosse métallique", "Fausse équerre", "Rapporteur d'angle", "Pied à coulisse", "Micromètre", "Scie à onglets=scie à onglet"],
    't5': ["Tourne-à-gauche", "Scie japonaise", "Passe-partout", "Bouvet", "Guillaume", "Valet d'établi", "Sergent"],
    't6': ["Scie à dos=Tenonneuse"],
}

T['sci-techno-06'] = {
    't1': ["Béton", "Brique", "Bois", "Acier", "Verre", "Pierre", "Ciment", "Sable", "Plâtre"],
    't2': ["Parpaing=agglo"],
    't3': ["Tuile", "Ardoise", "Chaux", "Mortier", "Gravier", "Argile", "Terre cuite", "Zinc", "Cuivre", "Plomb", "Aluminium", "Fer", "Fonte", "Béton armé", "Placoplâtre=BA13/plaque de plâtre", "Laine de verre", "Laine de roche", "Polystyrène", "Liège", "Contreplaqué", "PVC", "Goudron", "Bitume", "Granit", "Marbre", "Calcaire", "Grès", "Carrelage", "Parquet", "Moquette", "Chaume", "Paille", "Torchis", "Adobe", "Pisé"],
    't4': ["Schiste", "Basalte", "Travertin", "Tuffeau", "Meulière", "Silex", "Faïence", "Mosaïque", "Lino", "Stratifié", "Bambou", "Terre crue", "Fibrociment", "Amiante", "Tôle", "Verre trempé", "Polycarbonate", "Plexiglas=PMMA", "Verre feuilleté", "Béton ciré", "Asphalte", "Béton cellulaire", "Chanvre", "Ouate de cellulose", "Fibre de bois", "OSB", "MDF", "Panneau de particules=aggloméré", "Mousse polyuréthane", "Laiton", "Bronze", "Pouzzolane", "Enduit", "Crépi", "Lambris", "Inox"],
    't5': ["Tadelakt", "Verre cellulaire"],
    't6': ["Pierre ponce"],
}

T['sci-techno-07'] = {
    't1': ["Concorde", "Boeing 747=747/Jumbo Jet", "Airbus A380=A380", "Airbus A320=A320", "Boeing 737=737", "Rafale", "Mirage 2000", "Spitfire"],
    't2': ["Boeing 777=777"],
    't3': ["Boeing 787=787/Dreamliner", "Airbus A330=A330", "Airbus A350=A350", "Airbus A340=A340", "Airbus A300=A300", "Boeing 707=707", "Boeing 727=727", "Boeing 757=757", "Boeing 767=767", "Caravelle", "F-16", "F-15", "F-14 Tomcat=F-14", "F-22 Raptor=F-22", "F-35", "F-18 Hornet=F/A-18/F-18", "F-4 Phantom=F-4", "B-52 Stratofortress=B-52", "B-2 Spirit=B-2", "B-17 Forteresse volante=B-17", "Messerschmitt Bf 109=Bf 109", "Dakota DC-3=DC-3", "Cessna 172=Cessna", "Eurofighter Typhoon=Eurofighter", "Airbus A400M=A400M", "Hercules C-130=C-130", "SR-71 Blackbird=SR-71", "Wright Flyer", "Spirit of St. Louis"],
    't4': ["Mirage III", "Mirage IV", "Mirage F1", "Super Étendard", "Zero Mitsubishi=A6M Zero", "Stuka Ju 87=Ju 87/Stuka", "Focke-Wulf 190=Fw 190", "P-51 Mustang=P-51", "Lancaster", "Mosquito", "DC-10", "DC-8", "MD-80", "Lockheed Constellation=Constellation", "Fokker 100", "ATR 72", "ATR 42", "Bombardier CRJ=CRJ", "Piper Cub", "Beechcraft", "Pilatus PC-12", "Falcon 7X", "Falcon 900", "Learjet", "Gulfstream", "Antonov An-225 Mriya=An-225/Mriya", "Antonov An-124", "Tupolev Tu-144=Tu-144", "Tupolev Tu-95=Tu-95", "Tupolev Tu-154=Tu-154", "Ilyouchine Il-76=Il-76", "MiG-21", "MiG-29", "Sukhoï Su-27=Su-27", "Sukhoï Su-57=Su-57", "Gripen", "Tornado", "Harrier", "Jaguar", "Alpha Jet", "Transall", "C-17 Globemaster=C-17", "C-5 Galaxy=C-5", "U-2", "A-10 Thunderbolt=A-10/Warthog", "Bell X-1", "Blériot XI", "14-bis", "Dewoitine D.520=D.520", "Fokker Dr.I", "Sopwith Camel", "Airbus Beluga=Beluga", "Junkers Ju 52=Ju 52", "Heinkel He 111=He 111", "Boeing 314", "Airbus A220=A220", "Airbus A310=A310", "Airbus A318=A318", "Airbus A319=A319", "Airbus A321=A321", "Boeing 717", "Embraer E190=E190", "Bréguet Atlantic", "Mirage 5", "Cessna Citation=Citation", "Boeing 747-8", "Boeing 737 MAX=737 MAX"],
    't5': ["Morane-Saulnier", "Nieuport", "SPAD XIII=SPAD", "Eole=Éole", "Hawker Hurricane=Hurricane", "Avro Vulcan=Vulcan", "Boeing B-29 Superfortress=B-29", "Enola Gay", "Sukhoï Superjet=Superjet", "Comac C919=C919", "Bombardier Global Express", "Dassault Mercure=Mercure", "Dassault Falcon 50", "Nord Noratlas=Noratlas", "Breguet 14", "Potez 25", "Latécoère 28", "Farman Goliath", "Caudron Simoun=Simoun", "Piaggio P.180"],
    't6': ["Spruce Goose=Hughes H-4 Hercules/H-4 Hercules"],
}

T['sci-techno-08'] = {
    't1': ["Vélo=bicyclette", "Moto", "Camion", "Bus=autobus", "Tramway=tram", "Train", "Métro", "Scooter", "Trottinette"],
    't2': ["Voiture=automobile"],
    't3': ["Camionnette", "Fourgon=fourgonnette", "Taxi", "Ambulance", "Autocar=car", "Skateboard=skate", "Rollers", "Patins à roulettes", "Patinette", "Mobylette=cyclomoteur", "Quad", "Side-car", "Tandem", "Vélo électrique", "Monocycle", "Gyropode=Segway", "Hoverboard", "Kart=karting", "Limousine", "Corbillard", "Calèche", "Charrette", "Chariot", "Brouette", "Diligence", "Fiacre", "Carrosse", "Luge", "Traîneau", "Camion de pompiers=camion de pompier", "Dépanneuse", "Benne à ordures", "Motoneige", "SUV=4x4", "Cabriolet", "Break", "Monospace", "Berline", "Coupé", "Pick-up", "Camping-car", "Caravane", "Remorque", "Semi-remorque=poids lourd"],
    't4': ["Citadine", "Roadster", "Funiculaire", "Tuk-tuk", "Pousse-pousse=rickshaw", "Cyclo-pousse=vélo-taxi", "Draisienne", "Grand bi", "Vélocipède", "Char à voile", "Locomotive", "TGV", "RER", "Monorail", "Draisine", "Trolleybus", "Char d'assaut=char/tank", "Véhicule blindé", "Autoneige", "Camion-citerne", "Dragster", "Voiture de police", "VTT", "BMX", "Vélo de course", "Rosalie", "Landau", "Sulky", "Chaise à porteurs", "Fauteuil roulant", "Poussette", "Voiturette de golf", "Voiturette", "Gyroroue", "Wagon", "Autorail", "Chenillette", "Carriole", "Fardier de Cugnot=Cugnot/Fardier"],
    't5': ["Triplette"],
    't6': ["Jeep lunaire=Rover lunaire/Lunar Roving Vehicle"],
}

T['sci-techno-09'] = {
    't1': ["WALL-E", "Terminator=T-800", "C-3PO", "Optimus Prime", "Astro Boy=Astroboy", "RoboCop", "HAL 9000=HAL", "ChatGPT"],
    't2': ["R2-D2"],
    't3': ["BB-8", "Megatron", "Bender", "Marvin", "Johnny 5=Numéro 5", "Data", "Le Géant de fer=Iron Giant", "Baymax", "EVE", "Sonny", "T-1000", "Robby le robot=Robby", "Goldorak", "Mazinger Z", "Doraemon", "Chappie", "Skynet", "Jarvis", "Ultron", "Vision", "Cortana", "GLaDOS", "Siri", "Alexa", "Watson", "Deep Blue", "AlphaGo", "Gemini", "Copilot", "Asimo", "Pepper", "Nao", "Sophia", "Atlas", "Spot", "Aibo", "Roomba", "Curiosity", "Perseverance", "Opportunity", "Philae", "Bumblebee", "Claude", "Grok", "Dalek", "K-9"],
    't4': ["Ava", "David", "Gort", "K-2SO", "IG-88", "Cylon", "TARS", "Bishop", "Ash", "KITT", "Rosie", "Arale Norimaki=Arale", "Gundam", "Voltron", "Evangelion", "Sojourner", "Spirit", "Robonaut", "Unimate", "Elektro", "Shakey", "Bard", "Tik-Tok", "Gigolo Joe", "Mechagodzilla", "Wheatley", "Claptrap", "Cyberman", "Mega Man=Megaman", "Maria"],
    't5': [],
    't6': ["Tay=Microsoft Tay"],
}

T['sci-techno-10'] = {
    't1': ["Bill Gates", "Steve Jobs", "Mark Zuckerberg", "Elon Musk", "Jeff Bezos", "Larry Page", "Sergey Brin", "Steve Wozniak"],
    't2': ["Tim Cook"],
    't3': ["Paul Allen", "Satya Nadella", "Sundar Pichai", "Linus Torvalds", "Tim Berners-Lee", "Jack Dorsey", "Evan Spiegel", "Reed Hastings", "Travis Kalanick", "Brian Chesky", "Daniel Ek", "Jensen Huang", "Larry Ellison", "Michael Dell", "Steve Ballmer", "Marissa Mayer", "Sam Altman", "Peter Thiel", "Jimmy Wales", "Jack Ma", "Xavier Niel", "Eric Schmidt", "Sheryl Sandberg", "Kevin Systrom", "Dario Amodei"],
    't4': ["Reid Hoffman", "Pierre Omidyar", "Jan Koum", "Brian Acton", "Chad Hurley", "Steve Chen", "Jawed Karim", "Jerry Yang", "David Filo", "Gordon Moore", "Robert Noyce", "Andy Grove", "Lisa Su", "Susan Wojcicki", "Masayoshi Son", "Pony Ma=Ma Huateng", "Lei Jun", "Ren Zhengfei", "Zhang Yiming", "Marc Simoncini", "Jacques-Antoine Granjon", "Octave Klaba", "Arthur Mensch", "Bill Hewlett", "David Packard", "Akio Morita", "Masaru Ibuka", "Gabe Newell", "Drew Houston", "Eric Yuan", "Stewart Butterfield", "Biz Stone", "Evan Williams=Ev Williams", "Marc Benioff", "Ben Silbermann", "Patrick Collison", "John Collison", "Mike Krieger", "Dustin Moskovitz", "Eduardo Saverin", "Chris Hughes", "Palmer Luckey", "Jeff Hawkins", "Thomas Watson", "Vint Cerf", "Jony Ive", "Mira Murati", "Demis Hassabis", "Henri Seydoux", "Frédéric Mazzella"],
    't5': [],
    't6': ["Nolan Bushnell"],
}

T['sci-techno-11'] = {
    't1': ["Clio", "208", "C3", "Twingo", "Golf", "2CV", "Mégane", "Polo"],
    't2': ["206"],
    't3': ["Scénic", "Espace", "Kangoo", "Captur", "Zoé", "Duster", "Sandero", "Logan", "308", "3008", "205", "106", "306", "407", "504", "404", "5008", "Partner", "C4", "C5", "Saxo", "AX", "BX", "Xsara", "Berlingo", "Méhari", "R5=Renault 5/Super 5", "R4=Renault 4/4L", "Safrane", "Laguna", "Alpine A110=A110", "Model S", "Model 3", "Model Y", "Panda", "Punto", "Uno", "Tipo", "500", "Corsa", "Astra", "Fiesta", "Focus", "Mustang", "Yaris", "Corolla", "Prius", "Aygo", "Micra", "Qashqai", "Juke", "Leaf", "Civic", "Jazz", "Ibiza", "Leon", "Octavia", "Fabia", "Coccinelle=Beetle", "Combi", "Passat", "Tiguan", "Lupo", "911", "Wrangler", "Defender", "Range Rover", "Picanto", "Swift", "MX-5=Miata", "Model T=Ford T"],
    't4': ["Traction=Traction Avant", "DS=Déesse", "Xantia", "Dyane", "Ami", "CX", "R12", "R16", "R21", "R25", "Vel Satis", "Avantime", "Fuego", "Alpine A310=A310", "Model X", "Multipla", "Ka", "Scirocco", "Up!", "F40", "Countach", "Twizy", "Cybertruck", "Cayenne", "Macan", "Boxster", "Carrera", "Testarossa", "Enzo", "Viper", "Corvette", "Camaro", "Charger", "Hummer H1", "Skyline", "Supra", "Celica", "Impreza", "Lancer", "Miura", "Diablo", "Murciélago", "Huracán", "Aventador", "Gallardo", "Veyron", "Chiron"],
    't5': [],
    't6': ["DeLorean DMC-12=DMC-12/DeLorean"],
}

T['sci-techno-12'] = {
    't1': ["Word", "Excel", "Google Search", "Photoshop", "Windows", "Spotify", "Google Maps", "PowerPoint"],
    't2': ["Google Chrome=Chrome"],
    't3': ["Outlook", "Gmail", "Firefox", "Safari", "Edge", "Opera", "Internet Explorer", "Paint", "Bloc-notes=Notepad", "Calculatrice", "VLC", "iTunes", "WinRAR", "WinZip", "7-Zip", "Acrobat Reader=Adobe Reader", "Illustrator", "Premiere Pro", "After Effects", "Lightroom", "InDesign", "GIMP", "Blender", "Audacity", "Canva", "Figma", "Notion", "Trello", "Slack", "Teams=Microsoft Teams", "Google Drive", "Dropbox", "OneDrive", "iCloud", "Google Docs", "Waze", "Uber", "Deezer", "Shazam", "Duolingo", "Android", "iOS", "macOS", "Linux", "Ubuntu", "Zoom", "Skype"],
    't4': ["CCleaner", "Norton", "Avast", "Kaspersky", "McAfee", "Bitdefender", "TeamViewer", "Steam", "Epic Games Store", "LibreOffice", "OpenOffice", "Access", "Publisher", "OneNote", "Visio", "Windows Media Player", "QuickTime", "Winamp", "Nero", "Filmora", "iMovie", "GarageBand", "FL Studio", "Ableton Live", "AutoCAD", "SketchUp", "Google Earth", "Google Traduction", "Doodle", "Evernote", "Citymapper", "BlaBlaCar", "Vinted", "Leboncoin", "Airbnb", "Booking", "Tricount", "Lydia", "Revolut", "Pronote", "Tinder", "Windows XP", "Windows 95", "Windows 98", "Windows 7", "Windows 10", "Debian", "Fedora", "MS-DOS", "Unix", "Chrome OS"],
    't5': ["Aero", "BitTorrent", "Napster", "IrfanView", "Paint Shop Pro", "Corel Draw", "Thunderbird", "Netscape Navigator=Netscape", "Mosaic", "Lynx", "Encarta"],
    't6': ["Démineur=Minesweeper"],
}

T['sci-techno-13'] = {
    't1': ["Télévision=télé", "Smartphone=téléphone portable/portable/mobile", "Ordinateur portable", "Tablette", "Console de jeux", "Appareil photo", "Radio", "Écouteurs"],
    't2': ["Ordinateur=PC"],
    't3': ["Lecteur DVD", "Montre connectée", "Enceinte Bluetooth", "Casque audio", "Chaîne hi-fi", "Baladeur", "iPod", "Lecteur MP3", "Caméscope", "Drone", "Liseuse", "Radio-réveil=réveil", "Calculatrice", "Téléphone fixe", "Répondeur", "Magnétoscope", "Platine vinyle=tourne-disque", "Lecteur CD", "Barre de son", "Home cinéma", "Vidéoprojecteur", "GPS", "Autoradio", "Aspirateur robot", "Assistant vocal", "Enceinte connectée", "Box Internet", "Décodeur TV", "Lecteur Blu-ray", "Walkman", "Discman", "Minitel", "Fax", "Photocopieur", "Tamagotchi", "Casque VR", "Talkie-walkie", "Babyphone", "Caméra de surveillance"],
    't4': ["Bracelet connecté", "Balance connectée", "Thermostat connecté", "Ampoule connectée", "Sonnette connectée", "Tondeuse robot", "Karaoké", "Tensiomètre", "Magnétophone", "Dictaphone", "Cadre photo numérique", "Pager=Bip", "Polaroid", "Appareil photo instantané", "Chromecast", "Clé HDMI", "Détecteur de fumée", "Thermomètre électronique", "Lecteur de cassettes", "Poste de radio", "Transistor", "Trottinette électrique", "Télécommande", "Interphone", "Visiophone", "Appareil photo jetable", "Montre à quartz", "Console portable", "Lecteur de livres numériques", "Téléviseur à tube cathodique"],
    't5': [],
    't6': ["Lecteur laserdisc=Laserdisc"],
}

T['sci-techno-14'] = {
    't1': ["Tracteur", "Bulldozer", "Pelleteuse=excavatrice/pelle mécanique", "Grue", "Moissonneuse-batteuse", "Bétonnière=camion toupie/toupie", "Rouleau compresseur", "Tractopelle"],
    't2': ["Camion benne=benne"],
    't3': ["Niveleuse", "Chargeuse", "Chariot élévateur", "Nacelle", "Compacteur", "Dumper", "Tombereau", "Finisseur", "Grue à tour", "Grue mobile", "Mini-pelle", "Trancheuse", "Pompe à béton", "Charrue", "Herse", "Semoir", "Faucheuse", "Presse à balles=botteleuse/ramasseuse-presse", "Remorque agricole", "Épandeur", "Pulvérisateur", "Faneuse", "Ensileuse", "Arracheuse de pommes de terre", "Vendangeuse=machine à vendanger", "Cultivateur", "Déchaumeur", "Motoculteur", "Trayeuse", "Balayeuse", "Saleuse", "Chasse-neige", "Dameuse", "Tronçonneuse", "Fendeuse à bois"],
    't4': ["Andaineur", "Désileuse", "Rotavator", "Broyeur", "Gyrobroyeur", "Cueilleur de maïs", "Moissonneuse", "Abatteuse", "Débardeur=skidder", "Porteur forestier", "Broyeur forestier", "Mini-chargeuse=Bobcat", "Fraiseuse routière", "Dragline", "Roue-pelle=excavatrice à roue-godets", "Tracteur enjambeur", "Pelle rétro", "Foreuse", "Camion-grue", "Plateforme élévatrice", "Autobétonnière", "Tonne à lisier"],
    't5': [],
    't6': ["Bagger 293"],
}

T['sci-techno-15'] = {
    't1': ["Voilier", "Paquebot", "Cargo", "Pétrolier", "Yacht", "Canot", "Barque", "Péniche", "Sous-marin", "Porte-avions"],
    't2': ["Bateau"],
    't3': ["Ferry=ferry-boat/transbordeur", "Catamaran", "Trimaran", "Frégate", "Destroyer=contre-torpilleur", "Croiseur", "Corvette", "Cuirassé", "Chalutier", "Remorqueur", "Brise-glace", "Bateau-mouche", "Gondole", "Pirogue", "Kayak", "Canoë", "Radeau", "Galion", "Galère", "Drakkar", "Caravelle", "Goélette", "Brick", "Clipper", "Trois-mâts", "Felouque", "Boutre", "Jonque", "Sampan", "Zodiac=canot pneumatique", "Hors-bord", "Vedette", "Chaloupe", "Barge", "Thonier", "Caboteur", "Méthanier", "Porte-conteneurs", "Vraquier", "Aéroglisseur", "Hydroglisseur", "Jet-ski", "Baleinier", "Pédalo"],
    't4': ["Dériveur", "Lougre", "Cotre=cutter", "Ketch", "Yawl", "Sloop", "Pinasse", "Navire-école", "Nef", "Birème", "Trière", "Knarr", "Coracle", "Tartane", "Vaporetto", "Bac", "Canot de sauvetage", "Hydrofoil=hydroptère", "Gabare", "Bateau-pompe", "Navire-hôpital", "Roulier", "Navire-citerne", "Navire de croisière=bateau de croisière", "Dinghy", "Bateau-feu", "Bateau à aubes=bateau à roues", "Remorqueur-pousseur=pousseur", "Sous-marin nucléaire", "Patrouilleur", "Chasseur de mines"],
    't5': [],
    't6': ["Bathyscaphe"],
}
