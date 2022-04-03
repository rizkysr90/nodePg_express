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
class Migrations {
    constructor(userObj) {
        this.client = new Client({
        user : 'postgres',
        host : 'localhost',
        password : 'adarizki123',
        port : 5432,
        });
        this.config = userObj.config;
    }
    createDB(name,query) {
        if (QueryValidator.createDatabase(query)) {
         
            this.client.connect();
            return this.client
            .query(`DROP DATABASE IF EXISTS ${name};`)
            .then(() => {
              return this.client.query(query);
            })
            .then((res) => {
                if (res) {
                    console.log(`SUCCESS CREATE DATABASE ${name}`);
                    this.client.end();
                    return Promise.resolve(true);
                } else {
                    return Promise.reject('Database already exist');
                }
            })
            .catch(e => {
                console.error(e.stack)
                this.client.end();
                
            
            });
        
            }
        throw new Error('INVALID QUERY');
    }
    useDB() {
        this.client = new Client(this.config);
        this.client.connect();
    }
    createTable(name,query) {
        if (QueryValidator.createTable(query)) {
            this.useDB();
            return this.client
            .query(query)
            .then(() => {
                this.count++;
                console.log(`SUCCESS CREATE TABLE ${name}`);
                this.client.end();
                return Promise.resolve(true);
            })
            .catch(e => {
                console.error(e.stack)
                this.client.end();
            });
        } 
        throw new Error('INVALID QUERY');
    }
}
console.log('Start migrating databases');
const configDb = {
    user : 'postgres',
    host : 'localhost',
    password : 'adarizki123',
    database : 'db_rizki_sr',
    port : 5432,
}
const db = new Migrations({config : configDb});
function startMigrating(){
    // Create Database
    const createDatabase = {
      name : configDb.database,
      query : `CREATE DATABASE ${configDb.database}`
    }
    db.createDB(createDatabase.name,createDatabase.query)
    .then(() => {
    // Create Table Customers
    const createTableCustAccounts = {
        name : 'customer_accounts',
        query :`CREATE TABLE customer_accounts (
          customer_account_id bigserial PRIMARY KEY,
          email text NOT NULL UNIQUE,
          password varchar(255) NOT NULL ,
          created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP);`
      }
      return db.createTable(createTableCustAccounts.name,createTableCustAccounts.query);
    })
    .then(() => {
        // Create Table Profile 
        const createTableProfiles = {
          name : 'profiles',
          query :`CREATE TABLE profiles (
            profile_id BIGSERIAL PRIMARY KEY,
            fullname VARCHAR(255) NOT NULL,
            phone  VARCHAR(50) NOT NULL,
            address TEXT NOT NULL,
            customer_account_id integer NOT NULL REFERENCES customer_accounts (customer_account_id),
            created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
            UNIQUE (customer_account_id));`
        }
        return db.createTable(createTableProfiles.name,createTableProfiles.query);
      })
      .then(() => {
        // Create Table Orders
        const createTableOrders = {
          name : 'orders',
          query :`CREATE TABLE orders (
            order_id bigserial PRIMARY KEY,
            customer_account_id integer NOT NULL REFERENCES customer_accounts (customer_account_id),
            created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP);`
        }
        return db.createTable(createTableOrders.name,createTableOrders.query);
      })
      .then(() => {
        // Create Table Products
        const createTableProducts = {
          name : 'products',
          query :`CREATE TABLE products (
            product_id bigserial PRIMARY KEY,
            name varchar(255) NOT NULL,
            price integer NOT NULL,
            stock integer NOT NULL,
            created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP);`
        }
        return db.createTable(createTableProducts.name,createTableProducts.query);
      })
      .then(() => {
        // Create Table Orders
        const createTableOrderDetails = {
          name : 'order_details',
          query :`CREATE TABLE order_details (
            order_id integer NOT NULL REFERENCES orders (order_id),
            product_id integer NOT NULL REFERENCES products (product_id),
            quantity integer NOT NULL,
            price integer NOT NULL,
            created_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (order_id,product_id));`
        }
        return db.createTable(createTableOrderDetails.name,createTableOrderDetails.query);
      })
      .then(() => {
          console.log('Already Done');
      })
      .catch((err) => {
          db.client.end();
          console.log(err);
      })
}  
  
startMigrating();