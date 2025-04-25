import { Sequelize } from "sequelize-typescript"
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";
import Product from "../../../domain/product/entity/product";

describe("Test find product use case", () => { 
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

    it("should find a product", async () => {
        const productRepository = new ProductRepository();
        const findProductUseCase = new FindProductUseCase(productRepository);

        const product = new Product("1", "Product 1", 100.00);
        await productRepository.create(product);        

        const input = {
            id: "1"
        };        

        const output = {
            id: "1",
            name: 'Product 1',
            price: 100.00
        }

        const result = await findProductUseCase.execute(input);
        expect(result).toEqual(output);
    });
})