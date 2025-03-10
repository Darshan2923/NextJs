import React from 'react'

const tiers = [
    {
        name: "Starter",
        id: "started_id",
        href: "#",
        priceMonthly: null,
        description: "Get chatting right away with anyone, anywhere!",
        features: [
            "20 Message Chat Limit in Chats",
            "2 Participant limit in Chat",
            "3 Chat Rooms limit",
            "Supports 2 languages",
            "48-hour support response time",
        ],
    },
    {
        name: "Pro",
        id: "si_OnlcsLNQYbMvZV",
        href: "#",
        priceMonthly: "£5.99",
        description: "Unlock the Full Potential with Pro!",
        features: [
            "Unlimited Messages in Chats",
            "Unlimited Participants in Chats",
            "Unlimited Chat Rooms",
            "Supports up to 10 languages",
            "Multimedia support in chats (coming soon)",
            "1-hour, dedicated support response time",
            "Early access to New Features",
        ],
    },
];

const PricingCards = ({ redirect }: { redirect: boolean }) => {
    return (
        <div>
            <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2">
                {tiers.map((tier) => (
                    <div key={tier.id} className='flex flex-col justify-between rounded-3xl bg-white p-8 shadow-xl ring-1 ring-gray-900/10 sm:p-10'>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default PricingCards