'use client'
import React, { useState } from 'react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const products = [
  {
    id: 1,
    name: 'Throwback Hip Bag',
    href: '#',
    color: 'Salmon',
    price: 90.00,
    quantity: 1,
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
    imageAlt:
      'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
  },
  {
    id: 2,
    name: 'Medium Stuff Satchel',
    href: '#',
    color: 'Blue',
    price: 32.00,
    quantity: 1,
    imageSrc:
      'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
    imageAlt:
      'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
  },
  // Add more products...
];

const Checkout = () => {

  const [ open, setOpen ] = useState(false);
  const [cartProducts, setCartProducts] = useState(products);
  const handleIncrement = (productId:any) => {
    const updatedProducts = cartProducts.map((product) =>
      product.id === productId ? { ...product, quantity: product.quantity + 1 } : product
    );
    setCartProducts(updatedProducts);
  };

  const handleDecrement = (productId:any) => {
    const updatedProducts = cartProducts.map((product) =>
      product.id === productId && product.quantity > 0
        ? { ...product, quantity: product.quantity - 1 }
        : product
    );
    setCartProducts(updatedProducts);
  };

  console.log(cartProducts)

  const handleInputChange = (productId:any, newQuantity:any) => {
    const updatedProducts = cartProducts.map((product) =>
      product.id === productId ? { ...product, quantity: newQuantity } : product
    );
    setCartProducts(updatedProducts);
  };

  const calculateSubtotal = () => {
    return cartProducts.reduce((acc, product:any) => {

        return acc + product.quantity * product.price;
      
    }, 0);
  };

  return (
    <>
      <div className="flex h-full flex-col overflow-y-scroll shadow-xl py-4">
        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <div className="flex items-start justify-between">
            <Label className="text-lg font-medium text-gray-900">Product Cart</Label>
          </div>

          <div className="mt-8">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {cartProducts.map((product:any) => (
                  <li key={product.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        alt={product.imageAlt}
                        src={product.imageSrc}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={product.href}>{product.name}</a>
                          </h3>
                          <p className="ml-4">${(product.price * product.quantity).toFixed(2)}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="flex container items-center gap-1">
                          <span className="text-gray-500">Qty:</span>
                          <Input
                            className="w-15 px-2 h-8 text-justify"
                            type="number"
                            min="0"
                            value={product.quantity}
                            onChange={(e) => handleInputChange(product.id, parseInt(e.target.value))}
                          />
                          <div className='flex flex-col gap-0.5 xl:hidden'>
                            <Button
                              onClick={() => handleDecrement(product.id)}
                              className="w-4 h-2"
                            >
                              -
                            </Button>
                            <Button
                              onClick={() => handleIncrement(product.id)}
                              className="w-4 h-2"
                            >
                              +
                            </Button>
                          </div>
                        </div>
                        <div>
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${calculateSubtotal().toFixed(2)}</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
          <div className="mt-6">
            <a
              href="#"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </a>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or{' '}
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;