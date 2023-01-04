import * as React from "react";

// You can also use class components
export default class CountryCapitalGame extends React.Component {
  entries: [string, string][];
  buttons: string[];
  selectionStack: string[];
  errorStack: string[];

  constructor(props) {
    super(props);

    this.entries = Object.entries(props.data);
    this.buttons = this.entries.flat();
    this.buttons.sort(() => 0.5 - Math.random());

    this.selectionStack = [];
    this.errorStack = [];
  }

  match(selection) {
    for (const entryIx in this.entries) {
      const entry = this.entries[entryIx];
      let count = 0;

      for (const selected of selection) {
        if (!entry.includes(selected)) {
          count++;
        }
      }

      if (count === 2) {
        return [true, entryIx];
      }
    }

    return [false, -1];
  }

  clickButton(btn) {
    if (!this.selectionStack.includes(btn)) {
      this.selectionStack.push(btn);
    }

    if (this.selectionStack.length === 2) {
      const [matches, entryIndex] = this.match(this.selectionStack);
      if (matches) {
        this.entries.splice(entryIndex, 1);
      } else {
        this.errorStack = this.selectionStack;
        setTimeout(() => {
          this.errorStack = this.selectionStack = [];
        }, 500);
      }
    }
  }

  render() {
    return (
      <div>
        {this.buttons.map((btn) => {
          const style = {
            backgroundColor: this.selectionStack.includes(btn)
              ? "blue"
              : this.errorStack.includes(btn)
              ? "red"
              : "transparent",
          };
          
          return (
            <button style={style} onClick={() => this.clickButton(btn)}>
              {btn}
            </button>
          );
        })}
      </div>
    );
  }
}
