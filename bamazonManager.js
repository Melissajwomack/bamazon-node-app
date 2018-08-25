var inquirer = require("inquirer");
var mysql = require("mysql");
var chalk = require("chalk");
const cTable = require("console.table");

cTable

var connection = mysql.createConnection({
    host: "127.0.0.1",

    port: 8889,

    user: "root",

    password: "root",

    database: "bamazon"

});

connection.connect(function (err) {
    if (err) throw err;
    chooseAction();
});



function chooseAction() {
    inquirer
        .prompt([
            {
                name: "options",
                message: "Which would you like to do?",
                type: "rawlist",
                choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
            }
        ])
        .then((answers) => {
            switch (answers.options) {
                case 'View Products for Sale':
                    displayItems();
                    break;
                case 'View Low Inventory':
                    lowInventory();
                    break;
                case 'Add to Inventory':
                    updateInventory();
                    break;
                case 'Add New Product':
                    addNewInventory();
                    break;
            };
        })
};

function displayItems() {
    console.log(chalk.yellow("\nItems in stock: \n") +
        chalk.magenta("\n================================================================\n"));
    connection.query(
        "SELECT * FROM products", function (err, results) {
            if (err) throw err;
            //Displays current available items
            console.table(results);
            chooseAction();
        }
    )
};

function lowInventory() {
    console.log(chalk.yellow("\nItems low in inventory: \n") +
        chalk.magenta("\n================================================================\n"));
    connection.query(
        "SELECT * FROM products WHERE stock_quantity < 5", function (err, results) {
            if (err) throw err;
            console.table(results);
            chooseAction();
        }
    )
};

function updateInventory() {
    inquirer
        .prompt([
            {
                name: "update",
                type: "input",
                message: "What item would you like to update?(Enter item_id)"
            },
            {
                name: "amount",
                type: "input",
                message: "What is the new amount?",
                validate: function (value) {
                    if (isNaN(value) === false && value > 0) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then((answers) => {
            connection.query(
                "UPDATE products SET ? WHERE ?", [{ stock_quantity: answers.amount }, { item_id: answers.update }], function (err, results) {
                    if (err) throw err;
                    console.log(chalk.yellow("\nUpdated inventory!\n") +
                        chalk.magenta("\n================================================================\n"));
                    chooseAction();
                }
            );
        });
};

function addNewInventory() {
    inquirer
        .prompt([
            {
                name: "item",
                type: "input",
                message: "What item would you like to add?"
            },
            {
                name: "dept",
                type: "input",
                message: "What department does the item belond to?",
            },
            {
                name: "price",
                type: "input",
                message: "What is the price of the item?",
                validate: function (value) {
                    if (isNaN(value) === false && value > 0) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "quantity",
                type: "input",
                message: "How many would you like to add?",
                validate: function (value) {
                    if (isNaN(value) === false && value > 0) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then((answers) => {
            var name = answers.item.trim();
            var deptname = answers.dept.trim();
            var price = parseFloat(answers.price);
            var quantity = parseInt(answers.quantity);
            connection.query(
                "INSERT INTO products SET ?",
                { 
                   product_name: name,
                   department_name: deptname,
                   price: price, 
                   stock_quantity: quantity 
                }, 
                function (err, results) {
                    if (err) throw err;
                    console.log(chalk.yellow("\nAdded to inventory!\n") +
                        chalk.magenta("\n================================================================\n"));
                    chooseAction();
                }
            );

        });

};

