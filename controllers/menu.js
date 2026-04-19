const menuModel = require('./../models/menu');
const mongoose = require('mongoose');

exports.create = async (req, res) => {
    const { title, href, parent } = req.body;

    if (parent) {
        if (!mongoose.Types.ObjectId.isValid(parent)) {
            return res.json({message: 'parent id is not valid'})
        }
    };

    const menu = await menuModel.create({
        title,
        href,
        parent
    });

    return res.status(201).json(menu)
}

exports.getAll = async (req, res) => {
    let allMenus = await menuModel.find({}).lean();

    allMenus.forEach((menu) => {
        const submenus = [];

        for (let i = 0; i < allMenus.length; i++) {
            const submenu = allMenus[i];

            if (submenu.parent ?.equals(menu._id)) {             //use optioanl chaining + equals() <a method in mongodb and mongoose>

                submenus.push(allMenus.splice(i, 1)[0]);         //splice return an array involves removed element
                i = i - 1;
            }

        }

        menu.submenus = submenus;

    })

    return res.json(allMenus)
}

exports.getAllInPanel = async (req, res) => {
    const menus = await menuModel.find({}).populate('parent').lean();

    return res.json(menus)
}

exports.remove = async (req, res) => {
    const isMenuIDValid = mongoose.Types.ObjectId.isValid(req.params.id);

    if (!isMenuIDValid) {
        return res.json({message: 'menuID is not valid'})
    };

    const menu = await menuModel.findOneAndDelete({_id: req.params.id});

    return res.json(`this menu ${menu} has been deleted`)
}
