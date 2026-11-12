PROMPTS = [
 {'id': 'his-antiquite-01', 'text': "Nomme une cité grecque antique de Grèce continentale, des îles de la mer Égée ou de la côte égéenne de l'Asie Mineure"},
 {'id': 'his-antiquite-02', 'text': "Nomme une colonie grecque antique fondée hors du monde égéen (Italie, Sicile, Gaule, Espagne, mer Noire, Afrique...)"},
 {'id': 'his-antiquite-03', 'text': "Nomme un homme d'État, stratège, roi ou tyran de la Grèce antique (hors philosophes)"},
 {'id': 'his-antiquite-04', 'text': "Nomme un homme politique ou un général de la République romaine (509-27 av. J.-C.)"},
 {'id': 'his-antiquite-05', 'text': "Nomme un écrivain grec de l'Antiquité (poète, dramaturge, historien ou orateur, hors philosophes)"},
 {'id': 'his-antiquite-06', 'text': "Nomme un écrivain de langue latine de l'Antiquité"},
 {'id': 'his-antiquite-07', 'text': "Nomme une pièce de théâtre antique, grecque ou latine, parvenue jusqu'à nous"},
 {'id': 'his-antiquite-08', 'text': "Nomme une bataille de l'Antiquité (avant 476 apr. J.-C.)"},
 {'id': 'his-antiquite-09', 'text': "Nomme un souverain de la Mésopotamie ou de l'Iran antiques (de Sumer aux Sassanides)"},
 {'id': 'his-antiquite-10', 'text': "Nomme une femme réelle (non mythologique) ayant marqué l'Antiquité"},
 {'id': 'his-antiquite-11', 'text': "Nomme un savant de l'Antiquité (mathématicien, astronome, médecin, ingénieur ou géographe)"},
 {'id': 'his-antiquite-12', 'text': "Nomme un site archéologique ou un monument antique visible aujourd'hui autour de la Méditerranée ou au Proche-Orient"},
 {'id': 'his-antiquite-13', 'text': "Nomme une province de l'Empire romain (de 27 av. J.-C. à 284 apr. J.-C.)"},
 {'id': 'his-antiquite-14', 'text': "Nomme une ville de France métropolitaine qui existait déjà à l'époque romaine"},
 {'id': 'his-antiquite-15', 'text': "Nomme une langue de l'Antiquité aujourd'hui éteinte"},
]

T = {}

T['his-antiquite-01'] = {
 't1': ["Athènes", "Sparte=Lacédémone", "Corinthe", "Thèbes", "Argos", "Milet", "Éphèse", "Delphes"],
 't2': ["Smyrne=Izmir"],
 't3': ["Mégare", "Sicyone", "Égine", "Chalcis", "Érétrie", "Platées", "Mycènes", "Élis", "Messène", "Mantinée", "Tégée", "Pylos", "Tirynthe", "Phocée", "Samos", "Chios", "Mytilène", "Rhodes", "Halicarnasse", "Cnossos", "Pella", "Naxos", "Paros", "Priène", "Pergame", "Mégalopolis", "Orchomène", "Larissa", "Épidaure"],
 't4': ["Thespies", "Tanagra", "Patras", "Phères", "Pharsale", "Colophon", "Téos", "Clazomènes", "Érythrées", "Lindos", "Ialysos", "Camiros", "Cos", "Cnide", "Gortyne", "Andros", "Ténos", "Mélos", "Théra=Santorin", "Céos", "Siphnos", "Thasos", "Aigai=Vergina", "Olynthe", "Potidée", "Amphipolis", "Démétrias", "Chéronée", "Trézène", "Assos", "Magnésie du Méandre", "Cymé", "Délos"],
 't5': ["Phlionte", "Haliarte", "Lébédos", "Myonte", "Cléonées", "Phigalie", "Égion", "Pellène", "Dymé", "Lato", "Lyttos", "Itanos", "Abdère", "Maronée", "Iasos", "Myndos", "Hermione", "Coronée", "Lébadée", "Myrina"],
 't6': ["Stagire"],
}

T['his-antiquite-02'] = {
 't1': ["Marseille=Massalia/Massilia", "Syracuse", "Byzance", "Naples=Neapolis", "Tarente=Taras", "Nice=Nikaia", "Antibes=Antipolis", "Agrigente=Akragas"],
 't2': ["Paestum=Poseidonia"],
 't3': ["Agde=Agathé", "Ampurias=Emporion", "Cumes", "Sybaris", "Crotone", "Métaponte", "Reggio de Calabre=Rhégion", "Messine=Zancle", "Catane", "Géla", "Sélinonte", "Himère", "Naxos de Sicile", "Cyrène", "Naucratis", "Sinope", "Trébizonde=Trapézonte", "Chalcédoine", "Olbia du Pont", "Chersonèse", "Locres", "Élée=Vélia", "Mégara Hyblaea", "Olbia de Provence=Hyères"],
 't4': ["Leontinoi=Lentini", "Camarine", "Tauroménion=Taormine", "Lipari", "Ancône", "Pithécusses=Ischia", "Thourioi", "Héraclée de Lucanie", "Panticapée=Kertch", "Phanagorie", "Tanaïs", "Tomis=Constanța", "Istros", "Callatis=Mangalia", "Apollonia du Pont=Sozopol", "Odessos=Varna", "Mésembria=Nessebar", "Héraclée du Pont", "Amisos=Samsun", "Cyzique", "Lampsaque", "Périnthe", "Barca", "Apollonia de Cyrénaïque", "Épidamne=Dyrrachium/Durrës", "Apollonia d'Illyrie", "Rhodé=Roses", "Alalia=Aléria"],
 't5': ["Tauroentum", "Akrai", "Héraclée Minoa", "Tyndaris", "Hipponion=Vibo Valentia", "Caulonia", "Dioscurias", "Phasis", "Gorgippia", "Théodosia=Féodosia", "Nymphaion", "Hermonassa", "Tyras", "Dionysopolis=Balchik", "Anchialos=Pomorie", "Sélymbria", "Medma"],
 't6': ["Euhespérides=Bérénice/Benghazi"],
}

T['his-antiquite-03'] = {
 't1': ["Périclès", "Léonidas", "Alexandre le Grand=Alexandre III/Alexandre", "Thémistocle", "Solon", "Alcibiade", "Philippe II de Macédoine=Philippe II", "Démosthène", "Dracon", "Clisthène"],
 't2': ["Lycurgue"],
 't3': ["Miltiade", "Pisistrate", "Cimon", "Aristide", "Nicias", "Cléon", "Lysandre", "Pausanias", "Épaminondas", "Pélopidas", "Pyrrhus", "Agésilas", "Brasidas", "Phocion", "Eschine", "Hippias", "Hipparque", "Harmodios", "Aristogiton", "Denys l'Ancien", "Polycrate"],
 't4': ["Xanthippe", "Critias", "Théramène", "Thrasybule", "Conon", "Iphicrate", "Chabrias", "Gélon", "Hiéron Ier", "Hiéron II", "Denys le Jeune", "Agathocle", "Timoléon", "Périandre", "Cypsélos", "Cléomène Ier", "Cléomène III", "Agis IV", "Nabis", "Aratos de Sicyone", "Philopoemen", "Démétrios de Phalère", "Démétrios Poliorcète", "Antigone Gonatas", "Philippe V", "Persée", "Archidamos II", "Démarate", "Gylippe", "Éphialte", "Antipater", "Cassandre", "Hypéride", "Dion de Syracuse", "Hermocrate", "Lamachos"],
 't5': ["Phidon d'Argos", "Théagène de Mégare", "Pittacos", "Timothée", "Callicratidas", "Cléombrotos", "Théron d'Agrigente", "Histiée", "Aristagoras", "Xénophon"],
 't6': ["Phalaris"],
}

T['his-antiquite-04'] = {
 't1': ["Jules César=César", "Cicéron", "Pompée", "Crassus", "Scipion l'Africain", "Marc Antoine", "Brutus", "Sylla", "Caton l'Ancien=Caton le Censeur", "Marius"],
 't2': ["Octave"],
 't3': ["Cincinnatus", "Camille", "Fabius Maximus=Fabius Cunctator", "Tiberius Gracchus", "Caius Gracchus=Gaius Gracchus", "Catilina", "Caton d'Utique", "Lépide", "Cassius", "Agrippa", "Clodius", "Milon", "Scipion Émilien", "Paul Émile", "Lucius Junius Brutus=Brutus l'Ancien", "Flaminius", "Marcellus", "Appius Claudius Caecus", "Régulus", "Sertorius", "Lucullus", "Cinna"],
 't4': ["Duilius", "Scipion l'Asiatique", "Flamininus", "Livius Drusus", "Metellus Numidicus", "Metellus Pius", "Sulpicius Rufus", "Carbon", "Marius le Jeune", "Labienus", "Hirtius", "Pansa", "Bibulus", "Hortensius", "Curion", "Dolabella", "Sextus Pompée", "Domitius Ahenobarbus", "Murena", "Gabinius", "Mummius", "Manlius Torquatus", "Decimus Brutus", "Varron", "Antonius Hybrida", "Vatinius", "Metellus Macedonicus"],
 't5': ["Fabricius", "Curius Dentatus", "Opimius", "Saturninus", "Glaucia", "Rutilius Rufus", "Ventidius Bassus", "Lutatius Catulus", "Scaurus"],
 't6': ["Verrès"],
}

T['his-antiquite-05'] = {
 't1': ["Homère", "Hésiode", "Sophocle", "Eschyle", "Euripide", "Aristophane", "Hérodote", "Thucydide", "Sappho", "Ésope"],
 't2': ["Lucien de Samosate=Lucien"],
 't3': ["Pindare", "Ménandre", "Xénophon", "Polybe", "Plutarque", "Démosthène", "Lysias", "Isocrate", "Anacréon", "Alcée", "Archiloque", "Callimaque", "Théocrite", "Apollonios de Rhodes", "Simonide", "Bacchylide", "Tyrtée", "Arrien", "Diodore de Sicile", "Strabon", "Pausanias"],
 't4': ["Eschine", "Hypéride", "Andocide", "Antiphon", "Isée", "Dinarque", "Lycurgue", "Mimnerme", "Théognis", "Solon", "Alcman", "Stésichore", "Ibycos", "Corinne", "Érinna", "Hipponax", "Sémonide d'Amorgos", "Phrynichos", "Cratinos", "Eupolis", "Agathon", "Thespis", "Hécatée de Milet", "Hellanicos", "Ctésias", "Éphore", "Théopompe", "Timée de Tauroménion", "Denys d'Halicarnasse", "Appien", "Dion Cassius", "Hérodien", "Longus", "Héliodore", "Chariton", "Achille Tatius", "Babrius", "Aratos de Soles", "Lycophron", "Hérondas", "Moschos", "Nonnos de Panopolis", "Quintus de Smyrne", "Élien", "Athénée", "Philostrate", "Libanios", "Philémon", "Diphile"],
 't5': ["Xénophon d'Éphèse", "Bion de Smyrne", "Oppien", "Méléagre de Gadara", "Asclépiade de Samos", "Posidippe", "Léonidas de Tarente", "Ion de Chios", "Euphorion"],
 't6': ["Flavius Josèphe"],
}

T['his-antiquite-06'] = {
 't1': ["Virgile", "Ovide", "Horace", "Cicéron", "Jules César=César", "Tacite", "Sénèque", "Tite-Live", "Pline l'Ancien", "Suétone"],
 't2': ["Saint Augustin=Augustin d'Hippone"],
 't3': ["Catulle", "Lucrèce", "Plaute", "Térence", "Juvénal", "Martial", "Salluste", "Pline le Jeune", "Pétrone", "Apulée", "Properce", "Tibulle", "Lucain", "Quintilien", "Caton l'Ancien", "Varron", "Cornélius Népos", "Phèdre", "Ennius", "Stace", "Vitruve", "Ammien Marcellin"],
 't4': ["Aulu-Gelle", "Macrobe", "Claudien", "Ausone", "Tertullien", "Saint Jérôme=Jérôme de Stridon", "Lactance", "Columelle", "Frontin", "Valère Maxime", "Velleius Paterculus", "Florus", "Quinte-Curce", "Perse", "Silius Italicus", "Valerius Flaccus", "Manilius", "Livius Andronicus", "Naevius", "Pacuvius", "Accius", "Lucilius", "Publilius Syrus", "Hygin", "Végèce", "Eutrope", "Aurelius Victor", "Symmaque", "Prudence", "Fronton", "Ambroise de Milan", "Celse", "Pomponius Mela", "Orose"],
 't5': ["Rutilius Namatianus", "Sidoine Apollinaire", "Cyprien de Carthage", "Minucius Felix", "Calpurnius Siculus", "Némésien", "Censorinus", "Servius", "Donat", "Solin", "Arnobe", "Firmicus Maternus", "Cornelius Gallus", "Avianus", "Paulin de Nole", "Hilaire de Poitiers", "Martianus Capella", "Juvencus"],
 't6': ["Sulpicia"],
}

T['his-antiquite-07'] = {
 't1': ["Antigone", "Œdipe roi", "Médée", "Lysistrata", "Les Perses", "Agamemnon", "Électre", "Les Grenouilles", "Les Nuées", "Les Bacchantes"],
 't2': ["Phèdre"],
 't3': ["Les Choéphores", "Les Euménides", "Prométhée enchaîné", "Les Sept contre Thèbes", "Les Suppliantes", "Ajax", "Philoctète", "Œdipe à Colone", "Les Trachiniennes", "Les Troyennes", "Hippolyte", "Alceste", "Andromaque", "Hécube", "Oreste", "Iphigénie à Aulis", "Iphigénie en Tauride", "Hélène", "Les Oiseaux", "Les Guêpes", "Les Cavaliers", "La Paix", "Les Acharniens", "L'Assemblée des femmes", "Ploutos", "Les Thesmophories", "Amphitryon", "La Marmite=Aulularia", "Les Ménechmes", "Le Soldat fanfaron=Miles gloriosus"],
 't4': ["Ion", "Les Phéniciennes", "Les Héraclides", "Héraclès=Héraclès furieux", "Rhésos", "Le Dyscolos=Le Misanthrope", "La Samienne", "Pseudolus", "Les Captifs=Captivi", "Le Revenant=Mostellaria", "Le Cordage=Rudens", "Casina", "La Comédie des ânes=Asinaria", "Les Bacchis=Bacchides", "Le Charançon=Curculio", "Epidicus", "Le Marchand=Mercator", "Le Perse=Persa", "Le Petit Carthaginois=Poenulus", "Stichus", "Trinummus", "Truculentus", "La Cassette=Cistellaria", "L'Andrienne", "L'Eunuque", "Phormion", "Les Adelphes", "L'Hécyre=La Belle-Mère", "L'Héautontimorouménos=Le Bourreau de soi-même", "Thyeste", "Hercule furieux"],
 't5': ["Hercule sur l'Œta", "Octavie", "Œdipe", "L'Arbitrage=Epitrepontes", "La Tondue=Périkeiroménè", "Le Bouclier=Aspis", "Le Sicyonien", "Les Limiers=Ichneutes"],
 't6': ["Le Cyclope"],
}

T['his-antiquite-08'] = {
 't1': ["Marathon", "Thermopyles", "Salamine", "Alésia", "Cannes", "Actium", "Gaugamèles", "Zama", "Pharsale", "Qadesh=Kadesh"],
 't2': ["Champs Catalauniques"],
 't3': ["Platées", "Issos", "Granique", "Trasimène", "Trébie", "Chéronée", "Leuctres", "Mantinée", "Hydaspe", "Gergovie", "Philippes", "Aegos Potamos", "Mycale", "Bibracte", "Pydna", "Cynoscéphales", "Magnésie du Sipyle", "Carrhes", "Andrinople", "Pont Milvius", "Mylae", "Îles Égates", "Métaure", "Sphactérie", "Himère", "Lade", "Artémision", "Teutoburg=Forêt de Teutoburg"],
 't4': ["Arginuses", "Coronée", "Délion", "Amphipolis", "Cnide", "Ipsos", "Sellasie", "Raphia", "Héraclée", "Ausculum", "Bénévent", "Aix=Aquae Sextiae", "Verceil", "Orange=Arausio", "Munda", "Thapsus", "Zéla", "Modène", "Nauloque", "Allia", "Fourches Caudines", "Sentinum", "Lac Régille", "Ilerda", "Dyrrachium", "Uxellodunum", "Mons Graupius", "Bédriac", "Lugdunum", "Édesse", "Strasbourg=Argentoratum", "Chrysopolis", "Frigidus", "Ecnome", "Drépane", "Megiddo", "Péluse", "Cunaxa", "Thymbrée"],
 't5': ["Opis", "Ptérie", "Halys=Bataille de l'Éclipse", "Gaixia", "Changping", "Forum Gallorum", "Ctésiphon", "Nisibe"],
 't6': ["Falaise rouge=Chibi"],
}

T['his-antiquite-09'] = {
 't1': ["Hammurabi", "Nabuchodonosor II=Nabuchodonosor", "Cyrus le Grand=Cyrus II/Cyrus", "Darius Ier=Darius/Darius I", "Xerxès Ier=Xerxès", "Sargon d'Akkad=Sargon/Sargon l'Ancien", "Assurbanipal", "Darius III"],
 't2': ["Séleucos Ier=Séleucos Nicator"],
 't3': ["Sennachérib", "Assarhaddon", "Sargon II", "Téglath-Phalasar III", "Salmanazar III", "Assurnasirpal II", "Nabopolassar", "Nabonide", "Cambyse II=Cambyse", "Artaxerxès Ier", "Artaxerxès II", "Artaxerxès III", "Ur-Nammu", "Naram-Sin", "Shapur Ier", "Khosro Ier=Chosroès Ier", "Khosro II=Chosroès II", "Ardachir Ier=Ardashir", "Mithridate Ier", "Astyage", "Cyaxare", "Gudea", "Shulgi"],
 't4': ["Rimush", "Manishtushu", "Lugal-zagesi", "Eannatum", "Urukagina=Uruinimgina", "Ibbi-Sin", "Shamshi-Adad Ier", "Zimri-Lim", "Samsu-iluna", "Tukulti-Ninurta Ier", "Téglath-Phalasar Ier", "Salmanazar Ier", "Salmanazar V", "Assur-uballit Ier", "Assur-uballit II", "Amel-Marduk=Evil-Merodach", "Nériglissar", "Nabuchodonosor Ier", "Merodach-Baladan II", "Déiocès", "Cyrus Ier", "Teispès", "Bardiya=Smerdis", "Xerxès II", "Darius II", "Arsès=Artaxerxès IV", "Arsace Ier", "Mithridate II", "Orodes II", "Phraate IV", "Vologèse Ier", "Shapur II", "Bahram V=Bahram Gour", "Yazdgard III=Yazdegerd III", "Kavadh Ier", "Peroz Ier", "Narseh", "Antiochos III"],
 't5': ["Hormizd IV", "Bahram Ier", "Untash-Napirisha", "Kurigalzu", "Burna-Buriash II", "Adad-nirari III"],
 't6': ["Shutruk-Nahhunte"],
}

T['his-antiquite-10'] = {
 't1': ["Cléopâtre=Cléopâtre VII", "Néfertiti", "Hatchepsout", "Boadicée=Boudicca", "Zénobie", "Sappho", "Hypatie", "Messaline", "Agrippine la Jeune=Agrippine", "Livie"],
 't2': ["Xanthippe"],
 't3': ["Néfertari", "Tiyi", "Aspasie", "Olympias", "Roxane", "Poppée", "Julie=Julia", "Octavie", "Fulvie=Fulvia", "Cornélie", "Hélène=Sainte Hélène", "Bérénice", "Arsinoé II", "Agrippine l'Aînée", "Julia Domna", "Phryné", "Artémise Ier"],
 't4': ["Ahmès-Néfertari", "Ankhesenamon", "Tomyris", "Atossa", "Artémise II", "Laïs de Corinthe", "Gorgo", "Teuta", "Antonia la Jeune", "Drusilla", "Livilla", "Calpurnia", "Pompeia", "Porcia", "Servilia", "Clodia", "Faustine la Jeune", "Faustine l'Aînée", "Plotine", "Sabine", "Julia Maesa", "Julia Mamaea", "Galla Placidia", "Pulchérie", "Fausta", "Hortensia", "Sulpicia", "Corinne", "Érinna", "Hipparchia", "Cléopâtre Séléné", "Bérénice II", "Arsinoé IV", "Mariamne", "Salomé", "Hérodiade", "Sobekneferou", "Merneith", "Méritaton", "Kiya", "Monique=Sainte Monique", "Blandine=Sainte Blandine", "Perpétue=Sainte Perpétue"],
 't5': ["Cynané", "Télésilla", "Julia Soaemias", "Domitia Longina", "Marcia", "Terentia", "Tullia", "Cléopâtre Théa", "Égérie", "Paula", "Mélanie l'Ancienne", "Eudoxie", "Aménirdis"],
 't6': ["Sainte Geneviève=Geneviève"],
}

T['his-antiquite-11'] = {
 't1': ["Archimède", "Pythagore", "Euclide", "Thalès", "Hippocrate", "Ptolémée=Claude Ptolémée", "Ératosthène", "Galien", "Aristarque de Samos=Aristarque"],
 't2': ["Imhotep"],
 't3': ["Hipparque", "Héron d'Alexandrie=Héron", "Diophante", "Apollonios de Perga", "Strabon", "Pline l'Ancien", "Vitruve", "Ctésibios", "Eudoxe de Cnide", "Hypatie", "Pythéas", "Hérophile", "Érasistrate", "Dioscoride", "Celse"],
 't4': ["Anaximandre", "Archytas de Tarente", "Philon de Byzance", "Pappus d'Alexandrie", "Théon d'Alexandrie", "Ménechme", "Hippocrate de Chios", "Théétète", "Nicomaque de Gérase", "Ménélaos d'Alexandrie", "Sosigène d'Alexandrie", "Méton", "Callippe", "Conon de Samos", "Séleucos de Séleucie", "Héraclide du Pont", "Marin de Tyr", "Hécatée de Milet", "Soranos d'Éphèse", "Arétée de Cappadoce", "Rufus d'Éphèse", "Frontin", "Pomponius Mela", "Apollodore de Damas", "Théophraste", "Zhang Heng", "Liu Hui", "Posidonios", "Oribase", "Alcméon de Crotone"],
 't5': ["Dinostrate", "Hippasos de Métaponte", "Zénodore", "Cléomède", "Géminos", "Proclus", "Andronicos de Cyrrhus", "Aristyllos", "Timocharis", "Autolycos de Pitane", "Dioclès de Caryste", "Praxagoras", "Asclépiade de Bithynie", "Hypsiclès"],
 't6': ["Ahmès"],
}

T['his-antiquite-12'] = {
 't1': ["Colisée", "Parthénon", "Pyramides de Gizeh=Gizeh/Pyramide de Khéops/Grande Pyramide", "Sphinx de Gizeh=Sphinx", "Pompéi", "Pont du Gard", "Panthéon de Rome=Panthéon", "Pétra", "Forum romain", "Acropole d'Athènes=Acropole"],
 't2': ["Château Saint-Ange=Mausolée d'Hadrien"],
 't3': ["Herculanum", "Ostie=Ostia Antica", "Thermes de Caracalla", "Circus Maximus", "Arc de Constantin", "Arc de Titus", "Colonne Trajane", "Villa d'Hadrien=Villa Hadriana", "Karnak", "Temple de Louxor", "Abou Simbel", "Vallée des Rois", "Saqqarah=Pyramide de Djéser", "Delphes", "Olympie", "Épidaure", "Mycènes", "Cnossos", "Éphèse", "Troie", "Pergame", "Carthage", "Leptis Magna", "Palmyre", "Baalbek", "Jerash", "Masada", "Maison Carrée", "Arènes de Nîmes", "Théâtre antique d'Orange", "Arènes d'Arles", "Paestum", "Vallée des Temples=Agrigente", "Ségeste", "Aqueduc de Ségovie", "Persépolis"],
 't4': ["Ara Pacis", "Dendérah", "Edfou", "Philae", "Kom Ombo", "Deir el-Bahari", "Ramesseum", "Medinet Habou", "Colosses de Memnon", "Abydos", "Dahchour", "Délos", "Akrotiri", "Phaistos", "Vergina", "Didymes", "Aphrodisias", "Hiérapolis=Pamukkale", "Priène", "Milet", "Dougga", "El Djem", "Volubilis", "Timgad", "Djemila", "Sabratha", "Cyrène", "Césarée maritime", "Sélinonte", "Mérida", "Italica", "Butrint", "Glanum", "Vaison-la-Romaine", "Cap Sounion=Temple de Poséidon", "Héphaïstéion=Temple d'Héphaïstos", "Érechthéion", "Odéon d'Hérode Atticus", "Tour des Vents", "Nemrut Dağ", "Pasargades", "Naqsh-e Rostam", "Babylone", "Ziggourat d'Ur=Ur", "Ninive", "Hatra", "Doura-Europos", "Apamée", "Bosra", "Ougarit", "Byblos", "Hattusa", "Aspendos", "Bibliothèque de Celsus"],
 't5': ["Ctésiphon=Taq Kasra", "Nimroud", "Hérodion", "Qumrân", "Gordion", "Sardes", "Termessos", "Pergé", "Xanthos", "Colonne de Pompée", "Pont Julien", "Trophée d'Auguste=Trophée de la Turbie", "Tanis", "Amarna", "Médinet Madi"],
 't6': ["Mur des Lamentations=Mur occidental/Kotel"],
}

T['his-antiquite-13'] = {
 't1': ["Gaule narbonnaise=Narbonnaise/Gallia Narbonensis", "Égypte=Aegyptus", "Judée=Judaea", "Syrie=Syria", "Dacie=Dacia", "Macédoine=Macedonia", "Achaïe=Achaea", "Asie=Asia", "Afrique proconsulaire=Africa", "Sicile=Sicilia"],
 't2': ["Bretagne=Britannia"],
 't3': ["Aquitaine=Aquitania", "Gaule lyonnaise=Lyonnaise/Lugdunensis", "Gaule belgique=Belgique/Belgica", "Germanie inférieure=Germania Inferior", "Germanie supérieure=Germania Superior", "Tarraconaise=Tarraconensis", "Bétique=Baetica", "Lusitanie=Lusitania", "Rhétie=Raetia", "Norique=Noricum", "Pannonie=Pannonia", "Dalmatie=Dalmatia/Illyricum", "Mésie=Moesia", "Thrace=Thracia", "Bithynie et Pont=Bithynie", "Galatie=Galatia", "Cappadoce=Cappadocia", "Cilicie=Cilicia", "Crète et Cyrénaïque=Cyrénaïque/Crète", "Chypre=Cyprus", "Sardaigne et Corse=Sardaigne/Corse", "Numidie=Numidia", "Maurétanie césarienne=Mauretania Caesariensis", "Maurétanie tingitane=Mauretania Tingitana"],
 't4': ["Pannonie supérieure", "Pannonie inférieure", "Mésie supérieure", "Mésie inférieure", "Lycie et Pamphylie=Lycie/Pamphylie", "Arabie pétrée=Arabie/Arabia Petraea", "Épire=Epirus", "Alpes maritimes=Alpes Maritimae", "Alpes cottiennes=Alpes Cottiae", "Alpes pennines=Alpes Poeninae", "Mésopotamie=Mesopotamia", "Arménie=Armenia", "Syrie-Palestine=Syria Palaestina"],
 't5': ["Osrhoène", "Syrie phénicienne=Phénicie", "Syrie coelé=Coelé-Syrie", "Bretagne supérieure", "Bretagne inférieure"],
 't6': ["Assyrie=Assyria"],
}

T['his-antiquite-14'] = {
 't1': ["Lyon=Lugdunum", "Paris=Lutèce/Lutetia", "Marseille=Massalia/Massilia", "Nîmes=Nemausus", "Arles=Arelate", "Bordeaux=Burdigala", "Toulouse=Tolosa", "Narbonne=Narbo Martius", "Fréjus=Forum Julii", "Autun=Augustodunum"],
 't2': ["Saint-Bertrand-de-Comminges=Lugdunum Convenarum"],
 't3': ["Orange=Arausio", "Vienne=Vienna", "Vaison-la-Romaine=Vasio", "Reims=Durocortorum", "Strasbourg=Argentoratum", "Metz=Divodurum", "Besançon=Vesontio", "Saintes=Mediolanum Santonum", "Poitiers=Limonum", "Tours=Caesarodunum", "Bourges=Avaricum", "Orléans=Cenabum/Genabum", "Chartres=Autricum", "Sens=Agedincum", "Clermont-Ferrand=Augustonemetum", "Limoges=Augustoritum", "Périgueux=Vesunna", "Amiens=Samarobriva", "Rouen=Rotomagus", "Aix-en-Provence=Aquae Sextiae", "Antibes=Antipolis", "Nice=Nikaia", "Béziers=Baeterrae", "Carcassonne=Carcaso", "Troyes=Augustobona", "Langres=Andemantunnum", "Cahors=Divona", "Agen=Aginnum", "Toulon=Telo Martius", "Avignon=Avenio", "Valence=Valentia", "Grenoble=Cularo/Gratianopolis", "Dijon=Divio", "Nantes=Condevicnum/Portus Namnetum", "Rennes=Condate", "Boulogne-sur-Mer=Gesoriacum/Bononia"],
 't4': ["Soissons=Augusta Suessionum", "Beauvais=Caesaromagus", "Senlis=Augustomagus", "Meaux=Iatinum", "Évreux=Mediolanum Aulercorum", "Lisieux=Noviomagus Lexoviorum", "Bayeux=Augustodurum", "Vannes=Darioritum", "Angers=Juliomagus", "Le Mans=Vindinum", "Auxerre=Autessiodurum", "Arras=Nemetacum", "Cambrai=Camaracum", "Bavay=Bagacum", "Lillebonne=Juliobona", "Melun=Metlosedum", "Apt=Apta Julia", "Cavaillon=Cabellio", "Carpentras=Carpentorate", "Riez=Reii", "Digne=Dinia", "Sisteron=Segustero", "Embrun=Eburodunum", "Gap=Vapincum", "Die=Dea Augusta", "Vence=Vintium", "Lodève=Luteva", "Uzès=Ucetia", "Agde=Agathé", "Elne=Illiberis", "Albi=Albiga", "Rodez=Segodunum", "Lectoure=Lactora", "Auch=Augusta Auscorum/Elimberris", "Eauze=Elusa", "Dax=Aquae Tarbellicae", "Angoulême=Iculisma", "Chalon-sur-Saône=Cabillonum", "Mâcon=Matisco", "Châlons-en-Champagne=Durocatalaunum", "Toul=Tullum", "Verdun=Virodunum", "Saint-Quentin=Augusta Viromanduorum", "Noyon=Noviomagus", "Coutances=Constantia/Cosedia", "Vichy=Aquae Calidae"],
 't5': ["Alba-la-Romaine=Alba Helviorum", "Saint-Paul-Trois-Châteaux=Augusta Tricastinorum", "Bazas=Cossium", "Néris-les-Bains=Aquae Nerii", "Saverne=Tres Tabernae", "Brumath=Brocomagus", "Mandeure=Epomanduodurum", "Pontoise=Briva Isarae", "Feurs=Forum Segusiavorum", "Roanne=Rodumna", "Argenton-sur-Creuse=Argentomagus", "Jublains=Noviodunum", "Corseul=Fanum Martis", "Carhaix=Vorgium", "Valognes=Alauna", "Thérouanne=Tarvenna", "Aléria=Alalia", "Nevers=Noviodunum Aeduorum/Nevirnum", "Châteaumeillant=Mediolanum"],
 't6': ["Alise-Sainte-Reine=Alésia"],
}

T['his-antiquite-15'] = {
 't1': ["Latin", "Grec ancien", "Sumérien", "Akkadien", "Hittite", "Égyptien ancien", "Étrusque", "Gaulois", "Phénicien"],
 't2': ["Gotique=Gothique"],
 't3': ["Punique", "Vieux-perse", "Avestique", "Élamite", "Osque", "Ombrien", "Ibère", "Celtibère", "Thrace", "Dace", "Illyrien", "Hourrite", "Louvite", "Lycien", "Lydien", "Phrygien", "Ougaritique", "Grec mycénien=Mycénien", "Scythe", "Parthe", "Sogdien", "Bactrien", "Moabite", "Méroïtique", "Éblaïte"],
 't4': ["Copte", "Falisque", "Vénète", "Messapien", "Lépontique", "Tartessien", "Ourartéen", "Palaïte", "Carien", "Pisidien", "Sidétique", "Hatti=Hattique", "Kassite", "Amorrite", "Ammonite", "Édomite", "Sabéen", "Minéen", "Qatabanique", "Hadramoutique", "Nabatéen", "Palmyrénien", "Mède", "Moyen-perse=Pehlevi", "Khotanais", "Macédonien antique", "Galate"],
 't5': ["Picte", "Ligure", "Sicule", "Élyme", "Rhétique", "Numide=Libyque", "Guèze"],
 't6': ["Tokharien"],
}
