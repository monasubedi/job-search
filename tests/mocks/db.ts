import { faker } from "@faker-js/faker";
import { factory, primaryKey } from "@mswjs/data";

export const db = factory({
  user: {
    id: primaryKey(faker.number.int),
    username: faker.person.fullName,
    email: faker.person.firstName,
    password: faker.lorem.word,
    role: faker.book.genre,
  },
});
