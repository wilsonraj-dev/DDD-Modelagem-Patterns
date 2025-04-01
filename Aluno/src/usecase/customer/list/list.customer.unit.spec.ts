import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";

const customerOne = CustomerFactory.createWithAddress("Jhon Doe", new Address("Street 1", 1, "12345", "City"));

const customerTwo = CustomerFactory.createWithAddress("Jane Doe", new Address("Street 2", 2, "123456", "City 2"));

const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        update: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customerOne, customerTwo])),
    };
};

describe("Unit test for listing customer use case", () => {
    it("should list a customer", async () => {
        const repository = MockRepository();
        const useCase = new ListCustomerUseCase(repository);

        const output = await useCase.execute({});

        expect(output.customers.length).toBe(2);
        expect(output.customers[0].id).toBe(customerOne.id);
        expect(output.customers[0].name).toBe(customerOne.name);
        expect(output.customers[0].address.street).toBe(customerOne.Address.street);

        expect(output.customers[1].id).toBe(customerTwo.id);
        expect(output.customers[1].name).toBe(customerTwo.name);
        expect(output.customers[1].address.street).toBe(customerTwo.Address.street);
    });
});