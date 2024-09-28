import React from 'react'

export default function Center({children}) {
  return (
    <>
      <div className='m-0 px-20 max-w-screen-2xl w-full'>
        {children}
      </div>
    </>
  );
}