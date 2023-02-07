module.exports = app => {
    const suppliers = require("../controllers/suppliers.controller.js");

    let router = require("express").Router();

    // Create a new Tutorial
    router.post("/", suppliers.create);
    router.get("/all", suppliers.findAll);
    router.get("/:id", suppliers.findOne);
    router.patch("/update",suppliers.update);
    router.delete("/delete/:id",suppliers.delete);
    app.use('/api/suppliers', router);
};
