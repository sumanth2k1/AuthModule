const { StatusCodes } = require("http-status-codes")
const { NotFoundError } = require("../errors")

const notFound = (req, res) => {
    res.status(StatusCodes.NOT_FOUND).json({message:"Page not found...!"});
}

module.exports = notFound   