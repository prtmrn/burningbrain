# Sciences & Nature (science-nature) - Terre, environnement et espace
PROMPTS = [
    {'id': 'sci-terre-01', 'text': 'Nomme un volcan du monde (actif, endormi ou éteint)'},
    {'id': 'sci-terre-02', 'text': 'Nomme une mer ou un océan'},
    {'id': 'sci-terre-03', 'text': 'Nomme un désert du monde'},
    {'id': 'sci-terre-04', 'text': 'Nomme un astronaute ou un cosmonaute'},
    {'id': 'sci-terre-05', 'text': 'Nomme un engin spatial (sonde, satellite, télescope spatial, station, rover ou navette)'},
    {'id': 'sci-terre-06', 'text': 'Nomme une fusée ou un lanceur spatial'},
    {'id': 'sci-terre-07', 'text': 'Nomme un combustible ou un carburant'},
    {'id': 'sci-terre-08', 'text': 'Nomme un déchet ménager'},
    {'id': 'sci-terre-09', 'text': 'Nomme une catastrophe naturelle célèbre de l\'Histoire (séisme, éruption, tsunami, ouragan ou tempête)'},
    {'id': 'sci-terre-10', 'text': 'Nomme une roche ou un minéral'},
    {'id': 'sci-terre-11', 'text': 'Nomme une pierre précieuse ou semi-précieuse'},
    {'id': 'sci-terre-12', 'text': 'Nomme une étoile portant un nom propre (hors Soleil)'},
    {'id': 'sci-terre-13', 'text': 'Nomme un animal menacé d\'extinction'},
    {'id': 'sci-terre-14', 'text': 'Nomme un élément du relief ou du paysage naturel'},
    {'id': 'sci-terre-15', 'text': 'Nomme un geste écologique du quotidien'},
]

T = {}

T['sci-terre-01'] = {
    't1': ["Etna=Mont Etna", "Stromboli", "Krakatoa=Krakatau", "Mont Fuji=Fuji-Yama/Fujiyama/Fuji", "Piton de la Fournaise", "Montagne Pelée=Pelée", "Mont Saint Helens=Mount St. Helens/Saint Helens", "Eyjafjallajökull=Eyjafjöll", "Pinatubo", "Kilauea=Kīlauea"],
    't2': ["Vésuve=Mont Vésuve"],
    't3': ["Mauna Loa", "Mauna Kea", "Popocatépetl=Popocatepetl", "Santorin=Thera", "Tambora", "Cotopaxi", "Teide=Pico del Teide", "Hekla", "Katla", "Soufrière de Guadeloupe=La Soufrière/Soufrière", "Merapi", "Mont Erebus=Erebus", "Yellowstone", "Nyiragongo", "Puy de Dôme", "Sakurajima", "Kilimandjaro=Kilimanjaro", "Elbrouz=Elbrus", "Mont Rainier", "Paricutín=Parícutin", "Villarrica", "Nevado del Ruiz", "Arenal", "Mont Ararat=Ararat", "Chimborazo", "Mont Cameroun", "Ol Doinyo Lengai", "Erta Ale", "Taal", "Mayon", "Bromo", "Agung", "Anak Krakatau"],
    't4': ["Rinjani", "Unzen", "Mont Aso=Aso", "Ontake", "Mont Baekdu=Paektu/Changbai", "Vulcano", "Champs Phlégréens=Campi Flegrei", "Surtsey", "Grímsvötn=Grimsvötn", "Askja", "Laki", "Bárðarbunga", "Fagradalsfjall", "Soufrière Hills", "Puy de Sancy", "Karthala", "Tungurahua", "Sangay", "Galeras", "Irazú", "Poás", "Masaya", "Fuego", "Pacaya", "Katmai", "Novarupta", "Redoubt", "Mont Lassen=Lassen Peak", "Mont Shasta", "Mont Hood", "Colima", "Klioutchevskoï=Kluchevskaya", "Sinabung", "Semeru", "Kelud"],
    't5': ["Lascar", "Llaima", "Chaitén", "Nyamuragira=Nyamulagira", "Mont Pico=Pico", "Mont Mazama", "Tolbatchik=Tolbachik", "Bezymianny", "Puy de Pariou", "Mont Tarawera", "Ruapehu=Mont Ruapehu", "Ngauruhoe", "Taranaki=Mont Egmont", "Whakaari=White Island", "Hunga Tonga", "Kolumbo", "Mont Augustine=Augustine"],
    't6': ["Olympus Mons=Mont Olympe"],
}

T['sci-terre-02'] = {
    't1': ["Atlantique=océan Atlantique", "Pacifique=océan Pacifique", "Océan Indien", "Mer Rouge", "Mer Morte", "Mer du Nord", "Mer Noire", "Mer Baltique=Baltique", "Mer des Caraïbes=Caraïbes/mer des Antilles", "Mer Caspienne"],
    't2': ["Mer Méditerranée=Méditerranée"],
    't3': ["Océan Arctique=océan glacial Arctique", "Océan Antarctique=océan Austral/océan glacial Antarctique", "Mer Jaune", "Mer de Chine méridionale=mer de Chine du Sud", "Mer de Chine orientale", "Mer d'Arabie", "Mer d'Aral", "Mer Adriatique=Adriatique", "Mer Égée=Égée", "Mer Ionienne=Ionienne", "Mer Tyrrhénienne=Tyrrhénienne", "Mer Ligure", "Mer d'Irlande", "Manche", "Mer Celtique", "Mer de Norvège", "Mer de Barents", "Mer de Béring=mer de Bering", "Mer d'Okhotsk", "Mer du Japon", "Mer de Corail", "Mer de Tasman", "Mer des Philippines", "Mer de Java", "Golfe du Mexique", "Mer des Sargasses", "Mer de Weddell", "Mer de Ross", "Mer du Labrador", "Mer de Beaufort", "Mer des Tchouktches", "Mer de Kara", "Mer de Laptev", "Mer Blanche", "Mer de Marmara=Marmara", "Mer d'Azov"],
    't4': ["Mer d'Andaman", "Mer des Célèbes", "Mer de Banda", "Mer de Flores", "Mer de Timor", "Mer d'Arafura", "Mer des Salomon", "Mer de Bismarck", "Mer de Sulu", "Mer des Wadden", "Mer d'Alboran", "Mer des Baléares", "Mer de Libye", "Mer de Crète", "Mer de Thrace", "Mer de Botnie", "Mer du Groenland", "Mer d'Amundsen", "Mer de Bellingshausen", "Mer de Scotia", "Mer de Sibérie orientale", "Mer d'Oman", "Golfe Persique=golfe Arabo-Persique", "Golfe de Guinée", "Golfe du Bengale", "Golfe d'Aden", "Mer des Moluques", "Mer de Ceram", "Golfe de Gascogne", "Golfe du Lion", "Mer de Mindanao", "Mer de Fidji", "Mer de Natuna", "Mer de Davis", "Mer de Lazarev", "Mer de Mawson", "Mer de Pechora", "Mer des Hébrides"],
    't5': ["Mer de Lincoln", "Mer de Koro", "Mer de Riiser-Larsen", "Mer des Cosmonautes", "Mer de Wandel", "Mer de Chukchi Sud"],
    't6': ["Mer de Galilée=lac de Tibériade/lac de Génésareth"],
}

T['sci-terre-03'] = {
    't1': ["Gobi=désert de Gobi", "Kalahari", "Atacama", "Namib", "Mojave", "Désert d'Arabie=Rub al-Khali/Quart vide", "Néguev=Negev", "Thar", "Taklamakan=Taklimakan"],
    't2': ["Sahara"],
    't3': ["Désert de Libye=désert Libyque", "Karakoum=Karakum/Kara-Koum", "Kyzylkoum=Kyzylkum", "Sonora", "Chihuahua", "Grand Désert Victoria=Great Victoria Desert", "Grand Désert de Sable=Great Sandy Desert", "Désert de Gibson", "Désert de Simpson", "Désert de Tanami", "Désert de Patagonie=Patagonie", "Désert de Sechura", "An-Nefoud=Nefoud", "Dasht-e Kavir=grand désert de sel", "Dasht-e Lut=Lut", "Désert du Sinaï", "Désert de Judée", "Désert de Nubie", "Désert Arabique=désert Oriental", "Ténéré", "Tanezrouft", "Danakil", "Karoo", "Grand Bassin=Great Basin", "Désert Peint=Painted Desert", "Désert Blanc", "Ordos", "Badain Jaran", "Gurbantünggüt", "Ustyurt", "Désert de Syrie=désert syrien", "Antarctique", "Arctique", "Désert de Tabernas=Tabernas", "Bardenas Reales=Bardenas"],
    't4': ["Désert de Black Rock", "Désert du Colorado", "Désert de Sturt", "Désert de Little Sandy", "Désert de Strzelecki", "Désert de Cholistan=Cholistan", "Registan", "Désert de Tengger", "Désert de Lompoul=Lompoul", "Désert de Wahiba=Wahiba Sands", "Désert de Bayuda", "Désert de Moyynkum", "Désert de Betpak-Dala", "Désert de Maranjab", "Désert de Sahel", "Désert du Kyzyl", "Désert d'Aralkum=Aralkum", "Désert du Tihama=Tihama", "Désert du Sinaï-Négev", "Désert de Sonora-Chihuahua", "Désert de Painted Hills", "Désert de Namib-Naukluft=Namib-Naukluft", "Désert de Pinnacles=Nambung", "Désert de Libye-Égypte", "Désert de Kharga", "Désert de Farafra", "Désert de Dakhla"],
    't5': ["Désert de Kavir-e Namak", "Désert de Dasht-e Margo=Dasht-e Margo", "Désert de Paran", "Désert d'Ennedi", "Désert de Dzoungarie=Dzoungarie", "Désert de Kumtag", "Désert de Gila", "Désert de Salton"],
    't6': ["Désert de Lençóis Maranhenses=Lençóis Maranhenses"],
}
