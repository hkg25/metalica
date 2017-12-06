const {Notification} = require("../model/notification");
const  _ = require("lodash");

var saveNotification = (msgObj) => {
    var notification = new Notification(_.pick(msgObj,["msg","op","source"]));
    notification.save().then((notObj)=>{
        return notObj;
    }).catch((err)=>{
        throw new Error("Unable to save notification");
    });
}

module.exports = {save:saveNotification};