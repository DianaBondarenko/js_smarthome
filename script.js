let allInstances = [];
//========================Room========================//
class Room {
    furnitureInRoom = [];
    constructor(name, x, y) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.domElement = document.createElement("div");
        this.init();
        allInstances.push(this);
    }
    init() {
        this.domElement.classList.add("room");
        this.domElement.style.top = this.y + "px";
        this.domElement.style.left = this.x + "px";
        this.domElement.classList.add(this.name);
        house.appendChild(this.domElement);
        // this.header = document.createTextNode(this.name);
        this.header = document.createElement("span");
        this.header.innerHTML = this.name;
        this.header.id = this.name + "Header";
        this.domElement.before(this.header);
    }
    addFurniture(furniture) {
        this.domElement.appendChild(furniture.domElement);
        this.furnitureInRoom.push(furniture);
    }
    removeFurniture(i) {
        this.furnitureInRoom.splice(i, 1);
        this.domElement.children[i].remove();
    }
}

//========================Furniture========================//
class Furniture {
    condition = "off";
    static images = {
        lamp: "./img/lamp.png",
        tv: "./img/tv.png",
        conditioner: "./img/conditioner.png",
        signaling: "./img/signaling.png",
        fan: "./img/fan.png"
    }
    constructor(name, x, y) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.domElement = document.createElement("img");
        this.init();
    }
    init() {
        this.domElement.classList.add("furniture");
        this.domElement.classList.add(this.name);
        this.domElement.style.top = this.y + "px";
        this.domElement.style.left = this.x + "px";
        this.domElement.src = Furniture.images[this.name];
        this.domElement.title = "The " + this.name + " is " + this.condition;
    }
    turnOn() {}
    drag(x, y) {
        this.x = x;
        this.y = y;
        this.domElement.style.top = this.y + "px";
        this.domElement.style.left = this.x + "px";
    }
}

//========================Lamp========================//
class Lamp extends Furniture {
    name = "lamp";
    turnOn() {
        if (this.condition == "off") {
            this.condition = "on";
            this.domElement.style.setProperty("-webkit-filter", "drop-shadow(0px 15px 12px rgb(234, 255, 0)");
            this.domElement.title = "The lamp is on";
        } else {
            this.condition = "off";
            this.domElement.style.setProperty("-webkit-filter", "drop-shadow(0px 0px 0px)");
            this.domElement.title = "The lamp is off";
        }
    }
}

//========================TV========================//
class TV extends Furniture {
    //channels = ["/img/tv_on.png","/img/tv_1.png", "/img/tv_2.png", "/img/tv_3.png"];
    static channels = {
        Fox: "./img/tv_on.png",
        Disney: "./img/tv_1.png",
        Pixar: "./img/tv_2.png",
        DreamWorks: "./img/tv_on.png"
    }
    name = "tv";
    currChannel = 0;
    volume = 10;
    turnOn() {
        if (this.condition == "off") {
            this.condition = "on";
            this.domElement.src = "./img/tv_on.png";
            this.domElement.title = "The TV is on";
        } else {
            this.condition = "off";
            this.domElement.src = "./img/tv.png";
            this.domElement.title = "The TV is off";
        }
    }
    // nextChannel() {
    //     for (let i = this.currChannel; i < 4; i++) {
    //         console.log(i);
    //         console.log(Object.values(TV.channels)[i]);
    //         this.domElement.src = ""+Object.values(TV.channels)[i];
    //         this.currChannel++;
    //     }
    // }

    nextChannel() {
        switch (this.currChannel) {
            case 0:
                this.domElement.src = "./img/tv_1.png";
                this.currChannel++;
                break;
            case 1:
                this.domElement.src = "./img/tv_2.png";
                this.currChannel++;
                break;
            case 2:
                this.domElement.src = "./img/tv_3.png";;
                this.currChannel++;
                break;
            case 3:
                this.domElement.src = "./img/tv_on.png";;
                this.currChannel = 0;
                break;
        }
    }
    prevChannel() {
        switch (this.currChannel) {
            case 0:
                this.domElement.src = "./img/tv_3.png";
                this.currChannel = 3;
                break;
            case 1:
                this.domElement.src = "./img/tv_on.png";
                this.currChannel--;
                break;
            case 2:
                this.domElement.src = "./img/tv_1.png";
                this.currChannel--;
                break;
            case 3:
                this.domElement.src = "./img/tv_2.png";
                this.currChannel--;
                break;
        }
    }
    static getChannels() {
        return Object.keys(TV.channels);
    }
    setVolume(volume) {
        this.volume = volume;
    }
}

//========================Conditioner========================//
class Conditioner extends Furniture {
    name = "conditioner";
    turnOn() {
        if (this.condition == "off") {
            this.condition = "on";
            this.domElement.style.setProperty("-webkit-filter", "drop-shadow(0px 20px 15px rgba(0, 49, 224, 0.5)");
            this.domElement.title = "The conditioner is on";
        } else {
            this.condition = "off";
            this.domElement.style.setProperty("-webkit-filter", "drop-shadow(0px 0px 0px)");
            this.domElement.title = "The conditioner is off";
        }
    }
}

//========================Signaling========================//
class Signaling extends Furniture {
    name = "signaling";
    turnOn() {
        if (this.condition == "off") {
            this.condition = "on";
            this.domElement.src = "./img/signaling_on.png";
            this.domElement.title = "The signaling is on";
        } else {
            this.condition = "off";
            this.domElement.src = "./img/signaling.png";
            this.domElement.title = "The signaling is off";
        }
    }
}

//========================Fan========================//
class Fan extends Furniture {
    name = "fan";
    turnOn() {
        if (this.condition == "off") {
            this.condition = "on";
            this.domElement.classList.add("rotate");
            this.domElement.title = "The fan is on";
        } else {
            this.condition = "off";
            this.domElement.classList.remove("rotate");
            this.domElement.title = "The fan is off";
        }
    }
}

//========================Creating rooms========================//
const bedroom = new Room("bedroom", 0, 0);
const livingRoom = new Room("living-room", 0, 250);
const corridor = new Room("corridor", 300, 0);
const bathRoom = new Room("bathroom", 400, 0);
const kitchen = new Room("kitchen", 400, 275);

//========================Adding furniture========================//
let btn = document.querySelector(".add");
let x = 0;
y = 0;
btn.addEventListener("click", function () {
    let elementName = document.getElementById("elements")[document.getElementById("elements").options.selectedIndex].value;
    let roomName = document.getElementById("rooms")[document.getElementById("rooms").options.selectedIndex].value;
    let div = document.querySelector("#" + roomName + " div");

    function func() {
        switch (elementName) {
            case ("lamp"):
                const lamp = new Lamp("lamp", x, y);
                return lamp;
                break;
            case ("tv"):
                const tv = new TV("tv", x, y);
                return tv;
                break;
            case ("conditioner"):
                const conditioner = new Conditioner("conditioner", x, y + 1);
                return conditioner;
                break;
            case ("signaling"):
                const signaling = new Signaling("signaling", x, y + 1);
                return signaling;
                break;
            case ("fan"):
                const fan = new Fan("fan", x, y);
                return fan;
                break;
        }
    }
    const furn = func();
    // div.innerHTML += "<div><span>"+furn.name+"</span><button>-</button></div>";
    if (furn.name == "tv") {
        div.insertAdjacentHTML("beforeend", `<div class="divInfo"><span>${furn.name}</span><label class="switch">
        <input type="checkbox" class="inpSwitch"><span class="slider"></span></label><button class="btn prev"><</button>
        <button class="btn next">></button><button class="btn channels">channels</button>
        <input type="range" min="0" max="20" step="1">
        <button class="btn delete">-</button></div>`)
    } else {
        div.insertAdjacentHTML("beforeend", `<div class="divInfo"><span>${furn.name}</span><label class="switch">
        <input type="checkbox" class="inpSwitch"><span class="slider"></span></label><button class="btn delete">-</button></div>`)
    }

    for (let room of allInstances) {
        if (roomName == room.name) {
            room.addFurniture(furn);

        }
    }
    x += 70;
    let room = document.querySelector(".house ." + roomName);
    if (x > room.clientWidth - 50) {
        x = 0;
        y += 100;
    }

    deleteElement();
    changeElement();
});


function deleteElement() {
    let btnsDelete = document.querySelectorAll("#roomsContent .delete");
    for (let i = 0; i < btnsDelete.length; i++) {
        btnsDelete[i].addEventListener("click", function () {
            let roomName = (this.parentElement.parentElement.parentElement.id);
            let btnsDelInRoom = document.querySelectorAll("#" + roomName + " div div .delete");
            let index;
            for (let k = 0; k < btnsDelInRoom.length; k++) {
                if (this == btnsDelInRoom[k]) {
                    index = k;
                }
            }
            for (let room of allInstances) {
                if (roomName == room.name) {
                    room.removeFurniture(index);
                }
            }
            btnsDelInRoom[index].parentElement.remove();
        });
    }
}

function changeElement() {
    for (let i = 0; i < allInstances.length; i++) {
        const furnitureImgs = allInstances[i].domElement.children;
        const furniture = allInstances[i].furnitureInRoom;
        const inputs = document.querySelectorAll("#" + allInstances[i].name + "Content .inpSwitch");

        for (let j = 0; j < furnitureImgs.length; j++) {
            furnitureImgs[j].addEventListener("click", function () {
                furniture[j].turnOn();
                //debugger;
                if (furniture[j].condition == "on") {
                    inputs[j].checked = true;
                } else {
                    inputs[j].checked = false;
                }
            });
            furnitureImgs[j].addEventListener("dragend", function (event) {
                let houseX = house.offsetLeft;
                let houseY = house.offsetTop;
                let x = event.pageX - houseX - allInstances[i].x;
                let y = event.pageY - houseY - allInstances[i].y;
                if (x < allInstances[i].domElement.clientWidth && x > 0 && y < allInstances[i].domElement.clientHeight && y > 0) {
                    furniture[j].drag(x, y);
                }
            });
            if (furniture[j].name == "tv") {
                furnitureImgs[j].addEventListener("dblclick", function () {
                    if (furniture[j].condition == "on") {
                        furniture[j].nextChannel();
                    }
                });
            }
        }
        for (let k = 0; k < inputs.length; k++) {
            inputs[k].addEventListener("click", function (event) {
                furniture[k].turnOn();
            });

            if (furniture[k].name == "tv") {
                const tvs = document.getElementsByClassName("channels");
                for (let j = 0; j < tvs.length; j++) {
                    const prev = document.getElementsByClassName("prev")[j];
                    const next = document.getElementsByClassName("next")[j];
                    const channels = document.getElementsByClassName("channels")[j];
                    const volume = document.querySelectorAll("input[type=range]")[j];
                    prev.addEventListener("click", function () {
                        if (furniture[k].condition == "on") {
                            furniture[k].prevChannel();
                        }
                    });
                    next.addEventListener("click", function () {
                        if (furniture[k].condition == "on") {
                            furniture[k].nextChannel();
                        }
                    });
                    channels.addEventListener("click", function () {
                        alert(TV.getChannels());
                    });
                    volume.addEventListener("change", function () {
                        furniture[k].setVolume(this.value);
                        this.title = "Volume: " + furniture[k].volume;
                    });
                }
            }
        }
    }
}