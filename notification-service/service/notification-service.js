const {Notification} = require("../model/notification");
const  _ = require("lodash");

var saveNotification = (msgObj) => {
    var msg = _.pick(msgObj,["msg","op","source","id"]);
    var notification = new Notification(msg);
    notification.save().then((notObj)=>{
        return notObj;
    }).catch((err)=>{
        throw new Error("Unable to save notification");
    });
}

module.exports = {save:saveNotification};