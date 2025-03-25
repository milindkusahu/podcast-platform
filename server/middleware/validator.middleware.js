import Joi from "joi";

// User validation schemas
export const registerSchema = Joi.object({
  username: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Username is required",
    "string.min": "Username must be at least 3 characters long",
    "string.max": "Username cannot exceed 50 characters",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please provide a valid email",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters long",
  }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Please provide a valid email",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),
});

// General validation middleware
export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errorMessages = error.details.map((detail) => detail.message);
      return res.status(400).json({
        success: false,
        errors: errorMessages,
      });
    }

    next();
  };
};

// Project validation schema
export const projectSchema = Joi.object({
  title: Joi.string().max(100).required().messages({
    "string.empty": "Project title is required",
    "string.max": "Title cannot exceed 100 characters",
  }),
  description: Joi.string().max(500).allow("").messages({
    "string.max": "Description cannot exceed 500 characters",
  }),
});

// Episode validation schemas
export const episodeSchema = Joi.object({
  title: Joi.string().max(100).required().messages({
    "string.empty": "Episode title is required",
    "string.max": "Title cannot exceed 100 characters",
  }),
  project: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.empty": "Project ID is required",
      "string.pattern.base": "Invalid project ID format",
    }),
  source: Joi.string().valid("RSS", "YouTube", "Manual").messages({
    "any.only": "Source must be RSS, YouTube, or Manual",
  }),
  sourceUrl: Joi.string().allow(""),
  transcript: Joi.string().allow(""),
});

export const episodeUpdateSchema = Joi.object({
  title: Joi.string().max(100).messages({
    "string.max": "Title cannot exceed 100 characters",
  }),
  transcript: Joi.string().allow(""),
});

export const updateUserSchema = Joi.object({
  username: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Username is required",
    "string.min": "Username must be at least 3 characters long",
    "string.max": "Username cannot exceed 50 characters",
  }),
});
