# Extension Arts & Littérature : littérature francophone (préfixe art-littfr-).
PROMPTS = [
    {'id': 'art-littfr-01', 'text': "Nomme une fable de Jean de La Fontaine"},
    {'id': 'art-littfr-02', 'text': "Nomme une pièce de théâtre de Molière, de Racine ou de Pierre Corneille"},
    {'id': 'art-littfr-03', 'text': "Nomme un personnage d'une pièce de Molière"},
    {'id': 'art-littfr-04', 'text': "Nomme une œuvre de La Comédie humaine de Balzac"},
    {'id': 'art-littfr-05', 'text': "Nomme un personnage de La Comédie humaine de Balzac"},
    {'id': 'art-littfr-06', 'text': "Nomme un personnage des Rougon-Macquart d'Émile Zola"},
    {'id': 'art-littfr-07', 'text': "Nomme un personnage d'un roman de Victor Hugo"},
    {'id': 'art-littfr-08', 'text': "Nomme un personnage d'un roman d'Alexandre Dumas père"},
    {'id': 'art-littfr-09', 'text': "Nomme un titre de roman ou de nouvelle de Simenon mettant en scène le commissaire Maigret"},
    {'id': 'art-littfr-10', 'text': "Nomme un écrivain belge de langue française"},
    {'id': 'art-littfr-11', 'text': "Nomme un écrivain québécois de langue française"},
    {'id': 'art-littfr-12', 'text': "Nomme un écrivain francophone originaire d'Afrique subsaharienne ou de Madagascar"},
    {'id': 'art-littfr-13', 'text': "Nomme un écrivain de langue française né en Algérie, au Maroc ou en Tunisie"},
    {'id': 'art-littfr-14', 'text': "Nomme un écrivain ayant été élu à l'Académie française"},
    {'id': 'art-littfr-15', 'text': "Nomme un écrivain de langue française né aux Antilles, en Guyane ou en Haïti"},
]

T = {}

T['art-littfr-01'] = {
    't1': ["La Cigale et la Fourmi=La Cigale", "Le Corbeau et le Renard=Le Corbeau", "Le Lièvre et la Tortue", "Le Loup et l'Agneau", "La Grenouille qui se veut faire aussi grosse que le Bœuf=La Grenouille et le Bœuf", "Le Lion et le Rat", "Le Rat de ville et le Rat des champs", "Le Loup et le Chien"],
    't2': ["Le Pouvoir des fables"],
    't3': ["Le Chêne et le Roseau", "Les Animaux malades de la peste", "Le Laboureur et ses Enfants", "La Laitière et le Pot au lait=La Laitière/Perrette et le Pot au lait", "Le Renard et la Cigogne", "Le Coche et la Mouche", "La Mort et le Bûcheron", "Le Savetier et le Financier", "Le Meunier, son Fils et l'Âne", "Le Lion et le Moucheron", "La Colombe et la Fourmi", "Le Renard et le Bouc", "Le Chat, la Belette et le petit Lapin", "Le Renard et les Raisins", "Le Loup et la Cigogne", "Les Deux Pigeons", "Le Gland et la Citrouille", "Le Vieillard et les trois jeunes Hommes", "Le Lion devenu vieux", "Le Petit Poisson et le Pêcheur", "La Poule aux œufs d'or", "Le Pot de terre et le Pot de fer", "Le Héron", "Le Loup devenu Berger", "Conseil tenu par les Rats", "Le Lion amoureux", "Les Grenouilles qui demandent un Roi"],
    't4': ["La Fille", "Le Cochet, le Chat et le Souriceau", "Le Rat qui s'est retiré du monde", "Les Deux Coqs", "Le Loup et les Bergers", "Le Renard ayant la queue coupée", "Le Cerf se voyant dans l'eau", "Le Chartier embourbé", "Le Lion et l'Âne chassant", "L'Âne chargé d'éponges et l'Âne chargé de sel", "Le Lion et le Chasseur", "L'Huître et les Plaideurs", "Le Chat et un vieux Rat", "Les Frelons et les Mouches à miel", "Le Dragon à plusieurs têtes et le Dragon à plusieurs queues", "Les Voleurs et l'Âne", "La Mort et le Malheureux", "L'Hirondelle et les petits Oiseaux", "Le Rat et l'Huître", "Le Singe et le Dauphin", "L'Homme et son Image", "Le Loup, la Chèvre et le Chevreau", "Le Loup, la Mère et l'Enfant", "L'Œil du Maître", "L'Alouette et ses Petits, avec le Maître d'un champ", "Le Bûcheron et Mercure", "L'Ours et l'Amateur des jardins", "Les Deux Amis", "Le Chat et le Renard", "Le Rat et l'Éléphant", "Le Lièvre et les Grenouilles", "Le Paon se plaignant à Junon", "La Chatte métamorphosée en Femme", "Le Lion malade et le Renard", "L'Avare qui a perdu son trésor", "La Tortue et les deux Canards", "Le Corbeau voulant imiter l'Aigle", "L'Aigle et l'Escarbot", "La Grenouille et le Rat", "Le Loup et le Renard"],
    't5': ["L'Ivrogne et sa Femme", "La Goutte et l'Araignée", "Le Serpent et la Lime", "Le Mulet se vantant de sa généalogie", "Le Vieillard et l'Âne", "Les Poissons et le Cormoran", "L'Enfouisseur et son Compère", "Le Loup et le Chasseur", "Le Marchand, le Gentilhomme, le Pâtre et le Fils de Roi", "Le Chameau et les Bâtons flottants", "Les Obsèques de la Lionne", "Le Cierge", "Jupiter et le Métayer", "Le Berger et le Roi", "Le Juge arbitre, l'Hospitalier et le Solitaire", "Philémon et Baucis", "Les Filles de Minée", "Le Soleil et les Grenouilles", "Les Compagnons d'Ulysse", "Le Statuaire et la Statue de Jupiter", "La Souris métamorphosée en Fille", "Le Rieur et les Poissons", "Le Milan et le Rossignol", "L'Âne vêtu de la peau du Lion", "Le Mal Marié", "Tircis et Amarante", "Les Deux Perroquets, le Roi et son Fils", "Démocrite et les Abdéritains", "Le Paysan du Danube", "Le Bassa et le Marchand", "Le Faucon et le Chapon", "Le Cheval s'étant voulu venger du Cerf", "La Fortune et le jeune Enfant", "Les Médecins", "L'Âne et le petit Chien", "Le Combat des Rats et des Belettes", "Le Jardinier et son Seigneur", "Le Chien qui lâche sa proie pour l'ombre", "Le Chat et les deux Moineaux", "Le Singe et le Léopard"],
    't6': ["Daphnis et Alcimadure"],
}

T['art-littfr-02'] = {
    't1': ["Le Cid", "Phèdre", "L'Avare", "Le Tartuffe", "Le Misanthrope", "Le Malade imaginaire", "Andromaque", "Le Bourgeois gentilhomme", "Britannicus", "Les Fourberies de Scapin"],
    't2': ["Les Plaideurs"],
    't3': ["Dom Juan=Don Juan/Le Festin de pierre", "L'École des femmes", "Les Femmes savantes", "Les Précieuses ridicules", "Le Médecin malgré lui", "George Dandin", "Bérénice", "Iphigénie", "Horace", "Cinna", "Polyeucte", "L'Illusion comique", "Athalie", "Esther", "Bajazet", "Mithridate", "Le Menteur", "Amphitryon"],
    't4': ["Monsieur de Pourceaugnac", "L'Étourdi", "Le Dépit amoureux", "Sganarelle ou le Cocu imaginaire=Le Cocu imaginaire", "L'École des maris", "Les Fâcheux", "La Critique de l'École des femmes", "L'Impromptu de Versailles", "Le Mariage forcé", "L'Amour médecin", "Le Médecin volant", "La Thébaïde", "Alexandre le Grand", "Médée", "La Place Royale", "Rodogune", "Nicomède", "La Mort de Pompée=Pompée", "Œdipe", "Sertorius", "Suréna", "Attila", "Tite et Bérénice", "Héraclius", "Mélite"],
    't5': ["Dom Garcie de Navarre", "La Princesse d'Élide", "La Jalousie du Barbouillé", "Mélicerte", "Le Sicilien ou l'Amour peintre=Le Sicilien", "Les Amants magnifiques", "La Comtesse d'Escarbagnas", "Clitandre", "La Veuve", "La Galerie du Palais", "La Suivante", "La Suite du Menteur", "Théodore", "Andromède", "Don Sanche d'Aragon", "Pertharite", "La Toison d'or", "Sophonisbe", "Othon", "Agésilas", "Pulchérie"],
    't6': ["Psyché"],
}

T['art-littfr-03'] = {
    't1': ["Harpagon", "Tartuffe", "Scapin", "Monsieur Jourdain=Jourdain", "Argan", "Alceste", "Sganarelle", "Dom Juan=Don Juan", "Célimène", "Orgon"],
    't2': ["Sosie"],
    't3': ["Arnolphe", "Agnès", "Toinette", "Dorine", "Elmire", "Philinte", "Géronte", "Trissotin", "Philaminte", "Mascarille", "George Dandin", "Cléante", "Valère", "Élise", "Mariane", "Damis", "Madame Pernelle", "Covielle", "Madame Jourdain", "Nicole", "Béline", "Thomas Diafoirus", "Monsieur Purgon=Purgon", "Angélique", "Martine", "Chrysale", "Armande", "Henriette", "Frosine", "La Flèche", "Maître Jacques", "Monsieur de Pourceaugnac=Pourceaugnac", "Oronte", "Arsinoé"],
    't4': ["Béralde", "Elvire", "Monsieur Dimanche", "Amphitryon", "Alcmène", "Jupiter", "Mercure", "Cathos", "Magdelon", "Gorgibus", "Jodelet", "Horace", "Chrysalde", "Éliante", "Acaste", "Clitandre", "Vadius", "Bélise", "Ariste", "Dorante", "Dorimène", "Lucile", "Cléonte", "Argante", "Octave", "Léandre", "Zerbinette", "Hyacinte", "Silvestre", "Louison", "Monsieur Diafoirus", "Lucinde", "Anselme", "Monsieur Loyal"],
    't5': ["Alain", "Georgette", "Monsieur Fleurant", "Monsieur Bonnefoy", "Lubin", "Monsieur de Sotenville", "Madame de Sotenville", "Pierrot", "Charlotte", "Mathurine", "Gusman", "Dom Louis", "Dom Carlos", "Dom Alonse", "Lucas", "Jacqueline", "Cléanthis"],
    't6': ["La Statue du Commandeur=Le Commandeur"],
}

T['art-littfr-04'] = {
    't1': ["Le Père Goriot", "Eugénie Grandet", "Illusions perdues", "La Peau de chagrin", "Le Lys dans la vallée", "Le Colonel Chabert", "La Cousine Bette", "Splendeurs et misères des courtisanes"],
    't2': ["Physiologie du mariage"],
    't3': ["Le Cousin Pons", "César Birotteau", "Les Chouans", "La Duchesse de Langeais", "La Fille aux yeux d'or", "Ferragus", "Histoire des Treize", "Gobseck", "Le Chef-d'œuvre inconnu", "Sarrasine", "La Femme de trente ans", "Ursule Mirouët", "La Rabouilleuse", "Le Médecin de campagne", "La Recherche de l'absolu", "Louis Lambert", "Le Curé de Tours", "La Maison du chat-qui-pelote", "Le Bal de Sceaux"],
    't4': ["Modeste Mignon", "Béatrix", "Pierrette", "Le Curé de village", "Mémoires de deux jeunes mariées", "Albert Savarus", "Honorine", "Le Contrat de mariage", "Une fille d'Ève", "La Maison Nucingen", "Les Secrets de la princesse de Cadignan", "Une ténébreuse affaire", "Le Cabinet des Antiques", "La Vieille Fille", "L'Illustre Gaudissart", "La Muse du département", "Les Employés", "Les Paysans", "Séraphîta", "Facino Cane", "La Vendetta", "Une double famille", "L'Auberge rouge", "Une passion dans le désert", "L'Élixir de longue vie", "Melmoth réconcilié", "Le Député d'Arcis", "Les Petits Bourgeois", "L'Envers de l'histoire contemporaine", "Sur Catherine de Médicis", "Petites misères de la vie conjugale", "La Messe de l'athée", "L'Interdiction"],
    't5': ["La Paix du ménage", "La Bourse", "Le Message", "La Grenadière", "La Femme abandonnée", "Étude de femme", "Autre étude de femme", "Adieu", "El Verdugo", "Un drame au bord de la mer", "Maître Cornélius", "Gambara", "Massimilla Doni", "Les Proscrits", "Un épisode sous la Terreur", "Pierre Grassou", "Les Marana", "Z. Marcas", "Un début dans la vie", "Madame Firmiani", "Le Réquisitionnaire", "Les Comédiens sans le savoir", "Un homme d'affaires", "Un prince de la bohème", "Gaudissart II"],
    't6': ["Jésus-Christ en Flandre"],
}

T['art-littfr-05'] = {
    't1': ["Eugène de Rastignac=Rastignac", "Le Père Goriot=Goriot/Jean-Joachim Goriot", "Vautrin=Jacques Collin/Trompe-la-Mort", "Lucien de Rubempré=Lucien Chardon", "Eugénie Grandet", "Félix Grandet=Père Grandet", "Le Colonel Chabert=Chabert", "Raphaël de Valentin", "Lisbeth Fischer=La Cousine Bette/Bette", "César Birotteau=Birotteau"],
    't2': ["Frenhofer"],
    't3': ["Horace Bianchon=Bianchon", "Delphine de Nucingen", "Anastasie de Restaud", "Baron de Nucingen=Nucingen/Frédéric de Nucingen", "Madame Vauquer", "Victorine Taillefer", "Esther Gobseck=Esther van Gobseck", "Gobseck", "Charles Grandet", "Nanon", "Hector Hulot=Baron Hulot", "Adeline Hulot", "Valérie Marneffe=Madame Marneffe", "Célestin Crevel=Crevel", "Sylvain Pons=Le Cousin Pons/Pons", "Schmucke", "Derville", "Henriette de Mortsauf=Madame de Mortsauf", "Félix de Vandenesse", "Louis Lambert", "Ursule Mirouët", "Balthazar Claës", "Henri de Marsay=De Marsay", "Daniel d'Arthez", "David Séchard", "Louise de Bargeton=Madame de Bargeton", "Claire de Beauséant=Madame de Beauséant", "Antoinette de Langeais=Duchesse de Langeais", "Armand de Montriveau=Montriveau", "Maxime de Trailles", "Philippe Bridau", "Flore Brazier=La Rabouilleuse", "Modeste Mignon"],
    't4': ["Étienne Lousteau=Lousteau", "Coralie", "Joseph Bridau", "Jean-Jacques Rouget", "Ève Chardon=Ève Séchard", "Corentin", "Peyrade", "Sarrasine", "Zambinella", "Ferragus", "Paquita Valdès", "Félix Gaudissart=Gaudissart", "Diane de Maufrigneuse=Princesse de Cadignan", "Wenceslas Steinbock", "Lady Dudley=Arabella Dudley", "Foedora", "Pauline Gaudin", "Poiret", "Mademoiselle Michonneau=Michonneau", "Anselme Popinot=Popinot", "Ferdinand du Tillet=Du Tillet", "Jean-Jacques Bixiou=Bixiou", "Andoche Finot=Finot", "Benassis", "Véronique Graslin", "Marie de Verneuil", "Marquis de Montauran=Montauran", "Pierrette Lorrain=Pierrette", "Madame Cibot=La Cibot", "Marguerite Claës", "Raoul Nathan", "Melchior de Canalis=Canalis"],
    't5': ["Marche-à-Terre", "Rogron", "Rémonencq", "Fraisier", "Camusot", "Bibi-Lupin", "Louise de Chaulieu", "Renée de l'Estorade", "Béatrix de Rochefide", "Félicité des Touches=Camille Maupin", "Calyste du Guénic", "Gillette", "Porbus", "Victurnien d'Esgrignon", "Laurence de Cinq-Cygne", "Michu", "Facino Cane", "Z. Marcas"],
    't6': ["Nicolas Poussin=Poussin"],
}

T['art-littfr-06'] = {
    't1': ["Gervaise Macquart=Gervaise", "Nana=Anna Coupeau", "Étienne Lantier", "Coupeau", "Octave Mouret", "Claude Lantier", "Jacques Lantier", "Denise Baudu", "Aristide Saccard=Saccard/Aristide Rougon"],
    't2': ["Tante Dide=Adélaïde Fouque"],
    't3': ["Pascal Rougon=Docteur Pascal", "Clotilde Rougon=Clotilde", "Eugène Rougon", "Pierre Rougon", "Félicité Rougon", "Antoine Macquart", "Lisa Macquart=Lisa Quenu", "Quenu", "Florent", "Serge Mouret=Abbé Mouret", "Albine", "Renée Saccard=Renée", "Maxime Saccard=Maxime", "Jean Macquart", "Hélène Grandjean=Hélène Mouret", "Auguste Lantier=Lantier", "Goujet", "Virginie Poisson=Virginie", "Lalie Bijard=Lalie", "Maheu", "La Maheude", "Catherine Maheu", "Bonnemort", "Chaval", "Souvarine", "Comte Muffat=Muffat", "Séverine Aubry=Séverine", "Roubaud", "Christine Hallegrain", "Sandoz", "Silvère Mouret=Silvère", "Miette", "Angélique Marie=Angélique", "Pauline Quenu"],
    't4': ["Désirée Mouret", "Jeanne Grandjean", "Bijard", "Zacharie Maheu", "Jeanlin", "Alzire", "Rasseneur", "Hennebeau", "Négrel", "Deneulin", "Cécile Grégoire", "Satin", "Bordenave", "Fontan", "Steiner", "Fauchery", "Georges Hugon", "Flore", "Misard", "Grandmorin", "Pecqueur", "Cabuche", "Fagerolles", "Bongrand", "Dubuche", "Gundermann", "Madame Caroline", "Hamelin", "Busch", "Lazare Chanteau", "Fouan", "Buteau", "Françoise Mouche", "Félicien d'Hautecœur", "Bourdoncle", "Baudu", "Henriette Moret? ".replace('? ', '') if False else "Madame Desforges", "Marthe Mouret", "François Mouret", "Abbé Faujas", "Maurice Levasseur", "Gilquin"],
    't5': ["Hubertine", "Geneviève Baudu", "Colomban", "Robineau", "Mahoudeau", "Sigismond Busch", "Lise Fouan", "Clorinde Balbi=Clorinde", "Delestang", "Mademoiselle Saget", "La Sarriette", "Gavard", "Marjolin", "Cadine", "Muche", "Louise Méhudin=La Normande", "Claire Méhudin", "Duverdy", "Vabre", "Berthe Josserand", "Madame Josserand", "Campardon", "Trublot", "Abbé Mauduit", "Henriette Weiss", "Mouche"],
    't6': ["Jésus-Christ=Hyacinthe Fouan"],
}

T['art-littfr-07'] = {
    't1': ["Jean Valjean=Valjean", "Javert", "Cosette", "Fantine", "Gavroche", "Marius Pontmercy=Marius", "Esmeralda", "Quasimodo", "Claude Frollo=Frollo", "Thénardier"],
    't2': ["Louis XI"],
    't3': ["Madame Thénardier=La Thénardier", "Éponine", "Azelma", "Enjolras", "Monseigneur Myriel=Myriel/Monseigneur Bienvenu", "Fauchelevent", "Monsieur Gillenormand=Gillenormand", "Georges Pontmercy", "Phoebus de Châteaupers=Phoebus", "Pierre Gringoire=Gringoire", "Clopin Trouillefou=Clopin", "Fleur-de-Lys de Gondelaurier=Fleur-de-Lys", "Djali", "Gwynplaine", "Dea", "Ursus", "Gilliatt", "Déruchette", "Marquis de Lantenac=Lantenac", "Gauvain", "Cimourdain", "Grantaire"],
    't4': ["Jehan Frollo", "Paquette la Chantefleurie=Sœur Gudule/Gudule", "Josiane", "Barkilphedro", "Mess Lethierry=Lethierry", "Clubin=Sieur Clubin", "Ebenezer Caudray", "Michelle Fléchard", "Combeferre", "Courfeyrac", "Bahorel", "Feuilly", "Jean Prouvaire", "Joly", "Bossuet=Lesgle/Laigle", "Mabeuf", "Tholomyès", "Favourite", "Montparnasse", "Babet", "Gueulemer", "Claquesous", "Brujon", "Patron-Minette", "Champmathieu", "Petit-Gervais", "Mademoiselle Baptistine=Baptistine", "Madame Magloire", "Toussaint", "Claude Gueux", "Bug-Jargal", "Han d'Islande"],
    't5': ["Bamatabois", "Magnon", "Boulatruelle", "Mademoiselle Gillenormand", "Théodule Gillenormand", "Ordener", "Éthel", "Schumacker", "Léopold d'Auverney", "Biassou", "Radoub", "Halmalo", "Tellmarch", "Hardquanonne", "Lord David Dirry-Moir"],
    't6': ["Homo"],
}

T['art-littfr-08'] = {
    't1': ["D'Artagnan", "Athos", "Porthos", "Aramis", "Milady de Winter=Milady", "Edmond Dantès=Le Comte de Monte-Cristo/Monte-Cristo/Abbé Busoni/Lord Wilmore", "Cardinal de Richelieu=Richelieu", "Constance Bonacieux"],
    't2': ["Mazarin=Cardinal Mazarin"],
    't3': ["Comte de Rochefort=Rochefort", "Planchet", "Grimaud", "Mousqueton", "Bazin", "Monsieur de Tréville=Tréville", "Duc de Buckingham=Buckingham", "Anne d'Autriche", "Louis XIII", "Mordaunt", "Raoul de Bragelonne=Vicomte de Bragelonne/Raoul", "Louise de La Vallière", "Nicolas Fouquet=Fouquet", "Colbert", "Louis XIV", "Mercédès", "Fernand Mondego=Comte de Morcerf", "Danglars", "Gérard de Villefort=Villefort", "Caderousse", "Abbé Faria=Faria", "Haydée", "Albert de Morcerf", "Marguerite de Valois=La Reine Margot/Margot", "Henri de Navarre", "La Mole", "Coconnas", "Catherine de Médicis", "Charles IX", "Chicot", "Bussy d'Amboise=Bussy", "Lord de Winter", "Felton", "Monsieur Bonacieux", "L'Homme au masque de fer=Le Masque de fer"],
    't4': ["Franz d'Épinay", "Maximilien Morrel", "Valentine de Villefort", "Noirtier de Villefort=Noirtier", "Héloïse de Villefort", "Bertuccio", "Luigi Vampa", "Benedetto=Andrea Cavalcanti", "Eugénie Danglars", "Pierre Morrel=Monsieur Morrel", "Louis Dantès", "Ketty", "Diane de Méridor", "Comte de Monsoreau=Monsoreau", "Henri III", "Cornelius van Baerle", "Joseph Balsamo=Cagliostro", "Ange Pitou", "Andrée de Taverney", "Le Chevalier de Maison-Rouge"],
    't5': ["Jacopo", "Ali", "René le Florentin=Maître René", "Maurevel", "Henriette de Nevers", "Rosa", "Philippe"],
    't6': ["Gorenflot=Frère Gorenflot"],
}

T['art-littfr-09'] = {
    't1': ["Pietr-le-Letton", "Le Chien jaune", "La Tête d'un homme", "L'Affaire Saint-Fiacre", "Maigret tend un piège", "Les Mémoires de Maigret", "La Nuit du carrefour", "Maigret et la Grande Perche"],
    't2': ["Maigret"],
    't3': ["La Pipe de Maigret", "Les Vacances de Maigret", "La Première Enquête de Maigret", "Mon ami Maigret", "Maigret à New York", "Maigret se fâche", "Maigret et la Vieille Dame", "L'Amie de Madame Maigret", "Maigret au Picratt's", "Maigret a peur", "Maigret se trompe", "Maigret à l'école", "Maigret et la Jeune Morte", "Maigret chez le ministre", "Maigret et le Corps sans tête", "Un échec de Maigret", "Maigret s'amuse", "Maigret voyage", "Maigret aux assises", "Maigret et le Clochard", "La Colère de Maigret", "Maigret à Vichy", "La Folle de Maigret", "Le Revolver de Maigret", "Maigret et les Vieillards", "Maigret et le Fantôme", "Maigret hésite", "Le Voleur de Maigret", "La Patience de Maigret"],
    't4': ["Monsieur Gallet décédé", "Le Pendu de Saint-Pholien", "Le Charretier de la Providence", "Un crime en Hollande", "Au rendez-vous des Terre-Neuvas", "La Danseuse du Gai-Moulin", "La Guinguette à deux sous", "L'Ombre chinoise", "Chez les Flamands", "Le Fou de Bergerac", "Le Port des brumes", "Liberty Bar", "L'Écluse n° 1=L'Écluse numéro 1", "Cécile est morte", "Félicie est là", "Les Caves du Majestic", "La Maison du juge", "L'Inspecteur Cadavre", "Maigret et son mort", "Maigret chez le coroner", "Maigret en meublé", "Maigret, Lognon et les Gangsters", "Maigret et l'Homme du banc", "Les Scrupules de Maigret", "Maigret et les Témoins récalcitrants", "Une confidence de Maigret", "Maigret et le Voleur paresseux", "Maigret et les Braves Gens", "Maigret et le Client du samedi", "Maigret se défend", "Maigret et l'Affaire Nahour", "L'Ami d'enfance de Maigret", "Maigret et le Tueur", "Maigret et le Marchand de vin", "Maigret et l'Homme tout seul", "Maigret et l'Indicateur", "Maigret et Monsieur Charles", "Un Noël de Maigret"],
    't5': ["Maigret et l'Inspecteur Malgracieux", "Le Témoignage de l'enfant de chœur"],
    't6': ["Signé Picpus"],
}

T['art-littfr-10'] = {
    't1': ["Georges Simenon=Simenon", "Amélie Nothomb=Nothomb", "Maurice Maeterlinck=Maeterlinck", "Émile Verhaeren=Verhaeren", "Henri Michaux=Michaux", "Charles De Coster"],
    't2': ["Éric-Emmanuel Schmitt"],
    't3': ["Georges Rodenbach", "Michel de Ghelderode", "Fernand Crommelynck", "Jean Ray", "Henri Bauchau", "Jacqueline Harpman", "Jean-Philippe Toussaint", "François Weyergans", "Françoise Mallet-Joris", "Dominique Rolin", "Charles Plisnier", "Camille Lemonnier", "Thomas Owen", "Stanislas-André Steeman", "Henri Vernes", "Paul Nougé", "Marie Gevers", "Suzanne Lilar", "Thomas Gunzig", "Adeline Dieudonné", "Pierre Mertens", "Barbara Abel"],
    't4': ["Max Elskamp", "Charles Van Lerberghe", "Achille Chavée", "Christian Dotremont", "Franz Hellens", "Georges Eekhoud", "Albert Giraud", "Iwan Gilkin", "Grégoire Le Roy", "Odilon-Jean Périer", "Marcel Thiry", "Jean Muno", "Paul Willems", "William Cliff", "Eugène Savitzkaya", "Jean-Claude Pirotte", "Liliane Wouters", "Conrad Detrez", "Jacques Sternberg", "Nicolas Ancion", "Caroline Lamarche", "Patrick Roegiers", "Louis Scutenaire", "Marcel Mariën", "Jean Louvet", "Carl Norac", "Pierre Coran", "Geneviève Damas"],
    't5': ["Werner Lambersy", "Jean-Luc Outers", "Xavier Hanotte", "Gaston Compère", "Marcel Moreau", "Hubert Juin", "Charles Bertin", "Vera Feyder", "Jean-Pierre Verheggen", "Paul Émond", "Jean-Baptiste Baronian", "Franck Andriat"],
    't6': ["Raoul Vaneigem"],
}

T['art-littfr-11'] = {
    't1': ["Michel Tremblay", "Anne Hébert", "Réjean Ducharme", "Émile Nelligan=Nelligan", "Gaston Miron", "Marie-Claire Blais", "Hubert Aquin", "Yves Beauchemin", "Kim Thúy"],
    't2': ["Dany Laferrière"],
    't3': ["Jacques Poulin", "Ringuet=Philippe Panneton", "Germaine Guèvremont", "Roger Lemelin", "Yves Thériault", "Hector de Saint-Denys Garneau=Saint-Denys Garneau", "Alain Grandbois", "Nicole Brossard", "Jacques Ferron", "Victor-Lévy Beaulieu", "Nelly Arcan", "Gaétan Soucy", "Marie Laberge", "Arlette Cousture", "Michel David", "Chrystine Brouillet", "Patrick Senécal", "Bryan Perro", "Dominique Demers", "Jacques Godbout", "Gratien Gélinas", "Marcel Dubé", "Michel Marc Bouchard", "Wajdi Mouawad", "Louis Fréchette", "Félix-Antoine Savard", "Claude-Henri Grignon", "Philippe Aubert de Gaspé"],
    't4': ["Rina Lasnier", "Paul-Marie Lapointe", "Gérald Godin", "Claude Gauvreau", "Monique Proulx", "Louis Caron", "François-Xavier Garneau", "Octave Crémazie", "Gérard Bessette", "André Langevin", "Albert Laberge", "Louis Hamelin", "Éric Dupont", "Michel Jean", "Naomi Fontaine", "Joséphine Bacon", "Jocelyne Saucier", "Dominique Fortier", "Larry Tremblay", "Nicolas Dickner", "Ying Chen", "Sergio Kokis", "Laure Conan", "Fred Pellerin", "Hélène Dorion", "Suzanne Jacob"],
    't5': ["Catherine Mavrikakis", "Christian Guay-Poliquin", "Francine Noël", "Stéphane Bourguignon", "Fernand Ouellette", "Jean-Paul Desbiens=Frère Untel", "Pierre Vallières", "Denise Bombardier"],
    't6': ["Gilles Vigneault"],
}

T['art-littfr-12'] = {
    't1': ["Léopold Sédar Senghor=Senghor", "Camara Laye", "Mongo Beti", "Ahmadou Kourouma=Kourouma", "Alain Mabanckou=Mabanckou", "Mariama Bâ", "Cheikh Hamidou Kane", "Ousmane Sembène=Sembène Ousmane/Sembène", "Birago Diop"],
    't2': ["Gaël Faye"],
    't3': ["Ferdinand Oyono", "Aminata Sow Fall", "David Diop", "Bernard Dadié", "Sony Labou Tansi", "Tchicaya U Tam'si", "Henri Lopes", "Emmanuel Dongala", "Calixthe Beyala", "Léonora Miano", "Fatou Diome", "Boubacar Boris Diop", "Mohamed Mbougar Sarr", "Yambo Ouologuem", "Amadou Hampâté Bâ", "Tierno Monénembo", "Scholastique Mukasonga", "Abdourahman Waberi", "Véronique Tadjo", "Ken Bugul", "Djibril Tamsir Niane", "Djaïli Amadou Amal"],
    't4': ["Williams Sassine", "Jean-Marie Adiaffi", "Seydou Badian", "Massa Makan Diabaté", "Olympe Bhêly-Quenum", "Paul Hazoumé", "Jean Pliya", "Kossi Efoui", "Sami Tchak", "Jean-Luc Raharimanana", "Jacques Rabemananjara", "Flavien Ranaivo", "Ousmane Socé", "Abdoulaye Sadji", "Florent Couao-Zotti", "Wilfried N'Sondé", "In Koli Jean Bofane", "Fiston Mwanza Mujila", "Hemley Boum", "Patrice Nganang", "Gaston-Paul Effa", "Eugène Ébodé", "Werewere Liking", "Guillaume Oyônô Mbia", "Francis Bebey", "Tanella Boni", "Moussa Konaté", "Koulsy Lamko", "Valentin-Yves Mudimbe=V. Y. Mudimbe"],
    't5': ["Malick Fall", "René Philombe", "Maurice Bandaman", "Aké Loba", "Charles Nokan", "Monique Ilboudo", "Nazi Boni", "Ibrahima Ly", "Nimrod", "Sylvain Bemba", "Jean Malonga", "Guy Menga", "Pius Ngandu Nkashama"],
    't6': ["Jean-Joseph Rabearivelo"],
}

T['art-littfr-13'] = {
    't1': ["Albert Camus=Camus", "Tahar Ben Jelloun", "Kateb Yacine", "Assia Djebar", "Yasmina Khadra=Mohammed Moulessehoul", "Kamel Daoud", "Leïla Slimani", "Mohammed Dib", "Boualem Sansal", "Mouloud Feraoun"],
    't2': ["Jacques Derrida"],
    't3': ["Mouloud Mammeri", "Rachid Boudjedra", "Rachid Mimouni", "Driss Chraïbi", "Abdellatif Laâbi", "Albert Memmi", "Hélène Cixous", "Emmanuel Roblès", "Jules Roy", "Marie Cardinal", "Jean Amrouche", "Taos Amrouche=Marguerite Taos Amrouche", "Malek Haddad", "Maïssa Bey", "Tahar Djaout", "Fouad Laroui", "Abdelkébir Khatibi", "Abdellah Taïa", "Kaouther Adimi", "Leïla Sebbar", "Bernard-Henri Lévy=BHL"],
    't4': ["Mohammed Khaïr-Eddine", "Abdelwahab Meddeb", "Mahi Binebine", "Edmond Amran El Maleh", "Abdelhak Serhane", "Hélé Béji", "Tahar Bekri", "Mustapha Tlili", "Salim Bachi", "Anouar Benmalek", "Jean Pélégri", "Jean Sénac", "Jean Daniel", "Colette Fellous", "Albert Bensoussan", "Ahmed Sefrioui", "Fatima Mernissi", "Gisèle Halimi"],
    't5': ["Yamina Mechakra", "Aziz Chouaki", "Mohamed Kacimi", "Mustapha Benfodil", "Habib Tengour", "Mohamed Leftah", "Abdelfattah Kilito", "Malek Alloula"],
    't6': ["Jacques Attali"],
}

T['art-littfr-14'] = {
    't1': ["Victor Hugo", "Jean d'Ormesson", "Marguerite Yourcenar", "Jean Racine", "Pierre Corneille", "Voltaire", "Jean de La Fontaine", "Marcel Pagnol", "Jean Cocteau", "François-René de Chateaubriand=Chateaubriand"],
    't2': ["Charles Perrault"],
    't3': ["Alphonse de Lamartine=Lamartine", "Alfred de Musset", "Alfred de Vigny", "Prosper Mérimée", "Sainte-Beuve", "Anatole France", "Pierre Loti", "Paul Valéry", "François Mauriac", "Paul Claudel", "Joseph Kessel", "Maurice Druon", "Maurice Genevoix", "André Maurois", "Georges Duhamel", "Jules Romains", "Henry de Montherlant", "Eugène Ionesco", "Julien Green", "Henri Troyat", "Edmond Rostand", "Montesquieu", "Nicolas Boileau=Boileau", "Jean de La Bruyère", "Fénelon", "Bossuet", "Marivaux", "Léopold Sédar Senghor", "Assia Djebar", "Dany Laferrière", "Amin Maalouf", "Jean-Christophe Rufin", "Erik Orsenna", "Jacqueline de Romilly", "Michel Serres"],
    't4': ["Buffon", "Fontenelle", "Max Gallo", "Alain Finkielkraut", "Michel Déon", "Pierre Benoit", "Maurice Barrès", "Paul Bourget", "Ernest Renan", "Hippolyte Taine", "José-Maria de Heredia", "Sully Prudhomme", "Leconte de Lisle", "Alexandre Dumas fils", "Victorien Sardou", "Eugène Labiche", "Henri de Régnier", "Andreï Makine", "Hélène Carrère d'Encausse", "Jean-Marie Rouart", "Jean Dutourd", "Félicien Marceau", "Henri Bergson", "Pierre Nora", "Jean Rostand", "Alain Robbe-Grillet", "Paul Morand", "François Cheng", "Claude Lévi-Strauss", "Alexis de Tocqueville", "Charles Nodier", "Eugène Scribe", "Condorcet", "D'Alembert", "Alain Decaux"],
    't5': ["Marc Lambron", "Dominique Bona", "Frédéric Vitoux", "Daniel Rondeau", "Patrick Grainville", "Jean-Loup Dabadie", "Michel Mohrt", "Jules Sandeau", "Octave Feuillet", "Émile Augier", "Ludovic Halévy", "Casimir Delavigne", "François Guizot", "Adolphe Thiers", "Jean-François Marmontel", "Jacques Delille", "Bernardin de Saint-Pierre", "Jean Guéhenno", "Marcel Achard", "Pierre-Jean Rémy", "Jean-Denis Bredin", "Angelo Rinaldi", "Florence Delay", "Danièle Sallenave", "Bertrand Poirot-Delpech", "Jean-François Revel", "Michel Zink"],
    't6': ["Valéry Giscard d'Estaing"],
}

T['art-littfr-15'] = {
    't1': ["Aimé Césaire=Césaire", "Patrick Chamoiseau=Chamoiseau", "Édouard Glissant=Glissant", "Maryse Condé", "Raphaël Confiant", "Léon-Gontran Damas", "Dany Laferrière", "Frantz Fanon", "Simone Schwarz-Bart"],
    't2': ["Saint-John Perse=Alexis Leger"],
    't3': ["Joseph Zobel", "Gisèle Pineau", "Daniel Maximin", "Ernest Pépin", "Guy Tirolien", "René Maran", "Suzanne Césaire", "Jacques Roumain", "Jacques Stephen Alexis", "René Depestre", "Frankétienne", "Jean Price-Mars", "Marie Vieux-Chauvet=Marie Chauvet", "Lyonel Trouillot", "Yanick Lahens", "Gary Victor", "Kettly Mars", "Louis-Philippe Dalembert", "Émile Ollivier", "Makenzy Orcel"],
    't4': ["Paul Niger", "Vincent Placoly", "Xavier Orville", "Évelyne Trouillot", "Rodney Saint-Éloi", "Anthony Phelps", "Georges Castera", "Oswald Durand", "Justin Lhérisson", "Fernand Hibbert", "Massillon Coicou", "Jean F. Brierre=Jean Brierre", "Roussan Camille", "Jean-Claude Fignolé", "Marie-Célie Agnant", "Philippe Thoby-Marcelin", "Bertène Juminer", "Sonny Rupaire", "Gilbert Gratiant", "Jean Métellus", "Gerty Dambury"],
    't5': ["Carl Brouard", "Paul Laraque", "Serge Patient", "Élie Stephenson", "Dany Bébel-Gisler", "Myriam Warner-Vieyra", "Max Rippon", "Joël Des Rosiers", "Davertige", "Marie-Magdeleine Carbet", "Joby Bernabé"],
    't6': ["Félix Morisseau-Leroy"],
}
