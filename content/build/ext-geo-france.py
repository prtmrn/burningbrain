PROMPTS = [
 {'id': 'geo-france-01', 'text': 'Nomme un département français'},
 {'id': 'geo-france-02', 'text': "Nomme une préfecture de département français qui n'est pas chef-lieu de région"},
 {'id': 'geo-france-03', 'text': 'Nomme une commune de la région Bretagne'},
 {'id': 'geo-france-04', 'text': 'Nomme une commune de la région Normandie'},
 {'id': 'geo-france-05', 'text': 'Nomme une commune de la petite couronne parisienne (Hauts-de-Seine, Seine-Saint-Denis, Val-de-Marne)'},
 {'id': 'geo-france-06', 'text': "Nomme une commune de la région Provence-Alpes-Côte d'Azur"},
 {'id': 'geo-france-07', 'text': 'Nomme une commune de la région Occitanie'},
 {'id': 'geo-france-08', 'text': 'Nomme une commune française de plus de 50 000 habitants'},
 {'id': 'geo-france-09', 'text': "Nomme une station de sports d'hiver française"},
 {'id': 'geo-france-10', 'text': "Nomme une commune d'un département d'outre-mer (Guadeloupe, Martinique, Guyane, La Réunion, Mayotte)"},
 {'id': 'geo-france-11', 'text': "Nomme une appellation d'origine (AOC/AOP) de vin français"},
 {'id': 'geo-france-12', 'text': 'Nomme une spécialité culinaire française dont le nom fait référence à un lieu (hors vins et fromages)'},
 {'id': 'geo-france-13', 'text': 'Nomme un col routier de montagne situé en France'},
 {'id': 'geo-france-14', 'text': 'Nomme une commune de Corse'},
 {'id': 'geo-france-15', 'text': 'Nomme une commune française dont le nom commence par « Saint- » ou « Sainte- »'},
]

T = {}

T['geo-france-01'] = {
 't1': ["Paris=75", "Bouches-du-Rhône=13", "Nord=59", "Gironde=33", "Rhône=69", "Finistère=29", "Haute-Garonne=31", "Alpes-Maritimes=06/6", "Var=83", "Bas-Rhin=67"],
 't2': ["Territoire de Belfort=90/Belfort"],
 't3': ["Loire-Atlantique=44", "Ille-et-Vilaine=35", "Hérault=34", "Isère=38", "Haute-Savoie=74", "Savoie=73", "Calvados=14", "Seine-Maritime=76", "Pas-de-Calais=62", "Moselle=57", "Haut-Rhin=68", "Morbihan=56", "Côtes-d'Armor=22", "Vendée=85", "Charente-Maritime=17", "Dordogne=24", "Landes=40", "Pyrénées-Atlantiques=64", "Hautes-Pyrénées=65", "Pyrénées-Orientales=66", "Corse-du-Sud=2A", "Haute-Corse=2B", "Seine-Saint-Denis=93", "Hauts-de-Seine=92", "Val-de-Marne=94", "Yvelines=78", "Essonne=91", "Seine-et-Marne=77", "Val-d'Oise=95", "Gard=30", "Vaucluse=84", "Puy-de-Dôme=63", "Loire=42", "Somme=80", "Marne=51", "Côte-d'Or=21", "Doubs=25", "Jura=39", "Ain=01/1", "Aveyron=12", "Tarn=81", "Lot=46", "Guadeloupe=971", "Martinique=972", "Guyane=973", "La Réunion=974"],
 't4': ["Aisne=02/2", "Allier=03/3", "Alpes-de-Haute-Provence=04/4", "Hautes-Alpes=05/5", "Ardèche=07/7", "Ardennes=08/8", "Ariège=09/9", "Aube=10", "Aude=11", "Cantal=15", "Charente=16", "Cher=18", "Corrèze=19", "Drôme=26", "Eure=27", "Eure-et-Loir=28", "Gers=32", "Indre=36", "Indre-et-Loire=37", "Loir-et-Cher=41", "Haute-Loire=43", "Loiret=45", "Lot-et-Garonne=47", "Lozère=48", "Maine-et-Loire=49", "Manche=50", "Mayenne=53", "Meurthe-et-Moselle=54", "Meuse=55", "Nièvre=58", "Oise=60", "Orne=61", "Saône-et-Loire=71", "Sarthe=72", "Deux-Sèvres=79", "Tarn-et-Garonne=82", "Vienne=86", "Haute-Vienne=87", "Vosges=88", "Yonne=89"],
 't5': ["Creuse=23", "Haute-Marne=52", "Haute-Saône=70"],
 't6': ["Mayotte=976"],
}

T['geo-france-02'] = {
 't1': ["Montpellier", "Nice", "Grenoble", "Metz", "Clermont-Ferrand=Clermont", "Tours", "Caen", "Limoges", "Amiens", "Toulon"],
 't2': ["Châlons-en-Champagne=Châlons/Châlons-sur-Marne"],
 't3': ["Saint-Étienne", "Nîmes", "Perpignan", "Avignon", "Angers", "Le Mans", "Besançon", "Poitiers", "Nancy", "Pau", "Bastia", "Annecy", "Chambéry", "Versailles", "La Rochelle", "Quimper", "Vannes", "Saint-Brieuc", "Bourges", "Troyes", "Carcassonne", "Colmar", "Valence", "Chartres", "Arras", "Beauvais", "Nanterre", "Créteil", "Bobigny"],
 't4': ["Bourg-en-Bresse=Bourg", "Laon", "Moulins", "Gap", "Charleville-Mézières=Charleville", "Foix", "Rodez", "Aurillac", "Angoulême", "Tulle", "Périgueux", "Évreux", "Auch", "Châteauroux", "Blois", "Le Puy-en-Velay=Le Puy", "Cahors", "Agen", "Mende", "Saint-Lô", "Laval", "Nevers", "Alençon", "Tarbes", "Mâcon", "Melun", "Niort", "Albi", "Montauban", "La Roche-sur-Yon", "Épinal", "Auxerre", "Belfort", "Cergy"],
 't5': ["Digne-les-Bains=Digne", "Guéret", "Lons-le-Saunier=Lons", "Mont-de-Marsan", "Chaumont", "Bar-le-Duc", "Vesoul", "Évry-Courcouronnes=Évry"],
 't6': ["Privas"],
}

T['geo-france-03'] = {
 't1': ["Rennes", "Brest", "Quimper", "Lorient", "Vannes", "Saint-Malo", "Saint-Brieuc", "Carnac", "Dinard"],
 't2': ["Cancale"],
 't3': ["Lannion", "Morlaix", "Concarneau", "Fougères", "Vitré", "Dinan", "Quimperlé", "Douarnenez", "Landerneau", "Quiberon", "Auray", "Pontivy", "Ploërmel", "Redon", "Guingamp", "Paimpol", "Perros-Guirec", "Roscoff", "Pont-Aven", "Bénodet", "Lanester", "Hennebont", "Ploemeur", "Saint-Pol-de-Léon", "Combourg", "Erquy", "Bruz", "Cesson-Sévigné", "Ouessant", "Groix", "La Trinité-sur-Mer"],
 't4': ["Saint-Quay-Portrieux", "Saint-Cast-le-Guildo", "Saint-Jacques-de-la-Lande", "Betton", "Pacé", "Saint-Grégoire", "Montfort-sur-Meu", "Plougastel-Daoulas", "Guipavas", "Le Relecq-Kerhuon", "Plouzané", "Le Conquet", "Carhaix-Plouguer=Carhaix", "Châteaulin", "Crozon", "Camaret-sur-Mer", "Pont-l'Abbé", "Fouesnant", "Locronan", "Landivisiau", "Larmor-Plage", "Guidel", "Loudéac", "Plérin", "Ploufragan", "Trégastel", "Tréguier", "Pléneuf-Val-André=Val-André", "Saint-Lunaire", "Saint-Briac-sur-Mer", "Josselin", "Rochefort-en-Terre", "Locmariaquer", "Sarzeau", "Arzon", "Séné", "Île-de-Bréhat=Bréhat", "Le Palais", "Plouha", "Chartres-de-Bretagne"],
 't5': ["Sauzon", "Bangor", "Locmaria", "Île-de-Batz", "Île-aux-Moines", "Île-d'Arz", "Houat", "Hoëdic", "Plougonvelin", "Muzillac", "Questembert", "Baud"],
 't6': ["Île-de-Sein=Sein"],
}

T['geo-france-04'] = {
 't1': ["Rouen", "Caen", "Le Havre", "Cherbourg-en-Cotentin=Cherbourg", "Deauville", "Honfleur", "Étretat", "Bayeux", "Évreux", "Dieppe"],
 't2': ["Le Mont-Saint-Michel"],
 't3': ["Alençon", "Saint-Lô", "Lisieux", "Trouville-sur-Mer=Trouville", "Fécamp", "Granville", "Avranches", "Coutances", "Falaise", "Argentan", "Flers", "Vernon", "Louviers", "Giverny", "Les Andelys", "Bernay", "Elbeuf", "Cabourg", "Houlgate", "Ouistreham", "Arromanches-les-Bains=Arromanches", "Sainte-Mère-Église", "Le Tréport", "Yvetot", "Pont-l'Évêque"],
 't4': ["Pont-Audemer", "Gisors", "Sotteville-lès-Rouen", "Saint-Étienne-du-Rouvray", "Le Grand-Quevilly", "Le Petit-Quevilly", "Mont-Saint-Aignan", "Bolbec", "Eu", "Neufchâtel-en-Bray", "Forges-les-Eaux", "Barentin", "Montivilliers", "Harfleur", "Lillebonne", "Colleville-sur-Mer", "Valognes", "Barfleur", "Saint-Vaast-la-Hougue", "Mortagne-au-Perche", "L'Aigle", "Hérouville-Saint-Clair", "Mondeville", "Villers-sur-Mer", "Varengeville-sur-Mer", "Veules-les-Roses", "Saint-Valery-en-Caux", "Jumièges", "Courseulles-sur-Mer", "Luc-sur-Mer", "Isigny-sur-Mer", "Val-de-Reuil"],
 't5': ["Lyons-la-Forêt", "Le Neubourg", "Pont-de-l'Arche", "Grandcamp-Maisy", "Douvres-la-Délivrande", "Vire Normandie=Vire", "Carentan-les-Marais=Carentan"],
 't6': ["Camembert"],
}

T['geo-france-05'] = {
 't1': ["Boulogne-Billancourt=Boulogne", "Neuilly-sur-Seine=Neuilly", "Saint-Denis", "Montreuil", "Nanterre", "Vincennes", "Créteil", "Levallois-Perret=Levallois", "Issy-les-Moulineaux=Issy"],
 't2': ["Orly"],
 't3': ["Courbevoie", "Puteaux", "Rueil-Malmaison=Rueil", "Colombes", "Asnières-sur-Seine=Asnières", "Gennevilliers", "Clichy", "Saint-Cloud", "Sèvres", "Meudon", "Clamart", "Montrouge", "Malakoff", "Vanves", "Antony", "Sceaux", "Suresnes", "Bobigny", "Aubervilliers", "Saint-Ouen-sur-Seine=Saint-Ouen", "Pantin", "Bondy", "Drancy", "Aulnay-sous-Bois", "Noisy-le-Grand", "Bagnolet", "La Courneuve", "Le Bourget", "Clichy-sous-Bois", "Saint-Mandé", "Charenton-le-Pont=Charenton", "Ivry-sur-Seine=Ivry", "Vitry-sur-Seine=Vitry", "Villejuif", "Le Kremlin-Bicêtre", "Rungis", "Maisons-Alfort", "Saint-Maur-des-Fossés=Saint-Maur", "Nogent-sur-Marne", "Fontenay-sous-Bois", "Champigny-sur-Marne=Champigny"],
 't4': ["Châtillon", "Bagneux", "Fontenay-aux-Roses", "Châtenay-Malabry", "Le Plessis-Robinson", "Bourg-la-Reine", "Garches", "Chaville", "La Garenne-Colombes", "Bois-Colombes", "Villeneuve-la-Garenne", "Le Blanc-Mesnil", "Sevran", "Villepinte", "Tremblay-en-France", "Noisy-le-Sec", "Rosny-sous-Bois", "Les Lilas", "Le Pré-Saint-Gervais", "Romainville", "Livry-Gargan", "Montfermeil", "Gagny", "Le Raincy", "Villemomble", "Épinay-sur-Seine", "Stains", "Pierrefitte-sur-Seine", "Gentilly", "Arcueil", "Cachan", "L'Haÿ-les-Roses", "Thiais", "Choisy-le-Roi", "Fresnes", "Alfortville", "Joinville-le-Pont", "Le Perreux-sur-Marne", "Bry-sur-Marne", "Villiers-sur-Marne", "Sucy-en-Brie", "Villeneuve-Saint-Georges", "Saint-Maurice"],
 't5': ["Vaucresson", "Ville-d'Avray", "Les Pavillons-sous-Bois", "Neuilly-Plaisance", "Neuilly-sur-Marne", "Gournay-sur-Marne", "Villetaneuse", "Dugny", "L'Île-Saint-Denis", "Coubron", "Vaujours", "Chevilly-Larue", "Chennevières-sur-Marne", "Le Plessis-Trévise", "Ormesson-sur-Marne", "Boissy-Saint-Léger", "Limeil-Brévannes", "Valenton", "Villeneuve-le-Roi", "Ablon-sur-Seine", "Bonneuil-sur-Marne", "Mandres-les-Roses", "Périgny", "Santeny", "Marolles-en-Brie", "Noiseau", "La Queue-en-Brie", "Villecresnes"],
 't6': ["Marnes-la-Coquette"],
}

T['geo-france-06'] = {
 't1': ["Marseille", "Nice", "Toulon", "Aix-en-Provence=Aix", "Avignon", "Cannes", "Antibes", "Saint-Tropez", "Arles", "Menton"],
 't2': ["Gap"],
 't3': ["Fréjus", "Hyères", "Grasse", "Cagnes-sur-Mer", "Saint-Raphaël", "La Seyne-sur-Mer", "Martigues", "Aubagne", "La Ciotat", "Cassis", "Istres", "Salon-de-Provence", "Vitrolles", "Marignane", "Briançon", "Digne-les-Bains=Digne", "Manosque", "Sisteron", "Orange", "Carpentras", "Cavaillon", "Apt", "Gordes", "Draguignan", "Sanary-sur-Mer", "Bandol", "Sainte-Maxime", "Vence", "Saint-Paul-de-Vence", "Èze", "Le Cannet", "Saint-Rémy-de-Provence", "Les Saintes-Maries-de-la-Mer", "Les Baux-de-Provence", "Vallauris", "Mougins", "Châteauneuf-du-Pape"],
 't4': ["Forcalquier", "Embrun", "Barcelonnette", "Roussillon", "L'Isle-sur-la-Sorgue", "Vaison-la-Romaine", "Pertuis", "Bonnieux", "Lourmarin", "Gigondas", "Brignoles", "Saint-Maximin-la-Sainte-Baume", "Six-Fours-les-Plages", "Le Lavandou", "Bormes-les-Mimosas", "Ramatuelle", "Grimaud", "Cogolin", "Moustiers-Sainte-Marie", "Villefranche-sur-Mer", "Beaulieu-sur-Mer", "Roquebrune-Cap-Martin", "Cap-d'Ail", "Mandelieu-la-Napoule", "Valbonne", "Biot", "Saint-Laurent-du-Var", "Tarascon", "Fos-sur-Mer", "Miramas", "Gardanne", "Allauch"],
 't5': ["Gassin", "Bédoin", "Plan-de-Cuques", "La Roque-d'Anthéron", "Lambesc", "Auriol", "Isola", "Saint-Martin-Vésubie", "Tende", "Sospel", "Montgenèvre", "Puy-Saint-Vincent", "Orcières", "Les Orres", "Risoul", "Vars"],
 't6': ["Saint-Véran"],
}

T['geo-france-07'] = {
 't1': ["Toulouse", "Montpellier", "Nîmes", "Perpignan", "Carcassonne", "Béziers", "Albi", "Lourdes", "Narbonne", "Sète"],
 't2': ["Villeneuve-lès-Avignon"],
 't3': ["Tarbes", "Montauban", "Rodez", "Cahors", "Auch", "Foix", "Mende", "Castres", "Millau", "Alès", "Agde", "Lunel", "Pézenas", "Frontignan", "Palavas-les-Flots", "La Grande-Motte", "Le Grau-du-Roi", "Aigues-Mortes", "Beaucaire", "Uzès", "Collioure", "Banyuls-sur-Mer", "Argelès-sur-Mer", "Canet-en-Roussillon", "Font-Romeu-Odeillo-Via=Font-Romeu", "Gruissan", "Castelnaudary", "Limoux", "Colomiers", "Blagnac", "Muret", "Tournefeuille", "Rocamadour", "Saint-Cirq-Lapopie", "Figeac", "Cordes-sur-Ciel", "Roquefort-sur-Soulzon", "Laguiole", "Cauterets", "Bagnères-de-Luchon=Luchon"],
 't4': ["Lodève", "Bagnols-sur-Cèze", "Le Vigan", "Port-Vendres", "Céret", "Prades", "Rivesaltes", "Leucate", "Quillan", "Lézignan-Corbières", "Balma", "L'Union", "Saint-Gaudens", "Revel", "Cugnaux", "Moissac", "Castelsarrasin", "Caussade", "Gaillac", "Mazamet", "Lavaur", "Carmaux", "Gourdon", "Souillac", "Villefranche-de-Rouergue", "Decazeville", "Espalion", "Marvejols", "Condom", "Lectoure", "Eauze", "Mirande", "Bagnères-de-Bigorre", "Argelès-Gazost", "Lannemezan", "Pamiers", "Saint-Girons", "Ax-les-Thermes", "Mirepoix"],
 't5': ["Saint-Orens-de-Gameville", "Tarascon-sur-Ariège", "Gavarnie-Gèdre=Gavarnie", "Conques-en-Rouergue=Conques", "Florac Trois Rivières=Florac"],
 't6': ["Montségur"],
}

T['geo-france-08'] = {
 't1': ["Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes", "Bordeaux", "Lille", "Strasbourg", "Montpellier"],
 't2': ["Saint-Maur-des-Fossés=Saint-Maur"],
 't3': ["Rennes", "Reims", "Toulon", "Saint-Étienne", "Le Havre", "Grenoble", "Dijon", "Angers", "Villeurbanne", "Nîmes", "Aix-en-Provence=Aix", "Clermont-Ferrand=Clermont", "Le Mans", "Brest", "Tours", "Amiens", "Limoges", "Annecy", "Perpignan", "Metz", "Besançon", "Orléans", "Rouen", "Mulhouse", "Caen", "Nancy", "Saint-Denis", "Boulogne-Billancourt=Boulogne", "Argenteuil", "Montreuil", "Roubaix", "Tourcoing", "Avignon", "Poitiers", "Dunkerque", "Versailles", "Pau", "La Rochelle", "Calais", "Cannes", "Antibes", "Ajaccio", "Béziers", "Saint-Nazaire", "Colmar", "Nanterre", "Créteil"],
 't4': ["Vitry-sur-Seine", "Aubervilliers", "Colombes", "Aulnay-sous-Bois", "Asnières-sur-Seine=Asnières", "Courbevoie", "Rueil-Malmaison=Rueil", "Cherbourg-en-Cotentin=Cherbourg", "Champigny-sur-Marne=Champigny", "Drancy", "Mérignac", "Issy-les-Moulineaux=Issy", "Levallois-Perret=Levallois", "Noisy-le-Grand", "Quimper", "Bourges", "Valence", "Villeneuve-d'Ascq", "Neuilly-sur-Seine=Neuilly", "La Seyne-sur-Mer", "Antony", "Vénissieux", "Cergy", "Troyes", "Clichy", "Pessac", "Ivry-sur-Seine=Ivry", "Chambéry", "Lorient", "Niort", "Sarcelles", "Montauban", "Hyères", "Beauvais", "Fréjus", "Narbonne", "Vannes", "Meaux", "Évry-Courcouronnes=Évry", "Saint-Quentin", "Fort-de-France", "Cayenne", "Saint-Paul", "Saint-Pierre"],
 't5': ["Villejuif", "Épinay-sur-Seine", "Pantin", "Maisons-Alfort", "Chelles", "Bondy", "Clamart", "Mamoudzou"],
 't6': ["Le Tampon"],
}

T['geo-france-09'] = {
 't1': ["Chamonix-Mont-Blanc=Chamonix", "Val-d'Isère", "Courchevel", "Tignes", "Méribel", "Val Thorens", "Alpe d'Huez", "Les Deux Alpes=Les 2 Alpes", "La Plagne", "Les Arcs"],
 't2': ["Gérardmer"],
 't3': ["Les Menuires", "Avoriaz", "Morzine", "Les Gets", "Megève", "Flaine", "La Clusaz", "Le Grand-Bornand", "Serre Chevalier", "Montgenèvre", "Isola 2000", "Auron", "Chamrousse", "Villard-de-Lans", "Valloire", "Les Saisies", "La Rosière", "Font-Romeu", "Les Angles", "Saint-Lary-Soulan=Saint-Lary", "La Mongie", "Cauterets", "Superbagnères", "Gourette", "Peyragudes", "La Bresse", "Métabief", "Les Rousses", "Super-Besse", "Le Mont-Dore", "Châtel", "Samoëns", "Saint-Gervais-les-Bains=Saint-Gervais", "Val Cenis", "Vars", "Risoul", "Pra-Loup"],
 't4': ["Orcières-Merlette=Orcières/Merlette", "Les Orres", "Valberg", "Le Sauze", "Superdévoluy", "Les Sept Laux=Les 7 Laux", "Autrans", "Valmeinier", "Sainte-Foy-Tarentaise", "Peisey-Vallandry", "Champagny-en-Vanoise", "Pralognan-la-Vanoise=Pralognan", "Les Contamines-Montjoie=Les Contamines", "Les Houches", "Combloux", "Praz-sur-Arly", "Les Carroz", "Morillon", "Le Corbier", "La Toussuire", "Saint-François-Longchamp", "Aussois", "Bonneval-sur-Arc", "Arêches-Beaufort", "Puy-Saint-Vincent", "Luz-Ardiden", "La Pierre Saint-Martin", "Piau-Engaly", "Ax 3 Domaines=Ax-les-Thermes", "Le Markstein"],
 't5': ["Notre-Dame-de-Bellecombe", "Praz de Lys", "Saint-Véran", "Montclar", "Abondance", "La Norma", "Valfréjus", "Guzet", "Formiguères", "Porté-Puymorens", "Ventron", "Chastreix"],
 't6': ["Le Lioran"],
}

T['geo-france-10'] = {
 't1': ["Fort-de-France", "Pointe-à-Pitre", "Cayenne", "Saint-Denis", "Kourou", "Basse-Terre", "Mamoudzou", "Saint-Pierre", "Saint-Paul"],
 't2': ["Le Port"],
 't3': ["Les Abymes", "Baie-Mahault", "Le Gosier", "Sainte-Anne", "Saint-François", "Le Moule", "Deshaies", "Lamentin", "Schœlcher=Schoelcher", "Le Robert", "Le François", "Sainte-Marie", "Le Marin", "Les Trois-Îlets", "Le Diamant", "Sainte-Luce", "La Trinité", "Saint-Laurent-du-Maroni", "Matoury", "Rémire-Montjoly", "Le Tampon", "Saint-André", "Saint-Louis", "Saint-Benoît", "Saint-Joseph", "Saint-Leu", "La Possession", "Cilaos", "Salazie", "Dzaoudzi", "Pamandzi"],
 't4': ["Petit-Bourg", "Capesterre-Belle-Eau", "Sainte-Rose", "Bouillante", "Morne-à-l'Eau", "Anse-Bertrand", "Port-Louis", "Trois-Rivières", "Gourbeyre", "Vieux-Habitants", "Pointe-Noire", "Goyave", "Grand-Bourg", "La Désirade", "Terre-de-Haut", "Saint-Claude", "Le Vauclin", "Le Carbet", "Le Prêcheur", "Le Lorrain", "Ducos", "Rivière-Salée", "Rivière-Pilote", "Le Morne-Rouge", "Basse-Pointe", "Les Anses-d'Arlet", "Macouria", "Maripasoula", "Saint-Georges", "Sinnamary", "Mana", "Sainte-Suzanne", "Saint-Philippe", "L'Étang-Salé", "Entre-Deux", "Petite-Île", "Koungou", "Sada", "Chirongui", "Dembeni"],
 't5': ["Petit-Canal", "Capesterre-de-Marie-Galante", "Terre-de-Bas", "Baillif", "Vieux-Fort", "Grand'Rivière", "Iracoubo", "Apatou", "Grand-Santi", "Papaïchton", "Camopi", "Roura", "Régina", "Awala-Yalimapo", "Montsinéry-Tonnegrande", "Les Avirons", "Bras-Panon", "Trois-Bassins", "La Plaine-des-Palmistes", "Bandraboua", "Tsingoni", "M'Tsangamouji", "Acoua", "Bouéni", "Kani-Kéli", "Ouangani", "Chiconi", "Bandrélé", "Mtsamboro"],
 't6': ["Saül"],
}

T['geo-france-11'] = {
 't1': ["Bordeaux", "Champagne", "Chablis", "Beaujolais", "Saint-Émilion", "Côtes-du-Rhône", "Châteauneuf-du-Pape", "Sancerre", "Muscadet", "Bourgogne"],
 't2': ["Cassis"],
 't3': ["Pomerol", "Margaux", "Pauillac", "Saint-Julien", "Saint-Estèphe", "Médoc", "Haut-Médoc", "Graves", "Pessac-Léognan", "Sauternes", "Entre-deux-Mers", "Bergerac", "Monbazillac", "Cahors", "Madiran", "Jurançon", "Gaillac", "Minervois", "Corbières", "Fitou", "Banyuls", "Tavel", "Gigondas", "Vacqueyras", "Côte-Rôtie", "Condrieu", "Crozes-Hermitage", "Hermitage", "Bandol", "Côtes de Provence", "Pouilly-Fuissé", "Meursault", "Pommard", "Volnay", "Nuits-Saint-Georges", "Gevrey-Chambertin", "Morgon", "Fleurie", "Moulin-à-Vent", "Juliénas", "Brouilly", "Pouilly-Fumé", "Vouvray", "Chinon", "Bourgueil", "Saumur-Champigny", "Alsace", "Crémant d'Alsace", "Crémant de Bourgogne", "Arbois", "Clairette de Die", "Blanquette de Limoux"],
 't4': ["Barsac", "Fronsac", "Listrac-Médoc=Listrac", "Moulis-en-Médoc=Moulis", "Côtes de Bourg", "Lalande-de-Pomerol", "Loupiac", "Pécharmant", "Fronton", "Irouléguy", "Buzet", "Marcillac", "Faugères", "Saint-Chinian", "Collioure", "Maury", "Rivesaltes", "Limoux", "Picpoul de Pinet", "Costières de Nîmes", "Lirac", "Beaumes-de-Venise", "Rasteau", "Cairanne", "Vinsobres", "Saint-Joseph", "Cornas", "Saint-Péray", "Ventoux", "Luberon", "Bellet", "Palette", "Coteaux d'Aix-en-Provence", "Les Baux-de-Provence", "Ajaccio", "Patrimonio", "Mâcon", "Saint-Véran", "Puligny-Montrachet", "Chassagne-Montrachet", "Montrachet", "Corton", "Corton-Charlemagne", "Beaune", "Aloxe-Corton", "Savigny-lès-Beaune", "Vosne-Romanée", "Romanée-Conti", "Clos de Vougeot=Clos-Vougeot", "Chambolle-Musigny", "Chambertin", "Morey-Saint-Denis", "Santenay", "Mercurey", "Givry", "Rully", "Irancy", "Chénas", "Chiroubles", "Saint-Amour", "Côte de Brouilly", "Régnié", "Montlouis-sur-Loire", "Saint-Nicolas-de-Bourgueil", "Saumur", "Anjou", "Savennières", "Coteaux du Layon", "Menetou-Salon", "Quincy", "Reuilly", "Cheverny", "Touraine", "Crémant de Loire", "Château-Chalon", "Côtes du Jura", "Savoie=Vin de Savoie", "Roussette de Savoie", "Coteaux champenois", "Côtes du Roussillon", "Languedoc", "Pic-Saint-Loup", "Muscat de Frontignan", "Muscat de Rivesaltes", "Bugey"],
 't5': ["Cadillac", "Blaye", "Côtes de Duras", "Terrasses du Larzac", "La Clape", "Fixin", "Marsannay", "Montagny", "Quarts de Chaume", "Bonnezeaux", "Gros-Plant du Pays nantais=Gros-Plant", "L'Étoile", "Seyssel", "Rosé des Riceys", "Côtes de Toul", "Moselle", "Saint-Mont"],
 't6': ["Château-Grillet"],
}

T['geo-france-12'] = {
 't1': ["Paris-Brest", "Quiche lorraine", "Salade niçoise", "Moutarde de Dijon", "Jambon de Bayonne", "Nougat de Montélimar", "Bœuf bourguignon=Boeuf bourguignon", "Gratin dauphinois", "Cassoulet de Castelnaudary"],
 't2': ["Crème Chantilly=Chantilly"],
 't3': ["Calissons d'Aix=Calisson d'Aix", "Bêtises de Cambrai=Bêtise de Cambrai", "Madeleines de Commercy=Madeleine de Commercy", "Macarons de Nancy=Macaron de Nancy", "Bergamotes de Nancy=Bergamote de Nancy", "Lentilles du Puy=Lentille verte du Puy", "Piment d'Espelette", "Tripes à la mode de Caen", "Andouillette de Troyes", "Andouille de Vire", "Sel de Guérande", "Poulet de Bresse=Volaille de Bresse", "Canelé de Bordeaux=Canelés de Bordeaux", "Saucisse de Toulouse", "Saucisse de Morteau", "Rillettes du Mans", "Pruneaux d'Agen=Pruneau d'Agen", "Tarte tropézienne", "Gâteau basque", "Poulet basquaise", "Potée auvergnate", "Sauce béarnaise=Béarnaise", "Pain d'épices de Dijon", "Noix de Grenoble", "Choucroute alsacienne", "Truffe du Périgord", "Mont-Blanc"],
 't4': ["Andouille de Guémené", "Coco de Paimpol", "Oignon de Roscoff", "Saucisse de Montbéliard", "Rillettes de Tours", "Fraises de Plougastel=Fraise de Plougastel", "Mirabelles de Lorraine=Mirabelle de Lorraine", "Berlingots de Carpentras=Berlingot de Carpentras", "Huîtres de Marennes-Oléron=Marennes-Oléron", "Pommes de terre sarladaises=Pommes sarladaises", "Escargots de Bourgogne", "Potée lorraine", "Sauce bordelaise=Bordelaise", "Salade lyonnaise", "Saucisson de Lyon", "Melon de Cavaillon", "Riz de Camargue", "Taureau de Camargue", "Agneau de pré-salé du Mont-Saint-Michel=Pré-salé du Mont-Saint-Michel", "Navettes de Marseille=Navette de Marseille", "Chocolat de Bayonne", "Brioche vendéenne", "Far breton", "Pastilles de Vichy=Pastille de Vichy", "Carottes Vichy", "Vichyssoise", "Anis de Flavigny"],
 't5': ["Ail rose de Lautrec", "Chasselas de Moissac", "Olives de Nyons=Olive de Nyons", "Macarons de Saint-Émilion", "Macarons d'Amiens", "Petits pâtés de Pézenas=Petit pâté de Pézenas", "Saucisson d'Arles", "Volaille de Loué=Poulet de Loué", "Pommes de terre de Noirmoutier", "Huîtres de Cancale"],
 't6': ["Pithiviers"],
}

T['geo-france-13'] = {
 't1': ["Col du Galibier=Galibier", "Col du Tourmalet=Tourmalet", "Col de l'Izoard=Izoard", "Col d'Aubisque=Aubisque", "Col de l'Iseran=Iseran", "Col de la Madeleine", "Col de la Croix de Fer=Croix de Fer", "Col du Lautaret=Lautaret", "Col d'Aspin=Aspin", "Col de Peyresourde=Peyresourde"],
 't2': ["Col de la Faucille=Faucille"],
 't3': ["Col du Télégraphe=Télégraphe", "Col de Vars", "Col d'Allos", "Col de la Cayolle=Cayolle", "Col de la Bonette=Bonette", "Col du Glandon=Glandon", "Col du Mont-Cenis=Mont-Cenis", "Col de Montgenèvre", "Col des Saisies", "Col des Aravis=Aravis", "Col de la Colombière=Colombière", "Col de Joux Plane=Joux Plane", "Col du Soulor=Soulor", "Col de Marie-Blanque=Marie-Blanque", "Col de Portet-d'Aspet=Portet-d'Aspet", "Col du Portet", "Col de la Schlucht=Schlucht", "Col du Grand Colombier=Grand Colombier", "Col de Turini=Turini", "Col de Bavella=Bavella", "Col de Vizzavona=Vizzavona", "Col de Puymorens=Puymorens", "Col de Sarenne=Sarenne", "Col de la Croix-Morand"],
 't4': ["Col de Romme", "Col de la Ramaz", "Col de la Forclaz", "Col de la Croix-Fry", "Col du Granier", "Col du Cucheron", "Col de Porte", "Col du Coq", "Col d'Ornon", "Col du Noyer", "Col Bayard", "Col de Braus", "Col d'Èze", "Col de la Couillole", "Col du Bonhomme", "Col du Donon", "Col de Bussang", "Col de la République", "Pas de Peyrol", "Col de Vergio", "Col de Teghime", "Col du Rousset", "Col d'Azet", "Hourquette d'Ancizan", "Col de Menté", "Col de Port", "Col d'Agnes", "Col de Pailhères", "Col du Chioula", "Col de la Core"],
 't5': ["Col de Joux Verte", "Col de l'Épine", "Col de Manse", "Col de la Biche", "Col de Néronne", "Col de Prat de Bouc", "Col du Béal", "Col de Sevi", "Col de Latrape", "Col de Jau", "Col de l'Espigoulier", "Col de Bagargui", "Col d'Osquich", "Col de la Machine"],
 't6': ["Col de la Gineste"],
}

T['geo-france-14'] = {
 't1': ["Ajaccio", "Bastia", "Porto-Vecchio", "Bonifacio", "Calvi", "Corte", "L'Île-Rousse", "Propriano", "Sartène"],
 't2': ["Patrimonio"],
 't3': ["Saint-Florent", "Ghisonaccia", "Aléria", "Biguglia", "Furiani", "Borgo", "Lucciana", "Calenzana", "Algajola", "Galéria", "Piana", "Cargèse", "Zonza", "Lecci", "Sari-Solenzara=Solenzara", "Vivario", "Bocognano", "Centuri", "Rogliano", "Nonza", "Grosseto-Prugna", "Figari", "Olmeto", "Lumio", "Évisa", "Vico", "Venaco", "Morosaglia", "Belgodère", "Cervione"],
 't4': ["Levie", "Prunelli-di-Fiumorbo", "Ota", "Brando", "Pietrosella", "Albitreccia", "Afa", "Alata", "Bastelicaccia", "Cauro", "Sari-d'Orcino", "Calcatoggio", "Appietto", "Pianottoli-Caldarello", "Monacia-d'Aullène", "Coti-Chiavari", "Serra-di-Ferro", "San-Nicolao", "Penta-di-Casinca", "Vescovato", "Venzolasca", "Oletta", "Pigna", "Sant'Antonino", "Aregno"],
 't5': ["Santa-Maria-Poggio", "Montegrosso", "Speloncato", "Feliceto", "Muro", "Lama", "Pietralba"],
 't6': ["Ersa"],
}

T['geo-france-15'] = {
 't1': ["Saint-Étienne", "Saint-Malo", "Saint-Tropez", "Saint-Denis", "Saint-Nazaire", "Saint-Brieuc", "Saint-Germain-en-Laye", "Saint-Jean-de-Luz", "Saint-Raphaël", "Saint-Émilion"],
 't2': ["Saint-Nectaire"],
 't3': ["Saint-Quentin", "Saint-Lô", "Saint-Ouen-sur-Seine=Saint-Ouen", "Saint-Maur-des-Fossés=Saint-Maur", "Saint-Cloud", "Saint-Jean-Pied-de-Port", "Saint-Paul-de-Vence", "Saint-Rémy-de-Provence", "Saint-Gervais-les-Bains", "Saint-Flour", "Saint-Dizier", "Saint-Omer", "Saint-Dié-des-Vosges", "Saint-Chamond", "Saint-Priest", "Saint-Herblain", "Saint-Gaudens", "Saint-Martin-de-Ré", "Saint-Gilles-Croix-de-Vie", "Saint-Jean-de-Monts", "Saint-Valery-sur-Somme", "Saint-Mandé", "Saint-Cyr-l'École", "Saint-Pierre-des-Corps", "Saint-Laurent-du-Var", "Saint-Jean-Cap-Ferrat", "Saint-Paul", "Saint-Pierre", "Saint-Laurent-du-Maroni", "Saint-Claude", "Saint-Florent", "Saint-Martin-d'Hères", "Sainte-Maxime", "Sainte-Mère-Église", "Sainte-Menehould", "Sainte-Geneviève-des-Bois"],
 't4': ["Saint-Amand-les-Eaux", "Saint-Avold", "Saint-Fons", "Saint-Genis-Laval", "Saint-Sébastien-sur-Loire", "Saint-Médard-en-Jalles", "Saint-Girons", "Saint-Pol-de-Léon", "Saint-Cast-le-Guildo", "Saint-Lary-Soulan", "Saint-Pierre-d'Oléron", "Saint-Georges-de-Didonne", "Saint-Hilaire-de-Riez", "Saint-Brevin-les-Pins", "Saint-Valery-en-Caux", "Saint-Vaast-la-Hougue", "Saint-Maurice", "Saint-Cyr-sur-Loire", "Saint-Avertin", "Saint-Jean-de-Braye", "Saint-Junien", "Saint-Yrieix-la-Perche", "Saint-Affrique", "Saint-Bertrand-de-Comminges", "Saint-Guilhem-le-Désert", "Saint-Gilles", "Saint-Chinian", "Saint-Martin-Vésubie", "Saint-Véran", "Saint-Maximin-la-Sainte-Baume", "Saint-Benoît", "Saint-François", "Saint-Amand-Montrond", "Saint-Genis-Pouilly", "Saint-Julien-en-Genevois", "Saint-Égrève", "Saint-Marcellin", "Saint-Étienne-du-Rouvray", "Saint-Jean-d'Angély", "Saint-Benoît-sur-Loire", "Sainte-Foy-lès-Lyon", "Sainte-Marie", "Sainte-Anne", "Sainte-Rose", "Sainte-Adresse", "Sainte-Foy-Tarentaise"],
 't5': ["Saint-Jean-de-la-Ruelle", "Saint-Sever", "Saint-Savin", "Saint-Fargeau", "Saint-Florentin", "Saint-Cyr-sur-Mer", "Sainte-Luce", "Sainte-Suzanne", "Sainte-Savine", "Sainte-Luce-sur-Loire"],
 't6': ["Saint-Cirq-Lapopie"],
}
