import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";

const input = {
    type: 'a',
    name: 'Product 1',
    price: 100.00
};

describe("Test create product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
           sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
           });
    
           sequelize.addModels([ProductModel]);
           await sequelize.sync();
        });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const productRepository = new ProductRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);

        const result = await createProductUseCase.execute(input);

        const output = {
            id: expect.any(String),
            name: 'Product 1',
            price: 100.00
        }

        expect(result).toStrictEqual(output);
    });
});