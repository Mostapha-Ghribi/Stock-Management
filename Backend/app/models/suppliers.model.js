const sql = require("./db.js");

// constructor
const Supplier = function(supplier) {
    this.firstname = supplier.firstname;
    this.lastname = supplier.lastname;
    this.phone = supplier.phone;
    this.email = supplier.email;
    this.address = supplier.address;
};

Supplier.create = (newSupplier, result) => {
    sql.query("INSERT INTO suppliers SET ?", newSupplier, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("supplier Created: ", { id: res.insertId, ...newSupplier });
        result(null, { id: res.insertId, ...newSupplier });
    });
};

Supplier.findAll = (result) => {
    sql.query(`SELECT * FROM suppliers`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if(res.length === 0){
            result(null,[])
            return;
        }
        if (res.length) {
            console.log("found suppliers: ", res);
            result(null, res);
            return;
        }

        // not found Tutorial with the id
        result({ kind: "not_found" }, []);
    });
};

Supplier.findById = (id, result) => {
    sql.query(`SELECT * FROM suppliers WHERE id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found supplier: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
    });
};

Supplier.update = (data,_id, result) => {
    sql.query(
        "UPDATE suppliers SET ? WHERE id = ?",
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

            console.log("updated supplier: ", { id: data.id});
            result(null, { id: data.id});
        }
    );
};

Supplier.delete = (_id,result) =>{
    sql.query(
        "DELETE FROM suppliers WHERE id = ?",
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

            console.log("deleted supplier: ", { id: _id});
            result(null, { id: _id});
        }
    );
}
module.exports = Supplier;