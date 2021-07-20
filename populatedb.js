const sequelize = require('./backend/models/sequelize');

const Adresse = require('./backend/models/Adresse');
const Ville = require('./backend//models/Ville');
const Commande = require('./backend//models/Commande');
const Role = require('./backend//models/Role');
const Utilisateur = require('./backend//models/Utilisateur');
const Categorie = require('./backend//models/Categorie');
const Plat = require('./backend//models/Plat');
const Commentaire = require('./backend//models/Commentaire');
const LigneCommandePlat = require('./backend//models/LigneCommandePlat');
const LigneCommandeSupplement = require('./backend//models/LigneCommandeSupplement');
const Supplement = require('./backend//models/Supplement');
const Allergene = require('./backend//models/Allergene');
const Image = require('./backend/models/Image');


let categories = [];
let villes = [];
let supplements = [];
let commandes = [];
let adresses = [];

let images = [];

async function imageCreate(url,id){
  imageDetail = {
    image: url
  }
  const image = await Image.create(imageDetail);
  console.log('Nouvelle image' + image.id);
  await image.setDataValue('PlatId', image.id);
  await image.save();
  images.push(image);
  return image;
}



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
  const [tarama, tzadziki, feta, chtipiti, fetapiquante, fava, fetagratinée,feuilles,gambas,calamars,meze ] = await Plat.bulkCreate([
    {
      plat: 'Tarama',
      description: "Le tarama est une spécialité de cuisine grecque à base d'oeufs de piossons composée de lait, de jus de citron, d'huile d'olive et de mie de pain",
      prix:7.50,
      cote:1,
    }, 
    {
      plat: 'Tzadziki',
      description: "Le tzadziki est une spécialité de cuisine grecque à base d'oeufs de piossons composée de lait, de jus de citron, d'huile d'olive et de mie de pain",
      prix:7.50,
      cote:2,
    },
    {
      plat: 'Feta',
      description: "Le tarama est une spécialité de cuisine grecque à base d'oeufs de piossons composée de lait, de jus de citron, d'huile d'olive et de mie de pain",
      prix:8.00,
      cote:1,
    }, 
    {
      plat: 'Chtipiti',
      description: "Le tarama est une spécialité de cuisine grecque à base d'oeufs de piossons composée de lait, de jus de citron, d'huile d'olive et de mie de pain",
      prix:8.50,
      cote:1,
    }, 
    {
      plat: 'Feta piquante',
      description: "Le tarama est une spécialité de cuisine grecque à base d'oeufs de piossons composée de lait, de jus de citron, d'huile d'olive et de mie de pain",
      prix:8.50,
      cote:1,
    }, 
    {
      plat: 'Fava',
      description: "Le Fava est une spécialité de cuisine grecque. Purée de pois cassésà ",
      prix:8.50,
      cote:1,
    }, 
    {
      plat: 'Feta gratinée ',
      description: "Le feta gratinée  au four est une spécialité de cuisine grecque ",
      prix:8.50,
      cote:1,
    }, 
    {
      plat: 'Feuilles de vignes  ',
      description: "La Feuilles de vignes maison est une spécialité de cuisine grecque. Elle est  préparée avec de la viande haché aromatisé et servi avec une  sauce citronnée  ",
      prix:8.50,
      cote:1,
    }, 
    {
      plat: 'Gambas grillées  ',
      description: "Le Gambas grillées  au four est une spécialité de cuisine grecque ",
      prix:8.50,
      cote:1,
    }, 
    {
      plat: 'Calamars frits ',
      description: "Le feta gratinée  au four est une spécialité de cuisine grecque ",
      prix:8.50,
      cote:1,
    }, 
    {
      plat: 'Meze ',
      description: "Le feta gratinée  au four est une spécialité de cuisine grecque ",
      prix:8.50,
      cote:1,
    }, 

    
  ]);
  await Promise.all([
    tarama.setCategorie([categories[0].id]),
    tzadziki.setCategorie([categories[0].id]),
    feta.setCategorie([categories[0].id]),
    chtipiti.setCategorie([categories[0].id]),
    fetapiquante.setCategorie([categories[0].id]), 
    fava.setCategorie([categories[0].id]), 
    fetagratinée.setCategorie([categories[0].id]),
    feuilles.setCategorie([categories[0].id]),
    gambas.setCategorie([categories[0].id]),
    calamars.setCategorie([categories[0].id]),
    meze.setCategorie([categories[0].id]) 
    

  ]);

  await Promise.all([
    tarama.setAllergenes([gluten, oeufs, poissons]),
    tzadziki.setAllergenes([arachides,lactose,celeris]),
    feta.setAllergenes([arachides,lactose,celeris]),
    fetapiquante.setAllergenes([arachides,lactose,celeris]),
    fava.setAllergenes([arachides,lactose,celeris]),
    fetagratinée.setAllergenes([arachides,lactose,celeris]),
    feuilles.setAllergenes([arachides,lactose,celeris]),
    gambas.setAllergenes([arachides,lactose,celeris]),
    calamars.setAllergenes([fruits,lactose,celeris]),
    meze.setAllergenes([fruits,lactose,celeris]),
    
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

async function createImage(){
  return Promise.all([
    imageCreate('/images/tarama.jpg',1),
    imageCreate('/images/tzatziki.jpg',2),
    imageCreate('/images/feta.jpg',3),
    imageCreate('/images/fetapiquante.jpg',4),
    imageCreate('/images/fava.jpg',5),
    imageCreate('/images/fetagratinée.jpg',6),
    imageCreate('/images/feuilles.jpg',7),
    imageCreate('/images/gambas.jpg',8),
    imageCreate('/images/calamars.jpg',9),
    imageCreate('/images/meze.jpg',10),
   
  ]);
}





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
    const images = await createImage();

    
    sequelize.close();
  } catch (error) {
    console.error('Error while populating DB: ', error);
  }
})();