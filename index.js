const inquirer = require("inquirer");
const mysql = require('mysql2');
const chalk = require('chalk');

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

//COMPLETE! Description: Function to allow for async functionality.
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
        "Update Employee Manager",
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
        //COMPLETE!
        if(answers.mainMenu==="View all Employees") {
            db.query('SELECT employee.id AS "Employee ID", CONCAT_WS (" ", employee.first_name, employee.last_name) AS "Full Name", r.title AS "Job Title", d.department_name AS "Department Name", r.salary AS "Salary", CONCAT(e.first_name, " " , e.last_name) AS Manager FROM employee JOIN (role as r JOIN department AS d ON r.department_id = d.id) ON employee.role_id = r.id LEFT JOIN employee as e on employee.manager_id=e.id', function (err, results) {
                if (err) throw err;
                console.log(chalk.magentaBright(`------------------------------\n` + `All Employees:\n` + `--------------------------------\n`));
                console.table(results);
                mainMenu();
            });
        //COMPLETE!
        }else if(answers.mainMenu==="Add Employee") {
            addEmployeeFnc();
        //COMPLETE!
        }else if(answers.mainMenu==="Update Employee Role") {
            updateEmployeeRoleFnc();
        //COMPLETE!
        }else if(answers.mainMenu==="Update Employee Manager") {
            updateEmployeeManagerFnc();
        //COMPLETE!
        }else if(answers.mainMenu==="View all Roles") {
            db.query('SELECT role.id as "Role ID", role.title AS "Job Title", d.department_name AS "Department Name", salary AS "Salary" FROM role join department as d on role.department_id = d.id', function (err, results) {
                if (err) throw err;
                console.log(chalk.magentaBright(`------------------------------\n` + `All Roles:\n` + `--------------------------------\n`));
                console.table(results);
                mainMenu();
            });
        //COMPLETE!
        }else if(answers.mainMenu==="Add Role") {
            addRoleFnc();
        //COMPLETE! 
        }else if(answers.mainMenu==="View all Departments") {
            db.query('SELECT id AS "Department ID", department_name AS "Department Name" FROM department', function (err, results) {
                if (err) throw err;
                console.log(chalk.magentaBright(`------------------------------\n` + `All Departments:\n` + `--------------------------------\n`));
                console.table(results);
                mainMenu();
            });
        //COMPLETE!
        }else if(answers.mainMenu==="Add Department") {
            addDepartmentFnc();
        //TODO:
        }else if(answers.mainMenu==="Delete Department") {
            deleteDepartmentFnc();
        //COMPLETE!
        } else {
            console.log(chalk.magentaBright('------------------------------\n' +
            'Thank you for using the CMS Employee Tracker\n' +
            '--------------------------------\n'));
            process.exit(0);
        }
    })
};


// ---------------------------- EMPLOYEE FUNCTIONS --------------------------------//
//COMPLETE! DESCRIPTION: Function to allow users to add a new employee to the database.
async function addEmployeeFnc() {
    const allRoles = await dbAwait('SELECT id, title FROM role');
    const roleList = allRoles.map(function(r){
        return r.title;
    });

    const allManagers = await dbAwait('SELECT id, first_name, last_name FROM employee');
    const managerList = allManagers.map(function(m){
        return m.first_name + " " + m.last_name;
    });


    inquirer
        .prompt([
            {name: "firstName",
            type: "string",
            message: "What is the First Name of the Employee?"
            },
            {name: "lastName",
            type: "string",
            message: "What is the Last Name of the Employee?"
            },
            {name: "role",
            type: "list",
            message: "What is the Employees Role?",
            choices: roleList,
            },
            {name: "manager",
            type: "list",
            message: "Who is Employee's Manager?",
            choices: managerList,            
            },
        ])
        .then(function(data){
            const roleVal = allRoles.filter(function(result){
                if(data.role === result.title) return result;
            });
            
            const managerVal = allManagers.filter(function(result){
                if(data.manager == result.first_name + " " + result.last_name) return result;
            });
            //creating query to add new Employee to Employee table. 
            const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${data.firstName}", "${data.lastName}", ${roleVal[0].id}, ${managerVal[0].id}) `;

            db.query(sql, function (err, result) {
                if (err) throw err;
                console.log(chalk.magentaBright(`------------------------------\n` +
                `Added ${data.firstName} ${data.lastName} to the database\n` +
                `--------------------------------\n`))
                //triggering main function to continue app.
                mainMenu();
            });
        })
}

//COMPLETE! DESCRIPTION: Function allowing users to update employee role information.
async function updateEmployeeRoleFnc(){
    const allEmployees = await dbAwait('SELECT id, first_name, last_name FROM employee');
    const employeeList = allEmployees.map(function(e){
        return e.first_name + " " + e.last_name;
    });

    const allRoles = await dbAwait('SELECT id, title FROM role');
    const roleList = allRoles.map(function(r){
        return r.title;
    });

    inquirer
        .prompt([
            {name: "employee",
            type: "list",
            message: "Which Employee do you want to change?",
            choices: employeeList,
            },
            {name: "role",
            type: "list",
            message: "Which role do you want to assign to the selected employee?",
            choices: roleList,
            },
        ])
        .then(function(data){
            const employeeVal = allEmployees.filter(function(result){
                if(data.employee == result.first_name + " " + result.last_name) return result;
            });
            
            const roleVal = allRoles.filter(function(result){
                if(data.role === result.title) return result;
            });
            //creating query to update Employee role in Employee table. 
            const sql = `UPDATE employee SET role_id = ${roleVal[0].id} WHERE id = ${employeeVal[0].id}`;

            db.query(sql, function (err, result) {
                if (err) throw err;
                console.log(chalk.magentaBright(`------------------------------\n` +
                `Upated ${data.employee}'s role to ${data.role} in the database\n` +
                `--------------------------------\n`))
                //triggering main function to continue app.
                mainMenu();
            });
        });
}

//COMPLETE! DESCRIPTION: Function allowing users to update employee manager information.
async function updateEmployeeManagerFnc(){
    const allEmployees = await dbAwait('SELECT id, first_name, last_name FROM employee');
    const employeeList = allEmployees.map(function(e){
        return e.first_name + " " + e.last_name;
    });

    const allManagers = await dbAwait('SELECT id, first_name, last_name FROM employee');
    const managerList = allManagers.map(function(m){
        return m.first_name + " " + m.last_name;
    });

    inquirer
        .prompt([
            {name: "employee",
            type: "list",
            message: "Which Employee do you want to change?",
            choices: employeeList,
            },
            {name: "manager",
            type: "list",
            message: "Which role do you want to assign to the selected employee?",
            choices: managerList,
            },
        ])
        .then(function(data){
            const employeeVal = allEmployees.filter(function(result){
                if(data.employee == result.first_name + " " + result.last_name) return result;
            });
            
            const managerVal = allManagers.filter(function(result){
                if(data.manager == result.first_name + " " + result.last_name) return result;
            });
            //creating query to update Employee role in Employee table. 
            const sql = `UPDATE employee SET manager_id = ${managerVal[0].id} WHERE id = ${employeeVal[0].id}`;

            db.query(sql, function (err, result) {
                if (err) throw err;
                console.log(chalk.magentaBright(`------------------------------\n` +
                `Upated ${data.employee}'s manager to ${data.manager} in the database\n` +
                `--------------------------------\n`))
                //triggering main function to continue app.
                mainMenu();
            });
        });
}

// ---------------------------- ROLE FUNCTIONS --------------------------------//
//COMPLETE! DESCRIPTION: Function to allow users to add a new role to the database.
async function addRoleFnc() {
    const allDepartments = await dbAwait('SELECT id, department_name FROM department');
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
            const departmentVal = allDepartments.filter(function(result){
                if(data.department === result.department_name) return result;
            });
            //creating query to add new Role to Role table. 
            const sql = `INSERT INTO role (title, salary, department_id) VALUES ("${data.roleName}", ${data.salary}, ${departmentVal[0].id}) `;

            db.query(sql, function (err, result) {
                if (err) throw err;
                console.log(chalk.magentaBright(`------------------------------\n` +
                `Added ${data.roleName} to the database\n` +
                `--------------------------------\n`))
                //triggering main function to continue app.
                mainMenu();
            });
        })
}

// ---------------------------- DEPARTMENT FUNCTIONS --------------------------------//
//COMPLETE! DESCRIPTION: Function to allow users to add a new department to the database.
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
                console.log(chalk.magentaBright(`------------------------------\n` +
                `Added ${data.departmentName} Department to the database\n` +
                `--------------------------------\n`))
                //triggering main function to continue app.
                mainMenu();
            });
        })
}

//TODO:
function deleteDepartmentFnc(){

}