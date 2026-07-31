'use client'

import Link from 'next/link'
import { useState } from 'react'

const CUSTOMERS = [
  {
    name: 'Chelem PT (Seoul)',
    description: 'Signature equipment for premium 1:1 PT studios',
    icon: '💪',
    image: '/images/installations/install-20.jpg',
  },
  {
    name: 'Jincheon National Training Center',
    description: 'Training support for national team athletes',
    icon: '🏅',
    image: '/images/customers/jincheon.png',
  },
  {
    name: 'Korea Sports Promotion Foundation (KSPO)',
    description: 'Innovation for public sports facilities',
    icon: '🏛️',
    image: '/images/customers/kspo.png',
  },
  {
    name: 'SSG Landers (Incheon)',
    description: 'Athlete training for a pro baseball club',
    icon: '⚾',
    image: '/images/customers/ssg.png',
  },
]

export function EnCustomerUseCases() {
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({})

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="section-title section-title-2line mb-4" style={{ lineHeight: 1.58 }}>
            <span className="md:hidden">
              Beyond the gym floor
              <br />
              wherever SEGYM is needed
            </span>
            <span className="hidden md:inline">Beyond the gym — wherever SEGYM is needed</span>
          </h2>
          <p className="section-subtitle max-w-2xl mx-auto">
            From premium PT studios to national training centers and pro sports — SEGYM is already in the field
          </p>
        </div>

        <div className="mb-12">
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
            {CUSTOMERS.map((customer, index) => (
              <div
                key={customer.name}
                className="flex-shrink-0 w-[280px] md:w-auto md:flex-shrink bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl hover:border-primary/30 transition-all duration-300 group"
              >
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  {customer.image && !imageErrors[index] ? (
                    <img
                      src={customer.image}
                      alt={customer.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={() => {
                        setImageErrors((prev) => ({ ...prev, [index]: true }))
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                      <div className="text-6xl">{customer.icon}</div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="card-title font-bold mb-2 group-hover:text-primary transition-colors">
                    {customer.name}
                  </h3>
                  <p className="section-body text-sm md:text-base">{customer.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/en/installations"
            className="inline-block px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-all duration-200 shadow-md hover:shadow-lg"
          >
            View installations
          </Link>
        </div>
      </div>
    </section>
  )
}
