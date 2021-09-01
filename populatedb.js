const sequelize = require('./backend/models/sequelize');
const { v4: uuidv4 } = require('uuid');
const Address = require('./backend/models/Address');
const City = require('./backend/models/City');
const Order = require('./backend/models/Order');
const Role = require('./backend/models/Role');
const User = require('./backend/models/User');
const Category = require('./backend/models/Category');
const Product = require('./backend/models/Product');
const Review = require('./backend/models/Review');
const ProductOrder = require('./backend/models/ProductOrder');



const Allergen = require('./backend/models/Allergen');
const Picture = require('./backend/models/Picture');
const Payment = require('./backend/models/Payment');
const bcrypt = require("bcrypt");

const {DateTime} = require("luxon");



let categories = [];
let cities = [];
let supplements = [];
let orders = [];
let addresses = [];
let pictures = [];
let products_orders = [];


async function pictureCreate(path, productId){
  imageDetail = {
    path: path
  }
  const picture = await Picture.create(imageDetail);
  console.log('Nouvelle image' + picture.id);
        picture.setDataValue('productId', productId);
  await picture.save();
  pictures.push(picture);
  return picture;
}



async function addressCreate(nom,numero,etage,cityId,userEmail){
  adresseDetail = {
    name: nom,
    number: numero,
    floor: etage,
   
  }

  const address = await Address.create(adresseDetail);
  console.log('Nouvelle Adresse' + address.id);
        address.setDataValue('cityId', cityId);
        address.setDataValue('userEmail', userEmail);
  await address.save();
  addresses.push(address);
  return address;
};

async function productOrderCreate(qty, price, orderId,productId){
  productRate(productId)
  detailProductOrder = {
    quantity: qty,
    price: (price*qty),
  }
  const product_order = await ProductOrder.create(detailProductOrder);
 
  console.log('Nouvelle commande ' + product_order.id )
        product_order.setDataValue('orderId', orderId)
        product_order.setDataValue('productId', productId)
  await product_order.save()
 
  products_orders.push(product_order)
  
  return product_order;
  
};

async function productRate(productId){
  const product = await Product.findByPk(productId)
  product.setDataValue('rate', await product.calculRate(5,4))
  product.save()
}





async function createProductOrder01(){
  
  const date = new Date()

  const order = await Order.create();
  order.setDataValue('number', DateTime.fromISO(new Date().toISOString()).toFormat(`yyyy-MM-00${order.id}-dd`))
  order.setDataValue('time',DateTime.now().toLocaleString(DateTime.TIME_24_SIMPLE))
  order.setDataValue('createAt', DateTime.now().toLocaleString(DateTime.DATE_HUGE))
  order.setDataValue('isPaid', true);



  await order.save();
  return Promise.all([
    productOrderCreate( 2, (7.50) ,order.id, 1),
    productOrderCreate( 2, (7.50) ,order.id, 2),
    productOrderCreate( 2, (8.50) ,order.id, 3),
    
  ]);
};

async function createProductOrder02(){
  const order = await Order.create();
  order.setDataValue('number', DateTime.fromISO(new Date().toISOString()).toFormat(`yyyy-MM-00${order.id}-dd`))
  order.setDataValue('time',DateTime.now().toLocaleString(DateTime.TIME_24_SIMPLE	))
  order.setDataValue('createAt', DateTime.now().toLocaleString(DateTime.DATE_HUGE))
  order.setDataValue('isPaid', true);

  await order.save();
  return Promise.all([
    productOrderCreate( 1, (7.50) ,order.id, 5),
    productOrderCreate( 1, (7.50) ,order.id, 4),
    productOrderCreate( 6, (8.50) ,order.id, 1),
    
  ]);
};

async function createProductOrder03(){
  
  const date = new Date()

  const order = await Order.create();
  order.setDataValue('number', DateTime.fromISO(new Date().toISOString()).toFormat(`yyyy-MM-00${order.id}-dd`))
  order.setDataValue('time',DateTime.now().toLocaleString(DateTime.TIME_24_SIMPLE))
  order.setDataValue('createAt', DateTime.now().toLocaleString(DateTime.DATE_HUGE))
  order.setDataValue('isPaid', true);



  await order.save();
  return Promise.all([
    productOrderCreate( 2, (12.50) ,order.id, 3),
    productOrderCreate( 2, (12.50) ,order.id, 4),
    productOrderCreate( 2, (8.50) ,order.id, 5),
    
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
      subTotal = subTotal + item.price
    })
    order.setDataValue('total', subTotal)
    order.setDataValue('date', new Date())
    order.setDataValue('addressId', 1)
    order.setDataValue('userEmail', 'stefan@exemple.be')
    await order.save()
    
};

async function updateOrdersRoot(){
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
    subTotal = subTotal + item.price
  })
  order.setDataValue('total', subTotal)
  order.setDataValue('date', new Date())
  order.setDataValue('addressId', 2)
  order.setDataValue('userEmail', 'root@exemple.be')
  await order.save()
  
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

    const root_password = await bcrypt.hash('root',10)
    const stefan_password = await bcrypt.hash('root',10)
    

    const [admin, client] = await Role.bulkCreate([
      { name: "admin" },
      { name: "client" },
      
    ]);

    const [root, stefan] =  await User.bulkCreate([
      {
        email: 'root@exemple.be',
        _uuid: uuidv4(),
        first_name: 'root',
        last_name: 'root',
        isAdmin: true,
        passwordHash: root_password 
      },
      {
        email: 'stefan@exemple.be',
        _uuid: uuidv4(),
        first_name: 'stefan',
        last_name: 'stefan',
        isAdmin: false,
        passwordHash: stefan_password
      }
    ]);

    await Promise.all([
      root.setRoles([admin]),
      stefan.setRoles([client])
      
    ]);
};

async function createProducts(){

  const [gluten,crustaces,oeufs,poissons,arachides,soja,lactose,celeris,fruits,moutarde,graines,Anhydride,Lupin,Mollusques ] = await Allergen.bulkCreate([
    { name: "Gluten"},
    { name: "Crustacés"},
    { name: "Oeufs"},
    { name: "Poissons"},
    { name: "Arachides"},
    { name: "Soja"},
    { name: "Lactose"},
    { name: "Celeris"},
    { name: "Fruits à coque" },
    { name: "Moutarde" },
    { name: "Graines grillées"},
    { name: "Anhydride sulfureux"},
    { name: "Lupin"},
    { name: "Mollusques"},
    
  ]);
  const [tarama, tzadziki, feta, gambas,calamars,meze ] = await Product.bulkCreate([
    {
     
      name: 'Tarama',
      description: "Le tarama est une spécialité de cuisine grecque à base d'oeufs de piossons composée de lait, de jus de citron, d'huile d'olive et de mie de pain",
      price:7.50,
      rate: 0,
      categoryId: 1
      
    }, 
    {
      
      name: 'Tzadziki',
      description: "Le tzadziki est une spécialité de cuisine grecque à base d'oeufs de piossons composée de lait, de jus de citron, d'huile d'olive et de mie de pain",
      price:7.50,
      rate:0,
      categoryId: 1
    },
    {
      name: 'Feta',
      description: "Le tarama est une spécialité de cuisine grecque à base d'oeufs de piossons composée de lait, de jus de citron, d'huile d'olive et de mie de pain",
      price:8.00,
      rate:0,
      categoryId: 1
    }, 
    
   
    {
      name: 'Gambas grillés',
      description: "Le Gambas grillés  au four est une spécialité de cuisine grecque ",
      price:8.50,
      rate:0,
      categoryId: 1
      
    }, 
    {
      name: 'Calamars frits',
      description: "Le feta gratinée  au four est une spécialité de cuisine grecque ",
      price:8.50,
      rate:0,
      categoryId: 1
    }, 
    {
      name: 'Meze ',
      description: "Le feta gratinée  au four est une spécialité de cuisine grecque ",
      price:8.50,
      rate:0,
      categoryId: 1
    }, 
    {
      name: "Brochette d Agneau",
      description: "La Brochette d'agneau  au four est une spécialité de cuisine grecque ",
      price:14.50,
      rate:0,
      categoryId: 2
    }, 
    {
      name: "Entre côte",
      description: "L'Entre Côte gratinée  au four est une spécialité de cuisine grecque ",
      price:15.50,
      rate:0,
      categoryId: 2
    }, 
    {
      name: 'To Elliniko',
      description: "To elliniko  gratinée  au four est une spécialité de cuisine grecque ",
      price:12.50,
      rate:0,
      categoryId: 3
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





async function createAddressesStefan(){
  const stefan = await User.findOne({where: {
    first_name: 'stefan'
  }})
 
  return Promise.all([
    addressCreate("Boulevard d'Anvers",154,1,2, stefan.email),
    
   ]);
};


async function createAddressesRoot(){
  const root = await User.findOne({where: {
    first_name: 'root'
  }})
 
  return Promise.all([
    addressCreate("Rue d'Anvers",154,1,2, root.email),
    
   ]);
};

async function createPictures(){
  return Promise.all([
    pictureCreate('http://localhost:5000/uploads/tarama.jpg',1),
    pictureCreate('http://localhost:5000/uploads/tzadziki.jpg',2),
    pictureCreate('http://localhost:5000/uploads/feta.jpg',3),
    pictureCreate('http://localhost:5000/uploads/gambas.jpg',4),
    pictureCreate('http://localhost:5000/uploads/calamars.jpg',5),
    pictureCreate('http://localhost:5000/uploads/meze.jpg',6),
    pictureCreate('http://localhost:5000/uploads/brochette-agneau.jpg',7),
    pictureCreate('http://localhost:5000/uploads/entrecote.jpg',8),
    pictureCreate('http://localhost:5000/uploads/to-eliniko.jpg',9),
   
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
 
    const userAddresses = await createAddressesStefan();
    const rootAddresses = await createAddressesRoot();
   
    const products_orders_01 = await createProductOrder01();
    const orders_01 = await updateOrders();
    //const totalOrder = await addTotal()
    const products_orders_02 = await createProductOrder02();
    const orders_02 = await updateOrders();

    const products_orders_03 = await createProductOrder03();
    const orders_03 = await updateOrdersRoot();
    

   
   

    
    sequelize.close();
  } catch (error) {
    console.error('Error while populating DB: ', error);
  }
})();