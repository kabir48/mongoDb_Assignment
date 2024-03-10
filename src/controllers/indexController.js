exports.Index = (req, res) => {
    return res.status(200).json({
        status: "success ",
        data: "Express Rest API",
    });
}

exports.indexPost = (req, res) => {
    return res.status(201).json({
        status: "success",
        data: "This Is Post Method"
    })
}