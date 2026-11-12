# Histoire (histoire) - Histoire de France toutes époques
PROMPTS = [
    {'id': 'his-france-01', 'text': "Nomme un président de la République française ou un chef du gouvernement (président du Conseil, Premier ministre) depuis 1946"},
    {'id': 'his-france-02', 'text': "Nomme une bataille ou un siège de l'histoire de France antérieur à 1800"},
    {'id': 'his-france-03', 'text': "Nomme un résistant ou une figure de la France libre pendant la Seconde Guerre mondiale"},
    {'id': 'his-france-04', 'text': "Nomme un château situé dans le Val de Loire"},
    {'id': 'his-france-05', 'text': "Nomme une ancienne province ou région historique de France"},
    {'id': 'his-france-06', 'text': "Nomme une loi française connue par le nom de son auteur (ministre ou parlementaire)"},
    {'id': 'his-france-07', 'text': "Nomme un ministre ou un principal conseiller d'un roi de France avant 1789"},
    {'id': 'his-france-08', 'text': "Nomme un monument, un palais ou un édifice de Paris lié à l'histoire de France"},
    {'id': 'his-france-09', 'text': "Nomme une colonie ou un territoire ayant fait partie de l'empire colonial français"},
    {'id': 'his-france-10', 'text': "Nomme une affaire politique, judiciaire ou criminelle célèbre de l'histoire de France"},
    {'id': 'his-france-11', 'text': "Nomme une reine, une régente ou une favorite royale de l'histoire de France"},
    {'id': 'his-france-12', 'text': "Nomme un personnage de la guerre de Cent Ans"},
    {'id': 'his-france-13', 'text': "Nomme un général, un maréchal ou un amiral français d'avant 1789"},
    {'id': 'his-france-14', 'text': "Nomme un écrivain ou un penseur français du XVIIIe siècle"},
    {'id': 'his-france-15', 'text': "Nomme un parti ou un mouvement politique français du XXe ou du XXIe siècle"},
]
T = {}

T['his-france-01'] = {
    't1': ["Charles de Gaulle=de Gaulle/général de Gaulle", "François Mitterrand=Mitterrand", "Jacques Chirac=Chirac", "Nicolas Sarkozy=Sarkozy", "François Hollande=Hollande", "Georges Pompidou=Pompidou", "Valéry Giscard d'Estaing=Giscard/VGE/Giscard d'Estaing"],
    't2': ["Emmanuel Macron=Macron"],
    't3': ["Édouard Philippe=Philippe", "Manuel Valls=Valls", "Lionel Jospin=Jospin", "Michel Rocard=Rocard", "Laurent Fabius=Fabius", "Pierre Mauroy=Mauroy", "Édouard Balladur=Balladur", "Alain Juppé=Juppé", "Jean-Pierre Raffarin=Raffarin", "Dominique de Villepin=Villepin", "François Fillon=Fillon", "Raymond Barre=Barre", "Michel Debré=Debré", "Édith Cresson=Cresson", "Pierre Bérégovoy=Bérégovoy", "Pierre Mendès France=Mendès France", "Léon Blum=Blum", "Élisabeth Borne=Borne", "Gabriel Attal=Attal", "Jean Castex=Castex"],
    't4': ["Jean-Marc Ayrault=Ayrault", "Bernard Cazeneuve=Cazeneuve", "Michel Barnier=Barnier", "François Bayrou=Bayrou", "Pierre Messmer=Messmer", "Jacques Chaban-Delmas=Chaban-Delmas/Chaban", "Maurice Couve de Murville=Couve de Murville", "Guy Mollet=Mollet", "Vincent Auriol=Auriol", "René Coty=Coty", "Sébastien Lecornu=Lecornu", "Henri Queuille=Queuille", "Antoine Pinay=Pinay", "Edgar Faure", "René Pleven=Pleven"],
    't5': ["Félix Gouin=Gouin", "Georges Bidault=Bidault", "Paul Ramadier=Ramadier", "Robert Schuman=Schuman", "Joseph Laniel=Laniel", "Pierre Pflimlin=Pflimlin", "Félix Gaillard=Gaillard", "Maurice Bourgès-Maunoury=Bourgès-Maunoury", "André Marie", "René Mayer"],
    't6': ["Alain Poher=Poher"],
}

T['his-france-02'] = {
    't1': ["Bouvines=bataille de Bouvines", "Azincourt=bataille d'Azincourt", "Crécy=bataille de Crécy", "Valmy=bataille de Valmy", "Marignan=bataille de Marignan", "Poitiers=bataille de Poitiers", "Siège d'Orléans=Orléans/siège de Orléans"],
    't2': ["Alésia=bataille d'Alésia/siège d'Alésia"],
    't3': ["Bataille de Tours=Tours-Poitiers/Poitiers 732/bataille de Poitiers 732", "Pavie=bataille de Pavie", "Rocroi=bataille de Rocroi", "Yorktown=bataille de Yorktown/siège de Yorktown", "Fontenoy=bataille de Fontenoy", "Jemappes=bataille de Jemappes", "Gergovie=bataille de Gergovie", "Roncevaux=bataille de Roncevaux", "Rivoli=bataille de Rivoli", "Arcole=bataille d'Arcole", "Siège de La Rochelle=La Rochelle", "Fleurus=bataille de Fleurus", "Siège de Toulon=Toulon", "Pyramides=bataille des Pyramides", "Aboukir=bataille d'Aboukir", "Denain=bataille de Denain", "Malplaquet=bataille de Malplaquet", "Rossbach=bataille de Rossbach", "Vouillé=bataille de Vouillé", "Tolbiac=bataille de Tolbiac", "Siège de Calais=Calais", "Courtrai=bataille de Courtrai/bataille des éperons d'or"],
    't4': ["Castillon=bataille de Castillon", "Formigny=bataille de Formigny", "Patay=bataille de Patay", "Ivry=bataille d'Ivry", "Coutras=bataille de Coutras", "Arques=bataille d'Arques", "Jarnac=bataille de Jarnac", "Moncontour=bataille de Moncontour", "Dreux=bataille de Dreux", "Saint-Quentin=bataille de Saint-Quentin", "Cérisoles=bataille de Cérisoles", "Lens=bataille de Lens", "Nördlingen=bataille de Nördlingen", "Bataille des Dunes=Dunes", "Hondschoote=bataille de Hondschoote", "Wattignies=bataille de Wattignies", "Lodi=bataille de Lodi", "Saint-Jean-d'Acre=siège de Saint-Jean-d'Acre", "Muret=bataille de Muret", "Taillebourg=bataille de Taillebourg", "Mons-en-Pévèle=bataille de Mons-en-Pévèle", "Cholet=bataille de Cholet", "Quiberon=bataille de Quiberon", "Soissons=bataille de Soissons", "Plaines d'Abraham=bataille des Plaines d'Abraham/bataille de Québec", "Les Saintes=bataille des Saintes", "Chesapeake=bataille de la baie de Chesapeake/bataille des caps de Virginie", "Ouessant=bataille d'Ouessant", "La Hougue=bataille de La Hougue", "Cocherel=bataille de Cocherel", "Auray=bataille d'Auray", "Verneuil=bataille de Verneuil", "Baugé=bataille de Baugé", "Montlhéry=bataille de Montlhéry", "Gravelines=bataille de Gravelines", "Ravenne=bataille de Ravenne", "Fornoue=bataille de Fornoue", "Novare=bataille de Novare"],
    't5': ["Bibracte=bataille de Bibracte", "Uxellodunum=siège d'Uxellodunum", "Champs catalauniques=bataille des champs Catalauniques/bataille des Champs catalauniques", "Saint-Denis=bataille de Saint-Denis", "Cravant=bataille de Cravant", "Seneffe=bataille de Seneffe", "Turckheim=bataille de Turckheim", "Steinkerque=bataille de Steinkerque", "Neerwinden=bataille de Neerwinden", "Fribourg=bataille de Fribourg", "Carillon=bataille de Carillon", "Hastenbeck=bataille de Hastenbeck", "Minden=bataille de Minden", "Castiglione=bataille de Castiglione", "Mont Thabor=bataille du mont Thabor", "Zurich=bataille de Zurich", "Guinegatte=bataille de Guinegatte", "Sluys=bataille de l'Écluse/L'Écluse", "Cap Béveziers=Beachy Head/bataille de Béveziers", "Rosebeke=bataille de Rosebeke", "La Roche-aux-Moines=bataille de La Roche-aux-Moines"],
    't6': ["Nicopolis=bataille de Nicopolis"],
}

T['his-france-03'] = {
    't1': ["Jean Moulin=Moulin", "Charles de Gaulle=de Gaulle/général de Gaulle", "Philippe Leclerc de Hauteclocque=Leclerc/général Leclerc", "Lucie Aubrac=Aubrac", "Missak Manouchian=Manouchian", "Guy Môquet=Môquet", "Jean-Pierre Lévy"],
    't2': ["Pierre Brossolette=Brossolette"],
    't3': ["Raymond Aubrac", "Germaine Tillion=Tillion", "Geneviève de Gaulle-Anthonioz=Geneviève de Gaulle", "Marie-Madeleine Fourcade=Fourcade", "Henri Rol-Tanguy=Rol-Tanguy/colonel Rol", "Pierre Mendès France=Mendès France", "Honoré d'Estienne d'Orves=d'Estienne d'Orves", "Jean de Lattre de Tassigny=de Lattre", "Alphonse Juin=maréchal Juin", "Pierre Messmer=Messmer", "René Cassin=Cassin", "Romain Gary=Gary", "Joseph Kessel=Kessel", "Maurice Schumann=Schumann", "Marc Bloch=Bloch"],
    't4': ["Henri Frenay=Frenay", "Emmanuel d'Astier de La Vigerie=d'Astier", "Jean Cavaillès=Cavaillès", "Berty Albrecht=Albrecht", "Gilbert Renault=colonel Rémy/Rémy", "Daniel Cordier=Cordier", "Christian Pineau=Pineau", "Jacques Chaban-Delmas=Chaban-Delmas", "Marie-Pierre Koenig=Koenig/général Koenig", "Georges Bidault=Bidault", "Pierre de Bénouville=Bénouville", "Philippe Kieffer=commandant Kieffer/Kieffer", "Pierre Clostermann=Clostermann", "Maurice Druon=Druon", "Louis Aragon=Aragon", "Paul Éluard=Éluard", "René Char=Char", "Robert Desnos=Desnos", "Gabriel Péri=Péri", "Danielle Casanova=Casanova", "Edmond Michelet=Michelet", "Pierre Dac=Dac", "Charles Tillon=Tillon", "Jean Prévost=Prévost"],
    't5': ["Émile Muselier=amiral Muselier/Muselier", "Georges Guingouin=Guingouin", "Joseph Epstein=colonel Gilles", "Jacques Bingen=Bingen", "Madeleine Riffaud=Riffaud"],
    't6': ["Jean Gabin=Gabin"],
}

T['his-france-04'] = {
    't1': ["Chambord", "Chenonceau", "Amboise", "Blois", "Azay-le-Rideau", "Villandry", "Chinon", "Cheverny"],
    't2': ["Chambord"] if False else ["Chaumont-sur-Loire=Chaumont"],
    't3': ["Langeais", "Ussé", "Saumur", "Angers", "Sully-sur-Loire=Sully", "Gien", "Loches", "Montsoreau", "Valençay", "Brissac", "Plessis-Bourré", "Beauregard", "Meung-sur-Loire=Meung", "Talcy", "Montreuil-Bellay", "Serrant", "Le Lude=Lude", "Luynes", "Menars", "Montpoupon", "Champigny-sur-Veude=Champigny", "Saint-Aignan", "Selles-sur-Cher=Selles"],
    't4': ["Plessis-lès-Tours=Plessis-les-Tours", "Fougères-sur-Bièvre=Fougères", "Chamerolles", "Montrichard", "Clos Lucé=Close Lucé", "Villesavin", "Le Gué-Péan=Gué-Péan", "La Bussière", "Oiron", "Montgeoffroy", "Baugé", "Gizeux", "Rochecotte", "Chémery", "Les Réaux=Réaux", "Villegongis", "Sully-sur-Loire (donjon)=donjon de Sully", "Blois-Chambord", "Reignac-sur-Indre=Reignac", "Chanteloup", "Azay-le-Ferron", "Chaumont", "Candé", "Cheverny-Troussay", "Usson"],
    't5': [],
    't6': ["Pignerolle"],
}
