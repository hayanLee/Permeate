import { CartItem } from '@/types/cart';
import { useCallback, useState } from 'react';

const useLocalCart = () => {
  const [localCartList, setLocalCartList] = useState<CartItem[]>([]);

  const addLocalCartItem = useCallback((cartItem: CartItem) => {
    const prevCartList = localStorage.getItem('cart');

    if (prevCartList) {
      const parsedPrevCartList = JSON.parse(prevCartList);
      localStorage.setItem('cart', JSON.stringify([...parsedPrevCartList, cartItem]));
      setLocalCartList([...parsedPrevCartList, cartItem]);
    } else {
      localStorage.setItem('cart', JSON.stringify([cartItem]));
      setLocalCartList([cartItem]);
    }
  }, []);

  const deleteLocalCartItem = useCallback((productId: number) => {
    const prevCartList = localStorage.getItem('cart');

    if (prevCartList) {
      const parsedPrevCartList = JSON.parse(prevCartList);
      const filteredCartList = parsedPrevCartList.filter((cartItem: CartItem) => cartItem.productId !== productId);
      localStorage.setItem('cart', JSON.stringify(filteredCartList));
      setLocalCartList(filteredCartList);
    }
  }, []);

  const updateLocalCartItem = useCallback((newCartItem: CartItem) => {
    const prevCartList = localStorage.getItem('cart');

    if (prevCartList) {
      const parsedPrevCartList = JSON.parse(prevCartList);
      const updatedCartList = parsedPrevCartList.map((cartItem: CartItem) =>
        cartItem.productId === newCartItem.productId ? newCartItem : cartItem
      );
      localStorage.setItem('cart', JSON.stringify(updatedCartList));
      setLocalCartList(updatedCartList);
    }
  }, []);

  return { localCartList, setLocalCartList, addLocalCartItem, deleteLocalCartItem, updateLocalCartItem };
};

export default useLocalCart;
