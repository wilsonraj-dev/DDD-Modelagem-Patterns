import { toXML } from "jstoxml";
import { OutputListCustomerDto } from "../../../usecase/customer/list/list.customer.dto";

export default class CustomerPresenter {

    static toXML(customer: OutputListCustomerDto): string {

        const xmlOption = {
            header: true,
            indent: "  ",
            newLine: "\n",
            allowEmpty: true,
        };

        const xml = toXML(
            {
                customers: {
                    customer: customer.customers.map((customer) => ({
                        id: customer.id,
                        name: customer.name,
                        address: {
                            street: customer.address.street,
                            number: customer.address.number,
                            zipCode: customer.address.zip,
                            city: customer.address.city,
                        },
                    })),
                },
            },
            xmlOption
        );

        return xml;
    }
}