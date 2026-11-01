"""Source éditable du bestiaire Forgemon -> data/creatures.json.
Toutes les créatures sont des designs ORIGINAUX. Ne jamais y mettre un personnage,
un nom ou un design d'une franchise existante.
Format d'une lignée : (id, groupe, option, type, [(nom, entrée du bestiaire, brief d'art) x3])
Lancer : python3 tools/build_creatures.py
"""
import json, pathlib

L = []
def line(id, group, option, type_, stages, palette, extra=None):
    d = {"id": id, "group": group, "option": option, "type": type_, "palette": palette,
         "stages": [{"stage": i + 1, "name": n, "dex": dx, "brief": br} for i, (n, dx, br) in enumerate(stages)]}
    if extra: d.update(extra)
    L.append(d)

# ---------- SPÉCIALES ----------
line("braisillon", "starter", "-", "Feu", [
 ("Braisillon", "Né dans les cendres d'une forge. Sa plaque frontale chauffe quand tu t'entraînes.", "Petit dragon trapu, rond, écailles anthracite, plaque frontale en fonte avec rivet incandescent, ailerons rouge brique, fissures orange sur les joues."),
 ("Fondragon", "Ses fissures rougeoient après chaque activité réelle. Il ne grandit que si toi tu bouges.", "Dragon bipède, plastron en fonte strié de lave, cornes acier, ailes membraneuses brique, queue à pointe d'acier, yeux ambre."),
 ("Pyrarque", "Un brasier vivant. Il porte la somme de tout ton travail.", "Grand dragon cuirassé, plastron-grille de fourneau incandescent, couronne de cornes, ailes déployées nervurées, aura orangée, crocs blancs.")],
 ["#2B2B33", "#7A2E1D", "#FF7A1A", "#FFE08A"],
 {"special": "starter", "evolution": {"by": "activites_reelles", "stage2": 30, "stage3": 100}})

line("ondulin", "natation", "-", "Eau", [
 ("Ondulin", "Petit hippocampe curieux. Il suit les nageurs et compte leurs longueurs.", "Hippocampe miniature turquoise, ventre crème annelé, nageoire dorsale translucide, queue enroulée, grands yeux brillants."),
 ("Hippondule", "Ses anneaux s'allongent à chaque séance de natation. Il fend le courant sans effort.", "Hippocampe élancé bleu profond, crinière de nageoires en vagues, anneaux dorés, museau en tube allongé."),
 ("Maréquestre", "Coursier des abysses. Il galope sur la houle et emporte son dresseur sous la surface.", "Grand hippocampe-destrier, armure de corail sur le poitrail, crinière d'écume, queue spiralée lumineuse, palette bleu nuit / or.")],
 ["#2BB3C0", "#0F4C75", "#F2D16B", "#E8F7F5"],
 {"special": "hippocampe", "evolution": {"by": "seances_natation", "stage2": 8, "stage3": 24}})

line("titanox", "finale", "-", "Acier", [
 ("Titanox", "Gardien du Sommet de la Balance. Il n'apparaît qu'au dresseur qui a atteint son poids cible sans perdre sa force.", "Colosse de métal en forme de balance vivante : deux plateaux comme épaulières, cœur de forge visible dans le torse, cornes en crochets de levage, palette acier / or.")],
 ["#8A96A8", "#3A4160", "#F2B544", "#FF7A1A"],
 {"special": "legendaire"})

# ---------- PECS ----------
line("papilune", "ecartes", "A", "Eau", [
 ("Papilune", "Plane entre deux eaux en ouvrant grand ses nageoires.", "Petite raie manta bleu nuit, ventre clair, yeux sur le dessus, nageoires larges comme des bras ouverts."),
 ("Papilame", "Ses nageoires s'étirent un peu plus à chaque écarté contrôlé.", "Raie manta plus large, cornes céphaliques, points lumineux turquoise sur les ailes, queue fine."),
 ("Abyssaile", "Son envergure masque la lune quand il remonte des abysses.", "Raie géante, envergure immense, arc lumineux sur le bord des ailes, motifs d'étoiles sur le dos.")],
 ["#1A2F5C", "#3E6BB5", "#46C6E0", "#D6ECF8"])
line("phalenuit", "ecartes", "B", "Insecte", [
 ("Phalénuit", "Papillon de nuit qui ouvre ses ailes en grand vers la lumière.", "Petit papillon de nuit duveteux gris-mauve, antennes plumeuses, ailes rondes repliées."),
 ("Phalombre", "Plus ses ailes s'ouvrent, plus ses motifs d'yeux impressionnent.", "Papillon de nuit plus grand, ailes à ocelles orange, corps velu, pattes fines."),
 ("Sélénaile", "Ses ailes déployées couvrent une clairière entière sous la lune.", "Grand papillon lunaire, ailes à longues queues, croissant argenté sur chaque aile, poussière lumineuse.")],
 ["#5B4A6E", "#A08BB8", "#F2B544", "#E8E1F0"])

line("agnelure", "chest_press", "A", "Choc", [
 ("Agnelure", "Pousse tout ce qui bouge, laine en avant.", "Agneau trapu à laine crème bouclée, petites cornes, front plat, sabots noirs."),
 ("Bélimur", "Ses cornes s'enroulent à chaque série.", "Bélier musclé, cornes enroulées épaisses, laine courte, poitrail large."),
 ("Cornemuraille", "Enfonce les portes des forteresses.", "Bélier massif aux cornes de pierre taillée, laine en plaques comme un mur de briques, posture de charge.")],
 ["#EDE3CF", "#8C6F4E", "#5E4422", "#C2410C"])
line("bisonneau", "chest_press", "B", "Roc", [
 ("Bisonneau", "Pousse tout devant lui, tête baissée.", "Jeune bison brun, petite bosse, toison sombre sur la tête, petites cornes."),
 ("Bisoncharge", "Sa bosse se durcit comme la pierre des plaines.", "Bison puissant, toison épaisse, cornes courbes ivoire, bosse marquée."),
 ("Titabison", "Une charge de Titabison déplace les collines.", "Bison colossal, bosse couverte de pics de roche grise, barbe épaisse, cornes larges.")],
 ["#4A2C14", "#8B5A2E", "#EDE3CF", "#8C8F99"])

line("pincelet", "incline", "A", "Acier", [
 ("Pincelet", "Pousse les galets vers le ciel avec ses petites pinces.", "Petit crabe rouge corail, pinces levées vers le haut, yeux pédonculés."),
 ("Pinçacier", "Ses pinces se recouvrent d'acier poli.", "Crabe plus grand, pinces métalliques chromées, liseré acier sur la carapace."),
 ("Crabastion", "Une forteresse à pattes. Sa carapace a des créneaux.", "Crabe-forteresse, carapace à créneaux de château en acier, pinces énormes levées en presse inclinée.")],
 ["#8A3420", "#E07A55", "#D8E0EA", "#6C7888"])
line("enclumot", "incline", "B", "Acier", [
 ("Enclumot", "Petit golem né d'une enclume tombée. Il soulève tout ce qui traîne.", "Golem minuscule en forme d'enclume, bras courts, yeux-rivets, patine grise."),
 ("Martelor", "Ses poings sont devenus des marteaux de forge.", "Golem trapu, poings-marteaux, torse d'enclume, étincelles sur les jointures."),
 ("Forgeroc", "Chaque poussée de Forgeroc fait jaillir une gerbe d'étincelles.", "Grand golem de forge, cheminée sur le dos, torse d'enclume incandescent, bras levés.")],
 ["#3A3A44", "#6E6E7A", "#FF7A1A", "#F2B544"])

line("gorillot", "dips", "A", "Choc", [
 ("Gorillot", "Se hisse sur les branches à la force des bras.", "Bébé gorille gris anthracite, gros avant-bras, visage expressif, ventre clair."),
 ("Gorillard", "Ses triceps font trembler les troncs.", "Gorille musclé, épaules massives, bandeaux aux poignets, poitrail marqué."),
 ("Dorsargent", "Son dos argenté impose le respect à toute la jungle.", "Gorille colossal à dos argenté, bracelets de cuivre, appuis sur les poings, regard calme.")],
 ["#24242B", "#55555F", "#C9CDD6", "#C2410C"])
line("varanou", "dips", "B", "Terre", [
 ("Varanou", "Se redresse sur ses pattes avant pour guetter.", "Petit varan sable, pattes avant tendues, langue fourchue rose, rayures discrètes."),
 ("Varanox", "Ses épaules s'épaississent à chaque appui.", "Varan robuste, crête d'écailles brunes sur le dos, épaules larges."),
 ("Komodor", "Sa queue fend la terre sèche d'un seul coup.", "Grand varan cuirassé, écailles-pépites ivoire, queue lourde, griffes noires.")],
 ["#7A5A2E", "#CDA86A", "#E3CFA3", "#D94A5A"])

# ---------- DOS ----------
line("griffi", "tractions", "A", "Air", [
 ("Griffi", "Boule de plumes qui s'accroche partout.", "Bébé griffon : tête d'aiglon, corps de lionceau, petites ailes, griffes agrippées à une branche."),
 ("Griffal", "Ses ailes se gonflent à chaque traction propre.", "Griffon adolescent, grandes ailes, dos en V, plumes fauves."),
 ("Aérogriff", "Plane au-dessus des barres. Porte son poids sans y penser.", "Griffon majestueux, envergure énorme, plumes dorées, posture suspendue en traction.")],
 ["#C08A3E", "#F2D16B", "#FFFFFF", "#5E4422"])
line("grimpouille", "tractions", "B", "Roc", [
 ("Grimpouille", "Lynx minuscule qui escalade les rochers avant de savoir marcher.", "Petit lynx gris, pinceaux d'oreilles, grosses pattes, griffes de grimpeur."),
 ("Escalynx", "Ses dorsaux lui permettent de se hisser sur n'importe quelle paroi.", "Lynx musclé, dos large, pelage tacheté gris-bleu, collier de cordes."),
 ("Cimelynx", "Vit au sommet des falaises. Personne ne l'a vu grimper, seulement arriver.", "Grand lynx de montagne, plaques de roche sur les épaules, crinière de neige, yeux glacier.")],
 ["#6B7280", "#9CA3AF", "#E5E7EB", "#2F4E8C"])

line("chiropi", "tirage_vertical", "A", "Ombre", [
 ("Chiropi", "Se suspend la tête en bas, dos serré.", "Petite chauve-souris violette, grandes oreilles, ailes repliées, crocs mignons."),
 ("Chiroval", "Tire la nuit vers le sol à la force des ailes.", "Chauve-souris plus grande, ailes larges, dorsaux visibles, yeux rouges."),
 ("Noctarque", "Ses ailes couvrent le ciel d'un seul battement.", "Chauve-souris royale, cape d'ailes, couronne d'oreilles, motifs d'étoiles.")],
 ["#3B2A55", "#6E4F9A", "#D94A5A", "#E8E1F0"])
line("aiglonnet", "tirage_vertical", "B", "Air", [
 ("Aiglonnet", "Bat des ailes vers le bas pour décoller, encore et encore.", "Aiglon duveteux blanc et brun, bec jaune, ailes courtes."),
 ("Serrevent", "Ses serres tirent l'air vers lui comme une corde.", "Aigle jeune adulte, serres puissantes, plumes brunes, sourcils marqués."),
 ("Tempestaigle", "Chaque battement de Tempestaigle soulève une tempête.", "Grand aigle, ailes à pointes d'éclair, tête blanche, nuages autour des ailes.")],
 ["#5E4422", "#F2D16B", "#FFFFFF", "#4FA3E0"])

line("pieuvrette", "tirage_horizontal", "A", "Eau", [
 ("Pieuvrette", "Tire les coquillages vers elle, un tentacule à la fois.", "Petite pieuvre corail, gros yeux, tentacules courts enroulés."),
 ("Tentacorde", "Ses tentacules sont devenus des cordes de rameur.", "Pieuvre musclée, tentacules épais comme des cordages, motifs de nœuds marins."),
 ("Krakenrame", "Il rame avec huit bras à la fois et remonte les navires.", "Pieuvre géante, tentacules-avirons, ventouses lumineuses, cicatrices de marin.")],
 ["#C2410C", "#E07A55", "#F2C9A8", "#0F4C75"])
line("morsillon", "tirage_horizontal", "B", "Glace", [
 ("Morsillon", "Se hisse sur la banquise en tirant avec ses défenses.", "Bébé morse rond, petites défenses, moustache, peau rosée."),
 ("Morsabre", "Ses défenses s'allongent comme des sabres de glace.", "Morse robuste, défenses longues givrées, épaules massives."),
 ("Banquisor", "Il tire des icebergs entiers jusqu'à la côte.", "Morse colossal, défenses de cristal, carapace de glace sur le dos, souffle de givre.")],
 ["#B07A6A", "#E3B5A4", "#BFE6F5", "#FFFFFF"])

line("rorquelet", "pendle_row", "A", "Eau", [
 ("Rorquelet", "Petit baleineau qui nage en ramant de ses nageoires.", "Baleineau bleu-gris, sillons blancs sous la gorge, nageoires pectorales longues."),
 ("Rorquefond", "Chaque coup de nageoire le propulse d'une longueur de bateau.", "Baleine à bosse jeune, nageoires très longues, bosses sur la tête."),
 ("Léviarorque", "Ses remontées font naître des vagues jusqu'à l'horizon.", "Baleine géante, nageoires comme des rames, motifs de constellations, jet d'eau en couronne.")],
 ["#2F4E6E", "#6C8EAD", "#E8F7F5", "#46C6E0"])
line("castorame", "pendle_row", "B", "Terre", [
 ("Castorame", "Rame avec sa queue plate pour traverser la rivière.", "Petit castor brun, queue plate écaillée, dents orange, ventre clair."),
 ("Castoral", "Tire des troncs entiers jusqu'à son barrage.", "Castor costaud, avant-bras épais, gilet de branches."),
 ("Barragor", "Ses barrages retiennent des lacs entiers.", "Castor massif, armure de rondins, queue-pagaie énorme, casque de boue séchée.")],
 ["#5A3A22", "#8B5A2E", "#F2B544", "#7FB8F0"])

line("groinet", "rdl", "A", "Terre", [
 ("Groinet", "Fouille le sol, dos bien plat.", "Marcassin rayé brun et crème, groin rose, dos plat."),
 ("Sanglard", "Ses ischios tirent des souches entières.", "Sanglier musclé, crinière dorsale, petites défenses, cuisses puissantes."),
 ("Défensor", "Déracine les arbres d'un coup de hanches.", "Sanglier colossal, défenses en croissant, plaques de terre sur le dos, posture de charnière de hanche.")],
 ["#4A3020", "#8B5A2E", "#EDE3CF", "#C2410C"])
line("racinou", "rdl", "B", "Plante", [
 ("Racinou", "Souche vivante qui s'arrache du sol chaque matin.", "Petite souche à yeux ronds, racines comme des pattes, bourgeon sur la tête."),
 ("Souchard", "Ses racines tirent la terre comme des câbles.", "Souche trapue, racines épaisses enroulées, mousse sur les épaules."),
 ("Chênegrave", "Quand il se redresse, la forêt entière se redresse avec lui.", "Chêne-golem, tronc dos droit, racines-jambes ancrées, couronne de feuilles d'automne.")],
 ["#5A3A22", "#3E7C4A", "#8CC66B", "#C08A3E"])

# ---------- ÉPAULES ----------
line("albatrot", "elevations", "A", "Air", [
 ("Albatrot", "Lève ses ailes sur les côtés pour sentir le vent.", "Petit albatros blanc, ailes tenues à l'horizontale, bec rosé."),
 ("Albaplane", "Ses épaules tiennent ses ailes ouvertes des heures.", "Albatros adulte, envergure très large, deltoïdes marqués, bord d'ailes gris."),
 ("Envergor", "Il fait le tour du monde sans un battement d'aile.", "Albatros géant, ailes interminables, motifs de rose des vents, aura de vent.")],
 ["#FFFFFF", "#9CA3AF", "#F2C9A8", "#4FA3E0"])
line("libellame", "elevations", "B", "Insecte", [
 ("Libellame", "Tient ses ailes parfaitement à l'horizontale.", "Petite libellule vert émeraude, 4 ailes translucides, gros yeux."),
 ("Libelfuse", "Ses ailes vibrent si vite qu'elles sifflent.", "Libellule élancée, ailes à nervures dorées, corps segmenté bleu."),
 ("Odonarque", "Seigneur des marais, il reste immobile dans les airs.", "Grande libellule royale, ailes-lames irisées, couronne d'antennes.")],
 ["#2E9E5B", "#46C6E0", "#F2B544", "#E8F7F5"])

line("hiboulet", "rear_delt", "A", "Ombre", [
 ("Hiboulet", "Tourne la tête pour surveiller ses arrières.", "Petit hibou gris, aigrettes, gros yeux orange, plumes ébouriffées."),
 ("Chevêchard", "Ses ailes battent vers l'arrière en silence.", "Hibou robuste, épaules arrière marquées, plumage moucheté."),
 ("Nyctiduc", "Rien ne lui échappe, même dans son dos.", "Grand-duc imposant, cape de plumes, aigrettes en couronne, yeux dorés lumineux.")],
 ["#4B5563", "#9CA3AF", "#E0A100", "#1B1B22"])
line("scorpiot", "rear_delt", "B", "Poison", [
 ("Scorpiot", "Ramène sa queue vers l'arrière avant de frapper.", "Petit scorpion violet, pinces arrondies, queue courte."),
 ("Scorpidard", "Son dard part toujours de derrière l'épaule.", "Scorpion musclé, queue arquée, plaques d'armure dorsales."),
 ("Scorptyran", "Il protège ses arrières mieux que quiconque.", "Scorpion géant, carapace couronnée, dard cristallin violet, pinces massives.")],
 ["#4C1D95", "#8B5CF6", "#A3E635", "#1B1B22"])

# ---------- BRAS ----------
line("marteline", "curl_marteau", "A", "Air", [
 ("Marteline", "Frappe les troncs en gardant le bec bien droit.", "Petit pic-vert, calotte rouge, bec droit, plumes vertes."),
 ("Martepic", "Ses coups de bec résonnent dans toute la forêt.", "Pic-vert robuste, bec en marteau, avant-bras d'ailes épais."),
 ("Picognard", "Un seul coup de bec fend un tronc en deux.", "Grand pic, bec en tête de marteau, plumage vert sombre et rouge, posture de frappe.")],
 ["#3E7C4A", "#8CC66B", "#D94A5A", "#F2D16B"])
line("tatouroc", "curl_marteau", "B", "Roc", [
 ("Tatouroc", "Se roule en boule et se relève d'un coup de bras.", "Petit tatou à bandes grises, museau long, grosses pattes avant."),
 ("Tatoubloc", "Ses bandes de carapace sont devenues de la pierre.", "Tatou trapu, plaques de roche, griffes épaisses."),
 ("Armadillor", "Roulé en boule, il dévale les montagnes comme un rocher.", "Tatou géant, carapace de granit veinée d'or, griffes-pioches.")],
 ["#6B7280", "#9CA3AF", "#C08A3E", "#E5E7EB"])

line("ourseau", "curl_pupitre", "A", "Choc", [
 ("Ourseau", "Plie les bras pour attraper le miel en hauteur.", "Ourson brun, museau clair, pattes avant rondes."),
 ("Oursolide", "Ses biceps arrachent les ruches des arbres.", "Ours musclé, bras épais, bandeau, ventre clair."),
 ("Ursaltère", "Il soulève des rochers comme des haltères.", "Grand ours, bras énormes, bracelets de fer, cicatrice sur le museau.")],
 ["#5A3A22", "#8B5A2E", "#F2D16B", "#C2410C"])
line("mantisse", "curl_pupitre", "B", "Insecte", [
 ("Mantisse", "Replie ses pattes avant avec une précision parfaite.", "Petite mante verte, pattes ravisseuses repliées, tête triangulaire."),
 ("Mantilame", "Ses pattes avant se plient comme des lames.", "Mante élancée, pattes-lames, ailes repliées."),
 ("Sabremante", "Elle tranche l'air en un seul mouvement contrôlé.", "Grande mante, pattes-sabres argentées, ailes en cape, posture de garde.")],
 ["#3E7C4A", "#8CC66B", "#D8E0EA", "#F2D16B"])

line("heronot", "curl_incline", "A", "Eau", [
 ("Héronot", "Tend le cou vers l'arrière avant de piquer.", "Petit héron gris-bleu, long cou, pattes fines."),
 ("Héronlance", "Son bec part comme une lance.", "Héron adulte, bec-lance, plumes en aigrette."),
 ("Aigrétoile", "Il pêche les reflets d'étoiles à la surface du lac.", "Grand héron argenté, aigrettes lumineuses, bec en cristal.")],
 ["#6C8EAD", "#D8E0EA", "#F2D16B", "#0F4C75"])
line("frelonet", "curl_incline", "B", "Insecte", [
 ("Frelonet", "Plie ses pattes avant pour porter sa récolte.", "Petit frelon jaune et brun, ailes rapides, antennes courtes."),
 ("Frelondard", "Son dard pique sous tous les angles.", "Frelon costaud, pattes avant épaisses, dard visible."),
 ("Vespérator", "Il règne sur un essaim entier au crépuscule.", "Grand frelon royal, armure orange et noir, couronne, dard doré.")],
 ["#C08A3E", "#F2B544", "#1B1B22", "#FFFFFF"])

line("lianou", "curl_poulie", "A", "Plante", [
 ("Lianou", "Se balance de liane en liane en tirant d'un bras.", "Petit singe vert mousse, longue queue enroulée, fleur derrière l'oreille."),
 ("Liansinge", "Ses bras sont devenus des lianes.", "Singe agile, bras lianes, feuilles sur les épaules."),
 ("Sylvorang", "Il tire la forêt entière vers lui d'un seul bras.", "Grand primate végétal, bras-lianes très longs, crinière de feuilles, fruits lumineux.")],
 ["#3E7C4A", "#8CC66B", "#E0567A", "#5A3A22"])
line("arachnis", "curl_poulie", "B", "Insecte", [
 ("Arachnis", "Remonte son fil en tirant d'une patte.", "Petite araignée bleu nuit, gros yeux brillants, fil argenté."),
 ("Arachnoeud", "Ses fils sont plus solides que des câbles de poulie.", "Araignée costaud, abdomen motif de poulie, fils tendus."),
 ("Tisserak", "Sa toile soutient un pont entier.", "Grande araignée tisserande, pattes en câbles d'acier, toile-mandala lumineuse.")],
 ["#1B2A4A", "#4FA3E0", "#D8E0EA", "#F2B544"])

line("lezarfouet", "triceps_ext", "A", "Terre", [
 ("Lézarfouet", "Fouette l'air de sa queue, bras tendus au-dessus de la tête.", "Petit lézard ocre, queue fouet, collerette."),
 ("Iguanfouet", "Sa queue claque comme un fouet de dresseur.", "Iguane robuste, crête dorsale, queue longue rayée."),
 ("Fouetdrake", "Le claquement de sa queue s'entend à des kilomètres.", "Grand lézard draconique, queue-fouet à pointe de pierre, crête de pics.")],
 ["#C08A3E", "#8B5A2E", "#3E7C4A", "#F2D16B"])
line("espadou", "triceps_ext", "B", "Eau", [
 ("Espadou", "Pointe son rostre vers le ciel avant de bondir.", "Petit espadon bleu, rostre court, nageoire dorsale en voile."),
 ("Espadard", "Son rostre s'allonge comme une épée.", "Espadon élancé, rostre long, voile dorsale haute."),
 ("Rostrelame", "Il tranche les vagues en ligne droite.", "Grand espadon, rostre-lame argenté, voile dorsale étincelante.")],
 ["#0F4C75", "#4FA3E0", "#D8E0EA", "#F2B544"])

line("cornelan", "au_front", "A", "Roc", [
 ("Cornelan", "Ses premiers bois pèsent déjà lourd sur son front.", "Faon d'élan, petits bois, pelage brun, museau doux."),
 ("Élancorne", "Ses bois s'élargissent comme une barre au-dessus de sa tête.", "Élan adulte, bois larges en pelle, cou puissant."),
 ("Majestélan", "Ses bois de pierre portent la neige de tout l'hiver.", "Élan colossal, bois de roche gravés, cape de neige, regard calme.")],
 ["#5A3A22", "#8B5A2E", "#8C8F99", "#FFFFFF"])
line("buceroche", "au_front", "B", "Air", [
 ("Bucéroche", "Porte un casque sur le bec et tient la tête droite.", "Petit calao noir et blanc, casque orange sur le bec."),
 ("Calaoroc", "Son casque s'épaissit à chaque effort.", "Calao adulte, casque massif, ailes noires."),
 ("Casqueroc", "Son casque de pierre fend les nuages.", "Grand calao, casque de pierre sculpté, plumes de queue longues, ailes en éventail.")],
 ["#1B1B22", "#FFFFFF", "#F97316", "#F2B544"])

# ---------- JAMBES ----------
line("taurillon", "leg_extension", "A", "Roc", [
 ("Taurillon", "Donne des coups de genou aux cailloux.", "Petit taureau gris, sabots ronds, cornes naissantes."),
 ("Taurock", "Ses quadriceps fissurent la roche.", "Taureau bipède, cuisses énormes, plaques de roche aux genoux."),
 ("Minotonne", "Chaque pas fait trembler la vallée.", "Minotaure de pierre, quadriceps massifs, cornes de granite, anneau au museau.")],
 ["#6B7280", "#9CA3AF", "#C08A3E", "#1B1B22"])
line("ressortin", "leg_extension", "B", "Eau", [
 ("Ressortin", "Détend ses pattes comme un ressort.", "Petite grenouille verte, cuisses repliées, gros yeux."),
 ("Détentor", "Il saute par-dessus les nénuphars d'un seul coup.", "Grenouille musclée, cuisses épaisses, motifs bleus."),
 ("Catapulte", "Sa détente l'envoie au-dessus des arbres.", "Grande grenouille athlétique, cuisses-ressorts, crête de nageoire, peau irisée.")],
 ["#3E7C4A", "#8CC66B", "#4FA3E0", "#F2D16B"])

line("lievron", "leg_curl", "A", "Air", [
 ("Lièvron", "Ramène ses talons vers lui avant chaque bond.", "Levraut beige, longues oreilles, pattes arrière repliées."),
 ("Lièvreclair", "Ses ischios le propulsent comme un éclair.", "Lièvre élancé, oreilles en flèche, pattes arrière puissantes."),
 ("Lepusprint", "Personne ne l'a jamais vu à l'arrêt.", "Grand lièvre aérodynamique, traînée de vent, oreilles en ailerons.")],
 ["#C08A3E", "#EDE3CF", "#4FA3E0", "#5A3A22"])
line("autruchon", "leg_curl", "B", "Terre", [
 ("Autruchon", "Court en ramenant ses pattes très haut.", "Bébé autruche duveteux gris, long cou, grandes pattes."),
 ("Autrufonce", "Ses foulées labourent la savane.", "Autruche adulte, cuisses musclées, plumes noires et blanches."),
 ("Struthor", "Un coup de patte de Struthor fend la terre sèche.", "Autruche géante, pattes cuirassées, griffes de pierre, plumage en éventail.")],
 ["#1B1B22", "#FFFFFF", "#E3B5A4", "#C08A3E"])

line("gibbonne", "pendulum", "A", "Plante", [
 ("Gibbonne", "Se balance d'avant en arrière toute la journée.", "Petit gibbon doré, bras très longs, visage noir."),
 ("Gibbalance", "Son balancement est réglé comme une horloge.", "Gibbon athlétique, jambes fléchies, pelage feuillu."),
 ("Arborythme", "Toute la canopée bat au rythme de ses squats.", "Grand primate-arbre, jambes puissantes, lianes rythmées, feuilles dorées.")],
 ["#C08A3E", "#F2D16B", "#3E7C4A", "#1B1B22"])
line("horlodon", "pendulum", "B", "Acier", [
 ("Horlodon", "Un petit golem-horloge qui fléchit à chaque tic-tac.", "Golem de laiton en forme de pendule, cadran au ventre, petites jambes."),
 ("Balancier", "Son balancier ne s'arrête jamais.", "Golem de laiton plus grand, balancier visible dans le torse, engrenages aux genoux."),
 ("Chronogolem", "Il plie le temps à chaque descente.", "Grand golem d'horlogerie, cadrans lumineux, jambes-pistons, aiguilles en cornes.")],
 ["#B8860B", "#F2D16B", "#3A3A44", "#4FA3E0"])

line("trompillon", "presse", "A", "Terre", [
 ("Trompillon", "Pousse le sol de ses grosses pattes.", "Éléphanteau gris, grandes oreilles, trompe courte."),
 ("Trompachyde", "Ses jambes sont des colonnes.", "Éléphant robuste, jambes épaisses, défenses courtes."),
 ("Mammouthon", "Il repousse les montagnes qui gênent sa route.", "Mammouth colossal, laine épaisse, défenses spiralées, pattes en piliers.")],
 ["#6B7280", "#9CA3AF", "#EDE3CF", "#5A3A22"])
line("hydraulix", "presse", "B", "Acier", [
 ("Hydraulix", "Petit golem à vérin qui pousse sans jamais s'arrêter.", "Golem compact jaune industriel, un vérin hydraulique par jambe, voyant vert sur le front."),
 ("Pistonix", "Ses pistons développent des tonnes de poussée.", "Golem plus grand, pistons chromés, tuyaux hydrauliques, plaques jaunes et noires."),
 ("Vérinator", "Il soulève des immeubles sur ses jambes.", "Golem industriel géant, vérins énormes, bandes de sécurité jaunes et noires, manomètres.")],
 ["#F2B544", "#1B1B22", "#D8E0EA", "#3FB950"])

line("tenaillon", "adducteurs", "A", "Insecte", [
 ("Tenaillon", "Serre tout entre ses mandibules.", "Petit lucane brun, mandibules en tenaille."),
 ("Lucanox", "Ses mandibules se referment comme un étau.", "Lucane robuste, mandibules longues, carapace brillante."),
 ("Titanlucane", "Rien ne s'échappe de son étreinte.", "Lucane géant, mandibules-pinces dorées, carapace en armure.")],
 ["#4A2C14", "#8B5A2E", "#F2B544", "#1B1B22"])
line("anacondo", "adducteurs", "B", "Plante", [
 ("Anacondo", "S'enroule autour des branches et serre doucement.", "Petit serpent vert à taches brunes, yeux ronds."),
 ("Serpentrave", "Il serre les troncs comme une entrave.", "Serpent épais, motifs de lianes, écailles mousse."),
 ("Étreignor", "Son étreinte fait plier les arbres.", "Serpent géant, écailles-feuilles, fleurs sur le dos, anneaux puissants.")],
 ["#3E7C4A", "#8CC66B", "#5A3A22", "#E0567A"])

line("gazellou", "mollets", "A", "Air", [
 ("Gazellou", "Rebondit sur la pointe des sabots.", "Petite gazelle fauve, pattes fines, cornes courtes."),
 ("Gazelleste", "Ses mollets la font bondir par-dessus les buissons.", "Gazelle élancée, cornes annelées, bande noire sur le flanc."),
 ("Saltazur", "Elle bondit si haut qu'elle touche les nuages.", "Grande gazelle céleste, cornes lyre lumineuses, sabots d'azur, traînée de vent.")],
 ["#C08A3E", "#EDE3CF", "#4FA3E0", "#1B1B22"])
line("cabrinou", "mollets", "B", "Roc", [
 ("Cabrinou", "Saute de rocher en rocher sur la pointe des sabots.", "Chevreau blanc, petites cornes, sabots noirs."),
 ("Cabriroc", "Il grimpe les parois les plus raides.", "Chèvre de montagne, barbe, cornes courbes, sabots de pierre."),
 ("Bouquetitan", "Il tient en équilibre sur une seule pointe de roche.", "Bouquetin colossal, cornes géantes annelées de roche, crinière de neige.")],
 ["#FFFFFF", "#9CA3AF", "#5A3A22", "#8C8F99"])

# ---------- ABDOS ----------
line("coquillon", "crunch_poulie", "A", "Eau", [
 ("Coquillon", "Se recroqueville dans sa coquille à chaque vague.", "Petit bernard-l'ermite rouge dans une coquille spirale."),
 ("Coquilleur", "Sa coquille devient plus lourde, ses abdos aussi.", "Bernard-l'ermite costaud, coquille bombée de corail."),
 ("Carapagure", "Il porte un récif entier sur le dos.", "Grand bernard-l'ermite, coquille-récif colorée, pinces massives.")],
 ["#C2410C", "#E07A55", "#F2C9A8", "#46C6E0"])
line("scaraboule", "crunch_poulie", "B", "Insecte", [
 ("Scaraboule", "Roule sa boule en contractant tout le ventre.", "Petit bousier noir irisé, boule de terre."),
 ("Scarabloc", "Sa boule est devenue un bloc de pierre.", "Scarabée robuste, carapace verte irisée, bloc carré."),
 ("Solscarab", "Il fait rouler le soleil jusqu'à l'horizon.", "Scarabée solaire doré, ailes de lumière, sphère ardente.")],
 ["#1B1B22", "#3E7C4A", "#F2B544", "#FF7A1A"])

line("paressor", "releve_jambes", "A", "Plante", [
 ("Paressor", "Suspendu à une branche, il lève les pattes… lentement.", "Petit paresseux beige, longues griffes, sourire tranquille, mousse sur le dos."),
 ("Suspendor", "Il tient suspendu des heures sans fatiguer.", "Paresseux plus grand, abdos marqués, mousse et fleurs sur le pelage."),
 ("Arbolent", "Il ne tombe jamais. Même en dormant.", "Grand paresseux-arbre, pelage de lierre, griffes en crochets, fleurs lumineuses.")],
 ["#C08A3E", "#EDE3CF", "#3E7C4A", "#E0567A"])
line("opossumi", "releve_jambes", "B", "Ombre", [
 ("Opossumi", "Pend par la queue et remonte les pattes vers sa tête.", "Petit opossum gris, queue préhensile, museau rose."),
 ("Opossombre", "La nuit, il s'entraîne la tête en bas.", "Opossum agile, pelage sombre, yeux réfléchissants."),
 ("Pendunuit", "Suspendu à la lune, il veille sur la forêt.", "Grand opossum nocturne, queue en croissant, pelage étoilé.")],
 ["#4B5563", "#9CA3AF", "#E0567A", "#3B2A55"])

out = {"_doc": "Généré par tools/build_creatures.py — modifier la source, pas ce fichier.",
       "evolution_levels": {"stage2": 16, "stage3": 36}, "lines": L}
p = pathlib.Path(__file__).resolve().parents[1] / "data" / "creatures.json"
p.write_text(json.dumps(out, ensure_ascii=False, indent=1), encoding="utf-8")
groups = {}
for l in L: groups.setdefault(l["group"], []).append(l["option"])
names = [s["name"] for l in L for s in l["stages"]]
dups = {n for n in names if names.count(n) > 1}
assert not dups, f"Noms en double : {dups}"
assert all(len(l["stages"]) == 3 for l in L if l.get("special") != "legendaire")
print(len(L), "lignées,", len(names), "créatures")
print({g: v for g, v in groups.items()})
