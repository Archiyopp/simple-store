import { Products } from '../../types';

const baseUrl = 'https://fakestoreapi.com/';
export const getAllProducts = async () => {
  const response = await fetch(`${baseUrl}/products`);
  const data: Products[] = await response.json();
  return data;
};
