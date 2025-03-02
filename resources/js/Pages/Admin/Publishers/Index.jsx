import HeaderTitle from "@/Components/HeaderTitle";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import AppLayout from "@/Layouts/AppLayout";
import { Link } from "@inertiajs/react";
import { IconCategory, IconPlus, IconPencil } from "@tabler/icons-react";
import TabelDatas from "@/Components/Mahas/TabelDatas";

export default function Index(props) {
    const state = props.state;
    const initialState = props.initial_state;
    const { data: datas, meta } = props.datas;

    const columns = [
        { field: "name", label: "Nama" },
        { field: "slug", label: "Slug" },
        { field: "email", label: "Email" },
        { field: "created_at", label: "Dibuat Pada" },
    ];

    const action = [
        {
            field: "edit",
            action: (item) => route("admin.publishers.edit", [item]),
            icon: <IconPencil className="size-4" />,
        },
    ];

    const filters = [
        { name: "search", type: "input", placeholder: "Cari" },
        { name: "name", type: "input", placeholder: "Nama" },
        { name: "slug", type: "input", placeholder: "Slug" },
        { name: "created_at", type: "date", placeholder: "Tanggal Dibuat" },
    ];

    return (
        <>
            <div className="flex flex-col w-full pb-32">
                <div className="flex flex-col items-start justify-between mb-8 gap-y-4 lg:flex-row lg:items-center">
                    <HeaderTitle
                        title={props.page_settings.title}
                        subtitle={props.page_settings.subtitle}
                        icon={IconCategory}
                    />

                    <Button variant="orange" size="lg" asChild>
                        <Link href={route("admin.publishers.create")}>
                            <IconPlus className="size-4" />
                            Tambah
                        </Link>
                    </Button>
                </div>

                <Card>
                    <CardContent className="px-0 py-0 [&_td]:whitespace-nowrap [&_td]:px-6 [&_th]:px-6">
                        <TabelDatas
                            initialState={initialState}
                            state={state}
                            datas={datas}
                            meta={meta}
                            routeName="admin.publishers"
                            columns={columns}
                            actions={action}
                            filters={filters}
                        />
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

Index.layout = (page) => (
    <AppLayout children={page} title={page.props.page_settings.title} />
);
