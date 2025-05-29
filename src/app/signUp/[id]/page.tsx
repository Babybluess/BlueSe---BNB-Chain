'use client';
import React, { useEffect, useState } from 'react';
import { ButtonSignUp } from '@/components';
import { usePathname } from 'next/navigation';


function page() {
  const [newEnsName, setNewEnsName] = useState<string>('');
  const [duration, setDuration] = useState<number>(0);
  const [idDuration, setIDDuration] = useState<number>(-1);
  const pathname = usePathname();
  const params = pathname.split('/');

  const chooseduration = (duration: number, id: number) => {
    setDuration(duration);
    setIDDuration(id);
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex items-center mb-2 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className=" h-20 mr-2" src="../images/BlueSe_logo.png" alt="logo" />
        </div>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create account with ENS domain
            </h1>
            <div className="space-y-4 md:space-y-6">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your web3 username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="diamondBoi.eth"
                  onChange={(item: any) => setNewEnsName(item.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Duration</label>
                <div className=" flex gap-2">
                  <div
                    id="1"
                    className={`p-2 ${idDuration == 1 ? ' bg-[#60A6FA] text-[#D1E4FF] ' : ' bg-[#D1E4FF] text-blue-400 '} rounded-xl font-semibold cursor-pointer`}
                    onClick={() => chooseduration(2592000, 1)}
                  >
                    1 month
                  </div>
                  <div
                    id="2"
                    className={`p-2 ${idDuration == 2 ? ' bg-[#60A6FA] text-[#D1E4FF] ' : ' bg-[#D1E4FF] text-blue-400 '} rounded-xl font-semibold cursor-pointer`}
                    onClick={() => chooseduration(31536000, 2)}
                  >
                    1 year
                  </div>
                  <div
                    id="3"
                    className={`p-2 ${idDuration == 3 ? ' bg-[#60A6FA] text-[#D1E4FF] ' : ' bg-[#D1E4FF] text-blue-400 '} rounded-xl font-semibold cursor-pointer`}
                    onClick={() => chooseduration(63072000, 3)}
                  >
                    2 years
                  </div>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label className="font-light text-gray-500 dark:text-gray-300">
                    I accept the{' '}
                    <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="..">
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <ButtonSignUp newEnsName={newEnsName} address={params[2].split('&')[0]} duration={duration}/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default page;
