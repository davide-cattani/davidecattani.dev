---
title: Run a DB2 / AS400 stored procedure from laravel
date: 2021-06-18T19:15:00.000Z
description: If you need to launch a stored procedure of an IBM i DB2 / AS400
  database from laravel, chances are you are encountering some errors and can't
  find solutions.   This quick guide may help you :)
---
Having to develop a web application with an IBM AS400 as database can be quite tricky. 

Recently me and my team had to not only get data out of it in a "standard" way using laravel models, but also launch some stored procedures because some operations needed to be controlled by our client (the database developer/owner).

When it came to launching a stored procedure that returned feedback values, we encountered tons of different errors.

The node package [laravel-db2](https://github.com/cooperl22/laravel-db2) was our best friend and helped us manage to connect to the database using the IBM i ODBC driver.

We had to install the driver in our homestead virtual machine. If you too are using homestead, refer to this [link](https://www.ibm.com/support/pages/ibm-i-access-client-solutions) for downloading and installing the driver.

### Juicy part starts here

The hardest part was to get rid of the "Cursor state not valid" error that the database was encountering (and returning).
We found lots of articles about this error, but unfortunately every one of it was related to mySql or SQLServer databases.

Documentation about DB2 and AS400 is very scarce and, i have to say, the docs from IBM about setting up a connection from PHP code is not so good.

We finally managed to solve this error and run the stored procedure, getting back output parameters values from it.

```php
$dsn = "your_dsn";
$username = "db_username";
$password = "db_password";
$schema = "db_schema";
$storedProcedure "stored_procedure_name";
$inputParam = '';
$outputParam = null;
// Open a direct connection to IBM AS400.
$db = new PDO("odbc:DRIVER={IBM i Access ODBC Driver};DSN=$dsn;", $username, $password, array(
        PDO::ATTR_PERSISTENT => TRUE,
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION)
);
// Prepare the query (notice both input and output parameter are indicated).
$query = $db->prepare("CALL $schema.$storedProcedure(?,?)");
// Bind input parameter passing the type (in this case, string).
$query->bindParam(1, $inputParam, PDO::PARAM_STR);
// Bind output parameter by passing PDO::PARAM_INPUT_OUTPUT constant in | operator with type.
// Lastly, indicate string maximum lenght + 1.
// MAXIMUM LENGTH + 1 was important in our case!!! Without the +1, we had errors.
$query->bindParam(2, $outputParam, PDO::PARAM_STR|PDO::PARAM_INPUT_OUTPUT, 2);
// Execute the query
$query->execute();
// Close the cursor.
// This was very important in our case because database was always returning "Invalid cursor state" error.
$query->closeCursor();
// Now you can access the output in the provided variables.
var_dump($outputParam);
```