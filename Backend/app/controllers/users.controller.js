const User = require("../models/users.model.js");
const bcrypt = require('bcryptjs');

// Create and Save a new Tutorial
exports.create = (req, res, next) => {
    // Validate request
    if (!!!req.body.fullName || !!!req.body.username || !!!req.body.password || !!!req.body.role) {
        return res.status(403).send({
            message: "Content can not be empty!"
        });
    }
    User.findByUserName(req.body.username, (err, data) => {
        if (!!!data) {
            bcrypt
                .hash(req.body.password, 12)
                .then(hashedPassword => {
                    const user = new User({
                        fullName: req.body.fullName,
                        username: req.body.username,
                        password: hashedPassword,
                        role: req.body.role,
                        isLoggedIn: false,
                        params: JSON.stringify({
                            pass: req.body.password
                        })
                    });
                    User.create(user, (err, data) => {
                        if (err)
                            res.status(500).send({
                                message:
                                    err.message || "Some error occurred while creating the User."
                            });
                        else res.send(data);
                    });
                })
        } else {
            return res.status(403).send({
                message: "Username Already Exists !"
            })
        }

    });
    // Create a Tutorial

}
exports.findOne = (req, res) => {
    User.findById(req.params.id, (err, data) => {
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
exports.login = (req, res, next) => {
    // Validate request
    if (!!!req.body.username || !!!req.body.password) {
        return res.status(403).send({
            message: "Content can not be empty!"
        });
    }
    User.findByUserName(req.body.username, (err, user) => {
        if (!!!user) {
            return res.status(403).send({
                message: "Username and/or password are incorrect !"
            })
        } else {
            bcrypt
                .compare(req.body.password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        User.LoggedIn(user.id, true, user, (err, data) => {
                            if (!!!data) {
                                return res.status(403).send({
                                    message: "Cannot Logged In !"
                                })
                            } else {
                                let DataUser = data;
                                data.isLoggedIn = 1;
                                return res.status(200).send(DataUser)
                            }
                        })
                    } else {
                        return res.status(403).send({
                            message: "Username and/or password are incorrect !"
                        })
                    }
                })
                .catch(err => {
                    return res.status(403).send({
                        message: "Username and/or password are incorrect !",
                        err
                    })
                });
        }

    });
    // Create a Tutorial

}
exports.logout = (req, res, next) => {
    console.log(req.body)
    User.logout(req.body.id, (err, data) => {
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
    // Create a Tutorial

}
exports.findAll = (req, res, next) => {
    User.findAll((err, data) => {
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
exports.update = (req, res, next) => {
    bcrypt
        .hash(req.body.password, 12)
        .then(hashedPassword => {
            const user = new User({
                fullName: req.body.fullName,
                username: req.body.username,
                password: hashedPassword,
                role: req.body.role,
                isLoggedIn: false,
                params: JSON.stringify({
                    pass: req.body.password
                })
            });
            User.update(user, req.body.id, (err, data) => {
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
        })

}
exports.delete = (req, res, next) => {
    console.log(req.params.id)
    User.delete(req.params.id, (err, data) => {
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