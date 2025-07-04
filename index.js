const state = {
  bank: [],
  evens: [],
  odds: []
};


function createFormComponent() {
  const form = document.createElement('form');
  const input = document.createElement('input');
  input.type = 'number';
  input.placeholder = 'Enter number';
  input.required = true;

  const button = document.createElement('button');
  button.textContent = 'Add Number';
  button.type = 'submit';

  form.appendChild(input);
  form.appendChild(button);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = Number(input.value);
    if (!isNaN(value)) {
      state.bank.push(value);
      input.value = '';
      render();
    }
  });

  return form;
}


function createSortControls() {
  const container = document.createElement('div');

  const sortOne = document.createElement('button');
  sortOne.textContent = 'Sort 1';
  sortOne.addEventListener('click', () => {
    const num = state.bank.shift();
    if (num !== undefined) {
      (num % 2 === 0 ? state.evens : state.odds).push(num);
      render();
    }
  });

  const sortAll = document.createElement('button');
  sortAll.textContent = 'Sort All';
  sortAll.addEventListener('click', () => {
    while (state.bank.length) {
      const num = state.bank.shift();
      (num % 2 === 0 ? state.evens : state.odds).push(num);
    }
    render();
  });

  container.appendChild(sortOne);
  container.appendChild(sortAll);
  return container;
}


function createList(title, items) {
  const container = document.createElement('div');
  const heading = document.createElement('h3');
  heading.textContent = title;

  const list = document.createElement('ul');
  for (const item of items) {
    const li = document.createElement('li');
    li.textContent = item;
    list.appendChild(li);
  }

  container.appendChild(heading);
  container.appendChild(list);
  return container;
}


function render() {
  const app = document.getElementById('app');
  app.innerHTML = '';

  app.appendChild(createFormComponent());
  app.appendChild(createSortControls());
  app.appendChild(createList('Number Bank', state.bank));
  app.appendChild(createList('Even Numbers', state.evens));
  app.appendChild(createList('Odd Numbers', state.odds));
}


document.addEventListener('DOMContentLoaded', () => {
  const root = document.createElement('div');
  root.id = 'app';
  document.body.appendChild(root);
  render();
});
