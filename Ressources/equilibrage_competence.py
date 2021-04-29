import pandas as pd
import matplotlib.pyplot as plt
from pandas import DataFrame
import numpy as np
import statistics as stats
from itertools import combinations, combinations_with_replacement
import csv
import operator

pd.set_option('expand_frame_repr', False)
pd.set_option('max_colwidth', 140)
pd.set_option('max_rows', 999)
pd.set_option('max_columns', 999)

compo_group = {}
nom_colonnes = []
compo_finale = []
group_final = []

def number_by_group(nbr_total, nbr_voulu):
	nombre_groupe = []
	if nbr_total%nbr_voulu == 0:
		nombre_par_groupe = round(nbr_total/nbr_voulu)
		nombre_groupe.extend((nombre_par_groupe, nbr_voulu, 0))
	else:
		nombre_par_groupe = round(nbr_total/nbr_voulu)
		nombre_par_groupe -= 1
		nombre_groupe.extend((nombre_par_groupe, nbr_voulu, nbr_total - (nbr_voulu * nombre_par_groupe)))
	print("%s groupes de %s, et 1 groupe de %s" %(nombre_groupe[0], nombre_groupe[1], nombre_groupe[2]))	#3 groupes de 5, et 1 groupe de 6
	return nombre_groupe

def unique(list1): 
    # intilize a null list 
    unique_list = [] 
    # traverse for all elements 
    for x in list1: 
        # check if exists in unique_list or not 
        if x not in unique_list: 
            unique_list.append(x) 
    # print list 
    return unique_list

def get_combinaisons(vecteur, nb_personnes_groupe):
	liste_combinaisons = []
	nom_combinaison = []
	comb = combinations(vecteur, nb_personnes_groupe)
	#CONSTRUIRE LES COMPOSITION ET METTRE DANS UNE LISTE
	liste_combinaisons = list(comb)
	#CONSTRUIRE UNE LISTE AVEC COMPO1, COMPO2, ETC
	for i in range(0, len(liste_combinaisons)):
		nom_combinaison.append("Combinaison_%s" %(i+1))
	d = dict(zip(nom_combinaison, liste_combinaisons))
	return d

def get_medianes_competences(nom_colonnes, nombre_colonne):
	mediane_competence = []
	#ON CREE LA PREMIERE LISTE QUI CONTIENT LES MEDIANES DES COMPETENCES
	for i in range(1, nombre_colonne):
		mediane_competence.append(stats.median(data.iloc[:, i]))
	#ON CREE UNE DEUXIEME LISTE QUI CONTIENT LE NOM DES COLONNES
	for i in range(1, nombre_colonne):
		nom_colonnes.append(data.columns[i])
	#ON FUSIONNE
	return dict(zip(nom_colonnes, mediane_competence))

def dataframe_combinaisons(les_combinaisons):
	#JE CREE UN DATAFRAME. PREMIERE COLONNE : LE NUM DE LA COMBINAISON. DEUXIEME COLONNE : LE CONTENU
	df = pd.DataFrame(list(les_combinaisons.items()), columns = ["nom_combinaison", "contenu_combinaison"])
	#J'ENLEVE LES CARATERES QUI ME FONT CHIER
	df['contenu_combinaison'] = df['contenu_combinaison'].astype(str)
	df['contenu_combinaison'] = df['contenu_combinaison'].str.replace("(", "")
	df['contenu_combinaison'] = df['contenu_combinaison'].str.replace(")", "")
	df['contenu_combinaison'] = df['contenu_combinaison'].str.replace("'", "")
	df['contenu_combinaison'] = df['contenu_combinaison'].str.replace(" ", "")
	#JE CREE UN NOUVEAU DATAFRAME QUI EST UN PIVOT
	b = DataFrame(df.contenu_combinaison.str.split(',').tolist(), index=df.nom_combinaison).stack()
	b = b.reset_index()[[0, 'nom_combinaison']]
	b.columns = ['prenom', 'nom_combinaison']
	#JE RE-ORGANISE LES COLONNES
	b = b[['nom_combinaison', 'prenom']]
	return b

def comb_moy(data, dataframe_des_combinaison):
	#FUSIONNER DATAFRAME POUR OBTENIR LES VALEURS PAR COMBINAISONS
	test = pd.merge(dataframe_des_combinaison, data, how = "left", on = ["prenom"])
	test = test.sort_values(by = ["nom_combinaison", "prenom"])

	#PIVOTER LA TABLE
	test1 = test.melt(id_vars = ["nom_combinaison", "prenom"], var_name = "categorie", value_name = "values")
	test1 = test1.sort_values(by = ["nom_combinaison", "prenom"])
	test1.to_csv("test1.csv", sep=";", index=False)

	#CREER LA MOYENNE DES VALEURS PAR COMBINAISON
	test2 = test1.groupby(["nom_combinaison"]).mean()
	test2 = test2.sort_values(by = ["values"], ascending = False)
	test2['nom_combinaison'] = test2.index
	test2.reset_index(drop=True, inplace=True)
	test2 = test2.iloc[:, [1, 0]]
	return test2

def dataframe_complet(dataframe_des_combinaison, test2):
	#JOINDRE LA MOYENNE AU DATAFRAME ET TRIER PAR GROUPE
	test3 = pd.merge(dataframe_des_combinaison, test2, how = "left", on = "nom_combinaison")
	test3 = test3.sort_values(by = ["values", "nom_combinaison"], ascending = [False, True])
	return test3


def dataframe_final(df_complet, test2):
	final = df_complet.groupby("nom_combinaison")["prenom"].apply(list)
	final = pd.merge(final, test2, how = "left", on = ["nom_combinaison"])
	final = final.sort_values(by = ["values"], ascending = True)
	return final	

def mean_par_prenom(data):
	test = data.melt(id_vars = ["prenom"], var_name = "categorie", value_name = "values")
	test2 = test.groupby(["prenom"]).mean()
	return test2


data = pd.read_csv("notes.csv", sep = ";", encoding = "ISO-8859-1", header=0)

nombre_colonne = (data.shape[1])
nb_personnes = len(data["prenom"])

nb_personnes_groupe = input("Nombre de personnes par groupe (Vide pour automatique) : ")
if nb_personnes_groupe != "":
	nb_personnes_groupe = int(nb_personnes_groupe)
else:
	nb_personnes_groupe = nombre_colonne-1

df_mean_prenom = mean_par_prenom(data)

for i in range(1, nombre_colonne):
	data.iloc[:, i] = data.iloc[:, i].astype(int)



if nb_personnes%nb_personnes_groupe == 0:
	print("\n")
	print("----------------CALCUL----------------")

	print("Calcul des combinaisons")
	les_combinaisons = get_combinaisons(data.iloc[:, 0], nb_personnes_groupe)		#'Combinaison_1' : ('Personne1', 'Personne2', 'Personne3', 'Personne4', 'Personne6')

	print("Calcul des medianes par competences")
	les_medianes = get_medianes_competences(nom_colonnes, nombre_colonne)			#{'statistique': 1.0, 'traitement_donnee': 1.0}

	print("Créer dataframe des combinaisons")
	dataframe_des_combinaison = dataframe_combinaisons(les_combinaisons)			#DATAFRAME : 'Combinaison_1';'Personne1' 'Combinaison_1';'Personne2'; 'Combinaison_1';'Personne3'

	print("Créer la moyenne par combinaisons")
	combinaison_moyenne = comb_moy(data, dataframe_des_combinaison)					#'Combinaison_1';2 'Combinaison_2';2.5 'Combinaison_3':4

	df_complet = dataframe_complet(dataframe_des_combinaison, combinaison_moyenne)	#'Combinaison_1';Personne1;2 'Combinaison_1';Personne2;2 'Combinaison_1';Personne3;2 

	print("Filtrer le dataframe final")
	final = dataframe_final(df_complet, combinaison_moyenne)						#Combinaison_1;[Personne1, Personne2, Personne3, ...];4

	final_tri = final.loc[(final["values"] >= np.percentile(final["values"], 25)) & (final["values"] <= np.percentile(final["values"], 75))]
	final_tri = final_tri.reset_index(drop=True)									#NE GARDER QUE LES COMBINAISONS DONT LA VALEUR MOYENNE DES SCORE NE DEPASSE PAS LE 3EME
																					#QUARTILE ET N'EST PAS EN DESSOUS DU 1EME.

	a_remplir = []
	compt = 0
	valeur_groupe_final_impair = []
	moyenne_combinaison = []
	dictionnaire = {}

	print("Calcul des meilleures combinaisons ...")

	verif_nombre_element = 0
	verif_moyenne_combinaison_supp = 0

	while (len(a_remplir) < nb_personnes):								#TANT QUE LE NOMBRE DE PERSONNE AJOUTE EST INFERIEUR AU NOMBRE DE PERSONNES TOTAL
		final_tri = final_tri.sample(len(final_tri))					#JE MELANGE LES LIGNES DU DATAFRAME
		final_tri = final_tri.reset_index(drop=True)					#JE RESET LES INDEX
		a_remplir = []
		compo_finale = []
		group_final = []

		for i in range(0, len(final_tri)):
			if len(set(final_tri["prenom"][i]) & set(a_remplir)) == 0:	# S'IL N'Y A AUCUN PRENOM DANS LA LISTE DE PRENOM QUI EST DEJA PRESENT DANS "a_remplir" :
				compo_finale.append(final_tri["nom_combinaison"][i])	# J'AJOUTE LE NOM DE LA COMBINAISON A COMPO_FINALE
				group_final.append(final_tri["prenom"][i])				# J'AJOUTE LE NOM DES PERSONNES CONCERNEES
				moyenne_combinaison.append(final_tri["values"][i])		# J'AJOUTE LA MOYENNE DU SCORE DU GROUPE CONCERNE
				for value in final_tri["prenom"][i]:
					a_remplir.append(value)								# J'AJOUTE LE NOM DES PERSONNES CONCERNEES DANS UNE LISTE

		#JE TRI LA LISTE DES COMBINAISONS PAR ORDRE CROISSANT
		compo_finale = sorted(compo_finale)
		#JE CREE UN DATAFRAME DE CETTE LISTE ET JE JOINS LA MOYENNE ET LES COMPOSANTS
		df_compo = DataFrame(compo_finale, columns = ["nom_combinaison"])
		df_compo = pd.merge(df_compo, final_tri, how = "left", on = ["nom_combinaison"])
		#print(df_compo)
		compt +=1

else:
	print("\n")
	print("----------------CALCUL----------------")

	squelette_groupes = number_by_group(nb_personnes, nb_personnes_groupe)	#3 groupes de 5, et 1 groupe de 6  --> [3, 5, 6]
	print("\n")

	print("Calcul des combinaisons")
	les_combinaisons = get_combinaisons(data.iloc[:, 0], squelette_groupes[1])
	les_combinaisons_extra = get_combinaisons(data.iloc[:, 0], squelette_groupes[2])

	print("Calcul des medianes par competences")
	les_medianes = get_medianes_competences(nom_colonnes, nombre_colonne)			#{'statistique': 1.0, 'traitement_donnee': 1.0}

	print("Créer dataframe des combinaisons")
	dataframe_des_combinaison = dataframe_combinaisons(les_combinaisons)
	dataframe_des_combinaison_extra = dataframe_combinaisons(les_combinaisons_extra)

	print("Créer la moyenne par combinaisons")
	combinaison_moyenne = comb_moy(data, dataframe_des_combinaison)
	combinaison_moyenne_extra = comb_moy(data, dataframe_des_combinaison_extra)

	df_complet = dataframe_complet(dataframe_des_combinaison, combinaison_moyenne)
	df_complet_extra = dataframe_complet(dataframe_des_combinaison_extra, combinaison_moyenne_extra)  

	print("Filtrer le dataframe final")
	final = dataframe_final(df_complet, combinaison_moyenne)
	final_extra = dataframe_final(df_complet_extra, combinaison_moyenne_extra)

	final_tri = final.loc[(final["values"] >= np.percentile(final["values"], 25)) & (final["values"] <= np.percentile(final["values"], 75))]
	final_tri = final_tri.reset_index(drop=True)
	final_tri_extra = final_extra.loc[(final_extra["values"] >= np.percentile(final_extra["values"], 45)) & (final_extra["values"] <= np.percentile(final_extra["values"], 55))]
	final_tri_extra = final_extra.reset_index(drop=True)									

	a_remplir = []
	compt = 0
	valeur_groupe_final_impair = []
	moyenne_combinaison = []
	dictionnaire = {}

	print("Calcul des meilleures combinaisons ...")

	verif_nombre_element = 0
	verif_moyenne_combinaison_supp = 0
				
	while (len(a_remplir) < nb_personnes):
		a_remplir = []
		compo_finale = []
		group_final = []
		moyenne_combinaison = []
		#TRIER ALEATOIREMENT final_tri								
		final_tri = final_tri.sample(len(final_tri))
		#RESET L'INDEX
		final_tri = final_tri.reset_index(drop=True)
		#J'EXTRAIS ALEATOIREMENT UNE VALEUR DE final_tri_extra (AVEC LES PARAMETRES ENTRES, JE CONSIDERE QUE CETTE VALEUR EST SUFFISAMENT BIEN EQUILIBREE)
		extra = final_tri_extra.sample(1)
		#JE VAIS DEVOIR AJOUTER CETTE VALEUR A TOUTE LES LISTES QUE J'UTILISE APRES
		compo_finale.append(extra["nom_combinaison"].values[0])
		group_final.append(extra["prenom"].values[0])
		moyenne_combinaison.append(extra["values"].values[0])
		#JE VAIS AJOUTER TOUTE LES PERSONNES A a_remplir. RENVOI UNE LISTE DE LISTE. LA RAISON POUR LAQUELLE JE FAIS extra[0] ENSUITE.							
		extra_list = list(extra["prenom"])	#
		extra_list = extra_list[0]
		for i in range(0, len(extra_list)):
			a_remplir.append(extra_list[i])
		#J'ENTRE DANS LA VRAIE BOUCLE, ET J'AJOUTE LES VALEURS DE final_tri
		for i in range(0, len(final_tri)):
			if len(set(final_tri["prenom"][i]) & set(a_remplir)) == 0:
				compo_finale.append(final_tri["nom_combinaison"][i])
				group_final.append(final_tri["prenom"][i])
				moyenne_combinaison.append(final_tri["values"][i])	
				for value in final_tri["prenom"][i]:
					a_remplir.append(value)							

		#JE CREE UN DATAFRAME DE CETTE LISTE
		df_compo = DataFrame(compo_finale, columns = ["nom_combinaison"])
		#JE JOINS LA MOYENNE ET LES COMPOSANTS
		df_compo = pd.merge(df_compo, final_tri, how = "left", on = ["nom_combinaison"])
		#A CE MOMENT, IL Y A UN PROBLEME. IL PREND L'IDENTIFIANT DE LA COMPOSITION DE "extra" (ex : Combinaison_30), et recupère l'information dans final_tri. Je dois donc supprimer cette première ligne, et joindre "extra" 
		df_compo = df_compo.iloc[1:]
		#J'AJOUTE LA COMPOSITION CHOISIE AU HASARD DANS extra DANS df_compo
		df_compo = df_compo.append(extra)	
		compt +=1

print("\n")
print(df_compo)
print("\n\n")
print("Groupes trouves en %s tentatives" %compt)
print("%s combinaisons de generees"% len(les_combinaisons))
print("\n")
df_compo.to_csv("final.csv", sep = ";", index = None)