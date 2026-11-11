PROMPTS = [
 {'id': 'his-moyenage-01', 'text': "Nomme une bataille livrée entre 476 et 1492"},
 {'id': 'his-moyenage-02', 'text': "Nomme un roi wisigoth, ostrogoth, vandale, burgonde ou lombard"},
 {'id': 'his-moyenage-03', 'text': "Nomme un empereur ou une impératrice byzantin ayant régné après l'an 600"},
 {'id': 'his-moyenage-04', 'text': "Nomme un calife rachidoune, omeyyade, abbasside, fatimide ou de Cordoue"},
 {'id': 'his-moyenage-05', 'text': "Nomme un personnage ayant joué un rôle dans les croisades en Orient (1095-1291)"},
 {'id': 'his-moyenage-06', 'text': "Nomme une ville ayant été membre de la Hanse"},
 {'id': 'his-moyenage-07', 'text': "Nomme un ordre religieux, militaire ou de chevalerie fondé avant 1500"},
 {'id': 'his-moyenage-08', 'text': "Nomme un château fort médiéval situé en France métropolitaine"},
 {'id': 'his-moyenage-09', 'text': "Nomme une œuvre littéraire écrite en Europe au Moyen Âge (avant 1500)"},
 {'id': 'his-moyenage-10', 'text': "Nomme un personnage ayant joué un rôle dans la guerre de Cent Ans"},
 {'id': 'his-moyenage-11', 'text': "Nomme une abbaye fondée au Moyen Âge sur le territoire de la France actuelle"},
 {'id': 'his-moyenage-12', 'text': "Nomme une université fondée en Europe avant 1500"},
 {'id': 'his-moyenage-13', 'text': "Nomme une arme, une pièce d'armure ou une machine de siège utilisée dans l'Europe médiévale"},
 {'id': 'his-moyenage-14', 'text': "Nomme un savant, penseur, poète ou voyageur du monde musulman médiéval (VIIe-XVe siècle)"},
 {'id': 'his-moyenage-15', 'text': "Nomme une cathédrale gothique d'Europe dont la construction a commencé avant 1500"},
]

T = {}

T['his-moyenage-01'] = {
 't1': ["Hastings", "Azincourt=Agincourt", "Crécy", "Poitiers", "Bouvines", "Roncevaux", "Hattin"],
 't2': ["Tolbiac"],
 't3': ["Castillon", "Patay", "Formigny", "Courtrai=Bataille des Éperons d'or", "Las Navas de Tolosa", "Manzikert=Mantzikert", "Lechfeld", "Stamford Bridge", "Bannockburn", "Grunwald=Tannenberg (1410)", "Morgarten", "Sempach", "Nancy", "Grandson", "Morat", "Bataille du lac Peïpous=Bataille sur la glace", "Kosovo Polje=Bataille du Kosovo", "Nicopolis", "Varna", "Ankara", "Aïn Djalout=Ain Jalut", "Arsouf", "Dorylée", "Bosworth", "Vouillé", "Yarmouk", "Covadonga", "Koulikovo", "Muret", "Fontenoy-en-Puisaye"],
 't4': ["Mons-en-Pévèle", "Cassel", "L'Écluse=Sluis", "Brémule", "Tinchebray", "Lewes", "Evesham", "Towton", "Saint-Albans", "Tewkesbury", "Barnet", "Falkirk", "Pont de Stirling=Stirling Bridge", "Auray", "Cocherel", "Nájera=Navarrete", "Aljubarrota", "Verneuil", "Baugé", "Mohi=Bataille du Sajó", "Legnica=Liegnitz", "Legnano", "Bénévent", "Tagliacozzo", "Montaperti", "Campaldino", "Zallaca=Sagrajas", "Alarcos", "Rio Salado", "Kalka", "Talas", "Qadisiyya=Al-Qadisiyya", "Badr", "Uhud", "Nahavand", "Kerbala", "Soissons (486)", "Ascalon", "Mansourah", "Montlhéry", "Roosebeke", "Dan-no-ura", "Val-ès-Dunes", "Taillebourg"],
 't5': ["Tertry", "Edington", "Brunanburh", "Clontarf", "Stiklestad", "Civitate", "Dyrrachium (1081)", "Myrioképhalon", "Kleidion", "Montgisard", "La Forbie", "Ager Sanguinis=Champ du Sang", "Maritsa", "Otlukbeli", "Montiel", "Toro", "Guinegatte", "Saint-Aubin-du-Cormier", "Othée", "Héricourt", "Bulgnéville", "Gerberoy", "Mortemer", "Varaville", "La Roche-aux-Moines", "Mauron", "La Roche-Derrien", "Rouvray=Journée des Harengs", "Cravant", "Lincoln (1141)", "Halidon Hill", "Neville's Cross", "Otterburn", "Wakefield", "Andrinople (1205)"],
 't6': ["Combat des Trente=Bataille des Trente"],
}

T['his-moyenage-02'] = {
 't1': ["Alaric Ier=Alaric", "Genséric=Geiséric", "Théodoric le Grand=Théodoric", "Totila", "Alboïn", "Gondebaud", "Didier=Desiderius", "Récarède Ier=Récarède"],
 't2': ["Gélimer"],
 't3': ["Euric", "Alaric II", "Athaulf=Ataulf", "Rodéric=Rodrigue/Roderic", "Léovigild", "Wamba", "Théodoric Ier", "Hunéric", "Liutprand", "Aistulf=Astolphe", "Rothari", "Agilulf", "Sigismond", "Vitigès=Witigès", "Teias=Téia", "Théodat=Théodahad", "Athalaric"],
 't4': ["Wallia", "Sigéric", "Thorismond", "Théodoric II", "Amalaric", "Theudis", "Agila Ier", "Athanagild", "Liuva Ier", "Chindaswinthe", "Recceswinthe", "Égica", "Wittiza", "Ervige", "Sisebut", "Swinthila", "Gunthamund", "Thrasamund", "Hildéric", "Authari", "Cleph", "Grimoald Ier=Grimoald", "Ratchis", "Gondioc", "Godégisel", "Godomar=Gondomar"],
 't5': ["Liuva II", "Wittéric", "Gundemar", "Récarède II", "Sisenand", "Chintila", "Tulga", "Agila II", "Theudigisel", "Ildibad", "Éraric", "Valamir", "Thiudimir", "Ermanaric", "Gondéric=Gunderic", "Godigisel", "Adaloald", "Arioald", "Rodoald", "Aripert Ier", "Perctarit", "Godepert", "Cunipert", "Aripert II", "Ansprand", "Hildeprand", "Liutpert", "Wacho", "Audoin", "Chilpéric II de Burgondie"],
 't6': ["Gondicaire=Gunther"],
}

T['his-moyenage-03'] = {
 't1': ["Héraclius", "Basile II=Basile le Bulgaroctone", "Alexis Ier Comnène=Alexis Comnène", "Constantin XI Paléologue=Constantin XI", "Irène=Irène l'Athénienne", "Michel VIII Paléologue", "Manuel Ier Comnène", "Léon III l'Isaurien"],
 't2': ["Justinien II=Justinien Rhinotmète"],
 't3': ["Phocas", "Constantin IV", "Constant II", "Constantin V=Constantin Copronyme", "Léon IV le Khazar", "Constantin VI", "Nicéphore Ier", "Michel Ier Rhangabé", "Léon V l'Arménien", "Michel II", "Théophile", "Michel III", "Basile Ier", "Léon VI le Sage", "Constantin VII Porphyrogénète", "Romain Ier Lécapène", "Romain II", "Nicéphore II Phocas", "Jean Ier Tzimiscès", "Constantin VIII", "Romain IV Diogène", "Jean II Comnène", "Andronic Ier Comnène", "Isaac II Ange", "Alexis IV Ange", "Alexis V Doukas=Murzuphle", "Jean VI Cantacuzène", "Manuel II Paléologue", "Jean VIII Paléologue", "Andronic II Paléologue", "Andronic III Paléologue", "Jean V Paléologue"],
 't4': ["Constantin III", "Héraclonas", "Léonce", "Tibère III", "Philippicos=Bardanès", "Anastase II", "Théodose III", "Staurace", "Alexandre", "Romain III Argyre", "Michel IV le Paphlagonien", "Michel V le Calfat", "Zoé=Zoé Porphyrogénète", "Théodora=Théodora Porphyrogénète", "Constantin IX Monomaque", "Michel VI", "Isaac Ier Comnène", "Constantin X Doukas", "Michel VII Doukas", "Nicéphore III Botaniatès", "Alexis II Comnène", "Alexis III Ange", "Théodore Ier Lascaris", "Jean III Doukas Vatatzès=Jean Vatatzès", "Théodore II Lascaris", "Jean IV Lascaris", "Michel IX Paléologue", "Andronic IV Paléologue", "Jean VII Paléologue"],
 't5': [],
 't6': ["Artavasde"],
}

T['his-moyenage-04'] = {
 't1': ["Abou Bakr=Abu Bakr", "Omar=Umar/Omar ibn al-Khattab", "Othman=Uthman/Osman ibn Affan", "Ali=Ali ibn Abi Talib", "Haroun al-Rachid=Harun al-Rashid/Haroun al-Rashid", "Muawiya Ier=Muawiya/Moawiya", "Al-Mamun=Al-Ma'mun/Mamoun", "Abd al-Rahman III=Abd er-Rahman III/Abderrahmane III"],
 't2': ["Hassan ibn Ali=Al-Hasan ibn Ali"],
 't3': ["Yazid Ier=Yazid", "Abd al-Malik", "Al-Walid Ier=Walid Ier", "Omar II=Umar II/Omar ibn Abd al-Aziz", "Hicham=Hisham ibn Abd al-Malik", "Marwan Ier", "Marwan II", "As-Saffah=Abu al-Abbas as-Saffah/Saffah", "Al-Mansur=Al-Mansour", "Al-Mahdi", "Al-Amin", "Al-Mutasim=Al-Mu'tasim", "Al-Mutawakkil", "Al-Hakim bi-Amr Allah=Al-Hakim", "Al-Muizz=Al-Mu'izz", "Al-Hakam II", "Hicham II", "Al-Mustasim=Al-Musta'sim", "Ubayd Allah al-Mahdi=Al-Mahdi Billah"],
 't4': ["Muawiya II", "Sulayman ibn Abd al-Malik=Souleiman", "Yazid II", "Yazid III", "Al-Walid II", "Al-Hadi", "Al-Wathiq", "Al-Muntasir", "Al-Mustain=Al-Musta'in", "Al-Mutazz=Al-Mu'tazz", "Al-Muhtadi", "Al-Mutamid=Al-Mu'tamid", "Al-Mutadid=Al-Mu'tadid", "Al-Muktafi", "Al-Muqtadir", "Al-Qahir", "Ar-Radi", "Al-Muttaqi", "Al-Mustakfi", "Al-Muti", "At-Tai", "Al-Qadir", "Al-Qaim", "Al-Muqtadi", "Al-Mustazhir", "Al-Mustarshid", "Ar-Rashid", "Al-Muqtafi", "Al-Mustanjid", "Al-Mustadi", "An-Nasir li-Din Allah=An-Nasir", "Az-Zahir", "Al-Mustansir", "Al-Aziz", "Al-Mustali", "Al-Amir", "Al-Hafiz", "Az-Zafir", "Al-Faiz"],
 't5': ["Ibrahim ibn al-Walid", "Hicham III", "Abd al-Rahman IV", "Abd al-Rahman V"],
 't6': ["Al-Adid"],
}

T['his-moyenage-05'] = {
 't1': ["Godefroy de Bouillon", "Saladin=Salah ad-Din", "Richard Cœur de Lion=Richard Ier d'Angleterre", "Saint Louis=Louis IX", "Frédéric Barberousse=Frédéric Ier", "Philippe Auguste=Philippe II", "Pierre l'Ermite", "Baudouin IV=Baudouin le Lépreux", "Urbain II"],
 't2': ["Aliénor d'Aquitaine"],
 't3': ["Bohémond de Tarente=Bohémond Ier", "Tancrède de Hauteville=Tancrède", "Raymond de Saint-Gilles=Raymond IV de Toulouse", "Baudouin Ier de Jérusalem=Baudouin de Boulogne", "Adhémar de Monteil", "Hugues de Vermandois", "Robert Courteheuse", "Étienne de Blois", "Robert II de Flandre", "Bernard de Clairvaux=Saint Bernard", "Louis VII", "Conrad III", "Renaud de Châtillon", "Guy de Lusignan", "Sibylle de Jérusalem", "Balian d'Ibelin", "Raymond III de Tripoli", "Nur ad-Din=Nour ed-Din/Nureddine", "Zengi", "Baybars", "Al-Kamil", "Frédéric II", "Jean de Joinville=Joinville", "Hugues de Payns", "Al-Adil=Saphadin", "Kılıç Arslan Ier=Kilij Arslan", "Enrico Dandolo", "Boniface de Montferrat", "Baudouin Ier de Constantinople=Baudouin de Flandre", "Geoffroi de Villehardouin=Villehardouin", "Conrad de Montferrat", "Alexis Ier Comnène", "Gautier Sans-Avoir", "Robert d'Artois", "Charles d'Anjou", "Qalâwûn=Qalawun", "Al-Ashraf Khalil", "Édouard Ier d'Angleterre"],
 't4': ["Henri II de Champagne", "Jean de Brienne", "Pélage Galvani=Pelagio", "André II de Hongrie", "Alphonse de Poitiers", "Qutuz", "Shirkuh", "Turan Shah", "As-Salih Ayyub", "Kerbogha", "Yaghi-Siyan", "Foulque d'Anjou=Foulques V", "Mélisende", "Baudouin II de Jérusalem", "Baudouin III", "Amaury Ier", "Baudouin V", "Isabelle Ire de Jérusalem", "Gérard de Ridefort", "Guillaume de Beaujeu", "Hermann von Salza", "Raymond du Puy", "Gérard Tenque=Gérard l'Hospitalier", "Manuel Ier Comnène", "Pierre Barthélemy", "Foucher de Chartres", "Guillaume de Tyr", "Thibaut IV de Champagne", "Richard de Cornouailles", "Léopold V d'Autriche", "Hugues III de Bourgogne", "Marguerite de Provence", "Pierre Mauclerc=Pierre de Dreux"],
 't5': ["Usama ibn Munqidh", "Al-Afdal", "Iftikhar ad-Dawla", "Bertrand de Toulouse", "Joscelin de Courtenay", "Raymond de Poitiers", "Jacques d'Avesnes", "Robert de Sablé", "Shajar al-Durr=Chajar ad-Durr"],
 't6': ["François d'Assise=Saint François"],
}

T['his-moyenage-06'] = {
 't1': ["Lübeck", "Hambourg", "Brême", "Dantzig=Gdańsk", "Riga", "Cologne", "Rostock", "Tallinn=Reval"],
 't2': ["Cracovie"],
 't3': ["Stralsund", "Wismar", "Lunebourg=Lüneburg", "Brunswick=Braunschweig", "Magdebourg", "Dortmund", "Visby", "Königsberg=Kaliningrad", "Stettin=Szczecin", "Greifswald", "Toruń=Thorn", "Elbing=Elbląg", "Breslau=Wrocław", "Münster", "Kampen", "Deventer", "Zwolle", "Groningue", "Hanovre", "Goslar", "Hildesheim", "Soest", "Kiel", "Osnabrück", "Francfort-sur-l'Oder", "Dorpat=Tartu"],
 't4': ["Anklam", "Kolberg=Kołobrzeg", "Stargard", "Stolp=Słupsk", "Pernau=Pärnu", "Hamelin", "Göttingen", "Einbeck", "Paderborn", "Minden", "Lemgo", "Herford", "Bielefeld", "Duisbourg", "Wesel", "Nimègue", "Arnhem", "Zutphen", "Harderwijk", "Elburg", "Doesburg", "Stendal", "Salzwedel", "Halle", "Quedlinbourg", "Halberstadt", "Uelzen", "Stade", "Buxtehude", "Kulm=Chełmno", "Brandebourg-sur-la-Havel"],
 't5': ["Fellin=Viljandi", "Wenden=Cēsis", "Wolmar=Valmiera", "Goldingen=Kuldīga", "Braunsberg=Braniewo", "Hattem"],
 't6': ["Berlin"],
}

T['his-moyenage-07'] = {
 't1': ["Ordre du Temple=Templiers", "Hospitaliers=Ordre de Saint-Jean de Jérusalem/Ordre de Malte", "Ordre Teutonique=Chevaliers Teutoniques", "Cisterciens=Ordre de Cîteaux", "Bénédictins=Ordre de Saint-Benoît", "Franciscains=Frères mineurs/Cordeliers", "Dominicains=Frères prêcheurs/Jacobins", "Chartreux", "Ordre de Cluny=Clunisiens"],
 't2': ["Ordre de la Toison d'or=Toison d'or"],
 't3': ["Carmes=Ordre du Carmel", "Augustins=Ermites de saint Augustin", "Prémontrés=Norbertins", "Clarisses=Pauvres Dames", "Trinitaires", "Mercédaires=Ordre de la Merci", "Ordre de la Jarretière", "Ordre de Saint-Michel", "Ordre de l'Étoile", "Ordre de Calatrava", "Ordre de Santiago=Ordre de Saint-Jacques de l'Épée", "Ordre d'Alcántara", "Chevaliers Porte-Glaive=Frères de l'Épée", "Ordre de Saint-Lazare", "Ordre du Christ", "Antonins", "Célestins", "Servites", "Camaldules", "Brigittines=Ordre du Très-Saint-Sauveur", "Ordre de Fontevraud=Fontevristes", "Minimes"],
 't4': ["Vallombrosains", "Grandmontains", "Gilbertins", "Hiéronymites", "Ordre de Montesa", "Ordre d'Avis", "Ordre du Dragon", "Ordre de l'Hermine", "Ordre du Croissant", "Ordre du Collier=Ordre de l'Annonciade", "Olivétains", "Guillemites", "Jésuates", "Humiliés", "Silvestrins", "Victorins=Chanoines de Saint-Victor", "Ordre de Dobrin=Frères de Dobrzyń", "Ordre de Montjoie", "Ordre de Saint-Thomas d'Acre", "Ordre de la Bande", "Frères de la Vie commune", "Ordre de Tiron=Tironiens", "Ordre de Savigny", "Croisiers", "Hospitaliers du Saint-Esprit", "Chanoines de Saint-Ruf"],
 't5': ["Ordre du Val-des-Choux", "Ordre du Saint-Esprit au Droit Désir"],
 't6': ["Ordre du Porc-épic"],
}

T['his-moyenage-08'] = {
 't1': ["Château-Gaillard", "Carcassonne=Cité de Carcassonne/Château comtal de Carcassonne", "Pierrefonds", "Haut-Kœnigsbourg", "Vincennes=Donjon de Vincennes", "Chinon", "Montségur", "Fougères"],
 't2': ["Louvre=Château du Louvre/Louvre de Philippe Auguste"],
 't3': ["Angers", "Loches", "Falaise", "Caen", "Coucy", "Foix", "Peyrepertuse", "Quéribus", "Najac", "Bonaguil", "Beynac", "Castelnaud", "Tarascon", "Vitré", "Josselin", "Suscinio", "Fort-la-Latte=Château de la Roche-Goyon", "Saumur", "Langeais", "Montreuil-Bellay", "Clisson", "Tiffauges", "Combourg", "Gisors", "Dourdan", "Puilaurens", "Lastours", "Château des ducs de Bretagne", "Sedan", "Les Baux-de-Provence", "Provins=Tour César"],
 't4': ["Termes", "Aguilar", "Arques-la-Bataille", "Domfront", "Murol", "Polignac", "Tournoël", "Billy", "Bourbon-l'Archambault", "Mehun-sur-Yèvre", "Sully-sur-Loire", "Dinan", "La Hunaudaye", "Tonquédec", "Largoët", "Pouancé", "Mauvezin", "Montaner", "Lourdes", "Villandraut", "Roquetaillade", "Beaucaire", "Châteaudun", "Rambures", "La Ferté-Milon", "Blandy-les-Tours", "Joux", "Ventadour", "Fleckenstein", "Haut-Barr", "Lichtenberg", "Ortenbourg", "Saint-Ulrich", "Penne", "Bruniquel", "Castelnau-Bretenoux", "Commarque", "Biron", "Crussol", "Chalusset", "Fère-en-Tardenois", "Grimaud", "Beaugency", "Lavardin", "Montbazon"],
 't5': [],
 't6': ["Château de Brest"],
}

T['his-moyenage-09'] = {
 't1': ["La Chanson de Roland", "Tristan et Iseut", "Le Roman de Renart", "La Divine Comédie", "Le Décaméron", "Les Contes de Canterbury=The Canterbury Tales", "Beowulf", "Perceval ou le Conte du Graal=Le Conte du Graal/Perceval", "Le Roman de la Rose", "Lancelot ou le Chevalier de la charrette=Lancelot"],
 't2': ["Le Morte d'Arthur=La Mort d'Arthur"],
 't3': ["La Chanson des Nibelungen=Nibelungenlied", "Le Cantar de mio Cid=Poème du Cid", "L'Edda=Edda poétique/Edda de Snorri", "Yvain ou le Chevalier au lion=Yvain", "Érec et Énide", "Cligès", "Les Lais de Marie de France=Lais", "Le Testament de Villon=Le Grand Testament", "La Ballade des pendus=L'Épitaphe Villon", "Le Canzoniere", "Aucassin et Nicolette", "Sire Gauvain et le Chevalier vert=Sir Gawain and the Green Knight", "Parzival", "Le Devisement du monde=Le Livre des merveilles", "La Légende dorée", "La Cité des dames=Le Livre de la Cité des dames", "La Farce de maître Pathelin", "Les Chroniques de Froissart", "Les Mémoires de Commynes", "Vie de Saint Louis=Histoire de Saint Louis", "La Conquête de Constantinople", "L'Imitation de Jésus-Christ", "Historia regum Britanniae", "La Vita nuova", "Troïlus et Criseyde", "La Quête du Saint-Graal", "La Mort le roi Artu", "Lancelot en prose", "Le Roman de Brut", "Le Jeu de Robin et Marion"],
 't4': ["La Saga de Njáll", "Heimskringla", "Le Jeu d'Adam", "Pierre le Laboureur=Piers Plowman", "Le Livre de bon amour", "Le Roman d'Alexandre", "Le Roman de Troie", "Le Roman de Thèbes", "Le Roman d'Eneas", "Le Bel Inconnu", "Huon de Bordeaux", "Raoul de Cambrai", "Le Pèlerinage de Charlemagne", "La Chanson de Guillaume", "Le Couronnement de Louis", "Le Charroi de Nîmes", "La Prise d'Orange", "Fierabras", "Les Quatre Fils Aymon=Renaut de Montauban", "Le Mystère de la Passion", "Le Roman de Fauvel", "Le Petit Testament=Le Lais de Villon", "Les Cent Nouvelles nouvelles", "Tirant le Blanc=Tirant lo Blanc", "La Célestine", "Roland amoureux=Orlando innamorato", "La Saga des Völsungar", "La Saga d'Egill", "Le Mabinogion", "La Razzia des vaches de Cooley=Táin Bó Cúailnge"],
 't5': ["Le Roman de Silence", "Flamenca", "La Chanson de la croisade albigeoise", "Le Roman de Mélusine", "Morgante", "Le Dit de la campagne d'Igor=Le Dit d'Igor", "Digénis Akritas", "Hildebrandslied=Chant de Hildebrand", "Waltharius", "Le Roman de Rou", "Le Voir Dit", "Le Livre du cœur d'amour épris", "Le Petit Jehan de Saintré"],
 't6': ["Carmina Burana"],
}

T['his-moyenage-10'] = {
 't1': ["Jeanne d'Arc", "Bertrand du Guesclin", "Le Prince Noir=Édouard de Woodstock", "Charles VII", "Henri V", "Édouard III", "Jean II le Bon=Jean le Bon", "Charles V le Sage=Charles V", "La Hire=Étienne de Vignolles", "Philippe VI de Valois=Philippe VI"],
 't2': ["Gilles de Rais"],
 't3': ["Charles VI", "Isabeau de Bavière", "Dunois=Bâtard d'Orléans/Jean de Dunois", "Poton de Xaintrailles=Xaintrailles", "Arthur de Richemont", "John Talbot=Talbot", "Jean sans Peur", "Philippe le Bon", "Philippe le Hardi", "Pierre Cauchon=Cauchon", "Jean de Lancastre=Duc de Bedford", "Henri VI", "Richard II", "Jean de Gand=John of Gaunt", "Étienne Marcel", "Charles le Mauvais=Charles II de Navarre", "Olivier de Clisson", "Jean Froissart=Froissart", "Agnès Sorel", "Jacques Cœur", "Yolande d'Aragon", "Eustache de Saint-Pierre", "Jean Chandos", "Robert III d'Artois=Robert d'Artois", "Charles d'Orléans", "Louis d'Orléans", "Bernard VII d'Armagnac", "Catherine de Valois", "Isabelle de France", "Philippa de Hainaut", "Jean de Montfort", "Charles de Blois", "Jeanne de Flandre=Jeanne la Flamme", "Jeanne de Penthièvre", "Gaston Fébus=Gaston III de Foix", "Henri IV d'Angleterre=Henri de Bolingbroke", "Jean Bureau"],
 't4': ["Robert Knolles", "Hugh Calveley", "Jean de Grailly=Captal de Buch", "John Fastolf", "Thomas Montagu=Comte de Salisbury", "Humphrey de Lancastre=Duc de Gloucester", "Richard Beauchamp=Comte de Warwick", "Jacob van Artevelde", "Philippe van Artevelde", "Guillaume Cale", "Robert de Baudricourt", "Jean de Metz", "Bertrand de Poulengy", "Jean d'Aulon", "Jean de Luxembourg", "Enguerrand VII de Coucy", "Boucicaut=Jean II Le Meingre", "Charles d'Albret", "Jean de Bueil", "Pierre de Brézé", "Ambroise de Loré", "Jean de Vienne", "Gautier de Mauny=Walter Manny", "Thomas Dagworth", "Henri de Grosmont", "Georges de La Trémoille", "Regnault de Chartres", "Jean IV de Bretagne", "Jean V de Bretagne", "Arnaud de Cervole=L'Archiprêtre", "Thomas de Woodstock", "Jean d'Alençon=Duc d'Alençon", "Louis de Mâle", "Jean de Berry=Duc de Berry"],
 't5': ["Raoul de Gaucourt", "Guillaume de Flavy", "Jean d'Estivet", "Thomas Kyriell"],
 't6': ["Geoffrey Chaucer=Chaucer"],
}

T['his-moyenage-11'] = {
 't1': ["Cluny", "Mont-Saint-Michel", "Cîteaux", "Clairvaux", "Fontenay", "Fontevraud", "Sénanque", "Saint-Denis", "Vézelay"],
 't2': ["Saint-Germain-des-Prés"],
 't3': ["Le Thoronet", "Silvacane", "Moissac", "Conques=Sainte-Foy de Conques", "Jumièges", "Fécamp", "Saint-Wandrille=Fontenelle", "Le Bec-Hellouin=Abbaye du Bec", "Abbaye aux Hommes=Saint-Étienne de Caen", "Abbaye aux Dames=La Trinité de Caen", "Royaumont", "Pontigny", "Noirlac", "Fontfroide", "Saint-Michel-de-Cuxa=Cuxa", "Saint-Martin-du-Canigou", "Saint-Guilhem-le-Désert=Gellone", "Saint-Benoît-sur-Loire=Fleury", "Tournus=Saint-Philibert de Tournus", "La Chaise-Dieu", "Saint-Savin-sur-Gartempe", "Flaran", "Lagrasse", "Montmajour", "Saint-Gilles", "Corbie", "Luxeuil", "Jouarre", "Solesmes", "Landévennec", "Morimond", "La Ferté"],
 't4': ["Saint-Riquier", "Saint-Bertin", "Chelles", "Solignac", "Saint-Martial de Limoges", "Cadouin", "Aubazine=Obazine", "Valmagne", "Sylvanès", "L'Escaladieu", "Fontgombault", "Beauport", "Mortemer", "Hambye", "Lessay", "Cerisy-la-Forêt", "Saint-Évroult", "Ourscamp", "Longpont", "Vaucelles", "Chaalis", "Saint-Jean-des-Vignes", "Melleray", "Bonport", "Murbach", "Charroux", "Saint-Sever", "Souillac", "Saint-Amand=Elnone", "Saint-Germain d'Auxerre", "Saint-Rémi de Reims", "Saint-Médard de Soissons", "Mozac", "Flavigny", "Saint-Pierre-sur-Dives", "Valloires", "Saint-Gildas-de-Rhuys", "Saint-Sauveur de Redon=Redon", "Daoulas", "Tamié", "Abondance", "Sainte-Croix de Poitiers", "Nouaillé-Maupertuis", "Maillezais", "Saint-Jean-d'Angély", "Sablonceaux", "La Sauve-Majeure", "Arles-sur-Tech", "Saint-Génis-des-Fontaines", "Grandselve", "Belleperche", "Bonnecombe", "Loc-Dieu", "Beaulieu-en-Rouergue", "Léoncel", "Mazan", "Villelongue", "Saint-Hilaire", "Saint-Papoul"],
 't5': [],
 't6': ["Hautecombe"],
}

T['his-moyenage-12'] = {
 't1': ["Bologne", "Université de Paris=Sorbonne", "Oxford", "Cambridge", "Salamanque", "Montpellier", "Padoue", "Prague=Université Charles"],
 't2': ["Coimbra"],
 't3': ["Toulouse", "Orléans", "Angers", "Avignon", "Cahors", "Grenoble", "Perpignan", "Aix", "Poitiers", "Caen", "Bordeaux", "Valence", "Nantes", "Bourges", "Dole", "Naples", "Sienne", "Pise", "Florence", "Pavie", "Pérouse", "Rome=La Sapienza", "Ferrare", "Turin", "Valladolid", "Cracovie=Université Jagellonne", "Vienne", "Heidelberg", "Cologne", "Erfurt", "Leipzig", "Louvain", "St Andrews=Saint Andrews", "Glasgow", "Aberdeen", "Uppsala", "Copenhague"],
 't4': ["Catane", "Lérida=Lleida", "Huesca", "Palencia", "Saragosse", "Barcelone", "Alcalá de Henares=Alcalá", "Sigüenza", "Saint-Jacques-de-Compostelle", "Rostock", "Greifswald", "Fribourg-en-Brisgau", "Bâle", "Tübingen", "Ingolstadt", "Mayence", "Trèves", "Wurtzbourg", "Pécs"],
 't5': [],
 't6': ["Academia Istropolitana=Université de Presbourg"],
}

T['his-moyenage-13'] = {
 't1': ["Épée", "Arbalète", "Lance", "Masse d'armes", "Hache", "Arc long=Longbow", "Trébuchet", "Bélier", "Cotte de mailles", "Heaume"],
 't2': ["Bombarde"],
 't3': ["Hallebarde", "Pique", "Dague", "Miséricorde", "Arc", "Marteau d'armes", "Écu=Bouclier", "Mangonneau", "Catapulte", "Tour de siège=Beffroi", "Haubert", "Armure de plates=Harnois", "Gantelet", "Bassinet", "Salade", "Cuirasse=Plastron", "Couleuvrine", "Estoc", "Gambison=Aketon", "Brigandine", "Morgenstern=Étoile du matin", "Fléau d'armes", "Arquebuse", "Pavois", "Targe", "Francisque", "Fronde", "Javelot", "Camail"],
 't4': ["Vouge", "Guisarme", "Fauchard", "Coutille", "Bec de corbin", "Grève=Jambière", "Solerets", "Spalière", "Cubitière", "Genouillère", "Cuissard", "Braconnière", "Brassard", "Gorgerin", "Barbute", "Armet", "Chapel de fer", "Cervelière", "Épée bâtarde", "Épée à deux mains", "Fauchon=Falchion", "Braquemart", "Baselard", "Dague à rouelles", "Scramasaxe", "Angon", "Spatha", "Broigne", "Ribaudequin", "Couillard", "Pierrière", "Mantelet", "Goedendag", "Épieu", "Hache danoise", "Haubergeon", "Jaque", "Ailettes", "Casque à nasal", "Tassette", "Dossière", "Veuglaire", "Serpentine", "Espringale", "Fustibale"],
 't5': ["Pot de fer", "Bricole", "Chat"],
 't6': ["Feu grégeois"],
}

T['his-moyenage-14'] = {
 't1': ["Avicenne=Ibn Sina", "Averroès=Ibn Rochd/Ibn Rushd", "Al-Khwarizmi", "Ibn Battuta", "Ibn Khaldoun=Ibn Khaldun", "Omar Khayyam", "Rûmî=Djalal ad-Din Rumi", "Al-Idrisi=Al-Idrissi"],
 't2': ["Alhazen=Ibn al-Haytham"],
 't3': ["Al-Farabi", "Al-Kindi", "Rhazès=Al-Razi/Abu Bakr al-Razi", "Al-Biruni", "Al-Ghazali", "Ibn Arabi", "Hafez", "Saadi", "Ferdowsi=Firdousi", "Abulcasis=Al-Zahrawi", "Jabir ibn Hayyan=Geber", "Al-Battani=Albategnius", "Ibn al-Nafis", "Nasir al-Din al-Tusi", "Ulugh Beg", "Ibn Hazm", "Ibn Jubayr", "Al-Jahiz", "Al-Tabari", "Al-Masudi=Maçoudi", "Ibn Tufayl", "Avenzoar=Ibn Zuhr", "Avempace=Ibn Bajja", "Al-Mutanabbi", "Abu Nuwas", "Ibn Taymiyya", "Al-Bukhari", "Al-Hallaj", "Rabia al-Adawiyya", "Farid al-Din Attar=Attar", "Nizami", "Al-Jazari", "Thabit ibn Qurra", "Al-Sufi=Azophi", "Al-Maarri"],
 't4': ["Banu Musa", "Ibn Zaydun", "Al-Maqrizi", "Yaqut al-Hamawi=Yaqut", "Ahmad ibn Hanbal=Ibn Hanbal", "Al-Shafii", "Abu Hanifa", "Malik ibn Anas", "Muslim ibn al-Hajjaj", "Al-Ashari", "Ibn Ishaq", "Ibn Hisham", "Ibn al-Athir", "Ibn Qutayba", "Al-Zamakhshari", "Sibawayh", "Al-Khalil ibn Ahmad", "Jami", "Al-Kashi", "Ibn al-Shatir", "Arzachel=Al-Zarqali", "Al-Mawardi", "Ibn Majid", "Usama ibn Munqidh", "Al-Suyuti", "Ibn Hajar al-Asqalani", "Al-Qushayri", "Ibn al-Muqaffa", "Abu al-Faraj al-Isfahani"],
 't5': ["Ibn Abi Usaybia", "Al-Qazwini", "Ibn Hawqal", "Al-Muqaddasi"],
 't6': ["Ibn Fadlan"],
}

T['his-moyenage-15'] = {
 't1': ["Notre-Dame de Paris", "Chartres", "Reims", "Amiens", "Cologne", "Strasbourg", "Milan=Duomo de Milan", "Bourges", "Rouen"],
 't2': ["Florence=Santa Maria del Fiore"],
 't3': ["Beauvais", "Laon", "Noyon", "Senlis", "Sens", "Soissons", "Metz", "Auxerre", "Troyes", "Coutances", "Bayeux", "Tours", "Albi", "Clermont-Ferrand", "Narbonne", "Saint-Denis", "Burgos", "Tolède", "León", "Séville", "Barcelone", "Palma=La Seu", "Salisbury", "Canterbury", "York=York Minster", "Lincoln", "Wells", "Exeter", "Ratisbonne=Regensburg", "Vienne (Saint-Étienne)=Stephansdom", "Prague=Saint-Guy", "Anvers", "Sienne", "Orvieto", "Uppsala", "Nidaros=Trondheim"],
 't4': ["Lisieux", "Évreux", "Sées", "Le Mans", "Poitiers", "Limoges", "Rodez", "Toulouse", "Bordeaux", "Bazas", "Meaux", "Toul", "Nevers", "Quimper", "Tréguier", "Saint-Pol-de-Léon", "Nantes", "Dol-de-Bretagne", "Châlons-en-Champagne", "Mende", "Lyon", "Bayonne", "Auch", "Perpignan", "Béziers", "Gérone", "Oviedo", "Pampelune", "Cuenca", "Astorga", "Lichfield", "Worcester", "Gloucester", "Ely", "Fribourg-en-Brisgau", "Magdebourg", "Meissen", "Erfurt", "Halberstadt", "Bruxelles=Saints-Michel-et-Gudule", "Utrecht", "Bois-le-Duc=Saint-Jean de Bois-le-Duc", "Roskilde", "Cracovie=Wawel", "Gniezno", "Frombork", "Košice=Sainte-Élisabeth de Košice", "Zagreb"],
 't5': ["Carcassonne (Saint-Michel)", "Moulins", "Saint-Bertrand-de-Comminges", "Évora", "Königsberg=Kaliningrad"],
 't6': ["Frauenkirche de Munich"],
}
