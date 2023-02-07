module.exports = app => {
    const factures = require("../controllers/factures.controller.js");

    let router = require("express").Router();

    // Create a new Tutorial
    router.post("/", factures.create);
    router.get("/all", factures.findAll);
    router.get("/:id", factures.findOne);
    router.post("/addtoproducts/:id", factures.addToProducts);
    router.delete("/delete/:id", factures.delete);

    app.use('/api/factures', router);
};
