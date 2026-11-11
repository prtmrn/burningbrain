PROMPTS = [
    {'id': 'art-peinture-01', 'text': 'Nomme un peintre espagnol (toutes époques)'},
    {'id': 'art-peinture-02', 'text': 'Nomme un peintre allemand ou autrichien (toutes époques)'},
    {'id': 'art-peinture-03', 'text': 'Nomme un peintre américain (États-Unis)'},
    {'id': 'art-peinture-04', 'text': 'Nomme un peintre britannique'},
    {'id': 'art-peinture-05', 'text': "Nomme un peintre russe ou né dans l'Empire russe"},
    {'id': 'art-peinture-06', 'text': 'Nomme un peintre ou plasticien italien actif au XXe siècle'},
    {'id': 'art-peinture-07', 'text': 'Nomme une technique, un procédé ou un médium de peinture, de dessin ou de gravure'},
    {'id': 'art-peinture-08', 'text': 'Nomme une femme peintre'},
    {'id': 'art-peinture-09', 'text': "Nomme un peintre japonais ou un maître japonais de l'estampe"},
    {'id': 'art-peinture-10', 'text': 'Nomme un peintre français actif au XVIIe ou au XVIIIe siècle'},
    {'id': 'art-peinture-11', 'text': 'Nomme un peintre ou plasticien associé au mouvement surréaliste'},
    {'id': 'art-peinture-12', 'text': 'Nomme un tableau de Vincent van Gogh'},
    {'id': 'art-peinture-13', 'text': "Nomme un peintre ou plasticien d'Amérique latine"},
    {'id': 'art-peinture-14', 'text': 'Nomme un peintre nordique (Danemark, Norvège, Suède, Finlande ou Islande)'},
    {'id': 'art-peinture-15', 'text': 'Nomme un pigment ou une couleur de pigment utilisé en peinture'},
]

T = {}

T['art-peinture-01'] = {
 't1': ["Pablo Picasso=Picasso", "Salvador Dalí=Dalí", "Francisco de Goya=Goya", "Diego Velázquez=Velázquez/Velasquez", "Joan Miró=Miró", "Bartolomé Esteban Murillo=Murillo", "Francisco de Zurbarán=Zurbarán", "Joaquín Sorolla=Sorolla"],
 't2': ["Le Greco=Domínikos Theotokópoulos/Theotokopoulos"],
 't3': ["José de Ribera=Ribera/Jusepe de Ribera/Lo Spagnoletto", "Juan Gris=Gris", "Antoni Tàpies=Tàpies", "Mariano Fortuny=Fortuny/Marià Fortuny", "Ignacio Zuloaga=Zuloaga", "Santiago Rusiñol=Rusiñol", "Ramon Casas=Casas", "Antonio Saura=Saura", "Miquel Barceló=Barceló", "Juan Sánchez Cotán=Sánchez Cotán", "Alonso Cano", "Juan de Valdés Leal=Valdés Leal", "Antonio López García=Antonio López", "Julio Romero de Torres=Romero de Torres", "José Gutiérrez Solana=Gutiérrez Solana", "Maruja Mallo", "María Blanchard", "Óscar Domínguez", "Isidre Nonell=Nonell", "Joaquim Mir"],
 't4': ["Alonso Sánchez Coello=Sánchez Coello", "Claudio Coello", "Juan Pantoja de la Cruz=Pantoja de la Cruz", "Luis de Morales=El Divino Morales", "Pedro Berruguete=Berruguete", "Bartolomé Bermejo=Bermejo", "Francisco Ribalta=Ribalta", "Juan Carreño de Miranda=Carreño de Miranda", "Luis Egidio Meléndez=Meléndez", "Luis Paret=Paret", "Francisco Bayeu=Bayeu", "Federico de Madrazo=Madrazo", "Eduardo Rosales", "Francisco Pradilla=Pradilla", "Darío de Regoyos=Regoyos", "Aureliano de Beruete=Beruete", "Hermenegildo Anglada Camarasa=Anglada Camarasa", "Joaquim Sunyer=Sunyer", "Daniel Vázquez Díaz=Vázquez Díaz", "Benjamín Palencia", "Manolo Millares=Millares", "Luis Feito=Feito", "Rafael Canogar=Canogar", "Manolo Valdés", "Eduardo Arroyo", "Josep Maria Sert=José María Sert", "Fernando Zóbel=Zóbel", "Pablo Palazuelo=Palazuelo", "Juan Genovés=Genovés"],
 't5': ["Juan de Juanes", "Fernando Gallego", "Jaume Huguet=Huguet", "Bernat Martorell", "Lluís Dalmau", "Juan Bautista Maíno=Maíno", "Eugenio Cajés", "Antonio de Pereda=Pereda", "Juan de Arellano", "Juan van der Hamen", "Agustín Esteve", "Vicente López Portaña", "Leonardo Alenza=Alenza", "Eugenio Lucas Velázquez", "Genaro Pérez Villaamil", "Valeriano Bécquer", "Ramon Martí Alsina", "Antonio Muñoz Degrain", "Cecilio Plá", "Ángeles Santos", "Luis Gordillo", "José Guerrero", "Esteban Vicente", "Gustavo Torner", "Josep Guinovart", "Modest Cuixart", "Joan Ponç", "Joan Hernández Pijuan"],
 't6': ["Remedios Varo"],
}

T['art-peinture-02'] = {
 't1': ["Albrecht Dürer=Dürer", "Gustav Klimt=Klimt", "Egon Schiele=Schiele", "Caspar David Friedrich=Friedrich", "Lucas Cranach l'Ancien=Cranach/Lucas Cranach", "Hans Holbein le Jeune=Holbein/Hans Holbein", "Otto Dix=Dix", "Gerhard Richter=Richter", "Max Ernst"],
 't2': ["Paul Klee=Klee"],
 't3': ["Matthias Grünewald=Grünewald", "Albrecht Altdorfer=Altdorfer", "Hans Baldung Grien=Hans Baldung/Baldung", "Oskar Kokoschka=Kokoschka", "Ernst Ludwig Kirchner=Kirchner", "Emil Nolde=Nolde", "Franz Marc", "August Macke=Macke", "Max Beckmann=Beckmann", "George Grosz=Grosz", "Adolph Menzel=Menzel/Adolph von Menzel", "Max Liebermann=Liebermann", "Lovis Corinth=Corinth", "Anselm Kiefer=Kiefer", "Georg Baselitz=Baselitz", "Sigmar Polke=Polke", "Gabriele Münter=Münter", "Paula Modersohn-Becker=Modersohn-Becker", "Kurt Schwitters=Schwitters", "Friedensreich Hundertwasser=Hundertwasser", "Carl Spitzweg=Spitzweg", "Franz von Stuck=Franz Stuck", "Erich Heckel=Heckel", "Karl Schmidt-Rottluff=Schmidt-Rottluff", "Max Pechstein=Pechstein"],
 't4': ["Otto Mueller", "Philipp Otto Runge=Runge", "Wilhelm Leibl=Leibl", "Max Slevogt=Slevogt", "Anselm Feuerbach", "Franz von Lenbach=Lenbach", "Hans Makart=Makart", "Ferdinand Georg Waldmüller=Waldmüller", "Richard Gerstl=Gerstl", "Koloman Moser=Kolo Moser", "Stefan Lochner=Lochner", "Martin Schongauer=Schongauer", "Christian Schad", "Oskar Schlemmer=Schlemmer", "Josef Albers=Albers", "Hans Hartung=Hartung", "Wols", "Jörg Immendorff=Immendorff", "Markus Lüpertz=Lüpertz", "A. R. Penck=Penck", "Martin Kippenberger=Kippenberger", "Neo Rauch", "Albert Oehlen", "Hannah Höch", "Adam Elsheimer=Elsheimer", "Anton Raphael Mengs=Mengs", "Maria Lassnig", "Arnulf Rainer"],
 't5': ["Johann Friedrich Overbeck=Overbeck", "Peter von Cornelius", "Carl Gustav Carus", "Georg Friedrich Kersting", "Willi Baumeister", "Ernst Wilhelm Nay", "Fritz Winter", "Rudolf von Alt", "Hans von Marées", "Michael Wolgemut", "Hans Burgkmair", "Hans von Aachen", "Herbert Boeckl", "Hermann Nitsch", "Conrad Felixmüller", "Rudolf Schlichter", "Jeanne Mammen", "Ludwig Meidner", "Heinrich Campendonk", "Moritz von Schwind", "Wilhelm von Kaulbach", "Carl Blechen"],
 't6': ["Franz Xaver Winterhalter=Winterhalter"],
}

T['art-peinture-03'] = {
 't1': ["Edward Hopper=Hopper", "Andy Warhol=Warhol", "Jackson Pollock=Pollock", "Georgia O'Keeffe=O'Keeffe", "Mark Rothko=Rothko", "Roy Lichtenstein=Lichtenstein", "Norman Rockwell=Rockwell", "Jean-Michel Basquiat=Basquiat", "Keith Haring=Haring"],
 't2': ["James Abbott McNeill Whistler=Whistler/James Whistler"],
 't3': ["John Singer Sargent=Sargent", "Mary Cassatt=Cassatt", "Winslow Homer", "Willem de Kooning=de Kooning", "Andrew Wyeth", "Grant Wood", "Jasper Johns", "Robert Rauschenberg=Rauschenberg", "Franz Kline", "Robert Motherwell=Motherwell", "Barnett Newman", "Clyfford Still", "Helen Frankenthaler=Frankenthaler", "Cy Twombly=Twombly", "Frank Stella", "James Rosenquist=Rosenquist", "Tom Wesselmann=Wesselmann", "Robert Indiana", "Ed Ruscha=Ruscha", "Wayne Thiebaud=Thiebaud", "Richard Diebenkorn=Diebenkorn", "Chuck Close", "Alex Katz", "Philip Guston=Guston", "Arshile Gorky=Gorky", "Lee Krasner=Krasner", "Joan Mitchell", "Thomas Eakins=Eakins", "Thomas Cole", "Albert Bierstadt=Bierstadt", "Frederic Edwin Church", "Gilbert Stuart", "John Singleton Copley=Copley"],
 't4': ["Morris Louis", "Kenneth Noland", "Ellsworth Kelly", "Agnes Martin", "Ad Reinhardt=Reinhardt", "Mark Tobey", "Marsden Hartley", "Charles Demuth", "Charles Sheeler", "Stuart Davis", "John Marin", "Arthur Dove", "George Bellows", "Robert Henri", "John Sloan", "William Glackens", "Thomas Hart Benton", "John Steuart Curry", "Benjamin West", "Charles Willson Peale", "John James Audubon=Audubon", "George Catlin", "George Caleb Bingham", "Albert Pinkham Ryder", "William Merritt Chase", "Childe Hassam", "Larry Rivers", "Jacob Lawrence", "Alice Neel", "Grandma Moses", "Kehinde Wiley", "Julian Schnabel", "Richard Estes", "Robert Ryman", "Brice Marden"],
 't5': ["John Henry Twachtman", "Romare Bearden", "Kerry James Marshall", "Eric Fischl", "David Salle", "Jim Dine", "Mel Ramos", "Fitz Henry Lane", "Martin Johnson Heade", "George Inness", "Asher Brown Durand", "Thomas Moran", "Frederic Remington", "Charles Marion Russell", "Rembrandt Peale", "Edward Hicks", "Hans Hofmann", "Ben Shahn", "Ivan Albright", "Charles Burchfield", "Reginald Marsh", "Rockwell Kent", "N. C. Wyeth", "Jamie Wyeth", "Maxfield Parrish", "Henry Ossawa Tanner", "Sam Francis", "Adolph Gottlieb", "William Baziotes", "Philip Pearlstein", "Fairfield Porter", "David Park", "Florine Stettheimer", "Elaine de Kooning"],
 't6': ["Bob Ross"],
}

T['art-peinture-04'] = {
 't1': ["William Turner=Turner/J. M. W. Turner/Joseph Mallord William Turner", "John Constable=Constable", "Thomas Gainsborough=Gainsborough", "Francis Bacon", "David Hockney=Hockney", "William Hogarth=Hogarth", "Joshua Reynolds=Reynolds"],
 't2': ["Alfred Sisley=Sisley"],
 't3': ["William Blake", "Lucian Freud", "Dante Gabriel Rossetti=Rossetti", "John Everett Millais=Millais", "William Holman Hunt=Holman Hunt", "Edward Burne-Jones=Burne-Jones", "John William Waterhouse=Waterhouse", "George Stubbs=Stubbs", "Thomas Lawrence", "Joseph Wright of Derby=Wright of Derby", "L. S. Lowry=Lowry/Laurence Stephen Lowry", "Walter Sickert=Sickert", "Stanley Spencer", "Paul Nash", "Bridget Riley", "Howard Hodgkin=Hodgkin", "Banksy", "Frederic Leighton=Leighton", "George Romney=Romney", "Henry Raeburn=Raeburn", "Ford Madox Brown", "Graham Sutherland", "Peter Blake", "Richard Hamilton", "Frank Auerbach=Auerbach", "Leon Kossoff=Kossoff", "Peter Doig", "Chris Ofili=Ofili", "John Martin", "Samuel Palmer", "Edwin Landseer=Landseer", "Lawrence Alma-Tadema=Alma-Tadema"],
 't4': ["Augustus John", "Gwen John", "Vanessa Bell", "Duncan Grant", "Ben Nicholson", "William Powell Frith", "George Frederic Watts", "John Sell Cotman", "John Crome", "Thomas Girtin=Girtin", "Richard Parkes Bonington=Bonington", "David Cox", "Paul Sandby", "John Robert Cozens", "Richard Dadd", "Nicholas Hilliard=Hilliard", "Peter Lely", "Godfrey Kneller=Kneller", "Allan Ramsay", "David Wilkie", "Wyndham Lewis", "David Bomberg", "Mark Gertler", "Dora Carrington", "John Piper", "Eric Ravilious", "Laura Knight", "John Atkinson Grimshaw=Atkinson Grimshaw", "Patrick Caulfield", "Patrick Heron", "Albert Moore"],
 't5': ["William Dobson", "William Etty", "C. R. W. Nevinson=Christopher Nevinson", "Peter Lanyon", "Ivon Hitchens", "John Hoyland", "Arthur Hughes", "Simeon Solomon", "Elizabeth Siddal", "Evelyn De Morgan", "Walter Crane", "Edward Lear", "Alexander Cozens", "Joseph Farington", "Johann Zoffany", "Francis Hayman"],
 't6': ["Winston Churchill=Churchill"],
}

T['art-peinture-05'] = {
 't1': ["Ilia Répine=Ilya Repin/Repin/Répine", "Wassily Kandinsky=Kandinsky/Vassily Kandinsky", "Kasimir Malevitch=Malevitch/Kazimir Malevich/Malevich", "Andreï Roublev=Roublev/Andrei Rublev/Rublev", "Ivan Aïvazovski=Aïvazovski/Aivazovsky", "Ivan Chichkine=Chichkine/Shishkin", "Isaac Levitan=Levitan"],
 't2': ["Marc Chagall=Chagall"],
 't3': ["Valentin Serov=Serov", "Mikhaïl Vroubel=Vroubel/Vrubel", "Vassili Sourikov=Sourikov/Surikov", "Viktor Vasnetsov=Vasnetsov", "Ivan Kramskoï=Kramskoï/Kramskoy", "Vassili Perov=Perov", "Alexeï Savrassov=Savrassov/Savrasov", "Arkhip Kouïndji=Kouïndji/Kuindzhi", "Vassili Polenov=Polenov", "Vassili Verechtchaguine=Verechtchaguine/Vereshchagin", "Karl Brioullov=Brioullov/Bryullov", "Nicolas Roerich=Roerich", "Natalia Gontcharova=Gontcharova/Goncharova", "Mikhaïl Larionov=Larionov", "Alexandre Rodtchenko=Rodtchenko/Rodchenko", "El Lissitzky=Lissitzky", "Alexej von Jawlensky=Jawlensky", "Chaïm Soutine=Soutine", "Ivan Bilibine=Bilibine/Bilibin", "Léon Bakst=Bakst", "Alexandre Benois=Benois", "Boris Koustodiev=Koustodiev/Kustodiev", "Kouzma Petrov-Vodkine=Petrov-Vodkine/Petrov-Vodkin", "Lioubov Popova=Popova", "Vladimir Tatline=Tatline/Tatlin"],
 't4': ["Alexandre Ivanov", "Orest Kiprenski=Kiprenski/Kiprensky", "Vassili Tropinine=Tropinine", "Alexeï Venetsianov=Venetsianov", "Pavel Fedotov=Fedotov", "Konstantin Somov=Somov", "Pavel Filonov=Filonov", "Olga Rozanova=Rozanova", "Alexandra Exter=Exter", "Alexandre Deïneka=Deïneka/Deineka", "Alexandre Guérassimov", "Mikhaïl Nesterov=Nesterov", "Konstantin Korovine=Korovine/Korovin", "David Bourliouk=Bourliouk/Burliuk", "Ilya Kabakov=Kabakov", "Erik Boulatov=Boulatov/Bulatov", "Ilia Glazounov=Glazounov/Glazunov", "Mikhaïl Chemiakine=Chemiakine/Shemyakin", "Zinaïda Serebriakova=Serebriakova", "Dionisius=Denys", "Dmitri Levitski=Levitski", "Vladimir Borovikovski=Borovikovski", "Fiodor Rokotov=Rokotov", "Nikolaï Gay=Nikolai Ge", "Sonia Delaunay", "Serge Poliakoff=Poliakoff", "André Lanskoy=Lanskoy", "Marianne von Werefkin=Werefkin"],
 't5': ["Iouri Pimenov=Pimenov", "Philippe Maliavine=Maliavine", "Alexandre Golovine=Golovine", "Sylvestre Chtchedrine", "Abram Arkhipov", "Nikolaï Iarochenko=Yaroshenko", "Vladimir Makovski", "Constantin Makovski", "Grigori Miassoïedov", "Pavel Tchelitchew=Tchelitchew", "Ivan Pouni=Jean Pougny", "Aristarkh Lentoulov", "Piotr Kontchalovski", "Ilia Machkov", "Robert Falk", "Alexandre Samokhvalov", "Gueli Korjev", "Alexandre Laktionov", "Ivan Argounov"],
 't6': ["Nicolas de Staël=de Staël"],
}

T['art-peinture-06'] = {
 't1': ["Amedeo Modigliani=Modigliani", "Umberto Boccioni=Boccioni", "Giorgio Morandi=Morandi", "Lucio Fontana", "Giacomo Balla=Balla", "Carlo Carrà=Carrà", "Gino Severini=Severini"],
 't2': ["Giorgio de Chirico=de Chirico"],
 't3': ["Alberto Burri=Burri", "Renato Guttuso=Guttuso", "Mario Sironi=Sironi", "Felice Casorati=Casorati", "Filippo de Pisis=de Pisis", "Massimo Campigli=Campigli", "Alberto Savinio=Savinio", "Emilio Vedova=Vedova", "Afro Basaldella=Afro", "Giuseppe Capogrossi=Capogrossi", "Michelangelo Pistoletto=Pistoletto", "Alighiero Boetti=Alighiero e Boetti", "Mario Schifano=Schifano", "Mimmo Rotella=Rotella", "Francesco Clemente", "Sandro Chia", "Enzo Cucchi=Cucchi", "Mimmo Paladino=Paladino", "Fortunato Depero=Depero", "Luigi Russolo=Russolo", "Enrico Prampolini=Prampolini", "Ardengo Soffici=Soffici", "Maurizio Cattelan=Cattelan"],
 't4': ["Ottone Rosai", "Antonio Donghi", "Scipione=Gino Bonichi", "Mario Mafai", "Osvaldo Licini", "Giulio Turcato", "Enrico Castellani", "Agostino Bonalumi", "Enrico Baj", "Gianni Dova", "Gastone Novelli", "Achille Perilli", "Tano Festa", "Franco Angeli", "Luigi Ontani", "Giulio Paolini", "Mario Merz", "Carla Accardi", "Piero Dorazio", "Antonio Ligabue=Ligabue", "Valerio Adami", "Leonardo Cremonini", "Domenico Gnoli", "Giuseppe Penone", "Pino Pascali", "Corrado Cagli"],
 't5': ["Giuseppe Pellizza da Volpedo=Pellizza da Volpedo", "Piero Guccione", "Gianfranco Baruchello", "Emilio Isgrò", "Toti Scialoja", "Renato Birolli", "Ennio Morlotti", "Bruno Cassinari", "Ubaldo Oppi", "Achille Funi", "Piero Marussig", "Arturo Tosi", "Salvo", "Giorgio Griffa", "Paolo Scheggi", "Roberto Crippa"],
 't6': ["Piero Manzoni=Manzoni"],
}

T['art-peinture-07'] = {
 't1': ["Peinture à l'huile=Huile", "Aquarelle", "Gouache", "Acrylique=Peinture acrylique", "Fresque", "Pastel", "Fusain"],
 't2': ["Dripping"],
 't3': ["Tempera=Peinture à l'œuf", "Encaustique", "Lavis", "Encre de Chine", "Sanguine", "Mine de plomb=Graphite", "Eau-forte", "Pointe sèche", "Burin", "Aquatinte", "Manière noire=Mezzotinte", "Lithographie", "Linogravure", "Gravure sur bois=Xylographie", "Sérigraphie", "Collage", "Pochoir", "Sfumato", "Clair-obscur=Chiaroscuro", "Glacis", "Empâtement=Impasto", "Pointillisme", "Trompe-l'œil", "Mosaïque", "Vitrail", "Enluminure", "Crayon de couleur=Crayons de couleur"],
 't4': ["Monotype", "Papier collé", "Aérographe=Airbrush", "Frottage", "Grattage", "Décalcomanie", "Grisaille", "Camaïeu", "Marouflage", "Fixé sous verre=Peinture sous verre", "Pointe d'argent", "Pastel gras", "Craie", "Sépia", "Estompe", "Hachures", "Sgraffite=Sgraffito", "Fresque a secco=A secco", "Émail=Peinture sur émail", "Dorure à la feuille=Dorure", "Bombe aérosol=Graffiti/Peinture en bombe", "Alla prima", "Ténébrisme", "Lavis d'encre=Sumi-e"],
 't5': ["Bistre", "Quadratura", "Sotto in sù", "Anamorphose", "Spolvero", "Mise au carreau", "Peinture à la caséine=Caséine", "Cangiante", "Détrempe à la colle", "Gravure au vernis mou=Vernis mou"],
 't6': ["Fumage"],
}

T['art-peinture-08'] = {
 't1': ["Frida Kahlo=Kahlo", "Berthe Morisot=Morisot", "Mary Cassatt=Cassatt", "Artemisia Gentileschi=Artemisia", "Élisabeth Vigée Le Brun=Vigée Le Brun/Vigée-Lebrun", "Georgia O'Keeffe=O'Keeffe", "Tamara de Lempicka=Lempicka", "Suzanne Valadon=Valadon"],
 't2': ["Yayoi Kusama=Kusama"],
 't3': ["Rosa Bonheur", "Sonia Delaunay", "Séraphine Louis=Séraphine de Senlis", "Marie Laurencin=Laurencin", "Joan Mitchell", "Lee Krasner", "Helen Frankenthaler=Frankenthaler", "Agnes Martin", "Bridget Riley", "Paula Modersohn-Becker=Modersohn-Becker", "Gabriele Münter=Münter", "Natalia Gontcharova=Gontcharova", "Leonora Carrington=Carrington", "Remedios Varo", "Dorothea Tanning", "Leonor Fini", "Maria Helena Vieira da Silva=Vieira da Silva", "Eva Gonzalès", "Angelica Kauffmann=Kauffmann", "Judith Leyster", "Rachel Ruysch", "Sofonisba Anguissola=Anguissola", "Hilma af Klint", "Paula Rego", "Marlene Dumas", "Jenny Saville", "Tarsila do Amaral=Tarsila"],
 't4': ["Rosalba Carriera", "Lavinia Fontana", "Clara Peeters", "Adélaïde Labille-Guiard=Labille-Guiard", "Zinaïda Serebriakova", "Lioubov Popova", "Olga Rozanova", "Alexandra Exter", "Marie Bracquemond", "Gwen John", "Vanessa Bell", "Alice Neel", "Elaine de Kooning", "Grace Hartigan", "Cecily Brown", "Kay Sage", "Hélène Schjerfbeck=Helene Schjerfbeck", "Anna Ancher", "Emily Carr", "Amrita Sher-Gil", "Maruja Mallo", "María Blanchard", "Marie-Guillemine Benoist", "Anne Vallayer-Coster", "Marguerite Gérard", "Louise Moillon", "Marie Bashkirtseff", "Dora Carrington", "Laura Knight", "Faith Ringgold", "Sophie Taeuber-Arp", "Marianne von Werefkin"],
 't5': ["Constance Mayer", "Louise Catherine Breslau", "Aurélie Nemours", "Geneviève Asse", "Jacqueline Marval", "Marie Vassilieff", "Elizabeth Siddal", "Evelyn De Morgan", "Frances Hodgkins", "Margaret Preston", "Plautilla Nelli", "Catharina van Hemessen", "Elisabetta Sirani", "Fede Galizia", "Giovanna Garzoni", "Mary Beale", "Lilla Cabot Perry", "Cecilia Beaux", "Harriet Backer", "Kitty Kielland"],
 't6': ["Grandma Moses=Anna Mary Robertson Moses"],
}

T['art-peinture-09'] = {
 't1': ["Katsushika Hokusai=Hokusai", "Utagawa Hiroshige=Hiroshige/Andō Hiroshige", "Kitagawa Utamaro=Utamaro", "Tōshūsai Sharaku=Sharaku", "Yayoi Kusama=Kusama", "Takashi Murakami"],
 't2': ["Foujita=Léonard Foujita/Tsuguharu Foujita/Fujita Tsuguharu"],
 't3': ["Suzuki Harunobu=Harunobu", "Utagawa Kuniyoshi=Kuniyoshi", "Utagawa Kunisada=Kunisada/Utagawa Toyokuni III", "Keisai Eisen=Eisen", "Torii Kiyonaga=Kiyonaga", "Hishikawa Moronobu=Moronobu", "Tsukioka Yoshitoshi=Yoshitoshi", "Kawase Hasui=Hasui", "Sesshū Tōyō=Sesshū", "Ogata Kōrin=Kōrin", "Tawaraya Sōtatsu=Sōtatsu", "Itō Jakuchū=Jakuchū", "Hasegawa Tōhaku=Tōhaku", "Kanō Eitoku=Eitoku", "Maruyama Ōkyo=Ōkyo", "Yoshitomo Nara"],
 't4': ["Utagawa Toyokuni", "Isoda Koryūsai=Koryūsai", "Katsukawa Shunshō=Shunshō", "Torii Kiyonobu=Kiyonobu", "Okumura Masanobu", "Yoshida Hiroshi", "Kanō Tan'yū=Tan'yū", "Kanō Motonobu=Motonobu", "Kanō Masanobu", "Sakai Hōitsu=Hōitsu", "Ogata Kenzan=Kenzan", "Nagasawa Rosetsu=Rosetsu", "Soga Shōhaku=Shōhaku", "Yosa Buson=Buson", "Ike no Taiga=Taiga", "Hakuin Ekaku=Hakuin", "Sengai Gibon=Sengai", "Kawanabe Kyōsai=Kyōsai", "Yokoyama Taikan=Taikan", "Kobayashi Kiyochika=Kiyochika", "Kazuo Shiraga=Shiraga", "Kuroda Seiji=Kuroda Seiki"],
 't5': ["Hishida Shunsō", "Higashiyama Kaii", "Tenshō Shūbun=Shūbun", "Josetsu", "Sesson Shūkei=Sesson", "Kaigetsudō Ando", "Takahashi Yuichi", "Kishida Ryūsei", "Jirō Yoshihara", "Atsuko Tanaka", "Totoya Hokkei=Hokkei", "Uemura Shōen", "Kaburaki Kiyokata", "Itō Shinsui", "Hashiguchi Goyō", "Tomioka Tessai", "Kanō Hōgai", "Hashimoto Gahō", "Yasui Sōtarō", "Umehara Ryūzaburō", "Saeki Yūzō"],
 't6': ["Katsushika Ōi=Ōi"],
}

T['art-peinture-10'] = {
 't1': ["Nicolas Poussin=Poussin", "Claude Lorrain=Le Lorrain/Claude Gellée", "Georges de La Tour", "Antoine Watteau=Watteau", "François Boucher=Boucher", "Jean-Honoré Fragonard=Fragonard", "Jean Siméon Chardin=Chardin", "Jacques-Louis David", "Jean-Baptiste Greuze=Greuze"],
 't2': ["Philippe de Champaigne=Champaigne"],
 't3': ["Élisabeth Vigée Le Brun=Vigée Le Brun/Vigée-Lebrun", "Charles Le Brun", "Simon Vouet=Vouet", "Les frères Le Nain=Le Nain/Louis Le Nain/Antoine Le Nain/Mathieu Le Nain", "Hyacinthe Rigaud=Rigaud", "Nicolas de Largillierre=Largillierre/Largillière", "Pierre Mignard=Mignard", "Hubert Robert", "Joseph Vernet=Claude Joseph Vernet", "Nicolas Lancret=Lancret", "Jean-Baptiste Pater", "Jean-Marc Nattier=Nattier", "Jean-Baptiste Oudry=Oudry", "Maurice Quentin de La Tour", "Eustache Le Sueur=Le Sueur", "Carle Van Loo=Carle Vanloo", "Pierre-Paul Prud'hon=Prud'hon", "Valentin de Boulogne"],
 't4': ["Jean-Baptiste Perronneau=Perronneau", "Laurent de La Hyre=La Hyre", "Sébastien Bourdon=Bourdon", "Jean Jouvenet=Jouvenet", "Antoine Coypel", "Noël Coypel", "Charles-Antoine Coypel", "Adélaïde Labille-Guiard=Labille-Guiard", "Anne Vallayer-Coster=Vallayer-Coster", "Jean-Baptiste Regnault", "Joseph-Marie Vien=Vien", "François Lemoyne", "Charles-Joseph Natoire=Natoire", "Jean-François de Troy", "Pierre Subleyras=Subleyras", "Jean Restout", "Jacques Stella", "Claude Vignon", "Lubin Baugin=Baugin", "Louise Moillon", "Alexandre-François Desportes=François Desportes", "Claude Gillot=Gillot", "Louis Tocqué", "Louis-Léopold Boilly=Boilly", "Charles de La Fosse", "Louis-Michel van Loo"],
 't5': ["Jacques Blanchard", "Gabriel-François Doyen", "François-André Vincent", "Jean-Germain Drouais", "Jean Raoux", "Jean-Baptiste Santerre", "François de Troy", "Antoine Pesne", "Claude Deruet", "Jacques Linard", "Nicolas Tournier", "Trophime Bigot", "Jean-Baptiste Monnoyer", "Louis de Boullogne", "Bon Boullogne", "Jean-Baptiste Deshays", "Jean-Baptiste Le Prince", "Jean-Baptiste Huet", "Louis-Jean-François Lagrenée", "Antoine Vestier", "Marguerite Gérard"],
 't6': ["Joseph Ducreux=Ducreux"],
}

T['art-peinture-11'] = {
 't1': ["Salvador Dalí=Dalí", "René Magritte=Magritte", "Max Ernst", "Joan Miró=Miró", "Yves Tanguy=Tanguy", "Paul Delvaux=Delvaux"],
 't2': ["Frida Kahlo=Kahlo"],
 't3': ["André Masson", "Man Ray", "Jean Arp=Hans Arp", "Victor Brauner=Brauner", "Roberto Matta=Matta", "Wifredo Lam", "Meret Oppenheim", "Leonora Carrington=Carrington", "Remedios Varo", "Dorothea Tanning=Tanning", "Leonor Fini", "Kay Sage", "Óscar Domínguez", "Hans Bellmer=Bellmer", "Toyen", "Wolfgang Paalen=Paalen", "Alberto Giacometti=Giacometti", "Giorgio de Chirico=de Chirico"],
 't4': ["Roland Penrose", "Jindřich Štyrský=Štyrský", "Jacques Hérold", "Kurt Seligmann", "E. L. T. Mesens=Mesens", "Marcel Mariën", "Raoul Ubac", "Dora Maar", "Lee Miller", "Claude Cahun", "Unica Zürn", "Esteban Francés", "Gordon Onslow Ford", "Arshile Gorky", "Valentine Hugo", "Jacqueline Lamba", "Pierre Molinier", "Clovis Trouille", "Félix Labisse", "Joseph Cornell"],
 't5': ["Paul Nash", "Eileen Agar", "Max Walter Svanberg", "Conroy Maddox", "Alice Rahon", "Maurice Henry", "Jean Benoît", "Mimi Parent", "Ithell Colquhoun", "Jacques-André Boiffard", "Enrico Donati", "Richard Oelze", "Simon Hantaï", "Jindřich Heisler"],
 't6': ["Marcel Duchamp=Duchamp"],
}

T['art-peinture-12'] = {
 't1': ["Les Tournesols=Tournesols", "La Nuit étoilée", "Terrasse du café le soir=Terrasse de café la nuit/Café Terrace at Night", "La Chambre à Arles=La Chambre de Van Gogh à Arles", "Les Mangeurs de pommes de terre", "Champ de blé aux corbeaux", "Autoportrait à l'oreille bandée", "Les Iris"],
 't2': ["Le Moulin de la Galette"],
 't3': ["L'Église d'Auvers-sur-Oise", "Portrait du docteur Gachet=Le Docteur Paul Gachet/Docteur Gachet", "Amandier en fleurs=Branches d'amandier en fleurs", "La Nuit étoilée sur le Rhône", "Le Café de nuit", "La Maison jaune", "Le Pont de Langlois=Le Pont de l'Anglois", "L'Arlésienne", "Le Facteur Roulin=Portrait du facteur Joseph Roulin", "La Berceuse", "La Chaise de Vincent=La Chaise et la Pipe", "Les Souliers=Une paire de souliers", "Le Semeur", "La Méridienne=La Sieste", "Champ de blé avec cyprès", "Les Cyprès", "Les Oliviers", "La Ronde des prisonniers", "Le Père Tanguy=Portrait du père Tanguy", "Le Zouave", "La Mousmé", "Le Poète=Portrait d'Eugène Boch", "Autoportrait au chapeau de feutre gris", "Barques aux Saintes-Maries=Bateaux de pêche sur la plage des Saintes-Maries", "Les Alyscamps", "Route avec cyprès et étoile", "Le Fauteuil de Gauguin=La Chaise de Gauguin", "Champ de blé au faucheur=Le Faucheur"],
 't4': ["Verger en fleurs", "Les Roses", "Pietà d'après Delacroix=Pietà", "La Résurrection de Lazare", "Le Bon Samaritain", "Champ de blé sous des nuages d'orage", "Les Premiers Pas", "Le Jardin de l'hôpital à Arles", "Vieil homme triste=Au seuil de l'éternité", "Marguerite Gachet au piano", "Portrait d'Adeline Ravoux=Adeline Ravoux", "Champ de coquelicots", "Les Chaumes de Cordeville", "La Courtisane=Japonaiserie : la courtisane", "Le Pont sous la pluie", "Prunier en fleurs=Japonaiserie : prunier en fleurs", "Le Pont de Trinquetaille", "La Vigne rouge=Les Vignes rouges", "La Moisson=La Plaine de la Crau", "Nature morte à la Bible", "Autoportrait dédié à Paul Gauguin=Autoportrait en bonze", "Portrait d'Armand Roulin"],
 't5': ["Portrait de Patience Escalier", "Intérieur d'un restaurant", "Fritillaires couronne impériale dans un vase de cuivre", "La Guinguette", "Le Restaurant de la Sirène à Asnières", "Deux tournesols coupés", "Les Vignes vertes"],
 't6': ["Crâne de squelette fumant une cigarette=Squelette fumant"],
}

T['art-peinture-13'] = {
 't1': ["Frida Kahlo=Kahlo", "Diego Rivera=Rivera", "Fernando Botero=Botero", "José Clemente Orozco=Orozco", "David Alfaro Siqueiros=Siqueiros", "Rufino Tamayo=Tamayo", "Roberto Matta=Matta"],
 't2': ["Leonora Carrington=Carrington"],
 't3': ["Wifredo Lam", "Joaquín Torres García=Torres García", "Xul Solar", "Antonio Berni=Berni", "Pedro Figari=Figari", "Tarsila do Amaral=Tarsila", "Candido Portinari=Portinari", "Di Cavalcanti=Emiliano Di Cavalcanti", "Anita Malfatti", "Oswaldo Guayasamín=Guayasamín", "Fernando de Szyszlo=Szyszlo", "Alejandro Obregón", "Jesús Rafael Soto=Soto", "Carlos Cruz-Diez=Cruz-Diez", "Armando Reverón=Reverón", "Francisco Toledo", "José Luis Cuevas", "Dr. Atl=Gerardo Murillo", "María Izquierdo", "Remedios Varo", "José María Velasco", "Julio Le Parc=Le Parc", "Lasar Segall"],
 't4': ["Alejandro Otero", "Saturnino Herrán", "Juan O'Gorman", "Roberto Montenegro", "Gunther Gerzso", "Alfredo Volpi", "Alberto da Veiga Guignard=Guignard", "Iberê Camargo", "Beatriz Milhazes", "Lygia Clark", "Hélio Oiticica", "Débora Arango", "Enrique Grau", "Omar Rayo", "Oswaldo Vigas", "Arturo Michelena", "Benito Quinquela Martín=Quinquela Martín", "Emilio Pettoruti", "Raquel Forner", "Luis Felipe Noé", "Amelia Peláez", "René Portocarrero", "Juan Soriano", "Claudio Bravo", "Francisco Goitia", "Manabu Mabe", "Tomie Ohtake", "Gego"],
 't5': ["Martín Tovar y Tovar", "Cristóbal Rojas", "Hermenegildo Bustos", "Pedro Américo", "Victor Meirelles", "Almeida Júnior", "Lino Enea Spilimbergo", "Rómulo Macció", "Ernesto Deira", "Jorge de la Vega", "Carlos Enríquez", "Víctor Manuel García", "Mario Carreño", "Tomás Sánchez", "Rodolfo Morales", "Pedro Coronel", "Rafael Coronel", "José Sabogal", "Camilo Egas", "Eduardo Kingman", "Nemesio Antúnez"],
 't6': ["Lucio Fontana=Fontana"],
}

T['art-peinture-14'] = {
 't1': ["Edvard Munch=Munch", "Carl Larsson=Larsson", "Anders Zorn=Zorn", "Vilhelm Hammershøi=Hammershøi", "Peder Severin Krøyer=Krøyer/P. S. Krøyer", "Akseli Gallen-Kallela=Gallen-Kallela"],
 't2': ["Asger Jorn=Jorn"],
 't3': ["Anna Ancher", "Michael Ancher", "Albert Edelfelt=Edelfelt", "Hélène Schjerfbeck=Helene Schjerfbeck/Schjerfbeck", "Hugo Simberg=Simberg", "Pekka Halonen", "Ernst Josephson", "Carl Fredrik Hill", "Bruno Liljefors=Liljefors", "Richard Bergh", "Hilma af Klint", "Johan Christian Dahl=J. C. Dahl", "Adolph Tidemand=Tidemand", "Hans Gude", "Frits Thaulow=Thaulow", "Christian Krohg=Krohg", "Erik Werenskiold=Werenskiold", "Theodor Kittelsen=Kittelsen", "Harald Sohlberg=Sohlberg", "Nikolai Astrup=Astrup", "Christoffer Wilhelm Eckersberg=Eckersberg", "Christen Købke=Købke", "Laurits Andersen Ring=L. A. Ring"],
 't4': ["Karl Nordström", "Johan Thomas Lundbye=Lundbye", "Peder Balke", "Lars Hertervig", "Eilif Peterssen", "Harriet Backer", "Kitty Kielland", "Jens Ferdinand Willumsen=J. F. Willumsen", "Fritz Syberg", "Harald Giersing", "Isaac Grünewald", "Sigrid Hjertén", "Nils Dardel", "Eugène Jansson", "Prince Eugen=Prins Eugen", "Eero Järnefelt", "Magnus Enckell", "Juho Rissanen", "Tyko Sallinen", "Jóhannes Kjarval=Kjarval", "Nicolai Abildgaard=Abildgaard", "Jens Juel", "Wilhelm Marstrand", "Constantin Hansen", "Laurits Tuxen", "Carl-Henning Pedersen", "Per Kirkeby", "Alexander Roslin=Roslin", "Odd Nerdrum"],
 't5': ["Viggo Johansen", "Thomas Fearnley", "Gerhard Munthe", "Ludvig Karsten", "Carl Wilhelmson", "Gustaf Cederström", "Gustaf Lundberg", "Ivan Aguéli", "Olle Baertling", "Fanny Churberg", "Victor Westerholm", "Elin Danielson-Gambogi", "Marie Krøyer", "Bertha Wegmann"],
 't6': ["Tove Jansson"],
}

T['art-peinture-15'] = {
 't1': ["Bleu outremer=Outremer/Lapis-lazuli/Bleu Guimet", "Vermillon", "Ocre jaune=Ocre", "Terre de Sienne=Terre de Sienne brûlée/Sienne", "Bleu de Prusse", "Blanc de titane"],
 't2': ["Bleu Klein=International Klein Blue/IKB"],
 't3': ["Bleu de cobalt=Bleu de Thénard", "Bleu céruléen=Céruléum", "Indigo", "Cinabre", "Minium", "Laque de garance=Garance/Rose garance", "Carmin=Cochenille", "Terre d'ombre=Terre d'ombre brûlée/Ombre brûlée", "Ocre rouge", "Vert-de-gris", "Vert émeraude", "Viridian", "Malachite", "Azurite", "Blanc de plomb=Céruse/Blanc d'argent", "Blanc de zinc", "Noir d'ivoire", "Noir de fumée", "Bitume=Bitume de Judée", "Sépia", "Jaune de Naples", "Jaune de chrome", "Jaune de cadmium", "Rouge de cadmium", "Terre verte"],
 't4': ["Noir de vigne", "Orpiment", "Réalgar", "Massicot", "Gomme-gutte", "Jaune indien", "Stil de grain", "Alizarine", "Violet de cobalt", "Violet de manganèse", "Bleu égyptien", "Pourpre de Tyr", "Smalt", "Bleu de phtalocyanine=Bleu phtalo", "Vert de phtalocyanine=Vert phtalo", "Quinacridone", "Terre de Cassel=Brun Van Dyck", "Vert oxyde de chrome=Oxyde de chrome", "Auréoline=Jaune de cobalt", "Rouge de Venise", "Rouge anglais", "Blanc de Meudon=Blanc d'Espagne"],
 't5': ["Jaune de Mars", "Rouge de Mars", "Noir de Mars", "Vantablack", "Bleu maya", "Vert de Scheele", "Vert de Schweinfurt=Vert Paris", "Bleu de manganèse", "Jaune de zinc", "Jaune de strontium", "Rouge de chrome", "Vert de vessie"],
 't6': ["Brun momie=Mummy brown"],
}
