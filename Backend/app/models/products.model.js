const sql = require("./db.js");

// constructor
const Product = function(product) {
    this.ref = product.ref;
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
    this.quantity = product.quantity;

};

Product.create = (newProduct, result) => {
    sql.query("INSERT INTO products SET ?", newProduct, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("created user: ", { id: res.insertId, ...newProduct });
        result(null, { id: res.insertId, ...newProduct });
    });
};

Product.findById = (id, result) => {
    sql.query(`SELECT * FROM products WHERE id = ${id}`, (err, res) => {
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

Product.findByRef = (_ref, result) => {
    sql.query(`SELECT * FROM products WHERE ref = '${_ref}'`, (err, res) => {
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

Product.findAll = (result) => {
    sql.query(`SELECT * FROM products`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length === 0) {
            result(null, []);
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

Product.update = (data,_id, result) => {
    sql.query(
        "UPDATE products SET ? WHERE id = ?",
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

            console.log("updated Product: ", { id: _id});
            result(null, { id: _id});
        }
    );
};

Product.delete = (_id,result) =>{
    sql.query(
        "DELETE FROM products WHERE id = ?",
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

Product.updateQuantity = (_quantity, _id,result) =>{
    sql.query(
        "UPDATE products SET quantity ? WHERE id = ?",
        [_quantity, _id],
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

            console.log("updated user: ", { id: _id});
            result(null, { id: _id});
        }
    );
}

Product.getAllRefs = (result) =>{
    sql.query(`SELECT * FROM products`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length === 0) {
            result(null, []);
            return;
        }
        console.log(res)
        let refs = [];
        res.map(item =>{
            refs.push(item.ref)
        })
        if (res.length) {
            console.log("found users: ", refs);
            result(null, refs);
            return;
        }

        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
    });
}
module.exports = Product;