"use client";

import { Button } from "@/components/ui/button";
import SignInModal from "@/components/modal/sign-in-modal";
import { useDashboardRedirect } from "@/hooks/useDashboardRedirect";
import PromoCard from "@/components/cards/promo-card";

const Home = () => {
  const handleClick = useDashboardRedirect();

  const promoItems = [
    {
      title: "Extensive Template Library",
      description:
        "Choose from a wide range of templates for your content needs",
    },
    {
      title: "SEO Optimized Content",
      description: "Get SEO optimized content for your blog or website",
    },
    {
      title: "Social Media Posts",
      description: "Generate content for your social media posts",
    },
    {
      title: "AI Content Generator",
      description:
        "Generate AI content for your blog, website, or social media with a single click",
    },
  ];

  return (
    <>
      <div
        className="relative bg-cover bg-center"
        style={{ backgroundImage: 'url("/background.png")', height: "50vh" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#010818] z-0"></div>

        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center">
            <SignInModal />
            <h1 className="text-7xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
              AI Content Generator
            </h1>
            <p className="text-white mb-5">
              Generate AI content for your blog, website, or social media with a
              single click and more
            </p>

            <Button onClick={handleClick} variant="outline">
              Get started
            </Button>
          </div>
        </div>
      </div>

      <div className="py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {promoItems.map((item, index) => (
              <PromoCard
                key={index}
                title={item.title}
                description={item.description}
                onClick={handleClick} // updated to use client-side redirect
              />
            ))}
          </div>
        </div>
      </div>

      <footer className="py-4 text-center border-t-2">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} AI Content Generator. All rights
          reserved.
        </p>
      </footer>
    </>
  );
};

export default Home;
