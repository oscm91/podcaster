import storage from "../storage";

describe("storage", () => {
  beforeEach(() => {
    localStorage.clear(); // Limpia el almacenamiento local antes de cada prueba
  });

  it("sets and gets data correctly", () => {
    const key = "myKey";
    const value = { name: "John", age: 30 };

    storage.set(key, value);
    const retrievedValue = storage.get(key);

    expect(retrievedValue).toEqual(value);
  });

  it("returns default value when data is not found", () => {
    const key = "myKey";
    const defaultValue = "default";

    const retrievedValue = storage.get(key, defaultValue);

    expect(retrievedValue).toBe(defaultValue);
  });

  it("removes data correctly", () => {
    const key = "myKey";
    const value = { name: "John", age: 30 };

    storage.set(key, value);
    storage.remove(key);
    const retrievedValue = storage.get(key);

    expect(retrievedValue).toBeUndefined();
  });

  it("clears all data correctly", () => {
    const key1 = "key1";
    const key2 = "key2";
    const value1 = "value1";
    const value2 = "value2";

    storage.set(key1, value1);
    storage.set(key2, value2);
    storage.clear();
    const retrievedValue1 = storage.get(key1);
    const retrievedValue2 = storage.get(key2);

    expect(retrievedValue1).toBeUndefined();
    expect(retrievedValue2).toBeUndefined();
  });
});
