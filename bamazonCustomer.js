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
    displayItems();
});

function displayItems() {
    console.log(chalk.yellow("\nItems Available for Sale!\n") + 
    chalk.magenta("\n================================================================\n"));
    connection.query(
        "SELECT * FROM products", function (err, results) {
            if (err) throw err;
            //Displays current available items
            console.table(results);
            chooseItems();
        }
    )
};

function chooseItems() {
    inquirer
        .prompt([
            {
                name: "buyProduct",
                type: "input",
                message: "What product would you like to buy? (Enter item_id)."
            },
            {
                name: "unitsOfProduct",
                type: "input",
                message: "How many units would you like to buy?",
                validate: function (value) {
                    if (isNaN(value) === false && value > 0) {
                        return true;
                    }
                    return false;
                }  
            }
        ])
        .then(function (answer) {

            var choice = answer.buyProduct;
            var units = answer.unitsOfProduct;
            
            connection.query(
                "SELECT * FROM products WHERE ?", [{item_id: choice}], function (err, results) {
                    if (err) throw err;
                    //Grab cost
                    var cost = results[0].price;
                    var total = cost * units;
                    // Validate units is not more/less than stock
                    if (units > results[0].stock_quantity) {
                    console.log(
                        chalk.magenta("\n================================================================\n") +
                        chalk.red("\nNot enough in stock! Try again...\n") +
                        chalk.magenta("\n================================================================\n")
                    );
                    displayItems();
                    }

                    else {
                        //Update database
                        var newunits = parseInt(results[0].stock_quantity) - parseInt(units);
                        connection.query(
                            "UPDATE products SET ? WHERE ?;",
                            [
                                {
                                    stock_quantity: newunits,
                                    product_sales: total,
                                },
                                {
                                    item_id: results[0].item_id
                                }
                            ]
                        );
                        console.log(
                            chalk.magenta("\n================================================================\n") +
                            chalk.cyan("\nYou bought " + units + " units of " + results[0].product_name +"!\n") + 
                            chalk.green("\nYour total was $" + total + ".\n") +
                            chalk.magenta("\n================================================================\n")
                        );
                        displayItems();
                    }
                }
            )
        })
};












