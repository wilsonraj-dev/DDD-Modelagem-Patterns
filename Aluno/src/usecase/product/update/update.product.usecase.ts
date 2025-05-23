import ProductRepositoryInterface from "../../../domain/product/repository/product-repository-interface";
import { InputUpdateProductDTO, OutputUpdateProductDTO } from "./update.product.dto";

export default class UpdateProductUseCase {
    private productRepository: ProductRepositoryInterface;

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository;
    }

    async execute(input: InputUpdateProductDTO): Promise<OutputUpdateProductDTO> {
        const product = await this.productRepository.find(input.id);

        product.changeProductName(input.name);
        product.changeProductPrice(input.price);

        return {
            id: product.id,
            name: product.name, 
            price: product.price,
        };
    }

}