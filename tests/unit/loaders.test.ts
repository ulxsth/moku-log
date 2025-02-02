import { execute } from "@/commands/create";
import { loadEventListeners } from "@/loaders";
import * as fs from "node:fs";

jest.mock("fs");
jest.mock("path");
jest.mock("@/src", () => ({
  client: {
    on: jest.fn(),
    once: jest.fn(),
    emit: jest.fn(),
  },
}));

const importMock = jest.fn().mockResolvedValue({
  name: "test",
  execute: jest.fn()
})

describe("loadEventListeners", () => {
  const mockEventFiles = ["event1.ts", "event2.ts", "event3.ts"];
  
  describe("正常系", () => {
    it("./src/events 内に読み込むべきファイルがあれば、それを読み込む", async () => {
      (fs.readdirSync as jest.Mock).mockReturnValue(mockEventFiles);
      jest.mocked = (filePath: string) => importMock(filePath);

      await loadEventListeners();

      for (const file of mockEventFiles) {
        expect(importMock).toHaveBeenCalledWith(`@/events/${file}`);
      }
    });
  });

  describe("異常系", () => {
  });
});
