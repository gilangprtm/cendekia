import HeaderTitle from "@/Components/HeaderTitle";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader } from "@/Components/ui/card";
import AppLayout from "@/Layouts/AppLayout";
import { Link } from "@inertiajs/react";
import { IconCategory, IconPlus, IconRefresh } from "@tabler/icons-react";
import TabelDatas from "@/Components/Mahas/TabelDatas";
import { Input } from "@/Components/ui/input";
import { useState } from "react";

export default function Index(props) {
    const { state, initial_state, datas, page_settings } = props;
    const [params, setParams] = useState({
        ...state,
        load: parseInt(state.load, 10),
        page: parseInt(state.page, 10),
    });

    const columns = [
        { field: "name", label: "Nama" },
        { field: "slug", label: "Slug" },
        { field: "email", label: "Email" },
        { field: "created_at", label: "Dibuat Pada" },
    ];

    const action = [
        {
            field: "edit",
            label: "Edit",
            action: (item) => route("admin.publishers.edit", [item]),
        },
    ];

    return (
        <>
            <div className="flex flex-col w-full pb-32">
                <div className="flex flex-col items-start justify-between mb-8 gap-y-4 lg:flex-row lg:items-center">
                    <HeaderTitle
                        title={page_settings.title}
                        subtitle={page_settings.subtitle}
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
                    <CardHeader>
                        <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center">
                            <Input
                                className="w-full sm:w-1/4"
                                placeholder="Cari..."
                                value={params.search}
                                onChange={(e) =>
                                    setParams((prev) => ({
                                        ...prev,
                                        search: e.target.value,
                                        page: 1,
                                    }))
                                }
                            />
                            <Input
                                className="w-full sm:w-1/4"
                                placeholder="Nama..."
                                value={params.name}
                                onChange={(e) =>
                                    setParams((prev) => ({
                                        ...prev,
                                        name: e.target.value,
                                        page: 1,
                                    }))
                                }
                            />
                            <Input
                                className="w-full sm:w-1/4"
                                placeholder="Slug..."
                                value={params.slug}
                                onChange={(e) =>
                                    setParams((prev) => ({
                                        ...prev,
                                        slug: e.target.value,
                                        page: 1,
                                    }))
                                }
                            />
                            <Input
                                type="date"
                                className="w-full sm:w-1/4"
                                value={params.created_at}
                                onChange={(e) =>
                                    setParams((prev) => ({
                                        ...prev,
                                        created_at: e.target.value,
                                        page: 1,
                                    }))
                                }
                            />

                            <Button
                                variant="red"
                                onClick={() => setParams(initial_state)}
                            >
                                <IconRefresh className="size-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="px-0 py-0 [&_td]:whitespace-nowrap [&_td]:px-6 [&_th]:px-6">
                        <TabelDatas
                            state={params}
                            datas={datas.data}
                            meta={datas.meta}
                            columns={columns}
                            actions={action}
                            datasFrom="admin.publishers.index"
                            datasDelete="admin.publishers.destroy"
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
