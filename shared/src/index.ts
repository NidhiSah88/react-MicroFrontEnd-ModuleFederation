export const CART_ADD_EVENT = "microshop:cart:add";

export const CART_STORAGE_KEY = "microshop-cart";

export type CartAddDetail = {
    id: string;
    name: string;
    price: number;
}

export type CartItem = CartAddDetail & {
   quantity: number;

};


export function readCartItems(): CartItem[] {
    console.log("Reading cart items from sessionStorage");

    const raw = sessionStorage.getItem(CART_STORAGE_KEY);
    console.log("Reading cart Raw:::: ", raw);

    if (!raw) {
        return [];
    }
    try {
        const items = JSON.parse(raw) as CartItem[];
    console.log("Reading cart items:::: ", items);

        return items;
    } catch (e) {
        console.error("Failed to parse cart items from sessionStorage", e);
        return [];
    }   

    
} 


export function writeCartItems(items: CartItem[]) {
    console.log("Writing cart items to sessionStorage");

    sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
} 


export function addProductToCart(product: CartAddDetail) {
    console.log("Adding product to cart", product);

    const items = readCartItems();
    const existingItem = items.find(item => item.id === product.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        items.push({ ...product, quantity: 1 });
    }
    // write item in storage so that it can be used in other microfrontends
    writeCartItems(items);

    window.dispatchEvent(new CustomEvent<CartAddDetail>(CART_ADD_EVENT, { detail: product }));

}









