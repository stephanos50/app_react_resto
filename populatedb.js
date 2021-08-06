const sequelize = require('./backend/models/sequelize');
const { v4: uuidv4 } = require('uuid');
const Address = require('./backend/models/Address');
const City = require('./backend/models/City');
const Order = require('./backend/models/Order');
const Role = require('./backend/models/Role');
const User = require('./backend/models/User');
const Category = require('./backend/models/Category');
const Product = require('./backend/models/Product');
const Comment = require('./backend/models/Comment');
const ProductOrder = require('./backend/models/ProductOrdrer');
const SupplementOrder = require('./backend/models/SupplementOrder');
const Supplement = require('./backend/models/Supplement');
const Allergen = require('./backend/models/Allergen');
const Picture = require('./backend/models/Picture');
const bcrypt = require("bcrypt");



let categories = [];
let cities = [];
let supplements = [];
let orders = [];
let addresses = [];
let pictures = [];


async function pictureCreate(path){
  imageDetail = {
    path: path
  }
  const picture = await Picture.create(imageDetail);
  console.log('Nouvelle image' + picture.id);
  await picture.setDataValue('PlatId', picture.id);
  await picture.save();
  pictures.push(picture);
  return picture;
}



async function addressCreate(nom,numero,etage,cityName,userUuid){
  adresseDetail = {
    name: nom,
    number: numero,
    floor: etage,
   
  }

  const address = await Address.create(adresseDetail);
  console.log('Nouvelle Adresse' + address.id);
  await address.setDataValue('cityName', cityName);
  await address.setDataValue('userUuid', userUuid);
  await address.save();
  addresses.push(adresseDetail);
  return address;
};


async function orderCreate(total,status,date,adresse,mail){
    commandeDetail = {
        total:total,
        status:status,
        date:date,
    }
    const order = await Order.create(commandeDetail);
    console.log('Nouvelle commande' + order.id);
    
    await order.setDataValue('addressId', adresse);
    await order.setDataValue('userId',mail);
    await order.save();
    orders.push(commandeDetail);
    return order;
};


async function supplementCreate(nom, prix){
  supplementDetail = {
    name: nom,
    price: prix,
  }

  const supplement = await Supplement.create(supplementDetail);
  console.log('Nouveau supplement' + supplement.id);
  supplements.push(supplement);
  return supplement;
};

async function cityCreate(nom, codepostal){
  villeDetail = {
    name: nom,
    zip: codepostal
  }
  const city = await City.create(villeDetail);
  console.log('Nouvelle ville ' + city.name);
  cities.push(city);
  return city;
};



async function categoryCreate(name){
  categorieDetail = {
    name : name
  }  
  const category = await Category.create(categorieDetail);
  console.log("Nouvelle categorie " + category.name);
  categories.push(category);
  return category;
};

async function createUsers(){

    const stefan_password = await bcrypt.hash('root',10)
    const nicolas_password = await bcrypt.hash('root',10)
    const [administrateur, client] = await Role.bulkCreate([
      { name: "administrateur" },
      { name: "client" },
      
    ]);

    const [stefan,nicolas] =  await User.bulkCreate([
      {
        _uuid: uuidv4(),
        first_name: 'stefan',
        last_name: 'arvanitis',
        email: 'stefan@exemple.be',
        passwordHash: stefan_password
      },
      {
        _uuid: uuidv4(),
        first_name: 'nicolas',
        last_name: 'arvanitis',
        email: 'nicola@exemple.be',
        passwordHash: nicolas_password
      }
    ]);

    await Promise.all([
      stefan.setRoles([administrateur]),
      nicolas.setRoles([client])
      
    ]);
};

async function createProducts(){

  const [gluten,crustaces,oeufs,poissons,arachides,soja,lactose,celeris,fruits,moutarde,graines,Anhydride,Lupin,Mollusques ] = await Allergen.bulkCreate([
    { name: 'Gluten' },
    { name: 'Crustacés' },
    { name: 'Oeufs' },
    { name: 'Poissons' },
    { name: 'Arachides' },
    { name: 'Soja' },
    { name: 'lactose' },
    { name: 'Celeris' },
    { name: "Fruits à coque" },
    { name: 'Moutarde' },
    { name: 'Graines grillées' },
    { name: ' Anhydride sulfureux' },
    { name: 'Lupin' },
    { name: 'Mollusques' },
    
  ]);
  const [tarama, tzadziki, feta, gambas,calamars,meze ] = await Product.bulkCreate([
    {
      name: 'Tarama',
      description: "Le tarama est une spécialité de cuisine grecque à base d'oeufs de piossons composée de lait, de jus de citron, d'huile d'olive et de mie de pain",
      price:7.50,
      cote:1,
    }, 
    {
      name: 'Tzadziki',
      description: "Le tzadziki est une spécialité de cuisine grecque à base d'oeufs de piossons composée de lait, de jus de citron, d'huile d'olive et de mie de pain",
      price:7.50,
      cote:2,
    },
    {
      name: 'Feta',
      description: "Le tarama est une spécialité de cuisine grecque à base d'oeufs de piossons composée de lait, de jus de citron, d'huile d'olive et de mie de pain",
      price:8.00,
      cote:1,
    }, 
    
   
    {
      name: 'Gambas grillées  ',
      description: "Le Gambas grillées  au four est une spécialité de cuisine grecque ",
      price:8.50,
      cote:1,
    }, 
    {
      name: 'Calamars frits ',
      description: "Le feta gratinée  au four est une spécialité de cuisine grecque ",
      price:8.50,
      cote:1,
    }, 
    {
      name: 'Meze ',
      description: "Le feta gratinée  au four est une spécialité de cuisine grecque ",
      price:8.50,
      cote:1,
    }, 

    
  ]);


  await Promise.all([
    tarama.setAllergens([gluten, oeufs, poissons]),
    tzadziki.setAllergens([arachides,lactose,celeris]),
    feta.setAllergens([arachides,lactose,celeris]),
    gambas.setAllergens([arachides,lactose,celeris]),
    calamars.setAllergens([fruits,lactose,celeris]),
    meze.setAllergens([fruits,lactose,celeris]),
    
  ])
}

async function createCategories(){
  return Promise.all([
    categoryCreate('entrée'),
    categoryCreate('scampis'),
    categoryCreate('salade'),
    categoryCreate('plat'),
    categoryCreate('spécialité'),
  ]);
};


async function createCities(){
  return Promise.all([
    cityCreate('Bruxelles', 1000),
    cityCreate('Ixelles', 1050),
    cityCreate('Drogenbos', 1200),
    cityCreate('Audergem', 1300),
  ]);
};

async function createSupplements(){
  return Promise.all([
    supplementCreate('frite', 5.0),
    supplementCreate('salade', 5.0),
    supplementCreate('riz', 5.0),
    supplementCreate("pate grecque", 5.0),
  ]);
};

async function createOrdes(){
  return Promise.all([
      orderCreate(12,false,'2021-01-05',1,1)
     
  ]);
};

async function createAddresses(){
  const stefan = await User.findOne({where: {
    first_name: 'stefan'
  }})
 
  return Promise.all([
    addressCreate("Boulevard d'Anvers",154,1,'Bruxelles', stefan._uuid),
    
   ]);
};

async function createPictures(){
  return Promise.all([
    pictureCreate('/images/tarama.jpg',1),
    pictureCreate('/images/tzatziki.jpg',2),
    pictureCreate('/images/feta.jpg',3),
    pictureCreate('/images/gambas.jpg',8),
    pictureCreate('/images/calamars.jpg',9),
    pictureCreate('/images/meze.jpg',10),
   
  ]);
}

async function addCategories(){
    try {
        const products = await Product.findAll();
        products.forEach((element, index) =>{
            if(element.name === null){
              element.setDataValue('categoryName', 'entree');
              element.save()
            } 
        });
       

    } catch (error) {
        console.log(error)
    }
}

async function addPictures(){
  
  try {
    const pictures = await Picture.findAll();
    
    pictures.forEach((element, index) =>{
      if(element.productId === null){
        element.setDataValue('productId', index+1);
        element.save();
        } 
      });
    } catch (error) {
      console.log(error)
  } 
}





(async () => {
  try {
    await sequelize.sync({ force: true });
    const pictures = await createPictures();
    await createUsers();
    
    const cities = await createCities();    
    const categories = await createCategories();
    const products = await createProducts();
    const product_category = await addCategories();
    const product_image = await addPictures();
    const supplements = await createSupplements();
    const addresses = await createAddresses();
    const oreders = await createOrdes();
    

   
   

    
    sequelize.close();
  } catch (error) {
    console.error('Error while populating DB: ', error);
  }
})();