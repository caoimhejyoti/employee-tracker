const inquirer = require("inquirer");
const mysql = require('mysql2');
// const mysql = require('mysql2/promise');
const chalk = require('chalk');

// const {addDepartmentFnc} = require('./utils/departments')

// COMPLETE! DESCRIPTION: Connect to database
const db = mysql.createConnection(
    {
      host: '127.0.0.1',
      // MySQL username,
      user: 'root',
      password: 'Purple1!',
      database: 'employees_db'
    },
);

// COMPLETE! DESCRIPTION: Triggers connection to database and welcomes user to app.
db.connect(function (err){
    if (err) throw err;
    console.log(chalk.magentaBright('------------------------------\n' +
        'Welcome to the CMS Employee Tracker\n' +
        '--------------------------------\n'));
    mainMenu();
});

dbAwait = (command) => {
    return new Promise((resolve, reject) => {
        db.query(command, (err, result) => {
            if (err) console.log(err);
            return resolve(result);
        });
    });
};

//WORKING! DESCRIPTION: Root menu for app.
const mainMenuOptions = [
    {name: "mainMenu",
    type: "list",
    message: "What would you like to do?",
    choices: [
        "View all Employees",
        "Add Employee",
        "Update Employee Role",
        "View all Roles",
        "Add Role",
        "View all Departments",
        "Add Department",
        "Delete Department",
        "Quit",
        ],
    default: "View all employees"
    }
]


function mainMenu() {
    inquirer.prompt(mainMenuOptions).then(answers=>{
        //WORKING! FIXME: add department name! 
        if(answers.mainMenu==="View all Employees") {
            // 'SELECT employee.id AS "Employee ID", employee.first_name AS "First Name", employees.last_name AS "Last Name", roles.title AS "Job Title", departments.name AS "Department", roles.salary AS "Salary", employees.manager_id AS "Manager" FROM employees JOIN (roles JOIN departments ON roles.department_id = departments.id) ON employees.role_id = roles.id'
            // db.query('SELECT employee.id AS "Employee ID", CONCAT_WS (" ", employee.first_name, employee.last_name) AS "Full Name", r.title AS "Job Title", r.salary AS "Salary", d.department_name AS "Department Name" FROM employee INNER JOIN role as r on employee.role_id = r.id INNER JOIN department as d on role.department_id = d.id LEFT JOIN employee as e on employee.manager_id=e.id', function (err, results) {
            db.query('SELECT employee.id AS "Employee ID", CONCAT_WS (" ", employee.first_name, employee.last_name) AS "Full Name", r.title AS "Job Title", r.salary AS "Salary", CONCAT(e.first_name, " " , e.last_name) AS Manager FROM employee INNER JOIN role as r on employee.role_id = r.id LEFT JOIN employee as e on employee.manager_id=e.id', function (err, results) {
                if (err) throw err;
                console.log(chalk.magentaBright("All Employees:"));
                console.table(results);
                mainMenu();
            });
        }else if(answers.mainMenu==="Add Employee") {
            addEmployeeFnc();
        }else if(answers.mainMenu==="Update Employee Role") {
            // updateEmployeeRoleFnc();JOIN department ON role.department_id = department.department_name;
        //COMPLETE!
        }else if(answers.mainMenu==="View all Roles") {
            db.query('SELECT role.id as "Role ID", role.title AS "Job Title", d.department_name AS "Department Name", salary AS "Salary" FROM role join department as d on role.department_id = d.id', function (err, results) {
                if (err) throw err;
                console.log(chalk.magentaBright("All Roles:"));
                console.table(results);
                mainMenu();
            });
        }else if(answers.mainMenu==="Add Role") {
            addRoleFnc();
            
        //COMPLETE! 
        }else if(answers.mainMenu==="View all Departments") {
            db.query('SELECT id AS "Department ID", department_name AS "Department Name" FROM department', function (err, results) {
                if (err) throw err;
                console.log(chalk.magentaBright("All Departments:"));
                console.table(results);
                mainMenu();
            });
        //COMPLETE!
        }else if(answers.mainMenu==="Add Department") {
            addDepartmentFnc();
        }else if(answers.mainMenu==="Delete Department") {
            getDepartmentsFnc();
        } else {
            console.log(chalk.magentaBright('------------------------------\n' +
            'Thank you for using the CMS Employee Tracker\n' +
            '--------------------------------\n'));
            process.exit(0);
        }
    })
};

//COMPLETE!
function addDepartmentFnc() {
    inquirer
        .prompt([
            {name: "departmentName",
            type: "string",
            message: "What is the name of the Department?"
            },
        ])
        .then((data)=>{
            //creating query to add new Department to Department table. 
            const sql = "INSERT INTO Department (department_name) VALUES ?";
            const userAddedDepartment = [[data.departmentName]];

            db.query(sql, [userAddedDepartment], function (err, result) {
                if (err) throw err;
                console.log(`Added ${data.departmentName} Department to the database` );
                //triggering main function to continue app.
                mainMenu();
            });
        })
}

async function addRoleFnc() {
    const allDepartments = await dbAwait('SELECT id AS "value", department_name FROM department');
    const departmentList = allDepartments.map(function(d){
        return d.department_name;
    });
    inquirer
        .prompt([
            {name: "roleName",
            type: "string",
            message: "What is the name of the Role?"
            },
            {name: "salary",
            type: "decimal",
            message: "What is the salary of the Role?"
            },
            {name: "department",
            type: "list",
            message: "Which Department does the Role belong to?",
            choices: departmentList,
            },
        ])
        .then(function(data){
            console.log("HERE WE ARE");
            const departmentVal = allDepartments.filter(function(result){
                if(data.department === result.value) return result;
            });
            //creating query to add new Department to Department table. 
            const sql = "INSERT INTO role (title, salary, department_id) VALUES ('" + `${data.roleName}` + "', '" + `${data.salary}` + "', " + `${departmentVal}` + ") ";
            const userAddedDepartment = [[data.roleName], [data.salary], [departmentVal]];

            db.query(sql, function (err, result) {
                if (err) throw err;
                console.log(`Added ${data.roleName} to the database` );
                //triggering main function to continue app.
                mainMenu();
            });
        })
}

// INSERT INTO role (title, salary, department_id) VALUES ('" + `${data.roleName}` + "', '" + `${data.salary}` + "', " + `${data.departmentID}` + ")";

function allDepartmentsFnc() {
    db.query('SELECT id AS "Department ID", department_name AS "Department Name" FROM department', function (err, results) {
        if (err) throw err;
        results.map((department)=>{
            return{
                name: department.department_name,
                value: department.id
            }
        })
    })
}