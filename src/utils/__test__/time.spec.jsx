import { time } from "../time";

describe("time", () => {
  it("formats milliseconds into HH:mm:ss format", () => {
    // 1 hora, 30 minutos, 45 segundos en milisegundos
    const ms = 1 * 60 * 60 * 1000 + 30 * 60 * 1000 + 45 * 1000;

    const formattedTime = time(ms);

    expect(formattedTime).toBe("01:30:45");
  });

  it("formats milliseconds into mm:ss format when there are no hours", () => {
    // 25 minutos, 12 segundos en milisegundos
    const ms = 25 * 60 * 1000 + 12 * 1000;

    const formattedTime = time(ms);

    expect(formattedTime).toBe("25:12");
  });

  it("formats milliseconds into mm:ss format when the input is less than 1 hour", () => {
    // 10 minutos, 5 segundos en milisegundos
    const ms = 10 * 60 * 1000 + 5 * 1000;

    const formattedTime = time(ms);

    expect(formattedTime).toBe("10:05");
  });

  it("formats milliseconds into mm:ss format when the input is less than 1 minute", () => {
    // 45 segundos en milisegundos
    const ms = 45 * 1000;

    const formattedTime = time(ms);

    expect(formattedTime).toBe("00:45");
  });

  it("formats milliseconds into mm:ss format when the input is 0", () => {
    const ms = 0;

    const formattedTime = time(ms);

    expect(formattedTime).toBe("00:00");
  });
});
