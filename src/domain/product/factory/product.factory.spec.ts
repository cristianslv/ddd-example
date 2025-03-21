import ProductFactory from "./product.factory";

describe("ProductFactory unit tests", () => {
  it("should create a product type a", () => {
    const product = ProductFactory.create("a", "Product A", 1);

    expect(product.id).toBeDefined();
    expect(product.name).toBe("Product A");
    expect(product.price).toBe(1);
    expect(product.constructor.name).toBe("Product");
  });

  it("should create a product type b", () => {
    const productB = ProductFactory.create("b", "Product B", 1);

    expect(productB.id).toBeDefined();
    expect(productB.name).toBe("Product B");
    expect(productB.price).toBe(2);
    expect(productB.constructor.name).toBe("ProductB");
  });

  it("should throw an error when the product type is not supported", () => {
    expect(() => ProductFactory.create("c", "Product C", 1)).toThrowError("Product type not supported");
  });
});
