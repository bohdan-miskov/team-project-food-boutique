import axios from 'axios';
import { Product } from '../type/products';

const populateDiscountProductsList = async () => {
  const products = await getDiscountProducts();
  const productsList = document.querySelector(
    '.discount-products-list'
  ) as HTMLElement;

  products.forEach(product =>
    productsList.appendChild(createPopularProductsItem(product))
  );
};

const getDiscountProducts = async () => {
  const response = await axios.get<Product[]>(
    'https://food-boutique.b.goit.study/api/products/discount'
  );

  return response.data;
};

const createPopularProductsItem = ({
  name,
  price,
  img,
}: Pick<Product, 'name' | 'price' | 'img'>): DocumentFragment => {
  const template = document.getElementById(
    'discount-card-template'
  ) as HTMLTemplateElement;

  const clone = template.content.cloneNode(true) as DocumentFragment;

  const imageEl = clone.querySelector(
    '.discount-products-item-image'
  ) as HTMLImageElement;
  imageEl.src = img;
  imageEl.alt = name + ' image';

  const titleEl = clone.querySelector(
    '.discount-products-subtitle'
  ) as HTMLElement;
  titleEl.textContent = name;

  const priceEl = clone.querySelector(
    '.discount-products-item-price'
  ) as HTMLElement;
  priceEl.textContent = '$' + price;

  return clone;
};

populateDiscountProductsList();
