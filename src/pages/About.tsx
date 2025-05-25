import React from 'react'
import { ArrowRightIcon } from 'lucide-react'
export const About = () => {
  return (
    <div className="bg-white w-full">
      <div className="relative bg-black text-white py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Connor <span className="text-blue-600">SNOW</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl">
            Your journey to peak fitness starts with us. We're more than just a
            gym - we're your partners in transformation.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16"></div>
      </div>
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia placeat aperiam ullam non numquam dolorem repellendus nostrum dolor molestiae omnis inventore, impedit dignissimos voluptatibus laboriosam mollitia veniam expedita quos velit.
            </p>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque accusamus minima quibusdam eos. Odio doloribus sapiente magnam doloremque, maxime deleniti, ullam soluta eos laborum enim aliquid dolorum consequuntur, omnis nihil.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -top-4 -right-4 w-full h-full border-t-4 border-r-4 border-red-500"></div>
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
              alt="Gym equipment"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-50 p-8">
            <h3 className="text-xl font-bold mb-4">Expert Trainers</h3>
            <p className="text-gray-600">
              Our certified trainers bring years of experience and expertise to
              help you achieve your fitness goals safely and effectively.
            </p>
          </div>
          <div className="bg-gray-50 p-8">
            <h3 className="text-xl font-bold mb-4">Modern Facilities</h3>
            <p className="text-gray-600">
              Train with state-of-the-art equipment in a clean, motivating
              environment designed to help you perform at your best.
            </p>
          </div>
          <div className="bg-gray-50 p-8">
            <h3 className="text-xl font-bold mb-4">Personalized Approach</h3>
            <p className="text-gray-600">
              Every fitness journey is unique. We create customized programs
              tailored to your specific goals and needs.
            </p>
          </div>
        </div>
        <div className="bg-black text-white p-8 md:p-16">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0 md:mr-8">
              <h2 className="text-3xl font-bold mb-4">Ready to Join Us?</h2>
              <p className="text-gray-300">
                Start your fitness journey today with a free consultation.
              </p>
            </div>
            <button className="bg-blue-600 px-8 py-4 font-medium flex items-center hover:bg-blue-500 transition-colors">
              Get Started <ArrowRightIcon className="ml-2" size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default About