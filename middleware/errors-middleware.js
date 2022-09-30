import apiError from "../exception/api-error.js";

const handleErrors = (err, req, res) => {
  if (err instanceof apiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }
  return res.status(500).json({ message: "Непридвиденная ошибка" });
};


export default handleErrors;