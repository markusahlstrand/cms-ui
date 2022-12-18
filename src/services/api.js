import { faker } from '@faker-js/faker';

const models = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  image: `/assets/images/covers/cover_${index + 1}.jpg`,
  createdAt: faker.date.past(),
  modifiedAt: faker.date.past(),
  name: faker.word.noun(),
  description: faker.lorem.paragraph(),
}));

// const apiUrl = 'http://localhost:8787';
const apiUrl = 'https://cloudworker-cms.sesamy-dev.workers.dev';

export async function getModels() {
  const response = await fetch(`${apiUrl}/models`);
  const body = await response.json();

  return body.map((item) => ({
    ...item,
    createdAt: new Date(),
    modifiedAt: new Date(),
  }));
  //   return models;
}

export async function getModel(id) {
  const response = await fetch(`${apiUrl}/models/${id}`);
  const body = await response.json();

  return {
    ...body,
    createdAt: new Date(),
    modifiedAt: new Date(),
  };

  //   return models.find((model) => model.id === id);
}

export async function saveModel(id, model) {
  await fetch(`${apiUrl}/models/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(model),
    headers: {
      'content-type': 'application/json',
    },
  });
  //   const index = models.findIndex((model) => model.id === id);
  //   models[index] = {
  //   ...models[index],
  //     ...value,
  //     modifiedAt: new Date(),
  //   };
}

export async function createModel(model) {
  await fetch(`${apiUrl}/models`, {
    method: 'POST',
    body: JSON.stringify(model),
    headers: {
      'content-type': 'application/json',
    },
  });
  //   const index = models.findIndex((model) => model.id === id);
  //   models[index] = {
  //   ...models[index],
  //     ...value,
  //     modifiedAt: new Date(),
  //   };
}
