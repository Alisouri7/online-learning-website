const menuModel = require('./../models/menu');

exports.create = async (req, res) => {
    const { title, href, parent } = req.body;

    const menu = await menuModel.create({
        title,
        href,
        parent
    });

    return res.status(201).json(menu)
}

exports.getAll = async (req, res) => {
    const allMenus = await menuModel.find({}).lean();

    allMenus.forEach((menu) => {
        const submenus = [];

        for (let i = 0; i < menus.length; i++) {
            const mainMenu = menus[i];

            if (String(mainMenu.parent) === String(menu._id)) {

                submenus.push(allMenus.splice(i, 1)[0]);         //splice return an array involves removed element
                i = i - 1;
            }

        }

        menu.submenus = submenus;

    })

    return res.json(menus)
}

exports.getAllInPanel = async (req, res) => {
    const menus = await menuModel.find({}).populate('parent').lean();

    return res.json(menus)
}

exports.remove = async (req, res) => {

}
