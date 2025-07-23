import { Roboto, Antonio } from 'next/font/google'
import localFont from 'next/font/local'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
})

const antonio = Antonio({
  subsets: ['latin'],
  weight: ['400', '700','100','200','300','500','600'],
  style: ['normal'],
})

const sfProDisplay = localFont({
  src: [
    {
      path: '../fonts/SF-Pro-Display-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/SF-Pro-Display-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/SF-Pro-Display-Semibold.otf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/SF-Pro-Display-Bold.otf',
      weight: '900',
      style: 'normal',
    },
    {
      path: '../fonts/SF-Pro-Display-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/SF-Pro-Display-Ultralight.otf',
      weight: '100',
      style: 'normal',
    }
  ],
})

export {roboto, sfProDisplay, antonio}