import React, { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYXabcdefghijklmnopqrstuvwxyz";

    if (number) str += "0123456789";
    if (character) str += "!@#$%^&*(){}[]~_-=+";

    for (let i = 1; i <= length; i++) {
      const random = Math.random() * str.length + 1;
      let index = Math.floor(random);

      pass += str.charAt(index);
    }
    setPassword(pass);
  }, [length, number, character, setPassword]);

  const copyPasswordtoClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, length);
    window.navigator.clipboard.writeText(password);
  }, [length, password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, number, character]);

  return (
    <>
      <div className=" w-full max-w-md mx-auto text-xl  bg-gray-700 shadow-md rounded-lg px-5 py-4 my-8 text-red-600">
        <h1 className="text-white text-center my-3"> Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outlin-none w-full py-2 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordtoClipboard}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0  "
          >
            Copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={60}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                const val = e.target.value;
                setLength(Number(val));
              }}
            />
            <label>Length:{length}</label>
          </div>
          <div className="flex item-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={number}
              id="numberInput"
              onChange={() => {
                setNumber((prev) => !prev);
              }}
            />
            <label>Numbers</label>

            <div className="flex item-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={character}
                id="characterInput"
                onChange={() => {
                  setCharacter((prev) => !prev);
                }}
              />
              <label>Character</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
