# Sciences & Nature (science-nature) - Physique, chimie, mathématiques
PROMPTS = [
    {'id': 'sci-physchim-01', 'text': "Nomme une unité de mesure d'une grandeur physique (unité du Système international ou usuelle)"},
    {'id': 'sci-physchim-02', 'text': 'Nomme un élément chimique du tableau périodique'},
    {'id': 'sci-physchim-03', 'text': 'Nomme une figure géométrique ou un solide de géométrie'},
    {'id': 'sci-physchim-04', 'text': 'Nomme un mathématicien célèbre'},
    {'id': 'sci-physchim-05', 'text': 'Nomme un instrument de mesure'},
    {'id': 'sci-physchim-06', 'text': 'Nomme un gaz'},
    {'id': 'sci-physchim-07', 'text': 'Nomme un alliage métallique'},
    {'id': 'sci-physchim-08', 'text': 'Nomme un acide (chimique, organique ou biologique)'},
    {'id': 'sci-physchim-09', 'text': "Nomme une loi, un théorème ou un principe scientifique portant le nom d'un savant"},
    {'id': 'sci-physchim-10', 'text': 'Nomme une opération, une fonction ou un symbole mathématique'},
    {'id': 'sci-physchim-11', 'text': 'Nomme un objet de verrerie ou un matériel de laboratoire de chimie ou de physique'},
    {'id': 'sci-physchim-12', 'text': 'Nomme une grandeur physique'},
    {'id': 'sci-physchim-13', 'text': 'Nomme un métal'},
    {'id': 'sci-physchim-14', 'text': 'Nomme un composant électrique ou électronique'},
    {'id': 'sci-physchim-15', 'text': 'Nomme un composé chimique courant (molécule ou corps composé)'},
]
T = {}
T['sci-physchim-01'] = {
    't1': ['kilogramme=kg/kilo', 'seconde=s', 'litre=l', 'degré Celsius=°C', 'watt=W', 'volt=V', 'ampère=A', 'newton=N'],
    't2': ['mètre=m'],
    't3': ['joule=J', 'hertz=Hz', 'pascal=Pa', 'kelvin=K', 'ohm=Ω', 'mole=mol', 'candela=cd', 'gramme=g', 'minute', 'heure', 'kilomètre=km', 'centimètre=cm', 'millimètre=mm', 'tonne', 'degré', 'bar', 'calorie=cal', 'kilowattheure=kWh', 'hectare=ha', 'octet', 'décibel=dB', 'kilowatt=kW', 'mégawatt=MW', 'millilitre=ml', 'centilitre=cl'],
    't4': ['coulomb=C', 'farad=F', 'tesla=T', 'henry=H', 'weber=Wb', 'siemens', 'becquerel=Bq', 'gray=Gy', 'sievert=Sv', 'lumen=lm', 'lux=lx', 'radian=rad', 'stéradian=sr', 'katal=kat', 'pouce', 'pied', 'yard', 'mile', 'livre', 'once', 'are', 'bit', 'nœud', 'angström', 'année-lumière=al', 'parsec=pc', 'unité astronomique=ua', 'atmosphère=atm', 'millimètre de mercure=mmHg', 'électronvolt=eV', 'cheval-vapeur=ch/CV', 'degré Fahrenheit=°F', 'gallon', 'jour', 'année', "seconde d'arc", 'kilopascal=kPa', 'gigaoctet=Go'],
    't5': ['torr', 'gauss', 'oersted', 'dyne', 'erg', 'barn', 'curie=Ci', 'roentgen', 'lambert', 'phot', 'stilb', 'nit', 'fermi', 'micron', 'mil', 'pinte', 'boisseau', 'carat', 'quintal', 'brasse', 'lieue', 'toise', 'poise', 'stokes', 'rankine', 'réaumur', 'grain', 'stère', 'neper=Np', 'baud', 'térabit'],
    't6': ['shake'],
}
T['sci-physchim-02'] = {
    't1': ['hydrogène=H', 'hélium=He', 'carbone=C', 'azote=N', 'fer=Fe', 'or=Au', 'argent=Ag', 'cuivre=Cu', 'uranium=U'],
    't2': ['oxygène=O'],
    't3': ['lithium=Li', 'sodium=Na', 'magnésium=Mg', 'aluminium=Al', 'silicium=Si', 'phosphore=P', 'soufre=S', 'chlore=Cl', 'potassium=K', 'calcium=Ca', 'titane=Ti', 'chrome=Cr', 'nickel=Ni', 'zinc=Zn', 'plomb=Pb', 'étain=Sn', 'mercure=Hg', 'platine=Pt', 'néon=Ne', 'argon=Ar', 'iode=I', 'brome=Br', 'fluor=F', 'cobalt=Co', 'manganèse=Mn', 'plutonium=Pu', 'radium=Ra', 'tungstène=W/wolfram'],
    't4': ['béryllium=Be', 'bore=B', 'scandium=Sc', 'vanadium=V', 'gallium=Ga', 'germanium=Ge', 'arsenic=As', 'sélénium=Se', 'krypton=Kr', 'rubidium=Rb', 'strontium=Sr', 'zirconium=Zr', 'molybdène=Mo', 'cadmium=Cd', 'antimoine=Sb', 'tellure=Te', 'xénon=Xe', 'césium=Cs', 'baryum=Ba', 'cérium=Ce', 'néodyme=Nd', 'thallium=Tl', 'bismuth=Bi', 'polonium=Po', 'radon=Rn', 'thorium=Th'],
    't5': ['yttrium=Y', 'niobium=Nb', 'technétium=Tc', 'ruthénium=Ru', 'rhodium=Rh', 'palladium=Pd', 'indium=In', 'lanthane=La', 'praséodyme=Pr', 'prométhium=Pm', 'samarium=Sm', 'europium=Eu', 'gadolinium=Gd', 'terbium=Tb', 'dysprosium=Dy', 'holmium=Ho', 'erbium=Er', 'thulium=Tm', 'lutécium=Lu', 'hafnium=Hf', 'tantale=Ta', 'rhénium=Re', 'osmium=Os', 'iridium=Ir', 'astate=At', 'francium=Fr', 'actinium=Ac', 'protactinium=Pa', 'neptunium=Np', 'américium=Am', 'curium=Cm', 'berkélium=Bk', 'californium=Cf', 'einsteinium=Es', 'fermium=Fm', 'mendélévium=Md', 'nobélium=No', 'lawrencium=Lr', 'rutherfordium=Rf', 'dubnium=Db', 'seaborgium=Sg', 'bohrium=Bh', 'hassium=Hs', 'meitnérium=Mt', 'darmstadtium=Ds', 'roentgenium=Rg', 'copernicium=Cn', 'nihonium=Nh', 'flérovium=Fl', 'moscovium=Mc', 'livermorium=Lv', 'tennesse=Ts/tennessine', 'oganesson=Og'],
    't6': ['ytterbium=Yb'],
}
T['sci-physchim-03'] = {
    't1': ['cercle', 'triangle', 'rectangle', 'cube', 'sphère', 'pyramide', 'cylindre', 'cône'],
    't2': ['carré'],
    't3': ['losange', 'trapèze', 'parallélogramme', 'pentagone', 'hexagone', 'octogone', 'ellipse', 'ovale', 'disque', 'polygone', 'prisme', 'pavé droit', 'parallélépipède', 'quadrilatère', 'boule', 'triangle équilatéral', 'triangle isocèle', 'triangle rectangle', 'étoile'],
    't4': ['heptagone=septagone', 'décagone', 'dodécagone', 'tétraèdre', 'octaèdre', 'dodécaèdre', 'icosaèdre', 'polyèdre', 'tronc de cône', 'tronc de pyramide', 'hémisphère', 'triangle scalène', 'cerf-volant', 'parabole', 'hyperbole', 'spirale', 'secteur circulaire', 'segment circulaire', 'couronne', 'pentagramme', 'hexagramme', 'tore'],
    't5': ['ennéagone=nonagone', 'hendécagone', 'ellipsoïde', 'paraboloïde', 'hyperboloïde', 'cuboctaèdre', 'antiprisme', 'calotte sphérique', 'polyèdre régulier', 'bouteille de Klein', 'arc de cercle', 'cycloïde', 'astroïde', 'cardioïde'],
    't6': ['ruban de Möbius'],
}
T['sci-physchim-04'] = {
    't1': ['Euclide', 'Thalès', 'Archimède', 'Descartes', 'Pascal', 'Fermat', 'Euler', 'Gauss'],
    't2': ['Pythagore'],
    't3': ['Newton', 'Leibniz', 'Fibonacci', 'Riemann', 'Cauchy', 'Laplace', 'Lagrange', 'Fourier', 'Poincaré', 'Galois', 'Hilbert', 'Turing', 'Cantor', 'Gödel', 'Mandelbrot', 'Al-Khwarizmi', 'Ératosthène', 'Hypatie', 'Diophante', 'Ramanujan', 'Bernoulli', 'Wiles', 'Perelman', 'Noether', 'Von Neumann'],
    't4': ['Legendre', 'Monge', 'Viète', 'Cardan', 'Tartaglia', 'Napier=Neper', 'Hermite', 'Lebesgue', 'Borel', 'Tchebychev', 'Kolmogorov', 'Dedekind', 'Kronecker', 'Weierstrass', 'Jacobi', 'Abel', 'Lobatchevski', 'Bolyai', 'Klein', 'Lie', 'Peano', 'Russell', 'Banach', 'Erdős', 'Nash', 'Grothendieck', 'Hardy', 'Wallis', 'Boole', 'Cayley', 'Hamilton', 'Mersenne', 'Bézout', "d'Alembert", 'Sophie Germain', 'Ada Lovelace', 'Pappus', 'Apollonios', 'Brahmagupta', 'Aryabhata', 'Omar Khayyam', 'Huygens', 'Stevin', 'Villani', 'Schwartz', 'Tao', 'Mirzakhani', 'Hippocrate de Chios'],
    't5': ['Sylvester', 'Pacioli', 'Liu Hui', "Zénon d'Élée", 'Eudoxe', 'Ptolémée', "Héron d'Alexandrie", 'Bhaskara', 'Al-Kindi', 'Nicomaque', 'Cavalieri', 'Desargues', 'Poncelet', 'Chasles', 'Liouville', 'Brouwer', 'Zermelo', 'Fraenkel', 'Hausdorff', 'Minkowski', 'Weil', 'Serre', 'Thom', 'Wiener', 'Shannon', 'Conway', 'Penrose'],
    't6': ['Lewis Carroll=Charles Dodgson'],
}
T['sci-physchim-05'] = {
    't1': ['thermomètre', 'règle', 'balance', 'chronomètre', 'baromètre', 'mètre ruban', 'boussole', 'montre'],
    't2': ['horloge'],
    't3': ['voltmètre', 'ampèremètre', 'ohmmètre', 'multimètre', 'hygromètre', 'anémomètre', 'pluviomètre', 'sismographe', 'compteur Geiger', 'sextant', 'altimètre', 'podomètre', 'cadran solaire', 'sablier', 'pied à coulisse', 'éprouvette graduée', 'manomètre', 'rapporteur', 'équerre', 'niveau à bulle', 'compte-tours', 'radar', 'compteur kilométrique', 'tensiomètre', 'pèse-personne'],
    't4': ['micromètre', 'densimètre', 'dynamomètre', 'spectromètre', 'oscilloscope', 'télémètre', 'tachymètre', 'goniomètre', 'théodolite', 'pH-mètre', 'réfractomètre', 'colorimètre', 'calorimètre', 'luxmètre', 'sonomètre', 'wattmètre', 'galvanomètre', 'gnomon', 'astrolabe', 'sismomètre', 'gravimètre', 'magnétomètre', 'jauge', "compteur d'eau", 'compteur électrique', 'éthylotest', 'règle graduée', 'toise', 'peson', 'balance de Roberval', 'balance de précision', 'lactodensimètre', 'pèse-alcool=alcoomètre', 'baromètre à mercure', 'thermomètre à mercure', 'cinémomètre'],
    't5': ['fréquencemètre', 'électromètre', 'spectrophotomètre', 'pyromètre', 'bolomètre', 'actinomètre', 'héliographe', 'girouette', 'radiomètre', 'chambre à bulles', 'chambre à brouillard', 'interféromètre', 'sphéromètre', 'comparateur', 'cathétomètre', 'eudiomètre', 'hypsomètre', 'inclinomètre', 'clinomètre', 'lunette méridienne', 'chronographe', 'pendule', 'métronome', 'diapason'],
    't6': ['clepsydre'],
}
T['sci-physchim-06'] = {
    't1': ['oxygène=O2/dioxygène', 'azote=N2/diazote', 'hydrogène=H2/dihydrogène', 'hélium=He', 'dioxyde de carbone=CO2/gaz carbonique', 'méthane=CH4', 'butane', 'propane'],
    't2': ['air'],
    't3': ['ammoniac=NH3', 'ozone=O3', 'néon=Ne', 'argon=Ar', 'krypton=Kr', 'xénon=Xe', 'radon=Rn', 'chlore=Cl2/dichlore', 'fluor=F2/difluor', 'monoxyde de carbone=CO', "vapeur d'eau", 'gaz naturel', "protoxyde d'azote=N2O/gaz hilarant", 'dioxyde de soufre=SO2', "sulfure d'hydrogène=H2S", 'acétylène', 'éthylène', 'éthane', 'GPL', 'grisou', 'biogaz', 'gaz de ville'],
    't4': ["dioxyde d'azote=NO2", "monoxyde d'azote=NO", "chlorure d'hydrogène=HCl", 'phosgène', 'fréon', 'gaz de schiste', 'arsine', 'phosphine', 'silane', 'diborane', "fluorure d'hydrogène=HF", 'formaldéhyde', 'chlorométhane', 'chlorure de vinyle', 'butadiène', 'isobutane', 'dioxyde de chlore', "trifluorure d'azote", "oxyde d'éthylène", 'tritium', 'deutérium', 'gaz rare', 'gaz lacrymogène'],
    't5': ['propylène=propène', 'éther diméthylique=diméthyléther', 'méthylamine', 'éthylamine', 'chlorure de méthyle', 'bromure de méthyle', 'chloroéthane', 'fluorure de sulfuryle', 'sulfure de carbonyle'],
    't6': ['hexafluorure de soufre=SF6'],
}
T['sci-physchim-07'] = {
    't1': ['acier', 'laiton', 'fonte', 'inox=acier inoxydable', 'or blanc', 'duralumin'],
    't2': ['bronze'],
    't3': ['soudure', 'amalgame', 'peltre', 'cupronickel', 'maillechort=argentan', 'électrum', 'invar', 'nichrome', 'constantan', 'alnico', 'monel', 'inconel', 'billon', 'argent sterling', 'or rose', 'or gris', 'tombac', 'métal de Wood', 'magnalium', 'vitallium', 'nitinol', 'bronze phosphoreux', 'acier au carbone', 'acier de Damas=acier damassé', 'acier Corten', 'acier rapide', 'fonte grise'],
    't4': ['mu-métal', 'stellite', 'zamak', 'hastelloy', 'or 18 carats', 'cuivre-béryllium', "bronze d'aluminium", 'acier au manganèse', 'fonte ductile', 'similor', 'platine iridié', 'potin', 'régule=métal Babbitt', "métal d'imprimerie", 'alliage de Heusler', 'zircaloy', 'mischmétal', 'ferrochrome', 'ferromanganèse', 'ferrosilicium', 'alliage de titane', 'acier de construction', 'acier au chrome', 'acier à ressort', 'acier trempé', 'cuproaluminium', 'or jaune', "alliage d'aluminium", 'alliage de magnésium', 'fonte blanche', 'acier à outils'],
    't5': ['fernico', 'kovar', 'permalloy', 'supermalloy', 'nimonic', 'ferronickel', 'acier maraging', 'zinalco', 'platine-rhodium', 'or vert', 'argent allié', 'cobalt-chrome', 'étain de Britannia=britannium'],
    't6': ['galinstan'],
}
T['sci-physchim-08'] = {
    't1': ['acide sulfurique=H2SO4', 'acide nitrique=HNO3', 'acide acétique=acide éthanoïque', 'acide citrique', 'acide carbonique', 'acide phosphorique', 'acide lactique', 'acide ascorbique=vitamine C'],
    't2': ['acide chlorhydrique=HCl'],
    't3': ['acide formique=acide méthanoïque', 'acide tartrique', 'acide oxalique', 'acide malique', 'acide benzoïque', 'acide fluorhydrique=HF', 'acide borique', 'acide salicylique', 'acide acétylsalicylique', 'acide folique', 'acide stéarique', 'acide oléique', 'acide palmitique', 'acide urique', 'acide désoxyribonucléique=ADN', 'acide ribonucléique=ARN', 'acide aminé', 'acide gras', 'acide cyanhydrique=acide prussique', 'acide hyaluronique', 'acide glutamique', 'acide sorbique', 'acide butyrique'],
    't4': ['acide perchlorique', 'acide hypochloreux', 'acide chlorique', 'acide sulfureux', 'acide nitreux', 'acide phosphoreux', 'acide bromhydrique', 'acide iodhydrique', 'acide propionique', 'acide succinique', 'acide fumarique', 'acide gluconique', 'acide glycolique', 'acide pyruvique', 'acide tannique', 'acide gallique', 'acide caféique', 'acide chlorogénique', 'acide chromique', 'acide aspartique', 'acide linoléique', 'acide linolénique', 'acide gamma-aminobutyrique=GABA', 'acide trifluoroacétique', 'acide picrique', 'acide nucléique'],
    't5': ['acide sulfonique', 'acide acétique glacial', 'acide muriatique', 'acide lysergique', 'acide valproïque', 'acide sialique', 'acide cholique', 'acide folinique', 'acide pantothénique', 'acide nicotinique', 'acide mandélique', 'acide phtalique', 'acide cinnamique', 'acide abscisique', 'acide gibbérellique', 'acide humique', 'acide ellagique', 'acide usnique'],
    't6': ['acide fluoroantimonique'],
}
T['sci-physchim-09'] = {
    't1': ['théorème de Pythagore', 'théorème de Thalès', "loi d'Ohm", "principe d'Archimède", 'loi de la gravitation universelle', 'loi de Boyle-Mariotte', 'lois de Kepler'],
    't2': ['lois de Newton'],
    't3': ["principe d'incertitude de Heisenberg", 'loi de Coulomb', 'loi de Joule', 'loi de Hooke', 'loi de Hubble', 'loi de Moore', 'loi de Charles', 'loi de Gay-Lussac', "loi d'Avogadro", 'loi de Dalton', 'loi de Snell-Descartes', 'principe de Pascal', 'théorème de Bernoulli=principe de Bernoulli', "principe d'exclusion de Pauli", 'loi de Lavoisier', 'grand théorème de Fermat', 'petit théorème de Fermat', 'théorème de Gödel', 'lois de Mendel', 'loi de Faraday', 'loi de Lenz', "loi d'Ampère", 'loi de Henry'],
    't4': ['loi de Stefan-Boltzmann', 'loi de Wien', 'loi de Planck', 'loi de Kirchhoff', 'théorème de Gauss', 'principe de Le Chatelier', 'loi de Hess', 'loi de Raoult', 'loi de Beer-Lambert', 'loi de Hardy-Weinberg', 'théorème de Bayes', 'théorème de Rolle', 'théorème de Green', 'théorème de Stokes', 'théorème de Lagrange', 'théorème de Bézout', 'théorème de Ptolémée', "théorème d'Euclide", 'loi de Zipf', 'loi de Poisson', 'loi de Titius-Bode', 'loi de Biot-Savart', 'loi de Poiseuille', 'loi de Stokes', 'loi de Laplace', 'loi de Curie', 'loi de Fick', 'principe de Fermat', 'principe de Huygens', 'principe de Carnot', 'théorème de Napoléon', 'loi de Gauss=loi normale', 'théorème de Viviani', 'théorème de Pick', 'théorème de Morley', 'théorème de Ceva', 'théorème de Ménélaüs', 'théorème de Weierstrass', 'théorème de Cauchy', 'théorème de Fubini', 'théorème de Noether', 'théorème de Liouville', 'théorème de Brouwer', "théorème d'Al-Kashi", 'théorème de Pitot', "théorème d'Euler", 'théorème de Tchebychev'],
    't5': ['loi de Dulong et Petit', 'loi de Weber-Fechner', 'loi de Stevens', 'loi de Darcy', 'loi de Rayleigh', 'loi de Malus', 'loi de Brewster', 'loi de Bragg', 'loi de Graham', 'loi de Lambert', 'loi de refroidissement de Newton', 'principe de Hamilton', 'théorème de Poincaré', 'théorème de Heine', 'théorème de Dirichlet', 'théorème de Lindemann', "théorème d'Abel-Ruffini", 'théorème de Kuratowski'],
    't6': ['loi de Benford'],
}
T['sci-physchim-10'] = {
    't1': ['addition=+/plus', 'soustraction=-/moins', 'multiplication=×/fois', 'division=÷/diviser', 'pourcentage=%', 'racine carrée=√', 'pi=π', 'infini=∞'],
    't2': ['égal=signe égal'],
    't3': ['supérieur=>', 'inférieur=<', 'puissance=exposant', 'carré', 'cube', 'factorielle=!', 'somme=sigma', 'intégrale=∫', 'dérivée', 'logarithme=log', 'exponentielle=exp', 'sinus=sin', 'cosinus=cos', 'tangente=tan', 'modulo', 'valeur absolue', 'différent=≠', 'inférieur ou égal=≤', 'supérieur ou égal=≥', 'ensemble vide=∅', 'angle', 'limite=lim', 'parenthèses', 'racine cubique', 'fraction'],
    't4': ['logarithme népérien=ln', 'racine n-ième', 'partie entière', 'inverse', 'opposé', 'réunion=∪', 'intersection=∩', 'appartenance=∈', 'inclusion=⊂', 'implication=⇒', 'équivalence=⇔', 'négation', 'quantificateur universel=∀', 'quantificateur existentiel=∃', 'environ égal=≈', 'proportionnel=∝', 'parallèle', 'perpendiculaire=⊥', 'produit scalaire', 'produit vectoriel', 'déterminant=det', 'norme', 'arrangement', 'combinaison', 'permutation', 'coefficient binomial', 'cotangente=cotan', 'arc sinus=arcsin', 'arc cosinus=arccos', 'arc tangente=arctan', 'logarithme décimal', 'vecteur', 'matrice', 'pour mille=‰', 'moyenne', 'médiane', 'écart-type'],
    't5': ['complémentaire', 'conjonction', 'disjonction', 'différentielle', 'gradient=nabla', 'laplacien', 'divergence', 'rotationnel', 'transposée', 'trace', 'produit tensoriel', 'convolution', 'composition=∘', 'primitive', 'dérivée partielle=∂', 'intégrale double', 'intégrale curviligne', 'sinus hyperbolique=sh', 'cosinus hyperbolique=ch', 'tangente hyperbolique=th', 'argument', 'module', 'conjugué', 'partie réelle', 'partie imaginaire', 'produit infini', 'borne supérieure', 'borne inférieure', 'maximum', 'minimum', 'pgcd', 'ppcm', 'reste', 'quotient', 'congruence=≡', 'différence symétrique', 'produit cartésien', 'cardinal', 'delta=Δ', 'epsilon=ε', "nombre d'or=φ/phi", 'unité imaginaire=i', 'nombre e', "constante d'Euler", 'symbole de Kronecker', 'symbole de Landau', 'fonction gamma', 'fonction zêta', 'fonction de Dirac', "fonction d'Ackermann", 'aleph zéro=ℵ0', "moins l'infini"],
    't6': ['tétration'],
}
T['sci-physchim-11'] = {
    't1': ['bécher', 'éprouvette', 'tube à essai', 'pipette', 'erlenmeyer', 'burette', 'balance', 'bec Bunsen', 'entonnoir'],
    't2': ['microscope'],
    't3': ['ballon', 'fiole jaugée', 'creuset', 'mortier', 'pilon', 'spatule', 'pissette', 'verre de montre', 'cristallisoir', 'ampoule à décanter', 'agitateur magnétique', 'thermomètre', 'papier filtre', 'lunettes de protection', 'blouse', 'gants', 'hotte', 'centrifugeuse', 'pince en bois', 'boîte de Petri', 'lame', 'lamelle', 'plaque chauffante', 'éprouvette graduée', 'pipette Pasteur', 'seringue', 'bain-marie'],
    't4': ['support élévateur', 'potence', 'noix de serrage', 'trépied', 'grille', 'capsule', 'coupelle', 'flacon', 'réfrigérant', 'colonne à distiller', 'ballon à fond rond', 'ballon tricol', 'rotavapor', 'dessiccateur', 'étuve', 'autoclave', 'barreau aimanté', 'pH-mètre', 'spectrophotomètre', 'chronomètre', 'propipette', 'micropipette', 'fiole à vide', 'filtre Büchner', 'entonnoir Büchner', 'ampoule de coulée', 'Soxhlet', 'bouchon', 'tube en U', 'tube capillaire', 'balance de précision', 'douche de sécurité', 'rince-œil', 'extincteur', 'pince', 'pince à creuset', 'triangle en terre', 'tube à hémolyse', 'ballon à fond plat', 'bec électrique'],
    't5': ['éprouvette à gaz', 'cloche à gaz', 'cuve à eau', 'tube de Thiele', 'voltamètre de Hofmann', 'pycnomètre', 'ébulliomètre', 'tube à dégagement', 'burette de Mohr', 'pipette jaugée', 'pipette graduée', 'verre à pied', 'ballon de Claisen', 'tête de distillation', 'allonge', 'appareil de Kipp', 'tamis moléculaire', 'dessiccateur à vide', 'lampe à alcool', 'rampe à vide', 'évaporateur rotatif', 'spectromètre', 'chromatographe', 'électrode', 'cellule de conductimétrie', 'générateur de tension', 'alimentation stabilisée', "banc d'optique", 'lentille', 'prisme', 'aimant', 'bobine', 'cuve à ondes', 'sonde', 'fiole conique', 'agitateur en verre', 'baguette de verre', 'support de tubes à essai', 'portoir'],
    't6': ['Dewar=vase de Dewar'],
}
T['sci-physchim-12'] = {
    't1': ['masse', 'longueur', 'force', 'énergie', 'puissance', 'température', 'pression', 'temps'],
    't2': ['vitesse'],
    't3': ['accélération', 'poids', 'volume', 'densité', 'masse volumique', 'travail', 'intensité du courant', 'tension', 'résistance', 'fréquence', 'charge électrique', 'aire=surface', 'débit', 'distance', 'chaleur', 'angle', 'période', "longueur d'onde", 'champ magnétique', 'champ électrique', 'quantité de matière', 'déplacement', 'éclairement', 'altitude', 'durée', 'énergie cinétique', 'énergie potentielle'],
    't4': ['capacité électrique', 'inductance', 'flux magnétique', 'intensité lumineuse', 'flux lumineux', 'luminance', 'viscosité', 'moment cinétique', 'quantité de mouvement', 'impulsion', 'couple=moment de force', 'capacité thermique', 'conductivité thermique', 'entropie', 'enthalpie', 'activité=radioactivité', 'dose absorbée', 'dose équivalente', 'vitesse angulaire', 'pulsation', 'intensité sonore', 'niveau sonore', 'concentration', 'tension superficielle', 'module de Young', 'contrainte', 'déformation', 'rendement', 'permittivité', 'perméabilité', 'indice de réfraction', 'luminosité', 'potentiel électrique', 'conductance', 'impédance', 'réactance', 'puissance électrique', 'énergie mécanique', 'énergie thermique', 'énergie électrique', 'énergie nucléaire', 'force de pesanteur', 'énergie interne', 'énergie chimique', 'intensité de pesanteur'],
    't5': ['fluence', 'irradiance', 'exposition', 'rigidité', 'flux thermique', 'diffusivité thermique', 'coefficient de frottement', 'susceptibilité magnétique', 'résistivité', 'conductivité électrique', 'mobilité', 'constante de temps', 'facteur de qualité', 'déphasage', 'phase', 'amplitude', 'élongation', 'nombre de Reynolds', 'nombre de Mach', 'nombre de Froude', 'masse molaire', 'volume molaire', 'potentiel chimique', 'énergie libre', 'énergie de Gibbs', 'travail mécanique', 'pression partielle', 'pression osmotique', 'tension de vapeur', 'humidité relative', 'chaleur latente', 'chaleur massique', 'chaleur spécifique', 'polarisation', 'aimantation', 'excitation magnétique', 'induction magnétique', 'densité de courant', 'constante diélectrique', 'spin', "moment d'inertie", 'courbure', 'torsion', 'section efficace', "énergie d'ionisation", 'fugacité', 'durée de vie', 'demi-vie', 'constante radioactive', 'constante de désintégration', 'activité massique', 'débit de dose', 'luminance énergétique', 'rendement quantique'],
    't6': ['jerk=secousse'],
}
T['sci-physchim-13'] = {
    't1': ['or', 'argent', 'cuivre', 'aluminium', 'zinc', 'plomb', 'étain', 'mercure', 'platine'],
    't2': ['fer'],
    't3': ['nickel', 'titane', 'chrome', 'cobalt', 'manganèse', 'magnésium', 'sodium', 'potassium', 'lithium', 'calcium', 'uranium', 'tungstène=wolfram', 'plutonium', 'cadmium', 'palladium', 'molybdène', 'radium', 'thorium'],
    't4': ['césium', 'rubidium', 'béryllium', 'strontium', 'baryum', 'scandium', 'vanadium', 'zirconium', 'niobium', 'rhodium', 'iridium', 'osmium', 'ruthénium', 'tantale', 'hafnium', 'indium', 'thallium', 'bismuth', 'lanthane', 'cérium', 'néodyme', 'francium', 'yttrium', 'rhénium'],
    't5': ['technétium', 'praséodyme', 'prométhium', 'samarium', 'europium', 'gadolinium', 'terbium', 'dysprosium', 'holmium', 'erbium', 'thulium', 'ytterbium', 'lutécium', 'actinium', 'protactinium', 'neptunium', 'américium', 'curium', 'berkélium', 'californium', 'einsteinium', 'fermium', 'mendélévium', 'nobélium', 'lawrencium', 'rutherfordium', 'dubnium'],
    't6': ['gallium'],
}
T['sci-physchim-14'] = {
    't1': ['ampoule', 'interrupteur', 'résistance', 'condensateur', 'diode', 'transistor', 'fil électrique=fil', 'LED=DEL', 'batterie'],
    't2': ['pile'],
    't3': ['fusible', 'relais', 'transformateur', 'circuit intégré=puce', 'microprocesseur', 'potentiomètre', 'thermistance', 'photorésistance=LDR', 'bobine=inductance', 'moteur', 'haut-parleur', 'microphone', 'disjoncteur', 'prise', 'câble', 'connecteur', 'bouton-poussoir', 'commutateur', 'inverseur', 'voyant', 'capteur', 'rhéostat', 'circuit imprimé=PCB', 'mémoire', 'générateur', 'alternateur', 'buzzer'],
    't4': ['varistance', 'diode Zener', 'thyristor', 'triac', 'MOSFET', 'amplificateur opérationnel', 'quartz', 'photodiode', 'phototransistor', 'optocoupleur', 'régulateur de tension', 'pont de diodes', 'condensateur électrolytique', 'supercondensateur', 'self', 'tube à vide=lampe', 'thermocouple', 'cellule photovoltaïque', 'shunt', 'parafoudre', "plaque d'essai=breadboard", 'microcontrôleur', 'afficheur', 'écran LCD', 'cellule solaire', 'résistance variable', 'borne', 'barrette de connexion', 'porte-fusible', 'douille', 'culot', 'contacteur', 'sectionneur', 'thermostat', 'minuterie', 'détecteur', 'sonde de température', 'sirène'],
    't5': ['transistor bipolaire', 'transistor à effet de champ=JFET', 'IGBT', 'diac', 'diode Schottky', 'diode tunnel', 'diode laser', 'oscillateur', 'bascule', 'porte logique', 'compteur', 'registre', 'convertisseur analogique-numérique', 'convertisseur numérique-analogique', 'mémoire flash', 'EEPROM', 'EPROM', 'ROM', 'RAM', 'FPGA', 'ASIC', 'processeur graphique', 'cellule de Peltier', 'capteur à effet Hall', 'thermistance CTN', 'thermistance CTP', 'filtre', 'inductance variable', 'condensateur variable', 'réseau de résistances', 'barrette LED', 'tube cathodique', 'tube électronique', 'klystron', 'thyratron'],
    't6': ['magnétron'],
}
T['sci-physchim-15'] = {
    't1': ['eau=H2O', 'sel=chlorure de sodium/NaCl/sel de table/sel de cuisine', 'sucre=saccharose', 'alcool=éthanol', 'dioxyde de carbone=CO2/gaz carbonique', 'ammoniac=NH3', 'méthane=CH4', "eau oxygénée=peroxyde d'hydrogène/H2O2"],
    't2': ['glucose'],
    't3': ['soude=hydroxyde de sodium/NaOH', 'potasse=hydroxyde de potassium/KOH', 'chaux vive=oxyde de calcium', 'chaux éteinte=hydroxyde de calcium', 'calcaire=carbonate de calcium/CaCO3', 'bicarbonate de soude=bicarbonate de sodium', 'acétone', 'benzène', 'méthanol', 'glycérol=glycérine', 'urée', 'caféine', 'nicotine', 'aspirine', 'paracétamol', 'propane', 'butane', 'monoxyde de carbone=CO', 'rouille=oxyde de fer', 'silice=dioxyde de silicium/SiO2', "alumine=oxyde d'aluminium", 'lactose', 'fructose', 'cellulose', 'amidon', 'acide chlorhydrique=HCl', 'acide sulfurique=H2SO4', 'eau de Javel=hypochlorite de sodium', 'éthylène', 'acétylène', 'toluène', 'éther', 'chloroforme', 'TNT=trinitrotoluène', 'nitroglycérine', 'formol=formaldéhyde'],
    't4': ['sulfate de cuivre=CuSO4', "sulfate de magnésium=sel d'Epsom", 'gypse=sulfate de calcium', 'salpêtre=nitrate de potassium', "nitrate d'argent", 'chlorure de calcium', 'chlorure de potassium', 'chlorure de magnésium', 'éthylène glycol', 'cyanure de potassium', 'oxyde de zinc', 'dioxyde de titane', 'permanganate de potassium', 'borax', "sulfure d'hydrogène=H2S", 'carbonate de sodium', 'vitamine C', 'cholestérol', 'éthane', 'hexane', 'octane', 'heptane', 'isooctane', 'phénol', 'aniline', 'styrène', 'polyéthylène', 'nylon', 'PVC=polychlorure de vinyle', 'téflon=PTFE', "chlorure d'ammonium=sel ammoniac", "nitrate d'ammonium", "sulfate d'aluminium=alun", 'phosphate de calcium', "protoxyde d'azote=N2O", 'dioxyde de soufre=SO2'],
    't5': ['peroxyde de benzoyle', 'hydrazine', 'oxyde de magnésium=magnésie', 'oxyde de cuivre', 'chlorure de zinc', 'sulfure de zinc', 'sulfure de plomb=galène', 'sulfure de fer=pyrite', 'sulfure de mercure=cinabre', 'oxyde de plomb=litharge', 'carbure de calcium', 'carbure de silicium=carborundum', 'nitrure de bore', 'dioxyde de manganèse', 'dichromate de potassium', 'thiosulfate de sodium', 'iodure de potassium', 'chlorure de fer III', 'sulfate de fer=vitriol vert', 'sulfate de zinc', "bromure d'argent", "chlorure d'argent", 'fluorure de sodium', 'fluorure de calcium=fluorine', 'azoture de sodium', 'fulminate de mercure', 'pentaérythritol', 'hexogène=RDX', 'octogène', 'mélamine', 'caprolactame', 'xylène', 'éther diéthylique', 'dichlorométhane', 'tétrachlorure de carbone'],
    't6': ['monoxyde de dihydrogène'],
}
