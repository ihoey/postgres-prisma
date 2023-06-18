import prisma from "@/lib/prisma";
import { timeAgo } from "@/lib/utils";
// import Image from "next/image";
import RefreshButton from "./refresh-button";

export default async function Table() {
  const startTime = Date.now();
  const temperatures = await prisma.temperature.findMany();
  const stores = await prisma.stores.findMany();
  const duration = Date.now() - startTime;

  for (const temperature of temperatures) {
    const user = await prisma.users.findUnique({
      where: {
        id: temperature.userId,
      },
    });
    // @ts-ignore
    temperature.user = user;
  }
  for (const store of stores) {
    const user = await prisma.users.findUnique({
      where: {
        id: store.userId,
      },
    });
    // @ts-ignore
    store.user = user;
  }

  return (
    <>
      <div className='bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full mb-2'>
        <div className='flex justify-between items-center mb-4'>
          <div className='space-y-1'>
            <h2 className='text-xl font-semibold'>记录</h2>
            <p className='text-sm text-gray-500'>
              Fetched {stores.length} in {duration}ms
            </p>
          </div>
          <RefreshButton />
        </div>
        <div className='divide-y divide-gray-900/5'>
          {stores.map((store) => (
            <div key={store.id} className='flex items-center justify-between py-3'>
              <div className='flex items-center space-x-4'>
                {/* <Image
                src={user.image}
                alt={user.name}
                width={48}
                height={48}
                className='rounded-full ring-1 ring-gray-900/5'
              /> */}
                <div className='space-y-1'>
                  <p className='font-medium leading-none'>{store.text}</p>
                  <p className='text-sm text-gray-500'>{store.user.name}</p>
                </div>
              </div>
              <p className='text-sm text-gray-500'>{new Date(store.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
      <div className='bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-xl mx-auto w-full'>
        <div className='flex justify-between items-center mb-4'>
          <div className='space-y-1'>
            <h2 className='text-xl font-semibold'>温度列表</h2>
            <p className='text-sm text-gray-500'>
              Fetched {temperatures.length} in {duration}ms
            </p>
          </div>
          <RefreshButton />
        </div>
        <div className='divide-y divide-gray-900/5'>
          {temperatures.map((temperature) => (
            <div key={temperature.id} className='flex items-center justify-between py-3'>
              <div className='flex items-center space-x-4'>
                {/* <Image
                src={user.image}
                alt={user.name}
                width={48}
                height={48}
                className='rounded-full ring-1 ring-gray-900/5'
              /> */}
                <div className='space-y-1'>
                  <p className='font-medium leading-none'>{temperature.temperature}℃</p>
                  <p className='text-sm text-gray-500'>{temperature.user.name}</p>
                </div>
              </div>
              <p className='text-sm text-gray-500'>{timeAgo(temperature.createdAt)}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
