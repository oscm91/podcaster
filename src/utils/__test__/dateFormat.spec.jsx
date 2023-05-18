import { dateFormat } from "../dateFormat";

describe("dateFormat", () => {
  it("formats the date correctly", () => {
    const date = "2023-05-17T00:00:00Z";
    const formattedDate = dateFormat(date);
    expect(formattedDate).toBe("17/5/2023");
  });
});
