import HeaderTitle from "@/Components/HeaderTitle";
import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
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
    IconCategory,
    IconPencil,
    IconPlus,
    IconTrash,
} from "@tabler/icons-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/Components/ui/avatar";
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

export default function Index(props) {
    const onHandleDelete = (category) => {
        router.delete(route("admin.categories.destroy", [category]), {
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
                    <CardContent className="px-0 py-0 [&_td]:whitespace-nowrap [&_td]:px-6 [&_th]:px-6">
                        <Table className="w-full">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>No</TableHead>
                                    <TableHead>Nama</TableHead>
                                    <TableHead>Slug</TableHead>
                                    <TableHead>Cover</TableHead>
                                    <TableHead>Dibuat Pada</TableHead>
                                    <TableHead>Aksi</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {props.categories.map((category, index) => (
                                    <TableRow key={category.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{category.name}</TableCell>
                                        <TableCell>{category.slug}</TableCell>
                                        <TableCell>
                                            <Avatar>
                                                <AvatarImage
                                                    src={category.cover}
                                                />
                                                <AvatarFallback>
                                                    {category.name.substring(
                                                        0,
                                                        1
                                                    )}
                                                </AvatarFallback>
                                            </Avatar>
                                        </TableCell>
                                        <TableCell>
                                            {category.created_at}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-x-1">
                                                <Button
                                                    variant="blue"
                                                    size="sm"
                                                    asChild
                                                >
                                                    <Link
                                                        href={route(
                                                            "admin.categories.edit",
                                                            [category]
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
                                                                menghapus
                                                                kategori ini?
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>
                                                                Batal
                                                            </AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() =>
                                                                    onHandleDelete(
                                                                        category
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
                </Card>
            </div>
        </>
    );
}

Index.layout = (page) => (
    <AppLayout children={page} title={page.props.page_settings.title} />
);
