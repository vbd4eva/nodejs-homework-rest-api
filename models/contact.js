const Joi = require("joi");
const { Schema, model } = require("mongoose");

const nameRegexp = /^[a-яА-Я a-zA-Z-]{3,30}$/;
const emailRegexp =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRegexp = /^\([0-9]{3}\)\s[0-9]{3}-[0-9]{4}$/;

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      match: emailRegexp,
    },
    phone: {
      type: String,
      match: phoneRegexp,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);
const joiSchema = Joi.object({
  name: Joi.string().pattern(nameRegexp),
  email: Joi.string().pattern(emailRegexp),
  phone: Joi.string().pattern(phoneRegexp),
  favorite: Joi.boolean(),
});

const Contact = model("contact", contactSchema);

module.exports = {
  joiSchema,
  Contact,
};
