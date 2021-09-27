const sequelize = require('./backend/models/sequelize');
//const sequelize = require('./backend/models/sequelize_local');
//const sequelize = require('./backend/models/sequelize_mysql');

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
//const Picture = require('./backend/models/Picture');
const Payment = require('./backend/models/Payment')
const Invoice = require('./backend/models/Invoice')
const PaymentMethod = require('./backend/models/PaymentMethode')
const bcrypt = require("bcrypt");

const {DateTime} = require("luxon");

let number = 0;



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



async function createProductOrder01(){
  
  const datailsOrder = {
    number: 'number',
    time: 'time',
    createAt: DateTime.now(),
  }
  const order = await Order.create(datailsOrder);
  order.setDataValue('number', order.date_number);
  order.setDataValue('time', order.date_time);
  await order.save();
 
  return Promise.all([
    productOrderCreate( 2, (7.50) ,order.id, 1),
    productOrderCreate( 2, (7.50) ,order.id, 2),
    productOrderCreate( 2, (8.50) ,order.id, 3),
    
  ]);
};

async function createProductOrder02(){
  const datailsOrder = {
    number: 'number',
    time: 'time',
    createAt: DateTime.now(),
  }
  const order = await Order.create(datailsOrder);
  order.setDataValue('number', order.date_number);
  order.setDataValue('time', order.date_time);
  await order.save();

 
  return Promise.all([
    productOrderCreate( 1, (7.50) ,order.id, 5),
    productOrderCreate( 1, (7.50) ,order.id, 4),
    productOrderCreate( 6, (8.50) ,order.id, 1),
    
  ]);
};

async function createProductOrder03(){

  const datailsOrder = {
    number: 'number',
    time: 'time',
    createAt: DateTime.now(),
  }
  const order = await Order.create(datailsOrder);
  order.setDataValue('number', order.date_number);
  order.setDataValue('time', order.date_time);
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
        total: 0
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
      total: 0
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
  await city.save()
  console.log('Nouvelle ville ' + city.name);
  cities.push(city);
  return city;
};



async function categoryCreate(name){
  categorieDetail = {
    name : name
  }  
  const category = await Category.create(categorieDetail);
  await category.save();
  console.log("Nouvelle categorie " + category.name);
  categories.push(category);
  return category;
};

async function createUsers(){

    const root_password = await bcrypt.hash('password',10)
    const stefan_password = await bcrypt.hash('password',10)
    const alpha_password = await bcrypt.hash('password',10)
    

    const [admin, client, livreur] = await Role.bulkCreate([
      { name: "admin" },
      { name: "client" },
      { name: "livreur" },
      
    ]);

    const [root, stefan, alpha] =  await User.bulkCreate([
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
      },
      {
        email: 'alpha@exemple.be',
        _uuid: uuidv4(),
        first_name: 'alpha',
        last_name: 'alpha',
        isAdmin: false,
        passwordHash: alpha_password
      }
    ]);

    await Promise.all([
      root.setRoles([admin]),
      stefan.setRoles([client]),
      alpha.setRoles([livreur])
      
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
      url: '/uploads/tarama.jpg',
      name: 'Tarama',
      description: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. ",
      price:7.50,
      rate: 0,
      comment:0,
      categoryId: 1
      
    }, 
    {
      url: '/uploads/tzadziki.jpg',
      name: 'Tzadziki',
      description: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. ",
      price:7.50,
      rate:0,
      comment:0,
      categoryId: 1
    },
    {
      url: '/uploads/feta.jpg',
      name: 'Feta',
      description: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. ",
      price:8.00,
      rate:0,
      comment:0,
      categoryId: 1
    }, 
    
   
    {
      url: '/uploads/gambas.jpg',
      name: 'Gambas grillés',
      description: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. ",
      price:8.50,
      rate:0,
      comment:0,
      categoryId: 1
      
    }, 
    {
      url: '/uploads/calamars.jpg',
      name: 'Calamars frits',
      description: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. ",
      price:8.50,
      rate:0,
      comment:0,
      categoryId: 1
    }, 
    {
      url: '/uploads/meze.jpg',
      name: 'Meze ',
      description: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. ",
      price:8.50,
      rate:0,
      comment:0,
      categoryId: 1
    }, 
    {
      url: '/uploads/brochette-agneau.jpg',
      name: "Brochette d Agneau",
      description: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. ",
      price:14.50,
      rate:0,
      comment:0,
      categoryId: 2
    }, 
    {
      url: '/uploads/entrecote.jpg',
      name: "Entre côte",
      description: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. ",
      price:15.50,
      rate:0,
      comment:0,
      categoryId: 2
    }, 
    {
      url: '/uploads/to-eliniko.jpg',
      name: 'To Elliniko',
      description: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. ",
      price:12.50,
      rate:0,
      comment:0,
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



async function createAddresses(){
  return Promise.all([
    addressCreate("Rue d'Anvers",154,5,1, 'root@exemple.be'),
    addressCreate("Chaussée de Louvain",8,2,2, 'stefan@exemple.be'),
    addressCreate("Rue de la madelaine ",4,2,3, 'alpha@exemple.be'),
    
   ]);
};

async function createPictures(){
  return Promise.all([
    pictureCreate('/uploads/tarama.jpg',1),
    pictureCreate('/uploads/tzadziki.jpg',2),
    pictureCreate('/uploads/feta.jpg',3),
    pictureCreate('/uploads/gambas.jpg',4),
    pictureCreate('/uploads/calamars.jpg',5),
    pictureCreate('/uploads/meze.jpg',6),
    pictureCreate('/uploads/brochette-agneau.jpg',7),
    pictureCreate('/uploads/entrecote.jpg',8),
    pictureCreate('/uploads/to-eliniko.jpg',9),
   
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

async function productRate(productId, rate){
  const result = await Review.findAndCountAll({
    where: {
        productId:productId
    },
  })
  const product = await Product.findByPk(productId);
  const rating = await product.calculRate(product.rate, rate, result.count);
  product.setDataValue('rate',rating)
  const comment = await product.setComment(product.comment)
  product.setDataValue('comment', comment)
  await product.save()
}

async function reviewCreate(name,rating,comment,productId, email){
  
  await productRate(productId,rating)
  try {
    const reviewDetails = {
      name:name,
      rating:rating,
      comment:comment,
    }
    const review = await Review.create(reviewDetails);
    console.log('Nouvelle review ' + review.id )
    review.setDataValue('productId', productId)
    review.setDataValue('userEmail', email)
    await review.save()
    
  } catch (error) {
    console.log(error)
  }
}

async function createReviews(){
  return Promise.all([
    reviewCreate('stefan',1,'this food is delicious',1, 'stefan@exemple.be'),
    reviewCreate('stefan',4,'this food is delicious',2, 'stefan@exemple.be'),
    reviewCreate('stefan',4,'this food is delicious',3, 'stefan@exemple.be'),
    reviewCreate('stefan',4,'this food is delicious',4, 'stefan@exemple.be'),
    reviewCreate('stefan',5,'this food is delicious',5, 'stefan@exemple.be'),
  ]);
}

async function createReviewsOther(){
  return Promise.all([
    reviewCreate('alpha',4,'this food is good',1, 'alpha@exemple.be'),
    reviewCreate('alpha',4,'this food is good',2, 'alpha@exemple.be'),
    reviewCreate('alpha',3,'this food is good',3, 'alpha@exemple.be'),
    reviewCreate('alpha',2,'this food is good',4, 'alpha@exemple.be'),
    reviewCreate('alpha',1,'this food is good',5, 'alpha@exemple.be'),
  ])
}


(async () => {
  try {
    await sequelize.sync({ force: true });
    await createUsers();
    const cities = await createCities();    
    const address = await createAddresses();
    const categories = await createCategories();
    const products = await createProducts();
    const product_category = await addCategories();
    //const pictures = await createPictures();
    //const product_image = await addPictures();
   
    const products_orders_01 = await createProductOrder01();
    const orders_01 = await updateOrders();
    //const totalOrder = await addTotal()
    const products_orders_02 = await createProductOrder02();
    const orders_02 = await updateOrders();

    const products_orders_03 = await createProductOrder03();
    const orders_03 = await updateOrdersRoot();
    const review = await createReviews();
    const otehr = await createReviewsOther();
    
   
    sequelize.close();
  } catch (error) {
    console.error('Error while populating DB: ', error);
  }
})();