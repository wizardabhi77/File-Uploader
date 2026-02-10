import { body } from "express-validator";

const registerValidation = [
  body("username")
  .trim()
  .notEmpty().withMessage("Username is required"),

  body("password")
  .trim()
  .notEmpty().withMessage("Password is required")
  .isLength({min: 5}).withMessage("Password should be atleast 5 characters"),

  body("confirmpassword")
  .trim()
  .notEmpty().withMessage("Confirm password is required")
  .isLength({min: 5}).withMessage("Confirm password should be atleast 5 characters")
  .custom((value, { req }) => {
    if ( value != req.body.password ){
        throw new Error("Password does not match");
    }
    return true;
  })
];

export default registerValidation;