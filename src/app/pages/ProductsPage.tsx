import { useEffect } from 'react';
import {
  getProductsFromApi,
  selectProductsState,
} from '../../features/products/productsSlice';
import { useAppDispatch, useAppSelector } from '../hooks';

function Products() {
  const dispatch = useAppDispatch();
  const { products, status, cart } = useAppSelector(
    selectProductsState
  );

  useEffect(() => {
    dispatch(getProductsFromApi());
  }, []);
  return (
    <main className="flex flex-col items-center">
      <div className="flex items-center justify-center p-3 m-2">
        <h1 className="font-sans text-4xl font-medium tracking-wide text-center">
          Products
        </h1>
      </div>
      <section>
        <ul className="grid items-center justify-center gap-4 grid-cols-3 max-w-7xl">
          {products.map((p) => (
            <li key={p.id}>
              {p.title}
              <img src={p.image} alt="" width="150" />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Products;
