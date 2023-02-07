const Supplier = require("../models/suppliers.model.js");
const bcrypt = require("bcryptjs");
const User = require("../models/users.model");


// Create and Save a new Tutorial
exports.create = (req, res, next) => {

    // Validate request
    if (!!!req.body.firstname || !!!req.body.lastname || !!!req.body.phone || !!!req.body.email || !!!req.body.address) {
        return res.status(403).send({
            message: "Content can not be empty!"
        });
    }
    const supplier = new Supplier({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address
    });
    Supplier.create(supplier, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the supplier."
            });
        else res.send(data);
    });

}

exports.findAll = (req, res, next) => {
    Supplier.findAll((err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving suppliers"
                });
            }
        } else res.send(data);
    });
}

exports.findOne = (req, res) => {
    Supplier.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Supplier with id ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Tutorial with id " + req.params.id
                });
            }
        } else res.send(data);
    });
};

exports.update = (req, res, next) => {
            const supplier = new Supplier({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                phone: req.body.phone,
                address : req.body.address
            });
            Supplier.update(supplier, req.body.id, (err, data) => {
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
    Supplier.delete(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Suppliers"
                });
            }
        } else res.send(data);
    });

}
