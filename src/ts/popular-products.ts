import axios from 'axios';
import { Product } from '../type/products';

const populatePopularProductsList = async () => {
  const products = await getPopularProducts();
  const popularProductsList = document.querySelector(
    '.popular-products-list'
  ) as HTMLElement;

  products.forEach(product =>
    popularProductsList.appendChild(createPopularProductsItem(product))
  );
};

const getPopularProducts = async () => {
  const response = await axios.get<Product[]>(
    'https://food-boutique.b.goit.study/api/products/popular'
  );

  return response.data;
};

const createPopularProductsItem = ({
  name,
  category,
  size,
  popularity,
  img,
}: Omit<Product, '_id' | 'price' | 'is10PercentOff'>): DocumentFragment => {
  const template = document.getElementById(
    'popular-card-template'
  ) as HTMLTemplateElement;

  const clone = template.content.cloneNode(true) as DocumentFragment;

  const imageEl = clone.querySelector(
    '.popular-products-item-image'
  ) as HTMLImageElement;
  imageEl.src = img;
  imageEl.alt = name + ' image';

  const titleEl = clone.querySelector(
    '.popular-products-subtitle'
  ) as HTMLElement;
  titleEl.textContent = name;

  const valuesEls = clone.querySelectorAll(
    '.popular-products-item-descr-item-value'
  ) as NodeListOf<HTMLElement>;
  valuesEls[0].textContent = category.split('_').join(' ');
  valuesEls[1].textContent = size;
  valuesEls[2].textContent = String(popularity);

  return clone;
};

populatePopularProductsList();
