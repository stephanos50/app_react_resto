const sequelize = require('./models/sequelize');

const Adresse = require('./models/Adresse');
const Ville = require('./models/Ville');
const Commande = require('./models/Commande');
const Role = require('./models/Role');
const Utilisateur = require('./models/Utilisateur');
const Categorie = require('./models/Categorie');
const Plat = require('./models/Plat');
const Commentaire = require('./models/Commentaire');
const LigneCommandePlat = require('./models/LigneCommandePlat');
const LigneCommandeSupplement = require('./models/LigneCommandeSupplement');
const Supplement = require('./models/Supplement');
const Allergene = require('./models/Allergene');
const Picture = require('./models/Picture');
const AllergenePlat = require('./models/AllergenePlat');


let categories = [];
let villes = [];
let supplements = [];
let commandes = [];
let adresses = [];



async function adresseCreate(nom,numero,etage,ville){
  adresseDetail = {
    nom: nom,
    numero: numero,
    etage: etage,
  }

  const adresse = await Adresse.create(adresseDetail);
  console.log('Nouvelle Adresse' + adresse.id);
  await adresse.setDataValue('VilleId', ville);
  await adresse.save();
  adresses.push(adresseDetail);
  return adresse;
};


async function commendeCreate(total,status,date,adresse,mail){
    commandeDetail = {
        total:total,
        status:status,
        date:date,
    }
    const commande = await Commande.create(commandeDetail);
    console.log('Nouvelle commande' + commande.id);
    console.log(adresse);
    await commande.setAdresse(adresse);
    await commande.setUtilisateur(mail);
    commandes.push(commandeDetail);
    return commande;
};


async function supplementCreate(nom, prix){
  supplementDetail = {
    nom: nom,
    prix: prix,
  }

  const supplement = await Supplement.create(supplementDetail);
  console.log('Nouveau supplement' + supplement.id);
  supplements.push(supplement);
  return supplement;
};

async function villeCreate(nom, codepostal){
  villeDetail = {
    nom: nom,
    codepostal: codepostal
  }
  const ville = await Ville.create(villeDetail);
  console.log('Nouvelle ville' + ville.id);
  villes.push(ville);
  return ville;
};



async function categorieCreate(nom){
  categorieDetail = {
    categorie : nom
  }  
  const categorie = await Categorie.create(categorieDetail);
  console.log("Nouvelle categorie " + categorie.id);
  categories.push(categorie);
  return categorie;
};

async function createUtilisateur(){
    const [administrateur, client] = await Role.bulkCreate([
      { role: "administrateur" },
      { role: "client" },
      
    ]);

    const [admin,arvanitis] =  await Utilisateur.bulkCreate([
      {
        nom: 'admin',
        prenom: 'stefan',
        email: 'stefan@exemple.be',
        mot_de_passe: '123'
      },
      {
        nom: 'arvanitis',
        prenom: 'nico',
        email: 'nico@exemple.be',
        mot_de_passe: '123'
      }
    ]);

    await Promise.all([
      admin.setRoles([administrateur]),
      arvanitis.setRoles([client])
      
    ]);
};

async function createPlatAndAllergene(){

  const [gluten,crustaces,oeufs,poissons,arachides,soja,lactose,celeris,fruits,moutarde,graines,Anhydride,Lupin,Mollusques ] = await Allergene.bulkCreate([
    { nom: 'Gluten' },
    { nom: 'Crustacés' },
    { nom: 'Oeufs' },
    { nom: 'Poissons' },
    { nom: 'Arachides' },
    { nom: 'Soja' },
    { nom: 'lactose' },
    { nom: 'Celeris' },
    { nom: "Fruits à coque" },
    { nom: 'Moutarde' },
    { nom: 'Graines grillées' },
    { nom: ' Anhydride sulfureux' },
    { nom: 'Lupin' },
    { nom: 'Mollusques' },
    
  ]);
  const [tarama, tzadziki] = await Plat.bulkCreate([
    {
      plat: 'tarama',
      description: "Le tarama est une spécialité de cuisine grecque à base d'oeufs de piossons composée de lait, de jus de citron, d'huile d'olive et de mie de pain",
      prix:7.50,
      cote:1,
    }, 
    {
      plat: 'tzadziki',
      description: "Le tzadziki est une spécialité de cuisine grecque à base d'oeufs de piossons composée de lait, de jus de citron, d'huile d'olive et de mie de pain",
      prix:7.50,
      cote:2,
    }
  ]);
  await Promise.all([
    tarama.setCategorie([categories[0].id]),
    tzadziki.setCategorie([categories[0].id])
  ]);

  await Promise.all([
    tarama.setAllergenes([gluten, oeufs, poissons]),
    tzadziki.setAllergenes([arachides,lactose,celeris])
  ])
}

async function createCategorie(){
  return Promise.all([
    categorieCreate('entrée'),
    categorieCreate('scampis'),
    categorieCreate('salade'),
    categorieCreate('plat'),
    categorieCreate('spécialité'),
  ]);
};


async function createVille(){
  return Promise.all([
    villeCreate('Bruxelles', 1000),
    villeCreate('Ixelles', 1050),
    villeCreate('Drogenbos', 1200),
    villeCreate('Audergem', 1300),
  ]);
};

async function createSupplement(){
  return Promise.all([
    supplementCreate('frite', 5.0),
    supplementCreate('salade', 5.0),
    supplementCreate('riz', 5.0),
    supplementCreate("pate grecque", 5.0),
  ]);
};

async function createCommande(){
  return Promise.all([
      commendeCreate(22,false,'2021-01-05',1,'nico@exemple.be')
     
  ]);
};

async function createAdresse(){
  return Promise.all([
    adresseCreate("chaussée d'Anvers",154,5,1)
   ]);
};





(async () => {
  try {
    await sequelize.sync({ force: true });
    await createUtilisateur();
    
    const villes = await createVille();    
    const categories = await createCategorie();
    createPlatAndAllergene();
    const supplements = await createSupplement();
    const adresses = await createAdresse();
    const commandes = await createCommande();

    
    sequelize.close();
  } catch (error) {
    console.error('Error while populating DB: ', error);
  }
})();