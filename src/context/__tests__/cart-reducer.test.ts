import { cartReducer, initialCartState } from "@/context/cart-reducer";

const product = {
  id: 1,
  title: "A",
  price: 10,
  description: "desc",
  category: "cat",
  image: "img",
};

describe("cartReducer", () => {
  it("adds item", () => {
    const result = cartReducer(initialCartState, { type: "ADD_ITEM", payload: product });
    expect(result.items).toHaveLength(1);
    expect(result.items[0].quantity).toBe(1);
  });

  it("increments qty if item exists", () => {
    const once = cartReducer(initialCartState, { type: "ADD_ITEM", payload: product });
    const twice = cartReducer(once, { type: "ADD_ITEM", payload: product });
    expect(twice.items[0].quantity).toBe(2);
  });

  it("updates qty", () => {
    const once = cartReducer(initialCartState, { type: "ADD_ITEM", payload: product });
    const result = cartReducer(once, { type: "UPDATE_QTY", payload: { id: 1, quantity: 4 } });
    expect(result.items[0].quantity).toBe(4);
  });

  it("removes item", () => {
    const once = cartReducer(initialCartState, { type: "ADD_ITEM", payload: product });
    const result = cartReducer(once, { type: "REMOVE_ITEM", payload: { id: 1 } });
    expect(result.items).toHaveLength(0);
  });

  it("clears cart", () => {
    const once = cartReducer(initialCartState, { type: "ADD_ITEM", payload: product });
    const result = cartReducer(once, { type: "CLEAR" });
    expect(result.items).toHaveLength(0);
  });
});
