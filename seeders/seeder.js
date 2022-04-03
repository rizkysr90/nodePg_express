const { Client } = require('pg');
class QueryValidator {
    static validate(query,target) {
        const removeSpaces = query.replaceAll(' ','');
        let check = '';
  
        for (let i = 0; i < target.length; i++) {
          check += removeSpaces[i].toLowerCase();
        }
        return target === check;
    }
    static createTable(query) {
        return QueryValidator.validate(query,'createtable');
    }
    static createDatabase(query) {
        return QueryValidator.validate(query,'createdatabase');
    }
    static insertData(query) {
        return QueryValidator.validate(query,'insertinto');
    }
    static selectData(query) {
      return QueryValidator.validate(query,'select');
    }
    static updateData(query) {
      return QueryValidator.validate(query,'update');
    }
    static deleteData(query) {
      return QueryValidator.validate(query,'deletefrom');
    }
  }
class Seeders {
    constructor(userObj) {
        this.client = new Client({
        user : 'postgres',
        host : 'localhost',
        password : 'adarizki123',
        port : 5432,
        });
        this.config = userObj.config;
    }

   
   
    useDB() {
    this.client = new Client(this.config);
    this.client.connect();
    }
    insertData(name,query) {
    if (QueryValidator.insertData(query.text)) {
        this.useDB();
        return this.client
        .query(query)
        .then((res) => {
            this.count++;
            console.log(`SUCCESS INSERT ROW IN TABLE ${name}`);
            this.client.end();
            return Promise.resolve(true);
        })
        .catch(e => console.error(e));
    }
    throw new Error('INVALID QUERY');
    }
}  
console.log('Start to make database seeder');
const configDb = {
    user : 'postgres',
    host : 'localhost',
    password : 'adarizki123',
    database : 'db_rizki_sr',
    port : 5432,
}
const db = new Seeders({config : configDb});
function startSeed(){
    const insertCustomerAcc = {
        name : 'customer_accounts',
        query : {
          text : 'INSERT INTO customer_accounts (customer_account_id,email,password) VALUES ($1, $2, $3)',
          values : [1,'rizkyganteng@gmail.com','adaganteng123'],
        }
    }
    db.insertData(insertCustomerAcc.name,insertCustomerAcc.query)
    .then(() => {
        const insertProfiles = {
            name : 'profiles',
            query : {
              text : 'INSERT INTO profiles (fullname,phone,address,customer_account_id) VALUES ($1, $2, $3, $4)',
              values : ['Rizki Van Houtten','0898123456789','Jalan Cemara',1],
            }
          }
          return db.insertData(insertProfiles.name,insertProfiles.query);
    })
    .then(() => {
        const insertOrders = {
            name : 'orders',
            query : {
              text : 'INSERT INTO orders (customer_account_id) VALUES ($1)',
              values : [1],
            }
          }
          return db.insertData(insertOrders.name,insertOrders.query);
    })
    .then(() => {
        const insertProducts = {
            name : 'products',
            query : {
              text : 'INSERT INTO products (name,price,stock) VALUES ($1,$2,$3)',
              values : ['Kaos Unik',50000,25],
            }
          }
          return db.insertData(insertProducts.name,insertProducts.query);
    })
    .then(() => {
        const insertOrderDetails = {
            name : 'order_details',
            query : {
              text : 'INSERT INTO order_details (order_id,product_id,quantity,price) VALUES ($1,$2,$3,$4)',
              values : [1,1,2,100000],
            }
          }
          return db.insertData(insertOrderDetails.name,insertOrderDetails.query);
    })
    .then(() => {
        console.log('Finish');
    })
    .catch(e => console.error(e));
}
startSeed();