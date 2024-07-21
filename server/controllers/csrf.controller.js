exports.read = (req, res) => {
    res.status(200).json({ csrfToken: req.cookies.csrfToken });
};
