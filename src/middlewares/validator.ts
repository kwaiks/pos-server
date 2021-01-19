import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

const storeValidator = () => [
    body("storeName").isString().notEmpty()
                    .withMessage("Store Name shouldn't be empty"),
    body("storeLat").isDecimal().withMessage("Latitude should be decimal"),
    body("storeLng").isDecimal().withMessage("Longitude should be decimal"),
];

const productValidator = () => [
    body("storeId").notEmpty().withMessage("Store Identifier must be supplied"),
    body("itemName").notEmpty().withMessage("Item name should not be empty"),
    body("itemPrice").notEmpty()
];

const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    // check validated
    if (errors.isEmpty()) return next();

    // map errors from validation
    const extractedErrors = {};
    errors.array().map((err) => extractedErrors[err.param] = err.msg);
    return res.status(422).json({
        validationError: extractedErrors
    });
};

export default {
    productValidator,
    storeValidator,
    validate
};