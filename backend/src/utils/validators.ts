import { NextFunction, Request, Response } from "express";
import { body, ValidationChain, validationResult } from "express-validator";

// Validation middleware
const validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        // Run all validations
        for (let validation of validations) {
            await validation.run(req);
        }

        // Check for validation errors
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            return next(); // No errors, proceed to the next middleware
        } else {
            // Return errors if validation fails
            return res.status(422).json({ errors: errors.array() });
        }
    };
};

 // Login validations
   const loginValidator = [
    body("email").trim().isEmail().withMessage("Email is required"),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password should contain atleast 6 characters"),
  ];
  // Signup validations
   const signupValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    ...loginValidator,
  ];

// Export the validate function and signupValidator
export { validate, signupValidator ,loginValidator };
