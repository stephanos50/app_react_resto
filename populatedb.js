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
const ProductOrder = require('./backend/models/ProductOrder');
const SupplementOrder = require('./backend/models/SupplementOrder');
const Supplement = require('./backend/models/Supplement');
const Allergen = require('./backend/models/Allergen');
const Picture = require('./backend/models/Picture');
const Payment = require('./backend/models/Payment');
const bcrypt = require("bcrypt");

const { findOne } = require('./backend/models/City');



let categories = [];
let cities = [];
let supplements = [];
let orders = [];
let addresses = [];
let pictures = [];
let products_orders = [];


async function pictureCreate(path, productName){
  imageDetail = {
    path: path
  }
  const picture = await Picture.create(imageDetail);
  console.log('Nouvelle image' + picture.id);
        picture.setDataValue('productName', productName);
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

async function productOrderCreate(uuid, qty, prix, orderId,productName){
  
  detailProductOrder = {
    quantity: qty,
    prix: (prix*qty),
  }
  const product_order = await ProductOrder.create(detailProductOrder);
  console.log('Nouvelle commande ' + product_order.id )
        product_order.setDataValue('_uuid', uuid)
        product_order.setDataValue('orderId', orderId)
        product_order.setDataValue('productName', productName)
  await product_order.save()
 
  products_orders.push(product_order)
  
  return product_order;
  
};





async function createProductOrder01(){

  const order = await Order.create({});
  order.setDataValue('_uuid', uuidv4())
  await order.save();
  return Promise.all([
    productOrderCreate( order._uuid, 2, (7.50) ,order.id, 'Tarama'),
    productOrderCreate( order._uuid, 2, (7.50) ,order.id, 'Tzadziki'),
    productOrderCreate( order._uuid, 2, (8.50) ,order.id, 'Feta'),
    
  ]);
};

async function createProductOrder02(){

  const order = await Order.create({});
  order.setDataValue('_uuid', uuidv4())
  await order.save();
  return Promise.all([
    productOrderCreate( order._uuid, 1, (7.50) ,order.id, 'Calamars frits'),
    productOrderCreate( order._uuid, 1, (7.50) ,order.id, 'Gambas grillés'),
    productOrderCreate( order._uuid, 6, (8.50) ,order.id, 'Tarama'),
    
  ]);
};

async function updateOrders(){
    const order = await Order.findOne({
      where: {
        total: null
      }
    })

    let subTotal = 0;
    const order_product = await ProductOrder.findAll({
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

    const admin_password = await bcrypt.hash('root',10)
    const stefan_password = await bcrypt.hash('root',10)

    const [administrateur, client] = await Role.bulkCreate([
      { name: "administrateur" },
      { name: "client" },
      
    ]);

    const [admin,stefan] =  await User.bulkCreate([
      {
        _uuid: uuidv4(),
        first_name: 'admin',
        last_name: 'admin',
        email: 'admin@exemple.be',
        passwordHash: admin_password
      },
      {
        _uuid: uuidv4(),
        first_name: 'stefan',
        last_name: 'arvanitis',
        email: 'stefan@exemple.be',
        passwordHash: stefan_password
      }
    ]);

    await Promise.all([
      admin.setRoles([administrateur]),
      stefan.setRoles([client])
      
    ]);
};

async function createProducts(){

  const [gluten,crustaces,oeufs,poissons,arachides,soja,lactose,celeris,fruits,moutarde,graines,Anhydride,Lupin,Mollusques ] = await Allergen.bulkCreate([
    { name: 'Gluten ' },
    { name: 'Crustacés ' },
    { name: 'Oeufs ' },
    { name: 'Poissons ' },
    { name: 'Arachides ' },
    { name: 'Soja ' },
    { name: 'Lactose ' },
    { name: 'Celeris ' },
    { name: "Fruits à coque " },
    { name: 'Moutarde ' },
    { name: 'Graines grillées ' },
    { name: 'Anhydride sulfureux ' },
    { name: 'Lupin ' },
    { name: 'Mollusques ' },
    
  ]);
  const [tarama, tzadziki, feta, gambas,calamars,meze ] = await Product.bulkCreate([
    {
     
      name: 'Tarama',
      _uuid:uuidv4(),
      description: "Le tarama est une spécialité de cuisine grecque à base d'oeufs de piossons composée de lait, de jus de citron, d'huile d'olive et de mie de pain",
      price:7.50,
      cote:1,
      categoryName: 'Entrée'
      
    }, 
    {
      
      name: 'Tzadziki',
      _uuid:uuidv4(),
      description: "Le tzadziki est une spécialité de cuisine grecque à base d'oeufs de piossons composée de lait, de jus de citron, d'huile d'olive et de mie de pain",
      price:7.50,
      cote:2,
      categoryName: 'Entrée'
    },
    {
      name: 'Feta',
      _uuid:uuidv4(),
      description: "Le tarama est une spécialité de cuisine grecque à base d'oeufs de piossons composée de lait, de jus de citron, d'huile d'olive et de mie de pain",
      price:8.00,
      cote:1,
      categoryName: 'Entrée'
    }, 
    
   
    {
      name: 'Gambas grillés',
      _uuid:uuidv4(),
      description: "Le Gambas grillés  au four est une spécialité de cuisine grecque ",
      price:8.50,
      cote:1,
      categoryName: 'Entrée'
      
    }, 
    {
      name: 'Calamars frits',
      _uuid:uuidv4(),
      description: "Le feta gratinée  au four est une spécialité de cuisine grecque ",
      price:8.50,
      cote:1,
      categoryName: 'Entrée'
    }, 
    {
      name: 'Meze ',
      _uuid:uuidv4(),
      description: "Le feta gratinée  au four est une spécialité de cuisine grecque ",
      price:8.50,
      cote:1,
      categoryName: 'Entrée'
    }, 
    {
      name: "Brochette d Agneau",
      _uuid:uuidv4(),
      description: "La Brochette d'agneau  au four est une spécialité de cuisine grecque ",
      price:14.50,
      cote:1,
      categoryName: 'Plats'
    }, 
    {
      name: "Entre côte",
      _uuid:uuidv4(),
      description: "L'Entre Côte gratinée  au four est une spécialité de cuisine grecque ",
      price:15.50,
      cote:1,
      categoryName: 'Plats'
    }, 
    {
      name: 'To Elliniko',
      _uuid:uuidv4(),
      description: "To elliniko  gratinée  au four est une spécialité de cuisine grecque ",
      price:12.50,
      cote:1,
      categoryName: 'Suggestions'
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
    categoryCreate('Entrée'),
    categoryCreate('Plats'),
    categoryCreate('Suggestions'),
   
  ]);
};


async function createCities(){
  return Promise.all([
    cityCreate('Audergem', 1160),
    cityCreate('Bruxelles', 1000),
    cityCreate('Drogenbos', 1620),
    cityCreate('Ixelles', 1050),
  ]);
};

async function createSupplements(){
  return Promise.all([
    supplementCreate('frite', 5.0),
    supplementCreate('salade', 5.0),
    supplementCreate("pâte grecque", 5.0),
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
    pictureCreate('/images/0/tarama.jpg','Tarama'),
    pictureCreate('/images/0/tzadziki.jpg','Tzadziki'),
    pictureCreate('/images/0/feta.jpg','Feta'),
    pictureCreate('/images/0/gambas.jpg','Gambas grillés'),
    pictureCreate('/images/0/calamars.jpg','Calamars frits'),
    pictureCreate('/images/0/meze.jpg','Meze'),
    pictureCreate('/images/1/brochette-agneau.jpg','Brochette d Agneau'),
    pictureCreate('/images/1/entrecote.jpg','Entre côte'),
    pictureCreate('/images/2/to-elliniko.jpg','To Elliniko'),
   
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
    await createUsers();
    
    const cities = await createCities();    
    const categories = await createCategories();
    const products = await createProducts();
    const product_category = await addCategories();
    const pictures = await createPictures();
    const product_image = await addPictures();
    const supplements = await createSupplements();
    const addresses = await createAddresses();
   
    const products_orders_01 = await createProductOrder01();
    const orders_01 = await updateOrders();
    //const totalOrder = await addTotal()
    const products_orders_02 = await createProductOrder02();
    const orders_02 = await updateOrders();
    

   
   

    
    sequelize.close();
  } catch (error) {
    console.error('Error while populating DB: ', error);
  }
})();