import React from 'react';

export const MembersTable = () => {
  return (
    <section className=" text-black p-4 mt-10 md:mt-0">
      <div className="mb-4 px-4 text-white">

        <table className='w-full border-collapse border-2 border-black text-left'>
            <thead className='border-2 border-black bg-gray-800'>
                <th className='p-2'>Client</th>
                <th>Contact</th>
                <th>Plan</th>
                <th>Assign Workout</th>
                <th>Edit</th>
            </thead>
            <tbody className='text-black'>
              <tr>
                {/* photo */}
                <td className='p-2'>
                  <div className='flex items-center gap-2'>
                    <img src="https://placehold.co/400" alt="Client" className='rounded-full w-16' />
                    <span>John Doe</span>
                  </div>
                </td>
                <td className='p-2'>+44123456789</td>
                <td className='p-2'>Premium</td>
                <td className='p-2'>
                  <button className='bg-blue-500 text-white px-4 py-2 rounded'>Assign</button>
                </td>
                <td className='p-2'>
                  <button className='bg-yellow-500 text-white px-4 py-2 rounded'>Edit</button>
                </td>
              </tr>
            </tbody>
        </table>

      </div>
    </section>
    )
};