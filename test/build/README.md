While the other test sections test definitions of entities, this section is intended to test the end product of the package, i.e. the build itself. For that reason, the test files in this section should import entities from `dist/` folder, while other sections usually import entities from `src/` folder:

_test/entity.spec.ts_

```ts
import entity from "../src/entity"; // from src/

it("should do something", () => {...
```

_test/build/entity.spec.ts_

```ts
// @ts-ignore
import entity from "../../dist/entity"; // from dist/

it("should do something", () => {...
```

The build output is created from within the test, therefore `dist/` folder might not exist before compiling the test file, since it is outside of the boundaries of project. The workaround is to ignore errors caused by importing entities from `dist/` dir by prepending each import statement with `// @ts-ignore` instruction, if the import location is inside `dist/`.
