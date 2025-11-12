import React from "react";
import { MdOutlineEmail, MdOutlineWork } from "react-icons/md";
import { FaPhone, FaLocationDot } from "react-icons/fa6";
import { CgWebsite } from "react-icons/cg";

export default function ContactCard({ contact, searchTerm }) {
    const { name, email, username, phone, website, address, company } = contact;

    const highlightText = (text, search) => {
        if (!search.trim()) {
            return text;
        }

        // Create a case-insensitive regex with global flag
        const regex = new RegExp(`(${search})`, "gi");
        const parts = text.split(regex);

        return (
            <>
                {parts.map((part, index) => {
                    // Check if this part matches the search term (case-insensitive)
                    if (part.toLowerCase() === search.toLowerCase()) {
                        return (
                            <span
                                key={index}
                                className="bg-yellow-300 text-black font-semibold px-1 rounded"
                            >
                                {part}
                            </span>
                        );
                    }
                    return <span key={index}>{part}</span>;
                })}
            </>
        );
    };

    return (
        <div className="w-[350px] sm:w-[400px]  h-[95%] shrink-0  relative text-white overflow-hidden">
            <div className="bg-[#b8094d] w-full h-[30%]"></div>
            <div className="bg-[#292929] w-full h-[70%]"></div>
            <div className=" absolute sm:top-16 top-2 w-[95%]  h-full pl-4 ">
                <div className=" h-[200px] rounded-lg flex flex-row bg-black w-full">
                    <div className="p-4 flex flex-col gap-4 justify-center text-white">
                        {/* NAME*/}
                        <div className="font-thin text-xl sm:text-2xl font-mono italic">
                            {highlightText(name, searchTerm)}
                        </div>
                        {/* USERNAME*/}
                        <div>
                            <span>{`Username: `}</span>
                            {highlightText(username, searchTerm)}
                        </div>
                    </div>
                </div>

                {/* EMAIL*/}
                <div className="flex flex-row gap-6 border-b-[#b8094d] border-b-[1px] p-[9px] sm:p-3  w-full items-center mt-2">
                    <a href={`mailto:${email}`}>
                        <MdOutlineEmail size={25} />
                    </a>

                    <div>
                        <div className="font-bold text-md">Email</div>
                        <a
                            className="font-thin text-sm"
                            href={`mailto:${email}`}
                        >
                            {highlightText(email, searchTerm)}
                        </a>
                    </div>
                </div>

                {/* PHONE NUMBER*/}
                <div className="flex flex-row gap-7 border-b-[#b8094d] border-b-[1px] p-[9px] sm:p-3 items-center">
                    <a href={`tel:${phone}`}>
                        <FaPhone size={20} />
                    </a>
                    <div>
                        <div className="font-bold text-md">Phone Number</div>
                        <a
                            className="font-thin text-sm"
                            href={`tel:${phone}`}
                        >
                            {highlightText(phone, searchTerm)}
                        </a>
                    </div>
                </div>
                {/* WEBSITE*/}
                <div className="flex flex-row gap-7 border-b-[#b8094d] border-b-[1px] p-[9px] sm:p-3 items-center">
                    <a
                        className="font-thin text-sm"
                        href={`https://${website}`}
                        target="_blank"
                    >
                        <CgWebsite size={20} />
                    </a>
                    <div>
                        <div className="font-bold text-md">Website</div>
                        <a
                            className="font-thin text-sm"
                            href={`https://${website}`}
                            target="_blank"
                        >
                            {highlightText(website, searchTerm)}
                        </a>
                    </div>
                </div>

                {/* ADDRESS*/}
                <div className="flex flex-row gap-7 border-b-[#b8094d] border-b-[1px] p-[9px] sm:p-3 items-center">
                    <a
                        className="font-thin text-sm"
                        href={`https://www.google.com/maps/search/?api=1&query=${address.geo.lat},${address.geo.lng}`}
                        target="_blank"
                    >
                        <FaLocationDot size={20} />
                    </a>

                    <div>
                        <div className="font-bold text-md">ADDRESS</div>
                        <a
                            className="font-thin text-sm"
                            href={`https://www.google.com/maps/search/?api=1&query=${address.geo.lat},${address.geo.lng}`}
                            target="_blank"
                        >
                            {highlightText(
                                `${address.suite}, ${address.street}, ${address.city} ${address.zipcode}`,
                                searchTerm
                            )}
                        </a>
                    </div>
                </div>

                {/* COMPANY*/}
                <div className="flex flex-row gap-7  p-[9px] sm:p-3 items-center ">
                    <a
                        className="font-thin text-sm"
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            `${company.name}, ${address.city}`
                        )}`}
                        target="_blank"
                    >
                        <MdOutlineWork size={20} />
                    </a>

                    <div>
                        <div className="font-bold text-md">Company</div>
                        <a
                            className="font-thin text-sm"
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                `${company.name}, ${address.city}`
                            )}`}
                            target="_blank"
                        >
                            <div>
                                <span>{`Name: `}</span>
                                {highlightText(company.name, searchTerm)}
                            </div>
                            <div className="italic">
                                {highlightText(company.catchPhrase, searchTerm)}
                            </div>
                            <div>
                                <span>{`BS: `}</span>
                                {highlightText(company.bs, searchTerm)}
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
