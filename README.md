# About the app
This app allows a customer to view and purchase products from an inventory. The app also allows a manager to view inventory, view inventory that is low (less than 5), update inventory, and add new inventory. Finally, the app allows a supervisor to view product sales by department and add new deparments. All the product information is stored in a MySql database and is updated in real time. The app uses the following npms: chalk, inquirer, mysql, and cTable.

## How to use the app

* First, navigate to the directory that contains the bamazon.js files in the terminal.
* Then, type node, space, and the file name that is appropriate (bamazonCustomer.js, bamazonManager.js, or bamazonSupervisor.js).

```node bamazonCustomer.js```
* Press enter.
* bamazonCustomer.js:
    * Choose from the list of options.
    * You will be prompted to enter the item id (found in the displayed table) and quanitity you wish to purchase.
    * If you try to purchase more than what is availible, the app will you know and prompt you to start over.
* bamazonManager.js
    * Choose from the list of options.
    * It is recommened that you view the inventory before updating inventory to obtain the item id for the product you wish to update.
    * If you wish to add to existing inventory, you will be prompted to enter the item id (found in the table) and the new amount (total including what was already in the inventory).
    * If you wish to add a new product to inventory, you will be prompted to enter the product name, the department the product belongs to the quantity of product, and the price of the product.
* bamazonSupervisor.js:
    * Choose from the list of options.
    * If you wish to add a new department, you will be prompted to enter the department name and the overhead cost for that department.
    * When viewing product sales by department, the total profit is calculated in real time and not stored in the database.

* **Press Control + C to exit the app at anytime**

## See how to use the app
* [Screencastify Video](https://drive.google.com/open?id=1DcqLXsSTJfhy4vSrnqM7uprmRd-GgOrF)
