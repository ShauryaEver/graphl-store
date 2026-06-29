import Image from "next/image";

const cardColors = [
  "bg-[#8fbfaa]",
  "bg-[#b5d4c4]",
  "bg-[#c8c0e8]",
];

const offsets = [
  "ml-0",
  "ml-8",
  "ml-16",
];

export default function ReviewsCard({
  profilePic,
  name,
  occupation,
  rating,
  comment,
  index = 0,
}) {
  return (
    <div
      className={`
        ${cardColors[index % cardColors.length]}
        ${offsets[index % offsets.length]}
        rounded-r-3xl rounded-l-xl
        px-6 py-5
        flex flex-col gap-3
        relative
        transition-transform duration-300 hover:-translate-y-1
      `}
    >
      <span className="absolute top-4 right-5 text-4xl text-black/10 font-serif leading-none">"</span>

      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0">
          <Image
            src={profilePic}
            alt={name}
            fill
            className="object-cover"
            sizes="40px"
          />
        </div>
        <div>
          <h3 className="text-sm font-bold text-gray-900">{name}</h3>
          <p className="text-xs text-gray-600">{occupation}</p>
        </div>
        <div className="ml-auto flex items-center gap-1 text-yellow-600 text-xs font-medium">
          {"★".repeat(Math.floor(rating))}
          <span className="text-gray-700 ml-1">{rating.toFixed(1)}</span>
        </div>
      </div>

      <p className="text-sm text-gray-800 leading-relaxed">{comment}</p>
    </div>
  );
}