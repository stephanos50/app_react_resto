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
const ProductOrdrer = require('./backend/models/ProductOrdrer');
const { findOne } = require('./backend/models/City');



let categories = [];
let cities = [];
let supplements = [];
let orders = [];
let addresses = [];
let pictures = [];
let products_orders = [];


async function pictureCreate(path){
  imageDetail = {
    path: path
  }
  const picture = await Picture.create(imageDetail);
  console.log('Nouvelle image' + picture.id);
        picture.setDataValue('PlatId', picture.id);
  await picture.save();
  pictures.push(picture);
  return picture;
}



async function addressCreate(nom,numero,etage,cityName,userEmail){
  adresseDetail = {
    name: nom,
    number: numero,
    floor: etage,
   
  }

  const address = await Address.create(adresseDetail);
  console.log('Nouvelle Adresse' + address.id);
        address.setDataValue('cityName', cityName);
        address.setDataValue('userEmail', userEmail);
  await address.save();
  addresses.push(address);
  return address;
};

async function productOrderCreate(uuid, qty, prix, orderId,productId){
  
  detailProductOrder = {
    quantity: qty,
    prix: (prix*qty),
  }
  const product_order = await ProductOrder.create(detailProductOrder);
  console.log('Nouvelle commande ' + product_order.id )
        product_order.setDataValue('_uuid', uuid)
        product_order.setDataValue('orderId', orderId)
        product_order.setDataValue('productId', productId)
  await product_order.save()
 
  products_orders.push(product_order)
  
  return product_order;
  
};





async function createProductOrder01(){

  const order = await Order.create({});
  order.setDataValue('_uuid', uuidv4())
  await order.save();
  return Promise.all([
    productOrderCreate( order._uuid, 2, (7.50) ,order.id, 1),
    productOrderCreate( order._uuid, 2, (7.50) ,order.id, 2),
    productOrderCreate( order._uuid, 2, (8.50) ,order.id, 5),
    
  ]);
};

async function createProductOrder02(){

  const order = await Order.create({});
  order.setDataValue('_uuid', uuidv4())
  await order.save();
  return Promise.all([
    productOrderCreate( order._uuid, 1, (7.50) ,order.id, 1),
    productOrderCreate( order._uuid, 1, (7.50) ,order.id, 2),
    productOrderCreate( order._uuid, 6, (8.50) ,order.id, 5),
    
  ]);
};

async function updateOrders(){
    const order = await Order.findOne({
      where: {
        total: null
      }
    })

    let subTotal = 0;
    const order_product = await ProductOrdrer.findAll({
        where: {
          orderId: order.id,
        }
    });
    order_product.map( (item) =>  {
      subTotal = subTotal + item.prix
    })
    order.setDataValue('total', subTotal)
    order.setDataValue('date', new Date())
    order.setDataValue('addressId', 1)
    order.setDataValue('userEmail', 'stefan@exemple.be')
    await order.save()
    
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
      categoryId: 1
      
    }, 
    {
      name: 'Tzadziki',
      description: "Le tzadziki est une spécialité de cuisine grecque à base d'oeufs de piossons composée de lait, de jus de citron, d'huile d'olive et de mie de pain",
      price:7.50,
      cote:2,
      categoryId: 1
    },
    {
      name: 'Feta',
      description: "Le tarama est une spécialité de cuisine grecque à base d'oeufs de piossons composée de lait, de jus de citron, d'huile d'olive et de mie de pain",
      price:8.00,
      cote:1,
      categoryId: 1
    }, 
    
   
    {
      name: 'Gambas grillées  ',
      description: "Le Gambas grillées  au four est une spécialité de cuisine grecque ",
      price:8.50,
      cote:1,
      categoryId: 1
      
    }, 
    {
      name: 'Calamars frits ',
      description: "Le feta gratinée  au four est une spécialité de cuisine grecque ",
      price:8.50,
      cote:1,
      categoryId: 1
    }, 
    {
      name: 'Meze ',
      description: "Le feta gratinée  au four est une spécialité de cuisine grecque ",
      price:8.50,
      cote:1,
      categoryId: 1
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



async function createAddresses(){
  const stefan = await User.findOne({where: {
    first_name: 'stefan'
  }})
 
  return Promise.all([
    addressCreate("Boulevard d'Anvers",154,1,'Bruxelles', stefan.email),
    
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
   
    const products_orders_01 = await createProductOrder01();
    const orders_01 = await updateOrders();
    // const totalOrder = await addTotal()
    const products_orders_02 = await createProductOrder02();
    const orders_02 = await updateOrders();
    

   
   

    
    sequelize.close();
  } catch (error) {
    console.error('Error while populating DB: ', error);
  }
})();