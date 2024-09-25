'use client';

import { motion } from 'framer-motion';

import { AuroraBackground } from '@/components/ui/aurora-background';
import { Button } from '@/components/ui/button';
import Link from 'next/link';


const Page = () => {
  return (
    <AuroraBackground>

      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: 'easeInOut',
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >

        <div className="text-5xl md:text-7xl font-bold text-white text-center">
          Delete <span className='text-violet-500'>BG</span>
        </div>

        <div className="font-extralight text-base text-center md:text-3xl text-neutral-200 py-4">
          Quickly and easily remove backgrounds from your images for a cleaner, more professional look
        </div>

        <Link href='/delete-bg'>

          <Button className="bg-violet-700 hover:bg-violet-500 transition-all duration-200 text-white rounded-full text-xl py-8 px-14">
            Get Started
          </Button>

        </Link>

      </motion.div>

    </AuroraBackground>
  );
};

export default Page;
