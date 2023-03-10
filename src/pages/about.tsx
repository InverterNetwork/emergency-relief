import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

import Header from '@/components/Header/Header';
import Button from '@/components/Button/Button';

type Props = {
  address: string | null;
};

export default function About({ address: cachedAddress }: Props) {
  return (
    <>
      <Head>
        <title>About Emergency Relief</title>
        <meta
          name="description"
          content="Innovative Relief Donations Platform"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <Header cachedAddress={cachedAddress || undefined} />

      <div className="container mx-auto py-10">
        <main className="flex flex-col mt-8">
          <Image
            className="w-full h-full mt-10"
            src={{
              src: '/inverter-banner.png',
              width: 1600,
              height: 500,
            }}
            alt="Turkey earthquake"
          ></Image>
          <h1 className="font-bold text-4xl md:text-5xl pt-10">About Us</h1>
          <p className="text-md text-gray-600 mt-8">
            On February 6 two earthquakes, about 9 hours apart, hit Turkey and
            Syria - affecting 13.5 million people and 4 million buildings in
            Turkey alone. <br></br>
            <br></br>
            As of February 21, over 47,000 people have lost their lives, and
            over 122,000 have been injured with numbers still expected to rise.
            In addition to the tens of thousands of people burried under the
            rubble, the earthquakes left millions of people homeless, struggling
            to survive in the cold winter conditions. <br></br>
            <br></br>
            The energy released in the earthquake was equivalent to 26% of the
            energy released from all the earthquakes in the last year. The area
            affected is larger than the whole of Hungary and 2.5 times the size
            of the Netherlands.
          </p>

          <Image
            className="w-full md:w-[50%] h-full mt-10"
            src={{
              src: '/earthquake-area.png',
              width: 1600,
              height: 500,
            }}
            alt="Turkey earthquake"
          ></Image>

          <h2 className="font-bold text-2xl md:text-3xl mt-8">
            First actions on the ground to verify projects
          </h2>
          <p className="text-md text-gray-600 mt-8">
            Immediately after the first earthquake, Turkey called for
            international support. Dozens of countries sent search and rescue
            teams and relief supplies.
            <br></br>
            <br></br>
            Two official disaster organisations started relief efforts in the
            region:
            <br></br>
            <ul className="list-disc list-inside">
              <li>
                Disaster and Emergency Management Presidency (AFAD): A
                Governmental disaster management agency operating under the
                Turkish Ministry of Interior
              </li>
              <li>
                Afet Platformu: An umbrella organisation of NGOs which consists
                of 19 member organisations and 8 supporting member
                organisations, and also includes organisations such as Ahbap and
                ??htiya?? Haritasi, which have made a name for themselves on a
                global scale
              </li>
            </ul>
            <br></br>
            The crypto community in Turkey and beyond quickly organised in order
            to start crypto donation campaigns to support AFAD and the Disaster
            Platform. Turkiye Relief DAO was born as part of these efforts to:
            <br></br>
            <ul className="list-disc list-inside">
              <li>
                Push for policy change on cryptocurrency donations (it was not
                allowed until the earthquake)
              </li>
              <li>Assist organisations to accept cryptocurrencies</li>
              <li>Appeal to the global crypto community for support</li>
            </ul>
            <br></br>
            As most incoming donations were going to only a handful of
            organisations (those with the strongest global outreach campaigns),
            Anka Relief emerged to distribute donations as equally as possible
            among smaller NGOs to increase overall impact. The multisig wallet
            of Anka Relief consists of signatories who are formed by leaders
            from CELO Foundation, Gitcoin, Ukraine DAO and The Graph.
          </p>
          <h2 className="font-bold text-2xl md:text-3xl mt-8">
            Emergency Relief was formed
          </h2>
          <p className="text-md text-gray-600 mt-4">
            Evolving from all of these efforts, Emergency Relief was established
            by the members of T??rkiye Relief DAO, Anka Relief and Inverter
            Network to ensure that donations would reach even more organisations
            and people and thereby strengthen relief efforts. For this project,
            a number of different efforts began to develop:
            <br></br>
            <ul className="list-disc list-inside">
              <li>
                Volunteers from Emergency Relief went to the region to work more
                closely with organizations and onboard more NGOs to the crypto
                donation system
              </li>
              <li>
                A browser wallet integration was developed to allow users to
                send donations directly to the wallets of AFAD and approved NGOs
              </li>
              <li>
                Donating directly to the matching pools of Giveth and Gitcoin
                was enabled through Emergency Relief website.
              </li>
              <li>
                An API was developed for the digital identities of NGOs to
                easily integrate with donation platforms such as Giveth and
                Gitcoin
              </li>
            </ul>
            <br></br>
            This API resulted in the following:
            <br></br>
            <ul className="list-disc list-inside">
              <li>
                NGOs no longer had to create separate profiles on such donation
                platforms
              </li>
              <li>
                The information of the profiles that were KYC&apos;d by Paribu
                and BTCTurk could be easily retrieved by Giveth and Gitcoin,
                enabling these NGOs to be able to participate in the quadratic
                funding round
              </li>
            </ul>
            <br></br>
            Ultimately, the collected donations must still reach the largest
            number of organisations and survivors. Thus, an incredibly impactful
            approach would be to contribute to the Giveth Matching Pool, where
            the contributions are elevated through a matching pool that is
            distributed through quadratic funding by Gitcoin.
          </p>

          <div className="mt-8 mx-auto">
            <Link
              href={
                'https://giveth.io/project/earthquake-relief-qf-matching-pool'
              }
              className={'flex w-max h-max'}
              target={'_blank'}
            >
              <Button className="mx-auto">
                Contribute to the Giveth Matching Pool
              </Button>
            </Link>
          </div>

          <h4 className="font-semibold text-md mt-8">References:</h4>
          <div className="text-sm flex flex-col space-y-1 italic text-gray-600">
            <Link
              className="hover:text-gray-900 focus:text-gray-900"
              href={
                'https://www.cumhuriyet.com.tr/turkiye/deprem-sonrasi-moloz-yiginina-donen-binalar-yasadisi-yapilari-tekrar-gundeme-getirdi-imar-affi-oldurdu-2049411'
              }
              target={'_blank'}
            >
              https://www.cumhuriyet.com.tr/turkiye/deprem-sonrasi-moloz-yiginina-donen-binalar-yasadisi-yapilari-tekrar-gundeme-getirdi-imar-affi-oldurdu-2049411
            </Link>
            <Link
              className="hover:text-gray-900 focus:text-gray-900"
              href={
                'https://www.washingtonpost.com/world/2023/02/08/how-big-was-turkey-syria-earthquake/'
              }
              target={'_blank'}
            >
              https://www.washingtonpost.com/world/2023/02/08/how-big-was-turkey-syria-earthquake
            </Link>
            <Link
              className="hover:text-gray-900 focus:text-gray-900"
              href={'https://afetplatformu.org.tr/hakkimizda/'}
              target={'_blank'}
            >
              https://afetplatformu.org.tr/hakkimizda
            </Link>
            <Link
              className="hover:text-gray-900 focus:text-gray-900"
              href={'https://afetplatformu.org.tr/uyeler/'}
              target={'_blank'}
            >
              https://afetplatformu.org.tr/uyeler
            </Link>
            <Link
              className="hover:text-gray-900 focus:text-gray-900"
              href={'https://tr.tradingview.com/news/cointurk:dc943b02fd9e8:0/'}
              target={'_blank'}
            >
              https://tr.tradingview.com/news/cointurk:dc943b02fd9e8:0
            </Link>
            <Link
              className="hover:text-gray-900 focus:text-gray-900"
              href={'https://webrazzi.com/2023/02/07/murat-pak-nft-cause/'}
              target={'_blank'}
            >
              https://webrazzi.com/2023/02/07/murat-pak-nft-cause
            </Link>
            <Link
              className="hover:text-gray-900 focus:text-gray-900"
              href={'https://webrazzi.com/2023/02/07/ahbap-kripto-para-bagis/'}
              target={'_blank'}
            >
              https://webrazzi.com/2023/02/07/ahbap-kripto-para-bagis
            </Link>
            <Link
              className="hover:text-gray-900 focus:text-gray-900"
              href={'https://turkiyereliefdao.org/'}
              target={'_blank'}
            >
              https://turkiyereliefdao.org
            </Link>
            <Link
              className="hover:text-gray-900 focus:text-gray-900"
              href={'https://ankarelief.org'}
              target={'_blank'}
            >
              https://ankarelief.org
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
