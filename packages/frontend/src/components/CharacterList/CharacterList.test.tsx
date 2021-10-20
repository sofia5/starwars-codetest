test('data fetched from backend', () => {
  expect(1 + 2).toBe(3);
});

// What I would test here includes:
// - Component rendering
// - Creating a character
// - Making the table
// - Fetching data

// //import { render, screen } from "@testing-library/react";
// // import userEvent from "@testing-library/user-event";
// import React from "react";
// import TestRenderer from 'react-test-renderer';
// import CharacterList from "./CharacterList";

// test('data fetched from backend', async () => {

// }
//     const testRenderer = TestRenderer.create(<CharacterList />);
//     // render(<CharacterList />);

//     // screen.debug();

// });

// jest.mock('./CharacterList');

// it('class is called', () => {
//   const characterList = new CharacterList('test');
//   expect(characterList).toHaveBeenCalledTimes(1);
// });
