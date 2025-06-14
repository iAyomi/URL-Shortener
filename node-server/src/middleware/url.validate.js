// export const validateGetURLStats = (schema) => async (req, res, next) => {
//   try {
//     await schema.validate(req.params, { abortEarly: false });
//     next();
//   } catch (error) {
//     res.status(400).json({ errors: error.errors });
//   }
// };

export const validateGetAllURLsList = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.query, { abortEarly: false });
    next();
  } catch (error) {
    res.status(400).json({ errors: error.errors });
  }
};

export const validateEncodeURL = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    res.status(400).json({ errors: error.errors });
  }
};

export const validateDecodeURL = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    res.status(400).json({ errors: error.errors });
  }
};

// export const validateRedirectURL = (schema) => async (req, res, next) => {
//   try {
//     await schema.validate(req.params, { abortEarly: false });
//     next();
//   } catch (error) {
//     res.status(400).json({ errors: error.errors });
//   }
// };
