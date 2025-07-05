import axios from 'axios';
import { Product } from '../type/products';

type Options = {
  keyword: string;
  page: number;
  limit: number;
  category?: string;
  byABC?: boolean;
  byPrice?: boolean;
  byPopularuty?: boolean;
};

const handleSubmitSearch = async (e: Event) => {
  e.preventDefault();

  const form = e.target as HTMLFormElement;
  const data = new FormData(form);

  const query = data.get('searchQueryInput')?.toString().trim() ?? '';
  const category = data.get('categoriesSelect')?.toString() ?? 'all';
  const sort = data.get('sortSelect')?.toString() ?? 'popularity';

  await searchProducts(query, category, sort);
};

const searchProducts = async (
  query: string,
  category: string,
  sort: string
) => {
  const options = setOptions(query, category, sort);
  const products = await getProductsByFilter(options);

  const productList = document.querySelector('.products-list') as HTMLElement;

  products.forEach(product =>
    productList.appendChild(createCatalogProductsItem(product))
  );
};

const getProductsByFilter = async (options: Options) => {
  const response = await axios.get<Product[]>(
    'https://food-boutique.b.goit.study/api/products',
    { params: options }
  );

  return response.data;
};

const setOptions = (query: string, category: string, sort: string): Options => {
  const options: Options = {
    keyword: query,
    page: 1,
    limit: 6,
  };

  if (category != 'all') {
    options['category'] = category;
  }

  switch (sort) {
    case 'popularity': {
      options.byPopularuty = true;
      break;
    }
    case 'alph_asc': {
      options.byABC = true;
      break;
    }
    case 'alph_desc': {
      options.byABC = false;
      break;
    }
    case 'price_asc': {
      options.byPrice = true;
      break;
    }
    case 'price_desc': {
      options.byABC = false;
      break;
    }
  }

  return options;
};

const createCatalogProductsItem = ({
  img,
  name,
  category,
  size,
  price,
  popularity,
}: Omit<Product, '_id' | 'is10PercentOff'>) => {
  const template = document.getElementById(
    'products-card-template'
  ) as HTMLTemplateElement;
  const clone = template.content.cloneNode(true) as DocumentFragment;

  const imageEl = clone.querySelector(
    '.products-item-image'
  ) as HTMLImageElement;
  imageEl.src = img;
  imageEl.alt = name + ' image';

  const titleEl = clone.querySelector('.products-subtitle') as HTMLElement;
  titleEl.textContent = name;

  const valuesEl = clone.querySelectorAll(
    '.products-item-descr-item-value'
  ) as NodeListOf<HTMLElement>;
  valuesEl[0].textContent = category.split('_').join(' ');
  valuesEl[1].textContent = size;
  valuesEl[2].textContent = popularity.toString();

  const priceEl = clone.querySelector('.products-item-price') as HTMLElement;
  priceEl.textContent = price.toString();

  return clone;
};

document.addEventListener('DOMContentLoaded', async () => {
  const productForm = document.querySelector(
    '.filters-form'
  ) as HTMLFormElement;
  if (!productForm) return;
  productForm.addEventListener('submit', handleSubmitSearch);

  const data = new FormData(productForm);

  const query = data.get('searchQueryInput')?.toString().trim() ?? '';
  const category = data.get('categoriesSelect')?.toString() ?? 'all';
  const sort = data.get('sortSelect')?.toString() ?? 'popularity';

  await searchProducts(query, category, sort);
});
