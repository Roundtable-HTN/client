let plugins = {};
let currentPluginInstance = "";

let s = (sketch) => {
    let elwidth = Math.round((window.innerHeight - document.getElementById("canvasContainer").offsetTop) * 0.9);
    console.log(elwidth);
    sketch.setup = () => {
        sketch.createCanvas(elwidth, elwidth);
    }
    sketch.draw = () => {
        sketch.background(222, 184, 135);
        if (currentPluginInstance == "") {
            let normalcursor = true;
            for (let pluginInstance in plugins) {
                let plugin = plugins[pluginInstance];
                if (plugin.initialized) {
                    sketch.image(plugin.pg, plugin.overallX, plugin.overallY, plugin.overallWidth, plugin.overallHeight);
                    plugin.pgDraw(sketch.mouseX, sketch.mouseY, sketch.mouseIsPressed, plugin.overallWidth, plugin.overallHeight);
                }
                else {
                    plugin.overallX = Math.round((elwidth - plugin.overallWidth) * Math.random());
                    plugin.overallY = Math.round((elwidth - plugin.overallHeight) * Math.random());
                    plugin.pg = sketch.createGraphics(1000, 1000);
                    plugin.initialized = true;
                }
                if (plugin.overallX <= sketch.mouseX && sketch.mouseX <= plugin.overallX + plugin.overallWidth && plugin.overallY <= sketch.mouseY && sketch.mouseY <= plugin.overallY + plugin.overallHeight) {
                    normalcursor = false;
                }
            }
            if (normalcursor) {
                document.getElementById("canvasContainer").style.cursor = "auto";
            }
            else {
                document.getElementById("canvasContainer").style.cursor = "pointer";
            }
        }
        else {
            sketch.image(plugins[currentPluginInstance].pg, 0, 0, elwidth, elwidth);
            plugins[currentPluginInstance].pgDraw(sketch.mouseX, sketch.mouseY, sketch.mouseIsPressed, elwidth, elwidth);
        }
    }
    sketch.mouseClicked = () => {
        if (sketch.mouseX <= elwidth && sketch.mouseX >= 0 && sketch.mouseY <= elwidth && sketch.mouseY >= 0) {
            if (currentPluginInstance !== "" && plugins[currentPluginInstance]) {
                plugins[currentPluginInstance].dispatchEvent(new CustomEvent("mouse.click", {
                    x: sketch.mouseX,
                    y: sketch.mouseY
                }));
            }
            else {
                for (let pluginInstance in plugins) {
                    let plugin = plugins[pluginInstance];
                    if (plugin.overallX <= sketch.mouseX && sketch.mouseX <= plugin.overallX + plugin.overallWidth && plugin.overallY <= sketch.mouseY && sketch.mouseY <= plugin.overallY + plugin.overallHeight) {
                        currentPluginInstance = pluginInstance;
                        plugins[currentPluginInstance].dispatchEvent(new CustomEvent("user.join", {
                            x: sketch.mouseX,
                            y: sketch.mouseY
                        }));
                        plugins[currentPluginInstance].active = true;
                        window.socket.emit("join_plugin", {
                            session_id: window.session_id,
                            code: window.room.code
                            //data slot?????
                        });
                        break;
                    }
                }
            }
        }
    }
}

let maincanvas = new p5(s, 'canvasContainer');

document.body.addEventListener("keydown", function (e) {
    if (e.key == "Escape" && currentPluginInstance !== "") {
        window.socket.emit("leave_plugin", {
            session_id: window.session_id,
            code: window.room.code,
            slot: plugins[currentPluginInstance].slot
        });
        plugins[currentPluginInstance].dispatchEvent(new CustomEvent("user.exit"));
        plugins[currentPluginInstance].active = false;
        currentPluginInstance = "";
    }
    else if (e.key == "Delete" && currentPluginInstance !== "") {
        window.socket.emit("delete_plugin", {
            code: window.room.code,
            slot: plugins[currentPluginInstance].slot
        });
        plugins[currentPluginInstance].dispatchEvent(new CustomEvent("user.delete"))
        delete plugins[currentPluginInstance];
        currentPluginInstance = "";
    }
    else if (currentPluginInstance !== "") {
        plugins[currentPluginInstance].dispatchEvent(new CustomEvent("user.keypress", e.key));
    }
});

var addPlugin = (newplugin, instanceid) => {
    if (plugins[instanceid]) {
        return false;
    }
    else {
        plugins[instanceid] = newplugin;
    }
}

window.socket.on("plugin_broadcast", (data) => {
    if (plugins[currentPluginInstance]) {
        plugins[currentPluginInstance].dispatchEvent(new CustomEvent("broadcast", data));
    }
})

class RoundtablePlugin extends EventTarget {
    name = "";
    overallX = 0;
    overallY = 0;
    overallWidth = 200;
    overallHeight = 200;
    pg;
    pgDraw;
    slot = 0; //how to get slot lmao
    data = {};
    initialized = false;
    active = false;
    constructor() {
        super();
    }
    broadcast(message) {
        window.socket.emit("plugin_broadcast", {
            code: window.room.code,
            slot: this.slot,
            msg: message
        });
    }
    getData() {
        window.socket.emit("get_data", {
            slot: this.slot,
        }, (result) => {
            this.data = result;
        });
    }
    setData() {
        window.socket.emit("set_data", {
            slot: this.slot,
            data: this.data
        });
    }
}
