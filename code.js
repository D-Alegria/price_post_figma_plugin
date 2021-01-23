// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).
// This shows the HTML page in "ui.html".
figma.showUI(__html__);
// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.resize(450, 900);
class Product {
    constructor(name, amount, description, category, internal_storage, day, productType) {
        this.name = name;
        this.amount = amount;
        this.description = description;
        this.category = category;
        this.day = day;
        this.productType = productType;
        this.internal_storage = internal_storage;
    }
}
figma.ui.onmessage = (msg) => __awaiter(this, void 0, void 0, function* () {
    // One way of distinguishing between different types of messages sent from
    // your HTML page is to use an object with a "type" property like this.
    // loading fonts
    yield figma.loadFontAsync({ family: "Gotham Pro", style: "Bold" });
    yield figma.loadFontAsync({ family: "Gotham Pro", style: "Medium" });
    if (msg.type === "create-post") {
        // get component
        var prods = JSON.parse(msg.body);
        console.log(prods);
        prods.forEach((product, index) => {
            var display = figma.currentPage.findAll((post) => {
                if (post.type == "COMPONENT") {
                    if (product.day == "NORMAL") {
                        if (product.category == "PHONE & LAPTOP" &&
                            post.name == "PHONE & LAPTOP=Red, ACCESSORIES=No, Day=Normal Day") {
                            console.log(`normal ${post}`);
                            return true;
                        }
                        if (product.category == "ACCESSORIES" &&
                            post.name == "PHONE & LAPTOP=No, ACCESSORIES=Red, Day=Normal Day") {
                            console.log(`normal + a ${post}`);
                            return true;
                        }
                    }
                    else {
                        if (product.category == "PHONE & LAPTOP" &&
                            post.name ==
                                "PHONE & LAPTOP=Red, ACCESSORIES=No, Day=Awoof Thursday") {
                            console.log(`awoof ${post}`);
                            return true;
                        }
                        if (product.category == "ACCESSORIES" &&
                            post.name ==
                                "PHONE & LAPTOP=No, ACCESSORIES=Red, Day=Awoof Thursday") {
                            console.log(`awoof + a ${post}`);
                            return true;
                        }
                    }
                }
            });
            figma.currentPage.selection = display;
            /// Create clone
            const selection = figma.currentPage.selection[0].clone();
            if (!selection || selection.type !== "COMPONENT") {
                return;
            }
            // create post
            const newInstance = figma.createFrame();
            newInstance.x = selection.x;
            newInstance.y = selection.y;
            newInstance.resize(selection.width, selection.height);
            for (const child of selection.children) {
                if (child.type == "INSTANCE") {
                    // change image
                    if (child.name == "Place image") {
                        var imageSet = child.mainComponent.parent;
                        if (imageSet.type == "COMPONENT_SET") {
                            var image = imageSet.findChild((image) => {
                                return image.name == "device name=" + product.name;
                            });
                            if (image != null && image.type == "COMPONENT") {
                                var ins = image.createInstance();
                                console.log(ins.name + " " + ins.type);
                                ins.x = child.x;
                                ins.y = child.y;
                                ins.resize(child.width, child.height);
                                newInstance.appendChild(ins);
                                continue;
                            }
                        }
                    }
                    // change item tag
                    if (child.name == "Item Tag") {
                        var itemTag = child.findChild((tag) => {
                            return tag.type == "TEXT";
                        });
                        if (itemTag.type == "TEXT") {
                            itemTag.characters = product.productType;
                        }
                    }
                    // change phone internal storage
                    if (child.name == "internal storage") {
                        child.children.forEach((child) => {
                            if (child.type == "FRAME" && child.name == "case") {
                                child.children.forEach((child) => {
                                    if (child.type == "TEXT" && child.name == "size") {
                                        child.characters = product.internal_storage + "GB";
                                    }
                                });
                            }
                        });
                    }
                }
                if (child.type == "TEXT") {
                    // change product name
                    if (child.name == "product_name") {
                        child.characters = product.name;
                    }
                    // change additional info
                    if (child.name == "additional info") {
                        child.characters = product.description;
                    }
                    // change amount
                    if (child.name == "amount") {
                        child.characters = "N" + formatMoney(parseInt(product.amount), 0);
                    }
                    // change installment amount
                    if (child.name == "installment amount") {
                        const count = parseInt(product.amount);
                        child.characters = "N" + formatMoney(count / 10.2402168692) + "/mo";
                    }
                }
                newInstance.appendChild(child);
            }
            // remove copy
            selection.remove();
            // move to new space
            newInstance.x = index * 1180 + 10000;
            newInstance.y = 1000;
            console.log(newInstance);
            figma.currentPage.selection = [newInstance];
            figma.viewport.scrollAndZoomIntoView([newInstance]);
        });
    }
    // Make sure to close the plugin when you're done. Otherwise the plugin will
    // keep running, which shows the cancel button at the bottom of the screen.
    figma.closePlugin();
});
function formatMoney(amount, decimalCount = 2, x = 3) {
    var re = "\\d(?=(\\d{" + (x || 3) + "})+" + (decimalCount > 0 ? "\\." : "$") + ")";
    return amount
        .toFixed(Math.max(0, ~~decimalCount))
        .replace(new RegExp(re, "g"), "$&,");
}
