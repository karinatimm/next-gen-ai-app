import React from "react";
import Link from "next/link";

interface PromoCardProps {
  title: string;
  description: string;
  link?: string;
  onClick?: () => void;
}

const PromoCard: React.FC<PromoCardProps> = ({
  title,
  description,
  link,
  onClick,
}) => {
  const content = (
    <div
      onClick={onClick}
      className="relative flex flex-col items-start p-6 border rounded-lg bg-opacity-80 border-gray-600 shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl bg-gradient-to-br from-[#010818] to-[#003366] h-80 cursor-pointer"
    >
      <h3 className="text-lg font-semibold mb-2 text-white pt-10">{title}</h3>
      <p className="text-gray-400 mb-4">{description}</p>
      <span className="text-blue-400 hover:underline">Learn more</span>
    </div>
  );

  if (link && !onClick) {
    return <Link href={link}>{content}</Link>;
  }

  return content;
};

export default PromoCard;
