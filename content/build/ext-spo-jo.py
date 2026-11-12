# Sports & Loisirs (sports-leisure) - Jeux olympiques, loisirs, jeux, plein air, danse
PROMPTS = [
    {'id': 'spo-jo-01', 'text': "Nomme un sport ou une discipline ayant figuré au programme des Jeux olympiques d'été (actuel ou ancien)"},
    {'id': 'spo-jo-02', 'text': "Nomme un sport ou une discipline ayant figuré au programme des Jeux olympiques d'hiver (actuel ou ancien)"},
    {'id': 'spo-jo-03', 'text': "Nomme un pays ayant remporté au moins une médaille d'or aux Jeux olympiques d'été"},
    {'id': 'spo-jo-04', 'text': "Nomme un athlète français ayant remporté au moins une médaille d'or olympique"},
    {'id': 'spo-jo-05', 'text': "Nomme un jeu qui se joue avec des cartes (jeu de cartes classique, spécifique ou à collectionner)"},
    {'id': 'spo-jo-06', 'text': "Nomme un jeu de société à plateau ou d'ambiance (hors jeux de cartes)"},
    {'id': 'spo-jo-07', 'text': "Nomme un style ou une danse (de salon, traditionnelle, de scène ou urbaine)"},
    {'id': 'spo-jo-08', 'text': "Nomme un terme du vocabulaire de la danse classique (pas, position, grade, accessoire…)"},
    {'id': 'spo-jo-09', 'text': "Nomme une activité sportive ou de loisir de plein air"},
    {'id': 'spo-jo-10', 'text': "Nomme un objet ou un équipement utile pour le camping ou la randonnée"},
    {'id': 'spo-jo-11', 'text': "Nomme un sport collectif"},
    {'id': 'spo-jo-12', 'text': "Nomme un sport de combat ou un art martial"},
    {'id': 'spo-jo-13', 'text': "Nomme un appareil ou un accessoire que l'on trouve dans une salle de sport"},
    {'id': 'spo-jo-14', 'text': "Nomme un exercice de musculation ou de fitness"},
    {'id': 'spo-jo-15', 'text': "Nomme un sport ou une activité nautique ou aquatique"},
]
T = {}

T['spo-jo-01'] = {
    't1': ["Natation", "Gymnastique=gymnastique artistique", "Football", "Basket-ball=basketball/basket", "Tennis", "Judo", "Cyclisme", "Boxe", "Escrime"],
    't2': ["Athlétisme"],
    't3': ["Aviron", "Équitation=sports équestres", "Handball=hand", "Volley-ball=volleyball/volley", "Rugby à sept=rugby à 7/rugby à VII", "Tir à l'arc", "Haltérophilie", "Lutte", "Tennis de table=ping-pong", "Badminton", "Golf", "Hockey sur gazon=hockey", "Water-polo=waterpolo", "Plongeon", "Voile", "Canoë-kayak=canoë/kayak", "Triathlon", "Pentathlon moderne", "Taekwondo", "Tir=tir sportif", "Gymnastique rythmique", "Natation artistique=natation synchronisée/nage synchronisée", "Skateboard", "Surf", "Escalade=escalade sportive", "Karaté", "Breaking=break dance/breakdance", "BMX=BMX racing", "VTT=cyclisme VTT/mountain bike", "Baseball", "Softball", "Beach-volley=volley de plage", "Basket 3x3=3x3"],
    't4': ["Dressage", "Saut d'obstacles=CSO/jumping", "Concours complet=complet/CCE", "Cyclisme sur piste=piste", "Cyclisme sur route=route", "BMX freestyle", "Slalom en canoë=canoë slalom", "Canoë sprint=course en ligne", "Lutte gréco-romaine", "Lutte libre", "Nage en eau libre=marathon de natation", "Tir à la carabine", "Tir au pistolet", "Ball-trap=fosse olympique/skeet", "Cricket", "Polo", "Croquet", "Jeu de paume", "Pelote basque", "Roque", "Lacrosse", "Rugby à XV=rugby à quinze", "Motonautisme"],
    't5': ["Racquets=rackets", "Plongeon de haut vol", "Tir sur cible mobile"],
    't6': ["Tir à la corde"],
}

T['spo-jo-02'] = {
    't1': ["Patinage artistique", "Hockey sur glace=hockey", "Biathlon", "Ski de fond", "Bobsleigh=bob", "Snowboard", "Saut à ski=saut à skis"],
    't2': ["Ski alpin"],
    't3': ["Curling", "Luge", "Skeleton", "Patinage de vitesse", "Short-track=short track/patinage de vitesse sur piste courte", "Combiné nordique", "Ski acrobatique=freestyle/ski freestyle", "Slalom", "Slalom géant", "Super-G=super G", "Descente", "Combiné alpin=combiné", "Half-pipe=halfpipe", "Slopestyle", "Big air", "Snowboard cross=boardercross", "Ski cross=skicross", "Ski de bosses=bosses", "Sauts acrobatiques=saut acrobatique", "Danse sur glace", "Patinage en couple=couple", "Skiathlon", "Poursuite", "Slalom parallèle", "Double mixte"],
    't4': ["Mass start=départ en ligne", "Relais", "Sprint par équipes", "Grand tremplin", "Tremplin normal", "Slalom géant parallèle", "Bob à quatre", "Bob à deux", "Monobob", "Poursuite par équipes", "Style libre", "Style classique", "Relais mixte", "Luge double", "Épreuve par équipes"],
    't5': ["Ski alpinisme=ski-alpinisme", "Bosses en parallèle"],
    't6': ["Patrouille militaire=patrouille de ski"],
}

T['spo-jo-03'] = {
    't1': ["France", "Chine", "Royaume-Uni=Grande-Bretagne/Angleterre", "Allemagne=RFA/RDA/Allemagne de l'Est/Allemagne de l'Ouest", "Russie=URSS/Union soviétique", "Japon", "Italie", "Australie"],
    't2': ["États-Unis=USA"],
    't3': ["Canada", "Espagne", "Brésil", "Pays-Bas=Hollande", "Hongrie", "Suède", "Cuba", "Corée du Sud", "Nouvelle-Zélande", "Roumanie", "Pologne", "Suisse", "Belgique", "Norvège", "Danemark", "Finlande", "Kenya", "Éthiopie", "Jamaïque", "Ukraine", "Grèce", "Argentine", "Afrique du Sud", "Autriche", "Turquie", "Mexique", "Irlande", "Iran", "Bulgarie", "Tchéquie=République tchèque/Tchécoslovaquie"],
    't4': ["Croatie", "Serbie", "Biélorussie", "Kazakhstan", "Ouzbékistan", "Géorgie", "Azerbaïdjan", "Slovaquie", "Lituanie", "Lettonie", "Estonie", "Slovénie", "Thaïlande", "Indonésie", "Inde", "Maroc", "Algérie", "Nigeria", "Égypte", "Colombie", "Portugal", "Corée du Nord", "Mongolie", "Israël", "Arménie", "Venezuela", "Taïwan=Taipei chinois", "Tunisie", "Ouganda", "Pakistan"],
    't5': ["Équateur", "Qatar", "Trinité-et-Tobago", "Bahamas", "Porto Rico", "Philippines", "Grenade", "Singapour", "Vietnam", "Hong Kong", "Kosovo", "Côte d'Ivoire", "Burundi", "Mozambique", "Zimbabwe", "Syrie", "Panama", "Chili", "Uruguay", "Pérou", "Luxembourg", "Dominique", "Sainte-Lucie", "Bermudes", "Cameroun", "Bahreïn", "République dominicaine", "Émirats arabes unis", "Jordanie"],
    't6': ["Fidji"],
}

T['spo-jo-04'] = {
    't1': ["Marie-José Pérec=Pérec", "Martin Fourcade=Fourcade", "Laure Manaudou", "Jean-Claude Killy=Killy", "Tony Estanguet=Estanguet", "Florent Manaudou", "Léon Marchand=Marchand", "David Douillet=Douillet", "Renaud Lavillenie=Lavillenie"],
    't2': ["Teddy Riner=Riner"],
    't3': ["Alain Mimoun=Mimoun", "Guy Drut=Drut", "Colette Besson=Besson", "Laura Flessel=Flessel", "Lucie Decosse=Decosse", "Clarisse Agbegnenou=Agbegnenou", "Alain Bernard", "Yannick Agnel=Agnel", "Jeannie Longo=Longo", "Perrine Laffont=Laffont", "Quentin Fillon Maillet=Fillon Maillet", "Clément Noël", "Gabriella Papadakis=Papadakis", "Guillaume Cizeron=Cizeron", "Nikola Karabatic", "Thierry Omeyer=Omeyer", "Pierre Vaultier=Vaultier", "Antoine Dénériaz=Dénériaz", "Edgar Grospiron=Grospiron", "Jason Lamy-Chappuis=Lamy-Chappuis", "Cassandre Beaugrand=Beaugrand", "Pauline Ferrand-Prévot=Ferrand-Prévot"],
    't4': ["Franck Piccard=Piccard", "Jean-Luc Crétier=Crétier", "Carole Montillet=Montillet", "Jean Vuarnet=Vuarnet", "Henri Oreiller=Oreiller", "Christine Goitschel", "Marielle Goitschel", "Fabrice Guy", "Vincent Jay", "Estelle Mossely=Mossely", "Tony Yoka=Yoka", "Brice Guyart=Guyart", "Christian d'Oriola=d'Oriola", "Jehan Buhan=Buhan", "Lucien Gaudin=Gaudin", "Djamel Bouras=Bouras", "Marie-Claire Restoux=Restoux", "Florian Rousseau=Rousseau", "Daniel Morelon=Morelon", "Félicia Ballanger=Ballanger", "Pierre Trentin=Trentin", "Jean Boiteux=Boiteux", "Joseph Guillemot=Guillemot", "Luc Abalo=Abalo", "Michaël Guigou=Guigou", "Daniel Narcisse=Narcisse", "Jérôme Fernandez=Fernandez", "Didier Dinart=Dinart", "Guillaume Gille"],
    't5': ["Pierre Brunet", "Andrée Brunet-Joly=Brunet-Joly", "Luka Karabatic", "Ludovic Fabregas=Fabregas", "Nedim Remili=Remili", "Valentin Porte"],
    't6': ["Suzanne Lenglen=Lenglen"],
}

T['spo-jo-05'] = {
    't1': ["Poker", "Tarot", "Bataille", "Uno", "Rami", "Bridge", "Solitaire=patience/réussite"],
    't2': ["Belote=belote coinchée"],
    't3': ["Huit américain=8 américain", "Sept familles=7 familles/jeu des 7 familles", "Pouilleux=vieux garçon", "Crapette", "Président", "Manille", "Blackjack=black jack/vingt-et-un/21", "Baccara=baccarat", "Mistigri", "Mille Bornes=1000 bornes", "Skyjo", "Dobble", "Contrée=coinche", "Texas hold'em=hold'em/Texas hold'em poker", "Magic=Magic the Gathering", "Pokémon=jeu de cartes Pokémon", "Yu-Gi-Oh!=Yugioh", "Écarté", "Whist", "Piquet", "Cribbage", "Canasta", "Gin rummy", "Cœurs=jeu des coeurs/Hearts", "Bésigue=bezique", "Barbu", "Mau-mau"],
    't4': ["Skat", "Scopa", "Briscola", "Tressette", "Truco", "Mus", "Brelan", "Pharaon", "Chemin de fer", "Omaha", "Seven-card stud=stud poker/stud", "Euchre", "Pinochle", "Pique=Spades", "Tichu", "Faro", "Trente et quarante", "Macao", "Hanafuda", "Sept et demi=7 et demi", "Jass", "Ronda"],
    't5': ["Spit", "Spite and Malice"],
    't6': ["Nain jaune"],
}

T['spo-jo-06'] = {
    't1': ["Scrabble", "Cluedo", "Trivial Pursuit", "Puissance 4", "Jeu de l'oie", "Échecs", "Dames=jeu de dames", "Risk", "Petits chevaux=jeu des petits chevaux"],
    't2': ["Monopoly"],
    't3': ["Les Colons de Catane=Catan", "Carcassonne", "Dixit", "Mastermind", "Bataille navale", "Pictionary", "Taboo", "Time's Up", "Jungle Speed", "Jenga", "Mikado", "Dominos=domino", "Backgammon", "Go=jeu de go", "Mah-jong=mahjong", "Othello=Reversi", "Stratego", "Qwirkle", "Rummikub", "Yams=Yahtzee", "Les Aventuriers du rail=Ticket to Ride", "7 Wonders=Seven Wonders", "Pandemic", "Splendor", "Azul", "Abalone", "Quarto", "Quoridor", "Awalé=Oware/Mancala", "Jeu de la vie=Destins", "Les Loups-garous de Thiercelieux=Loup-garou/Loups-garous", "Codenames", "Twister", "Rush Hour", "Le Labyrinthe", "Bonne Paye", "Serpents et échelles", "Memory", "Scotland Yard"],
    't4': ["Kingdomino", "Patchwork", "Small World", "Terraforming Mars", "Gloomhaven", "Twilight Struggle", "Agricola", "Puerto Rico", "Caylus", "Concept", "Shogi", "Échecs chinois=Xiangqi", "Dames chinoises", "Blokus", "Katamino", "Cranium", "Hex", "Cortex", "Tzolk'in"],
    't5': ["Senet", "Nard", "Tablut", "Fanorona", "Alquerque", "Surakarta"],
    't6': ["Docteur Maboul=Operation"],
}

T['spo-jo-07'] = {
    't1': ["Salsa", "Tango", "Rock'n'roll=rock/rock and roll", "Hip-hop=hip hop", "Flamenco", "Ballet=danse classique", "Disco"],
    't2': ["Valse"],
    't3': ["Samba", "Rumba", "Cha-cha-cha=cha-cha", "Paso doble", "Quickstep", "Foxtrot", "Charleston", "Jive", "Lindy hop", "Swing", "Madison", "Twist", "Mambo", "Merengue", "Bachata", "Kizomba", "Zouk", "Lambada", "Polka", "Mazurka", "Polonaise", "Bourrée", "Farandole", "Jazz=modern jazz/danse jazz", "Danse contemporaine=contemporain", "Danse moderne", "Danse orientale=danse du ventre/raqs sharqi", "Claquettes=tap dance/tap", "Country=line dance/danse country", "Bollywood", "Krump", "Popping", "Locking", "House dance", "Voguing=vogue", "Cancan=French cancan", "Java", "Tarentelle=tarantella", "Sirtaki=syrtaki", "Haka", "Pole dance", "Boogie-woogie=boogie", "Breakdance=break dance/breaking", "Twerk", "Macarena"],
    't4': ["Hora", "Kathak", "Bharatanatyam", "Bhangra", "Kathakali", "Hula", "Capoeira", "Lezginka", "Gopak=hopak", "Kazatchok=kazachok", "Csárdás=czardas", "Fandango", "Sardane", "Jota", "Boléro", "Sévillane=sevillanas", "Malagueña", "Gavotte", "Menuet", "Pavane", "Sarabande", "Courante", "Gaillarde", "Allemande", "Rigaudon", "Chaconne", "Passacaille", "Branle", "Contredanse", "Quadrille", "Cotillon", "Galop", "Gigue", "Danse écossaise=highland dance", "Dabke", "Cumbia", "Reggaeton", "Dancehall", "Shuffle", "Bossa nova", "Hully gully"],
    't5': ["Gwoka", "Maloya", "Séga", "Biguine=beguine", "Limbo", "Gumboot", "Pasillo", "Pogo"],
    't6': ["Tecktonik"],
}

T['spo-jo-08'] = {
    't1': ["Plié", "Arabesque", "Entrechat", "Grand jeté=jeté", "Fouetté", "Tutu", "Pointes=chaussons à pointes", "Barre=barre de danse"],
    't2': ["Pirouette"],
    't3': ["Tendu=battement tendu", "Relevé", "Port de bras", "Développé", "Rond de jambe", "Battement", "Glissade", "Assemblé", "Sissonne", "Chassé", "Échappé", "Pas de bourrée=bourrée", "Tour en l'air", "Attitude", "Passé", "Retiré", "Frappé", "Fondu", "Adage=adagio", "Cabriole", "Changement de pied=changement", "Brisé", "Pas de deux", "Pas de trois", "Coda", "Variation", "Corps de ballet", "Étoile=danseur étoile/danseuse étoile", "Première danseuse=premier danseur", "Sujet", "Coryphée", "Quadrille", "Demi-plié", "Grand plié", "Demi-pointe", "Grand battement", "Petit battement", "Dégagé", "Piqué", "Tombé", "Coupé", "Manège", "Chaînés=tours chaînés/tour chaîné", "Cambré", "Révérence", "Justaucorps", "Collants", "Chignon", "Chausson=chaussons de danse"],
    't4': ["Soubresaut", "Ballonné", "Balancé", "Croisé", "Effacé", "Écarté", "Épaulé", "Pas de basque", "Pas couru", "Temps levé", "Temps lié", "Sauté", "Jeté battu", "Tour piqué", "Détourné", "Renversé", "Penché", "Équilibre", "Rond de jambe en l'air", "Rond de jambe à terre", "Port de tête", "Première position", "Cinquième position", "Bourrée couru", "Pas glissé", "Pas de valse", "Entrelacé=jeté entrelacé", "Ballotté", "Gargouillade", "Pas de poisson", "Tarlatane"],
    't5': ["Cou-de-pied", "Sous-sus", "Arabesque penchée", "Pirouette en dehors", "Pirouette en dedans", "Attitude croisée", "Sissonne fermée", "Tour de reins"],
    't6': ["Pas de chat"],
}

T['spo-jo-09'] = {
    't1': ["Camping", "Pêche", "Vélo=cyclisme", "Escalade", "Ski", "Kayak", "Course à pied=running/jogging", "Équitation=balade à cheval"],
    't2': ["Randonnée=randonnée pédestre/marche"],
    't3': ["Surf", "Voile", "Planche à voile=windsurf", "Alpinisme", "VTT", "Canoë", "Rafting", "Canyoning", "Spéléologie", "Parapente", "Deltaplane=aile delta", "Parachutisme=saut en parachute", "Saut à l'élastique=bungee", "Accrobranche", "Tyrolienne", "Via ferrata", "Trail", "Pique-nique", "Barbecue", "Snowboard", "Ski de fond", "Raquettes à neige=raquettes", "Luge", "Chasse", "Ornithologie=observation des oiseaux/birdwatching", "Cueillette de champignons=ramassage de champignons", "Kitesurf", "Paddle=stand up paddle/SUP", "Plongée=plongée sous-marine", "Snorkeling=randonnée palmée/PMT", "Bivouac", "Trekking", "Marche nordique", "Golf", "Pétanque", "Jet-ski", "Wakeboard", "Char à voile", "Cerf-volant", "Pêche à la mouche", "Slackline", "Parkour"],
    't4': ["Canicross=cani-cross", "Cani-rando", "Cyclotourisme", "Bikepacking", "Gravel", "Highline", "Bloc=escalade de bloc/bouldering", "Randonnée équestre=randonnée à cheval", "Ski de randonnée", "Snowkite", "Speed riding", "Wingsuit", "BASE jump", "Paramoteur", "ULM", "Montgolfière=vol en ballon", "Vol à voile=planeur", "Hydrospeed", "Kayak de mer", "Sandboard", "Cascade de glace", "Orpaillage", "Tir à l'arc", "Ski joëring", "Pêche au lancer", "Kayak-polo"],
    't5': ["Hike and fly", "Randonnée glaciaire", "Dog trekking", "Traîneau à chiens=chiens de traîneau", "Joëlette"],
    't6': ["Géocaching"],
}

T['spo-jo-10'] = {
    't1': ["Sac à dos", "Sac de couchage=duvet", "Lampe frontale", "Chaussures de randonnée=chaussures de marche", "Gourde", "Boussole", "Réchaud"],
    't2': ["Tente"],
    't3': ["Matelas gonflable=matelas de sol", "Tapis de sol", "Lampe torche", "Carte=carte IGN/carte topographique", "Bâtons de marche=bâtons de randonnée/bâtons", "Couteau suisse", "Opinel", "Allumettes", "Briquet", "Gamelle", "Popote", "Poncho=cape de pluie", "Veste imperméable=imperméable/k-way", "Chaussettes de randonnée", "Pantalon de randonnée", "Polaire", "Casquette=chapeau", "Lunettes de soleil", "Crème solaire", "Trousse de secours=trousse à pharmacie/pharmacie", "Sifflet", "Jumelles", "GPS", "Hamac", "Tarp=bâche", "Sardines=piquets", "Maillet", "Table pliante", "Chaise pliante", "Glacière", "Lanterne", "Piles", "Batterie externe=power bank", "Panneau solaire", "Couverts de camping=couverts", "Tasse", "Bouteille isotherme=thermos", "Casserole", "Cartouche de gaz=bouteille de gaz", "Moustiquaire", "Répulsif anti-moustiques=répulsif", "Corde", "Sac étanche"],
    't4': ["Altimètre", "Pastilles de purification", "Filtre à eau", "Mousquetons=mousqueton", "Baudrier", "Casque", "Piolet", "Crampons", "Guêtres", "Auvent", "Fourneau", "Jerrican", "Seau pliable", "Cafetière de camping", "Poêle", "Bidon", "Couvre-sac=housse de pluie", "Lampe à dynamo", "Rallonge électrique", "Sac poubelle", "Papier toilette", "Pelle pliante", "Hache", "Scie pliante", "Planche à découper", "Trépied", "Bougie", "Boîte hermétique", "Sac de rangement"],
    't5': ["Couteau de survie", "Pierre à feu=firesteel", "Cordelette", "Gourde filtrante", "Sac à viande"],
    't6': ["Couverture de survie"],
}

T['spo-jo-11'] = {
    't1': ["Basket-ball=basketball/basket", "Handball=hand", "Volley-ball=volleyball/volley", "Rugby à XV=rugby à 15/rugby", "Hockey sur glace=hockey", "Water-polo=waterpolo"],
    't2': ["Football=foot"],
    't3': ["Rugby à XIII=rugby à 13/jeu à XIII", "Rugby à sept=rugby à 7", "Hockey sur gazon", "Baseball", "Softball", "Cricket", "Football américain=foot US", "Football australien=Aussie rules", "Football gaélique", "Hurling", "Futsal", "Beach soccer=football de plage", "Beach-volley=volley de plage", "Ultimate=ultimate frisbee", "Korfball", "Netball", "Ballon prisonnier=balle aux prisonniers", "Lacrosse", "Polo", "Roller hockey=rink hockey", "Kabaddi", "Basket 3x3=3x3", "Handball de plage=beach handball"],
    't4': ["Camogie", "Bandy", "Ringuette", "Canoë-polo", "Hockey subaquatique", "Rugby subaquatique", "Sepak takraw", "Tchoukball", "Kin-ball", "Faustball=fistball", "Floorball=unihockey", "Hockey en salle", "Roller derby", "Pesäpallo", "Soule", "Goalball", "Handibasket=basket en fauteuil", "Rugby fauteuil=quad rugby", "Volley-ball assis=sitting volley", "Cécifoot=football à 5", "Dodgeball", "Hockey sur luge=para hockey", "Water-basket", "Baseball5"],
    't5': ["Indiaca", "Intercrosse"],
    't6': ["Quidditch"],
}

T['spo-jo-12'] = {
    't1': ["Judo", "Karaté", "Taekwondo", "Aïkido", "Lutte", "Kung-fu=gongfu/wushu", "Escrime"],
    't2': ["Boxe=boxe anglaise"],
    't3': ["Jiu-jitsu brésilien=BJJ", "Jujitsu=ju-jitsu/jiu-jitsu", "Krav-maga=krav maga", "MMA=arts martiaux mixtes", "Muay-thaï=boxe thaïlandaise/muay thai", "Kickboxing=kick-boxing", "Savate=boxe française", "Capoeira", "Sumo", "Kendo", "Iaïdo", "Kyudo", "Tai-chi=tai chi chuan", "Sambo", "Pancrace", "Lutte gréco-romaine", "Lutte libre", "Lutte sénégalaise=laamb", "Wing chun", "Hapkido", "Pencak silat=silat", "Ninjutsu", "Jeet kune do", "Self-défense", "Free fight", "Catch=lutte professionnelle", "Sanda=sanshou", "Karaté shotokan=shotokan", "Karaté kyokushin=kyokushin", "Goju-ryu", "Wado-ryu", "Shito-ryu", "Kenjutsu", "Naginata", "Bojutsu", "Jodo", "Kobudo", "Systema"],
    't4': ["Eskrima=arnis/kali", "Viet vo dao", "Kalaripayattu", "Canne de combat", "Bâton", "Glima", "Lethwei", "Bokator", "Pradal serey", "Dambe", "Hung gar", "Choy li fut", "Baguazhang", "Xingyiquan", "Bartitsu", "Vale tudo", "Kurash", "Schwingen", "Aikibudo", "Aïkijutsu", "Tang soo do", "Hwa rang do", "Taekkyon", "Nihon tai-jitsu", "Kempo=kenpo", "Shorinji kempo", "Chin na", "Muay boran"],
    't5': ["Yaw-yan", "Sikaran", "Gatka", "Bando", "Kuntao", "Ssireum", "Pehlwani"],
    't6': ["Gouren=lutte bretonne"],
}

T['spo-jo-13'] = {
    't1': ["Tapis de course", "Vélo d'appartement=vélo stationnaire/vélo", "Banc de musculation=banc", "Rameur=rameur d'intérieur", "Corde à sauter", "Tapis de yoga", "Ballon de gym=swiss ball/gym ball"],
    't2': ["Haltères=haltère"],
    't3': ["Barre=barre olympique", "Disques=disques de musculation/poids", "Kettlebell=bouilloire russe", "Elliptique=vélo elliptique", "Médecine-ball=medecine ball", "Step", "Élastiques=bande élastique/bande de résistance", "Punching-ball=sac de frappe", "Gants de boxe", "Barre de traction", "Barres parallèles=barres de dips", "Presse à cuisses=leg press", "Poulie", "Leg curl=machine à ischio-jambiers", "Leg extension=machine à quadriceps", "Pec deck=butterfly", "Rack à squat=cage à squat/power rack", "Smith machine=machine Smith", "Stepper", "Roue abdominale", "Rouleau de massage=foam roller", "TRX=sangles de suspension", "Bosu", "Sac de sable=sandbag", "Corde ondulatoire=battle rope", "Ceinture de musculation", "Gants de musculation", "Craie=magnésie", "Chevillères lestées=poids de chevilles", "Gilet lesté", "Espalier", "Poignées de pompes", "Tirage vertical=lat pulldown", "Vélo de spinning=spinning bike", "Ski-erg", "Assault bike", "Chaise romaine", "Mini-trampoline", "Plyo box=box jump/caisse de saut", "Barre fixe", "Anneaux de gymnastique=anneaux"],
    't4': ["Banc d'abdominaux=banc abdos", "Corde à grimper", "Pneu", "Plateforme vibrante", "Haltères réglables", "Barre EZ=barre z", "Barre hexagonale=trap bar", "Rack d'haltères", "Support à disques", "Ballon lesté=slam ball", "Tapis de sol", "Sangles de tirage", "Genouillères", "Bandes de poignet=protège-poignets", "Banc incliné", "Banc de développé couché", "Hack squat", "Machine à mollets", "Machine à tirage horizontal", "Câble crossover=poulie double", "Pull-over machine", "Dip machine", "Ergomètre"],
    't5': ["Massue", "Landmine"],
    't6': ["Traîneau=sled/prowler"],
}

T['spo-jo-14'] = {
    't1': ["Squat", "Traction=tractions", "Gainage=planche", "Abdos=abdominaux/crunch", "Fentes=fente", "Développé couché=bench press", "Burpees=burpee"],
    't2': ["Pompes=pompe/push-up"],
    't3': ["Soulevé de terre=deadlift", "Dips", "Curl biceps=curl", "Mountain climbers=grimpeur", "Jumping jacks=jumping jack", "Montées de genoux", "Talons-fesses", "Pont fessier=glute bridge", "Hip thrust", "Extension triceps", "Rowing", "Tirage vertical", "Élévations latérales", "Développé militaire=overhead press", "Développé incliné", "Presse à cuisses", "Extension de mollets=mollets/calf raise", "Planche latérale=gainage latéral", "Chaise=wall sit", "Squat sauté=jump squat", "Fentes sautées", "Relevé de jambes=leg raise", "Russian twist=rotation russe", "Crunch vélo=vélo", "Superman", "Pull-over", "Shrugs=haussements d'épaules", "Good morning", "Muscle-up", "Swing kettlebell=kettlebell swing", "Épaulé=clean", "Épaulé-jeté=clean and jerk", "Arraché=snatch", "Thruster", "Box jump=saut sur box", "Wall ball", "Tractions australiennes"],
    't4': ["Arnold press", "Curl marteau=hammer curl", "Curl concentré", "Barre au front=skull crusher", "Écarté couché=pec fly", "Oiseau=reverse fly", "Face pull", "Hyperextension=lombaires", "Fentes bulgares=bulgarian split squat/squat bulgare", "Pistol squat", "Hack squat", "Front squat=squat avant", "Goblet squat", "Soulevé de terre roumain=RDL", "Soulevé de terre jambes tendues", "Rowing barre", "Rowing haltère", "Pompes diamant", "Dragon flag", "L-sit", "Front lever", "Back lever", "Crunch inversé", "Cercles de bras", "Squat sumo", "Pompes déclinées", "Pompes inclinées", "Pompes archer", "Pompes sur un bras", "Squat overhead", "Burpee box jump", "Sauts à la corde", "Double unders", "Turkish get-up", "Farmer's walk=marche du fermier", "Bear crawl"],
    't5': ["Dragon walk", "Hindu push-up", "Tuck planche", "Pike push-up", "Handstand push-up", "Zottman curl", "Jefferson deadlift", "Jefferson curl"],
    't6': ["Drapeau humain=human flag"],
}

T['spo-jo-15'] = {
    't1': ["Voile", "Surf", "Plongée=plongée sous-marine", "Kayak", "Aviron", "Planche à voile=windsurf", "Water-polo=waterpolo"],
    't2': ["Natation"],
    't3': ["Canoë", "Plongeon", "Kitesurf", "Paddle=stand up paddle/SUP", "Wakeboard", "Jet-ski", "Bodyboard", "Rafting", "Canyoning", "Apnée=plongée en apnée", "Snorkeling=randonnée palmée/PMT", "Natation synchronisée=natation artistique/nage synchronisée", "Nage en eau libre=marathon de natation", "Chasse sous-marine=pêche sous-marine", "Hydrospeed", "Canoë-kayak", "Dragon boat=bateau-dragon", "Bouée tractée=banane tractée", "Pédalo", "Catamaran=cata", "Optimist", "Laser", "Foil=hydrofoil", "Wingfoil", "Aquagym=aquafitness", "Aquabike", "Nage avec palmes", "Régate", "Course au large", "Motonautisme=hors-bord", "Parachute ascensionnel=parasailing", "Bodysurf", "Skimboard", "Kayak de mer", "Aviron de mer", "Pirogue polynésienne=va'a", "Surf-ski", "Tubing"],
    't4': ["Canoë-polo", "Rugby subaquatique", "Sauvetage sportif=sauvetage côtier", "Flyboard", "Wakesurf", "Kneeboard", "Kitefoil", "Waveski", "Longe-côte=marche aquatique", "Water-basket", "Nage en mer", "Voile légère", "Dériveur", "Canoë slalom=slalom en canoë", "Descente de rivière"],
    't5': ["Tow-in", "Plongée libre", "Plongée technique", "Plongée spéléo=spéléologie subaquatique", "Surf de rivière"],
    't6': ["Hockey subaquatique"],
}
