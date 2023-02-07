module.exports = app => {
    const products = require("../controllers/products.controller.js");

    let router = require("express").Router();

    // Create a new Tutorial
    router.post("/", products.create);
    router.get("/all", products.findAll);
    router.get("/refs", products.getAllRefs);
    router.get("/:id", products.findOne);
    router.patch("/update", products.update);
    router.delete("/delete/:id", products.delete);
    app.use('/api/products', router);
};
