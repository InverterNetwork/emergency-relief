import Head from 'next/head';

import Header from '@/components/Header/Header';

type Props = {
  address: string | null;
};

export default function TermsAndConditions({ address: cachedAddress }: Props) {
  return (
    <>
      <Head>
        <title>Terms and Conditions</title>
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
          <h1 className="font-bold text-4xl md:text-5xl pt-10">
            Terms and Conditions
          </h1>

          <ul className="text-md text-gray-600 mt-8 list-decimal list-inside">
            <h2 className="font-bold text-2xl md:text-3xl text-gray-900">
              INVERTER
            </h2>

            <li className="mt-4">
              INVERTER, as a non-profit association based in Switzerland, is
              enabling users to make donations in order to support the
              earthquake relief efforts in Turkey.
            </li>
            <li>
              INVERTER is not a virtual assets services provider or a payment
              processor and does not hold any funds on behalf of donors or any
              entities. INVERTER only facilitates the humanitarian donations to
              official NGOs via emergencyrelief.xyz.
            </li>
            <li>
              INVERTER is not a broker, agent, financial institution, creditor
              or a nonprofit corporation, and does not make any profit or
              revenue from the donations made. The ultimate services relation
              shall be established between the user and the donated NGOs.
            </li>

            <h2 className="font-bold text-2xl md:text-3xl mt-8 text-gray-900">
              DONATIONS
            </h2>

            <li className="mt-4">
              INVERTER is not a broker, agent, financial institution, creditor
              or a nonprofit corporation, and does not make any profit or
              revenue from the donations made. The ultimate services relation
              shall be established between the user and the donated NGOs.
            </li>
            <li>
              INVERTER is not responsible in any way for the use of the
              donations. Any information and content made available regarding
              the use of the donations is made for informational purposes only
              on behalf of third parties. INVERTER does not guarantee the
              veracity, accuracy, completeness, timeliness or reliability of any
              such information or content. No content is intended to provide
              financial, legal, tax or other professional advice. The user
              acknowledges that all information and content accessed by the user
              using the INVERTER Platform is used at the user&apos;s own risk.
              Before making any donations, donors should consult the user&apos;s
              financial, legal, tax or other professional advisor.
            </li>
            <li>
              The use of donations is the exclusive responsibility of the
              exchanges who provide donation addresses for NGOs.
            </li>
            <li>
              INVERTER has no control over the conduct of, or any information
              provided by Paribu and BTC Turk or any non governmental
              organizations, and hereby disclaims all liability in this regard
              to the fullest extent permitted by applicable law.
            </li>
            <li>
              INVERTER makes no guarantee, express or implied, that any
              information provided through the INVERTER platform is accurate. We
              expressly disclaim any liability or responsibility for the outcome
              or success of any humanitarian campaign. The user, as a donor,
              must make the final determination as to the value and
              appropriateness of contributing.
            </li>
            <li>
              All donations are made at the discretion of the user and at the
              user&apos;s own risk. It is the user&apos;s responsibility to
              understand how the user&apos;s money will be used and to check any
              content regularly for any updates at the websites of the NGOs they
              donate to.
            </li>
            <li>
              INVERTER does not represent or guarantee that the donations will
              be used in accordance with any humanitarian campaign purpose
              prescribed or in accordance with applicable laws.
            </li>
            <li>
              INVERTER makes no representation as to whether all or any portion
              of the donations, including, if any, transaction fees, are tax
              deductible or eligible for tax credits. INVERTER will have no
              liability for any claim by any federal, state, provincial,
              territorial, local or any other tax authority with respect to the
              characterization on any applicable tax return of any donation.
            </li>
            <li>
              The users may be required to register with INVERTER to access and
              use certain features of the Platform and to comply with the
              applicable laws and regulations, including but not limited to
              Anti-Money Laundering practices and/or Contra Terrorism financing
              activities.
            </li>

            <h2 className="font-bold text-2xl md:text-3xl mt-8 text-gray-900">
              DONOR&apos;S INFORMATION
            </h2>

            <li className="mt-4">
              INVERTER is not responsible, and shall not be liable, for any use
              of any donor information.
            </li>
            <li>
              In order to execute the donation and besides agreeing to the
              present terms and conditions, user may also require the user to
              register with, and agree to the terms of, third-party service
              providers
            </li>
            <li>
              INVERTER does not withhold funds for tax purposes or otherwise.
            </li>
            <li>
              INVERTER reserves the right to modify, suspend or discontinue,
              temporarily or permanently, the Platform (or any part thereof) at
              any time and for any reason, with or without notice, and without
              any liability to the user or to any third party for any claims,
              damages, costs, or losses resulting therefrom.
            </li>
            <li>
              The user acknowledges and agrees that INVERTER may preserve user
              information, as well as and may also disclose if required to do so
              by law or in the good-faith belief that such preservation or
              disclosure is reasonably necessary to: (a) comply with legal
              process, applicable laws or government requests; (b) enforce these
              Terms of Service; (c) respond to claims in case of violation of
              the rights of third parties; or (d) protect the rights, property,
              or personal safety of INVERTER , its users, employees or the
              public.
            </li>
            <li>
              The user agrees that a certain minimum donation amount may apply,
              and that all donations are final and will not be refunded unless
              INVERTER, in its sole discretion, agrees to issue a refund.
            </li>

            <h2 className="font-bold text-2xl md:text-3xl mt-8 text-gray-900">
              INTELLECTUAL PROPERTY
            </h2>

            <li className="mt-4">
              The INVERTER name and logos are trademarks and service marks of
              INVERTER.
            </li>
            <li>
              Nothing in these Terms of Service or the Platform should be
              construed as granting, by implication, estoppel, or otherwise, any
              license or right to use any of INVERTER Trademarks displayed on
              the Services, without our prior written permission in each
              instance.
            </li>
            <li>
              All goodwill generated from the use of INVERTER Trademarks will
              insure to INVERTER exclusive benefit.
            </li>
            <li>
              Under no circumstances will INVERTER be liable in any way for any
              content or materials of any third parties (including Users) or any
              User Content (including, but not limited to, for any errors or
              omissions in any User Content), or for any loss or damage of any
              kind incurred as a result of the use of any such User Content.
              user acknowledge that INVERTER does not pre-screen User Content,
              but that INVERTER and its designees will have the right (but not
              the obligation) in their sole discretion to refuse, remove, or
              allow any User Content that is available via the Platform at any
              time and for any reason, with or without notice, and without any
              liability to the user or to any third party for any claims,
              damages, costs or losses resulting therefrom.
            </li>
            <li>
              INVERTER does not guarantee that any Platform Content will be made
              available through the Platform.
            </li>
            <li>
              INVERTER reserves the right to, but do not have any obligation to:
              (a) remove, edit or modify any Platform Content or User Content,
              in INVERTER&apos;s sole discretion, at any time, without notice to
              the user and for any reason (including, but not limited to, upon
              receipt of claims or allegations from third parties or authorities
              relating to such Platform Content or User Content, or if INVERTER
              are concerned that the user may have violated these Terms of
              Service), or for no reason at all; and (b) remove or block any
              Platform Content or User Content from the Services.
            </li>
            <li>
              INVERTER respects the intellectual property of others, and
              INVERTER asks Users to do the same. If the user believes that the
              user&apos;s work has been copied in a way that constitutes
              copyright infringement, or that the user&apos;s intellectual
              property rights have been otherwise violated, the user should
              notify INVERTER of the infringement claim.
            </li>

            <h2 className="font-bold text-2xl md:text-3xl mt-8 text-gray-900">
              THIRD PARTY SERVICES
            </h2>

            <li className="mt-4">
              The Platform or third parties may provide or facilitate links,
              tools, widgets or other features that allow the user to access
              other sites, services and resources provided by third parties
              (collectively, “Third Party Resources”).
            </li>
            <li>
              INVERTER has no control over such Third Party Resources or any
              products, services or content made available through or by such
              Third Party Resources, or the business practices of the third
              parties providing such Third Party Resources, and INVERTER is not
              responsible for and does not endorse such Third Party Resources or
              the products, services or content made available thereby.
            </li>
            <li>
              The user acknowledges that INVERTER is not responsible or liable
              for the content, functions, accuracy, legality, appropriateness or
              any other aspect of such Third Party Resources. The user further
              acknowledges and agrees that INVERTER will not be responsible or
              liable, directly or indirectly, for any damage or loss caused or
              alleged to be caused by or in connection with the use of or
              reliance on any content, events, goods or services available on or
              through any such Third Party Resources.
            </li>
            <li>
              Any dealings the user has with third parties found while using the
              Platform are between the user and the third party and may be
              subject to additional terms provided by the third party, which the
              user agrees to by using such Third Party Resources.
            </li>

            <h2 className="font-bold text-2xl md:text-3xl mt-8 text-gray-900">
              INDEMNITY AND RELEASE
            </h2>

            <li className="mt-4">
              The user agrees to release, indemnify on demand and hold INVERTER
              and their officers, employees, directors and agents harmless from
              any and all losses, damages, expenses, including reasonable
              attorneys&apos; fees, costs, awards, fines, damages, rights,
              claims, actions of any kind and injury (including death) arising
              out of or relating to the user&apos;s use of the Platform, any
              Donation, or any User Content, the user&apos;s connection to the
              Platform.
            </li>
            <li>
              The user agrees that INVERTER has the right to conduct its own
              defense of any claims at its own discretion, and that the user
              will indemnify INVERTER for the costs of its defence (including,
              but not limited to attorney&apos;s fees).
            </li>

            <h2 className="font-bold text-2xl md:text-3xl mt-8 text-gray-900">
              DISCLAIMER OF WARRANTIES
            </h2>

            <li className="mt-4">
              THE USER USE OF THE PLATFORM IS AT THE USER&apos;S SOLE RISK. THE
              PLATFORM IS PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS.
              INVERTER AND ITS AFFILIATES EXPRESSLY DISCLAIM AND EXCLUDE, TO THE
              FULLEST EXTENT PERMITTED BY APPLICABLE LAW, ALL WARRANTIES,
              CONDITIONS AND REPRESENTATIONS OF ANY KIND, WHETHER EXPRESS,
              IMPLIED OR STATUTORY, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
              WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
              TITLE AND NON-INFRINGEMENT.
            </li>
            <li>
              INVERTER AND ITS AFFILIATES MAKE NO WARRANTY OR CONDITION THAT:
              (I) THE PLATFORM WILL MEET THE USER&apos;S REQUIREMENTS; (II) THE
              SERVICES WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE;
              (III) THE RESULTS THAT MAY BE OBTAINED FROM THE USE OF THE
              PLATFORM WILL BE ACCURATE OR RELIABLE; OR (IV) THE QUALITY OF ANY
              INFORMATION, OR OTHER MATERIAL PURCHASED OR OBTAINED BY YOU
              THROUGH THE PLATFORM WILL MEET THE USER&apos;S EXPECTATIONS.
            </li>

            <h2 className="font-bold text-2xl md:text-3xl mt-8 text-gray-900">
              LIMITATION OF LIABILITY
            </h2>

            <li className="mt-4">
              THE USER EXPRESSLY UNDERSTANDS AND AGREES THAT, TO THE FULLEST
              EXTENT PERMITTED BY APPLICABLE LAW, NEITHER INVERTER NOR ITS
              AFFILIATES WILL BE LIABLE FOR ANY: (I) INDIRECT, INCIDENTAL,
              SPECIAL, CONSEQUENTIAL, PUNITIVE OR EXEMPLARY DAMAGES; (II)
              DAMAGES FOR LOSS OF PROFITS;, (III) DAMAGES FOR LOSS OF GOODWILL;,
              (IV) DAMAGES FOR LOSS OF USE; (V) LOSS OR CORRUPTION OF DATA; OR
              (VI) OTHER INTANGIBLE LOSSES (EVEN IF INVERTER HAS BEEN ADVISED OF
              THE POSSIBILITY OF SUCH DAMAGES), WHETHER BASED ON CONTRACT, TORT,
              NEGLIGENCE, STRICT LIABILITY OR OTHERWISE, RESULTING FROM: (A) THE
              USE OR THE INABILITY TO USE THE PLATFORM; (B) THE COST OF
              PROCUREMENT OF SUBSTITUTE GOODS AND SERVICES RESULTING FROM ANY
              INFORMATION OBTAINED OR MESSAGES RECEIVED OR TRANSACTIONS ENTERED
              INTO THROUGH OR FROM THE PLATFORM; (C) UNAUTHORIZED ACCESS TO OR
              ALTERATION OF THE USER&apos;S TRANSMISSIONS OR DATA; (D)
              STATEMENTS OR CONDUCT OF ANY THIRD PARTY ON THE PLATFORM.
            </li>

            <h2 className="font-bold text-2xl md:text-3xl mt-8 text-gray-900">
              JURISDICTION AND DISPUTES
            </h2>

            <li className="mt-4">
              The present Terms and Conditions shall be governed and interpreted
              in accordance with the laws of Switzerland.Any and all disputes
              arising out of or in connection with these Terms and Conditions
              shall be resolved by the ordinary courts in Zug, Switzerland
            </li>

            <h2 className="font-bold text-2xl md:text-3xl mt-8 text-gray-900">
              GENERAL
            </h2>

            <li className="mt-4">
              These Terms and Conditions constitute the entire agreement between
              the user and INVERTER and govern the user&apos;s use of the
              Platform, superseding any prior agreements between the user and
              INVERTER with respect to the Services.
            </li>
            <li>
              The user also may be subject to additional terms of service that
              may apply when the user use affiliate or third-party services,
              third-party content or third-party software.
            </li>
            <li>
              These Terms and Conditions will be governed by the laws of
              Switzerland without regard to its conflict of law provisions.
            </li>
            <li>
              If any provision of these Terms and Conditions is found by a court
              of competent jurisdiction to be (or are otherwise) invalid, the
              parties nevertheless agree that the court should endeavour to give
              effect to the parties&apos; intentions as reflected in the
              provision, and the other provisions of these Terms and Conditions
              remain in full force and effect.
            </li>
            <li>
              The user may not assign these Terms and Conditions without the
              prior written consent of INVERTER , but INVERTER may assign or
              transfer these Terms, in whole or in part, without restriction.
            </li>
            <li>
              INVERTER may, at any time, assign any rights or delegate our
              obligations hereunder without notice to the user in connection
              with a merger, acquisition, reorganization or sale of equity or
              assets, or by operation of law or otherwise.
            </li>
          </ul>
        </main>
      </div>
    </>
  );
}
