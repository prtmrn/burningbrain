# Extension Sports & Loisirs (sports-leisure) : sous-domaine SPORTS INDIVIDUELS.
PROMPTS = [
 {'id': 'spo-individuels-01', 'text': "Nomme une ville accueillant ou ayant accueilli un tournoi de tennis professionnel du circuit ATP ou WTA"},
 {'id': 'spo-individuels-02', 'text': "Nomme un terme du vocabulaire du tennis (coup, règle, score, rôle sur le court…)"},
 {'id': 'spo-individuels-03', 'text': "Nomme un terme du vocabulaire du golf (score, coup, terrain, matériel…)"},
 {'id': 'spo-individuels-04', 'text': "Nomme une course cycliste professionnelle sur route (grand tour, course par étapes ou classique d'un jour)"},
 {'id': 'spo-individuels-05', 'text': "Nomme un col ou une montée célèbre du cyclisme sur route (Tour de France, Giro, Vuelta, classiques)"},
 {'id': 'spo-individuels-06', 'text': "Nomme une équipe cycliste professionnelle sur route, actuelle ou passée (par son nom de sponsor)"},
 {'id': 'spo-individuels-07', 'text': "Nomme un circuit ayant accueilli un Grand Prix du championnat du monde de Formule 1"},
 {'id': 'spo-individuels-08', 'text': "Nomme une écurie ou un constructeur ayant engagé des voitures en championnat du monde de Formule 1"},
 {'id': 'spo-individuels-09', 'text': "Nomme un pilote champion du monde de vitesse moto (MotoGP/500 cm³, Moto2/250 cm³, Moto3/125 cm³, 350 ou 50/80 cm³)"},
 {'id': 'spo-individuels-10', 'text': "Nomme un pilote vainqueur du classement général des 24 Heures du Mans"},
 {'id': 'spo-individuels-11', 'text': "Nomme une technique de judo par son nom japonais (projection, immobilisation, clé ou étranglement)"},
 {'id': 'spo-individuels-12', 'text': "Nomme une station ou un site ayant accueilli une épreuve de Coupe du monde de ski alpin"},
 {'id': 'spo-individuels-13', 'text': "Nomme une épreuve d'athlétisme (piste, sauts, lancers, épreuves combinées, route ou marche), actuelle ou disparue"},
 {'id': 'spo-individuels-14', 'text': "Nomme un boxeur ou une boxeuse ayant été champion(ne) du monde professionnel"},
 {'id': 'spo-individuels-15', 'text': "Nomme un parcours de golf ayant accueilli un tournoi majeur masculin ou une Ryder Cup"},
]

T = {}

T['spo-individuels-01'] = {
 't1': ["Paris", "Londres=Wimbledon", "New York=Flushing Meadows", "Melbourne", "Monte-Carlo=Monaco", "Rome", "Madrid", "Miami"],
 't2': ["Roquebrune-Cap-Martin"],
 't3': ["Indian Wells", "Cincinnati", "Shanghai", "Pékin=Beijing", "Tokyo", "Montréal", "Toronto", "Barcelone", "Hambourg", "Halle", "Dubaï", "Doha", "Rotterdam", "Marseille", "Acapulco", "Bâle", "Vienne", "Stuttgart", "Washington", "Turin", "Lyon", "Montpellier", "Metz", "Nice", "Buenos Aires", "Rio de Janeiro=Rio", "Sydney", "Brisbane", "Auckland", "Adélaïde"],
 't4': ["Eastbourne", "Gstaad", "Kitzbühel", "Umag", "Båstad", "Estoril", "Munich", "Genève", "Majorque=Palma", "Newport", "Atlanta", "Winston-Salem", "Los Cabos", "Chengdu", "Astana=Nour-Soultan", "Delray Beach", "Dallas", "Houston", "Marrakech", "Santiago", "Córdoba", "São Paulo", "Stockholm", "Anvers", "Moscou", "Saint-Pétersbourg", "Sofia", "Bucarest", "Budapest", "Istanbul", "Charleston", "Wuhan", "Zhuhai", "Shenzhen", "Guangzhou=Canton", "Séoul", "Hong Kong", "Strasbourg", "Linz", "Luxembourg", "Prague", "Bad Homburg", "Berlin", "Birmingham", "Nottingham", "Bois-le-Duc='s-Hertogenbosch", "Indianapolis", "Memphis", "San José", "Los Angeles", "San Diego", "Cleveland", "Québec", "Bogota", "Monterrey", "Guadalajara", "Abou Dabi"],
 't5': ["Mason", "Pune", "Chennai", "Kuala Lumpur", "Antalya", "Belgrade", "Zagreb", "Florence", "Naples", "Gijón", "Parme", "Cagliari", "Hua Hin"],
 't6': ["Tel Aviv"],
}

T['spo-individuels-02'] = {
 't1': ["Ace", "Service", "Revers", "Coup droit", "Smash", "Volée", "Lob", "Tie-break=jeu décisif", "Break", "Set=manche"],
 't2': ["Love"],
 't3': ["Double faute", "Amorti=drop shot", "Passing-shot=passing", "Let", "Balle de match", "Balle de break", "Avantage", "Égalité=deuce", "Jeu blanc", "Demi-volée", "Retour", "Faute de pied", "Filet", "Raquette", "Cordage", "Ligne de fond", "Couloir", "Carré de service", "Juge de ligne", "Arbitre de chaise", "Ramasseur de balles", "Tête de série", "Wild card=invitation", "Terre battue", "Gazon", "Surface dure", "Simple", "Double", "Double mixte", "Grand Chelem", "Slice", "Lift=topspin", "Débreak", "Coup gagnant", "Faute directe", "Hawk-Eye=œil de faucon", "Challenge"],
 't4': ["Lucky loser", "Qualifications", "Exempt=bye", "Forfait=walk-over", "Abandon", "Tableau", "Super tie-break", "Balle de set", "Kick", "Service-volée", "Tamis", "Grip", "Tweener=entre les jambes/Grand Willy", "Chip", "Contre-pied", "Montée au filet", "Service à la cuillère", "Second service", "Premier service", "Jeu de service", "Retour gagnant", "Moquette", "Faute provoquée", "Balle de championnat", "Fond de court"],
 't5': ["Chop", "Golden set", "Moonball", "Chip and charge", "Overgrip", "Faute de service"],
 't6': ["Bagel"],
}

T['spo-individuels-03'] = {
 't1': ["Birdie", "Eagle", "Par", "Bogey", "Green", "Fairway", "Bunker", "Trou en un=hole-in-one", "Caddie", "Swing"],
 't2': ["Condor"],
 't3': ["Albatros=double eagle", "Double bogey", "Rough", "Tee", "Drive", "Driver", "Putter", "Putt", "Fer", "Bois", "Wedge", "Sand wedge", "Pitching wedge", "Hybride", "Handicap", "Approche", "Chip", "Slice", "Hook", "Drapeau", "Trou", "Obstacle d'eau", "Hors limites=out of bounds", "Club-house", "Practice", "Voiturette=golfette"],
 't4': ["Fade", "Draw", "Links", "Mulligan", "Stroke play", "Match play", "Foursome", "Fourball=quatre balles", "Scramble", "Stableford", "Cut", "Playoff=barrage", "Putting green", "Dogleg", "Divot", "Lie", "Loft", "Grip", "Stance", "Backswing", "Shank", "Carte de score", "Pitch", "Avant-green=collar", "Départ", "Green fee", "Lob wedge", "Gap wedge", "Triple bogey"],
 't5': ["Dormie", "Honneur", "Marque-balle=ball marker", "Gratte", "Top", "Sweet spot", "Back nine", "Front nine", "Follow-through", "Address=adresse"],
 't6': ["Yips"],
}

T['spo-individuels-04'] = {
 't1': ["Tour de France", "Paris-Roubaix", "Tour d'Italie=Giro", "Tour d'Espagne=Vuelta", "Milan-San Remo", "Tour des Flandres=Ronde", "Liège-Bastogne-Liège", "Paris-Nice"],
 't2': ["Paris-Camembert"],
 't3': ["Tour de Lombardie=Il Lombardia", "Flèche wallonne", "Amstel Gold Race", "Gand-Wevelgem", "Critérium du Dauphiné=Dauphiné", "Tour de Suisse", "Tirreno-Adriatico", "Strade Bianche", "Paris-Tours", "Tour de Romandie", "Tour du Pays basque", "Tour de Catalogne", "Tour de Pologne"],
 't4': ["Omloop Het Nieuwsblad=Het Volk", "Kuurne-Bruxelles-Kuurne", "E3 Harelbeke=E3 Saxo Classic", "À travers la Flandre=Dwars door Vlaanderen", "Classique de Saint-Sébastien=Clasica San Sebastian", "Grand Prix cycliste de Québec", "Grand Prix cycliste de Montréal", "Bretagne Classic=Grand Prix de Plouay", "Eschborn-Francfort", "Milan-Turin", "Tour du Piémont", "Tour d'Émilie", "Tour Down Under", "UAE Tour", "Tour de Burgos", "Tour de Grande-Bretagne=Tour of Britain", "Tour du Benelux=Eneco Tour", "Étoile de Bessèges", "Tour de la Provence", "Tour du Haut-Var", "Tour de l'Ain", "Tour du Limousin", "Quatre Jours de Dunkerque", "Tour de Turquie", "Tour d'Oman", "Tour de Norvège", "Tour du Danemark", "Arctic Race of Norway", "Tour de Wallonie", "Tour de l'Algarve", "Tour d'Andalousie=Ruta del Sol", "Tour de la Communauté valencienne=Tour de Valence", "Flèche brabançonne=Brabantse Pijl", "Grand Prix de l'Escaut=Scheldeprijs", "Le Samyn", "Nokere Koerse", "Cyclassics Hambourg", "Grand Prix de Fourmies", "Cholet-Pays de la Loire", "Grand Prix de Denain", "Tour de Californie", "Tour du Guangxi", "Coppa Bernocchi", "Tre Valli Varesine", "Tour du Luxembourg", "Critérium international", "Paris-Bruxelles", "Tour des Alpes=Tour du Trentin", "Tour de Slovénie", "Tour d'Autriche", "Route d'Occitanie=Route du Sud", "Boucles de la Mayenne", "Classic de l'Ardèche"],
 't5': ["Bordeaux-Paris", "Tour de Langkawi", "Tour de Vendée", "Tour du Poitou-Charentes", "Tour du Doubs", "Drôme Classic", "Tour de Croatie", "Tour de Hongrie"],
 't6': ["Tour du Rwanda"],
}

T['spo-individuels-05'] = {
 't1': ["Col du Tourmalet", "Alpe d'Huez", "Mont Ventoux", "Col du Galibier", "Col d'Izoard", "Col d'Aubisque", "Puy de Dôme"],
 't2': ["Butte Montmartre=Montmartre"],
 't3': ["Col de la Madeleine", "Col de la Croix-de-Fer", "Col du Glandon", "Col du Télégraphe", "Col de Peyresourde", "Col d'Aspin", "Col du Soulor", "Planche des Belles Filles", "Col de Joux Plane", "Col de la Colombière", "Col des Aravis", "Col de l'Iseran", "Col du Lautaret", "Luz Ardiden", "Hautacam", "Plateau de Beille", "Superbagnères", "Col du Portet", "Col de la Loze", "Grand Colombier", "Ballon d'Alsace", "Stelvio", "Mortirolo", "Zoncolan", "Angliru", "Lagos de Covadonga", "Poggio", "Mur de Huy", "Koppenberg", "Mur de Grammont=Kapelmuur"],
 't4': ["Cime de la Bonette=Bonette", "Col de Vars", "Col d'Allos", "Col de la Cayolle", "Col du Mont-Cenis", "Col du Petit-Saint-Bernard", "Col du Grand-Saint-Bernard", "Gavia", "Tre Cime di Lavaredo", "Pordoi", "Passo Sella", "Passo Gardena", "Passo Giau", "Fedaia=Marmolada", "Colle delle Finestre=Finestre", "Colle dell'Agnello=Agnello", "Pla d'Adet", "Courchevel", "La Plagne", "Tignes", "Val Thorens", "Col du Granon", "Grand Ballon", "Col de la Schlucht", "Mûr-de-Bretagne", "Cauberg", "Vieux Quaremont=Oude Kwaremont", "Paterberg", "Cipressa", "Col de Turini", "Col d'Èze", "Mont Faron", "Col de Marie-Blanque", "Port de Balès", "Col du Portillon", "Col de Menté", "Mont du Chat", "Col de la Forclaz", "Col de Romme", "Côte de la Redoute=La Redoute", "Monte Grappa", "Blockhaus", "Etna", "Campo Imperatore", "Oropa", "Sierra Nevada", "Bola del Mundo", "La Covatilla", "Col d'Envalira", "Arcalis", "Peyragudes"],
 't5': ["Muro di Sormano", "Côte de Saint-Nicolas", "Col de la Croix Fry", "Col de Port"],
 't6': ["Col de la République=Col du Grand-Bois"],
}

T['spo-individuels-06'] = {
 't1': ["US Postal", "Festina", "Sky=Team Sky", "Ineos=Ineos Grenadiers", "Cofidis", "FDJ=Française des Jeux/Groupama-FDJ", "AG2R=AG2R La Mondiale/Decathlon-AG2R", "Visma=Jumbo-Visma/Visma-Lease a Bike", "UAE Team Emirates=UAE", "Quick-Step=Soudal Quick-Step/Deceuninck-Quick-Step"],
 't2': ["Z"],
 't3': ["Movistar", "Astana", "Lotto=Lotto-Soudal/Lotto Dstny", "Bora-Hansgrohe=Red Bull-Bora-Hansgrohe/Bora", "Rabobank", "Telekom=T-Mobile", "ONCE", "Banesto", "Mapei", "Euskaltel-Euskadi=Euskaltel", "Discovery Channel", "Saxo Bank=CSC/Tinkoff", "Liquigas", "Lampre", "Trek=Lidl-Trek/Trek-Segafredo", "EF Education=EF Education First", "Cannondale", "Garmin", "BMC", "Arkéa=Arkéa-Samsic/Fortuneo", "TotalEnergies=Direct Énergie/Europcar/Bbox Bouygues Telecom"],
 't4': ["Caisse d'Épargne", "Kelme", "Gerolsteiner", "Crédit Agricole", "Gan", "Castorama", "Système U", "Peugeot", "Renault=Renault-Elf/Renault-Gitane", "Bic", "Mercier", "Saint-Raphaël", "Molteni", "Faema", "Bianchi", "Radioshack", "Leopard", "Katusha", "Orica=Mitchelton-Scott/Jayco AlUla/GreenEDGE", "Bahrain=Bahrain Victorious/Bahrain-Merida", "Israel Premier Tech", "Cervélo", "HTC-Columbia=HTC-Highroad", "Uno-X", "Alpecin=Alpecin-Deceuninck/Alpecin-Fenix", "Intermarché=Intermarché-Wanty", "La Vie Claire", "Toshiba", "Carrera", "Del Tongo", "Gewiss", "Polti", "Saeco", "Mercatone Uno", "Fassa Bortolo", "Domina Vacanze", "Acqua & Sapone", "Panasonic", "PDM", "TVM", "Motorola", "7-Eleven", "CCC", "Dimension Data=Qhubeka", "Sunweb=DSM/Giant-Alpecin/Picnic PostNL", "Vacansoleil", "Saunier Duval", "Sojasun"],
 't5': ["Flandria", "Salvarani", "Ti-Raleigh=Raleigh", "Kas", "Fagor", "Teka", "RMO", "Jean Delatour", "Histor", "Superconfex", "Buckler", "Ariostea", "Château d'Ax", "Hitachi", "Kwantum", "Coors Light", "Auber 93"],
 't6': ["Brooklyn"],
}

T['spo-individuels-07'] = {
 't1': ["Monaco=Monte-Carlo", "Silverstone", "Monza", "Spa-Francorchamps=Spa", "Suzuka", "Interlagos", "Magny-Cours", "Paul-Ricard=Le Castellet", "Imola"],
 't2': ["Caesars Palace"],
 't3': ["Hockenheim=Hockenheimring", "Nürburgring", "Hungaroring", "Circuit de Barcelone-Catalogne=Montmeló/Barcelone", "Zandvoort", "Circuit Gilles-Villeneuve=Montréal", "Indianapolis", "Circuit des Amériques=Austin/COTA", "Autodromo Hermanos Rodríguez=Mexico", "Sakhir=Bahreïn", "Yas Marina=Abou Dabi", "Djeddah", "Losail=Lusail/Qatar", "Bakou", "Shanghai", "Sepang", "Marina Bay=Singapour", "Albert Park=Melbourne", "Red Bull Ring=Spielberg/A1-Ring/Österreichring", "Istanbul Park", "Sotchi", "Miami", "Las Vegas"],
 't4': ["Jerez", "Estoril", "Watkins Glen", "Long Beach", "Detroit", "Phoenix", "Dallas", "Fuji", "Aida=TI Circuit/Okayama", "Adélaïde", "Kyalami", "Jacarepaguá", "Buenos Aires", "Brands Hatch", "Donington", "Aintree", "Reims-Gueux=Reims", "Rouen-les-Essarts", "Charade=Clermont-Ferrand", "Dijon-Prenois", "Zolder", "Nivelles", "Anderstorp", "Jarama", "Montjuïc", "Valence", "Yeongam=Corée", "Buddh=Inde", "Portimão=Algarve", "Mugello", "Mosport", "Mont-Tremblant", "AVUS", "Sebring", "Riverside", "Ain-Diab=Casablanca", "Monsanto", "Boavista", "Zeltweg", "East London", "Bugatti=Le Mans", "Pedralbes", "Bremgarten=Berne"],
 't6': ["Pescara"],
}
T['spo-individuels-07']['t5'] = []

T['spo-individuels-08'] = {
 't1': ["Ferrari", "McLaren", "Williams", "Red Bull", "Mercedes", "Renault", "Lotus", "Alpine"],
 't2': ["Porsche"],
 't3': ["Brabham", "Tyrrell", "Toro Rosso=AlphaTauri/Racing Bulls", "Sauber=Kick Sauber", "Alfa Romeo", "Haas", "Aston Martin", "Force India=Racing Point", "Jordan", "Minardi", "Arrows=Footwork", "Ligier", "Prost", "Benetton", "BRM", "Cooper", "Maserati", "Honda", "Toyota", "BAR=British American Racing", "Jaguar", "Matra", "March", "Brawn=Brawn GP", "BMW"],
 't4': ["Toleman", "Vanwall", "Stewart", "Super Aguri", "Spyker", "Midland", "HRT=Hispania", "Caterham", "Marussia=Manor/Virgin", "Simtek", "Pacific", "Forti", "Larrousse", "AGS", "Osella", "Zakspeed", "Lola", "Shadow", "Wolf", "Hesketh", "Penske", "Fittipaldi=Copersucar", "Ensign", "Surtees", "Lancia", "Gordini", "Talbot-Lago=Talbot", "Connaught", "Eagle", "Parnelli", "Dallara", "Audi", "Cadillac", "Hill=Embassy Hill"],
 't5': ["Life", "Kojima", "Maki", "Ferguson", "OSCA", "HWM", "ERA", "Alta", "Kurtis Kraft", "Bugatti", "Tecno", "De Tomaso", "Merzario", "Spirit", "RAM", "Theodore", "ATS", "Kauhsen", "Rial", "EuroBrun", "Fondmetal", "Leyton House", "Onyx", "Coloni"],
 't6': ["Andrea Moda"],
}

T['spo-individuels-09'] = {
 't1': ["Valentino Rossi=Rossi", "Marc Márquez", "Giacomo Agostini=Agostini", "Jorge Lorenzo=Lorenzo", "Casey Stoner=Stoner", "Fabio Quartararo=Quartararo", "Francesco Bagnaia=Pecco Bagnaia/Bagnaia", "Mick Doohan=Doohan", "Barry Sheene=Sheene"],
 't2': ["Johann Zarco=Zarco"],
 't3': ["Kenny Roberts", "Freddie Spencer", "Eddie Lawson", "Wayne Rainey", "Kevin Schwantz", "Wayne Gardner", "Nicky Hayden", "Àlex Crivillé=Crivillé", "Kenny Roberts Jr.", "Joan Mir", "Jorge Martín", "Mike Hailwood", "Ángel Nieto=Nieto", "Phil Read", "Max Biaggi=Biaggi", "Dani Pedrosa=Pedrosa", "Loris Capirossi=Capirossi", "Marco Simoncelli=Simoncelli", "Pedro Acosta", "Álex Márquez", "John Surtees", "Geoff Duke"],
 't4': ["Olivier Jacque", "Christian Sarron", "Jean-Louis Tournadre", "Arnaud Vincent", "Mike Di Meglio", "Marco Lucchinelli", "Franco Uncini", "Jim Redman", "Kel Carruthers", "Jarno Saarinen", "Walter Villa", "Kork Ballington", "Anton Mang", "Carlos Lavado", "Sito Pons", "Luca Cadalora", "Tetsuya Harada", "Daijiro Kato", "Marco Melandri", "Manuel Poggiali", "Hiroshi Aoyama", "Andrea Dovizioso", "Thomas Lüthi", "Álvaro Bautista", "Gábor Talmácsi", "Julián Simón", "Nicolás Terol", "Toni Elías", "Stefan Bradl", "Pol Espargaró", "Tito Rabat=Esteve Rabat", "Franco Morbidelli", "Enea Bastianini", "Remy Gardner", "Augusto Fernández", "Sandro Cortese", "Maverick Viñales", "Danny Kent", "Brad Binder", "Lorenzo Dalla Porta", "Albert Arenas", "Izan Guevara", "Jaume Masiá", "David Alonso", "Haruchika Aoki", "Emilio Alzamora", "Roberto Locatelli"],
 't5': ["Hugh Anderson", "Luigi Taveri", "Carlo Ubbiali", "Bill Ivy", "Dieter Braun", "Hans-Georg Anscheidt", "Eugenio Lazzarini", "Pier Paolo Bianchi", "Ricardo Tormo", "Stefan Dörflinger", "Jorge Martínez=Aspar", "Fausto Gresini", "Dirk Raudies", "Gary Hocking", "Libero Liberati", "Umberto Masetti", "Kazuto Sakata"],
 't6': ["Leslie Graham=Les Graham"],
}

T['spo-individuels-10'] = {
 't1': ["Jacky Ickx=Ickx", "Tom Kristensen=Kristensen", "Henri Pescarolo=Pescarolo", "Fernando Alonso", "Derek Bell", "Sébastien Buemi=Buemi", "Romain Dumas", "Loïc Duval"],
 't2': ["Johnny Herbert"],
 't3': ["Allan McNish=McNish", "Emanuele Pirro", "Frank Biela", "Rinaldo Capello=Dindo Capello", "Marco Werner", "André Lotterer=Lotterer", "Benoît Tréluyer=Tréluyer", "Marcel Fässler", "Timo Bernhard", "Neel Jani", "Marc Lieb", "Earl Bamber", "Brendon Hartley", "Kazuki Nakajima", "Kamui Kobayashi", "Mike Conway", "José María López=Pechito López", "Nico Hülkenberg=Hülkenberg", "Yannick Dalmas", "Graham Hill", "Bruce McLaren", "Chris Amon", "Dan Gurney", "A.J. Foyt", "Jochen Rindt", "Phil Hill", "Olivier Gendebien", "Mike Hawthorn", "Didier Pironi", "Hans-Joachim Stuck", "Klaus Ludwig", "Alexander Wurz"],
 't4': ["Ryo Hirakawa", "Alessandro Pier Guidi", "James Calado", "Antonio Giovinazzi", "Nicklas Nielsen", "Miguel Molina", "Antonio Fuoco", "Nick Tandy", "Pierluigi Martini", "Joachim Winkelhock", "J.J. Lehto", "Masanori Sekiya", "Gijs van Lennep", "Helmut Marko", "Masten Gregory", "Hans Herrmann", "Richard Attwood", "Jackie Oliver", "Pedro Rodríguez", "Lucien Bianchi", "Jean-Pierre Jaussaud", "Gérard Larrousse", "Jean Rondeau", "Hurley Haywood", "Al Holbert", "Jürgen Barth", "Vern Schuppan", "Jan Lammers", "Andy Wallace", "Jochen Mass", "Manuel Reuter", "Martin Brundle", "John Nielsen", "Price Cobb", "Volker Weidler", "Bertrand Gachot", "Derek Warwick", "Mark Blundell", "Geoff Brabham", "Christophe Bouchut", "Éric Hélary", "Mauro Baldi", "Davy Jones", "Michele Alboreto", "Stefan Johansson", "Laurent Aïello", "Stéphane Ortelli", "Guy Smith", "Seiji Ara", "Marc Gené", "David Brabham", "Mike Rockenfeller", "Ludovico Scarfiotti", "Lorenzo Bandini", "Nino Vaccarella", "Jean Guichet", "Paul Frère", "Carroll Shelby", "Roy Salvadori", "Ron Flockhart", "Ivor Bueb", "Tony Rolt", "Duncan Hamilton", "Louis Rosier"],
 't5': ["Robert Kubica=Kubica", "Yifei Ye", "Phil Hanson", "Johnny Dumfries", "Stanley Dickens", "Tazio Nuvolari", "Raymond Sommer", "Woolf Barnato", "Tim Birkin", "Luigi Chinetti"],
 't6': ["Paolo Barilla"],
}

T['spo-individuels-11'] = {
 't1': ["Seoi-nage", "Uchi-mata", "O-soto-gari", "Ippon-seoi-nage", "Harai-goshi", "Tai-otoshi", "Kesa-gatame", "Tomoe-nage"],
 't2': ["Kani-basami"],
 't3': ["O-uchi-gari", "Ko-uchi-gari", "Ko-soto-gari", "O-goshi", "De-ashi-barai", "Okuri-ashi-barai", "Sasae-tsurikomi-ashi", "Hiza-guruma", "Tsurikomi-goshi", "Sode-tsurikomi-goshi", "Koshi-guruma", "Uki-goshi", "Hane-goshi", "Sumi-gaeshi", "Kata-guruma", "Morote-gari", "Ura-nage", "Juji-gatame=Ude-hishigi-juji-gatame", "Kami-shiho-gatame", "Yoko-shiho-gatame", "Tate-shiho-gatame", "Kata-gatame", "Hadaka-jime", "Okuri-eri-jime", "Sankaku-jime"],
 't4': ["Ko-soto-gake", "Utsuri-goshi", "Ushiro-goshi", "Sumi-otoshi", "Uki-otoshi", "Kuchiki-taoshi", "Kibisu-gaeshi", "Sukui-nage", "Obi-otoshi", "Soto-makikomi", "Uchi-makikomi", "Hane-makikomi", "Tani-otoshi", "Yoko-otoshi", "Yoko-guruma", "Yoko-gake", "Yoko-wakare", "Uki-waza", "O-guruma", "Ashi-guruma", "O-soto-guruma", "O-soto-otoshi", "Harai-tsurikomi-ashi", "Ude-garami", "Waki-gatame", "Hiza-gatame", "Ude-gatame", "Hara-gatame", "Ashi-gatame", "Te-gatame", "Sankaku-gatame", "Kuzure-kesa-gatame", "Kuzure-kami-shiho-gatame", "Ura-gatame", "Makura-kesa-gatame", "Ushiro-kesa-gatame", "Uki-gatame", "Kata-ha-jime", "Kata-te-jime", "Ryote-jime", "Tsukkomi-jime", "Sode-guruma-jime", "Nami-juji-jime", "Gyaku-juji-jime", "Kata-juji-jime", "Tsubame-gaeshi", "O-soto-gaeshi", "O-uchi-gaeshi", "Ko-uchi-gaeshi", "Hane-goshi-gaeshi", "Harai-goshi-gaeshi", "Uchi-mata-gaeshi", "Uchi-mata-sukashi", "Seoi-otoshi", "Ko-uchi-makikomi"],
 't5': ["Yama-arashi", "Daki-wakare", "Tawara-gaeshi", "Hikikomi-gaeshi", "Ashi-garami", "Uchi-mata-makikomi"],
 't6': ["Do-jime"],
}

T['spo-individuels-12'] = {
 't1': ["Kitzbühel", "Wengen", "Val d'Isère", "Chamonix", "Adelboden", "Schladming", "Courchevel", "Méribel"],
 't2': ["Zagreb"],
 't3': ["Val Gardena=Gröden", "Alta Badia", "Madonna di Campiglio", "Flachau", "Sölden", "Lake Louise", "Beaver Creek", "Killington", "Levi", "Garmisch-Partenkirchen=Garmisch", "Cortina d'Ampezzo=Cortina", "Kranjska Gora", "Maribor", "Saalbach=Saalbach-Hinterglemm", "Lienz", "Semmering", "Sankt Anton=St. Anton", "Lech=Lech-Zürs", "Bormio", "Sestrières=Sestriere", "Kvitfjell", "Åre", "Crans-Montana", "Saint-Moritz=St. Moritz", "Lenzerheide", "Soldeu", "Aspen", "Zauchensee=Altenmarkt-Zauchensee"],
 't4': ["Whistler", "Park City", "Palisades Tahoe=Squaw Valley", "Ofterschwang", "Jasná", "Bansko", "Santa Caterina=Santa Caterina Valfurva", "Hinterstoder", "Bad Kleinkirchheim", "Kronplatz=Plan de Corones", "Veysonnaz", "Špindlerův Mlýn", "Rosa Khutor=Sotchi"],
 't5': ["Sun Valley", "Oslo"],
 't6': ["Stockholm"],
}

T['spo-individuels-13'] = {
 't1': ["100 m", "200 m", "400 m", "Marathon", "Saut en hauteur", "Saut en longueur", "Saut à la perche", "Lancer du javelot=javelot", "Décathlon"],
 't2': ["Mile=un mile"],
 't3': ["800 m", "1500 m", "5000 m", "10 000 m", "110 m haies", "100 m haies", "400 m haies", "3000 m steeple=steeple", "Relais 4 × 100 m=4x100", "Relais 4 × 400 m=4x400", "Triple saut", "Lancer du poids=poids", "Lancer du disque=disque", "Lancer du marteau=marteau", "Heptathlon", "20 km marche", "Semi-marathon", "Cross-country=cross"],
 't4': ["60 m", "60 m haies", "3000 m", "Pentathlon", "50 km marche", "35 km marche", "Relais 4 × 400 m mixte=4x400 mixte", "10 km route", "300 m", "600 m", "1000 m", "2000 m", "2000 m steeple", "Relais 4 × 200 m=4x200", "Relais 4 × 800 m=4x800", "Relais 4 × 1500 m=4x1500", "100 km", "3000 m marche", "5000 m marche", "10 000 m marche", "Course de l'heure=heure", "15 km route", "20 km route", "50 m", "Ekiden=marathon en relais", "Relais mixte de marche"],
 't5': ["200 m haies", "Saut en longueur sans élan", "Saut en hauteur sans élan", "Triple saut sans élan", "Lancer du poids de 56 livres", "Lancer du disque style grec", "Javelot à deux mains", "5 miles", "Décathlon féminin", "Relais medley=distance medley relay", "2 miles"],
 't6': ["Tir à la corde"],
}

T['spo-individuels-14'] = {
 't1': ["Mohamed Ali=Muhammad Ali/Cassius Clay/Ali", "Mike Tyson=Tyson", "George Foreman=Foreman", "Floyd Mayweather=Mayweather", "Manny Pacquiao=Pacquiao", "Joe Frazier=Frazier", "Evander Holyfield=Holyfield", "Sugar Ray Leonard", "Tyson Fury", "Marcel Cerdan=Cerdan"],
 't2': ["Battling Siki"],
 't3': ["Lennox Lewis", "Vitali Klitschko", "Wladimir Klitschko", "Anthony Joshua", "Oleksandr Usyk=Usyk", "Deontay Wilder", "Oscar De La Hoya", "Marvin Hagler", "Thomas Hearns", "Roberto Durán", "Julio César Chávez", "Canelo Álvarez=Saúl Álvarez/Canelo", "Gennady Golovkin=GGG/Golovkin", "Vasyl Lomachenko", "Naoya Inoue", "Andre Ward", "Bernard Hopkins", "Roy Jones Jr.", "Joe Calzaghe", "Carl Froch", "Rocky Marciano", "Joe Louis", "Jack Dempsey", "Gene Tunney", "Jack Johnson", "Sonny Liston", "Floyd Patterson", "Larry Holmes", "Leon Spinks", "Michael Spinks", "Ken Norton", "Buster Douglas", "Riddick Bowe", "Sugar Ray Robinson", "Jake LaMotta", "Carlos Monzón", "Georges Carpentier", "Naseem Hamed=Prince Naseem", "Ricky Hatton", "Terence Crawford", "Max Schmeling", "Primo Carnera", "James J. Braddock=James Braddock", "Claressa Shields", "Katie Taylor", "Laila Ali", "Ingemar Johansson"],
 't4': ["Michael Moorer", "Hasim Rahman", "Oliver McCall", "Frank Bruno", "Shannon Briggs", "Chris Byrd", "Lamon Brewster", "Nikolai Valuev", "Ruslan Chagaev", "Sultan Ibragimov", "Samuel Peter", "Oleg Maskaev", "Joseph Parker", "Andy Ruiz Jr.", "Daniel Dubois", "David Haye", "Errol Spence Jr.", "Shakur Stevenson", "Gervonta Davis", "Devin Haney", "Artur Beterbiev", "Dmitry Bivol", "Sergey Kovalev", "Miguel Cotto", "Juan Manuel Márquez", "Érik Morales", "Marco Antonio Barrera", "Salvador Sánchez", "Wilfredo Gómez", "Félix Trinidad", "James Toney", "Amir Khan", "Carl Frampton", "Emile Griffith", "Rodrigo Valdez", "Rocky Graziano", "Tony Zale", "Carmen Basilio", "Benny Leonard", "Henry Armstrong", "Barney Ross", "Willie Pep", "Sandy Saddler", "Archie Moore", "Ezzard Charles", "Jersey Joe Walcott", "Jack Sharkey", "Eugène Criqui", "Fabrice Tiozzo", "Christophe Tiozzo", "Jean-Marc Mormeck", "Mahyar Monshipour", "Brahim Asloum"],
 't5': ["Young Perez", "Alphonse Halimi", "Thierry Jacob", "Fabrice Bénichou", "Gilbert Delé", "Jean-Baptiste Mendy", "Souleymane M'baye", "Anne-Sophie Mathis", "Myriam Lamare", "Cecilia Brækhus", "Amanda Serrano", "Tommy Morrison", "Aaron Pryor", "Alexis Argüello", "Pernell Whitaker", "Ray Mancini", "Wilfred Benítez", "Mike McCallum", "Hector Camacho", "Michael Nunn"],
 't6': ["Bob Fitzsimmons"],
}

T['spo-individuels-15'] = {
 't1': ["Augusta National=Augusta", "St Andrews=Old Course", "Carnoustie", "Pebble Beach", "Golf National", "Valderrama", "The Belfry"],
 't2': ["Marco Simone"],
 't3': ["Muirfield", "Royal Troon=Troon", "Turnberry", "Royal Birkdale=Birkdale", "Royal Lytham & St Annes=Royal Lytham", "Royal St George's=Sandwich", "Royal Liverpool=Hoylake", "Royal Portrush=Portrush", "Pinehurst", "Oakmont", "Shinnecock Hills=Shinnecock", "Winged Foot", "Merion", "Bethpage Black=Bethpage", "Olympic Club", "Torrey Pines", "Baltusrol", "Oakland Hills", "Medinah", "Valhalla", "Whistling Straits", "Kiawah Island=Kiawah", "Hazeltine", "Southern Hills", "Celtic Manor", "Gleneagles", "K Club", "Muirfield Village", "The Country Club=Brookline"],
 't4': ["Prestwick", "Bellerive", "Quail Hollow", "Chambers Bay", "Erin Hills", "Congressional", "Los Angeles Country Club", "Harding Park=TPC Harding Park", "Inverness", "Oak Hill", "Firestone", "Cherry Hills", "Olympia Fields", "Riviera", "Atlanta Athletic Club", "Sahalee", "Crooked Stick", "Kemper Lakes", "Shoal Creek", "Wentworth", "Walton Heath", "Lindrick", "PGA National", "Champions Golf Club", "Laurel Valley", "East Lake"],
 't5': ["Newport Country Club", "Myopia Hunt Club", "Scioto", "Worcester Country Club", "Moortown", "Southport & Ainsdale", "Ganton", "Royal Cinque Ports=Deal", "Prince's", "Thunderbird", "Eldorado"],
 't6': ["Musselburgh"],
}
