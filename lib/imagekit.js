const ImageKit = require("imagekit")

var imagekit = new ImageKit({
    publicKey: "public_SF1gKFrs7T2RwbjXuEbFEFV4Ozo=",
    urlEndpoint: "https://ik.imagekit.io/0slmtm4bx",
    privateKey: "private_DtBB6ELHz5PFBeyYfNuLjIIQyfw=",
});

module.exports = imagekit;