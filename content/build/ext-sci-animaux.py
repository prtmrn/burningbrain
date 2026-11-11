# Extension Sciences & Nature — sous-domaine ANIMAUX (classes, habitats, records, comportements, élevage).
PROMPTS = [
 {'id': 'sci-animaux-01', 'text': "Nomme une race bovine (race de vache)"},
 {'id': 'sci-animaux-02', 'text': "Nomme une race de cheval, de poney ou d'âne"},
 {'id': 'sci-animaux-03', 'text': "Nomme une race de poule"},
 {'id': 'sci-animaux-04', 'text': "Nomme une race de mouton ou de chèvre"},
 {'id': 'sci-animaux-05', 'text': "Nomme un rongeur"},
 {'id': 'sci-animaux-06', 'text': "Nomme un primate"},
 {'id': 'sci-animaux-07', 'text': "Nomme un mammifère de l'ordre des carnivores (Carnivora)"},
 {'id': 'sci-animaux-08', 'text': "Nomme un rapace (oiseau de proie diurne ou nocturne)"},
 {'id': 'sci-animaux-09', 'text': "Nomme un mollusque"},
 {'id': 'sci-animaux-10', 'text': "Nomme un crustacé"},
 {'id': 'sci-animaux-11', 'text': "Nomme un animal venimeux"},
 {'id': 'sci-animaux-12', 'text': "Nomme un animal migrateur"},
 {'id': 'sci-animaux-13', 'text': "Nomme une espèce animale éteinte (hors dinosaures)"},
 {'id': 'sci-animaux-14', 'text': "Nomme un verbe désignant le cri d'un animal"},
 {'id': 'sci-animaux-15', 'text': "Nomme un animal vivant dans les régions polaires (Arctique ou Antarctique)"},
]
T = {}

T['sci-animaux-01'] = {
 't1': ["Prim'Holstein=Holstein", "Charolaise=Charolais", "Limousine", "Normande", "Montbéliarde", "Salers", "Aubrac", "Blonde d'Aquitaine"],
 't2': ["Ankole-Watusi=Watusi/Ankole"],
 't3': ["Angus=Aberdeen Angus", "Hereford", "Simmental", "Jersiaise=Jersey", "Abondance", "Tarentaise=Tarine", "Gasconne", "Parthenaise", "Bazadaise", "Highland Cattle=Highland", "Brune des Alpes=Brune/Brown Swiss", "Bretonne pie noir", "Rouge flamande", "Vosgienne", "Raço di Biou=Camargue/Camarguaise", "Brahman", "Wagyu", "Texas Longhorn=Longhorn", "Blanc Bleu Belge=Belge Blanc Bleu/BBB"],
 't4': ["Ferrandaise", "Maraîchine", "Lourdaise", "Villard-de-Lans=Villarde", "Mirandaise", "Béarnaise", "Casta=Aure et Saint-Girons", "Armoricaine", "Froment du Léon", "Bordelaise", "Rouge des prés=Maine-Anjou", "Pie rouge des plaines", "Guernesey=Guernsey", "Ayrshire", "Galloway", "Shorthorn=Durham", "Dexter", "Chianina", "Marchigiana", "Piémontaise=Piemontese", "Romagnola", "Pinzgauer", "Rouge danoise=Danish Red", "Santa Gertrudis", "Nelore=Nellore", "Gir=Gyr", "Sahiwal", "Lidia=Toro de lidia/Taureau de combat"],
 't5': ["Saosnoise", "Bleue du Nord", "Corse", "Betizu", "Marine landaise", "Kerry", "Red Poll", "Évolénarde=Évolène", "N'Dama", "Kouri", "Baoulé", "Podolica"],
 't6': ["Hérens=Race d'Hérens"],
}

T['sci-animaux-02'] = {
 't1': ["Pur-sang anglais=Pur-sang/Thoroughbred", "Pur-sang arabe=Arabe/Cheval arabe", "Frison", "Percheron", "Shetland=Poney Shetland", "Lusitanien", "Camargue=Camarguais/Cheval Camargue", "Appaloosa", "Mustang"],
 't2': ["Paint Horse=Paint/American Paint Horse"],
 't3': ["Selle français=SF", "Trotteur français", "Quarter Horse=American Quarter Horse", "Pure race espagnole=PRE/Andalou/Pura Raza Española", "Haflinger", "Fjord=Fjord norvégien", "Cheval islandais=Islandais", "Mérens=Ariégeois", "Boulonnais", "Ardennais", "Trait breton=Breton", "Comtois", "Trait poitevin mulassier=Poitevin mulassier", "Connemara", "Welsh=Poney Welsh", "Pottok", "Lipizzan=Lipizzaner", "Akhal-Teke", "Shire", "Clydesdale", "Hanovrien", "Trakehner", "Cheval mongol=Mongol", "Baudet du Poitou=Âne du Poitou", "Barbe=Cheval barbe"],
 't4': ["Holsteiner", "Oldenbourg", "KWPN=Cheval de sport néerlandais", "Anglo-arabe", "Auxois", "Trait du Nord", "Cob normand", "Poney landais=Landais", "Castillonnais", "Henson", "Konik", "Dartmoor", "Exmoor", "New Forest", "Poney Highland", "Tennessee Walker=Tennessee Walking Horse", "Morgan", "Standardbred=Trotteur américain", "Criollo", "Paso Fino", "Marwari", "Knabstrup", "Noriker", "Suffolk Punch", "Trait belge=Brabançon", "Hackney", "Âne de Provence", "Âne des Pyrénées", "Grand Noir du Berry", "Âne normand", "Âne du Cotentin"],
 't5': ["Kladruber", "Karabakh", "Budyonny", "Trotteur Orlov=Orlov", "Sorraia", "Garrano", "Asturcón", "Kathiawari", "Nonius", "Shagya", "Fell=Poney Fell", "Dales=Poney Dales"],
 't6': ["Falabella"],
}

T['sci-animaux-03'] = {
 't1': ["Marans", "Gauloise dorée=Gauloise", "Bresse=Bresse-Gauloise/Poule de Bresse", "Sussex", "Brahma", "Leghorn", "Orpington", "Soie=Poule soie/Nègre-soie", "Wyandotte", "Rhode Island=Rhode Island Red"],
 't2': ["Coucou de Rennes"],
 't3': ["Faverolles", "Houdan", "Plymouth Rock", "Cochin", "Pékin", "Sebright", "Araucana", "Ayam Cemani", "Australorp", "New Hampshire", "La Flèche", "Crèvecœur", "Barbezieux", "Padoue", "Hollandaise huppée=Hollandaise", "Barbu d'Uccle", "Minorque", "Andalouse bleue=Andalouse", "Combattant indien=Indian Game/Cornish", "Sumatra"],
 't4': ["Gâtinaise", "Bourbonnaise", "Gournay", "Mantes", "Cou nu du Forez", "Géline de Touraine=Géline/Noire de Touraine", "Meusienne", "Contres", "Merlerault", "Caumont", "Estaires", "Bourbourg", "Coucou de France", "Charollaise", "Le Mans", "Pavilly", "Alsacienne", "Ardennaise", "Barnevelder", "Welsumer", "Dorking", "Appenzeller", "Bielefelder", "Vorwerk", "Lakenfelder", "Barbu d'Anvers", "Barbu de Watermael", "Braekel=Brakel", "Coucou de Malines=Malines", "Ancona"],
 't5': ["Java", "Malais", "Shamo", "Yokohama", "Phénix", "Chabo=Nagasaki", "Serama", "Aseel", "Orloff", "Sultane", "Cou nu de Transylvanie=Cou nu", "Gasconne", "Noire du Berry"],
 't6': ["Onagadori"],
}

T['sci-animaux-04'] = {
 't1': ["Mérinos", "Texel", "Suffolk", "Lacaune", "Île-de-France", "Mouton d'Ouessant=Ouessant", "Alpine=Alpine chamoisée", "Saanen", "Angora=Chèvre angora", "Poitevine"],
 't2': ["Cachemire=Chèvre du Cachemire"],
 't3': ["Bleu du Maine", "Rouge de l'Ouest", "Charollais", "Berrichon du Cher", "Rava", "Romanov", "Préalpes du Sud", "Mérinos d'Arles", "Manech tête noire", "Manech tête rousse", "Basco-béarnaise", "Solognote", "Southdown", "Shropshire", "Hampshire", "Cheviot", "Scottish Blackface=Blackface", "Soay", "Karakul", "Mouton de Jacob=Jacob", "Vendéen", "Boer", "Anglo-nubienne=Nubienne", "Toggenburg", "Chèvre des Fossés", "Chèvre du Rove=Rove", "Pyrénéenne", "Provençale"],
 't4': ["Rouge du Roussillon", "Tarasconnaise", "Castillonnaise", "Thônes et Marthod", "Landaise", "Avranchin", "Cotentin", "Roussin de la Hague", "Barbarine", "Ouled Djellal", "Sardi", "Awassi", "Dorper", "Romney", "Corriedale", "Lincoln", "Border Leicester", "Wensleydale", "Herdwick", "Shetland", "Finnois=Finnsheep", "Mouton des Landes de Bretagne", "Raïole", "Caussenarde des garrigues", "Blanche du Massif central", "Noire du Velay", "Bizet", "Grivette", "Romane", "Chèvre corse", "Chèvre lorraine", "Chèvre du Massif central", "Chèvre naine=Chèvre naine africaine/Chèvre pygmée"],
 't5': ["Murciana", "Maltaise", "Damasquine=Damascus/Shami", "Golden Guernsey", "Bagot", "Kiko", "LaMancha", "Col noir du Valais=Valais à col noir", "Berrichon de l'Indre", "Belle-Île"],
 't6': ["Chèvre myotonique=Chèvre évanouie/Fainting goat"],
}

T['sci-animaux-05'] = {
 't1': ["Souris", "Rat", "Écureuil", "Hamster", "Castor", "Marmotte", "Cochon d'Inde=Cobaye", "Chinchilla", "Capybara=Cabiai"],
 't2': ["Porc-épic"],
 't3': ["Gerbille", "Loir", "Lérot", "Muscardin", "Campagnol", "Mulot", "Ragondin=Coypou", "Rat musqué=Ondatra", "Gerboise", "Tamia=Suisse/Écureuil de Corée", "Chien de prairie", "Lemming", "Octodon=Dègue", "Agouti", "Paca", "Hamster doré=Hamster syrien", "Écureuil roux", "Écureuil gris", "Polatouche=Écureuil volant", "Spermophile", "Rat noir", "Surmulot=Rat brun/Rat d'égout", "Mara=Lièvre de Patagonie", "Viscache", "Hamster russe"],
 't4': ["Campagnol des champs", "Rat taupier=Campagnol terrestre", "Campagnol amphibie=Rat d'eau", "Campagnol roussâtre", "Campagnol des neiges", "Rat des moissons=Souris des moissons", "Hamster d'Europe=Grand hamster/Hamster commun", "Gaufre=Géomys", "Rat-kangourou", "Écureuil fouisseur", "Hamster de Roborovski=Roborovski", "Souris épineuse=Acomys", "Rat géant de Gambie=Cricétome", "Aulacode=Rat de canne", "Écureuil de Barbarie"],
 't5': ["Anomalure", "Lièvre sauteur=Pédète", "Hutia", "Pacarana", "Rat des bambous", "Gundi", "Aplodontie=Castor de montagne"],
 't6': ["Rat-taupe nu=Hétérocéphale"],
}

T['sci-animaux-06'] = {
 't1': ["Gorille", "Chimpanzé", "Orang-outan", "Babouin", "Macaque", "Lémurien=Maki", "Bonobo", "Gibbon", "Ouistiti", "Mandrill"],
 't2': ["Être humain=Homme/Humain/Homo sapiens"],
 't3': ["Capucin=Sapajou", "Atèle=Singe-araignée", "Singe hurleur=Hurleur/Alouate", "Tamarin", "Saïmiri=Singe-écureuil", "Colobe", "Nasique", "Gélada", "Magot=Macaque de Barbarie", "Macaque rhésus=Rhésus", "Macaque japonais", "Ouakari", "Tarsier", "Loris", "Galago", "Indri", "Propithèque=Sifaka", "Maki catta", "Siamang", "Singe vert=Vervet", "Patas", "Langur", "Entelle", "Mangabey=Cercocèbe", "Drill", "Cercopithèque"],
 't4': ["Douc", "Rhinopithèque", "Talapoin", "Titi", "Saki", "Douroucouli=Singe de nuit/Aotus", "Lagotriche=Singe laineux", "Tamarin-lion doré=Tamarin lion/Singe-lion", "Potto", "Hapalémur=Lémur des bambous", "Microcèbe", "Vari", "Muriqui=Brachyte", "Macaque crabier", "Lépilémur"],
 't6': ["Aye-aye"],
}

T['sci-animaux-07'] = {
 't1': ["Lion", "Tigre", "Loup", "Ours", "Renard", "Chat", "Chien", "Léopard=Panthère", "Guépard", "Hyène"],
 't2': ["Panda géant=Panda"],
 't3': ["Jaguar", "Puma=Cougar", "Lynx", "Ocelot", "Serval", "Caracal", "Panthère des neiges=Once/Léopard des neiges", "Panthère nébuleuse", "Chat sauvage", "Blaireau", "Loutre", "Belette", "Hermine", "Fouine", "Martre", "Putois", "Furet", "Vison", "Glouton=Carcajou", "Raton laveur", "Coati", "Mouffette=Moufette/Sconse", "Mangouste", "Suricate", "Genette", "Civette", "Chacal", "Coyote", "Fennec", "Dingo", "Lycaon", "Ours brun", "Ours polaire=Ours blanc", "Ours noir", "Panda roux", "Phoque", "Otarie", "Morse", "Lion de mer", "Éléphant de mer"],
 't4': ["Kinkajou", "Fossa", "Ratel", "Zibeline", "Tayra", "Grison", "Loutre de mer", "Ours à lunettes", "Ours lippu", "Ours malais", "Ours à collier=Ours noir d'Asie", "Protèle", "Manul=Chat de Pallas", "Chat des sables", "Chat à pieds noirs", "Margay", "Jaguarondi", "Chat pêcheur", "Chat-léopard du Bengale=Chat léopard", "Chien viverrin", "Renard polaire=Renard arctique", "Otocyon", "Loup d'Abyssinie", "Dhole=Cuon", "Loup à crinière", "Léopard de mer", "Phoque moine", "Raton crabier"],
 't5': ["Linsang"],
 't6': ["Binturong"],
}

T['sci-animaux-08'] = {
 't1': ["Aigle", "Faucon", "Buse", "Vautour", "Hibou", "Chouette", "Condor", "Épervier", "Milan"],
 't2': ["Serpentaire=Messager sagittaire/Secrétaire"],
 't3': ["Aigle royal", "Pygargue à tête blanche=Aigle à tête blanche", "Faucon pèlerin", "Faucon crécerelle=Crécerelle", "Buse variable", "Milan royal", "Milan noir", "Busard", "Circaète Jean-le-Blanc=Circaète", "Balbuzard pêcheur=Balbuzard", "Gypaète barbu=Gypaète", "Vautour fauve", "Vautour moine", "Percnoptère=Vautour percnoptère", "Condor des Andes", "Condor de Californie", "Harpie féroce=Harpie", "Autour des palombes=Autour", "Bondrée apivore=Bondrée", "Effraie des clochers=Effraie/Chouette effraie", "Chouette hulotte=Hulotte", "Chevêche d'Athéna=Chevêche", "Hibou moyen-duc=Moyen-duc", "Petit-duc=Hibou petit-duc", "Grand-duc d'Europe=Grand-duc", "Harfang des neiges=Harfang", "Faucon gerfaut=Gerfaut", "Urubu", "Caracara"],
 't4': ["Faucon hobereau=Hobereau", "Faucon émerillon=Émerillon", "Faucon crécerellette=Crécerellette", "Pygargue à queue blanche", "Aigle botté", "Aigle de Bonelli", "Aigle impérial", "Pithécophage=Aigle des singes", "Bateleur", "Chouette lapone", "Chouette de l'Oural", "Chouette de Tengmalm=Nyctale de Tengmalm", "Chevêchette d'Europe=Chevêchette", "Hibou des marais", "Busard Saint-Martin", "Busard des roseaux", "Busard cendré", "Faucon lanier", "Faucon sacre", "Faucon kobez", "Élanion blanc", "Aigle criard", "Aigle pomarin", "Aigle ravisseur", "Aigle martial", "Vautour oricou", "Sarcoramphe roi=Vautour royal", "Buse pattue", "Buse féroce", "Buse à queue rousse", "Grand-duc d'Amérique", "Chouette rayée", "Pygargue de Steller", "Pygargue vocifer"],
 't6': ["Chevêche des terriers=Chouette des terriers"],
}

T['sci-animaux-09'] = {
 't1': ["Escargot", "Limace", "Huître", "Moule", "Poulpe=Pieuvre", "Seiche", "Calmar=Calamar/Encornet", "Coquille Saint-Jacques=Saint-Jacques"],
 't2': ["Taret"],
 't3': ["Bulot=Buccin", "Bigorneau", "Palourde", "Coque", "Couteau", "Ormeau=Haliotide", "Patelle=Bernique", "Praire", "Pétoncle", "Clam", "Nautile", "Argonaute", "Escargot de Bourgogne", "Petit-gris", "Achatine=Escargot géant africain", "Huître perlière", "Calmar géant", "Bénitier=Tridacne", "Cône", "Porcelaine=Cyprée", "Murex=Rocher", "Lambi=Strombe", "Nudibranche", "Lièvre de mer=Aplysie", "Vernis", "Amande de mer", "Telline"],
 't4': ["Limnée", "Planorbe", "Arion=Limace rouge", "Limace léopard", "Chiton=Polyplacophore", "Dentale", "Pholade", "Datte de mer", "Grande nacre=Pinna", "Moule zébrée", "Mulette perlière", "Anodonte", "Mactre", "Calmar colossal", "Vampire des abysses=Vampyroteuthis", "Pieuvre à anneaux bleus=Poulpe à anneaux bleus", "Spirule", "Paludine=Vivipare", "Escargot des bois", "Ampullaire", "Turritelle", "Natice", "Troque", "Pourpre", "Janthine", "Ptéropode=Papillon de mer", "Sépiole", "Pieuvre géante du Pacifique"],
 't6': ["Glaucus=Dragon bleu/Glaucus atlanticus"],
}

T['sci-animaux-10'] = {
 't1': ["Crabe", "Homard", "Langouste", "Langoustine", "Crevette", "Écrevisse", "Tourteau=Dormeur", "Araignée de mer"],
 't2': ["Cloporte"],
 't3': ["Étrille", "Bernard-l'ermite=Pagure", "Krill", "Gambas", "Crevette grise", "Bouquet=Crevette rose", "Balane=Gland de mer", "Pouce-pied=Pousse-pied", "Anatife", "Crabe vert=Crabe enragé", "Crabe des cocotiers=Crabe de cocotier", "Crabe royal=Crabe de Kamtchatka/King crab", "Crabe des neiges", "Crabe bleu", "Crabe violoniste", "Cigale de mer", "Squille=Crevette-mante/Mante de mer", "Daphnie=Puce d'eau", "Gammare", "Talitre=Puce de mer", "Artémia", "Triops", "Copépode", "Crabe chinois=Crabe chinois à mitaines"],
 't4': ["Cyclope", "Aselle", "Crabe-araignée géant=Crabe géant du Japon", "Écrevisse de Louisiane=Écrevisse rouge de Louisiane", "Écrevisse américaine", "Écrevisse à pattes blanches", "Écrevisse à pattes rouges", "Écrevisse signal=Écrevisse de Californie", "Crabe nageur", "Crabe fantôme=Ocypode", "Crabe rouge de l'île Christmas=Crabe de Noël", "Galathée", "Ostracode", "Ligie", "Crevette nordique=Crevette boréale", "Crevette tigrée", "Caramote=Crevette impériale", "Crevette nettoyeuse", "Crevette-pistolet"],
 't5': ["Pou de baleine", "Argule"],
 't6': ["Sacculine"],
}

T['sci-animaux-11'] = {
 't1': ["Vipère", "Cobra", "Scorpion", "Abeille", "Guêpe", "Méduse", "Mamba=Mamba noir", "Veuve noire", "Crotale=Serpent à sonnette", "Frelon"],
 't2': ["Ornithorynque"],
 't3': ["Taïpan", "Mamba vert", "Cobra royal=Hamadryade", "Vipère aspic=Aspic", "Vipère péliade=Péliade", "Vipère heurtante", "Serpent corail", "Fer-de-lance=Bothrops", "Vipère du Gabon", "Vipère à cornes=Céraste", "Mocassin d'eau", "Serpent marin=Serpent de mer/Hydrophis", "Héloderme=Monstre de Gila", "Dragon de Komodo=Varan de Komodo", "Raie pastenague=Pastenague", "Poisson-pierre=Synancée", "Rascasse=Poisson-scorpion", "Poisson-lion=Rascasse volante", "Vive", "Cuboméduse=Méduse-boîte/Guêpe de mer", "Physalie=Galère portugaise", "Cône", "Pieuvre à anneaux bleus=Poulpe à anneaux bleus", "Mygale", "Scolopendre", "Bourdon", "Tarentule", "Recluse brune"],
 't4': ["Atrax=Araignée à toile en entonnoir", "Araignée banane=Phoneutria/Araignée errante du Brésil", "Scorpion languedocien", "Fourmi de feu", "Fourmi balle de fusil=Paraponera", "Solénodon", "Crossope=Musaraigne aquatique", "Anémone de mer", "Corail de feu", "Couleuvre de Montpellier", "Boomslang", "Bongare=Krait", "Vipère de Russell", "Serpent-tigre", "Serpent brun", "Cobra cracheur", "Irukandji"],
 't6': ["Loris lent"],
}

T['sci-animaux-12'] = {
 't1': ["Hirondelle", "Cigogne", "Saumon", "Anguille", "Gnou", "Grue", "Oie cendrée", "Papillon monarque=Monarque", "Baleine à bosse=Mégaptère", "Caribou=Renne"],
 't2': ["Belle-Dame=Vanesse des chardons"],
 't3': ["Martinet noir=Martinet", "Coucou gris=Coucou", "Sterne arctique", "Rossignol philomèle=Rossignol", "Loriot d'Europe=Loriot", "Huppe fasciée=Huppe", "Guêpier d'Europe=Guêpier", "Caille des blés=Caille", "Tourterelle des bois", "Bernache cravant", "Milan noir", "Bondrée apivore", "Balbuzard pêcheur=Balbuzard", "Cigogne noire", "Barge rousse", "Bécasseau maubèche", "Pluvier doré", "Fauvette à tête noire", "Truite de mer", "Alose", "Lamproie marine", "Thon rouge", "Tortue luth", "Tortue caouanne", "Baleine grise", "Baleine bleue=Rorqual bleu", "Zèbre", "Antilope saïga=Saïga", "Hareng", "Requin-baleine", "Grand requin blanc", "Oie des neiges", "Bécasse des bois=Bécasse"],
 't4': ["Circaète Jean-le-Blanc", "Puffin des Anglais", "Puffin fuligineux", "Rougequeue à front blanc", "Gobemouche gris", "Bergeronnette printanière", "Pipit des arbres", "Engoulevent d'Europe=Engoulevent", "Torcol fourmilier=Torcol", "Pie-grièche écorcheur", "Rousserolle effarvatte", "Phragmite des joncs", "Pouillot fitis", "Esturgeon", "Gazelle de Thomson", "Noctule commune=Noctule", "Pipistrelle de Nathusius", "Moro-sphinx=Sphinx colibri", "Éléphant de mer", "Grive mauvis", "Pinson du Nord", "Cygne de Bewick=Cygne siffleur", "Grue du Canada", "Colibri roux"],
 't5': ["Pantala flavescens=Libellule globe-trotter"],
 't6': ["Crabe rouge de l'île Christmas=Crabe de Noël"],
}

T['sci-animaux-13'] = {
 't1': ["Mammouth=Mammouth laineux", "Dodo=Dronte", "Smilodon=Tigre à dents de sabre", "Mégalodon", "Rhinocéros laineux", "Aurochs", "Thylacine=Tigre de Tasmanie/Loup de Tasmanie"],
 't2': ["Ptérodactyle"],
 't3': ["Grand pingouin", "Moa", "Ours des cavernes", "Lion des cavernes", "Mégacéros=Cerf géant/Élan irlandais", "Mégathérium=Paresseux géant", "Glyptodonte", "Pigeon migrateur=Tourte voyageuse", "Rhytine de Steller=Vache de mer de Steller", "Couagga=Quagga", "Tarpan", "Bouquetin des Pyrénées", "Ichtyosaure", "Plésiosaure", "Mosasaure", "Ammonite", "Trilobite", "Dimétrodon", "Ptéranodon", "Mastodonte", "Æpyornis=Oiseau-éléphant", "Homme de Néandertal=Néandertal/Néandertalien", "Australopithèque", "Homo erectus", "Tigre de Java", "Tigre de Bali", "Tigre de la Caspienne", "Phoque moine des Caraïbes", "Titanoboa", "Sarcosuchus"],
 't4': ["Paraceratherium=Indricotherium", "Deinotherium", "Perruche de Caroline", "Huia", "Solitaire de Rodrigues", "Loup des Falkland=Warrah", "Crapaud doré", "Ours de l'Atlas", "Hippotrague bleu=Antilope bleue", "Canard du Labrador", "Aigle de Haast", "Arsinoitherium", "Andrewsarchus", "Dunkleosteus", "Anomalocaris", "Euryptéride=Scorpion de mer", "Meganeura", "Arthropleura", "Hallucigenia", "Pakicetus", "Basilosaurus", "Ambulocetus", "Gigantopithèque", "Diprotodon", "Thylacoleo=Lion marsupial", "Macrauchenia", "Toxodon", "Elasmotherium=Licorne de Sibérie", "Phorusrhacos=Oiseau-terreur", "Gastornis=Diatryma", "Deinosuchus", "Nothosaure", "Tanystropheus", "Lystrosaurus"],
 't6': ["Tortue de l'île Pinta=Tortue de Pinta"],
}

T['sci-animaux-14'] = {
 't1': ["Aboyer", "Miauler", "Rugir", "Hennir", "Meugler", "Bêler", "Barrir", "Braire", "Caqueter", "Coasser"],
 't2': ["Blatérer"],
 't3': ["Mugir", "Beugler", "Bramer", "Grogner", "Hurler", "Japper", "Glapir", "Croasser", "Cancaner", "Roucouler", "Hululer=Ululer", "Gazouiller", "Siffler", "Pépier", "Piailler", "Glousser", "Feuler", "Ronronner", "Bourdonner", "Striduler", "Jacasser", "Jaser", "Chanter", "Couiner", "Grouiner", "Cacarder", "Chuinter", "Piauler", "Chevroter", "Criailler", "Glouglouter"],
 't4': ["Glatir", "Trompeter=Trompetter", "Nasiller", "Clabauder", "Vagir", "Craqueter", "Claqueter", "Coqueriquer", "Huer", "Cajoler", "Grailler", "Chicoter", "Raire=Réer", "Rauquer", "Bégueter"],
 't5': ["Grisoller", "Tirelirer", "Cacaber", "Carcailler=Courcailler", "Fringoter", "Ramager", "Coucouler", "Grésiller"],
 't6': ["Zinzinuler"],
}

T['sci-animaux-15'] = {
 't1': ["Ours polaire=Ours blanc", "Manchot empereur", "Phoque", "Morse", "Renard polaire=Renard arctique/Isatis", "Narval", "Béluga", "Harfang des neiges=Harfang", "Renne=Caribou", "Orque=Épaulard"],
 't2': ["Moustique"],
 't3': ["Manchot Adélie", "Manchot papou", "Manchot à jugulaire", "Bœuf musqué", "Lièvre arctique", "Loup arctique", "Lemming", "Baleine boréale", "Phoque annelé", "Phoque barbu", "Phoque du Groenland", "Phoque à capuchon", "Phoque de Weddell", "Phoque crabier", "Léopard de mer", "Sterne arctique", "Eider à duvet", "Oie des neiges", "Labbe=Skua", "Krill antarctique=Krill", "Requin du Groenland", "Glouton=Carcajou", "Faucon gerfaut=Gerfaut", "Bruant des neiges", "Lagopède alpin=Lagopède", "Hermine"],
 't4': ["Gorfou macaroni", "Éléphant de mer austral", "Otarie à fourrure antarctique", "Mergule nain", "Guillemot de Brünnich", "Mouette ivoire", "Goéland bourgmestre", "Eider à tête grise", "Bernache cravant", "Pétrel des neiges", "Morue polaire=Morue arctique", "Poisson des glaces", "Macareux moine", "Fulmar boréal=Fulmar", "Mouette tridactyle", "Bécasseau maubèche", "Damier du Cap", "Pétrel antarctique", "Baleine bleue=Rorqual bleu", "Petit rorqual=Baleine de Minke", "Phoque de Ross", "Plectrophane lapon", "Spermophile arctique", "Calmar colossal"],
 't6': ["Tardigrade"],
}
