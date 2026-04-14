import { useQuery } from '@tanstack/react-query';

interface Product {
  id: number;
  price: number;
  discountPercentage: number;
}

export function useMetrics() {
  return useQuery({
    queryKey: ['metrics'],
    queryFn: async () => {
      const response = await fetch('https://dummyjson.com/products');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const products: Product[] = data.products;

      const totalCost = products.reduce((acc, p) => acc + p.price, 0);
      const usage = products.length;
      const totalSavings = products.reduce((acc, p) => acc + (p.price * p.discountPercentage) / 100, 0);

      return {
        totalCost: Math.round(totalCost),
        usage,
        savings: Math.round(totalSavings),
      };
    },
  });
}
