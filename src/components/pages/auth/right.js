import React from 'react'

const Right = () => {
  return (
    <div className="hidden w-7/12 items-center justify-center rounded-[20px] bg-gray-50 px-6 dark:bg-gray-100/40 lg:flex xl:justify-start 2xl:px-16 text-black">
    <div className="pb-8 pt-10 text-center xl:pt-16 2xl:block 2xl:w-[1063px]">
      <div className="mx-auto mb-10 max-w-sm pt-2 2xl:max-w-lg">
        <h2 className="rizzui-title-h2 mb-5 font-semibold !leading-normal lg:text-[26px] 2xl:px-10 2xl:text-[32px]">
          The simplest way to manage your workspace.
        </h2>
        <p className="leading-[1.85] text-gray-700 md:leading-loose 2xl:px-6">
          Amet minim mollit non deserunt ullamco est sit aliqua dolor do
          amet sint velit officia consequat duis.
        </p>
      </div>
      <div className="relative mx-auto aspect-[4/3.37] w-[500px] xl:w-[620px] 2xl:w-[820px]">
        <img
          alt="Sign Up Thumbnail"
          decoding="async"
          data-nimg="fill"
          className="object-cover"
          src="https://isomorphic-furyroad.vercel.app/_next/image?url=https%3A%2F%2Fisomorphic-furyroad.s3.amazonaws.com%2Fpublic%2Fauth%2Fsign-up.webp&w=1920&q=75"
        />
      </div>
    </div>
  </div>
  )
}

export default Right