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
                choices: ["View Products Sales by Department", "Create New Department"]
            }
        ])
        .then((answers) => {
            switch (answers.options) {
                case 'View Products Sales by Department':
                    viewProductSales();
                    break;
                case 'Create New Department':
                    createNewDept();
                    break;
            };
        })
}

function viewProductSales() {
    console.log(chalk.yellow("\nProduct Sales: \n") +
        chalk.magenta("\n================================================================\n"));
    connection.query(
        "SELECT departments.department_id, departments.department_name, departments.over_head_costs, products.product_sales, products.product_sales - departments.over_head_costs as total_profit FROM departments INNER JOIN products ON departments.department_name=products.department_name GROUP BY department_name", function (err, res) {
            if (err) throw err;
            console.table(res);
            chooseAction();
        }
    );

};

function createNewDept() {
    inquirer
    .prompt([
        {
            name: "deptname",
            type: "input",
            message: "What is the name of the new department?"
        },
        {
            name: "overhead",
            type: "input",
            message: "What is the overhead cost for the new department?",
            validate: function (value) {
                if (isNaN(value) === false && value > 0) {
                    return true;
                }
                return false;
            }
        }
    ])
    .then((answers) => {
        var name = answers.deptname.trim();
        var overhead = parseFloat(answers.overhead);
        connection.query(
            "INSERT INTO departments SET ?",
            { 
               department_name: name,
               over_head_costs: overhead
            }, 
            function (err, results) {
                if (err) throw err;
                console.log(chalk.yellow("\nAdded department!\n") +
                    chalk.magenta("\n================================================================\n"));
                chooseAction();
            }
        );
    })
}