import {
    Table,
    TableHeader,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from "@/Components/ui/table";
import { Button } from "@/Components/ui/button";
import { IconArrowsDownUp } from "@tabler/icons-react";
import DialogDelete from "@/Components/Helper/DialogDelete";
import { Link, router } from "@inertiajs/react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from "@/Components/ui/pagination";
import { useState } from "react";
import { UseFilter } from "@/hooks/use-filter";
import { flashMessage } from "@/lib/utils";
import { toast } from "sonner";
import { Input } from "@/Components/ui/input";
import {
    Select,
    SelectContent,
    SelectValue,
    SelectTrigger,
    SelectItem,
} from "@/Components/ui/select";
import { IconRefresh } from "@tabler/icons-react";

export default function TabelDatas({
    initialState,
    state,
    datas,
    meta,
    routeName,
    columns,
    actions,
    filters,
}) {
    const [params, setParams] = useState({
        ...state,
        load: parseInt(state.load, 10),
        page: parseInt(state.page, 10),
    });

    const initState = {
        ...initialState,
        load: parseInt(initialState.load, 10),
        page: parseInt(initialState.page, 10),
    };

    UseFilter({
        route: route(routeName + ".index"),
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

    const onHandleDelete = (item) => {
        router.delete(route(`${routeName}.destroy`, [item]), {
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
            <div className="flex w-full px-6 py-6 flex-col gap-4 lg:flex-row lg:items-center">
                <Select
                    value={params?.load}
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
                {filters.map((filter) => {
                    if (filter.type === "input") {
                        return (
                            <Input
                                key={filter.name}
                                className="w-full sm:w-1/4"
                                placeholder={filter.placeholder}
                                value={params[filter.name]}
                                onChange={(e) =>
                                    setParams((prev) => ({
                                        ...prev,
                                        [filter.name]: e.target.value,
                                        page: 1,
                                    }))
                                }
                            />
                        );
                    } else if (filter.type === "date") {
                        return (
                            <Input
                                key={filter.name}
                                type="date"
                                className="w-full sm:w-1/4"
                                value={params[filter.name]}
                                onChange={(e) =>
                                    setParams((prev) => ({
                                        ...prev,
                                        [filter.name]: e.target.value,
                                        page: 1,
                                    }))
                                }
                            />
                        );
                    } else if (filter.type === "select") {
                        return (
                            <Select
                                key={filter.name}
                                value={params[filter.name]}
                                onValueChange={(e) =>
                                    setParams((prev) => ({
                                        ...prev,
                                        [filter.name]: e,
                                        page: 1,
                                    }))
                                }
                            >
                                <SelectTrigger className="w-full sm:w-24">
                                    <SelectValue
                                        placeholder={filter.placeholder}
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    {filter.options.map((option, index) => (
                                        <SelectItem
                                            key={index}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        );
                    }
                    return null;
                })}
                <Button variant="red" onClick={() => setParams(initState)}>
                    <IconRefresh className="size-4" />
                </Button>
            </div>
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
                        {columns.map((column) => (
                            <TableHead key={column.field}>
                                <Button
                                    variant="ghost"
                                    className="inline-flex group"
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
                                <div className="flex items-center gap-x-1">
                                    {actions.map((action) => (
                                        <Button
                                            key={action.field}
                                            variant="blue"
                                            size="sm"
                                            asChild
                                        >
                                            <Link href={action.action(item)}>
                                                {action.icon}
                                            </Link>
                                        </Button>
                                    ))}
                                    <DialogDelete
                                        onConfirm={() => onHandleDelete(item)}
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="flex flex-col px-6 items-center justify-between w-full py-2 border-t lg:flex-row">
                <p className="mb-2 text-sm text-muted-foreground">
                    Menampilkan{" "}
                    <span className="font-medium text-orange-500">
                        {meta.to ?? 0}
                    </span>{" "}
                    dari {meta.total} data
                </p>
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
