import { CopyButton } from "@/components/copy-button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";

import Link from "next/link";

type Profile = {
  name: string;
  bio: string;
  job: string;
  skill: string;
  career: number;
  github: string;
  rocketpunch: string;
  profileImg: string;
  city: string;
};

async function getProfile(): Promise<Profile> {
  const profile: Profile = {
    name: "sunmkim",
    bio: "I'm a mobile developer who loves Flutter.",
    job: "Mobile Developer",
    skill: "Flutter",
    career: 2,
    github: "https://github.com/BGM-109",
    rocketpunch: "https://www.rocketpunch.com/@vividxxxxx",
    profileImg: "https://avatars.githubusercontent.com/u/34917143?v=4",
    city: "Seoul",
  };
  return profile;
}

function JsonToArray(profile: Profile): [string | number, string | number][] {
  const keys = Object.keys(profile);
  const values = Object.values(profile);
  return keys.map((key, index) => [key, values[index]]);
}

function isNumber(value: string | number): boolean {
  return typeof value === "number";
}

export default async function Home() {
  const profile = await getProfile();
  const uri = "http://localhost:3000/api/profile";
  const keyClassName = "text-[#d0354b]";
  const valueClassName = "text-[#c0d67a]";
  const numberValueClassName = "text-[#6365ba]";

  return (
    <div className="bg-background flex flex-col p-4 h-screen justify-between">
      <div className="flex items-center justify-between">
        <h2 className="text-[#5d615e]">{`// ${uri}`}</h2>
        <CopyButton json={JSON.stringify(profile)} />
      </div>
      <div className="w-full p-10 flex flex-col items-start justify-center text-white text-lg font-semibold">
        <p>{`{`}</p>
        {
          <ul className="ml-10">
            {JsonToArray(profile).map((value, index) => {
              // value is number
              if (isNumber(value[1])) {
                return (
                  <li key={index}>
                    <span className={keyClassName}>{`"${value[0]}"`}</span>
                    <span>{` : `}</span>
                    <span
                      className={numberValueClassName}
                    >{`${value[1]},`}</span>
                  </li>
                );
              }
              // value is string
              const isLink =
                value[0] === "github" || value[0] === "rocketpunch";
              if (isLink) {
                return (
                  <li key={index}>
                    <span className={keyClassName}>{`"${value[0]}"`}</span>
                    <span>{` : `}</span>

                    <Link
                      href={`${value[1]}`}
                      target="_blank"
                      className={`${valueClassName} underline underline-offset-2`}
                    >{`"${value[1]}",`}</Link>
                  </li>
                );
              }
              const isImage = value[0] === "profileImg";
              if (isImage) {
                return (
                  <li key={index} className="">
                    <span className={keyClassName}>{`"${value[0]}"`}</span>
                    <span>{` : `}</span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger
                          className={`${valueClassName} underline underline-offset-2`}
                        >{`"${value[1]}",`}</TooltipTrigger>
                        <TooltipContent sideOffset={0}>
                          <Image
                            width={300}
                            height={300}
                            src={value[1] as string}
                            alt="profile image"
                          />
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </li>
                );
              }
              return (
                <li key={index}>
                  <span className={keyClassName}>{`"${value[0]}"`}</span>
                  <span>{` : `}</span>
                  <span className={valueClassName}>{`"${value[1]}",`}</span>
                </li>
              );
            })}
          </ul>
        }
        <p>{`}`}</p>
      </div>
      <p className="text-[#5d615e] text-center text-lg">
        JsonViewer clone or no design.
      </p>
    </div>
  );
}
