# Arts & Littérature (arts-litterature) - Mythes, légendes, religions, philosophie et langue française
PROMPTS = [
    {'id': 'art-mythes-01', 'text': 'Nomme une figure de style (rhétorique)'},
    {'id': 'art-mythes-02', 'text': 'Nomme une onomatopée française'},
    {'id': 'art-mythes-03', 'text': 'Nomme un personnage de la légende du roi Arthur et de la Table ronde'},
    {'id': 'art-mythes-04', 'text': 'Nomme une créature fantastique du folklore ou de la fantasy (hors mythologie grecque)'},
    {'id': 'art-mythes-05', 'text': "Nomme un animal cité dans une expression française courante"},
    {'id': 'art-mythes-06', 'text': 'Nomme une locution latine employée en français'},
    {'id': 'art-mythes-07', 'text': "Nomme un mot français d'origine arabe"},
    {'id': 'art-mythes-08', 'text': "Nomme un mot français d'origine italienne"},
    {'id': 'art-mythes-09', 'text': "Nomme un mot français d'origine anglaise"},
    {'id': 'art-mythes-10', 'text': 'Nomme une fête religieuse (toutes religions)'},
    {'id': 'art-mythes-11', 'text': 'Nomme un ordre ou une congrégation religieuse'},
    {'id': 'art-mythes-12', 'text': 'Nomme un terme de grammaire française'},
    {'id': 'art-mythes-13', 'text': 'Nomme un courant de pensée ou une doctrine philosophique en « -isme »'},
    {'id': 'art-mythes-14', 'text': 'Nomme un héros de légende ou de folklore (hors mythologie grecque et légende arthurienne)'},
    {'id': 'art-mythes-15', 'text': 'Nomme un lieu saint ou un lieu de pèlerinage (toutes religions)'},
]

T = {}

T['art-mythes-01'] = {
    't1': ["Comparaison", "Hyperbole=exagération", "Antithèse", "Personnification", "Métonymie", "Litote", "Allitération", "Oxymore=oxymoron", "Euphémisme"],
    't2': ["Métaphore"],
    't3': ["Ironie", "Anaphore", "Assonance", "Synecdoque", "Périphrase", "Gradation", "Chiasme", "Paradoxe", "Question rhétorique=interrogation rhétorique", "Accumulation", "Énumération", "Apostrophe", "Prosopopée", "Allégorie", "Répétition", "Pléonasme"],
    't4': ["Zeugme=zeugma", "Hypallage", "Parallélisme", "Asyndète", "Polysyndète", "Épanorthose", "Anadiplose", "Épiphore", "Antiphrase", "Paronomase", "Tautologie", "Ellipse", "Anacoluthe", "Hyperbate", "Aposiopèse=suspension", "Prétérition", "Antonomase", "Comparaison métaphorique", "Exclamation"],
    't5': ["Syllepse", "Métalepse", "Catachrèse", "Épanalepse", "Symploque", "Hendiadyn=hendiadys", "Isocolon", "Paralipse", "Anastrophe", "Prolepse", "Brachylogie", "Diaphore", "Tmèse", "Hypotypose", "Épiphonème", "Polyptote", "Chleuasme", "Épizeuxe=épizeuxis", "Antanaclase", "Diérèse", "Synérèse"],
    't6': ["Adynaton"],
}

T['art-mythes-02'] = {
    't1': ["Boum", "Plouf", "Ouaf=wouaf", "Cocorico", "Toc toc=toc", "Vroum", "Splash", "Tic-tac", "Bang"],
    't2': ["Miaou=miaulement"],
    't3': ["Crac", "Paf", "Pan", "Clap", "Ding", "Dring", "Bim", "Badaboum", "Atchoum", "Hop", "Aïe", "Pouet", "Meuh", "Cot cot=cot", "Coin coin", "Cui-cui", "Hi-han", "Grr", "Glouglou", "Smack", "Crash", "Bip", "Ronron", "Pouf", "Patatras", "Vlan", "Clic", "Boing", "Snif", "Ouin", "Pin-pon", "Tut tut", "Brrr", "Chut"],
    't4': ["Hou hou=hou", "Zzz", "Pschitt", "Tchoutchou", "Tap tap", "Clac", "Ploc", "Flac", "Pof", "Teuf-teuf", "Hum", "Pfff", "Hic", "Ouille", "Bêê", "Cou-cou", "Glagla", "Bzzz", "Cric crac=cric-crac", "Cuicui", "Couac", "Bing", "Ding dong=ding-dong", "Dong", "Gling", "Plic ploc=plic-ploc", "Vzzz", "Kiss", "Wouf", "Rrrr"],
    't5': ["Vlouf", "Schlak", "Crouic", "Rataplan", "Boum badaboum", "Cataclop", "Floc", "Zim boum", "Tchac", "Tagada", "Fouiiit", "Gloups", "Froufrou", "Ouah", "Tchin-tchin"],
    't6': ["Clopin-clopant"],
}

T['art-mythes-03'] = {
    't1': ["Arthur=roi Arthur", "Lancelot=Lancelot du Lac", "Guenièvre=Guinevere", "Perceval=Parsifal", "Morgane=Morgane le Fay/Morgan le Fay", "Gauvain=Gawain", "Viviane=Dame du Lac/Nimue", "Tristan", "Iseut=Yseult/Isolde"],
    't2': ["Merlin=Merlin l'Enchanteur"],
    't3': ["Galaad=Galahad", "Mordred", "Keu=Kay", "Bohort=Bors", "Yvain=Owain", "Bédivère=Bedivere", "Uther Pendragon=Uther/Uter Pendragon", "Léodagan=Leodegrance", "Ygerne=Igraine/Ygraine", "Roi Pêcheur=Roi Méhaigné", "Marc de Cornouailles=roi Marc/Mark", "Brangien=Brangane", "Morholt=Morhout", "Pellinore", "Lot d'Orcanie=roi Lot"],
    't4': ["Blanchefleur", "Erec", "Énide=Enide", "Calogrenant", "Méléagant", "Agravain=Agravaine", "Gaheris", "Palamède", "Lamorak", "Pellès=Pelles", "Lionel", "Ban de Bénoïc=roi Ban", "Claudas", "Girflet=Griflet", "Dinadan", "Sagremor", "Gareth=Guerrehet", "Urien", "Elaine=Elaine d'Astolat/Dame de Shalott", "Gornemant de Goort", "Kahedin"],
    't5': ["Lucan", "Yder", "Tor", "Hoël", "Mordrain", "Nascien", "Joseph d'Arimathie", "Pelléas", "Bademagus=Bademagu", "Segwarides", "Ségurant", "Arnive", "Keux d'Estraux", "Lucan le Bouteiller", "Hector des Mares", "Bleoberis"],
    't6': ["Dagonet"],
}

T['art-mythes-04'] = {
    't1': ["Licorne", "Loup-garou=lycanthrope", "Fée", "Elfe", "Troll", "Zombie", "Fantôme=spectre", "Sirène", "Dragon"],
    't2': ["Vampire"],
    't3': ["Gobelin", "Ogre", "Nain", "Géant", "Yéti", "Golem", "Lutin", "Farfadet", "Gnome", "Orque", "Kraken", "Basilic", "Phénix", "Banshee", "Djinn=génie", "Momie", "Gargouille", "Succube", "Incube", "Lépréchaun=leprechaun", "Wendigo", "Ondine", "Sylphe", "Salamandre"],
    't4': ["Hobbit", "Ent", "Vouivre=wyvern", "Tarasque", "Chupacabra", "Bigfoot=Sasquatch", "Monstre du Loch Ness=Nessie", "Selkie", "Kitsune", "Tengu", "Oni", "Kappa", "Naga", "Garuda", "Roc", "Simorgh", "Ifrit=efrit", "Goule=ghoul", "Gremlin", "Poltergeist", "Béhémoth", "Léviathan", "Korrigan", "Hippogriffe", "Cockatrice=cocatrix", "Boggart", "Dullahan"],
    't5': ["Fenrir", "Jörmungandr=Jormungand", "Draugr", "Jackalope", "Bahamut", "Pooka=púca", "Baku", "Yokai=yōkai", "Rusalka", "Domovoï", "Kobold", "Nixe", "Tarrasque", "Ankou", "Mothman", "Kelpie", "Wyrm"],
    't6': ["Dahu"],
}

T['art-mythes-05'] = {
    't1': ["Chat", "Loup", "Lapin", "Cheval", "Vache", "Cochon", "Poule", "Coq", "Âne"],
    't2': ["Chien"],
    't3': ["Mouton", "Ours", "Renard", "Singe", "Mouche", "Puce", "Araignée", "Fourmi", "Cigale", "Éléphant", "Poisson", "Requin", "Baleine", "Crocodile", "Canard", "Oie", "Pigeon", "Corbeau", "Hirondelle", "Rat", "Souris", "Taureau", "Bœuf=boeuf", "Veau", "Brebis", "Agneau", "Chèvre", "Lion"],
    't4': ["Dinde", "Moineau", "Oiseau", "Aigle", "Escargot", "Grenouille", "Cafard", "Mule", "Perdrix", "Merle", "Cerf", "Biche", "Sanglier", "Pie", "Hibou", "Chouette", "Sardine", "Hareng", "Carpe", "Anguille", "Homard", "Pou=poux", "Coucou", "Taupe", "Paon", "Cygne", "Tortue", "Lézard", "Zèbre", "Chameau", "Bouc", "Dindon", "Vautour", "Tigre", "Écrevisse"],
    't5': ["Limace", "Ver de terre", "Morue", "Thon", "Colombe", "Mouette", "Poulpe", "Crabe", "Caméléon", "Dromadaire", "Hérisson", "Moustique", "Bourdon", "Papillon", "Abeille", "Guêpe", "Hanneton", "Alouette", "Rossignol", "Pinson", "Pélican", "Autruche", "Gorille", "Hippopotame", "Rhinocéros", "Loutre", "Furet", "Belette", "Blaireau", "Mulet", "Poney", "Truite"],
    't6': ["Girafe"],
}

T['art-mythes-06'] = {
    't1': ["A priori", "Ad hoc", "Post-scriptum=P.-S./PS", "Alter ego", "Mea culpa", "Carpe diem", "Grosso modo", "Statu quo=status quo", "Veni vidi vici"],
    't2': ["Et cetera=etc"],
    't3': ["Ex aequo", "Ad vitam aeternam", "A posteriori", "Curriculum vitae=CV", "Persona non grata", "In extenso", "Sine qua non=conditio sine qua non", "Quorum", "Verbatim", "Vice versa", "Ibidem=ibid", "Cogito ergo sum", "Habeas corpus", "Mutatis mutandis", "Modus operandi", "Ad hominem", "Ex libris", "Per se", "Stricto sensu", "Lato sensu", "Ad nauseam", "Ad libitum", "In vitro", "In vivo", "In situ", "De facto", "De jure", "Deus ex machina", "Alea jacta est", "Nota bene=NB", "Requiescat in pace=RIP", "Memento mori"],
    't4': ["Pro forma", "Pro bono", "Ex cathedra", "Ex nihilo", "In fine", "In memoriam", "In petto", "In extremis", "Intra muros", "Extra muros", "Do ut des", "Dura lex sed lex", "Errare humanum est", "Ora et labora", "Magnum opus", "Non plus ultra", "Quo vadis", "Sub judice", "Tempus fugit", "Vade-mecum", "Urbi et orbi", "Mens sana in corpore sano", "Cui bono", "Corpus delicti", "Panem et circenses", "Sui generis", "Terra incognita", "Vox populi", "Mea maxima culpa", "Per capita", "Lapsus calami", "Lapsus linguae", "Casus belli", "Fiat lux", "Exempli gratia=e.g.", "Ex voto", "Te Deum"],
    't5': ["Ab initio", "Ad valorem", "Bis repetita placent", "Pro memoria", "Amicus curiae", "Ad patres", "Pro domo", "Citius altius fortius", "Mutatis mutandis", "Ab ovo", "Ad augusta per angusta", "Ad rem", "Ad interim", "A fortiori", "A contrario", "Ex abrupto", "Ex professo", "In albis", "In limine", "Sine die", "Nolens volens", "Sponte sua", "Lapsus", "Lex lata", "Primus inter pares", "Rara avis", "Si vis pacem para bellum", "Timeo Danaos et dona ferentes", "Alma mater", "Annus horribilis", "Mare nostrum", "Gaudeamus igitur"],
    't6': ["Habemus papam"],
}

T['art-mythes-07'] = {
    't1': ["Algèbre", "Alcool", "Chiffre", "Zéro", "Sucre", "Café", "Coton", "Magasin", "Orange"],
    't2': ["Couscous"],
    't3': ["Matelas", "Sirop", "Safran", "Jupe", "Algorithme", "Amiral", "Azimut", "Zénith", "Élixir", "Alchimie", "Hasard", "Bled", "Toubib", "Kif-kif", "Méchoui", "Souk", "Harem", "Gazelle", "Girafe", "Moka", "Sorbet", "Carafe", "Tasse", "Nénuphar", "Épinard", "Artichaut", "Abricot", "Aubergine", "Sultan", "Émir", "Calife", "Cheikh", "Burnous", "Djellaba", "Baraka", "Bakchich", "Maboul", "Razzia", "Ramadan", "Hammam", "Kasbah=casbah", "Azur", "Sofa"],
    't4': ["Mohair", "Talc", "Tarif", "Douane", "Maroquin", "Luth", "Almanach", "Calibre", "Chèque", "Haschisch", "Gandoura", "Fissa", "Nouba", "Smala", "Zouave", "Albatros", "Carat", "Alambic", "Alcôve", "Alcali", "Alezan", "Cabas", "Sequin", "Chouia", "Mascarade", "Truchement", "Nadir", "Tamarin", "Jarre", "Récif", "Séné", "Mamelouk", "Gaze", "Nuque", "Tambour", "Guitare"],
    't5': ["Alfa", "Amalgame", "Arsenal", "Barbacane", "Caravane", "Bédouin", "Fakir", "Mosquée", "Minaret", "Mufti", "Muezzin", "Nabab", "Sirocco", "Sorgho", "Alidade", "Cramoisi", "Carmin", "Lime", "Henné", "Kermès", "Jasmin"],
    't6': ["Safari"],
}

T['art-mythes-08'] = {
    't1': ["Pizza", "Spaghetti", "Opéra", "Piano", "Casino", "Carnaval", "Balcon", "Bravo", "Pasta"],
    't2': ["Ciao"],
    't3': ["Fiasco", "Cappuccino", "Espresso", "Gondole", "Mafia", "Paparazzi", "Soprano", "Allegro", "Crescendo", "Diva", "Studio", "Scénario", "Graffiti", "Villa", "Façade", "Bouffon", "Banque", "Lasagne", "Ravioli", "Risotto", "Tiramisu", "Gnocchi", "Pesto", "Mozzarella", "Parmesan", "Macaroni", "Panini", "Tagliatelle", "Carpaccio", "Salami", "Pizzeria", "Trattoria", "Solo", "Duo", "Adagio", "Sonate"],
    't4': ["Bilan", "Brigade", "Cavalier", "Caporal", "Citadelle", "Colonel", "Concert", "Duel", "Fresque", "Infanterie", "Lagune", "Pistolet", "Politesse", "Sonnet", "Soldat", "Sbire", "Vermicelle", "Cannelloni", "Ciabatta", "Focaccia", "Antipasti", "Mortadelle", "Prosciutto", "Bruschetta", "Minestrone", "Maestro", "Virtuose", "Ténor", "Baryton", "Cantate", "Mezzo", "Andante", "Vivace", "Staccato", "Pizzicato", "Libretto", "Pergola", "Loggia", "Terrasse", "Corridor", "Arcade", "Balustrade", "Cavalcade", "Escalope", "Gouache", "Mosaïque", "Pantalon", "Cortège", "Charlatan", "Médaillon", "Quarantaine", "Bagatelle", "Carton", "Cartouche", "Valise", "Gazette", "Million", "Ballon", "Banderole", "Gelato", "Stiletto"],
    't5': ["Banqueroute", "Lazaret", "Sergent", "Mousqueton", "Arlequin", "Pantomime", "Canaille", "Cabine", "Capitaine", "Escalade", "Escadron", "Bourrasque", "Régate", "Fanfare", "Falbalas", "Manège", "Alerte", "Attaquer", "Ambassade", "Balcon", "Bandit", "Bergamote", "Burlesque", "Cantatrice", "Cascade", "Confetti", "Dessin", "Gigolo", "Gracieux"],
    't6': ["Spaghetti western"],
}

T['art-mythes-09'] = {
    't1': ["Football", "Parking", "Sandwich", "Jeans=jean", "Ticket", "Barbecue", "Hamburger", "Shopping", "Cool"],
    't2': ["Week-end=weekend"],
    't3': ["Email=e-mail/mail", "Internet", "Tennis", "Rugby", "Golf", "Match", "Penalty", "Cocktail", "Camping", "Bulldozer", "Jazz", "Rock", "Clip", "Look", "Fan", "Star", "Show", "Business", "Marketing", "Manager", "Meeting", "Gadget", "Pull-over=pull", "T-shirt", "Short", "Sweat", "Jogging", "Cookie", "Muffin", "Brunch", "Ketchup", "Whisky", "Cake", "Pudding", "Toast", "Steak", "Bacon", "Burger", "Budget", "Challenge", "Gang", "Gentleman", "Interview", "Leader", "Stress", "Boss", "Zapping", "Flash", "Flirt", "Hobby", "Snob", "Sponsor", "Spray", "Tunnel", "Wagon", "Yacht", "Stop"],
    't4': ["Pop", "Lobby", "Pack", "Planning", "Reporter", "Scoop", "Fair-play", "Handicap", "Kidnapping", "Label", "Pickpocket", "Ring", "Round", "Score", "Self-service", "Standard", "Tramway", "Express", "Bifteck", "Sketch", "Slogan", "Thriller", "Trend", "Zoom", "Ferry", "Cargo", "Rosbif", "Gin", "Clown", "Boycott", "Badminton", "Basket-ball=basket", "Base-ball=baseball", "Volley-ball=volley", "Hockey", "Cricket", "Sprint", "Record", "Stand", "Tuning", "Blog", "Podcast", "Spoiler", "Selfie", "Streaming", "Hashtag", "Poney", "Pyjama"],
    't5': ["Dandy", "Humour", "Budgétaire", "Referendum", "Toboggan", "Bol", "Bouledogue", "Brandy", "Bungalow", "Cheese-cake=cheesecake", "Chewing-gum=chewing gum", "Clan", "Cottage", "Crawl", "Dribble", "Drugstore", "Fuel", "Gag", "Groom", "Hall", "Interview", "Living-room", "Lynchage", "Nurse", "Offside=hors-jeu", "Out", "Pedigree", "Pipeline", "Puzzle", "Remake", "Sulky", "Tilt", "Tweed", "Water-polo", "Whist"],
    't6': ["Redingote"],
}

T['art-mythes-10'] = {
    't1': ["Pâques", "Ramadan", "Hanoukka=Hanouka/Hanukkah", "Pentecôte", "Toussaint", "Assomption", "Yom Kippour=Kippour", "Épiphanie=jour des Rois/fête des Rois", "Aïd el-Kébir=Aïd al-Adha/Tabaski/Aïd el Kebir", "Aïd el-Fitr=Aïd el-Séghir/Aïd el Fitr"],
    't2': ["Noël"],
    't3': ["Ascension", "Rameaux=dimanche des Rameaux", "Vendredi saint", "Carême", "Mardi gras", "Mercredi des Cendres=Cendres", "Chandeleur", "Annonciation", "Immaculée Conception", "Trinité", "Fête-Dieu=Corpus Christi", "Avent", "Pessah=Pâque juive/Pessah", "Souccot=Soukkot/Sukkot", "Pourim", "Rosh Hashana=Roch Hachana", "Chavouot=Shavouot", "Divali=Diwali", "Holi", "Vesak=Wesak", "Mawlid=Aïd al-Mawlid/Mouled", "Achoura", "Nuit du Destin=Laylat al-Qadr", "Nativité", "Saint-Nicolas", "Jeudi saint", "Lundi de Pâques", "Samedi saint", "Shabbat=Chabbat"],
    't4': ["Navaratri", "Janmashtami", "Raksha Bandhan", "Baisakhi", "Gurpurab", "Théophanie", "Transfiguration", "Dormition", "Christ-Roi", "Tou Bichvat=Tu Bichvat", "Lag Baomer=Lag Ba'omer", "Tisha Beav", "Simhat Torah=Sim'hat Torah", "Obon", "Songkran", "Mahashivaratri=Shivaratri", "Ganesh Chaturthi", "Durga Puja", "Rath Yatra", "Samhain", "Beltane", "Yule", "Imbolc", "Ostara", "Lughnasadh", "Ascension de la Vierge", "Nouvel an musulman=Hégire/Ras el-Am", "Sainte-Lucie", "Saint-Jean", "Saint-Sylvestre", "Fête des Lumières", "Magha Puja", "Hola Mohalla", "Aïd al-Ghadir", "Mouloud"],
    't5': ["Mi-Carême", "Rogations", "Quasimodo", "Dimanche de la Divine Miséricorde", "Présentation au Temple", "Sainte-Famille", "Baptême du Christ", "Fête de la Croix glorieuse", "Exaltation de la Sainte Croix", "Saint-Étienne", "Saints Innocents", "Pâque orthodoxe", "Vaisakhi", "Maha Kumbh Mela=Kumbh Mela", "Thaipusam", "Diwali", "Onam", "Pongal", "Chinese New Year", "Kathina", "Asalha Puja", "Magha Bucha", "Hajj", "Ashura", "Eid al-Adha", "Lailat al-Miraj=Isra et Miraj", "Nuit du Mi-Chaabane=Mi-Chaabane", "Yom Haatsmaout", "Yom Hazikaron", "Selihot", "Rosh Hodesh", "Tisha BeAv", "Pessah Sheni", "Shemini Atzeret", "Chemini Atseret"],
    't6': ["Jour des Morts=Fête des Morts/Día de Muertos"],
}
