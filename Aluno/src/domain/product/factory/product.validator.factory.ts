import ValidatorInterface from "../../@shared/validator/validator.interface";
import Product from "../entity/product";
import ProductYupValidator from "../validator/product.yup.validator";

export default class ProductValidatorFactory {
  static createValidator(): ValidatorInterface<Product> {
    return new ProductYupValidator();
  }
}