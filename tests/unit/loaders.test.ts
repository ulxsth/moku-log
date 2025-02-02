import { execute } from "@/commands/create";
import { loadEventListeners } from "@/loaders";
import * as fs from "node:fs";

jest.mock("fs");
jest.mock("path");


describe("loadEventListeners", () => {
  const mockEventFiles = ["event1.ts", "event2.ts", "event3.ts"];
  
  describe("正常系", () => {
    it("onceをtrueとしてexportしているtsファイルがあれば、そのイベントはClient.onceに引数として渡される", () => {
      
      // then
      
    }) 
  });

  describe("異常系", () => {
  });
});
