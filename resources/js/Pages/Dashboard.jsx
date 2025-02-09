import AppLayout from "@/Layouts/AppLayout";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard() {
    return (
        <>
            <div>Ini Dashboard</div>
        </>
    );
}

Dashboard.layout = (page) => <AppLayout children={page} title="Dashboard" />;
