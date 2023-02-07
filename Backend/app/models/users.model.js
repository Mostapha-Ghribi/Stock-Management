const sql = require("./db.js");

// constructor
const User = function(user) {
    this.fullName = user.fullName;
    this.username = user.username;
    this.password = user.password;
    this.params = user.params;
    this.isLoggedIn = user.isLoggedIn || false;
    this.role = user.role || 'user'
};

User.create = (newUser, result) => {
    sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created user: ", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
    });
};

User.findById = (id, result) => {
    sql.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
    });
};

User.findByUserName = (_username, result) => {
    sql.query(`SELECT * FROM users WHERE username = '${_username}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
    });
};

User.LoggedIn = (_id,_loggedIn,user, result) => {
    sql.query(
        "UPDATE users SET isLoggedIn = ? WHERE id = ?",
        [_loggedIn, _id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows === 0) {
                // not found Tutorial with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated user: ", { id: _id, isLoggedIn : _loggedIn , ...user});
            result(null, { id: _id, isLoggedIn : _loggedIn , ...user});
        }
    );
};

User.findAll = (result) => {
    sql.query(`SELECT * FROM users`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found users: ", res);
            result(null, res);
            return;
        }

        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
    });
};

User.update = (data,_id, result) => {
    sql.query(
        "UPDATE users SET ? WHERE id = ?",
        [data, _id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows === 0) {
                // not found Tutorial with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated user: ", { id: data.id});
            result(null, { id: data.id});
        }
    );
};

User.delete = (_id,result) =>{
    sql.query(
        "DELETE FROM users WHERE id = ?",
        [_id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows === 0) {
                // not found Tutorial with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("deleted user: ", { id: _id});
            result(null, { id: _id});
        }
    );
}

User.logout = (_id,result) =>{
    sql.query(
        "UPDATE users SET isLoggedIn = ? WHERE id = ?",
        [false, _id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows === 0) {
                // not found Tutorial with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("user logged out: ", { id: _id});
            result(null, { id: _id});
        }
    );
}
module.exports = User;