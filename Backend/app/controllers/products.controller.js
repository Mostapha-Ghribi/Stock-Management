const Product = require("../models/products.model.js");

// Create and Save a new Tutorial
exports.create = (req, res, next) => {
    // Validate request
    if (!!!req.body.ref || !!!req.body.name || !!!req.body.description || !!!req.body.price || !!!req.body.quantity) {
        return res.status(403).send({
            message: "Content can not be empty!"
        });
    }
                    const product = new Product({
                        ref: req.body.ref,
                        name: req.body.name,
                        description: req.body.description,
                        price: req.body.price,
                        quantity: req.body.quantity,
                    });
                    Product.create(product, (err, data) => {
                        if (err)
                            res.status(500).send({
                                message:
                                    err.message || "Some error occurred while creating the User."
                            });
                        else res.send(data);
                    });

}
exports.findAll = (req, res, next) => {
    Product.findAll((err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Users"
                });
            }
        } else res.send(data);
    });
}

exports.findOne = (req, res) => {
    Product.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found User with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Tutorial with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

exports.getAllRefs = (req, res) => {
    Product.getAllRefs((err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `no refs.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Tutorial with id "
                });
            }
        } else res.send(data);
    });
};


exports.update = (req, res, next) => {
            const product = new Product({
                ref: req.body.ref,
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                quantity: req.body.quantity
            });
            Product.update(product, req.body.id, (err, data) => {
                if (err) {
                    if (err.kind === "not_found") {
                        res.status(404).send({
                            message: `Not found`
                        });
                    } else {
                        res.status(500).send({
                            message: "Error retrieving Users"
                        });
                    }
                } else res.send(data);
            });
}

exports.delete = (req, res, next) => {
    Product.delete(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Users"
                });
            }
        } else res.send(data);
    });

}


