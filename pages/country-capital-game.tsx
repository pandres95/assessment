import React, { useState, useEffect } from "react";

type CountryList = { [country: string]: string };

export default function CountryCapitalGame(props: { data: CountryList }) {
  const countries = props.data ?? {} as CountryList;
  const entries = Object.entries<string>(countries).flat();
  entries.sort(() => 0.5 - Math.random());

  const [buttons, setButtons] = useState<string[]>(entries);

  const [status, setStatus] = useState<"initial" | "error">("initial");
  const [selectionStack, setSelectionStack] = useState<string[]>([]);

  useEffect(() => {
    if (selectionStack.length === 2) {
      if (match(selectionStack)) {
        setButtons(buttons.filter((btn) => !selectionStack.includes(btn)));
      } else {
        setStatus(() => "error");
      }

      setTimeout(() => {
        setStatus(() => "initial");
        setSelectionStack(() => []);
      }, 500);
    }
  });

  function match([a, b]: string[]) {
    return countries[a] === b || countries[b] === a;
  }

  function clickButton(btn: string) {
    if (!selectionStack.includes(btn)) {
      setSelectionStack((prev) => [...prev, btn]);
    }
  }

  return (
    <div>
      {(buttons ?? []).map((btn) => {
        const style = {
          backgroundColor: selectionStack.includes(btn)
            ? status === "error"
              ? "red"
              : "blue"
            : "transparent",
        };

        return (
          <button style={style} onClick={() => clickButton(btn)}>
            {btn}
          </button>
        );
      })}
    </div>
  );
}
