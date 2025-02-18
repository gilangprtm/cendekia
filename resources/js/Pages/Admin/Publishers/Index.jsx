import HeaderTitle from "@/Components/HeaderTitle";
import { Button } from "@/Components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/Components/ui/card";
import {
    Table,
    TableHeader,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from "@/Components/ui/table";
import AppLayout from "@/Layouts/AppLayout";
import { Link, router } from "@inertiajs/react";
import {
    IconArrowsDownUp,
    IconCategory,
    IconPencil,
    IconPlus,
    IconRefresh,
    IconTrash,
} from "@tabler/icons-react";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/Components/ui/alert-dialog";
import { flashMessage } from "@/lib/utils";
import { toast } from "sonner";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/Components/ui/pagination";
import { useState } from "react";
import { UseFilter } from "@/hooks/use-filter";
import { Input } from "@/Components/ui/input";
import {
    Select,
    SelectContent,
    SelectValue,
    SelectTrigger,
    SelectItem,
} from "@/Components/ui/select";

export default function Index(props) {
    const { data: datas, meta } = props.datas;
    const [params, setParams] = useState(props.state);

    console.log(datas);
    UseFilter({
        route: route("admin.publishers.index"),
        values: params,
        only: ["datas"],
    });

    const onSortable = (field) => {
        setParams({
            ...params,
            field: field,
            direction: params.direction === "asc" ? "desc" : "asc",
        });
    };

    const onHandleDelete = (data) => {
        router.delete(route("admin.publishers.destroy", [data]), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (success) => {
                const flash = flashMessage(success);
                if (flash) {
                    toast[flash.type](flash.message);
                }
            },
            onError: (error) => {
                console.error("onError called with error:", error);
            },
        });
    };

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
                        <Link href={route("admin.categories.create")}>
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
                                value={params?.search}
                                onChange={(e) =>
                                    setParams((prev) => ({
                                        ...prev,
                                        search: e.target.value,
                                        page: 1,
                                    }))
                                }
                            />
                            <Select
                                value={params?.load}
                                onValueChange={(e) =>
                                    setParams({ ...params, load: e })
                                }
                            >
                                <SelectTrigger className="w-full sm:w-24">
                                    <SelectValue placeholder="Load" />
                                </SelectTrigger>
                                <SelectContent>
                                    {[10, 25, 50, 75, 100].map(
                                        (number, index) => (
                                            <SelectItem
                                                key={index}
                                                value={number}
                                            >
                                                {number}
                                            </SelectItem>
                                        )
                                    )}
                                </SelectContent>
                            </Select>
                            <Button
                                variant="red"
                                onClick={() => setParams(props.state)}
                            >
                                <IconRefresh className="size-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="px-0 py-0 [&_td]:whitespace-nowrap [&_td]:px-6 [&_th]:px-6">
                        <Table className="w-full">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            className="inline-flex group"
                                            onClick={() => onSortable("id")}
                                        >
                                            No{" "}
                                            <span className="flex-none ml-2 rounded text-muted-foreground">
                                                <IconArrowsDownUp className="size-4 text-muted-foreground" />
                                            </span>
                                        </Button>
                                    </TableHead>
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            className="inline-flex group"
                                            onClick={() => onSortable("name")}
                                        >
                                            Nama{" "}
                                            <span className="flex-none ml-2 rounded text-muted-foreground">
                                                <IconArrowsDownUp className="size-4 text-muted-foreground" />
                                            </span>
                                        </Button>
                                    </TableHead>
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            className="inline-flex group"
                                            onClick={() => onSortable("slug")}
                                        >
                                            Slug{" "}
                                            <span className="flex-none ml-2 rounded text-muted-foreground">
                                                <IconArrowsDownUp className="size-4 text-muted-foreground" />
                                            </span>
                                        </Button>
                                    </TableHead>
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            className="inline-flex group"
                                            onClick={() => onSortable("email")}
                                        >
                                            Email{" "}
                                            <span className="flex-none ml-2 rounded text-muted-foreground">
                                                <IconArrowsDownUp className="size-4 text-muted-foreground" />
                                            </span>
                                        </Button>
                                    </TableHead>
                                    <TableHead>
                                        <Button
                                            variant="ghost"
                                            className="inline-flex group"
                                            onClick={() =>
                                                onSortable("created_at")
                                            }
                                        >
                                            Dibuat Pada{" "}
                                            <span className="flex-none ml-2 rounded text-muted-foreground">
                                                <IconArrowsDownUp className="size-4 text-muted-foreground" />
                                            </span>
                                        </Button>
                                    </TableHead>
                                    <TableHead>Aksi</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {datas.map((data, index) => (
                                    <TableRow key={data.id}>
                                        <TableCell>
                                            {index +
                                                1 +
                                                (meta.current_page - 1) *
                                                    meta.per_page}
                                        </TableCell>
                                        <TableCell>{data.name}</TableCell>
                                        <TableCell>{data.slug}</TableCell>
                                        <TableCell>{data.email}</TableCell>
                                        <TableCell>{data.created_at}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-x-1">
                                                <Button
                                                    variant="blue"
                                                    size="sm"
                                                    asChild
                                                >
                                                    <Link
                                                        href={route(
                                                            "admin.publishers.edit",
                                                            [data]
                                                        )}
                                                    >
                                                        <IconPencil className="size-4" />
                                                    </Link>
                                                </Button>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button
                                                            variant="red"
                                                            size="sm"
                                                        >
                                                            <IconTrash className="size-4" />
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>
                                                                Hapus
                                                            </AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Apakah kamu
                                                                yakin ingin
                                                                menghapus data
                                                                ini?
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>
                                                                Batal
                                                            </AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() =>
                                                                    onHandleDelete(
                                                                        data
                                                                    )
                                                                }
                                                            >
                                                                Hapus
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter className="flex flex-col items-center justify-between w-full py-2 border-t lg:flex-row">
                        <p className="mb-2 text-sm text-muted-foreground">
                            Menampilkan{" "}
                            <span className="font-medium text-orange-500">
                                {meta.from ?? 0}
                            </span>{" "}
                            dari {meta.total} penerbit
                        </p>
                        <div className="overflow-x-auto">
                            {meta.has_pages && (
                                <Pagination>
                                    <PaginationContent className="flex flex-wrap justify-center lg:justify-end">
                                        {meta.links.map((link, index) => (
                                            <PaginationItem
                                                key={index}
                                                className="mx-1 mb-1 lb:mb-0"
                                            >
                                                <PaginationLink
                                                    href={link.url}
                                                    isActive={link.active}
                                                >
                                                    {link.label}
                                                </PaginationLink>
                                            </PaginationItem>
                                        ))}
                                    </PaginationContent>
                                </Pagination>
                            )}
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}

Index.layout = (page) => (
    <AppLayout children={page} title={page.props.page_settings.title} />
);
