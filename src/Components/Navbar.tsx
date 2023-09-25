import { Menu, Transition } from '@headlessui/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChangeEvent, Fragment, KeyboardEvent, useState } from 'react';
import Button from './Buttons/Button';
import { Logo, Search } from './Icons';

interface NavbarProps {
  navbarItem?: JSX.Element;
}

interface NavigationItem {
  name: string;
  path: string;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar({ navbarItem }: NavbarProps) {
  const { data: sessionData } = useSession();
  const userId = sessionData?.user.id;

  const Navbar: NavigationItem[] = [
    {
      name: 'Profile',
      path: `/${String(userId)}/Videos`,
    },
    {
      name: 'Dashboard',
      path: '/Dashboard',
    },
    {
      name: 'Settings',
      path: '/Settings',
    },
    {
      name: 'Log Out',
      path: 'sign-out',
    },
  ];

  const [searchInput, setSearchInput] = useState('');
  const router = useRouter();

  const handleSearch = async () => {
    return;
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      void handleSearch();
    }
  };

  return (
    <>
      <div className=' fixed z-50 w-full border border-gray-200 bg-white shadow-sm'>
        <div className='mx-auto flex max-w-full px-6 lg:px-16 xl:grid xl:grid-cols-12'>
          <div className='flex flex-shrink-0 items-center lg:static xl:col-span-2'>
            <Link
              href='/#'
              aria-label='Home'
              className='flex flex-shrink-0 items-center'
            >
              <Logo className='flex h-10' />
              <h3>VideoArea</h3>
            </Link>
          </div>
          <div className='w-full min-w-0 flex-1 lg:px-0 xl:col-span-8'>
            <div className=' g:mx-0 flex items-center px-6 py-4 lg:max-w-none xl:mx-0 xl:px-0'>
              <div className='w-full'>
                <label htmlFor='search' className='sr-only'>
                  Search
                </label>
                <div className='relative'>
                  <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                    <Search className='h-5 w-5 stroke-gray-500' />
                  </div>
                  <input
                    id='search'
                    name='search'
                    className='block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6 '
                    placeholder='Search'
                    type='search'
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setSearchInput(e.target.value)
                    }
                    onKeyDown={handleKeyDown}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='flex items-center lg:hidden'>{navbarItem}</div>
          <div className='m-0 hidden w-max px-0 lg:flex lg:items-center lg:justify-end xl:col-span-2'>
            <Menu as='div' className='relative ml-5 flex-shrink-0'>
              <div>
                <Menu.Button className='flex rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2'>
                  {sessionData ? <>User</> : <>No user</>}
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                  {sessionData ? (
                    <div className=' mx-4 my-2 flex  '>
                      <div className='ml-2 flex w-full flex-col justify-start truncate '>
                        <p className='truncate text-sm font-semibold text-gray-700'>
                          {sessionData && <span>{sessionData.user?.name}</span>}
                        </p>
                        <p className=' truncate text-sm text-gray-600'>
                          {sessionData && (
                            <span className=''>{sessionData.user?.email}</span>
                          )}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className='mx-4 my-2 flex text-center text-sm font-semibold text-gray-700 '>
                      Menu
                    </p>
                  )}
                  {Navbar.map((item) => (
                    <Menu.Item key={item.name}>
                      {({ active }: { active: boolean }) => (
                        <Link
                          onClick={(e) => {
                            e.preventDefault();
                            if (item.path === 'sign-out') {
                              void signOut();
                            } else {
                              void router.push(item.path || '/');
                            }
                          }}
                          href={item.path || '/'}
                          className={classNames(
                            active ? 'bg-gray-100 ' : '',
                            'block px-4 py-2 text-sm text-gray-700'
                          )}
                        ></Link>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </Transition>
            </Menu>
            {sessionData ? (
              ''
            ) : (
              <div className='flex flex-row space-x-3 '>
                <Button
                  variant='tertiary-gray'
                  size='md'
                  onClick={!sessionData ? () => void signIn() : () => ''}
                >
                  Log in
                </Button>
                <Button
                  variant='primary'
                  size='md'
                  onClick={!sessionData ? () => void signIn() : () => ''}
                >
                  Sign up
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
