"use client";

import DatePicker from "@client-web/components/ui/DatePicker";
import LogsPage from "./Table";
import { PhoneNumber } from "@client-web/components/ui/PhoneNumber";
import DropDownExample from "./dropdownbar";
import { FruitSelector } from "./selectlistexample";
import PlaceholderExample from "./placeholderexapme";

export default function DemoPage() {
    return (
        <div className="p-5 space-y-20">
            <section>
                <h2 className="mb-3 font-semibold text-lg">DataTable</h2>
                <LogsPage />
            </section>

            <section>
                <h2 className="mb-3 font-semibold text-lg">DatePicker</h2>
                <DatePicker />
            </section>

            <section>
                <h2 className="mb-3 font-semibold text-lg">Phone Number</h2>
                <PhoneNumber />
            </section>

            <section>
                <h2 className="mb-3 font-semibold text-lg">DropDown</h2>
                <DropDownExample />
            </section>

            <section>
                <h2 className="mb-3 font-semibold text-lg">SelectList</h2>
                <FruitSelector />
            </section>

            <section>
                <h2 className="mb-3 font-semibold text-lg">Placeholder</h2>
                <PlaceholderExample />
            </section>
        </div>
    );
}
