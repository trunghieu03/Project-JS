
class NewsController {

    jumtoPage(req, res, next) {
        res.render(req.parmas.page)
    }
    async index(req, res, next) {
        res.render('user/giaodien');
        // try {
        //     const user = await User.findOneAndDelete({});
        //     if (user) {
        //         res.json(user);
        //     } else {
        //         res.status(404).json({ err: "User not found" });
        //     }
        // } catch (err) {
        //     res.status(400).json({ err: "Error deleting user" });
        // }
    }

    gioithieu(req, res, next) {
        res.render('user/gioithieu');
    }
}

module.exports = new NewsController();
