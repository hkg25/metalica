const apiGatewayController = require('../controllers/apiGatewayController');

var appRouter = function(app) {
    app.get("/:intent",apiGatewayController.get_all);

    app.post("/:intent",apiGatewayController.create);

    app.get("/:intent/:id",apiGatewayController.get);

    app.delete("/:intent/:id",apiGatewayController.delete);

    app.put("/:intent/:id",apiGatewayController.update);
}
    
module.exports = appRouter;