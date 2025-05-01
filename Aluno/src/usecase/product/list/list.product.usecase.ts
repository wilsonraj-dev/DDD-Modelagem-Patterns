import ProductRepositoryInterface from "../../../domain/product/repository/product-repository-interface";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { InputListProductDTO, OutputListProductDTO } from "./list.product.dto";

export default class ListProductUseCase {
    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    async execute(input: InputListProductDTO = {}): Promise<OutputListProductDTO> {
        const products = await this.productRepository.findAll();
        
        return {
            products: products.map((product) => {
                return {
                    id: product.id,
                    name: product.name,
                    price: product.price,
                };
            }),
        };
    }
}