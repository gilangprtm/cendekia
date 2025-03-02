import {
    Table,
    TableHeader,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from "@/Components/ui/table";
import { Button } from "@/Components/ui/button";
import { IconArrowsDownUp, IconMenu2 } from "@tabler/icons-react";
import DialogDelete from "@/Components/Helper/DialogDelete";
import { Link, router } from "@inertiajs/react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/Components/ui/pagination";
import { UseFilter } from "@/hooks/use-filter";
import { flashMessage } from "@/lib/utils";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import {
    Select,
    SelectContent,
    SelectValue,
    SelectTrigger,
    SelectItem,
} from "@/Components/ui/select";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/Components/ui/dropdown-menu";

export default function TabelDatas({
    state,
    datas,
    meta,
    columns,
    actions,
    datasFrom,
    datasDelete,
}) {
    const [params, setParams] = useState({
        ...state,
    });

    const [deleteItem, setDeleteItem] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    UseFilter({
        route: route(datasFrom),
        values: params,
        only: ["datas"],
    });

    useEffect(() => {
        setParams(state);
    }, [state]);

    const onSortable = (field) => {
        const newDirection = params.direction === "asc" ? "desc" : "asc";
        setParams((prev) => ({
            ...prev,
            field: field,
            direction: newDirection,
        }));
    };

    const onHandleDelete = (item) => {
        setDeleteItem(item);
        setIsDialogOpen(true);
    };

    const confirmDelete = () => {
        if (deleteItem) {
            router.delete(route(datasDelete, [deleteItem]), {
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
            setDeleteItem(null);
            setIsDialogOpen(false);
        }
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };

    return (
        <>
            <Table className="w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            <Button
                                variant="ghost"
                                className="inline-flex group px-0"
                                onClick={() => onSortable("id")}
                            >
                                No{" "}
                                <span className="flex-none ml-2 rounded text-muted-foreground">
                                    <IconArrowsDownUp className="size-4 text-muted-foreground" />
                                </span>
                            </Button>
                        </TableHead>
                        {columns.map((column) => (
                            <TableHead key={column.field}>
                                <Button
                                    variant="ghost"
                                    className="inline-flex group px-0"
                                    onClick={() => onSortable(column.field)}
                                >
                                    {column.label}{" "}
                                    <span className="flex-none ml-2 rounded text-muted-foreground">
                                        <IconArrowsDownUp className="size-4 text-muted-foreground" />
                                    </span>
                                </Button>
                            </TableHead>
                        ))}
                        <TableHead>Aksi</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {datas.map((item, index) => (
                        <TableRow key={item.id}>
                            <TableCell>
                                {index +
                                    1 +
                                    (meta.current_page - 1) * meta.per_page}
                            </TableCell>
                            {columns.map((column) => (
                                <TableCell key={column.field}>
                                    {item[column.field]}
                                </TableCell>
                            ))}
                            <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="sm">
                                            <IconMenu2 className="size-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent side="left">
                                        {actions.map((action) => (
                                            <DropdownMenuItem
                                                key={action.field}
                                                asChild
                                            >
                                                <Link
                                                    href={action.action(item)}
                                                >
                                                    {action.label}
                                                </Link>
                                            </DropdownMenuItem>
                                        ))}
                                        <DropdownMenuItem
                                            onSelect={() =>
                                                onHandleDelete(item)
                                            }
                                        >
                                            Hapus
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <DialogDelete
                isOpen={isDialogOpen}
                onConfirm={confirmDelete}
                onClose={closeDialog}
            />
            <div className="flex flex-col px-6 items-center justify-between w-full py-2 border-t lg:flex-row">
                <div className="flex flex-col gap-4 items-center lg:flex-row">
                    <p className="mb-2 text-sm text-muted-foreground">
                        Menampilkan{" "}
                        <span className="font-medium text-orange-500">
                            {meta.to ?? 0}
                        </span>{" "}
                        dari {meta.total} data
                    </p>
                    <Select
                        value={params.load}
                        onValueChange={(e) =>
                            setParams({ ...params, load: e, page: 1 })
                        }
                    >
                        <SelectTrigger className="w-full sm:w-24">
                            <SelectValue placeholder="Load" />
                        </SelectTrigger>
                        <SelectContent>
                            {[10, 25, 50, 75, 100].map((number, index) => (
                                <SelectItem key={index} value={number}>
                                    {number}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="overflow-x-auto">
                    {meta.has_pages && (
                        <Pagination>
                            <PaginationContent className="flex flex-wrap justify-center lg:justify-end">
                                {meta.links.map((link, index) => (
                                    <PaginationItem
                                        key={index}
                                        className="mx-0 mb-1 lb:mb-0"
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
            </div>
        </>
    );
}
