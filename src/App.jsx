import { useEffect, useState, useMemo } from "react";
import ContactCard from "./components/ContactCard";
import "./index.css";
function App() {
    const [contacts, setContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // Handle Fetch Data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetch("https://jsonplaceholder.typicode.com/users");
                const data = await result.json();
                if (data) {
                    setContacts(data);
                }
            } catch (err) {
                throw new Error(err);
            }
        };

        fetchData();
    }, []);

    // Update Contacts when based on searchTerm
    const filteredContacts = useMemo(() => {
        if (!searchTerm) return contacts;

        return contacts.filter((contact) => deepSearch(contact, searchTerm));
    }, [contacts, searchTerm]);

    // Search contacts based on a flexible search term across all fields.
    function deepSearch(contactObject, searchValue) {
        const term = searchValue.toLowerCase();

        const searchInValue = (value) => {
            // If value is null or undefined, return false
            if (!value) return false;

            // If value is a string, check if it includes the search term
            if (typeof value === "string") {
                return value.toLowerCase().includes(term);
            }
            // if value is a number, convert it to string before checking
            if (typeof value === "number") {
                return value.toString().includes(term);
            }
            // If value is an object, recursively seacrh its properties
            if (typeof value === "object") {
                return Object.values(value).some(searchInValue);
            }
            return false;
        };

        return searchInValue(contactObject);
    }

    return (
        <div>
            {/* SEARCH INPUT */}
            <div className="flex flex-col justify-center items-center gap-2 p-6 w-full  bg-white fixed z-50 top-0 ">
                <input
                    placeholder="Search contacts by name, email, city, company, address, etc."
                    type="text"
                    className="border-black border-[1px] w-[80%] p-3 rounded-lg "
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div>
                    {searchTerm
                        ? `Showing ${filteredContacts.length} of ${contacts.length} contacts`
                        : `There are ${contacts.length} total contacts`}
                </div>
            </div>

            <div className="flex flex-col p-3 sm:flex-row sm:gap-4 gap-10  h-screen items-center sm:pl-6 w-full border-none sm:flex-wrap sm:justify-center  mt-[120px]">
                {filteredContacts.map((contact) => (
                    <ContactCard
                        contact={contact}
                        key={contact.id}
                        searchTerm={searchTerm}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
