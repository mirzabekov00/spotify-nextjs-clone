import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import shuffle from "lodash.shuffle";

interface ContentProps {}

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
];

const Content: React.FC<ContentProps> = ({}) => {
  const [color, setColor] = useState<string | null>(null);

  const { data: session } = useSession();

  const imageSrc = session?.user.image || "https://i.imgur.com/WcGB2ev.jpg";
  const username = session?.user.name || "default alt";

  useEffect(() => {
    const initialColor = shuffle(colors).pop() || null;
    setColor(initialColor);
  }, []);

  return (
    <div className="flex-grow">
      {session?.user && (
        <header className="absolute top-5 right-8">
          <div className="flex items-center bg-red-300 black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2 ">
            <img
              src={imageSrc}
              alt={username}
              className="rounded-full w-10 h-10"
            />
            <h2>{username}</h2>
            <ChevronDownIcon className="w-5 h-5" />
          </div>
        </header>
      )}

      <section
        className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80`}
      >
        123
      </section>
    </div>
  );
};

export default Content;
