const sql = require("./db.js");

// constructor
const Facture = function(facture) {
    this.username = facture.username;
    this.supplier_name = facture.supplier_name;
    this.data = facture.data;
    this.status = facture.status;
    this.total = facture.total;
    this.orderDate = facture.orderDate;
};

Facture.create = (newFacture, result) => {
    sql.query("INSERT INTO factures SET ?", newFacture, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("supplier Created: ", { id: res.insertId, ...newFacture });
        result(null, { id: res.insertId, ...newFacture });
    });
};
Facture.findAll = (result) => {
    sql.query(`SELECT * FROM factures`, (err, res) => {
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
Facture.findById = (id, result) => {
    sql.query(`SELECT * FROM factures WHERE id = ${id}`, (err, res) => {
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
Facture.update = (data,_id, result) => {
    sql.query(
        "UPDATE factures SET ? WHERE id = ?",
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

            console.log("updated facture: ", { id: _id});
            result(null, { id: _id});
        }
    );
};
Facture.delete = (_id,result) =>{
    sql.query(
        "DELETE FROM factures WHERE id = ?",
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

            console.log("deleted facture: ", { id: _id});
            result(null, { id: _id});
        }
    );
}

module.exports = Facture;