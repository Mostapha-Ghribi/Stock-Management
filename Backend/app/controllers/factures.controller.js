const Facture = require("../models/factures.model.js");
const Product = require("../models/products.model.js");
const moment = require("moment");

// Create and Save a new Tutorial
exports.create = (req, res, next) => {
    // Validate request
    if (!!!req.body.username || !!!req.body.supplier_name || !!!req.body.data || !!!req.body.status) {
        return res.status(403).send({
            message: "Content can not be empty!"
        });
    }
    let total = 0;
    let UpdatedData = [];
    let idx = 0;
    req.body.data.map(item =>{
        let TotalForItem = 0;
        TotalForItem += item.quantity * item.unitPrice;
        total += TotalForItem;
        Product.findById(parseInt(item.id),(err, data) => {
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
            } else {
                console.log("item !!!")
                UpdatedData.push({
                    product: data,
                    quantity: item.quantity,
                    unitPrice: item.unitPrice,
                    total: TotalForItem
                })
            }
            if(idx < req.body.data.length - 1){
                idx++;
            }else{
                let date;
                date = new Date();
                date = date.getUTCFullYear() + '-' +
                    ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
                    ('00' + date.getUTCDate()).slice(-2) + ' ' +
                    ('00' + date.getUTCHours()).slice(-2) + ':' +
                    ('00' + date.getUTCMinutes()).slice(-2) + ':' +
                    ('00' + date.getUTCSeconds()).slice(-2);
                const facture = new Facture({
                    username: req.body.username,
                    supplier_name: req.body.supplier_name,
                    data: JSON.stringify(UpdatedData),
                    status: req.body.status,
                    orderDate : date,
                    total: total,
                });
                Facture.create(facture, (err, data) => {
                    if (err)
                        res.status(500).send({
                            message:
                                err.message || "Some error occurred while creating the Facture."
                        });
                    else res.send(data);
                });
            }
        })
    })


}

exports.findAll = (req, res, next) => {
    Facture.findAll((err, data) => {
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
        }
        if(data && data.length === 0){
            res.send([])
        }else{
            data.map(item => item.data = JSON.parse(item.data));
            res.send(data);
        }

    });
}
exports.findOne = (req, res) => {
    Facture.findById(req.params.id, (err, data) => {
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
        } else {
            data.data = JSON.parse(data.data)
            res.send(data)
        }
    });
};
exports.addToProducts = (req, res) => {
    Facture.findById(req.params.id, (err, data) => {
        let idx = 0;
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
        } else {
            let Data = JSON.parse(data.data);
            Data.map(item =>{
                let product = item.product;
                let product_id = product.id;

                Product.findById(product_id,(err,resultProduct)=>{
                    let prodQuantity = resultProduct.quantity;
                    product.quantity = item.quantity + prodQuantity;
                    delete product.id;
                    Product.update(product,product_id,(err,res1)=>{
                        if(idx < Data.length - 1){
                            idx++;
                        }else{
                            let dataFacture = data;
                            dataFacture.status = 'done';
                            Facture.update(dataFacture,data.id,(err,result)=>{
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
                                } else res.send(result);
                            })
                        }
                    })

                })
            })
        }
    });
};
exports.delete = (req, res, next) => {
    Facture.delete(req.params.id, (err, data) => {
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

