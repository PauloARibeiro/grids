const buttons = document.querySelectorAll('[data-add]');

buttons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const divideAmount = event.target.getAttribute('data-add');

    canvas.addLayout(layouts[divideAmount]);
  });
});

const canvas = {
  container: document.querySelector('.right-panel'),
  deleteButton: document.querySelector('[data-delete]'),
  selectedNode: '',

  addLayout(template) {
    if (!this.selectedNode) {
      return this.container.append(template());
    }

    // this.selectedNode.innerHTML = '';
    // this.selectedNode.append(template());

    const templateElement = template();
    const divideAmount = parseInt(
      templateElement.getAttribute('data-divide-amount')
    );
    const dividerColumn = templateElement.getAttribute('data-divide');
    const currentDivide = parseFloat(
      this.selectedNode.style.maxWidth.replace('%', '')
    );

    const parent = this.selectedNode.parentElement;
    const parentDivideAmount = parseInt(
      parent.getAttribute('data-divide-amount')
    );

    this.selectedNode.textContent = '';

    parent.setAttribute(
      'data-divide-amount',
      parentDivideAmount + divideAmount
    );

    const bgColor = getRandomColor();
    const id = uuidv4();

    for (let index = 0; index < divideAmount; index++) {
      const div = document.createElement('div');

      div.setAttribute(
        'style',
        `flex: 0 0 ${currentDivide / divideAmount}%; max-width: ${
          currentDivide / divideAmount
        }%; 
        background: ${bgColor};
        outline: 1px dashed white;`
      );

      div.setAttribute('data-id', id);

      div.textContent = `col ${divideAmount}`;

      this.selectedNode.append(div);

      if (index === divideAmount - 1) {
        this.selectedNode.replaceWith(...this.selectedNode.childNodes);
      }
    }

    this.selectedNode = null;
  },

  deleteNode() {
    const id = this.selectedNode.getAttribute('data-id');
    console.log(id);
  },

  selectNode(node) {
    this.selectedNode = node;

    const leftOffset = this.selectedNode.offsetLeft;
    const selectedNodeWidth = this.selectedNode.getBoundingClientRect().width;
    const buttonWidth = this.deleteButton.getBoundingClientRect().width;

    this.deleteButton.parentElement.style.left =
      leftOffset + selectedNodeWidth - buttonWidth + 'px';
  },

  init() {
    this.container.addEventListener('click', (event) =>
      this.selectNode(event.target)
    );
    this.deleteButton.addEventListener('click', () => this.deleteNode());
  },
};

canvas.init();

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
