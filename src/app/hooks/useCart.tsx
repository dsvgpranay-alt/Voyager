import React from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cart: Record<string, number>;
  cartItems: CartItem[];
  addToCart: (id: string, name: string, price: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = React.createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = React.useState<Record<string, number>>({});
  const [itemDetails, setItemDetails] = React.useState<Record<string, { name: string; price: number }>>({});

  const addToCart = React.useCallback((id: string, name: string, price: number) => {
    setCart(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
    setItemDetails(prev => ({
      ...prev,
      [id]: { name, price }
    }));
  }, []);

  const removeFromCart = React.useCallback((id: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      delete newCart[id];
      return newCart;
    });
    setItemDetails(prev => {
      const newDetails = { ...prev };
      delete newDetails[id];
      return newDetails;
    });
  }, []);

  const updateQuantity = React.useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart(prev => ({
        ...prev,
        [id]: quantity
      }));
    }
  }, [removeFromCart]);

  const clearCart = React.useCallback(() => {
    setCart({});
    setItemDetails({});
  }, []);

  const getTotalItems = React.useCallback(() => {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  }, [cart]);

  const getTotalPrice = React.useCallback(() => {
    return Object.entries(cart).reduce((sum, [id, quantity]) => {
      const details = itemDetails[id];
      return sum + (details ? details.price * quantity : 0);
    }, 0);
  }, [cart, itemDetails]);

  const cartItems: CartItem[] = React.useMemo(() => {
    return Object.entries(cart).map(([id, quantity]) => ({
      id,
      quantity,
      name: itemDetails[id]?.name || '',
      price: itemDetails[id]?.price || 0
    }));
  }, [cart, itemDetails]);

  return (
    <CartContext.Provider value={{
      cart,
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = React.useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}