// import avatarImage1 from '@/images/avatars/avatar-1.png'
// import avatarImage2 from '@/images/avatars/avatar-2.png'
// import avatarImage3 from '@/images/avatars/avatar-3.png'
// import avatarImage4 from '@/images/avatars/avatar-4.png'
// import avatarImage5 from '@/images/avatars/avatar-5.png'
import { Container } from './Container'

const testimonials = [
  {
    content:
      'Pilot and its underlying Zodiac modules for Safe have been instrumental in helping karpatkey manage funds securely, without taking custody of partner assets. The improved operational efficiency and security it affords have helped us grow our DAO treasury network to over $1.8B in assets.',
    author: {
      name: 'Marcelo Ruiz de Olano',
      role: 'CEO at karpatkey',
      // image: avatarImage1,
    },
  },
  {
    content:
      'With smart contracts, developers can permissionlessly compose modular building blocks together to create powerful new functionality. But surfacing that functionality to real people is much harder. Pilot makes that so much easier, and as a result will unlock thousands of net new user-facing possibilities.',
    author: {
      name: 'Spencer Graham',
      role: 'Hats Protocol',
      // image: avatarImage4,
    },
  },

  // [
  //   {
  //     content:
  //       'The best part about TaxPal is every time I pay my employees, my bank balance doesn’t go down like it used to. Looking forward to spending this extra cash when I figure out why my card is being declined.',
  //     author: {
  //       name: 'Leland Kiehn',
  //       role: 'Founder of Kiehn and Sons',
  //       image: avatarImage5,
  //     },
  //   },
  //   {
  //     content:
  //       'There are so many things I had to do with my old software that I just don’t do at all with TaxPal. Suspicious but I can’t say I don’t love it.',
  //     author: {
  //       name: 'Erin Powlowski',
  //       role: 'COO at Armstrong Inc',
  //       image: avatarImage2,
  //     },
  //   },
  // ],
  // [
  //   {
  //     content:
  //       'I used to have to remit tax to the EU and with TaxPal I somehow don’t have to do that anymore. Nervous to travel there now though.',
  //     author: {
  //       name: 'Peter Renolds',
  //       role: 'Founder of West Inc',
  //       image: avatarImage3,
  //     },
  //   },
  //   {
  //     content:
  //       'This is the fourth email I’ve sent to your support team. I am literally being held in jail for tax fraud. Please answer your damn emails, this is important.',
  //     author: {
  //       name: 'Amy Hahn',
  //       role: 'Director at Velocity Industries',
  //       image: avatarImage4,
  //     },
  //   },
  // ],
]

function QuoteIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg aria-hidden="true" width={105} height={78} {...props}>
      <path d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.565 3.917 87.839 1.507 93.564 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z" />
    </svg>
  )
}

export function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-label="What our customers are saying"
      className="py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl md:text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl dark:text-slate-50">
            Why Organizations Trust Pilot
          </h2>
          {/* <p className="mt-4 text-lg tracking-tight text-slate-700 dark:text-slate-300">
            Our software is so simple that people can’t help but fall in love
            with it. Simplicity is easy when you just skip tons of
            mission-critical features.
          </p> */}
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:mt-20 lg:max-w-none lg:grid-cols-3"
        >
          {testimonials.map((testimonial, testimonialIndex) => (
            <li key={testimonialIndex}>
              <figure className="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10 dark:bg-slate-800 dark:shadow-2xl dark:shadow-slate-300/10">
                <QuoteIcon className="absolute left-6 top-6 fill-slate-100 dark:fill-slate-700" />
                <blockquote className="relative">
                  <p className="text-lg tracking-tight text-slate-900 dark:text-slate-50">
                    {testimonial.content}
                  </p>
                </blockquote>
                <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6 dark:border-slate-600">
                  <div>
                    <div className="font-display text-base text-slate-900 dark:text-slate-50">
                      {testimonial.author.name}
                    </div>
                    <div className="mt-1 text-sm text-slate-500">
                      {testimonial.author.role}
                    </div>
                  </div>
                  <div className="overflow-hidden rounded-full bg-slate-50 dark:bg-slate-900">
                    <img
                      className="h-14 w-14 object-cover"
                      src={testimonial.author.image}
                      alt=""
                      width={56}
                      height={56}
                    />
                  </div>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
