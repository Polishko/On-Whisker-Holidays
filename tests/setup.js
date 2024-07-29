import { expect, describe, it, vi, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

globalThis.describe = describe;
globalThis.it = it;
globalThis.expect = expect;
globalThis.vi = vi;
globalThis.afterEach = afterEach;

expect.extend(matchers);

afterEach(() => {
  cleanup();
});
