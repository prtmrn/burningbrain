PROMPTS = [
 {'id': 'geo-villes-01', 'text': "Nomme une ville d'Italie"},
 {'id': 'geo-villes-02', 'text': "Nomme une ville d'Espagne"},
 {'id': 'geo-villes-03', 'text': "Nomme une ville d'Allemagne"},
 {'id': 'geo-villes-04', 'text': "Nomme une ville du Royaume-Uni"},
 {'id': 'geo-villes-05', 'text': "Nomme une ville de Californie"},
 {'id': 'geo-villes-06', 'text': "Nomme une ville du Japon"},
 {'id': 'geo-villes-07', 'text': "Nomme une ville du Brésil"},
 {'id': 'geo-villes-08', 'text': "Nomme une ville de Chine"},
 {'id': 'geo-villes-09', 'text': "Nomme une ville d'Inde"},
 {'id': 'geo-villes-10', 'text': "Nomme une ville du Canada"},
 {'id': 'geo-villes-11', 'text': "Nomme une ville de Russie"},
 {'id': 'geo-villes-12', 'text': "Nomme une ville du Mexique"},
 {'id': 'geo-villes-13', 'text': "Nomme une ville des Pays-Bas"},
 {'id': 'geo-villes-14', 'text': "Nomme une ville d'Australie"},
 {'id': 'geo-villes-15', 'text': "Nomme une ville d'Afrique qui n'est pas une capitale nationale"},
]

T = {}

T['geo-villes-01'] = {
 't1': ["Rome=Roma", "Milan=Milano", "Naples=Napoli", "Turin=Torino", "Venise=Venezia", "Florence=Firenze", "Bologne=Bologna", "Gênes=Genova"],
 't2': ["Trieste"],
 't3': ["Palerme=Palermo", "Vérone=Verona", "Pise=Pisa", "Bari", "Catane=Catania", "Sienne=Siena", "Padoue=Padova", "Messine=Messina", "Parme=Parma", "Modène=Modena", "Bergame=Bergamo", "Brescia", "Cagliari", "Pérouse=Perugia", "Rimini", "Salerne=Salerno", "Côme=Como", "Ravenne=Ravenna", "Lecce"],
 't4': ["Tarente=Taranto", "Reggio de Calabre=Reggio Calabria", "Livourne=Livorno", "Ferrare=Ferrara", "Mantoue=Mantova", "Vicence=Vicenza", "Trente=Trento", "Bolzano=Bozen", "Ancône=Ancona", "Pescara", "Syracuse=Siracusa", "Plaisance=Piacenza", "Lucques=Lucca", "Arezzo", "Udine", "Novare=Novara", "Sassari", "Foggia", "Assise=Assisi", "Amalfi", "Sorrente=Sorrento", "Aoste=Aosta", "L'Aquila", "Matera", "Pavie=Pavia", "Crémone=Cremona", "Trévise=Treviso", "Monza", "Reggio d'Émilie=Reggio Emilia", "Brindisi", "Agrigente=Agrigento"],
 't5': ["Pistoia", "Prato", "Viterbe=Viterbo", "Cosenza", "Catanzaro", "Potenza", "Campobasso", "Rovigo", "Bellune=Belluno", "Asti", "Alessandria", "Coni=Cuneo", "Verceil=Vercelli", "Biella", "Lodi", "Lecco", "Sondrio", "La Spezia", "Savone=Savona", "Sanremo", "Faenza", "Forlì", "Cesena", "Urbino", "Pesaro", "Macerata", "Ascoli Piceno", "Teramo", "Chieti", "Bénévent=Benevento", "Avellino", "Caserte=Caserta", "Trapani", "Marsala", "Enna", "Nuoro", "Oristano", "Olbia", "Crotone", "Barletta", "Trani", "San Gimignano", "Gubbio", "Orvieto", "Spolète=Spoleto", "Terni", "Rieti", "Latina", "Frosinone", "Tivoli", "Civitavecchia", "Gorizia", "Pordenone", "Merano=Meran"],
 't6': ["Campione d'Italia"],
}

T['geo-villes-02'] = {
 't1': ["Madrid", "Barcelone=Barcelona", "Valence=Valencia", "Séville=Sevilla", "Bilbao", "Malaga", "Saragosse=Zaragoza", "Grenade=Granada"],
 't2': ["Ceuta"],
 't3': ["Cordoue=Córdoba", "Alicante", "Murcie=Murcia", "Palma=Palma de Majorque/Palma de Mallorca", "Valladolid", "Vigo", "Gijón", "La Corogne=A Coruña", "Saint-Sébastien=San Sebastián/Donostia", "Pampelune=Pamplona", "Salamanque=Salamanca", "Tolède=Toledo", "Cadix=Cádiz", "Santander", "Saint-Jacques-de-Compostelle=Santiago de Compostela", "Las Palmas=Las Palmas de Gran Canaria", "Oviedo", "Marbella", "Benidorm"],
 't4': ["Melilla", "Tarragone=Tarragona", "Gérone=Girona", "Lérida=Lleida", "Burgos", "León", "Ségovie=Segovia", "Ávila", "Cáceres", "Badajoz", "Mérida", "Almería", "Jaén", "Huelva", "Jerez=Jerez de la Frontera", "Carthagène=Cartagena", "Logroño", "Vitoria=Vitoria-Gasteiz", "Santa Cruz de Tenerife", "Elche", "Castellón=Castellón de la Plana", "Albacete", "Cuenca", "Ibiza=Eivissa", "Ronda", "Sitges", "Figueras=Figueres"],
 't5': ["Huesca", "Teruel", "Soria", "Zamora", "Palencia", "Ciudad Real", "Guadalajara", "Lugo", "Ourense", "Pontevedra", "Ferrol", "Algésiras=Algeciras", "Torremolinos", "Estepona", "Gandia", "Alcalá de Henares", "Getafe", "Móstoles", "Leganés", "Badalone=Badalona", "L'Hospitalet de Llobregat", "Sabadell", "Terrassa", "Reus", "Mataró", "Lorca", "Linares", "Úbeda", "Baeza", "Écija", "Antequera", "Calatayud", "Ponferrada", "Avilés", "Torrelavega", "Irun", "Getxo", "Mahón=Maó", "Arrecife", "Puerto de la Cruz"],
 't6': ["Llívia"],
}

T['geo-villes-03'] = {
 't1': ["Berlin", "Munich=München", "Hambourg=Hamburg", "Cologne=Köln", "Francfort=Frankfurt/Francfort-sur-le-Main/Frankfurt am Main", "Stuttgart", "Düsseldorf", "Dresde=Dresden"],
 't2': ["Aix-la-Chapelle=Aachen"],
 't3': ["Leipzig", "Dortmund", "Essen", "Brême=Bremen", "Hanovre=Hannover", "Nuremberg=Nürnberg", "Duisbourg=Duisburg", "Bonn", "Heidelberg", "Mayence=Mainz", "Trèves=Trier", "Fribourg-en-Brisgau=Freiburg im Breisgau", "Brunswick=Braunschweig", "Augsbourg=Augsburg", "Kiel", "Lübeck", "Rostock", "Wiesbaden", "Karlsruhe", "Mannheim", "Münster", "Potsdam"],
 't4': ["Bochum", "Wuppertal", "Bielefeld", "Gelsenkirchen", "Mönchengladbach", "Chemnitz", "Magdebourg=Magdeburg", "Halle", "Erfurt", "Weimar", "Iéna=Jena", "Ratisbonne=Regensburg", "Wurtzbourg=Würzburg", "Ingolstadt", "Ulm", "Constance=Konstanz", "Sarrebruck=Saarbrücken", "Coblence=Koblenz", "Kassel", "Osnabrück", "Oldenbourg=Oldenburg", "Göttingen", "Wolfsburg", "Bamberg", "Bayreuth", "Passau", "Spire=Speyer", "Worms", "Baden-Baden", "Tübingen", "Leverkusen", "Krefeld", "Oberhausen"],
 't5': ["Schwerin", "Cottbus", "Görlitz", "Zwickau", "Plauen", "Gera", "Dessau=Dessau-Roßlau", "Wittenberg=Lutherstadt Wittenberg", "Stralsund", "Greifswald", "Wismar", "Flensburg", "Cuxhaven", "Wilhelmshaven", "Emden", "Bremerhaven", "Hildesheim", "Salzgitter", "Celle", "Lunebourg=Lüneburg", "Paderborn", "Siegen", "Hagen", "Hamm", "Solingen", "Remscheid", "Herne", "Neuss", "Pforzheim", "Heilbronn", "Reutlingen", "Landshut", "Rosenheim", "Kempten", "Fürth", "Erlangen", "Darmstadt", "Kaiserslautern", "Ludwigshafen", "Fulda", "Marbourg=Marburg", "Giessen", "Quedlinbourg=Quedlinburg", "Eisenach", "Gotha"],
 't6': ["Büsingen am Hochrhein=Büsingen"],
}

T['geo-villes-04'] = {
 't1': ["Londres=London", "Manchester", "Liverpool", "Birmingham", "Édimbourg=Edinburgh", "Glasgow", "Cardiff", "Belfast"],
 't2': ["Derry=Londonderry"],
 't3': ["Leeds", "Sheffield", "Bristol", "Newcastle=Newcastle upon Tyne", "Nottingham", "Leicester", "Oxford", "Cambridge", "Southampton", "Portsmouth", "Brighton", "York", "Aberdeen", "Dundee", "Bath", "Cantorbéry=Canterbury", "Plymouth", "Coventry"],
 't4': ["Inverness", "Swansea", "Newport", "Stoke-on-Trent", "Wolverhampton", "Bradford", "Hull=Kingston upon Hull", "Sunderland", "Middlesbrough", "Derby", "Norwich", "Exeter", "Ipswich", "Reading", "Luton", "Milton Keynes", "Northampton", "Peterborough", "Blackpool", "Preston", "Lancaster", "Carlisle", "Durham", "Chester", "Worcester", "Gloucester", "Salisbury", "Winchester", "Stirling", "Perth", "Bangor", "Lisburn", "Douvres=Dover", "Bournemouth", "Swindon"],
 't5': ["Armagh", "Newry", "Wrexham", "Truro", "Wells", "Ely", "Lichfield", "Hereford", "Ripon", "Wakefield", "Lincoln", "Chelmsford", "Colchester", "St Albans", "Bolton", "Wigan", "Blackburn", "Burnley", "Huddersfield", "Halifax", "Doncaster", "Rotherham", "Barnsley", "Grimsby", "Scarborough", "Whitby", "Harrogate", "Cheltenham", "Torquay", "Penzance", "Falmouth", "Folkestone", "Hastings", "Eastbourne", "Margate", "Stratford-upon-Avon", "Warwick", "Shrewsbury", "Telford", "Crawley", "Basingstoke", "Slough", "Paisley", "Kilmarnock", "Ayr", "Fort William", "Oban", "St Andrews", "Aberystwyth", "Caernarfon", "Llandudno"],
 't6': ["St Davids"],
}

T['geo-villes-05'] = {
 't1': ["Los Angeles", "San Francisco", "San Diego", "San Jose", "Sacramento", "Oakland", "Malibu", "Santa Monica", "Beverly Hills"],
 't2': ["Calexico"],
 't3': ["Long Beach", "Fresno", "Pasadena", "Berkeley", "Palo Alto", "Anaheim", "Santa Barbara", "Santa Cruz", "Palm Springs", "Burbank", "Monterey", "Napa", "Bakersfield", "Riverside", "Irvine", "Cupertino", "Mountain View"],
 't4': ["Santa Ana", "Stockton", "Modesto", "San Bernardino", "Glendale", "Huntington Beach", "Santa Clarita", "Oxnard", "Ventura", "Thousand Oaks", "Sunnyvale", "Santa Clara", "Fremont", "Hayward", "Sausalito", "Carmel=Carmel-by-the-Sea", "Sonoma", "Inglewood", "Compton", "Torrance", "Redondo Beach", "Newport Beach", "Laguna Beach", "Oceanside", "Carlsbad", "Escondido", "Chula Vista", "Santa Rosa", "Salinas", "San Luis Obispo", "Davis", "Redding", "Eureka", "Lancaster", "Palmdale", "Pomona", "Ontario", "Fontana", "Temecula", "Menlo Park"],
 't5': ["Visalia", "Chico", "Merced", "Vallejo", "Concord", "Richmond", "Daly City", "San Mateo", "Redwood City", "Moreno Valley", "Corona", "Rancho Cucamonga", "Victorville", "Barstow", "Needles", "Indio", "Coachella", "El Centro", "Yuba City", "Turlock", "Tracy", "Livermore", "Pleasanton", "Walnut Creek", "Petaluma", "Ukiah", "Crescent City", "Arcata", "Half Moon Bay", "Gilroy", "Watsonville", "Paso Robles", "Santa Maria", "Lompoc", "Solvang", "Ojai", "West Hollywood", "Culver City", "Downey", "Norwalk", "Whittier", "El Monte", "Alhambra", "Arcadia", "Costa Mesa", "Fullerton", "Orange", "Garden Grove", "Simi Valley", "Camarillo", "Bishop", "Lodi", "Hanford", "Porterville", "Tulare", "Delano", "Lake Elsinore", "Murrieta", "Hemet", "Palm Desert", "Cathedral City", "South Lake Tahoe", "Mammoth Lakes", "City of Industry=Industry"],
 't6': ["Weed"],
}

T['geo-villes-06'] = {
 't1': ["Tokyo", "Osaka", "Kyoto", "Yokohama", "Hiroshima", "Nagasaki", "Kobe", "Nagoya", "Sapporo"],
 't2': ["Kawasaki"],
 't3': ["Fukuoka", "Sendai", "Nara", "Kitakyushu", "Naha", "Kanazawa", "Nikko", "Kamakura", "Chiba", "Saitama", "Kagoshima", "Niigata", "Shizuoka", "Okayama", "Kumamoto", "Hakodate", "Matsuyama"],
 't4': ["Himeji", "Nagano", "Sakai", "Hamamatsu", "Sasebo", "Kochi", "Takamatsu", "Tokushima", "Matsue", "Tottori", "Yamaguchi", "Shimonoseki", "Kurashiki", "Fukuyama", "Kure", "Gifu", "Toyota", "Okazaki", "Ise", "Tsu", "Wakayama", "Otsu", "Utsunomiya", "Mito", "Maebashi", "Takasaki", "Kofu", "Fukushima", "Morioka", "Aomori", "Akita", "Yamagata", "Asahikawa", "Otaru", "Kushiro", "Obihiro", "Miyazaki", "Oita", "Beppu", "Saga", "Toyama", "Fukui", "Matsumoto", "Takayama", "Funabashi", "Kawaguchi", "Hachioji"],
 't5': ["Okinawa", "Nago", "Ishigaki", "Iwaki", "Koriyama", "Hirosaki", "Hachinohe", "Muroran", "Tomakomai", "Wakkanai", "Abashiri", "Nemuro", "Kitami", "Sakata", "Tsuruoka", "Joetsu", "Nagaoka", "Kashiwazaki", "Takaoka", "Kaga", "Tsuruga", "Maizuru", "Uji", "Hikone", "Akashi", "Nishinomiya", "Amagasaki", "Toyonaka", "Suita", "Higashiosaka", "Iwakuni", "Hagi", "Imabari", "Uwajima", "Ichinomiya", "Kasugai", "Yokkaichi", "Suzuka", "Numazu", "Atami", "Ito", "Odawara", "Fujisawa", "Yokosuka", "Sagamihara", "Tokorozawa", "Kawagoe", "Kashiwa", "Narita", "Tsukuba", "Hitachi"],
 't6': ["Fuji"],
}

T['geo-villes-07'] = {
 't1': ["Rio de Janeiro=Rio", "São Paulo", "Brasília", "Salvador=Salvador de Bahia", "Recife", "Fortaleza", "Belo Horizonte", "Manaus"],
 't2': ["Natal"],
 't3': ["Porto Alegre", "Curitiba", "Belém", "Florianópolis", "Goiânia", "São Luís", "Maceió", "João Pessoa", "Campinas", "Santos", "Vitória", "Foz do Iguaçu", "Teresina", "Cuiabá", "Campo Grande"],
 't4': ["Aracaju", "Macapá", "Boa Vista", "Porto Velho", "Rio Branco", "Palmas", "Ouro Preto", "Petrópolis", "Niterói", "Guarulhos", "Santo André", "São Bernardo do Campo", "Osasco", "Ribeirão Preto", "Sorocaba", "Uberlândia", "Juiz de Fora", "Londrina", "Maringá", "Joinville", "Blumenau", "Pelotas", "Caxias do Sul", "Feira de Santana", "Campina Grande", "Olinda", "Paraty", "Porto Seguro", "Ilhéus", "Santarém"],
 't5': ["Juazeiro do Norte", "Mossoró", "Petrolina", "Juazeiro", "Caruaru", "Imperatriz", "Marabá", "Parintins", "Corumbá", "Dourados", "Rondonópolis", "Anápolis", "Uberaba", "Montes Claros", "Governador Valadares", "Ipatinga", "Contagem", "Betim", "Diamantina", "Mariana", "Tiradentes", "São João del-Rei", "Volta Redonda", "Campos dos Goytacazes", "Cabo Frio", "Búzios=Armação dos Búzios", "Angra dos Reis", "São José dos Campos", "Taubaté", "Jundiaí", "Piracicaba", "Bauru", "Araraquara", "São Carlos", "Ponta Grossa", "Cascavel", "Chapecó", "Itajaí", "Balneário Camboriú", "Gramado", "Santa Maria", "Rio Grande", "Passo Fundo", "Vila Velha", "Cariacica", "Lençóis"],
 't6': ["Americana"],
}

T['geo-villes-08'] = {
 't1': ["Pékin=Beijing", "Shanghai", "Canton=Guangzhou", "Shenzhen", "Wuhan", "Xi'an", "Chongqing", "Hong Kong"],
 't2': ["Macao=Macau"],
 't3': ["Nankin=Nanjing", "Tianjin", "Chengdu", "Hangzhou", "Harbin", "Shenyang", "Dalian", "Qingdao", "Suzhou", "Kunming", "Lhassa=Lhasa", "Urumqi", "Xiamen", "Guilin", "Changsha", "Zhengzhou"],
 't4': ["Jinan", "Fuzhou", "Nanning", "Guiyang", "Lanzhou", "Xining", "Yinchuan", "Hohhot", "Taiyuan", "Shijiazhuang", "Hefei", "Nanchang", "Changchun", "Haikou", "Sanya", "Ningbo", "Wuxi", "Dongguan", "Foshan", "Zhuhai", "Luoyang", "Kaifeng", "Datong", "Kachgar=Kashgar/Kashi", "Dunhuang", "Yangzhou", "Shaoxing", "Wenzhou", "Shantou", "Yantai", "Tangshan", "Baotou", "Anshan", "Jilin", "Lijiang", "Tourfan=Turpan"],
 't5': ["Zibo", "Weifang", "Xuzhou", "Changzhou", "Nantong", "Jiaxing", "Huzhou", "Jinhua", "Quanzhou", "Zhangzhou", "Ganzhou", "Jiujiang", "Yichang", "Xiangyang", "Zhuzhou", "Hengyang", "Liuzhou", "Beihai", "Zunyi", "Dali", "Panzhihua", "Mianyang", "Leshan", "Zigong", "Yibin", "Luzhou", "Baoji", "Yan'an", "Xianyang", "Tianshui", "Jiayuguan", "Golmud", "Karamay", "Hami", "Qiqihar", "Daqing", "Mudanjiang", "Jiamusi", "Dandong", "Fushun", "Qinhuangdao", "Chengde", "Baoding", "Handan", "Qufu", "Jingdezhen", "Huangshan", "Wuhu", "Anqing", "Yueyang"],
 't6': ["Manzhouli"],
}

T['geo-villes-09'] = {
 't1': ["Delhi=New Delhi/Nouvelle-Delhi", "Bombay=Mumbai", "Calcutta=Kolkata", "Madras=Chennai", "Bangalore=Bengaluru", "Agra", "Jaipur", "Bénarès=Varanasi"],
 't2': ["Pondichéry=Puducherry/Pondicherry"],
 't3': ["Hyderabad", "Ahmedabad", "Pune=Poona", "Amritsar", "Lucknow", "Kanpur", "Udaipur", "Jodhpur", "Chandigarh", "Bhopal", "Kochi=Cochin", "Mysore=Mysuru", "Darjeeling", "Surat", "Patna"],
 't4': ["Nagpur", "Indore", "Thane", "Visakhapatnam", "Vadodara=Baroda", "Ludhiana", "Coimbatore", "Madurai", "Thiruvananthapuram=Trivandrum", "Bhubaneswar", "Guwahati", "Ranchi", "Raipur", "Dehradun", "Shimla", "Srinagar", "Jammu", "Leh", "Jaisalmer", "Bikaner", "Ajmer", "Pushkar", "Rishikesh", "Haridwar", "Allahabad=Prayagraj", "Gwalior", "Jabalpur", "Nashik", "Aurangabad", "Mangalore=Mangaluru", "Vijayawada", "Panaji", "Gangtok", "Shillong", "Imphal", "Kohima", "Aizawl", "Agartala", "Itanagar", "Khajuraho", "Ujjain", "Bodh-Gaya=Bodhgaya", "Mathura"],
 't5': ["Meerut", "Ghaziabad", "Faridabad", "Gurgaon=Gurugram", "Noida", "Aligarh", "Bareilly", "Moradabad", "Gorakhpur", "Jhansi", "Kota", "Rajkot", "Bhavnagar", "Jamnagar", "Dwarka", "Solapur", "Kolhapur", "Sangli", "Belgaum=Belagavi", "Hubli", "Tirupati", "Guntur", "Warangal", "Nellore", "Tiruchirappalli", "Salem", "Vellore", "Thanjavur", "Kanyakumari", "Kozhikode=Calicut", "Thrissur", "Kollam", "Alappuzha=Alleppey", "Cuttack", "Puri", "Rourkela", "Jamshedpur", "Dhanbad", "Asansol", "Durgapur", "Siliguri", "Dibrugarh", "Silchar", "Bilaspur", "Bhilai", "Mount Abu", "Ooty=Udhagamandalam", "Manali", "Dharamsala", "Mahabalipuram=Mamallapuram", "Chandernagor=Chandannagar", "Karikal=Karaikal", "Yanaon=Yanam"],
 't6': ["Mahé"],
}

T['geo-villes-10'] = {
 't1': ["Montréal", "Toronto", "Vancouver", "Québec", "Ottawa", "Calgary", "Edmonton", "Winnipeg"],
 't2': ["London"],
 't3': ["Halifax", "Victoria", "Regina", "Saskatoon", "Hamilton", "Gatineau", "Laval", "Sherbrooke", "Trois-Rivières", "Kingston", "Niagara Falls", "Whistler", "Banff", "Saint John", "St. John's", "Moncton", "Fredericton", "Charlottetown", "Whitehorse", "Yellowknife", "Iqaluit", "Mississauga"],
 't4': ["Brampton", "Markham", "Kitchener", "Waterloo", "Windsor", "Sudbury", "Thunder Bay", "Sault-Sainte-Marie=Sault Ste. Marie", "Barrie", "Oshawa", "Guelph", "Peterborough", "Belleville", "Cornwall", "Kelowna", "Kamloops", "Nanaimo", "Prince George", "Surrey", "Burnaby", "Richmond", "Lethbridge", "Red Deer", "Fort McMurray", "Jasper", "Brandon", "Churchill", "Prince Albert", "Moose Jaw", "Lévis", "Longueuil", "Saguenay", "Rimouski", "Drummondville", "Granby", "Rouyn-Noranda", "Val-d'Or", "Sept-Îles", "Gaspé", "Dawson=Dawson City"],
 't5': ["Inuvik", "Corner Brook", "Gander", "Sydney", "Truro", "Lunenburg", "Yarmouth", "Bathurst", "Edmundston", "Summerside", "Shawinigan", "Victoriaville", "Saint-Hyacinthe", "Joliette", "Baie-Comeau", "Alma", "Magog", "Mont-Tremblant", "Rivière-du-Loup", "Matane", "Timmins", "North Bay", "Kenora", "Sarnia", "Brantford", "St. Catharines", "Burlington", "Oakville", "Vaughan", "Abbotsford", "Chilliwack", "Penticton", "Vernon", "Prince Rupert", "Squamish", "Grande Prairie", "Canmore", "Airdrie", "Lloydminster", "Flin Flon", "Thompson", "Steinbach"],
 't6': ["Medicine Hat"],
}

T['geo-villes-11'] = {
 't1': ["Moscou=Moskva/Moscow", "Saint-Pétersbourg=Saint Petersburg/Sankt-Peterburg/Leningrad", "Vladivostok", "Novossibirsk=Novosibirsk", "Sotchi=Sochi", "Kazan", "Volgograd", "Iekaterinbourg=Yekaterinburg/Ekaterinbourg"],
 't2': ["Kaliningrad=Königsberg"],
 't3': ["Nijni Novgorod=Nizhny Novgorod", "Samara", "Omsk", "Rostov-sur-le-Don=Rostov-on-Don", "Oufa=Ufa", "Krasnoïarsk=Krasnoyarsk", "Perm", "Voronej=Voronezh", "Irkoutsk=Irkutsk", "Mourmansk=Murmansk", "Arkhangelsk", "Khabarovsk", "Iakoutsk=Yakutsk", "Tcheliabinsk=Chelyabinsk", "Saratov", "Iaroslavl=Yaroslavl", "Novgorod=Veliky Novgorod"],
 't4': ["Tomsk", "Barnaoul=Barnaul", "Kemerovo", "Novokouznetsk=Novokuznetsk", "Tioumen=Tyumen", "Kourgan=Kurgan", "Orenbourg=Orenburg", "Penza", "Oulianovsk=Ulyanovsk", "Togliatti=Tolyatti", "Astrakhan", "Krasnodar", "Stavropol", "Grozny", "Makhatchkala=Makhachkala", "Vladikavkaz", "Naltchik=Nalchik", "Tver", "Toula=Tula", "Riazan=Ryazan", "Kalouga=Kaluga", "Smolensk", "Briansk=Bryansk", "Koursk=Kursk", "Belgorod", "Lipetsk", "Tambov", "Vologda", "Petrozavodsk", "Pskov", "Souzdal=Suzdal", "Vladimir", "Serguiev Possad=Sergiev Posad", "Kostroma", "Ivanovo", "Mourom=Murom", "Magadan", "Petropavlovsk-Kamtchatski=Petropavlovsk-Kamchatsky", "Ioujno-Sakhalinsk=Yuzhno-Sakhalinsk", "Tchita=Chita", "Oulan-Oude=Ulan-Ude", "Norilsk", "Sourgout=Surgut", "Ijevsk=Izhevsk", "Kirov", "Syktyvkar", "Tcheboksary=Cheboksary", "Saransk"],
 't5': ["Anapa", "Novorossiisk=Novorossiysk", "Gelendjik=Gelendzhik", "Taganrog", "Piatigorsk=Pyatigorsk", "Kislovodsk", "Elista", "Tcherepovets=Cherepovets", "Severodvinsk", "Vorkouta=Vorkuta", "Salekhard", "Khanty-Mansiïsk=Khanty-Mansiysk", "Bratsk", "Angarsk", "Abakan", "Kyzyl", "Birobidjan=Birobidzhan", "Blagovechtchensk=Blagoveshchensk", "Komsomolsk-sur-l'Amour=Komsomolsk-on-Amur", "Nakhodka", "Oussouriisk=Ussuriysk", "Anadyr", "Magnitogorsk", "Zlatooust=Zlatoust", "Nijni Taguil=Nizhny Tagil", "Orsk", "Sterlitamak", "Naberejnye Tchelny=Naberezhnye Chelny", "Dzerjinsk=Dzerzhinsk", "Obninsk", "Kolomna", "Podolsk", "Khimki", "Ouglitch=Uglich", "Vyborg", "Oriol=Oryol", "Korolev=Korolyov", "Ioshkar-Ola=Yoshkar-Ola"],
 't6': ["Doubna=Dubna"],
}

T['geo-villes-12'] = {
 't1': ["Mexico=Ciudad de México/Mexico City", "Cancún", "Guadalajara", "Monterrey", "Acapulco", "Tijuana", "Puebla", "Oaxaca"],
 't2': ["Mérida"],
 't3': ["Veracruz", "Cuernavaca", "Querétaro", "León", "Chihuahua", "Ciudad Juárez", "Toluca", "Morelia", "Mazatlán", "Puerto Vallarta", "San Luis Potosí", "Aguascalientes", "Guanajuato", "Playa del Carmen", "Tulum", "Hermosillo", "Culiacán", "Durango"],
 't4': ["Saltillo", "Mexicali", "Ensenada", "La Paz", "Cabo San Lucas", "Campeche", "Villahermosa", "Tuxtla Gutiérrez", "San Cristóbal de las Casas", "Xalapa=Jalapa", "Pachuca", "Tlaxcala", "Zacatecas", "Tepic", "Colima", "Chetumal", "Taxco", "Zihuatanejo", "Nuevo Laredo", "Reynosa", "Matamoros", "Tampico", "Torreón", "Ecatepec", "Nezahualcóyotl", "Celaya", "Irapuato", "San Miguel de Allende", "Cholula", "Puerto Escondido", "Manzanillo", "Lázaro Cárdenas", "Ciudad Victoria", "Monclova"],
 't5': ["Tlaquepaque=San Pedro Tlaquepaque", "Zapopan", "Tonalá", "Uruapan", "Pátzcuaro", "Tehuacán", "Orizaba", "Córdoba", "Coatzacoalcos", "Poza Rica", "Tuxpan", "Ciudad del Carmen", "Valladolid", "Izamal", "Progreso", "Comitán", "Tapachula", "Salina Cruz", "Juchitán", "Iguala", "Chilpancingo", "Tepoztlán", "Guaymas", "Nogales", "Los Mochis", "Ciudad Obregón", "Delicias", "Hidalgo del Parral=Parral", "Gómez Palacio", "Piedras Negras", "Ciudad Acuña", "Fresnillo", "Lagos de Moreno", "Real de Catorce", "Dolores Hidalgo", "Silao", "Salamanca", "Texcoco"],
 't6': ["Tequila"],
}

T['geo-villes-13'] = {
 't1': ["Amsterdam", "Rotterdam", "La Haye=Den Haag/'s-Gravenhage/The Hague", "Utrecht", "Eindhoven", "Groningue=Groningen", "Maastricht"],
 't2': ["Gouda"],
 't3': ["Delft", "Leyde=Leiden", "Haarlem", "Arnhem", "Nimègue=Nijmegen", "Tilburg", "Breda", "Bois-le-Duc='s-Hertogenbosch/Den Bosch", "Zwolle", "Almere", "Alkmaar", "Leeuwarden", "Dordrecht", "Enschede", "Apeldoorn"],
 't4': ["Amersfoort", "Zaandam", "Zoetermeer", "Deventer", "Venlo", "Hilversum", "Hoorn", "Assen", "Emmen", "Helmond", "Roosendaal", "Oss", "Schiedam", "Vlaardingen", "Purmerend", "Lelystad", "Middelbourg=Middelburg", "Flessingue=Vlissingen", "Den Helder", "Volendam", "Kampen", "Harderwijk", "Heerlen", "Sittard", "Roermond", "Zandvoort", "Amstelveen", "Edam"],
 't5': ["Weert", "Bergen op Zoom", "Ede", "Veenendaal", "Hengelo", "Almelo", "Doetinchem", "Zutphen", "Nieuwegein", "Katwijk", "Noordwijk", "Alphen aan den Rijn", "Spijkenisse", "Capelle aan den IJssel", "Hoofddorp", "Terneuzen", "Goes", "Zierikzee", "Harlingen", "Sneek", "Drachten", "Heerenveen", "Meppel", "Hoogeveen", "Coevorden", "Winterswijk", "Tiel", "Culemborg", "Gorinchem", "Schoonhoven", "Woerden", "Leerdam", "Monnickendam", "Enkhuizen", "Medemblik", "Naarden", "Bussum", "Weesp", "Muiden", "Valkenburg", "Venray", "Waalwijk", "Oosterhout", "Uden", "Veghel"],
 't6': ["Willemstad"],
}

T['geo-villes-14'] = {
 't1': ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Canberra", "Hobart", "Darwin"],
 't2': ["Newcastle"],
 't3': ["Gold Coast", "Cairns", "Alice Springs", "Townsville", "Geelong", "Wollongong", "Fremantle", "Ballarat", "Bendigo", "Launceston", "Sunshine Coast", "Broome", "Byron Bay"],
 't4': ["Toowoomba", "Mackay", "Rockhampton", "Bunbury", "Bundaberg", "Wagga Wagga", "Albury", "Mildura", "Shepparton", "Mount Isa", "Broken Hill", "Kalgoorlie", "Geraldton", "Port Hedland", "Dubbo", "Orange", "Bathurst", "Tamworth", "Coffs Harbour", "Port Macquarie", "Hervey Bay", "Katherine", "Mandurah", "Albany", "Devonport", "Ipswich", "Logan", "Parramatta", "Gladstone"],
 't5': ["Armidale", "Lismore", "Burnie", "Mount Gambier", "Whyalla", "Port Augusta", "Port Lincoln", "Esperance", "Goulburn", "Queanbeyan", "Warrnambool", "Cessnock", "Maitland", "Grafton", "Lithgow", "Griffith", "Echuca", "Wodonga", "Horsham", "Sale", "Traralgon", "Bairnsdale", "Emerald", "Gympie", "Maryborough", "Longreach", "Charters Towers", "Karratha", "Carnarvon", "Tennant Creek", "Port Pirie", "Murray Bridge", "Victor Harbor", "Nowra"],
 't6': ["Coober Pedy"],
}

T['geo-villes-15'] = {
 't1': ["Casablanca", "Marrakech", "Alexandrie=Alexandria", "Lagos", "Johannesburg", "Durban", "Tombouctou=Timbuktu", "Mombasa"],
 't2': ["Abidjan"],
 't3': ["Fès=Fez", "Tanger=Tangier", "Agadir", "Oran", "Louxor=Luxor", "Assouan=Aswan", "Gizeh=Giza", "Port-Saïd=Port Said", "Zanzibar", "Dar es Salam=Dar es Salaam", "Douala", "Kano", "Sfax", "Sousse", "Benghazi", "Port Elizabeth=Gqeberha", "Essaouira", "Lubumbashi", "Pointe-Noire", "Bouaké"],
 't4': ["Constantine", "Annaba", "Tlemcen", "Meknès", "Tétouan", "Ouarzazate", "Oujda", "Kairouan", "Bizerte", "Gabès", "Misrata", "Suez", "Ismaïlia=Ismailia", "Ibadan", "Port Harcourt", "Kumasi", "Arusha", "Kisumu", "Bulawayo", "Beira", "Kisangani", "Goma", "Saint-Louis", "Touba", "Thiès", "Bobo-Dioulasso", "Gondar", "Bahir Dar", "Omdurman", "Port-Soudan=Port Sudan", "Toamasina=Tamatave", "Pietermaritzburg", "East London", "Kimberley", "Stellenbosch", "Mwanza", "Mopti", "Djenné", "Agadez", "Zinder", "Tamanrasset", "Ghardaïa", "Sétif", "Mahajanga=Majunga"],
 't5': ["Benin City", "Kaduna", "Enugu", "Sokoto", "Maiduguri", "Jos", "Garoua", "Bafoussam", "Franceville", "Port-Gentil", "Mbuji-Mayi", "Kananga", "Bukavu", "Gisenyi=Rubavu", "Lobito", "Huambo", "Benguela", "Ndola", "Kitwe", "Livingstone", "Nampula", "Antsirabe", "Dire Dawa", "Harar", "Aksoum=Axum", "Lalibela", "Kassala", "Nyala", "El Obeid", "Mutare", "Tamale", "Takoradi=Sekondi-Takoradi", "Cape Coast", "Korhogo", "San-Pédro", "Kaolack", "Ziguinchor", "Ségou", "Kayes", "Nouadhibou", "Sebha=Sabha", "Tobrouk=Tobruk", "Hurghada", "Charm el-Cheikh=Sharm el-Sheikh", "Tanta", "Mansourah=Mansoura", "Assiout=Asyut", "Walvis Bay", "Swakopmund", "Francistown", "Maun", "Blantyre", "Mzuzu", "Eldoret", "Nakuru", "Malindi", "Lamu", "Moshi", "Tanga", "Mbeya", "Jinja", "Gulu", "Kénitra", "El Jadida", "Safi", "Chefchaouen", "Biskra", "Béjaïa", "Batna", "Blida", "Sidi Bel Abbès", "Gafsa", "Tozeur", "Monastir", "Nabeul", "Hammamet", "Mahdia"],
 't6': ["Melilla"],
}
