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
const luxon = require("luxon");
const DateTime = luxon.DateTime;





let number = 0;



let categories = [];
let cities = [];
let supplements = [];
let orders = [];
let addresses = [];
let pictures = [];
let products_orders = [];
let users = [];


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



async function addressCreate(nom,numero,etage,cityId,userAdress){
  adresseDetail = {
    name: nom,
    number: numero,
    floor: etage,
    cityId: cityId
   
  }
  const address = await Address.create(adresseDetail);
  console.log('Nouvelle Adresse' + address.id);
        
        
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
  const date = new Date()
  const datailsOrder = {
    number: 'number',
    time: 'time',
    createAt:date
  }
  const order = await Order.create(datailsOrder);
  order.setDataValue('number', order.date_number);
  order.setDataValue('time', order.date_time);
  await order.save();
 
  return Promise.all([
    productOrderCreate( 2, (7.50) ,order.id, 1),
    productOrderCreate( 2, (7.50) ,order.id, 2),
    productOrderCreate( 1, (8.00) ,order.id, 3),
    
  ]);
};

async function createProductOrder02(){
  const date = new Date()
  const datailsOrder = {
    number: 'number',
    time: 'time',
    createAt: date
  }
  const order = await Order.create(datailsOrder);
  order.setDataValue('number', order.date_number);
  order.setDataValue('time', order.date_time);
  await order.save();

 
  return Promise.all([
    productOrderCreate( 1, (8.50) ,order.id, 5),
    productOrderCreate( 1, (8.50) ,order.id, 4),
    productOrderCreate( 1, (7.50) ,order.id, 1),
    
  ]);
};

async function createProductOrder03(){
  const date = new Date()
  const datailsOrder = {
    number: 'number',
    time: 'time',
    createAt: date
  }
  const order = await Order.create(datailsOrder);
  order.setDataValue('number', order.date_number);
  order.setDataValue('time', order.date_time);
  await order.save();
  return Promise.all([
    productOrderCreate( 1, (8.00) ,order.id, 3),
    productOrderCreate( 1, (8.50) ,order.id, 4),
    productOrderCreate( 1, (8.50) ,order.id, 5),
    
  ]);
};

async function createProductOrder04(){
  const date = new Date()
  const datailsOrder = {
    number: 'number',
    time: 'time',
    createAt: date
  }
  const order = await Order.create(datailsOrder);
  order.setDataValue('number', order.date_number);
  order.setDataValue('time', order.date_time);
  await order.save();
  return Promise.all([
    productOrderCreate( 1, (7.50) ,order.id, 1),
    productOrderCreate( 2, (7.50) ,order.id, 2),
    productOrderCreate( 9, (12.50) ,order.id, 5),
    
  ]);
};

async function updateOrders(){
  const date = new Date()
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
    order.setDataValue('date', date)
    order.setDataValue('addressId', 1)
    order.setDataValue('userId', 2)
    await order.save()

    
    
};



async function updateOrdersRoot(){
  const date = new Date()
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
  order.setDataValue('date', date)
  order.setDataValue('addressId', 2)
  order.setDataValue('userId',1)
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

async function createCity(){
  const cityDetails = {
    name:"Linkebeek",
    zip:"1630"
  };
  const city = await City.create(cityDetails);
  await city.save();

  const addressDetail = {
      name: "Chaussée d'Alsemberg",
      number: 4,
      floor:0,
      cityId:city.id
  };
  const address = await Address.create(addressDetail);
  await address.save();
}



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

  const [root,stefan,alpha] =  await User.bulkCreate([
    {
      _uuid: uuidv4(),
      first_name: 'root',
      last_name: 'roots',
      email: 'root@exemple.be',
      passwordHash: root_password
    },
    {
      _uuid: uuidv4(),
      first_name: 'stefan',
      last_name: 'stefans',
      email: 'stefan@exemple.be',
      passwordHash: stefan_password
    },
    {
      _uuid: uuidv4(),
      first_name: 'alpha',
      last_name: 'alphas',
      email: 'alpha@exemple.be',
      passwordHash: alpha_password
    }
  ]);

  await Promise.all([
    root.setRoles([admin]),
    stefan.setRoles([client]),
    alpha.setRoles([livreur]),
    
  ]);
 
};


async function  user_address(id, address){
     
    const user = await User.findByPk(id,{
      include: Address
    })

    user.setAddresses(address)
    await user.save()
}

async function create_user_address(){
  await Promise.all([
    user_address(1,1),
    user_address(2,2),
    user_address(3,3),
    
  ])
}






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
      url: 'http://localhost:5000/uploads/tarama.jpg',
      name: 'Tarama',
      description: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. ",
      price:7.50,
      rate: 0,
      comment:0,
      categoryId: 1
      
    }, 
    {
      url: 'http://localhost:5000/uploads/tzadziki.jpg',
      name: 'Tzadziki',
      description: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. ",
      price:7.50,
      rate:0,
      comment:0,
      categoryId: 1
    },
    {
      url: 'http://localhost:5000/uploads/feta.jpg',
      name: 'Feta',
      description: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. ",
      price:8.00,
      rate:0,
      comment:0,
      categoryId: 1
    }, 
    
   
    {
      url: 'http://localhost:5000/uploads/gambas.jpg',
      name: 'Gambas grillés',
      description: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. ",
      price:8.50,
      rate:0,
      comment:0,
      categoryId: 1
      
    }, 
    {
      url: 'http://localhost:5000/uploads/calamars.jpg',
      name: 'Calamars frits',
      description: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. ",
      price:8.50,
      rate:0,
      comment:0,
      categoryId: 1
    }, 
    {
      url: 'http://localhost:5000/uploads/meze.jpg',
      name: 'Meze ',
      description: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. ",
      price:8.50,
      rate:0,
      comment:0,
      categoryId: 1
    }, 
    {
      url: 'http://localhost:5000/uploads/brochette-agneau.jpg',
      name: "Brochette d Agneau",
      description: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. ",
      price:14.50,
      rate:0,
      comment:0,
      categoryId: 2
    }, 
    {
      url: 'http://localhost:5000/uploads/entrecote.jpg',
      name: "Entre côte",
      description: "Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla ensemble des morceaux de texte pour réaliser un livre spécimen de polices de texte. ",
      price:15.50,
      rate:0,
      comment:0,
      categoryId: 2
    }, 
    {
      url: 'http://localhost:5000/uploads/to-eliniko.jpg',
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
    cityCreate('Ixelles', 1050),
  ]);
};



async function createAddresses(){
  return Promise.all([
    addressCreate("Rue d'Anvers",154,5,1, 1),
    addressCreate("Chaussée de Louvain",8,2,2,2),
    addressCreate("Rue de la madelaine ",4,2,3,2),
    
   ]);
};



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

async function reviewCreate(name,rating,comment,productId, id){
  const date = new Date()
  await productRate(productId,rating)
  try {
    const reviewDetails = {
      name:name,
      rating:rating,
      comment:comment,
      date: date,
      productId:productId,
     
    }
    const review = await Review.create(reviewDetails);
    review.setDataValue('userId', id)
    console.log('Nouvelle review ' + review.id )
    await review.save()
    
  } catch (error) {
    console.log(error)
  }
}

async function createMethodePayment(){
    const detailMethode = {
        name:"PayPal"
    }
    try{
      const methode = await PaymentMethod.create(detailMethode)
      
      await methode.save()
    } catch(error){
      console.log(error)
    }
   
}

async function createReviews(){
  return Promise.all([
    reviewCreate('stefan',5,'this food is delicious',1, 2),
    reviewCreate('stefan',5,'this food is delicious',2, 2),
    reviewCreate('stefan',5,'this food is delicious',3, 2),
    reviewCreate('stefan',5,'this food is delicious',4, 2),
    reviewCreate('stefan',5,'this food is delicious',5, 2),
  ]);
}

async function createReviewsOther(){
  return Promise.all([
    reviewCreate('alpha',3,'this food is good',1, 3),
    reviewCreate('alpha',3,'this food is good',2, 3),
    reviewCreate('alpha',3,'this food is good',3, 3),
    reviewCreate('alpha',3,'this food is good',4, 3),
    reviewCreate('alpha',3,'this food is good',5, 3),
  ])
}


(async () => {
  try {
    await sequelize.sync({ force: true });
    const cty = await createCity()
    const users = await createUsers()
    const cities = await createCities();    
    const address = await createAddresses();
    const user_address = await create_user_address()
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
    const orders_04 = await createProductOrder04();
    const orders_05 = await updateOrders();
    const review = await createReviews();
    const other = await createReviewsOther();

    const methode_payement = await createMethodePayment();
   
    sequelize.close();
  } catch (error) {
    console.error('Error while populating DB: ', error);
  }
})();