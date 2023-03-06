import React from 'react'

const AppFooter: React.FC = () => {
  return (
    <footer className='py-6 flex flex-col gap-3 items-center w-full max-w-lg m-auto border-t-1 border-primary'>
      <section>
        <p>Created by <a className='text-primary font-bold hover:text-white transition-colors' href='https://agustindibenedetto.vercel.app/' target='_blank' rel='noreferrer'>Agustin Di Benedetto</a></p>
      </section>
      <section className='flex gap-2 font-bold hover:[&_a]:text-primary hover:[&_a]:transition-colors'>
        <a
          href='https://www.linkedin.com/in/agustin-di-benedetto-7509071ba/'
          target='_blank'
          rel='noreferrer'
        >
          Linkedin
        </a>
        <span>|</span>
        <a href='https://github.com/Agusdben' target='_blank' rel='noreferrer'>
          Github
        </a>
      </section>
    </footer>
  )
}

export default AppFooter
