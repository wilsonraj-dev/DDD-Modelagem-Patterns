import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

const product = new Product("1", "Product 1", 100.00);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        create: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn(),
    };
}

describe("Unit Test find product use case", () => {
    
    it("should find a product", async () => {
        const productRepository = MockRepository();
        const usecase = new FindProductUseCase(productRepository);

        const input = {
            id: "1"
        };

        const output = {
            id: "1",
            name: 'Product 1',
            price: 100.00
        }

        const result = await usecase.execute(input);
        expect(result).toEqual(output);
    });

    it("should not find a product", async () => {
        const productRepository = MockRepository();
        
        productRepository.find.mockImplementation(() => {
            throw new Error("Product not found");
        });

        const usecase = new FindProductUseCase(productRepository);

        const input = {
            id: "1"
        };

        expect(() => usecase.execute(input)).rejects.toThrow("Product not found");
    });
})