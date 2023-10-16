const { faker } = require("@faker-js/faker");

const createCustomer = (amount) => {
  const customers = [];

  for (let i = 0; i < amount; i++) {
    const id = faker.string.uuid();

    const customer = {
      PK: "customer",
      SK: `customer#${id}`,
      id,
      name: faker.person.fullName(),
      age: faker.number.int({ min: 18, max: 90 }),
      email: faker.internet.email(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      zip: faker.location.zipCode(),
      phone: faker.phone.number(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    customers.push(customer);
  }

  return customers;
};

const customers = createCustomer(100);

module.exports = customers;
