import { Html, Head, Main, NextScript } from 'next/document';
import Link from 'next/link';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-gray-100">
        <Main />
        <NextScript />
        <div className="h-0.5 w-full bg-gray-200"></div>
        <div className="container py-8">
          <Link href={'/'}>
            <div className="font-black text-gray-900 text-sm md:text-lg uppercase">
              Emergency<span className="text-primary">Relief</span>
            </div>
          </Link>
          <span className="text-sm text-gray-600 mt-4">
            © 2023 Emergency Relief. All rights reserved.
          </span>
          <Link href={'/'} className="block ">
            <span className="font-semibold text-sm text-gray-600 mt-4 hover:text-gray-900">
              Terms and Conditions
            </span>
          </Link>
        </div>
      </body>
    </Html>
  );
}
