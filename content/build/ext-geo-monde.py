# Géographie du monde (geo-monde)
PROMPTS = [
    {'id': 'geo-monde-01', 'text': 'Nomme une monnaie nationale ou une devise utilisée dans le monde'},
    {'id': 'geo-monde-02', 'text': 'Nomme une langue parlée dans le monde'},
    {'id': 'geo-monde-03', 'text': 'Nomme un État ou un territoire des États-Unis'},
    {'id': 'geo-monde-04', 'text': 'Nomme une ville des États-Unis'},
    {'id': 'geo-monde-05', 'text': "Nomme un pays ou un territoire d'Asie"},
    {'id': 'geo-monde-06', 'text': "Nomme une nationalité (nom d'habitant d'un pays)"},
    {'id': 'geo-monde-07', 'text': 'Nomme une organisation internationale (sigle ou nom complet)'},
    {'id': 'geo-monde-08', 'text': "Nomme un peuple autochtone d'Amérique du Nord"},
    {'id': 'geo-monde-09', 'text': "Nomme une capitale d'un pays d'Asie"},
    {'id': 'geo-monde-10', 'text': 'Nomme une ville de Belgique'},
    {'id': 'geo-monde-11', 'text': 'Nomme une ville de Suisse'},
    {'id': 'geo-monde-12', 'text': 'Nomme une ville du Maroc'},
    {'id': 'geo-monde-13', 'text': 'Nomme une ville du Portugal'},
    {'id': 'geo-monde-14', 'text': 'Nomme une ville de Turquie'},
    {'id': 'geo-monde-15', 'text': 'Nomme une ville de Pologne'},
]
T = {}
T['geo-monde-01'] = {
    't1': ["Euro", "Livre sterling=livre/GBP", "Yen=JPY", "Franc suisse=CHF", "Yuan=renminbi/RMB", "Rouble=ruble/rouble russe", "Roupie indienne=INR"],
    't2': ["Dollar=dollar américain/USD"],
    't3': ["Dollar canadien=CAD", "Dollar australien=AUD", "Peso mexicain=peso", "Real=real brésilien/BRL", "Won sud-coréen=won", "Couronne suédoise", "Couronne norvégienne", "Couronne danoise", "Zloty=złoty polonais", "Livre turque=lire turque", "Dirham marocain=MAD", "Rand=rand sud-africain", "Dollar néo-zélandais", "Franc CFA", "Shekel=nouveau shekel/shekel israélien", "Baht=baht thaïlandais", "Livre égyptienne", "Naira=naira nigérian"],
    't4': ["Peso argentin", "Peso chilien", "Peso colombien", "Peso philippin", "Dinar algérien", "Dinar tunisien", "Dinar koweïtien=dinar du Koweït", "Dinar irakien", "Dinar jordanien", "Dinar bahreïni", "Dinar serbe", "Dinar libyen", "Dirham des Émirats arabes unis=dirham émirati/AED", "Riyal saoudien=riyal", "Riyal qatari", "Riyal omanais", "Rial iranien=riyal iranien", "Rupiah=roupie indonésienne", "Ringgit=ringgit malaisien", "Dong=dông vietnamien", "Dollar de Singapour=dollar singapourien", "Dollar de Hong Kong=dollar hongkongais", "Nouveau dollar de Taïwan=dollar taïwanais", "Forint=forint hongrois", "Couronne tchèque", "Leu roumain=leu", "Lev bulgare=lev", "Hryvnia=hryvnia ukrainienne", "Shilling kényan", "Shilling tanzanien", "Shilling ougandais", "Birr éthiopien=birr", "Cedi=cedi ghanéen", "Kwacha zambien", "Pula=pula botswanais", "Livre libanaise", "Livre syrienne", "Taka bangladais=taka", "Roupie pakistanaise", "Roupie népalaise", "Roupie sri-lankaise", "Afghani", "Kyat=kyat birman", "Riel=riel cambodgien", "Kip=kip laotien", "Tenge=tenge kazakh", "Sum ouzbek", "Lari=lari géorgien", "Dram arménien", "Manat azerbaïdjanais", "Guarani=guarani paraguayen", "Sol péruvien=nuevo sol", "Boliviano=boliviano bolivien", "Quetzal=quetzal guatémaltèque", "Lempira=lempira hondurien", "Colón costaricien", "Gourde=gourde haïtienne", "Peso cubain", "Peso dominicain", "Dollar jamaïcain", "Dollar de Trinité-et-Tobago", "Dollar fidjien", "Couronne islandaise", "Franc CFP=franc pacifique", "Peso uruguayen", "Tugrik=tögrög mongol"],
    't5': ["Ariary=ariary malgache", "Dalasi=dalasi gambien", "Leone=leone sierra-léonais", "Dollar libérien", "Franc guinéen", "Franc rwandais", "Franc burundais", "Franc congolais", "Franc comorien", "Franc djiboutien", "Nakfa=nakfa érythréen", "Ouguiya=ouguiya mauritanien", "Metical=metical mozambicain", "Kwanza=kwanza angolais", "Loti=loti lesothan", "Lilangeni=lilangeni swazi", "Dollar namibien", "Roupie mauricienne", "Roupie seychelloise", "Escudo capverdien", "Dobra=dobra santoméen", "Rufiyaa=rufiyaa maldivienne", "Vatu=vatu vanuatais", "Tala=tala samoan", "Kina=kina papou-néo-guinéen", "Córdoba nicaraguayen=córdoba", "Balboa=balboa panaméen", "Dollar des Caraïbes orientales", "Dollar bélizien", "Dollar bahaméen", "Dollar barbadien", "Dollar guyanien", "Dollar surinamien", "Dollar de Brunei", "Dollar des Îles Salomon", "Bolivar vénézuélien=bolívar", "Livre sud-soudanaise", "Livre soudanaise", "Dinar macédonien=denar macédonien", "Lek albanais=lek", "Rouble biélorusse", "Leu moldave"],
    't6': ["Pa'anga=pa'anga tongan"],
}
T['geo-monde-02'] = {
    't1': ["Espagnol", "Français", "Allemand", "Italien", "Portugais", "Mandarin=chinois/chinois mandarin", "Arabe", "Russe", "Japonais"],
    't2': ["Anglais"],
    't3': ["Hindi", "Coréen", "Néerlandais=hollandais", "Turc", "Polonais", "Grec", "Suédois", "Hébreu", "Persan=farsi", "Swahili", "Vietnamien", "Thaï", "Catalan", "Bengali", "Ukrainien", "Tchèque", "Norvégien", "Danois", "Finnois", "Hongrois", "Roumain", "Cantonais"],
    't4': ["Breton", "Basque", "Corse", "Occitan", "Gallois", "Irlandais=gaélique irlandais/gaélique", "Gaélique écossais", "Islandais", "Bulgare", "Serbe", "Croate", "Slovaque", "Slovène", "Lituanien", "Letton", "Estonien", "Albanais", "Macédonien", "Biélorusse", "Géorgien", "Arménien", "Ourdou=urdu", "Pendjabi", "Tamoul", "Télougou=telugu", "Marathi", "Gujarati", "Malais", "Indonésien", "Tagalog=filipino", "Birman", "Khmer", "Lao", "Mongol", "Kazakh", "Ouzbek", "Pachto", "Kurde", "Amharique", "Haoussa", "Yoruba", "Zoulou", "Afrikaans", "Wolof", "Lingala", "Malgache", "Créole haïtien", "Maltais", "Luxembourgeois=letzebuergesch", "Frison", "Yiddish", "Romani=romanès", "Quechua", "Guarani", "Nahuatl", "Maori"],
    't5': ["Aymara", "Inuktitut", "Cri", "Navajo", "Hawaïen", "Samoan", "Tongien", "Tahitien", "Fidjien", "Bambara", "Peul=fulfulde", "Somali", "Tigrigna", "Xhosa", "Sesotho", "Shona", "Kinyarwanda", "Kirundi", "Tswana", "Cingalais=singhalais", "Népalais", "Tibétain", "Ouïghour", "Tadjik", "Turkmène", "Kirghiz", "Azéri", "Féroïen", "Same=lapon", "Cornique", "Mannois=manx", "Romanche", "Judéo-espagnol=ladino", "Sarde", "Frioulan", "Alsacien", "Tchétchène", "Kannada", "Malayalam", "Oriya=odia", "Assamais", "Sindhi", "Cachemiri", "Wu=shanghaïen", "Hakka", "Hmong", "Javanais", "Soundanais", "Cebuano", "Bichelamar", "Sango", "Kikongo", "Akan=twi", "Igbo", "Oromo", "Tamazight=berbère", "Kabyle", "Tchouvache", "Tatar", "Bachkir", "Ossète", "Abkhaze", "Kalmouk", "Yakoute", "Hokkien=minnan"],
    't6': ["Esperanto"],
}
T['geo-monde-03'] = {
    't1': ["Texas", "Floride", "New York=État de New York", "Hawaï", "Alaska", "Nevada", "Louisiane", "Géorgie", "Arizona"],
    't2': ["Californie"],
    't3': ["Illinois", "Michigan", "Ohio", "Pennsylvanie", "Massachusetts", "Colorado", "Utah", "Oregon", "Virginie", "Caroline du Nord", "Caroline du Sud", "Tennessee", "Kentucky", "Alabama", "Mississippi", "Missouri", "Washington=État de Washington", "Nouveau-Mexique", "Indiana", "Wisconsin", "Minnesota", "New Jersey", "Oklahoma", "Montana", "Maine", "Idaho"],
    't4': ["Connecticut", "Kansas", "Nebraska", "Iowa", "Dakota du Nord", "Dakota du Sud", "Wyoming", "Arkansas", "Virginie-Occidentale", "Maryland", "Delaware", "New Hampshire", "Vermont", "Washington D.C.=district de Columbia/Washington DC"],
    't5': ["Porto Rico", "Guam", "Samoa américaines", "Îles Vierges américaines", "Îles Mariannes du Nord"],
    't6': ["Rhode Island"],
}
T['geo-monde-04'] = {
    't1': ["Los Angeles", "Chicago", "Miami", "Las Vegas", "San Francisco", "Washington D.C.=Washington/Washington DC", "Boston", "Houston", "La Nouvelle-Orléans=New Orleans"],
    't2': ["New York"],
    't3': ["Philadelphie=Philadelphia", "Dallas", "San Diego", "Seattle", "Atlanta", "Denver", "Detroit", "Phoenix", "Orlando", "Austin", "San Antonio", "Portland", "Honolulu", "Baltimore", "Minneapolis", "Saint-Louis=St. Louis/Saint Louis", "Pittsburgh", "Cleveland", "Nashville", "Memphis", "Salt Lake City", "San José", "Oakland", "Sacramento", "Tampa", "Charlotte", "Kansas City", "Indianapolis", "Columbus", "Cincinnati", "Milwaukee", "Albuquerque", "Tucson", "Jacksonville", "Fort Worth", "El Paso", "Oklahoma City", "Louisville", "Raleigh", "Richmond", "Buffalo", "Santa Fe", "Boise", "Omaha", "Hollywood", "Beverly Hills"],
    't4': ["Anchorage", "Juneau", "Fairbanks", "Savannah", "Charleston", "Santa Barbara", "Santa Monica", "Palo Alto", "Pasadena", "Long Beach", "Anaheim", "Fresno", "Reno", "Tulsa", "Little Rock", "Baton Rouge", "Birmingham", "Mobile", "Montgomery", "Atlantic City", "Newark", "Providence", "Hartford", "New Haven", "Albany", "Rochester", "Syracuse", "Cambridge", "Salem", "Burlington", "Madison", "Des Moines", "Lincoln", "Wichita", "Topeka", "Lexington", "Jackson", "Knoxville", "Chattanooga", "Greensboro", "Durham", "Norfolk", "Virginia Beach", "Annapolis", "Dover", "Cheyenne", "Billings", "Spokane", "Tacoma", "Bismarck", "Pierre", "Sioux Falls", "Fargo", "Colorado Springs", "Aspen", "Boulder", "Scottsdale", "Tempe", "Key West", "Palm Beach", "Tallahassee", "Fort Lauderdale", "Corpus Christi", "Galveston", "Dearborn", "Ann Arbor", "Akron", "Toledo", "Dayton", "Malibu", "Napa", "Sedona", "Flagstaff"],
    't5': ["Tombstone", "Deadwood", "Plymouth", "Concord", "Montpelier", "Augusta", "Olympia", "Carson City", "Helena", "Santa Cruz", "Lancaster", "Gettysburg", "Cooperstown", "Palm Springs", "Santa Rosa", "Eugene", "Bellevue", "Everett"],
    't6': ["Roswell"],
}
T['geo-monde-05'] = {
    't1': ["Japon", "Inde", "Thaïlande", "Vietnam", "Corée du Sud", "Indonésie", "Philippines", "Malaisie", "Singapour"],
    't2': ["Chine"],
    't3': ["Corée du Nord", "Pakistan", "Bangladesh", "Sri Lanka", "Népal", "Cambodge", "Laos", "Birmanie=Myanmar", "Iran", "Irak", "Syrie", "Liban", "Israël", "Jordanie", "Arabie saoudite", "Émirats arabes unis=EAU", "Turquie", "Afghanistan", "Kazakhstan", "Mongolie", "Taïwan", "Qatar", "Koweït", "Yémen", "Oman"],
    't4': ["Brunei", "Timor oriental=Timor-Leste", "Maldives", "Bahreïn", "Géorgie", "Arménie", "Azerbaïdjan", "Ouzbékistan", "Turkménistan", "Kirghizistan", "Tadjikistan", "Chypre", "Palestine", "Hong Kong", "Macao"],
    't5': [],
    't6': ["Bhoutan"],
}
T['geo-monde-06'] = {
    't1': ["Allemand", "Italien", "Espagnol", "Anglais", "Américain", "Belge", "Suisse", "Portugais", "Canadien", "Japonais"],
    't2': ["Français"],
    't3': ["Chinois", "Russe", "Brésilien", "Mexicain", "Argentin", "Australien", "Marocain", "Algérien", "Tunisien", "Sénégalais", "Irlandais", "Néerlandais=Hollandais", "Suédois", "Norvégien", "Danois", "Finlandais", "Polonais", "Grec", "Turc", "Égyptien", "Indien", "Coréen", "Vietnamien", "Thaïlandais", "Autrichien", "Israélien", "Libanais", "Cubain", "Colombien", "Chilien", "Péruvien", "Vénézuélien", "Sud-Africain", "Nigérian", "Ivoirien", "Camerounais", "Congolais", "Haïtien"],
    't4': ["Hongrois", "Tchèque", "Slovaque", "Roumain", "Bulgare", "Serbe", "Croate", "Slovène", "Bosniaque", "Ukrainien", "Biélorusse", "Lituanien", "Letton", "Estonien", "Islandais", "Luxembourgeois", "Maltais", "Chypriote", "Albanais", "Macédonien", "Monégasque", "Iranien", "Irakien", "Syrien", "Saoudien", "Jordanien", "Afghan", "Pakistanais", "Bangladais", "Sri-Lankais", "Népalais", "Indonésien", "Philippin", "Malaisien", "Singapourien", "Cambodgien", "Birman", "Mongol", "Kazakh", "Ouzbek", "Géorgien", "Arménien", "Azerbaïdjanais", "Néo-Zélandais", "Équatorien", "Bolivien", "Uruguayen", "Paraguayen", "Costaricien", "Panaméen", "Guatémaltèque", "Dominicain", "Jamaïcain", "Éthiopien", "Kényan", "Tanzanien", "Ougandais", "Ghanéen", "Malien", "Burkinabé", "Guinéen", "Nigérien", "Tchadien", "Gabonais", "Malgache", "Mozambicain", "Zimbabwéen", "Angolais", "Libyen", "Soudanais", "Somalien", "Rwandais"],
    't5': ["Bhoutanais", "Maldivien", "Brunéien", "Timorais", "Laotien", "Turkmène", "Kirghize", "Tadjik", "Fidjien", "Samoan", "Tongien", "Burundais", "Érythréen", "Djiboutien", "Mauritanien", "Béninois", "Togolais", "Sierra-Léonais", "Libérien", "Gambien", "Namibien", "Botswanais", "Zambien", "Nicaraguayen", "Hondurien", "Salvadorien", "Bélizien", "Surinamien", "Bahaméen", "Barbadien", "Liechtensteinois", "Saint-Marinais", "Moldave", "Kosovar", "Monténégrin", "Yéménite", "Omanais", "Qatari", "Koweïtien", "Bahreïni", "Émirati=émirien"],
    't6': ["Andorran"],
}
T['geo-monde-07'] = {
    't1': ["OTAN=NATO/Organisation du traité de l'Atlantique nord", "Union européenne=UE", "UNESCO", "OMS=Organisation mondiale de la santé", "FMI=Fonds monétaire international", "Banque mondiale", "OMC=Organisation mondiale du commerce", "UNICEF", "OPEP=OPEC"],
    't2': ["ONU=Organisation des Nations unies/Nations unies"],
    't3': ["Croix-Rouge=Comité international de la Croix-Rouge/CICR", "G7", "G20", "Union africaine=UA", "Ligue arabe", "ASEAN=ANASE/Association des nations de l'Asie du Sud-Est", "FAO=Organisation des Nations unies pour l'alimentation et l'agriculture", "OIT=Organisation internationale du travail", "AIEA=Agence internationale de l'énergie atomique", "OCDE=Organisation de coopération et de développement économiques", "Interpol=OIPC", "CIO=Comité international olympique", "FIFA", "Conseil de l'Europe", "Médecins sans frontières=MSF", "Amnesty International", "Greenpeace", "WWF", "Commonwealth"],
    't4': ["OSCE", "OEA=Organisation des États américains", "Mercosur", "ALENA=NAFTA", "CEDEAO=ECOWAS", "SADC", "Francophonie=OIF/Organisation internationale de la Francophonie", "OCI=Organisation de la coopération islamique", "CCG=Conseil de coopération du Golfe", "BRICS", "APEC", "CIJ=Cour internationale de justice", "CPI=Cour pénale internationale", "OMPI", "OACI", "UIT=Union internationale des télécommunications", "UPU=Union postale universelle", "OMM=Organisation météorologique mondiale", "OMT=Organisation mondiale du tourisme", "HCR=Haut-Commissariat des Nations unies pour les réfugiés", "PAM=Programme alimentaire mondial", "PNUD", "PNUE", "BCE=Banque centrale européenne", "BERD", "BAD=Banque africaine de développement", "Banque asiatique de développement", "BRI=Banque des règlements internationaux", "AELE=Association européenne de libre-échange", "Benelux", "Union du Maghreb arabe", "CARICOM", "OCS=Organisation de coopération de Shanghai", "CEI=Communauté des États indépendants", "UEMOA", "CEMAC", "Oxfam", "Human Rights Watch", "Reporters sans frontières=RSF", "UEFA", "ESA=Agence spatiale européenne", "UNASUR", "Communauté andine"],
    't5': ["OIM=Organisation internationale pour les migrations", "ONUSIDA", "FIDA", "ONUDI", "UNRWA", "UIP=Union interparlementaire", "OIAC=Organisation pour l'interdiction des armes chimiques", "UICN=Union internationale pour la conservation de la nature", "Europol", "Eurojust", "Frontex", "Union économique eurasiatique", "Commission baleinière internationale", "Organisation hydrographique internationale", "FIBA", "Organisation mondiale des douanes"],
    't6': ["CERN=Organisation européenne pour la recherche nucléaire"],
}
T['geo-monde-08'] = {
    't1': ["Apaches", "Cherokees", "Navajos", "Cheyennes", "Comanches", "Iroquois", "Hurons=Wendat", "Inuits=Inuit/Esquimaux", "Mohawks"],
    't2': ["Sioux=Lakota/Dakota"],
    't3': ["Algonquins", "Cris=Cree", "Pieds-Noirs=Blackfoot", "Mohicans", "Séminoles", "Crows=Corbeaux", "Ojibwés=Chippewas/Ojibwa/Anishinaabe", "Shoshones", "Hopis", "Pawnees", "Pueblos", "Nez-Percés", "Mi'kmaq=Micmacs", "Innus=Montagnais"],
    't4': ["Choctaws", "Chickasaws", "Creeks", "Oneidas", "Onondagas", "Cayugas", "Senecas", "Tuscaroras", "Kiowas", "Arapahos", "Mandans", "Osages", "Omahas", "Utes", "Paiutes", "Chinooks", "Haïdas", "Tlingits", "Shawnees", "Delawares=Lenapes", "Miamis", "Wampanoags", "Abénaquis", "Malécites", "Métis", "Dénés", "Aléoutes", "Yupiks", "Pimas", "Zunis", "Yakamas", "Ottawas=Outaouais", "Potawatomis", "Winnebagos=Ho-Chunk", "Menominees", "Sauks", "Renards=Meskwakis", "Natchez", "Catawbas", "Powhatans"],
    't5': ["Nootkas=Nuu-chah-nulth", "Kwakiutl", "Salish", "Gwich'in", "Inuvialuits", "Assiniboines", "Gros-Ventres", "Lumbees", "Pomos", "Miwoks", "Ohlones", "Chumash", "Yuroks", "Klamaths", "Modocs", "Tohono O'odham=Papagos", "Kickapoos", "Naskapis", "Susquehannocks", "Hidatsas", "Arikaras", "Wichitas", "Makahs", "Mohaves", "Quapaws", "Narragansetts", "Pequots", "Piegans", "Sarcis"],
    't6': ["Beothuks"],
}
T['geo-monde-09'] = {
    't1': ["Tokyo", "Séoul", "Bangkok", "New Delhi=Delhi", "Hanoï", "Jakarta", "Manille", "Téhéran", "Bagdad", "Damas"],
    't2': ["Pékin=Beijing"],
    't3': ["Kuala Lumpur", "Singapour", "Islamabad", "Dacca=Dhaka", "Katmandou=Kathmandu", "Kaboul", "Beyrouth", "Jérusalem", "Amman", "Riyad=Riyadh", "Ankara", "Pyongyang", "Taipei", "Phnom Penh", "Vientiane", "Doha", "Abou Dhabi", "Oulan-Bator", "Tachkent", "Bakou=Baku", "Tbilissi", "Erevan=Yerevan"],
    't4': ["Colombo", "Thimphou=Thimphu", "Malé", "Sanaa", "Mascate=Muscat", "Koweït=Koweït City", "Manama", "Astana=Noursoultan", "Achgabat=Ashgabat", "Bichkek", "Douchanbé", "Nicosie", "Bandar Seri Begawan", "Dili"],
    't5': ["Putrajaya", "Sri Jayawardenepura Kotte=Kotte"],
    't6': ["Naypyidaw=Nay Pyi Taw"],
}
T['geo-monde-10'] = {
    't1': ["Anvers=Antwerpen", "Liège", "Gand=Gent", "Bruges=Brugge", "Charleroi", "Namur"],
    't2': ["Bruxelles"],
    't3': ["Louvain=Leuven", "Mons=Bergen", "Ostende=Oostende", "Tournai=Doornik", "Malines=Mechelen", "Waterloo", "Dinant", "Spa", "Wavre", "Arlon=Aarlen", "Hasselt", "Courtrai=Kortrijk", "Verviers", "Bastogne", "Ypres=Ieper", "La Louvière"],
    't4': ["Louvain-la-Neuve", "Ottignies", "Nivelles", "Huy", "Seraing", "Genk", "Mouscron", "Eupen", "Knokke", "Blankenberge", "La Panne=De Panne", "Zeebrugge", "Alost=Aalst", "Termonde=Dendermonde", "Turnhout", "Lierre=Lier", "Roulers=Roeselare", "Saint-Nicolas=Sint-Niklaas", "Tongres=Tongeren", "Binche", "Chimay", "Ath", "Herstal", "Bouillon", "Durbuy", "Vilvoorde", "Saint-Trond=Sint-Truiden", "Diest", "Marche-en-Famenne", "Stavelot", "Malmedy", "Tubize", "Soignies", "Braine-l'Alleud", "Genappe", "Hal=Halle", "Ixelles", "Schaerbeek", "Anderlecht", "Uccle", "Molenbeek-Saint-Jean=Molenbeek", "Saint-Gilles", "Etterbeek", "Laeken"],
    't5': ["Visé", "Gembloux", "Couvin", "Tervuren", "Zaventem", "Lommel", "Geel", "Aarschot", "Tirlemont=Tienen", "Ninove", "Audenarde=Oudenaarde", "Menin=Menen", "Poperinge", "Nieuport=Nieuwpoort", "Furnes=Veurne", "Dixmude=Diksmuide", "Rochefort", "La Roche-en-Ardenne", "Houffalize", "Vielsalm", "Libramont", "Neufchâteau", "Florenville"],
    't6': ["Mol"],
}
T['geo-monde-11'] = {
    't1': ["Zurich", "Berne=Bern", "Lausanne", "Bâle=Basel", "Lucerne=Luzern", "Lugano", "Neuchâtel", "Fribourg", "Sion"],
    't2': ["Genève"],
    't3': ["Saint-Gall=St. Gallen", "Winterthour=Winterthur", "Montreux", "Vevey", "Zoug=Zug", "Coire=Chur", "Bienne=Biel", "Soleure=Solothurn", "Thoune=Thun", "Interlaken", "Zermatt", "Davos", "Saint-Moritz=St. Moritz", "Locarno", "Bellinzone=Bellinzona", "Yverdon-les-Bains=Yverdon", "Nyon", "Morges", "La Chaux-de-Fonds", "Schaffhouse=Schaffhausen", "Aarau", "Martigny", "Gstaad", "Verbier"],
    't4': ["Delémont", "Porrentruy", "Le Locle", "Bulle", "Morat=Murten", "Estavayer-le-Lac", "Payerne", "Vallorbe", "Aigle", "Monthey", "Sierre", "Brigue=Brig", "Viège=Visp", "Crans-Montana", "Leysin", "Meiringen", "Lauterbrunnen", "Grindelwald", "Wengen", "Mürren", "Kandersteg", "Adelboden", "Wil", "Frauenfeld", "Glaris=Glarus", "Altdorf", "Schwytz=Schwyz", "Stans", "Sarnen", "Liestal", "Herisau", "Appenzell", "Baden", "Olten", "Zofingue=Zofingen", "Langenthal", "Berthoud=Burgdorf", "Köniz", "Kloten", "Uster", "Dübendorf", "Rapperswil", "Einsiedeln", "Arosa", "Klosters", "Pontresina", "Ascona", "Mendrisio", "Chiasso", "Rolle", "Coppet", "Carouge", "Vernier", "Lancy"],
    't5': ["Wettingen", "Emmen", "Loèche=Leuk", "Saas-Fee", "Andermatt", "Engelberg", "Flims", "Laax", "Lenzerheide", "Samedan", "Scuol", "Bad Ragaz", "Nendaz", "Champéry", "Les Diablerets", "Château-d'Œx", "Romont", "Avenches", "Grandson", "Orbe", "Cossonay", "Lutry", "Cully"],
    't6': ["Gruyères"],
}
T['geo-monde-12'] = {
    't1': ["Marrakech", "Rabat", "Fès=Fez", "Tanger", "Agadir", "Meknès"],
    't2': ["Casablanca"],
    't3': ["Essaouira", "Oujda", "Tétouan", "Ouarzazate", "Chefchaouen", "Kénitra", "Salé", "El Jadida", "Safi", "Nador", "Laâyoune", "Dakhla", "Mohammédia", "Béni Mellal", "Al Hoceïma", "Larache", "Taza", "Khouribga", "Settat", "Errachidia", "Asilah=Assilah", "Taroudant", "Tiznit", "Guelmim", "Merzouga", "Azrou"],
    't4': ["Berkane", "Khémisset", "Taourirt", "Témara", "Sidi Slimane", "Sidi Kacem", "Ksar el-Kébir", "Fnideq", "M'diq=Mdiq", "Martil", "Ouazzane", "Midelt", "Zagora", "Tinghir", "Imlil", "Oualidia", "Skhirat", "Berrechid", "Azemmour", "Youssoufia", "Khénifra", "Sefrou", "Moulay Idriss", "Ben Guerir", "Taghazout", "Sidi Ifni", "Tan-Tan", "Smara", "Boujdour", "Figuig", "Guercif", "Oued Zem", "Fquih Ben Salah", "Kelaat Sraghna", "Sidi Bennour"],
    't5': ["Boumalne Dadès", "Missour", "Aït Benhaddou", "Rissani", "Kasba Tadla", "Taounate", "Chichaoua", "Demnate", "Imouzzer", "Tafraoute", "Sidi Bouzid", "Mehdia", "Bouznika", "Dar Bouazza", "Nouaceur"],
    't6': ["Ifrane"],
}
T['geo-monde-13'] = {
    't1': ["Porto", "Faro", "Coimbra", "Braga", "Funchal", "Sintra", "Albufeira"],
    't2': ["Lisbonne=Lisboa"],
    't3': ["Cascais", "Évora", "Aveiro", "Guimarães", "Fátima", "Lagos", "Setúbal", "Viseu", "Ponta Delgada", "Óbidos", "Nazaré", "Tomar", "Portimão", "Tavira", "Estoril", "Leiria", "Vila Nova de Gaia", "Amadora", "Almada", "Viana do Castelo", "Bragança", "Vilamoura", "Loulé"],
    't4': ["Santarém", "Beja", "Portalegre", "Castelo Branco", "Guarda", "Vila Real", "Chaves", "Barcelos", "Peniche", "Matosinhos", "Olhão", "Elvas", "Mafra", "Amarante", "Lamego", "Póvoa de Varzim", "Espinho", "Angra do Heroísmo", "Horta", "Monsaraz", "Marvão", "Castelo de Vide", "Silves", "Lagoa", "Monchique", "Sines", "Alcobaça", "Batalha", "Ericeira", "Queluz", "Oeiras", "Odivelas", "Seixal", "Barreiro", "Moita", "Montijo", "Covilhã", "Fundão", "Pombal", "Figueira da Foz", "Caldas da Rainha", "Torres Vedras", "Mirandela", "Peso da Régua", "Pinhão", "Ponte de Lima", "Valença", "Monção", "Caminha"],
    't5': ["Câmara de Lobos", "Machico", "Santana", "Porto Santo", "Ribeira Grande", "Vila Franca do Campo", "Ílhavo", "Vizela", "Fafe", "Famalicão", "Paredes", "Gondomar", "Maia", "Valongo", "Santa Maria da Feira", "Ovar"],
    't6': ["Sagres"],
}
T['geo-monde-14'] = {
    't1': ["Ankara", "Izmir=Smyrne", "Antalya", "Bodrum", "Marmaris", "Bursa", "Konya", "Adana"],
    't2': ["Istanbul=Constantinople"],
    't3': ["Gaziantep", "Kayseri", "Mersin", "Trabzon", "Fethiye", "Alanya", "Kuşadası", "Çanakkale", "Edirne", "Eskişehir", "Diyarbakır", "Samsun", "Van", "Erzurum", "Malatya", "Sivas", "Denizli", "Antioche=Antakya/Hatay", "Şanlıurfa=Urfa", "Mardin", "Kahramanmaraş", "Manisa", "Balıkesir", "Izmit", "Adapazarı=Sakarya", "Göreme", "Ürgüp", "Nevşehir", "Side", "Dalyan", "Çeşme", "Ayvalık"],
    't4': ["Aydın", "Muğla", "Afyonkarahisar", "Kütahya", "Tokat", "Amasya", "Ordu", "Giresun", "Rize", "Sinop", "Zonguldak", "Bolu", "Çorum", "Yalova", "Selçuk", "Bergama=Pergame", "Iskenderun=Alexandrette", "Tarse=Tarsus", "Kars", "Erzincan", "Elazığ", "Batman", "Hakkari", "Ağrı", "Bitlis", "Tunceli", "Yozgat", "Kırşehir", "Aksaray", "Niğde", "Karaman", "Isparta", "Burdur", "Uşak", "Kırklareli", "Tekirdağ", "Bilecik", "Düzce", "Karabük", "Bartın", "Kastamonu", "Çankırı", "Kırıkkale", "Osmaniye", "Adıyaman", "Kilis", "Gümüşhane", "Bayburt", "Artvin", "Ardahan", "Iğdır", "Şırnak"],
    't5': ["Siirt", "Muş", "Bingöl", "Pamukkale", "Safranbolu"],
    't6': ["Kaş"],
}
T['geo-monde-15'] = {
    't1': ["Cracovie=Kraków", "Gdańsk=Dantzig", "Wrocław=Breslau", "Poznań=Posen", "Łódź", "Katowice", "Oświęcim=Auschwitz"],
    't2': ["Varsovie=Warszawa"],
    't3': ["Szczecin=Stettin", "Lublin", "Bydgoszcz=Bromberg", "Toruń=Thorn", "Białystok", "Gdynia", "Częstochowa", "Zakopane", "Sopot", "Rzeszów", "Kielce", "Olsztyn", "Opole", "Gliwice", "Radom", "Płock", "Malbork", "Zamość", "Przemyśl", "Bielsko-Biała", "Zielona Góra", "Kalisz", "Sosnowiec"],
    't4': ["Bytom", "Rybnik", "Ruda Śląska", "Tychy", "Gorzów Wielkopolski", "Elbląg", "Wałbrzych", "Włocławek", "Tarnów", "Chorzów", "Koszalin", "Legnica", "Grudziądz", "Słupsk", "Nowy Sącz", "Lubin", "Piła", "Konin", "Inowrocław", "Zabrze", "Dąbrowa Górnicza", "Jaworzno", "Jastrzębie-Zdrój", "Mysłowice", "Siedlce", "Piotrków Trybunalski", "Pabianice", "Tomaszów Mazowiecki", "Stalowa Wola", "Mielec", "Krosno", "Sanok", "Łomża", "Suwałki", "Ełk", "Giżycko", "Mikołajki", "Kołobrzeg", "Świnoujście", "Ustka", "Hel", "Łeba", "Wejherowo", "Gniezno", "Leszno", "Ostrów Wielkopolski", "Jelenia Góra", "Świdnica", "Kłodzko", "Nysa", "Racibórz", "Cieszyn", "Żywiec", "Wadowice", "Nowy Targ", "Tarnowskie Góry", "Sandomierz", "Kazimierz Dolny", "Chełm", "Biała Podlaska", "Zgorzelec", "Frombork"],
    't5': ["Zduńska Wola", "Ostrowiec Świętokrzyski", "Kartuzy", "Pruszków", "Legionowo", "Otwock"],
    't6': ["Wieliczka"],
}
