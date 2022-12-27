// const apiUrl = 'http://localhost:8787';
const apiUrl = 'https://cloudworker-cms.sesamy-dev.workers.dev';

export async function getModels() {
  const response = await fetch(`${apiUrl}/models`);
  const body = await response.json();

  return body;
}

export async function getModel(id) {
  const response = await fetch(`${apiUrl}/models/${id}`);
  const body = await response.json();

  return body;
}

export async function saveModel(id, model) {
  await fetch(`${apiUrl}/models/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(model),
    headers: {
      'content-type': 'application/json',
    },
  });
}

export async function createModel(model) {
  await fetch(`${apiUrl}/models`, {
    method: 'POST',
    body: JSON.stringify(model),
    headers: {
      'content-type': 'application/json',
    },
  });
}

export async function getBlocks() {
  const response = await fetch(`${apiUrl}/blocks`);
  const body = await response.json();

  return body;
}

export async function getBlock(id) {
  const response = await fetch(`${apiUrl}/blocks/${id}`);
  const body = await response.json();

  return body;
}

export async function saveBlock(id, block) {
  await fetch(`${apiUrl}/blocks/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(block),
    headers: {
      'content-type': 'application/json',
    },
  });
}

export async function createBlock(block) {
  await fetch(`${apiUrl}/blocks`, {
    method: 'POST',
    body: JSON.stringify(block),
    headers: {
      'content-type': 'application/json',
    },
  });
}

export async function createField(field) {
  await fetch(`${apiUrl}/fields`, {
    method: 'POST',
    body: JSON.stringify(field),
    headers: {
      'content-type': 'application/json',
    },
  });
}

export async function getFieldsForModel(modelId) {
  const response = await fetch(`${apiUrl}/fields?modelId=${modelId}`);
  const body = await response.json();

  return body;
}
