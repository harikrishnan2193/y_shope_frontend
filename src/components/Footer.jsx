import React from "react";

function Footer() {
  return (
    <div className="bg-gray-800 text-white mx-auto lg:px-lg-padding xl:px-xl-padding">
      <div className="mx-auto py-3 px-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="space-y-3">
          <h4 className="text-xl font-semibold flex items-center">
          <i className="fa-brands fa-shopify text-5xl"></i>
            Y-<span className="font-bold text-red-700">Shop</span>
          </h4>
          <p className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum
            praesentium necessitatibus quasi consequatur nobis.
          </p>
        </div>

        <div className="space-y-3">
          <h4 className="text-lg font-semibold">Links</h4>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-red-700">Home Page</a></li>
            <li><a href="#" className="hover:text-red-700">Cart Page</a></li>
            <li><a href="#" className="hover:text-red-700">All Product</a></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-lg font-semibold">Assistance</h4>
          <ul className="space-y-1">
            <li><a href="#" className="hover:text-red-700">React</a></li>
            <li><a href="#" className="hover:text-red-700">Fontawsiome</a></li>
            <li><a href="#" className="hover:text-red-700">Font Awesome</a></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="text-lg font-semibold">Contact Us</h4>
          <div className="flex">
            <input
              type="text"
              placeholder="Enter your email-id"
              className="p-2 rounded-l-md w-2/3 text-black"
            />
            <button className="bg-red-500 text-white px-4 py-2 rounded-r-md hover:bg-red-700">
              Subscribe
            </button>
          </div>
          <div className="flex space-x-4 mt-4">
            <i className="fa-brands fa-facebook text-2xl hover:text-red-700"></i>
            <i className="fa-brands fa-twitter text-2xl hover:text-red-700"></i>
            <i className="fa-brands fa-whatsapp text-2xl hover:text-red-700"></i>
            <i className="fa-brands fa-instagram text-2xl hover:text-red-700"></i>
            <i className="fa-brands fa-youtube text-2xl hover:text-red-700"></i>
          </div>
        </div>
      </div>

      <div className="text-center text-sm pb-3">
        <p>Copyright © 2023 Y-Shops @ Pvt Ltd</p>
      </div>
    </div>
  );
}

export default Footer;
