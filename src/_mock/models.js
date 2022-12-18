import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const users = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  image: `/assets/images/covers/cover_${index + 1}.jpg`,
  title: faker.datatype.string(),
  createdAt: faker.date.past(),
  modifiedAt: faker.date.past(),
  name: faker.name.fullName(),
}));

export default users;
