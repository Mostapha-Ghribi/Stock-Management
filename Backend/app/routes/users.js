module.exports = app => {
    const users = require("../controllers/users.controller.js");

    let router = require("express").Router();

    // Create a new Tutorial
    router.post("/", users.create);
    router.get("/all",users.findAll)
    router.get("/:id", users.findOne);
    router.post("/login",users.login);
    router.patch("/update",users.update);
    router.delete("/delete/:id",users.delete);
    router.post("/logout",users.logout);
    app.use('/api/users', router);
};
